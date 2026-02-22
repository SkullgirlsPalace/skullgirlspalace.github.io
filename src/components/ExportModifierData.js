// =====================================================
// EXPORT MODIFIER DATA COMPONENT
// Modal for selecting and exporting buffs/debuffs data
// as JSON or TXT
// =====================================================

import { EFFECT_DATA } from '../data/effectData.js';

// ========== MODAL HTML ==========

/**
 * Render the export modifier modal HTML
 */
export function renderModifierExportModal() {
    const buffs = [];
    const debuffs = [];

    for (const [key, effect] of Object.entries(EFFECT_DATA)) {
        if (effect.type === 'buff') {
            buffs.push({ key, ...effect });
        } else if (effect.type === 'debuff') {
            debuffs.push({ key, ...effect });
        }
    }

    buffs.sort((a, b) => a.name.localeCompare(b.name));
    debuffs.sort((a, b) => a.name.localeCompare(b.name));

    const renderCheckboxes = (effects, typeLabel) => {
        return effects.map(effect => `
            <label class="export-char-item" data-modifier-key="${effect.key}">
                <input type="checkbox" class="export-modifier-checkbox" value="${effect.key}" data-type="${effect.type}">
                <div class="export-char-icon-wrapper">
                    ${effect.icon
                ? `<img src="${effect.icon}" alt="${effect.name}" class="export-char-icon" onerror="this.style.display='none'">`
                : `<span style="font-size: 0.7rem; color: var(--text-muted);">${typeLabel}</span>`
            }
                </div>
                <span class="export-char-name">${effect.name}</span>
            </label>
        `).join('');
    };

    return `
        <div id="modifier-export-modal-overlay" class="export-modal-overlay" onclick="handleModifierExportOverlayClick(event)">
            <div class="export-modal" onclick="event.stopPropagation()">
                <div class="export-modal-header">
                    <h2>📥 Exportar Modificadores</h2>
                    <button class="export-modal-close" onclick="toggleModifierExportModal()" aria-label="Fechar">✕</button>
                </div>

                <div class="export-modal-body">
                    <!-- Selection Controls -->
                    <div class="export-controls">
                        <button class="export-select-all-btn" onclick="handleModifierSelectAll()">
                            ☑ Selecionar Todos
                        </button>
                        <button class="export-deselect-all-btn" onclick="handleModifierDeselectAll()">
                            ☐ Desmarcar Todos
                        </button>
                        <span class="export-count" id="modifier-export-selected-count">0 selecionados</span>
                    </div>

                    <!-- Buffs Section -->
                    <h3 style="color: var(--accent-green, #4caf50); font-size: 0.85rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; font-family: 'Cinema', sans-serif;">
                        Efeitos Positivos
                    </h3>
                    <div class="export-char-grid" style="margin-bottom: 16px;">
                        ${renderCheckboxes(buffs, '✦')}
                    </div>

                    <!-- Debuffs Section -->
                    <h3 style="color: var(--accent-red, #f44336); font-size: 0.85rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; font-family: 'Cinema', sans-serif;">
                        Efeitos Negativos
                    </h3>
                    <div class="export-char-grid">
                        ${renderCheckboxes(debuffs, '✧')}
                    </div>

                    <!-- Format Selection -->
                    <div class="export-format-section">
                        <h3>Formato de Exportação</h3>
                        <div class="export-format-options">
                            <label class="export-format-option active" data-format="json">
                                <input type="radio" name="modifier-export-format" value="json" checked>
                                <span class="format-icon">{ }</span>
                                <span class="format-label">JSON</span>
                                <span class="format-desc">Estruturado, ideal para devs</span>
                            </label>
                            <label class="export-format-option" data-format="txt">
                                <input type="radio" name="modifier-export-format" value="txt">
                                <span class="format-icon">📄</span>
                                <span class="format-label">TXT</span>
                                <span class="format-desc">Texto legível, fácil de ler</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="export-modal-footer">
                    <button class="export-download-btn" id="modifier-export-download-btn" onclick="handleModifierExportDownload()" disabled>
                        <span class="export-btn-icon">⬇️</span>
                        <span class="export-btn-text">Exportar</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========== INITIALIZATION ==========

/**
 * Initialize modifier export modal event listeners
 */
export function initModifierExportModal() {
    // Checkbox change listeners
    document.querySelectorAll('.export-modifier-checkbox').forEach(cb => {
        cb.addEventListener('change', updateModifierSelectedCount);
    });

    // Format radio listeners
    document.querySelectorAll('input[name="modifier-export-format"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Only update format options within the modifier modal
            const modal = document.getElementById('modifier-export-modal-overlay');
            if (modal) {
                modal.querySelectorAll('.export-format-option').forEach(opt => {
                    opt.classList.toggle('active', opt.dataset.format === e.target.value);
                });
            }
        });
    });

    // Register global handlers
    window.toggleModifierExportModal = toggleModifierExportModal;
    window.handleModifierSelectAll = handleModifierSelectAll;
    window.handleModifierDeselectAll = handleModifierDeselectAll;
    window.handleModifierExportDownload = handleModifierExportDownload;
    window.handleModifierExportOverlayClick = handleModifierExportOverlayClick;
}

// ========== MODAL TOGGLE ==========

export function toggleModifierExportModal() {
    const overlay = document.getElementById('modifier-export-modal-overlay');
    if (!overlay) return;

    const isOpen = overlay.classList.contains('active');

    if (isOpen) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function handleModifierExportOverlayClick(event) {
    if (event.target.id === 'modifier-export-modal-overlay') {
        toggleModifierExportModal();
    }
}

// ========== SELECTION HELPERS ==========

function handleModifierSelectAll() {
    document.querySelectorAll('.export-modifier-checkbox').forEach(cb => {
        cb.checked = true;
    });
    updateModifierSelectedCount();
}

function handleModifierDeselectAll() {
    document.querySelectorAll('.export-modifier-checkbox').forEach(cb => {
        cb.checked = false;
    });
    updateModifierSelectedCount();
}

function updateModifierSelectedCount() {
    const checked = document.querySelectorAll('.export-modifier-checkbox:checked');
    const countEl = document.getElementById('modifier-export-selected-count');
    const downloadBtn = document.getElementById('modifier-export-download-btn');

    if (countEl) {
        countEl.textContent = `${checked.length} selecionado${checked.length !== 1 ? 's' : ''}`;
    }
    if (downloadBtn) {
        downloadBtn.disabled = checked.length === 0;
    }
}

// ========== EXPORT LOGIC ==========

function handleModifierExportDownload() {
    const checked = document.querySelectorAll('.export-modifier-checkbox:checked');
    if (checked.length === 0) return;

    const format = document.querySelector('input[name="modifier-export-format"]:checked')?.value || 'json';
    const selectedKeys = Array.from(checked).map(cb => cb.value);

    // Gather selected modifier data
    const modifierData = {};
    for (const key of selectedKeys) {
        if (EFFECT_DATA[key]) {
            modifierData[key] = EFFECT_DATA[key];
        }
    }

    if (format === 'json') {
        downloadModifierJSON(modifierData, selectedKeys);
    } else {
        downloadModifierTXT(modifierData, selectedKeys);
    }
}

/**
 * Download modifier data as JSON
 */
function downloadModifierJSON(modifierData, keys) {
    let content;
    let filename;

    if (keys.length === 1) {
        const key = keys[0];
        content = JSON.stringify({ [key]: modifierData[key] }, null, 2);
        filename = `modificador-${key}.json`;
    } else {
        content = JSON.stringify(modifierData, null, 2);
        filename = 'todos-modificadores.json';
    }

    triggerDownload(content, filename, 'application/json');
}

/**
 * Download modifier data as TXT
 */
function downloadModifierTXT(modifierData, keys) {
    let lines = [];

    lines.push('═══════════════════════════════════════════════════');
    lines.push('  MODIFICADORES');
    lines.push('═══════════════════════════════════════════════════');
    lines.push('');

    // Separate buffs and debuffs
    const buffs = keys.filter(k => modifierData[k]?.type === 'buff');
    const debuffs = keys.filter(k => modifierData[k]?.type === 'debuff');

    if (buffs.length > 0) {
        lines.push('╔═══════════════════════════════════════════╗');
        lines.push('║  EFEITOS POSITIVOS (BUFFS)');
        lines.push('╚═══════════════════════════════════════════╝');
        lines.push('');

        for (const key of buffs) {
            const effect = modifierData[key];
            lines.push(`  ★ ${effect.name}`);
            lines.push(`    Tipo: Efeito Positivo`);
            lines.push(`    Descrição: ${effect.detailed}`);
            if (effect.stacks) lines.push(`    Acúmulos Máx.: ${effect.stacks}x`);
            if (effect.scaling) lines.push(`    Escalonamento: ${effect.scaling}`);
            if (effect.keys) lines.push(`    Palavras-chave: ${effect.keys.join(', ')}`);
            lines.push('');
        }
    }

    if (debuffs.length > 0) {
        lines.push('╔═══════════════════════════════════════════╗');
        lines.push('║  EFEITOS NEGATIVOS (DEBUFFS)');
        lines.push('╚═══════════════════════════════════════════╝');
        lines.push('');

        for (const key of debuffs) {
            const effect = modifierData[key];
            lines.push(`  ★ ${effect.name}`);
            lines.push(`    Tipo: Efeito Negativo`);
            lines.push(`    Descrição: ${effect.detailed}`);
            if (effect.stacks) lines.push(`    Acúmulos Máx.: ${effect.stacks}x`);
            if (effect.scaling) lines.push(`    Escalonamento: ${effect.scaling}`);
            if (effect.keys) lines.push(`    Palavras-chave: ${effect.keys.join(', ')}`);
            lines.push('');
        }
    }

    const filename = keys.length === 1 ? `modificador-${keys[0]}.txt` : 'todos-modificadores.txt';
    triggerDownload(lines.join('\n'), filename, 'text/plain');
}

/**
 * Trigger a file download via temporary link
 */
function triggerDownload(content, filename, mimeType) {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}
