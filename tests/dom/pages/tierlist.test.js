import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('tierlist.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/tierlist.js');
    expect(module).toBeDefined();
  });

  it('should have render function', async () => {
    const module = await import('../../../src/pages/tierlist.js');
    expect(module.render).toBeDefined();
    expect(typeof module.render).toBe('function');
  });

  it('should return HTML string from render', async () => {
    const { render } = await import('../../../src/pages/tierlist.js');
    const html = render();
    expect(typeof html).toBe('string');
  });

  it('should have init function', async () => {
    const module = await import('../../../src/pages/tierlist.js');
    expect(module.init).toBeDefined();
    expect(typeof module.init).toBe('function');
  });
});
