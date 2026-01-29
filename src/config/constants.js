// =====================================================
// CONFIGURATION CONSTANTS
// Extracted from script.js for modularity
// =====================================================

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

export const ELEMENT_MAP = {
    'Fogo': { class: 'fire', icon: '🔥', key: 'fogo', iconPath: 'img/icones/ElementalIconFire.png' },
    'Água': { class: 'water', icon: '💧', key: 'agua', iconPath: 'img/icones/ElementalIconWater.png' },
    'Ar': { class: 'wind', icon: '🌪️', key: 'ar', iconPath: 'img/icones/ElementalIconWind.png' },
    'Luz': { class: 'light', icon: '☀️', key: 'luz', iconPath: 'img/icones/ElementalIconLight.png' },
    'Trevas': { class: 'dark', icon: '🌙', key: 'trevas', iconPath: 'img/icones/ElementalIconDark.png' },
    'Neutro': { class: 'neutral', icon: '⚪', key: 'neutro', iconPath: 'img/icones/ElementalIconNeutral.png' }
};

export const RARITY_ORDER = { 'diamante': 4, 'ouro': 3, 'prata': 2, 'bronze': 1 };
export const ELEMENT_ORDER = { 'Fogo': 1, 'Água': 2, 'Ar': 3, 'Luz': 4, 'Trevas': 5, 'Neutro': 6 };

export const RARITY_LABELS = {
    'diamante': 'DIAMANTE',
    'ouro': 'OURO',
    'prata': 'PRATA',
    'bronze': 'BRONZE'
};

export const TIER_RANKS = ['SS', 'S', 'A', 'B', 'C', 'U', 'TBD'];
