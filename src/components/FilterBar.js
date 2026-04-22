// =====================================================
// FILTER BAR COMPONENT
// Renders filter controls for rarity, element, and sorting
// =====================================================

import { getState, toggleFilter, toggleSort, clearFilters, toggleFilterBar } from '../state/store.js';
import { getMasteryIcon } from '../utils/formatters.js';
import { getCharacters } from '../services/dataService.js';
import { t, getCurrentLanguage, getElementMap, getRarityLabels } from '../i18n/index.js';

/**
 * Create filter bar HTML
 * @returns {string} HTML string
 */
export function createFilterBar() {
  const elementMap = getElementMap();
  const rarityLabels = getRarityLabels();

  // Element filter buttons - keys are PT-BR internal keys
  const elementKeys = [
    { key: 'fogo', enKey: 'fire' },
    { key: 'agua', enKey: 'water' },
    { key: 'ar', enKey: 'wind' },
    { key: 'luz', enKey: 'light' },
    { key: 'trevas', enKey: 'dark' },
    { key: 'neutro', enKey: 'neutral' }
  ];

  const elementButtons = elementKeys.map(({ key, enKey }) => {
    const info = elementMap[key] || {};
    const label = t(`element.${enKey}`);
    return `
      <button class="filter-btn element-btn" data-element="${key}"
        onclick="handleFilterClick('element', '${key}')" title="${label}">
        <img loading="lazy" src="${info.iconPath || ''}" alt="${label}">
      </button>
    `;
  }).join('');

  // Rarity filter buttons - keys are PT-BR internal keys
  const rarityKeys = [
    { key: 'bronze', enKey: 'bronze' },
    { key: 'prata', enKey: 'silver' },
    { key: 'ouro', enKey: 'gold' },
    { key: 'diamante', enKey: 'diamond' }
  ];

  const rarityButtons = rarityKeys.map(({ key, enKey }) => {
    const label = t(`rarity.${enKey}`);
    return `
      <button class="filter-btn rarity-btn" data-rarity="${key}"
        onclick="handleFilterClick('rarity', '${key}')" title="${label}">
        <img loading="lazy" src="img/official/icone_${key}.webp" alt="${label}">
      </button>
    `;
  }).join('');

  // Sort labels
  const scoreLabel = t('filter.score').toUpperCase();
  const atkLabel = t('filter.atk').toUpperCase();
  const hpLabel = t('filter.hp').toUpperCase();
  const alphaLabel = t('filter.alpha').toUpperCase();
  const elementLabel = t('filter.element').toUpperCase();
  const categoryLabel = t('filter.category').toUpperCase();

  return `
  <div class="filter-bar">
    <!-- Dynamic Filter/Clear Button -->
    <div class="filter-controls">
      <button id="main-filter-btn" class="filter-toggle-btn" onclick="handleMainFilterAction()">
        <div class="btn-icon-wrapper">
          <img loading="lazy" class="icon-default" src="img/official/icon_filter.webp" onerror="this.src='img/official/filter.webp'" alt="">
          <img loading="lazy" class="icon-active" src="img/official/constraints_no.webp" alt="">
        </div>
        <span class="text-default">${t('filter.filterBtn')}</span>
        <span class="text-active">${t('filter.clear')}</span>
      </button>
      <button id="desktop-clear-btn" class="clear-filters-btn" onclick="handleClearFilters()" title="${t('filter.clearAll')}">
        <img loading="lazy" src="img/official/constraints_no.webp" alt="${t('filter.clear')}">
      </button>
    </div>

    <div class="vertical-separator"></div>

    <!-- Collapsible Filter Content -->
    <div class="filter-content" id="filter-content">

      <!-- Rarity Grid (2x2) -->
      <div class="filter-grid rarity-grid">
        ${rarityButtons}
      </div>

      <div class="vertical-separator"></div>

      <!-- Element Grid (3x2) -->
      <div class="filter-grid element-grid">
        ${elementButtons}
      </div>

      <div class="vertical-separator"></div>

      <!-- Sort Section -->
      <div class="filter-section right">
        <div class="sort-header">
          <img loading="lazy" src="img/official/icon_sort.webp" onerror="this.style.display='none'" alt="">
          ${t('filter.organize')}
        </div>
        <div class="vertical-separator" style="height: 30px; margin: 0 12px; width: 1px; background: rgba(255,255,255,0.1);"></div>
        <div class="sort-group">
          <button class="sort-btn builds-only active" data-sort="score" onclick="handleSortClick('score')">${scoreLabel}</button>
          <button class="sort-btn builds-only" data-sort="atk" onclick="handleSortClick('atk')">${atkLabel}</button>
          <button class="sort-btn builds-only" data-sort="hp" onclick="handleSortClick('hp')">${hpLabel}</button>
          <button class="sort-btn" data-sort="name" onclick="handleSortClick('name')">${alphaLabel}</button>
          <button class="sort-btn" data-sort="element" onclick="handleSortClick('element')">${elementLabel}</button>
          <button class="sort-btn" data-sort="class" onclick="handleSortClick('class')">${categoryLabel}</button>
        </div>
      </div>

      <div class="vertical-separator"></div>

      <!-- Character Navigator -->
      <div class="filter-section right character-nav">
        <div class="sort-header" id="char-nav-header">${t('filter.changeCharacter')}</div>
        <div class="char-dropdown" id="char-dropdown">
          <button class="char-dropdown-btn" onclick="handleToggleCharDropdown()">
            <span id="current-char-label">${t('filter.chooseCharacter')}</span>
            <span class="dropdown-arrow">\u25BC</span>
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

  // Update Sort Buttons — use i18n keys
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

  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.innerText = sortLabels[btn.dataset.sort] || btn.dataset.sort;

    if (btn.dataset.sort === sort.type) {
      if (sort.type !== defaultSortType || sort.direction !== defaultSortDir) {
        btn.classList.add('active');
      }
      const arrow = sort.direction === 'asc' ? ' \u2191' : ' \u2193';
      btn.innerText += arrow;
    }
  });

  // Dynamic Filter/Clear button logic
  const hasActiveFilters = filters.rarity.length > 0 ||
    filters.element.length > 0 ||
    sort.type !== defaultSortType ||
    sort.direction !== defaultSortDir;

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
