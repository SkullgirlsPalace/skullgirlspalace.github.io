// =====================================================
// DATA INTERNATIONALIZATION MODULE
// Maps variant names between PT-BR and English
// Uses Krazete data as English source
// =====================================================

import { getCurrentLanguage } from './translations.js';
import { getState } from '../state/store.js';

// Cache for loaded Krazete data
let krazeteEN = null;
let krazetePTBR = null;
let nameMapping = null; // PT-BR name -> { enName, ability, SA1, SA2 }
let abilityMapping = null; // PT-BR ability name -> English variant data
let editorialCharacters;
let editorialAbilities = new Map();

// Reuse the already loaded character JSONs; no new request or boot dependency.
function editorialAbility(ptName) {
  const characters = getState().characters;
  if (characters !== editorialCharacters) {
    editorialCharacters = characters;
    editorialAbilities = new Map();
    for (const character of Object.values(characters || {})) {
      for (const variant of Object.values(character.variants || {}).flat()) {
        const name = cleanName(variant.name);
        editorialAbilities.set(name, editorialAbilities.has(name) ? null : variant.signature_ability);
      }
    }
  }
  return editorialAbilities.get(cleanName(ptName));
}

function variantTranslation(ptName, abilityNamePTBR = '') {
  const source = krazeteEN?.[editorialAbility(ptName)?.krazete_id];
  return source || nameMapping?.[cleanName(ptName)] || getTranslationByAbility(abilityNamePTBR);
}

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
  abilityMapping = {};

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

    // Local variant names are sometimes manually revised and no longer match
    // Krazete's PT-BR name. The signature ability is a stable secondary key.
    const ptAbility = cleanName(ptData.ability).toLocaleLowerCase('pt-BR');
    if (ptAbility) {
      abilityMapping[ptAbility] = nameMapping[ptName];
    }
  }

  return nameMapping;
}

/**
 * Get English translation for a variant name
 * @param {string} ptName - PT-BR variant name
 * @returns {Promise<string>} English name or original if not found
 */
export async function getEnglishVariantName(ptName) {
  await buildNameMapping();
  return cleanName(variantTranslation(ptName)?.name) || ptName;
}

/**
 * Get English ability name for a variant
 * @param {string} ptName - PT-BR variant name
 * @returns {Promise<string>} English ability name or empty string
 */
export async function getEnglishAbilityName(ptName) {
  await buildNameMapping();
  return editorialAbility(ptName)?.english?.name || cleanName(variantTranslation(ptName)?.ability) || '';
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
export function getLocalizedNameSync(ptName, abilityNamePTBR = '') {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') return ptName;
  return cleanName(variantTranslation(ptName, abilityNamePTBR)?.name) || ptName;
}

/** Return the available translated name pair for a Palace variant name. */
export function getVariantNamePairSync(ptName, abilityNamePTBR = '') {
  const cleanPtName = cleanName(ptName);
  const translation = variantTranslation(cleanPtName, abilityNamePTBR);
  return {
    ptBR: ptName || '',
    en: cleanName(translation?.name) || ptName || ''
  };
}

function getTranslationByAbility(abilityNamePTBR) {
  if (!abilityMapping || !abilityNamePTBR) return null;
  return abilityMapping[cleanName(abilityNamePTBR).toLocaleLowerCase('pt-BR')] || null;
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
  return editorialAbility(ptName)?.english?.name || cleanName(variantTranslation(ptName, abilityNamePTBR)?.ability) || abilityNamePTBR;
}

/**
 * Synchronous localized SA description
 * @param {string} ptName - Variant name in PT-BR
 * @param {string} saDescPTBR - SA description in PT-BR (fallback)
 * @returns {string} Localized SA description or fallback
 */
export function getLocalizedSADescSync(ptName, saDescPTBR, abilityNamePTBR = '') {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') return saDescPTBR;
  const edited = editorialAbility(ptName)?.english?.description;
  if (edited) return edited;
  const data = variantTranslation(ptName, abilityNamePTBR);
  if (!data || !data.SA1) return saDescPTBR;
  let desc = `[SA1]: ${data.SA1}`;
  if (data.SA2) desc += `\n\n[SA2]: ${data.SA2}`;
  return desc;
}

// Export cache for direct access if needed
