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
  getEnglishVariantData,
  getEnglishVariantName,
  getEnglishAbilityName,
  getEnglishSA1,
  getEnglishSA2,
  getEnglishSignatureAbility,
  preloadKrazeteData,
  getLocalizedName,
  getLocalizedAbilityName,
  getTranslationMapping,
  updateVariantTranslations,
  clearTranslationCache
} from './dataTranslations.js';
