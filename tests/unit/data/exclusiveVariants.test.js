import { describe, it, expect } from 'vitest';
import { EXCLUSIVE_VARIANTS, getExclusiveData } from '../../../src/data/exclusiveVariants.js';

describe('exclusiveVariants.js', () => {
  describe('EXCLUSIVE_VARIANTS', () => {
    it('should have exclusive variant entries', () => {
      expect(Object.keys(EXCLUSIVE_VARIANTS).length).toBeGreaterThan(0);
    });

    it('should have required properties for each variant', () => {
      Object.values(EXCLUSIVE_VARIANTS).forEach(variant => {
        expect(variant.source).toBeDefined();
        expect(variant.icon).toBeDefined();
        expect(variant.category).toBeDefined();
      });
    });

    it('should have valid icon paths', () => {
      Object.values(EXCLUSIVE_VARIANTS).forEach(variant => {
        expect(variant.icon).toMatch(/^img\//);
        expect(variant.icon).toMatch(/\.(webp|png|jpg)$/);
      });
    });

    it('should have known exclusive variants', () => {
      expect(EXCLUSIVE_VARIANTS['Confusão Interior']).toBeDefined();
      expect(EXCLUSIVE_VARIANTS['Mai-s O Quê?']).toBeDefined();
      expect(EXCLUSIVE_VARIANTS['Favorito dos Fãs']).toBeDefined();
    });

    it('should have different categories', () => {
      const categories = new Set(Object.values(EXCLUSIVE_VARIANTS).map(v => v.category));
      expect(categories.size).toBeGreaterThan(1);
    });
  });

  describe('getExclusiveData', () => {
    it('should return data for exclusive variants', () => {
      const data = getExclusiveData('Confusão Interior');
      expect(data).toBeDefined();
      expect(data.source).toBeDefined();
      expect(data.icon).toBeDefined();
    });

    it('should return null for non-exclusive variants', () => {
      expect(getExclusiveData('Rosa Estelar')).toBeNull();
      expect(getExclusiveData('Unknown')).toBeNull();
      expect(getExclusiveData(null)).toBeNull();
      expect(getExclusiveData(undefined)).toBeNull();
    });

    it('should return correct category', () => {
      const data = getExclusiveData('Big Baddy');
      expect(data.category).toBe('Presente');
    });
  });
});
