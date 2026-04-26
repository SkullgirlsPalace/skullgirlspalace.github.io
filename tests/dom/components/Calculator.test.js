import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Calculator.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createCalculator', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/Calculator.js');
      expect(module.createCalculator).toBeDefined();
      expect(typeof module.createCalculator).toBe('function');
    });

    it('should return HTML string', async () => {
      const { createCalculator } = await import('../../../src/components/Calculator.js');
      const html = createCalculator();
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(100);
    });

    it('should contain calculator box class', async () => {
      const { createCalculator } = await import('../../../src/components/Calculator.js');
      const html = createCalculator();
      expect(html).toContain('calculator-box');
    });

    it('should contain tab bar', async () => {
      const { createCalculator } = await import('../../../src/components/Calculator.js');
      const html = createCalculator();
      expect(html).toContain('calc-tab-bar');
    });

    it('should contain ganhos tab', async () => {
      const { createCalculator } = await import('../../../src/components/Calculator.js');
      const html = createCalculator();
      expect(html).toContain('Ganhos');
    });
  });

  describe('initCalculator', () => {
    it('should be callable', async () => {
      const { initCalculator } = await import('../../../src/components/Calculator.js');
      expect(typeof initCalculator).toBe('function');
    });

    it('should accept stats data', async () => {
      const { initCalculator } = await import('../../../src/components/Calculator.js');
      const mockData = { golpes: {}, astros: {} };
      initCalculator(mockData); // Should not throw
    });
  });

  describe('handleCalculateEarnings', () => {
    it('should be callable', async () => {
      const { handleCalculateEarnings } = await import('../../../src/components/Calculator.js');
      expect(typeof handleCalculateEarnings).toBe('function');
    });
  });
});
