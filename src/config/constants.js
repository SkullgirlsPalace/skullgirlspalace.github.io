// =====================================================
// CONFIGURATION CONSTANTS
// Extracted from script.js for modularity
// =====================================================

import { getCurrentLanguage } from '../i18n/index.js';

export const CHARACTER_FILES = [
 'annie.json', 'beowulf.json', 'big-band.json', 'black-dahlia.json',
 'cerebella.json', 'double.json', 'eliza.json', 'filia.json',
 'fukua.json', 'marie.json', 'ms-fortune.json', 'painwheel.json',
 'parasoul.json', 'peacock.json', 'robo-fortune.json', 'squigly.json',
 'umbrella.json', 'valentine.json'
];

export const CHARACTER_ICONS = {
 'annie': 'img/select_character/Annie_Icon2.webp',
 'beowulf': 'img/select_character/Beowulf_Icon2.webp',
 'big-band': 'img/select_character/bigband_icon2.webp',
 'black-dahlia': 'img/select_character/black_dahlia_icon2.webp',
 'cerebella': 'img/select_character/cerebella_icon2.webp',
 'double': 'img/select_character/double_icon2.webp',
 'eliza': 'img/select_character/eliza_icon2.webp',
 'filia': 'img/select_character/filia_icon2.webp',
 'fukua': 'img/select_character/fukua_icon2.webp',
 'marie': 'img/select_character/marie_icon2.webp',
 'ms-fortune': 'img/select_character/msfortune_icon2.webp',
 'painwheel': 'img/select_character/painwhell_icon2.webp',
 'parasoul': 'img/select_character/parasoul_icon2.webp',
 'peacock': 'img/select_character/peacock2.webp',
 'robo-fortune': 'img/select_character/robo_fortune_icon2.webp',
 'squigly': 'img/select_character/squigly_icon2.webp',
 'umbrella': 'img/select_character/umbrella_icon2.webp',
 'valentine': 'img/select_character/valentine_icon2.webp'
};

export const CHARACTER_COLORS = {
 'annie': '#00a8a8', 'beowulf': '#858585', 'big-band': '#808040',
 'black-dahlia': '#3e003e', 'cerebella': '#ff5402', 'double': '#5050a3',
 'eliza': '#ffd700', 'filia': '#000000', 'fukua': '#006000',
 'marie': '#888888', 'ms-fortune': '#0099ff', 'painwheel': '#797900',
 'parasoul': '#ff0000', 'peacock': '#c60000', 'robo-fortune': '#005151',
 'squigly': '#800080', 'umbrella': '#ffff00', 'valentine': '#FFFFFF'
};

// ── Element Maps (PT-BR and EN) ─────────────────────────
const ELEMENT_MAP_PT = {
 'Fogo': { class: 'fire', icon: '\u{1F525}', key: 'fogo', iconPath: 'img/official/ElementalFireBackless.webp', statIcon: 'img/official/ElementalIconFire.webp' },
 '\u00C1gua': { class: 'water', icon: '\u{1F4A7}', key: 'agua', iconPath: 'img/official/ElementalWaterBackless.webp', statIcon: 'img/official/ElementalIconWater.webp' },
 'Ar': { class: 'wind', icon: '\u{1F32A}\uFE0F', key: 'ar', iconPath: 'img/official/ElementalWindBackless.webp', statIcon: 'img/official/ElementalIconWind.webp' },
 'Luz': { class: 'light', icon: '\u2600\uFE0F', key: 'luz', iconPath: 'img/official/ElementalLightBackless.webp', statIcon: 'img/official/ElementalIconLight.webp' },
 'Trevas': { class: 'dark', icon: '\u{1F319}', key: 'trevas', iconPath: 'img/official/ElementalDarkBackless.webp', statIcon: 'img/official/ElementalIconDark.webp' },
 'Neutro': { class: 'neutral', icon: '\u26AA', key: 'neutro', iconPath: 'img/official/ElementalNeutralBackless.webp', statIcon: 'img/official/ElementalIconNeutral.webp' }
};

const ELEMENT_MAP_EN = {
 'Fire': { class: 'fire', icon: '\u{1F525}', key: 'fogo', iconPath: 'img/official/ElementalFireBackless.webp', statIcon: 'img/official/ElementalIconFire.webp' },
 'Water': { class: 'water', icon: '\u{1F4A7}', key: 'agua', iconPath: 'img/official/ElementalWaterBackless.webp', statIcon: 'img/official/ElementalIconWater.webp' },
 'Wind': { class: 'wind', icon: '\u{1F32A}\uFE0F', key: 'ar', iconPath: 'img/official/ElementalWindBackless.webp', statIcon: 'img/official/ElementalIconWind.webp' },
 'Light': { class: 'light', icon: '\u2600\uFE0F', key: 'luz', iconPath: 'img/official/ElementalLightBackless.webp', statIcon: 'img/official/ElementalIconLight.webp' },
 'Dark': { class: 'dark', icon: '\u{1F319}', key: 'trevas', iconPath: 'img/official/ElementalDarkBackless.webp', statIcon: 'img/official/ElementalIconDark.webp' },
 'Neutral': { class: 'neutral', icon: '\u26AA', key: 'neutro', iconPath: 'img/official/ElementalNeutralBackless.webp', statIcon: 'img/official/ElementalIconNeutral.webp' }
};

/**
 * Get the ELEMENT_MAP appropriate for the current language.
 * When EN, merges EN keys on top of PT keys so both work for lookups.
 * @returns {Object} element map
 */
export function getElementMap() {
 return getCurrentLanguage() === 'en'
  ? { ...ELEMENT_MAP_PT, ...ELEMENT_MAP_EN }
  : ELEMENT_MAP_PT;
}

// Keep ELEMENT_MAP as the pt-BR version for backward compat
export const ELEMENT_MAP = ELEMENT_MAP_PT;

export const RARITY_ORDER = { 'diamante': 4, 'ouro': 3, 'prata': 2, 'bronze': 1 };
export const ELEMENT_ORDER = { 'Fogo': 1, '\u00C1gua': 2, 'Ar': 3, 'Luz': 4, 'Trevas': 5, 'Neutro': 6 };

// ── Rarity Labels (PT-BR and EN) ────────────────────────
const RARITY_LABELS_PT = {
 'diamante': 'DIAMANTE',
 'ouro': 'OURO',
 'prata': 'PRATA',
 'bronze': 'BRONZE'
};

const RARITY_LABELS_EN = {
 'diamante': 'DIAMOND',
 'ouro': 'GOLD',
 'prata': 'SILVER',
 'bronze': 'BRONZE'
};

/**
 * Get rarity labels for current language
 * @returns {Object} rarity labels map
 */
export function getRarityLabels() {
 return getCurrentLanguage() === 'en' ? RARITY_LABELS_EN : RARITY_LABELS_PT;
}

/** Get the localized display label for a rarity given its PT-BR key */
export function getLocalizedRarityLabel(rarityKey) {
 const labels = getRarityLabels();
 return labels[rarityKey] || rarityKey;
}

// Keep original export for backward compat
export const RARITY_LABELS = RARITY_LABELS_PT;

export const RARITY_ICONS = {
 'diamante': 'img/official/icone_diamante.webp',
 'ouro': 'img/official/icone_ouro.webp',
 'prata': 'img/official/icone_prata.webp',
 'bronze': 'img/official/icone_bronze.webp'
};

export const TIER_RANKS = ['SS', 'S', 'A', 'B', 'C', 'I', 'N/A'];

// ── Element name translation helpers ────────────────────
const ELEMENT_PT_TO_EN = {
 'Fogo': 'Fire',
 '\u00C1gua': 'Water',
 'Ar': 'Wind',
 'Luz': 'Light',
 'Trevas': 'Dark',
 'Neutro': 'Neutral'
};

const ELEMENT_EN_TO_PT = {
 'Fire': 'Fogo', 'Water': '\u00C1gua', 'Wind': 'Ar', 'Air': 'Ar',
 'Light': 'Luz', 'Dark': 'Trevas', 'Neutral': 'Neutro',
 'fire': 'Fogo', 'water': '\u00C1gua', 'wind': 'Ar', 'air': 'Ar',
 'light': 'Luz', 'dark': 'Trevas', 'neutral': 'Neutro'
};

/**
 * Translate a PT-BR element name to English
 * @param {string} ptElement - Portuguese element name (e.g. 'Fogo')
 * @returns {string} English element name (e.g. 'Fire')
 */
export function elementToEN(ptElement) {
 return ELEMENT_PT_TO_EN[ptElement] || ptElement;
}

/**
 * Translate an English element name to PT-BR (for internal key lookup)
 * @param {string} enElement - English element (e.g. 'Fire')
 * @returns {string} Portuguese element name (e.g. 'Fogo')
 */
export function elementToPT(enElement) {
 return ELEMENT_EN_TO_PT[enElement] || enElement;
}

/** Get the localized display name for an element given its PT-BR name */
export function getLocalizedElementName(ptElement) {
 return getCurrentLanguage() === 'en' ? (ELEMENT_PT_TO_EN[ptElement] || ptElement) : ptElement;
}

// Character names in English for sorting
export const CHARACTER_NAMES_EN = {
 'annie': 'Annie', 'beowulf': 'Beowulf', 'big-band': 'Big Band',
 'black-dahlia': 'Black Dahlia', 'cerebella': 'Cerebella',
 'double': 'Double', 'eliza': 'Eliza', 'filia': 'Filia',
 'fukua': 'Fukua', 'marie': 'Marie', 'ms-fortune': 'Ms. Fortune',
 'painwheel': 'Painwheel', 'parasoul': 'Parasoul', 'peacock': 'Peacock',
 'robo-fortune': 'Robo-Fortune', 'squigly': 'Squigly',
 'umbrella': 'Umbrella', 'valentine': 'Valentine'
};
