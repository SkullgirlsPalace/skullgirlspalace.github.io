// =====================================================
// NEW CONTENT CONFIGURATION
// Registry of recently added or heavily modified characters/variants
// =====================================================

import { getCharacter } from '../services/dataService.js';
import { flattenVariants } from '../utils/sorting.js';

// Nomes das variantes que ganharam destaque NEW
export const NEW_VARIANTS = [
    "Poder Floral",
    "Ouro Maciço",
    "Guardião do Cometa"
];

/**
 * Checks if a variant name represents currently new/featured content.
 * @param {string} variantName 
 * @returns {boolean}
 */
export function isNewVariant(variantName) {
    return NEW_VARIANTS.includes(variantName);
}

/**
 * Checks if a base character possesses any new/featured variants.
 * @param {string} charKey 
 * @returns {boolean}
 */
export function isNewCharacter(charKey) {
    const charData = getCharacter(charKey);
    if (!charData) return false;

    const allVariants = flattenVariants(charData.variants);
    return allVariants.some(v => isNewVariant(v.name));
}
