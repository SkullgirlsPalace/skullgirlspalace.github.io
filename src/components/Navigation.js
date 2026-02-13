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
                <div class="logo" onclick="navigateTo('')">SG MOBILE WIKI</div>
                <a href="javascript:void(0)" onclick="handleToggleAboutDrawer()" class="about-link">
                    <img src="img/icones/IconInfo.png" alt="">
                    <span>sobre</span>
                </a>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="javascript:void(0)" onclick="navigateTo('')">Inicio</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('characters')">Personagens</a></li>
                <li><a href="javascript:void(0)" onclick="navigateTo('catalysts')">Catalisadores</a></li>
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
                    <h1>Skullgirls Mobile Wiki</h1>
                    <p>Sua fonte completa de builds, estatísticas e estratégias para Skullgirls Mobile. Um projeto da comunidade Palácio Branco.</p>
                    <div class="hero-buttons">
                        <a href="https://discord.gg/9dZqtVz6pz" target="_blank" class="btn btn-primary">
                            💬 Discord
                        </a>
                        <a href="https://github.com/bot-do-jao/palacio-branco-entreprises" target="_blank" class="btn btn-secondary">
                            📦 GitHub
                        </a>
                    </div>
                </div>

                <div class="info-cards vertical">
                    <div class="card-link">
                        <h3>📖 Builds Completas</h3>
                        <p>Variantes com atributos recomendados e arsenal otimizado.</p>
                    </div>
                    <div class="card-link">
                        <h3>📊 Calculadora</h3>
                        <p>Simule seus ganhos mensais de Canopy Coins e Teonita.</p>
                    </div>
                    <div class="card-link">
                        <h3>🏰 Comunidade</h3>
                        <p>Projeto de fãs para fãs. Junte-se ao servidor Palácio Branco!</p>
                    </div>
                </div>

                <div class="credits-section">
                    <h4>✨ Créditos</h4>
                    <p>Desenvolvido por <strong>Lifi ツ</strong> e <strong>João Pedro</strong>.</p>
                    <p>Assets originais pertencem à Hidden Variable Studios e Autumn Games.</p>

                    <div class="disclaimer-tooltip" style="margin-top: 20px;">
                        <button class="disclaimer-btn" onclick="handleToggleDisclaimer()" title="Aviso Legal">⚠️</button>
                        <div class="disclaimer-content" id="disclaimer-content">
                            <p><strong>Aviso Legal:</strong> Projeto de Fã - Não afiliado à Hidden Variable Studios ou Autumn Games.</p>
                            <p>Todos os assets pertencem aos seus respectivos proprietários.</p>
                        </div>
                    </div>
                    <p style="font-size: 0.85rem; margin-top: 15px;">Encontrou um erro? Reporte no servidor <a href="https://discord.gg/9dZqtVz6pz" target="_blank">Palácio Branco</a>.</p>
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
        <div class="scroll-nav">
            <button onclick="scrollToTop()" id="scrollTopBtn" title="Ir para o Topo"></button>
            <button onclick="scrollToBottom()" id="scrollToBottomBtn" title="Ir para o Final"></button>
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
