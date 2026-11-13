// Complete identity audit plus a text-similarity shortlist for human review.
// Scores never decide whether a Portuguese editorial translation should change.
import fs from 'node:fs';
import path from 'node:path';
import { buildAbilityLinks, abilityIdentity, EN_ABILITIES_PATH, PT_MAPPING_PATH } from './editor/abilities.js';
import { splitSignatureAbility, stripAbilityLabels, normalizeAbilityProgressions, localizePortugueseAbility } from '../src/utils/abilityText.js';

const root = path.resolve(import.meta.dirname, '..');
const read = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const characterFiles = fs.readdirSync(path.join(root, 'data')).filter(file => file.endsWith('.json'))
    .filter(file => read(`data/${file}`)?.variants);
const files = Object.fromEntries([...characterFiles.map(file => `data/${file}`), PT_MAPPING_PATH, EN_ABILITIES_PATH]
    .map(relative => [relative, read(relative)]));
const links = buildAbilityLinks(files);
const normalized = value => localizePortugueseAbility(normalizeAbilityProgressions(stripAbilityLabels(value)))
    .replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const tokens = value => normalized(value).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR')
    .match(/[\p{L}\p{N}]+/gu) || [];
const similarity = (first, second) => {
    const a = new Set(tokens(first)), b = new Set(tokens(second));
    if (!a.size && !b.size) return 1;
    const union = new Set([...a, ...b]);
    return [...a].filter(word => b.has(word)).length / union.size;
};
const rows = [], unresolved = [];
for (const file of characterFiles) {
    const character = file.slice(0, -5);
    for (const variant of Object.values(files[`data/${file}`].variants).flat()) {
        const id = links[abilityIdentity({ character, variant: variant.name })];
        if (!id || !files[PT_MAPPING_PATH][id] || !files[EN_ABILITIES_PATH][id]) {
            unresolved.push(`${character} / ${variant.name}`); continue;
        }
        const reference = files[PT_MAPPING_PATH][id], published = variant.signature_ability || {};
        const actual = splitSignatureAbility(published.description), target = { SA1: reference.SA1, SA2: reference.SA2 };
        const sa1 = similarity(actual.SA1, target.SA1), sa2 = similarity(actual.SA2, target.SA2);
        const title = similarity(published.name, reference.ability);
        const english = published.english;
        rows.push({ character, variant: variant.name, id, title, sa1, sa2,
            english: english ? { title: english.name, description: english.description } : null,
            currentTitle: published.name || '', referenceTitle: reference.ability?.trim() || '',
            currentSA1: normalized(actual.SA1), referenceSA1: normalized(target.SA1),
            currentSA2: normalized(actual.SA2), referenceSA2: normalized(target.SA2) });
    }
}
if (process.argv.includes('--json')) console.log(JSON.stringify({ rows, unresolved }, null, 2));
else {
    console.log(`Published: ${rows.length}; unresolved: ${unresolved.length}; reference: ${Object.keys(files[EN_ABILITIES_PATH]).length}`);
    console.log('Character | Variant | ID | title | SA1 | SA2 | EN override');
    rows.filter(row => row.title < 0.85 || row.sa1 < 0.7 || row.sa2 < 0.7 || row.english)
        .sort((a, b) => Math.min(a.sa1, a.sa2, a.title) - Math.min(b.sa1, b.sa2, b.title))
        .forEach(row => console.log(`${row.character} | ${row.variant} | ${row.id} | ${row.title.toFixed(2)} | ${row.sa1.toFixed(2)} | ${row.sa2.toFixed(2)} | ${row.english ? 'yes' : ''}`));
    if (unresolved.length) console.log('Unresolved:', unresolved.join('; '));
}
