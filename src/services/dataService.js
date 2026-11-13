// =====================================================
// DATA SERVICE
// Centralized data loading and caching
// =====================================================

import { CHARACTER_FILES } from '../config/constants.js';
import { getCurrentLanguage } from '../i18n/translations.js';
import { setCharacters, setTierData, setCatalysts, setStatistics } from '../state/store.js';

// Cache for loaded data
const cache = {
    characters: null,
    catalysts: null,
    catalysts_en: null,
    fenda: null,
    fenda_en: null,
    statistics: null,
    tierData: null,
    // Stats-specific caches
    golpes: null,
    astros: null,
    teonitas: null,
    disputasPremiadas: null,
    reinosParalelos: null,
    ganhosFixos: null,
    guildas: null,
    extras: null
};

// Share requests while routes/languages change instead of fetching twice.
const pending = new Map();
function once(key, request) {
    if (!pending.has(key)) {
        const promise = request().finally(() => {
            if (pending.get(key) === promise) pending.delete(key);
        });
        pending.set(key, promise);
    }
    return pending.get(key);
}

async function readJSON(filename) {
    const response = await fetch(filename);
    if (response.ok === false) throw new Error(`HTTP ${response.status}: ${filename}`);
    return response.json();
}

/**
 * Load all character data from JSON files
 * @returns {Promise<Object>} Character data keyed by character slug
 */
export async function loadAllCharacters() {
    await Promise.all(CHARACTER_FILES.map(file => loadCharacter(file.replace('.json', '').toLowerCase())));
    return cache.characters || {};
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

    return once(`character:${charKey}`, async () => {
        try {
            const data = await readJSON(`data/${charKey}.json`);
            cache.characters = { ...cache.characters, [charKey]: data };
            setCharacters(cache.characters);
            return data;
        } catch (err) {
            console.error(`Error loading ${charKey}:`, err);
            return null;
        }
    });
}

/**
 * Load tier data from JSON
 * @returns {Promise<Object>} Tier data
 */
export async function loadTierData() {
    if (cache.tierData) {
        return cache.tierData;
    }

    return once('tierData', async () => {
        try {
            cache.tierData = await readJSON('data/tier-data.json');
            setTierData(cache.tierData);
            return cache.tierData;
        } catch (err) {
            console.error('Error loading tier data:', err);
            return {};
        }
    });
}

/**
 * Load catalysts data (language-aware)
 * @returns {Promise<Object>} Catalysts data
 */
export async function loadCatalysts() {
    const lang = getCurrentLanguage();
    const cacheKey = lang === 'en' ? 'catalysts_en' : 'catalysts';

    if (cache[cacheKey]) {
        setCatalysts(cache[cacheKey]);
        return cache[cacheKey];
    }

    const filename = lang === 'en' ? 'data/catalisadores_en.json' : 'data/catalisadores.json';

    return once(cacheKey, async () => {
        try {
            const data = await readJSON(filename);
            cache[cacheKey] = data;
            if (getCurrentLanguage() === lang) setCatalysts(data);
            return data;
        } catch (err) {
            console.error('Error loading catalysts:', err);
            return null;
        }
    });
}

/**
 * Load fenda (rift) data (language-aware)
 * @returns {Promise<Object>} Fenda data
 */
export async function loadFendaData() {
    const lang = getCurrentLanguage();
    const cacheKey = lang === 'en' ? 'fenda_en' : 'fenda';

    if (cache[cacheKey]) return cache[cacheKey];

    const filename = lang === 'en' ? 'data/fenda_en.json' : 'data/fenda.json';

    try {
        const res = await fetch(filename);
        cache[cacheKey] = await res.json();
        return cache[cacheKey];
    } catch (err) {
        console.error('Error loading fenda data:', err);
        return null;
    }
}

/**
 * Load extras data
 * @returns {Promise<Object>} Extras data
 */
export async function loadExtrasData() {
    if (cache.extras) return cache.extras;

    return once('extras', async () => {
        try {
            cache.extras = await readJSON('data/extras.json');
            return cache.extras;
        } catch (err) {
            console.error('Error loading extras data:', err);
            return null;
        }
    });
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
        const [golpes, astros, teonitas, disputasPremiadas, reinosParalelos, ganhosFixos, guildas] = await Promise.all([
            loadGolpesData(),
            loadAstrosData(),
            loadTeonitasData(),
            loadDisputasPremiadasData(),
            loadReinosParalelosData(),
            loadGanhosFixosData(),
            loadGuildasData()
        ]);

        const data = {
            golpes,
            astros,
            teonitas,
            disputasPremiadas,
            reinosParalelos,
            ganhosFixos,
            guildas
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
 * Load disputas premiadas (prize fights) data
 * @returns {Promise<Object>} Disputas Premiadas data
 */
export async function loadDisputasPremiadasData() {
    if (cache.disputasPremiadas) return cache.disputasPremiadas;

    try {
        const res = await fetch('data/stats/disputas_premiadas.json');
        cache.disputasPremiadas = await res.json();
        return cache.disputasPremiadas;
    } catch (err) {
        console.error('Error loading disputas premiadas data:', err);
        return null;
    }
}

/**
 * Load reinos paralelos (parallel realms) data
 * @returns {Promise<Object>} Reinos Paralelos data
 */
export async function loadReinosParalelosData() {
    if (cache.reinosParalelos) return cache.reinosParalelos;

    try {
        const res = await fetch('data/stats/reinos_paralelos.json');
        cache.reinosParalelos = await res.json();
        return cache.reinosParalelos;
    } catch (err) {
        console.error('Error loading reinos paralelos data:', err);
        return null;
    }
}

/**
 * Load ganhos fixos (fixed earnings) data
 * @returns {Promise<Object>} Ganhos Fixos data
 */
export async function loadGanhosFixosData() {
    if (cache.ganhosFixos) return cache.ganhosFixos;

    try {
        const res = await fetch('data/stats/ganhos_fixos.json');
        cache.ganhosFixos = await res.json();
        return cache.ganhosFixos;
    } catch (err) {
        console.error('Error loading ganhos fixos data:', err);
        return null;
    }
}

/**
 * Load guildas (guilds) data
 * @returns {Promise<Object>} Guildas data
 */
export async function loadGuildasData() {
    if (cache.guildas) return cache.guildas;

    try {
        const res = await fetch('data/stats/guildas.json');
        cache.guildas = await res.json();
        return cache.guildas;
    } catch (err) {
        console.error('Error loading guildas data:', err);
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
 * Get extras from cache
 */
export function getExtrasGlobalData() {
    return cache.extras || {};
}

/**
 * Clear all cached data
 */
export function clearCache() {
    pending.clear();
    cache.characters = null;
    cache.catalysts = null;
    cache.catalysts_en = null;
    cache.fenda = null;
    cache.fenda_en = null;
    cache.statistics = null;
    cache.tierData = null;
    cache.golpes = null;
    cache.astros = null;
    cache.teonitas = null;
    cache.disputasPremiadas = null;
    cache.reinosParalelos = null;
    cache.ganhosFixos = null;
    cache.guildas = null;
    cache.extras = null;
}
