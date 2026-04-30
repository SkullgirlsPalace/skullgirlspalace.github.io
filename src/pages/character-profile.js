// =====================================================
// CHARACTER PROFILE MODAL
// Overlay with About, Variants and Moves
// Accessed via the info icon on the detail page
// =====================================================

import { getCharacter } from '../services/dataService.js';
import { CHARACTER_COLORS, CHARACTER_ICONS, getLocalizedRarityLabel } from '../config/constants.js';
import { getCharacterProfile } from '../data/characterProfiles.js';
import { MOVE_DATA } from '../data/movesimages.js';
import { getVariantImage } from '../data/variantImages.js';
import { formatText } from '../utils/formatters.js';
import { EFFECT_DATA, getLocalizedEffect } from '../data/effectData.js';
import { t, getCurrentLanguage, getLocalizedNameSync } from '../i18n/index.js';

let currentProfileTab = 'about';

/**
 * Render the profile modal HTML (inserted into the detail page)
 * @param {string} charKey - Character key
 * @returns {string} HTML string
 */
export function renderProfileModal(charKeyRaw) {
  const charKey = charKeyRaw.toLowerCase();
  const charData = getCharacter(charKey);
  if (!charData) return '';

  const charIcon = CHARACTER_ICONS[charKey] || `img/${charKey}/icon.webp`;

  return `
  <div class="profile-modal-overlay" id="profile-modal-overlay" style="display: none;" onclick="handleProfileOverlayClick(event)">
    <div class="profile-modal" onclick="event.stopPropagation()">
      <!-- Close button -->
      <button class="profile-modal-close" onclick="closeProfileModal()">&#10005;</button>

      <!-- Header with character name -->
      <div class="profile-modal-header">
        <img loading="lazy" src="${charIcon}" alt="${charData.character}" class="profile-modal-icon"
          onerror="this.src='img/official/Annie_Icon.webp'">
        <h2>${t('detail.profileOf').toUpperCase()} ${(getLocalizedNameSync(charData.character).charAt(0).toUpperCase() + getLocalizedNameSync(charData.character).slice(1)).toUpperCase()}</h2>
      </div>

      <!-- Tab Navigation -->
      <div class="profile-tabs">
        <button class="profile-tab-btn active" data-tab="about" onclick="switchProfileModalTab('${charKey}', 'about')">
          ${t('profile.about')}
        </button>
        <button class="profile-tab-btn" data-tab="variants" onclick="switchProfileModalTab('${charKey}', 'variants')">
          ${t('profile.variants')}
        </button>
        <button class="profile-tab-btn" data-tab="moves" onclick="switchProfileModalTab('${charKey}', 'moves')">
          ${t('profile.moves')}
        </button>
      </div>

      <!-- Tab Contents -->
      <div class="profile-modal-content" id="profile-modal-content">
      </div>
    </div>
  </div>
  `;
}

/**
 * Open the profile modal
 */
export function openProfileModal(charKey) {
  const overlay = document.getElementById('profile-modal-overlay');
  if (!overlay) return;

  currentProfileTab = 'about';
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Reset tab buttons
  overlay.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === 'about');
  });

  // Render initial tab
  renderProfileTabContent(charKey, 'about');

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('visible');
  });
}

/**
 * Close the profile modal
 */
export function closeProfileModal() {
  const overlay = document.getElementById('profile-modal-overlay');
  if (!overlay) return;

  overlay.classList.remove('visible');
  document.body.style.overflow = '';

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
}

/**
 * Handle click on overlay background
 */
export function handleProfileOverlayClick(event) {
  if (event.target.id === 'profile-modal-overlay') {
    closeProfileModal();
  }
}

/**
 * Switch profile modal tab
 */
export async function switchProfileModalTab(charKey, tabName) {
  currentProfileTab = tabName;

  // Update tab buttons
  const overlay = document.getElementById('profile-modal-overlay');
  if (!overlay) return;

  overlay.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  await renderProfileTabContent(charKey, tabName);
}

/**
 * Render tab content into modal
 */
async function renderProfileTabContent(charKeyRaw, tabName) {
  const contentEl = document.getElementById('profile-modal-content');
  if (!contentEl) return;

  const charKey = charKeyRaw.toLowerCase();
  const charData = getCharacter(charKey);
  if (!charData) return;

  const profile = getCharacterProfile(charKey);

  switch (tabName) {
    case 'about':
      contentEl.innerHTML = renderSobreTab(charKey, charData, profile);
      break;
    case 'variants':
      contentEl.innerHTML = renderVariantesTab(charKey, charData);
      break;
    case 'moves':
      contentEl.innerHTML = await renderGolpesTab(charKey);
      break;
  }
}

// ========== TAB RENDERERS ==========

function renderStars(count) {
  if (typeof count === 'string' && (count.toLowerCase() === 'variavel' || count.toLowerCase() === 'vari\u00E1vel' || count.toLowerCase() === 'variable')) {
    return `<span style="font-family: var(--font-secondary), sans-serif; font-size: 0.95rem; color: var(--accent-gold);">${count.toUpperCase()}</span>`;
  }

  // Ensure count is a number
  const starCount = parseInt(count) || 3;
  const starSvg = `<svg viewBox="0 0 24 24" class="stat-star"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  const emptyStarSvg = `<svg viewBox="0 0 24 24" class="stat-star empty" style="opacity: 0.2;"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  let html = '';
  for (let i = 0; i < 5; i++) {
    html += i < starCount ? starSvg : emptyStarSvg;
  }
  return html;
}

function renderSobreTab(charKey, charData, profile) {
  const hasBio = profile && profile.biography;
  const hasData = profile && (profile.birthday || profile.height || profile.weight);

  // Default image format as requested: img/annie/Annie_0.webp
  // Convert e.g., 'black-dahlia' to 'Black_Dahlia'
  const formattedCharName = charKey.split('-').map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '').join('_');
  const heroImage = `img/${charKey}/${formattedCharName}_0.webp`;

  return `
  <div class="profile-tab-panel">
    <!-- Intro Section -->
    <div class="profile-intro-section">
      <div class="profile-intro-image">
        <img src="${heroImage}" alt="${getLocalizedNameSync(charKey, charData.character)}" onerror="this.src='img/official/${formattedCharName}_Icon.webp'">
      </div>
      <div class="profile-intro-stats">
        <div class="stat-rating">
          <span class="stat-rating-label">${t('profile.attack')}</span>
          <div class="stat-rating-stars">${renderStars(profile?.attack || 3)}</div>
        </div>
        <div class="stat-rating">
          <span class="stat-rating-label">${t('profile.health')}</span>
          <div class="stat-rating-stars">${renderStars(profile?.health || 3)}</div>
        </div>
        <div class="stat-playstyle">
          <h4>${t('profile.playstyle')}</h4>
          <p>${profile?.playstyle ? formatText(profile.playstyle) : t('profile.playstyleNA')}</p>
        </div>
      </div>
    </div>

    <!-- Abilities Section -->
    <div class="profile-section abilities-section">
      <div class="profile-section-header" onclick="toggleProfileAbilities()">
        <h3>${t('profile.abilities')}</h3>
        <img src="img/official/IconInfo.webp" alt="${t('profile.expandAlt')}" class="bio-toggle-icon" id="abilities-toggle-icon">
      </div>
      <div class="abilities-content collapsed" id="abilities-content">
        ${renderAbilities(profile)}
      </div>
    </div>

    <!-- Biography Section -->
    <div class="profile-section biography-section">
      <div class="profile-section-header" onclick="toggleProfileBio()">
        <h3>${t('profile.biography')}</h3>
        <img src="img/official/IconInfo.webp" alt="${t('profile.expandAlt')}" class="bio-toggle-icon" id="bio-toggle-icon">
      </div>
      <div class="biography-content collapsed" id="biography-content">
        ${hasBio
          ? `<div class="biography-text">${profile.biography.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}</div>`
          : `<p class="profile-empty">${t('profile.biographyNA')}</p>`
        }
      </div>
    </div>

    <!-- Essential Data Section -->
    <div class="profile-section essential-data-section">
      <h3>${t('profile.essentialData')}</h3>
      ${hasData ? renderEssentialData(profile) : `<p class="profile-empty">${t('profile.essentialDataNA')}</p>`}
    </div>
  </div>
  `;
}

function renderAbilities(profile) {
  if (!profile || (!profile.characterAbility && !profile.superiorAbility1 && !profile.superiorAbility2 && !profile.prestigeAbility)) {
    return `<p class="profile-empty">${t('profile.abilitiesNA')}</p>`;
  }

  let html = '';

  if (profile.characterAbility) {
    html += `
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${t('profile.characterAbility')}</span>
        <span class="ability-title">- ${profile.characterAbility.title}</span>
      </div>
      <div class="ability-desc">${formatText(profile.characterAbility.description)}</div>
    </div>
    `;
  }

  if (profile.superiorAbility1) {
    html += `
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${t('profile.superiorAbility')}</span>
        <span class="ability-title">- ${profile.superiorAbility1.title}</span>
      </div>
      <div class="ability-desc">${formatText(profile.superiorAbility1.description)}</div>
    </div>
    `;
  }

  if (profile.superiorAbility2) {
    html += `
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${t('profile.superiorAbility')}</span>
        <span class="ability-title">- ${profile.superiorAbility2.title}</span>
      </div>
      <div class="ability-desc">${formatText(profile.superiorAbility2.description)}</div>
    </div>
    `;
  }

  if (profile.prestigeAbility) {
    html += `
    <div class="ability-card">
      <div class="ability-header">
        <span class="ability-type">${t('profile.prestigeAbility')}</span>
        <span class="ability-title">- ${profile.prestigeAbility.title}</span>
      </div>
      <div class="ability-desc">${formatText(profile.prestigeAbility.description)}</div>
    </div>
    `;
  }

  return html;
}

function renderEssentialData(profile) {
  return `
  <div class="essential-data-grid">
    <div class="essential-data-left">
      ${profile.birthday ? `
      <div class="data-item">
        <span class="data-label">${t('profile.birthday')}</span>
        <span class="data-value">${profile.birthday}</span>
      </div>
      ` : ''}
      ${profile.bloodType ? `
      <div class="data-item">
        <span class="data-label">${t('profile.bloodType')}</span>
        <span class="data-value">${profile.bloodType}</span>
      </div>
      ` : ''}
      ${profile.height ? `
      <div class="data-item">
        <span class="data-label">${t('profile.height')}</span>
        <span class="data-value">${profile.height}</span>
      </div>
      ` : ''}
      ${profile.weight ? `
      <div class="data-item">
        <span class="data-label">${t('profile.weight')}</span>
        <span class="data-value">${profile.weight}</span>
      </div>
      ` : ''}
    </div>
    <div class="essential-data-right">
      ${profile.likes ? `
      <div class="data-item likes">
        <span class="data-label">${t('profile.likes')}</span>
        <span class="data-value">${profile.likes}</span>
      </div>
      ` : ''}
      ${profile.dislikes ? `
      <div class="data-item dislikes">
        <span class="data-label">${t('profile.dislikes')}</span>
        <span class="data-value">${profile.dislikes}</span>
      </div>
      ` : ''}
    </div>
  </div>
  `;
}

function renderVariantesTab(charKey, charData) {
  if (!charData.variants) {
    return `<div class="profile-tab-panel"><p class="profile-empty">${t('profile.noVariants')}</p></div>`;
  }

  const rarities = ['Diamante', 'Ouro', 'Prata', 'Bronze'];
  let html = '';
  let totalVariants = 0;

  rarities.forEach(rarity => {
    const key = rarity.toLowerCase();
    if (charData.variants[key] && charData.variants[key].length > 0) {
      const variants = charData.variants[key];
      totalVariants += variants.length;
      const rarityIconHtml = `<img src="img/official/icone_${key}.webp" alt="${getLocalizedRarityLabel(key)}" class="variants-rarity-icon">`;

      html += `
      <div class="variants-rarity-group">
        <h3 class="variants-rarity-title ${key}">${rarityIconHtml} ${getLocalizedRarityLabel(key)} (${variants.length})</h3>
        <div class="profile-variants-grid">
          ${variants.map((v, i) => `
          <div class="profile-variant-card animate-in" style="animation-delay: ${i * 0.03}s">
            <img loading="lazy" src="${getVariantImage(charKey, v.name, 0)}" alt="${v.name}" class="profile-variant-img"
              onerror="this.src='img/official/Annie_Icon.webp'">
            <span class="profile-variant-name">${v.name}</span>
          </div>
          `).join('')}
        </div>
      </div>
      `;
    }
  });

  if (totalVariants === 0) {
    return `<div class="profile-tab-panel"><p class="profile-empty">${t('profile.noVariants')}</p></div>`;
  }

  return `
  <div class="profile-tab-panel">
    <div class="variants-total-header">${t('profile.totalVariants')} ${totalVariants}</div>
    ${html}
  </div>
  `;
}

let stanleyMovesCache = null;

async function fetchStanleyMoves() {
  if (stanleyMovesCache) return stanleyMovesCache;
  try {
    const res = await fetch('data/krazete/stanleyDB-moves.json');
    const moves = await res.json();

    const map = {};
    Object.values(moves).forEach(m => {
      if (m.image) {
        const filename = m.image.split('/').pop();
        map[filename] = m.gear || 0;
      }
    });
    stanleyMovesCache = map;
    return map;
  } catch (e) {
    console.error('Failed to load stanley moves:', e);
    return {};
  }
}

async function renderGolpesTab(charKey) {
  const moves = MOVE_DATA[charKey];
  if (!moves || Object.keys(moves).length === 0) {
    return `<div class="profile-tab-panel"><p class="profile-empty">${t('profile.noMoves')}</p></div>`;
  }

  const moveEntries = Object.entries(moves);
  const stanleyMap = await fetchStanleyMoves();

  function getMoveGear(data, moveName) {
    const imgPath = data.image?.image || '';
    const filename = imgPath.split('/').pop();
    const lowerName = (moveName || '').toLowerCase();
    const lowerDesc = (data.description || '').toLowerCase();

    // Priority Overrides (Negative so they always come first in ascending order)
    if (lowerName.includes('explos\u00E3o') || lowerName.includes('burst') || filename.includes('burst')) return -2;
    if (lowerName.includes('expuls\u00E3o') || lowerDesc.includes('expuls\u00E3o') || filename.includes('outtake') || filename.includes('snapback')) return -1;

    if (stanleyMap[filename] !== undefined) {
      return stanleyMap[filename];
    }

    // Fallback to extraction if not found in db
    const match = filename.match(/_(\d+)\.webp$/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  const sortedMoves = moveEntries.sort((a, b) => getMoveGear(a[1], a[0]) - getMoveGear(b[1], b[0]));

  const specialMoves = sortedMoves.filter(([_, data]) => data.type === 'Golpe Especial');
  const blockbusters = sortedMoves.filter(([_, data]) => data.type === 'Blockbuster');
  const others = sortedMoves.filter(([_, data]) => data.type !== 'Golpe Especial' && data.type !== 'Blockbuster');

  function renderMoveGroup(title, entries) {
    if (entries.length === 0) return '';
    return `
    <div class="moves-group">
      <h3 class="moves-group-title">${title} (${entries.length})</h3>
      <div class="moves-grid">
        ${entries.map(([name, data]) => {
          const imgPath = data.image?.image || '';
          const description = data.description || t('profile.noDescription');
          const formattedDesc = description
            .replace(/\\\\n/g, '<br>')
            .replace(/\\n/g, '<br>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

          return `
          <div class="profile-move-card" onclick="toggleMoveDetail(this)">
            <div class="move-card-preview">
              ${imgPath ? `<img loading="lazy" src="${imgPath}" alt="${name}" class="move-card-img" onerror="this.style.display='none'">` : ''}
              <span class="move-card-name">${name}</span>
              <span class="move-card-chevron">&#9660;</span>
            </div>
            <div class="move-card-detail">
              <div class="move-card-type">${data.type || t('profile.unknown')}</div>
              <p class="move-card-desc">${formattedDesc}</p>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    </div>
    `;
  }

  const totalMoves = moveEntries.length;

  return `
  <div class="profile-tab-panel">
    <div class="variants-total-header">${t('profile.totalMoves')} ${totalMoves}</div>
    ${renderMoveGroup(t('profile.specialMoves'), specialMoves)}
    ${renderMoveGroup(t('profile.blockbusters'), blockbusters)}
    ${renderMoveGroup(t('profile.others'), others)}
  </div>
  `;
}

/**
 * Toggle biography expand/collapse
 */
export function toggleProfileBio() {
  const content = document.getElementById('biography-content');
  const icon = document.getElementById('bio-toggle-icon');
  if (!content) return;

  content.classList.toggle('collapsed');
  if (icon) {
    icon.classList.toggle('expanded');
  }
}

/**
 * Toggle move detail expand/collapse
 */
export function toggleMoveDetail(element) {
  element.classList.toggle('expanded');
}

/**
 * Toggle abilities expand/collapse
 */
export function toggleProfileAbilities() {
  const content = document.getElementById('abilities-content');
  const icon = document.getElementById('abilities-toggle-icon');
  if (!content) return;

  content.classList.toggle('collapsed');
  if (icon) {
    icon.classList.toggle('expanded');
  }
}

/**
 * Show a disclaimer/modal with character's Marquee Abilities details
 * @param {string} charKey - Character key
 * @param {string} marqueeName - Recommended marquee name (from JSON)
 */
export function showMarqueeDisclaimer(charKey, marqueeName = '') {
  const profile = getCharacterProfile(charKey);
  if (!profile) return;

  const marquee1 = profile.superiorAbility1;
  const marquee2 = profile.superiorAbility2;
  if (!marquee1) return;

  // Split descriptions into individual options (paragraphs separated by \n\n)
  const allDesc = marquee1.description + (marquee2 ? '\n\n' + marquee2.description : '');
  const paragraphs = allDesc.split(/\n\n+/);

  // We no longer filter individually as per user request. Show all.
  const filteredParts = paragraphs;

  // Check if Critless was mentioned in the original marqueeName
  const isCritlessRecommended = (marqueeName || '').toLowerCase().includes('critless');

  const contentHtml = `
  <div class="marquee-disclaimer-modal" style="
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: #0d0d12; border: 1px solid rgba(212, 168, 75, 0.2); border-radius: 12px;
    padding: 24px; z-index: 10001; max-width: 500px; width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(0, 0, 0, 0.5); color: #fff;
    max-height: 85vh; overflow-y: auto;
  ">
    <div style="background: rgba(255, 255, 255, 0.03); padding: 15px; border-radius: 8px; width: 100%; margin-bottom: 20px; position: relative; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.05);">
      <h3 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
        <i class="fas fa-info-circle" style="color: var(--accent-gold);"></i> ${t('profile.marqueeDetails')}
      </h3>
    </div>

    <h4 style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; font-size: 0.7rem; margin-bottom: 12px; font-family: 'Inter', sans-serif; opacity: 0.8;">
      ${charKey.replace(/-/g, ' ').toUpperCase()} &bull; ${marquee1.title}
    </h4>

    <div class="marquee-options-list">
      ${filteredParts.map(p => {
        // Try to separate title from content. Expecting "NAME - Description"
        const parts = p.split(' - ');
        const title = parts[0];
        const desc = parts.slice(1).join(' - ');

        return `
        <div style="margin-bottom: 16px; background: rgba(255,255,255,0.01); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.03);">
          <h4 style="color: var(--accent-gold); font-size: 0.95rem; margin-bottom: 8px; font-family: 'Inter', sans-serif; font-weight: 700;">${title.toUpperCase()}</h4>
          <p style="font-size: 0.9rem; color: #ccc; line-height: 1.6; font-family: 'Roboto Condensed', sans-serif;">${formatText(desc)}</p>
        </div>
        `;
      }).join('')}
    </div>

    ${isCritlessRecommended ? `
    <div class="critless-note" style="margin-top: 16px; background: rgba(255, 255, 255, 0.02); padding: 12px; border-radius: 8px; border: 1px solid rgba(212, 168, 75, 0.15); cursor: pointer;" onclick="document.querySelectorAll('.marquee-disclaimer-overlay, .marquee-disclaimer-modal').forEach(el => el.remove()); showCritlessDisclaimer();">
      <h4 style="color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-shield-alt"></i> ${t('profile.critlessRecommended')}
      </h4>
      <p style="font-size: 0.8rem; color: #aaa; line-height: 1.4;">
        ${t('profile.critlessClick')}
      </p>
    </div>
    ` : ''}

    <div style="margin-top: 20px; text-align: center;">
      <button onclick="document.querySelectorAll('.marquee-disclaimer-overlay, .marquee-disclaimer-modal').forEach(el => el.remove());" style="
        background: transparent; color: #aaa; border: 1px solid rgba(255,255,255,0.2); padding: 8px 30px;
        border-radius: 20px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.75rem; text-transform: uppercase;
      " onmouseover="this.style.borderColor='var(--accent-gold)'; this.style.color='#fff'" onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'; this.style.color='#aaa'">
        ${t('profile.close')}
      </button>
    </div>
  </div>
  <div class="marquee-disclaimer-overlay" onclick="document.querySelector('.marquee-disclaimer-overlay').remove(); document.querySelector('.marquee-disclaimer-modal').remove();" style="
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85); z-index: 10000; backdrop-filter: blur(4px);
  "></div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'disclaimer-overlay-wrapper';
  overlay.innerHTML = contentHtml;

  // Cleanup any existing ones
  document.querySelectorAll('.marquee-disclaimer-overlay, .marquee-disclaimer-modal').forEach(el => el.remove());

  document.body.appendChild(overlay.querySelector('.marquee-disclaimer-overlay'));
  document.body.appendChild(overlay.querySelector('.marquee-disclaimer-modal'));
}

/**
 * Show a disclaimer for the "Critless" strategy
 */
export function showCritlessDisclaimer() {
  const critless = getLocalizedEffect('critless');

  if (!critless) return;

  const contentHtml = `
  <div class="critless-disclaimer-modal" style="
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: #0d0d12; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
    padding: 24px; z-index: 10002; max-width: 500px; width: 90%;
    box-shadow: 0 30px 90px rgba(0,0,0,1); color: #fff;
    max-height: 85vh; overflow-y: auto;
  ">
    <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
        <i class="fas fa-shield-alt" style="color: var(--accent-gold);"></i> ${t('tooltip.critlessGuide')}
      </h3>
      <button onclick="document.querySelectorAll('.critless-disclaimer-overlay, .critless-disclaimer-modal').forEach(el => el.remove());"
        style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; padding: 0;"
        onmouseover="this.style.background='rgba(255, 255, 255, 0.1)'; this.style.borderColor='rgba(255, 255, 255, 0.3)';"
        onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)';">
        <i class="fas fa-times" style="font-size: 1rem;"></i>
      </button>
    </div>

    <div class="critless-explanation" style="font-size: 0.92rem; color: #bbb; line-height: 1.6; font-family: 'Roboto Condensed', sans-serif;">
      ${formatText(critless.explicacao)}
    </div>
  </div>
  <div class="critless-disclaimer-overlay" onclick="document.querySelectorAll('.critless-disclaimer-overlay, .critless-disclaimer-modal').forEach(el => el.remove());" style="
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); z-index: 10001; backdrop-filter: blur(4px);
  "></div>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'disclaimer-overlay-wrapper';
  overlay.innerHTML = contentHtml;

  // Cleanup any existing ones
  document.querySelectorAll('.critless-disclaimer-overlay, .critless-disclaimer-modal').forEach(el => el.remove());

  document.body.appendChild(overlay.querySelector('.critless-disclaimer-overlay'));
  document.body.appendChild(overlay.querySelector('.critless-disclaimer-modal'));
}

/**
 * Show a disclaimer for a Fenda Catalyst
 */
export async function showCatalystDisclaimer(catalystName) {
    try {
        const res = await fetch('data/krazete/stanleyDB-catalysts.json');
        const db = await res.json();
        
        // Find matching catalyst by name (ignoring case)
        let catalystData = null;
        for (const key in db) {
            if (db[key].name && db[key].name.toLowerCase() === catalystName.toLowerCase()) {
                catalystData = db[key];
                break;
            }
        }
        
        if (!catalystData) {
            console.warn('Catalyst not found:', catalystName);
            return;
        }

        const contentHtml = `
            <div class="catalyst-disclaimer-modal" style="
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: #0d0d12; border: 1px solid rgba(156, 39, 176, 0.4); border-radius: 12px;
                padding: 24px; z-index: 10002; max-width: 500px; width: 90%; 
                box-shadow: 0 30px 90px rgba(0,0,0,1); color: #fff;
                max-height: 85vh; overflow-y: auto;
            ">
                <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #fff; margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; font-family: 'Dodam', sans-serif;">
                        <i class="fas fa-flask" style="color: #e1bee7;"></i> DETALHES DO CATALISADOR
                    </h3>
                    <button onclick="document.querySelectorAll('.catalyst-disclaimer-overlay, .catalyst-disclaimer-modal').forEach(el => el.remove());" 
                        style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; padding: 0; font-size: 1.2rem; font-weight: bold;" 
                        onmouseover="this.style.background='rgba(255, 255, 255, 0.1)'; this.style.borderColor='rgba(255, 255, 255, 0.3)';" 
                        onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.1)';">
                        ✕
                    </button>
                </div>

                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <img src="${catalystData.image}" alt="${catalystData.name}" style="width: 60px; height: 60px; object-fit: contain; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));" onerror="this.style.display='none'">
                    <h4 style="color: #e1bee7; font-size: 1.2rem; margin: 0; font-family: 'Inter', sans-serif; font-weight: 700;">${catalystData.name.toUpperCase()}</h4>
                </div>

                <div class="catalyst-explanation" style="font-size: 0.92rem; color: #bbb; line-height: 1.6; font-family: 'Roboto Condensed', sans-serif; background: rgba(156, 39, 176, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(156, 39, 176, 0.15);">
                    ${[catalystData.SA1, catalystData.SA2, catalystData.SA3]
                        .filter(Boolean)
                        .map(sa => sa.replace(/\b(?:\d+(?:\.\d+)?\/)+(\d+(?:\.\d+)?)\b/g, '$1'))
                        .join('<br><br>')}
                </div>
            </div>
            <div class="catalyst-disclaimer-overlay" onclick="document.querySelectorAll('.catalyst-disclaimer-overlay, .catalyst-disclaimer-modal').forEach(el => el.remove());" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); z-index: 10001; backdrop-filter: blur(4px);
            "></div>
        `;

        const overlay = document.createElement('div');
        overlay.className = 'disclaimer-overlay-wrapper';
        overlay.innerHTML = contentHtml;
        
        // Cleanup any existing ones
        document.querySelectorAll('.catalyst-disclaimer-overlay, .catalyst-disclaimer-modal').forEach(el => el.remove());
        
        document.body.appendChild(overlay.querySelector('.catalyst-disclaimer-overlay'));
        document.body.appendChild(overlay.querySelector('.catalyst-disclaimer-modal'));
    } catch (e) {
        console.error('Failed to load catalyst data:', e);
    }
}

// Register global handlers
window.showMarqueeDisclaimer = showMarqueeDisclaimer;
window.showCritlessDisclaimer = showCritlessDisclaimer;
window.showCatalystDisclaimer = showCatalystDisclaimer;
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.handleProfileOverlayClick = handleProfileOverlayClick;
window.switchProfileModalTab = switchProfileModalTab;
window.toggleProfileBio = toggleProfileBio;
window.toggleProfileAbilities = toggleProfileAbilities;
window.toggleMoveDetail = toggleMoveDetail;
