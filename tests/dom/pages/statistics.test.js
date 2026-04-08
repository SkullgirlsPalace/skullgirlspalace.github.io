import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Calculator dependency (huge component)
vi.mock('../../../src/components/Calculator.js', () => ({
  createCalculator: vi.fn(() => '<div class="calculator-mock" id="calculator-mock"><div class="calc-tabs"><button class="calc-tab-btn active" data-tab="earnings">Ganhos</button></div></div>'),
  initCalculator: vi.fn(),
  initToggleButtons: vi.fn(),
  handleCalculateEarnings: vi.fn(),
  handleCalculateBuildCost: vi.fn(),
  switchCalcTab: vi.fn(),
  updateDiamanteSlider: vi.fn(),
  updateGolpeSlider: vi.fn(),
  updateGolpeInicialSlider: vi.fn(),
  updateAstroSlider: vi.fn(),
}));

vi.mock('../../../src/services/dataService.js', () => ({
  loadStatistics: vi.fn(() => Promise.resolve({ golpes: [], astros: [] })),
}));

describe('statistics.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/statistics.js');
    expect(module).toBeDefined();
  });

  it('should export render and init functions', async () => {
    const module = await import('../../../src/pages/statistics.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
  });

  describe('render() DOM structure', () => {
    let html;

    beforeEach(async () => {
      const { render } = await import('../../../src/pages/statistics.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the statistics section', () => {
      const section = document.querySelector('#statistics');
      expect(section).not.toBeNull();
      expect(section.classList.contains('statistics-section')).toBe(true);
    });

    it('should render the h2 "Calculadora" title', () => {
      const h2 = document.querySelector('.section-header h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent.trim()).toBe('Calculadora');
    });

    it('should render the back button', () => {
      const backBtn = document.querySelector('.btn-back');
      expect(backBtn).not.toBeNull();
    });

    it('should render the calculators container', () => {
      const container = document.querySelector('.calculators-container');
      expect(container).not.toBeNull();
    });

    it('should render the stats intro card with h3', () => {
      const introCard = document.querySelector('.stats-intro .intro-card');
      expect(introCard).not.toBeNull();
      const h3 = introCard.querySelector('h3');
      expect(h3).not.toBeNull();
    });

    it('should render the calculator inside the container', () => {
      const calculator = document.querySelector('.calculators-container .calculator-mock');
      expect(calculator).not.toBeNull();
    });
  });

  describe('init() global handlers', () => {
    it('should register window.handleCalculateEarnings', async () => {
      const { init } = await import('../../../src/pages/statistics.js');
      await init();
      expect(window.handleCalculateEarnings).toBeDefined();
    });

    it('should register window.switchCalcTab', async () => {
      const { init } = await import('../../../src/pages/statistics.js');
      await init();
      expect(window.switchCalcTab).toBeDefined();
    });
  });
});
