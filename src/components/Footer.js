// =====================================================
// FOOTER COMPONENT
// Site footer with credits and official links
// =====================================================

import { t } from '../i18n/i18n.js';

/**
 * Create footer HTML
 * @returns {string} HTML string
 */
export function createFooter() {
    return `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Skullgirls Palace</h3>
                <p>${t('footer.subtitle')}</p>
                <div class="footer-socials">
                    <a href="https://discord.gg/whZJz92RTt" target="_blank" class="footer-icon-link" title="Discord">
                        💬 Discord
                    </a>
                    <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="footer-icon-link" title="GitHub">
                        📦 GitHub
                    </a>
                </div>
            </div>

            <div class="footer-section">
                <h4>${t('footer.credits_title')}</h4>
                <p>${t('footer.developed_by')} <strong>Lifi ツ</strong> e <strong>João Pedro</strong>.</p>
                <p>${t('footer.inspiration')} <a href="https://github.com/Krazete" target="_blank">Krazete</a></p>
                <p>${t('footer.sources')} <a href="https://krazete.github.io/sgm/" target="_blank">${t('footer.catalog')}</a> ${t('footer.sources_and')} <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank">${t('footer.wiki')}</a>.</p>
            </div>

            <div class="footer-section">
                <h4>${t('footer.links_title')}</h4>
                <p><a href="https://skullgirlsmobile.com/" target="_blank">${t('footer.official_site')}</a></p>
                <p><a href="https://x.com/sgmobile" target="_blank">Twitter/X @sgmobile</a></p>
                <p><a href="https://hub.skullgirlsmobile.com/" target="_blank">${t('footer.hub')}</a></p>
                <p class="footer-disclaimer">${t('footer.disclaimer')}</p>
            </div>

            <div class="footer-section">
                <h4>${t('footer.feedback_title')}</h4>
                <p>${t('footer.feedback')} <a href="https://discord.gg/whZJz92RTt" target="_blank">${t('footer.feedback_link')}</a>.</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${t('footer.copyright')}</p>
        </div>
    `;
}
