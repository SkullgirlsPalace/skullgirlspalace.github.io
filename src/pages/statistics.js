// =====================================================
// STATISTICS PAGE
// Earnings calculator and game statistics
// =====================================================

import { createEarningsCalculator, createCostsCalculator, createScenariosTable } from '../components/Calculator.js';
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
                <h2>Estatísticas</h2>
            </div>

            <div class="stats-intro">
                <p>Use os simuladores abaixo para calcular seus ganhos mensais estimados e custos de evolução no Skullgirls Mobile.</p>
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
    // Load statistics data for scenarios table
    const statsData = await loadStatistics();

    const scenariosContainer = document.getElementById('scenarios-table');
    if (scenariosContainer && statsData) {
        renderScenariosTable(scenariosContainer, statsData);
    }
}

/**
 * Render scenarios reference table
 * @param {HTMLElement} container - Container element
 * @param {Object} statsData - Statistics data
 */
function renderScenariosTable(container, statsData) {
    if (!statsData.scenarios || !Array.isArray(statsData.scenarios)) {
        container.innerHTML = '<p class="info-state">Dados de cenários não disponíveis.</p>';
        return;
    }

    const rows = statsData.scenarios.map(scenario => `
        <tr>
            <td>${scenario.name || '-'}</td>
            <td>${scenario.monthlyTheonite || '-'}</td>
            <td>${scenario.monthlyCoins || '-'}</td>
            <td>${scenario.notes || '-'}</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <table class="scenarios-table">
            <thead>
                <tr>
                    <th>Cenário</th>
                    <th>Teonita/Mês</th>
                    <th>Coins/Mês</th>
                    <th>Notas</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}
