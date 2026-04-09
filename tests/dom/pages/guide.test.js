import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock heavy dependencies
vi.mock('../../../src/components/ExportModifierData.js', () => ({
  renderModifierExportModal: vi.fn(() => '<div class="modifier-export-modal-mock"></div>'),
  initModifierExportModal: vi.fn(),
}));

vi.mock('../../../src/services/dataService.js', () => ({
  loadCatalysts: vi.fn(() => Promise.resolve(null)),
  loadFendaData: vi.fn(() => Promise.resolve(null)),
}));

vi.mock('../../../src/utils/formatters.js', () => ({
  formatConstraint: vi.fn(v => v),
}));

describe('guide.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/guide.js');
    expect(module).toBeDefined();
  });

  it('should export render and init functions', async () => {
    const module = await import('../../../src/pages/guide.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
  });

  describe('render() DOM structure', () => {
    let html;

    beforeEach(async () => {
      const { render } = await import('../../../src/pages/guide.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the guide container', () => {
      const container = document.querySelector('.guide-container');
      expect(container).not.toBeNull();
    });

    it('should render 4 tab buttons', () => {
      const tabs = document.querySelectorAll('.guide-tab-btn');
      expect(tabs.length).toBe(4);
    });

    it('should have tutorials tab button active by default', () => {
      const tutorialsBtn = document.querySelector('.guide-tab-btn.active');
      expect(tutorialsBtn).not.toBeNull();
      expect(tutorialsBtn.textContent).toContain('Tutoriais');
    });

    it('should render the tutorials tab content', () => {
      const tab = document.querySelector('#tab-tutorials');
      expect(tab).not.toBeNull();
      expect(tab.classList.contains('active')).toBe(true);
    });

    it('should render the statistics tab content', () => {
      const tab = document.querySelector('#tab-statistics');
      expect(tab).not.toBeNull();
    });

    it('should render the modifiers tab with buffs and debuffs tables', () => {
      const tab = document.querySelector('#tab-modifiers');
      expect(tab).not.toBeNull();

      // Buffs table must exist
      const buffsList = document.querySelector('#buffs-list');
      expect(buffsList).not.toBeNull();

      // Debuffs table must exist
      const debuffsList = document.querySelector('#debuffs-list');
      expect(debuffsList).not.toBeNull();

      // Special effects table must exist
      const specialList = document.querySelector('#special-list');
      expect(specialList).not.toBeNull();
    });

    it('should render the catalysts tab with element filter buttons', () => {
      const tab = document.querySelector('#tab-catalysts');
      expect(tab).not.toBeNull();

      const filterBtns = tab.querySelectorAll('.cotw-filter-btn');
      expect(filterBtns.length).toBe(5); // water, fire, wind, light, dark

      const elements = Array.from(filterBtns).map(b => b.dataset.element);
      expect(elements).toContain('water');
      expect(elements).toContain('fire');
      expect(elements).toContain('wind');
      expect(elements).toContain('light');
      expect(elements).toContain('dark');
    });

    it('should render the tutorial card for Renda Passiva', () => {
      const tutorialsTab = document.querySelector('#tab-tutorials');
      const card = tutorialsTab.querySelector('.tutorial-card');
      expect(card).not.toBeNull();
      expect(card.textContent).toContain('Renda Passiva');
    });

    it('should render the stats image section', () => {
      const statsImageWrapper = document.querySelector('#statsImageWrapper');
      expect(statsImageWrapper).not.toBeNull();
      const img = statsImageWrapper.querySelector('img');
      expect(img).not.toBeNull();
    });

    it('should render the glossary grid with attribute cards', () => {
      const glossaryGrid = document.querySelector('.glossary-grid');
      expect(glossaryGrid).not.toBeNull();
      const cards = glossaryGrid.querySelectorAll('.attribute-card');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('init() tab switching', () => {
    it('should register switchGuideTab on window', async () => {
      document.body.innerHTML = '<div class="guide-tab-btn active" onclick="switchGuideTab(\'tutorials\')"></div><div class="guide-tab-content active" id="tab-tutorials"></div>';
      const { init } = await import('../../../src/pages/guide.js');
      await init();
      expect(window.switchGuideTab).toBeDefined();
      expect(typeof window.switchGuideTab).toBe('function');
    });

    it('switchGuideTab should activate the correct tab', async () => {
      const { render, init } = await import('../../../src/pages/guide.js');
      document.body.innerHTML = render();
      await init();

      window.switchGuideTab('statistics');

      const statsTab = document.querySelector('#tab-statistics');
      expect(statsTab.classList.contains('active')).toBe(true);

      const tutorialsTab = document.querySelector('#tab-tutorials');
      expect(tutorialsTab.classList.contains('active')).toBe(false);
    });
  });
});
