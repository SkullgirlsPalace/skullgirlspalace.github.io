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
        window.location.pathname = '/';
        window.history.replaceState(null, '', '/');
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

        it('returns from a clean character path to the regular all-variants hash route', () => {
            window.location.pathname = '/characters/annie/builds/';
            const pushStateSpy = vi.spyOn(window.history, 'pushState');

            navigateTo('character', 'todos', 'builds');

            expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/');
            expect(window.location.hash).toBe('character/todos/builds');
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
            home.render.mockReturnValue('<section><h1>Skullgirls Palace</h1></section>');
            appContainer.innerHTML = '<h1 id="initial-home-h1">Skullgirls Palace</h1>';
            window.location.hash = '';
            initRouter();
            expect(home.render).toHaveBeenCalled();
            expect(appContainer.querySelector('#initial-home-h1')).toBeNull();
            expect(appContainer.querySelectorAll('h1')).toHaveLength(1);
            expect(appContainer.querySelector('h1').textContent).toBe('Skullgirls Palace');
        });

        it('opens the existing character interface from a clean tier-list path', async () => {
            const characterDetail = await import('../../src/pages/character-detail.js');
            window.location.pathname = '/characters/annie/tier-list/';
            initRouter();
            expect(characterDetail.render).toHaveBeenCalledWith('annie', 'tier');
        });

        it('still resolves the existing hash route', async () => {
            const characterDetail = await import('../../src/pages/character-detail.js');
            window.location.hash = '#character/annie/builds';
            initRouter();
            expect(characterDetail.render).toHaveBeenCalledWith('annie', 'builds');
        });
    });

    describe('openCharacterDetails', () => {
        it('should navigate to character page with default tab', () => {
            const pushStateSpy = vi.spyOn(window.history, 'pushState');
            openCharacterDetails('filia');
            expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/characters/filia/builds/');
        });

        it('should navigate to character page with specified tab', () => {
            const pushStateSpy = vi.spyOn(window.history, 'pushState');
            openCharacterDetails('filia', 'tier');
            expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/characters/filia/tier-list/');
        });
    });

    describe('openCharacterTier', () => {
        it('should navigate to character tier tab', () => {
            const pushStateSpy = vi.spyOn(window.history, 'pushState');
            openCharacterTier('peacock');
            expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/characters/peacock/tier-list/');
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
