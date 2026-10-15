export const EN_ABILITIES_PATH = 'data/krazete/ENGLISH-Variants.json';
export const PT_MAPPING_PATH = 'data/krazete/PT-BR-Variantes.json';
export const abilityIdentity = item => JSON.stringify([item.character, item.variant]);
const clean = value => String(value || '').replace(/\r/g, '').trim();
const characterName = value => clean(value).replace(/<:[^>]*>/g, '').normalize('NFD').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

/** Resolve once from the original files so editing an ability name cannot change its identity. */
export function buildAbilityLinks(files) {
    const pt = files[PT_MAPPING_PATH] || {}, en = files[EN_ABILITIES_PATH] || {};
    const links = {};
    for (const [path, data] of Object.entries(files)) {
        if (!data?.variants) continue;
        const character = path.slice(5, -5);
        const keys = Object.keys(pt).filter(key => en[key] && characterName(en[key].character) === characterName(character));
        for (const variant of Object.values(data.variants).flat()) {
            let matches = keys.filter(key => clean(pt[key].name) === clean(variant.name));
            if (!matches.length && variant.signature_ability?.name) {
                matches = keys.filter(key => clean(pt[key].ability).toLocaleLowerCase('pt-BR') === clean(variant.signature_ability.name).toLocaleLowerCase('pt-BR'));
            }
            if (matches.length === 1) links[abilityIdentity({ character, variant: variant.name })] = matches[0];
        }
    }
    return links;
}

export function englishAbility(files, links, item) {
    return files[EN_ABILITIES_PATH]?.[links[abilityIdentity(item)]];
}

/** Mirror the wiki's name-first, ability-fallback lookup to catch alias collisions. */
export function publishedAbilityLinks(files) {
    const names = new Map(), abilities = new Map(), links = {};
    for (const [key, pt] of Object.entries(files[PT_MAPPING_PATH] || {})) {
        if (!files[EN_ABILITIES_PATH]?.[key] || !clean(pt.name)) continue;
        names.set(clean(pt.name), key);
        if (clean(pt.ability)) abilities.set(clean(pt.ability).toLocaleLowerCase('pt-BR'), key);
    }
    for (const [path, data] of Object.entries(files)) {
        if (!data?.variants) continue;
        for (const variant of Object.values(data.variants).flat()) {
            const key = names.get(clean(variant.name)) || abilities.get(clean(variant.signature_ability?.name).toLocaleLowerCase('pt-BR'));
            if (key) links[abilityIdentity({ character: path.slice(5, -5), variant: variant.name })] = key;
        }
    }
    return links;
}
