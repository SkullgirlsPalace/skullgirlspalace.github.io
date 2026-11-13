import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setLanguage } from '../../../src/i18n/translations.js';

describe('AttributeTooltip.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setLanguage('pt-BR');
    document.body.innerHTML = '';
  });

  afterEach(() => setLanguage('pt-BR'));

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

    it('registers delegated events once and dismisses old-language effect details', async () => {
      const { initAttributeTooltips } = await import('../../../src/components/AttributeTooltip.js');
      initAttributeTooltips();
      initAttributeTooltips();
      document.body.innerHTML = '<span class="attr-highlight" data-attr-key="armor">Armadura</span>';
      document.querySelector('.attr-highlight').click();
      expect(document.querySelectorAll('.attr-detail-overlay')).toHaveLength(1);
      expect(document.querySelector('.attr-detail-header').textContent).toContain('Armadura');
      setLanguage('en');
      expect(document.querySelector('.attr-detail-overlay')).toBeNull();
      document.querySelector('.attr-highlight').click();
      expect(document.querySelectorAll('.attr-detail-overlay')).toHaveLength(1);
      expect(document.querySelector('.attr-detail-header').textContent).toContain('Armor');
      expect(document.querySelector('.attr-detail-header').textContent).toContain('Positive Effect');
    });

    it('localizes class names as well as their descriptions', async () => {
      const { initAttributeTooltips } = await import('../../../src/components/AttributeTooltip.js');
      initAttributeTooltips();
      setLanguage('en');
      document.body.innerHTML = '<span class="attr-highlight" data-attr-key="class_Defensivo">Defensive</span>';
      document.querySelector('.attr-highlight').click();
      expect(document.querySelector('.attr-detail-header').textContent).toContain('Defensive');
      expect(document.querySelector('.attr-detail-header').textContent).not.toContain('Defensivo');
    });
  });
});
