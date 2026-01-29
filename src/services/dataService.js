// =====================================================
// DATA SERVICE
// Centralized data loading and caching
// =====================================================

import { CHARACTER_FILES } from '../config/constants.js';
import { setCharacters, setTierData, setCatalysts, setStatistics, loadTierDataFromStorage } from '../state/store.js';

// Cache for loaded data
const cache = {
    characters: null,
    catalysts: null,
    statistics: null,
    tierData: null
};

/**
 * Load all character data from JSON files
 * @returns {Promise<Object>} Character data keyed by character slug
 */
export async function loadAllCharacters() {
    if (cache.characters) {
        return cache.characters;
    }

    const characters = {};

    const promises = CHARACTER_FILES.map(file =>
        fetch(`data/${file}`)
            .then(res => res.json())
            .then(data => {
                const charKey = file.replace('.json', '').toLowerCase();
                characters[charKey] = data;
                return data;
            })
            .catch(err => {
                console.warn(`Error loading ${file}:`, err);
                return null;
            })
    );

    await Promise.all(promises);

    cache.characters = characters;
    setCharacters(characters);

    return characters;
}

/**
 * Load single character data
 * @param {string} charKey - Character key
 * @returns {Promise<Object>} Character data
 */
export async function loadCharacter(charKey) {
    if (cache.characters?.[charKey]) {
        return cache.characters[charKey];
    }

    try {
        const res = await fetch(`data/${charKey}.json`);
        const data = await res.json();

        if (!cache.characters) {
            cache.characters = {};
        }
        cache.characters[charKey] = data;

        return data;
    } catch (err) {
        console.error(`Error loading ${charKey}:`, err);
        return null;
    }
}

/**
 * Load tier data from JSON
 * @returns {Promise<Object>} Tier data
 */
export async function loadTierData() {
    if (cache.tierData) {
        return cache.tierData;
    }

    try {
        const res = await fetch('data/tier-data.json');
        const data = await res.json();

        cache.tierData = data;

        // Merge with localStorage persisted data
        loadTierDataFromStorage();
        setTierData(data);

        return data;
    } catch (err) {
        console.error('Error loading tier data:', err);
        return {};
    }
}

/**
 * Load catalysts data
 * @returns {Promise<Object>} Catalysts data
 */
export async function loadCatalysts() {
    if (cache.catalysts) {
        return cache.catalysts;
    }

    try {
        const res = await fetch('data/catalisadores.json');
        const data = await res.json();

        cache.catalysts = data;
        setCatalysts(data);

        return data;
    } catch (err) {
        console.error('Error loading catalysts:', err);
        return null;
    }
}

/**
 * Load statistics data
 * @returns {Promise<Object>} Statistics data
 */
export async function loadStatistics() {
    if (cache.statistics) {
        return cache.statistics;
    }

    try {
        const res = await fetch('data/estatisticas.json');
        const data = await res.json();

        cache.statistics = data;
        setStatistics(data);

        return data;
    } catch (err) {
        console.error('Error loading statistics:', err);
        return null;
    }
}

/**
 * Get characters from cache (synchronous)
 * @returns {Object|null} Cached characters
 */
export function getCharacters() {
    return cache.characters;
}

/**
 * Get specific character from cache
 * @param {string} charKey - Character key
 * @returns {Object|null} Character data
 */
export function getCharacter(charKey) {
    return cache.characters?.[charKey] || null;
}

/**
 * Clear all cached data
 */
export function clearCache() {
    cache.characters = null;
    cache.catalysts = null;
    cache.statistics = null;
    cache.tierData = null;
}
