// =====================================================
// FILTER BAR COMPONENT
// Renders filter controls for rarity, element, class, sorting, and search
// =====================================================

import { getState, toggleFilter, toggleSort, clearFilters, toggleFilterBar } from '../state/store.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { getCharacters } from '../services/dataService.js';
import { flattenVariants } from '../utils/sorting.js';
import { getVariantClasses, CLASS_ICONS } from '../data/variantClasses.js';
import { getVariantImage } from '../data/variantImages.js';
import { ELEMENT_MAP, RARITY_ICONS } from '../config/constants.js';
import { EFFECT_DATA } from '../data/effectData.js';

// Debounce timer for search
let searchDebounceTimer = null;
// Store last valid search results
let lastValidResults = [];
let lastValidQuery = '';

/**
 * Create search bar HTML (separate from filter bar for flexible positioning)
 * @returns {string} HTML string
 */
export function createSearchBar() {
    return `
        <div class="search-bar-container" id="search-bar-container">
            <div class="search-input-wrapper">
                <img loading="lazy" src="img/official/ZoomIn.webp" alt="Pesquisar" class="search-icon"
                     onerror="this.style.display='none'">
                <input type="text" id="variant-search-input" class="variant-search-input"
                       placeholder="Pesquisar variante..."
                       oninput="handleSearchInput(this.value)"
                       onfocus="handleSearchFocus()"
                       autocomplete="off" spellcheck="false">
                <button class="search-clear-btn" id="search-clear-btn" onclick="handleSearchClear()" title="Limpar pesquisa">✕</button>
            </div>
            <div class="search-results-dropdown" id="search-results-dropdown"></div>
        </div>
    `;
}

/**
 * Create filter bar HTML
 * @returns {string} HTML string
 */
export function createFilterBar() {
    const buffs = [];
    const debuffs = [];
    for (const [key, data] of Object.entries(EFFECT_DATA)) {
        if (data.icon && (data.type === 'buff' || data.type === 'buff-term')) buffs.push({key, ...data});
        if (data.icon && (data.type === 'debuff' || data.type === 'debuff-term')) debuffs.push({key, ...data});
    }

    const createEffectGrid = (effects, isBuff) => {
        return effects.map(e => `
            <button class="filter-btn effect-btn ${isBuff ? 'buff' : 'debuff'}" 
                data-effect-key="${e.key}" 
                onclick="handleFilterClick('efeitos', '${e.key}')" 
                title="${e.name}">
                <img loading="lazy" src="${e.icon}" alt="${e.name}">
            </button>
        `).join('');
    };

    return `
        <div class="filter-bar">
            <!-- Unified Filter/Clear Button -->
            <div class="filter-controls">
                <button id="main-filter-btn" class="filter-toggle-btn" onclick="handleMainFilterAction()">
                    <div class="btn-icon-wrapper">
                        <img loading="lazy" class="icon-default" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <img loading="lazy" class="icon-active" src="img/official/constraints_no.webp" alt="">
                    </div>
                    <span class="text-default">Filtrar</span>
                    <span class="text-active">Limpar</span>
                </button>
            </div>
            
            <div class="vertical-separator"></div>

            <!-- Collapsible Filter Content -->
            <div class="filter-content" id="filter-content">

                <!-- Rarity Grid (2x2) -->
                <div class="filter-grid rarity-grid">
                    <button class="filter-btn rarity-btn" data-rarity="bronze"
                        onclick="handleFilterClick('rarity', 'bronze')" title="Bronze">
                        <img loading="lazy" src="img/official/icone_bronze.webp" alt="Bronze">
                    </button>
                    <button class="filter-btn rarity-btn" data-rarity="prata"
                        onclick="handleFilterClick('rarity', 'prata')" title="Prata">
                        <img loading="lazy" src="img/official/icone_prata.webp" alt="Prata">
                    </button>
                    <button class="filter-btn rarity-btn" data-rarity="ouro"
                        onclick="handleFilterClick('rarity', 'ouro')" title="Ouro">
                        <img loading="lazy" src="img/official/icone_ouro.webp" alt="Ouro">
                    </button>
                    <button class="filter-btn rarity-btn" data-rarity="diamante"
                        onclick="handleFilterClick('rarity', 'diamante')" title="Diamante">
                        <img loading="lazy" src="img/official/icone_diamante.webp" alt="Diamante">
                    </button>
                </div>

                <div class="vertical-separator"></div>

                <!-- Element Grid (3x2) -->
                <div class="filter-grid element-grid">
                    <button class="filter-btn element-btn" data-element="fogo"
                        onclick="handleFilterClick('element', 'fogo')" title="Fogo">
                        <img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="Fogo">
                    </button>
                    <button class="filter-btn element-btn" data-element="agua"
                        onclick="handleFilterClick('element', 'agua')" title="Água">
                        <img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="Água">
                    </button>
                    <button class="filter-btn element-btn" data-element="ar"
                        onclick="handleFilterClick('element', 'ar')" title="Ar">
                        <img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="Ar">
                    </button>
                    <button class="filter-btn element-btn" data-element="luz"
                        onclick="handleFilterClick('element', 'luz')" title="Luz">
                        <img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="Luz">
                    </button>
                    <button class="filter-btn element-btn" data-element="trevas"
                        onclick="handleFilterClick('element', 'trevas')" title="Trevas">
                        <img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="Trevas">
                    </button>
                    <button class="filter-btn element-btn" data-element="neutro"
                        onclick="handleFilterClick('element', 'neutro')" title="Neutro">
                        <img loading="lazy" src="img/official/ElementalNeutralBackless.webp" alt="Neutro">
                    </button>
                </div>

                <div class="vertical-separator"></div>

                <!-- Sort Section -->
                <div class="filter-section right">
                    <div class="sort-header">
                        <img loading="lazy" src="img/official/icon_sort.webp" onerror="this.style.display='none'" alt="">
                        ORGANIZAR
                    </div>
                    <div class="sort-group">
                        <button class="sort-btn builds-only active" data-sort="score" onclick="handleSortClick('score')">PONTUAÇÃO</button>
                        <button class="sort-btn builds-only" data-sort="atk" onclick="handleSortClick('atk')">ATAQUE</button>
                        <button class="sort-btn builds-only" data-sort="hp" onclick="handleSortClick('hp')">VIDA</button>
                        <button class="sort-btn" data-sort="name" onclick="handleSortClick('name')">ORDEM ALFABÉTICA</button>
                    </div>

                    <!-- Advanced Filters Dropdown -->
                    <div class="advanced-filters-dropdown" id="advanced-filters-dropdown">
                        <button class="advanced-filters-btn" onclick="handleToggleAdvancedFilters()">
                            <img loading="lazy" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                            <span>Filtros Avançados</span>
                            <span class="dropdown-arrow">▼</span>
                        </button>
                        <div class="advanced-filters-content" id="advanced-filters-content">
                            <div class="adv-filter-group">
                                <span class="adv-filter-label">ORDENAR POR</span>
                                <div class="sort-group">
                                    <button class="sort-btn" data-sort="element" onclick="handleSortClick('element')">ELEMENTO</button>
                                    <button class="sort-btn" data-sort="class" onclick="handleSortClick('class')">CATEGORIA</button>
                                </div>
                            </div>
                            <div class="adv-filter-group">
                                <span class="adv-filter-label">FILTRAR POR CLASSE</span>
                                <div class="sort-group">
                                    <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Ofensivo" onclick="handleFilterClick('variantClass', 'Ofensivo')">
                                        <img loading="lazy" src="${CLASS_ICONS['Ofensivo']?.icon}" alt=""> OFENSIVO
                                    </button>
                                    <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Defensivo" onclick="handleFilterClick('variantClass', 'Defensivo')">
                                        <img loading="lazy" src="${CLASS_ICONS['Defensivo']?.icon}" alt=""> DEFENSIVO
                                    </button>
                                    <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Suporte de Utilidade" onclick="handleFilterClick('variantClass', 'Suporte de Utilidade')">
                                        <img loading="lazy" src="${CLASS_ICONS['Suporte de Utilidade']?.icon}" alt=""> SUPORTE
                                    </button>
                                    <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Coringa" onclick="handleFilterClick('variantClass', 'Coringa')">
                                        <img loading="lazy" src="${CLASS_ICONS['Coringa']?.icon}" alt=""> CORINGA
                                    </button>
                                </div>
                            </div>
                            <div class="adv-filter-group" id="adv-filter-effects-pos">
                                <span class="adv-filter-label" style="color: var(--buff-color, #6fbf73); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">EFEITOS POSITIVOS <span>▼</span></span>
                                <div class="filter-grid effects-grid collapsible-content">
                                    ${createEffectGrid(buffs, true)}
                                </div>
                            </div>
                            <div class="adv-filter-group" id="adv-filter-effects-neg">
                                <span class="adv-filter-label" style="color: var(--debuff-color, #f06868); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">EFEITOS NEGATIVOS <span>▼</span></span>
                                <div class="filter-grid effects-grid collapsible-content">
                                    ${createEffectGrid(debuffs, false)}
                                </div>
                            </div>
                            <div class="adv-filter-group" style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
                                <button class="btn btn-secondary" style="width: 100%; font-size: 0.8rem; padding: 8px;" onclick="handleClearAdvancedFilters()">Limpar Filtros Avançados</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="vertical-separator"></div>

                <!-- Character Navigator -->
                <div class="filter-section right character-nav">
                    <div class="sort-header" id="char-nav-header">MUDE O PERSONAGEM</div>
                    <div class="char-dropdown" id="char-dropdown">
                        <button class="char-dropdown-btn" onclick="handleToggleCharDropdown()">
                            <span id="current-char-label">Escolher Personagem</span>
                            <span class="dropdown-arrow">▼</span>
                        </button>
                        <div class="char-dropdown-content" id="char-dropdown-content">
                            <!-- Populated dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update filter UI to reflect current state
 */
export function updateFilterUI() {
    const state = getState();
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    const { filters, sort } = state.tabState[tab];

    // Update Rarity Buttons
    document.querySelectorAll('.rarity-btn').forEach(btn => {
        if (filters.rarity.length > 0 && filters.rarity.includes(btn.dataset.rarity)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Element Buttons
    document.querySelectorAll('.element-btn').forEach(btn => {
        if (filters.element.length > 0 && filters.element.includes(btn.dataset.element)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Class Buttons (new text-based buttons)
    document.querySelectorAll('.class-filter-btn').forEach(btn => {
        const cls = btn.dataset.variantClass;
        if (filters.variantClass && filters.variantClass.length > 0 && filters.variantClass.includes(cls)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Effect Buttons
    document.querySelectorAll('.effect-btn').forEach(btn => {
        const effect = btn.dataset.effectKey;
        if (filters.efeitos && filters.efeitos.length > 0 && filters.efeitos.includes(effect)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Hide effects on tier list
    const posEffectsGrp = document.getElementById('adv-filter-effects-pos');
    const negEffectsGrp = document.getElementById('adv-filter-effects-neg');
    if (tab === 'tier') {
        if (posEffectsGrp) posEffectsGrp.style.display = 'none';
        if (negEffectsGrp) negEffectsGrp.style.display = 'none';
    } else {
        if (posEffectsGrp) posEffectsGrp.style.display = 'flex';
        if (negEffectsGrp) negEffectsGrp.style.display = 'flex';
    }

    // Update Sort Buttons
    const sortLabels = {
        'score': 'PONTUAÇÃO',
        'atk': 'ATAQUE',
        'hp': 'VIDA',
        'name': 'ORDEM ALFABÉTICA',
        'element': 'ELEMENTO',
        'class': 'CATEGORIA'
    };

    const defaultSortType = tab === 'tier' ? 'class' : 'score';
    const defaultSortDir = 'desc';

    document.querySelectorAll('.sort-btn:not(.class-filter-btn)').forEach(btn => {
        btn.classList.remove('active');
        btn.innerText = sortLabels[btn.dataset.sort] || btn.dataset.sort;

        if (btn.dataset.sort === sort.type) {
            if (sort.type !== defaultSortType || sort.direction !== defaultSortDir) {
                btn.classList.add('active');
            }
            const arrow = sort.direction === 'asc' ? ' ↑' : ' ↓';
            btn.innerText += arrow;
        }
    });

    // Unified Filter/Clear button logic
    const hasActiveFilters = filters.rarity.length > 0 ||
        filters.element.length > 0 ||
        (filters.variantClass && filters.variantClass.length > 0) ||
        (filters.efeitos && filters.efeitos.length > 0) ||
        sort.type !== defaultSortType ||
        sort.direction !== defaultSortDir;

    const mainBtn = document.getElementById('main-filter-btn');
    if (mainBtn) {
        if (hasActiveFilters) {
            mainBtn.classList.add('can-clear');
        } else {
            mainBtn.classList.remove('can-clear');
        }
    }
}

/**
 * Update character navigator dropdown
 * @param {string} currentCharKey - Currently selected character
 * @param {string} currentTab - Current tab ('builds' or 'tier')
 */
export function updateCharacterNav(currentCharKey, currentTab = 'builds') {
    const dropdownContent = document.getElementById('char-dropdown-content');
    const currentLabel = document.getElementById('current-char-label');
    const characters = getCharacters();

    if (!dropdownContent || !characters) return;

    // Update the button label with the current character
    if (currentCharKey === 'todos') {
        if (currentLabel) {
            currentLabel.innerHTML = `📋 Todos os Perso.`;
        }
    } else {
        const char = characters[currentCharKey];
        if (char && currentLabel) {
            const masteryIcon = getMasteryIcon(currentCharKey);
            currentLabel.innerHTML = `
                <img loading="lazy" src="${masteryIcon}" alt="" style="width:24px; height:24px; object-fit:contain;">
                ${char.character}
            `;
        }
    }

    // Populate the dropdown list
    const sortedCharKeys = Object.keys(characters).sort((a, b) => {
        return characters[a].character.localeCompare(characters[b].character);
    });

    // Add "Todos" option first
    let dropdownHTML = `
        <button class="char-dropdown-item todos-item ${currentCharKey === 'todos' ? 'active' : ''}" 
                onclick="openCharacterDetails('todos', '${currentTab}'); handleToggleCharDropdown();">
            <span class="todos-icon">📋</span>
            <span>Todos os Perso.</span>
        </button>
        <div class="char-dropdown-divider"></div>
    `;

    dropdownHTML += sortedCharKeys.map(charKey => {
        const charData = characters[charKey];
        const mIcon = getMasteryIcon(charKey);
        const activeClass = charKey === currentCharKey ? 'active' : '';

        return `
            <button class="char-dropdown-item ${activeClass}" 
                    onclick="openCharacterDetails('${charKey}', '${currentTab}'); handleToggleCharDropdown();">
                <img loading="lazy" src="${mIcon}" alt="" onerror="this.src='img/official/Annie_Icon.webp'">
                <span>${charData.character}</span>
            </button>
        `;
    }).join('');

    dropdownContent.innerHTML = dropdownHTML;
}

// ========== SEARCH FUNCTIONS ==========

/**
 * Normalize text for search (remove accents, lowercase)
 */
function normalizeText(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Highlight matching text with green color
 */
function highlightMatch(text, query) {
    if (!query || query.length < 2) return text;
    const normalizedText = normalizeText(text);
    const normalizedQuery = normalizeText(query);
    const idx = normalizedText.indexOf(normalizedQuery);
    if (idx === -1) return text;
    const before = text.substring(0, idx);
    const match = text.substring(idx, idx + query.length);
    const after = text.substring(idx + query.length);
    return `${before}<span class="search-match-highlight">${match}</span>${after}`;
}

/**
 * Handle search input with debounce
 */
export function handleSearchInput(query) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        performSearch(query);
    }, 150);
}

/**
 * Perform the actual search
 */
function performSearch(query) {
    const resultsContainer = document.getElementById('search-results-dropdown');
    const clearBtn = document.getElementById('search-clear-btn');

    if (!query || query.trim().length < 2) {
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.remove('active');
        }
        if (clearBtn) clearBtn.style.display = 'none';
        lastValidResults = [];
        lastValidQuery = '';
        return;
    }

    if (clearBtn) clearBtn.style.display = 'flex';

    const characters = getCharacters();
    if (!characters) return;

    const normalizedQuery = normalizeText(query.trim());
    const results = [];

    for (const [charKey, charData] of Object.entries(characters)) {
        const variants = flattenVariants(charData.variants);
        for (const variant of variants) {
            const normalizedName = normalizeText(variant.name);
            const normalizedChar = normalizeText(charData.character);
            
            // Search by variant name or character name
            if (normalizedName.includes(normalizedQuery) || normalizedChar.includes(normalizedQuery)) {
                results.push({
                    ...variant,
                    _charKey: charKey,
                    _charName: charData.character
                });
            }
        }
    }

    // If results found, update last valid; if not, show last valid results
    if (results.length > 0) {
        lastValidResults = results.slice(0, 15);
        lastValidQuery = query.trim();
        renderSearchResults(lastValidResults, resultsContainer, query.trim());
    } else if (lastValidResults.length > 0) {
        // Keep showing last valid results when current query has no matches
        renderSearchResults(lastValidResults, resultsContainer, lastValidQuery);
    } else {
        renderSearchResults([], resultsContainer, query.trim());
    }
}

/**
 * Render search results in the dropdown
 */
function renderSearchResults(results, container, query = '') {
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-no-results">
                <span>Nenhuma variante encontrada</span>
            </div>
        `;
        container.classList.add('active');
        return;
    }

    container.innerHTML = results.map(variant => {
        const elementInfo = ELEMENT_MAP[variant.element] || {};
        const rarityIcon = RARITY_ICONS[variant.rarityKey] || '';
        const portraitUrl = getVariantImage(variant._charKey, variant.name, 0);
        const highlightedName = highlightMatch(variant.name, query);

        return `
            <button class="search-result-item" onclick="handleSearchResultClick('${variant._charKey}', '${variant.name.replace(/'/g, "\\'")}')">
                <img loading="lazy" src="${portraitUrl}" alt="${variant.name}" class="search-result-portrait"
                     onerror="this.src='img/official/Annie_Icon.webp'">
                <div class="search-result-info">
                    <span class="search-result-name">${highlightedName}</span>
                    <span class="search-result-char">${variant._charName}</span>
                </div>
                <div class="search-result-badges">
                    ${elementInfo.iconPath ? `<img loading="lazy" src="${elementInfo.iconPath}" alt="${variant.element}" class="search-result-element">` : ''}
                    ${rarityIcon ? `<img loading="lazy" src="${rarityIcon}" alt="${variant.rarityKey}" class="search-result-rarity">` : ''}
                </div>
            </button>
        `;
    }).join('');

    container.classList.add('active');
}

/**
 * Handle clicking a search result - navigate and scroll to variant
 */
export function handleSearchResultClick(charKey, variantName) {
    const input = document.getElementById('variant-search-input');
    const dropdown = document.getElementById('search-results-dropdown');

    if (input) input.value = '';
    if (dropdown) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('active');
    }

    const clearBtn = document.getElementById('search-clear-btn');
    if (clearBtn) clearBtn.style.display = 'none';

    lastValidResults = [];
    lastValidQuery = '';

    // Navigate to the character
    if (window.openCharacterDetails) {
        window.openCharacterDetails(charKey, 'builds');
        
        // After navigation, scroll to the specific variant card
        if (variantName) {
            setTimeout(() => {
                const variantCard = document.querySelector(`.variant-card[data-variant-name="${variantName}"]`);
                if (variantCard) {
                    variantCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Flash highlight
                    variantCard.classList.add('search-highlight-flash');
                    setTimeout(() => variantCard.classList.remove('search-highlight-flash'), 2000);
                }
            }, 500);
        }
    }
}

/**
 * Handle search clear button
 */
export function handleSearchClear() {
    const input = document.getElementById('variant-search-input');
    const dropdown = document.getElementById('search-results-dropdown');
    const clearBtn = document.getElementById('search-clear-btn');

    if (input) {
        input.value = '';
        input.focus();
    }
    if (dropdown) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('active');
    }
    if (clearBtn) clearBtn.style.display = 'none';
    lastValidResults = [];
    lastValidQuery = '';
}

/**
 * Handle search input focus - show results if there's text
 */
export function handleSearchFocus() {
    const input = document.getElementById('variant-search-input');
    if (input && input.value.trim().length >= 2) {
        performSearch(input.value);
    }
}

// ========== FILTER HANDLERS ==========

// Global handlers (will be attached to window in main.js)
export function handleFilterClick(type, value) {
    toggleFilter(type, value);
    updateFilterUI();
    if (window.onFiltersChanged) {
        window.onFiltersChanged();
    }
}

export function handleSortClick(sortType) {
    toggleSort(sortType);
    updateFilterUI();
    if (window.onFiltersChanged) {
        window.onFiltersChanged();
    }
}

export function handleClearFilters() {
    clearFilters();
    updateFilterUI();
    if (window.onFiltersChanged) {
        window.onFiltersChanged();
    }
}

export function handleMainFilterAction() {
    const state = getState();
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    const { filters, sort } = state.tabState[tab];
    
    const defaultSortType = tab === 'tier' ? 'class' : 'score';
    const hasActiveFilters = filters.rarity.length > 0 ||
        filters.element.length > 0 ||
        (filters.variantClass && filters.variantClass.length > 0) ||
        (filters.efeitos && filters.efeitos.length > 0) ||
        sort.type !== defaultSortType ||
        sort.direction !== 'desc';

    if (hasActiveFilters) {
        // Clear filters on any screen size when filters are active
        handleClearFilters();
    } else {
        handleToggleFilter();
    }
}

export function handleToggleFilter() {
    const filterContent = document.getElementById('filter-content');
    const filterBtn = document.getElementById('main-filter-btn');
    const filterBar = document.querySelector('.filter-bar');

    if (filterContent) {
        filterContent.classList.toggle('active');
        filterBtn?.classList.toggle('active');
        filterBar?.classList.toggle('active');
    }
}

export function handleToggleCharDropdown() {
    const dropdown = document.getElementById('char-dropdown');
    const content = document.getElementById('char-dropdown-content');
    if (dropdown && content) {
        dropdown.classList.toggle('active');
        content.classList.toggle('active');

        // Scroll to active item if opening
        if (content.classList.contains('active')) {
            const activeItem = content.querySelector('.char-dropdown-item.active');
            if (activeItem) {
                setTimeout(() => {
                    activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }, 50);
            }
        }
    }
}

export function handleToggleAdvancedFilters() {
    const dropdown = document.getElementById('advanced-filters-dropdown');
    const content = document.getElementById('advanced-filters-content');
    if (dropdown && content) {
        dropdown.classList.toggle('active');
        content.classList.toggle('active');
    }
}

// ========== CLOSE DROPDOWNS ON OUTSIDE CLICK / SCROLL ==========
document.addEventListener('click', (e) => {
    // Search
    const searchContainer = document.getElementById('search-bar-container');
    const searchDropdown = document.getElementById('search-results-dropdown');
    if (searchContainer && searchDropdown && !searchContainer.contains(e.target)) {
        searchDropdown.classList.remove('active');
    }

    // Advanced Filters
    const advDropdown = document.getElementById('advanced-filters-dropdown');
    const advContent = document.getElementById('advanced-filters-content');
    if (advDropdown && advContent && !advDropdown.contains(e.target)) {
        advDropdown.classList.remove('active');
        advContent.classList.remove('active');
    }
});

window.addEventListener('scroll', () => {
    // Close advanced filters on scroll
    const advDropdown = document.getElementById('advanced-filters-dropdown');
    const advContent = document.getElementById('advanced-filters-content');
    if (advDropdown && advContent && advContent.classList.contains('active')) {
        advDropdown.classList.remove('active');
        advContent.classList.remove('active');
    }
}, { passive: true });

export function handleClearAdvancedFilters() {
    const state = getState();
    const tab = state.currentTab === 'tier' ? 'tier' : 'builds';
    state.tabState[tab].filters.variantClass = [];
    state.tabState[tab].filters.efeitos = [];
    import('../state/store.js').then(module => module.notifySubscribers());
}
