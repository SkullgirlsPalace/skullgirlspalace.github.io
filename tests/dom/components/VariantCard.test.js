import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('VariantCard.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createVariantCard', () => {
    it('also identifies the order in existing extra and guild teams', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const { loadExtrasData } = await import('../../../src/services/dataService.js');
      const members = ['Primeira', 'Segunda', 'Terceira'].map(variant => ({ character: 'annie', variant }));
      vi.stubGlobal('fetch', vi.fn(async () => ({ json: async () => ({ annie: { 'Time extra teste': {
        batalhas_gerais: { time_recomendado: members }, guildas: { available: true, bosses: [{ boss_name: 'Teste', team: members }] }
      } } }) })));
      try {
        await loadExtrasData();
        document.body.innerHTML = createVariantCard({ name: 'Time extra teste', element: 'Fogo' }, 'annie');
        expect(document.querySelectorAll('.extras-container .team-order')).toHaveLength(2);
        for (const grid of document.querySelectorAll('.extras-team-grid')) {
          expect([...grid.querySelectorAll('.team-position')].map(el => el.textContent)).toEqual(['1ª · Frente', '2ª · Meio', '3ª · Última']);
        }
      } finally { vi.unstubAllGlobals(); }
    });
    it('hides legacy labels and shows final ranks with Portuguese effects while preserving English', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const { setLanguage } = await import('../../../src/i18n/index.js');
      const variant = { name: 'Unmapped', element: 'Fogo', signature_ability: { name: 'Test', description: '[hab1]: HEX por 5/10/15 segundos.\n\nSA2: 20/15/10% menos VIDA.' } };
      setLanguage('pt-BR');
      document.body.innerHTML = createVariantCard(variant, 'annie');
      const text = document.querySelector('.ability-box').textContent;
      expect(text).toContain('FEITIÇO por 15 segundos.');
      expect(text).toContain('10% menos VIDA.');
      expect(text).not.toMatch(/HAB\s*[12]|SA\s*[12]|\//i);
      setLanguage('en');
      document.body.innerHTML = createVariantCard(variant, 'annie');
      expect(document.querySelector('.ability-box').textContent).toContain('HEX');
      setLanguage('pt-BR');
    });
    it('keeps quotes in editorial build titles out of inline JavaScript', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      document.body.innerHTML = createVariantCard({ name: 'Test', element: 'Fogo', builds: [{ title: `Ataque d'água "seguro"`, recommended_build: 'Precisão' }] }, 'annie');
      const button = document.querySelector('.build-pill');
      expect(button.dataset.buildKey).toBe(`Test-Ataque d'água "seguro"`);
      expect(button.getAttribute('onclick')).toBe('switchVariantBuild(this, this.dataset.buildKey)');
      expect(document.querySelector('.build-sub-content').dataset.buildIdx).toBe(button.dataset.buildKey);
    });
    it('should be importable', async () => {
      const module = await import('../../../src/components/VariantCard.js');
      expect(module.createVariantCard).toBeDefined();
      expect(typeof module.createVariantCard).toBe('function');
    });

    it('should return HTML string for valid variant', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const variant = {
        name: 'Test Variant',
        element: 'Fogo',
        rarityKey: 'diamante'
      };
      const html = createVariantCard(variant, 'filia', 0);
      expect(typeof html).toBe('string');
    });
  });
});
