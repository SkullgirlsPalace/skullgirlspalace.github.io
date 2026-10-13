// =====================================================
// NEW CONTENT CONFIGURATION
// Registry of recently added or heavily modified characters/variants
// =====================================================

import { getState } from '../state/store.js';
import { flattenVariants } from '../utils/variantUtils.js';

// Nomes das variantes que ganharam destaque NEW
export const NEW_VARIANTS = [
    "Garota dos Sonhos",
    "Chamego"
];

/**
 * Checks if a variant name represents currently new/featured content.
 * @param {string} variantName 
 * @returns {boolean}
 */
export function isNewVariant(variantName) {
    if (!variantName) return false;
    const normalizedName = variantName.trim().toLowerCase();
    return NEW_VARIANTS.some(name => name.toLowerCase() === normalizedName);
}

/**
 * Checks if a base character possesses any new/featured variants.
 * @param {string} charKey 
 * @returns {boolean}
 */
export function isNewCharacter(charKey) {
    const charData = getState().characters?.[charKey];
    if (!charData) return false;

    const allVariants = flattenVariants(charData.variants);
    return allVariants.some(v => isNewVariant(v.name));
}
