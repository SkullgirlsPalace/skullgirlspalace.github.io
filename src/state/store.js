// =====================================================
// APPLICATION STATE STORE
// Centralized state management with subscription pattern
// =====================================================

// Initial state
const state = {
    // Data
    characters: {},
    catalysts: null,
    statistics: null,
    tierData: {},

    // UI State
    currentCharacter: null,
    currentSection: 'landing-hub',
    currentTab: 'builds', // 'builds' | 'tier'

    // Filters & Sorting
    filters: {
        rarity: [],
        element: []
    },
    sort: {
        type: 'score',
        direction: 'desc'
    },

    // Editor Mode (for tier list)
    isEditorMode: false,
    isCompactMode: localStorage.getItem('TIER_COMPACT_MODE') === 'true',

    // UI State
    isFilterBarOpen: false,
    isAboutDrawerOpen: false,
    isMobileMenuOpen: false
};

// Subscribers for reactive updates
const subscribers = new Set();

/**
 * Get current state (read-only copy)
 * @returns {Object} Current state
 */
export function getState() {
    return { ...state };
}

/**
 * Get a specific state property
 * @param {string} key - State property name
 * @returns {*} State value
 */
export function get(key) {
    return state[key];
}

/**
 * Update state and notify subscribers
 * @param {Object} updates - Object with state updates
 */
export function setState(updates) {
    Object.assign(state, updates);
    notifySubscribers();
}

/**
 * Subscribe to state changes
 * @param {Function} callback - Function to call on state change
 * @returns {Function} Unsubscribe function
 */
export function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
}

/**
 * Notify all subscribers of state change
 */
function notifySubscribers() {
    subscribers.forEach(callback => callback(state));
}

// ========== SPECIFIC STATE UPDATERS ==========

export function setCharacters(characters) {
    state.characters = characters;
    notifySubscribers();
}

export function setCurrentCharacter(charKey) {
    state.currentCharacter = charKey;
    notifySubscribers();
}

export function setCurrentSection(section) {
    state.currentSection = section;
    notifySubscribers();
}

export function setCurrentTab(tab) {
    state.currentTab = tab;
    notifySubscribers();
}

export function setFilters(filters) {
    state.filters = { ...state.filters, ...filters };
    notifySubscribers();
}

export function toggleFilter(type, value) {
    const filterArray = state.filters[type];
    const index = filterArray.indexOf(value);

    if (index > -1) {
        filterArray.splice(index, 1);
    } else {
        filterArray.push(value);
    }
    notifySubscribers();
}

export function clearFilters() {
    state.filters = { rarity: [], element: [] };
    state.sort = { type: 'score', direction: 'desc' };
    notifySubscribers();
}

export function setSort(sortConfig) {
    state.sort = { ...state.sort, ...sortConfig };
    notifySubscribers();
}

export function toggleSort(sortType) {
    if (state.sort.type === sortType) {
        state.sort.direction = state.sort.direction === 'desc' ? 'asc' : 'desc';
    } else {
        state.sort.type = sortType;
        state.sort.direction = ['name', 'element', 'class'].includes(sortType) ? 'asc' : 'desc';
    }
    notifySubscribers();
}

export function setTierData(tierData) {
    state.tierData = tierData;
    notifySubscribers();
}

/**
 * Update specific character data in state
 * @param {string} charKey - Character key
 * @param {Function} updateFn - Function that takes character object and returns updated object
 */
export function updateCharacterData(charKey, updateFn) {
    if (state.characters[charKey]) {
        state.characters[charKey] = updateFn(state.characters[charKey]);
        notifySubscribers();
    }
}

export function updateTierRank(charKey, variantName, mode, newRank) {
    if (!state.tierData[charKey]) {
        state.tierData[charKey] = {};
    }
    if (!state.tierData[charKey][variantName]) {
        state.tierData[charKey][variantName] = { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' };
    }
    state.tierData[charKey][variantName][mode] = newRank;
    notifySubscribers();
}

export function setEditorMode(enabled) {
    state.isEditorMode = enabled;
    notifySubscribers();
}

export function setCompactMode(enabled) {
    state.isCompactMode = enabled;
    localStorage.setItem('TIER_COMPACT_MODE', enabled);
    notifySubscribers();
}

export function setCatalysts(catalysts) {
    state.catalysts = catalysts;
    notifySubscribers();
}

export function setStatistics(statistics) {
    state.statistics = statistics;
    notifySubscribers();
}

export function toggleAboutDrawer() {
    state.isAboutDrawerOpen = !state.isAboutDrawerOpen;
    notifySubscribers();
}

export function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    notifySubscribers();
}

export function toggleFilterBar() {
    state.isFilterBarOpen = !state.isFilterBarOpen;
    notifySubscribers();
}

// Persistence for tier data
export function saveTierDataToStorage() {
    localStorage.setItem('TIER_DATA_PERSISTED', JSON.stringify(state.tierData));
}

export function loadTierDataFromStorage() {
    try {
        const persisted = localStorage.getItem('TIER_DATA_PERSISTED');
        if (persisted) {
            state.tierData = { ...state.tierData, ...JSON.parse(persisted) };
        }
    } catch (e) {
        console.error('Error loading persisted tier data', e);
    }
}
