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
    const res = await fetch('data/krazete/stanleyDB_ENGLISH.json');
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
    const res = await fetch('data/krazete/stanleyDB_PT-BR.json');
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
 * Get English SA1 for a variant
 * @param {string} ptName - PT-BR variant name
 * @returns {Promise<string>} English SA1 or empty string
 */
export async function getEnglishSA1(ptName) {
  const mapping = await buildNameMapping();
  const cleanPtName = cleanName(ptName);
  return mapping[cleanPtName]?.SA1 || '';
}

/**
 * Get English SA2 for a variant
 * @param {string} ptName - PT-BR variant name
 * @returns {Promise<string>} English SA2 or empty string
 */
export async function getEnglishSA2(ptName) {
  const mapping = await buildNameMapping();
  const cleanPtName = cleanName(ptName);
  return mapping[cleanPtName]?.SA2 || '';
}

/**
 * Get full English signature ability description
 * @param {string} ptName - PT-BR variant name
 * @returns {Promise<string>} Formatted English ability description
 */
export async function getEnglishSignatureAbility(ptName) {
  const mapping = await buildNameMapping();
  const cleanPtName = cleanName(ptName);
  const data = mapping[cleanPtName];

  if (!data || !data.SA1) {
    return '';
  }

  let desc = `[SA1]: ${data.SA1}`;
  if (data.SA2) {
    desc += `\n\n[SA2]: ${data.SA2}`;
  }

  return desc;
}

/**
 * Get English variant data for a PT-BR variant name
 * @param {string} ptName - Variant name in PT-BR
 * @returns {Promise<Object|null>} English variant data or null
 */
export async function getEnglishVariantData(ptName) {
  const mapping = await buildNameMapping();
  const cleanPtName = cleanName(ptName);
  return mapping[cleanPtName] || null;
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

/**
 * Clear cached mapping (call when language changes)
 */
export function clearTranslationCache() {
  nameMapping = null;
}

/**
 * Get translation mapping (for compatibility)
 * @returns {Promise<Object>} Complete mapping object
 */
export async function getTranslationMapping() {
  return buildNameMapping();
}

/**
 * Update all variant cards with English translations
 * Call this after language change (deprecated - use reactive approach instead)
 */
export async function updateVariantTranslations() {
  const lang = getCurrentLanguage();
  if (lang === 'pt-BR') return;

  const mapping = await buildNameMapping();

  // Update variant names in cards
  document.querySelectorAll('.variant-header h3').forEach(el => {
    const ptName = el.textContent.trim();
    if (mapping[ptName]) {
      el.textContent = mapping[ptName].name;
    }
  });

  // Update ability names
  document.querySelectorAll('.ability-box h4 span:last-child').forEach(el => {
    const abilityName = el.textContent.trim();
    const card = el.closest('.variant-card');
    if (card) {
      const nameEl = card.querySelector('.variant-header h3');
      if (nameEl) {
        const enName = nameEl.textContent.trim();
        for (const [ptName, enData] of Object.entries(mapping)) {
          if (enData.name === enName) {
            el.textContent = enData.ability.toUpperCase();
            break;
          }
        }
      }
    }
  });

  // Update SA descriptions
  document.querySelectorAll('.ability-box p').forEach(el => {
    const card = el.closest('.variant-card');
    if (!card) return;

    const nameEl = card.querySelector('.variant-header h3');
    if (!nameEl) return;

    const enName = nameEl.textContent.trim();
    for (const [ptName, enData] of Object.entries(mapping)) {
      if (enData.name === enName) {
        const currentText = el.textContent;
        if (currentText.includes('[HAB') || currentText.includes('[SA')) {
          let newDesc = `[SA1]: ${enData.SA1}`;
          if (enData.SA2) {
            newDesc += `\n\n[SA2]: ${enData.SA2}`;
          }
          el.textContent = newDesc;
        }
        break;
      }
    }
  });
}

// Export cache for direct access if needed
export { krazeteEN, krazetePTBR };
