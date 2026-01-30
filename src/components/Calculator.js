// =====================================================
// CALCULATOR COMPONENT
// Simulators for earnings and evolution costs
// Uses real data from JSON files
// =====================================================

import { formatNumber } from '../utils/formatters.js';

// Store loaded data
let statsData = null;

/**
 * Initialize calculator with loaded stats data
 * @param {Object} data - Statistics data from dataService
 */
export function initCalculator(data) {
    statsData = data;
}

/**
 * Create earnings calculator HTML
 * @returns {string} HTML string
 */
export function createEarningsCalculator() {
    return `
        <div class="calculator-box earnings-calc">
            <h3>💰 Simulador de Ganhos Mensais</h3>
            <p class="calc-subtitle">Configure seu perfil para calcular ganhos em coins e teonita</p>

            <div class="calc-form">
                <div class="calc-section">
                    <h4>📊 Disputa Premiada</h4>
                    
                    <label class="calc-checkbox">
                        <input type="checkbox" id="calc-dp-mensal" checked>
                        <span>Participar da DP Mensal</span>
                    </label>

                    <label class="calc-checkbox">
                        <input type="checkbox" id="calc-dp-perso" checked>
                        <span>Participar das DPs de Personagem</span>
                    </label>

                    <label class="calc-select">
                        <span>Faixa de DP:</span>
                        <select id="calc-dp-faixa">
                            <option value="dima10">Diamante Top 10%</option>
                            <option value="dima30">Diamante Top 30%</option>
                            <option value="ouro">Ouro</option>
                        </select>
                    </label>
                </div>

                <div class="calc-section">
                    <h4>🏰 Reinos Paralelos </h4>
                    
                    <label class="calc-checkbox">
                        <input type="checkbox" id="calc-reinos" checked>
                        <span>Fazer Reinos</span>
                    </label>

                    <label class="calc-select">
                        <span>Dificuldade:</span>
                        <select id="calc-reinos-dif">
                            <option value="pesadeloMax">Pesadelo (máximo)</option>
                            <option value="pesadeloMin">Pesadelo (mínimo)</option>
                            <option value="semdoMax">Sem Dó (máximo)</option>
                            <option value="semdoMin">Sem Dó (mínimo)</option>
                        </select>
                    </label>
                </div>

                <div class="calc-section">
                    <h4>🎫 Passe de Batalha</h4>
                    <label class="calc-select">
                        <span>Tipo de Passe:</span>
                        <select id="calc-passe">
                            <option value="free">Grátis (F2P)</option>
                            <option value="premium">Premium</option>
                            <option value="premiumPlus">Premium+</option>
                        </select>
                    </label>
                </div>

                <div class="calc-section">
                    <h4>👥 Guilda</h4>
                    <label class="calc-checkbox">
                        <input type="checkbox" id="calc-guilda" checked>
                        <span>Guilda Ativa (raids + missões)</span>
                    </label>
                </div>
            </div>

            <button class="calc-btn" onclick="handleCalculateEarnings()">
                🧮 Calcular Ganhos
            </button>

            <div id="earnings-result" class="result-box hidden">
                <h4>💎 Resultado Estimado</h4>
                <div class="result-grid">
                    <div class="result-card coins">
                        <span class="result-label">Coins Mensais</span>
                        <span class="result-value" id="result-coins">-</span>
                        <span class="result-sub">≈ <span id="result-coins-week">-</span>/semana</span>
                    </div>
                    <div class="result-card teonita">
                        <span class="result-label">Teonita Mensal</span>
                        <span class="result-value" id="result-teonita">-</span>
                        <span class="result-sub">≈ <span id="result-teonita-week">-</span>/semana</span>
                    </div>
                </div>
                <div id="earnings-breakdown" class="breakdown-box"></div>
            </div>
        </div>
    `;
}

/**
 * Create costs calculator HTML
 * @returns {string} HTML string
 */
export function createCostsCalculator() {
    return `
        <div class="calculator-box costs-calc">
            <h3>📈 Custos de Evolução</h3>
            <p class="calc-subtitle">Calcule quanto custa evoluir golpes e astros convidados</p>

            <div class="calc-tabs">
                <button class="calc-tab-btn active" data-tab="golpes" onclick="switchCalcTab('golpes')">
                    ⚔️ Golpes
                </button>
                <button class="calc-tab-btn" data-tab="astros" onclick="switchCalcTab('astros')">
                    ⭐ Astros
                </button>
            </div>

            <!-- Golpes Tab -->
            <div class="calc-tab-content active" data-tab="golpes">
                <div class="calc-form">
                    <label class="calc-select">
                        <span>Nível Inicial:</span>
                        <select id="golpe-nivel-ini">
                            <option value="1">Nível 1</option>
                            <option value="5">Nível 5</option>
                            <option value="10">Nível 10</option>
                        </select>
                    </label>

                    <label class="calc-select">
                        <span>Nível Final:</span>
                        <select id="golpe-nivel-fim">
                            <option value="15" selected>Nível 15</option>
                            <option value="10">Nível 10</option>
                            <option value="5">Nível 5</option>
                        </select>
                    </label>

                    <label class="calc-select">
                        <span>Quantidade:</span>
                        <select id="golpe-qtd">
                            <option value="1">1 Golpe</option>
                            <option value="5" selected>5 Golpes (build completa)</option>
                        </select>
                    </label>

                    <label class="calc-checkbox">
                        <input type="checkbox" id="golpe-shiny">
                        <span>Golpe Shiny (50% de desconto)</span>
                    </label>
                </div>

                <button class="calc-btn" onclick="handleCalculateGolpes()">
                    🧮 Calcular Custo
                </button>

                <div id="golpes-result" class="result-box hidden">
                    <h4>💰 Custo Total</h4>
                    <div class="result-card coins single">
                        <span class="result-value" id="result-golpes">-</span>
                        <span class="result-label">coins</span>
                    </div>
                </div>
            </div>

            <!-- Astros Tab -->
            <div class="calc-tab-content" data-tab="astros">
                <div class="calc-form">
                    <label class="calc-select">
                        <span>Raridade do Astro:</span>
                        <select id="astro-raridade">
                            <option value="diamante">Diamante</option>
                            <option value="ouro" selected>Ouro</option>
                            <option value="prata">Prata</option>
                            <option value="bronze">Bronze</option>
                        </select>
                    </label>

                    <label class="calc-select">
                        <span>Quantidade:</span>
                        <select id="astro-qtd">
                            <option value="1" selected>1 Astro</option>
                            <option value="3">3 Astros</option>
                        </select>
                    </label>
                </div>

                <button class="calc-btn" onclick="handleCalculateAstros()">
                    🧮 Calcular Custo
                </button>

                <div id="astros-result" class="result-box hidden">
                    <h4>💰 Custo Total</h4>
                    <div class="result-grid">
                        <div class="result-card coins">
                            <span class="result-value" id="result-astros-gold">-</span>
                            <span class="result-label">coins</span>
                        </div>
                        <div class="result-card evo-powder">
                            <span class="result-value" id="result-astros-po">-</span>
                            <span class="result-label">pó de evolução</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create scenarios comparison HTML
 * @returns {string} HTML string
 */
export function createScenariosTable() {
    return `
        <div class="calculator-box scenarios-box">
            <h3>📋 Cenários de Referência</h3>
            <p class="calc-subtitle">Compare diferentes perfis de jogadores</p>
            <div id="scenarios-table" class="scenarios-grid">
                <!-- Populated by loadScenarios() -->
            </div>
        </div>
    `;
}

/**
 * Render scenarios from data
 */
export function renderScenarios() {
    const container = document.getElementById('scenarios-table');
    if (!container || !statsData?.cenarios?.presets) return;

    const presets = statsData.cenarios.presets;

    let html = '';
    for (const [key, preset] of Object.entries(presets)) {
        html += `
            <div class="scenario-card">
                <h4>${preset.nome}</h4>
                <p class="scenario-desc">${preset.descricao}</p>
                <div class="scenario-stats">
                    <div class="stat">
                        <span class="stat-value">${formatNumber(preset.mensal)}</span>
                        <span class="stat-label">coins/mês</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${formatNumber(preset.semanal)}</span>
                        <span class="stat-label">coins/semana</span>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

/**
 * Calculate monthly earnings based on inputs
 */
export function calculateEarnings() {
    if (!statsData) {
        console.error('Stats data not loaded');
        return;
    }

    const dpMensal = document.getElementById('calc-dp-mensal')?.checked;
    const dpPerso = document.getElementById('calc-dp-perso')?.checked;
    const dpFaixa = document.getElementById('calc-dp-faixa')?.value || 'dima10';
    const reinos = document.getElementById('calc-reinos')?.checked;
    const reinosDif = document.getElementById('calc-reinos-dif')?.value || 'pesadeloMax';
    const passe = document.getElementById('calc-passe')?.value || 'free';
    const guilda = document.getElementById('calc-guilda')?.checked;

    const cenarios = statsData.cenarios?.fontes || {};
    const teonitas = statsData.teonitas?.fontesMensais || {};

    let totalCoins = 0;
    let totalTeonita = 0;
    const breakdown = [];

    // Fixed monthly sources
    totalTeonita += teonitas.calendario?.valor || 0;
    breakdown.push({ nome: 'Calendário', teonita: teonitas.calendario?.valor || 0 });

    totalTeonita += teonitas.diarias?.valor || 0;
    breakdown.push({ nome: 'Missões Diárias', teonita: teonitas.diarias?.valor || 0 });

    // DP Mensal
    if (dpMensal) {
        totalCoins += cenarios.dpMensal?.mensal || 0;
        totalTeonita += teonitas.dpMensal?.valor || 0;
        breakdown.push({
            nome: 'DP Mensal',
            coins: cenarios.dpMensal?.mensal,
            teonita: teonitas.dpMensal?.valor
        });
    }

    // DP Personagem
    if (dpPerso) {
        const dpMap = {
            'dima10': { coins: 'dpPersonagemDima10', teonita: 'dpPersonagemDiamante' },
            'dima30': { coins: 'dpPersonagemDima30', teonita: 'dpPersonagemDiamante' },
            'ouro': { coins: 'dpPersonagemOuro', teonita: 'dpPersonagemOuro' }
        };
        const dp = dpMap[dpFaixa];
        totalCoins += cenarios[dp.coins]?.mensal || 0;
        totalTeonita += teonitas[dp.teonita]?.valor || 0;
        breakdown.push({
            nome: `DP Personagem (${dpFaixa === 'ouro' ? 'Ouro' : dpFaixa === 'dima10' ? 'Dima 10%' : 'Dima 30%'})`,
            coins: cenarios[dp.coins]?.mensal,
            teonita: teonitas[dp.teonita]?.valor
        });
    }

    // Reinos
    if (reinos) {
        const reinosMap = {
            'pesadeloMax': 'reinosPesadeloMax',
            'pesadeloMin': 'reinosPesadeloMin',
            'semdoMax': 'reinosSemDoMax',
            'semdoMin': 'reinosSemDoMin'
        };
        totalCoins += cenarios[reinosMap[reinosDif]]?.mensal || 0;
        breakdown.push({
            nome: `Reinos (${reinosDif.includes('pesadelo') ? 'Pesadelo' : 'Sem Dó'})`,
            coins: cenarios[reinosMap[reinosDif]]?.mensal
        });
    }

    // Passe
    const passeMap = { 'free': 'passeFree', 'premium': 'passePremium', 'premiumPlus': 'passePremiumPlus' };
    totalTeonita += teonitas[passeMap[passe]]?.valor || 0;
    breakdown.push({
        nome: `Passe (${passe === 'free' ? 'Grátis' : passe === 'premium' ? 'Premium' : 'Premium+'})`,
        teonita: teonitas[passeMap[passe]]?.valor
    });

    // Guilda
    if (guilda) {
        totalTeonita += teonitas.guilda?.valor || 0;
        breakdown.push({ nome: 'Guilda', teonita: teonitas.guilda?.valor });
    }

    // Update UI
    const resultBox = document.getElementById('earnings-result');
    if (resultBox) resultBox.classList.remove('hidden');

    document.getElementById('result-coins').textContent = formatNumber(totalCoins);
    document.getElementById('result-coins-week').textContent = formatNumber(Math.round(totalCoins / 4));
    document.getElementById('result-teonita').textContent = formatNumber(totalTeonita);
    document.getElementById('result-teonita-week').textContent = formatNumber(Math.round(totalTeonita / 4));

    // Render breakdown
    const breakdownBox = document.getElementById('earnings-breakdown');
    if (breakdownBox) {
        breakdownBox.innerHTML = `
            <h5>📊 Detalhamento</h5>
            <ul>
                ${breakdown.map(item => `
                    <li>
                        <span>${item.nome}</span>
                        <span>
                            ${item.coins ? formatNumber(item.coins) + ' coins' : ''}
                            ${item.coins && item.teonita ? ' + ' : ''}
                            ${item.teonita ? formatNumber(item.teonita) + ' teonita' : ''}
                        </span>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

/**
 * Calculate move evolution costs
 */
export function calculateGolpes() {
    if (!statsData?.golpes) {
        console.error('Golpes data not loaded');
        return;
    }

    const nivelIni = parseInt(document.getElementById('golpe-nivel-ini')?.value || '1');
    const nivelFim = parseInt(document.getElementById('golpe-nivel-fim')?.value || '15');
    const qtd = parseInt(document.getElementById('golpe-qtd')?.value || '1');
    const shiny = document.getElementById('golpe-shiny')?.checked;

    const custoPorNivel = statsData.golpes.custoPorNivel;

    // Calculate cost from nivelIni to nivelFim
    let custo = 0;
    for (let i = nivelIni + 1; i <= nivelFim; i++) {
        custo += custoPorNivel[String(i)] || 0;
    }

    // Apply multipliers
    custo *= qtd;
    if (shiny) custo = Math.floor(custo / 2);

    // Update UI
    const resultBox = document.getElementById('golpes-result');
    if (resultBox) resultBox.classList.remove('hidden');

    document.getElementById('result-golpes').textContent = formatNumber(custo);
}

/**
 * Calculate guest star evolution costs
 */
export function calculateAstros() {
    if (!statsData?.astros) {
        console.error('Astros data not loaded');
        return;
    }

    const raridade = document.getElementById('astro-raridade')?.value || 'ouro';
    const qtd = parseInt(document.getElementById('astro-qtd')?.value || '1');

    const totalPorRaridade = statsData.astros.totalPorRaridade;
    const data = totalPorRaridade[raridade];

    if (!data) {
        console.error('Invalid raridade:', raridade);
        return;
    }

    const gold = data.gold * qtd;
    const po = data.po * qtd;

    // Update UI
    const resultBox = document.getElementById('astros-result');
    if (resultBox) resultBox.classList.remove('hidden');

    document.getElementById('result-astros-gold').textContent = formatNumber(gold);
    document.getElementById('result-astros-po').textContent = formatNumber(po);
}

/**
 * Switch calculator tabs
 */
export function switchCalcTab(tab) {
    document.querySelectorAll('.calc-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.calc-tab-content').forEach(content => {
        content.classList.toggle('active', content.dataset.tab === tab);
    });
}

// Global handlers
export function handleCalculateEarnings() {
    calculateEarnings();
}

export function handleCalculateCosts() {
    // Legacy handler - now split into golpes and astros
    calculateGolpes();
}

export function handleCalculateGolpes() {
    calculateGolpes();
}

export function handleCalculateAstros() {
    calculateAstros();
}
