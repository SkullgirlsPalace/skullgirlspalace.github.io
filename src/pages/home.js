// =====================================================
// HOME PAGE
// Landing hub with navigation cards
// =====================================================

import { t, getLang } from '../i18n/i18n.js';

/**
 * Render home page
 * @returns {string} HTML string
 */
export function render() {
    const lang = getLang();
    const ptActive = lang === 'pt-BR' ? 'active' : '';
    const enActive = lang === 'en' ? 'active' : '';

    return `
        <section class="section" id="landing-hub">
            <div class="hub-container">
                <!-- Hero Section -->
                <div class="hub-hero">
                    <div class="hub-top-bar">
                        <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="hub-about-link">
                            <img src="img/icones/IconInfo.png" alt="">
                            <span>${t('nav.about').toUpperCase()}</span>
                        </a>
                        <div class="lang-selector home-lang-selector">
                            <button class="lang-btn ${ptActive}" onclick="handleSetLang('pt-BR')" title="Português">
                                🇧🇷
                            </button>
                            <button class="lang-btn ${enActive}" onclick="handleSetLang('en')" title="English">
                                🇺🇸
                            </button>
                        </div>
                    </div>
                    <h1>${t('home.title')}</h1>
                    <p>${t('home.subtitle')}</p>
                </div>

                <!-- Menu Buttons -->
                <div class="hub-menu">
                    <button class="hub-btn" onclick="navigateTo('characters')">
                        <span>${t('home.btn.characters')}</span>
                    </button>
                    <button class="hub-btn" onclick="navigateTo('guide')">
                        <span>${t('home.btn.guide')}</span>
                    </button>
                    <button class="hub-btn" onclick="navigateTo('stats')">
                        <span>${t('home.btn.stats')}</span>
                    </button>
                    <button class="hub-btn" onclick="window.open('https://hub.skullgirlsmobile.com', '_blank')">
                        <span>${t('home.btn.hub')}</span>
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
    // No special initialization needed for home
}
