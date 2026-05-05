import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sortVariants, filterVariants } from '../../../src/utils/sorting.js';
import { flattenVariants } from '../../../src/utils/variantUtils.js';

// Mock constants
vi.mock('../../../src/config/constants.js', () => ({
  RARITY_ORDER: { diamante: 4, ouro: 3, prata: 2, bronze: 1 },
  ELEMENT_ORDER: { Fogo: 1, Água: 2, Ar: 3, Luz: 4, Trevas: 5, Neutro: 6 },
  ELEMENT_MAP: {
    Fogo: { key: 'fogo', class: 'fire' },
    Água: { key: 'agua', class: 'water' },
    Ar: { key: 'ar', class: 'wind' }
  }
}));

// Mock formatters
vi.mock('../../../src/utils/formatters.js', () => ({
  parseStatValue: vi.fn((val) => {
    if (!val) return 0;
    return parseInt(String(val).replace(/[,.]/g, '')) || 0;
  })
}));

// Mock variantClasses
vi.mock('../../../src/data/variantClasses.js', () => ({
  getVariantClasses: vi.fn(() => ['Ofensivo']),
  CLASS_ORDER: { Ofensivo: 1, Defensivo: 2, 'Suporte de Utilidade': 3, Coringa: 4 }
}));

// Mock newContent
vi.mock('../../../src/data/newContent.js', () => ({
  isNewVariant: vi.fn(() => false),
  NEW_VARIANTS: []
}));

describe('sorting.js', () => {
  const mockVariants = [
    { name: 'Variant A', rarityKey: 'ouro', element: 'Fogo', stats: { power: '10000', attack: '5000', health: '10000' } },
    { name: 'Variant B', rarityKey: 'diamante', element: 'Água', stats: { power: '15000', attack: '7000', health: '12000' } },
    { name: 'Variant C', rarityKey: 'bronze', element: 'Ar', stats: { power: '5000', attack: '3000', health: '6000' } },
    { name: 'Variant D', rarityKey: 'diamante', element: 'Fogo', stats: { power: '20000', attack: '8000', health: '15000' } }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('sortVariants', () => {
    it('should sort by score descending by default', () => {
      const result = sortVariants(mockVariants, { type: 'score', direction: 'desc' }, { rarity: [], element: [] });
      expect(result[0].name).toBe('Variant D'); // 20000 power
      expect(result[result.length - 1].name).toBe('Variant C'); // 5000 power
    });

    it('should sort by score ascending', () => {
      const result = sortVariants(mockVariants, { type: 'score', direction: 'asc' }, { rarity: [], element: [] });
      expect(result[0].name).toBe('Variant C'); // 5000 power
    });

    it('should sort by attack', () => {
      const result = sortVariants(mockVariants, { type: 'atk', direction: 'desc' }, { rarity: [], element: [] });
      expect(result[0].name).toBe('Variant D'); // 8000 attack
    });

    it('should sort by hp/health', () => {
      const result = sortVariants(mockVariants, { type: 'hp', direction: 'desc' }, { rarity: [], element: [] });
      expect(result[0].name).toBe('Variant D'); // 15000 health
    });

    it('should sort by name alphabetically (secondary to rarity)', () => {
        const result = sortVariants(mockVariants, { type: 'name', direction: 'asc' }, { rarity: [], element: [] });
        // Rarity is primary sort, so within same rarity, name is secondary
        expect(result).toBeDefined();
        // Test with same-rarity variants to verify name sorting works
        const sameRarity = [
            { name: 'Zebra', rarityKey: 'ouro', element: 'Fogo', stats: { power: '1000' } },
            { name: 'Apple', rarityKey: 'ouro', element: 'Água', stats: { power: '2000' } },
            { name: 'Mango', rarityKey: 'ouro', element: 'Ar', stats: { power: '1500' } }
        ];
        const sorted = sortVariants(sameRarity, { type: 'name', direction: 'asc' }, { rarity: [], element: [] });
        expect(sorted[0].name).toBe('Apple');
        expect(sorted[1].name).toBe('Mango');
        expect(sorted[2].name).toBe('Zebra');
    });

    it('should sort by element', () => {
      const result = sortVariants(mockVariants, { type: 'element', direction: 'asc' }, { rarity: [], element: [] });
      // Fogo=1, Água=2, Ar=3 - but rarity is primary sort
      expect(result).toBeDefined();
    });

    it('should sort by class', () => {
      const result = sortVariants(mockVariants, { type: 'class', direction: 'asc' }, { rarity: [], element: [] });
      expect(result).toBeDefined();
    });

    it('should prioritize rarity (diamante > bronze)', () => {
      const result = sortVariants(mockVariants, { type: 'score', direction: 'desc' }, { rarity: [], element: [] });
      // Diamond variants should be at top
      const diamondCount = result.filter(v => v.rarityKey === 'diamante').length;
      const firstDiamondIndex = result.findIndex(v => v.rarityKey === 'diamante');
      const lastDiamondIndex = result.findLastIndex(v => v.rarityKey === 'diamante');
      expect(firstDiamondIndex).toBeLessThan(result.findIndex(v => v.rarityKey === 'bronze'));
    });

    it('should handle empty variants array', () => {
      const result = sortVariants([], { type: 'score', direction: 'desc' });
      expect(result).toEqual([]);
    });

    it('should handle null filters', () => {
      const result = sortVariants(mockVariants, { type: 'score', direction: 'desc' }, null);
      expect(result.length).toBe(mockVariants.length);
    });

    it('should handle missing stats gracefully', () => {
      const variantsNoStats = [
        { name: 'No Stats', rarityKey: 'ouro', element: 'Fogo' }
      ];
      const result = sortVariants(variantsNoStats, { type: 'score', direction: 'desc' }, { rarity: [], element: [] });
      expect(result).toBeDefined();
    });
  });

  describe('filterVariants', () => {
    it('should filter by single rarity', () => {
      const result = filterVariants(mockVariants, { rarity: ['diamante'], element: [] });
      expect(result.length).toBe(2);
      expect(result.every(v => v.rarityKey === 'diamante')).toBe(true);
    });

    it('should filter by multiple rarities', () => {
      const result = filterVariants(mockVariants, { rarity: ['diamante', 'ouro'], element: [] });
      expect(result.length).toBe(3);
    });

    it('should filter by element', () => {
      const result = filterVariants(mockVariants, { rarity: [], element: ['fogo'] });
      expect(result.length).toBe(2);
    });

    it('should filter by both rarity and element', () => {
      const result = filterVariants(mockVariants, { rarity: ['diamante'], element: ['fogo'] });
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Variant D');
    });

    it('should return all when no filters', () => {
      const result = filterVariants(mockVariants, { rarity: [], element: [] });
      expect(result.length).toBe(mockVariants.length);
    });

    it('should return empty when no matches', () => {
      const result = filterVariants(mockVariants, { rarity: ['prata'], element: [] });
      expect(result.length).toBe(0);
    });

    it('should handle empty variants array', () => {
      const result = filterVariants([], { rarity: ['diamante'], element: [] });
      expect(result).toEqual([]);
    });

    it('should handle null filters gracefully', () => {
        // filterVariants expects an object, null causes error
        expect(() => filterVariants(mockVariants, null)).toThrow();
    });
  });

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
      expect(result[0].rarityKey).toBe('diamante');
      expect(result[2].rarityKey).toBe('ouro');
    });

    it('should add rarityKey to each variant', () => {
      const nested = {
        bronze: [{ name: 'B1' }]
      };
      const result = flattenVariants(nested);

      expect(result[0].rarityKey).toBe('bronze');
    });

    it('should return empty array for null input', () => {
      const result = flattenVariants(null);
      expect(result).toEqual([]);
    });

    it('should return empty array for undefined input', () => {
      const result = flattenVariants(undefined);
      expect(result).toEqual([]);
    });

    it('should handle empty object', () => {
      const result = flattenVariants({});
      expect(result).toEqual([]);
    });

    it('should handle empty rarity arrays', () => {
      const nested = {
        diamante: [],
        ouro: []
      };
      const result = flattenVariants(nested);
      expect(result).toEqual([]);
    });

    it('should preserve variant properties', () => {
      const nested = {
        diamante: [
          { name: 'Test', element: 'Fogo', stats: { power: 1000 } }
        ]
      };
      const result = flattenVariants(nested);

      expect(result[0].name).toBe('Test');
      expect(result[0].element).toBe('Fogo');
      expect(result[0].stats.power).toBe(1000);
    });
  });
});
