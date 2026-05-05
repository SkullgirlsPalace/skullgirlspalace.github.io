// =====================================================
// ATTRIBUTE TOOLTIP COMPONENT
// Hover tooltips + detail modal for attribute names
// Auto-closes after 20 seconds of inactivity
// =====================================================

import { getLocalizedAttribute } from '../data/attributeData.js';
import { getLocalizedEffect, getEffectIconByName } from '../data/effectData.js';
import { getMoveData } from '../data/movesimages.js';
import { getElementEffects } from '../data/elementEffectsData.js';
import { getElementMap, getLocalizedElementName, elementToPT } from '../config/constants.js';
import { CLASS_ICONS, getLocalizedClassDescription } from '../data/variantClasses.js';
import { t } from '../i18n/index.js';

// ========== STATE ==========
let activeTooltip = null;
let activeModal = null;
let inactivityTimer = null;
const INACTIVITY_TIMEOUT = 20000; // 20 seconds

// ========== TOOLTIP (hover) ==========

/**
 * Resolve data from ATTRIBUTE_DATA, EFFECT_DATA or a Character Move
 * @param {HTMLElement} target - Target element with dataset info
 * @returns {{ source: 'attr'|'effect'|'move', data: Object }|null}
 */
function resolveData(target) {
 const key = target.dataset.attrKey;

 // Element table for special variants
 if (key === 'element_table') {
 const variantName = target.dataset.variant;
 const effectsData = getElementEffects(variantName);
 if (effectsData) {
 return {
 source: 'element_table',
 data: {
 variantName,
 ...effectsData
 }
 };
 }
 return null;
 }

 if (key === 'move') {
 const moveName = target.dataset.move;
 const charKey = target.dataset.char;
 if (moveName && charKey) {
 const moveData = getMoveData(charKey, moveName);
 if (moveData) {
 return {
 source: 'move',
 data: {
 name: moveName,
 detailed: moveData.description,
 summary: moveData.description,
 type: moveData.type,
 icon: moveData.image.image
 }
 };
 }
 }
 return null;
 }

 if (key.startsWith('class_')) {
 const clsName = key.replace('class_', '');
 const clsDescription = getLocalizedClassDescription(clsName);
 if (clsDescription) {
 return {
 source: 'class',
 data: {
 name: clsName,
 summary: clsDescription,
 detailed: clsDescription,
 icon: CLASS_ICONS[clsName]?.icon,
 type: t('tooltip.classRole')
 }
 };
 }
 }

 const attrData = getLocalizedAttribute(key);
 if (attrData) return { source: 'attr', data: attrData };
 const effectData = getLocalizedEffect(key);
 if (effectData) return { source: 'effect', data: effectData };
 return null;
}

/**
 * Build HTML for element effects table (used in both tooltip and modal)
 * @param {Object} data - Element effects data
 * @param {boolean} compact - Whether to use compact layout (tooltip) or full (modal)
 * @returns {string} HTML string
 */
function buildElementTableHTML(data, compact = false) {
 // Derive element keys from the data object itself (works for both PT-BR and EN keys)
 const elements = data.buffs ? Object.keys(data.buffs) : [];
 const hasDebuffs = data.debuffs && Object.values(data.debuffs).some(arr => arr && arr.length > 0);

 const elementMap = getElementMap();

  const formatEffects = (effects) => {
    if (!effects || effects.length === 0) return '\u2014';
    return effects.map(name => {
      const iconUrl = getEffectIconByName(name);
      if (iconUrl) {
        return `<span style="display:inline-flex; align-items:center; gap:4px;"><img src="${iconUrl}" style="width:20px;height:20px;object-fit:contain;" alt="">${name}</span>`;
      }
      return name;
    }).join('<br>');
  };

  let rows = elements.map(el => {
    // ELEMENT_MAP may need a PT-BR key for icon lookup; convert EN keys if needed
    const lookupKey = elementMap[el] ? el : elementToPT(el);
    const elInfo = elementMap[lookupKey];
    if (!elInfo) return '';
    const buffs = (data.buffs && data.buffs[el]) || [];
    const debuffs = (data.debuffs && data.debuffs[el]) || [];
    if (buffs.length === 0 && debuffs.length === 0) return '';

    const buffText = formatEffects(buffs);
    const debuffText = formatEffects(debuffs);

    // getLocalizedElementName expects a PT-BR key; convert EN keys if needed
    const ptKey = elementMap[el] ? el : elementToPT(el);
    const localizedName = getLocalizedElementName(ptKey);

    return `
    <tr class="element-row">
      <td class="element-cell" style="font-size: 1.05rem;">
        <img loading="lazy" src="${elInfo.iconPath}" alt="${localizedName}" class="element-table-icon">
        <span class="element-table-name">${localizedName}</span>
      </td>
      <td class="buff-cell" style="font-size: 1.05rem;">${buffText}</td>
      ${hasDebuffs ? `<td class="debuff-cell" style="font-size: 1.05rem;">${debuffText || '\u2014'}</td>` : ''}
    </tr>
    `;
  }).filter(Boolean).join('');

  return `
  <table class="element-effects-table">
    <thead>
      <tr>
        <th style="font-size: 1.1rem;">${t('tooltip.element')}</th>
        <th class="buff-header" style="font-size: 1.1rem;">
          ${t('tooltip.buffEffect')}
        </th>
        ${hasDebuffs ? `<th class="debuff-header" style="font-size: 1.1rem;">
          ${t('tooltip.debuffEffect')}
        </th>` : ''}
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  `;
}

/**
 * Show a tooltip near the target element
 * @param {HTMLElement} target - The .attr-highlight element
 */
function showTooltip(target) {
 hideTooltip(); // remove any existing
 const resolved = resolveData(target);
 if (!resolved) return;

 const { source, data } = resolved;
 const tooltip = document.createElement('div');
 tooltip.className = 'attr-tooltip';

 if (source === 'element_table') {
 tooltip.classList.add('element-table-tooltip');
 tooltip.innerHTML = `
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 <strong>${t('tooltip.elementEffects')}</strong>
 </div>
 <span class="attr-tooltip-max">${data.variantName}</span>
 </div>
 ${buildElementTableHTML(data, true)}
 <span class="attr-tooltip-hint">${t('tooltip.clickForDetails')}</span>
 `;
 } else if (source === 'attr') {
 tooltip.innerHTML = `
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 <strong>${data.name}</strong>
 </div>
 ${data.max ? `<span class="attr-tooltip-max">${t('tooltip.max', { value: data.max })}</span>` : ''}
 </div>
 <p class="attr-tooltip-summary">${data.summary}</p>
 <span class="attr-tooltip-hint">${t('tooltip.clickForDetails')}</span>
 `;
 } else if (source === 'move') {
 const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-tooltip-icon move-img" alt="">` : '';
 tooltip.innerHTML = `
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 ${iconHtml}
 <strong>${data.name}</strong>
 </div>
 <span class="attr-tooltip-max">${data.type}</span>
 </div>
 <p class="attr-tooltip-summary">${data.summary.replace(/\\n/g, '<br>')}</p>
 <span class="attr-tooltip-hint">${t('tooltip.clickForDetails')}</span>
 `;
 } else {
 // Effect (buff/debuff/term) or Class
 const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-tooltip-icon" alt="">` : '';

 let disclaimerHtml = '';
 if (data.stacks || data.scaling) {
 disclaimerHtml = `
 <div class="attr-tooltip-disclaimer">
 ${data.stacks ? `<span>${t('tooltip.stack', { value: data.stacks })}</span>` : ''}
 ${data.scaling ? `<span>${t('tooltip.scaling', { value: data.scaling })}</span>` : ''}
 </div>
 `;
 }

 tooltip.innerHTML = `
 <div class="attr-tooltip-header">
 <div class="attr-tooltip-title-group">
 ${iconHtml}
 <strong>${data.name}</strong>
 </div>
 ${source === 'class' ? `<span class="attr-tooltip-max">${data.type}</span>` : ''}
 </div>
 <p class="attr-tooltip-summary">${data.detailed}</p>
 ${disclaimerHtml}
 <span class="attr-tooltip-hint">${t('tooltip.clickForDetails')}</span>
 `;
 }

 document.body.appendChild(tooltip);
 activeTooltip = tooltip;

 // Position
 positionTooltip(tooltip, target);
}

/**
 * Position tooltip relative to target element
 */
function positionTooltip(tooltip, target) {
 const rect = target.getBoundingClientRect();
 const tooltipRect = tooltip.getBoundingClientRect();
 const padding = 8;

 let top = rect.top - tooltipRect.height - padding;
 let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

 // If above would go off-screen, show below
 if (top < padding) {
 top = rect.bottom + padding;
 tooltip.classList.add('below');
 }

 // Clamp horizontal
 left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

 tooltip.style.top = `${top + window.scrollY}px`;
 tooltip.style.left = `${left}px`;
 tooltip.classList.add('visible');
}

/**
 * Hide active tooltip
 */
function hideTooltip() {
 if (activeTooltip) {
 activeTooltip.remove();
 activeTooltip = null;
 }
}

// ========== DETAIL MODAL (click) ==========

/**
 * Show the detail modal for an attribute or effect
 * @param {HTMLElement} target - The .attr-highlight element
 */
function showDetailModal(target) {
 hideTooltip();
 hideDetailModal();

 const resolved = resolveData(target);
 if (!resolved) return;

 const { source, data } = resolved;
 const overlay = document.createElement('div');
 overlay.className = 'attr-detail-overlay';

 let bodyHtml;
 let headerHtml;

 if (source === 'element_table') {
 headerHtml = `
 <h3>
 ${t('tooltip.elementEffects')}
 <span class="attr-detail-max">${data.variantName}</span>
 </h3>
 `;
 bodyHtml = `
 <div class="attr-detail-section">
 <h4>\uD83D\uDCCB ${t('tooltip.elementTable')}</h4>
 ${buildElementTableHTML(data, false)}
 </div>
 `;
 } else if (data.name.includes('Critless') || (source === 'attr' && data.name.includes('Critless'))) {
 headerHtml = `
 <div style="background: rgba(255, 187, 0, 0.1); border: 1px dashed var(--accent-gold); padding: 15px; border-radius: 8px; width: 100%; margin-bottom: 20px;">
 <h3 style="color: var(--accent-gold); margin: 0; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
 <i class="fas fa-shield-alt"></i> ${t('tooltip.critlessGuide')}
 </h3>
 </div>
 `;
 bodyHtml = `
 <div class="attr-detail-section detailed" style="margin-top: 0;">
 <p style="font-size: 1rem; line-height: 1.6; color: #eee;">${data.explicacao ? data.explicacao.replace(/\\n/g, '<br>') : data.detailed}</p>
 </div>
 `;
 } else if (source === 'attr') {
 headerHtml = `
 <h3>
 ${data.name}
 ${data.max ? `<span class="attr-detail-max">${t('tooltip.maximum', { value: data.max })}</span>` : ''}
 </h3>
 `;
 bodyHtml = `
 <div class="attr-detail-section">
 <h4>\uD83D\uDCCB ${t('tooltip.summary')}</h4>
 <p>${data.summary}</p>
 </div>
 <div class="attr-detail-section detailed">
 <h4>\uD83D\uDCD6 ${t('tooltip.explanation')}</h4>
 <p>${data.detailed}</p>
 </div>
 `;
 } else if (source === 'move') {
 const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-detail-icon move-img" alt="${data.name}">` : '';
 headerHtml = `
 ${iconHtml}
 <h3>
 ${data.name}
 <span class="attr-detail-max">${data.type}</span>
 </h3>
 `;
 bodyHtml = `
 <div class="attr-detail-section">
 <h4>\uD83D\uDCD6 ${t('tooltip.moveDescription')}</h4>
 <p>${data.detailed.replace(/\\n/g, '<br>')}</p>
 </div>
 `;
 } else {
 // Effect (buff/debuff/term) or Class
 const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-detail-icon" alt="${data.name}">` : '';
 const typeLabel = source === 'class' ? data.type : (data.type === 'buff' ? t('tooltip.positiveEffect') : data.type === 'debuff' ? t('tooltip.negativeEffect') : t('tooltip.term'));

 headerHtml = `
 ${iconHtml}
 <h3>
 ${data.name}
 <span class="attr-detail-max">${typeLabel}</span>
 </h3>
 `;
 bodyHtml = `
 <div class="attr-detail-section">
 <h4>\uD83D\uDCD6 ${t('tooltip.description')}</h4>
 <p>${data.detailed}</p>
 </div>
 ${data.stacks ? `
 <div class="attr-detail-section">
 <h4>\uD83D\uDCCA ${t('tooltip.accumulation')}</h4>
 <p>${t('tooltip.maximum', { value: data.stacks + 'x' })}</p>
 ${data.scaling ? `<p>${t('tooltip.scaling', { value: data.scaling })}</p>` : ''}
 </div>` : ''}
 `;
 }


 overlay.innerHTML = `
 <div class="attr-detail-modal">
 <button class="attr-detail-close" aria-label="${t('tooltip.close')}">&times;</button>
 <div class="attr-detail-header">
 ${headerHtml}
 </div>
 <div class="attr-detail-body">
 ${bodyHtml}
 </div>
 <!-- Timer bar removed -->
 </div>
 `;

 document.body.appendChild(overlay);
 activeModal = overlay;

 // Animate in
 requestAnimationFrame(() => {
 overlay.classList.add('visible');
 });

 // Close handlers
 overlay.querySelector('.attr-detail-close').addEventListener('click', hideDetailModal);
 overlay.addEventListener('click', (e) => {
 if (e.target === overlay) hideDetailModal();
 });

 // Keyboard close
 const escHandler = (e) => {
 if (e.key === 'Escape') {
 hideDetailModal();
 document.removeEventListener('keydown', escHandler);
 }
 };
 document.addEventListener('keydown', escHandler);
}

/**
 * Hide the detail modal
 */
function hideDetailModal() {
 if (activeModal) {
 activeModal.classList.remove('visible');
 const modal = activeModal;
 setTimeout(() => modal.remove(), 300);
 activeModal = null;
 }
}

// ========== EVENT DELEGATION ==========

/**
 * Initialize attribute tooltip system with delegated events.
 * Should be called once during app initialization.
 */
export function initAttributeTooltips() {
  // Hover: show tooltip
  document.addEventListener('mouseenter', (e) => {
    if (!e.target || !e.target.closest) return;
    const target = e.target.closest('.attr-highlight');
    if (target) {
      showTooltip(target);
    }
  }, true); // capture phase for delegation

  document.addEventListener('mouseleave', (e) => {
    if (!e.target || !e.target.closest) return;
    if (e.target.closest('.attr-highlight')) {
      hideTooltip();
    }
  }, true);

  // Click: show detail modal
  document.addEventListener('click', (e) => {
    if (!e.target || !e.target.closest) return;
    const target = e.target.closest('.attr-highlight');
    if (target) {
      e.preventDefault();
      showDetailModal(target);
    }
  });

  // Touch: show tooltip on first tap, modal on second tap
  let lastTouched = null;
  document.addEventListener('touchend', (e) => {
    if (!e.target || !e.target.closest) return;
    const target = e.target.closest('.attr-highlight');

    if (!target) {
      // Tapped outside - hide tooltip if visible
      if (activeTooltip && e.target.closest && !e.target.closest('.attr-tooltip')) {
        hideTooltip();
      }
      lastTouched = null;
      return;
    }

 e.preventDefault();

 // Use dataset or inner element uniqueness (move names)
 const hitKey = target.dataset.move || target.dataset.attrKey;

 if (lastTouched === hitKey && activeTooltip) {
 // Second tap on same attribute \u2192 open modal
 showDetailModal(target);
 lastTouched = null;
 } else {
 // First tap \u2192 show tooltip
 showTooltip(target);
 lastTouched = hitKey;
 }
 });
}
