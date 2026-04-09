import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('../../../src/components/CharacterCard.js', () => ({
  renderCharacterGrid: vi.fn(),
}));

vi.mock('../../../src/services/dataService.js', () => ({
  getCharacters: vi.fn(() => null),
}));

describe('tierlist.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/tierlist.js');
    expect(module).toBeDefined();
  });

  it('should export render and init functions', async () => {
    const module = await import('../../../src/pages/tierlist.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
  });

  describe('render() DOM structure', () => {
    let html;

    beforeEach(async () => {
      const { render } = await import('../../../src/pages/tierlist.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the tierlist section', () => {
      const section = document.querySelector('#tierlist');
      expect(section).not.toBeNull();
      expect(section.classList.contains('tierlist-section')).toBe(true);
    });

    it('should render the h2 title "Tier List"', () => {
      const h2 = document.querySelector('.section-header h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent.trim()).toBe('Tier List');
    });

    it('should render the tierlist character grid', () => {
      const grid = document.querySelector('#tierlistGrid');
      expect(grid).not.toBeNull();
      expect(grid.classList.contains('character-grid')).toBe(true);
      expect(grid.classList.contains('tierlist-grid')).toBe(true);
    });

    it('should render the back button', () => {
      const backBtn = document.querySelector('.btn-back');
      expect(backBtn).not.toBeNull();
    });

    it('should render the intro text', () => {
      const intro = document.querySelector('.tierlist-intro');
      expect(intro).not.toBeNull();
      expect(intro.querySelector('p')).not.toBeNull();
    });
  });
});
