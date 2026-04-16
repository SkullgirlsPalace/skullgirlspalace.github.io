// =====================================================
// EXTRAS DATA HELPERS
// Utility functions for the variant extras system
// =====================================================

import { getCharacter } from '../services/dataService.js';

/**
 * Check if a variant has extras data
 * @param {string} charKey - Character key (e.g. 'parasoul')
 * @param {string} variantName - Variant name (e.g. 'Indômita')
 * @returns {boolean}
 */
export function hasExtras(charKey, variantName) {
    const extras = getExtrasData(charKey, variantName);
    return !!extras;
}

/**
 * Get extras data for a specific variant
 * @param {string} charKey - Character key
 * @param {string} variantName - Variant name
 * @returns {Object|null} Extras data or null
 */
export function getExtrasData(charKey, variantName) {
    const charData = getCharacter(charKey);
    if (!charData || !charData.variants) return null;

    // Search through all rarity tiers
    for (const rarity of Object.values(charData.variants)) {
        if (!Array.isArray(rarity)) continue;
        for (const variant of rarity) {
            if (variant.name === variantName && variant.extras) {
                return variant.extras;
            }
        }
    }
    return null;
}

/**
 * Check if a variant has guild recommendations
 * @param {string} charKey
 * @param {string} variantName
 * @returns {boolean}
 */
export function hasGuildData(charKey, variantName) {
    const extras = getExtrasData(charKey, variantName);
    return !!(extras?.guildas?.available && extras.guildas.bosses?.length > 0);
}

/**
 * Check if a variant has rift battle data
 * @param {string} charKey
 * @param {string} variantName
 * @returns {boolean}
 */
export function hasRiftData(charKey, variantName) {
    const extras = getExtrasData(charKey, variantName);
    return !!(extras?.batalhas_fenda?.defesa);
}
