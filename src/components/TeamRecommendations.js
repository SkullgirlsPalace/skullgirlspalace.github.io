import { getState } from '../state/store.js';
import { getVariantClasses, getLocalizedVariantClasses } from '../data/variantClasses.js';
import { getVariantImage } from '../data/variantImages.js';
import { t, getLocalizedNameSync } from '../i18n/index.js';
import { escapeTeamText as escape, reviewedTeams } from '../utils/teamData.js';

let dataPromise;
function loadTeams() {
    if (!dataPromise) {
        dataPromise = fetch('data/teams.json').then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        }).catch(error => { dataPromise = null; throw error; });
    }
    return dataPromise;
}

export async function showTeams(container, character, variant, category) {
    const request = {};
    container._teamRequest = request;
    container.textContent = t('teams.loading');
    try {
        const data = await loadTeams();
        if (!container.isConnected || container._teamRequest !== request) return;
        const characters = getState().characters || {};
        const teams = reviewedTeams(data, { character, variant }, category, characters, getVariantClasses);
        container.innerHTML = teams.length ? teams.map(team => `
            <article class="team-recommendation">
                <ol class="team-members">${team.members.map((member, index) => {
                    const memberData = Object.values(characters[member.character].variants).flat().find(item => item.name === member.variant);
                    return `<li><span class="team-position">${t(`teams.${['front', 'middle', 'last'][index]}`)}</span><img loading="lazy" width="160" height="160" src="${escape(getVariantImage(member.character, member.variant))}" alt="">
                        <div><strong>${escape(getLocalizedNameSync(member.variant, memberData?.signature_ability?.name))}</strong>
                        <p>${getLocalizedVariantClasses(member.variant).map(item => escape(item.localized)).join(' · ')}</p></div></li>`;
                }).join('')}</ol>
                <small>${t('teams.reviewedOn')} ${escape(team.reviewedOn)}</small>
            </article>`).join('') : `<p class="teams-message">${t('teams.empty')}</p>`;
    } catch {
        if (container.isConnected && container._teamRequest === request) container.textContent = t('teams.loadError');
    }
}
