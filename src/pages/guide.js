// =====================================================
// GUIDE PAGE
// Game statistics, effects, and catalyst reference
// =====================================================

import { EFFECT_DATA, getLocalizedEffect } from '../data/effectData.js';
import { ATTRIBUTE_DATA, getLocalizedAttribute } from '../data/attributeData.js';
import { loadCatalysts } from '../services/dataService.js';
import { formatConstraint } from '../utils/formatters.js';
import { t } from '../i18n/index.js';

export function render() {
  return `
  <div class="guide-container fade-in">

    <div class="guide-tabs">
      <button class="guide-tab-btn active" onclick="switchGuideTab('statistics')">
        <img loading="lazy" src="img/official/AttackIcon.webp" alt="${t('guide.statistics')}" class="tab-icon">
        ${t('guide.statistics')}
      </button>
      <button class="guide-tab-btn" onclick="switchGuideTab('modifiers')">
        <img loading="lazy" src="img/official/Button_Modifiers.webp" alt="${t('guide.modifiers')}" class="tab-icon">
        ${t('guide.modifiers')}
      </button>
      <button class="guide-tab-btn" onclick="switchGuideTab('catalysts')">
        ${t('guide.catalysts')}
      </button>
    </div>

    <div class="guide-content">

    <!-- STATISTICS TAB -->
    <div id="tab-statistics" class="guide-tab-content active">

      <div class="stats-hero-container">
        <div class="stats-header-row">
          <span class="stats-header-title">${t('guide.maxStats')}</span>
          <button class="stats-toggle-btn" onclick="toggleStatsImage()">
            <span class="toggle-text">${t('guide.hideImage')}</span>
          </button>
        </div>

        <div id="statsImageWrapper" class="stats-image-wrapper">
          <img loading="lazy" src="img/unofficial/status_max_pt-br.webp" alt="${t('guide.maxStats')}" class="stats-ref-image">
        </div>
      </div>

      <div class="stats-glossary-container">
        ${renderGlossary()}
      </div>
    </div>

    <!-- MODIFIERS TAB -->
    <div id="tab-modifiers" class="guide-tab-content">
      <section class="guide-modifier-library">
        <header class="guide-modifier-heading">
          <span class="guide-modifier-eyebrow">${t('guide.modifierLibraryEyebrow')}</span>
          <h2>${t('guide.modifiers')}</h2>
          <p>${t('guide.modifierLibraryDescription')}</p>
        </header>

        <div class="guide-modifier-tools">
          <label class="guide-modifier-search">
            <span class="guide-visually-hidden">${t('guide.searchModifiers')}</span>
            <span class="guide-modifier-search-icon" aria-hidden="true">⌕</span>
            <input id="guide-modifier-search" type="search" placeholder="${t('guide.searchModifiers')}" autocomplete="off">
          </label>
          <div class="guide-modifier-filters" role="group" aria-label="${t('guide.filterModifierTypes')}">
            <button type="button" class="guide-modifier-filter" data-modifier-filter="all" aria-pressed="true">${t('guide.allModifiers')}</button>
            <button type="button" class="guide-modifier-filter" data-modifier-filter="buff" aria-pressed="false">${t('guide.positiveEffects')}</button>
            <button type="button" class="guide-modifier-filter" data-modifier-filter="debuff" aria-pressed="false">${t('guide.negativeEffects')}</button>
            <button type="button" class="guide-modifier-filter" data-modifier-filter="technical" aria-pressed="false">${t('guide.technicalTerms')}</button>
          </div>
          <p class="guide-modifier-results" id="guide-modifier-results" aria-live="polite"></p>
        </div>

        <div class="guide-modifier-groups">
          <section class="guide-modifier-group" data-modifier-type="buff">
            <header class="guide-modifier-group-heading modifier-positive">
              <img loading="lazy" src="img/modifiers/buffs/Regen.webp" alt="">
              <h3>${t('guide.positiveEffects')}</h3>
              <span class="guide-modifier-group-count"></span>
            </header>
            <div class="guide-modifier-grid" id="buffs-list"></div>
          </section>

          <section class="guide-modifier-group" data-modifier-type="debuff">
            <header class="guide-modifier-group-heading modifier-negative">
              <img loading="lazy" src="img/modifiers/debuffs/Bleed.webp" alt="">
              <h3>${t('guide.negativeEffects')}</h3>
              <span class="guide-modifier-group-count"></span>
            </header>
            <div class="guide-modifier-grid" id="debuffs-list"></div>
          </section>

          <section class="guide-modifier-group" data-modifier-type="technical">
            <header class="guide-modifier-group-heading modifier-technical">
              <h3>${t('guide.technicalTerms')}</h3>
              <span class="guide-modifier-group-count"></span>
            </header>
            <div class="guide-modifier-grid" id="special-list"></div>
          </section>

        </div>
        <p class="guide-modifier-empty" id="guide-modifier-empty" hidden>${t('guide.noModifierMatches')}</p>
      </section>
    </div>

    <!-- CATALYSTS TAB -->
    <div id="tab-catalysts" class="guide-tab-content">
      <section class="guide-catalyst-library">
        <header class="guide-catalyst-heading">
          <span class="guide-catalyst-eyebrow">${t('guide.catalystLibraryEyebrow')}</span>
          <h2>${t('guide.riftCatalysts')}</h2>
          <p>${t('guide.catalystLibraryDescription')}</p>
        </header>
        <div class="guide-catalyst-tools">
          <label class="guide-catalyst-search">
            <span class="guide-visually-hidden">${t('guide.searchCatalysts')}</span>
            <span class="guide-catalyst-search-icon" aria-hidden="true">⌕</span>
            <input id="guide-catalyst-search" type="search" placeholder="${t('guide.searchCatalysts')}" autocomplete="off">
          </label>
          <div class="guide-catalyst-filter-wrap">
            <span class="guide-catalyst-filter-label">${t('guide.filterCatalysts')}</span>
            <div class="guide-catalyst-filters" id="guide-catalyst-filters" role="group" aria-label="${t('guide.filterCatalysts')}"></div>
          </div>
          <p class="guide-catalyst-results" id="guide-catalyst-results" aria-live="polite"></p>
        </div>
        <div class="catalyst-categories" id="catalyst-container">
          <div class="loading-state">${t('guide.loadingCatalysts')}</div>
        </div>
      </section>
    </div>
    </div>
  </div>
  `;
}

export function init() {
  renderEffects('buffs-list', effect => effect.type === 'buff');
  renderEffects('debuffs-list', effect => effect.type === 'debuff');
  renderEffects('special-list', effect => effect.type === 'term' || ['critless', 'buff', 'debuff'].includes(effect.key));
  initModifierBrowser();
  initCatalysts();

  // Register global tab switcher
  window.switchGuideTab = switchGuideTab;
  window.toggleStatsImage = toggleStatsImage;

  // Trigger lazy loading if needed
  if (window.setupLazyLoading) window.setupLazyLoading();
}

function switchGuideTab(tabName) {
  // Update buttons
  document.querySelectorAll('.guide-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    // Check if the onclick contains the tabName exactly
    const onClickAttr = btn.getAttribute('onclick');
    if (onClickAttr && onClickAttr.includes(`'${tabName}'`)) {
      btn.classList.add('active');
    }
  });

  // Update content
  document.querySelectorAll('.guide-tab-content').forEach(content => {
    content.classList.remove('active');
    if (content.id === `tab-${tabName}`) {
      content.classList.add('active');
    }
  });
}

function renderEffects(containerId, matchesCategory) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const effects = Object.entries(EFFECT_DATA)
    .filter(([key, effect]) => matchesCategory({ ...effect, key }))
    .map(([key, effect]) => ({ ...getLocalizedEffect(key) || effect, key }))
    .sort((a, b) => a.name.localeCompare(b.name));

  container.innerHTML = effects.map(renderModifierCard).join('');
}

// =====================================================
// CATALYST RENDERING LOGIC
// =====================================================

async function initCatalysts() {
  const container = document.getElementById('catalyst-container');
  if (!container) return;

  const catalysts = await loadCatalysts();
  if (!catalysts) {
    container.innerHTML = `<p class="error-state">${t('guide.errorCatalysts')}</p>`;
    return;
  }

  // Handle Discord embed format
  if (catalysts.embeds && Array.isArray(catalysts.embeds)) {
    const embed = catalysts.embeds[0];
    if (embed) {
      let html = '';

      // Title
      if (embed.title) {
        html += `<h3 class="catalyst-title">${embed.title}</h3>`;
      }

      // Description (array of strings)
      if (embed.description && Array.isArray(embed.description)) {
        html += `<div class="catalyst-description">${embed.description.map(line =>
          line ? `<p>${formatCatalystText(line)}</p>` : '<br>'
        ).join('')}</div>`;
      }

      // Fields (categories of catalysts)
      if (embed.fields && Array.isArray(embed.fields)) {
        html += '<div class="catalyst-fields">';
        embed.fields.forEach(field => {
          const categoryClass = getCategoryClass(field.name);
          html += `
            <div class="catalyst-category ${categoryClass}">
              <h4>${field.name}</h4>
              <ul class="catalyst-list">
                ${(Array.isArray(field.value) ? field.value : [field.value]).map(item =>
                  `<li>${formatCatalystText(item)}</li>`
                ).join('')}
              </ul>
            </div>
          `;
        });
        html += '</div>';
      }

      container.innerHTML = `
        <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${t('guide.riftCatalysts')}</h2>
        ${html}
      `;
      return;
    }
  }

  // Render the catalog with client-side search and category filters.
  if (Array.isArray(catalysts)) {
    initCatalystCatalog([{ category: t('guide.allCatalysts'), items: catalysts }]);
  } else if (catalysts.categories && Array.isArray(catalysts.categories)) {
    initCatalystCatalog(catalysts.categories);
  } else {
    container.innerHTML = `<p class="info-state">${t('guide.catalystsLoaded')}</p>`;
  }
}

function initCatalystCatalog(categories) {
  const container = document.getElementById('catalyst-container');
  const searchInput = document.getElementById('guide-catalyst-search');
  const filterContainer = document.getElementById('guide-catalyst-filters');
  const results = document.getElementById('guide-catalyst-results');
  if (!container || !searchInput || !filterContainer || !results) return;

  const validCategories = categories
    .filter(category => category && typeof category.category === 'string' && Array.isArray(category.items))
    .map(category => ({ ...category, items: category.items.filter(Boolean) }));
  let selectedCategory = 'all';
  let searchTerm = '';

  const createFilterButton = (value, label, count) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-catalyst-filter';
    button.dataset.category = value;
    button.setAttribute('aria-pressed', String(value === selectedCategory));
    const labelElement = document.createElement('span');
    labelElement.textContent = label;
    const countElement = document.createElement('span');
    countElement.className = 'guide-catalyst-filter-count';
    countElement.textContent = count.toLocaleString();
    button.append(labelElement, countElement);
    return button;
  };

  filterContainer.replaceChildren(
    createFilterButton('all', t('guide.allCatalysts'), validCategories.reduce((count, category) => count + category.items.length, 0)),
    ...validCategories.map(category => createFilterButton(
      category.category,
      category.category,
      category.items.length
    ))
  );

  const renderResults = () => {
    const normalizedTerm = normalizeCatalystText(searchTerm);
    const visibleCategories = validCategories.map(category => {
      const items = category.items.filter(item => {
        if (selectedCategory !== 'all' && category.category !== selectedCategory) return false;
        if (!normalizedTerm) return true;

        const searchableText = normalizeCatalystText([
          item.name,
          item.description,
          item.constraint,
          item.element,
          category.category
        ].filter(Boolean).join(' '));
        return searchableText.includes(normalizedTerm);
      });
      return { ...category, items };
    }).filter(category => category.items.length > 0);

    const resultCount = visibleCategories.reduce((count, category) => count + category.items.length, 0);
    results.textContent = t('guide.catalystResults').replace('{count}', resultCount.toLocaleString());

    if (resultCount === 0) {
      container.innerHTML = `<p class="guide-catalyst-empty">${t('guide.noCatalystMatches')}</p>`;
      return;
    }

    container.innerHTML = visibleCategories.map(category => `
      <section class="catalyst-category ${getCategoryClass(category.category)}">
        <header class="guide-catalyst-category-heading">
          <h3>${category.category}</h3>
          <span>${category.items.length}</span>
        </header>
        <div class="catalyst-grid">
          ${category.items.map(item => renderCatalystCard(item, category.category)).join('')}
        </div>
      </section>
    `).join('');
  };

  filterContainer.addEventListener('click', event => {
    const button = event.target.closest('.guide-catalyst-filter');
    if (!button || !filterContainer.contains(button)) return;

    selectedCategory = button.dataset.category;
    filterContainer.querySelectorAll('.guide-catalyst-filter').forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    renderResults();
  });

  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value;
    renderResults();
  });

  renderResults();
}

function normalizeCatalystText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

function initModifierBrowser() {
  const root = document.getElementById('tab-modifiers');
  const search = document.getElementById('guide-modifier-search');
  const results = document.getElementById('guide-modifier-results');
  const emptyState = document.getElementById('guide-modifier-empty');
  if (!root || !search || !results || !emptyState) return;

  const groups = [...root.querySelectorAll('.guide-modifier-group')];
  const filters = [...root.querySelectorAll('.guide-modifier-filter')];
  let selectedType = 'all';

  const updateResults = () => {
    const term = normalizeCatalystText(search.value);
    let total = 0;

    groups.forEach(group => {
      const typeMatches = selectedType === 'all' || group.dataset.modifierType === selectedType;
      let groupCount = 0;

      group.querySelectorAll('.guide-modifier-card').forEach(card => {
        const textMatches = !term || normalizeCatalystText(card.textContent).includes(term);
        const visible = typeMatches && textMatches;
        card.hidden = !visible;
        if (visible) groupCount += 1;
      });

      group.hidden = groupCount === 0;
      group.querySelector('.guide-modifier-group-count').textContent = groupCount.toLocaleString();
      total += groupCount;
    });

    results.textContent = t('guide.modifierResults').replace('{count}', total.toLocaleString());
    emptyState.hidden = total > 0;
  };

  filters.forEach(button => {
    button.addEventListener('click', () => {
      selectedType = button.dataset.modifierFilter;
      filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      updateResults();
    });
  });

  search.addEventListener('input', updateResults);
  updateResults();
}

function renderModifierCard(effect) {
  const color = effect.color || 'var(--accent-gold)';
  const category = effect.key === 'critless' || effect.key === 'buff' || effect.key === 'debuff'
    ? 'technical'
    : effect.type === 'buff' ? 'positive' : effect.type === 'debuff' ? 'negative' : 'technical';
  const details = [
    effect.detailed ? `<section class="guide-modifier-detail"><h5>${t('guide.gameDescription')}</h5><p>${effect.detailed}</p></section>` : '',
    effect.explicacao ? `<section class="guide-modifier-detail"><h5>${t('guide.explanation')}</h5><p>${effect.explicacao}</p></section>` : '',
    effect.scaling ? `<p class="guide-modifier-scaling"><strong>${t('guide.scaling')}:</strong> ${effect.scaling}</p>` : ''
  ].filter(Boolean).join('');

  return `
    <article class="guide-modifier-card modifier-card-${category}">
      <header class="guide-modifier-card-heading">
        ${effect.icon ? `<img class="guide-modifier-icon" loading="lazy" src="${effect.icon}" alt="">` : `<span class="guide-modifier-marker" style="--modifier-color: ${color}" aria-hidden="true"></span>`}
        <h4>${effect.name}</h4>
        ${effect.stacks ? `<span class="guide-modifier-stacks">${t('guide.max')} ${effect.stacks}x</span>` : ''}
      </header>
      <div class="guide-modifier-card-body">${details || `<p>${effect.description || ''}</p>`}</div>
    </article>
  `;
}

function getCategoryClass(name) {
  const n = name.toLowerCase();
  if (n.includes('forte') || n.includes('strong')) return 'cat-strong';
  if (n.includes('bom') || n.includes('good')) return 'cat-good';
  if (n.includes('mediano') || n.includes('average')) return 'cat-medium';
  if (n.includes('ruim') || n.includes('weak')) return 'cat-weak';
  return '';
}

function formatCatalystText(text) {
  if (!text) return '';
  text = text.replace(/^\*\s*/, '');
  text = text.replace(/^###\s*/, '');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Replace slash-separated level values with the last (max) value
  // e.g. "1/2/3/4/5/6 seconds" -> "6 seconds"
  text = text.replace(/\b(\d+\.?\d*)(?:\/\d+\.?\d*)+\b/g, (match) => match.split('/').pop());
  text = text.replace(/\(\+\)/g, '<span class="notation notation-plus" style="color: #4ade80;">(+)</span>');
  text = text.replace(/\(=\)/g, '<span class="notation notation-equal" style="color: #fbbf24;">(=)</span>');
  text = text.replace(/\(-\)/g, '<span class="notation notation-minus" style="color: #f87171;">(-)</span>');
  return text;
}

function renderCatalystCard(item, category = '') {
  const formattedDesc = (item.description || '')
    .replace(/\r?\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return `
    <article class="catalyst-card guide-catalyst-card ${getCategoryClass(category)}">
      <div class="catalyst-card-header">
        <h4>${item.name}</h4>
        ${item.constraint ? `<span class="catalyst-constraint">${formatConstraint(item.constraint)}</span>` : ''}
      </div>
      <div class="catalyst-description">
        <p>${formattedDesc}</p>
      </div>
    </article>
  `;
}

function toggleStatsImage() {
  const wrapper = document.getElementById('statsImageWrapper');
  const btn = document.querySelector('.stats-toggle-btn');
  if (!wrapper) return;

  const isHidden = wrapper.style.display === 'none';
  wrapper.style.display = isHidden ? 'block' : 'none';

  if (btn) {
    btn.querySelector('.toggle-text').textContent = isHidden ? t('guide.hideImage') : t('guide.showImage');
  }
}

function renderGlossary() {
  // Filter out tier-only entries (no keys = not a real stat)
  const glossaryKeys = Object.keys(ATTRIBUTE_DATA).filter(k => {
    return !k.startsWith('tier_');
  });

  const cards = glossaryKeys.map(key => {
    const attr = getLocalizedAttribute(key) || ATTRIBUTE_DATA[key];
    const maxLabel = attr.max && attr.max !== 'Indefinido' && attr.max !== 'Undefined'
      ? `<span class="attribute-max">${t('tooltip.maxLabel')}${attr.max}</span>`
      : ((attr.max === 'Indefinido' || attr.max === 'Undefined') ? `<span class="attribute-max">${t('tooltip.maxLabel')}${t('guide.maxUndefined')}</span>` : '');

    return `
      <div class="attribute-card">
        <div class="attribute-card-header">
          <h3>${attr.name}</h3>
          ${maxLabel}
        </div>
        <div class="attribute-card-body">
          <p class="attribute-summary">${attr.summary}</p>
          <div class="attribute-detailed">
            <p>${attr.detailed}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="glossary-grid">${cards}</div>`;
}
