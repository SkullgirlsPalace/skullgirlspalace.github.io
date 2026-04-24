import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies that characters.js imports
vi.mock('../../../src/components/CharacterCard.js', () => ({
  renderCharacterGrid: vi.fn(),
}));

vi.mock('../../../src/services/dataService.js', () => ({
  getCharacters: vi.fn(() => null),
}));

describe('characters.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/characters.js');
    expect(module).toBeDefined();
  });

  it('should export render and init functions', async () => {
    const module = await import('../../../src/pages/characters.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
  });

  describe('render() DOM structure', () => {
    let html;

    beforeEach(async () => {
      const { render } = await import('../../../src/pages/characters.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the character-selection section', () => {
      const section = document.querySelector('#character-selection');
      expect(section).not.toBeNull();
    });

    it('should render the section header with h2', () => {
      const h2 = document.querySelector('.section-header h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent.trim()).toBe('Escolha um Personagem');
    });

    it('should render the character grid container', () => {
      const grid = document.querySelector('#characterGrid');
      expect(grid).not.toBeNull();
      expect(grid.classList.contains('character-grid')).toBe(true);
    });

    it('should render the back button', () => {
      const backBtn = document.querySelector('.btn-back');
      expect(backBtn).not.toBeNull();
    });
  });
});
