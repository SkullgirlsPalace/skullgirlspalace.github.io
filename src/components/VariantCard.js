// =====================================================
// VARIANT CARD COMPONENT
// Renders a detailed variant card with stats and abilities
// =====================================================

import { ELEMENT_MAP, RARITY_LABELS } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { formatText, formatArsenal } from '../utils/formatters.js';

/**
 * Create variant card HTML with tabbed sections
 * @param {Object} variant - Variant data object
 * @param {string} charKey - Current character key
 * @param {number} index - Index for animation delay
 * @returns {string} HTML string
 */
export function createVariantCard(variant, charKey, index = 0) {
    const elementInfo = ELEMENT_MAP[variant.element] || {
        icon: '⚪',
        class: 'neutral',
        iconPath: 'img/icones/ElementalIconNeutral.png'
    };

    // Get portrait URL - prioritize local backup, fallback to JSON, then default
    let portraitUrl = getVariantImage(charKey, variant.name, index);
    if (portraitUrl.includes('_Icon.png') && variant.images?.portrait_url) {
        portraitUrl = variant.images.portrait_url;
    }

    // Format ability description
    const abilityDesc = formatText(variant.signature_ability?.description || 'Sem descrição');

    // Format arsenal
    const arsenal = formatArsenal(variant.recommended_arsenal || '');

    // Get rarity display name
    const rarityKey = variant.rarityKey || 'diamante';
    const rarityLabel = RARITY_LABELS[rarityKey] || rarityKey.toUpperCase();

    // Unique ID for this card's tabs
    const cardId = `variant-${charKey}-${index}`;

    // Check what content is available
    const hasBuildContent = variant.marquee_ability || variant.recommended_build;
    const hasArsenalContent = arsenal;

    return `
        <div class="variant-card ${rarityKey} animate-in" style="animation-delay: ${index * 0.05}s">
            <img src="${portraitUrl}" alt="${variant.name}" class="variant-portrait" loading="lazy"
                 onerror="this.src='img/icones/Annie_Icon.png'">
            
            <div class="variant-info">
                <div class="variant-header">
                    <h3>${variant.name}</h3>
                    <div class="variant-meta">
                        <span class="element-badge ${elementInfo.class}">
                            <img src="${elementInfo.iconPath}" alt="${variant.element}">
                            ${variant.element.toUpperCase()}
                        </span>
                        <span class="rarity-badge ${rarityKey}">${rarityLabel}</span>
                    </div>
                </div>
                
                <div class="variant-stats">
                    <div class="stat-item">
                        <img src="img/icones/AttackIcon.png" alt="ATQ" class="stat-icon">
                        <span class="label">ATQ</span>
                        <span class="value">${variant.stats?.attack || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="img/icones/HealthIcon.png" alt="VD" class="stat-icon">
                        <span class="label">VD</span>
                        <span class="value">${variant.stats?.health || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="${elementInfo.iconPath}" alt="${variant.element}" class="stat-icon">
                        <span class="label">Poder</span>
                        <span class="value">${variant.stats?.power || '-'}</span>
                    </div>
                </div>
                
                <!-- Card Tabs Navigation -->
                <div class="variant-tabs" data-card-id="${cardId}">
                    <button class="variant-tab-btn active" data-tab="habilidade" onclick="switchVariantTab('${cardId}', 'habilidade')">
                        🎯 Habilidade
                    </button>
                    ${hasBuildContent ? `
                        <button class="variant-tab-btn" data-tab="build" onclick="switchVariantTab('${cardId}', 'build')">
                            📊 Build
                        </button>
                    ` : ''}
                    ${hasArsenalContent ? `
                        <button class="variant-tab-btn" data-tab="arsenal" onclick="switchVariantTab('${cardId}', 'arsenal')">
                            🎒 Arsenal
                        </button>
                    ` : ''}
                </div>
                
                <!-- Tab Contents -->
                <div class="variant-tab-contents" data-card-id="${cardId}">
                    <!-- Habilidade Tab (Default Active) -->
                    <div class="variant-tab-content active" data-tab="habilidade">
                        <div class="ability-box">
                            <h4>🎯 ${variant.signature_ability?.name || 'Habilidade Especial'}</h4>
                            <p>${abilityDesc}</p>
                        </div>
                    </div>
                    
                    <!-- Build Tab -->
                    ${hasBuildContent ? `
                        <div class="variant-tab-content" data-tab="build">
                            ${variant.marquee_ability ? `
                                <div class="ability-box marquee">
                                    <h4>⭐ Superior Recomendada: ${variant.marquee_ability}</h4>
                                </div>
                            ` : ''}
                            ${variant.recommended_build ? `
                                <div class="ability-box build">
                                    <h4>📊 Build Recomendada</h4>
                                    <p>${variant.recommended_build}</p>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    <!-- Arsenal Tab -->
                    ${hasArsenalContent ? `
                        <div class="variant-tab-content" data-tab="arsenal">
                            <div class="arsenal-box">
                                <h4>🎒 Arsenal Recomendado</h4>
                                <div class="arsenal-list">${arsenal}</div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Render variants container
 * @param {string} containerId - Container element ID
 * @param {Array} variants - Array of variant objects
 * @param {string} charKey - Current character key
 */
export function renderVariants(containerId, variants, charKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!variants || variants.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); padding: 20px;">Nenhuma variante encontrada com estes filtros.</p>';
        return;
    }

    container.innerHTML = variants
        .map((variant, index) => createVariantCard(variant, charKey, index))
        .join('');
}
