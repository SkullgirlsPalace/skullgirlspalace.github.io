import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TierTable.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTierTable', () => {
    it('keeps class labels out of variant rows without changing rank badges', async () => {
      const { createTierTable } = await import('../../../src/components/TierTable.js');
      const { setLanguage } = await import('../../../src/i18n/index.js');
      try {
        setLanguage('pt-BR');
        document.body.innerHTML = createTierTable('parasoul', { variants: { ouro: [{ name: 'Resguardada', element: 'Fogo' }] } });
        expect(document.querySelector('.tier-class-summary')).toBeNull();
        expect(document.querySelector('.tier-char-cell span').textContent).toBe('Resguardada');
        expect([...document.querySelectorAll('.rank-badge')].map(item => item.textContent)).toEqual(['B', 'B', 'B', 'B']);
        setLanguage('en');
        document.body.innerHTML = createTierTable('parasoul', { variants: { ouro: [{ name: 'Resguardada', element: 'Fogo' }] } });
        expect(document.querySelector('.tier-class-summary')).toBeNull();
      } finally { setLanguage('pt-BR'); }
    });
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

    it('renders the tier explanations as accessible native buttons', async () => {
      const { createTierView } = await import('../../../src/components/TierTable.js');
      document.body.innerHTML = createTierView('parasoul', { variants: { ouro: [{ name: 'Resguardada', element: 'Fogo' }] } });
      const buttons = [...document.querySelectorAll('.legend-header')];
      expect(buttons).toHaveLength(2);
      expect(buttons.every(button => button.tagName === 'BUTTON')).toBe(true);
      expect(buttons.map(button => button.getAttribute('aria-controls'))).toEqual(['rank-dict', 'class-dict']);
      buttons[0].click();
      expect(document.getElementById('rank-dict').classList.contains('hidden')).toBe(false);
      expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    });

    it('supports mouse drag scrolling and does not bind the same table twice', async () => {
      const { enableTierTableDragScroll } = await import('../../../src/components/TierTable.js');
      document.body.innerHTML = '<div class="tier-table-wrapper"><table class="tier-table"><tr><td>One</td></tr></table></div>';
      const wrapper = document.querySelector('.tier-table-wrapper');
      enableTierTableDragScroll(document);
      enableTierTableDragScroll(document);
      expect(wrapper.dataset.dragScrollBound).toBe('true');

      const pointerEvent = (type, fields) => {
        const event = new Event(type, { bubbles: true, cancelable: true });
        for (const [name, value] of Object.entries(fields)) {
          Object.defineProperty(event, name, { configurable: true, value });
        }
        return event;
      };
      wrapper.dispatchEvent(pointerEvent('pointerdown', { pointerType: 'mouse', button: 0, pointerId: 1, clientX: 120 }));
      wrapper.dispatchEvent(pointerEvent('pointermove', { pointerId: 1, clientX: 60 }));
      expect(wrapper.scrollLeft).toBe(60);
      expect(wrapper.classList.contains('is-dragging')).toBe(true);
      wrapper.dispatchEvent(pointerEvent('pointerup', { pointerId: 1 }));
      expect(wrapper.classList.contains('is-dragging')).toBe(false);
    });
  });
});
