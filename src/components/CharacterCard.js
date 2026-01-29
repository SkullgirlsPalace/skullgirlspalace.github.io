// =====================================================
// CHARACTER CARD COMPONENT
// Renders a character card in the grid
// =====================================================

import { CHARACTER_ICONS, CHARACTER_COLORS } from '../config/constants.js';

/**
 * Create character card HTML
 * @param {string} charKey - Character key (e.g., 'annie')
 * @param {Object} charData - Character data object
 * @param {number} index - Index for animation delay
 * @param {Function} onClick - Click handler function name
 * @returns {string} HTML string
 */
export function createCharacterCard(charKey, charData, index = 0, onClick = 'openCharacterDetails') {
    const charColor = CHARACTER_COLORS[charKey] || 'var(--accent-gold)';
    const iconPath = CHARACTER_ICONS[charKey] || `img/${charKey}/icon.png`;

    return `
        <div class="character-card animate-in" 
             style="animation-delay: ${index * 0.03}s; --char-accent: ${charColor}"
             onclick="${onClick}('${charKey}')">
            <img src="${iconPath}" alt="${charData.character}" loading="lazy" 
                 onerror="this.src='img/icones/Annie_Icon.png'">
            <div class="name">${charData.character.toUpperCase()}</div>
        </div>
    `;
}

/**
 * Render character grid
 * @param {string} containerId - Container element ID
 * @param {Object} characters - Characters data object
 * @param {Function} onClickFn - Click handler function name
 */
export function renderCharacterGrid(containerId, characters, onClickFn = 'openCharacterDetails') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Sort characters alphabetically
    const sortedChars = Object.entries(characters)
        .filter(([key, data]) => data && data.character)
        .sort((a, b) => a[1].character.localeCompare(b[1].character));

    container.innerHTML = sortedChars
        .map(([charKey, charData], index) =>
            createCharacterCard(charKey, charData, index, onClickFn)
        )
        .join('');
}
