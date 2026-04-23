// =====================================================
// SORTING AND FILTERING UTILITIES
// Logic for sorting and filtering variants
// =====================================================

import { RARITY_ORDER, ELEMENT_ORDER, ELEMENT_MAP } from '../config/constants.js';
import { parseStatValue } from './formatters.js';
import { getVariantClasses, CLASS_ORDER } from '../data/variantClasses.js';
import { isNewVariant } from '../data/newContent.js';

/**
 * Sort variants based on sort configuration
 * @param {Array} variants - Array of variant objects
 * @param {Object} sortConfig - { type: string, direction: 'asc'|'desc' }
 * @returns {Array} Sorted variants
 */
export function sortVariants(variants, sortConfig, filters = null) {
    const { type, direction } = sortConfig;

    return [...variants].sort((a, b) => {
        // Priority Sort: 'NOVO' variants float to top IF there are no active grouping filters (rarity/element)
        // AND the user hasn't explicitly changed the sorting (default is score desc).
        const noGroupingFiltersActive = !filters || (
            (!filters.rarity || filters.rarity.length === 0) &&
            (!filters.element || filters.element.length === 0)
        );
        const isDefaultSort = type === 'score' && direction === 'desc';

        if (noGroupingFiltersActive && isDefaultSort) {
            const isANew = isNewVariant(a.name);
            const isBNew = isNewVariant(b.name);

            if (isANew !== isBNew) {
                // Return -1 to push new variants up regardless of `direction` for normal base sorting
                return isANew ? -1 : 1; 
            }
        }

        // Enforce Rarity as Primary Sort (Diamond <-> Bronze)
        // Note: RARITY_ORDER has Diamond = 4, Bronze = 1
        const rarityA = RARITY_ORDER[a.rarityKey] || 0;
        const rarityB = RARITY_ORDER[b.rarityKey] || 0;

        if (rarityA !== rarityB) {
            return direction === 'desc' ? (rarityB - rarityA) : (rarityA - rarityB);
        }

        // Secondary Sort (User's chosen criterion)
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
                valA = ELEMENT_ORDER[a.element] || 99;
                valB = ELEMENT_ORDER[b.element] || 99;
                break;
            case 'class':
                const classesA = getVariantClasses(a.name);
                const classesB = getVariantClasses(b.name);
                valA = CLASS_ORDER[classesA[0]] || 99;
                valB = CLASS_ORDER[classesB[0]] || 99;
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

    // Rarity Filter (multi-select)
    if (filters.rarity && filters.rarity.length > 0) {
        filtered = filtered.filter(v => filters.rarity.includes(v.rarityKey));
    }

    // Element Filter (multi-select)
    if (filters.element && filters.element.length > 0) {
        filtered = filtered.filter(v => {
            const elementInfo = ELEMENT_MAP[v.element];
            return elementInfo && filters.element.includes(elementInfo.key);
        });
    }

    // Class/Role Filter (multi-select)
    if (filters.variantClass && filters.variantClass.length > 0) {
        filtered = filtered.filter(v => {
            const classes = getVariantClasses(v.name);
            return classes.some(cls => filters.variantClass.includes(cls));
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
