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
    <!-- Navigation Corners -->
    <div class="home-top-actions">
      <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="home-about-link">
        <span>${t('home.about')}</span>
      </a>
      <div class="home-language-selector">
        <button class="home-language-btn" onclick="handleToggleHomeLanguageMenu()">
          <span>${currentLang === 'pt-BR' ? 'PT-BR' : 'EN'}</span>
        </button>
        <div class="language-dropdown" id="homeLanguageDropdown">
          <button class="lang-option ${currentLang === 'pt-BR' ? 'active' : ''}" onclick="handleSelectLanguage('pt-BR')">
            <span>${currentLang === 'pt-BR' ? 'Português Brasil' : 'Portuguese Brazilian'}</span>
          </button>
          <button class="lang-option ${currentLang === 'en' ? 'active' : ''}" onclick="handleSelectLanguage('en')">
            <span>${currentLang === 'pt-BR' ? 'Inglês' : 'English'}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="hub-container">
      <!-- Hero Section -->
      <div class="hub-hero">
        <h1>${t('home.heroTitle')}</h1>
        <p>${t('home.heroSubtitle')}</p>
      </div>

      <!-- Menu Buttons Container -->
      <div class="hub-menu-container">
        <div class="hub-menu">
          <button class="hub-btn" onclick="navigateTo('characters')">
            <span>${t('home.characters')}</span>
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

    </div>
  </section>
  `;
}

/**
 * Initialize home page
 */
export function init() {
  // Setup language selector click outside handler
  const selector = document.getElementById('homeLanguageSelector');
  if (selector) {
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('homeLanguageDropdown');
      if (selector && dropdown && !selector.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }
}

// Global handler for home language menu toggle
window.handleToggleHomeLanguageMenu = function() {
  const dropdown = document.getElementById('homeLanguageDropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
};
