// =====================================================
// FORMATTING UTILITIES
// Text formatting, parsing, and display helpers
// =====================================================

import { getEffectPatterns, EFFECT_DATA } from '../data/effectData.js';

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

    // Highlight game effects (Buffs, Debuffs, Terms)
    const patterns = getEffectPatterns();
    const replacements = [];
    let workingText = text;

    for (const { pattern, effectKey } of patterns) {
        const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![\\wÀ-ÿ])${escaped}(?![\\wÀ-ÿ])`, 'gi'); // Case-insensitive for terms

        workingText = workingText.replace(regex, (match) => {
            const marker = `\x00EFF_${replacements.length}\x00`;
            // Determine type for styling
            const effect = EFFECT_DATA[effectKey];
            const typeClass = effect ? effect.type : 'term';
            const iconHtml = (effect && effect.icon) ? `<img src="${effect.icon}" class="inline-effect-icon" alt="">` : '';

            replacements.push({
                marker,
                html: `<span class="attr-highlight ${typeClass}" data-attr-key="${effectKey}">${iconHtml}${match}</span>`
            });
            return marker;
        });
    }

    for (const { marker, html } of replacements) {
        workingText = workingText.replace(marker, html);
    }

    // Convert numbers to highlighted spans
    workingText = workingText.replace(/((?:\?\?\?|\d+(?:\.\d+)?%?))/g, '<span class="number">$1</span>');

    // Convert \n to <br>
    workingText = workingText.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');

    return workingText;
}

import { getMoveImage } from '../data/movesimages.js';

/**
 * Format arsenal string into HTML with move images
 * @param {string} arsenal - Comma-separated arsenal items
 * @param {string} charKey - Character key for move images
 * @returns {string} HTML string with move items
 */
export function formatArsenal(arsenal, charKey = null) {
    if (!arsenal) return '';

    // Remove Discord emoji codes
    arsenal = arsenal.replace(/<:[^:]+:\d+>/g, '');

    // Split by comma
    const items = arsenal.split(/,\s*/).filter(item => item.trim());

    if (charKey) {
        return items.map(item => {
            const moveName = item.trim();
            const moveImage = getMoveImage(charKey, moveName);

            if (moveImage) {
                return `
                    <div class="arsenal-move">
                        <img src="${moveImage}" alt="${moveName}" class="move-icon" onerror="this.style.display='none'">
                        <span class="move-name">${moveName}</span>
                    </div>
                `;
            }
            return `
                <div class="arsenal-move">
                    <span class="move-name">${moveName}</span>
                </div>
            `;
        }).join('');
    }

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

import { getAttributePatterns } from '../data/attributeData.js';

/**
 * Format build text by wrapping attribute keywords in interactive spans
 * that power the tooltip/disclaimer system.
 * @param {string} text - Raw build text (e.g. "ATQ%, Perfuração, Dano Crítico")
 * @returns {string} HTML string with attribute names wrapped in .attr-highlight spans
 */
export function formatBuildText(text) {
    if (!text) return '';
    // Ensure text is a string to prevent .replace errors
    if (typeof text !== 'string') text = String(text);

    const patterns = getAttributePatterns();

    // Track which ranges are already replaced to avoid overlapping
    // We'll work with a simple left-to-right scan approach
    let result = text;

    // Replace each pattern. We use a marker approach to avoid double-replacing.
    // Phase 1: replace with unique markers
    const replacements = [];
    let workingText = result;

    for (const { pattern, attrKey } of patterns) {
        // Use word boundary-aware matching to avoid partial matches
        // Escape special regex characters in the pattern
        const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![\\wÀ-ÿ])${escaped}(?![\\wÀ-ÿ])`, 'g');

        workingText = workingText.replace(regex, (match) => {
            const marker = `\x00ATTR_${replacements.length}\x00`;
            replacements.push({
                marker,
                html: `<span class="attr-highlight" data-attr-key="${attrKey}">${match}</span>`
            });
            return marker;
        });
    }

    // Phase 2: replace markers with HTML
    for (const { marker, html } of replacements) {
        workingText = workingText.replace(marker, html);
    }

    return workingText;
}
