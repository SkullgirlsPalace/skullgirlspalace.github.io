// =====================================================
// CHARACTERS PAGE
// Grid of all playable characters
// =====================================================

import { renderCharacterGrid } from '../components/CharacterCard.js';
import { getCharacters } from '../services/dataService.js';
import { renderExportModal, initExportModal } from '../components/ExportCharacterData.js';

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
                <button class="export-trigger-btn" onclick="toggleExportModal()" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);">
                    <span class="btn-icon">📥</span>
                    Exportar
                </button>
            </div>
            
            ${renderExportModal()}

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

    initExportModal();
}
