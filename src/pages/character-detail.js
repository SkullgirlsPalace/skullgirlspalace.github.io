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
import { createFilterBar, updateFilterUI, updateCharacterNav } from '../components/FilterBar.js';
import { createTierView } from '../components/TierTable.js';

/**
 * Render character detail page
 * @param {string} charKey - Character key
 * @param {string} initialTab - Initial tab ('builds' or 'tier')
 * @returns {string} HTML string
 */
export function render(charKey, initialTab = 'builds') {
    const charData = getCharacter(charKey);
    if (!charData) {
        return `
            <section class="section character-detail">
                <div class="section-header">
                    <button class="btn-back" onclick="navigateTo('characters')">
                        ←
                    </button>
                    <h2>Personagem não encontrado</h2>
                </div>
            </section>
        `;
    }

    const charColor = CHARACTER_COLORS[charKey] || 'var(--accent-gold)';
    const masteryIcon = getMasteryIcon(charKey);
    const state = getState();
    const currentTab = state.currentTab || initialTab;

    return `
        <section class="section character-detail" id="character-detail" style="--char-accent: ${charColor}">
            <div class="section-header">
                <button class="btn-back" onclick="navigateTo('characters')">
                    ←
                </button>
                <div class="char-title">
                    <img src="${masteryIcon}" alt="${charData.character}" class="char-mastery-icon"
                         onerror="this.src='img/icones/Annie_MasteryIcon.png'">
                    <h2>${charData.character.toUpperCase()}</h2>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="detail-tabs">
                <button class="tab-btn ${currentTab === 'builds' ? 'active' : ''}" 
                        onclick="switchDetailTab('${charKey}', 'builds')" data-tab="builds">
                    📦 Builds
                </button>
                <button class="tab-btn ${currentTab === 'tier' ? 'active' : ''}" 
                        onclick="switchDetailTab('${charKey}', 'tier')" data-tab="tier">
                    🏆 Tier List
                </button>
            </div>

            ${createFilterBar()}

            <div class="detail-content" id="detail-content">
                ${currentTab === 'builds' ? renderBuildsTab(charKey, charData) : renderTierTab(charKey, charData)}
            </div>
        </section>
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

    // Flatten and process variants
    let variants = flattenVariants(charData.variants);
    variants = filterVariants(variants, state.filters);
    variants = sortVariants(variants, state.sort);

    // Generate variant cards HTML
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

/**
 * Initialize character detail page
 * @param {string} charKey - Character key
 * @param {string} initialTab - Initial tab
 */
export async function init(charKey, initialTab = 'builds') {
    setCurrentCharacter(charKey);

    // Reset filters when entering a new character
    setFilters({ rarity: [], element: [] });

    // Force render of the initial tab content with clean filters
    // This handles both 'builds' and 'tier' tabs correctly
    await switchTab(charKey, initialTab);

    // Update filter UI
    updateFilterUI();
}

/**
 * Refresh variants display
 * @param {string} charKey - Character key
 */
export function refreshVariants(charKey) {
    const charData = getCharacter(charKey);
    if (!charData) return;

    const state = getState();

    let variants = flattenVariants(charData.variants);
    variants = filterVariants(variants, state.filters);
    variants = sortVariants(variants, state.sort);

    renderVariants('variants-container', variants, charKey);
}

/**
 * Switch between builds and tier tabs
 * @param {string} charKey - Character key
 * @param {string} tab - Tab to switch to
 */
export async function switchTab(charKey, tab) {
    // Get current state BEFORE updating tab to check if we are changing context
    const state = getState();
    const previousTab = state.currentTab;

    setCurrentTab(tab);

    // Only apply default sort if we are actually CHANGING tabs.
    // This prevents resetting the user's sort preference when switching characters 
    // while staying on the same tab (e.g. browsing Tier Lists).
    // Also applies if previousTab is undefined (first load).
    if (tab !== previousTab) {
        if (tab === 'tier') {
            // Tier List Default: Category Descending
            setSort({ type: 'class', direction: 'desc' });
        } else {
            // Builds Default: Score Descending
            setSort({ type: 'score', direction: 'desc' });
        }
    }

    // Update tab button states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Re-render content
    const charData = getCharacter(charKey);
    const contentEl = document.getElementById('detail-content');
    if (contentEl && charData) {
        contentEl.innerHTML = tab === 'builds'
            ? renderBuildsTab(charKey, charData)
            : renderTierTab(charKey, charData);

        if (tab === 'builds') {
            refreshVariants(charKey);
        }
    }

    updateCharacterNav(charKey, tab);

    // Update filter UI to match the current sort state
    const { updateFilterUI } = await import('../components/FilterBar.js');
    updateFilterUI();
}
