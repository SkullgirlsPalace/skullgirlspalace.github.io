// =====================================================
// FORMATTING UTILITIES
// Text formatting, parsing, and display helpers
// =====================================================

/**
 * Format ability/description text
 * Removes Discord formatting, converts markdown-like syntax
 * @param {string} text - Raw text to format
 * @returns {string} Formatted HTML string
 */
export function formatText(text) {
    if (!text) return '';

    // Remove [HAB 1]: and [HAB 2]: prefixes
    text = text.replace(/\[HAB \d+\]:\s*/g, '');

    // Convert **bold** to <strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Convert Discord emoji format to simple text
    text = text.replace(/<:[^:]+:\d+>/g, '');

    // Convert \n to <br>
    text = text.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');

    return text;
}

/**
 * Format arsenal string into HTML spans
 * @param {string} arsenal - Comma-separated arsenal items
 * @returns {string} HTML string with span elements
 */
export function formatArsenal(arsenal) {
    if (!arsenal) return '';

    // Remove Discord emoji codes
    arsenal = arsenal.replace(/<:[^:]+:\d+>/g, '');

    // Split by comma or similar
    const items = arsenal.split(/,\s*/).filter(item => item.trim());

    return items.map(item => `<span>${item.trim()}</span>`).join('');
}

/**
 * Parse stat value string to number
 * Handles formats like "10,004" or "10.004"
 * @param {string|number} stat - Stat value to parse
 * @returns {number} Parsed number value
 */
export function parseStatValue(stat) {
    if (!stat) return 0;
    return parseInt(String(stat).replace(/[,\.]/g, '')) || 0;
}

/**
 * Get mastery icon path from character key
 * @param {string} charKey - Character key (e.g., 'annie', 'big-band')
 * @returns {string} Path to mastery icon
 */
export function getMasteryIcon(charKey) {
    const pascalName = charKey.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    // Special case for Robofortune (lowercase f in asset)
    const fileName = pascalName === 'RoboFortune' ? 'Robofortune' : pascalName;
    return `img/icones/${fileName}_MasteryIcon.png`;
}

/**
 * Format number with locale separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR').format(num);
}
