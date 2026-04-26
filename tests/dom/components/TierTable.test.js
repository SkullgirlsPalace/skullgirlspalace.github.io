import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TierTable.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTierTable', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/TierTable.js');
      expect(module.createTierTable).toBeDefined();
      expect(typeof module.createTierTable).toBe('function');
    });

    it('should return HTML string', async () => {
      const { createTierTable } = await import('../../../src/components/TierTable.js');
      const html = createTierTable('filia', {});
      expect(typeof html).toBe('string');
    });
  });
});
