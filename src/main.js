// =====================================================
// SKULLGIRLS MOBILE WIKI - MAIN APPLICATION
// Entry point for the modular refactored application
// =====================================================

// Core imports
import { initRouter, navigateTo, openCharacterDetails, openCharacterTier, switchDetailTab } from './router.js';
import { createNavbar, createAboutDrawer, createScrollNav, scrollToTop, scrollToBottom, handleToggleAboutDrawer, handleToggleMobileMenu, handleToggleLanguageMenu, handleSelectLanguage } from './components/Navigation.js';
import { createFooter } from './components/Footer.js';
import { getState } from './state/store.js';
import { t } from './i18n/index.js';

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

// Language handlers
window.handleToggleLanguageMenu = handleToggleLanguageMenu;
window.handleSelectLanguage = handleSelectLanguage;

// Keep template handlers available without downloading the character UI on home.
for (const name of [
    'handleFilterClick', 'handleSortClick', 'handleClearFilters', 'handleToggleFilter',
    'handleToggleCharDropdown', 'handleToggleCharDropdownMobile', 'handleToggleAdvancedFilters',
    'handleToggleAdvancedFiltersMobile', 'handleSearchInput', 'handleSearchClear',
    'handleSearchResultClick', 'handleSearchFocus', 'handleMainFilterAction', 'handleClearAdvancedFilters'
]) {
    window[name] = (...args) => import('./components/FilterBar.js').then(module => module[name](...args));
}


// Calculator handlers (specific handlers registered by statistics.js init)
window.handleCalculateEarnings = (...args) => import('./components/Calculator.js').then(module => module.handleCalculateEarnings(...args));


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
        pill.classList.toggle('active', pill.dataset.extrasTab === subTab);
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
            return import('./pages/character-detail.js').then(module => module.refreshVariants(state.currentCharacter));
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

        console.log('🧭 Initializing router...');
        await initRouter();

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
    });
}

let lastScrollY = window.scrollY;
let removeScrollListener;

/**
 * Setup scroll event listener for scroll-to-top button
 */
function setupScrollListener() {
    removeScrollListener?.();
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const scrollBottomBtn = document.getElementById('scrollToBottomBtn');
    const navbar = document.getElementById('navbar');

    if (scrollTopBtn || scrollBottomBtn || navbar) {
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
                if (scrollY > 150 || window.scrollX > 150) {
                    searchBar.classList.add('floating');
                } else {
                    searchBar.classList.remove('floating');
                }
            }

            // Auto-hide navbar on scroll down, show on scroll up (for mobile)
            if (navbar && window.innerWidth <= 768) {
                const navLinks = document.getElementById('navLinks');
                const overlay = document.getElementById('navOverlay');
                const isMenuOpen = navLinks && navLinks.classList.contains('active');

                // If user scrolls, close mobile menu
                if (isMenuOpen && Math.abs(scrollY - lastScrollY) > 10) {
                    navLinks.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }

                // Hide/show logic
                if (!navbar.classList.contains('hidden-nav')) {
                    if (scrollY > lastScrollY && scrollY > 80) {
                        // Scrolling down - hide
                        navbar.style.transform = 'translateY(-100%)';
                        document.body.classList.add('nav-up');
                    } else if (scrollY < lastScrollY) {
                        // Scrolling up - show
                        navbar.style.transform = 'translateY(0)';
                        document.body.classList.remove('nav-up');
                    }
                }
            } else if (navbar) {
                // Reset for desktop
                navbar.style.transform = '';
                document.body.classList.remove('nav-up');
            }
            lastScrollY = scrollY;
        };

        window.addEventListener('scroll', updateScrollButtons, { passive: true });

        // Run initial check after a short delay (content may load async)
        let timer = setTimeout(updateScrollButtons, 0);

        // Also re-check whenever hash changes (page navigation)
        const onRouteChange = () => {
            clearTimeout(timer);
            timer = setTimeout(updateScrollButtons, 0);
        };
        window.addEventListener('hashchange', onRouteChange);
        removeScrollListener = () => {
            window.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('hashchange', onRouteChange);
            clearTimeout(timer);
        };
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
