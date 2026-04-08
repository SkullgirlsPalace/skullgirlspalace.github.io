import { describe, it, expect } from 'vitest';
import {
  getVariantImage,
  getVariantIcon
} from '../../../src/data/variantImages.js';

// Note: VARIANT_IMAGES is not exported, we test via functions

describe('variantImages.js', () => {
  describe('getVariantImage', () => {
    it('should return correct image path for known variants', () => {
      const path = getVariantImage('annie', 'Rosa Estelar');
      expect(path).toBe('img/annie/Annie_16.webp');
    });

    it('should return fallback for unknown variants', () => {
      const path = getVariantImage('annie', 'Unknown Variant');
      expect(path).toContain('img/official/');
      expect(path).toContain('.webp');
    });

    it('should return fallback for unknown character', () => {
      const path = getVariantImage('unknown', 'Rosa Estelar');
      expect(path).toContain('img/official/');
    });

    it('should capitalize character name in fallback', () => {
      const path = getVariantImage('filia', 'Unknown');
      expect(path).toContain('Filia');
    });
  });

  describe('getVariantIcon', () => {
    it('should return icon path for any character', () => {
      const path = getVariantIcon('annie', 'Rosa Estelar');
      expect(path).toBe('img/official/annie_Icon.webp');
    });

    it('should ignore variant name', () => {
      const path1 = getVariantIcon('filia', 'Variant A');
      const path2 = getVariantIcon('filia', 'Variant B');
      expect(path1).toBe(path2);
    });

    it('should handle hyphenated names', () => {
      const path = getVariantIcon('big-band', 'Any');
      expect(path).toBe('img/official/big-band_Icon.webp');
    });
  });

  describe('Module exports', () => {
    it('should export getVariantImage function', () => {
      expect(typeof getVariantImage).toBe('function');
    });

    it('should export getVariantIcon function', () => {
      expect(typeof getVariantIcon).toBe('function');
    });
  });

  describe('getVariantImage', () => {
    it('should return correct image path for known variants', () => {
      const path = getVariantImage('annie', 'Rosa Estelar');
      expect(path).toBe('img/annie/Annie_16.webp');
    });

    it('should return fallback for unknown variants', () => {
      const path = getVariantImage('annie', 'Unknown Variant');
      expect(path).toContain('img/official/');
      expect(path).toContain('.webp');
    });

    it('should return fallback for unknown character', () => {
      const path = getVariantImage('unknown', 'Rosa Estelar');
      expect(path).toContain('img/official/');
    });

    it('should capitalize character name in fallback', () => {
      const path = getVariantImage('filia', 'Unknown');
      expect(path).toContain('Filia');
    });
  });

  describe('getVariantIcon', () => {
    it('should return icon path for any character', () => {
      const path = getVariantIcon('annie', 'Rosa Estelar');
      expect(path).toBe('img/official/annie_Icon.webp');
    });

    it('should ignore variant name', () => {
      const path1 = getVariantIcon('filia', 'Variant A');
      const path2 = getVariantIcon('filia', 'Variant B');
      expect(path1).toBe(path2);
    });

    it('should handle hyphenated names', () => {
      const path = getVariantIcon('big-band', 'Any');
      expect(path).toBe('img/official/big-band_Icon.webp');
    });
  });
});
