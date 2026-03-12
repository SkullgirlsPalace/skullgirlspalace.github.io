// =====================================================
// FOOTER COMPONENT
// Site footer with credits and official links
// =====================================================

/**
 * Create footer HTML
 * @returns {string} HTML string
 */
export function createFooter() {
    return `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Skullgirls Palace</h3>
                <p>Sua fonte completa de builds, guias e mais para Skullgirls Mobile.</p>
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
                <h4>✨ Créditos</h4>
                <p>Desenvolvido por <strong>Lifi ツ</strong> e <strong>João Pedro</strong>.</p>
                <p>Inspiração Principal e Colaborador: <a href="https://github.com/Krazete" target="_blank">Krazete</a></p>
                <p>Fontes oficiais: <a href="https://krazete.github.io/sgm/" target="_blank">Catálogo Krazete</a> e <a href="https://skullgirlsmobile.fandom.com/wiki/SkullgirlsMobile_Wiki" target="_blank">Fandom Wiki</a>.</p>
            </div>

            <div class="footer-section">
                <h4>🎮 Links Oficiais</h4>
                <p><a href="https://skullgirlsmobile.com/" target="_blank">Site Oficial SGM</a></p>
                <p><a href="https://x.com/sgmobile" target="_blank">Twitter/X @sgmobile</a></p>
                <p><a href="https://hub.skullgirlsmobile.com/" target="_blank">Skullgirls Mobile Hub</a></p>
                <p class="footer-disclaimer">Assets originais pertencem à Autumn Games e Hidden Variable Studios.</p>
            </div>

            <div class="footer-section">
                <h4>🐛 Feedback</h4>
                <p>Encontrou algum erro ou bug? Reporte no <a href="https://discord.gg/whZJz92RTt" target="_blank">Servidor Palácio Branco</a>.</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Skullgirls Palace. Projeto de fã não afiliado aos desenvolvedores oficiais.</p>
        </div>
    `;
}
