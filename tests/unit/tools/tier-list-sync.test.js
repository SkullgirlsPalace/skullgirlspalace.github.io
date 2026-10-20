import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { HEADERS, MODES, normalizeRank, parseHTML, parseTSV, prepareSync } from '../../../tools/tier-list-sync/core.js';
import { EN_ABILITIES_PATH, PT_MAPPING_PATH } from '../../../tools/editor/abilities.js';

const snapshot = fs.readFileSync('tools/tier-list-sync/snapshots/2026-10-20.tsv', 'utf8');
const files = {
    'data/annie.json': { variants: { bronze: [{ name: 'Nome revisado', signature_ability: { krazete_id: 'test' } }] } },
    [EN_ABILITIES_PATH]: { test: { character: 'Annie', name: "Star's Child" } },
    [PT_MAPPING_PATH]: { test: { name: 'Nome antigo' } }
};
const row = { character: 'annie', name: 'Star’s Child', ranks: { pf: 'SS', riftOff: 'I', riftDef: 'U', parallel: 'TBD' } };
const table = (name, ranks = ['SS', 'I', 'U', 'N/A']) => `<table><tr>${HEADERS.map(header => `<th>${header}</th>`).join('')}</tr><tr>${[name, ...ranks].map(cell => `<td><span>${cell}</span></td>`).join('')}</tr></table>`;
const html = `<h1>Tier List</h1><div class="tabber"><ul class="wds-tabs"><li>Annie</li><li>Big Band</li></ul><div class="wds-tab__content wds-is-current">${table('Star Child')}</div><div class="wds-tab__content" style="display:none">${table('Bassline')}</div></div>`;

describe('Fandom tier list synchronization', () => {
    it('normalizes the two equivalent codes and rejects unrecognized ratings', () => {
        expect(normalizeRank(' i ')).toBe('U');
        expect(normalizeRank('N/A')).toBe('TBD');
        expect(() => normalizeRank('D')).toThrow('Rank desconhecido');
        expect(() => normalizeRank('')).toThrow();
    });
    it('reads inactive character tabs and all four semantically ordered columns', () => {
        const rows = parseHTML(html);
        expect(rows.map(row => row.character)).toEqual(['annie', 'big-band']);
        expect(rows[0].ranks).toEqual({ pf: 'SS', riftOff: 'U', riftDef: 'U', parallel: 'TBD' });
        expect(parseHTML(`${html}<script>throw new Error('Source scripts must not run');</script>`)).toEqual(rows);
    });
    it('rejects block pages, incomplete tabs, changed columns and missing ranks', () => {
        expect(() => parseHTML('<h1>Access denied</h1>')).toThrow();
        expect(() => parseHTML(html.replace('<li>Big Band</li>', ''))).toThrow();
        expect(() => parseHTML(html.replace('PF Offense', 'Something else'))).toThrow();
        expect(() => parseHTML(html.replace('<span>I</span>', '<span></span>'))).toThrow();
        expect(() => parseTSV('# Annie\nVariant Name\tPF Offense\nStar Child\tSS')).toThrow();
    });
    it('uses confirmed bilingual identity, preserves unrelated data and stores Palace codes', () => {
        const original = { annie: { 'Nome revisado': { pf: 'B', note: 'preserve' }, Other: { pf: 'A' } } };
        const { data, report } = prepareSync([row], files, original);
        expect(report.valid).toBe(true);
        expect(report.changedRanks).toBe(4);
        expect(data.annie['Nome revisado']).toEqual({ pf: 'SS', riftOff: 'I', riftDef: 'I', parallel: 'N/A', note: 'preserve' });
        expect(data.annie.Other).toEqual(original.annie.Other);
        expect(original.annie['Nome revisado'].pf).toBe('B');
        expect(prepareSync([row], files, data).report.changedRanks).toBe(0);
    });
    it('blocks partial, duplicate, ambiguous and unmatched collections without guessing', () => {
        expect(prepareSync([], files, {}).report.valid).toBe(false);
        expect(prepareSync([row, row], files, {}).report.errors).toHaveLength(1);
        expect(prepareSync([{ ...row, name: "Stars Child" }], files, {}).report.unmatchedVariants).toHaveLength(1);
        expect(prepareSync([{ ...row, character: 'filia' }], files, {}).report.valid).toBe(false);
        const ambiguous = structuredClone(files);
        ambiguous['data/annie.json'].variants.bronze.push({ name: 'Outra', signature_ability: { krazete_id: 'test' } });
        expect(prepareSync([row], ambiguous, {}).report.unmatchedVariants[0].reason).toBe('ambiguous');
    });
    it('matches every entry of the complete captured source to the current catalog', () => {
        const rows = parseTSV(snapshot);
        const catalog = Object.fromEntries([...new Set(rows.map(row => row.character))].map(character => [`data/${character}.json`, JSON.parse(fs.readFileSync(`data/${character}.json`, 'utf8'))]));
        for (const path of [EN_ABILITIES_PATH, PT_MAPPING_PATH]) catalog[path] = JSON.parse(fs.readFileSync(path, 'utf8'));
        const tier = JSON.parse(fs.readFileSync('data/tier-data.json', 'utf8'));
        const { data, report } = prepareSync(rows, catalog, tier);
        expect(rows).toHaveLength(307);
        expect(Object.keys(report.characters)).toHaveLength(18);
        expect(report.valid).toBe(true);
        expect(report.matched).toBe(307);
        for (const character of Object.values(data)) for (const ranks of Object.values(character)) {
            for (const mode of MODES) expect(['SS', 'S', 'A', 'B', 'C', 'I', 'N/A']).toContain(ranks[mode]);
        }
    });
});
