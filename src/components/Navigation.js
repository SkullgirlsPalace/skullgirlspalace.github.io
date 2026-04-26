// =====================================================
// NAVIGATION COMPONENT
// Navbar, About Drawer, and scroll navigation
// =====================================================

import { getState, toggleAboutDrawer, toggleMobileMenu } from '../state/store.js';
import { t, getCurrentLanguage, setLanguage } from '../i18n/index.js';

/**
 * Create navbar HTML
 * @returns {string} HTML string
 */
export function createNavbar() {
  const currentLang = getCurrentLanguage();

  return `
<nav class="navbar hidden-nav" id="navbar">
  <div class="navbar-brand">
    <div class="logo" onclick="navigateTo('')">Skullgirls Palace</div>
    <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="about-link">
      <img loading="lazy" src="img/official/IconInfo.webp" alt="">
      <span>${t('nav.about')}</span>
    </a>
  </div>
  <ul class="nav-links" id="navLinks">
    <li><a href="javascript:void(0)" onclick="navigateTo('')">${t('nav.home')}</a></li>
    <li><a href="javascript:void(0)" onclick="navigateTo('characters')">${t('nav.characters')}</a></li>
    <li><a href="javascript:void(0)" onclick="navigateTo('guide')">${t('nav.guide')}</a></li>
    <li><a href="javascript:void(0)" onclick="navigateTo('stats')">${t('nav.calculator')}</a></li>
  </ul>
  <div class="nav-actions">
    <div class="language-selector" id="languageSelector">
      <button class="language-btn" onclick="handleToggleLanguageMenu()">
        <span class="lang-flag">${currentLang === 'pt-BR' ? '<img src="img/official/flag_pt.webp" alt="PT" class="flag-icon">' : '<img src="img/official/flag_en.webp" alt="EN" class="flag-icon">'}</span>
        <span class="lang-code">${currentLang === 'pt-BR' ? 'PT' : 'EN'}</span>
        <svg class="lang-arrow" width="12" height="12" viewBox="0 0 12 12">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
      </button>
      <div class="language-dropdown" id="languageDropdown">
        <button class="lang-option ${currentLang === 'pt-BR' ? 'active' : ''}" onclick="handleSelectLanguage('pt-BR')">
          <span class="lang-flag"><img src="img/official/flag_pt.webp" alt="PT" class="flag-icon"></span>
          <span>Português</span>
        </button>
        <button class="lang-option ${currentLang === 'en' ? 'active' : ''}" onclick="handleSelectLanguage('en')">
          <span class="lang-flag"><img src="img/official/flag_en.webp" alt="EN" class="flag-icon"></span>
          <span>English</span>
        </button>
      </div>
    </div>
    <div class="hamburger" onclick="handleToggleMobileMenu()">☰</div>
  </div>
</nav>
`;
}

/**
 * Create about drawer HTML
 * @returns {string} HTML string
 */
export function createAboutDrawer() {
  return `
<div id="drawer-overlay" class="drawer-overlay" onclick="handleToggleAboutDrawer()"></div>
<aside id="about-drawer" class="about-drawer">
  <div class="drawer-header">
    <h3>${t('about.title')}</h3>
    <button class="close-drawer" onclick="handleToggleAboutDrawer()">×</button>
  </div>
  <div class="drawer-content">
    <div class="hero">
      <h1>${t('about.heroTitle')}</h1>
      <p>${t('about.heroSubtitle')}</p>
      <div class="hero-buttons">
        <a href="https://discord.gg/whZJz92RTt" target="_blank" class="btn btn-primary">
          ${t('about.discord')}
        </a>
        <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="btn btn-secondary">
          ${t('about.github')}
        </a>
      </div>
    </div>

    <div class="info-cards vertical">
      <div class="card-link">
        <h3>${t('about.buildsTitle')}</h3>
        <p>${t('about.buildsDesc')}</p>
      </div>
      <div class="card-link">
        <h3>${t('about.calculatorTitle')}</h3>
        <p>${t('about.calculatorDesc')}</p>
      </div>
    </div>

    <div class="credits-section">
      <h4>${t('about.creditsTitle')}</h4>
      <p>${t('about.creditsDevs')}</p>
      <p>${t('about.inspiration')} <a href="https://github.com/Krazete" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Krazete</a></p>
      <p>${t('about.sources')} <a href="https://krazete.github.io/sgm/" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Catálogo Krazete</a> e <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Fandom Wiki</a>.</p>
      <p>${t('about.assetsNote')}</p>

      <div class="disclaimer-tooltip" style="margin-top: 20px;">
        <button class="disclaimer-btn" onclick="handleToggleDisclaimer()" title="${t('about.disclaimerBtn')}">⚠️</button>
        <div class="disclaimer-content" id="disclaimer-content">
          <p><strong>${t('about.disclaimerTitle')}</strong> ${t('about.disclaimerText1')}</p>
          <p>${t('about.disclaimerText2')}</p>
        </div>
      </div>
      <p style="font-size: 0.85rem; margin-top: 15px;">${t('about.reportBug')} <a href="https://discord.gg/whZJz92RTt" target="_blank" style="color: var(--accent-gold); text-decoration: none;">${t('about.serverName')}</a>.</p>
    </div>
  </div>
</aside>
`;
}

/**
 * Create scroll navigation buttons HTML
 * @returns {string} HTML string
 */
export function createScrollNav() {
  return `
  <button id="scrollTopBtn" class="scroll-nav-btn" onclick="scrollToTop()" title="${t('common.scrollToTop')}"></button>
  <button id="scrollToBottomBtn" class="scroll-nav-btn" onclick="scrollToBottom()" title="${t('common.scrollToBottom')}"></button>
`;
}

/**
 * Update navbar visibility based on current section
 * @param {string} section - Current section
 */
export function updateNavbarVisibility(section) {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Hide navbar on home screen
  if (section === '' || section === 'landing-hub') {
    navbar.classList.add('hidden-nav');
  } else {
    navbar.classList.remove('hidden-nav');
  }
}

/**
 * Update active nav link
 * @param {string} section - Current section
 */
export function updateActiveNavLink(section) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const onclick = link.getAttribute('onclick');
        
        let targetSection = section;
        if (section && section.startsWith('character')) {
            targetSection = 'characters';
        }
        
        if (onclick && onclick.includes(`'${targetSection}'`)) {
            link.classList.add('active');
        }
    });
}

// Scroll functions
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// Global handlers
let disclaimerTimer = null;

export function handleToggleAboutDrawer() {
  const drawer = document.getElementById('about-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
  }
}

export function handleToggleMobileMenu() {
  document.getElementById('navLinks')?.classList.toggle('active');
}

export function handleToggleDisclaimer() {
  const content = document.getElementById('disclaimer-content');
  if (!content) return;

  content.classList.toggle('active');

  if (content.classList.contains('active')) {
    clearTimeout(disclaimerTimer);
    disclaimerTimer = setTimeout(() => {
      content.classList.remove('active');
    }, 7000);
  } else {
    clearTimeout(disclaimerTimer);
  }
}

// Language selector handlers
export function handleToggleLanguageMenu() {
  const dropdown = document.getElementById('languageDropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

export function handleSelectLanguage(lang) {
  setLanguage(lang);
  const dropdown = document.getElementById('languageDropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
  }
  // Re-render the entire app with new language
  window.location.reload();
}

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
  const selector = document.getElementById('languageSelector');
  const dropdown = document.getElementById('languageDropdown');
  if (selector && dropdown && !selector.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});
