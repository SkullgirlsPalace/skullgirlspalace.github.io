// =====================================================
// TIER TABLE COMPONENT
// Renders tier list table with ranking badges
// =====================================================

import { ELEMENT_MAP, TIER_RANKS, RARITY_ICONS } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { getPortraitImage } from '../data/portraitMap.js';
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
            const portraitPath = getPortraitImage(charKey, variant.name);

            const elementStr = variant.element || 'Neutro';
            const elementInfo = ELEMENT_MAP[elementStr] || ELEMENT_MAP['Neutro'];
            const elementClass = elementInfo.class;

            const rarityKey = variant.rarityKey || 'diamante';
            const rarityIcon = RARITY_ICONS[rarityKey];
            const masteryIcon = getMasteryIcon(charKey);

            const charCellContent = state.isCompactMode ? `
                <div class="compact-char-info">
                    <div class="compact-portrait-wrapper">
                        <img src="${portraitPath}" alt="${variant.name}" title="${variant.name}" class="compact-portrait-img">
                        <div class="compact-badges">
                            <img src="${elementInfo.statIcon}" alt="${elementStr}" class="compact-element-icon">
                            <img src="${rarityIcon}" alt="${rarityKey}" class="compact-rarity-icon">
                        </div>
                    </div>
                    <span class="compact-variant-name">${variant.name}</span>
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
        <div class="editor-control-bar" style="justify-content: center;">
            <div class="editor-toggle">
                <label class="switch">
                    <input type="checkbox" id="compact-mode-toggle" ${compactChecked} onchange="handleToggleCompactMode()">
                    <span class="slider round"></span>
                </label>
                <span class="editor-label">Modo Compacto</span>
            </div>
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

export async function handleSaveTierData() {
    const state = getState();

    // Always persist to localStorage for safety
    localStorage.setItem('TIER_DATA_PERSISTED', JSON.stringify(state.tierData));

    try {
        const response = await fetch('http://localhost:3000/save-tier-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.tierData)
        });

        if (response.ok) {
            alert('✅ Dados salvos com sucesso no arquivo data/tier-data.json!');
        } else {
            throw new Error('Falha ao salvar no servidor');
        }
    } catch (error) {
        console.error('Erro ao salvar:', error);

        // Detailed error message if server is likely not running
        const jsonString = JSON.stringify(state.tierData, null, 4);
        console.log('--- DADOS PARA O ARQUIVO DATA/TIER-DATA.JSON ---');
        console.log(jsonString);

        alert('❌ Erro ao salvar diretamente no arquivo.\n\nCERTIFIQUE-SE QUE O SERVIDOR ESTÁ RODANDO:\n1. Abra um terminal na pasta do projeto\n2. Digite: node scripts/server.js\n\nComo contingência, o JSON foi copiado para sua área de transferência.');

        // Fallback to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(jsonString);
        }
    }
}
