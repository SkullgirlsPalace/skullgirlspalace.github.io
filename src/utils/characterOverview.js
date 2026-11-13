import { stripAbilityLabels, localizePortugueseAbility, normalizeAbilityProgressions } from './abilityText.js';

export function escapeOverviewHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

/** Plain text derived from existing editorial data, shared by static HTML and the SPA. */
export function renderPlainParagraphs(text) {
    return stripAbilityLabels(text).replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/<:[^:]+:\d+>/g, '').replace(/\\n/g, '\n').split(/\n+/)
        .map(line => line.trim()).filter(Boolean)
        .map(line => `<p>${escapeOverviewHtml(line)}</p>`).join('');
}

const DEFAULT_COPY = {
    summary: '{name} tem {count} variantes em Skullgirls Mobile.',
    element: 'Elemento', attack: 'Ataque', health: 'Vida', power: 'Pontuação',
    ability: 'Habilidade característica'
};

export function renderCharacterOverviewContent(character, copy = DEFAULT_COPY) {
    const count = character.groups.reduce((total, group) => total + group.variants.length, 0);
    const summary = copy.summary.replace('{name}', () => character.name).replace('{count}', String(count));
    return `<p class="overview-summary">${escapeOverviewHtml(summary)}</p>`
        + character.groups.map(group => `<section class="overview-rarity"><h2>${escapeOverviewHtml(group.label)}</h2><div class="overview-variants">`
            + group.variants.map(variant => {
                const stats = variant.stats || {}, signature = variant.signature_ability || {};
                return `<article class="overview-variant"><h3>${escapeOverviewHtml(variant.name)}</h3>`
                    + `<p>${escapeOverviewHtml(copy.element)}: ${escapeOverviewHtml(variant.element)}. ${escapeOverviewHtml(copy.attack)} ${escapeOverviewHtml(stats.attack)}, ${escapeOverviewHtml(copy.health)} ${escapeOverviewHtml(stats.health)}, ${escapeOverviewHtml(copy.power)} ${escapeOverviewHtml(stats.power)}.</p>`
                    + `<h4>${escapeOverviewHtml(copy.ability)}: ${escapeOverviewHtml(signature.name)}</h4>${renderPlainParagraphs(normalizeAbilityProgressions(copy.language === 'en' ? signature.description : localizePortugueseAbility(signature.description)))}</article>`;
            }).join('') + '</div></section>').join('');
}
