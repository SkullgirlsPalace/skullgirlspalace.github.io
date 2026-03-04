// =====================================================
// NAVIGATION COMPONENT
// Navbar, About Drawer, and scroll navigation
// =====================================================

import { getState, toggleAboutDrawer, toggleMobileMenu } from '../state/store.js';

/**
 * Create navbar HTML
 * @returns {string} HTML string
 */
export function createNavbar() {
    return `
        <nav class="navbar hidden-nav" id="navbar">
            <div class="navbar-brand">
                <div class="logo" onclick="navigateTo('')">Skullgirls Palace</div>
                <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="about-link">
                    <img src="img/icones/IconInfo.png" alt="">
                    <span>sobre</span>
                </a>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="javascript:void(0)" onclick="navigateTo('')">Inicio</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('characters')">Personagens</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('guide')">Guia</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('stats')">Estatísticas</a></li>
            </ul>
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
                <h3>Sobre o Projeto</h3>
                <button class="close-drawer" onclick="handleToggleAboutDrawer()">×</button>
            </div>
            <div class="drawer-content">
                <div class="hero">
                    <h1>Skullgirls Palace</h1>
                    <p>Sua fonte completa de builds, estatísticas e estratégias para Skullgirls Mobile. Um projeto da comunidade Palácio Branco.</p>
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
                        <h3>📖 Builds Recomendadas</h3>
                        <p>O intuito de recomendar uma Build, Superior e Arsenal é para facilitar sua Vida e você desempenhar melhor com sua Variante Favorita sem precisar ficar perguntando de tantos lugares, foi tudo montado por bons jogadores e boa parte das recomendações são boas, eu espero. Em caso de erros reporte no Servidor do Discord.</p>
                    </div>
                    <div class="card-link">
                        <h3>📊 Calculadora</h3>
                        <p>Simule seus Ganhos mensais de Moedas e Teonitas, calcule também o quanto é necessário para Gastar em Moedas para Melhorar suas Variantes, Golpes, Astros e etc...</p>
                    </div>
                </div>

                <div class="credits-section">
                    <h4>✨ Créditos</h4>
                    <p>Desenvolvido por <strong>Lifi ツ</strong> e <strong>João Pedro</strong>.</p>
                    <p>Colaborador Principal: <a href="https://github.com/Krazete" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Krazete</a></p>
                    <p>Assets originais pertencem à Hidden Variable Studios e Autumn Games.</p>

                    <div class="disclaimer-tooltip" style="margin-top: 20px;">
                        <button class="disclaimer-btn" onclick="handleToggleDisclaimer()" title="Aviso Legal">⚠️</button>
                        <div class="disclaimer-content" id="disclaimer-content">
                            <p><strong>Aviso Legal:</strong> Projeto de Fã - Não afiliado à Hidden Variable Studios ou Autumn Games.</p>
                            <p>Todos os assets pertencem aos seus respectivos proprietários.</p>
                        </div>
                    </div>
                    <p style="font-size: 0.85rem; margin-top: 15px;">Encontrou algum erro ou bug? Reporte no <a href="https://discord.gg/whZJz92RTt" target="_blank" style="color: var(--accent-gold); text-decoration: none;">Servidor Palácio Branco</a>.</p>
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
        <button id="scrollTopBtn" class="scroll-nav-btn" onclick="scrollToTop()" title="Voltar ao topo"></button>
        <button id="scrollToBottomBtn" class="scroll-nav-btn" onclick="scrollToBottom()" title="Ir para o final"></button>
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
