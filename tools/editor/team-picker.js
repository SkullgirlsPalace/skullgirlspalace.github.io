import { escapeTeamText as esc, sameVariant } from '../../src/utils/teamData.js';
import { emptyPickerFilters, pickerItems } from './picker-model.js';
import { isQuickPreset } from './presets.js';
import { presetShortcuts } from './preset-shortcuts.js';

const ELEMENTS = ['Fogo', 'Água', 'Ar', 'Luz', 'Trevas', 'Neutro'];
const RARITIES = ['diamante', 'ouro', 'prata', 'bronze'];
const CLASSES = ['Ofensivo', 'Defensivo', 'Suporte de Utilidade', 'Coringa'];

export function createTeamPicker(options) {
    const { dialog, text, image, effectImage, classesFor, englishFor, chips } = options;
    let filters = emptyPickerFilters(), context, page = 0, targetPreset = '', notice = '', panel = 'filters', quickPage = 0;
    const button = (action, label, attrs = '') => `<button type="button" data-action="${action}" ${attrs}>${esc(text(label))}</button>`;
    const classLabel = name => text(({ Ofensivo: 'classOffensive', Defensivo: 'classDefensive', 'Suporte de Utilidade': 'classSupport', Coringa: 'classWildcard' })[name]);
    const selectedTeam = () => options.getTeam(context?.teamId);
    const refresh = () => { if (context) render(); };
    function open(teamId, index) {
        context = { teamId, index }; notice = ''; page = 0;
        render(true);
        if (!dialog.open) dialog.showModal();
        dialog.querySelector('#picker-query')?.focus();
    }
    function openPreset(id) {
        context = { presetId: id }; targetPreset = id; notice = ''; page = 0; filters.preset = '';
        render(true);
        if (!dialog.open) dialog.showModal();
        dialog.querySelector('#picker-query')?.focus();
    }
    function openQuick(name) {
        context = { quick: { name, kind: 'team', members: [] } }; notice = ''; page = 0; filters = emptyPickerFilters(); panel = 'filters';
        render(true); if (!dialog.open) dialog.showModal();
        dialog.querySelector('#picker-query')?.focus();
    }
    function quickSelectionMarkup(quick) {
        return `<section class="quick-selection"><label>${text('presetName')}<input id="quick-preset-name" maxlength="80" value="${esc(quick.name)}"></label>
            <p class="help">${text('quickChooseHelp')}</p><div class="quick-selection-members">${quick.members.map((member, index) => `<div><img width="40" height="44" src="${image(member)}" alt=""><span>${index + 1} · ${esc(member.variant)}</span>${button('quick-remove', 'remove', `data-index="${index}"`)}</div>`).join('')}</div></section>`;
    }
    function toggles(group, values, label) {
        return `<div class="picker-toggle-group" role="group" aria-label="${esc(label)}">${values.map(value => `<button type="button" data-picker-group="${group}" data-value="${esc(value)}" class="${filters[group].includes(value) ? 'active' : ''}" aria-pressed="${filters[group].includes(value)}">${esc(group === 'classes' ? classLabel(value) : text(value))}</button>`).join('')}</div>`;
    }
    function effectsMarkup() {
        const query = filters.effectQuery.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return ['buff', 'debuff'].map(type => `<fieldset><legend>${text(type === 'buff' ? 'positiveEffects' : 'negativeEffects')}</legend><div class="picker-effect-options">${Object.entries(options.effects).filter(([, effect]) => effect.icon && (effect.type === type || effect.type === `${type}-term`)).filter(([, effect]) => !query || [effect.name, effect.name_en, ...effect.keys].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(query)).map(([key, effect]) => `<label><input type="checkbox" data-picker-effect="${key}" ${filters.effects.includes(key) ? 'checked' : ''}><img loading="lazy" width="18" height="18" src="${effectImage(effect.icon)}" alt="">${esc(options.getLanguage() === 'en' ? effect.name_en || effect.name : effect.name)}</label>`).join('')}</div></fieldset>`).join('');
    }
    function render(resetResults = false) {
        const team = selectedTeam(), quick = context.quick;
        const editingPreset = quick || context.presetId && options.getPresets().find(preset => preset.id === context.presetId);
        if (!team && !editingPreset) { dialog.close(); return; }
        if (team) context.index = Math.min(context.index, team.members.length);
        const sidebarScroll = dialog.querySelector('.picker-filters')?.scrollTop || 0;
        const resultsScroll = dialog.querySelector('.picker-results')?.scrollTop || 0;
        const presets = options.getPresets();
        if (targetPreset && !presets.some(preset => preset.id === targetPreset)) targetPreset = '';
        if (filters.preset && !presets.some(preset => preset.id === filters.preset)) filters.preset = '';
        const catalog = options.getCatalog();
        const items = pickerItems(catalog, filters, { classesFor, englishFor, effects: options.effects, presets });
        const pages = Math.max(1, Math.ceil(items.length / 12)); page = Math.min(page, pages - 1);
        const characters = [...new Map(catalog.map(item => [item.character, item.characterName])).entries()];
        dialog.innerHTML = `<header class="dialog-heading"><div><p class="eyebrow">${text(editingPreset ? 'presets' : 'teamWorkspace')}</p><h2>${quick ? `${text('quickCreate')} · ${quick.members.length}/2` : editingPreset ? `${esc(editingPreset.name)} · ${editingPreset.members.length}` : text('addMember')}</h2></div><div class="inline-actions">${quick ? button('quick-save', 'quickSave', quick.members.length ? '' : 'disabled') : ''}${button('close-picker', quick ? 'cancelQuick' : editingPreset ? 'close' : 'finishTeam')}</div></header>
            ${quick ? quickSelectionMarkup(quick) : team ? `<p class="picker-order">${text('teamOrder')}</p><div class="picker-team-tray" aria-label="${text('teamOrder')}">${Array.from({ length: 3 }, (_, index) => {
                const member = team.members[index], item = member && catalog.find(item => sameVariant(item, member));
                const fixed = sameVariant(member, team.anchor);
                return `<button type="button" data-action="picker-slot" data-index="${index}" class="${context.index === index ? 'active' : ''}" aria-pressed="${context.index === index}" ${fixed ? 'disabled' : ''}><span>${text(['teamFront', 'teamMiddle', 'teamLast'][index])}</span>${member ? `<img width="44" height="44" src="${image(member)}" alt=""><strong>${esc(item?.variant || member.variant)}</strong>` : `<strong>${text('addMember')}</strong>`}${fixed ? `<small>${text('fixed')}</small>` : ''}</button>`;
            }).join('')}</div>` : `<p class="picker-order">${text('presetPickerHelp')}${editingPreset.kind === 'team' ? ` ${text('teamOrder')}` : ''}</p>`}
            <div class="picker-searchbar"><input id="picker-query" type="search" value="${esc(filters.query)}" aria-label="${text('pickerSearch')}" placeholder="${text('pickerSearch')}">${button('picker-clear', 'clearFilters')}<span role="status">${items.length} ${text('variantsFound')}</span></div>
            <div class="picker-notice" role="status">${esc(notice)}</div>
            <div class="picker-layout"><section class="picker-results" tabindex="0" aria-label="${text('variants')}">${team && presets.some(isQuickPreset) ? presetShortcuts(presets, { text, image, page: quickPage, inPicker: true }) : ''}<div class="picker-grid">${items.slice(page * 12, (page + 1) * 12).map(item => {
                const duplicate = editingPreset ? editingPreset.members.some(member => sameVariant(member, item)) || quick && quick.members.length === 2 : team.members.some((member, index) => index !== context.index && sameVariant(member, item));
                const enName = englishFor(item)?.name?.replace(/\r/g, '').trim();
                return `<article class="member-card"><img loading="lazy" width="130" height="110" src="${image(item)}" alt=""><strong>${esc(item.variant)}</strong>${enName && enName !== item.variant ? `<small lang="en">${esc(enName)}</small>` : ''}<small>${esc(item.characterName)} · ${text(item.rarity)} · ${text(item.data.element)}</small>${chips(item.variant)}<div class="inline-actions">${button('choose-member', editingPreset && !quick ? 'pinVariant' : 'choose', `data-character="${esc(item.character)}" data-variant="${esc(item.variant)}" ${duplicate ? 'disabled' : ''}`)}${button('inspect-picker', 'inspect', `data-character="${esc(item.character)}" data-variant="${esc(item.variant)}"`)}${targetPreset && !editingPreset ? button('preset-pin', 'pinVariant', `data-character="${esc(item.character)}" data-variant="${esc(item.variant)}"`) : ''}</div></article>`;
            }).join('') || `<p class="empty-state">${text('noMatch')}</p>`}</div></section>
            <aside class="picker-filters" aria-label="${text('filters')}"><div class="picker-filter-heading"><h3>${text('filters')}</h3>${button('picker-clear', 'clearFilters')}</div>
                <div class="picker-filter-top"><nav class="picker-panel-tabs" aria-label="${text('section')}">${['filters', 'presets'].map(value => `<button type="button" data-action="picker-panel" data-panel="${value}" aria-pressed="${panel === value}" class="${panel === value ? 'active' : ''}">${text(value)}</button>`).join('')}</nav><div class="picker-direct-clears">${button('picker-class-all', 'clearClasses')}${button('picker-effects-clear', 'clearEffects')}</div></div>
                <div ${panel !== 'filters' ? 'hidden' : ''}>
                <label>${text('character')}<select id="picker-character"><option value="">${text('character')}</option>${characters.map(([key, name]) => `<option value="${esc(key)}" ${key === filters.character ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select></label>
                <label>${text('sortBy')}<select id="picker-sort">${['catalog', 'name', 'score', 'atk', 'hp', 'rarity', 'element', 'class'].map(value => `<option value="${value}" ${filters.sort === value ? 'selected' : ''}>${text(`sort_${value}`)}</option>`).join('')}</select></label>
                <label>${text('sortDirection')}<select id="picker-direction"><option value="asc" ${filters.direction === 'asc' ? 'selected' : ''}>${text('ascending')}</option><option value="desc" ${filters.direction === 'desc' ? 'selected' : ''}>${text('descending')}</option></select></label>
                <h3>${text('rarity')}</h3>${toggles('rarity', RARITIES, text('rarity'))}<h3>${text('element')}</h3>${toggles('element', ELEMENTS, text('element'))}
                <div class="picker-filter-heading"><h3>${text('filterClasses')} · ${filters.classes.length}</h3></div>
                <div class="picker-class-filters">${CLASSES.map((name, index) => `<button type="button" data-action="picker-class" data-class-index="${index}" class="${filters.classes.includes(name) ? 'active' : ''}" aria-pressed="${filters.classes.includes(name)}">${esc(classLabel(name))}</button>`).join('')}</div>
                <div class="picker-filter-heading"><h3>${text('filterEffects')} · ${filters.effects.length}</h3></div>
                <p class="help">${text('effectFilterHelp')}</p><input id="picker-effect-query" type="search" value="${esc(filters.effectQuery)}" aria-label="${text('searchEffects')}" placeholder="${text('searchEffects')}">
                <label>${text('effectMatch')}<select id="picker-effect-match"><option value="any" ${filters.effectMatch === 'any' ? 'selected' : ''}>${text('matchAny')}</option><option value="all" ${filters.effectMatch === 'all' ? 'selected' : ''}>${text('matchAll')}</option></select></label>
                <div class="picker-effect-groups">${effectsMarkup()}</div>
                </div><div ${panel !== 'presets' ? 'hidden' : ''}>
                <h3>${text('presets')}</h3><label>${text('filterPreset')}<select id="picker-preset"><option value="">${text('allPresets')}</option>${presets.map(preset => `<option value="${esc(preset.id)}" ${filters.preset === preset.id ? 'selected' : ''}>${esc(preset.name)}</option>`).join('')}</select></label>
                ${team ? `<label>${text('saveToPreset')}<select id="picker-save-preset"><option value="">${text('noPresetTarget')}</option>${presets.map(preset => `<option value="${esc(preset.id)}" ${targetPreset === preset.id ? 'selected' : ''}>${esc(preset.name)}</option>`).join('')}</select></label><p class="help">${text('presetPickerHelp')}</p>
                <label>${text('applyTeamPreset')}<select id="picker-team-preset"><option value="">${text('choosePreset')}</option>${presets.filter(preset => preset.kind === 'team').map(preset => `<option value="${esc(preset.id)}">${esc(preset.name)}</option>`).join('')}</select></label>${button('picker-apply-preset', 'applyTeamPreset')}` : ''}
                </div>
            </aside></div><nav class="pagination" aria-label="${text('page')}">${button('picker-prev', 'previous', page ? '' : 'disabled')}<span id="picker-page" role="status">${text('page')} ${page + 1}/${pages}</span>${button('picker-next', 'next', page + 1 < pages ? '' : 'disabled')}</nav>`;
        dialog.querySelector('.picker-filters').scrollTop = sidebarScroll;
        dialog.querySelector('.picker-results').scrollTop = resetResults ? 0 : resultsScroll;
    }
    function update(action, resetResults = false) {
        try { action(); } catch (error) { notice = options.humanError(error.message); }
        render(resetResults);
    }
    dialog.addEventListener('click', event => {
        const target = event.target.closest('button'); if (!target || target.disabled) return;
        const action = target.dataset.action;
        if (action === 'close-picker') { dialog.close(); return; }
        if (action === 'quick-save') {
            try { options.onSaveQuick(context.quick.name, context.quick.members); dialog.close(); }
            catch (error) { notice = options.humanError(error.message); render(); }
            return;
        }
        if (action === 'picker-panel') { panel = target.dataset.panel; render(); dialog.querySelector('.picker-filters').scrollTop = 0; dialog.querySelector(`[data-panel="${panel}"]`).focus(); return; }
        if (action === 'inspect-picker') { options.onInspect(target.dataset); return; }
        update(() => {
            if (action === 'choose-member') {
                if (context.quick) {
                    if (context.quick.members.length >= 2) throw new Error('quickMemberLimit');
                    const member = { character: target.dataset.character, variant: target.dataset.variant };
                    if (!context.quick.members.some(item => sameVariant(item, member))) context.quick.members.push(member);
                    notice = text('quickChooseHelp'); return;
                }
                if (context.presetId) { options.onPin(context.presetId, target.dataset); notice = text('presetSaved'); return; }
                options.onChoose(context.teamId, context.index, { character: target.dataset.character, variant: target.dataset.variant });
                const team = selectedTeam(); if (team.members.length < 3) context.index = team.members.length;
                notice = text('memberChosen');
            } else if (action === 'quick-remove') { context.quick.members.splice(Number(target.dataset.index), 1); }
            else if (action === 'quick-prev' || action === 'quick-next') { quickPage = Math.max(0, Number(target.dataset.page)); }
            else if (action === 'quick-use') {
                options.onApplyQuick(context.teamId, target.dataset.preset);
                const team = selectedTeam(); context.index = Math.min(2, team.members.length);
                notice = text('quickApplied');
            } else if (action === 'preset-pin') { options.onPin(targetPreset, target.dataset); notice = text('presetSaved'); }
            else if (action === 'picker-apply-preset') {
                options.onApply(context.teamId, dialog.querySelector('#picker-team-preset').value);
                const team = selectedTeam();
                context.index = team.members.length < 3 ? team.members.length : team.members.findIndex(member => !sameVariant(member, team.anchor));
                notice = text('presetApplied');
            }
            else if (action === 'picker-slot') context.index = Number(target.dataset.index);
            else if (action === 'picker-prev' || action === 'picker-next') page += action === 'picker-prev' ? -1 : 1;
            else {
                page = 0;
                if (action === 'picker-clear') filters = emptyPickerFilters();
                if (action === 'picker-class-all') filters.classes = [];
                if (action === 'picker-effects-clear') { filters.effects = []; filters.effectQuery = ''; filters.effectMatch = 'any'; }
                const group = target.dataset.pickerGroup || (action === 'picker-class' ? 'classes' : null);
                const value = group === 'classes' ? CLASSES[Number(target.dataset.classIndex)] : target.dataset.value;
                if (group) filters[group] = filters[group].includes(value) ? filters[group].filter(item => item !== value) : [...filters[group], value];
            }
        }, !['choose-member', 'quick-remove', 'quick-use', 'preset-pin', 'picker-slot', 'picker-apply-preset'].includes(action));
        const selector = target.id ? `#${target.id}` : target.dataset.pickerGroup ? `[data-picker-group="${target.dataset.pickerGroup}"][data-value="${target.dataset.value}"]` : target.dataset.classIndex ? `[data-class-index="${target.dataset.classIndex}"]` : `[data-action="${action}"]`;
        dialog.querySelector(selector)?.focus({ preventScroll: true });
    });
    dialog.addEventListener('change', event => {
        const target = event.target;
        if (!['picker-character', 'picker-sort', 'picker-direction', 'picker-preset', 'picker-effect-match', 'picker-save-preset'].includes(target.id) && !target.dataset.pickerEffect) return;
        update(() => {
            const fields = { 'picker-character': 'character', 'picker-sort': 'sort', 'picker-direction': 'direction', 'picker-preset': 'preset', 'picker-effect-match': 'effectMatch' };
            if (fields[target.id]) { filters[fields[target.id]] = target.value; page = 0; }
            if (target.id === 'picker-save-preset') targetPreset = target.value;
            const key = target.dataset.pickerEffect;
            if (key) { filters.effects = target.checked ? [...new Set([...filters.effects, key])] : filters.effects.filter(item => item !== key); page = 0; }
        }, target.id !== 'picker-save-preset');
        dialog.querySelector(target.id ? `#${target.id}` : `[data-picker-effect="${target.dataset.pickerEffect}"]`)?.focus({ preventScroll: true });
    });
    dialog.addEventListener('input', event => {
        if (event.target.id === 'quick-preset-name') { context.quick.name = event.target.value; return; }
        const target = event.target, field = { 'picker-query': 'query', 'picker-effect-query': 'effectQuery' }[target.id];
        if (!field) return;
        filters[field] = target.value; page = 0; const caret = target.selectionStart;
        render(true); const input = dialog.querySelector(`#${target.id}`); input.focus(); input.setSelectionRange(caret, caret);
    });
    return { open, openPreset, openQuick, refresh };
}
