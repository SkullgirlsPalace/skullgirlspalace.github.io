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
    userPreferences: JSON.parse(localStorage.getItem('SGM_USER_PREFS') || '{"catalystNotes":{}}'),

    // UI State
    currentCharacter: null,
    currentSection: 'landing-hub',
    currentTab: 'builds', // 'builds' | 'tier'

    // Tab-Specific Filters & Sorting
    tabState: {
        builds: {
            filters: { rarity: [], element: [], variantClass: [] },
            sort: { type: 'score', direction: 'desc' }
        },
        tier: {
            filters: { rarity: [], element: [], variantClass: [] },
            sort: { type: 'class', direction: 'desc' }
        }
    },

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
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    state.tabState[tab].filters = { ...state.tabState[tab].filters, ...filters };
    notifySubscribers();
}

export function toggleFilter(type, value) {
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    const filterArray = state.tabState[tab].filters[type];
    const index = filterArray.indexOf(value);

    if (index > -1) {
        filterArray.splice(index, 1);
    } else {
        filterArray.push(value);
    }
    notifySubscribers();
}

export function clearFilters() {
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    state.tabState[tab].filters = { rarity: [], element: [], variantClass: [] };
    state.tabState[tab].sort = tab === 'tier' 
        ? { type: 'class', direction: 'desc' }
        : { type: 'score', direction: 'desc' };
    notifySubscribers();
}

/**
 * Resets ALL filters for ALL tabs. Used on character navigation.
 */
export function resetAllFilters() {
    state.tabState.builds.filters = { rarity: [], element: [], variantClass: [] };
    state.tabState.tier.filters = { rarity: [], element: [], variantClass: [] };
    state.tabState.builds.sort = { type: 'score', direction: 'desc' };
    state.tabState.tier.sort = { type: 'class', direction: 'desc' };
    notifySubscribers();
}

export function setSort(sortConfig) {
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    state.tabState[tab].sort = { ...state.tabState[tab].sort, ...sortConfig };
    notifySubscribers();
}

export function toggleSort(sortType) {
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    const currentSort = state.tabState[tab].sort;

    if (currentSort.type === sortType) {
        currentSort.direction = currentSort.direction === 'desc' ? 'asc' : 'desc';
    } else {
        currentSort.type = sortType;
        currentSort.direction = ['name', 'element', 'class'].includes(sortType) ? 'asc' : 'desc';
    }
    notifySubscribers();
}

export function setTierData(tierData) {
    state.tierData = tierData;
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

/**
 * Update user notes for a specific catalyst
 * @param {string} catalystName - Name of the catalyst
 * @param {string} note - User note text
 */
export function updateCatalystNote(catalystName, note) {
    if (!state.userPreferences.catalystNotes) {
        state.userPreferences.catalystNotes = {};
    }
    state.userPreferences.catalystNotes[catalystName] = note;
    localStorage.setItem('SGM_USER_PREFS', JSON.stringify(state.userPreferences));
    // notifySubscribers(); // We may not want to re-render the whole app on keystroke to avoid losing focus
}

