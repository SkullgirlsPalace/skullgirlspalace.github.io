import { ELEMENT_MAP, RARITY_ICONS, CHARACTER_COLORS, getElementMap, getRarityLabels } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { formatText, formatArsenal, formatBuildText } from '../utils/formatters.js';
import { getState, updateCharacterData } from '../state/store.js';
import { t } from '../i18n/i18n.js';

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
    const charColor = CHARACTER_COLORS[charKey] || 'var(--accent-gold)';

    const currentElementMap = getElementMap();
    const elementInfo = currentElementMap[variant.element] || ELEMENT_MAP[variant.element] || {
        icon: '⚪',
        class: 'neutral',
        iconPath: 'img/icones/ElementalFireBackless.png',
        statIcon: 'img/icones/ElementalIconNeutral.png'
    };

    // Get portrait URL - prioritize local backup, fallback to JSON, then default
    let portraitUrl = getVariantImage(charKey, variant.name, index, variant.name_original);
    if (portraitUrl.includes('_Icon.png') && variant.images?.portrait_url) {
        portraitUrl = variant.images.portrait_url;
    }

    // Format ability description
    const abilityDesc = formatText(variant.signature_ability?.description || t('variant.no_desc'), variant.name);

    // Format arsenal with images
    const arsenalHTML = formatArsenal(variant.recommended_arsenal || '', charKey);

    // Get rarity display name
    const rarityKey = variant.rarityKey || 'diamante';
    const rarityLabel = getRarityLabels()[rarityKey] || rarityKey.toUpperCase();
    const rarityIcon = RARITY_ICONS[rarityKey] || '';

    // Unique ID for this card's tabs
    const cardId = `variant-${charKey}-${index}`;

    // Build content - check if we have build or arsenal data
    const buildText = variant.recommended_build || '';
    const hasBuildContent = !!(buildText || arsenalHTML);

    const saName = variant.signature_ability?.name || t('variant.default_sa');

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
                        <img src="img/icones/AttackIcon.png" alt="${t('variant.stat.atk')}" class="stat-icon">
                        <span class="label">${t('variant.stat.atk')}</span>
                        <span class="value">${variant.stats?.attack || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="img/icones/HealthIcon.png" alt="${t('variant.stat.hp')}" class="stat-icon">
                        <span class="label">${t('variant.stat.hp')}</span>
                        <span class="value">${variant.stats?.health || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="${elementInfo.statIcon}" alt="${variant.element}" class="stat-icon">
                        <span class="label">${t('variant.stat.power')}</span>
                        <span class="value">${variant.stats?.power || '-'}</span>
                    </div>
                </div>
                
                <!-- Tab Navigation -->
                <div class="variant-tabs">
                    <button class="variant-tab-btn active" data-tab="habilidade" data-card="${cardId}">
                        ${t('variant.tab.ability')}
                    </button>
                    ${hasBuildContent ? `
                        <button class="variant-tab-btn" data-tab="build" data-card="${cardId}">
                            ${t('variant.tab.build')}
                        </button>
                    ` : ''}
                    ${state.isEditorMode ? `
                        <button class="save-data-btn small" style="margin-left: auto; padding: 4px 10px; font-size: 0.7rem;" 
                                onclick="handleExportCharacterJSON('${charKey}')">
                            ${t('editor.export_json')}
                        </button>
                    ` : ''}
                </div>
                
                <div class="variant-tab-contents" id="${cardId}-contents">
                    <!-- Habilidade Tab (Signature + Marquee Unified) -->
                    <div class="variant-tab-content active" data-tab="habilidade">
                        <div class="ability-box ${editingClass}" onclick="handleEditVariantField('${charKey}', '${variant.name}', 'signature_ability')">
                            <h4 style="margin-bottom: 8px;">
                                <span style="color: var(--accent-gold)">${t('variant.sa_label')}</span>
                                <span style="color: #fff; margin-left: 6px;">${saName.toUpperCase()}</span>
                            </h4>
                            <p style="margin-bottom: 16px;">${abilityDesc}</p>
                            
                            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 16px 0;"></div>
                            
                            ${variant.marquee_ability ? `
                                <h4 style="font-size: 0.85rem; margin-bottom: 0;">
                                    <span style="color: var(--accent-gold)">${t('variant.marquee_label')}</span>
                                    <span style="color: #fff; margin-left: 6px;">${String(variant.marquee_ability).toUpperCase()}</span>
                                </h4>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Build Tab (Build + Arsenal) -->
                    ${hasBuildContent ? `
                        <div class="variant-tab-content" data-tab="build">
                            ${buildText ? `
                                <div class="ability-box build ${editingClass}" onclick="handleEditVariantField('${charKey}', '${variant.name}', 'recommended_build')">
                                    <h4>${t('variant.build_label')}</h4>
                                    <p>${formatBuildText(buildText)}</p>
                                </div>
                            ` : ''}
                            
                            ${arsenalHTML ? `
                                <div class="ability-box arsenal ${editingClass}" onclick="handleEditVariantField('${charKey}', '${variant.name}', 'recommended_arsenal')">
                                    <h4>${t('variant.arsenal_label')}</h4>
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
        container.innerHTML = `<p style="color: var(--text-muted); padding: 20px;">${t('detail.no_variants')}</p>`;
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
        promptMsg = `${t('editor.edit_ability')} ${variantName}:`;
    } else if (field === 'recommended_build') {
        currentValue = targetVariant.recommended_build || '';
        promptMsg = `${t('editor.edit_build')} ${variantName}:`;
    } else if (field === 'recommended_arsenal') {
        currentValue = targetVariant.recommended_arsenal || '';
        promptMsg = `${t('editor.edit_arsenal')} ${variantName} (formato string):`;
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
