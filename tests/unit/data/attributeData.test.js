import { describe, it, expect } from 'vitest';
import { ATTRIBUTE_DATA, getAttributePatterns } from '../../../src/data/attributeData.js';

describe('attributeData.js', () => {
  describe('ATTRIBUTE_DATA', () => {
    it('should have attribute entries', () => {
      expect(Object.keys(ATTRIBUTE_DATA).length).toBeGreaterThan(0);
    });

    it('should have required properties for each attribute', () => {
      Object.entries(ATTRIBUTE_DATA).forEach(([key, attr]) => {
        expect(attr.name).toBeDefined();
        expect(attr.summary).toBeDefined();
        expect(attr.detailed).toBeDefined();
      });
    });

    it('should have keys array for searchable attributes', () => {
      // Most attributes should have searchable keys
      const withKeys = Object.entries(ATTRIBUTE_DATA).filter(([_, v]) => v.keys && v.keys.length > 0);
      expect(withKeys.length).toBeGreaterThan(10);
    });

    it('should have valid HTML in name property', () => {
      Object.values(ATTRIBUTE_DATA).forEach(attr => {
        // Name can contain HTML (img tags, etc.)
        expect(typeof attr.name).toBe('string');
        expect(attr.name.length).toBeGreaterThan(0);
      });
    });

    it('should include ATQ attribute', () => {
      expect(ATTRIBUTE_DATA.atq).toBeDefined();
      expect(ATTRIBUTE_DATA.atq.keys).toContain('ATQ%');
    });

    it('should include Vida attribute', () => {
      expect(ATTRIBUTE_DATA.vd).toBeDefined();
      expect(ATTRIBUTE_DATA.vd.keys).toContain('VD%');
    });

    it('should include Perfuração attribute', () => {
      expect(ATTRIBUTE_DATA.perfuracao).toBeDefined();
      expect(ATTRIBUTE_DATA.perfuracao.max).toBe('50%');
    });
  });

  describe('getAttributePatterns', () => {
    it('should return an array', () => {
      const patterns = getAttributePatterns();
      expect(Array.isArray(patterns)).toBe(true);
    });

    it('should include ATQ patterns', () => {
      const patterns = getAttributePatterns();
      const atqPatterns = patterns.filter(p => p.attrKey === 'atq');
      expect(atqPatterns.length).toBeGreaterThan(0);
    });

    it('should be sorted by pattern length descending', () => {
      const patterns = getAttributePatterns();
      for (let i = 0; i < patterns.length - 1; i++) {
        expect(patterns[i].pattern.length).toBeGreaterThanOrEqual(patterns[i + 1].pattern.length);
      }
    });

    it('should have pattern and attrKey for each entry', () => {
      const patterns = getAttributePatterns();
      patterns.forEach(p => {
        expect(p.pattern).toBeDefined();
        expect(p.attrKey).toBeDefined();
        expect(ATTRIBUTE_DATA[p.attrKey]).toBeDefined();
      });
    });

    it('should exclude tier attributes (empty keys)', () => {
      const patterns = getAttributePatterns();
      const tierPatterns = patterns.filter(p => p.attrKey.startsWith('tier_'));
      // Tier attributes have empty keys arrays, so they shouldn't appear
      expect(tierPatterns.length).toBe(0);
    });
  });
});
