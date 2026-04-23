import { getElementMap, getRarityLabels, getLocalizedRarityLabel, getLocalizedElementName, RARITY_ICONS, CHARACTER_COLORS } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { formatText, formatArsenal, formatBuildText } from '../utils/formatters.js';
import { getState } from '../state/store.js';
import { getLocalizedClassName, getLocalizedVariantClasses, CLASS_ICONS } from '../data/variantClasses.js';
import { getExclusiveData } from '../data/exclusiveVariants.js';
import { isNewVariant } from '../data/newContent.js';
import { t, getCurrentLanguage, getLocalizedNameSync, getLocalizedAbilityNameSync, getLocalizedSADescSync } from '../i18n/index.js';

/**
 * Create variant card HTML with tabbed sections
 * @param {Object} variant - Variant data object
 * @param {string} charKey - Current character key
 * @param {number} index - Index for animation delay
 * @returns {string} HTML string
 */
export function createVariantCard(variant, charKey, index = 0) {
  const charColor = CHARACTER_COLORS[charKey] || 'var(--accent-gold)';

  const elementMap = getElementMap();
  const elementInfo = elementMap[variant.element] || {
    icon: '\u26AB',
    class: 'neutral',
    iconPath: 'img/official/ElementalFireBackless.webp',
    statIcon: 'img/official/ElementalIconNeutral.webp'
  };

  // Get portrait URL - prioritize local backup, fallback to JSON, then default
  let portraitUrl = getVariantImage(charKey, variant.name, index);
  if (portraitUrl.includes('_Icon.webp') && variant.images?.portrait_url) {
    portraitUrl = variant.images.portrait_url;
  }

  // Format ability description
  const rawSADesc = variant.signature_ability?.description || t('variant.noDescription');
 const localizedSADesc = getLocalizedSADescSync(variant.name, rawSADesc);
 const abilityDesc = formatText(localizedSADesc, variant.name);

  // Format arsenal with images
  const arsenalHTML = formatArsenal(variant.recommended_arsenal || '', charKey);

  // Get rarity display name — use i18n
  const rarityKey = variant.rarityKey || 'diamante';
  const rarityLabel = getLocalizedRarityLabel(rarityKey);
  const rarityIcon = RARITY_ICONS[rarityKey] || '';

  // Get Classes — use localized names
  const variantClasses = getLocalizedVariantClasses(variant.name);
  const classesHTML = variantClasses.map(cls => {
    const info = CLASS_ICONS[cls.key];
    if (!info) return '';
    return `
      <div class="variant-class-wrapper">
        <span class="variant-class-label">${t('variant.class')}</span>
        <span class="variant-class-tag attr-highlight" data-attr-key="class_${cls.key}" style="--class-color: ${info.color}">
          <img src="${info.icon}" alt="${cls.localized}">
          ${cls.localized.toUpperCase()}
        </span>
      </div>
    `;
  }).join('');

  // Unique ID for this card's tabs
  const cardId = `variant-${charKey}-${index}`;

  // Build content - check if we have build or arsenal data
  let builds = variant.builds ? [...variant.builds].sort((a, b) => {
    const aIsAttack = a.title.toLowerCase().includes('ataque') || a.title.toLowerCase().includes('attack');
    const bIsAttack = b.title.toLowerCase().includes('ataque') || b.title.toLowerCase().includes('attack');
    if (aIsAttack && !bIsAttack) return -1;
    if (bIsAttack && !aIsAttack) return 1;
    return 0;
  }) : null;
  const buildText = variant.recommended_build || '';
  const hasBuildContent = !!(builds || buildText || arsenalHTML || variant.marquee_ability);

  const rawSAName = variant.signature_ability?.name || t('variant.specialAbility');
 const saName = getLocalizedAbilityNameSync(variant.name, rawSAName);

  const isNew = isNewVariant(variant.name);
  const newBadgeHTML = isNew ? `
    <img loading="lazy" src="img/official/new_icon_U.webp" alt="${t('variant.new')}" class="new-badge">
  ` : '';

  // Check if variant is exclusive
  const exclusiveData = getExclusiveData(variant.name);
  const exclusiveBadgeHTML = exclusiveData ? `
    <div class="exclusive-badge ${isNew ? 'shifted' : ''}">
      <img loading="lazy" src="${exclusiveData.icon}" alt="${t('variant.exclusive')}" class="exclusive-icon"
        onerror="this.style.display='none'">
      <div class="exclusive-text-group">
        <span class="exclusive-label">${t('variant.exclusive')}</span>
        <span class="exclusive-source">${exclusiveData.source}</span>
      </div>
    </div>
  ` : '';

  // Get localized element display name
  const elementDisplayName = getLocalizedElementName(variant.element).toUpperCase();

  // Helper to render a specific build's content
  const renderBuildContent = (b, isFirst = false) => {
    const bArsenal = formatArsenal(b.recommended_arsenal || '', charKey);

    return `
    <div class="build-sub-content ${isFirst ? 'active' : ''}" data-build-idx="${variant.name}-${b.title}">
      ${b.marquee_ability ? `
        <div class="ability-box marquee">
          <div class="marquee-header"
            style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; cursor: pointer;"
            onclick="showMarqueeDisclaimer('${charKey}', '${b.marquee_ability}')">
            <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
              ${t('variant.recommendedMarquee')}
              <i class="fas fa-info-circle" style="font-size: 0.8rem; opacity: 0.7;"></i>
            </h4>
          </div>
          <p style="color: #fff; font-weight: 500; font-size: 0.9rem;">${formatText(b.marquee_ability)}</p>
        </div>
      ` : ''}

      ${b.recommended_build ? `
        <div class="ability-box build">
          <h4>${t('variant.recommendedBuild')}</h4>
          <p>${formatBuildText(b.recommended_build)}</p>
        </div>
      ` : ''}

      ${bArsenal ? `
        <div class="ability-box arsenal">
          <h4>${t('variant.recommendedArsenal')}</h4>
          <div class="arsenal-list">${bArsenal}</div>
        </div>
      ` : ''}
    </div>
    `;
  };

  return `
  <div class="variant-card ${rarityKey} animate-in" style="animation-delay: ${index * 0.05}s">
    ${newBadgeHTML}
    ${exclusiveBadgeHTML}
    <div class="variant-left-section">
      <img src="${portraitUrl}" alt="${getLocalizedNameSync(variant.name)}" class="variant-portrait" loading="lazy"
        onerror="this.src='img/official/Annie_Icon.webp'">
      <div class="variant-classes-display">
        ${classesHTML}
      </div>
    </div>
    <div class="variant-info">
      <div class="variant-header">
        <h3>${getLocalizedNameSync(variant.name)}</h3>
        <div class="variant-meta">
          <span class="element-badge ${elementInfo.class}">
            <img loading="lazy" src="${elementInfo.iconPath}" alt="${elementDisplayName}">
            ${elementDisplayName}
          </span>
          <span class="rarity-badge ${rarityKey}">
            ${rarityIcon ? `<img loading="lazy" src="${rarityIcon}" alt="${rarityLabel}" class="rarity-icon">` : ''}
            ${rarityLabel}
          </span>
        </div>
      </div>

      <div class="variant-stats">
        <div class="stat-item">
          <img loading="lazy" src="img/official/AttackIcon.webp" alt="${t('variant.attack')}" class="stat-icon">
          <span class="label">${t('variant.attack')}</span>
          <span class="value">${variant.stats?.attack || '-'}</span>
        </div>
        <div class="stat-item">
          <img loading="lazy" src="img/official/HealthIcon.webp" alt="${t('variant.health')}" class="stat-icon">
          <span class="label">${t('variant.health')}</span>
          <span class="value">${variant.stats?.health || '-'}</span>
        </div>
        <div class="stat-item">
          <img loading="lazy" src="${elementInfo.statIcon}" alt="${elementDisplayName}" class="stat-icon">
          <span class="label">${t('variant.power')}</span>
          <span class="value">${variant.stats?.power || '-'}</span>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="variant-tabs">
        <button class="variant-tab-btn active" data-tab="habilidade" data-card="${cardId}">
          ${t('variant.ability')}
        </button>
        ${hasBuildContent ? `
          <button class="variant-tab-btn" data-tab="build" data-card="${cardId}">
            ${t('variant.build')}
          </button>
        ` : ''}
      </div>

      <div class="variant-tab-contents" id="${cardId}-contents">
        <!-- ${t('variant.ability')} Tab (Signature Only) -->
        <div class="variant-tab-content active" data-tab="habilidade">
          <div class="ability-box">
            <h4 style="margin-bottom: 8px;">
              <span style="color: var(--accent-gold)">${t('variant.signatureAbility')}:</span>
              <span style="color: #fff; margin-left: 6px;">${saName.toUpperCase()}</span>
            </h4>
            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 12px 0;"></div>
            <p style="margin-bottom: 16px;">${abilityDesc}</p>
          </div>
        </div>

        <!-- Build Tab (Build + Arsenal) -->
        ${hasBuildContent ? `
        <div class="variant-tab-content" data-tab="build">
          ${builds ? `
            <div class="build-selector">
              ${builds.map((b, i) => `
                <button class="build-pill ${i === 0 ? 'active' : ''}"
                  onclick="switchVariantBuild(this, '${variant.name}-${b.title}')">
                  ${b.title.toUpperCase()}
                </button>
              `).join('')}
            </div>
            <div class="build-contents-wrapper">
              ${builds.map((b, i) => renderBuildContent(b, i === 0)).join('')}
            </div>
          ` : `
            <div class="variant-classes-display empty-classes"></div>
            ${variant.marquee_ability ? `
              <div class="ability-box marquee">
                <div class="marquee-header"
                  style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; cursor: pointer;"
                  onclick="showMarqueeDisclaimer('${charKey}', '${variant.marquee_ability}')">
                  <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                    ${t('variant.recommendedMarquee')}
                    <i class="fas fa-info-circle" style="font-size: 0.8rem; opacity: 0.7;"></i>
                  </h4>
                </div>
                <p style="color: #fff; font-weight: 500; font-size: 0.9rem;">${formatText(variant.marquee_ability)}</p>
              </div>
            ` : ''}
            ${buildText ? `
              <div class="ability-box build">
                <h4>${t('variant.recommendedBuild')}</h4>
                <p>${formatBuildText(buildText)}</p>
              </div>
            ` : ''}

            ${arsenalHTML ? `
              <div class="ability-box arsenal">
                <h4>${t('variant.recommendedArsenal')}</h4>
                <div class="arsenal-list">${arsenalHTML}</div>
              </div>
            ` : ''}
          `}
        </div>
        ` : ''}
      </div>
    </div>
  </div>
  `;
}

/**
 * Switch between multiple builds for a variant
 */
window.switchVariantBuild = function(btn, buildKey) {
  const wrapper = btn.closest('.variant-tab-content');
  if (!wrapper) return;

  // Update pills
  wrapper.querySelectorAll('.build-pill').forEach(p => p.classList.toggle('active', p === btn));

  // Update contents
  wrapper.querySelectorAll('.build-sub-content').forEach(content => {
    content.classList.toggle('active', content.dataset.buildIdx === buildKey);
  });
};


/**
 * Render variants container
 * @param {string} containerId - Container element ID
 * @param {Array} variants - Array of variant objects
 * @param {string} charKey - Current character key
 */
export function renderVariants(containerId, variants, charKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!variants || variants.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); padding: 20px;">${t('variant.noVariants')}</p>`;
    return;
  }

  container.innerHTML = variants
    .map((variant, index) => createVariantCard(variant, charKey, index))
    .join('');

  // Attach event listeners for tab switching
  container.querySelectorAll('.variant-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const cardId = this.dataset.card;
      const tabName = this.dataset.tab;
      switchVariantTab(cardId, tabName);
    });
  });
}

/**
 * Switch variant card tab
 * @param {string} cardId - Card ID
 * @param {string} tabName - Tab name to switch to
 */
function switchVariantTab(cardId, tabName) {
  const contents = document.getElementById(`${cardId}-contents`);
  if (!contents) return;

  // Update tab buttons
  const card = contents.closest('.variant-card');
  if (card) {
    card.querySelectorAll('.variant-tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle('active', isActive);
    });
  }

  // Update tab contents
  contents.querySelectorAll('.variant-tab-content').forEach(content => {
    const isActive = content.dataset.tab === tabName;
    content.classList.toggle('active', isActive);
  });
}
