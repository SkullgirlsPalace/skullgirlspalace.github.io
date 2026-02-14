// =====================================================
// GUIDE PAGE
// Tutorials, Buffs, and Debuffs reference
// =====================================================

import { EFFECT_DATA } from '../data/effectData.js';

export function render() {
    return `
        <div class="guide-container fade-in">
            <div class="guide-header">
                <div class="header-content">
                    <h1>Guia do Jogo</h1>
                    <p>Referência completa de efeitos, mecânicas e tutoriais.</p>
                </div>
            </div>

            <div class="guide-tabs">
                <button class="guide-tab-btn active" onclick="switchGuideTab('tutorials')">
                    📚 Tutoriais
                </button>
                <button class="guide-tab-btn" onclick="switchGuideTab('buffs')">
                    <img src="img/modifiers/buffs/Regen.png" alt="Buffs" class="tab-icon">
                    Efeitos Positivos
                </button>
                <button class="guide-tab-btn" onclick="switchGuideTab('debuffs')">
                    <img src="img/modifiers/debuffs/Bleed.png" alt="Debuffs" class="tab-icon">
                    Efeitos Negativos
                </button>
            </div>

            <div class="guide-content">
                <!-- TUTORIALS TAB -->
                <div id="tab-tutorials" class="guide-tab-content active">
                    <div class="tutorial-grid">
                        <div class="tutorial-card placeholder">
                            <h3>Em Breve</h3>
                            <p>Tutoriais sobre combate, evolução e economia serão adicionados aqui.</p>
                        </div>
                    </div>
                </div>

                <!-- BUFFS TAB -->
                <div id="tab-buffs" class="guide-tab-content">
                    <div class="effects-table-container">
                        <table class="effects-table">
                            <thead>
                                <tr>
                                    <th>Ícone</th>
                                    <th>Nome</th>
                                    <th>Efeito / Descrição</th>
                                    <th>Máx.</th>
                                </tr>
                            </thead>
                            <tbody id="buffs-list">
                                <!-- Populated by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- DEBUFFS TAB -->
                <div id="tab-debuffs" class="guide-tab-content">
                    <div class="effects-table-container">
                        <table class="effects-table">
                            <thead>
                                <tr>
                                    <th>Ícone</th>
                                    <th>Nome</th>
                                    <th>Efeito / Descrição</th>
                                    <th>Máx.</th>
                                </tr>
                            </thead>
                            <tbody id="debuffs-list">
                                <!-- Populated by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function init() {
    renderEffects('buff', 'buffs-list');
    renderEffects('debuff', 'debuffs-list');

    // Register global tab switcher
    window.switchGuideTab = switchGuideTab;

    // Trigger lazy loading if needed (though we use direct src for icons here mostly)
    if (window.setupLazyLoading) window.setupLazyLoading();
}

function switchGuideTab(tabName) {
    // Update buttons
    document.querySelectorAll('.guide-tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(tabName)) {
            btn.classList.add('active');
        }
    });

    // Update content
    document.querySelectorAll('.guide-tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${tabName}`) {
            content.classList.add('active');
        }
    });
}

function renderEffects(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const effects = Object.values(EFFECT_DATA)
        .filter(e => e.type === type)
        .sort((a, b) => a.name.localeCompare(b.name));

    let html = '';

    effects.forEach(effect => {
        const stacks = effect.stacks ? `${effect.stacks}x` : '-';
        html += `
            <tr class="effect-row">
                <td class="effect-icon-cell">
                    <div class="effect-icon-wrapper">
                        <img src="${effect.icon}" alt="${effect.name}" class="effect-icon-img">
                    </div>
                </td>
                <td class="effect-name-cell">
                    <span class="effect-name">${effect.name}</span>
                </td>
                <td class="effect-desc-cell">
                    <p>${effect.detailed}</p>
                    ${effect.scaling ? `<small class="effect-scaling">Escalonamento: ${effect.scaling}</small>` : ''}
                </td>
                <td class="effect-stacks-cell">${stacks}</td>
            </tr>
        `;
    });

    container.innerHTML = html;
}
