// =====================================================
// DATA INTERNATIONALIZATION MODULE
// Maps variant names between PT-BR and English
// Uses Krazete data as English source
// =====================================================

import { getCurrentLanguage } from './translations.js';

// Cache for loaded Krazete data
let krazeteEN = null;
let krazetePTBR = null;
let nameMapping = null; // PT-BR name -> { enName, ability, SA1, SA2 }

/**
 * Load Krazete English data
 * @returns {Promise<Object>} English variant data
 */
async function loadKrazeteEN() {
  if (krazeteEN) return krazeteEN;

  try {
    const res = await fetch('data/krazete/ENGLISH-Variants.json');
    krazeteEN = await res.json();
    return krazeteEN;
  } catch (err) {
    console.warn('Could not load Krazete EN data:', err);
    return {};
  }
}

/**
 * Load Krazete PT-BR data (for mapping)
 * @returns {Promise<Object>} PT-BR variant data
 */
async function loadKrazetePTBR() {
  if (krazetePTBR) return krazetePTBR;

  try {
    const res = await fetch('data/krazete/PT-BR-Variantes.json');
    krazetePTBR = await res.json();
    return krazetePTBR;
  } catch (err) {
    console.warn('Could not load Krazete PT-BR data:', err);
    return {};
  }
}

/**
 * Clean name by removing \r and extra whitespace
 * @param {string} name - Name to clean
 * @returns {string} Cleaned name
 */
function cleanName(name) {
  if (!name) return '';
  return name.replace(/\r/g, '').trim();
}

/**
 * Build the name mapping from PT-BR to English
 * Must be called after loading both datasets
 */
async function buildNameMapping() {
  if (nameMapping) return nameMapping;

  const [enData, ptbrData] = await Promise.all([
    loadKrazeteEN(),
    loadKrazetePTBR()
  ]);

  nameMapping = {};

  // For each key in PT-BR data, create a mapping
  for (const [key, ptData] of Object.entries(ptbrData)) {
    const enDataForKey = enData[key];
    if (!enDataForKey || !ptData) continue;

    const ptName = cleanName(ptData.name);
    if (!ptName) continue;

    // Store the mapping with English data
    nameMapping[ptName] = {
      name: cleanName(enDataForKey.name),
      ability: cleanName(enDataForKey.ability),
      SA1: enDataForKey.SA1,
      SA2: enDataForKey.SA2
    };
  }

  return nameMapping;
}

/**
 * Get English translation for a variant name
 * @param {string} ptName - PT-BR variant name
 * @returns {Promise<string>} English name or original if not found
 */
export async function getEnglishVariantName(ptName) {
  const mapping = await buildNameMapping();
  const cleanPtName = cleanName(ptName);
  return mapping[cleanPtName]?.name || ptName;
}

/**
 * Get English ability name for a variant
 * @param {string} ptName - PT-BR variant name
 * @returns {Promise<string>} English ability name or empty string
 */
export async function getEnglishAbilityName(ptName) {
  const mapping = await buildNameMapping();
  const cleanPtName = cleanName(ptName);
  return mapping[cleanPtName]?.ability || '';
}

/**
 * Preload all Krazete data for faster access
 */
export async function preloadKrazeteData() {
  await buildNameMapping();
}

/**
 * Get localized variant name based on current language
 * @param {string} ptName - Variant name in PT-BR
 * @returns {Promise<string>} Localized name based on current language
 */
export async function getLocalizedName(ptName) {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') {
    return ptName;
  }
  return getEnglishVariantName(ptName);
}

/**
 * Get localized ability name
 * @param {string} ptName - Variant name in PT-BR
 * @param {string} abilityNamePTBR - Ability name in PT-BR (unused, kept for compatibility)
 * @returns {Promise<string>} Localized ability name
 */
export async function getLocalizedAbilityName(ptName, abilityNamePTBR) {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') {
    return abilityNamePTBR;
  }
  return getEnglishAbilityName(ptName);
}
// These read from the cached nameMapping, so they only
// work after preloadKrazeteData() has resolved.
// Use them in synchronous render paths (e.g. VariantCard.js).
// =====================================================

/**
 * Synchronous localized variant name (English if lang !== pt-BR)
 * @param {string} ptName - Variant name in PT-BR
 * @returns {string} Localized name or fallback to ptName
 */
export function getLocalizedNameSync(ptName) {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') return ptName;
  if (!nameMapping) return ptName; // Fallback if not loaded yet
  const cleanPtName = cleanName(ptName);
  return nameMapping[cleanPtName]?.name || ptName;
}

/**
 * Synchronous localized ability name
 * @param {string} ptName - Variant name in PT-BR
 * @param {string} abilityNamePTBR - Ability name in PT-BR
 * @returns {string} Localized ability name or fallback
 */
export function getLocalizedAbilityNameSync(ptName, abilityNamePTBR) {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') return abilityNamePTBR;
  if (!nameMapping) return abilityNamePTBR;
  const cleanPtName = cleanName(ptName);
  return nameMapping[cleanPtName]?.ability || abilityNamePTBR;
}

/**
 * Synchronous localized SA description
 * @param {string} ptName - Variant name in PT-BR
 * @param {string} saDescPTBR - SA description in PT-BR (fallback)
 * @returns {string} Localized SA description or fallback
 */
export function getLocalizedSADescSync(ptName, saDescPTBR) {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') return saDescPTBR;
  if (!nameMapping) return saDescPTBR;
  const cleanPtName = cleanName(ptName);
  const data = nameMapping[cleanPtName];
  if (!data || !data.SA1) return saDescPTBR;
  let desc = `[SA1]: ${data.SA1}`;
  if (data.SA2) desc += `\n\n[SA2]: ${data.SA2}`;
  return desc;
}

// Export cache for direct access if needed
