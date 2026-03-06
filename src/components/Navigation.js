// =====================================================
// NAVIGATION COMPONENT
// Navbar, About Drawer, and scroll navigation
// =====================================================

import { getState, toggleAboutDrawer, toggleMobileMenu } from '../state/store.js';
import { t, getLang, setLang } from '../i18n/i18n.js';

/**
 * Create navbar HTML
 * @returns {string} HTML string
 */
export function createNavbar() {
    const lang = getLang();
    const ptActive = lang === 'pt-BR' ? 'active' : '';
    const enActive = lang === 'en' ? 'active' : '';

    return `
        <nav class="navbar hidden-nav" id="navbar">
            <div class="navbar-brand">
                <div class="logo" onclick="navigateTo('')">Skullgirls Palace</div>
                <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="about-link">
                    <img src="img/icones/IconInfo.png" alt="">
                    <span>${t('nav.about')}</span>
                </a>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="javascript:void(0)" onclick="navigateTo('')">${t('nav.home')}</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('characters')">${t('nav.characters')}</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('guide')">${t('nav.guide')}</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('stats')">${t('nav.stats')}</a></li>
            </ul>
            <div class="lang-selector" id="langSelector">
                <button class="lang-btn ${ptActive}" onclick="handleSetLang('pt-BR')" title="Português">
                    🇧🇷
                </button>
                <button class="lang-btn ${enActive}" onclick="handleSetLang('en')" title="English">
                    🇺🇸
                </button>
            </div>
            <div class="hamburger" onclick="handleToggleMobileMenu()">☰</div>
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
                    <h1>Skullgirls Palace</h1>
                    <p>${t('about.subtitle')}</p>
                    <div class="hero-buttons">
                        <a href="https://discord.gg/whZJz92RTt" target="_blank" class="btn btn-primary">
                            💬 Discord
                        </a>
                        <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="btn btn-secondary">
                            📦 GitHub
                        </a>
                    </div>
                </div>

                <div class="info-cards vertical">
                    <div class="card-link">
                        <h3>${t('about.builds_title')}</h3>
                        <p>${t('about.builds_desc')}</p>
                    </div>
                    <div class="card-link">
                        <h3>${t('about.calc_title')}</h3>
                        <p>${t('about.calc_desc')}</p>
                    </div>
                </div>

                <div class="credits-section">
                    <h4>${t('about.credits_title')}</h4>
                    <p>${t('about.developed_by')} <strong>Lifi ツ</strong> e <strong>João Pedro</strong>.</p>
                    <p>${t('about.inspiration')} <a href="https://github.com/Krazete" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Krazete</a></p>
                    <p>${t('about.sources')} <a href="https://krazete.github.io/sgm/" target="_blank" style="color: var(--accent-gold); text-decoration: none;">${t('about.catalog')}</a> ${t('about.sources_and')} <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank" style="color: var(--accent-gold); text-decoration: none;">${t('about.wiki')}</a>.</p>
                    <p>${t('about.assets')}</p>

                    <div class="disclaimer-tooltip" style="margin-top: 20px;">
                        <button class="disclaimer-btn" onclick="handleToggleDisclaimer()" title="${t('about.disclaimer_title')}">${t('about.disclaimer_btn')}</button>
                        <div class="disclaimer-content" id="disclaimer-content">
                            <p><strong>${t('about.disclaimer_title')}</strong> ${t('about.disclaimer_text')}</p>
                            <p>${t('about.disclaimer_assets')}</p>
                        </div>
                    </div>
                    <p style="font-size: 0.85rem; margin-top: 15px;">${t('about.bug_report')} <a href="https://discord.gg/whZJz92RTt" target="_blank" style="color: var(--accent-gold); text-decoration: none;">${t('about.bug_report_link')}</a>.</p>
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
        <button id="scrollTopBtn" class="scroll-nav-btn" onclick="scrollToTop()" title="${t('scroll.top')}"></button>
        <button id="scrollToBottomBtn" class="scroll-nav-btn" onclick="scrollToBottom()" title="${t('scroll.bottom')}"></button>
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
        if (onclick && onclick.includes(`'${section}'`)) {
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

/**
 * Handle language change
 * @param {string} lang - Language code
 */
export function handleSetLang(lang) {
    setLang(lang);
}
