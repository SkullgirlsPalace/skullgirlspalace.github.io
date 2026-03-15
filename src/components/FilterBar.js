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
            <!-- Dynamic Filter/Clear Button -->
            <div class="filter-controls">
                <button id="main-filter-btn" class="filter-toggle-btn" onclick="handleMainFilterAction()">
                    <div class="btn-icon-wrapper">
                        <img loading="lazy" class="icon-default" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <img loading="lazy" class="icon-active" src="img/official/constraints_no.webp" alt="">
                    </div>
                    <span class="text-default">Filtrar</span>
                    <span class="text-active">Limpar</span>
                </button>
                <button id="desktop-clear-btn" class="clear-filters-btn" onclick="handleClearFilters()" title="Limpar Filtros">
                    <img loading="lazy" src="img/official/constraints_no.webp" alt="Limpar">
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
                    <div class="vertical-separator" style="height: 30px; margin: 0 12px; width: 1px; background: rgba(255,255,255,0.1);"></div>
                    <div class="sort-group">
                        <button class="sort-btn builds-only active" data-sort="score" onclick="handleSortClick('score')">PONTUAÇÃO</button>
                        <button class="sort-btn builds-only" data-sort="atk" onclick="handleSortClick('atk')">ATAQUE</button>
                        <button class="sort-btn builds-only" data-sort="hp" onclick="handleSortClick('hp')">VIDA</button>
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

    // Dynamic Filter/Clear button logic
    const hasActiveFilters = filters.rarity.length > 0 ||
        filters.element.length > 0 ||
        sort.type !== 'score' ||
        sort.direction !== 'desc';

    const mainBtn = document.getElementById('main-filter-btn');
    const desktopClearBtn = document.getElementById('desktop-clear-btn');

    if (mainBtn) {
        if (hasActiveFilters) {
            mainBtn.classList.add('can-clear');
        } else {
            mainBtn.classList.remove('can-clear');
        }
    }

    if (desktopClearBtn) {
        if (hasActiveFilters) {
            desktopClearBtn.classList.add('visible');
        } else {
            desktopClearBtn.classList.remove('visible');
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
    const char = characters[currentCharKey];
    if (char && currentLabel) {
        const masteryIcon = getMasteryIcon(currentCharKey);
        currentLabel.innerHTML = `
            <img loading="lazy" src="${masteryIcon}" alt="" style="width:24px; height:24px; object-fit:contain;">
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
                <img loading="lazy" src="${mIcon}" alt="" onerror="this.src='img/official/Annie_Icon.webp'">
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

export function handleMainFilterAction() {
    const state = getState();
    const { filters, sort } = state;
    
    const hasActiveFilters = filters.rarity.length > 0 ||
        filters.element.length > 0 ||
        sort.type !== 'score' ||
        sort.direction !== 'desc';

    if (hasActiveFilters && window.innerWidth <= 768) {
        // Only act as CLEAR on mobile
        handleClearFilters();
    } else {
        // Toggle filter panel (if applicable)
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
