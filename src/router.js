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
import { updateNavbarVisibility, updateActiveNavLink } from './components/Navigation.js';
import { setCurrentSection } from './state/store.js';
import { t } from './i18n/index.js';
import { getCharacter } from './services/dataService.js';
import { characterPath, parseSeoPath } from './utils/seoRoutes.js';

const routes = {
    '': home,
    'characters': characters,
    'catalysts': catalysts,
    'tierlist': tierlist,
    'stats': statistics,
    'guide': guide
};

// Current route state
let currentRoute = '';
let currentParams = {};
let currentRouteSource = 'hash';

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

function resolveLocation() {
    if (window.location.hash && window.location.hash !== '#') {
        return { ...parseHash(), source: 'hash' };
    }
    const pathRoute = parseSeoPath(window.location.pathname);
    return pathRoute ? { ...pathRoute, source: 'path' } : { ...parseHash(), source: 'hash' };
}

function setMeta(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
}

function updateCharacterMetadata(charKey, tab, canonicalPath) {
    const character = getCharacter(charKey);
    if (!character?.character) return;

    const name = character.character;
    const title = tab === 'tier'
        ? `Tier List de ${name} | Skullgirls Palace`
        : tab === 'builds'
            ? `Builds de ${name} | Skullgirls Palace`
            : `${name} | Skullgirls Palace`;
    const description = tab === 'tier'
        ? `Tier List de ${name} na wiki de Skullgirls Mobile do Skullgirls Palace.`
        : tab === 'builds'
            ? `Variantes e seção de builds de ${name} na wiki de Skullgirls Mobile do Skullgirls Palace.`
            : `Personagem ${name} e suas variantes na wiki de Skullgirls Mobile do Skullgirls Palace.`;
    const canonical = `${window.location.origin}${canonicalPath}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
}

function resetBaseMetadata() {
    const description = 'Wiki de Skullgirls Mobile com informações de personagens, variantes, builds, tier lists, catalisadores e guias, em português e inglês.';
    const canonical = `${window.location.origin}/`;
    document.title = 'Skullgirls Palace';
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', 'Skullgirls Palace');
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:title"]', 'content', 'Skullgirls Palace');
    setMeta('meta[name="twitter:description"]', 'content', description);
}

/**
 * Navigate to a route
 * @param {string} route - Route path
 * @param {Array} params - Additional parameters
 */
export function navigateTo(route, ...params) {
    const leavingSeoPath = Boolean(parseSeoPath(window.location.pathname));
    const stayingOnCharacterPath = route === 'character' && params[0] && params[0] !== 'todos';
    if (leavingSeoPath && !stayingOnCharacterPath) {
        window.history.pushState(null, '', '/');
    }
    const hash = params.length > 0 ? `${route}/${params.join('/')}` : route;
    window.location.hash = hash;
    if (leavingSeoPath && !hash) handleRouteChange();
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
    const { route, params, source, section } = resolveLocation();
    if (source === 'hash') resetBaseMetadata();
    currentRoute = route;
    currentParams = params;
    currentRouteSource = source;

    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    // Redirect 'characters' directly to all variants view
    if (route === 'characters') {
        window.location.hash = 'character/todos/builds';
        return;
    }

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
        if (source === 'path' && route === 'character' && params[0] !== 'todos') {
            const metadataTab = section === 'character' ? 'character' : (params[1] || 'builds');
            updateCharacterMetadata(params[0], metadataTab, characterPath(params[0], section));
        }
    } catch (err) {
        console.error('Error rendering page:', err);
        appContainer.innerHTML = `
            <div class="error-page">
                <h2>${t('error.pageLoad')}</h2>
                <p>${err.message}</p>
                <button onclick="navigateTo('')">${t('error.backToHome')}</button>
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
    document.getElementById('navOverlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Initialize the router
 */
export function initRouter() {
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    // Re-render current page on language change
    window.addEventListener('languageChanged', () => {
        handleRouteChange();
    });

    // Handle initial route
    handleRouteChange();
}

/**
 * Open character details page
 * @param {string} charKey - Character key
 * @param {string} tab - Initial tab ('builds' or 'tier')
 */
export function openCharacterDetails(charKey, tab = 'builds') {
    if (charKey && charKey !== 'todos') {
        const url = characterPath(charKey, tab);
        window.history.pushState(null, '', url);
        handleRouteChange();
        return;
    }
    navigateTo('character', charKey, tab);
}

/**
 * Open character tier page directly
 * @param {string} charKey - Character key
 */
export function openCharacterTier(charKey) {
    openCharacterDetails(charKey, 'tier');
}

/**
 * Switch tab within character detail
 * @param {string} charKey - Character key
 * @param {string} tab - Tab to switch to
 */
export function switchDetailTab(charKey, tab) {
    if (parseSeoPath(window.location.pathname) && charKey !== 'todos') {
        const section = tab === 'tier' ? 'tier' : 'builds';
        const url = characterPath(charKey, section);
        window.history.pushState(null, '', url);
        currentParams = [charKey, tab];
        updateCharacterMetadata(charKey, tab, url);
    } else {
        // Keep the original hash-based routes available for existing links and sessions.
        window.history.replaceState(null, '', `#character/${charKey}/${tab}`);
    }

    // Call page's tab switch function
    characterDetail.switchTab(charKey, tab);
}
