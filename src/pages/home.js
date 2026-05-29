// =====================================================
// HOME PAGE
// Landing hub with navigation cards
// =====================================================

import { t, getCurrentLanguage } from '../i18n/index.js';

/**
 * Render home page
 * @returns {string} HTML string
 */
export function render() {
  const currentLang = getCurrentLanguage();

  return `
  <section class="section" id="landing-hub">
    <div class="hub-container">
      
      <!-- Hero Section -->
      <div class="hub-hero">
        <div class="hero-main-row">
          <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="home-about-link">
            <img loading="lazy" src="img/official/IconInfo.webp" alt="">
            <span>${t('home.about')}</span>
          </a>
          
          <h1>${t('home.heroTitle')}</h1>

          <div class="home-language-selector">
            <div class="language-selector" id="homeLanguageSelector">
              <button class="language-btn" onclick="handleToggleHomeLanguageMenu()">
                <span class="lang-flag">${currentLang === 'pt-BR' ? '<img src="img/official/flag_pt.webp" alt="PT" class="flag-icon">' : '<img src="img/official/flag_en.webp" alt="EN" class="flag-icon">'}</span>
                <span class="lang-code">${currentLang === 'pt-BR' ? 'PT-BR' : 'EN'}</span>
                <svg class="lang-arrow" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
              </button>
              <div class="language-dropdown" id="homeLanguageDropdown">
                <button class="lang-option ${currentLang === 'pt-BR' ? 'active' : ''}" onclick="handleSelectLanguage('pt-BR')">
                  <span class="lang-flag"><img src="img/official/flag_pt.webp" alt="PT" class="flag-icon"></span>
                  <span>${currentLang === 'pt-BR' ? 'Português Brasil' : 'Portuguese Brazilian'}</span>
                </button>
                <button class="lang-option ${currentLang === 'en' ? 'active' : ''}" onclick="handleSelectLanguage('en')">
                  <span class="lang-flag"><img src="img/official/flag_en.webp" alt="EN" class="flag-icon"></span>
                  <span>${currentLang === 'pt-BR' ? 'Inglês' : 'English'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p>${t('home.heroSubtitle')}</p>
      </div>

      <!-- Menu Buttons -->
      <div class="hub-menu">
        <button class="hub-btn" onclick="navigateTo('characters')">
          <span>${t('home.characters')}</span>
        </button>
        <button class="hub-btn" onclick="navigateTo('fenda')">
          <span>${t('home.fenda')}</span>
        </button>
        <button class="hub-btn" onclick="navigateTo('guide')">
          <span>${t('home.guide')}</span>
        </button>
        <button class="hub-btn" onclick="navigateTo('stats')">
          <span>${t('home.calculator')}</span>
        </button>
        <button class="hub-btn" onclick="window.open('https://hub.skullgirlsmobile.com', '_blank')">
          <span>${t('home.hub')}</span>
        </button>
      </div>

    </div>
  </section>
  `;
}

/**
 * Initialize home page
 */
export function init() {
  // Setup language selector click outside handler globally once
  if (!window._homeLangListenerAdded) {
    document.addEventListener('click', (e) => {
      const selector = document.getElementById('homeLanguageSelector');
      const dropdown = document.getElementById('homeLanguageDropdown');
      if (selector && dropdown && !selector.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
    window._homeLangListenerAdded = true;
  }
}

// Global handler for home language menu toggle
window.handleToggleHomeLanguageMenu = function() {
  const dropdown = document.getElementById('homeLanguageDropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
};
