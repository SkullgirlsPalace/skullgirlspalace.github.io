// =====================================================
// EXTRAS DATA HELPERS
// Utility functions for the variant extras system
// =====================================================

import { getExtrasGlobalData } from '../services/dataService.js';

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
    const allExtras = getExtrasGlobalData();
    if (allExtras && allExtras[charKey] && allExtras[charKey][variantName]) {
        return allExtras[charKey][variantName];
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
