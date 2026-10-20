import { Window } from 'happy-dom';
import { buildAbilityLinks, abilityIdentity, EN_ABILITIES_PATH } from '../editor/abilities.js';

export const SOURCE_URL = 'https://skullgirlsmobile.fandom.com/wiki/Tier_List';
export const HEADERS = ['Variant Name', 'PF Offense', 'Rift Offense', 'Rift Defense', 'Parallel Realms'];
export const MODES = ['pf', 'riftOff', 'riftDef', 'parallel'];
export const normalizeName = value => String(value).normalize('NFC').replace(/[’‘]/g, "'").replace(/[‐‑–—]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();
export const characterKey = value => normalizeName(value).replace(/\./g, '').replace(/ /g, '-');

/** Canonical source codes. Palace stores U as I and TBD as N/A. */
export function normalizeRank(value) {
    const rank = String(value).trim().toUpperCase();
    const canonical = ({ I: 'U', 'N/A': 'TBD' })[rank] || rank;
    if (!['SS', 'S', 'A', 'B', 'C', 'U', 'TBD'].includes(canonical)) throw new Error(`Rank desconhecido: ${value}`);
    return canonical;
}

function parseTable(character, rows) {
    if (JSON.stringify(rows[0]) !== JSON.stringify(HEADERS)) throw new Error(`Colunas inesperadas: ${character}`);
    if (rows.length < 2) throw new Error(`Tabela vazia: ${character}`);
    return rows.slice(1).map(cells => {
        if (cells.length !== 5 || !cells[0]) throw new Error(`Linha incompleta: ${character}/${cells[0] || '?'}`);
        return { character: characterKey(character), name: cells[0], ranks: Object.fromEntries(MODES.map((mode, i) => [mode, normalizeRank(cells[i + 1])])) };
    });
}

/** Parses all character panels, including inactive tabs. Never evaluates source scripts. */
export function parseHTML(html) {
    const window = new Window({ settings: { disableJavaScriptEvaluation: true, disableJavaScriptFileLoading: true, disableCSSFileLoading: true, disableIframePageLoading: true } });
    try {
        const document = new window.DOMParser().parseFromString(html, 'text/html');
        if (document.querySelector('h1')?.textContent.trim() !== 'Tier List') throw new Error('A resposta não é a página Tier List. Salve o HTML pelo navegador.');
        const matching = [...document.querySelectorAll('.tabber')].filter(tabber => [...tabber.querySelectorAll('table')].some(table => table.rows[0]?.cells[0]?.textContent.trim() === HEADERS[0]));
        if (matching.length !== 1) throw new Error('Não foi possível identificar o conjunto de tabelas da Wiki Tier List.');
        const tabber = matching[0];
        const labels = [...tabber.querySelectorAll('ul.wds-tabs > li')].map(label => label.textContent.trim());
        const panels = [...tabber.children].filter(element => element.classList.contains('wds-tab__content'));
        if (!labels.length || labels.length !== panels.length) throw new Error('Abas de personagens incompletas.');
        return panels.flatMap((panel, index) => {
            const tables = panel.querySelectorAll('table');
            if (tables.length !== 1) throw new Error(`Tabela ausente ou ambígua: ${labels[index]}`);
            return parseTable(labels[index], [...tables[0].rows].map(row => [...row.cells].map(cell => cell.textContent.trim())));
        });
    } finally { window.close(); }
}

/** Text snapshot exported from the same rendered tables, with one # Character section per tab. */
export function parseTSV(text) {
    const sections = [];
    for (const line of text.replace(/^\uFEFF/, '').split(/\r?\n/)) {
        if (!line.trim()) continue;
        if (line.startsWith('# ')) sections.push({ character: line.slice(2).trim(), rows: [] });
        else {
            if (!sections.length) throw new Error('TSV sem personagem.');
            sections.at(-1).rows.push(line.split('\t').map(cell => cell.trim()));
        }
    }
    if (!sections.length) throw new Error('TSV vazio.');
    return sections.flatMap(section => parseTable(section.character, section.rows));
}

/** Exact character + English name matching through the existing confirmed Krazete links. */
export function prepareSync(rows, files, current) {
    const links = buildAbilityLinks(files), byName = new Map(), local = [];
    for (const [file, data] of Object.entries(files)) {
        if (!data?.variants) continue;
        const character = file.slice(5, -5);
        for (const variant of Object.values(data.variants).flat()) {
            const identity = abilityIdentity({ character, variant: variant.name });
            const english = files[EN_ABILITIES_PATH]?.[links[identity]]?.name?.trim();
            const item = { character, variant: variant.name, english, identity };
            local.push(item);
            if (!english) continue;
            const key = JSON.stringify([character, normalizeName(english)]);
            byName.set(key, [...(byName.get(key) || []), item]);
        }
    }
    const report = { source: SOURCE_URL, sourceVariants: rows.length, localVariants: local.length, characters: {}, matched: 0, changedVariants: 0, changedRanks: 0, changes: [], unmatchedVariants: [], missingVariants: [], errors: [] };
    const result = structuredClone(current), seen = new Set(), matched = new Set();
    for (const row of rows) {
        report.characters[row.character] = (report.characters[row.character] || 0) + 1;
        const key = JSON.stringify([row.character, normalizeName(row.name)]);
        if (seen.has(key)) { report.errors.push(`Variante repetida: ${row.character}/${row.name}`); continue; }
        seen.add(key);
        const candidates = byName.get(key) || [];
        if (candidates.length !== 1) { report.unmatchedVariants.push({ character: row.character, name: row.name, reason: candidates.length ? 'ambiguous' : 'not-found' }); continue; }
        const item = candidates[0];
        matched.add(item.identity);
        report.matched++;
        const ranks = Object.fromEntries(MODES.map(mode => {
            const canonical = normalizeRank(row.ranks[mode]);
            return [mode, ({ U: 'I', TBD: 'N/A' })[canonical] || canonical];
        }));
        const before = current[item.character]?.[item.variant] || {};
        const changes = MODES.filter(mode => before[mode] !== ranks[mode]).map(mode => ({ mode, before: before[mode] ?? null, after: ranks[mode] }));
        if (changes.length) {
            report.changedVariants++;
            report.changedRanks += changes.length;
            report.changes.push({ character: item.character, variant: item.variant, english: row.name, changes });
        }
        result[item.character] ||= {};
        result[item.character][item.variant] = { ...before, ...ranks };
    }
    report.missingVariants = local.filter(item => !matched.has(item.identity)).map(({ character, variant, english }) => ({ character, variant, english: english || null }));
    report.valid = !report.errors.length && !report.unmatchedVariants.length && !report.missingVariants.length && report.matched === local.length && local.length > 0;
    return { data: result, report };
}
