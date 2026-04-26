import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('FilterBar.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createFilterBar', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/FilterBar.js');
      expect(module.createFilterBar).toBeDefined();
      expect(typeof module.createFilterBar).toBe('function');
    });

    it('should return HTML string', async () => {
      const { createFilterBar } = await import('../../../src/components/FilterBar.js');
      const html = createFilterBar();
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(100);
    });

    it('should contain filter bar class', async () => {
      const { createFilterBar } = await import('../../../src/components/FilterBar.js');
      const html = createFilterBar();
      expect(html).toContain('filter-bar');
    });

    it('should contain rarity buttons', async () => {
      const { createFilterBar } = await import('../../../src/components/FilterBar.js');
      const html = createFilterBar();
      expect(html).toContain('rarity-btn');
    });

    it('should contain element buttons', async () => {
      const { createFilterBar } = await import('../../../src/components/FilterBar.js');
      const html = createFilterBar();
      expect(html).toContain('element-btn');
    });
  });

  describe('handleFilterClick', () => {
    it('should be callable', async () => {
      const { handleFilterClick } = await import('../../../src/components/FilterBar.js');
      expect(typeof handleFilterClick).toBe('function');
    });
  });

  describe('handleSortClick', () => {
    it('should be callable', async () => {
      const { handleSortClick } = await import('../../../src/components/FilterBar.js');
      expect(typeof handleSortClick).toBe('function');
    });
  });

  describe('handleClearFilters', () => {
    it('should be callable', async () => {
      const { handleClearFilters } = await import('../../../src/components/FilterBar.js');
      expect(typeof handleClearFilters).toBe('function');
    });
  });
});
