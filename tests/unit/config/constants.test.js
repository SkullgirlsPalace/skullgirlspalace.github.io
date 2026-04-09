import { describe, it, expect } from 'vitest';
import {
  CHARACTER_FILES,
  CHARACTER_ICONS,
  CHARACTER_COLORS,
  ELEMENT_MAP,
  RARITY_ORDER,
  ELEMENT_ORDER,
  RARITY_LABELS,
  RARITY_ICONS,
  TIER_RANKS
} from '../../../src/config/constants.js';

describe('constants.js', () => {
  describe('CHARACTER_FILES', () => {
    it('should be an array of JSON filenames', () => {
      expect(Array.isArray(CHARACTER_FILES)).toBe(true);
      expect(CHARACTER_FILES.length).toBeGreaterThan(0);
      CHARACTER_FILES.forEach(file => {
        expect(file).toMatch(/\.json$/);
      });
    });
  });

  describe('CHARACTER_ICONS', () => {
    it('should have icon paths for all characters', () => {
      const characters = ['annie', 'beowulf', 'big-band', 'filia', 'cerebella'];
      characters.forEach(char => {
        expect(CHARACTER_ICONS[char]).toBeDefined();
        expect(CHARACTER_ICONS[char]).toMatch(/^img\//);
      });
    });
  });

  describe('CHARACTER_COLORS', () => {
    it('should have valid hex colors', () => {
      Object.values(CHARACTER_COLORS).forEach(color => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  describe('ELEMENT_MAP', () => {
    it('should have all six elements', () => {
      const elements = ['Fogo', 'Água', 'Ar', 'Luz', 'Trevas', 'Neutro'];
      elements.forEach(el => {
        expect(ELEMENT_MAP[el]).toBeDefined();
        expect(ELEMENT_MAP[el].class).toBeDefined();
        expect(ELEMENT_MAP[el].key).toBeDefined();
      });
    });

    it('should have icon paths for each element', () => {
      Object.values(ELEMENT_MAP).forEach(el => {
        expect(el.iconPath).toMatch(/^img\//);
        expect(el.statIcon).toMatch(/^img\//);
      });
    });
  });

  describe('RARITY_ORDER', () => {
    it('should have correct hierarchy (diamante > ouro > prata > bronze)', () => {
      expect(RARITY_ORDER['diamante']).toBeGreaterThan(RARITY_ORDER['ouro']);
      expect(RARITY_ORDER['ouro']).toBeGreaterThan(RARITY_ORDER['prata']);
      expect(RARITY_ORDER['prata']).toBeGreaterThan(RARITY_ORDER['bronze']);
    });
  });

  describe('ELEMENT_ORDER', () => {
    it('should define order for all elements', () => {
      const elements = ['Fogo', 'Água', 'Ar', 'Luz', 'Trevas', 'Neutro'];
      elements.forEach(el => {
        expect(ELEMENT_ORDER[el]).toBeDefined();
        expect(typeof ELEMENT_ORDER[el]).toBe('number');
      });
    });
  });

  describe('RARITY_LABELS', () => {
    it('should have uppercase labels', () => {
      Object.values(RARITY_LABELS).forEach(label => {
        expect(label).toBe(label.toUpperCase());
      });
    });
  });

  describe('RARITY_ICONS', () => {
    it('should have valid image paths', () => {
      Object.values(RARITY_ICONS).forEach(path => {
        expect(path).toMatch(/^img\/official\/icone_/);
        expect(path).toMatch(/\.webp$/);
      });
    });
  });

  describe('TIER_RANKS', () => {
    it('should be an array of tier letters', () => {
      expect(Array.isArray(TIER_RANKS)).toBe(true);
      expect(TIER_RANKS).toContain('SS');
      expect(TIER_RANKS).toContain('S');
      expect(TIER_RANKS).toContain('A');
      expect(TIER_RANKS).toContain('N/A');
    });
  });
});
