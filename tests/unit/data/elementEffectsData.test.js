import { describe, it, expect } from 'vitest';
import { ELEMENT_EFFECTS, hasElementEffects, getElementEffects } from '../../../src/data/elementEffectsData.js';

describe('elementEffectsData.js', () => {
  describe('ELEMENT_EFFECTS', () => {
    it('should have variant entries', () => {
      expect(Object.keys(ELEMENT_EFFECTS).length).toBeGreaterThan(0);
    });

    it('should have buffs for each variant', () => {
      Object.values(ELEMENT_EFFECTS).forEach(variant => {
        expect(variant.buffs).toBeDefined();
        expect(typeof variant.buffs).toBe('object');
      });
    });

    it('should have buffs for all six elements', () => {
      const elements = ['Fogo', 'Água', 'Ar', 'Luz', 'Trevas', 'Neutro'];
      Object.values(ELEMENT_EFFECTS).forEach(variant => {
        elements.forEach(el => {
          expect(variant.buffs[el]).toBeDefined();
        });
      });
    });

    it('should have debuffs array (may be empty)', () => {
      Object.entries(ELEMENT_EFFECTS).forEach(([name, variant]) => {
        if (variant.debuffs) {
          expect(typeof variant.debuffs).toBe('object');
        }
      });
    });

    it('should have known variant "Isca Sortuda"', () => {
      expect(ELEMENT_EFFECTS['Isca Sortuda']).toBeDefined();
      expect(ELEMENT_EFFECTS['Isca Sortuda'].buffs['Ar']).toContain('Regeneração');
    });

    it('should have known variant "Íris-Color"', () => {
      expect(ELEMENT_EFFECTS['Íris-Color']).toBeDefined();
      expect(ELEMENT_EFFECTS['Íris-Color'].debuffs).toBeDefined();
    });
  });

  describe('hasElementEffects', () => {
    it('should return true for variants with element effects', () => {
      expect(hasElementEffects('Isca Sortuda')).toBe(true);
      expect(hasElementEffects('Íris-Color')).toBe(true);
      expect(hasElementEffects('Plumagem Prismática')).toBe(true);
    });

    it('should return false for unknown variants', () => {
      expect(hasElementEffects('Unknown Variant')).toBe(false);
      expect(hasElementEffects('')).toBe(false);
      expect(hasElementEffects(null)).toBe(false);
      expect(hasElementEffects(undefined)).toBe(false);
    });
  });

  describe('getElementEffects', () => {
    it('should return effects object for known variants', () => {
      const effects = getElementEffects('Isca Sortuda');
      expect(effects).toBeDefined();
      expect(effects.buffs).toBeDefined();
    });

    it('should return null for unknown variants', () => {
      expect(getElementEffects('Unknown')).toBeNull();
      expect(getElementEffects(null)).toBeNull();
      expect(getElementEffects(undefined)).toBeNull();
    });

    it('should return correct structure', () => {
      const effects = getElementEffects('Plumagem Prismática');
      expect(effects.buffs).toBeDefined();
      expect(effects.debuffs).toBeDefined();
      expect(Array.isArray(effects.buffs['Ar'])).toBe(true);
    });
  });
});
