import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { CHARACTER_FILES } from '../../../src/config/constants.js';
import { abilityIdentity, buildAbilityLinks, EN_ABILITIES_PATH, PT_MAPPING_PATH, publishedAbilityLinks } from '../../../tools/editor/abilities.js';
import { normalizeAbilityProgressions, splitSignatureAbility, stripAbilityLabels } from '../../../src/utils/abilityText.js';

const read = file => JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const files = Object.fromEntries([...CHARACTER_FILES.map(file => `data/${file}`), PT_MAPPING_PATH, EN_ABILITIES_PATH].map(path => [path, read(path)]));
const catalog = CHARACTER_FILES.flatMap(file => Object.values(files[`data/${file}`].variants).flat().map(variant => ({ character: file.slice(0, -5), variant: variant.name, data: variant })));
const links = buildAbilityLinks(files);
const words = value => normalizeAbilityProgressions(stripAbilityLabels(value)).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().match(/[\p{L}\p{N}%]+/gu) || [];
const fingerprint = value => words(value).join(' ');
const trigrams = value => {
    const tokens = words(value);
    return new Set(tokens.slice(2).map((_, index) => tokens.slice(index, index + 3).join(' ')));
};
function repeatedParts() {
    const parts = catalog.flatMap(item => Object.entries(splitSignatureAbility(item.data.signature_ability?.description)).map(([part, text]) => ({ variant: item.variant, part, text, tokens: trigrams(text) })));
    const repeated = [];
    for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        // Shared short phrases are not evidence of a copied ability.
        if (a.tokens.size < 15) continue;
        for (const b of parts.slice(i + 1)) {
            if (a.variant === b.variant || b.tokens.size < 15) continue;
            const overlap = [...a.tokens].filter(token => b.tokens.has(token)).length;
            if (2 * overlap / (a.tokens.size + b.tokens.size) >= 0.92) repeated.push(`${a.variant} ${a.part} / ${b.variant} ${b.part}`);
        }
    }
    return repeated;
}

describe('published signature ability assignments', () => {
    it('resolves every published variant once, within its character, in the editor and wiki', () => {
        expect(catalog.length).toBeGreaterThan(300);
        expect(Object.keys(links)).toHaveLength(catalog.length);
        expect(new Set(Object.values(links)).size).toBe(catalog.length);
        expect(publishedAbilityLinks(files)).toEqual(links);
    });

    it('does not repeat long ability parts across different variants, ignoring emphasis and rank progressions', () => {
        expect(repeatedParts()).toEqual([]);
    });

    it('does not borrow another variant ability title unless the reference also shares that title', () => {
        const unexpected = [];
        for (const a of catalog) {
            const name = fingerprint(a.data.signature_ability?.name);
            if (!name) continue;
            for (const b of catalog) {
                if (a === b || name !== fingerprint(b.data.signature_ability?.name)) continue;
                const own = files[PT_MAPPING_PATH][links[abilityIdentity(a)]];
                const other = files[PT_MAPPING_PATH][links[abilityIdentity(b)]];
                if (fingerprint(own.ability) !== fingerprint(other.ability)) unexpected.push(`${a.variant} / ${b.variant}`);
            }
        }
        expect(unexpected).toEqual([]);
    });

    it('loads the intended English name, title and both ability parts for the entire real catalog', async () => {
        vi.resetModules();
        vi.stubGlobal('fetch', vi.fn(async path => ({ json: async () => files[String(path)] })));
        const { setCharacters } = await import('../../../src/state/store.js');
        const { setLanguage } = await import('../../../src/i18n/translations.js');
        const { preloadKrazeteData, getLocalizedNameSync, getLocalizedAbilityNameSync, getLocalizedSADescSync } = await import('../../../src/i18n/dataTranslations.js');
        const { createVariantCard } = await import('../../../src/components/VariantCard.js');
        try {
            setCharacters(Object.fromEntries(CHARACTER_FILES.map(file => [file.slice(0, -5), files[`data/${file}`]])));
            await preloadKrazeteData();
            setLanguage('en');
            for (const item of catalog) {
                const ability = item.data.signature_ability;
                const reference = files[EN_ABILITIES_PATH][links[abilityIdentity(item)]];
                expect(getLocalizedNameSync(item.variant, ability.name), item.variant).toBe(reference.name.trim());
                expect(getLocalizedAbilityNameSync(item.variant, ability.name), item.variant).toBe(ability.english?.name || reference.ability.trim());
                const expected = ability.english?.description || `[SA1]: ${reference.SA1}${reference.SA2 ? `\n\n[SA2]: ${reference.SA2}` : ''}`;
                expect(getLocalizedSADescSync(item.variant, ability.description, ability.name), item.variant).toBe(expected);
            }
            for (const key of ['plottwisted', 'deadofwinter', 'nightshade', 'purrfectdark']) {
                const item = catalog.find(item => links[abilityIdentity(item)] === key);
                const ability = item.data.signature_ability;
                const reference = files[EN_ABILITIES_PATH][key];
                for (const language of ['pt-BR', 'en']) {
                    setLanguage(language);
                    const card = document.createElement('div');
                    card.innerHTML = createVariantCard(item.data, item.character);
                    expect(card.querySelector('h3').textContent).toBe(language === 'pt-BR' ? item.variant : reference.name.trim());
                    const expectedTitle = language === 'pt-BR' ? ability.name : reference.ability.trim();
                    expect(fingerprint(card.textContent)).toContain(fingerprint(expectedTitle));
                    const expectedDescription = language === 'pt-BR' ? ability.description : `${reference.SA1}\n\n${reference.SA2}`;
                    expect(fingerprint(card.textContent)).toContain(fingerprint(expectedDescription));
                }
            }
        } finally {
            setCharacters({});
            setLanguage('pt-BR');
            vi.unstubAllGlobals();
        }
    });

    it.each([
        ['plottwisted', 'SQUIGLY', 'RESSUSCITA', 'MIASMA'],
        ['deadofwinter', 'ARMADURA', 'DEFINHAR', 'CADAVER']
    ])('keeps the restored mechanics on %s', (key, characterOrEffect, effect, foreignEffect) => {
        const item = catalog.find(item => links[abilityIdentity(item)] === key);
        const text = fingerprint(item.data.signature_ability.description).toUpperCase();
        expect(text).toContain(characterOrEffect);
        expect(text).toContain(effect);
        expect(text).not.toContain(foreignEffect);
    });
});
