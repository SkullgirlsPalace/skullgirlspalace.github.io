import { describe, expect, it, vi } from 'vitest';
import { CLASS_PATH, clone, exportFiles, makeBackup, restoreBackup, serializeFile, validateChanges } from '../../../tools/editor/model.js';
import { createZip } from '../../../tools/editor/zip.js';
import { isLocalEditorURL } from '../../../tools/editor/local-only.js';
import { EN_ABILITIES_PATH, PT_MAPPING_PATH, buildAbilityLinks, englishAbility, abilityIdentity } from '../../../tools/editor/abilities.js';

const base = () => ({
    'data/annie.json': { character: 'Annie', variants: { diamante: [{ name: 'Rosa', stats: { attack: '123' }, signature_ability: { description: 'Editorial PT-BR' }, recommended_build: 'ATQ%', extra: { untouched: true } }, { name: 'Brilho' }] } },
    'data/tier-data.json': { annie: { Rosa: { pf: 'SS', notes: 'Reviewed manually' } } },
    'data/teams.json': { version: 1, teams: [] }, [CLASS_PATH]: { Rosa: ['Ofensivo'] }
});
const draft = () => ({ id: 'one', anchor: { character: 'annie', variant: 'Rosa' }, category: 'general', status: 'draft', reviewedOn: '2026-10-15', members: [{ character: 'annie', variant: 'Rosa' }] });

describe('local editor data safety', () => {
    it('allows the editor only on literal loopback hosts over HTTP(S)', () => {
        for (const url of ['http://127.0.0.1:4174/tools/editor/', 'http://localhost:5500/tools/editor/', 'http://[::1]:4174/']) expect(isLocalEditorURL(url)).toBe(true);
        for (const url of ['https://skullgirlspalace.github.io/tools/editor/', 'http://192.168.1.10:4174/', 'https://localhost.example.com/', 'https://localhost@evil.example/', 'file:///C:/editor/index.html', 'not a URL']) expect(isLocalEditorURL(url)).toBe(false);
    });
    it('exports only changed files, preserving abilities, extra fields, notes and missing ranks', () => {
        const before = base(), files = clone(before);
        expect(exportFiles(before, files)).toEqual({});
        files['data/annie.json'].variants.diamante[0].recommended_build = 'Precisão';
        expect(validateChanges(before, files)).toEqual([]);
        const exported = exportFiles(before, files);
        expect(Object.keys(exported)).toEqual(['data/annie.json']);
        expect(exported['data/annie.json'].variants.diamante[0]).toMatchObject({ signature_ability: { description: 'Editorial PT-BR' }, extra: { untouched: true } });
        expect(files['data/tier-data.json'].annie.Rosa).not.toHaveProperty('parallel');
    });
    it('backs up drafts but exports only reviewed teams', () => {
        const before = base(), files = clone(before);
        files['data/teams.json'].teams.push(draft());
        expect(exportFiles(before, files)).toEqual({});
        expect(makeBackup(before, files).changes[0].after.teams).toHaveLength(1);
        files['data/teams.json'].teams[0].status = 'reviewed';
        expect(exportFiles(before, files)['data/teams.json'].teams).toHaveLength(1);
    });
    it('restores all changes atomically and refuses a stale base or an unrecognized path', () => {
        const before = base(), files = clone(before);
        files['data/annie.json'].variants.diamante[0].recommended_build = 'Defesa';
        const backup = makeBackup(before, files);
        expect(restoreBackup(before, backup)).toEqual(files);
        const newer = base(); newer['data/annie.json'].variants.diamante[0].recommended_build = 'VD%';
        expect(() => restoreBackup(newer, backup)).toThrow('staleBackup');
        expect(newer['data/annie.json'].variants.diamante[0].recommended_build).toBe('VD%');
        backup.changes[0].path = '../outside.json';
        expect(() => restoreBackup(before, backup)).toThrow('invalidBackup');
    });
    it('recognizes its own applied export on reopening and keeps unpublished drafts', () => {
        const before = base(), files = clone(before);
        files['data/annie.json'].variants.diamante[0].recommended_build = 'Precisão';
        const reviewed = { ...draft(), status: 'reviewed' }, unreviewed = { ...draft(), id: 'second' };
        files['data/teams.json'].teams = [reviewed, unreviewed];
        const backup = makeBackup(before, files);
        const updatedBase = { ...before, ...exportFiles(before, files) };
        const restored = restoreBackup(updatedBase, backup);
        expect(restored['data/teams.json'].teams).toEqual([reviewed, unreviewed]);
        expect(exportFiles(updatedBase, restored)).toEqual({});
        expect(makeBackup(updatedBase, restored).changes.map(change => change.path)).toEqual(['data/teams.json']);
    });
    it('rejects imported identity/stat edits, HTML and invalid ranks', () => {
        const before = base(), files = clone(before), variant = files['data/annie.json'].variants.diamante[0];
        variant.stats.attack = '999999';
        expect(validateChanges(before, files).join()).toContain('protectedData');
        variant.stats.attack = '123'; variant.recommended_build = '<script>bad()</script>';
        expect(validateChanges(before, files).join()).toContain('plainText');
        variant.recommended_build = 'ATQ%'; files['data/tier-data.json'].annie.Rosa.riftDef = 'X';
        expect(validateChanges(before, files).join()).toContain('invalidRank');
    });
    it('validates imported defensive teams against the corrected classes in the same backup', () => {
        const before = base(), files = clone(before);
        const team = draft(); team.category = 'defense'; team.status = 'reviewed';
        files['data/teams.json'].teams.push(team); files[CLASS_PATH].Rosa = ['Coringa'];
        expect(restoreBackup(before, makeBackup(before, files))).toEqual(files);
        expect(serializeFile(CLASS_PATH, files[CLASS_PATH])).toContain('export const VARIANT_CLASSES =');
        files[CLASS_PATH].Rosa = ['Ofensivo'];
        expect(validateChanges(before, files).join()).toContain('defenseClass');
    });
    it('rejects missing fields and supports returning from alternative builds to a main recommendation', () => {
        const before = base(); before['data/annie.json'].variants.diamante[0].builds = [{ title: 'Defesa', recommended_build: 'VD%' }];
        const files = clone(before); delete files['data/annie.json'].variants.diamante[0].builds;
        expect(validateChanges(before, files)).toEqual([]);
        delete files['data/annie.json'];
        expect(validateChanges(before, files).join()).toContain('missingFile');
    });
    it('creates a ZIP with exact UTF-8 file content and blocks traversal filenames', async () => {
        const zip = createZip({ 'data/annie.json': '{"name":"Precisão"}' });
        const bytes = new Uint8Array(await zip.arrayBuffer()), view = new DataView(bytes.buffer);
        expect(view.getUint32(0, true)).toBe(0x04034b50);
        const nameLength = view.getUint16(26, true), length = view.getUint32(18, true);
        expect(new TextDecoder().decode(bytes.slice(30 + nameLength, 30 + nameLength + length))).toBe('{"name":"Precisão"}');
        expect(view.getUint32(bytes.length - 22, true)).toBe(0x06054b50);
        expect(() => createZip({ '../oops': '' })).toThrow('Invalid archive path');
    });
});

function abilityBase() {
    const files = base();
    files['data/annie.json'].variants.diamante[0].signature_ability = { name: 'NOME PT', description: '[HAB 1]: 5/10/15 segundos.\n\n[HAB 2]: Original.' };
    files[PT_MAPPING_PATH] = { rose: { name: 'Nome antigo de referência', character: 'Annie', ability: 'NOME PT', SA1: 'Tradução de referência preservada.' } };
    files[EN_ABILITIES_PATH] = { rose: { name: 'Star Rose', character: '<:sp_an:123> Annie', ability: 'EN NAME', SA1: '5/10/15 seconds.', SA2: 'Original.', stats: { atk: '123' } } };
    return files;
}
describe('bilingual ability editing', () => {
    it('publishes final editorial English from the character JSON and retains the Krazete source and identity', async () => {
        const before = abilityBase(), files = clone(before);
        files['data/annie.json'].variants.diamante[0].signature_ability = {
            name: 'NOME PT REVISADO', description: '[SA1]: 15 segundos.\n\n[SA2]: Corrigida.',
            krazete_id: 'rose', english: { name: 'EDITORIAL EN', description: '[SA1]: 15 seconds.\n\n[SA2]: Reviewed.' }
        };
        expect(validateChanges(before, files)).toEqual([]);
        expect(Object.keys(exportFiles(before, files))).toEqual(['data/annie.json']);
        expect(files[EN_ABILITIES_PATH]).toEqual(before[EN_ABILITIES_PATH]);
        expect(files[PT_MAPPING_PATH]).toEqual(before[PT_MAPPING_PATH]);
        expect(buildAbilityLinks(files)).toEqual(buildAbilityLinks(before));
        expect(restoreBackup(files, makeBackup(before, files))).toEqual(files);
        vi.resetModules();
        vi.stubGlobal('fetch', vi.fn(async path => ({ json: async () => files[String(path)] })));
        const { setCharacters } = await import('../../../src/state/store.js');
        const { setLanguage } = await import('../../../src/i18n/translations.js');
        const { preloadKrazeteData, getLocalizedSADescSync, getLocalizedAbilityNameSync, getLocalizedNameSync } = await import('../../../src/i18n/dataTranslations.js');
        try {
            setCharacters({ annie: files['data/annie.json'] });
            await preloadKrazeteData(); setLanguage('en');
            expect(getLocalizedNameSync('Rosa', 'NOME PT REVISADO')).toBe('Star Rose');
            expect(getLocalizedAbilityNameSync('Rosa', 'NOME PT REVISADO')).toBe('EDITORIAL EN');
            expect(getLocalizedSADescSync('Rosa', 'PT fallback', 'NOME PT REVISADO')).toContain('15 seconds.');
            expect(getLocalizedSADescSync('Rosa', 'PT fallback', 'NOME PT REVISADO')).not.toContain('5/10/15');
            setLanguage('pt-BR');
            expect(getLocalizedSADescSync('Rosa', 'Texto PT')).toBe('Texto PT');
        } finally { setCharacters({}); setLanguage('pt-BR'); vi.unstubAllGlobals(); }
    });
    it('protects reference IDs and validates incomplete or HTML English revisions in character JSONs', () => {
        const before = abilityBase(), files = clone(before), signature = files['data/annie.json'].variants.diamante[0].signature_ability;
        signature.krazete_id = 'other';
        expect(validateChanges(before, files).join()).toContain('abilityLink');
        signature.krazete_id = 'rose';
        signature.english = { name: 'EDITED', description: '[SA1]: \n\n[SA2]: Second only.' };
        expect(validateChanges(before, files).join()).toContain('abilityRequired');
        expect(restoreBackup(before, makeBackup(before, files))).toEqual(files);
        signature.english.description = '<img src=x>';
        expect(() => restoreBackup(before, makeBackup(before, files))).toThrow('abilityText');
        signature.english.description = 'HP < 50%; gain HEX for 15 seconds.';
        expect(validateChanges(before, files)).toEqual([]);
    });
    it('feeds the published language loader after a fallback PT ability rename', async () => {
        const before = abilityBase(), files = clone(before);
        files['data/annie.json'].variants.diamante[0].signature_ability = { name: 'NOVO NOME', description: '[HAB 1]: **5/10/15** segundos.\n\n[HAB 2]: Corrigida.' };
        files[PT_MAPPING_PATH].rose.ability = 'NOVO NOME';
        files[EN_ABILITIES_PATH].rose.ability = 'NEW NAME';
        files[EN_ABILITIES_PATH].rose.SA2 = 'Corrected.';
        expect(validateChanges(before, files)).toEqual([]);
        const output = exportFiles(before, files);
        vi.resetModules();
        vi.stubGlobal('fetch', vi.fn(async path => ({ json: async () => output[String(path)] || files[String(path)] })));
        const { setLanguage } = await import('../../../src/i18n/translations.js');
        const { preloadKrazeteData, getLocalizedSADescSync, getLocalizedAbilityNameSync, getLocalizedNameSync } = await import('../../../src/i18n/dataTranslations.js');
        try {
            await preloadKrazeteData(); setLanguage('en');
            expect(getLocalizedNameSync('Rosa', 'NOVO NOME')).toBe('Star Rose');
            expect(getLocalizedAbilityNameSync('Rosa', 'NOVO NOME')).toBe('NEW NAME');
            expect(getLocalizedSADescSync('Rosa', 'PT fallback', 'NOVO NOME')).toBe('[SA1]: 5/10/15 seconds.\n\n[SA2]: Corrected.');
            setLanguage('pt-BR');
            const pt = files['data/annie.json'].variants.diamante[0].signature_ability;
            expect(getLocalizedSADescSync('Rosa', pt.description, pt.name)).toBe(pt.description);
        } finally { setLanguage('pt-BR'); vi.unstubAllGlobals(); }
    });
    it('exports only deliberate PT/EN changes and preserves numeric progressions and other fields', () => {
        const before = abilityBase(), files = clone(before);
        files['data/annie.json'].variants.diamante[0].signature_ability.description = '[HAB 1]: **5/10/15** segundos.\n\n[HAB 2]: Corrigida.';
        files[EN_ABILITIES_PATH].rose.SA2 = 'Corrected.';
        expect(validateChanges(before, files)).toEqual([]);
        const output = exportFiles(before, files);
        expect(Object.keys(output)).toEqual(['data/annie.json', EN_ABILITIES_PATH]);
        expect(output[EN_ABILITIES_PATH].rose.SA1).toBe('5/10/15 seconds.');
        expect(output[EN_ABILITIES_PATH].rose.stats).toEqual({ atk: '123' });
        expect(files[PT_MAPPING_PATH]).toEqual(before[PT_MAPPING_PATH]);
        expect(restoreBackup(before, makeBackup(before, files))).toEqual(files);
    });
    it('keeps fallback language links stable after renaming the PT ability', () => {
        const before = abilityBase(), files = clone(before), links = buildAbilityLinks(before), item = { character: 'annie', variant: 'Rosa' };
        expect(links[abilityIdentity(item)]).toBe('rose');
        files['data/annie.json'].variants.diamante[0].signature_ability.name = 'NOVO NOME';
        expect(validateChanges(before, files).join()).toContain('abilityLink');
        files[PT_MAPPING_PATH].rose.ability = 'NOVO NOME';
        expect(validateChanges(before, files)).toEqual([]);
        expect(englishAbility(files, buildAbilityLinks(files), item).name).toBe('Star Rose');
        files[EN_ABILITIES_PATH].rose.name = 'Different variant';
        expect(validateChanges(before, files).join()).toContain('protectedData');
    });
    it('preserves incomplete ability drafts but prevents export and rejects HTML imports', () => {
        const before = abilityBase(), files = clone(before);
        files[EN_ABILITIES_PATH].rose.SA1 = '';
        expect(validateChanges(before, files).join()).toContain('abilityRequired');
        expect(restoreBackup(before, makeBackup(before, files))).toEqual(files);
        files[EN_ABILITIES_PATH].rose.SA1 = '<img src=x onerror=bad()>';
        expect(() => restoreBackup(before, makeBackup(before, files))).toThrow('abilityText');
    });
    it('preserves comparison operators and level values as plain ability text', () => {
        const before = abilityBase(), files = clone(before);
        files[EN_ABILITIES_PATH].rose.SA1 = 'While HP < 50%, gain 5/10/15% meter. ATK > 100.';
        expect(validateChanges(before, files)).toEqual([]);
        expect(restoreBackup(before, makeBackup(before, files))[EN_ABILITIES_PATH].rose.SA1).toBe(files[EN_ABILITIES_PATH].rose.SA1);
    });
    it('does not infer a match across characters or choose between ambiguous records', () => {
        const files = abilityBase(), item = { character: 'annie', variant: 'Rosa' };
        files[EN_ABILITIES_PATH].rose.character = 'Filia';
        expect(buildAbilityLinks(files)[abilityIdentity(item)]).toBeUndefined();
        files[EN_ABILITIES_PATH].rose.character = 'Annie';
        files[EN_ABILITIES_PATH].duplicate = clone(files[EN_ABILITIES_PATH].rose);
        files[PT_MAPPING_PATH].duplicate = clone(files[PT_MAPPING_PATH].rose);
        expect(buildAbilityLinks(files)[abilityIdentity(item)]).toBeUndefined();
    });
    it('blocks a rename that would redirect another variant through the wiki ability fallback', () => {
        const before = abilityBase();
        before['data/annie.json'].variants.diamante[1].signature_ability = { name: 'OUTRA HABILIDADE', description: 'Outra descrição.' };
        before[PT_MAPPING_PATH].other = { name: 'Brilho', ability: 'OUTRA HABILIDADE', character: 'Annie' };
        before[EN_ABILITIES_PATH].other = { name: 'Shine', ability: 'OTHER ABILITY', character: 'Annie', SA1: 'Other.', SA2: '' };
        const files = clone(before);
        files['data/annie.json'].variants.diamante[1].signature_ability.name = 'NOME PT';
        files[PT_MAPPING_PATH].other.ability = 'NOME PT';
        expect(validateChanges(before, files)).toContain('Rosa: abilityLink');
    });
});
