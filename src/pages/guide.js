// =====================================================
// GUIDE PAGE
// Tutorials, Buffs, and Debuffs reference
// =====================================================

import { EFFECT_DATA } from '../data/effectData.js';
import { renderModifierExportModal, initModifierExportModal } from '../components/ExportModifierData.js';
import { loadCatalysts } from '../services/dataService.js';

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
                <button class="guide-tab-btn" onclick="switchGuideTab('modifiers')">
                    <img src="img/icones/Button_Modifiers.png" alt="Modificadores" class="tab-icon">
                    Modificadores
                </button>
                <button class="guide-tab-btn" onclick="switchGuideTab('catalysts')">
                    ⚡ Catalisadores
                </button>
            </div>

            <div class="guide-content">
                <!-- TUTORIALS TAB -->
                <div id="tab-tutorials" class="guide-tab-content active">
                    <div class="tutorial-grid" style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                        
                        <div class="tutorial-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; text-align: center; cursor: pointer; transition: transform 0.2s, border-color 0.2s;" onclick="navigateTo('tutorial-renda-passiva')" onmouseover="this.style.borderColor='var(--accent-gold)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)';">
                            <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem;">📜 Manifesto da Renda Passiva da Fenda</h3>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">Guia definitivo sobre como otimizar seus ganhos de Fenda com o mínimo de esforço (Estratégia 80/20).</p>
                        </div>

                    </div>
                </div>

                <!-- MODIFIERS TAB (Unified) -->
                <div id="tab-modifiers" class="guide-tab-content">

                    <!-- Export Button -->
                    <div class="export-trigger-section">
                        <button class="export-trigger-btn" onclick="toggleModifierExportModal()">
                            <span class="btn-icon">📥</span>
                            Exportar Modificadores
                        </button>
                    </div>

                    <!-- Export Modal (hidden by default) -->
                    ${renderModifierExportModal()}

                    
                    <!-- BUFFS SECTION -->
                    <div class="modifiers-section">
                        <h2 class="section-title" style="color: var(--accent-green); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                            <img src="img/modifiers/buffs/Regen.png" style="width: 24px; height: 24px;"> 
                            Efeitos Positivos
                        </h2>
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

                    <div style="height: 40px;"></div> <!-- Spacer -->

                    <!-- DEBUFFS SECTION -->
                    <div class="modifiers-section">
                        <h2 class="section-title" style="color: var(--accent-red); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                            <img src="img/modifiers/debuffs/Bleed.png" style="width: 24px; height: 24px;">
                            Efeitos Negativos
                        </h2>
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
                
                <!-- CATALYSTS TAB -->
                <div id="tab-catalysts" class="guide-tab-content">
                    <div class="catalysts-intro">
                        <p>Catalisadores são modificadores que o Jogador pode aplicar em seus nós de Batalha na sua Base em Batalhas da Fenda, esses modificadores são essênciais para dificultar o ataque contra sua base, além dos modificadores da semana.</p>
                    </div>
                    <div class="catalyst-categories" id="catalyst-container">
                        <!-- Populated by JS -->
                        <div class="loading-state">Carregando catalisadores...</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function init() {
    renderEffects('buff', 'buffs-list');
    renderEffects('debuff', 'debuffs-list');
    initCatalysts();

    // Register global tab switcher
    window.switchGuideTab = switchGuideTab;

    // Initialize modifier export modal listeners
    initModifierExportModal();

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

    effects.forEach((effect, index) => {
        const stacks = effect.stacks ? `${effect.stacks}x` : '-';
        const effectColor = effect.color || 'var(--text-primary)';
        html += `
            <tr class="effect-row">
                <td class="effect-icon-cell">
                    <div class="effect-icon-wrapper">
                        <img src="${effect.icon}" alt="${effect.name}" class="effect-icon-img">
                    </div>
                </td>
                <td class="effect-name-cell">
                    <span class="effect-name" style="color: ${effectColor};">${effect.name}</span>
                </td>
                <td class="effect-desc-cell">
                    <p><strong style="color: ${effectColor};">Descrição do Jogo:</strong> ${effect.detailed}</p>
                    ${effect.explicacao ? `<p style="margin-top: 6px;"><strong style="color: ${effectColor};">Explicação:</strong> ${effect.explicacao}</p>` : ''}
                    ${effect.scaling ? `<small class="effect-scaling" style="display: block; margin-top: 6px;">Escalonamento: ${effect.scaling}</small>` : ''}
                </td>
                <td class="effect-stacks-cell">${stacks}</td>
            </tr>
        `;
    });

    container.innerHTML = html;
}

// =====================================================
// CATALYST RENDERING LOGIC
// =====================================================

async function initCatalysts() {
    const container = document.getElementById('catalyst-container');
    if (!container) return;

    const catalysts = await loadCatalysts();
    if (!catalysts) {
        container.innerHTML = '<p class="error-state">Erro ao carregar catalisadores.</p>';
        return;
    }

    // Handle Discord embed format
    if (catalysts.embeds && Array.isArray(catalysts.embeds)) {
        const embed = catalysts.embeds[0];
        if (embed) {
            let html = '';

            // Title
            if (embed.title) {
                html += `<h3 class="catalyst-title">${embed.title}</h3>`;
            }

            // Description (array of strings)
            if (embed.description && Array.isArray(embed.description)) {
                html += `<div class="catalyst-description">${embed.description.map(line =>
                    line ? `<p>${formatCatalystText(line)}</p>` : '<br>'
                ).join('')}</div>`;
            }

            // Fields (categories of catalysts)
            if (embed.fields && Array.isArray(embed.fields)) {
                html += '<div class="catalyst-fields">';
                embed.fields.forEach(field => {
                    const categoryClass = getCategoryClass(field.name);
                    html += `
                        <div class="catalyst-category ${categoryClass}">
                            <h4>${field.name}</h4>
                            <ul class="catalyst-list">
                                ${(Array.isArray(field.value) ? field.value : [field.value]).map(item =>
                        `<li>${formatCatalystText(item)}</li>`
                    ).join('')}
                            </ul>
                        </div>
                    `;
                });
                html += '</div>';
            }

            container.innerHTML = html;
            return;
        }
    }

    // Fallback for other formats
    if (Array.isArray(catalysts)) {
        container.innerHTML = `
            <div class="catalyst-grid">
                ${catalysts.map(cat => renderCatalystCard(cat)).join('')}
            </div>
        `;
    } else if (catalysts.categories) {
        container.innerHTML = Object.entries(catalysts.categories).map(([category, items]) => `
            <div class="catalyst-category">
                <h3>${category}</h3>
                <div class="catalyst-grid">
                    ${items.map(cat => renderCatalystCard(cat)).join('')}
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = '<p class="info-state">Dados de catalisadores carregados.</p>';
    }
}

function getCategoryClass(name) {
    if (name.toLowerCase().includes('forte')) return 'cat-strong';
    if (name.toLowerCase().includes('bom')) return 'cat-good';
    if (name.toLowerCase().includes('mediano')) return 'cat-medium';
    if (name.toLowerCase().includes('ruim')) return 'cat-weak';
    return '';
}

function formatCatalystText(text) {
    if (!text) return '';
    text = text.replace(/^\*\s*/, '');
    text = text.replace(/^###\s*/, '');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\(\+\)/g, '<span class="notation notation-plus" style="color: #4ade80;">(+)</span>');
    text = text.replace(/\(=\)/g, '<span class="notation notation-equal" style="color: #fbbf24;">(=)</span>');
    text = text.replace(/\(-\)/g, '<span class="notation notation-minus" style="color: #f87171;">(-)</span>');
    return text;
}

function renderCatalystCard(catalyst) {
    return `
        <div class="catalyst-card">
            ${catalyst.icon ? `<img src="${catalyst.icon}" alt="${catalyst.name}" class="catalyst-icon">` : ''}
            <h4>${catalyst.name || 'Catalisador'}</h4>
            <p>${catalyst.description || ''}</p>
            ${catalyst.rarity ? `<span class="catalyst-rarity ${catalyst.rarity}">${catalyst.rarity.toUpperCase()}</span>` : ''}
        </div>
    `;
}
