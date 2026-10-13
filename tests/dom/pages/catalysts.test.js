import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('../../../src/services/dataService.js', () => ({
  loadCatalysts: vi.fn(() => Promise.resolve({
    categories: [
      {
        category: 'Forte',
        items: [
          { name: 'Catalyst A', description: 'Desc A', constraint: '1v1', element: 'fire' },
          { name: 'Catalyst B', description: 'Desc B', element: 'water' },
        ]
      },
      {
        category: 'Bom',
        items: [
          { name: 'Catalyst C', description: 'Desc C', element: 'wind' },
        ]
      }
    ]
  })),
}));

vi.mock('../../../src/state/store.js', () => ({
  getState: vi.fn(() => ({ userPreferences: { catalystNotes: {} } })),
  updateCatalystNote: vi.fn(),
}));

describe('catalysts.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/catalysts.js');
    expect(module).toBeDefined();
  });

  it('should export render and init functions', async () => {
    const module = await import('../../../src/pages/catalysts.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
  });

  describe('render() DOM structure', () => {
    let html;

    beforeEach(async () => {
      const { render } = await import('../../../src/pages/catalysts.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the catalysts section', () => {
      const section = document.querySelector('#catalysts');
      expect(section).not.toBeNull();
      expect(section.classList.contains('catalysts-section')).toBe(true);
    });

    it('should render the section header with h2 "Catalisadores"', () => {
      const h2 = document.querySelector('.section-header h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent.trim()).toBe('Catalisadores');
    });

    it('does not mix weekly rotation filters into the standalone catalyst catalog', () => {
      const filterBtns = document.querySelectorAll('.cotw-filter-btn');
      expect(filterBtns.length).toBe(0);
    });

    it('renders the catalog names and restrictions from its data', async () => {
      const { init } = await import('../../../src/pages/catalysts.js');
      await init();
      const names = [...document.querySelectorAll('.catalyst-card h4')].map(node => node.textContent);
      expect(names).toEqual(['Catalyst A', 'Catalyst B', 'Catalyst C']);
      expect(document.querySelector('.catalyst-constraint').textContent).toBe('1v1');
    });

    it('should render the catalyst loading container', () => {
      const container = document.querySelector('#catalyst-container');
      expect(container).not.toBeNull();
      // Should show loading state initially
      expect(container.querySelector('.loading-state')).not.toBeNull();
    });

    it('places the catalog beneath its explanation', () => {
      const intro = document.querySelector('.catalysts-intro');
      expect(intro.nextElementSibling.id).toBe('catalyst-container');
    });

    it('should render the back button', () => {
      const backBtn = document.querySelector('.btn-back');
      expect(backBtn).not.toBeNull();
    });

    it('should render the intro paragraph', () => {
      const intro = document.querySelector('.catalysts-intro p');
      expect(intro).not.toBeNull();
      expect(intro.textContent.length).toBeGreaterThan(10);
    });
  });

  describe('init() data rendering', () => {
    it('should populate the catalyst container after init', async () => {
      const { render, init } = await import('../../../src/pages/catalysts.js');
      document.body.innerHTML = render();
      await init();

      const container = document.querySelector('#catalyst-container');
      expect(container).not.toBeNull();
      // Loading state should have been replaced
      expect(container.querySelector('.loading-state')).toBeNull();
    });

    it('should render catalyst categories after init', async () => {
      const { render, init } = await import('../../../src/pages/catalysts.js');
      document.body.innerHTML = render();
      await init();

      const categories = document.querySelectorAll('.catalyst-category');
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should render catalyst cards after init', async () => {
      const { render, init } = await import('../../../src/pages/catalysts.js');
      document.body.innerHTML = render();
      await init();

      const cards = document.querySelectorAll('.catalyst-card');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should render catalyst note inputs on each card', async () => {
      const { render, init } = await import('../../../src/pages/catalysts.js');
      document.body.innerHTML = render();
      await init();

      const noteInputs = document.querySelectorAll('.catalyst-note-input');
      expect(noteInputs.length).toBeGreaterThan(0);
    });

    it('should show error state if catalyst data is null', async () => {
      const { loadCatalysts } = await import('../../../src/services/dataService.js');
      loadCatalysts.mockResolvedValueOnce(null);

      const { render, init } = await import('../../../src/pages/catalysts.js');
      document.body.innerHTML = render();
      await init();

      const container = document.querySelector('#catalyst-container');
      expect(container.querySelector('.error-state')).not.toBeNull();
    });
  });
});
