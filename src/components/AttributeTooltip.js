// =====================================================
// ATTRIBUTE TOOLTIP COMPONENT
// Hover tooltips + detail modal for attribute names
// Auto-closes after 20 seconds of inactivity
// =====================================================

import { ATTRIBUTE_DATA } from '../data/attributeData.js';
import { EFFECT_DATA } from '../data/effectData.js';
import { getMoveData } from '../data/movesimages.js';
import { getElementEffects } from '../data/elementEffectsData.js';
import { ELEMENT_MAP } from '../config/constants.js';

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

    if (ATTRIBUTE_DATA[key]) return { source: 'attr', data: ATTRIBUTE_DATA[key] };
    if (EFFECT_DATA[key]) return { source: 'effect', data: EFFECT_DATA[key] };
    return null;
}

/**
 * Build HTML for element effects table (used in both tooltip and modal)
 * @param {Object} data - Element effects data
 * @param {boolean} compact - Whether to use compact layout (tooltip) or full (modal)
 * @returns {string} HTML string
 */
function buildElementTableHTML(data, compact = false) {
    const elements = ['Ar', 'Fogo', 'Água', 'Trevas', 'Luz', 'Neutro'];
    const hasDebuffs = data.debuffs && Object.values(data.debuffs).some(arr => arr && arr.length > 0);

    let rows = elements.map(el => {
        const elInfo = ELEMENT_MAP[el];
        if (!elInfo) return '';
        const buffs = (data.buffs && data.buffs[el]) || [];
        const debuffs = (data.debuffs && data.debuffs[el]) || [];
        if (buffs.length === 0 && debuffs.length === 0) return '';

        const buffText = buffs.length > 0 ? buffs.join(', ') : '—';
        const debuffText = debuffs.length > 0 ? debuffs.join(', ') : '';

        return `
            <tr class="element-row">
                <td class="element-cell">
                    <img loading="lazy" src="${elInfo.iconPath}" alt="${el}" class="element-table-icon">
                    <span class="element-table-name">${el}</span>
                </td>
                <td class="buff-cell">${buffText}</td>
                ${hasDebuffs ? `<td class="debuff-cell">${debuffText || '—'}</td>` : ''}
            </tr>
        `;
    }).filter(Boolean).join('');

    return `
        <table class="element-effects-table">
            <thead>
                <tr>
                    <th>Elemento</th>
                    <th class="buff-header">EF. Positivo</th>
                    ${hasDebuffs ? '<th class="debuff-header">EF. Negativo</th>' : ''}
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
                    <strong>Efeitos por Elemento</strong>
                </div>
                <span class="attr-tooltip-max">${data.variantName}</span>
            </div>
            ${buildElementTableHTML(data, true)}
            <span class="attr-tooltip-hint">Clique para explicação detalhada</span>
        `;
    } else if (source === 'attr') {
        tooltip.innerHTML = `
            <div class="attr-tooltip-header">
                <div class="attr-tooltip-title-group">
                    <strong>${data.name}</strong>
                </div>
                ${data.max ? `<span class="attr-tooltip-max">Máx: ${data.max}</span>` : ''}
            </div>
            <p class="attr-tooltip-summary">${data.summary}</p>
            <span class="attr-tooltip-hint">Clique para explicação detalhada</span>
        `;
    } else if (source === 'move') {
        const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-tooltip-icon" alt="">` : '';
        tooltip.innerHTML = `
            <div class="attr-tooltip-header">
                <div class="attr-tooltip-title-group">
                    ${iconHtml}
                    <strong>${data.name}</strong>
                </div>
                <span class="attr-tooltip-max">${data.type}</span>
            </div>
            <p class="attr-tooltip-summary">${data.summary.replace(/\\n/g, '<br>')}</p>
            <span class="attr-tooltip-hint">Clique para explicação detalhada</span>
        `;
    } else {
        // Effect (buff/debuff/term)
        const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-tooltip-icon" alt="">` : '';

        let disclaimerHtml = '';
        if (data.stacks || data.scaling) {
            disclaimerHtml = `
                <div class="attr-tooltip-disclaimer">
                    ${data.stacks ? `<span>Acúmulo: ${data.stacks}x</span>` : ''}
                    ${data.scaling ? `<span>Escalonamento: ${data.scaling}</span>` : ''}
                </div>
            `;
        }

        tooltip.innerHTML = `
            <div class="attr-tooltip-header">
                <div class="attr-tooltip-title-group">
                    ${iconHtml}
                    <strong>${data.name}</strong>
                </div>
            </div>
            <p class="attr-tooltip-summary">${data.detailed}</p>
            ${disclaimerHtml}
            <span class="attr-tooltip-hint">Clique para explicação detalhada</span>
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
                Efeitos por Elemento
                <span class="attr-detail-max">${data.variantName}</span>
            </h3>
        `;
        bodyHtml = `
            <div class="attr-detail-section">
                <h4>📋 Tabela de Efeitos Elementais</h4>
                ${buildElementTableHTML(data, false)}
            </div>
        `;
    } else if (source === 'attr') {
        headerHtml = `
            <h3>
                ${data.name}
                ${data.max ? `<span class="attr-detail-max">Máximo: ${data.max}</span>` : ''}
            </h3>
        `;
        bodyHtml = `
            <div class="attr-detail-section">
                <h4>📋 Resumo</h4>
                <p>${data.summary}</p>
            </div>
            <div class="attr-detail-section detailed">
                <h4>📖 Explicação</h4>
                <p>${data.detailed}</p>
            </div>
        `;
    } else if (source === 'move') {
        const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-detail-icon" alt="${data.name}">` : '';
        headerHtml = `
            ${iconHtml}
            <h3>
                ${data.name}
                <span class="attr-detail-max">${data.type}</span>
            </h3>
        `;
        bodyHtml = `
            <div class="attr-detail-section">
                <h4>📖 Descrição do Golpe</h4>
                <p>${data.detailed.replace(/\\n/g, '<br>')}</p>
            </div>
        `;
    } else {
        // Effect (buff/debuff/term)
        const iconHtml = data.icon ? `<img loading="lazy" src="${data.icon}" class="attr-detail-icon" alt="${data.name}">` : '';
        const typeLabel = data.type === 'buff' ? 'Efeito Positivo' : data.type === 'debuff' ? 'Efeito Negativo' : 'Termo';
        headerHtml = `
            ${iconHtml}
            <h3>
                ${data.name}
                <span class="attr-detail-max">${typeLabel}</span>
            </h3>
        `;
        bodyHtml = `
            <div class="attr-detail-section">
                <h4>📖 Descrição</h4>
                <p>${data.detailed}</p>
            </div>
            ${data.stacks ? `
            <div class="attr-detail-section">
                <h4>📊 Acúmulo</h4>
                <p>Máximo: ${data.stacks}x</p>
                ${data.scaling ? `<p>Escalonamento: ${data.scaling}</p>` : ''}
            </div>` : ''}
        `;
    }


    overlay.innerHTML = `
        <div class="attr-detail-modal">
            <button class="attr-detail-close" aria-label="Fechar">&times;</button>
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
        const target = e.target.closest('.attr-highlight');
        if (target) {
            showTooltip(target);
        }
    }, true); // capture phase for delegation

    document.addEventListener('mouseleave', (e) => {
        if (e.target.closest('.attr-highlight')) {
            hideTooltip();
        }
    }, true);

    // Click: show detail modal
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.attr-highlight');
        if (target) {
            e.preventDefault();
            showDetailModal(target);
        }
    });

    // Touch: show tooltip on first tap, modal on second tap
    let lastTouched = null;
    document.addEventListener('touchend', (e) => {
        const target = e.target.closest('.attr-highlight');

        if (!target) {
            // Tapped outside - hide tooltip if visible
            if (activeTooltip && !e.target.closest('.attr-tooltip')) {
                hideTooltip();
            }
            lastTouched = null;
            return;
        }

        e.preventDefault();

        // Use dataset or inner element uniqueness (move names)
        const hitKey = target.dataset.move || target.dataset.attrKey;

        if (lastTouched === hitKey && activeTooltip) {
            // Second tap on same attribute → open modal
            showDetailModal(target);
            lastTouched = null;
        } else {
            // First tap → show tooltip
            showTooltip(target);
            lastTouched = hitKey;
        }
    });
}
