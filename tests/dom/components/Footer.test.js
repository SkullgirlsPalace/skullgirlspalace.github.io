import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Footer.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createFooter', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/Footer.js');
      expect(module.createFooter).toBeDefined();
      expect(typeof module.createFooter).toBe('function');
    });

    it('should return HTML string', async () => {
      const { createFooter } = await import('../../../src/components/Footer.js');
      const html = createFooter();
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(10);
    });
  });
});
