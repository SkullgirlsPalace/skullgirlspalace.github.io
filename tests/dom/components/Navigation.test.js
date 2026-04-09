import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Navigation.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('createNavbar', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/Navigation.js');
      expect(module.createNavbar).toBeDefined();
      expect(typeof module.createNavbar).toBe('function');
    });

    it('should return HTML string', async () => {
      const { createNavbar } = await import('../../../src/components/Navigation.js');
      const html = createNavbar();
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(50);
      expect(html).toContain('navbar');
    });
  });

  describe('createAboutDrawer', () => {
    it('should return HTML string', async () => {
      const { createAboutDrawer } = await import('../../../src/components/Navigation.js');
      const html = createAboutDrawer();
      expect(typeof html).toBe('string');
      expect(html).toContain('about-drawer');
    });
  });

  describe('createScrollNav', () => {
    it('should return HTML string', async () => {
      const { createScrollNav } = await import('../../../src/components/Navigation.js');
      const html = createScrollNav();
      expect(typeof html).toBe('string');
      expect(html).toContain('scrollTopBtn');
    });
  });

  describe('createFooter (from Footer.js)', () => {
    it('should return HTML string', async () => {
      const { createFooter } = await import('../../../src/components/Footer.js');
      const html = createFooter();
      expect(typeof html).toBe('string');
      expect(html).toContain('footer');
    });
  });

  describe('scrollToTop', () => {
    it('should be callable', async () => {
      const { scrollToTop } = await import('../../../src/components/Navigation.js');
      expect(typeof scrollToTop).toBe('function');
      scrollToTop(); // Should not throw
    });
  });

  describe('scrollToBottom', () => {
    it('should be callable', async () => {
      const { scrollToBottom } = await import('../../../src/components/Navigation.js');
      expect(typeof scrollToBottom).toBe('function');
      scrollToBottom(); // Should not throw
    });
  });
});
