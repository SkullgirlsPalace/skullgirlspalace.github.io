// =====================================================
// INTERNATIONALIZATION MODULE INDEX
// Exports all i18n functionality
// =====================================================

export {
    translations,
    t,
    getCurrentLanguage,
    setLanguage,
    toggleLanguage,
    getAllTranslations
} from './translations.js';

export {
    preloadKrazeteData,
    getLocalizedName,
    getLocalizedAbilityName,
    getLocalizedNameSync,
    getLocalizedAbilityNameSync,
    getLocalizedSADescSync
} from './dataTranslations.js';