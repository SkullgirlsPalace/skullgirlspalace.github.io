// =====================================================
// CATALYSTS PAGE
// Catalyst guide and reference
// =====================================================

import { loadCatalysts } from '../services/dataService.js';

/**
 * Render catalysts page
 * @returns {string} HTML string
 */
export function render() {
    return `
        <section class="section catalysts-section" id="catalysts">
            <div class="section-header">
                <button class="btn-back" onclick="navigateTo('')">
                    ←
                </button>
                <h2>Catalisadores</h2>
            </div>
            
            <div class="catalysts-intro">
                <p>Catalisadores são itens especiais que podem ser aplicados aos seus lutadores no modo Fenda (Rift). 
                   Eles oferecem bônus e modificadores únicos que podem fazer a diferença nas batalhas.</p>
            </div>

            <div class="catalyst-categories" id="catalyst-container">
                <!-- Populated by JS -->
                <div class="loading-state">Carregando catalisadores...</div>
            </div>
        </section>
    `;
}

/**
 * Initialize catalysts page
 */
export async function init() {
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

/**
 * Get CSS class based on category name
 * @param {string} name - Category name
 * @returns {string} CSS class
 */
function getCategoryClass(name) {
    if (name.toLowerCase().includes('forte')) return 'cat-strong';
    if (name.toLowerCase().includes('bom')) return 'cat-good';
    if (name.toLowerCase().includes('mediano')) return 'cat-medium';
    if (name.toLowerCase().includes('ruim')) return 'cat-weak';
    return '';
}

/**
 * Format catalyst text (clean markdown-like syntax)
 * @param {string} text - Text to format
 * @returns {string} Formatted HTML
 */
function formatCatalystText(text) {
    if (!text) return '';
    // Remove leading * and spaces
    text = text.replace(/^\*\s*/, '');
    // Remove markdown headers
    text = text.replace(/^###\s*/, '');
    // Bold markers
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Notation hints with colors - strong (+)
    text = text.replace(/\(\+\)/g, '<span class="notation notation-plus" style="color: #4ade80;">(+)</span>');
    // Notation hints with colors - good/equal (=)
    text = text.replace(/\(=\)/g, '<span class="notation notation-equal" style="color: #fbbf24;">(=)</span>');
    // Notation hints with colors - weak (-)
    text = text.replace(/\(-\)/g, '<span class="notation notation-minus" style="color: #f87171;">(-)</span>');
    return text;
}

/**
 * Render a single catalyst card
 * @param {Object} catalyst - Catalyst data
 * @returns {string} HTML string
 */
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
