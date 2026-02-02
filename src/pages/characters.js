// =====================================================
// CHARACTERS PAGE
// Grid of all playable characters
// =====================================================

import { renderCharacterGrid } from '../components/CharacterCard.js';
import { getCharacters } from '../services/dataService.js';

/**
 * Render characters page
 * @returns {string} HTML string
 */
export function render() {
    return `
        <section class="section character-selection" id="character-selection">
            <div class="section-header">
                <button class="btn-back" onclick="navigateTo('')">
                    ←
                </button>
                <h2>Escolha um Personagem</h2>
            </div>
            <div class="character-grid" id="characterGrid">
                <!-- Populated by JS -->
            </div>
        </section>
    `;
}

/**
 * Initialize characters page
 */
export function init() {
    const characters = getCharacters();
    if (characters) {
        renderCharacterGrid('characterGrid', characters, 'openCharacterDetails');
    }
}
