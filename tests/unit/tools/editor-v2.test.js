import { describe, expect, it } from 'vitest';
import { catalogFrom, charactersFrom, CLASS_PATH, clone, exportFiles, makeBackup, restoreBackup } from '../../../tools/editor/model.js';
import { validatePresets, membersFromPreset, membersWithCompanions } from '../../../tools/editor/presets.js';
import { emptyPickerFilters, pickerItems } from '../../../tools/editor/picker-model.js';
import { backupFilename } from '../../../tools/editor/version.js';
import { createExportArchive } from '../../../tools/editor/transfer.js';

const ref = variant => ({ character: 'annie', variant });
const files = () => ({
    'data/annie.json': { character: 'Annie', variants: {
        diamante: [{ name: 'Água', element: 'Água', stats: { power: '10,500', attack: '2,000', health: '9,000' }, signature_ability: { name: 'Nome exclusivo', description: 'BARREIRA e FEITIÇO.' } }],
        ouro: [{ name: 'Brilho', element: 'Luz', stats: { power: '9,500', attack: '3,000', health: '10,000' }, signature_ability: { description: 'BARREIRA.' } }],
        bronze: [{ name: 'Chama', element: 'Fogo', stats: { power: '8,000', attack: '1,500', health: '7,500' }, signature_ability: { description: 'FÚRIA.' } }]
    } },
    'data/tier-data.json': {}, 'data/teams.json': { version: 1, teams: [] },
    [CLASS_PATH]: { Água: ['Ofensivo', 'Defensivo'], Brilho: ['Suporte de Utilidade'], Chama: ['Ofensivo'] }
});
const preset = (members = [ref('Água')], kind = 'team') => ({ id: 'saved', name: 'Meu time', kind, members });

describe('editor generation and personal preset safety', () => {
    it('round-trips presets and drafts without adding personal lists to published files', () => {
        const base = files(), edited = clone(base), presets = [preset()];
        edited['data/annie.json'].variants.ouro[0].recommended_build = 'ATQ%';
        const backup = makeBackup(base, edited, presets);
        expect(backup.version).toBe(2);
        expect(restoreBackup(base, JSON.parse(JSON.stringify(backup)))).toEqual(edited);
        expect(backup.presets).toEqual(presets);
        backup.presets[0].name = 'Outra lista';
        expect(presets[0].name).toBe('Meu time');
        const archive = createExportArchive(exportFiles(base, edited));
        expect(JSON.parse(archive['palace-editor.json'])).toEqual({ format: 'palace-site-export', version: 2, files: ['data/annie.json'] });
        expect(Object.keys(archive)).toEqual(['data/annie.json', 'palace-editor.json', 'LEIA-ME.txt']);
        expect(archive['LEIA-ME.txt']).toContain('palace-v2-backup.json');
        expect(archive['LEIA-ME.txt']).toContain('não um backup importável');
        expect(backupFilename(backup)).toBe('palace-v2-backup.json');
        expect(backupFilename({ version: 1 })).toBe('palace-v1-backup.json');
        expect(() => restoreBackup(base, JSON.parse(archive['palace-editor.json']))).toThrow('invalidBackup');
    });
    it.each([1, 3, '2', undefined])('rejects generation %s without changing the base', version => {
        const base = files(), original = clone(base), backup = makeBackup(base, base);
        backup.version = version;
        expect(() => restoreBackup(base, backup)).toThrow('incompatibleVersion');
        expect(base).toEqual(original);
    });
    it('refuses bad preset references, duplicate members and invalid limits atomically', () => {
        const base = files(), original = clone(base), edited = clone(base);
        edited['data/annie.json'].variants.ouro[0].recommended_build = 'ATQ%';
        for (const bad of [preset([ref('Missing')]), preset([ref('Água'), ref('Água')]), preset([], 'unknown'), { ...preset(), name: ' ' }, preset(Array.from({ length: 4 }, () => ref('Água')))]) {
            const backup = makeBackup(base, edited, [bad]);
            expect(() => restoreBackup(base, backup)).toThrow('invalidPresets');
            expect(base).toEqual(original);
        }
        expect(() => validatePresets([preset(), preset()], charactersFrom(base))).toThrow('invalidPresets');
        expect(validatePresets([preset([], 'support'), { ...preset([], 'defense'), id: 'defense' }], charactersFrom(base))).toHaveLength(2);
    });
    it('preserves saved order, inserts a missing anchor only when there is space, and never drops a member', () => {
        const saved = preset([ref('Brilho'), ref('Água'), ref('Chama')]);
        expect(membersFromPreset(saved, ref('Água'))).toEqual(saved.members);
        expect(membersFromPreset(preset([ref('Brilho')]), ref('Água'))).toEqual([ref('Água'), ref('Brilho')]);
        expect(() => membersFromPreset(saved, ref('Missing'))).toThrow('presetAnchor');
        expect(saved.members).toHaveLength(3);
        expect(() => membersFromPreset(preset([], 'support'), ref('Água'))).toThrow('presetTeamRequired');
    });
    it('reuses a companion or pair with different anchors and never duplicates the page variant', () => {
        const single = preset([ref('Brilho')], 'support');
        const pair = preset([ref('Brilho'), ref('Chama')]);
        expect(membersWithCompanions(single, ref('Água'))).toEqual([ref('Água'), ref('Brilho')]);
        expect(membersWithCompanions(pair, ref('Água'))).toEqual([ref('Água'), ref('Brilho'), ref('Chama')]);
        expect(membersWithCompanions(pair, ref('Chama'))).toEqual([ref('Chama'), ref('Brilho')]);
        expect(membersWithCompanions(single, ref('Brilho'))).toEqual([ref('Brilho')]);
        const reused = membersWithCompanions(pair, ref('Água'));
        reused[1].variant = 'Edited';
        expect(pair.members).toEqual([ref('Brilho'), ref('Chama')]);
    });
    it('keeps the v2 backup format for quick presets and refuses empty or full-team shortcuts', () => {
        const base = files(), quick = preset([ref('Brilho'), ref('Chama')]);
        const backup = makeBackup(base, base, [quick]);
        expect(backup.version).toBe(2);
        expect(restoreBackup(base, backup)).toEqual(base);
        expect(backup.presets).toEqual([quick]);
        expect(() => membersWithCompanions(preset([]), ref('Água'))).toThrow('quickMemberLimit');
        expect(() => membersWithCompanions(preset([ref('Água'), ref('Brilho'), ref('Chama')]), ref('Água'))).toThrow('quickMemberLimit');
    });
});

describe('compact team catalog', () => {
    const data = files(), catalog = catalogFrom(data);
    const options = { classesFor: name => data[CLASS_PATH][name], englishFor: item => item.variant === 'Chama' ? { name: 'Flame', SA1: 'Gain BARRIER.' } : null,
        effects: { barrier: { keys: ['BARREIRA', 'BARRIER'] }, hex: { keys: ['FEITIÇO', 'HEX'] } }, presets: [preset([ref('Água'), ref('Chama')], 'support'), { ...preset([]), id: 'empty' }] };
    const names = filters => pickerItems(catalog, { ...emptyPickerFilters(), ...filters }, options).map(item => item.variant);
    it('combines groups and accepts either selected value within a group', () => {
        expect(names({ character: 'annie', rarity: ['diamante', 'bronze'], element: ['Água', 'Fogo'], classes: ['Defensivo', 'Suporte de Utilidade'] })).toEqual(['Água']);
        expect(names({ rarity: ['ouro'], classes: ['Ofensivo'] })).toEqual([]);
        expect(names({ classes: ['Defensivo'] })).toEqual(['Água']);
    });
    it('searches names in both languages without accents and excludes ability titles', () => {
        expect(names({ query: 'agua' })).toEqual(['Água']);
        expect(names({ query: 'flame' })).toEqual(['Chama']);
        expect(names({ query: 'nome exclusivo' })).toEqual([]);
    });
    it('supports any/all effects and keeps unmatched results empty', () => {
        expect(names({ effects: ['hex', 'barrier'] })).toEqual(['Água', 'Brilho', 'Chama']);
        expect(names({ effects: ['hex', 'barrier'], effectMatch: 'all' })).toEqual(['Água']);
        expect(names({ effects: ['unknown'] })).toEqual([]);
    });
    it('filters saved pools, including empty lists, and sorts parsed stats in both directions', () => {
        expect(names({ preset: 'saved' })).toEqual(['Água', 'Chama']);
        expect(names({ preset: 'empty' })).toEqual([]);
        expect(names({ sort: 'atk', direction: 'desc' })).toEqual(['Brilho', 'Água', 'Chama']);
        expect(names({ sort: 'hp', direction: 'asc' })).toEqual(['Chama', 'Água', 'Brilho']);
        expect(names({ sort: 'element', direction: 'asc' })).toEqual(['Chama', 'Água', 'Brilho']);
        expect(catalog.map(item => item.variant)).toEqual(['Água', 'Brilho', 'Chama']);
    });
});
