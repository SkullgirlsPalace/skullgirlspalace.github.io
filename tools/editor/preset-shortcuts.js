import { escapeTeamText as esc } from '../../src/utils/teamData.js';
import { isQuickPreset } from './presets.js';

/** Small, paginated shortcuts shared by the team page and its picker. */
export function presetShortcuts(presets, { text, image, page = 0, inPicker = false }) {
    const quick = presets.filter(isQuickPreset);
    const pageSize = inPicker ? 2 : 4;
    const pages = Math.max(1, Math.ceil(quick.length / pageSize));
    const current = Math.min(page, pages - 1);
    return `<section class="quick-presets" aria-label="${text('quickPresets')}">
        <header><h3>${text('quickPresets')}</h3>${!inPicker ? `<button type="button" data-action="quick-create">${text('quickCreate')}</button>` : ''}</header>
        <p class="help">${text(inPicker ? 'quickApplyHelp' : 'quickHelp')}</p>
        <div class="quick-presets-grid">${quick.slice(current * pageSize, (current + 1) * pageSize).map(preset => `<button type="button" class="quick-preset" data-action="quick-use" data-preset="${esc(preset.id)}" title="${esc(text(inPicker ? 'quickApplyHelp' : 'quickHelp'))}">
            <strong>${esc(preset.name)}</strong><span class="quick-preset-members">${preset.members.map(member => `<span><img loading="lazy" width="32" height="36" src="${image(member)}" alt=""><span>${esc(member.variant)}</span></span>`).join('')}</span><small>${text(inPicker ? 'quickApply' : 'quickBuild')}</small></button>`).join('') || `<p class="help">${text('quickEmpty')}</p>`}</div>
        ${pages > 1 ? `<nav class="pagination" aria-label="${text('quickPresets')}"><button type="button" data-action="quick-prev" data-page="${current - 1}" ${current === 0 ? 'disabled' : ''}>${text('previous')}</button><span>${text('page')} ${current + 1}/${pages}</span><button type="button" data-action="quick-next" data-page="${current + 1}" ${current + 1 === pages ? 'disabled' : ''}>${text('next')}</button></nav>` : ''}</section>`;
}
