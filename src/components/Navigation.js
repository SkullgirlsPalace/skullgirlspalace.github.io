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
    <button class="logo" type="button" onclick="navigateTo('')">Skullgirls Palace</button>
  </div>
  <div class="navbar-right">
    <div class="nav-actions">
      <div class="language-selector" id="languageSelector">
        <button class="language-btn" aria-expanded="false" aria-controls="languageDropdown" onclick="handleToggleLanguageMenu()">
          <span class="lang-flag">${currentLang === 'pt-BR' ? '<img src="img/official/flag_pt.webp" alt="PT" class="flag-icon">' : '<img src="img/official/flag_en.webp" alt="EN" class="flag-icon">'}</span>
          <span class="lang-code">${currentLang === 'pt-BR' ? 'PT-BR' : 'EN'}</span>
          <svg class="lang-arrow" width="12" height="12" viewBox="0 0 12 12">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
        </button>
        <div class="language-dropdown" id="languageDropdown">
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
      <button class="hamburger" type="button" aria-label="${t('nav.toggleMenu')}" aria-expanded="false" aria-controls="navLinks" onclick="handleToggleMobileMenu()">☰</button>
    </div>
    <button class="nav-overlay" id="navOverlay" type="button" aria-label="${t('nav.closeMenu')}" aria-hidden="true" onclick="handleToggleMobileMenu()"></button>
    <ul class="nav-links" id="navLinks">
      <li><a href="#">${t('nav.home')}</a></li>
      <li><a href="#characters">${t('nav.characters')}</a></li>
      <li><a href="#guide">${t('nav.guide')}</a></li>
      <li><a href="#stats">${t('nav.calculator')}</a></li>
    </ul>
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
<div id="drawer-overlay" class="drawer-overlay" aria-hidden="true" onclick="handleToggleAboutDrawer()"></div>
<aside id="about-drawer" class="about-drawer" role="dialog" aria-modal="true" aria-labelledby="about-drawer-title" aria-hidden="true" tabindex="-1">
  <div class="drawer-header">
    <div class="drawer-heading">
      <span class="about-eyebrow">Skullgirls Mobile</span>
      <h3 id="about-drawer-title">${t('about.title')}</h3>
    </div>
    <button class="close-drawer" type="button" aria-label="${t('tooltip.close')}" onclick="handleToggleAboutDrawer()">×</button>
  </div>
  <div class="drawer-content">
    <section class="about-drawer-hero">
      <h2>${t('about.heroTitle')}</h2>
      <p>${t('about.heroSubtitle')}</p>
      <div class="about-actions">
        <a href="https://discord.gg/whZJz92RTt" target="_blank" rel="noopener noreferrer" class="about-action about-action-primary">
          ${t('about.discord')}
        </a>
        <a href="https://github.com/SkullgirlsPalace/skullgirlspalace.github.io" target="_blank" rel="noopener noreferrer" class="about-action">
          ${t('about.github')}
        </a>
      </div>
    </section>

    <div class="info-cards vertical">
      <section class="card-link about-info-card">
        <h3>${t('about.projectAboutTitle')}</h3>
        <p>${t('about.projectAboutDesc')}</p>
      </section>
    </div>

    <div class="credits-section">
      <h4>${t('about.creditsTitle')}</h4>
      <p>${t('about.creditsDevs')}</p>
      <p>${t('about.inspiration')} <a href="https://github.com/Krazete" target="_blank" rel="noopener noreferrer">Krazete</a></p>
      <p>${t('about.sources')} <a href="https://krazete.github.io/sgm/" target="_blank" rel="noopener noreferrer">${t('about.krazeteCatalog')}</a> ${t('about.and')} <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank" rel="noopener noreferrer">Fandom Wiki</a>.</p>
      <p>${t('about.assetsNote')}</p>

      <div class="about-legal-note">
        <p><strong>${t('about.disclaimerTitle')}</strong> ${t('about.disclaimerText1')}</p>
        <p>${t('about.disclaimerText2')}</p>
      </div>
      <div class="about-support">
        <p>${t('about.supportDesc')} <a href="https://livepix.gg/lifizin" target="_blank" rel="noopener noreferrer">LivePix</a></p>
        <p>${t('about.reportBug')} <a href="https://discord.gg/whZJz92RTt" target="_blank" rel="noopener noreferrer">${t('about.serverName')}</a>.</p>
      </div>
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

/** Create a touch-friendly back-to-home control for standalone pages. */
export function createPageBackControl() {
  return `
    <div class="route-back-control">
      <button class="btn-back route-back-button" type="button" onclick="navigateTo('')" aria-label="${t('common.backHome')}" title="${t('common.backHome')}">←</button>
    </div>
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
        const href = link.getAttribute('href');
        
        let targetSection = section;
        if (section && section.startsWith('character')) {
            targetSection = 'characters';
        }
        
        if (href === `#${targetSection}`) {
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

export function handleToggleAboutDrawer() {
  const drawer = document.getElementById('about-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    const isOpening = !drawer.classList.contains('active');
    drawer.classList.toggle('active', isOpening);
    overlay.classList.toggle('active', isOpening);
    drawer.setAttribute('aria-hidden', String(!isOpening));
    overlay.setAttribute('aria-hidden', String(!isOpening));
    document.body.style.overflow = isOpening ? 'hidden' : '';

    if (isOpening) {
      drawer.querySelector('.close-drawer')?.focus();
    }
  }
}

export function handleToggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  
  if (navLinks && overlay) {
    const isOpening = !navLinks.classList.contains('active');
    navLinks.classList.toggle('active', isOpening);
    overlay.classList.toggle('active', isOpening);
    overlay.setAttribute('aria-hidden', String(!isOpening));
    document.querySelector('.hamburger')?.setAttribute('aria-expanded', String(isOpening));
    document.body.style.overflow = isOpening ? 'hidden' : '';
  }
}

// Language selector handlers
export function handleToggleLanguageMenu() {
  const dropdown = document.getElementById('languageDropdown');
  if (dropdown) {
    const isOpening = !dropdown.classList.contains('active');
    dropdown.classList.toggle('active', isOpening);
    document.querySelector('.language-btn')?.setAttribute('aria-expanded', String(isOpening));
  }
}

export function handleSelectLanguage(lang) {
  setLanguage(lang);
  const dropdown = document.getElementById('languageDropdown');
  if (dropdown) {
    dropdown.classList.remove('active');
    document.querySelector('.language-btn')?.setAttribute('aria-expanded', 'false');
  }
  // setLanguage dispatches languageChanged; the router updates the current page.
}

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
  const selector = document.getElementById('languageSelector');
  const dropdown = document.getElementById('languageDropdown');
  if (selector && dropdown && !selector.contains(e.target)) {
    dropdown.classList.remove('active');
    selector.querySelector('.language-btn')?.setAttribute('aria-expanded', 'false');
  }
});
