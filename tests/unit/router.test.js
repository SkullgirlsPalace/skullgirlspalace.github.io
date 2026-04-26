import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { navigateTo, getCurrentRoute, initRouter, openCharacterDetails, openCharacterTier, switchDetailTab } from '../../src/router.js';

// Mock all page modules
vi.mock('../../src/pages/home.js', () => ({
    render: vi.fn(() => '<div>Home</div>'),
    init: vi.fn()
}));

vi.mock('../../src/pages/characters.js', () => ({
    render: vi.fn(() => '<div>Characters</div>'),
    init: vi.fn()
}));

vi.mock('../../src/pages/character-detail.js', () => ({
    render: vi.fn(() => '<div>Character Detail</div>'),
    init: vi.fn(),
    switchTab: vi.fn()
}));

vi.mock('../../src/pages/catalysts.js', () => ({
    render: vi.fn(() => '<div>Catalysts</div>'),
    init: vi.fn()
}));

vi.mock('../../src/pages/tierlist.js', () => ({
    render: vi.fn(() => '<div>Tierlist</div>'),
    init: vi.fn()
}));

vi.mock('../../src/pages/statistics.js', () => ({
    render: vi.fn(() => '<div>Statistics</div>'),
    init: vi.fn()
}));

vi.mock('../../src/pages/guide.js', () => ({
    render: vi.fn(() => '<div>Guide</div>'),
    init: vi.fn()
}));

vi.mock('../../src/pages/tutorialRendaPassiva.js', () => ({
    render: vi.fn(() => '<div>Tutorial</div>'),
    init: vi.fn()
}));

// Mock Navigation component
vi.mock('../../src/components/Navigation.js', () => ({
    updateNavbarVisibility: vi.fn(),
    updateActiveNavLink: vi.fn()
}));

// Mock store
vi.mock('../../src/state/store.js', () => ({
    setCurrentSection: vi.fn()
}));

describe('router.js', () => {
    let appContainer;

    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks();

        // Setup DOM
        document.body.innerHTML = '<div id="app"></div>';
        appContainer = document.getElementById('app');

        // Reset location hash
        window.location.hash = '';

        // Clear any existing hashchange listeners
        window.removeEventListener('hashchange', () => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
        window.location.hash = '';
    });

    describe('navigateTo', () => {
        it('should set hash to route without params', () => {
            navigateTo('characters');
            expect(window.location.hash).toBe('characters');
        });

        it('should set hash with single param', () => {
            navigateTo('character', 'filia');
            expect(window.location.hash).toBe('character/filia');
        });

        it('should set hash with multiple params', () => {
            navigateTo('character', 'filia', 'tier');
            expect(window.location.hash).toBe('character/filia/tier');
        });

        it('should handle empty route', () => {
            navigateTo('');
            expect(window.location.hash).toBe('');
        });
    });

    describe('getCurrentRoute', () => {
        it('should return default route initially', () => {
            const route = getCurrentRoute();
            expect(route).toHaveProperty('route');
            expect(route).toHaveProperty('params');
        });
    });

    describe('initRouter', () => {
        it('should register hashchange event listener', () => {
            const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
            initRouter();
            expect(addEventListenerSpy).toHaveBeenCalledWith('hashchange', expect.any(Function));
        });

        it('should render home page when no hash', async () => {
            const home = await import('../../src/pages/home.js');
            window.location.hash = '';
            initRouter();
            expect(home.render).toHaveBeenCalled();
        });
    });

    describe('openCharacterDetails', () => {
        it('should navigate to character page with default tab', () => {
            openCharacterDetails('filia');
            expect(window.location.hash).toBe('character/filia/builds');
        });

        it('should navigate to character page with specified tab', () => {
            openCharacterDetails('filia', 'tier');
            expect(window.location.hash).toBe('character/filia/tier');
        });
    });

    describe('openCharacterTier', () => {
        it('should navigate to character tier tab', () => {
            openCharacterTier('peacock');
            expect(window.location.hash).toBe('character/peacock/tier');
        });
    });

    describe('switchDetailTab', () => {
        it('should update URL hash with new tab', async () => {
            const characterDetail = await import('../../src/pages/character-detail.js');

            const replaceStateSpy = vi.spyOn(window.history, 'replaceState');

            switchDetailTab('filia', 'tier');

            expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '#character/filia/tier');
        });

        it('should call characterDetail.switchTab', async () => {
            const characterDetail = await import('../../src/pages/character-detail.js');

            switchDetailTab('filia', 'tier');

            expect(characterDetail.switchTab).toHaveBeenCalledWith('filia', 'tier');
        });
    });
});
