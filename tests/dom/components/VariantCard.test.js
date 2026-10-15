import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('VariantCard.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createVariantCard', () => {
    it('keeps quotes in editorial build titles out of inline JavaScript', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      document.body.innerHTML = createVariantCard({ name: 'Test', element: 'Fogo', builds: [{ title: `Ataque d'água "seguro"`, recommended_build: 'Precisão' }] }, 'annie');
      const button = document.querySelector('.build-pill');
      expect(button.dataset.buildKey).toBe(`Test-Ataque d'água "seguro"`);
      expect(button.getAttribute('onclick')).toBe('switchVariantBuild(this, this.dataset.buildKey)');
      expect(document.querySelector('.build-sub-content').dataset.buildIdx).toBe(button.dataset.buildKey);
    });
    it('should be importable', async () => {
      const module = await import('../../../src/components/VariantCard.js');
      expect(module.createVariantCard).toBeDefined();
      expect(typeof module.createVariantCard).toBe('function');
    });

    it('should return HTML string for valid variant', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const variant = {
        name: 'Test Variant',
        element: 'Fogo',
        rarityKey: 'diamante'
      };
      const html = createVariantCard(variant, 'filia', 0);
      expect(typeof html).toBe('string');
    });
  });
});
