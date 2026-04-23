// =====================================================
// ELEMENT EFFECTS DATA
// Per-variant element buff/debuff tables for 5 specific
// variants that grant effects based on element type.
// =====================================================

import { getCurrentLanguage } from '../i18n/translations.js';

/**
 * Each entry maps a variant name to its element-based effects.
 * - buffs: object of PT-BR element key → array of buff names (PT-BR)
 * - debuffs: (optional) object of PT-BR element key → array of debuff names (PT-BR)
 * - buffs_en: object of EN element key → array of buff names (EN)
 * - debuffs_en: (optional) object of EN element key → array of debuff names (EN)
 *
 * The element icons are resolved from ELEMENT_MAP in constants.js
 */
export const ELEMENT_EFFECTS = {
  "Isca Sortuda": {
    buffs: {
      "Ar": ["Regenera\u00e7\u00e3o"],
      "Fogo": ["Inabal\u00e1vel"],
      "\u00c1gua": ["Acelera\u00e7\u00e3o"],
      "Trevas": ["F\u00faria"],
      "Luz": ["Precis\u00e3o"],
      "Neutro": ["Barreira"]
    },
    buffs_en: {
      "Wind": ["Regen"],
      "Fire": ["Unflinching"],
      "Water": ["Haste"],
      "Dark": ["Enrage"],
      "Light": ["Precision"],
      "Neutral": ["Barrier"]
    }
  },

  "\u00cdris-Color": {
    buffs: {
      "Ar": ["Regenera\u00e7\u00e3o Forte"],
      "Fogo": ["F\u00faria (x2)"],
      "\u00c1gua": ["Armadura (x2)"],
      "Trevas": ["Acelera\u00e7\u00e3o"],
      "Luz": ["Imunidade"],
      "Neutro": []
    },
    buffs_en: {
      "Wind": ["Heavy Regen"],
      "Fire": ["Enrage (x2)"],
      "Water": ["Armor (x2)"],
      "Dark": ["Haste"],
      "Light": ["Immunity"],
      "Neutral": []
    },
    debuffs: {
      "Ar": ["Desativar Blockbusters"],
      "Fogo": ["Sangramento"],
      "\u00c1gua": ["Incapacita\u00e7\u00e3o"],
      "Trevas": ["Bloqueio de Cura"],
      "Luz": ["Feiti\u00e7o"],
      "Neutro": []
    },
    debuffs_en: {
      "Wind": ["Disable Blockbusters"],
      "Fire": ["Bleed"],
      "Water": ["Cripple"],
      "Dark": ["Heal Block"],
      "Light": ["Curse"],
      "Neutral": []
    }
  },

  "Confus\u00e3o Interior": {
    buffs: {
      "Ar": ["Regenera\u00e7\u00e3o"],
      "Fogo": ["F\u00faria"],
      "\u00c1gua": ["Armadura"],
      "Trevas": ["Espinhos"],
      "Luz": ["Ben\u00e7\u00e3o"],
      "Neutro": ["Barreira"]
    },
    buffs_en: {
      "Wind": ["Regen"],
      "Fire": ["Enrage"],
      "Water": ["Armor"],
      "Dark": ["Thorns"],
      "Light": ["Blessing"],
      "Neutral": ["Barrier"]
    }
  },

  "Plumagem Prism\u00e1tica": {
    buffs: {
      "Ar": ["Esquiva", "Regenera\u00e7\u00e3o"],
      "Fogo": ["Precis\u00e3o (x3)", "F\u00faria"],
      "\u00c1gua": ["Bloqueio Autom\u00e1tico", "Armadura"],
      "Trevas": ["Espinhos", "Acelera\u00e7\u00e3o"],
      "Luz": ["Inabal\u00e1vel", "Imunidade"],
      "Neutro": ["Miasma", "Barreira"]
    },
    buffs_en: {
      "Wind": ["Evasion", "Regen"],
      "Fire": ["Precision (x3)", "Enrage"],
      "Water": ["Auto Block", "Armor"],
      "Dark": ["Thorns", "Haste"],
      "Light": ["Unflinching", "Immunity"],
      "Neutral": ["Miasma", "Barrier"]
    },
    debuffs: {
      "Ar": ["Sangramento"],
      "Fogo": ["Incapacita\u00e7\u00e3o"],
      "\u00c1gua": ["Quebra de Armadura"],
      "Trevas": ["Definhar"],
      "Luz": ["Polaridade Inversa"],
      "Neutro": ["Feiti\u00e7o"]
    },
    debuffs_en: {
      "Wind": ["Bleed"],
      "Fire": ["Cripple"],
      "Water": ["Armor Break"],
      "Dark": ["Wither"],
      "Light": ["Inverse Polarity"],
      "Neutral": ["Curse"]
    }
  },

  "Visitante do Espa\u00e7o": {
    buffs: {
      "Ar": ["Regenera\u00e7\u00e3o"],
      "Fogo": ["F\u00faria"],
      "\u00c1gua": ["Armadura"],
      "Trevas": ["Espinhos"],
      "Luz": ["Ben\u00e7\u00e3o"],
      "Neutro": ["Barreira"]
    },
    buffs_en: {
      "Wind": ["Regen"],
      "Fire": ["Enrage"],
      "Water": ["Armor"],
      "Dark": ["Thorns"],
      "Light": ["Blessing"],
      "Neutral": ["Barrier"]
    }
  }
};

/**
 * Check if a variant has element effects data
 * @param {string} variantName - Name of the variant
 * @returns {boolean}
 */
export function hasElementEffects(variantName) {
  return variantName in ELEMENT_EFFECTS;
}

/**
 * Get the element effects for a variant, localized to the given language.
 * @param {string} variantName - Name of the variant
 * @param {string} [lang] - Language code ('pt-BR' or 'en'). Defaults to current language.
 * @returns {Object|null} Element effects with localized keys and effect names
 */
export function getElementEffects(variantName, lang) {
  const currentLang = lang || getCurrentLanguage();
  const data = ELEMENT_EFFECTS[variantName];
  if (!data) return null;
  if (currentLang === 'pt-BR') return data;

  // Build EN version with EN element keys and EN effect names
  const result = {};
  if (data.buffs_en) {
    result.buffs = data.buffs_en;
  }
  if (data.debuffs_en) {
    result.debuffs = data.debuffs_en;
  }
  return result;
}
