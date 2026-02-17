// =====================================================
// TIER TABLE COMPONENT
// Renders tier list table with ranking badges
// =====================================================

import { ELEMENT_MAP, TIER_RANKS } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { getState, updateTierRank, setCompactMode, setEditorMode } from '../state/store.js';
import { flattenVariants, filterVariants, sortVariants } from '../utils/sorting.js';

/**
 * Create rank badge HTML
 * @param {string} rank - Rank value (SS, S, A, B, C, U, TBD)
 * @returns {string} HTML string
 */
export function createRankBadge(rank) {
    const rankClass = `rank-${rank.toLowerCase()}`;
    return `<div class="rank-badge ${rankClass}">${rank}</div>`;
}

/**
 * Cycle through rank values (for editor mode)
 * @param {string} charKey - Character key
 * @param {string} variantName - Variant name
 * @param {string} mode - Mode key (pf, riftOff, riftDef, parallel)
 */
export function cycleRank(charKey, variantName, mode) {
    const state = getState();
    if (!state.isEditorMode) return;

    const currentTierData = state.tierData[charKey]?.[variantName] ||
        { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' };

    const currentRank = currentTierData[mode];
    const newRankIndex = (TIER_RANKS.indexOf(currentRank) + 1) % TIER_RANKS.length;
    const newRank = TIER_RANKS[newRankIndex];

    updateTierRank(charKey, variantName, mode, newRank);

    // Re-render table
    if (window.onTierDataChanged) {
        window.onTierDataChanged();
    }
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

    // Get and filter variants
    let variants = flattenVariants(charData.variants);
    variants = filterVariants(variants, state.filters);
    variants = sortVariants(variants, state.sort);

    const compactClass = state.isCompactMode ? 'compact-mode' : '';
    const editingClass = state.isEditorMode ? 'editing' : '';

    let rowsHTML = '';

    if (variants.length === 0) {
        rowsHTML = `<tr><td colspan="5" class="text-center" style="padding: 40px; color: var(--text-muted);">Nenhuma variante encontrada com estes filtros.</td></tr>`;
    } else {
        rowsHTML = variants.map(variant => {
            const ranks = tierData[variant.name] || { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' };
            const imgPath = getVariantImage(charKey, variant.name, 0);

            return `
                <tr>
                    <td>
                        <div class="tier-char-cell">
                            <img src="${imgPath}" alt="${variant.name}" onerror="this.src='img/icones/Annie_Icon.png'">
                            <span>${variant.name}</span>
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="rank-cell-container text-center" onclick="handleCycleRank('${charKey}', '${variant.name}', 'pf')">
                            ${createRankBadge(ranks.pf)}
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="rank-cell-container text-center" onclick="handleCycleRank('${charKey}', '${variant.name}', 'riftOff')">
                            ${createRankBadge(ranks.riftOff)}
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="rank-cell-container text-center" onclick="handleCycleRank('${charKey}', '${variant.name}', 'riftDef')">
                            ${createRankBadge(ranks.riftDef)}
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="rank-cell-container text-center" onclick="handleCycleRank('${charKey}', '${variant.name}', 'parallel')">
                            ${createRankBadge(ranks.parallel)}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    return `
        <div class="tier-table-wrapper">
            <table class="tier-table ${compactClass} ${editingClass}">
                <thead>
                    <tr>
                        <th>Variante</th>
                        <th class="text-center">DP Ataque</th>
                        <th class="text-center">Fenda Ataque</th>
                        <th class="text-center">Fenda Defesa</th>
                        <th class="text-center">Reinos Paralelos</th>
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
    const state = getState();
    const compactChecked = state.isCompactMode ? 'checked' : '';
    const editorChecked = state.isEditorMode ? 'checked' : '';

    return `
        <!-- Temporary Editor Notice -->
        <div class="temp-notice">
            <strong>MODO EDITOR ATIVO</strong>
            <p>Ative o modo edição abaixo para mudar as notas clicando nelas. <br>
                <em>Suas mudanças ficam salvas no navegador e podem ser exportadas para o código.</em>
            </p>
        </div>

        <!-- Rank Explanations Dictionary -->
        <div class="rank-dictionary">
            <div class="dict-item"><span class="rank-badge rank-ss">SS</span>
                <p>O Melhor dos Melhores; Domina o Modo.</p>
            </div>
            <div class="dict-item"><span class="rank-badge rank-s">S</span>
                <p>Muito Forte e Útil; Poucas Falhas.</p>
            </div>
            <div class="dict-item"><span class="rank-badge rank-a">A</span>
                <p>Sólido, mas com algumas limitações.</p>
            </div>
            <div class="dict-item"><span class="rank-badge rank-b">B</span>
                <p>Razoável, mas tem desvantagens claras.</p>
            </div>
            <div class="dict-item"><span class="rank-badge rank-c">C</span>
                <p>Ruim; existem opções melhores.</p>
            </div>
            <div class="dict-item"><span class="rank-badge rank-u">U</span>
                <p>Inviável: Sem utilidade; Não Recomendado.</p>
            </div>
            <div class="dict-item"><span class="rank-badge rank-tbd">TBD</span>
                <p>Em Análise: Lutador Novo ou Alterado; Rank Pendente.</p>
            </div>
        </div>

        <!-- Editor Control Bar -->
        <div class="editor-control-bar">
            <div class="editor-toggle">
                <label class="switch">
                    <input type="checkbox" id="compact-mode-toggle" ${compactChecked} onchange="handleToggleCompactMode()">
                    <span class="slider round"></span>
                </label>
                <span class="editor-label">Modo Compacto</span>
            </div>

            <div class="editor-toggle">
                <label class="switch">
                    <input type="checkbox" id="editor-mode-toggle" ${editorChecked} onchange="handleToggleEditorMode()">
                    <span class="slider round"></span>
                </label>
                <span class="editor-label">Modo Edição (Apenas para você)</span>
            </div>
            <button class="save-data-btn" onclick="handleSaveTierData()">Gerar JSON para o Código</button>
        </div>

        ${createTierTable(charKey, charData)}
    `;
}

// Global handlers
export function handleCycleRank(charKey, variantName, mode) {
    cycleRank(charKey, variantName, mode);
}


export function handleToggleCompactMode() {
    const checked = document.getElementById('compact-mode-toggle')?.checked || false;
    setCompactMode(checked);
    if (window.onTierDataChanged) {
        window.onTierDataChanged();
    }
}

export function handleToggleEditorMode() {
    const checked = document.getElementById('editor-mode-toggle')?.checked || false;
    setEditorMode(checked);
    const table = document.querySelector('.tier-table');
    if (table) {
        table.classList.toggle('editing', checked);
    }
    // Re-render to show/hide note cell editing styles
    if (window.onTierDataChanged) {
        window.onTierDataChanged();
    }
}

export function handleSaveTierData() {
    const state = getState();
    localStorage.setItem('TIER_DATA_PERSISTED', JSON.stringify(state.tierData));

    const jsonString = JSON.stringify(state.tierData, null, 4);
    console.log('--- DADOS PARA O ARQUIVO DATA/TIER-DATA.JSON ---');
    console.log(jsonString);

    // Simple copy to clipboard attempt
    navigator.clipboard.writeText(jsonString).then(() => {
        alert('Dados copiados para a área de transferência! \n\nAgora você pode me enviar (Antigravity) esse conteúdo JSON aqui no chat para que eu salve permanentemente nos arquivos do projeto.');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Alterações salvas no seu navegador! \n\nConfira o console do desenvolvedor (F12) para o JSON completo. Envie esse JSON para mim (Antigravity) para salvar permanentemente.');
    });
}
