// =====================================================
// SORTING AND FILTERING UTILITIES
// Logic for sorting and filtering variants
// =====================================================

import { RARITY_ORDER, ELEMENT_ORDER, ELEMENT_MAP, getElementMap } from '../config/constants.js';
import { parseStatValue } from './formatters.js';

/**
 * Sort variants based on sort configuration
 * @param {Array} variants - Array of variant objects
 * @param {Object} sortConfig - { type: string, direction: 'asc'|'desc' }
 * @returns {Array} Sorted variants
 */
export function sortVariants(variants, sortConfig) {
    const { type, direction } = sortConfig;
    const elementMap = getElementMap();

    return [...variants].sort((a, b) => {
        let valA, valB;

        switch (type) {
            case 'score':
                valA = parseStatValue(a.stats?.power);
                valB = parseStatValue(b.stats?.power);
                break;
            case 'atk':
                valA = parseStatValue(a.stats?.attack);
                valB = parseStatValue(b.stats?.attack);
                break;
            case 'hp':
                valA = parseStatValue(a.stats?.health);
                valB = parseStatValue(b.stats?.health);
                break;
            case 'name':
                valA = a.name;
                valB = b.name;
                break;
            case 'element':
                // Support both PT and EN element names
                valA = ELEMENT_ORDER[a.element] || (elementMap[a.element] ? Object.values(ELEMENT_ORDER).length + 1 : 99);
                valB = ELEMENT_ORDER[b.element] || (elementMap[b.element] ? Object.values(ELEMENT_ORDER).length + 1 : 99);
                // Use the element map's key for ordering
                const infoA = elementMap[a.element];
                const infoB = elementMap[b.element];
                if (infoA) valA = Object.keys(ELEMENT_ORDER).indexOf(Object.keys(ELEMENT_MAP).find(k => ELEMENT_MAP[k].key === infoA.key)) + 1 || 99;
                if (infoB) valB = Object.keys(ELEMENT_ORDER).indexOf(Object.keys(ELEMENT_MAP).find(k => ELEMENT_MAP[k].key === infoB.key)) + 1 || 99;
                break;
            case 'class':
                valA = RARITY_ORDER[a.rarityKey] || 0;
                valB = RARITY_ORDER[b.rarityKey] || 0;
                break;
            default:
                valA = a.name;
                valB = b.name;
        }

        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

/**
 * Filter variants based on active filters
 * @param {Array} variants - Array of variant objects
 * @param {Object} filters - { rarity: string[], element: string[] }
 * @returns {Array} Filtered variants
 */
export function filterVariants(variants, filters) {
    let filtered = variants;
    const elementMap = getElementMap();

    // Rarity Filter (multi-select)
    if (filters.rarity && filters.rarity.length > 0) {
        filtered = filtered.filter(v => filters.rarity.includes(v.rarityKey));
    }

    // Element Filter (multi-select)
    if (filters.element && filters.element.length > 0) {
        filtered = filtered.filter(v => {
            // Look up in the current element map (supports both PT and EN element names)
            const elementInfo = elementMap[v.element] || ELEMENT_MAP[v.element];
            return elementInfo && filters.element.includes(elementInfo.key);
        });
    }

    return filtered;
}

/**
 * Flatten variants from nested rarity structure
 * @param {Object} variantsObj - { diamante: [...], ouro: [...], ... }
 * @returns {Array} Flat array with rarityKey added to each variant
 */
export function flattenVariants(variantsObj) {
    if (!variantsObj) return [];

    const allVariants = [];
    Object.entries(variantsObj).forEach(([rarity, variants]) => {
        variants.forEach(v => {
            allVariants.push({ ...v, rarityKey: rarity });
        });
    });
    return allVariants;
}

