import { ELEMENT_MAP, RARITY_LABELS, RARITY_ICONS, CHARACTER_COLORS } from '../config/constants.js';
import { getVariantImage } from '../data/variantImages.js';
import { formatText, formatArsenal, formatBuildText } from '../utils/formatters.js';
import { getState } from '../state/store.js';
import { getVariantClasses, CLASS_ICONS } from '../data/variantClasses.js';
import { getExclusiveData } from '../data/exclusiveVariants.js';
import { isNewVariant } from '../data/newContent.js';
import { CHARACTER_PROFILES } from '../data/characterProfiles.js';
import { hasExtras, getExtrasData } from '../data/extrasData.js';
import { MOVE_DATA } from '../data/movesimages.js';

/**
 * Create variant card HTML with tabbed sections
 * @param {Object} variant - Variant data object
 * @param {string} charKey - Current character key
 * @param {number} index - Index for animation delay
 * @returns {string} HTML string
 */
export function createVariantCard(variant, charKey, index = 0) {
    const charColor = CHARACTER_COLORS[charKey] || 'var(--accent-gold)';

    const elementInfo = ELEMENT_MAP[variant.element] || {
        icon: '⚪',
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
    const abilityDesc = formatText(variant.signature_ability?.description || 'Sem descrição', variant.name);

    // Format arsenal with images
    const arsenalHTML = formatArsenal(variant.recommended_arsenal || '', charKey);

    // Get rarity display name
    const rarityKey = variant.rarityKey || 'diamante';
    const rarityLabel = RARITY_LABELS[rarityKey] || rarityKey.toUpperCase();
    const rarityIcon = RARITY_ICONS[rarityKey] || '';

    // Get Classes
    const variantClasses = getVariantClasses(variant.name);
    const classesHTML = variantClasses.map(cls => {
        const info = CLASS_ICONS[cls];
        if (!info) return '';
        return `
            <div class="variant-class-wrapper">
                <span class="variant-class-label">CLASSE</span>
                <span class="variant-class-tag attr-highlight" data-attr-key="class_${cls}" style="--class-color: ${info.color}">
                    <img src="${info.icon}" alt="${cls}">
                    ${cls.toUpperCase()}
                </span>
            </div>
        `;
    }).join('');

    // Unique ID for this card's tabs
    const cardId = `variant-${charKey}-${index}`;

    // Build content - check if we have build or arsenal data
    let builds = variant.builds ? [...variant.builds].sort((a, b) => {
        // Sort so "Ataque" comes before "Defesa"
        const aIsAttack = a.title.toLowerCase().includes('ataque');
        const bIsAttack = b.title.toLowerCase().includes('ataque');
        if (aIsAttack && !bIsAttack) return -1;
        if (bIsAttack && !aIsAttack) return 1;
        return 0;
    }) : null;
    const buildText = variant.recommended_build || '';
    const hasBuildContent = !!(builds || buildText || arsenalHTML || variant.marquee_ability);

    const saName = variant.signature_ability?.name || 'Habilidade Especial';

    const isNew = isNewVariant(variant.name);
    const newBadgeHTML = isNew ? `
        <img loading="lazy" src="img/official/new_icon_U.webp" alt="Novo" class="new-badge">
    ` : '';

    // Check if variant is exclusive
    const exclusiveData = getExclusiveData(variant.name);
    const exclusiveBadgeHTML = exclusiveData ? `
        <div class="exclusive-badge ${isNew ? 'shifted' : ''}">
            <img loading="lazy" src="${exclusiveData.icon}" alt="Exclusivo" class="exclusive-icon"
                 onerror="this.style.display='none'">
            <div class="exclusive-text-group">
                <span class="exclusive-label">Exclusivo</span>
                <span class="exclusive-source">${exclusiveData.source}</span>
            </div>
        </div>
    ` : '';

    // Helper to render a specific build's content
    const renderBuildContent = (b, isFirst = false) => {
        const bArsenal = formatArsenal(b.recommended_arsenal || '', charKey);
        const marqueeInfo = CHARACTER_PROFILES[charKey]?.superiorAbility1 || null;
        
        return `
            <div class="build-sub-content ${isFirst ? 'active' : ''}" data-build-idx="${variant.name}-${b.title}">
                ${b.marquee_ability ? `
                    <div class="ability-box marquee">
                        <div class="marquee-header" 
                             style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; cursor: pointer;"
                             onclick="showMarqueeDisclaimer('${charKey}', '${b.marquee_ability}')">
                            <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                                HABILIDADE SUPERIOR RECOMENDADA
                                <i class="fas fa-info-circle" style="font-size: 0.8rem; opacity: 0.7;"></i>
                            </h4>
                        </div>
                        <p style="color: #fff; font-weight: 500; font-size: 0.9rem;">${formatText(b.marquee_ability)}</p>
                    </div>
                ` : ''}
                
                ${b.recommended_build ? `
                    <div class="ability-box build">
                        <h4>BUILD RECOMENDADA</h4>
                        <p>${formatBuildText(b.recommended_build)}</p>
                    </div>
                ` : ''}
                
                ${bArsenal ? `
                    <div class="ability-box arsenal">
                        <h4>ARSENAL RECOMENDADO</h4>
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
                <img src="${portraitUrl}" alt="${variant.name}" class="variant-portrait" loading="lazy"
                     onerror="this.src='img/official/Annie_Icon.webp'">
                <div class="variant-classes-display">
                    ${classesHTML}
                </div>
            </div>
            <div class="variant-info">
                <div class="variant-header">
                    <h3>${variant.name}</h3>
                    <div class="variant-meta">
                        <span class="element-badge ${elementInfo.class}">
                            <img loading="lazy" src="${elementInfo.iconPath}" alt="${variant.element}">
                            ${variant.element.toUpperCase()}
                        </span>
                        <span class="rarity-badge ${rarityKey}">
                            ${rarityIcon ? `<img loading="lazy" src="${rarityIcon}" alt="${rarityLabel}" class="rarity-icon">` : ''}
                            ${rarityLabel}
                        </span>
                    </div>
                </div>
                
                <div class="variant-stats">
                    <div class="stat-item">
                        <img loading="lazy" src="img/official/AttackIcon.webp" alt="ATQ" class="stat-icon">
                        <span class="label">ATQ</span>
                        <span class="value">${variant.stats?.attack || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img loading="lazy" src="img/official/HealthIcon.webp" alt="Vida" class="stat-icon">
                        <span class="label">Vida</span>
                        <span class="value">${variant.stats?.health || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img loading="lazy" src="${elementInfo.statIcon}" alt="${variant.element}" class="stat-icon">
                        <span class="label">Pontuação</span>
                        <span class="value">${variant.stats?.power || '-'}</span>
                    </div>
                </div>
                
                <!-- Tab Navigation -->
                <div class="variant-tabs">
                    <button class="variant-tab-btn active" data-tab="habilidade" data-card="${cardId}">
                        Habilidade
                    </button>
                    ${hasBuildContent ? `
                        <button class="variant-tab-btn" data-tab="build" data-card="${cardId}">
                            Build
                        </button>
                    ` : ''}
                    ${hasExtras(charKey, variant.name) ? `
                        <button class="variant-tab-btn extras-tab-btn" data-tab="extras" data-card="${cardId}">
                            ⭐ Extras
                        </button>
                    ` : ''}
                </div>
                
                <div class="variant-tab-contents" id="${cardId}-contents">
                    <!-- Habilidade Tab (Signature Only) -->
                    <div class="variant-tab-content active" data-tab="habilidade">
                        <div class="ability-box">
                            <h4 style="margin-bottom: 8px;">
                                <span style="color: var(--accent-gold)">HABILIDADE CARACTERÍSTICA:</span>
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
                                            HABILIDADE SUPERIOR RECOMENDADA
                                            <i class="fas fa-info-circle" style="font-size: 0.8rem; opacity: 0.7;"></i>
                                        </h4>
                                    </div>
                                        <p style="color: #fff; font-weight: 500; font-size: 0.9rem;">${formatText(variant.marquee_ability)}</p>
                                    </div>
                                ` : ''}
                                ${buildText ? `
                                    <div class="ability-box build">
                                        <h4>BUILD RECOMENDADA</h4>
                                        <p>${formatBuildText(buildText)}</p>
                                    </div>
                                ` : ''}
                                
                                ${arsenalHTML ? `
                                    <div class="ability-box arsenal">
                                        <h4>ARSENAL RECOMENDADO</h4>
                                        <div class="arsenal-list">${arsenalHTML}</div>
                                    </div>
                                ` : ''}
                            `}
                        </div>
                    ` : ''}

                    <!-- Extras Tab -->
                    ${hasExtras(charKey, variant.name) ? `
                        <div class="variant-tab-content" data-tab="extras">
                            ${renderExtrasContent(charKey, variant)}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// ========== EXTRAS RENDERING FUNCTIONS ==========

/**
 * Render the full extras tab content with sub-tabs
 */
function renderExtrasContent(charKey, variant) {
    const extras = getExtrasData(charKey, variant.name);
    if (!extras) return '<p class="profile-empty">Sem extras disponíveis.</p>';

    const cardUid = `extras-${charKey}-${variant.name.replace(/\s+/g, '-')}`;

    const hasGeneral = !!extras.batalhas_gerais;
    const hasGuildas = !!(extras.guildas?.available && extras.guildas.bosses?.length > 0);
    const hasFenda = !!extras.batalhas_fenda;

    return `
        <div class="extras-container" id="${cardUid}">
            <div class="extras-sub-tabs">
                ${hasGeneral ? `<button class="extras-sub-pill active" onclick="switchExtrasSubTab('${cardUid}', 'gerais')">Batalhas Gerais</button>` : ''}
                ${hasGuildas ? `<button class="extras-sub-pill" onclick="switchExtrasSubTab('${cardUid}', 'guildas')">Guildas</button>` : ''}
                ${hasFenda ? `<button class="extras-sub-pill" onclick="switchExtrasSubTab('${cardUid}', 'fenda')">Batalhas da Fenda</button>` : ''}
            </div>

            <div class="extras-sub-contents">
                ${hasGeneral ? `
                    <div class="extras-sub-content active" data-extras-tab="gerais">
                        ${renderBatalhasGerais(extras.batalhas_gerais, charKey)}
                    </div>
                ` : ''}
                ${hasGuildas ? `
                    <div class="extras-sub-content" data-extras-tab="guildas">
                        ${renderGuildas(extras.guildas, charKey)}
                    </div>
                ` : ''}
                ${hasFenda ? `
                    <div class="extras-sub-content" data-extras-tab="fenda">
                        ${renderBatalhasFenda(extras.batalhas_fenda, charKey)}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Get move image for a move name and character
 */
function getMoveImage(charKey, moveName) {
    const moves = MOVE_DATA[charKey];
    if (!moves) return '';
    for (const [name, data] of Object.entries(moves)) {
        if (name.toLowerCase() === moveName.toLowerCase()) {
            return data.image?.image || '';
        }
    }
    return '';
}

/**
 * Render a team member card with image
 */
function renderTeamMemberCard(member) {
    const imgSrc = getVariantImage(member.character, member.variant, 0);
    const classes = getVariantClasses(member.variant) || [];
    const mainClass = classes[0];
    const classInfo = mainClass ? CLASS_ICONS[mainClass] : null;

    return `
        <div class="extras-team-card ${member.is_current ? 'is-current' : ''}">
            <img loading="lazy" src="${imgSrc}" alt="${member.variant}" class="extras-team-img"
                 onerror="this.onerror=null; this.src='img/official/Annie_Icon.webp'">
            <div class="extras-team-info">
                <span class="extras-team-name">${member.variant}</span>
                ${classInfo ? `
                <span class="extras-team-class" style="color: ${classInfo.color}; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                    <img src="${classInfo.icon}" alt="${mainClass}" style="width: 12px; height: 12px; filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));">
                    ${mainClass}
                </span>` : ''}
            </div>
            ${member.is_current ? '<span class="extras-current-badge">ATUAL</span>' : ''}
        </div>
    `;
}

/**
 * Render ally card with image
 */
function renderAllyCard(ally) {
    const imgSrc = getVariantImage(ally.character, ally.variant, 0);
    const classes = getVariantClasses(ally.variant) || [];
    const mainClass = ally.class || classes[0];
    const classInfo = mainClass ? CLASS_ICONS[mainClass] : null;

    return `
        <div class="extras-ally-card">
            <img loading="lazy" src="${imgSrc}" alt="${ally.variant}" class="extras-ally-img"
                 onerror="this.onerror=null; this.src='img/official/Annie_Icon.webp'">
            <div class="extras-ally-info">
                <span class="extras-ally-name">${ally.variant}</span>
                ${classInfo ? `
                <span class="extras-ally-class" style="color: ${classInfo.color}; display: flex; align-items: center; gap: 4px;">
                    <img src="${classInfo.icon}" alt="${mainClass}" style="width: 12px; height: 12px; filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));">
                    ${mainClass}
                </span>` : ''}
            </div>
        </div>
    `;
}

/**
 * Render a matchup card
 */
function renderMatchupCard(matchup) {
    const imgSrc = getVariantImage(matchup.character, matchup.variant, 0);
    return `
        <div class="extras-matchup-card">
            <img loading="lazy" src="${imgSrc}" alt="${matchup.variant}" class="extras-matchup-img"
                 onerror="this.onerror=null; this.src='img/official/Annie_Icon.webp'">
            <div class="extras-matchup-info">
                <span class="extras-matchup-name" style="color: white;">${matchup.variant}</span>
                ${matchup.reason ? `<p class="extras-matchup-reason">${matchup.reason}</p>` : ''}
            </div>
        </div>
    `;
}

/**
 * Render Batalhas Gerais sub-tab content
 */
function renderBatalhasGerais(data, charKey) {
    let html = '';

    // Team section
    if (data.time_recomendado?.length > 0) {
        html += `
            <div class="extras-section">
                <h4 class="extras-section-title">
                    👥 TIME RECOMENDADO
                </h4>
                <div class="extras-team-grid">
                    ${data.time_recomendado.map(m => renderTeamMemberCard(m)).join('')}
                </div>
            </div>
        `;
    }

    // Allies section
    if (data.aliados_recomendados?.length > 0) {
        html += `
            <div class="extras-section">
                <div class="extras-section-header" onclick="toggleExtrasSection(this)">
                    <h4 class="extras-section-title">
                        🤝 ALIADOS RECOMENDADOS
                    </h4>
                    <span class="extras-toggle-icon">▼</span>
                </div>
                <div class="extras-section-body">
                    <div class="extras-allies-grid">
                        ${data.aliados_recomendados.map(a => renderAllyCard(a)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Extra moves section
    if (data.golpes_extras?.length > 0) {
        html += `
            <div class="extras-section">
                <div class="extras-section-header" onclick="toggleExtrasSection(this)">
                    <h4 class="extras-section-title">
                        🥊 GOLPES EXTRAS
                    </h4>
                    <span class="extras-toggle-icon">▼</span>
                </div>
                <div class="extras-section-body">
                    <div class="extras-moves-grid">
                        ${data.golpes_extras.map(move => {
                            const moveImg = getMoveImage(charKey, move.name);
                            return `
                                <div class="extras-move-card">
                                    ${moveImg ? `<img loading="lazy" src="${moveImg}" alt="${move.name}" class="extras-move-img" onerror="this.style.display='none'">` : ''}
                                    <div class="extras-move-info">
                                        <span class="extras-move-name">${move.name}</span>
                                        <p class="extras-move-reason">${move.reason}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    return html || '<p class="profile-empty">Nenhuma informação disponível.</p>';
}

/**
 * Render Guildas sub-tab content
 */
function renderGuildas(data, charKey) {
    if (!data.bosses || data.bosses.length === 0) {
        return '<p class="profile-empty">Nenhuma recomendação para guildas.</p>';
    }

    return data.bosses.map(boss => `
        <div class="extras-boss-section">
            <div class="extras-boss-header">
                <div class="extras-boss-icon-wrapper">
                    <img src="${boss.icon || 'img/official/SkullModifierIcon.webp'}" alt="${boss.boss_name}" class="extras-boss-icon">
                </div>
                <div class="extras-boss-names">
                    <span class="extras-boss-name">${boss.boss_name}</span>
                    <span class="extras-boss-name-en">${boss.boss_character || boss.boss_name_en}</span>
                </div>
            </div>

            ${boss.team?.length > 0 ? `
                <div class="extras-section">
                    <h4 class="extras-section-title mini">
                        👥 TIME SUGERIDO
                    </h4>
                    <div class="extras-team-grid">
                        ${boss.team.map(m => renderTeamMemberCard(m)).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `).join('<div class="extras-boss-divider"></div>');
}

/**
 * Render Batalhas da Fenda sub-tab content
 */
function renderBatalhasFenda(data, charKey) {
    let html = '';
    const defesa = data.defesa;

    if (defesa) {
        if (defesa.boa_contra?.length > 0) {
            html += `
                <div class="extras-section">
                    <h4 class="extras-section-title">
                        🛡️ SE DÁ BEM CONTRA (DEFESA)
                    </h4>
                    <div class="extras-matchups-grid">
                        ${defesa.boa_contra.map(m => renderMatchupCard(m)).join('')}
                    </div>
                </div>
            `;
        }

        if (defesa.ruim_contra?.length > 0) {
            html += `
                <div class="extras-section">
                    <h4 class="extras-section-title">
                        ⚠️ DIFICULDADE CONTRA
                    </h4>
                    <div class="extras-matchups-grid">
                        ${defesa.ruim_contra.map(m => renderMatchupCard(m)).join('')}
                    </div>
                </div>
            `;
        }

        if (defesa.catalisadores_dificeis?.length > 0) {
            html += `
                <div class="extras-section">
                    <h4 class="extras-section-title">
                        🧪 CATALISADORES DIFÍCEIS
                    </h4>
                    <div class="extras-catalyst-tags">
                        ${defesa.catalisadores_dificeis.map(c => `<span class="catalyst-tag" style="cursor: pointer;" onclick="showCatalystDisclaimer('${c}')">${c}</span>`).join('')}
                    </div>
                </div>
            `;
        }
    }

    // Extra moves for rift
    if (data.golpes_extras?.length > 0) {
        html += `
            <div class="extras-section">
                <div class="extras-section-header" onclick="toggleExtrasSection(this)">
                    <h4 class="extras-section-title">
                        🥊 GOLPES EXTRAS PARA FENDA
                    </h4>
                    <span class="extras-toggle-icon">▼</span>
                </div>
                <div class="extras-section-body">
                    <div class="extras-moves-grid">
                        ${data.golpes_extras.map(move => {
                            const moveImg = getMoveImage(charKey, move.name);
                            return `
                                <div class="extras-move-card">
                                    ${moveImg ? `<img loading="lazy" src="${moveImg}" alt="${move.name}" class="extras-move-img" onerror="this.style.display='none'">` : ''}
                                    <div class="extras-move-info">
                                        <span class="extras-move-name">${move.name}</span>
                                        <p class="extras-move-reason">${move.reason}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    return html || '<p class="profile-empty">Nenhuma informação de fenda disponível.</p>';
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
        container.innerHTML = '<p style="color: var(--text-muted); padding: 20px;">Nenhuma variante encontrada com estes filtros.</p>';
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
