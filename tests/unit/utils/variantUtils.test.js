import { describe, it, expect } from 'vitest';
import { flattenVariants } from '../../../src/utils/variantUtils.js';

describe('variantUtils.js', () => {
  describe('flattenVariants', () => {
    it('should flatten nested variants object', () => {
      const nested = {
        diamante: [
          { name: 'D1', element: 'Fogo' },
          { name: 'D2', element: 'Água' }
        ],
        ouro: [
          { name: 'O1', element: 'Ar' }
        ]
      };
      const result = flattenVariants(nested);

      expect(result.length).toBe(3);
      expect(result[0].name).toBe('D1');
      expect(result[0].rarityKey).toBe('diamante');
      expect(result[2].name).toBe('O1');
      expect(result[2].rarityKey).toBe('ouro');
    });

    it('should return empty array for null/undefined/empty input', () => {
      expect(flattenVariants(null)).toEqual([]);
      expect(flattenVariants(undefined)).toEqual([]);
      expect(flattenVariants({})).toEqual([]);
    });

    it('should handle empty rarity arrays', () => {
      const nested = {
        diamante: [],
        ouro: []
      };
      expect(flattenVariants(nested)).toEqual([]);
    });
  });
});
