// =====================================================
// TIER LIST PAGE
// Global tier list with all characters
// =====================================================

import { renderCharacterGrid } from '../components/CharacterCard.js';
import { getCharacters } from '../services/dataService.js';
import { t } from '../i18n/i18n.js';

/**
 * Render tier list page
 * @returns {string} HTML string
 */
export function render() {
    return `
        <section class="section tierlist-section" id="tierlist">
            <div class="section-header">
                <button class="btn-back" onclick="navigateTo('')">
                    ←
                </button>
                <h2>${t('tierlist.title')}</h2>
            </div>

            <div class="tierlist-intro">
                <p>${t('tierlist.intro')}</p>
            </div>

            <div class="character-grid tierlist-grid" id="tierlistGrid">
                <!-- Populated by JS -->
            </div>
        </section>
    `;
}

/**
 * Initialize tier list page
 */
export function init() {
    const characters = getCharacters();
    if (characters) {
        renderCharacterGrid('tierlistGrid', characters, 'openCharacterTier');
    }
}
