// =====================================================
// FILTER BAR COMPONENT
// Renders filter controls for rarity, element, class, sorting, and search
// =====================================================

import { getState, toggleFilter, toggleSort, clearFilters, toggleFilterBar, clearAdvancedFilters } from '../state/store.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { getCharacters } from '../services/dataService.js';
import { flattenVariants } from '../utils/sorting.js';
import { getVariantClasses, getLocalizedClassName, CLASS_ICONS } from '../data/variantClasses.js';
import { getVariantImage } from '../data/variantImages.js';
import { ELEMENT_MAP, RARITY_ICONS, getElementMap, getRarityLabels } from '../config/constants.js';
import { EFFECT_DATA } from '../data/effectData.js';
import { t, getCurrentLanguage } from '../i18n/index.js';

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
                <img loading="lazy" src="img/official/Search.webp" alt="${t('characters.searchPlaceholder')}" class="search-icon"
                     onerror="this.style.display='none'">
                <input type="text" id="variant-search-input" class="variant-search-input"
                       placeholder="${t('characters.searchPlaceholder')}"
                       oninput="handleSearchInput(this.value)"
                       onfocus="handleSearchFocus()"
                       autocomplete="off" spellcheck="false">
                <button class="search-clear-btn" id="search-clear-btn" onclick="handleSearchClear()" title="${t('filter.clear')}">✕</button>
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
        if (data.icon && (data.type === 'buff' || data.type === 'buff-term')) buffs.push({ key, ...data });
        if (data.icon && (data.type === 'debuff' || data.type === 'debuff-term')) debuffs.push({ key, ...data });
    }

    const createEffectGrid = (effects, isBuff) => {
        const lang = getCurrentLanguage();
        return effects.map(e => {
            const displayName = lang === 'en' && e.name_en ? e.name_en : e.name;
            // Get short name (first word or key part)
            const shortName = displayName.split(' ')[0].split('/')[0];
            return `
            <button class="filter-btn effect-btn ${isBuff ? 'buff' : 'debuff'}" 
                data-effect-key="${e.key}" 
                onclick="handleFilterClick('efeitos', '${e.key}')" 
                title="${displayName}">
                <img loading="lazy" src="${e.icon}" alt="${displayName}">
                <span class="effect-label">${displayName}</span>
            </button>
        `;
        }).join('');
    };

    const scoreLabel = t('filter.score').toUpperCase();
    const atkLabel = t('filter.atk').toUpperCase();
    const hpLabel = t('filter.hp').toUpperCase();
    const alphaLabel = t('filter.alpha').toUpperCase();
    const elementLabel = t('filter.element').toUpperCase();
    const categoryLabel = t('filter.category').toUpperCase();

    const rarityGrid = `
        <div class="filter-grid rarity-grid">
            <button class="filter-btn rarity-btn" data-rarity="bronze" onclick="handleFilterClick('rarity', 'bronze')" title="${t('rarity.bronze')}"><img loading="lazy" src="img/official/icone_bronze.webp" alt="${t('rarity.bronze')}"></button>
            <button class="filter-btn rarity-btn" data-rarity="prata" onclick="handleFilterClick('rarity', 'prata')" title="${t('rarity.silver')}"><img loading="lazy" src="img/official/icone_prata.webp" alt="${t('rarity.silver')}"></button>
            <button class="filter-btn rarity-btn" data-rarity="ouro" onclick="handleFilterClick('rarity', 'ouro')" title="${t('rarity.gold')}"><img loading="lazy" src="img/official/icone_ouro.webp" alt="${t('rarity.gold')}"></button>
            <button class="filter-btn rarity-btn" data-rarity="diamante" onclick="handleFilterClick('rarity', 'diamante')" title="${t('rarity.diamond')}"><img loading="lazy" src="img/official/icone_diamante.webp" alt="${t('rarity.diamond')}"></button>
        </div>`;

    const elementGrid = `
        <div class="filter-grid element-grid">
            <button class="filter-btn element-btn" data-element="fogo" onclick="handleFilterClick('element', 'fogo')" title="${t('element.fire')}"><img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${t('element.fire')}"></button>
            <button class="filter-btn element-btn" data-element="agua" onclick="handleFilterClick('element', 'agua')" title="${t('element.water')}"><img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${t('element.water')}"></button>
            <button class="filter-btn element-btn" data-element="ar" onclick="handleFilterClick('element', 'ar')" title="${t('element.wind')}"><img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${t('element.wind')}"></button>
            <button class="filter-btn element-btn" data-element="luz" onclick="handleFilterClick('element', 'luz')" title="${t('element.light')}"><img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${t('element.light')}"></button>
            <button class="filter-btn element-btn" data-element="trevas" onclick="handleFilterClick('element', 'trevas')" title="${t('element.dark')}"><img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${t('element.dark')}"></button>
            <button class="filter-btn element-btn" data-element="neutro" onclick="handleFilterClick('element', 'neutro')" title="${t('element.neutral')}"><img loading="lazy" src="img/official/ElementalNeutralBackless.webp" alt="${t('element.neutral')}"></button>
        </div>`;

    const sortSection = `
        <div class="filter-section center" style="margin: 0 auto; display: flex; align-items: center; gap: 12px;">
            <div class="sort-header">
                <img loading="lazy" src="img/official/icon_sort.webp" onerror="this.style.display='none'" alt="" style="height: 14px; width: auto;">
                ${t('filter.organize')}
            </div>
            <div class="sort-group grid-2x2">
                <button class="sort-btn active" data-sort="score" onclick="handleSortClick('score')">${scoreLabel}</button>
                <button class="sort-btn" data-sort="name" onclick="handleSortClick('name')">${alphaLabel}</button>
                <button class="sort-btn builds-only" data-sort="atk" onclick="handleSortClick('atk')">${atkLabel}</button>
                <button class="sort-btn builds-only" data-sort="hp" onclick="handleSortClick('hp')">${hpLabel}</button>
            </div>
        </div>`;

    const advancedFilters = `
        <div class="filter-section right">
            <div class="advanced-filters-dropdown" id="advanced-filters-dropdown" style="margin-left: 0;">
                <button class="advanced-filters-btn" onclick="handleToggleAdvancedFilters()">
                    <img loading="lazy" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                    <span>${t('detail.filters')}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="advanced-filters-content" id="advanced-filters-content">
                    <div class="adv-filter-group">
                        <span class="adv-filter-label">${t('detail.sortBy')}</span>
                        <div class="sort-group grid-2x2" style="justify-content: flex-start; text-align: left;">
                            <button class="sort-btn" data-sort="element" onclick="handleSortClick('element')">${elementLabel}</button>
                            <button class="sort-btn" data-sort="class" onclick="handleSortClick('class')">${categoryLabel}</button>
                        </div>
                    </div>
                    <div class="adv-filter-group">
                        <span class="adv-filter-label">${t('filter.category')}</span>
                        <div class="sort-group grid-2x2">
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Ofensivo" onclick="handleFilterClick('variantClass', 'Ofensivo')"><img loading="lazy" src="${CLASS_ICONS['Ofensivo']?.icon}" alt=""> ${getLocalizedClassName('Ofensivo').toUpperCase()}</button>
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Suporte de Utilidade" onclick="handleFilterClick('variantClass', 'Suporte de Utilidade')"><img loading="lazy" src="${CLASS_ICONS['Suporte de Utilidade']?.icon}" alt=""> ${t('filter.supportShort').toUpperCase()}</button>
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Defensivo" onclick="handleFilterClick('variantClass', 'Defensivo')"><img loading="lazy" src="${CLASS_ICONS['Defensivo']?.icon}" alt=""> ${getLocalizedClassName('Defensivo').toUpperCase()}</button>
                            <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Coringa" onclick="handleFilterClick('variantClass', 'Coringa')"><img loading="lazy" src="${CLASS_ICONS['Coringa']?.icon}" alt=""> ${getLocalizedClassName('Coringa').toUpperCase()}</button>
                        </div>
                    </div>
                    <div class="adv-filter-group" id="adv-filter-effects-pos"><span class="adv-filter-label" style="color: var(--buff-color, #6fbf73); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${t('guide.positiveEffects')} <span>▼</span></span><div class="filter-grid effects-grid collapsible-content">${createEffectGrid(buffs, true)}</div></div>
                    <div class="adv-filter-group" id="adv-filter-effects-neg"><span class="adv-filter-label" style="color: var(--debuff-color, #f06868); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${t('guide.negativeEffects')} <span>▼</span></span><div class="filter-grid effects-grid collapsible-content">${createEffectGrid(debuffs, false)}</div></div>
                    <div class="adv-filter-group" style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;"><button class="btn btn-secondary" style="width: 100%; font-size: 0.8rem; padding: 8px;" onclick="handleClearAdvancedFilters()">${t('filter.clearAdvanced')}</button></div>
                </div>
            </div>
        </div>`;

    const characterNav = `
        <div class="filter-section right character-nav">
            <div class="sort-header" id="char-nav-header">${t('filter.changeCharacter')}</div>
            <div class="char-dropdown" id="char-dropdown">
                <button class="char-dropdown-btn" onclick="handleToggleCharDropdown()">
                    <span id="current-char-label">${t('filter.chooseCharacter')}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="char-dropdown-content" id="char-dropdown-content"></div>
            </div>
        </div>`;

    return `
        <!-- ═══════════════════════════════════════════════════════ -->
        <!--  DESKTOP FILTER BAR  (display:none on mobile via CSS)  -->
        <!-- ═══════════════════════════════════════════════════════ -->
        <div class="filter-bar desktop-filter-bar">

            <div class="filter-controls">
                <button id="main-filter-btn" class="filter-toggle-btn" onclick="handleMainFilterAction()">
                    <div class="btn-icon-wrapper">
                        <img loading="lazy" class="icon-default" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <img loading="lazy" class="icon-active" src="img/official/constraints_no.webp" alt="">
                    </div>
                    <span class="text-default">${t('filter.filterBtn')}</span>
                    <span class="text-active">${t('filter.clear')}</span>
                </button>
            </div>

            <div class="vertical-separator"></div>

            ${rarityGrid}

            <div class="vertical-separator"></div>

            ${elementGrid}

            <div class="vertical-separator"></div>

            ${sortSection}

            <div class="vertical-separator"></div>

            ${advancedFilters}

            <div class="vertical-separator"></div>

            ${characterNav}
        </div>

        <!-- ═══════════════════════════════════════════════════════ -->
        <!--  MOBILE FILTER BAR  (display:none on desktop via CSS)  -->
        <!-- ═══════════════════════════════════════════════════════ -->
        <div class="filter-bar mobile-filter-bar">

            <!-- ROW 1: Toggle button + icon grids -->
            <div class="mobile-row mobile-row--icons">
                <button id="main-filter-btn-mobile" class="filter-toggle-btn filter-toggle-btn--mobile" onclick="handleMainFilterAction()">
                    <div class="btn-icon-wrapper">
                        <img loading="lazy" class="icon-default" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <img loading="lazy" class="icon-active" src="img/official/constraints_no.webp" alt="">
                    </div>
                </button>
                <div class="mobile-icon-separator"></div>
                <div class="mobile-icon-grids">
                    <div class="filter-grid rarity-grid">
                        <button class="filter-btn rarity-btn" data-rarity="bronze" onclick="handleFilterClick('rarity', 'bronze')" title="${t('rarity.bronze')}"><img loading="lazy" src="img/official/icone_bronze.webp" alt="${t('rarity.bronze')}"></button>
                        <button class="filter-btn rarity-btn" data-rarity="prata" onclick="handleFilterClick('rarity', 'prata')" title="${t('rarity.silver')}"><img loading="lazy" src="img/official/icone_prata.webp" alt="${t('rarity.silver')}"></button>
                        <button class="filter-btn rarity-btn" data-rarity="ouro" onclick="handleFilterClick('rarity', 'ouro')" title="${t('rarity.gold')}"><img loading="lazy" src="img/official/icone_ouro.webp" alt="${t('rarity.gold')}"></button>
                        <button class="filter-btn rarity-btn" data-rarity="diamante" onclick="handleFilterClick('rarity', 'diamante')" title="${t('rarity.diamond')}"><img loading="lazy" src="img/official/icone_diamante.webp" alt="${t('rarity.diamond')}"></button>
                    </div>
                    <div class="filter-grid element-grid">
                        <button class="filter-btn element-btn" data-element="fogo" onclick="handleFilterClick('element', 'fogo')" title="${t('element.fire')}"><img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${t('element.fire')}"></button>
                        <button class="filter-btn element-btn" data-element="agua" onclick="handleFilterClick('element', 'agua')" title="${t('element.water')}"><img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${t('element.water')}"></button>
                        <button class="filter-btn element-btn" data-element="ar" onclick="handleFilterClick('element', 'ar')" title="${t('element.wind')}"><img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${t('element.wind')}"></button>
                        <button class="filter-btn element-btn" data-element="luz" onclick="handleFilterClick('element', 'luz')" title="${t('element.light')}"><img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${t('element.light')}"></button>
                        <button class="filter-btn element-btn" data-element="trevas" onclick="handleFilterClick('element', 'trevas')" title="${t('element.dark')}"><img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${t('element.dark')}"></button>
                        <button class="filter-btn element-btn" data-element="neutro" onclick="handleFilterClick('element', 'neutro')" title="${t('element.neutral')}"><img loading="lazy" src="img/official/ElementalNeutralBackless.webp" alt="${t('element.neutral')}"></button>
                    </div>
                </div>
            </div>

            <div class="mobile-divider"></div>

            <!-- ROW 2: Sort controls -->
            <div class="mobile-row mobile-row--sort">
                <div class="sort-header">
                    <img loading="lazy" src="img/official/icon_sort.webp" onerror="this.style.display='none'" alt="">
                    ${t('filter.organize')}
                </div>
                <div class="sort-group mobile-sort-group">
                    <button class="sort-btn active" data-sort="score" onclick="handleSortClick('score')">${scoreLabel}</button>
                    <button class="sort-btn" data-sort="name" onclick="handleSortClick('name')">${alphaLabel}</button>
                    <button class="sort-btn builds-only" data-sort="atk" onclick="handleSortClick('atk')">${atkLabel}</button>
                    <button class="sort-btn builds-only" data-sort="hp" onclick="handleSortClick('hp')">${hpLabel}</button>
                </div>
            </div>

            <div class="mobile-divider"></div>

            <!-- ROW 3: Advanced filters + Char nav -->
            <div class="mobile-row mobile-row--controls">
                <div class="advanced-filters-dropdown mobile-adv-dropdown" id="advanced-filters-dropdown-mobile">
                    <button class="advanced-filters-btn" onclick="handleToggleAdvancedFiltersMobile()">
                        <img loading="lazy" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
                        <span>${t('detail.filters')}</span>
                        <span class="dropdown-arrow">▼</span>
                    </button>
                    <div class="advanced-filters-content" id="advanced-filters-content-mobile">
                        <div class="adv-filter-group">
                            <span class="adv-filter-label">${t('detail.sortBy')}</span>
                            <div class="sort-group grid-2x2">
                                <button class="sort-btn" data-sort="element" onclick="handleSortClick('element')">${elementLabel}</button>
                                <button class="sort-btn" data-sort="class" onclick="handleSortClick('class')">${categoryLabel}</button>
                            </div>
                        </div>
                        <div class="adv-filter-group">
                            <span class="adv-filter-label">${t('filter.category')}</span>
                            <div class="sort-group grid-2x2">
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Ofensivo" onclick="handleFilterClick('variantClass', 'Ofensivo')"><img loading="lazy" src="${CLASS_ICONS['Ofensivo']?.icon}" alt=""> ${getLocalizedClassName('Ofensivo').toUpperCase()}</button>
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Suporte de Utilidade" onclick="handleFilterClick('variantClass', 'Suporte de Utilidade')"><img loading="lazy" src="${CLASS_ICONS['Suporte de Utilidade']?.icon}" alt=""> ${t('filter.supportShort').toUpperCase()}</button>
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Defensivo" onclick="handleFilterClick('variantClass', 'Defensivo')"><img loading="lazy" src="${CLASS_ICONS['Defensivo']?.icon}" alt=""> ${getLocalizedClassName('Defensivo').toUpperCase()}</button>
                                <button class="sort-btn class-filter-btn class-filter-icon-btn" data-variant-class="Coringa" onclick="handleFilterClick('variantClass', 'Coringa')"><img loading="lazy" src="${CLASS_ICONS['Coringa']?.icon}" alt=""> ${getLocalizedClassName('Coringa').toUpperCase()}</button>
                            </div>
                        </div>
                        <div class="adv-filter-group" id="adv-filter-effects-pos-mobile">
                            <span class="adv-filter-label" style="color: var(--buff-color, #6fbf73); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${t('guide.positiveEffects')} <span>▼</span></span>
                            <div class="filter-grid effects-grid collapsible-content">${createEffectGrid(buffs, true)}</div>
                        </div>
                        <div class="adv-filter-group" id="adv-filter-effects-neg-mobile">
                            <span class="adv-filter-label" style="color: var(--debuff-color, #f06868); cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('active')">${t('guide.negativeEffects')} <span>▼</span></span>
                            <div class="filter-grid effects-grid collapsible-content">${createEffectGrid(debuffs, false)}</div>
                        </div>
                        <div class="adv-filter-group" style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
                            <button class="btn btn-secondary" style="width: 100%; font-size: 0.8rem; padding: 8px;" onclick="handleClearAdvancedFilters()">${t('filter.clearAdvanced')}</button>
                        </div>
                    </div>
                </div>

                <div class="mobile-controls-separator"></div>

                <div class="mobile-char-nav">
                    <div class="sort-header">${t('filter.changeCharacter')}</div>
                    <div class="char-dropdown" id="char-dropdown">
                        <button class="char-dropdown-btn" onclick="handleToggleCharDropdown()">
                            <span id="current-char-label">${t('filter.chooseCharacter')}</span>
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
        'score': t('filter.score').toUpperCase(),
        'atk': t('filter.atk').toUpperCase(),
        'hp': t('filter.hp').toUpperCase(),
        'name': t('filter.alpha').toUpperCase(),
        'element': t('filter.element').toUpperCase(),
        'class': t('filter.category').toUpperCase()
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

    // Unified Filter/Clear button logic — sync both desktop and mobile buttons
    const hasActiveFilters = filters.rarity.length > 0 ||
        filters.element.length > 0 ||
        (filters.variantClass && filters.variantClass.length > 0) ||
        (filters.efeitos && filters.efeitos.length > 0) ||
        sort.type !== defaultSortType ||
        sort.direction !== defaultSortDir;

    ['main-filter-btn', 'main-filter-btn-mobile'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.classList.toggle('can-clear', hasActiveFilters);
        }
    });

    // Sync mobile effects visibility too
    ['adv-filter-effects-pos-mobile', 'adv-filter-effects-neg-mobile'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.style.display = tab === 'tier' ? 'none' : 'flex';
    });
}

/**
 * Update character navigator dropdown
 * @param {string} currentCharKey - Currently selected character
 * @param {string} currentTab - Current tab ('builds' or 'tier')
 */
export function updateCharacterNav(currentCharKey, currentTab = 'builds') {
    const characters = getCharacters();
    if (!characters) return;

    // Build the label HTML
    let labelHTML;
    if (currentCharKey === 'todos') {
        labelHTML = t('characters.allCharacters');
    } else {
        const char = characters[currentCharKey];
        if (char) {
            const masteryIcon = getMasteryIcon(currentCharKey);
            labelHTML = `<img loading="lazy" src="${masteryIcon}" alt="" style="width:24px; height:24px; object-fit:contain;"> ${char.character}`;
        }
    }

    // Build the dropdown items HTML
    const sortedCharKeys = Object.keys(characters).sort((a, b) =>
        characters[a].character.localeCompare(characters[b].character)
    );

    let dropdownHTML = '';
    if (currentTab !== 'tier') {
        dropdownHTML += `
            <button class="char-dropdown-item todos-item ${currentCharKey === 'todos' ? 'active' : ''}" 
                    onclick="openCharacterDetails('todos', '${currentTab}'); handleToggleCharDropdown();">
                <span>${t('characters.allCharacters')}</span>
            </button>
            <div class="char-dropdown-divider"></div>
        `;
    }

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

    // Apply to both desktop and mobile char dropdowns
    ['char-dropdown-content'].forEach(id => {
        const content = document.getElementById(id);
        if (content) content.innerHTML = dropdownHTML;
    });
    ['current-char-label'].forEach(id => {
        const label = document.getElementById(id);
        if (label && labelHTML) label.innerHTML = labelHTML;
    });
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
    // Legacy: no-op since desktop filter is always visible and mobile has its own structure
}

export function handleToggleCharDropdown() {
    const dropdown = document.getElementById('char-dropdown');
    const content = document.getElementById('char-dropdown-content');
    if (dropdown && content) {
        dropdown.classList.toggle('active');
        content.classList.toggle('active');

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

export function handleToggleAdvancedFiltersMobile() {
    const dropdown = document.getElementById('advanced-filters-dropdown-mobile');
    const content = document.getElementById('advanced-filters-content-mobile');
    if (dropdown && content) {
        dropdown.classList.toggle('active');
        content.classList.toggle('active');
    }
}

// ========== CLOSE DROPDOWNS ON OUTSIDE CLICK ==========
document.addEventListener('click', (e) => {
    // Search
    const searchContainer = document.getElementById('search-bar-container');
    const searchDropdown = document.getElementById('search-results-dropdown');
    if (searchContainer && searchDropdown && !searchContainer.contains(e.target)) {
        searchDropdown.classList.remove('active');
    }

    // Desktop Advanced Filters
    const advDropdown = document.getElementById('advanced-filters-dropdown');
    const advContent = document.getElementById('advanced-filters-content');
    if (advDropdown && advContent && !advDropdown.contains(e.target)) {
        advDropdown.classList.remove('active');
        advContent.classList.remove('active');
    }

    // Mobile Advanced Filters
    const mobileAdvDropdown = document.getElementById('advanced-filters-dropdown-mobile');
    const mobileAdvContent = document.getElementById('advanced-filters-content-mobile');
    if (mobileAdvDropdown && mobileAdvContent && !mobileAdvDropdown.contains(e.target)) {
        mobileAdvDropdown.classList.remove('active');
        mobileAdvContent.classList.remove('active');
    }

    // Char dropdown (shared between desktop and mobile via same id)
    const charDropdown = document.getElementById('char-dropdown');
    const charContent = document.getElementById('char-dropdown-content');
    if (charDropdown && charContent && !charDropdown.contains(e.target)) {
        charDropdown.classList.remove('active');
        charContent.classList.remove('active');
    }
});

// Remove scroll listener for advanced filters — only close on click outside

export function handleClearAdvancedFilters() {
    clearAdvancedFilters();
    updateFilterUI();
    if (window.onFiltersChanged) {
        window.onFiltersChanged();
    }
}
