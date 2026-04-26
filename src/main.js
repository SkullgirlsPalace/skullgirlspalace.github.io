// =====================================================
// SKULLGIRLS MOBILE WIKI - MAIN APPLICATION
// Entry point for the modular refactored application
// =====================================================

// Core imports
import { initRouter, navigateTo, openCharacterDetails, openCharacterTier, switchDetailTab } from './router.js';
import { loadAllCharacters, loadTierData, loadExtrasData } from './services/dataService.js';
import { createNavbar, createAboutDrawer, createScrollNav, scrollToTop, scrollToBottom, handleToggleAboutDrawer, handleToggleMobileMenu, handleToggleDisclaimer, handleToggleLanguageMenu, handleSelectLanguage } from './components/Navigation.js';
import { createFooter } from './components/Footer.js';
import { handleFilterClick, handleSortClick, handleClearFilters, handleToggleFilter, handleToggleCharDropdown, handleSearchInput, handleSearchClear, handleSearchResultClick, handleSearchFocus, handleMainFilterAction, handleToggleAdvancedFilters } from './components/FilterBar.js';
import { handleCalculateEarnings } from './components/Calculator.js';
import { initAttributeTooltips } from './components/AttributeTooltip.js';

import { refreshVariants } from './pages/character-detail.js';
import { getState } from './state/store.js';
import { setLanguage, getCurrentLanguage, t } from './i18n/index.js';
import { preloadKrazeteData } from './i18n/dataTranslations.js';

// ========== GLOBAL HANDLER REGISTRATION ==========
// These need to be globally accessible for onclick handlers in HTML

window.navigateTo = navigateTo;
window.openCharacterDetails = openCharacterDetails;
window.openCharacterTier = openCharacterTier;
window.switchDetailTab = switchDetailTab;
window.scrollToTop = scrollToTop;
window.scrollToBottom = scrollToBottom;

// Navigation handlers
window.handleToggleAboutDrawer = handleToggleAboutDrawer;
window.handleToggleMobileMenu = handleToggleMobileMenu;
window.handleToggleDisclaimer = handleToggleDisclaimer;

// Language handlers
window.handleToggleLanguageMenu = handleToggleLanguageMenu;
window.handleSelectLanguage = handleSelectLanguage;

// Filter handlers
window.handleFilterClick = handleFilterClick;
window.handleSortClick = handleSortClick;
window.handleClearFilters = handleClearFilters;
window.handleToggleFilter = handleToggleFilter;
window.handleToggleCharDropdown = handleToggleCharDropdown;
window.handleToggleAdvancedFilters = handleToggleAdvancedFilters;

// Search handlers
window.handleSearchInput = handleSearchInput;
window.handleSearchClear = handleSearchClear;
window.handleSearchResultClick = handleSearchResultClick;
window.handleSearchFocus = handleSearchFocus;
window.handleMainFilterAction = handleMainFilterAction;


// Calculator handlers (specific handlers registered by statistics.js init)
window.handleCalculateEarnings = handleCalculateEarnings;


// ========== VARIANT CARD TAB HANDLER ==========
/**
 * Switch between tabs within a variant card (Habilidade, Build, Arsenal)
 * @param {string} cardId - Unique card identifier
 * @param {string} tab - Tab to activate ('habilidade', 'build', 'arsenal')
 */
window.switchVariantTab = function (cardId, tab) {
    // Find the tabs container for this card
    const tabsContainer = document.querySelector(`.variant-tabs[data-card-id="${cardId}"]`);
    const contentsContainer = document.querySelector(`.variant-tab-contents[data-card-id="${cardId}"]`);

    if (!tabsContainer || !contentsContainer) return;

    // Update tab buttons
    tabsContainer.querySelectorAll('.variant-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Update tab contents
    contentsContainer.querySelectorAll('.variant-tab-content').forEach(content => {
        content.classList.toggle('active', content.dataset.tab === tab);
    });
};

// ========== EXTRAS SUB-TAB HANDLER ==========
/**
 * Switch between sub-tabs within the Extras tab
 * @param {string} containerId - Extras container ID
 * @param {string} subTab - Sub-tab to activate ('gerais', 'guildas', 'fenda')
 */
window.switchExtrasSubTab = function (containerId, subTab) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Update sub-tab pills
    container.querySelectorAll('.extras-sub-pill').forEach(pill => {
        const pillTab = pill.textContent.trim().toLowerCase();
        const isActive = (
            (subTab === 'gerais' && pillTab.includes('gerais')) ||
            (subTab === 'guildas' && pillTab.includes('guildas')) ||
            (subTab === 'fenda' && pillTab.includes('fenda'))
        );
        pill.classList.toggle('active', isActive);
    });

    // Update sub-tab contents
    container.querySelectorAll('.extras-sub-content').forEach(content => {
        content.classList.toggle('active', content.dataset.extrasTab === subTab);
    });
};

// ========== EXTRAS COLLAPSIBLE SECTION HANDLER ==========
/**
 * Toggle collapsible extras sections
 * @param {HTMLElement} header - The clicked section header
 */
window.toggleExtrasSection = function (header) {
    header.classList.toggle('collapsed');
};

// ========== CALLBACKS FOR REACTIVE UPDATES ==========

/**
 * Called when filters change - refreshes variant display
 */
window.onFiltersChanged = () => {
    const state = getState();
    if (state.currentCharacter) {
        if (state.currentTab === 'builds' || state.currentCharacter === 'todos') {
            refreshVariants(state.currentCharacter);
        } else if (state.currentTab === 'tier') {
            // Re-render tier view to apply filters
            import('./pages/character-detail.js').then(module => {
                module.switchTab(state.currentCharacter, 'tier');
            });
        }
    }
};

/**
 * Called when tier data changes - re-renders tier table
 */
window.onTierDataChanged = () => {
    const state = getState();
    if (state.currentCharacter) {
        // Re-navigate to same page to refresh
        const hash = window.location.hash;
        if (hash.includes('character/') && hash.includes('/tier')) {
            // Import dynamically to avoid circular dependency
            import('./pages/character-detail.js').then(module => {
                module.switchTab(state.currentCharacter, 'tier');
            });
        }
    }
};

// ========== APPLICATION BOOTSTRAP ==========

/**
 * Initialize the application
 */
async function init() {
    console.log('Skullgirls Palace - init() started');

    try {
        console.log('🏗️ Setting up static UI...');
        setupStaticUI();

        console.log('📦 Loading characters...');
        await loadAllCharacters();
        console.log('✅ Characters loaded');

        console.log('📊 Loading tier data...');
        await loadTierData();
        console.log('✅ Tier data loaded');

        console.log('🌟 Loading extras data...');
        await loadExtrasData();
        console.log('✅ Extras data loaded');

        console.log('🌐 Preloading Krazete translations...');
        try {
            await preloadKrazeteData();
            console.log('✅ Krazete data preloaded');
        } catch (err) {
            console.warn('⚠️ Krazete preload failed (will lazy-load):', err);
        }

        console.log('🧭 Initializing router...');
        initRouter();

        console.log('✨ Application initialization complete!');
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        document.getElementById('app').innerHTML = `
            <div class="error-page">
                <h2>${t('common.initError')}</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()">${t('common.reload')}</button>
            </div>
        `;
    }
}

/**
 * Setup static UI elements (navbar, drawer, scroll nav)
 */
function setupStaticUI() {
    // Insert navbar
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = createNavbar();
    }

    // Insert about drawer
    const drawerContainer = document.getElementById('drawer-container');
    if (drawerContainer) {
        drawerContainer.innerHTML = createAboutDrawer();
    }

    // Insert footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }

    // Insert scroll navigation
    const scrollNavContainer = document.getElementById('scroll-nav-container');
    if (scrollNavContainer) {
        scrollNavContainer.classList.add('scroll-nav');
        scrollNavContainer.innerHTML = createScrollNav();
    }

    // Setup scroll listener for navbar visibility
    setupScrollListener();

    // Initialize attribute tooltip system (delegated events)
    initAttributeTooltips();

    // Re-render static UI on language change
    window.addEventListener('languageChanged', () => {
        const navContainer = document.getElementById('nav-container');
        if (navContainer) navContainer.innerHTML = createNavbar();

        const drawerContainer = document.getElementById('drawer-container');
        if (drawerContainer) drawerContainer.innerHTML = createAboutDrawer();

        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) footerContainer.innerHTML = createFooter();

        const scrollNavContainer = document.getElementById('scroll-nav-container');
        if (scrollNavContainer) {
            scrollNavContainer.classList.add('scroll-nav');
            scrollNavContainer.innerHTML = createScrollNav();
        }

        setupScrollListener();
        initAttributeTooltips();
    });
}

/**
 * Setup scroll event listener for scroll-to-top button
 */
function setupScrollListener() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const scrollBottomBtn = document.getElementById('scrollToBottomBtn');

    if (scrollTopBtn || scrollBottomBtn) {
        const updateScrollButtons = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            if (scrollTopBtn) {
                // Show if scrolled down more than 200px
                scrollTopBtn.classList.toggle('visible', scrollY > 200);
            }

            if (scrollBottomBtn) {
                // Show if not near the bottom and page is actually scrollable
                // Hide completely on the home/initial menu
                const isHome = !window.location.hash || window.location.hash === '#' || window.location.hash === '#/';
                const atBottom = scrollY >= docHeight - windowHeight - 100;
                const isScrollable = docHeight > windowHeight + 100;
                scrollBottomBtn.classList.toggle('visible', !isHome && isScrollable && !atBottom);
            }

            // Floating search bar logic
            const searchBar = document.getElementById('search-bar-container');
            if (searchBar) {
                if (scrollY > 150) {
                    searchBar.classList.add('floating');
                } else {
                    searchBar.classList.remove('floating');
                }
            }
        };

        window.addEventListener('scroll', updateScrollButtons);

        // Run initial check after a short delay (content may load async)
        setTimeout(updateScrollButtons, 500);

        // Also re-check whenever hash changes (page navigation)
        window.addEventListener('hashchange', () => {
            setTimeout(updateScrollButtons, 300);
        });
    }
}

// ========== LAZY LOADING FOR IMAGES ==========

/**
 * Setup Intersection Observer for lazy loading images
 */
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px'
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Setup lazy loading observer globally
window.setupLazyLoading = setupLazyLoading;

// ========== START APPLICATION ==========

// Wait for DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
