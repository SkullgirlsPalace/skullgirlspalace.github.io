// =====================================================
// TIER LIST PAGE
// Global tier list with all characters
// =====================================================

import { renderCharacterGrid } from '../components/CharacterCard.js';
import { getCharacters } from '../services/dataService.js';

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
                <h2>Tier List</h2>
            </div>

            <div class="tierlist-intro">
                <p>Escolha um personagem para ver a tier list detalhada de todas as suas variantes. 
                   As notas são baseadas em performance em cada modo de jogo.</p>
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
