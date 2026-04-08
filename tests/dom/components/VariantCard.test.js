import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('VariantCard.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createVariantCard', () => {
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
