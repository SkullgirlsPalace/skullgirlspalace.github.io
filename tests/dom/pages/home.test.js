import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('home.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/home.js');
    expect(module).toBeDefined();
  });

  it('should export render and init functions', async () => {
    const module = await import('../../../src/pages/home.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
  });

  describe('render() DOM structure', () => {
    let html;

    beforeEach(async () => {
      const { render } = await import('../../../src/pages/home.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the landing hub section', () => {
      const section = document.querySelector('#landing-hub');
      expect(section).not.toBeNull();
      expect(section.classList.contains('section')).toBe(true);
    });

    it('should render the main h1 title', () => {
      const h1 = document.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent.trim()).toBe('Skullgirls Palace');
    });

    it('should render all 4 navigation buttons', () => {
      const buttons = document.querySelectorAll('.hub-btn');
      expect(buttons.length).toBe(4);
    });

    it('should have a button to navigate to characters', () => {
      const buttons = document.querySelectorAll('.hub-btn');
      const labels = Array.from(buttons).map(b => b.textContent.trim());
      expect(labels).toContain('PERSONAGENS');
    });

    it('should have a button to navigate to guide', () => {
      const buttons = document.querySelectorAll('.hub-btn');
      const labels = Array.from(buttons).map(b => b.textContent.trim());
      expect(labels).toContain('GUIA');
    });

    it('should have a button to navigate to stats (Calculadora)', () => {
      const buttons = document.querySelectorAll('.hub-btn');
      const labels = Array.from(buttons).map(b => b.textContent.trim());
      expect(labels).toContain('CALCULADORA');
    });

    it('should render the hub-menu container', () => {
      const menu = document.querySelector('.hub-menu');
      expect(menu).not.toBeNull();
    });

    it('should render the hub-hero section', () => {
      const hero = document.querySelector('.hub-hero');
      expect(hero).not.toBeNull();
    });

    it('should render the about link', () => {
      const aboutLink = document.querySelector('.hub-about-link');
      expect(aboutLink).not.toBeNull();
    });

    it('should render a subtitle/description paragraph', () => {
      const hero = document.querySelector('.hub-hero');
      const p = hero.querySelector('p');
      expect(p).not.toBeNull();
      expect(p.textContent.length).toBeGreaterThan(10);
    });
  });
});
