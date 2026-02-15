// =====================================================
// ATTRIBUTE TOOLTIP COMPONENT
// Hover tooltips + detail modal for attribute names
// Auto-closes after 20 seconds of inactivity
// =====================================================

import { ATTRIBUTE_DATA } from '../data/attributeData.js';
import { EFFECT_DATA } from '../data/effectData.js';

// ========== STATE ==========
let activeTooltip = null;
let activeModal = null;
let inactivityTimer = null;
const INACTIVITY_TIMEOUT = 20000; // 20 seconds

// ========== TOOLTIP (hover) ==========

/**
 * Resolve data from ATTRIBUTE_DATA or EFFECT_DATA
 * @param {string} key - Data key
 * @returns {{ source: 'attr'|'effect', data: Object }|null}
 */
function resolveData(key) {
    if (ATTRIBUTE_DATA[key]) return { source: 'attr', data: ATTRIBUTE_DATA[key] };
    if (EFFECT_DATA[key]) return { source: 'effect', data: EFFECT_DATA[key] };
    return null;
}

/**
 * Show a tooltip near the target element
 * @param {HTMLElement} target - The .attr-highlight element
 * @param {string} attrKey - Attribute or effect key
 */
function showTooltip(target, attrKey) {
    hideTooltip(); // remove any existing
    const resolved = resolveData(attrKey);
    if (!resolved) return;

    const { source, data } = resolved;
    const tooltip = document.createElement('div');
    tooltip.className = 'attr-tooltip';

    if (source === 'attr') {
        tooltip.innerHTML = `
            <div class="attr-tooltip-header">
                <strong>${data.name}</strong>
                <span class="attr-tooltip-max">Máx: ${data.max}</span>
            </div>
            <p class="attr-tooltip-summary">${data.summary}</p>
            <p class="attr-tooltip-tip">💡 ${data.quickTip}</p>
            <span class="attr-tooltip-hint">Clique para explicação detalhada</span>
        `;
    } else {
        // Effect (buff/debuff/term)
        const iconHtml = data.icon ? `<img src="${data.icon}" class="attr-tooltip-icon" alt="">` : '';
        const stacksHtml = data.stacks ? `<span class="attr-tooltip-max">Acúmulo: ${data.stacks}x</span>` : '';
        tooltip.innerHTML = `
            <div class="attr-tooltip-header">
                ${iconHtml}
                <strong>${data.name}</strong>
                ${stacksHtml}
            </div>
            <p class="attr-tooltip-summary">${data.detailed}</p>
            ${data.scaling ? `<p class="attr-tooltip-tip">📊 ${data.scaling}</p>` : ''}
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

    tooltip.style.top = `${top + window.scrollY} px`;
    tooltip.style.left = `${left} px`;
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
 * @param {string} attrKey - Attribute or effect key
 */
function showDetailModal(attrKey) {
    hideTooltip();
    hideDetailModal();

    const resolved = resolveData(attrKey);
    if (!resolved) return;

    const { source, data } = resolved;
    const overlay = document.createElement('div');
    overlay.className = 'attr-detail-overlay';

    let bodyHtml;
    let headerHtml;

    if (source === 'attr') {
        headerHtml = `
            <h3>${data.name}</h3>
            <span class="attr-detail-max">Máximo: ${data.max}</span>
        `;
        bodyHtml = `
            <div class="attr-detail-section">
                <h4>📋 Resumo do Jogo</h4>
                <p>${data.summary}</p>
            </div>
            <div class="attr-detail-section">
                <h4>⚡ Resumo Rápido</h4>
                <p>${data.quickTip}</p>
            </div>
            <div class="attr-detail-section detailed">
                <h4>📖 Explicação Detalhada</h4>
                <p>${data.detailed}</p>
            </div>
        `;
    } else {
        // Effect (buff/debuff/term)
        const iconHtml = data.icon ? `<img src="${data.icon}" class="attr-detail-icon" alt="${data.name}">` : '';
        const typeLabel = data.type === 'buff' ? 'Efeito Positivo' : data.type === 'debuff' ? 'Efeito Negativo' : 'Termo';
        headerHtml = `
            ${iconHtml}
            <h3>${data.name}</h3>
            <span class="attr-detail-max">${typeLabel}</span>
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
            <div class="attr-detail-timer">
                <div class="attr-detail-timer-bar"></div>
            </div>
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

    // Reset timer on any interaction inside the modal
    const modalEl = overlay.querySelector('.attr-detail-modal');
    const resetEvents = ['mousemove', 'touchstart', 'scroll', 'click'];
    resetEvents.forEach(evt => {
        modalEl.addEventListener(evt, resetInactivityTimer, { passive: true });
    });

    // Keyboard close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            hideDetailModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    // Start inactivity timer
    startInactivityTimer();
}

/**
 * Hide the detail modal
 */
function hideDetailModal() {
    clearInactivityTimer();
    if (activeModal) {
        activeModal.classList.remove('visible');
        const modal = activeModal;
        setTimeout(() => modal.remove(), 300);
        activeModal = null;
    }
}

// ========== INACTIVITY TIMER ==========

function startInactivityTimer() {
    clearInactivityTimer();
    // Animate timer bar
    if (activeModal) {
        const bar = activeModal.querySelector('.attr-detail-timer-bar');
        if (bar) {
            bar.style.transition = 'none';
            bar.style.width = '100%';
            requestAnimationFrame(() => {
                bar.style.transition = `width ${INACTIVITY_TIMEOUT}ms linear`;
                bar.style.width = '0%';
            });
        }
    }
    inactivityTimer = setTimeout(hideDetailModal, INACTIVITY_TIMEOUT);
}

function resetInactivityTimer() {
    if (activeModal) {
        startInactivityTimer();
    }
}

function clearInactivityTimer() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
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
            showTooltip(target, target.dataset.attrKey);
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
            showDetailModal(target.dataset.attrKey);
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
        const key = target.dataset.attrKey;

        if (lastTouched === key && activeTooltip) {
            // Second tap on same attribute → open modal
            showDetailModal(key);
            lastTouched = null;
        } else {
            // First tap → show tooltip
            showTooltip(target, key);
            lastTouched = key;
        }
    });
}
