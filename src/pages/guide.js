// =====================================================
// GUIDE PAGE
// Tutorials, Buffs, and Debuffs reference
// =====================================================

import { EFFECT_DATA } from '../data/effectData.js';
import { renderModifierExportModal, initModifierExportModal } from '../components/ExportModifierData.js';
import { loadCatalysts, loadFendaData } from '../services/dataService.js';
import { t } from '../i18n/i18n.js';

export function render() {
    return `
        <div class="guide-container fade-in">
            <div class="guide-header">
                <div class="header-content">
                    <h1>${t('guide.title')}</h1>
                    <p>${t('guide.subtitle')}</p>
                </div>
            </div>

            <div class="guide-tabs">
                <button class="guide-tab-btn active" onclick="switchGuideTab('tutorials')">
                    ${t('guide.tab.tutorials')}
                </button>
                <button class="guide-tab-btn" onclick="switchGuideTab('modifiers')">
                    <img src="img/icones/Button_Modifiers.png" alt="${t('guide.tab.modifiers')}" class="tab-icon">
                    ${t('guide.tab.modifiers')}
                </button>
                <button class="guide-tab-btn" onclick="switchGuideTab('catalysts')">
                    ${t('guide.tab.catalysts')}
                </button>
            </div>

            <div class="guide-content">
                <!-- TUTORIALS TAB -->
                <div id="tab-tutorials" class="guide-tab-content active">
                    <div class="tutorial-grid" style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                        
                        <div class="tutorial-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; text-align: center; cursor: pointer; transition: transform 0.2s, border-color 0.2s;" onclick="navigateTo('tutorial-renda-passiva')" onmouseover="this.style.borderColor='var(--accent-gold)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)';">
                            <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem;">${t('guide.tutorial.renda_title')}</h3>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">${t('guide.tutorial.renda_desc')}</p>
                        </div>

                    </div>
                </div>

                <!-- MODIFIERS TAB (Unified) -->
                <div id="tab-modifiers" class="guide-tab-content">

                    <!-- Export Button -->
                    <div class="export-trigger-section">
                        <button class="export-trigger-btn" onclick="toggleModifierExportModal()">
                            <span class="btn-icon">📥</span>
                            ${t('guide.export_modifiers')}
                        </button>
                    </div>

                    <!-- Export Modal (hidden by default) -->
                    ${renderModifierExportModal()}

                    
                    <!-- BUFFS SECTION -->
                    <div class="modifiers-section">
                        <h2 class="section-title" style="color: var(--accent-green); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                            <img src="img/modifiers/buffs/Regen.png" style="width: 24px; height: 24px;"> 
                            ${t('guide.buffs_title')}
                        </h2>
                        <div class="effects-table-container">
                            <table class="effects-table">
                                <thead>
                                    <tr>
                                        <th>${t('guide.th.icon')}</th>
                                        <th>${t('guide.th.name')}</th>
                                        <th>${t('guide.th.effect')}</th>
                                        <th>${t('guide.th.max')}</th>
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
                            ${t('guide.debuffs_title')}
                        </h2>
                        <div class="effects-table-container">
                            <table class="effects-table">
                                <thead>
                                    <tr>
                                        <th>${t('guide.th.icon')}</th>
                                        <th>${t('guide.th.name')}</th>
                                        <th>${t('guide.th.effect')}</th>
                                        <th>${t('guide.th.max')}</th>
                                    </tr>
                                </thead>
                                <tbody id="debuffs-list">
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style="height: 40px;"></div> <!-- Spacer -->

                    <!-- SPECIAL EFFECTS SECTION -->
                    <div class="modifiers-section">
                        <h2 class="section-title" style="color: #b0bec5; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                            <img src="img/modifiers/permanent/Permanent.png" style="width: 24px; height: 24px;">
                            ${t('guide.permanent_title')}
                        </h2>
                        <div class="effects-table-container">
                            <table class="effects-table">
                                <thead>
                                    <tr>
                                        <th>${t('guide.th.icon')}</th>
                                        <th>${t('guide.th.name')}</th>
                                        <th>${t('guide.th.effect')}</th>
                                        <th>${t('guide.th.max')}</th>
                                    </tr>
                                </thead>
                                <tbody id="special-list">
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- CATALYSTS TAB -->
                <div id="tab-catalysts" class="guide-tab-content">
                    <h2 class="catalyst-title-main">${t('guide.cotw_title')}</h2>
                    
                    <!-- Catalysts of the Week Section -->
                    <div class="cotw-section">
                        <div class="cotw-filters">
                            <button class="cotw-filter-btn" data-element="water">
                                <img src="img/icones/ElementalWaterBackless.png" alt="${t('cotw.water')}">
                                <span>${t('cotw.water')}</span>
                            </button>
                            <button class="cotw-filter-btn" data-element="fire">
                                <img src="img/icones/ElementalFireBackless.png" alt="${t('cotw.fire')}">
                                <span>${t('cotw.fire')}</span>
                            </button>
                            <button class="cotw-filter-btn" data-element="wind">
                            <img src="img/icones/ElementalWindBackless.png" alt="${t('cotw.wind')}">
                            <span>${t('cotw.wind')}</span>
                            </button>
                            <button class="cotw-filter-btn" data-element="light">
                            <img src="img/icones/ElementalLightBackless.png" alt="${t('cotw.light')}">
                            <span>${t('cotw.light')}</span>
                            </button>
                            <button class="cotw-filter-btn" data-element="dark">
                                <img src="img/icones/ElementalDarkBackless.png" alt="${t('cotw.dark')}">
                                <span>${t('cotw.dark')}</span>
                            </button>
                        </div>
                        <div class="catalyst-grid" id="cotw-container-guide">
                            <p class="info-state" style="text-align: center; margin: 20px 0;"></p>
                        </div>
                    </div>

                    <div style="height: 40px; border-bottom: 1px solid #30363d; margin-bottom: 40px;"></div>

                    <div class="catalyst-categories" id="catalyst-container">
                        <!-- Populated by JS -->
                        <div class="loading-state">${t('guide.loading_catalysts')}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function init() {
    renderEffects('buff', 'buffs-list');
    renderEffects('debuff', 'debuffs-list');
    renderSpecialEffects('special-list');
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

    const effects = Object.entries(EFFECT_DATA)
        .filter(([key, e]) => e.type === type && key !== 'permanent')
        .map(([key, e]) => e)
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
                    <p><strong style="color: ${effectColor};">${t('guide.effect.game_desc')}</strong> ${effect.detailed}</p>
                    ${effect.explicacao ? `<p style="margin-top: 6px;"><strong style="color: ${effectColor};">${t('guide.effect.explanation')}</strong> ${effect.explicacao}</p>` : ''}
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
        container.innerHTML = `<p class="error-state">${t('guide.error_catalysts')}</p>`;
        return;
    }

    // Load fenda data for COTW section
    const fendaData = await loadFendaData();

    // Attach event listeners for COTW in Guide
    document.querySelectorAll('#tab-catalysts .cotw-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            const isActive = button.classList.contains('active');

            // Remove active from all
            document.querySelectorAll('#tab-catalysts .cotw-filter-btn').forEach(b => b.classList.remove('active'));

            if (isActive) {
                // If it was already active, we just deactivated it. Clear the container.
                const cotwContainer = document.getElementById('cotw-container-guide');
                if (cotwContainer) {
                    cotwContainer.innerHTML = '<p class="info-state" style="text-align: center; margin: 20px 0;"></p>';
                }
            } else {
                // Otherwise, activate it and render
                button.classList.add('active');
                renderCotw(button.dataset.element, 'cotw-container-guide', fendaData);
            }
        });
    });

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

            container.innerHTML = `
                <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${t('guide.catalysts_title')}</h2>
                ${html}
            `;
            return;
        }
    }

    // Fallback for other formats
    if (Array.isArray(catalysts)) {
        container.innerHTML = `
            <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${t('guide.catalysts_title')}</h2>
            <div class="catalyst-grid">
                ${catalysts.map(cat => renderCatalystCard(cat)).join('')}
            </div>
        `;
    } else if (catalysts.categories && Array.isArray(catalysts.categories)) {
        const categoriesHtml = catalysts.categories.map(catObj => {
            const categoryClass = getCategoryClass(catObj.category);
            return `
                <div class="catalyst-category ${categoryClass}">
                    <h3 style="font-family: 'Washington', sans-serif; color: var(--accent-gold); margin-bottom: 16px;">${catObj.category} ⬇️</h3>
                    <div class="catalyst-grid">
                        ${catObj.items.map(item => renderCatalystCard(item)).join('')}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${t('guide.catalysts_title')}</h2>
            ${categoriesHtml}
        `;
    } else {
        container.innerHTML = `<p class="info-state">${t('guide.catalyst_data_loaded')}</p>`;
    }
}

function renderSpecialEffects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const effect = EFFECT_DATA.permanent;
    if (!effect) return;

    const html = `
        <tr class="effect-row">
            <td class="effect-icon-cell">
                <div class="effect-icon-wrapper">
                    <img src="${effect.icon}" alt="${effect.name}" class="effect-icon-img">
                </div>
            </td>
            <td class="effect-name-cell">
                <span class="effect-name" style="color: ${effect.color};">${effect.name}</span>
            </td>
            <td class="effect-desc-cell">
                <p><strong style="color: ${effect.color};">${t('guide.effect.game_desc')}</strong> ${effect.detailed}</p>
                ${effect.explicacao ? `<p style="margin-top: 6px;"><strong style="color: ${effect.color};">${t('guide.effect.explanation')}</strong> ${effect.explicacao}</p>` : ''}
            </td>
            <td class="effect-stacks-cell">-</td>
        </tr>
    `;

    container.innerHTML = html;
}

// Element to rift map mapping
const ELEMENT_TO_MAP = {
    water: 1,
    fire: 2,
    wind: 3,
    light: 4,
    dark: 5
};

function renderCotw(element, containerId, fendaData) {
    const cotwContainer = document.getElementById(containerId);
    if (!cotwContainer || !fendaData) return;

    const mapNumber = ELEMENT_TO_MAP[element];
    if (!mapNumber) return;

    const map = fendaData.maps.find(m => m.map === mapNumber);
    if (!map) {
        cotwContainer.innerHTML = `<p class="info-state" style="text-align: center; margin: 20px 0;">${t('guide.no_modifiers')}</p>`;
        return;
    }

    // Build cards from all nodes in this map
    const cards = [];
    for (const node of map.nodes) {
        if (node.node === 'Boss') {
            // Merge all boss modifiers into a single card
            const allBossMods = [...node.defender_modifiers, ...node.attacker_modifiers];
            if (allBossMods.length > 0) {
                cards.push(renderBossCard(allBossMods));
            }
        } else {
            // Defender modifiers
            for (const mod of node.defender_modifiers) {
                cards.push(renderRiftModCard(mod, node.node));
            }
            // Attacker modifiers
            for (const mod of node.attacker_modifiers) {
                cards.push(renderRiftModCard(mod, node.node));
            }
        }
    }

    cotwContainer.innerHTML = cards.join('');
}

function renderRiftModCard(mod, nodeName) {
    const formattedDesc = (mod.description || '').replace(/\\n/g, '<br>');

    return `
        <div class="catalyst-card cotw-card">
            <div class="catalyst-card-header">
                <h4>${mod.name}</h4>
                <span class="catalyst-constraint">${nodeName}</span>
            </div>
            <div class="catalyst-description">
                <p>${formattedDesc}</p>
            </div>
        </div>
    `;
}

function renderBossCard(mods) {
    const descriptions = mods.map(mod => {
        const formattedDesc = (mod.description || '').replace(/\\n/g, '<br>');
        return `<p><strong>${mod.name}</strong></p><p>${formattedDesc}</p>`;
    }).join('<br>');

    return `
        <div class="catalyst-card cotw-card">
            <div class="catalyst-card-header">
                <h4>${mods[0].name}</h4>
                <span class="catalyst-constraint">Boss</span>
            </div>
            <div class="catalyst-description">
                ${descriptions}
            </div>
        </div>
    `;
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

function renderCatalystCard(item) {
    // Formatting newlines in description
    const formattedDesc = (item.description || '').replace(/\\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return `
        <div class="catalyst-card">
            <div class="catalyst-card-header">
                <h4>${item.name}</h4>
                ${item.constraint ? `<span class="catalyst-constraint">${item.constraint}</span>` : ''}
            </div>
            <div class="catalyst-description">
                <p>${formattedDesc}</p>
            </div>
        </div>
    `;
}
