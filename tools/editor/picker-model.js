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
    if (filters.sort === 'catalog') return items;
    const classOrder = { Ofensivo: 1, Coringa: 2, Defensivo: 3, 'Suporte de Utilidade': 4 };
    const stat = (item, key) => Number(String(item.data.stats?.[key] ?? '').replace(/[,.]/g, '')) || 0;
    const value = item => ({ name: normalized(item.variant), rarity: RARITY_ORDER[item.rarity], element: ELEMENT_ORDER[item.data.element], class: classOrder[classesFor(item.variant)[0]], score: stat(item, 'power'), atk: stat(item, 'attack'), hp: stat(item, 'health') })[filters.sort];
    return items.sort((a, b) => {
        const first = value(a), second = value(b), direction = filters.direction === 'asc' ? 1 : -1;
        return first < second ? -direction : first > second ? direction : normalized(a.variant).localeCompare(normalized(b.variant));
    });
}
