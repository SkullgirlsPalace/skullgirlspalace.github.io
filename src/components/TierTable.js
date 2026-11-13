// =====================================================
// TIER TABLE COMPONENT
// Renders tier list table with ranking badges
// =====================================================

import { TIER_RANKS, RARITY_ICONS, getElementMap, getLocalizedElementName } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { CLASS_ICONS, getLocalizedVariantClasses, getLocalizedClassName, getLocalizedClassDescription } from '../data/variantClasses.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { getState } from '../state/store.js';
import { filterVariants, sortVariants } from '../utils/sorting.js';
import { flattenVariants } from '../utils/variantUtils.js';
import { t, getCurrentLanguage, getLocalizedNameSync } from '../i18n/index.js';

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
 * Render rank cell with optional class icon overlay
 */
function renderRankCell(rankValue, classes) {
  const normalizedRank = rankValue ? String(rankValue).toUpperCase().trim() : '';
  const isRankBOrHigher = ['SS', 'S', 'A', 'B'].includes(normalizedRank);
  const isInvalidRank = ['I', 'N/A', 'NA', ''].includes(normalizedRank.replace('/', ''));

  let iconsHTML = '';

  if (!isInvalidRank) {
    const primaryClass = classes[0];
    const classInfo = primaryClass ? CLASS_ICONS[primaryClass.key] : null;
    if (classInfo?.icon) {
      const label = `${t('variant.primaryClass')}: ${primaryClass.localized}`;
      iconsHTML = `<img src="${classInfo.icon}" class="rank-class-badge" style="--class-color: ${classInfo.color}" alt="${label}" title="${label}">`;
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

let stickyTierHeaderCleanup = null;

function enableStickyTierHeader(wrapper) {
  stickyTierHeaderCleanup?.();

  const table = wrapper.querySelector('.tier-table');
  const sourceHead = table?.querySelector('thead');
  if (!table || !sourceHead) return;

  const stickyViewport = document.createElement('div');
  stickyViewport.className = 'tier-table-sticky-header';
  stickyViewport.setAttribute('aria-hidden', 'true');
  const stickyTable = table.cloneNode(false);
  stickyTable.removeAttribute('id');
  stickyTable.classList.add('tier-table-sticky-copy');
  const stickyHead = sourceHead.cloneNode(true);
  stickyTable.append(stickyHead);
  stickyViewport.append(stickyTable);
  document.body.append(stickyViewport);

  const syncGeometry = () => {
    const sourceCells = sourceHead.querySelectorAll('th');
    const stickyCells = stickyHead.querySelectorAll('th');
    sourceCells.forEach((cell, index) => {
      const width = cell.getBoundingClientRect().width;
      const stickyCell = stickyCells[index];
      if (!stickyCell) return;
      const style = getComputedStyle(cell);
      stickyCell.style.width = `${width}px`;
      stickyCell.style.minWidth = `${width}px`;
      stickyCell.style.maxWidth = `${width}px`;
      stickyCell.style.padding = style.padding;
      stickyCell.style.font = style.font;
      stickyCell.style.letterSpacing = style.letterSpacing;
      stickyCell.style.textTransform = style.textTransform;
      stickyCell.style.textAlign = style.textAlign;
      stickyCell.style.lineHeight = style.lineHeight;
      stickyCell.style.borderRight = style.borderRight;
      stickyCell.style.borderBottom = style.borderBottom;

      const sourceLabel = cell.querySelector('.attr-highlight');
      const stickyLabel = stickyCell.querySelector('.attr-highlight');
      if (sourceLabel && stickyLabel) {
        const labelStyle = getComputedStyle(sourceLabel);
        stickyLabel.style.display = labelStyle.display;
        stickyLabel.style.maxWidth = labelStyle.maxWidth;
        stickyLabel.style.padding = labelStyle.padding;
        stickyLabel.style.lineHeight = labelStyle.lineHeight;
        stickyLabel.style.whiteSpace = labelStyle.whiteSpace;
        stickyLabel.style.overflowWrap = labelStyle.overflowWrap;
        stickyLabel.style.color = labelStyle.color;
      }
    });
    const tableWidth = table.getBoundingClientRect().width;
    stickyTable.style.width = `${tableWidth}px`;
    stickyTable.style.minWidth = `${tableWidth}px`;
    stickyViewport.style.left = `${wrapper.getBoundingClientRect().left}px`;
    stickyViewport.style.width = `${wrapper.clientWidth}px`;
  };

  const updatePosition = () => {
    const navbarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 64;
    const rect = wrapper.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();
    const headHeight = sourceHead.getBoundingClientRect().height;
    const top = navbarHeight;
    const isInRange = tableRect.top < top && tableRect.bottom > top + headHeight;
    stickyViewport.style.top = `${top}px`;
    stickyViewport.style.height = `${headHeight}px`;
    stickyViewport.style.display = isInRange ? 'block' : 'none';
    stickyViewport.style.left = `${rect.left}px`;
    stickyViewport.style.width = `${wrapper.clientWidth}px`;
    stickyTable.style.transform = `translateX(-${wrapper.scrollLeft}px)`;
    const firstHeaderCell = stickyHead.querySelector('th:first-child');
    if (firstHeaderCell) firstHeaderCell.style.transform = `translateX(${wrapper.scrollLeft}px)`;
  };
  const syncResponsiveGeometry = () => {
    syncGeometry();
    updatePosition();
  };
  const resizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver(syncResponsiveGeometry)
    : null;
  [wrapper, table, sourceHead, ...sourceHead.querySelectorAll('th')].forEach(element => resizeObserver?.observe(element));
  window.visualViewport?.addEventListener('resize', syncResponsiveGeometry);

  syncGeometry();
  updatePosition();
  wrapper.addEventListener('scroll', updatePosition, { passive: true });
  window.addEventListener('scroll', updatePosition, { passive: true });
  window.addEventListener('resize', syncGeometry);
  window.addEventListener('resize', updatePosition);

  stickyTierHeaderCleanup = () => {
    wrapper.removeEventListener('scroll', updatePosition);
    window.removeEventListener('scroll', updatePosition);
    window.removeEventListener('resize', syncGeometry);
    window.removeEventListener('resize', updatePosition);
    window.visualViewport?.removeEventListener('resize', syncResponsiveGeometry);
    resizeObserver?.disconnect();
    window.removeEventListener('hashchange', stickyTierHeaderCleanup);
    stickyViewport.remove();
    stickyTierHeaderCleanup = null;
  };
  window.addEventListener('hashchange', stickyTierHeaderCleanup, { once: true });
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
  variants = sortVariants(variants, sort, filters);

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

      const localizedName = getLocalizedNameSync(variant.name);
      const charCellContent = `
        <img loading="lazy" src="${imgPath}" alt="${localizedName}" onerror="this.src='img/official/Annie_Icon.webp'">
        <span>${localizedName}</span>
      `;

      return `
      <tr>
        <td>
          <div class="tier-char-cell">
            ${charCellContent}
          </div>
        </td>
        <td class="text-center">
          ${renderRankCell(ranks.pf, variantClasses)}
        </td>
        <td class="text-center">
          ${renderRankCell(ranks.parallel, variantClasses)}
        </td>
        <td class="text-center">
          ${renderRankCell(ranks.riftOff, variantClasses)}
        </td>
        <td class="text-center">
          ${renderRankCell(ranks.riftDef, variantClasses)}
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

/** Enable direct mouse dragging while preserving native touch scrolling. */
export function enableTierTableDragScroll(root = document) {
  stickyTierHeaderCleanup?.();
  const tierWrapper = root.querySelector('.tier-table-wrapper');
  if (tierWrapper) enableStickyTierHeader(tierWrapper);

  root.querySelectorAll('.tier-table-wrapper:not([data-drag-scroll-bound])').forEach(wrapper => {
    wrapper.dataset.dragScrollBound = 'true';
    let startX = 0;
    let startScrollLeft = 0;
    let pointerId = null;

    wrapper.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button, a, input, select, summary')) return;
      startX = event.clientX;
      startScrollLeft = wrapper.scrollLeft;
      pointerId = event.pointerId;
      wrapper.classList.add('is-drag-ready');
      wrapper.setPointerCapture?.(pointerId);
    });

    wrapper.addEventListener('pointermove', event => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      const deltaX = event.clientX - startX;
      if (Math.abs(deltaX) < 4) return;
      wrapper.classList.add('is-dragging');
      wrapper.scrollLeft = startScrollLeft - deltaX;
      event.preventDefault();
    });

    const stopDragging = event => {
      if (pointerId === null || (event && event.pointerId !== pointerId)) return;
      wrapper.classList.remove('is-drag-ready', 'is-dragging');
      if (event && wrapper.hasPointerCapture?.(pointerId)) wrapper.releasePointerCapture(pointerId);
      pointerId = null;
    };

    wrapper.addEventListener('pointerup', stopDragging);
    wrapper.addEventListener('pointercancel', stopDragging);
    wrapper.addEventListener('lostpointercapture', stopDragging);
  });
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
    <button class="legend-header" type="button" aria-expanded="false" aria-controls="rank-dict">
      <span class="legend-title iluminado">${t('tier.notes')}</span>
      <span class="legend-toggle-btn" aria-hidden="true">\u25BC</span>
    </button>
    <div class="rank-dictionary hidden" id="rank-dict">
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
    <button class="legend-header" type="button" aria-expanded="false" aria-controls="class-dict">
      <span class="legend-title iluminado">${t('tier.classes')}</span>
      <span class="legend-toggle-btn" aria-hidden="true">\u25BC</span>
    </button>
    <div class="class-dictionary hidden" id="class-dict">
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
window.toggleLegendSection = function (id) {
  const element = document.getElementById(id);
  if (!element) return;
  const btn = element.closest('.legend-section').querySelector('.legend-toggle-btn');

  element.classList.toggle('hidden');

  if (element.classList.contains('hidden')) {
    btn.style.transform = 'rotate(-90deg)';
  } else {
    btn.style.transform = 'rotate(0deg)';
  }
  element.closest('.legend-section').querySelector('.legend-header')?.setAttribute('aria-expanded', String(!element.classList.contains('hidden')));
};

document.addEventListener('click', event => {
  const button = event.target.closest('.legend-header[aria-controls]');
  if (button) window.toggleLegendSection(button.getAttribute('aria-controls'));
});
