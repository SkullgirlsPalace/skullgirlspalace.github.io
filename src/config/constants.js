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
    'annie': 'img/select_character/Annie_Icon2.png',
    'beowulf': 'img/select_character/Beowulf_Icon2.png',
    'big-band': 'img/select_character/bigband_icon2.png',
    'black-dahlia': 'img/select_character/black_dahlia_icon2.png',
    'cerebella': 'img/select_character/cerebella_icon2.png',
    'double': 'img/select_character/double_icon2.png',
    'eliza': 'img/select_character/eliza_icon2.png',
    'filia': 'img/select_character/filia_icon2.png',
    'fukua': 'img/select_character/fukua_icon2.png',
    'marie': 'img/select_character/marie_icon2.png',
    'ms-fortune': 'img/select_character/msfortune_icon2.png',
    'painwheel': 'img/select_character/painwhell_icon2.png',
    'parasoul': 'img/select_character/parasoul_icon2.png',
    'peacock': 'img/select_character/peacock2.png',
    'robo-fortune': 'img/select_character/robo_fortune_icon2.png',
    'squigly': 'img/select_character/squigly_icon2.png',
    'umbrella': 'img/select_character/umbrella_icon2.png',
    'valentine': 'img/select_character/valentine_icon2.png'
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
    'Fogo': { class: 'fire', icon: '🔥', key: 'fogo', iconPath: 'img/official/ElementalFireBackless.png', statIcon: 'img/official/ElementalIconFire.png' },
    'Água': { class: 'water', icon: '💧', key: 'agua', iconPath: 'img/official/ElementalWaterBackless.png', statIcon: 'img/official/ElementalIconWater.png' },
    'Ar': { class: 'wind', icon: '🌪️', key: 'ar', iconPath: 'img/official/ElementalWindBackless.png', statIcon: 'img/official/ElementalIconWind.png' },
    'Luz': { class: 'light', icon: '☀️', key: 'luz', iconPath: 'img/official/ElementalLightBackless.png', statIcon: 'img/official/ElementalIconLight.png' },
    'Trevas': { class: 'dark', icon: '🌙', key: 'trevas', iconPath: 'img/official/ElementalDarkBackless.png', statIcon: 'img/official/ElementalIconDark.png' },
    'Neutro': { class: 'neutral', icon: '⚪', key: 'neutro', iconPath: 'img/official/ElementalNeutralBackless.png', statIcon: 'img/official/ElementalIconNeutral.png' }
};

export const RARITY_ORDER = { 'diamante': 4, 'ouro': 3, 'prata': 2, 'bronze': 1 };
export const ELEMENT_ORDER = { 'Fogo': 1, 'Água': 2, 'Ar': 3, 'Luz': 4, 'Trevas': 5, 'Neutro': 6 };

export const RARITY_LABELS = {
    'diamante': 'DIAMANTE',
    'ouro': 'OURO',
    'prata': 'PRATA',
    'bronze': 'BRONZE'
};

export const RARITY_ICONS = {
    'diamante': 'img/official/icone_diamante.png',
    'ouro': 'img/official/icone_ouro.png',
    'prata': 'img/official/icone_prata.png',
    'bronze': 'img/official/icone_bronze.png'
};

export const TIER_RANKS = ['SS', 'S', 'A', 'B', 'C', 'I', 'N/A'];
