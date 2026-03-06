// =====================================================
// i18n ENGINE
// Lightweight internationalization without external deps
// =====================================================

import ptBR from './pt-BR.js';
import en from './en.js';

const LOCALES = {
    'pt-BR': ptBR,
    'en': en
};

const STORAGE_KEY = 'SGM_LANG';
const DEFAULT_LANG = 'pt-BR';

let currentLang = null;
let currentDict = null;

/**
 * Initialize language from localStorage or default
 */
function initLang() {
    if (currentLang) return;
    currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    currentDict = LOCALES[currentLang] || LOCALES[DEFAULT_LANG];
}

/**
 * Get current language code
 * @returns {string} 'pt-BR' or 'en'
 */
export function getLang() {
    initLang();
    return currentLang;
}

/**
 * Set language and reload page to re-render all HTML
 * @param {string} lang - Language code ('pt-BR' or 'en')
 */
export function setLang(lang) {
    if (!LOCALES[lang]) return;
    localStorage.setItem(STORAGE_KEY, lang);
    location.reload();
}

/**
 * Translate a key to the current language
 * Falls back to pt-BR if key not found in current locale
 * @param {string} key - Dot-notation key (e.g. 'nav.home')
 * @returns {string} Translated string or the key itself if not found
 */
export function t(key) {
    initLang();
    return currentDict[key] || ptBR[key] || key;
}

/**
 * Check if current language is the given one
 * @param {string} lang - Language code to check
 * @returns {boolean}
 */
export function isLang(lang) {
    initLang();
    return currentLang === lang;
}

/**
 * Get available languages
 * @returns {string[]}
 */
export function getAvailableLanguages() {
    return Object.keys(LOCALES);
}
