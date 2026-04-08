import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  loadAllCharacters,
  loadCharacter,
  loadTierData,
  loadCatalysts,
  loadFendaData,
  loadStatistics,
  loadGolpesData,
  loadAstrosData,
  loadTeonitasData,
  loadDisputasPremiadasData,
  loadReinosParalelosData,
  loadGanhosFixosData,
  loadGuildasData,
  getCharacters,
  getCharacter,
  clearCache
} from '../../../src/services/dataService.js';

// Mock fetch globally
const originalFetch = global.fetch;

describe('dataService.js', () => {
  beforeEach(() => {
    // Reset cache before each test
    clearCache();

    // Mock fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  describe('loadAllCharacters', () => {
    it('should fetch all character files', async () => {
      const mockData = { name: 'Test Character' };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadAllCharacters();

      expect(global.fetch).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should cache results and not refetch', async () => {
      const mockData = { name: 'Test Character' };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      await loadAllCharacters();
      const firstCallCount = global.fetch.mock.calls.length;

      await loadAllCharacters();

      // Should not have made additional calls
      expect(global.fetch.mock.calls.length).toBe(firstCallCount);
    });

    it('should handle fetch errors gracefully', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      const result = await loadAllCharacters();
      // Should not throw, just log warning
      expect(result).toBeDefined();
    });
  });

  describe('loadCharacter', () => {
    it('should fetch single character data', async () => {
      const mockData = { name: 'Filia' };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadCharacter('filia');

      expect(global.fetch).toHaveBeenCalledWith('data/filia.json');
      expect(result).toEqual(mockData);
    });

    it('should return cached data if available', async () => {
      const mockData = { name: 'Filia' };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      await loadCharacter('filia');
      await loadCharacter('filia');

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle errors and return null', async () => {
      global.fetch.mockRejectedValue(new Error('Not found'));

      const result = await loadCharacter('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('loadTierData', () => {
    it('should fetch tier data', async () => {
      const mockData = { filia: { tier: 'S' } };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadTierData();

      expect(global.fetch).toHaveBeenCalledWith('data/tier-data.json');
      expect(result).toEqual(mockData);
    });

    it('should return empty object on error', async () => {
      global.fetch.mockRejectedValue(new Error('Not found'));

      const result = await loadTierData();

      expect(result).toEqual({});
    });
  });

  describe('loadCatalysts', () => {
    it('should fetch catalysts data', async () => {
      const mockData = { catalysts: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadCatalysts();

      expect(global.fetch).toHaveBeenCalledWith('data/catalisadores.json');
      expect(result).toEqual(mockData);
    });

    it('should cache catalysts data', async () => {
      const mockData = { catalysts: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      await loadCatalysts();
      await loadCatalysts();

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadFendaData', () => {
    it('should fetch fenda data', async () => {
      const mockData = { fenda: {} };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadFendaData();

      expect(global.fetch).toHaveBeenCalledWith('data/fenda.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('loadStatistics', () => {
    it('should load all statistics data', async () => {
      const mockData = { data: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadStatistics();

      expect(result).toBeDefined();
      expect(result).toHaveProperty('golpes');
      expect(result).toHaveProperty('astros');
    });

    it('should return object with null values on error', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      const result = await loadStatistics();

      // On error, returns object with null values for each stat type
      expect(result).toBeDefined();
      expect(result.golpes).toBeNull();
      expect(result.astros).toBeNull();
    });
  });

  describe('loadGolpesData', () => {
    it('should fetch golpes data', async () => {
      const mockData = { moves: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadGolpesData();

      expect(global.fetch).toHaveBeenCalledWith('data/stats/golpes.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('loadAstrosData', () => {
    it('should fetch astros data', async () => {
      const mockData = { stars: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadAstrosData();

      expect(global.fetch).toHaveBeenCalledWith('data/stats/astros.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('loadTeonitasData', () => {
    it('should fetch teonitas data', async () => {
      const mockData = { teonitas: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadTeonitasData();

      expect(global.fetch).toHaveBeenCalledWith('data/stats/teonitas.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('loadDisputasPremiadasData', () => {
    it('should fetch disputas premiadas data', async () => {
      const mockData = { prizes: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadDisputasPremiadasData();

      expect(global.fetch).toHaveBeenCalledWith('data/stats/disputas_premiadas.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('loadReinosParalelosData', () => {
    it('should fetch reinos paralelos data', async () => {
      const mockData = { realms: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadReinosParalelosData();

      expect(global.fetch).toHaveBeenCalledWith('data/stats/reinos_paralelos.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('loadGanhosFixosData', () => {
    it('should fetch ganhos fixos data', async () => {
      const mockData = { earnings: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadGanhosFixosData();

      expect(global.fetch).toHaveBeenCalledWith('data/stats/ganhos_fixos.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('loadGuildasData', () => {
    it('should fetch guildas data', async () => {
      const mockData = { guilds: [] };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      const result = await loadGuildasData();

      expect(global.fetch).toHaveBeenCalledWith('data/stats/guildas.json');
      expect(result).toEqual(mockData);
    });
  });

  describe('getCharacters', () => {
    it('should return null when cache is empty', () => {
      expect(getCharacters()).toBeNull();
    });

    it('should return cached characters', async () => {
      const mockData = { name: 'Test' };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      await loadAllCharacters();
      const result = getCharacters();

      expect(result).toBeDefined();
    });
  });

  describe('getCharacter', () => {
    it('should return null for unknown character', () => {
      expect(getCharacter('unknown')).toBeNull();
    });

    it('should return cached character', async () => {
      const mockData = { name: 'Filia' };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      await loadCharacter('filia');
      const result = getCharacter('filia');

      expect(result).toEqual(mockData);
    });
  });

  describe('clearCache', () => {
    it('should clear all cached data', async () => {
      const mockData = { name: 'Test' };
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData)
      });

      await loadCharacter('filia');
      expect(getCharacter('filia')).not.toBeNull();

      clearCache();
      expect(getCharacter('filia')).toBeNull();
    });
  });
});
