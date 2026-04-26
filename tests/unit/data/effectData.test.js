import { describe, it, expect } from 'vitest';
import { EFFECT_DATA, getEffectPatterns } from '../../../src/data/effectData.js';

describe('effectData.js', () => {
  describe('EFFECT_DATA', () => {
    it('should have effect entries', () => {
      expect(Object.keys(EFFECT_DATA).length).toBeGreaterThan(0);
    });

    it('should have buffs', () => {
      const buffs = Object.entries(EFFECT_DATA).filter(([_, v]) => v.type === 'buff');
      expect(buffs.length).toBeGreaterThan(0);
    });

    it('should have debuffs', () => {
      const debuffs = Object.entries(EFFECT_DATA).filter(([_, v]) => v.type === 'debuff');
      expect(debuffs.length).toBeGreaterThan(0);
    });

    it('should have required properties for buffs/debuffs', () => {
      Object.entries(EFFECT_DATA).forEach(([key, effect]) => {
        if (effect.type === 'buff' || effect.type === 'debuff') {
          expect(effect.keys).toBeDefined();
          expect(effect.name).toBeDefined();
          expect(effect.detailed).toBeDefined();
        }
      });
    });

    it('should have unique keys within each effect', () => {
      const allKeys = [];
      Object.values(EFFECT_DATA).forEach(effect => {
        if (effect.keys) {
          allKeys.push(...effect.keys);
        }
      });
      // Check no duplicates
      const uniqueKeys = new Set(allKeys);
      expect(uniqueKeys.size).toBe(allKeys.length);
    });

    it('should have icon paths for buffs and debuffs', () => {
      Object.entries(EFFECT_DATA).forEach(([key, effect]) => {
        if (effect.type === 'buff' || effect.type === 'debuff') {
          if (effect.icon) {
            expect(effect.icon).toMatch(/^img\//);
          }
        }
      });
    });
  });

  describe('getEffectPatterns', () => {
    it('should return an array', () => {
      const patterns = getEffectPatterns();
      expect(Array.isArray(patterns)).toBe(true);
    });

    it('should include buff patterns', () => {
      const patterns = getEffectPatterns();
      const armorPattern = patterns.find(p => p.effectKey === 'armor');
      expect(armorPattern).toBeDefined();
    });

    it('should include debuff patterns', () => {
      const patterns = getEffectPatterns();
      const bleedPattern = patterns.find(p => p.effectKey === 'bleed');
      expect(bleedPattern).toBeDefined();
    });

    it('should be sorted by pattern length descending', () => {
      const patterns = getEffectPatterns();
      for (let i = 0; i < patterns.length - 1; i++) {
        expect(patterns[i].pattern.length).toBeGreaterThanOrEqual(patterns[i + 1].pattern.length);
      }
    });

    it('should only include buffs, debuffs, buff-term, and debuff-term', () => {
      const patterns = getEffectPatterns();
      patterns.forEach(p => {
        const effect = EFFECT_DATA[p.effectKey];
        expect(['buff', 'debuff', 'buff-term', 'debuff-term']).toContain(effect.type);
      });
    });

    it('should not include terms', () => {
      const patterns = getEffectPatterns();
      const attackPattern = patterns.find(p => p.effectKey === 'ataque');
      // 'ataque' is a term type, should not be in patterns
      expect(attackPattern).toBeUndefined();
    });
  });
});
