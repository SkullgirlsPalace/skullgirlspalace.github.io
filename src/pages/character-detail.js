// =====================================================
// CHARACTER DETAIL PAGE
// Detailed view of a single character with variants
// =====================================================

import { getCharacter, getCharacters } from '../services/dataService.js';
import { getState, setCurrentCharacter, setCurrentTab, setFilters, setSort } from '../state/store.js';
import { CHARACTER_COLORS, CHARACTER_ICONS } from '../config/constants.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { flattenVariants, filterVariants, sortVariants } from '../utils/sorting.js';
import { renderVariants } from '../components/VariantCard.js';
import { createFilterBar, createSearchBar, updateFilterUI, updateCharacterNav } from '../components/FilterBar.js';
import { createTierView } from '../components/TierTable.js';
import { renderProfileModal } from './character-profile.js';
import { t, getLocalizedNameSync } from '../i18n/index.js';

/**
 * Get all variants across all characters (for "Todos" mode)
 * Each variant gets _charKey and _charName properties
 * @returns {Array} Flat array of all variants
 */
function getAllVariants() {
    const characters = getCharacters();
    if (!characters) return [];

    const allVariants = [];
    for (const [charKey, charData] of Object.entries(characters)) {
        const variants = flattenVariants(charData.variants);
        variants.forEach(v => {
            allVariants.push({
                ...v,
                _charKey: charKey,
                _charName: charData.character
            });
        });
    }
    return allVariants;
}

/**
 * Render character detail page
 * @param {string} charKey - Character key (or 'todos' for all)
 * @param {string} initialTab - Initial tab ('builds' or 'tier')
 * @returns {string} HTML string
 */
export function render(charKey, initialTab = 'builds') {
    // Handle "Todos" mode
    if (charKey === 'todos') {
        return renderTodosPage(initialTab);
    }

    const charData = getCharacter(charKey);
    if (!charData) {
        return `
            <section class="section character-detail">
                <div class="section-header">
                    <button class="btn-back" onclick="navigateTo('')">
                        ←
                    </button>
                    <h2>${t('detail.characterNotFound')}</h2>
                </div>
            </section>
        `;
    }

    const state = getState();
    const currentTab = state.currentTab || initialTab;

    return `
        <section class="section character-detail" id="character-detail" style="--char-accent: ${CHARACTER_COLORS[charData.element]}" data-current-tab="${currentTab}">
            <!-- Header Content -->
            <div class="character-detail-header fade-in">
                <div class="header-top-row">
                    <div class="header-left">
                        <button class="btn-back pill" onclick="navigateTo('')">
                            <span style="font-size: 1.2rem; line-height: 1;">&#8592;</span>
                        </button>
                    </div>
                    
                    <div class="char-title-row centered-title">
                        <img loading="lazy" src="${CHARACTER_ICONS[charKey] || 'img/official/Annie_Icon.webp'}" alt="${getLocalizedNameSync(charData.character)}" class="char-select-icon"
                             onerror="this.src='img/official/Annie_Icon.webp'">
                        <h2>${getLocalizedNameSync(charData.character).charAt(0).toUpperCase() + getLocalizedNameSync(charData.character).slice(1)}</h2>
                    </div>
                    
                    <div class="header-right">
                        ${currentTab !== 'tier' ? createSearchBar() : ''}
                    </div>
                </div>
                
                <div class="header-middle-row">
                    <button class="char-info-btn-centered" onclick="openProfileModal('${charKey}')" title="${t('detail.aboutChar')} ${getLocalizedNameSync(charData.character)}">
                        <img src="img/official/IconInfo.webp" alt="Info" class="char-info-icon-centered">
                        <span>${t('detail.profileOf')} ${getLocalizedNameSync(charData.character).charAt(0).toUpperCase() + getLocalizedNameSync(charData.character).slice(1)}</span>
                    </button>
                </div>
                
                <div class="header-bottom-row">
                    <!-- Tab Navigation -->
                    <div class="detail-tabs">
                        <button class="tab-btn ${currentTab === 'builds' ? 'active' : ''}" 
                                onclick="switchDetailTab('${charKey}', 'builds')" data-tab="builds">
                            ${t('variant.builds')}
                        </button>
                        <button class="tab-btn ${currentTab === 'tier' ? 'active' : ''}" 
                                onclick="switchDetailTab('${charKey}', 'tier')" data-tab="tier">
                            ${t('variant.tierList')}
                        </button>
                    </div>
                </div>
            </div>

            <div id="variants-count-container" style="display: flex; justify-content: flex-end; width: 100%; margin-bottom: 4px;">
                <p class="variants-count" id="variants-count"></p>
            </div>
            ${createFilterBar()}

            <div class="detail-content" id="detail-content">
                ${currentTab === 'builds' ? renderBuildsTab(charKey, charData) : renderTierTab(charKey, charData)}
            </div>

            ${renderProfileModal(charKey)}
        </section>
    `;
}

/**
 * Render "Todos" (all characters) page
 */
function renderTodosPage(initialTab = 'builds') {
    const state = getState();
    const currentTab = state.currentTab || initialTab;

    return `
        <section class="section character-detail" id="character-detail" style="--char-accent: var(--accent-gold)" data-current-tab="${currentTab}" data-todos-mode="true">
            <!-- Header Content -->
            <div class="character-detail-header fade-in">
                <div class="header-top-row">
                    <div class="header-left">
                        <button class="btn-back pill" onclick="navigateTo('')">
                            <span style="font-size: 1.2rem; line-height: 1;">&#8592;</span>
                        </button>
                    </div>
                    
                    <div class="char-title-row centered-title">
                        <h2>${t('detail.allVariants')}</h2>
                    </div>
                    
                    <div class="header-right">
                        ${currentTab !== 'tier' ? createSearchBar() : ''}
                    </div>
                </div>
                
                <div class="header-bottom-row" style="margin-top: 16px;">
                    <!-- Tab Navigation -->
                    <div class="detail-tabs">
                        <button class="tab-btn ${currentTab === 'builds' ? 'active' : ''}" 
                                onclick="switchDetailTab('todos', 'builds')" data-tab="builds">
                            BUILDS
                        </button>
                        <button class="tab-btn ${currentTab === 'tier' ? 'active' : ''}" 
                                onclick="switchDetailTab('todos', 'tier')" data-tab="tier">
                            TIER LIST
                        </button>
                    </div>
                </div>
            </div>

            <div id="variants-count-container" style="display: flex; justify-content: flex-end; width: 100%; margin-bottom: 4px;">
                <p class="variants-count" id="variants-count"></p>
            </div>
            ${createFilterBar()}

            <div class="detail-content" id="detail-content">
                ${currentTab === 'tier' ? renderTodosTierRedirect() : renderTodosBuildsTab()}
            </div>
        </section>
    `;
}

/**
 * Render tier redirect for Todos mode - defaults to Annie
 */
function renderTodosTierRedirect() {
    const characters = getCharacters();
    if (!characters) return '<p>Carregando...</p>';
    
    // Get first character alphabetically (Annie)
    const sortedKeys = Object.keys(characters).sort((a, b) => 
        characters[a].character.localeCompare(characters[b].character)
    );
    const firstCharKey = sortedKeys[0] || 'annie';
    const firstCharData = characters[firstCharKey];
    
    if (firstCharData) {
        return `
            <div class="tier-tab-content">
                ${createTierView(firstCharKey, firstCharData)}
            </div>
        `;
    }
    return '<p style="color: var(--text-muted); text-align: center;">Nenhuma tier list disponível.</p>';
}

/**
 * Render builds tab for "Todos" mode
 */
function renderTodosBuildsTab() {
    const state = getState();
    const { filters, sort } = state.tabState.builds;

    let variants = getAllVariants();
    variants = filterVariants(variants, filters);
    variants = sortVariants(variants, sort, filters);

    let variantsHTML = '';
    if (variants.length === 0) {
        variantsHTML = '<p style="color: var(--text-muted); padding: 20px; text-align: center;">Nenhuma variante encontrada com estes filtros.</p>';
    } else {
        variantsHTML = `<div class="variants-grid" id="variants-container"></div>`;
    }

    return `
        <div class="builds-tab-content">
            ${variantsHTML}
        </div>
    `;
}

/**
 * Render builds tab content
 * @param {string} charKey - Character key
 * @param {Object} charData - Character data
 * @returns {string} HTML string
 */
function renderBuildsTab(charKey, charData) {
    const state = getState();
    const { filters, sort } = state.tabState.builds;

    // Flatten and process variants
    let variants = flattenVariants(charData.variants);
    variants = filterVariants(variants, filters);
    variants = sortVariants(variants, sort, filters);

    // Generate variant cards HTML
    let variantsHTML = '';
    if (variants.length === 0) {
          variantsHTML = `<p style="color: var(--text-muted); padding: 20px; text-align: center;">${t('detail.noVariantsFilters')}</p>`;
    } else {
        variantsHTML = `<div class="variants-grid" id="variants-container"></div>`;
    }

    return `
        <div class="builds-tab-content">
            ${variantsHTML}
        </div>
    `;
}

/**
 * Render tier tab content
 * @param {string} charKey - Character key
 * @param {Object} charData - Character data
 * @returns {string} HTML string
 */
function renderTierTab(charKey, charData) {
    return `
        <div class="tier-tab-content">
            ${createTierView(charKey, charData)}
        </div>
    `;
}

// Global variable to track if we need to reset filters on next char load
let lastCharKey = null;

/**
 * Initialize character detail page
 * @param {string} charKey - Character key
 * @param {string} initialTab - Initial tab
 */
export async function init(charKey, initialTab = 'builds') {
    const { resetAllFilters } = await import('../state/store.js');
    
    // Reset filters ONLY when changing character
    if (charKey !== lastCharKey) {
        resetAllFilters();
        lastCharKey = charKey;
    }

    setCurrentCharacter(charKey);

    // Force render of the initial tab content with clean filters
    await switchTab(charKey, initialTab);

    // Update filter UI
    updateFilterUI();
}

/**
 * Refresh variants display
 * @param {string} charKey - Character key
 */
export function refreshVariants(charKey) {
    const state = getState();
    const { filters, sort } = state.tabState.builds;

    let variants;
    if (charKey === 'todos') {
        variants = getAllVariants();
    } else {
        const charData = getCharacter(charKey);
        if (!charData) return;
        variants = flattenVariants(charData.variants);
    }

    variants = filterVariants(variants, filters);
    variants = sortVariants(variants, sort, filters);

    // Update variant count for all modes
    const countEl = document.getElementById('variants-count');
    if (countEl) {
        countEl.textContent = `${variants.length} variantes encontradas`;
    }

    renderVariants('variants-container', variants, charKey);
}

/**
 * Switch between builds and tier tabs
 * @param {string} charKey - Character key
 * @param {string} tab - Tab to switch to
 */
export async function switchTab(charKey, tab) {
    if (charKey === 'todos' && tab === 'tier') {
        const { getCharacters } = await import('../services/dataService.js');
        const characters = getCharacters();
        const sortedKeys = Object.keys(characters).sort((a, b) => 
            characters[a].character.localeCompare(characters[b].character)
        );
        const firstCharKey = sortedKeys[0] || 'annie';
        
        const { navigateTo } = await import('../router.js');
        return navigateTo(`character/${firstCharKey}/tier`);
    }

    const state = getState();
    const previousTab = state.currentTab;

    setCurrentTab(tab);

    // Update tab button states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Update data-current-tab attribute for CSS-based sort button visibility
    const sectionEl = document.getElementById('character-detail');
    if (sectionEl) {
        sectionEl.dataset.currentTab = tab;
    }

    // Re-render content
    const contentEl = document.getElementById('detail-content');
    const countContainer = document.getElementById('variants-count-container');
    if (countContainer) {
        countContainer.style.display = tab === 'builds' ? 'flex' : 'none';
    }
    
    if (contentEl) {
        if (charKey === 'todos') {
            if (tab === 'tier') {
                contentEl.innerHTML = renderTodosTierRedirect();
            } else {
                contentEl.innerHTML = renderTodosBuildsTab();
                refreshVariants('todos');
            }
        } else {
            const charData = getCharacter(charKey);
            if (charData) {
                contentEl.innerHTML = tab === 'builds'
                    ? renderBuildsTab(charKey, charData)
                    : renderTierTab(charKey, charData);

                if (tab === 'builds') {
                    refreshVariants(charKey);
                }
            }
        }
    }

    updateCharacterNav(charKey, tab);

    // Update filter UI to match the current sort state
    const { updateFilterUI } = await import('../components/FilterBar.js');
    updateFilterUI();
}

// Global function for tab switching
window.switchDetailTab = switchTab;
