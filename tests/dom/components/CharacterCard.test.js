import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('CharacterCard.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('createCharacterCard', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/CharacterCard.js');
      expect(module.createCharacterCard).toBeDefined();
      expect(typeof module.createCharacterCard).toBe('function');
    });

    it('should return HTML string', async () => {
      const { createCharacterCard } = await import('../../../src/components/CharacterCard.js');
      const html = createCharacterCard('annie', { character: 'Annie' });
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(50);
    });

    it('should include character name', async () => {
      const { createCharacterCard } = await import('../../../src/components/CharacterCard.js');
      const html = createCharacterCard('annie', { character: 'Annie' });
      expect(html.toUpperCase()).toContain('ANNIE');
    });

    it('should include onclick handler', async () => {
      const { createCharacterCard } = await import('../../../src/components/CharacterCard.js');
      const html = createCharacterCard('annie', { character: 'Annie' });
      expect(html).toContain('onclick');
    });

    it('should apply animation delay based on index', async () => {
      const { createCharacterCard } = await import('../../../src/components/CharacterCard.js');
      const html = createCharacterCard('annie', { character: 'Annie' }, 5);
      expect(html).toContain('animation-delay');
    });
  });

  describe('renderCharacterGrid', () => {
    it('should be callable', async () => {
      const { renderCharacterGrid } = await import('../../../src/components/CharacterCard.js');
      expect(typeof renderCharacterGrid).toBe('function');
    });

    it('should render grid into container', async () => {
      const { renderCharacterGrid } = await import('../../../src/components/CharacterCard.js');
      document.body.innerHTML = '<div id="test-container"></div>';
      const characters = {
        annie: { character: 'Annie' },
        filia: { character: 'Filia' }
      };
      renderCharacterGrid('test-container', characters);
      const container = document.getElementById('test-container');
      expect(container.innerHTML.length).toBeGreaterThan(0);
    });

    it('should handle empty container', async () => {
      const { renderCharacterGrid } = await import('../../../src/components/CharacterCard.js');
      renderCharacterGrid('non-existent', {}); // Should not throw
    });
  });
});
