// =====================================================
// CHARACTER CARD COMPONENT
// Renders a character card in the grid
// =====================================================

import { CHARACTER_ICONS, CHARACTER_COLORS, CHARACTER_NAMES_EN } from '../config/constants.js';
import { isNewCharacter } from '../data/newContent.js';
import { getCurrentLanguage, t } from '../i18n/index.js';

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
  const iconPath = CHARACTER_ICONS[charKey] || `img/${charKey}/icon.webp`;
  const newBadgeHTML = isNewCharacter(charKey) ? '<img loading="lazy" src="img/official/new_icon_U.webp" alt="Novo" class="new-badge">' : '';

  // Get character name based on current language
  const currentLang = getCurrentLanguage();
  const displayName = currentLang === 'en'
    ? (CHARACTER_NAMES_EN[charKey] || charData.character)
    : charData.character;

  return `
<div class="character-card animate-in"
  style="animation-delay: ${index * 0.03}s; --char-accent: ${charColor}"
  onclick="${onClick}('${charKey}')">
  ${newBadgeHTML}
  <img src="${iconPath}" alt="${displayName}" loading="lazy"
  onerror="this.src='img/official/Annie_Icon.webp'">
  <div class="name">${displayName.toUpperCase()}</div>
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

  const currentLang = getCurrentLanguage();

  // Sort characters alphabetically based on current language
  const sortedChars = Object.entries(characters)
    .filter(([key, data]) => data && data.character)
    .sort((a, b) => {
      if (currentLang === 'en') {
        // Use English names for sorting
        const nameA = CHARACTER_NAMES_EN[a[0]] || a[1].character;
        const nameB = CHARACTER_NAMES_EN[b[0]] || b[1].character;
        return nameA.localeCompare(nameB);
      } else {
        // Use PT-BR names for sorting
        return a[1].character.localeCompare(b[1].character);
      }
    });

  container.innerHTML = sortedChars
    .map(([charKey, charData], index) =>
      createCharacterCard(charKey, charData, index, onClickFn)
    )
    .join('');
}
