// =====================================================
// HOME PAGE
// Landing hub with navigation cards
// =====================================================

import { t } from '../i18n/i18n.js';

/**
 * Render home page
 * @returns {string} HTML string
 */
export function render() {
    return `
        <section class="section" id="landing-hub">
            <div class="hub-container">
                <!-- Hero Section -->
                <div class="hub-hero">
                    <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="hub-about-link">
                        <img src="img/icones/IconInfo.png" alt="">
                        <span>${t('nav.about').toUpperCase()}</span>
                    </a>
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
