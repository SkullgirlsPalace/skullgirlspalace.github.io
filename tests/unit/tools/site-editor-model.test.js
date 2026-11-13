import { describe, expect, it } from 'vitest';
import { createEmptyConfig } from '../../../src/utils/siteCustomizations.js';
import { BACKUP_FORMAT, CONFIG_PATH, buildExport, makeBackup, restoreBackup, sameConfig } from '../../../tools/site-editor/model.js';
import { MAX_ASSET_BYTES, base64ToBytes, bytesToBase64, fitImageToDisplay, inspectMedia, sha256, validateAssets } from '../../../tools/site-editor/media.js';
import { createZip } from '../../../tools/site-editor/zip.js';

const gifData = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
async function imageAsset() {
    return { path: `img/site-editor/${await sha256(base64ToBytes(gifData))}.gif`, mime: 'image/gif', data: gifData };
}
function editedConfig(media) {
    return {
        ...createEmptyConfig(),
        theme: { '--bg-primary': '#121212' },
        edits: [{ id: 'title', route: '/', language: 'pt-BR', selector: '#hero > h1', fingerprint: { tag: 'H1', text: 'Palace' }, styles: { 'font-size': '32px' }, texts: [{ index: 0, before: 'Palace', after: 'Palácio' }], ...(media ? { media } : {}) }]
    };
}
const mediaFor = asset => ({ kind: 'image', src: asset.path, alt: 'Imagem do teste', width: 1, height: 1, position: 'after' });

describe('visual editor reviewable backups', () => {
    it('round trips independent backups without changing caller data or the variants editor', async () => {
        const base = createEmptyConfig(), asset = await imageAsset(), config = editedConfig(mediaFor(asset));
        const backup = makeBackup(base, config, [asset]);
        expect(backup).toMatchObject({ format: BACKUP_FORMAT, version: 1, base, config, assets: [asset] });
        const restored = restoreBackup(base, backup);
        expect(restored).toEqual({ config, assets: [asset] });
        restored.config.theme['--bg-primary'] = '#000000';
        expect(config.theme['--bg-primary']).toBe('#121212');
        expect(backup.config.theme['--bg-primary']).toBe('#121212');
        expect(base.edits).toHaveLength(0);
    });
    it('rejects a stale base atomically and recognizes its own applied export', () => {
        const base = createEmptyConfig(), config = editedConfig(), backup = makeBackup(base, config);
        const newerBase = { ...createEmptyConfig(), theme: { '--bg-primary': '#abcdef' } };
        expect(() => restoreBackup(newerBase, backup)).toThrow('base do site mudou');
        expect(newerBase.theme['--bg-primary']).toBe('#abcdef');
        expect(restoreBackup(config, backup).config).toEqual(config);
        expect(backup.config).toEqual(config);
    });
    it('rejects other editor generations, executable CSS and missing local media', async () => {
        const base = createEmptyConfig(), backup = makeBackup(base, editedConfig());
        expect(() => restoreBackup(base, { ...backup, version: 2 })).toThrow('v1');
        expect(() => restoreBackup(base, { ...backup, format: 'palace-editor-backup' })).toThrow('v1');
        const invalid = structuredClone(backup); invalid.config.edits[0].styles.color = 'url(javascript:alert(1))';
        expect(() => restoreBackup(base, invalid)).toThrow('Estilo');
        const asset = await imageAsset();
        expect(() => makeBackup(base, editedConfig(mediaFor(asset)))).toThrow('não contém a mídia');
        const current = editedConfig(mediaFor(asset));
        expect(() => makeBackup(current, { ...current, theme: { '--bg-primary': '#ffffff' } })).not.toThrow();
    });
    it('compares configuration objects without treating key order as a new base', () => {
        expect(sameConfig({ theme: { a: 1, b: 2 }, edits: [] }, { edits: [], theme: { b: 2, a: 1 } })).toBe(true);
        expect(sameConfig({ edits: [1, 2] }, { edits: [2, 1] })).toBe(false);
    });
});

describe('visual editor assets and ZIP', () => {
    it('keeps original animation bytes, checks image dimensions and refuses traversal/mime changes', async () => {
        const asset = await imageAsset();
        expect(inspectMedia(base64ToBytes(asset.data))).toMatchObject({ kind: 'image', mime: 'image/gif', width: 1, height: 1, animated: true });
        expect(bytesToBase64(base64ToBytes(gifData))).toBe(gifData);
        expect(() => validateAssets([asset])).not.toThrow();
        expect(() => validateAssets([{ ...asset, path: 'img/site-editor/../../bad.gif' }])).toThrow('Caminho');
        expect(() => validateAssets([{ ...asset, mime: 'video/mp4' }])).toThrow('formato');
        expect(() => validateAssets([asset, asset])).toThrow('repetido');
        const oversized = base64ToBytes(asset.data); oversized[6] = 1; oversized[7] = 6;
        expect(() => validateAssets([{ ...asset, data: bytesToBase64(oversized) }])).toThrow('1280');
    });
    it('rejects malformed base64 and unrecognized image or executable content', () => {
        expect(() => base64ToBytes('data:image/gif;base64,' + gifData)).toThrow('inválido');
        expect(() => base64ToBytes('abc')).toThrow('inválido');
        expect(() => base64ToBytes('A'.repeat(Math.ceil(MAX_ASSET_BYTES / 3) * 4 + 4))).toThrow('inválido');
        expect(() => inspectMedia(new TextEncoder().encode('<svg onload="alert(1)"/>'))).toThrow('Use uma imagem');
    });
    it('decodes video-sized backups without exhausting the regular-expression stack', () => {
        expect(base64ToBytes('A'.repeat(10_000_000))).toHaveLength(7_500_000);
    });
    it('exports only configuration and new referenced media with exact binary bytes and hashes', async () => {
        const base = createEmptyConfig(), asset = await imageAsset(), config = editedConfig(mediaFor(asset));
        const result = await buildExport(base, config, [asset]);
        expect(Object.keys(result.files).sort()).toEqual([CONFIG_PATH, asset.path, 'palace-visual.json', 'LEIA-ME.txt'].sort());
        expect(result.files[asset.path]).toEqual(base64ToBytes(asset.data));
        expect(result.manifest.files.find(record => record.path === asset.path)).toMatchObject({ bytes: base64ToBytes(gifData).length, sha256: asset.path.split('/').at(-1).replace('.gif', '') });
        expect(result.manifest.base.content).toEqual(base);
        expect(result.manifest.base.sha256).toMatch(/^[a-f0-9]{64}$/);
        expect(result.zip.type).toBe('application/zip');
        const applied = await buildExport(config, { ...config, theme: { '--bg-primary': '#ffffff' } }, [asset]);
        expect(applied.files).not.toHaveProperty(asset.path);
        expect(() => makeBackup(base, config)).toThrow();
    });
    it('checks content-addressed hashes before making an export and refuses empty exports', async () => {
        const asset = await imageAsset(), config = editedConfig(mediaFor(asset));
        const corrupted = { ...asset, path: asset.path.replace(/[a-f0-9]{64}/, '0'.repeat(64)) };
        const altered = editedConfig(mediaFor(corrupted));
        await expect(buildExport(createEmptyConfig(), altered, [corrupted])).rejects.toThrow('corrompida');
        await expect(buildExport(config, config, [asset])).rejects.toThrow('não há alterações');
    });
    it('enforces the 2x pixel budget on imported edits while preserving every animation frame', async () => {
        const bytes = base64ToBytes(gifData); bytes[6] = 20; bytes[8] = 20;
        const asset = { path: `img/site-editor/${await sha256(bytes)}.gif`, mime: 'image/gif', data: bytesToBase64(bytes) };
        const media = { ...mediaFor(asset), width: 5, height: 5 };
        await expect(buildExport(createEmptyConfig(), editedConfig(media), [asset])).rejects.toThrow('2×');
        await expect(fitImageToDisplay(asset, 5, 5)).rejects.toThrow('preservar os quadros');
        expect(await fitImageToDisplay(asset, 10, 10)).toBe(asset);
        expect(asset.data).toBe(bytesToBase64(bytes));
    });
    it('writes binary ZIP entries without UTF-8 re-encoding and rejects unsafe filenames', async () => {
        const payload = new Uint8Array([0, 128, 255, 42]), zip = createZip({ 'media/test.webm': payload });
        const bytes = new Uint8Array(await zip.arrayBuffer()), view = new DataView(bytes.buffer);
        const nameLength = view.getUint16(26, true), length = view.getUint32(18, true);
        expect(view.getUint32(0, true)).toBe(0x04034b50);
        expect(bytes.slice(30 + nameLength, 30 + nameLength + length)).toEqual(payload);
        expect(() => createZip({ '../bad': payload })).toThrow('Caminho');
        expect(() => createZip({ 'img//bad': payload })).toThrow('Caminho');
    });
});
