import { describe, it, expect } from 'vitest';
import { PORTRAIT_MAP, getPortraitImage } from '../../../src/data/portraitMap.js';

describe('portraitMap.js', () => {
  describe('PORTRAIT_MAP', () => {
    it('should have entries for all characters', () => {
      const expectedChars = ['annie', 'beowulf', 'big-band', 'black-dahlia', 'cerebella',
        'double', 'eliza', 'filia', 'fukua', 'marie', 'ms-fortune', 'painwheel',
        'parasoul', 'peacock', 'robo-fortune', 'squigly', 'umbrella', 'valentine'];

      expectedChars.forEach(char => {
        expect(PORTRAIT_MAP[char]).toBeDefined();
      });
    });

    it('should have valid portrait paths', () => {
      Object.values(PORTRAIT_MAP).forEach(charVariants => {
        Object.values(charVariants).forEach(path => {
          expect(path).toMatch(/^img\/portrait\//);
          expect(path).toMatch(/\.webp$/);
        });
      });
    });

    it('should have multiple variants per character', () => {
      Object.entries(PORTRAIT_MAP).forEach(([char, variants]) => {
        expect(Object.keys(variants).length).toBeGreaterThan(10);
      });
    });
  });

  describe('getPortraitImage', () => {
    it('should return correct portrait for known variants', () => {
      const path = getPortraitImage('annie', 'Rosa Estelar');
      expect(path).toBe('img/portrait/an/sRose.webp');
    });

    it('should return fallback for unknown variants', () => {
      const path = getPortraitImage('annie', 'Unknown Variant');
      expect(path).toContain('img/official/');
      expect(path).toContain('.webp');
    });

    it('should return fallback for unknown character', () => {
      const path = getPortraitImage('unknown', 'Any');
      expect(path).toContain('img/official/');
    });

    it('should capitalize character name in fallback', () => {
      const path = getPortraitImage('filia', 'Unknown');
      expect(path).toContain('Filia');
    });
  });
});
