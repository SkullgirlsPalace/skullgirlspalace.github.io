import { ELEMENT_MAP, RARITY_LABELS, RARITY_ICONS } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { formatText, formatArsenal, formatBuildText } from '../utils/formatters.js';
import { getState, updateCharacterData } from '../state/store.js';

/**
 * Create variant card HTML with tabbed sections
 * @param {Object} variant - Variant data object
 * @param {string} charKey - Current character key
 * @param {number} index - Index for animation delay
 * @returns {string} HTML string
 */
export function createVariantCard(variant, charKey, index = 0) {
    const state = getState();
    const editingClass = state.isEditorMode ? 'editing' : '';

    const elementInfo = ELEMENT_MAP[variant.element] || {
        icon: '⚪',
        class: 'neutral',
        iconPath: 'img/icones/ElementalFireBackless.png',
        statIcon: 'img/icones/ElementalIconNeutral.png'
    };

    // Get portrait URL - prioritize local backup, fallback to JSON, then default
    let portraitUrl = getVariantImage(charKey, variant.name, index);
    if (portraitUrl.includes('_Icon.png') && variant.images?.portrait_url) {
        portraitUrl = variant.images.portrait_url;
    }

    // Format ability description
    const abilityDesc = formatText(variant.signature_ability?.description || 'Sem descrição');

    // Format arsenal with images
    const arsenalHTML = formatArsenal(variant.recommended_arsenal || '', charKey);

    // Get rarity display name
    const rarityKey = variant.rarityKey || 'diamante';
    const rarityLabel = RARITY_LABELS[rarityKey] || rarityKey.toUpperCase();
    const rarityIcon = RARITY_ICONS[rarityKey] || '';

    // Unique ID for this card's tabs
    const cardId = `variant-${charKey}-${index}`;

    // Build content - check if we have build or arsenal data
    const buildText = variant.recommended_build || '';
    const hasBuildContent = !!(buildText || arsenalHTML);

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
                        <span class="rarity-badge ${rarityKey}">
                            ${rarityIcon ? `<img src="${rarityIcon}" alt="${rarityLabel}" class="rarity-icon">` : ''}
                            ${rarityLabel}
                        </span>
                    </div>
                </div>
                
                <div class="variant-stats">
                    <div class="stat-item">
                        <img src="img/icones/AttackIcon.png" alt="ATQ" class="stat-icon">
                        <span class="label">ATQ</span>
                        <span class="value">${variant.stats?.attack || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="img/icones/HealthIcon.png" alt="Vida" class="stat-icon">
                        <span class="label">Vida</span>
                        <span class="value">${variant.stats?.health || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="${elementInfo.statIcon}" alt="${variant.element}" class="stat-icon">
                        <span class="label">Poder</span>
                        <span class="value">${variant.stats?.power || '-'}</span>
                    </div>
                </div>
                
                <!-- Tab Navigation -->
                <div class="variant-tabs">
                    <button class="variant-tab-btn active" data-tab="habilidade" data-card="${cardId}">
                        Habilidade
                    </button>
                    ${hasBuildContent ? `
                        <button class="variant-tab-btn" data-tab="build" data-card="${cardId}">
                            Build
                        </button>
                    ` : ''}
                    ${state.isEditorMode ? `
                        <button class="save-data-btn small" style="margin-left: auto; padding: 4px 10px; font-size: 0.7rem;" 
                                onclick="handleExportCharacterJSON('${charKey}')">
                            Export JSON
                        </button>
                    ` : ''}
                </div>
                
                <div class="variant-tab-contents" id="${cardId}-contents">
                    <!-- Habilidade Tab (Signature + Marquee Unified) -->
                    <div class="variant-tab-content active" data-tab="habilidade">
                        <div class="ability-box ${editingClass}" onclick="handleEditVariantField('${charKey}', '${variant.name}', 'signature_ability')">
                            <h4 style="color: var(--accent-gold); margin-bottom: 8px;">
                                ${variant.signature_ability?.name || 'Habilidade Especial'}
                            </h4>
                            <p style="margin-bottom: 16px;">${abilityDesc}</p>
                            
                            ${variant.marquee_ability ? `
                                <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 16px 0;"></div>
                                <h4 style="color: var(--rarity-${rarityKey}); font-size: 0.85rem; margin-bottom: 0;">
                                    SUPERIOR RECOMENDADA: <span style="color: inherit; margin-left: 6px;">${String(variant.marquee_ability).toUpperCase()}</span>
                                </h4>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Build Tab (Build + Arsenal) -->
                    ${hasBuildContent ? `
                        <div class="variant-tab-content" data-tab="build">
                            ${buildText ? `
                                <div class="ability-box build ${editingClass}" onclick="handleEditVariantField('${charKey}', '${variant.name}', 'recommended_build')">
                                    <h4>BUILD RECOMENDADA</h4>
                                    <p>${formatBuildText(buildText)}</p>
                                </div>
                            ` : ''}
                            
                            ${arsenalHTML ? `
                                <div class="ability-box arsenal ${editingClass}" onclick="handleEditVariantField('${charKey}', '${variant.name}', 'recommended_arsenal')">
                                    <h4>ARSENAL RECOMENDADO</h4>
                                    <div class="arsenal-list">${arsenalHTML}</div>
                                </div>
                            ` : ''}
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

    // Attach event listeners for tab switching
    container.querySelectorAll('.variant-tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const cardId = this.dataset.card;
            const tabName = this.dataset.tab;
            switchVariantTab(cardId, tabName);
        });
    });
}

/**
 * Switch variant card tab
 * @param {string} cardId - Card ID
 * @param {string} tabName - Tab name to switch to
 */
function switchVariantTab(cardId, tabName) {
    const contents = document.getElementById(`${cardId}-contents`);
    if (!contents) return;

    // Update tab buttons
    const card = contents.closest('.variant-card');
    if (card) {
        card.querySelectorAll('.variant-tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === tabName;
            btn.classList.toggle('active', isActive);
        });
    }

    // Update tab contents
    contents.querySelectorAll('.variant-tab-content').forEach(content => {
        const isActive = content.dataset.tab === tabName;
        content.classList.toggle('active', isActive);
    });
}

export function handleEditVariantField(charKey, variantName, field) {
    const state = getState();
    if (!state.isEditorMode) return;

    const charData = state.characters[charKey];
    if (!charData) return;

    // Find variant in charData
    let targetVariant = null;
    let targetRarity = null;
    let targetIndex = -1;

    for (const rarity in charData.variants) {
        const idx = charData.variants[rarity].findIndex(v => v.name === variantName);
        if (idx !== -1) {
            targetVariant = charData.variants[rarity][idx];
            targetRarity = rarity;
            targetIndex = idx;
            break;
        }
    }

    if (!targetVariant) return;

    let currentValue = '';
    let promptMsg = '';

    if (field === 'signature_ability') {
        currentValue = targetVariant.signature_ability?.description || '';
        promptMsg = `Editar descrição da habilidade para ${variantName}:`;
    } else if (field === 'recommended_build') {
        currentValue = targetVariant.recommended_build || '';
        promptMsg = `Editar build recomendada para ${variantName}:`;
    } else if (field === 'recommended_arsenal') {
        currentValue = targetVariant.recommended_arsenal || '';
        promptMsg = `Editar arsenal recomendado para ${variantName} (formato string):`;
    }

    const newValue = prompt(promptMsg, currentValue);

    if (newValue !== null) {
        updateCharacterData(charKey, (char) => {
            const updatedChar = { ...char };
            const updatedVariant = { ...updatedChar.variants[targetRarity][targetIndex] };

            if (field === 'signature_ability') {
                updatedVariant.signature_ability = { ...updatedVariant.signature_ability, description: newValue };
            } else {
                updatedVariant[field] = newValue;
            }

            updatedChar.variants[targetRarity][targetIndex] = updatedVariant;
            return updatedChar;
        });

        if (window.onFiltersChanged) {
            window.onFiltersChanged();
        }
    }
}
