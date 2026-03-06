// =====================================================
// CONFIGURATION CONSTANTS
// Extracted from script.js for modularity
// =====================================================

import { getLang } from '../i18n/i18n.js';

export const CHARACTER_FILES = [
    'annie.json',
    'beowulf.json',
    'big-band.json',
    'black-dahlia.json',
    'cerebella.json',
    'double.json',
    'eliza.json',
    'filia.json',
    'fukua.json',
    'marie.json',
    'ms-fortune.json',
    'painwheel.json',
    'parasoul.json',
    'peacock.json',
    'robo-fortune.json',
    'squigly.json',
    'umbrella.json',
    'valentine.json'
];

export const CHARACTER_ICONS = {
    'annie': 'img/icones/Annie_Icon.png',
    'beowulf': 'img/icones/Beowulf_Icon.png',
    'big-band': 'img/icones/BigBand_Icon.png',
    'black-dahlia': 'img/icones/BlackDahlia_Icon.png',
    'cerebella': 'img/icones/Cerebella_Icon.png',
    'double': 'img/icones/Double_Icon.png',
    'eliza': 'img/icones/Eliza_Icon.png',
    'filia': 'img/icones/Filia_Icon.png',
    'fukua': 'img/icones/Fukua_Icon.png',
    'marie': 'img/icones/Marie_Icon.png',
    'ms-fortune': 'img/icones/MsFortune_Icon.png',
    'painwheel': 'img/icones/Painwheel_Icon.png',
    'parasoul': 'img/icones/Parasoul_Icon.png',
    'peacock': 'img/icones/Peacock_Icon.png',
    'robo-fortune': 'img/icones/RoboFortune_Icon.png',
    'squigly': 'img/icones/Squigly_Icon.png',
    'umbrella': 'img/icones/Umbrella_Icon.png',
    'valentine': 'img/icones/Valentine_Icon.png'
};

export const CHARACTER_COLORS = {
    'annie': '#00a8a8',
    'beowulf': '#858585',
    'big-band': '#808040',
    'black-dahlia': '#3e003e',
    'cerebella': '#ff5402',
    'double': '#5050a3',
    'eliza': '#ffd700',
    'filia': '#000000',
    'fukua': '#006000',
    'marie': '#888888',
    'ms-fortune': '#0099ff',
    'painwheel': '#797900',
    'parasoul': '#ff0000',
    'peacock': '#c60000',
    'robo-fortune': '#005151',
    'squigly': '#800080',
    'umbrella': '#ffff00',
    'valentine': '#FFFFFF'
};

// ── Element Map with i18n display names ─────────────────
const ELEMENT_MAP_PT = {
    'Fogo': { class: 'fire', icon: '🔥', key: 'fogo', iconPath: 'img/icones/ElementalFireBackless.png', statIcon: 'img/icones/ElementalIconFire.png' },
    'Água': { class: 'water', icon: '💧', key: 'agua', iconPath: 'img/icones/ElementalWaterBackless.png', statIcon: 'img/icones/ElementalIconWater.png' },
    'Ar': { class: 'wind', icon: '🌪️', key: 'ar', iconPath: 'img/icones/ElementalWindBackless.png', statIcon: 'img/icones/ElementalIconWind.png' },
    'Luz': { class: 'light', icon: '☀️', key: 'luz', iconPath: 'img/icones/ElementalLightBackless.png', statIcon: 'img/icones/ElementalIconLight.png' },
    'Trevas': { class: 'dark', icon: '🌙', key: 'trevas', iconPath: 'img/icones/ElementalDarkBackless.png', statIcon: 'img/icones/ElementalIconDark.png' },
    'Neutro': { class: 'neutral', icon: '⚪', key: 'neutro', iconPath: 'img/icones/ElementalNeutralBackless.png', statIcon: 'img/icones/ElementalIconNeutral.png' }
};

const ELEMENT_MAP_EN = {
    'Fire': { class: 'fire', icon: '🔥', key: 'fogo', iconPath: 'img/icones/ElementalFireBackless.png', statIcon: 'img/icones/ElementalIconFire.png' },
    'Water': { class: 'water', icon: '💧', key: 'agua', iconPath: 'img/icones/ElementalWaterBackless.png', statIcon: 'img/icones/ElementalIconWater.png' },
    'Wind': { class: 'wind', icon: '🌪️', key: 'ar', iconPath: 'img/icones/ElementalWindBackless.png', statIcon: 'img/icones/ElementalIconWind.png' },
    'Light': { class: 'light', icon: '☀️', key: 'luz', iconPath: 'img/icones/ElementalLightBackless.png', statIcon: 'img/icones/ElementalIconLight.png' },
    'Dark': { class: 'dark', icon: '🌙', key: 'trevas', iconPath: 'img/icones/ElementalDarkBackless.png', statIcon: 'img/icones/ElementalIconDark.png' },
    'Neutral': { class: 'neutral', icon: '⚪', key: 'neutro', iconPath: 'img/icones/ElementalNeutralBackless.png', statIcon: 'img/icones/ElementalIconNeutral.png' }
};

/**
 * Get the ELEMENT_MAP appropriate for the current language
 * @returns {Object} element map
 */
export function getElementMap() {
    return getLang() === 'en' ? { ...ELEMENT_MAP_PT, ...ELEMENT_MAP_EN } : ELEMENT_MAP_PT;
}

// Keep ELEMENT_MAP as the pt-BR version for backward compat
export const ELEMENT_MAP = ELEMENT_MAP_PT;

// ── Rarity labels with i18n ─────────────────────────────
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
    return getLang() === 'en' ? RARITY_LABELS_EN : RARITY_LABELS_PT;
}

// Keep original export for backward compat
export const RARITY_LABELS = RARITY_LABELS_PT;

export const RARITY_ORDER = { 'diamante': 4, 'ouro': 3, 'prata': 2, 'bronze': 1 };
export const ELEMENT_ORDER = { 'Fogo': 1, 'Água': 2, 'Ar': 3, 'Luz': 4, 'Trevas': 5, 'Neutro': 6 };

export const RARITY_ICONS = {
    'diamante': 'img/icones/icone_diamante.png',
    'ouro': 'img/icones/icone_ouro.png',
    'prata': 'img/icones/icone_prata.png',
    'bronze': 'img/icones/icone_bronze.png'
};

export const TIER_RANKS = ['SS', 'S', 'A', 'B', 'C', 'I', 'N/A'];

// ── Element name translation helpers ────────────────────
const ELEMENT_PT_TO_EN = {
    'Fogo': 'Fire', 'Água': 'Water', 'Ar': 'Wind',
    'Luz': 'Light', 'Trevas': 'Dark', 'Neutro': 'Neutral'
};

const ELEMENT_EN_TO_PT = {
    'fire': 'Fogo', 'water': 'Água', 'air': 'Ar', 'wind': 'Ar',
    'light': 'Luz', 'dark': 'Trevas', 'neutral': 'Neutro',
    // Capitalized versions too
    'Fire': 'Fogo', 'Water': 'Água', 'Air': 'Ar', 'Wind': 'Ar',
    'Light': 'Luz', 'Dark': 'Trevas', 'Neutral': 'Neutro'
};

/**
 * Translate a pt-BR element name to English
 * @param {string} ptElement - Portuguese element name (e.g. 'Fogo')
 * @returns {string} English element name (e.g. 'Fire')
 */
export function elementToEN(ptElement) {
    return ELEMENT_PT_TO_EN[ptElement] || ptElement;
}

/**
 * Translate an English element name to pt-BR (for internal key lookup)
 * @param {string} enElement - English element (e.g. 'fire')
 * @returns {string} Portuguese element name (e.g. 'Fogo')
 */
export function elementToPT(enElement) {
    return ELEMENT_EN_TO_PT[enElement] || enElement;
}

// ── Character name translation ──────────────────────────
const CHARACTER_NAME_PT_TO_EN = {
    'Dália Negra': 'Black Dahlia'
};

const CHARACTER_NAME_EN_TO_PT = {
    'Black Dahlia': 'Dália Negra'
};

/**
 * Translate a character display name to English
 * @param {string} ptName - Portuguese character name
 * @returns {string} English character name
 */
export function characterNameToEN(ptName) {
    return CHARACTER_NAME_PT_TO_EN[ptName] || ptName;
}

/**
 * Translate a character display name to Portuguese
 * @param {string} enName - English character name
 * @returns {string} Portuguese character name
 */
export function characterNameToPT(enName) {
    return CHARACTER_NAME_EN_TO_PT[enName] || enName;
}
