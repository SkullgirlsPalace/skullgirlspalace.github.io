// =====================================================
// CHARACTER PROFILE MODAL
// Overlay com Sobre, Variantes e Golpes
// Acessado pelo ícone de info na página de detail
// =====================================================

import { getCharacter } from '../services/dataService.js';
import { CHARACTER_COLORS, CHARACTER_ICONS } from '../config/constants.js';
import { getCharacterProfile } from '../data/characterProfiles.js';
import { MOVE_DATA } from '../data/movesimages.js';
import { getVariantImage } from '../data/variantImages.js';

let currentProfileTab = 'sobre';

/**
 * Render the profile modal HTML (inserted into the detail page)
 * @param {string} charKey - Character key
 * @returns {string} HTML string
 */
export function renderProfileModal(charKey) {
    const charData = getCharacter(charKey);
    if (!charData) return '';

    const charIcon = CHARACTER_ICONS[charKey] || `img/${charKey}/icon.webp`;

    return `
        <div class="profile-modal-overlay" id="profile-modal-overlay" style="display: none;" onclick="handleProfileOverlayClick(event)">
            <div class="profile-modal" onclick="event.stopPropagation()">
                <!-- Close button -->
                <button class="profile-modal-close" onclick="closeProfileModal()">✕</button>

                <!-- Header with character name -->
                <div class="profile-modal-header">
                    <img loading="lazy" src="${charIcon}" alt="${charData.character}" class="profile-modal-icon"
                         onerror="this.src='img/official/Annie_Icon.webp'">
                    <h2>${charData.character.toUpperCase()}</h2>
                </div>

                <!-- Tab Navigation -->
                <div class="profile-tabs">
                    <button class="profile-tab-btn active" data-tab="sobre" onclick="switchProfileModalTab('${charKey}', 'sobre')">
                        SOBRE
                    </button>
                    <button class="profile-tab-btn" data-tab="variantes" onclick="switchProfileModalTab('${charKey}', 'variantes')">
                        VARIANTES
                    </button>
                    <button class="profile-tab-btn" data-tab="golpes" onclick="switchProfileModalTab('${charKey}', 'golpes')">
                        GOLPES
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

    currentProfileTab = 'sobre';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Reset tab buttons
    overlay.querySelectorAll('.profile-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === 'sobre');
    });

    // Render initial tab
    renderProfileTabContent(charKey, 'sobre');

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
async function renderProfileTabContent(charKey, tabName) {
    const contentEl = document.getElementById('profile-modal-content');
    if (!contentEl) return;

    const charData = getCharacter(charKey);
    if (!charData) return;

    const profile = getCharacterProfile(charKey);

    switch (tabName) {
        case 'sobre':
            contentEl.innerHTML = renderSobreTab(charKey, charData, profile);
            break;
        case 'variantes':
            contentEl.innerHTML = renderVariantesTab(charKey, charData);
            break;
        case 'golpes':
            contentEl.innerHTML = await renderGolpesTab(charKey);
            break;
    }
}

// ========== TAB RENDERERS ==========

function renderStars(count) {
    if (typeof count === 'string' && (count.toLowerCase() === 'variavel' || count.toLowerCase() === 'variável')) {
        return `<span style="font-family: 'Washington', sans-serif; font-size: 0.95rem; color: var(--accent-gold);">${count.toUpperCase()}</span>`;
    }
    const starSvg = `<svg viewBox="0 0 24 24" class="stat-star"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    const emptyStarSvg = `<svg viewBox="0 0 24 24" class="stat-star empty" style="opacity: 0.2;"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    let html = '';
    for (let i = 0; i < 5; i++) {
        html += i < count ? starSvg : emptyStarSvg;
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
                    <img src="${heroImage}" alt="${charData.character}" onerror="this.src='img/official/${formattedCharName}_Icon.webp'">
                </div>
                <div class="profile-intro-stats">
                    <div class="stat-rating">
                        <span class="stat-rating-label">ATAQUE:</span>
                        <div class="stat-rating-stars">${renderStars(profile?.atk || 3)}</div>
                    </div>
                    <div class="stat-rating">
                        <span class="stat-rating-label">VIDA:</span>
                        <div class="stat-rating-stars">${renderStars(profile?.hp || 3)}</div>
                    </div>
                    <div class="stat-playstyle">
                        <h4>ESTILO DE JOGO</h4>
                        <p>${profile?.playstyle || 'Estilo de jogo não disponível.'}</p>
                    </div>
                </div>
            </div>

            <!-- Abilities Section -->
            <div class="profile-section abilities-section">
                <div class="profile-section-header" onclick="toggleProfileAbilities()">
                    <h3>HABILIDADES</h3>
                    <img src="img/official/IconInfo.webp" alt="Expandir" class="bio-toggle-icon" id="abilities-toggle-icon">
                </div>
                <div class="abilities-content collapsed" id="abilities-content">
                    ${renderAbilities(profile)}
                </div>
            </div>

            <!-- Biography Section -->
            <div class="profile-section biography-section">
                <div class="profile-section-header" onclick="toggleProfileBio()">
                    <h3>BIOGRAFIA</h3>
                    <img src="img/official/IconInfo.webp" alt="Expandir" class="bio-toggle-icon" id="bio-toggle-icon">
                </div>
                <div class="biography-content collapsed" id="biography-content">
                    ${hasBio
                        ? `<div class="biography-text">${profile.biography.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}</div>`
                        : `<p class="profile-empty">Biografia ainda não disponível.</p>`
                    }
                </div>
            </div>

            <!-- Essential Data Section -->
            <div class="profile-section essential-data-section">
                <h3>DADOS ESSENCIAIS</h3>
                ${hasData ? renderEssentialData(profile) : '<p class="profile-empty">Dados essenciais ainda não disponíveis.</p>'}
            </div>
        </div>
    `;
}

function renderAbilities(profile) {
    if (!profile || (!profile.characterAbility && !profile.superiorAbility1 && !profile.superiorAbility2 && !profile.prestigeAbility)) {
        return '<p class="profile-empty">Habilidades ainda não disponíveis.</p>';
    }

    let html = '';
    
    if (profile.characterAbility) {
        html += `
            <div class="ability-card">
                <div class="ability-header">
                    <span class="ability-type">HABILIDADE DO PERSONAGEM</span>
                    <span class="ability-title">- ${profile.characterAbility.title}</span>
                </div>
                <div class="ability-desc">${profile.characterAbility.description.replace(/\n/g, '<br>')}</div>
            </div>
        `;
    }
    
    if (profile.superiorAbility1) {
        html += `
            <div class="ability-card">
                <div class="ability-header">
                    <span class="ability-type">HABILIDADE SUPERIOR</span>
                    <span class="ability-title">- ${profile.superiorAbility1.title}</span>
                </div>
                <div class="ability-desc">${profile.superiorAbility1.description.replace(/\n/g, '<br>')}</div>
            </div>
        `;
    }

    if (profile.superiorAbility2) {
        html += `
            <div class="ability-card">
                <div class="ability-header">
                    <span class="ability-type">HABILIDADE SUPERIOR</span>
                    <span class="ability-title">- ${profile.superiorAbility2.title}</span>
                </div>
                <div class="ability-desc">${profile.superiorAbility2.description.replace(/\n/g, '<br>')}</div>
            </div>
        `;
    }

    if (profile.prestigeAbility) {
        html += `
            <div class="ability-card">
                <div class="ability-header">
                    <span class="ability-type">HABILIDADE DE PRESTÍGIO</span>
                    <span class="ability-title">- ${profile.prestigeAbility.title}</span>
                </div>
                <div class="ability-desc">${profile.prestigeAbility.description.replace(/\n/g, '<br>')}</div>
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
                        <span class="data-label">ANIVERSÁRIO:</span>
                        <span class="data-value">${profile.birthday}</span>
                    </div>
                ` : ''}
                ${profile.bloodType ? `
                    <div class="data-item">
                        <span class="data-label">TIPO SANGUÍNEO:</span>
                        <span class="data-value">${profile.bloodType}</span>
                    </div>
                ` : ''}
                ${profile.height ? `
                    <div class="data-item">
                        <span class="data-label">ALTURA:</span>
                        <span class="data-value">${profile.height}</span>
                    </div>
                ` : ''}
                ${profile.weight ? `
                    <div class="data-item">
                        <span class="data-label">PESO:</span>
                        <span class="data-value">${profile.weight}</span>
                    </div>
                ` : ''}
            </div>
            <div class="essential-data-right">
                ${profile.likes ? `
                    <div class="data-item likes">
                        <span class="data-label">GOSTA</span>
                        <span class="data-value">${profile.likes}</span>
                    </div>
                ` : ''}
                ${profile.dislikes ? `
                    <div class="data-item dislikes">
                        <span class="data-label">NÃO GOSTA</span>
                        <span class="data-value">${profile.dislikes}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderVariantesTab(charKey, charData) {
    if (!charData.variants) {
        return `<div class="profile-tab-panel"><p class="profile-empty">Nenhuma variante encontrada.</p></div>`;
    }

    const rarities = ['Diamante', 'Ouro', 'Prata', 'Bronze'];
    let html = '';
    let totalVariants = 0;

    rarities.forEach(rarity => {
        const key = rarity.toLowerCase();
        if (charData.variants[key] && charData.variants[key].length > 0) {
            const variants = charData.variants[key];
            totalVariants += variants.length;
            const rarityIconHtml = `<img src="img/official/icone_${key}.webp" alt="${rarity}" class="variants-rarity-icon">`;
            
            html += `
                <div class="variants-rarity-group">
                    <h3 class="variants-rarity-title ${key}">${rarityIconHtml} ${rarity} (${variants.length})</h3>
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
        return `<div class="profile-tab-panel"><p class="profile-empty">Nenhuma variante encontrada.</p></div>`;
    }

    return `
        <div class="profile-tab-panel">
            <div class="variants-total-header">Total de Variantes: ${totalVariants}</div>
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
        return `<div class="profile-tab-panel"><p class="profile-empty">Nenhum golpe encontrado para este personagem.</p></div>`;
    }

    const moveEntries = Object.entries(moves);
    const stanleyMap = await fetchStanleyMoves();

    function getMoveGear(data, moveName) {
        const imgPath = data.image?.image || '';
        const filename = imgPath.split('/').pop();
        const lowerName = (moveName || '').toLowerCase();
        const lowerDesc = (data.description || '').toLowerCase();
        
        // Priority Overrides (Negative so they always come first in ascending order)
        if (lowerName.includes('explosão') || lowerName.includes('burst') || filename.includes('burst')) return -2;
        if (lowerName.includes('expulsão') || lowerDesc.includes('expulsão') || filename.includes('outtake') || filename.includes('snapback')) return -1;
        
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
                        const description = data.description || 'Sem descrição';
                        const formattedDesc = description
                            .replace(/\\\\n/g, '<br>')
                            .replace(/\\n/g, '<br>')
                            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

                        return `
                            <div class="profile-move-card" onclick="toggleMoveDetail(this)">
                                <div class="move-card-preview">
                                    ${imgPath ? `<img loading="lazy" src="${imgPath}" alt="${name}" class="move-card-img" onerror="this.style.display='none'">` : ''}
                                    <span class="move-card-name">${name}</span>
                                    <span class="move-card-chevron">▼</span>
                                </div>
                                <div class="move-card-detail">
                                    <div class="move-card-type">${data.type || 'Desconhecido'}</div>
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
            <div class="variants-total-header">Total de Golpes: ${totalMoves}</div>
            ${renderMoveGroup('GOLPES ESPECIAIS', specialMoves)}
            ${renderMoveGroup('BLOCKBUSTERS', blockbusters)}
            ${renderMoveGroup('OUTROS', others)}
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

// Register global handlers
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.handleProfileOverlayClick = handleProfileOverlayClick;
window.switchProfileModalTab = switchProfileModalTab;
window.toggleProfileBio = toggleProfileBio;
window.toggleProfileAbilities = toggleProfileAbilities;
window.toggleMoveDetail = toggleMoveDetail;
