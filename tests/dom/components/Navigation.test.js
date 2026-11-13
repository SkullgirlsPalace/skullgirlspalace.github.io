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
      expect(html).toContain('<button class="hamburger"');
      expect(html).toContain('aria-controls="navLinks"');
      expect(html).toContain('aria-controls="languageDropdown"');
    });

    it('opens and closes the mobile navigation with synchronized accessibility state', async () => {
      const { handleToggleMobileMenu } = await import('../../../src/components/Navigation.js');
      document.body.innerHTML = '<button class="hamburger" aria-expanded="false"></button><button id="navOverlay" aria-hidden="true"></button><ul id="navLinks"></ul>';

      handleToggleMobileMenu();
      expect(document.getElementById('navLinks').classList.contains('active')).toBe(true);
      expect(document.getElementById('navOverlay').getAttribute('aria-hidden')).toBe('false');
      expect(document.querySelector('.hamburger').getAttribute('aria-expanded')).toBe('true');
      expect(document.body.style.overflow).toBe('hidden');

      handleToggleMobileMenu();
      expect(document.getElementById('navLinks').classList.contains('active')).toBe(false);
      expect(document.getElementById('navOverlay').getAttribute('aria-hidden')).toBe('true');
      expect(document.querySelector('.hamburger').getAttribute('aria-expanded')).toBe('false');
      expect(document.body.style.overflow).toBe('');
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

  describe('handleSelectLanguage', () => {
    it('switches language in place so the current route can re-render without a page reload', async () => {
      const { handleSelectLanguage } = await import('../../../src/components/Navigation.js');
      const { getCurrentLanguage } = await import('../../../src/i18n/translations.js');
      const previousLanguage = getCurrentLanguage();
      window.location.hash = '#guide';

      handleSelectLanguage('en');

      expect(getCurrentLanguage()).toBe('en');
      expect(window.location.hash).toBe('#guide');
      expect(document.documentElement.lang).toBe('en');
      handleSelectLanguage(previousLanguage);
    });
  });

  describe('handleToggleLanguageMenu', () => {
    it('toggles the language menu and keeps the expanded state current', async () => {
      const { handleToggleLanguageMenu } = await import('../../../src/components/Navigation.js');
      document.body.innerHTML = '<button class="language-btn" aria-expanded="false"></button><div id="languageDropdown"></div>';
      handleToggleLanguageMenu();
      expect(document.getElementById('languageDropdown').classList.contains('active')).toBe(true);
      expect(document.querySelector('.language-btn').getAttribute('aria-expanded')).toBe('true');
      handleToggleLanguageMenu();
      expect(document.getElementById('languageDropdown').classList.contains('active')).toBe(false);
      expect(document.querySelector('.language-btn').getAttribute('aria-expanded')).toBe('false');
    });
  });
});
