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
                    <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="hub-about-link">
                        <img src="img/icones/IconInfo.png" alt="">
                        <span>SOBRE</span>
                    </a>
                    <h1>Skullgirls Palace</h1>
                    <p>Sua fonte completa de builds, estatísticas e estratégias para Skullgirls Mobile.</p>
                </div>

                <!-- Menu Buttons -->
                <div class="hub-menu">
                    <button class="hub-btn" onclick="navigateTo('characters')">
                        <span>PERSONAGENS</span>
                    </button>
                    <button class="hub-btn" onclick="navigateTo('guide')">
                        <span>GUIA</span>
                    </button>
                    <button class="hub-btn" onclick="navigateTo('stats')">
                        <span>ESTATÍSTICAS</span>
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
