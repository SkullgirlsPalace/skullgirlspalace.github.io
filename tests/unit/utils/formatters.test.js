import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  formatText,
  formatArsenal,
  parseStatValue,
  formatNumber,
  formatBuildText,
  formatConstraint,
  getMasteryIcon
} from '../../../src/utils/formatters.js';

// Mock the imports
vi.mock('../../../src/data/effectData.js', () => ({
  getEffectPatterns: () => [
    { pattern: 'Armadura', effectKey: 'armor' },
    { pattern: 'Sangramento', effectKey: 'bleed' }
  ],
  EFFECT_DATA: {
    armor: { type: 'buff', icon: 'img/test.webp' },
    bleed: { type: 'debuff', icon: 'img/test2.webp' },
    critless: { type: 'buff-term', icon: 'img/test3.webp' }
  }
}));

vi.mock('../../../src/data/elementEffectsData.js', () => ({
  hasElementEffects: (name) => name === 'Isca Sortuda'
}));

vi.mock('../../../src/data/attributeData.js', () => ({
  getAttributePatterns: () => [
    { pattern: 'ATQ%', attrKey: 'atq' },
    { pattern: 'ATQ', attrKey: 'atq' },
    { pattern: 'Perfuração', attrKey: 'perfuracao' }
  ]
}));

vi.mock('../../../src/data/movesimages.js', () => ({
  getMoveData: (charKey, moveName) => {
    if (charKey === 'filia' && moveName === 'Hairball') {
      return { image: { image: 'img/test-move.webp' } };
    }
    return null;
  }
}));

describe('formatters.js', () => {
  describe('formatText', () => {
    it('should handle empty input', () => {
      expect(formatText('')).toBe('');
      expect(formatText(null)).toBe('');
      expect(formatText(undefined)).toBe('');
    });

    it('should handle array input', () => {
      const result = formatText(['Line 1', 'Line 2']);
      // Numbers get wrapped in spans
      expect(result).toContain('Line');
      expect(result).toContain('<br>');
    });

    it('should remove [HAB N]: prefixes', () => {
      expect(formatText('[HAB 1]: Test')).not.toContain('[HAB 1]:');
      expect(formatText('[HAB 2]: Test Ability')).not.toContain('[HAB 2]:');
    });

    it('should remove **bold** markdown', () => {
      expect(formatText('**Test**')).toBe('Test');
      expect(formatText('Some **bold** text')).toBe('Some bold text');
    });

    it('should remove Discord emoji codes', () => {
      expect(formatText('<:test:12345>')).toBe('');
      expect(formatText('Text <:emoji:999> more')).toBe('Text  more');
    });

    it('should convert \\n to <br>', () => {
      const result = formatText('Line 1\\nLine 2');
      expect(result).toContain('<br>');
      // Numbers in "Line 1" and "Line 2" get wrapped
      expect(result).toContain('Line');
    });

    it('should convert numbers to highlighted spans', () => {
      const result = formatText('Damage: 100');
      expect(result).toContain('<span class="number">100</span>');
    });

    it('should handle percentage numbers', () => {
      const result = formatText('50% damage');
      expect(result).toContain('<span class="number">50%</span>');
    });

    it('should handle ??? as numbers', () => {
      const result = formatText('Damage: ???');
      expect(result).toContain('<span class="number">???</span>');
    });
  });

  describe('formatArsenal', () => {
    it('should handle empty input', () => {
      expect(formatArsenal('')).toBe('');
      expect(formatArsenal(null)).toBe('');
    });

    it('should split by comma', () => {
      const result = formatArsenal('Move 1, Move 2, Move 3');
      expect(result).toContain('Move 1');
      expect(result).toContain('Move 2');
      expect(result).toContain('Move 3');
    });

    it('should remove Discord emoji codes', () => {
      const result = formatArsenal('Move 1 <:test:123>');
      expect(result).not.toContain('<:test:123>');
    });

    it('should handle special moves with commas', () => {
      const result = formatArsenal('Contra, Ataque!, Other Move');
      // Should not split "Contra, Ataque!"
      expect(result).toContain('Contra, Ataque!');
    });

    it('should return divs when charKey provided', () => {
      const result = formatArsenal('Hairball, Other Move', 'filia');
      expect(result).toContain('move');
    });
  });

  describe('parseStatValue', () => {
    it('should handle empty input', () => {
      expect(parseStatValue('')).toBe(0);
      expect(parseStatValue(null)).toBe(0);
    });

    it('should parse simple numbers', () => {
      expect(parseStatValue('1000')).toBe(1000);
    });

    it('should parse numbers with commas', () => {
      expect(parseStatValue('10,004')).toBe(10004);
    });

    it('should parse numbers with dots', () => {
      expect(parseStatValue('10.004')).toBe(10004);
    });
  });

  describe('formatNumber', () => {
    it('should format with pt-BR locale', () => {
      expect(formatNumber(1000)).toBe('1.000');
      expect(formatNumber(10000)).toBe('10.000');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('formatBuildText', () => {
    it('should handle empty input', () => {
      expect(formatBuildText('')).toBe('');
      expect(formatBuildText(null)).toBe('');
    });

    it('should wrap attribute keywords in spans', () => {
      const result = formatBuildText('ATQ%, Perfuração');
      expect(result).toContain('attr-highlight');
    });

    it('should convert non-string input to string', () => {
      const result = formatBuildText(123);
      expect(typeof result).toBe('string');
    });
  });

  describe('formatConstraint', () => {
    it('should handle empty input', () => {
      expect(formatConstraint('')).toBe('');
      expect(formatConstraint(null)).toBe('');
    });

    it('should map Boss to Chefe', () => {
      expect(formatConstraint('Boss')).toBe('Chefe (Nó Central)');
    });

    it('should map node types', () => {
      expect(formatConstraint('Duo')).toBe('Nó Duplo');
      expect(formatConstraint('Single')).toBe('Nó Solo');
    });

    it('should map defense types', () => {
      expect(formatConstraint('Def. Fogo')).toBe('Def. Fogo');
      expect(formatConstraint('Def. Água')).toBe('Def. Água');
    });

    it('should return original if no mapping', () => {
      expect(formatConstraint('Unknown')).toBe('Unknown');
    });
  });

  describe('getMasteryIcon', () => {
    it('should generate correct path for simple names', () => {
      expect(getMasteryIcon('annie')).toBe('img/official/Annie_MasteryIcon.webp');
      expect(getMasteryIcon('filia')).toBe('img/official/Filia_MasteryIcon.webp');
    });

    it('should handle hyphenated names', () => {
      expect(getMasteryIcon('big-band')).toBe('img/official/BigBand_MasteryIcon.webp');
      expect(getMasteryIcon('robo-fortune')).toBe('img/official/Robofortune_MasteryIcon.webp');
    });

    it('should handle special case for Robofortune', () => {
      // RoboFortune becomes Robofortune (lowercase f)
      expect(getMasteryIcon('robo-fortune')).toContain('Robofortune');
    });
  });
});
