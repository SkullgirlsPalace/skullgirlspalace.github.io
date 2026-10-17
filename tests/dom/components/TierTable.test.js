import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TierTable.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTierTable', () => {
    it('clarifies the secondary class without changing rank badges', async () => {
      const { createTierTable } = await import('../../../src/components/TierTable.js');
      const { setLanguage } = await import('../../../src/i18n/index.js');
      try {
        setLanguage('pt-BR');
        document.body.innerHTML = createTierTable('parasoul', { variants: { ouro: [{ name: 'Resguardada', element: 'Fogo' }] } });
        expect(document.querySelector('.tier-class-summary').textContent).toContain('Classe principal: Ofensivo');
        expect(document.querySelector('.tier-secondary-class').textContent).toBe('Também atua como: Suporte de Utilidade');
        expect([...document.querySelectorAll('.rank-badge')].map(item => item.textContent)).toEqual(['B', 'B', 'B', 'B']);
        setLanguage('en');
        document.body.innerHTML = createTierTable('parasoul', { variants: { ouro: [{ name: 'Resguardada', element: 'Fogo' }] } });
        expect(document.querySelector('.tier-secondary-class').textContent).toBe('Also acts as: Utility Support');
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
  });
});
