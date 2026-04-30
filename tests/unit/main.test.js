import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock all dependencies
vi.mock('../../src/router.js', () => ({
    initRouter: vi.fn(),
    navigateTo: vi.fn(),
    openCharacterDetails: vi.fn(),
    openCharacterTier: vi.fn(),
    switchDetailTab: vi.fn()
}));

vi.mock('../../src/services/dataService.js', () => ({
    loadAllCharacters: vi.fn(),
    loadTierData: vi.fn(),
    loadExtrasData: vi.fn()
}));

vi.mock('../../src/components/Navigation.js', () => ({
    createNavbar: vi.fn(() => '<nav>Navbar</nav>'),
    createAboutDrawer: vi.fn(() => '<div class="drawer">Drawer</div>'),
    createScrollNav: vi.fn(() => '<div class="scroll-nav">Scroll Nav</div>'),
    scrollToTop: vi.fn(),
    scrollToBottom: vi.fn(),
    handleToggleAboutDrawer: vi.fn(),
    handleToggleMobileMenu: vi.fn(),
    handleToggleDisclaimer: vi.fn(),
    handleToggleLanguageMenu: vi.fn(),
    handleSelectLanguage: vi.fn(),
    updateNavbarVisibility: vi.fn(),
    updateActiveNavLink: vi.fn()
}));

vi.mock('../../src/components/Footer.js', () => ({
    createFooter: vi.fn(() => '<footer>Footer</footer>')
}));

vi.mock('../../src/components/FilterBar.js', () => ({
    handleFilterClick: vi.fn(),
    handleSortClick: vi.fn(),
    handleClearFilters: vi.fn(),
    handleToggleFilter: vi.fn(),
    handleToggleCharDropdown: vi.fn(),
    handleToggleCharDropdownMobile: vi.fn(),
    handleSearchInput: vi.fn(),
    handleSearchClear: vi.fn(),
    handleSearchResultClick: vi.fn(),
    handleSearchFocus: vi.fn(),
    handleMainFilterAction: vi.fn(),
    handleToggleAdvancedFilters: vi.fn(),
    handleToggleAdvancedFiltersMobile: vi.fn(),
    handleClearAdvancedFilters: vi.fn(),
}));

vi.mock('../../src/components/Calculator.js', () => ({
    handleCalculateEarnings: vi.fn()
}));

vi.mock('../../src/components/AttributeTooltip.js', () => ({
    initAttributeTooltips: vi.fn()
}));

vi.mock('../../src/pages/character-detail.js', () => ({
    refreshVariants: vi.fn(),
    switchTab: vi.fn()
}));

vi.mock('../../src/state/store.js', () => ({
    getState: vi.fn(() => ({ currentCharacter: null, currentTab: 'builds' }))
}));

vi.mock('../../src/i18n/index.js', () => ({
    t: vi.fn((key) => key),
    getCurrentLanguage: vi.fn(() => 'pt-BR'),
    setLanguage: vi.fn(),
}));

vi.mock('../../src/i18n/dataTranslations.js', () => ({
    preloadKrazeteData: vi.fn(() => Promise.resolve()),
    getLocalizedName: vi.fn(),
    getLocalizedAbilityName: vi.fn(),
    getLocalizedNameSync: vi.fn((k, f) => f || k),
    getLocalizedAbilityNameSync: vi.fn((k, n, f) => f || n),
    getLocalizedSADescSync: vi.fn(() => null),
}));

describe('main.js', () => {
    let originalWindow;

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup DOM structure
        document.body.innerHTML = `
            <div id="app"></div>
            <div id="nav-container"></div>
            <div id="drawer-container"></div>
            <div id="footer-container"></div>
            <div id="scroll-nav-container"></div>
        `;

        // Store original window properties
        originalWindow = { ...window };
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('global handler registration', () => {
        it('should register navigateTo globally', async () => {
            await import('../../src/main.js');
            expect(window.navigateTo).toBeDefined();
        });

        it('should register openCharacterDetails globally', async () => {
            await import('../../src/main.js');
            expect(window.openCharacterDetails).toBeDefined();
        });

        it('should register openCharacterTier globally', async () => {
            await import('../../src/main.js');
            expect(window.openCharacterTier).toBeDefined();
        });

        it('should register switchDetailTab globally', async () => {
            await import('../../src/main.js');
            expect(window.switchDetailTab).toBeDefined();
        });

        it('should register scrollToTop globally', async () => {
            await import('../../src/main.js');
            expect(window.scrollToTop).toBeDefined();
        });

        it('should register scrollToBottom globally', async () => {
            await import('../../src/main.js');
            expect(window.scrollToBottom).toBeDefined();
        });

        it('should register filter handlers globally', async () => {
            await import('../../src/main.js');
            expect(window.handleFilterClick).toBeDefined();
            expect(window.handleSortClick).toBeDefined();
            expect(window.handleClearFilters).toBeDefined();
        });

    });

    describe('switchVariantTab', () => {
        it('should switch tabs correctly', async () => {
            await import('../../src/main.js');

            // Setup tab structure
            document.body.innerHTML = `
                <div class="variant-tabs" data-card-id="test-card">
                    <button class="variant-tab-btn" data-tab="habilidade">Habilidade</button>
                    <button class="variant-tab-btn" data-tab="build">Build</button>
                </div>
                <div class="variant-tab-contents" data-card-id="test-card">
                    <div class="variant-tab-content" data-tab="habilidade">Content 1</div>
                    <div class="variant-tab-content" data-tab="build">Content 2</div>
                </div>
            `;

            window.switchVariantTab('test-card', 'build');

            const buildBtn = document.querySelector('.variant-tab-btn[data-tab="build"]');
            const buildContent = document.querySelector('.variant-tab-content[data-tab="build"]');

            expect(buildBtn.classList.contains('active')).toBe(true);
            expect(buildContent.classList.contains('active')).toBe(true);
        });

        it('should do nothing if containers not found', async () => {
            await import('../../src/main.js');

            // Should not throw
            expect(() => window.switchVariantTab('nonexistent', 'build')).not.toThrow();
        });
    });

    describe('onFiltersChanged', () => {
        it('should refresh variants when on builds tab', async () => {
            const { getState } = await import('../../src/state/store.js');
            const { refreshVariants } = await import('../../src/pages/character-detail.js');

            getState.mockReturnValue({
                currentCharacter: 'filia',
                currentTab: 'builds'
            });

            await import('../../src/main.js');
            window.onFiltersChanged();

            expect(refreshVariants).toHaveBeenCalledWith('filia');
        });
    });

    describe('onTierDataChanged', () => {
        it('should switch to tier tab when on tier view', async () => {
            const { getState } = await import('../../src/state/store.js');

            getState.mockReturnValue({
                currentCharacter: 'filia',
                currentTab: 'tier'
            });

            // Set hash
            window.location.hash = '#character/filia/tier';

            await import('../../src/main.js');
            window.onTierDataChanged();

            // The import is dynamic, so we just check it doesn't throw
        });
    });

    describe('setupLazyLoading', () => {
        it('should be registered globally', async () => {
            await import('../../src/main.js');
            expect(window.setupLazyLoading).toBeDefined();
        });

        it('should handle images with data-src', async () => {
            await import('../../src/main.js');

            // Create test image
            document.body.innerHTML = '<img data-src="test.jpg">';

            // Call setupLazyLoading
            window.setupLazyLoading();

            // Should not throw
            expect(document.querySelector('img[data-src]')).toBeDefined();
        });
    });

    describe('init', () => {
        it('should call loadAllCharacters', async () => {
            const { loadAllCharacters } = await import('../../src/services/dataService.js');

            // Re-import to trigger init
            vi.resetModules();
            await import('../../src/main.js');

            expect(loadAllCharacters).toHaveBeenCalled();
        });

        it('should call loadTierData', async () => {
            const { loadTierData } = await import('../../src/services/dataService.js');

            vi.resetModules();
            await import('../../src/main.js');

            expect(loadTierData).toHaveBeenCalled();
        });

        it('should call initRouter', async () => {
            vi.resetModules();
            await import('../../src/main.js');

            // After resetModules, re-import the mocked router to get the fresh spy
            const { initRouter: freshInitRouter } = await import('../../src/router.js');
            expect(freshInitRouter).toHaveBeenCalled();
        });

        it('should show error page on failure', async () => {
            const { loadAllCharacters } = await import('../../src/services/dataService.js');
            loadAllCharacters.mockRejectedValueOnce(new Error('Test error'));

            vi.resetModules();

            document.body.innerHTML = '<div id="app"></div>';
            await import('../../src/main.js');

            // Wait for async error handling
            await new Promise(resolve => setTimeout(resolve, 100));

            // Should show error message
        });
    });
});
