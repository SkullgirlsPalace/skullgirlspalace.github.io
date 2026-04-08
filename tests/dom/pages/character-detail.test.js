import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('character-detail.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/character-detail.js');
    expect(module).toBeDefined();
  });

  it('should have render function', async () => {
    const module = await import('../../../src/pages/character-detail.js');
    expect(module.render).toBeDefined();
    expect(typeof module.render).toBe('function');
  });

  it('should have init function', async () => {
    const module = await import('../../../src/pages/character-detail.js');
    expect(module.init).toBeDefined();
    expect(typeof module.init).toBe('function');
  });

  it('should have switchTab function', async () => {
    const module = await import('../../../src/pages/character-detail.js');
    expect(module.switchTab).toBeDefined();
    expect(typeof module.switchTab).toBe('function');
  });

  it('should have refreshVariants function', async () => {
    const module = await import('../../../src/pages/character-detail.js');
    expect(module.refreshVariants).toBeDefined();
    expect(typeof module.refreshVariants).toBe('function');
  });
});
