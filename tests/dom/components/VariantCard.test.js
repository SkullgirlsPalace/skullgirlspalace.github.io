import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('VariantCard.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createVariantCard', () => {
    it.each([
      ['pt-BR', 'Classe principal', 'OFENSIVO', 'Classe secundária', 'SUPORTE'],
      ['en', 'Primary class', 'OFFENSIVE', 'Secondary class', 'SUPPORT']
    ])('distinguishes primary and secondary classes in %s', async (language, primaryLabel, primary, secondaryLabel, secondary) => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const { setLanguage } = await import('../../../src/i18n/index.js');
      try {
        setLanguage(language);
        document.body.innerHTML = createVariantCard({ name: 'Resguardada', element: 'Fogo' }, 'parasoul');
        const classes = document.querySelector('.desktop-classes');
        expect(classes.querySelector('.variant-class-wrapper:not(.secondary-class)').textContent).toContain(primaryLabel);
        expect(classes.querySelector('.variant-class-wrapper:not(.secondary-class)').textContent).toContain(primary);
        expect(classes.querySelector('.secondary-class').textContent).toContain(secondaryLabel);
        expect(classes.querySelector('.secondary-class').textContent).toContain(secondary);
        document.body.innerHTML = createVariantCard({ name: 'G.I. Jazz', element: 'Água' }, 'big-band');
        expect(document.querySelector('.desktop-classes .secondary-class')).toBeNull();
      } finally { setLanguage('pt-BR'); }
    });
    it('also identifies the order in existing extra and guild teams', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const { loadExtrasData } = await import('../../../src/services/dataService.js');
      const { setLanguage } = await import('../../../src/i18n/index.js');
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
        setLanguage('en');
        document.body.innerHTML = createVariantCard({ name: 'Time extra teste', element: 'Fogo' }, 'annie');
        expect(document.querySelector('.extras-sub-tabs').textContent).toContain('General Battles');
        expect(document.querySelector('.extras-section-title').textContent).toContain('RECOMMENDED TEAM');
        expect(document.querySelector('.team-position').textContent).toContain('Front');
      } finally { setLanguage('pt-BR'); vi.unstubAllGlobals(); }
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
      document.body.innerHTML = createVariantCard({ name: 'Test', element: 'Fogo', builds: [{ title: `Ataque d'água "seguro"`, recommended_build: 'ATQ%, Perfuração e Precisão', recommended_arsenal: 'Golpe 1, Golpe 2, Golpe 3, Golpe 4, Golpe 5' }] }, 'annie');
      const button = document.querySelector('.build-pill');
      expect(button.dataset.buildKey).toBe(`Test-Ataque d'água "seguro"`);
      expect(button.getAttribute('onclick')).toBe('switchVariantBuild(this, this.dataset.buildKey)');
      expect(document.querySelector('.build-sub-content').dataset.buildIdx).toBe(button.dataset.buildKey);
    });
    it('shows only builds with five arsenal moves and at least three recommended attributes', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const variant = { name: 'Test', element: 'Fogo', recommended_arsenal: 'A, B, C, D', recommended_build: 'ATQ%, Perfuração e Precisão' };
      document.body.innerHTML = createVariantCard(variant, 'annie');
      expect(document.querySelector('.variant-tab-btn[data-tab="build"]')).toBeNull();

      variant.recommended_arsenal = 'A, B, C, D, E';
      variant.recommended_build = 'ATQ% e Perfuração';
      document.body.innerHTML = createVariantCard(variant, 'annie');
      expect(document.querySelector('.variant-tab-btn[data-tab="build"]')).not.toBeNull();
      expect(document.querySelector('.variant-tab-content[data-tab="build"] .ability-box.build')).toBeNull();
      expect(document.querySelectorAll('.variant-tab-content[data-tab="build"] .arsenal-move')).toHaveLength(5);

      variant.recommended_build = 'ATQ%, Perfuração e Precisão';
      document.body.innerHTML = createVariantCard(variant, 'annie');
      expect(document.querySelector('.variant-tab-content[data-tab="build"] .ability-box.build')).not.toBeNull();
    });
    it('filters incomplete alternative builds and uses a complete main recommendation as fallback', async () => {
      const { createVariantCard } = await import('../../../src/components/VariantCard.js');
      const variant = { name: 'Test', element: 'Fogo', recommended_arsenal: 'A, B, C, D, E', recommended_build: 'ATQ%, Perfuração e Precisão', builds: [
        { title: 'Incomplete', recommended_arsenal: 'A, B, C, D', recommended_build: 'ATQ%, Perfuração e Precisão' },
        { title: 'Complete', recommended_arsenal: 'A, B, C, D, E', recommended_build: 'ATQ% e Perfuração' }
      ] };
      document.body.innerHTML = createVariantCard(variant, 'annie');
      expect([...document.querySelectorAll('.build-pill')].map(button => button.textContent.trim())).toEqual(['COMPLETE']);
      expect(document.querySelector('.build-sub-content .ability-box.build')).toBeNull();
      variant.builds.pop();
      document.body.innerHTML = createVariantCard(variant, 'annie');
      expect(document.querySelectorAll('.build-pill')).toHaveLength(0);
      expect(document.querySelector('.variant-tab-content[data-tab="build"] .ability-box.build')).not.toBeNull();
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
