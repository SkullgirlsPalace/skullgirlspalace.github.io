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
  CHARACTER_ICONS: { filia: 'img/official/Filia_Icon.webp' },
}));

vi.mock('../../../src/utils/formatters.js', () => ({
  getMasteryIcon: vi.fn(() => '🌟'),
}));

vi.mock('../../../src/utils/sorting.js', () => ({
  flattenVariants: vi.fn(() => []),
  filterVariants: vi.fn(v => v),
  sortVariants: vi.fn(v => v),
}));

vi.mock('../../../src/components/VariantCard.js', () => ({
  renderVariants: vi.fn(),
}));

vi.mock('../../../src/components/FilterBar.js', () => ({
  createFilterBar: vi.fn(() => '<div class="filter-bar-mock"></div>'),
  updateFilterUI: vi.fn(),
  updateCharacterNav: vi.fn(),
}));

vi.mock('../../../src/components/TierTable.js', () => ({
  createTierView: vi.fn(() => '<div class="tier-view-mock"></div>'),
}));

vi.mock('../../../src/pages/character-profile.js', () => ({
  renderProfileModal: vi.fn(() => '<div class="profile-modal-mock"></div>'),
}));

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

    it('should display the character name in uppercase', () => {
      const h2 = document.querySelector('.char-title-centered h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent.trim()).toBe('FILIA');
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
      expect(icon.getAttribute('alt')).toBe('Filia');
    });

    it('should render the back button', () => {
      const backBtn = document.querySelector('.btn-back');
      expect(backBtn).not.toBeNull();
    });

    it('should render the profile/info button', () => {
      const infoBtn = document.querySelector('.char-info-btn-centered');
      expect(infoBtn).not.toBeNull();
    });

    it('should set data-current-tab attribute on section', () => {
      const section = document.querySelector('#character-detail');
      expect(section.dataset.currentTab).toBe('builds');
    });
  });
});
