// =====================================================
// TIER TABLE COMPONENT
// Renders tier list table with ranking badges
// =====================================================

import { ELEMENT_MAP, TIER_RANKS, RARITY_ICONS } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { getState, setCompactMode, setEditorMode, updateTierRank } from '../state/store.js';
import { flattenVariants, filterVariants, sortVariants } from '../utils/sorting.js';

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
function cycleRank(charKey, variantName, mode) {
    const state = getState();
    const currentTierData = state.tierData[charKey] || {};
    const variantRanks = currentTierData[variantName] || { pf: 'N/A', riftOff: 'N/A', riftDef: 'N/A', parallel: 'N/A' };
    const currentRank = variantRanks[mode] || 'N/A';

    const currentIndex = TIER_RANKS.indexOf(currentRank);
    const nextIndex = (currentIndex + 1) % TIER_RANKS.length;
    const nextRank = TIER_RANKS[nextIndex];

    updateTierRank(charKey, variantName, mode, nextRank);

    // Save locally for immediate feedback
    const updatedTierData = { ...state.tierData };
    if (!updatedTierData[charKey]) updatedTierData[charKey] = {};
    if (!updatedTierData[charKey][variantName]) updatedTierData[charKey][variantName] = {};
    updatedTierData[charKey][variantName][mode] = nextRank;

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
            const baseRanks = tierData[variant.name] || {};
            const ranks = {
                pf: baseRanks.pf || 'B',
                riftOff: baseRanks.riftOff || 'B',
                riftDef: baseRanks.riftDef || 'B',
                parallel: baseRanks.parallel || 'B'
            };
            const imgPath = getVariantImage(charKey, variant.name, 0);

            const elementStr = variant.element || 'Neutro';
            const elementInfo = ELEMENT_MAP[elementStr] || ELEMENT_MAP['Neutro'];
            const elementClass = elementInfo.class;

            const rarityKey = variant.rarityKey || 'diamante';
            const rarityIcon = RARITY_ICONS[rarityKey];
            const masteryIcon = getMasteryIcon(charKey);

            const charCellContent = state.isCompactMode ? `
                <div class="compact-char-info">
                    <span style="font-weight: 800;">${variant.name}</span>
                    <img src="${masteryIcon}" alt="" class="compact-mastery-icon">
                    <img src="${rarityIcon}" alt="${rarityKey}" class="compact-rarity-icon">
                </div>
            ` : `
                <img src="${imgPath}" alt="${variant.name}" onerror="this.src='img/icones/Annie_Icon.png'">
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
                        <div class="rank-cell-container text-center" onclick="handleCycleRank('${charKey}', '${variant.name}', 'pf')">
                            ${createRankBadge(ranks.pf)}
                        </div>
                    </td>
                    <td class="text-center">
                        <div class="rank-cell-container text-center" onclick="handleCycleRank('${charKey}', '${variant.name}', 'parallel')">
                            ${createRankBadge(ranks.parallel)}
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
                        <th class="text-center">
                            <span class="attr-highlight" data-attr-key="tier_dp_ataque" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">DP Ataque</span>
                        </th>
                        <th class="text-center">
                            <span class="attr-highlight" data-attr-key="tier_reinos_paralelos" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">Reinos Paralelos</span>
                        </th>
                        <th class="text-center">
                            <span class="attr-highlight" data-attr-key="tier_fenda_ataque" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">Fenda Ataque</span>
                        </th>
                        <th class="text-center">
                            <span class="attr-highlight" data-attr-key="tier_fenda_defesa" style="border-bottom: 1px dotted rgba(255,255,255,0.4); color: var(--text-muted); padding: 4px;">Fenda Defesa</span>
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
    const state = getState();
    const compactChecked = state.isCompactMode ? 'checked' : '';
    const editorChecked = state.isEditorMode ? 'checked' : '';

    return `
        <!-- Temporary Editor Notice -->
        ${state.isEditorMode ? `
        <div class="temp-notice fade-in">
            <strong>MODO EDITOR ATIVO</strong>
            <p>Clique nas notas para alternar entre SS, S, A, B, C, I e N/A. <br>
                <em>Suas mudanças ficam salvas no navegador e podem ser exportadas para o código.</em>
            </p>
        </div>` : ''}


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
            <div class="dict-item"><span class="rank-badge rank-i">I</span>
                <p>Inviável: Sem utilidade; Não Recomendado.</p>
            </div>
            <div class="dict-item"><span class="rank-badge rank-na">N/A</span>
                <p>Não Avaliado/Em Análise: Lutador Novo ou Alterado; Rank Pendente.</p>
            </div>
        </div>

        <!-- Display Control Bar -->
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
    const state = getState();
    if (state.isEditorMode) {
        cycleRank(charKey, variantName, mode);
    }
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
    // Re-render to show/hide notice and update table class
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
    if (navigator.clipboard) {
        navigator.clipboard.writeText(jsonString).then(() => {
            alert('Dados copiados para a área de transferência! \n\nAgora você pode me enviar (Antigravity) esse conteúdo JSON aqui no chat para que eu salve permanentemente nos arquivos do projeto.');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Erro ao copiar. O JSON foi impresso no Console (F12).');
        });
    } else {
        alert('Cópia automática não disponível. O JSON foi impresso no Console (F12).');
    }
}
