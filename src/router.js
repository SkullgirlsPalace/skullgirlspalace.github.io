// =====================================================
// SPA ROUTER
// Hash-based routing for the wiki
// =====================================================

import * as home from './pages/home.js';
import * as characters from './pages/characters.js';
import * as characterDetail from './pages/character-detail.js';
import * as catalysts from './pages/catalysts.js';
import * as tierlist from './pages/tierlist.js';
import * as statistics from './pages/statistics.js';
import * as guide from './pages/guide.js';
import * as tutorialRendaPassiva from './pages/tutorialRendaPassiva.js';
import { updateNavbarVisibility, updateActiveNavLink } from './components/Navigation.js';
import { setCurrentSection } from './state/store.js';

const routes = {
    '': home,
    'characters': characters,
    'catalysts': catalysts,
    'tierlist': tierlist,
    'stats': statistics,
    'guide': guide,
    'tutorial-renda-passiva': tutorialRendaPassiva
};

// Current route state
let currentRoute = '';
let currentParams = {};

/**
 * Parse the current hash into route and params
 * @returns {Object} { route, params }
 */
function parseHash() {
    const hash = window.location.hash.slice(1) || '';
    const parts = hash.split('/');
    const route = parts[0] || '';
    const params = parts.slice(1);

    return { route, params };
}

/**
 * Navigate to a route
 * @param {string} route - Route path
 * @param {Array} params - Additional parameters
 */
export function navigateTo(route, ...params) {
    const hash = params.length > 0 ? `${route}/${params.join('/')}` : route;
    window.location.hash = hash;
}

/**
 * Get current route info
 * @returns {Object} { route, params }
 */
export function getCurrentRoute() {
    return { route: currentRoute, params: currentParams };
}

/**
 * Handle route change
 */
async function handleRouteChange() {
    const { route, params } = parseHash();
    currentRoute = route;
    currentParams = params;

    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    // Determine which page to render
    let pageModule = routes[route];
    let pageParams = params;

    // Handle dynamic routes
    if (route === 'character' && params[0]) {
        pageModule = characterDetail;
        pageParams = params;
    }

    if (!pageModule) {
        // Fallback to home
        pageModule = home;
    }

    // Render the page
    try {
        if (route === 'character' && params[0]) {
            // Character detail page with charKey param
            appContainer.innerHTML = pageModule.render(params[0], params[1] || 'builds');
        } else {
            appContainer.innerHTML = pageModule.render();
        }

        // Initialize the page
        if (pageModule.init) {
            if (route === 'character' && params[0]) {
                await pageModule.init(params[0], params[1] || 'builds');
            } else {
                await pageModule.init();
            }
        }
    } catch (err) {
        console.error('Error rendering page:', err);
        appContainer.innerHTML = `
            <div class="error-page">
                <h2>Erro ao carregar página</h2>
                <p>${err.message}</p>
                <button onclick="navigateTo('')">Voltar ao Início</button>
            </div>
        `;
    }

    // Update navigation state
    setCurrentSection(route || 'landing-hub');
    updateNavbarVisibility(route);
    updateActiveNavLink(route);

    // Scroll to top
    window.scrollTo(0, 0);

    // Close mobile hamburger menu on navigation
    document.getElementById('navLinks')?.classList.remove('active');
}

/**
 * Initialize the router
 */
export function initRouter() {
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);

    // Handle initial route
    handleRouteChange();
}

/**
 * Open character details page
 * @param {string} charKey - Character key
 * @param {string} tab - Initial tab ('builds' or 'tier')
 */
export function openCharacterDetails(charKey, tab = 'builds') {
    navigateTo('character', charKey, tab);
}

/**
 * Open character tier page directly
 * @param {string} charKey - Character key
 */
export function openCharacterTier(charKey) {
    navigateTo('character', charKey, 'tier');
}

/**
 * Switch tab within character detail
 * @param {string} charKey - Character key
 * @param {string} tab - Tab to switch to
 */
export function switchDetailTab(charKey, tab) {
    // Update URL without full page reload
    window.history.replaceState(null, '', `#character/${charKey}/${tab}`);

    // Call page's tab switch function
    characterDetail.switchTab(charKey, tab);
}
