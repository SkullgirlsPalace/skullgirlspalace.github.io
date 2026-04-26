import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getState,
  get,
  setState,
  subscribe,
  setCharacters,
  setCurrentCharacter,
  setCurrentSection,
  setCurrentTab,
  setFilters,
  toggleFilter,
  clearFilters,
  resetAllFilters,
  setSort,
  toggleSort,
  setTierData,
  setCatalysts,
  setStatistics,
  toggleAboutDrawer,
  toggleMobileMenu,
  toggleFilterBar,
  updateCatalystNote
} from '../../../src/state/store.js';

describe('store.js', () => {
  beforeEach(() => {
    // Reset state by clearing localStorage and setting fresh state
    localStorage.clear();
    // Reset to default state
    setState({
      characters: {},
      catalysts: null,
      statistics: null,
      tierData: {},
      userPreferences: { catalystNotes: {} },
      currentCharacter: null,
      currentSection: 'landing-hub',
      currentTab: 'builds',
      tabState: {
        builds: { filters: { rarity: [], element: [] }, sort: { type: 'score', direction: 'desc' } },
        tier: { filters: { rarity: [], element: [] }, sort: { type: 'class', direction: 'desc' } }
      },
      isFilterBarOpen: false,
      isAboutDrawerOpen: false,
      isMobileMenuOpen: false
    });
  });

  describe('getState', () => {
    it('should return current state object', () => {
      const state = getState();
      expect(state).toBeDefined();
      expect(typeof state).toBe('object');
    });

    it('should return a copy of state', () => {
      const state1 = getState();
      const state2 = getState();
      expect(state1).not.toBe(state2); // Different references
      expect(state1.currentSection).toBe(state2.currentSection); // Same values
    });
  });

  describe('get', () => {
    it('should return specific state property', () => {
      expect(get('currentSection')).toBe('landing-hub');
      expect(get('currentTab')).toBe('builds');
    });

    it('should return undefined for non-existent property', () => {
      expect(get('nonExistent')).toBeUndefined();
    });
  });

  describe('setState', () => {
    it('should update state', () => {
      setState({ currentSection: 'characters' });
      expect(get('currentSection')).toBe('characters');
    });

    it('should not affect other properties', () => {
      setState({ currentSection: 'characters' });
      expect(get('currentTab')).toBe('builds');
    });

    it('should notify subscribers', () => {
      const callback = vi.fn();
      subscribe(callback);
      setState({ currentSection: 'tierlist' });
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('subscribe', () => {
    it('should call callback on state change', () => {
      const callback = vi.fn();
      subscribe(callback);
      setState({ currentCharacter: 'filia' });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should return unsubscribe function', () => {
      const callback = vi.fn();
      const unsubscribe = subscribe(callback);
      expect(typeof unsubscribe).toBe('function');
    });

    it('should stop receiving updates after unsubscribe', () => {
      const callback = vi.fn();
      const unsubscribe = subscribe(callback);
      setState({ currentSection: 'test' });
      expect(callback).toHaveBeenCalledTimes(1);
      unsubscribe();
      setState({ currentSection: 'test2' });
      expect(callback).toHaveBeenCalledTimes(1); // Not called again
    });
  });

  describe('setCharacters', () => {
    it('should set characters data', () => {
      const chars = { filia: { name: 'Filia' } };
      setCharacters(chars);
      expect(get('characters')).toEqual(chars);
    });
  });

  describe('setCurrentCharacter', () => {
    it('should set current character', () => {
      setCurrentCharacter('filia');
      expect(get('currentCharacter')).toBe('filia');
    });
  });

  describe('setCurrentSection', () => {
    it('should set current section', () => {
      setCurrentSection('characters');
      expect(get('currentSection')).toBe('characters');
    });
  });

  describe('setCurrentTab', () => {
    it('should set current tab', () => {
      setCurrentTab('tier');
      expect(get('currentTab')).toBe('tier');
    });
  });

  describe('setFilters', () => {
    it('should set filters for builds tab', () => {
      setCurrentTab('builds');
      setFilters({ rarity: ['diamante'] });
      const state = getState();
      expect(state.tabState.builds.filters.rarity).toContain('diamante');
    });

    it('should set filters for tier tab', () => {
      setCurrentTab('tier');
      setFilters({ element: ['Fogo'] });
      const state = getState();
      expect(state.tabState.tier.filters.element).toContain('Fogo');
    });
  });

  describe('toggleFilter', () => {
    it('should add filter if not present', () => {
      setCurrentTab('builds');
      toggleFilter('rarity', 'diamante');
      const state = getState();
      expect(state.tabState.builds.filters.rarity).toContain('diamante');
    });

    it('should remove filter if already present', () => {
      setCurrentTab('builds');
      toggleFilter('rarity', 'diamante');
      toggleFilter('rarity', 'diamante');
      const state = getState();
      expect(state.tabState.builds.filters.rarity).not.toContain('diamante');
    });
  });

  describe('clearFilters', () => {
    it('should clear all filters for current tab', () => {
      setCurrentTab('builds');
      toggleFilter('rarity', 'diamante');
      toggleFilter('element', 'Fogo');
      clearFilters();
      const state = getState();
      expect(state.tabState.builds.filters.rarity).toEqual([]);
      expect(state.tabState.builds.filters.element).toEqual([]);
    });

    it('should reset sort to default', () => {
      setCurrentTab('builds');
      setSort({ type: 'name', direction: 'asc' });
      clearFilters();
      const state = getState();
      expect(state.tabState.builds.sort.type).toBe('score');
      expect(state.tabState.builds.sort.direction).toBe('desc');
    });
  });

  describe('resetAllFilters', () => {
    it('should reset filters for all tabs', () => {
      toggleFilter('rarity', 'diamante');
      setCurrentTab('tier');
      toggleFilter('element', 'Fogo');
      resetAllFilters();
      const state = getState();
      expect(state.tabState.builds.filters.rarity).toEqual([]);
      expect(state.tabState.tier.filters.element).toEqual([]);
    });
  });

  describe('setSort', () => {
    it('should set sort configuration', () => {
      setCurrentTab('builds');
      setSort({ type: 'name', direction: 'asc' });
      const state = getState();
      expect(state.tabState.builds.sort.type).toBe('name');
      expect(state.tabState.builds.sort.direction).toBe('asc');
    });
  });

  describe('toggleSort', () => {
    it('should toggle direction when same sort type', () => {
      setCurrentTab('builds');
      setSort({ type: 'score', direction: 'desc' });
      toggleSort('score');
      const state = getState();
      expect(state.tabState.builds.sort.direction).toBe('asc');
    });

    it('should change sort type and set default direction', () => {
      setCurrentTab('builds');
      setSort({ type: 'score', direction: 'desc' });
      toggleSort('name');
      const state = getState();
      expect(state.tabState.builds.sort.type).toBe('name');
      expect(state.tabState.builds.sort.direction).toBe('asc');
    });
  });

  describe('setTierData', () => {
    it('should set tier data', () => {
      const tierData = { filia: { tier: 'S' } };
      setTierData(tierData);
      expect(get('tierData')).toEqual(tierData);
    });
  });

  describe('setCatalysts', () => {
    it('should set catalysts data', () => {
      const catalysts = { test: { name: 'Test Catalyst' } };
      setCatalysts(catalysts);
      expect(get('catalysts')).toEqual(catalysts);
    });
  });

  describe('setStatistics', () => {
    it('should set statistics data', () => {
      const stats = { golpes: {} };
      setStatistics(stats);
      expect(get('statistics')).toEqual(stats);
    });
  });

  describe('toggleAboutDrawer', () => {
    it('should toggle about drawer state', () => {
      expect(get('isAboutDrawerOpen')).toBe(false);
      toggleAboutDrawer();
      expect(get('isAboutDrawerOpen')).toBe(true);
      toggleAboutDrawer();
      expect(get('isAboutDrawerOpen')).toBe(false);
    });
  });

  describe('toggleMobileMenu', () => {
    it('should toggle mobile menu state', () => {
      expect(get('isMobileMenuOpen')).toBe(false);
      toggleMobileMenu();
      expect(get('isMobileMenuOpen')).toBe(true);
      toggleMobileMenu();
      expect(get('isMobileMenuOpen')).toBe(false);
    });
  });

  describe('toggleFilterBar', () => {
    it('should toggle filter bar state', () => {
      expect(get('isFilterBarOpen')).toBe(false);
      toggleFilterBar();
      expect(get('isFilterBarOpen')).toBe(true);
    });
  });

  describe('updateCatalystNote', () => {
    it('should update catalyst note in preferences', () => {
      updateCatalystNote('Test Catalyst', 'My note');
      const prefs = get('userPreferences');
      expect(prefs.catalystNotes['Test Catalyst']).toBe('My note');
    });

    it('should persist to localStorage', () => {
      updateCatalystNote('Test Catalyst', 'My note');
      const stored = JSON.parse(localStorage.getItem('SGM_USER_PREFS'));
      expect(stored.catalystNotes['Test Catalyst']).toBe('My note');
    });
  });
});
