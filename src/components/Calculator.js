// =====================================================
// CALCULATOR COMPONENT
// Simulators for earnings and evolution costs
// =====================================================

import { formatNumber } from '../utils/formatters.js';

/**
 * Create earnings calculator HTML
 * @returns {string} HTML string
 */
export function createEarningsCalculator() {
    return `
        <div class="calculator-box">
            <h3>💰 Simulador de Ganhos Mensais</h3>

            <label>
                <input type="checkbox" id="calc-pf" checked>
                Disputas Premiadas (Prize Fights)
            </label>

            <label>
                <input type="checkbox" id="calc-rift" checked>
                Reinos (Rifts)
            </label>

            <label>
                Faixa de DP:
                <select id="calc-dp">
                    <option value="dima-10">Diamante Top 10%</option>
                    <option value="dima-30">Diamante Top 30%</option>
                    <option value="ouro">Ouro</option>
                </select>
            </label>

            <label>
                Faixa de Fenda:
                <select id="calc-rift-tier">
                    <option value="pesadelo">Pesadelo</option>
                    <option value="sem-do">Sem Dó</option>
                    <option value="mestre">Mestre</option>
                </select>
            </label>

            <label>
                Passe de Batalha:
                <select id="calc-pass">
                    <option value="free">Grátis</option>
                    <option value="premium">Premium</option>
                    <option value="premium_plus">Premium+</option>
                </select>
            </label>

            <label>
                Guilda:
                <select id="calc-guild">
                    <option value="none">Nenhuma / Casual</option>
                    <option value="top100">Top 100</option>
                </select>
            </label>

            <button onclick="handleCalculateEarnings()">Calcular Ganhos</button>

            <div id="earnings-result" class="result-box">
                <h4>Resultado Estimado</h4>
                <p><span>Teonita Mensal:</span> <span class="value" id="result-teonita">-</span></p>
                <p><span>Teonita Semanal:</span> <span class="value" id="result-teonita-week">-</span></p>
                <p><span>Canopy Coins:</span> <span class="value" id="result-coins">-</span></p>
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
        <div class="calculator-box">
            <h3>📈 Custos de Evolução</h3>

            <label>
                Evoluir Blockbuster:
                <select id="bb-level">
                    <option value="1-15">Nível 1 → 15 (Completo)</option>
                    <option value="1-10">Nível 1 → 10</option>
                    <option value="10-15">Nível 10 → 15</option>
                </select>
            </label>

            <label>
                Evolução de Raridade:
                <select id="rarity-evo">
                    <option value="gold-dia">Ouro → Diamante</option>
                    <option value="silver-gold">Prata → Ouro</option>
                    <option value="bronze-silver">Bronze → Prata</option>
                </select>
            </label>

            <label>
                Loadout Completa:
                <select id="loadout-type">
                    <option value="5-moves">5 Golpes (Nível 15)</option>
                    <option value="5-moves-10">5 Golpes (Nível 10)</option>
                </select>
            </label>

            <button onclick="handleCalculateCosts()">Ver Custos</button>

            <div id="costs-result" class="result-box">
                <h4>Custos Estimados</h4>
                <p><span>Blockbuster:</span> <span class="value" id="cost-bb">-</span></p>
                <p><span>Evolução Raridade:</span> <span class="value" id="cost-evo">-</span></p>
                <p><span>Loadout:</span> <span class="value" id="cost-loadout">-</span></p>
            </div>
        </div>
    `;
}

/**
 * Create scenarios table HTML
 * @returns {string} HTML string
 */
export function createScenariosTable() {
    return `
        <div class="calculator-box" style="margin-top: 24px;">
            <h3>📋 Cenários de Referência</h3>
            <div id="scenarios-table">
                <!-- Populated by statistics data -->
            </div>
        </div>
    `;
}

/**
 * Calculate monthly earnings based on inputs
 */
export function calculateEarnings() {
    const pfEnabled = document.getElementById('calc-pf')?.checked || false;
    const riftEnabled = document.getElementById('calc-rift')?.checked || false;
    const dpTier = document.getElementById('calc-dp')?.value || 'dima-10';
    const riftTier = document.getElementById('calc-rift-tier')?.value || 'pesadelo';
    const passType = document.getElementById('calc-pass')?.value || 'free';
    const guildType = document.getElementById('calc-guild')?.value || 'none';

    // Base values (estimated)
    const dpRewards = {
        'dima-10': { teonita: 2500, coins: 500000 },
        'dima-30': { teonita: 1800, coins: 350000 },
        'ouro': { teonita: 1000, coins: 200000 }
    };

    const riftRewards = {
        'pesadelo': { teonita: 3000, coins: 100000 },
        'sem-do': { teonita: 2000, coins: 75000 },
        'mestre': { teonita: 1200, coins: 50000 }
    };

    const passRewards = {
        'free': { teonita: 500, coins: 100000 },
        'premium': { teonita: 2000, coins: 300000 },
        'premium_plus': { teonita: 4000, coins: 600000 }
    };

    const guildRewards = {
        'none': { teonita: 0, coins: 0 },
        'top100': { teonita: 1500, coins: 200000 }
    };

    let totalTeonita = 0;
    let totalCoins = 0;

    // Weekly rewards (multiply by 4 for monthly)
    if (pfEnabled) {
        totalTeonita += dpRewards[dpTier].teonita * 4;
        totalCoins += dpRewards[dpTier].coins * 4;
    }

    if (riftEnabled) {
        totalTeonita += riftRewards[riftTier].teonita * 4;
        totalCoins += riftRewards[riftTier].coins * 4;
    }

    // Monthly rewards
    totalTeonita += passRewards[passType].teonita;
    totalCoins += passRewards[passType].coins;
    totalTeonita += guildRewards[guildType].teonita;
    totalCoins += guildRewards[guildType].coins;

    // Update UI
    document.getElementById('result-teonita').textContent = formatNumber(totalTeonita);
    document.getElementById('result-teonita-week').textContent = formatNumber(Math.round(totalTeonita / 4));
    document.getElementById('result-coins').textContent = formatNumber(totalCoins);
}

/**
 * Calculate evolution costs based on inputs
 */
export function calculateCosts() {
    const bbLevel = document.getElementById('bb-level')?.value || '1-15';
    const rarityEvo = document.getElementById('rarity-evo')?.value || 'gold-dia';
    const loadoutType = document.getElementById('loadout-type')?.value || '5-moves';

    const bbCosts = {
        '1-15': 125000,
        '1-10': 45000,
        '10-15': 80000
    };

    const evoCosts = {
        'gold-dia': 'Essências + 100.000 Coins',
        'silver-gold': 'Essências + 50.000 Coins',
        'bronze-silver': 'Essências + 25.000 Coins'
    };

    const loadoutCosts = {
        '5-moves': 625000,
        '5-moves-10': 225000
    };

    document.getElementById('cost-bb').textContent = formatNumber(bbCosts[bbLevel]) + ' Coins';
    document.getElementById('cost-evo').textContent = evoCosts[rarityEvo];
    document.getElementById('cost-loadout').textContent = formatNumber(loadoutCosts[loadoutType]) + ' Coins';
}

// Global handlers
export function handleCalculateEarnings() {
    calculateEarnings();
}

export function handleCalculateCosts() {
    calculateCosts();
}
