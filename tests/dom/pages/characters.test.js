import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('characters.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/characters.js');
    expect(module).toBeDefined();
  });

  it('should have render function', async () => {
    const module = await import('../../../src/pages/characters.js');
    expect(module.render).toBeDefined();
    expect(typeof module.render).toBe('function');
  });

  it('should return HTML string from render', async () => {
    const { render } = await import('../../../src/pages/characters.js');
    const html = render();
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(50);
  });

  it('should have init function', async () => {
    const module = await import('../../../src/pages/characters.js');
    expect(module.init).toBeDefined();
    expect(typeof module.init).toBe('function');
  });
});
