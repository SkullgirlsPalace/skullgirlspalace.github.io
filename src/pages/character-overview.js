import { getCharacter } from '../services/dataService.js';
import { setCurrentCharacter } from '../state/store.js';
import { CHARACTER_NAMES_EN } from '../config/constants.js';
import { t, getCurrentLanguage, getLocalizedNameSync, getLocalizedAbilityNameSync, getLocalizedSADescSync } from '../i18n/index.js';
import { characterPath } from '../utils/seoRoutes.js';
import { escapeOverviewHtml as escapeHtml, renderCharacterOverviewContent } from '../utils/characterOverview.js';

const RARITIES = [['diamante', 'diamond'], ['ouro', 'gold'], ['prata', 'silver'], ['bronze', 'bronze']];
const ELEMENTS_EN = { Fogo: 'Fire', Água: 'Water', Ar: 'Wind', Luz: 'Light', Trevas: 'Dark', Neutro: 'Neutral' };

export function render(charKey) {
    const data = getCharacter(charKey);
    if (!data) return `<section class="section character-overview"><h1>${t('detail.characterNotFound')}</h1><a href="/">${t('common.backHome')}</a></section>`;
    const english = getCurrentLanguage() === 'en';
    const name = english ? CHARACTER_NAMES_EN[charKey] || data.character : data.character;
    const groups = RARITIES.map(([key, label]) => ({
        label: t(`rarity.${label}`),
        variants: (data.variants[key] || []).map(variant => ({
            ...variant,
            name: getLocalizedNameSync(variant.name),
            element: english ? ELEMENTS_EN[variant.element] || variant.element : variant.element,
            signature_ability: {
                ...variant.signature_ability,
                name: getLocalizedAbilityNameSync(variant.name, variant.signature_ability?.name),
                description: getLocalizedSADescSync(variant.name, variant.signature_ability?.description)
            }
        }))
    })).filter(group => group.variants.length);
    const copy = { summary: t('characterOverview.summary'), element: t('detail.element'),
        attack: t('variant.attack'), health: t('variant.health'), power: t('variant.power'), ability: t('variant.signatureAbility') };

    return `<section class="section character-overview" id="character-overview">
        <header class="overview-header"><a class="btn-back" href="/" aria-label="${t('common.backHome')}">←</a><h1>${escapeHtml(name)}</h1></header>
        <nav class="detail-tabs" aria-label="${t('characterOverview.sections')}">
            <a class="tab-btn" href="${characterPath(charKey, 'builds')}">${t('variant.builds')}</a>
            <a class="tab-btn" href="${characterPath(charKey, 'tier')}">${t('variant.tierList')}</a>
            <a class="tab-btn" href="/characters/">${t('characters.allCharacters')}</a>
        </nav>
        ${renderCharacterOverviewContent({ name, groups }, copy)}
    </section>`;
}

export function init(charKey) {
    setCurrentCharacter(charKey);
}
