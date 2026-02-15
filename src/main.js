// =====================================================
// SKULLGIRLS MOBILE WIKI - MAIN APPLICATION
// Entry point for the modular refactored application
// =====================================================

// Core imports
import { initRouter, navigateTo, openCharacterDetails, openCharacterTier, switchDetailTab } from './router.js';
import { loadAllCharacters, loadTierData } from './services/dataService.js';
import { createNavbar, createAboutDrawer, createScrollNav, scrollToTop, scrollToBottom, handleToggleAboutDrawer, handleToggleMobileMenu, handleToggleDisclaimer } from './components/Navigation.js';
import { handleFilterClick, handleSortClick, handleClearFilters, handleToggleFilter, handleToggleCharDropdown } from './components/FilterBar.js';
import { handleCycleRank, handleToggleCompactMode, handleToggleEditorMode, handleSaveTierData } from './components/TierTable.js';
import { handleCalculateEarnings } from './components/Calculator.js';
import { initAttributeTooltips } from './components/AttributeTooltip.js';
import { refreshVariants } from './pages/character-detail.js';
import { getState } from './state/store.js';

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

// Filter handlers
window.handleFilterClick = handleFilterClick;
window.handleSortClick = handleSortClick;
window.handleClearFilters = handleClearFilters;
window.handleToggleFilter = handleToggleFilter;
window.handleToggleCharDropdown = handleToggleCharDropdown;

// Tier table handlers
window.handleCycleRank = handleCycleRank;
window.handleToggleCompactMode = handleToggleCompactMode;
window.handleToggleEditorMode = handleToggleEditorMode;
window.handleSaveTierData = handleSaveTierData;

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

// ========== CALLBACKS FOR REACTIVE UPDATES ==========

/**
 * Called when filters change - refreshes variant display
 */
window.onFiltersChanged = () => {
    const state = getState();
    if (state.currentCharacter) {
        if (state.currentTab === 'builds') {
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
    console.log('🎮 Skullgirls Mobile Wiki - Initializing...');

    try {
        // Setup static UI elements
        setupStaticUI();

        // Load essential data
        console.log('📦 Loading character data...');
        await loadAllCharacters();

        console.log('📊 Loading tier data...');
        await loadTierData();

        // Initialize router (handles initial route)
        console.log('🧭 Initializing router...');
        initRouter();

        console.log('✅ Application initialized successfully!');
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        document.getElementById('app').innerHTML = `
            <div class="error-page">
                <h2>Erro ao inicializar a aplicação</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()">Recarregar</button>
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

    // Insert scroll navigation
    const scrollNavContainer = document.getElementById('scroll-nav-container');
    if (scrollNavContainer) {
        scrollNavContainer.innerHTML = createScrollNav();
    }

    // Setup scroll listener for navbar visibility
    setupScrollListener();

    // Initialize attribute tooltip system (delegated events)
    initAttributeTooltips();
}

/**
 * Setup scroll event listener for scroll-to-top button
 */
function setupScrollListener() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const scrollBottomBtn = document.getElementById('scrollToBottomBtn');

    if (scrollTopBtn || scrollBottomBtn) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            if (scrollTopBtn) {
                scrollTopBtn.classList.toggle('visible', scrollY > 300);
            }

            if (scrollBottomBtn) {
                scrollBottomBtn.classList.toggle('visible', scrollY < docHeight - windowHeight - 300);
            }
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
