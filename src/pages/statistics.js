// =====================================================
// STATISTICS PAGE
// Earnings calculator and game statistics
// =====================================================

import {
    createEarningsCalculator,
    createCostsCalculator,
    createScenariosTable,
    initCalculator,
    renderScenarios,
    handleCalculateEarnings,
    handleCalculateGolpes,
    handleCalculateAstros,
    switchCalcTab
} from '../components/Calculator.js';
import { loadStatistics } from '../services/dataService.js';

/**
 * Render statistics page
 * @returns {string} HTML string
 */
export function render() {
    return `
        <section class="section statistics-section" id="statistics">
            <div class="section-header">
                <button class="btn-back" onclick="navigateTo('')">
                    ←
                </button>
                <h2>📊 Estatísticas</h2>
            </div>

            <div class="stats-intro">
                <div class="intro-card">
                    <h3>🎮 Bem-vindo ao Simulador</h3>
                    <p>Calcule seus ganhos mensais estimados e custos de evolução no Skullgirls Mobile. 
                    Configure seu perfil de jogador para obter resultados personalizados.</p>
                </div>
            </div>

            <div class="calculators-container">
                <div class="calc-column">
                    ${createEarningsCalculator()}
                </div>
                <div class="calc-column">
                    ${createCostsCalculator()}
                </div>
            </div>

            <div class="scenarios-section" id="scenarios-section">
                ${createScenariosTable()}
            </div>
        </section>
    `;
}

/**
 * Initialize statistics page
 */
export async function init() {
    // Load statistics data
    const statsData = await loadStatistics();

    if (statsData) {
        // Initialize calculator with data
        initCalculator(statsData);

        // Render scenarios comparison table
        renderScenarios();
    }

    // Register global handlers
    window.handleCalculateEarnings = handleCalculateEarnings;
    window.handleCalculateGolpes = handleCalculateGolpes;
    window.handleCalculateAstros = handleCalculateAstros;
    window.switchCalcTab = switchCalcTab;
}
