// =====================================================
// FOOTER COMPONENT
// Site footer with credits and official links
// =====================================================

import { t } from '../i18n/index.js';

/**
 * Create footer HTML
 * @returns {string} HTML string
 */
export function createFooter() {
  return `
<div class="footer-content">
  <div class="footer-section">
    <h3>${t('footer.title')}</h3>
    <p>${t('footer.description')}</p>
    <div class="footer-socials">
      <a href="https://discord.gg/whZJz92RTt" target="_blank" class="footer-icon-link" title="Discord">
        Discord
      </a>
      <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="footer-icon-link" title="GitHub">
        GitHub
      </a>
    </div>
  </div>

  <div class="footer-section">
    <h4>${t('footer.creditsTitle')}</h4>
    <p>${t('footer.creditsDevs')}</p>
    <p>${t('footer.inspiration')} <a href="https://github.com/Krazete" target="_blank">Krazete</a></p>
    <p>${t('footer.sources')} <a href="https://krazete.github.io/sgm/" target="_blank">Catálogo Krazete</a> e <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank">Fandom Wiki</a>.</p>
  </div>

  <div class="footer-section">
    <h4>${t('footer.officialLinksTitle')}</h4>
    <p><a href="https://skullgirlsmobile.com/" target="_blank">${t('footer.officialSite')}</a></p>
    <p><a href="https://x.com/sgmobile" target="_blank">Twitter/X @sgmobile</a></p>
    <p><a href="https://hub.skullgirlsmobile.com/" target="_blank">${t('footer.hub')}</a></p>
    <p class="footer-disclaimer">${t('footer.assetsNote')}</p>
  </div>

  <div class="footer-section">
    <h4>${t('footer.feedbackTitle')}</h4>
    <p style="margin-bottom: 8px;">${t('about.supportDesc')} <a href="https://livepix.gg/lifizin" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: bold;">LivePix</a></p>
    <p>${t('footer.reportBug')} <a href="https://discord.gg/whZJz92RTt" target="_blank">${t('footer.serverName')}</a>.</p>
  </div>
</div>
<div class="footer-bottom">
  <p>&copy; ${new Date().getFullYear()} Skullgirls Palace. ${t('footer.disclaimer')}</p>
</div>
`;
}
