import { ELEMENT_ORDER, RARITY_ORDER } from '../../src/config/constants.js';

const normalized = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const emptyPickerFilters = () => ({ query: '', character: '', rarity: [], element: [], classes: [], effects: [], effectMatch: 'any', sort: 'catalog', direction: 'desc', preset: '', effectQuery: '' });

/** Category groups intersect; selections within a group match any selected value. */
export function pickerItems(catalog, filters, { classesFor, englishFor, effects, presets }) {
    const query = normalized(filters.query).trim();
    const preset = presets.find(item => item.id === filters.preset);
    const items = catalog.filter(item => {
        const en = englishFor(item);
        if (query && !normalized([item.variant, item.characterName, en?.name].join(' ')).includes(query)) return false;
        if (filters.character && item.character !== filters.character) return false;
        if (filters.rarity.length && !filters.rarity.includes(item.rarity)) return false;
        if (filters.element.length && !filters.element.includes(item.data.element)) return false;
        if (filters.classes.length && !classesFor(item.variant).some(name => filters.classes.includes(name))) return false;
        if (preset && !preset.members.some(member => member.character === item.character && member.variant === item.variant)) return false;
        if (filters.effects.length) {
            const description = normalized([item.data.signature_ability?.description, en?.SA1, en?.SA2].join(' '));
            const match = key => effects[key]?.keys.some(term => description.includes(normalized(term))) || false;
            if (!(filters.effectMatch === 'all' ? filters.effects.every(match) : filters.effects.some(match))) return false;
        }
        return true;
    });
    if (filters.sort === 'catalog' && !filters.classes.length) return items;
    const classOrder = { Ofensivo: 1, Coringa: 2, Defensivo: 3, 'Suporte de Utilidade': 4 };
    const stat = (item, key) => Number(String(item.data.stats?.[key] ?? '').replace(/[,.]/g, '')) || 0;
    const value = item => ({ name: normalized(item.variant), rarity: RARITY_ORDER[item.rarity], element: ELEMENT_ORDER[item.data.element], class: classOrder[classesFor(item.variant)[0]], score: stat(item, 'power'), atk: stat(item, 'attack'), hp: stat(item, 'health') })[filters.sort];
    return items.sort((a, b) => {
        const direction = filters.direction === 'asc' ? 1 : -1;
        if (filters.classes.length) {
            const rarityA = RARITY_ORDER[a.rarity] || 0, rarityB = RARITY_ORDER[b.rarity] || 0;
            if (rarityA !== rarityB) return (rarityA - rarityB) * direction;
            const primaryA = filters.classes.includes(classesFor(a.variant)[0]);
            const primaryB = filters.classes.includes(classesFor(b.variant)[0]);
            if (primaryA !== primaryB) return primaryA ? -1 : 1;
        }
        if (filters.sort === 'catalog') return 0;
        const first = value(a), second = value(b);
        return first < second ? -direction : first > second ? direction : normalized(a.variant).localeCompare(normalized(b.variant));
    });
}
