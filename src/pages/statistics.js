// =====================================================
// STATISTICS PAGE
// Earnings calculator and game statistics
// =====================================================

import {
    createCalculator,
    initCalculator,
    initToggleButtons,
    handleCalculateEarnings,
    handleCalculateBuildCost,
    switchCalcTab,
    updateDiamanteSlider,
    updateGolpeSlider,
    updateGolpeInicialSlider,
    updateAstroSlider
} from '../components/Calculator.js';
import { loadStatistics } from '../services/dataService.js';
import { t } from '../i18n/i18n.js';

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
                <h2>${t('stats.title')}</h2>
            </div>

            <div class="stats-intro">
                <div class="intro-card">
                    <h3>${t('stats.welcome')}</h3>
                    <p>${t('stats.intro')}</p>
                </div>
            </div>

            <div class="calculators-container">
                ${createCalculator()}
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

        // Initialize toggle button listeners (with real-time calculation)
        initToggleButtons();

        // Auto-calculate earnings on page load
        handleCalculateEarnings();
    }

    // Register global handlers
    window.handleCalculateEarnings = handleCalculateEarnings;
    window.handleCalculateBuildCost = handleCalculateBuildCost;
    window.switchCalcTab = switchCalcTab;
    window.updateDiamanteSlider = updateDiamanteSlider;
    window.updateGolpeSlider = updateGolpeSlider;
    window.updateGolpeInicialSlider = updateGolpeInicialSlider;
    window.updateAstroSlider = updateAstroSlider;
}
