import { describe, it, expect } from 'vitest';
import {
  CLASS_ICONS,
  CLASS_ORDER,
  CLASS_DESCRIPTIONS,
  VARIANT_CLASSES,
  getVariantClasses
} from '../../../src/data/variantClasses.js';

describe('variantClasses.js', () => {
  describe('CLASS_ICONS', () => {
    it('should have four class types', () => {
      expect(Object.keys(CLASS_ICONS).length).toBe(4);
    });

    it('should have required class types', () => {
      expect(CLASS_ICONS['Ofensivo']).toBeDefined();
      expect(CLASS_ICONS['Defensivo']).toBeDefined();
      expect(CLASS_ICONS['Suporte de Utilidade']).toBeDefined();
      expect(CLASS_ICONS['Coringa']).toBeDefined();
    });

    it('should have icon and color for each class', () => {
      Object.values(CLASS_ICONS).forEach(cls => {
        expect(cls.icon).toBeDefined();
        expect(cls.color).toBeDefined();
        expect(cls.icon).toMatch(/^img\//);
        expect(cls.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  describe('CLASS_ORDER', () => {
    it('should define order for all classes', () => {
      Object.keys(CLASS_ICONS).forEach(cls => {
        expect(CLASS_ORDER[cls]).toBeDefined();
        expect(typeof CLASS_ORDER[cls]).toBe('number');
      });
    });
  });

  describe('CLASS_DESCRIPTIONS', () => {
    it('should have descriptions for all classes', () => {
      Object.keys(CLASS_ICONS).forEach(cls => {
        expect(CLASS_DESCRIPTIONS[cls]).toBeDefined();
        expect(typeof CLASS_DESCRIPTIONS[cls]).toBe('string');
        expect(CLASS_DESCRIPTIONS[cls].length).toBeGreaterThan(20);
      });
    });
  });

  describe('VARIANT_CLASSES', () => {
    it('should have many variant mappings', () => {
      expect(Object.keys(VARIANT_CLASSES).length).toBeGreaterThan(50);
    });

    it('should have valid classes for each variant', () => {
      const validClasses = Object.keys(CLASS_ICONS);
      Object.values(VARIANT_CLASSES).forEach(classes => {
        expect(Array.isArray(classes)).toBe(true);
        classes.forEach(cls => {
          expect(validClasses).toContain(cls);
        });
      });
    });

    it('should have some variants with multiple classes', () => {
      const multiClass = Object.entries(VARIANT_CLASSES).filter(([_, v]) => v.length > 1);
      expect(multiClass.length).toBeGreaterThan(0);
    });
  });

  describe('getVariantClasses', () => {
    it('should return classes for known variants', () => {
      const classes = getVariantClasses('Rosa Estelar');
      expect(Array.isArray(classes)).toBe(true);
      expect(classes.length).toBeGreaterThan(0);
    });

    it('should return Ofensivo as default for unknown variants', () => {
      const classes = getVariantClasses('Unknown Variant');
      expect(classes).toEqual(['Ofensivo']);
    });

    it('should return array even for variants with single class', () => {
      const classes = getVariantClasses('Rosa Estelar');
      expect(Array.isArray(classes)).toBe(true);
    });

    it('should return multiple classes when applicable', () => {
      const classes = getVariantClasses('Resguardada');
      expect(classes.length).toBe(2);
      expect(classes).toContain('Ofensivo');
      expect(classes).toContain('Suporte de Utilidade');
    });
  });
});
