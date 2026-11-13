import { validateConfig } from '../../src/utils/siteCustomizations.js';
import { base64ToBytes, inspectMedia, sha256, validateAssets } from './media.js';
import { createZip } from './zip.js';

export const CONFIG_PATH = 'data/site-customizations.json';
export const BACKUP_NAME = 'palace-visual-v1-backup.json';
export const EXPORT_NAME = 'palace-visual-v1.zip';
export const BACKUP_FORMAT = 'palace-visual-backup';
export const EXPORT_FORMAT = 'palace-visual-export';
export const VERSION = 1;
const clone = value => JSON.parse(JSON.stringify(value));
function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
    return value;
}
export const sameConfig = (first, second) => JSON.stringify(canonical(first)) === JSON.stringify(canonical(second));
export const serializeConfig = config => `${JSON.stringify(config, null, 2)}\n`;
const localSources = config => new Set(config.edits.flatMap(edit => edit.media?.src && /^(?:\/)?(?:img|media)\/site-editor\//.test(edit.media.src) ? [edit.media.src.replace(/^\//, '')] : []));

function validateReferenceAssets(base, config, assets) {
    const existing = localSources(base), byPath = new Map(assets.map(asset => [asset.path, asset]));
    for (const edit of config.edits) {
        if (!edit.media) continue;
        const path = edit.media.src.replace(/^\//, ''), asset = byPath.get(path);
        if (!asset && localSources(config).has(path) && !existing.has(path)) throw new Error(`O backup não contém a mídia: ${path}`);
        if (asset && inspectMedia(base64ToBytes(asset.data)).kind !== edit.media.kind) throw new Error('O tipo da mídia não corresponde ao bloco.');
    }
}

export function makeBackup(base, config, assets = []) {
    validateConfig(base); validateConfig(config); validateAssets(assets);
    validateReferenceAssets(base, config, assets);
    return clone({ format: BACKUP_FORMAT, version: VERSION, createdAt: new Date().toISOString(), base, config, assets });
}

/** Validate the entire candidate before returning anything that can replace a draft. */
export function restoreBackup(currentBase, backup) {
    validateConfig(currentBase);
    if (!backup || backup.format !== BACKUP_FORMAT || backup.version !== VERSION || Object.keys(backup).some(key => !['format', 'version', 'createdAt', 'base', 'config', 'assets'].includes(key))) throw new Error('Use um backup JSON do Editor Visual v1. O ZIP e o backup do Estúdio de variantes têm formatos diferentes.');
    validateConfig(backup.base); validateConfig(backup.config); validateAssets(backup.assets);
    if (!sameConfig(currentBase, backup.base) && !sameConfig(currentBase, backup.config)) throw new Error('A base do site mudou desde este backup. O rascunho foi preservado; revise as diferenças antes de aplicar.');
    validateReferenceAssets(currentBase, backup.config, backup.assets);
    return clone({ config: backup.config, assets: backup.assets });
}

/** A ZIP is for review/application to the same project revision, never an import backup. */
export async function buildExport(base, config, assets = []) {
    makeBackup(base, config, assets);
    if (sameConfig(base, config)) throw new Error('Ainda não há alterações para exportar.');
    const files = { [CONFIG_PATH]: serializeConfig(config) }, referenced = localSources(config), baseReferences = localSources(base);
    const byPath = new Map(assets.map(asset => [asset.path, asset]));
    for (const edit of config.edits) {
        if (!edit.media) continue;
        const asset = byPath.get(edit.media.src.replace(/^\//, ''));
        if (!asset) continue;
        const info = inspectMedia(base64ToBytes(asset.data));
        if (info.kind === 'image' && (info.width > 2 * edit.media.width || info.height > 2 * edit.media.height)) throw new Error(`A imagem supera 2× o tamanho exibido: ${asset.path}. Reaplique a mídia nas dimensões desejadas; para animações, reduza o arquivo ou aumente a exibição.`);
    }
    for (const asset of assets) {
        const bytes = base64ToBytes(asset.data), digest = await sha256(bytes);
        if (asset.path.split('/').at(-1).split('.')[0] !== digest) throw new Error(`A mídia foi alterada ou corrompida: ${asset.path}`);
        if (referenced.has(asset.path) && !baseReferences.has(asset.path)) files[asset.path] = bytes;
    }
    const baseSha256 = await sha256(serializeConfig(base));
    const fileRecords = await Promise.all(Object.entries(files).map(async ([path, value]) => ({ path, bytes: typeof value === 'string' ? new TextEncoder().encode(value).length : value.length, sha256: await sha256(value) })));
    const manifest = {
        format: EXPORT_FORMAT, version: VERSION, createdAt: new Date().toISOString(),
        base: { path: CONFIG_PATH, sha256: baseSha256, content: clone(base) },
        files: fileRecords,
        note: 'Aplicar somente na base indicada. A exportação não publica o site e não inclui o editor.'
    };
    files['palace-visual.json'] = `${JSON.stringify(manifest, null, 2)}\n`;
    files['LEIA-ME.txt'] = [
        'Skullgirls Palace - Editor Visual v1', '',
        'Este ZIP contém correções visuais e de texto, sem publicação automática.',
        'Guarde também palace-visual-v1-backup.json para continuar editando.',
        'Extraia em uma pasta de revisão. Confira palace-visual.json, a base e os hashes.',
        'Copie somente os arquivos de files para os caminhos correspondentes no projeto.',
        'Não copie este LEIA-ME nem o manifesto para data/. Não substitua outros arquivos.',
        'Esta exportação depende do suporte do Editor Visual presente nesta revisão do projeto.',
        'As alterações de texto valem para os elementos, rotas e idiomas escolhidos na SPA.',
        'As fontes originais e o HTML estático gerado para buscadores não são reescritos.',
        'Confira cada idioma, página e tamanho de tela. Elementos divergentes são ignorados.',
        'Mídias locais já presentes na base não são duplicadas. URLs HTTPS continuam externas.',
        'Rode npm.cmd run test:coverage -- --configLoader native e npm.cmd run build.',
        'O build verifica o orçamento total; vídeos e GIFs também precisam dessa revisão.',
        'Publique pelo fluxo normal do projeto somente depois da revisão.', ''
    ].join('\n');
    return { files, manifest, zip: createZip(files) };
}
