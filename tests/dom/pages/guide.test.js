import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setLanguage } from '../../../src/i18n/translations.js';
import { loadCatalysts } from '../../../src/services/dataService.js';

// Mock heavy dependencies

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
    setLanguage('pt-BR');
    document.body.innerHTML = '';
  });

  afterEach(() => setLanguage('pt-BR'));

  it('switches modifier labels, descriptions and controls together while retaining the selected tab', async () => {
    const { renderGameInfo, init } = await import('../../../src/pages/guide.js');
    setLanguage('en');
    document.body.innerHTML = renderGameInfo();
    await init();
    window.switchGuideTab('modifiers');
    expect(document.querySelector('#tab-modifiers h2').textContent).toBe('Modifiers');
    expect(document.querySelector('#guide-modifier-search').placeholder).toBe('Search modifiers or effects...');
    expect(document.querySelector('#buffs-list').textContent).toContain('Armor');
    expect(document.querySelector('#buffs-list').textContent).not.toContain('Armadura');

    setLanguage('pt-BR');
    document.body.innerHTML = renderGameInfo();
    await init();
    expect(document.querySelector('.guide-tab-content.active').id).toBe('tab-modifiers');
    expect(document.querySelector('#tab-modifiers h2').textContent).toBe('Modificadores');
    expect(document.querySelector('#buffs-list').textContent).toContain('Armadura');
    expect(document.querySelector('#guide-modifier-search').placeholder).toBe('Buscar modificador ou efeito...');
  });

  it('ignores an earlier catalyst request after the language and page have changed', async () => {
    const { renderGameInfo, init } = await import('../../../src/pages/guide.js');
    let finishPortuguese;
    loadCatalysts.mockImplementationOnce(() => new Promise(resolve => { finishPortuguese = resolve; }));
    document.body.innerHTML = renderGameInfo();
    const firstRender = init();
    setLanguage('en');
    document.body.innerHTML = renderGameInfo();
    await init();
    finishPortuguese({ categories: [{ category: 'Forte', items: [{ name: 'Catalisador antigo', description: 'Português' }] }] });
    await firstRender;
    expect(document.querySelector('#catalyst-container').textContent).toContain('Error loading catalysts.');
    expect(document.querySelector('#catalyst-container').textContent).not.toContain('Catalisador antigo');
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
      const { renderGameInfo: render } = await import('../../../src/pages/guide.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the guide container', () => {
      const container = document.querySelector('.guide-container');
      expect(container).not.toBeNull();
    });

    it('should render 3 tab buttons', () => {
      const tabs = document.querySelectorAll('[onclick^="switchGuideTab("]');
      expect(tabs.length).toBe(3);
    });

    it('should open the statistics tab by default', () => {
      const button = document.querySelector('.guide-tab-btn.active[onclick^="switchGuideTab("]');
      const tab = document.querySelector('#tab-statistics');
      expect(button.getAttribute('onclick')).toContain("'statistics'");
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

    it('should render the catalysts tab with search and catalog category filters', () => {
      const tab = document.querySelector('#tab-catalysts');
      expect(tab).not.toBeNull();

      expect(tab.querySelector('#guide-catalyst-search')).not.toBeNull();
      expect(tab.querySelector('#guide-catalyst-filters')).not.toBeNull();
      expect(tab.querySelector('#catalyst-container')).not.toBeNull();
    });

    it('should not expose the Renda Passiva tutorial in the guide', () => {
      expect(document.querySelector('#tab-tutorials')).toBeNull();
      expect(document.querySelector('.tutorial-card')).toBeNull();
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
    it('keeps original game explanations collapsed behind an accessible disclosure', async () => {
      const { renderGameInfo, init } = await import('../../../src/pages/guide.js');
      document.body.innerHTML = renderGameInfo();
      await init();
      const armor = [...document.querySelectorAll('#buffs-list .guide-modifier-card')]
        .find(card => card.querySelector('h4').textContent === 'Armadura');
      const disclosure = armor.querySelector('.guide-modifier-disclosure');
      expect(armor.querySelector('.guide-modifier-stacks').textContent).toContain('5x');
      const gameDescription = armor.querySelector('.guide-modifier-game-description');
      expect(gameDescription.textContent).toContain('Reduz o dano sofrido em 20%.');
      expect(gameDescription.closest('details')).toBeNull();
      expect(disclosure.open).toBe(false);
      expect(disclosure.textContent).toContain('Reduz dano em 20%. Removido por Quebra de Armadura.');
      expect(disclosure.querySelectorAll('h5')).toHaveLength(0);
      expect(disclosure.querySelector('summary').textContent).toContain('Explicação');
      expect(disclosure.textContent).not.toContain('Reduz o dano sofrido em 20%.');
      disclosure.querySelector('summary').click();
      expect(disclosure.open).toBe(true);
      expect(disclosure.querySelector('.guide-modifier-chevron').getAttribute('aria-hidden')).toBe('true');
    });
    it('should register switchGuideTab on window', async () => {
      document.body.innerHTML = '<div class="guide-tab-btn active" onclick="switchGuideTab(\'statistics\')"></div><div class="guide-tab-content active" id="tab-statistics"></div>';
      const { init } = await import('../../../src/pages/guide.js');
      await init();
      expect(window.switchGuideTab).toBeDefined();
      expect(typeof window.switchGuideTab).toBe('function');
    });

    it('switchGuideTab should activate the correct tab', async () => {
      const { renderGameInfo: render, init } = await import('../../../src/pages/guide.js');
      document.body.innerHTML = render();
      await init();

      const wikiSectionTab = document.querySelector('.guide-tabs [aria-current="page"]');
      expect(wikiSectionTab.classList.contains('active')).toBe(true);

      window.switchGuideTab('modifiers');

      expect(wikiSectionTab.classList.contains('active')).toBe(true);

      const statsTab = document.querySelector('#tab-statistics');
      expect(statsTab.classList.contains('active')).toBe(false);

      const modifiersTab = document.querySelector('#tab-modifiers');
      expect(modifiersTab.classList.contains('active')).toBe(true);
    });
  });
});
