import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AttributeTooltip.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('initAttributeTooltips', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/AttributeTooltip.js');
      expect(module.initAttributeTooltips).toBeDefined();
      expect(typeof module.initAttributeTooltips).toBe('function');
    });

    it('should be callable', async () => {
      const { initAttributeTooltips } = await import('../../../src/components/AttributeTooltip.js');
      document.body.innerHTML = '<div id="app"></div>';
      initAttributeTooltips(); // Should not throw
    });
  });
});
