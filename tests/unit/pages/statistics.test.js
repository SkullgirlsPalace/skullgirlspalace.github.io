import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Calculator component
vi.mock('../../../src/components/Calculator.js', () => ({
    createCalculator: vi.fn(() => '<div class="calculator">Calculator UI</div>'),
    initCalculator: vi.fn(),
    initToggleButtons: vi.fn(),
    handleCalculateEarnings: vi.fn(),
    handleCalculateBuildCost: vi.fn(),
    switchCalcTab: vi.fn(),
    updateDiamanteSlider: vi.fn(),
    updateGolpeSlider: vi.fn(),
    updateGolpeInicialSlider: vi.fn(),
    updateAstroSlider: vi.fn()
}));

// Mock dataService
vi.mock('../../../src/services/dataService.js', () => ({
    loadStatistics: vi.fn(() => Promise.resolve({ earnings: [] }))
}));

import { render, init } from '../../../src/pages/statistics.js';

describe('statistics.js', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset window object
        delete window.handleCalculateEarnings;
        delete window.handleCalculateBuildCost;
        delete window.switchCalcTab;
        delete window.updateDiamanteSlider;
        delete window.updateGolpeSlider;
        delete window.updateGolpeInicialSlider;
        delete window.updateAstroSlider;
    });

    describe('render', () => {
        it('should return HTML string', () => {
            const html = render();
            expect(html).toContain('section');
            expect(html).toContain('statistics-section');
        });

        it('should include calculator title', () => {
            const html = render();
            expect(html).toContain('Calculadora');
        });

        it('should include back button', () => {
            const html = render();
            expect(html).toContain('btn-back');
            expect(html).toContain('navigateTo');
        });

        it('should include calculator container', () => {
            const html = render();
            expect(html).toContain('calculators-container');
        });

        it('should include intro card', () => {
            const html = render();
            expect(html).toContain('intro-card');
            expect(html).toContain('stats-intro');
        });

        it('should call createCalculator', async () => {
            const { createCalculator } = await import('../../../src/components/Calculator.js');
            render();
            expect(createCalculator).toHaveBeenCalled();
        });
    });

    describe('init', () => {
        it('should call loadStatistics', async () => {
            const { loadStatistics } = await import('../../../src/services/dataService.js');
            await init();
            expect(loadStatistics).toHaveBeenCalled();
        });

        it('should initialize calculator when data loads', async () => {
            const { initCalculator, initToggleButtons, handleCalculateEarnings } = await import('../../../src/components/Calculator.js');
            await init();
            expect(initCalculator).toHaveBeenCalled();
            expect(initToggleButtons).toHaveBeenCalled();
            expect(handleCalculateEarnings).toHaveBeenCalled();
        });

        it('should register global handlers', async () => {
            await init();
            expect(window.handleCalculateEarnings).toBeDefined();
            expect(window.handleCalculateBuildCost).toBeDefined();
            expect(window.switchCalcTab).toBeDefined();
            expect(window.updateDiamanteSlider).toBeDefined();
            expect(window.updateGolpeSlider).toBeDefined();
            expect(window.updateGolpeInicialSlider).toBeDefined();
            expect(window.updateAstroSlider).toBeDefined();
        });

        it('should handle null stats data gracefully', async () => {
            const { loadStatistics } = await import('../../../src/services/dataService.js');
            loadStatistics.mockResolvedValueOnce(null);

            const { initCalculator } = await import('../../../src/components/Calculator.js');
            initCalculator.mockClear();

            await init();
            // Should not throw, but also should not init calculator
            expect(initCalculator).not.toHaveBeenCalled();
        });
    });
});
