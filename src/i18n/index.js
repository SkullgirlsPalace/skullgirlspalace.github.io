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
  clearTranslationCache,
  isDataLoaded,
  getLocalizedNameSync,
  getLocalizedAbilityNameSync,
  getLocalizedSADescSync,
  getOriginalName
} from './dataTranslations.js';

export {
  getElementMap,
  getRarityLabels,
  getLocalizedRarityLabel,
  elementToEN,
  elementToPT,
  getLocalizedElementName
} from '../config/constants.js';

export {
  getLocalizedClassName,
  getLocalizedClassDescription,
  getLocalizedClassNames,
  classNameToPT,
  getLocalizedVariantClasses
} from '../data/variantClasses.js';
