// =====================================================
// INTERNATIONALIZATION MODULE INDEX
// Exports all i18n functionality
// =====================================================

export {
    translations,
    t,
    getCurrentLanguage,
    getPreferredSecondaryLanguage,
    setLanguage,
    toggleLanguage,
    getAllTranslations
} from './translations.js';

export {
    preloadKrazeteData,
    getLocalizedName,
    getLocalizedAbilityName,
    getLocalizedNameSync,
    getVariantNamePairSync,
    getLocalizedAbilityNameSync,
    getLocalizedSADescSync
} from './dataTranslations.js';
