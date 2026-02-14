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
 * Show a tooltip near the target element
 * @param {HTMLElement} target - The .attr-highlight element
 * @param {string} key - Key in ATTRIBUTE_DATA or EFFECT_DATA
 */
function showTooltip(target, key) {
    hideTooltip(); // remove any existing

    // Check both data sources
    const data = ATTRIBUTE_DATA[key] || EFFECT_DATA[key];
    if (!data) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'attr-tooltip';

    // Customize header based on type
    let headerHTML = '';
    if (data.max) {
        // Attribute
        headerHTML = `<strong>${data.name}</strong> <span class="attr-tooltip-max">Máx: ${data.max}</span>`;
    } else if (data.type === 'buff' || data.type === 'debuff') {
        // Effect
        const typeLabel = data.type === 'buff' ? 'Efeito Positivo' : 'Efeito Negativo';
        const typeClass = data.type;
        headerHTML = `<strong>${data.name}</strong> <span class="attr-tooltip-type ${typeClass}">${typeLabel}</span>`;
    } else {
        // Technical Term
        headerHTML = `<strong>${data.name}</strong>`;
    }

    tooltip.innerHTML = `
        <div class="attr-tooltip-header">
            ${headerHTML}
        </div>
        ${data.quickTip ? `<p class="attr-tooltip-tip">💡 ${data.quickTip}</p>` : ''}
        <span class="attr-tooltip-hint">Clique para explicação detalhada</span>
    `;

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
 * @param {string} key - Data key
 */
function showDetailModal(key) {
    hideTooltip();
    hideDetailModal();

    const data = ATTRIBUTE_DATA[key] || EFFECT_DATA[key];
    if (!data) return;

    const overlay = document.createElement('div');
    overlay.className = 'attr-detail-overlay';

    // Type specific header info
    let subHeader = '';
    if (data.max) {
        subHeader = `<span class="attr-detail-max">Máximo: ${data.max}</span>`;
    } else if (data.stacks) {
        subHeader = `<span class="attr-detail-max">Máx.Acúmulos: ${data.stacks}x</span>`;
    }

    overlay.innerHTML = `
        <div class="attr-detail-modal">
            <button class="attr-detail-close" aria-label="Fechar">&times;</button>
            <div class="attr-detail-header">
                ${data.icon ? `<img src="${data.icon}" class="attr-detail-icon" alt="">` : ''}
                <div class="attr-detail-title-group">
                    <h3>${data.name}</h3>
                    ${subHeader}
                </div>
            </div>
            <div class="attr-detail-body">
                ${data.quickTip ? `
                <div class="attr-detail-section">
                    <h4>⚡ Resumo Rápido</h4>
                    <p>${data.quickTip}</p>
                </div>
                ` : ''}
                <div class="attr-detail-section detailed">
                    <h4>📖 Explicação Detalhada</h4>
                    <p>${data.detailed}</p>
                </div>
                ${data.scaling ? `
                <div class="attr-detail-section scaling">
                    <h4>⚖️ Escalonamento de Acúmulos</h4>
                    <p class="scaling-values">${data.scaling}</p>
                </div>
                ` : ''}
            </div>
            <div class="attr-detail-timer">
                <div class="attr-detail-timer-bar"></div>
            </div>
        </div >
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
