// =====================================================
// HOME PAGE
// Landing hub with navigation cards
// =====================================================

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
                    <h1>SKULLGIRLS</h1>
                    <p>MOBILE WIKI</p>
                </div>

                <!-- Menu Buttons -->
                <div class="hub-menu">
                    <button class="hub-btn" onclick="navigateTo('characters')">
                        <span>PERSONAGENS</span>
                    </button>
                    <button class="hub-btn" onclick="navigateTo('catalysts')">
                        <span>CATALISADORES</span>
                    </button>
                    <button class="hub-btn" onclick="navigateTo('tierlist')">
                        <span>TIER LIST</span>
                    </button>
                    <button class="hub-btn" onclick="navigateTo('stats')">
                        <span>ESTATÍSTICAS</span>
                    </button>
                </div>

                <!-- Community Links -->
                <div class="hub-footer">
                    <div class="hero-buttons">
                        <a href="https://discord.gg/nsGXabuCSe" target="_blank" class="btn btn-primary">
                            💬 Discord
                        </a>
                        <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="btn btn-secondary">
                            📦 Repositório
                        </a>
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
    // No special initialization needed for home
}
