// =====================================================
// FENDA PAGE
// Rift section: Catalysts + Bases menus
// =====================================================

import { loadCatalysts, loadFendaData } from '../services/dataService.js';
import { getState } from '../state/store.js';
import { t } from '../i18n/index.js';
import { getLocalizedElementName } from '../config/constants.js';
import { formatConstraint } from '../utils/formatters.js';

/**
 * Render fenda page
 * @returns {string} HTML string
 */
export function render() {
  return `
  <div class="guide-container fade-in">

    <div class="guide-tabs">
      <button class="guide-tab-btn active" onclick="switchFendaTab('catalysts')" id="fenda-tab-btn-catalysts">
        <img loading="lazy" src="img/official/RiftCoin.webp" alt="${t('fenda.catalysts')}" class="tab-icon">
        ${t('fenda.catalysts')}
      </button>
      <button class="guide-tab-btn" onclick="switchFendaTab('bases')" id="fenda-tab-btn-bases">
        <img loading="lazy" src="img/official/Button_Modifiers.webp" alt="${t('fenda.bases')}" class="tab-icon">
        ${t('fenda.bases')}
      </button>
    </div>

    <div class="guide-content">

    <!-- CATALYSTS TAB -->
    <div id="tab-catalysts" class="guide-tab-content active">
      <div class="catalysts-intro">
        <p>${t('catalysts.intro')}</p>
      </div>

      <!-- Catalysts of the Week Section -->
      <div class="cotw-section">
        <h2 class="catalyst-title-main">${t('catalysts.weekModifiers')}</h2>
        <div class="cotw-filters" id="fenda-cotw-filters">
          <button class="cotw-filter-btn" data-element="water">
            <img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${getLocalizedElementName('Água')}"><span>${getLocalizedElementName('Água')}</span>
          </button>
          <button class="cotw-filter-btn" data-element="fire">
            <img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${getLocalizedElementName('Fogo')}"><span>${getLocalizedElementName('Fogo')}</span>
          </button>
          <button class="cotw-filter-btn" data-element="wind">
            <img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${getLocalizedElementName('Ar')}"><span>${getLocalizedElementName('Ar')}</span>
          </button>
          <button class="cotw-filter-btn" data-element="light">
            <img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${getLocalizedElementName('Luz')}"><span>${getLocalizedElementName('Luz')}</span>
          </button>
          <button class="cotw-filter-btn" data-element="dark">
            <img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${getLocalizedElementName('Trevas')}"><span>${getLocalizedElementName('Trevas')}</span>
          </button>
        </div>
        <div class="catalyst-grid" id="fenda-cotw-container">
          <p class="info-state" style="text-align: center; margin: 20px 0;">${t('catalysts.selectElement')}</p>
        </div>
      </div>

      <div style="height: 40px; border-bottom: 1px solid #30363d; margin-bottom: 40px;"></div>

      <div class="catalyst-categories" id="fenda-catalyst-container">
        <!-- Populated by JS -->
        <div class="loading-state">${t('catalysts.loading')}</div>
      </div>
    </div>

    <!-- BASES TAB -->
    <div id="tab-bases" class="guide-tab-content">
      <div class="bases-section">
        <div class="bases-header">
          <h2 class="catalyst-title-main">${t('fenda.basesTitle')}</h2>
          <p class="bases-intro">${t('fenda.basesIntro')}</p>
        </div>

        <!-- Element filter for bases -->
        <div class="cotw-filters" id="fenda-bases-filters">
          <button class="cotw-filter-btn active" data-map="all">
            <span>🗺️</span><span>${t('fenda.allMaps')}</span>
          </button>
          <button class="cotw-filter-btn" data-map="1">
            <img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${getLocalizedElementName('Água')}"><span>${getLocalizedElementName('Água')}</span>
          </button>
          <button class="cotw-filter-btn" data-map="2">
            <img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${getLocalizedElementName('Fogo')}"><span>${getLocalizedElementName('Fogo')}</span>
          </button>
          <button class="cotw-filter-btn" data-map="3">
            <img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${getLocalizedElementName('Ar')}"><span>${getLocalizedElementName('Ar')}</span>
          </button>
          <button class="cotw-filter-btn" data-map="4">
            <img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${getLocalizedElementName('Luz')}"><span>${getLocalizedElementName('Luz')}</span>
          </button>
          <button class="cotw-filter-btn" data-map="5">
            <img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${getLocalizedElementName('Trevas')}"><span>${getLocalizedElementName('Trevas')}</span>
          </button>
        </div>

        <div id="fenda-bases-container" class="bases-maps-container">
          <div class="loading-state">${t('fenda.loadingBases')}</div>
        </div>
      </div>
    </div>

    </div>
  </div>
  `;
}

// Store data globally
let allCatalystsData = null;
let allFendaData = null;

// Element to map number mapping
const ELEMENT_TO_MAP = {
  water: 1,
  fire: 2,
  wind: 3,
  light: 4,
  dark: 5
};

const MAP_TO_ELEMENT_NAME = {
  1: 'Água',
  2: 'Fogo',
  3: 'Ar',
  4: 'Luz',
  5: 'Trevas'
};

const MAP_TO_ELEMENT_KEY = {
  1: 'water',
  2: 'fire',
  3: 'wind',
  4: 'light',
  5: 'dark'
};

const MAP_TO_ELEMENT_IMG = {
  1: 'img/official/ElementalWaterBackless.webp',
  2: 'img/official/ElementalFireBackless.webp',
  3: 'img/official/ElementalWindBackless.webp',
  4: 'img/official/ElementalLightBackless.webp',
  5: 'img/official/ElementalDarkBackless.webp'
};

/**
 * Initialize fenda page
 */
export async function init() {
  // Register global tab switcher
  window.switchFendaTab = switchFendaTab;

  // Load catalyst data
  await initCatalysts();

  // Load fenda/bases data
  allFendaData = await loadFendaData();

  // Setup cotw filter buttons
  document.querySelectorAll('#fenda-cotw-filters .cotw-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const button = e.currentTarget;
      const isActive = button.classList.contains('active');

      document.querySelectorAll('#fenda-cotw-filters .cotw-filter-btn').forEach(b => b.classList.remove('active'));

      if (isActive) {
        const cotwContainer = document.getElementById('fenda-cotw-container');
        if (cotwContainer) {
          cotwContainer.innerHTML = `<p class="info-state" style="text-align: center; margin: 20px 0;">${t('catalysts.selectElement')}</p>`;
        }
      } else {
        button.classList.add('active');
        renderCotwFromFenda(button.dataset.element);
      }
    });
  });

  // Setup bases filter buttons
  document.querySelectorAll('#fenda-bases-filters .cotw-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const button = e.currentTarget;
      document.querySelectorAll('#fenda-bases-filters .cotw-filter-btn').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      renderBases(button.dataset.map === 'all' ? 'all' : parseInt(button.dataset.map));
    });
  });

  // Render all bases by default
  renderBases('all');

  // Trigger lazy loading if needed
  if (window.setupLazyLoading) window.setupLazyLoading();
}

// =====================================================
// TAB SWITCHING
// =====================================================

function switchFendaTab(tabName) {
  // Update buttons
  document.querySelectorAll('.guide-tab-btn').forEach(btn => {
    btn.classList.remove('active');
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

// =====================================================
// CATALYSTS
// =====================================================

async function initCatalysts() {
  const container = document.getElementById('fenda-catalyst-container');
  if (!container) return;

  allCatalystsData = await loadCatalysts();
  if (!allCatalystsData) {
    container.innerHTML = `<p class="error-state">${t('catalysts.errorLoad')}</p>`;
    return;
  }

  // Render general catalyst list
  if (allCatalystsData.categories && Array.isArray(allCatalystsData.categories)) {
    container.innerHTML = `
      <h2 class="catalyst-title-main" style="margin-top: -10px; margin-bottom: 30px;">${t('guide.riftCatalysts')}</h2>
      ${allCatalystsData.categories.map(catObj => {
        const categoryClass = getCategoryClass(catObj.category);
        return `
          <div class="catalyst-category ${categoryClass}">
            <h3 style="font-family: 'Washington', sans-serif; color: var(--accent-gold); margin-bottom: 16px;">${catObj.category} ⬇️</h3>
            <div class="catalyst-grid">
              ${catObj.items.map(item => renderCatalystCard(item)).join('')}
            </div>
          </div>
        `;
      }).join('')}
    `;
    attachNoteListeners();
  } else if (allCatalystsData.embeds && Array.isArray(allCatalystsData.embeds)) {
    const embed = allCatalystsData.embeds[0];
    if (embed) {
      let html = '';
      if (embed.title) html += `<h3 class="catalyst-title">${embed.title}</h3>`;
      if (embed.description && Array.isArray(embed.description)) {
        html += `<div class="catalyst-description">${embed.description.map(line =>
          line ? `<p>${formatCatalystText(line)}</p>` : '<br>'
        ).join('')}</div>`;
      }
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
    }
  } else {
    container.innerHTML = `<p class="info-state">${t('guide.catalystsLoaded')}</p>`;
  }
}

function renderCotwFromFenda(element) {
  const cotwContainer = document.getElementById('fenda-cotw-container');
  if (!cotwContainer || !allFendaData) return;

  const mapNumber = ELEMENT_TO_MAP[element];
  if (!mapNumber) return;

  const map = allFendaData.maps.find(m => m.map === mapNumber);
  if (!map) {
    cotwContainer.innerHTML = `<p class="info-state" style="text-align: center; margin: 20px 0;">${t('guide.noModifiersElement')}</p>`;
    return;
  }

  const cards = [];
  for (const node of map.nodes) {
    if (node.node === 'Boss') {
      const allBossMods = [...node.defender_modifiers, ...node.attacker_modifiers];
      if (allBossMods.length > 0) {
        cards.push(renderBossCard(allBossMods));
      }
    } else {
      for (const mod of node.defender_modifiers) {
        cards.push(renderRiftModCard(mod, node.node));
      }
      for (const mod of node.attacker_modifiers) {
        cards.push(renderRiftModCard(mod, node.node));
      }
    }
  }

  cotwContainer.innerHTML = cards.join('');
}

// =====================================================
// BASES
// =====================================================

function renderBases(mapFilter) {
  const container = document.getElementById('fenda-bases-container');
  if (!container || !allFendaData) {
    if (container) {
      container.innerHTML = `<p class="error-state">${t('fenda.errorLoadBases')}</p>`;
    }
    return;
  }

  const mapsToRender = mapFilter === 'all'
    ? allFendaData.maps
    : allFendaData.maps.filter(m => m.map === mapFilter);

  if (!mapsToRender || mapsToRender.length === 0) {
    container.innerHTML = `<p class="info-state" style="text-align:center; padding: 2rem;">${t('fenda.noBasesFound')}</p>`;
    return;
  }

  container.innerHTML = mapsToRender.map(map => {
    const elementName = getLocalizedElementName(MAP_TO_ELEMENT_NAME[map.map] || '');
    const elementImg = MAP_TO_ELEMENT_IMG[map.map] || '';

    const nodesHtml = map.nodes.map(node => {
      const defMods = node.defender_modifiers || [];
      const attMods = node.attacker_modifiers || [];

      if (defMods.length === 0 && attMods.length === 0) return '';

      const isBoss = node.node === 'Boss';

      return `
        <div class="base-node ${isBoss ? 'base-node-boss' : ''}">
          <div class="base-node-header">
            <span class="base-node-name">${formatConstraint(node.node)}</span>
          </div>
          <div class="base-node-mods">
            ${defMods.map(mod => renderBaseModCard(mod, 'defender')).join('')}
            ${attMods.map(mod => renderBaseModCard(mod, 'attacker')).join('')}
          </div>
        </div>
      `;
    }).filter(Boolean).join('');

    return `
      <div class="base-map-section">
        <div class="base-map-header">
          ${elementImg ? `<img loading="lazy" src="${elementImg}" alt="${elementName}" class="base-map-element-icon">` : ''}
          <h3 class="base-map-title">${t('fenda.map')} ${map.map} — ${elementName}</h3>
        </div>
        <div class="base-nodes-grid">
          ${nodesHtml}
        </div>
      </div>
    `;
  }).join('');
}

function renderBaseModCard(mod, type) {
  const formattedDesc = (mod.description || '').replace(/\n/g, '<br>');
  const typeLabel = type === 'defender' ? t('fenda.defenderMod') : t('fenda.attackerMod');
  const typeClass = type === 'defender' ? 'mod-defender' : 'mod-attacker';

  return `
    <div class="catalyst-card base-mod-card ${typeClass}">
      <div class="catalyst-card-header">
        <h4>${mod.name}</h4>
        <span class="catalyst-constraint ${typeClass}-badge">${typeLabel}</span>
      </div>
      <div class="catalyst-description">
        <p>${formattedDesc}</p>
      </div>
    </div>
  `;
}

// =====================================================
// SHARED RENDER HELPERS
// =====================================================

function renderRiftModCard(mod, nodeName) {
  const formattedDesc = (mod.description || '').replace(/\n/g, '<br>');

  return `
    <div class="catalyst-card cotw-card">
      <div class="catalyst-card-header">
        <h4>${mod.name}</h4>
        <span class="catalyst-constraint">${formatConstraint(nodeName)}</span>
      </div>
      <div class="catalyst-description">
        <p>${formattedDesc}</p>
      </div>
    </div>
  `;
}

function renderBossCard(mods) {
  const descriptions = mods.map(mod => {
    const formattedDesc = (mod.description || '').replace(/\n/g, '<br>');
    return `<p><strong>${mod.name}</strong></p><p>${formattedDesc}</p>`;
  }).join('<br>');

  return `
    <div class="catalyst-card cotw-card">
      <div class="catalyst-card-header">
        <h4>${mods[0].name}</h4>
        <span class="catalyst-constraint">${formatConstraint('Boss')}</span>
      </div>
      <div class="catalyst-description">
        ${descriptions}
      </div>
    </div>
  `;
}

function renderCatalystCard(item) {
  const state = getState();
  const savedNote = state.userPreferences?.catalystNotes?.[item.name] || item.notes || '';
  const formattedDesc = (item.description || '').replace(/\\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return `
    <div class="catalyst-card">
      <div class="catalyst-card-header">
        <h4>${item.name}</h4>
        ${item.constraint ? `<span class="catalyst-constraint">${item.constraint}</span>` : ''}
      </div>
      <div class="catalyst-description">
        <p>${formattedDesc}</p>
      </div>
      <div class="catalyst-note-container">
        <input type="text"
          class="catalyst-note-input"
          placeholder="${t('catalysts.addNotes')}"
          value="${savedNote}"
          data-cat-name="${item.name}">
      </div>
    </div>
  `;
}

function attachNoteListeners() {
  const inputs = document.querySelectorAll('#fenda-catalyst-container .catalyst-note-input');
  inputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const { updateCatalystNote } = window.__fendaImports || {};
      const val = e.target.value;
      const name = e.target.dataset.catName;
      // Import and call updateCatalystNote
      import('../state/store.js').then(({ updateCatalystNote }) => {
        updateCatalystNote(name, val);
      });
    });
  });
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
  text = text.replace(/\b(\d+\.?\d*)(?:\/\d+\.?\d*)+\b/g, (match) => match.split('/').pop());
  text = text.replace(/\(\+\)/g, '<span class="notation notation-plus" style="color: #4ade80;">(+)</span>');
  text = text.replace(/\(=\)/g, '<span class="notation notation-equal" style="color: #fbbf24;">(=)</span>');
  text = text.replace(/\(-\)/g, '<span class="notation notation-minus" style="color: #f87171;">(-)</span>');
  return text;
}
