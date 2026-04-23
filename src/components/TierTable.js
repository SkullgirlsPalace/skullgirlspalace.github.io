// =====================================================
// TIER TABLE COMPONENT
// Renders tier list table with ranking badges
// =====================================================

import { TIER_RANKS, RARITY_ICONS, getElementMap, getLocalizedElementName } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { CLASS_ICONS, getLocalizedVariantClasses, getLocalizedClassName, getLocalizedClassDescription } from '../data/variantClasses.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { getState } from '../state/store.js';
import { flattenVariants, filterVariants, sortVariants } from '../utils/sorting.js';
import { t, getCurrentLanguage } from '../i18n/index.js';

/**
 * Create rank badge HTML
 * @param {string} rank - Rank value (SS, S, A, B, C, I, N/A)
 * @returns {string} HTML string
 */
export function createRankBadge(rank) {
  const safeRank = rank || 'B';
  const cleanClass = safeRank.toLowerCase().replace(/[^a-z0-9]/g, ''); // Removes special chars like '/'
  const rankClass = `rank-${cleanClass}`;
  return `<div class="rank-badge ${rankClass}">${safeRank}</div>`;
}

/**
 * Cycle through ranks SS -> S -> A -> B -> C -> I -> N/A
 * @param {string} charKey - Character key
 * @param {string} variantName - Variant name
 * @param {string} mode - Mode key (pf, riftOff, riftDef, parallel)
 */


/**
 * Create class badges HTML for a variant (no longer used in standard view, replaced by rank badges)
 * @param {string} variantName - Variant name
 * @returns {string} HTML string with class icon badges
 */
function createClassBadges(variantName) {
  const classes = getLocalizedVariantClasses(variantName);
  const badges = classes.map(cls => {
    const info = CLASS_ICONS[cls.key];
    if (!info) return '';
    return `<img loading="lazy" src="${info.icon}" alt="${cls.localized}" title="${cls.localized}" class="class-role-icon" style="--class-color: ${info.color}">`;
  }).join('');
  return `<div class="class-badges">${badges}</div>`;
}

/**
 * Render rank cell with optional class icon overlay
 */
function renderRankCell(charKey, variantName, mode, rankValue, classes) {
  const normalizedRank = rankValue ? String(rankValue).toUpperCase().trim() : '';
  const isRankBOrHigher = ['SS', 'S', 'A', 'B'].includes(normalizedRank);
  const isInvalidRank = ['I', 'N/A', 'NA', ''].includes(normalizedRank.replace('/', ''));

  let iconsHTML = '';

  if (!isInvalidRank) {
    if (mode === 'riftDef') {
      iconsHTML = `<img src="img/modifiers/buffs/Armor.webp" class="rank-class-badge" style="--class-color: #1565c0" alt="${t('tier.defensive')}" title="${t('tier.defensive')}">`;
    } else {
      iconsHTML = classes.map(cls => {
        let classInfo = { ...CLASS_ICONS[cls.key] };
        if (!classInfo.icon) return '';

        let showIcon = false;
        if (cls.key === 'Ofensivo' || cls.key === 'Suporte de Utilidade' || cls.key === 'Coringa') {
          showIcon = true;
        }

        if (showIcon) {
          return `<img src="${classInfo.icon}" class="rank-class-badge" style="--class-color: ${classInfo.color}" alt="${cls.localized}" title="${cls.localized}">`;
        }
        return '';
      }).join('');
    }
  }

  return `
  <div class="rank-cell-container text-center">
    <div class="rank-badge-wrapper">
      ${createRankBadge(rankValue)}
      ${iconsHTML}
    </div>
  </div>
  `;
}

/**
 * Create tier table HTML
 * @param {string} charKey - Character key
 * @param {Object} charData - Character data
 * @returns {string} HTML string
 */
export function createTierTable(charKey, charData) {
  const state = getState();
  const tierData = state.tierData[charKey] || {};
  const { filters, sort } = state.tabState.tier;

  // Get and filter variants
  let variants = flattenVariants(charData.variants);
  variants = filterVariants(variants, filters);
  variants = sortVariants(variants, sort);

  let rowsHTML = '';

  if (variants.length === 0) {
    rowsHTML = `<tr><td colspan="5" class="text-center" style="padding: 40px; color: var(--text-muted);">${t('tier.noVariants')}</td></tr>`;
  } else {
    rowsHTML = variants.map(variant => {
      const baseRanks = tierData[variant.name] || {};
      const ranks = {
        pf: baseRanks.pf || 'B',
        riftOff: baseRanks.riftOff || 'B',
        riftDef: baseRanks.riftDef || 'B',
        parallel: baseRanks.parallel || 'B'
      };
      const imgPath = getVariantImage(charKey, variant.name, 0);

      const elementStr = variant.element || (getCurrentLanguage() === 'en' ? 'Neutral' : 'Neutro');
      const elementInfo = getElementMap()[elementStr] || getElementMap()['Neutro'] || getElementMap()['Neutral'];
      const elementClass = elementInfo.class;

      const rarityKey = variant.rarityKey || 'diamante';
      const rarityIcon = RARITY_ICONS[rarityKey];
      const masteryIcon = getMasteryIcon(charKey);

      const variantClasses = getLocalizedVariantClasses(variant.name);

      const charCellContent = `
        <img loading="lazy" src="${imgPath}" alt="${variant.name}" onerror="this.src='img/official/Annie_Icon.webp'">
        <span>${variant.name}</span>
      `;

      return `
      <tr>
        <td>
          <div class="tier-char-cell">
            ${charCellContent}
          </div>
        </td>
        <td class="text-center">
          ${renderRankCell(charKey, variant.name, 'pf', ranks.pf, variantClasses)}
        </td>
        <td class="text-center">
          ${renderRankCell(charKey, variant.name, 'parallel', ranks.parallel, variantClasses)}
        </td>
        <td class="text-center">
          ${renderRankCell(charKey, variant.name, 'riftOff', ranks.riftOff, variantClasses)}
        </td>
        <td class="text-center">
          ${renderRankCell(charKey, variant.name, 'riftDef', ranks.riftDef, variantClasses)}
        </td>
      </tr>
      `;
    }).join('');
  }

  return `
  <div class="tier-table-wrapper">
    <table class="tier-table">
      <thead>
      <tr>
        <th>${t('tier.variant')}</th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_dp_ataque" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${t('tier.dpAttack')}</span>
        </th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_reinos_paralelos" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${t('tier.parallelRealms')}</span>
        </th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_fenda_ataque" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${t('tier.riftAttack')}</span>
        </th>
        <th class="text-center">
          <span class="attr-highlight" data-attr-key="tier_fenda_defesa" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">${t('tier.riftDefense')}</span>
        </th>
      </tr>
      </thead>
      <tbody id="detail-tier-table-body">
      ${rowsHTML}
      </tbody>
    </table>
  </div>
  `;
}

/**
 * Create tier view content (includes dictionary, controls, and table)
 * @param {string} charKey - Character key
 * @param {Object} charData - Character data
 * @returns {string} HTML string
 */
export function createTierView(charKey, charData) {

  return `



  <!-- Rank Explanations Dictionary -->
  <div class="legend-section">
    <div class="legend-header">
      <span class="legend-title">${t('tier.notes')}</span>
      <button class="legend-toggle-btn" onclick="toggleLegendSection('rank-dict')">\u25BC</button>
    </div>
    <div class="rank-dictionary" id="rank-dict">
      <div class="dict-item"><span class="rank-badge rank-ss">SS</span>
        <p>${t('tier.rankSS')}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-s">S</span>
        <p>${t('tier.rankS')}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-a">A</span>
        <p>${t('tier.rankA')}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-b">B</span>
        <p>${t('tier.rankB')}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-c">C</span>
        <p>${t('tier.rankC')}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-i">I</span>
        <p>${t('tier.rankI')}</p>
      </div>
      <div class="dict-item"><span class="rank-badge rank-na">N/A</span>
        <p>${t('tier.rankNA')}</p>
      </div>
    </div>
  </div>

  <!-- Class Role Legend -->
  <div class="legend-section">
    <div class="legend-header">
      <span class="legend-title">${t('tier.classes')}</span>
      <button class="legend-toggle-btn" onclick="toggleLegendSection('class-dict')">\u25BC</button>
    </div>
    <div class="class-dictionary" id="class-dict">
      ${Object.entries(CLASS_ICONS).map(([cls, info]) => {
        return `
      <div class="class-dict-item">
        <img src="${info.icon}" alt="${getLocalizedClassName(cls)}" class="class-dict-icon" style="--class-color: ${info.color}">
        <div class="class-dict-text">
          <strong style="color: ${info.color}">${getLocalizedClassName(cls)}</strong>
          <p>${getLocalizedClassDescription(cls)}</p>
        </div>
      </div>
      `;
      }).join('')}
    </div>
  </div>

  ${createTierTable(charKey, charData)}
  `;
}

// Global UI handler for legend sections
window.toggleLegendSection = function(id) {
  const element = document.getElementById(id);
  const btn = element.closest('.legend-section').querySelector('.legend-toggle-btn');

  element.classList.toggle('hidden');

  if (element.classList.contains('hidden')) {
    btn.style.transform = 'rotate(-90deg)';
  } else {
    btn.style.transform = 'rotate(0deg)';
  }
};