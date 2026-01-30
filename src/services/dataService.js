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
    tierData: null,
    // Stats-specific caches
    golpes: null,
    astros: null,
    teonitas: null,
    cenarios: null
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
 * Load statistics data (consolidated from multiple JSONs)
 * @returns {Promise<Object>} Statistics data
 */
export async function loadStatistics() {
    if (cache.statistics) {
        return cache.statistics;
    }

    try {
        // Load all stats JSONs in parallel
        const [golpes, astros, teonitas, cenarios] = await Promise.all([
            loadGolpesData(),
            loadAstrosData(),
            loadTeonitasData(),
            loadCenariosData()
        ]);

        const data = {
            golpes,
            astros,
            teonitas,
            cenarios
        };

        cache.statistics = data;
        setStatistics(data);

        return data;
    } catch (err) {
        console.error('Error loading statistics:', err);
        return null;
    }
}

/**
 * Load golpes (moves) cost data
 * @returns {Promise<Object>} Golpes data
 */
export async function loadGolpesData() {
    if (cache.golpes) return cache.golpes;

    try {
        const res = await fetch('data/stats/golpes.json');
        cache.golpes = await res.json();
        return cache.golpes;
    } catch (err) {
        console.error('Error loading golpes data:', err);
        return null;
    }
}

/**
 * Load astros (guest stars) cost data
 * @returns {Promise<Object>} Astros data
 */
export async function loadAstrosData() {
    if (cache.astros) return cache.astros;

    try {
        const res = await fetch('data/stats/astros.json');
        cache.astros = await res.json();
        return cache.astros;
    } catch (err) {
        console.error('Error loading astros data:', err);
        return null;
    }
}

/**
 * Load teonitas (currency) data
 * @returns {Promise<Object>} Teonitas data
 */
export async function loadTeonitasData() {
    if (cache.teonitas) return cache.teonitas;

    try {
        const res = await fetch('data/stats/teonitas.json');
        cache.teonitas = await res.json();
        return cache.teonitas;
    } catch (err) {
        console.error('Error loading teonitas data:', err);
        return null;
    }
}

/**
 * Load cenarios (earnings scenarios) data
 * @returns {Promise<Object>} Cenarios data
 */
export async function loadCenariosData() {
    if (cache.cenarios) return cache.cenarios;

    try {
        const res = await fetch('data/stats/cenarios.json');
        cache.cenarios = await res.json();
        return cache.cenarios;
    } catch (err) {
        console.error('Error loading cenarios data:', err);
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
    cache.golpes = null;
    cache.astros = null;
    cache.teonitas = null;
    cache.cenarios = null;
}
