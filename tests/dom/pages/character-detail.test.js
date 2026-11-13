import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock heavy dependencies
vi.mock('../../../src/services/dataService.js', () => ({
  getCharacter: vi.fn(),
  getCharacters: vi.fn(() => null),
}));

vi.mock('../../../src/state/store.js', () => ({
  getState: vi.fn(() => ({
    currentTab: 'builds',
    tabState: { builds: { filters: {}, sort: { field: 'element', direction: 'asc' } } },
    userPreferences: {}
  })),
  setCurrentCharacter: vi.fn(),
  setCurrentTab: vi.fn(),
  setFilters: vi.fn(),
  setSort: vi.fn(),
  resetAllFilters: vi.fn(),
}));

vi.mock('../../../src/config/constants.js', () => ({
  CHARACTER_COLORS: { filia: '#e91e63' },
  CHARACTER_TITLE_COLORS: { filia: '#ee8cba' },
  CHARACTER_ICONS: { filia: 'img/official/Filia_Icon.webp' },
}));

vi.mock('../../../src/utils/formatters.js', () => ({
  getMasteryIcon: vi.fn(() => '🌟'),
}));

vi.mock('../../../src/utils/sorting.js', () => ({
  filterVariants: vi.fn(v => v),
  sortVariants: vi.fn(v => v),
}));

vi.mock('../../../src/utils/variantUtils.js', () => ({
  flattenVariants: vi.fn(() => []),
}));

vi.mock('../../../src/components/VariantCard.js', () => ({
  renderVariants: vi.fn(),
}));

vi.mock('../../../src/components/FilterBar.js', () => ({
  createFilterBar: vi.fn(() => '<div class="filter-bar-mock"></div>'),
  createSearchBar: vi.fn(() => ''),
  updateFilterUI: vi.fn(),
  updateCharacterNav: vi.fn(),
}));

vi.mock('../../../src/components/TierTable.js', () => ({
  createTierView: vi.fn(() => '<div class="tier-view-mock"></div>'),
}));

vi.mock('../../../src/pages/character-profile.js', () => ({
  renderProfileModal: vi.fn(() => '<div class="profile-modal-mock"></div>'),
}));

vi.mock('../../../src/i18n/index.js', () => {
  const translationMap = {
    'variant.builds': 'BUILDS',
    'variant.tierList': 'TIER LIST',
    'detail.characterNotFound': 'não encontrado',
    'detail.filters': 'Filtros',
    'detail.sortBy': 'Ordenar por',
    'detail.rarity': 'Raridade',
    'detail.element': 'Elemento',
    'variant.class': 'CLASSE',
    'variant.information': 'Informações',
    'profile.critlessRecommended': 'Recomendado Critless',
    'profile.close': 'Fechar',
    'detail.variantsFound': '{count} variantes encontradas',
    'detail.variantsShown': 'Exibindo {shown} de {total}',
    'detail.loadMore': 'Mostrar mais',
  };
  return {
    t: vi.fn((key, vars = {}) => Object.entries(vars).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), translationMap[key] || key)),
    getCurrentLanguage: vi.fn(() => 'pt-BR'),
    getLocalizedNameSync: vi.fn((charKey, fallbackName) => fallbackName || charKey),
    getLocalizedAbilityNameSync: vi.fn((charKey, abilityName, fallback) => fallback || abilityName),
    getLocalizedSADescSync: vi.fn(() => null),
    preloadKrazeteData: vi.fn(() => Promise.resolve()),
  };
});

const mockCharData = {
  character: 'Filia',
  variants: {
    'Dread Locks': {
      element: 'fire',
      tier: 'S',
      palette: 'red',
      unique_ability: false,
      sa1: { name: 'Test SA1', description: 'desc' },
      sa2: { name: 'Test SA2', description: 'desc' },
    }
  }
};

describe('character-detail.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/character-detail.js');
    expect(module).toBeDefined();
  });

  it('should export render, init, and refreshVariants functions', async () => {
    const module = await import('../../../src/pages/character-detail.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
    expect(typeof module.refreshVariants).toBe('function');
  });

  describe('render() - character not found', () => {
    it('should render a "not found" fallback when character data is null', async () => {
      const { getCharacter } = await import('../../../src/services/dataService.js');
      getCharacter.mockReturnValue(null);

      const { render } = await import('../../../src/pages/character-detail.js');
      const html = render('nonexistent');
      document.body.innerHTML = html;

      const section = document.querySelector('.character-detail');
      expect(section).not.toBeNull();

      const h2 = document.querySelector('h2');
      expect(h2.textContent).toContain('não encontrado');
    });
  });

  describe('render() - character found', () => {
    beforeEach(async () => {
      const { getCharacter } = await import('../../../src/services/dataService.js');
      getCharacter.mockReturnValue(mockCharData);

      const { render } = await import('../../../src/pages/character-detail.js');
      const html = render('filia', 'builds');
      document.body.innerHTML = html;
    });

    it('should render the character-detail section', () => {
      const section = document.querySelector('#character-detail');
      expect(section).not.toBeNull();
    });

    it('should display the character name', () => {
      const h1 = document.querySelector('.char-title-row h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent.trim()).toBe('Filia');
    });

    it('should render the BUILDS tab button', () => {
      const buildBtn = document.querySelector('.tab-btn[data-tab="builds"]');
      expect(buildBtn).not.toBeNull();
      expect(buildBtn.textContent.trim()).toBe('BUILDS');
    });

    it('should render the TIER LIST tab button', () => {
      const tierBtn = document.querySelector('.tab-btn[data-tab="tier"]');
      expect(tierBtn).not.toBeNull();
      expect(tierBtn.textContent.trim()).toBe('TIER LIST');
    });

    it('should render the detail content area', () => {
      const content = document.querySelector('#detail-content');
      expect(content).not.toBeNull();
    });

    it('should render the character icon', () => {
      const icon = document.querySelector('.char-select-icon');
      expect(icon).not.toBeNull();
      // alt is populated by getLocalizedNameSync(charKey, charData.character)
      // with mock returning fallbackName, it should be mockCharData.character = 'Filia'
      expect(icon.getAttribute('alt')).toBe('Filia');
    });

    it('should render the back button', () => {
      const backBtn = document.querySelector('.btn-back');
      expect(backBtn).not.toBeNull();
      expect(backBtn.getAttribute('type')).toBe('button');
      expect(backBtn.getAttribute('aria-label')).toBeTruthy();
      expect(backBtn.classList.contains('pill')).toBe(false);
    });

    it('should render the profile/info button', () => {
      const infoBtn = document.querySelector('.char-info-btn-centered');
      expect(infoBtn).not.toBeNull();
    });

    it('defers modal markup until the profile is opened', async () => {
      const { renderProfileModal } = await import('../../../src/pages/character-profile.js');
      expect(renderProfileModal).not.toHaveBeenCalled();
      expect(document.querySelector('#profile-modal-host').dataset.character).toBe('filia');
      expect(document.querySelector('#profile-modal-overlay')).toBeNull();
    });

    it('should set data-current-tab attribute on section', () => {
      const section = document.querySelector('#character-detail');
      expect(section.dataset.currentTab).toBe('builds');
    });
  });

  it('limits the initial catalog to 24 cards and filters across all variants', async () => {
    const { getCharacters } = await import('../../../src/services/dataService.js');
    const { flattenVariants } = await import('../../../src/utils/variantUtils.js');
    const { filterVariants } = await import('../../../src/utils/sorting.js');
    const { renderVariants } = await import('../../../src/components/VariantCard.js');
    const { render, refreshVariants } = await import('../../../src/pages/character-detail.js');
    const variants = Array.from({ length: 55 }, (_, index) => ({ name: `Variant ${index}` }));
    getCharacters.mockReturnValue({ filia: { character: 'Filia', variants: {} } });
    flattenVariants.mockReturnValue(variants);
    document.body.innerHTML = render('todos');
    refreshVariants('todos');
    expect(renderVariants.mock.lastCall[1]).toHaveLength(24);
    expect(document.querySelector('#variants-count').textContent).toBe('55 variantes encontradas');
    expect(document.querySelector('#variants-pagination p').textContent).toBe('Exibindo 24 de 55');

    document.querySelector('#variants-pagination button').click();
    expect(renderVariants.mock.lastCall[1][0].name).toBe('Variant 24');
    expect(renderVariants.mock.lastCall[3]).toEqual({ append: true, indexOffset: 24 });
    expect(document.querySelector('#variants-pagination p').textContent).toBe('Exibindo 48 de 55');

    filterVariants.mockImplementationOnce(items => items.filter(item => item.name === 'Variant 54'));
    refreshVariants('todos');
    expect(renderVariants.mock.lastCall[1]).toHaveLength(1);
    expect(renderVariants.mock.lastCall[1][0].name).toBe('Variant 54');
    expect(document.querySelector('#variants-pagination')).toBeNull();
  });
});
