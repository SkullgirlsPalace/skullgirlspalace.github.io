// =====================================================
// FILTER BAR COMPONENT
// Renders filter controls for rarity, element, and sorting
// =====================================================

import { getState, toggleFilter, toggleSort, clearFilters, toggleFilterBar } from '../state/store.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { getCharacters } from '../services/dataService.js';

/**
 * Create filter bar HTML
 * @returns {string} HTML string
 */
export function createFilterBar() {
    return `
        <div class="filter-bar">
            <!-- Filter Header & Clear -->
            <div class="filter-controls">
                <button class="filter-toggle-btn" onclick="handleToggleFilter()">
                    <img src="img/icones/icon_filter.png" onerror="this.src='img/icones/filter.png'" alt="">
                    <span>Filtrar</span>
                </button>
                <button class="clear-filters-btn" onclick="handleClearFilters()" title="Limpar Filtros">
                    <img src="img/icones/constraints_no.png" alt="Limpar">
                </button>
            </div>

            <!-- Collapsible Filter Content -->
            <div class="filter-content" id="filter-content">
                <div class="vertical-separator"></div>

                <!-- Rarity Grid (2x2) -->
                <div class="filter-grid rarity-grid">
                    <button class="filter-btn rarity-btn" data-rarity="bronze"
                        onclick="handleFilterClick('rarity', 'bronze')" title="Bronze">
                        <img src="img/icones/icone_bronze.png" alt="Bronze">
                    </button>
                    <button class="filter-btn rarity-btn" data-rarity="prata"
                        onclick="handleFilterClick('rarity', 'prata')" title="Prata">
                        <img src="img/icones/icone_prata.png" alt="Prata">
                    </button>
                    <button class="filter-btn rarity-btn" data-rarity="ouro"
                        onclick="handleFilterClick('rarity', 'ouro')" title="Ouro">
                        <img src="img/icones/icone_ouro.png" alt="Ouro">
                    </button>
                    <button class="filter-btn rarity-btn" data-rarity="diamante"
                        onclick="handleFilterClick('rarity', 'diamante')" title="Diamante">
                        <img src="img/icones/icone_diamante.png" alt="Diamante">
                    </button>
                </div>

                <div class="vertical-separator"></div>

                <!-- Element Grid (3x2) -->
                <div class="filter-grid element-grid">
                    <button class="filter-btn element-btn" data-element="fogo"
                        onclick="handleFilterClick('element', 'fogo')" title="Fogo">
                        <img src="img/icones/ElementalFireBackless.png" alt="Fogo">
                    </button>
                    <button class="filter-btn element-btn" data-element="agua"
                        onclick="handleFilterClick('element', 'agua')" title="Água">
                        <img src="img/icones/ElementalWaterBackless.png" alt="Água">
                    </button>
                    <button class="filter-btn element-btn" data-element="ar"
                        onclick="handleFilterClick('element', 'ar')" title="Ar">
                        <img src="img/icones/ElementalWindBackless.png" alt="Ar">
                    </button>
                    <button class="filter-btn element-btn" data-element="luz"
                        onclick="handleFilterClick('element', 'luz')" title="Luz">
                        <img src="img/icones/ElementalLightBackless.png" alt="Luz">
                    </button>
                    <button class="filter-btn element-btn" data-element="trevas"
                        onclick="handleFilterClick('element', 'trevas')" title="Trevas">
                        <img src="img/icones/ElementalDarkBackless.png" alt="Trevas">
                    </button>
                    <button class="filter-btn element-btn" data-element="neutro"
                        onclick="handleFilterClick('element', 'neutro')" title="Neutro">
                        <img src="img/icones/ElementalNeutralBackless.png" alt="Neutro">
                    </button>
                </div>

                <div class="vertical-separator"></div>

                <!-- Sort Section -->
                <div class="filter-section right">
                    <div class="sort-header">
                        <img src="img/icones/icon_sort.png" onerror="this.style.display='none'" alt="">
                        ORGANIZAR
                    </div>
                    <div class="vertical-separator" style="height: 30px; margin: 0 12px; width: 1px; background: rgba(255,255,255,0.1);"></div>
                    <div class="sort-group">
                        <button class="sort-btn active" data-sort="score" onclick="handleSortClick('score')">PONTUAÇÃO</button>
                        <button class="sort-btn" data-sort="atk" onclick="handleSortClick('atk')">ATAQUE</button>
                        <button class="sort-btn" data-sort="hp" onclick="handleSortClick('hp')">VIDA</button>
                        <button class="sort-btn" data-sort="name" onclick="handleSortClick('name')">ORDEM ALFABÉTICA</button>
                        <button class="sort-btn" data-sort="element" onclick="handleSortClick('element')">ELEMENTO</button>
                        <button class="sort-btn" data-sort="class" onclick="handleSortClick('class')">CATEGORIA</button>
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
    const { filters, sort } = state;

    // Update Rarity Buttons
    document.querySelectorAll('.rarity-btn').forEach(btn => {
        if (filters.rarity.includes(btn.dataset.rarity)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Element Buttons
    document.querySelectorAll('.element-btn').forEach(btn => {
        if (filters.element.includes(btn.dataset.element)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Sort Buttons
    const sortLabels = {
        'score': 'PONTUAÇÃO',
        'atk': 'ATAQUE',
        'hp': 'VIDA',
        'name': 'ORDEM ALFABÉTICA',
        'element': 'ELEMENTO',
        'class': 'CATEGORIA'
    };

    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.innerText = sortLabels[btn.dataset.sort] || btn.dataset.sort;

        if (btn.dataset.sort === sort.type) {
            btn.classList.add('active');
            const arrow = sort.direction === 'asc' ? ' ↑' : ' ↓';
            btn.innerText += arrow;
        }
    });

    // Clear button visibility
    const hasActiveFilters = filters.rarity.length > 0 ||
        filters.element.length > 0 ||
        sort.type !== 'score' ||
        sort.direction !== 'desc';
    const clearBtn = document.querySelector('.clear-filters-btn');
    if (clearBtn) {
        clearBtn.classList.toggle('visible', hasActiveFilters);
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
    const char = characters[currentCharKey];
    if (char && currentLabel) {
        const masteryIcon = getMasteryIcon(currentCharKey);
        currentLabel.innerHTML = `
            <img src="${masteryIcon}" alt="" style="width:24px; height:24px; object-fit:contain;">
            ${char.character}
        `;
    }

    // Populate the dropdown list
    const sortedCharKeys = Object.keys(characters).sort((a, b) => {
        return characters[a].character.localeCompare(characters[b].character);
    });

    dropdownContent.innerHTML = sortedCharKeys.map(charKey => {
        const charData = characters[charKey];
        const mIcon = getMasteryIcon(charKey);
        const activeClass = charKey === currentCharKey ? 'active' : '';

        return `
            <button class="char-dropdown-item ${activeClass}" 
                    onclick="openCharacterDetails('${charKey}', '${currentTab}'); handleToggleCharDropdown();">
                <img src="${mIcon}" alt="" onerror="this.src='img/icones/Annie_Icon.png'">
                <span>${charData.character}</span>
            </button>
        `;
    }).join('');
}

// Global handlers (will be attached to window in main.js)
export function handleFilterClick(type, value) {
    toggleFilter(type, value);
    updateFilterUI();
    // Trigger re-render (will be connected in main.js)
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

export function handleToggleFilter() {
    const filterContent = document.getElementById('filter-content');
    const filterBtn = document.querySelector('.filter-toggle-btn');
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
    }
}
