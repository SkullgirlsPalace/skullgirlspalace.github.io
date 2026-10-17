import { CHARACTER_FILES } from '../../src/config/constants.js';
import { VARIANT_CLASSES } from '../../src/data/variantClassData.js';
import { getVariantImage } from '../../src/data/variantImages.js';
import { EFFECT_DATA } from '../../src/data/effectData.js';
import { escapeTeamText as esc, supportsDefensiveTeams, validateTeam, sameVariant } from '../../src/utils/teamData.js';
import { catalogFrom, charactersFrom, clone, equal, makeBackup, restoreBackup, validateChanges, exportFiles, teamsFor, CLASS_PATH, CLASS_NAMES, TIER_MODES, RANKS, EDITABLE_BUILD_FIELDS } from './model.js';
import { createZip } from './zip.js';
import { strings } from './strings.js';
import { isLocalEditorURL, showLocalOnlyMessage } from './local-only.js';
import { initEditorTheme } from './theme.js';
import { EN_ABILITIES_PATH, PT_MAPPING_PATH, buildAbilityLinks, abilityIdentity, englishAbility } from './abilities.js';
import { stripAbilityLabels, splitSignatureAbility, joinSignatureAbility, localizePortugueseAbility, normalizeAbilityProgressions } from '../../src/utils/abilityText.js';
import { EDITOR_VERSION, EDITOR_LABEL, backupFilename } from './version.js';
import { createTeamPicker } from './team-picker.js';
import { validatePresets, membersFromPreset, membersWithCompanions, isQuickPreset, PRESET_KINDS } from './presets.js';
import { presetShortcuts } from './preset-shortcuts.js';
import { createExportArchive } from './transfer.js';

const root = document.querySelector('#editor');
const picker = document.querySelector('#picker');
const review = document.querySelector('#review');
const repo = new URL('../../', document.baseURI);
const storageKey = `palace-editor:${EDITOR_LABEL}:${repo.pathname}`;
const legacyStorageKeys = Array.from({ length: EDITOR_VERSION - 1 }, (_, index) => `palace-editor:v${EDITOR_VERSION - index - 1}:${repo.pathname}`);
const theme = isLocalEditorURL(window.location.href) ? initEditorTheme() : null;
let language = localStorage.getItem('palace-editor-language') || 'pt-BR';
if (!strings[language]) language = 'pt-BR';
const state = { base: {}, files: {}, presets: [], abilityLinks: {}, selected: null, tab: 'teams', category: 'general', query: '', character: '', page: 0, recovery: null, undo: null, saveError: false, notice: '' };
let quickPage = 0;
let recoveryDownloaded = false;
const text = key => strings[language][key] || key;
const classesFor = name => state.files[CLASS_PATH]?.[name] || ['Ofensivo'];
const classLabel = name => text(({ Ofensivo: 'classOffensive', Defensivo: 'classDefensive', 'Suporte de Utilidade': 'classSupport', Coringa: 'classWildcard' })[name]);
const image = member => new URL(getVariantImage(member.character, member.variant), repo).href;
const selected = () => catalogFrom(state.files).find(item => sameVariant(item, state.selected));
const today = () => { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; };
const englishFor = item => {
    const source = englishAbility(state.files, state.abilityLinks, item);
    const edited = item?.data.signature_ability?.english;
    return edited ? { ...source, ability: edited.name, ...splitSignatureAbility(edited.description) } : source ? { ...source } : null;
};
const displayName = item => language === 'en' ? englishFor(item)?.name?.replace(/\r/g, '').trim() || item.variant : item.variant;
const chips = name => `<div class="chips">${classesFor(name).map((value, index) => index === 0
    ? `<span class="chip" title="${text('primaryClass')}">${esc(classLabel(value))}</span>`
    : `<span class="secondary-class">${text('alsoActsAs')}: ${esc(classLabel(value))}</span>`).join('')}</div>`;
const btn = (action, label, attributes = '', style = '') => `<button type="button" data-action="${action}" class="${style}" ${attributes}>${esc(text(label))}</button>`;
const rich = value => esc(value || text('missing')).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const richAbility = (value, locale) => rich(normalizeAbilityProgressions(stripAbilityLabels(locale === 'pt-BR' ? localizePortugueseAbility(value) : value)));
function humanError(error) {
    const index = error.lastIndexOf(': ');
    const prefix = index >= 0 ? `${error.slice(0, index)}: ` : '';
    const code = index >= 0 ? error.slice(index + 2) : error;
    return prefix + (strings[language].validation[code] || code);
}

async function readJson(path) {
    const response = await fetch(new URL(path, repo), { cache: 'no-cache' });
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return response.json();
}

function download(blob, name) {
    const url = URL.createObjectURL(blob), anchor = document.createElement('a');
    anchor.href = url; anchor.download = name; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function downloadBackup() {
    const backup = state.recovery || makeBackup(state.base, state.files, state.presets);
    download(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }), backupFilename(backup));
}
function save() {
    if (state.recovery) return;
    try { localStorage.setItem(storageKey, JSON.stringify(makeBackup(state.base, state.files, state.presets))); state.saveError = false; }
    catch { state.saveError = true; }
    updateSaveState();
}
function updateSaveState() {
    const status = root.querySelector('#save-state');
    if (!status) return;
    const count = Object.keys(exportFiles(state.base, state.files)).length;
    status.textContent = state.saveError ? text('saveError') : `${text('saved')} · ${count} ${text('changed')}`;
    status.classList.toggle('error', state.saveError);
}
function checkpoint() { state.undo = { files: clone(state.files), presets: clone(state.presets) }; }
function commitEdit() { save(); renderMain(); renderCatalog(); }
function invalidateTeams(member) {
    for (const team of state.files['data/teams.json'].teams) {
        if (sameVariant(team.anchor, member) || team.members.some(item => sameVariant(item, member))) team.status = 'draft';
    }
}

function render() {
    document.documentElement.lang = language;
    document.title = `Palace ${text('studio')} ${EDITOR_LABEL}`;
    root.innerHTML = `<header class="topbar">
        <div><div class="wordmark">PALACE<span>${text('studio')}</span><small>${EDITOR_LABEL}</small></div><span class="local-tag">● ${text('local')}</span></div>
        <div class="top-actions">
            <select id="editor-theme" aria-label="${text('theme')}">${['dark', 'light', 'system'].map(value => `<option value="${value}" ${theme?.getPreference() === value ? 'selected' : ''}>${text(`theme_${value}`)}</option>`).join('')}</select>
            <select id="editor-language" aria-label="${text('language')}"><option value="pt-BR" ${language === 'pt-BR' ? 'selected' : ''}>PT-BR</option><option value="en" ${language === 'en' ? 'selected' : ''}>English</option></select>
            ${btn('undo', 'undo', state.undo ? '' : 'disabled')}
            ${btn('moves-gallery', 'movesGallery')}${btn('help', 'help')}${btn('backup', 'backup')}${btn('import', 'import')}${btn('review', 'export', '', 'primary')}
        </div></header>
        <div class="workspace"><aside class="sidebar"><div class="sidebar-head"><h2>${text('variants')}<small>${catalogFrom(state.files).length}</small></h2>${btn('catalog-clear', 'clearFilters', '', 'small')}
            <input id="catalog-query" type="search" aria-label="${text('search')}" placeholder="${text('search')}" value="${esc(state.query)}">
            <select id="catalog-character" aria-label="${text('character')}"><option value="">${text('character')}</option>${CHARACTER_FILES.map(file => {
                const key = file.slice(0, -5); return `<option value="${key}" ${key === state.character ? 'selected' : ''}>${esc(state.files[`data/${file}`].character)}</option>`;
            }).join('')}</select></div><div id="catalog" class="catalog"></div><div id="catalog-pages"></div></aside>
        <main class="main"><div class="intro"><p>${text('subtitle')}</p><span class="save-state" id="save-state" role="status"></span></div>
        ${state.recovery ? `<div class="warning">${text('importPending')} · v${esc(state.recovery.version || '?')} → ${EDITOR_LABEL}<p>${text('recoveryHelp')}</p>${btn('recover', 'recover')}${btn('start-fresh', 'startFresh', recoveryDownloaded ? '' : 'disabled')}</div>` : ''}
        <div id="main-view"></div></main></div>`;
    renderCatalog(); renderMain(); updateSaveState();
}
function filteredCatalog(query = state.query, character = state.character, includeAbilityNames = true) {
    const normalized = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    return catalogFrom(state.files).filter(item => (!character || item.character === character) &&
        [item.variant, item.characterName, englishFor(item)?.name, ...(includeAbilityNames ? [item.data.signature_ability?.name] : [])].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalized));
}
function renderCatalog() {
    const list = root.querySelector('#catalog');
    if (!list) return;
    const items = filteredCatalog();
    const pages = Math.max(1, Math.ceil(items.length / 18));
    state.page = Math.min(state.page, pages - 1);
    list.innerHTML = items.slice(state.page * 18, (state.page + 1) * 18).map(item => `<button class="catalog-item ${sameVariant(item, state.selected) ? 'active' : ''}" data-action="select" data-character="${esc(item.character)}" data-variant="${esc(item.variant)}">
        <img loading="lazy" width="42" height="48" src="${image(item)}" alt=""><span><strong>${esc(displayName(item))}</strong><small>${esc(item.characterName)} · ${esc(item.data.element)}</small></span></button>`).join('') || `<p>${text('noMatch')}</p>`;
    root.querySelector('#catalog-pages').innerHTML = `<div class="pagination">${btn('page-prev', 'previous', state.page ? '' : 'disabled', 'small')}<span>${text('page')} ${state.page + 1}/${pages}</span>${btn('page-next', 'next', state.page + 1 < pages ? '' : 'disabled', 'small')}</div>`;
}
function renderMain() {
    const host = root.querySelector('#main-view'), item = selected();
    if (!item) { host.innerHTML = `<p>${text('noMatch')}</p>`; return; }
    const englishName = englishFor(item)?.name?.replace(/\r/g, '').trim();
    if (state.category === 'defense' && !supportsDefensiveTeams(classesFor(item.variant))) state.category = 'general';
    host.innerHTML = `<section class="variant-heading"><img loading="lazy" width="110" height="118" src="${image(item)}" alt="">
        <div><p class="eyebrow">${esc(item.characterName)} / ${esc(item.rarity)} / ${esc(item.data.element)}</p><h1 lang="pt-BR">${esc(item.variant)}</h1>${englishName ? `<p class="variant-name-en" lang="en">${esc(englishName)}</p>` : ''}${chips(item.variant)}
        <div class="inline-actions">${btn('character-moves', 'characterMoves', `data-character="${esc(item.character)}"`, 'small')}</div></div></section>
        <nav class="tabs" aria-label="${text('section')}">${['teams', 'presets', 'abilities', 'edit', 'tier', 'reference', 'help'].map(tab => `<button data-action="tab" data-tab="${tab}" class="${state.tab === tab ? 'active' : ''}" aria-current="${state.tab === tab ? 'page' : 'false'}">${text(tab)}</button>`).join('')}</nav>
        <div class="error" id="editor-error" role="alert">${esc(state.notice)}</div>
        ${state.tab === 'reference' ? referenceMarkup(item) : state.tab === 'abilities' ? abilitiesMarkup(item) : state.tab === 'edit' ? editMarkup(item) : state.tab === 'tier' ? tierMarkup(item) : state.tab === 'presets' ? presetsMarkup() : state.tab === 'help' ? helpMarkup() : teamsMarkup(item)}`;
    const undo = root.querySelector('[data-action="undo"]');
    if (undo) undo.disabled = !state.undo;
}
function tiersMarkup(item) {
    const ranks = state.files['data/tier-data.json'][item.character]?.[item.variant] || {};
    return `<div class="tier-read">${TIER_MODES.map(mode => `<span>${text(mode)}<strong class="rank-value" data-rank="${esc(ranks[mode] ?? '')}">${esc(ranks[mode] ?? '—')}</strong></span>`).join('')}</div>`;
}
function referenceMarkup(item) {
    const english = englishFor(item);
    const variantsBuilds = item.data.builds || [item.data];
    return `<p class="help">${text('referenceHelp')}</p><div class="reference-grid">
        <section class="panel"><p class="eyebrow">PT-BR · ${text('ability')}</p><h2>${esc(item.data.signature_ability?.name || text('missing'))}</h2><div class="reference-text">${richAbility(item.data.signature_ability?.description, 'pt-BR')}</div></section>
        <section class="panel"><p class="eyebrow">EN · ${text('enReference')}</p>${english ? `<h2>${esc(english.ability)}</h2><div class="reference-text">${richAbility([english.SA1, english.SA2].filter(Boolean).join('\n\n'), 'en')}</div>` : `<p class="help">${text('noEnglish')}</p>`}</section>
        </div>${sourceAbilitiesMarkup(item)}<section class="panel"><h2>${text('existingBuild')}</h2>${variantsBuilds.map(build => `<h3>${esc(build.title || text('baseBuild'))}</h3>${EDITABLE_BUILD_FIELDS.map(field => `<p class="reference-text"><strong>${text(({ recommended_build: 'build', recommended_arsenal: 'arsenal', marquee_ability: 'marquee' })[field])}</strong>\n${rich(build[field])}</p>`).join('')}`).join('')}</section>
        <section class="panel"><h2>${text('currentTiers')}</h2>${tiersMarkup(item)}</section>`;
}
function sourceAbilitiesMarkup(item) {
    const key = state.abilityLinks[abilityIdentity(item)];
    return `<section class="panel source-abilities"><h2>${text('sourceAbilities')}</h2><p class="help">${text('sourceAbilityHelp')}</p><div class="reference-grid">${[[PT_MAPPING_PATH, 'PT-BR'], [EN_ABILITIES_PATH, 'EN']].map(([path, locale]) => {
        const source = state.base[path]?.[key];
        return `<section data-ability-source="${locale}"><h3>Krazete · ${locale}</h3>${source ? `<h4>${esc(source.ability || text('missing'))}</h4>${['SA1', 'SA2'].map(part => `<p class="eyebrow">${part}</p><div class="reference-text">${rich(stripAbilityLabels(source[part]))}</div>`).join('')}` : `<p class="help">${text('noEnglish')}</p>`}</section>`;
    }).join('')}</div></section>`;
}
function abilityField(locale, field, label, value, multiline = false) {
    const attributes = `data-ability-locale="${locale}" data-ability-field="${field}"`;
    return `<label>${text(label)}${multiline ? `<textarea rows="7" ${attributes}>${esc(normalizeAbilityProgressions(stripAbilityLabels(value)))}</textarea>` : `<input ${attributes} value="${esc(value || '')}">`}</label>`;
}
function abilitiesMarkup(item) {
    const pt = item.data.signature_ability || {}, en = englishFor(item);
    const parts = splitSignatureAbility(localizePortugueseAbility(pt.description));
    return `<p class="help">${text('abilityHelp')}</p><div class="reference-grid">
        <section class="panel"><h2>PT-BR · ${esc(item.variant)}</h2><div class="fields">
        ${abilityField('pt-BR', 'name', 'abilityName', pt.name)}
        ${abilityField('pt-BR', 'SA1', 'abilitySA1', parts.SA1, true)}
        ${abilityField('pt-BR', 'SA2', 'abilitySA2', parts.SA2, true)}</div>
        <h3 class="ability-preview-label">${text('abilityPreview')}</h3><div id="ability-preview-pt" class="reference-text">${richAbility(pt.description, 'pt-BR')}</div></section>
        <section class="panel"><h2>EN · ${esc(en?.name || item.variant)}</h2>${en ? `<div class="fields">
        ${abilityField('en', 'ability', 'abilityName', en.ability)}
        ${abilityField('en', 'SA1', 'abilitySA1', en.SA1, true)}
        ${abilityField('en', 'SA2', 'abilitySA2', en.SA2, true)}</div>
        <h3 class="ability-preview-label">${text('abilityPreview')}</h3><div id="ability-preview-en" class="reference-text">${richAbility([en.SA1, en.SA2].filter(Boolean).join('\n\n'), 'en')}</div>` : `<p class="warning">${text('abilityUnlinked')}</p>`}</section>
        </div>${sourceAbilitiesMarkup(item)}`;
}
function buildFields(build, index) {
    return `<div class="fields">${index !== 'base' ? `<label>${text('buildTitle')}<input data-build="${index}" data-field="title" value="${esc(build.title)}"></label>` : ''}
    ${EDITABLE_BUILD_FIELDS.map(field => `<div><label>${text(({ recommended_build: 'build', recommended_arsenal: 'arsenal', marquee_ability: 'marquee' })[field])}<textarea data-build="${index}" data-field="${field}">${esc(build[field] || '')}</textarea></label>${field === 'recommended_arsenal' ? `<div class="inline-actions">${btn('character-moves', 'characterMoves', `data-character="${esc(selected().character)}"`, 'small')}</div>` : ''}</div>`).join('')}</div>`;
}
function editMarkup(item) {
    const [primary, secondary = ''] = classesFor(item.variant);
    return `<section class="panel"><h2>${text('classes')}</h2><p class="help">${text('classesHelp')}</p><div class="class-options">
        <label>${text('primaryClass')}<select data-class-role="primary">${CLASS_NAMES.map(name => `<option value="${esc(name)}" ${name === primary ? 'selected' : ''}>${classLabel(name)}</option>`).join('')}</select></label>
        <label>${text('secondaryClass')}<select data-class-role="secondary" ${primary === 'Coringa' ? 'disabled' : ''}><option value="">${text('noSecondaryClass')}</option>${CLASS_NAMES.filter(name => name !== 'Coringa' && name !== primary).map(name => `<option value="${esc(name)}" ${name === secondary ? 'selected' : ''}>${classLabel(name)}</option>`).join('')}</select></label>
        </div></section>
        <section class="panel"><h2>${text('baseBuild')}</h2><p class="help">${text('buildPriority')}</p>${buildFields(item.data, 'base')}</section>
        <section class="panel"><div class="team-header"><h2>${text('multipleBuilds')}</h2>${btn('add-build', 'addBuild', '', 'small')}</div>
            ${(item.data.builds || []).map((build, index) => `<section class="panel">${buildFields(build, index)}<div class="inline-actions">${btn('remove-build', 'removeBuild', `data-index="${index}"`, 'small danger')}</div></section>`).join('')}</section>`;
}
function tierMarkup(item) {
    const ranks = state.files['data/tier-data.json'][item.character]?.[item.variant] || {};
    return `<section class="panel"><h2>Tier list</h2><p class="help">${text('rankHelp')}</p><div class="tier-fields">${TIER_MODES.map(mode => `<div class="rank-card"><span class="rank-value" data-rank="${esc(ranks[mode] ?? '')}">${esc(ranks[mode] ?? '—')}</span><label>${text(mode)}<select data-rank="${mode}"><option value="" ${ranks[mode] == null ? 'selected' : ''} ${ranks[mode] != null ? 'disabled' : ''}>${text('missingRank')}</option>${RANKS.map(rank => `<option ${ranks[mode] === rank ? 'selected' : ''}>${rank}</option>`).join('')}</select></label></div>`).join('')}</div>
        ${ranks.notes ? `<p class="reference-text">${text('notes')}: ${esc(ranks.notes)}</p>` : ''}</section>`;
}
function memberMarkup(member, team, index) {
    const position = `<span class="team-position">${text(['teamFront', 'teamMiddle', 'teamLast'][index])}</span>`;
    if (!member) return `<div class="member-card empty">${position}${btn('pick', 'addMember', `data-team="${esc(team.id)}" data-index="${index}"`)}</div>`;
    const item = catalogFrom(state.files).find(candidate => sameVariant(candidate, member));
    const isAnchor = sameVariant(member, team.anchor);
    return `<div class="member-card">${position}<img loading="lazy" width="180" height="180" src="${image(member)}" alt=""><strong>${esc(item ? displayName(item) : member.variant)}</strong>${chips(member.variant)}
        ${isAnchor ? `<small>${text('fixed')}</small>` : ''}<div class="inline-actions">
        ${btn('inspect', 'inspect', `data-character="${esc(member.character)}" data-variant="${esc(member.variant)}"`, 'small')}
        ${!isAnchor ? btn('pick', 'replace', `data-team="${esc(team.id)}" data-index="${index}"`, 'small') + btn('remove-member', 'remove', `data-team="${esc(team.id)}" data-index="${index}"`, 'small danger') : ''}
        <button class="small" data-action="move-member" data-team="${esc(team.id)}" data-index="${index}" data-direction="1" ${index === team.members.length - 1 ? 'disabled' : ''} aria-label="${text('moveLeft')}">←</button>
        <button class="small" data-action="move-member" data-team="${esc(team.id)}" data-index="${index}" data-direction="-1" ${index === 0 ? 'disabled' : ''} aria-label="${text('moveRight')}">→</button></div></div>`;
}
function teamsMarkup(item) {
    const categories = ['general', ...(supportsDefensiveTeams(classesFor(item.variant)) ? ['defense'] : [])];
    const teams = teamsFor(state.files, state.selected, state.category);
    return `<p class="help">${text('teamHelp')} ${text('noExplain')}</p><p class="team-order">${text('teamOrder')}</p>
        <div class="category-tabs">${categories.map(category => `<button data-action="category" data-category="${category}" class="${category === state.category ? 'active' : ''}" aria-pressed="${category === state.category}">${text(category)}</button>`).join('')}</div>
        ${presetShortcuts(state.presets, { text, image, page: quickPage })}
        <div class="team-header"><h2>${text(state.category)} <span class="chip">${teams.length}</span></h2>${btn('add-team', 'addTeam', '', 'primary')}</div>
        ${teams.map((team, number) => `<section class="panel"><header class="team-header"><h3>${text('teamNumber')} ${number + 1}<span class="status ${team.status}">${text(team.status)}</span></h3><div class="inline-actions">${team.members.length > 1 ? btn('quick-save-companions', 'quickSaveCompanions', `data-team="${esc(team.id)}"`, 'small') : ''}${btn('delete-team', 'deleteTeam', `data-team="${esc(team.id)}"`, 'small danger')}</div></header>
        <div class="team-grid">${Array.from({ length: 3 }, (_, index) => memberMarkup(team.members[index], team, index)).join('')}</div>
        <footer class="team-footer"><label>${text('date')}<input type="date" data-team-date="${esc(team.id)}" value="${esc(team.reviewedOn || '')}"></label>
        <div class="inline-actions">${btn('save-team-preset', 'saveWholeTeam', `data-team="${esc(team.id)}"`, 'small')}${btn('review-team', team.status === 'reviewed' ? 'unreviewTeam' : 'reviewTeam', `data-team="${esc(team.id)}"`, team.status === 'reviewed' ? '' : 'primary')}</div></footer></section>`).join('') || `<div class="empty-state">${text('noTeams')}</div>`}
        <p class="help">${text('onlyReviewed')}<br>${text('editedReview')}</p>`;
}

function helpMarkup() {
    return `<section class="panel transfer-help"><h2>${text('helpTitle')}</h2><p class="help">${text('versionRule')}</p><p class="help">${text('olderBackupHelp')}</p>
        <section><h3>1 · ${text('backup')}</h3><p>${text('backupHelp')}</p>${btn('backup', 'downloadBackup')}</section>
        <section><h3>2 · ${text('import')}</h3><p>${text('importHelp')}</p>${btn('import', 'import')}</section>
        <section><h3>3 · ${text('export')}</h3><p>${text('transferHelp')}</p><pre class="transfer-commands">npm.cmd run test:coverage -- --configLoader native\nnpm.cmd run build</pre>${btn('review', 'export', '', 'primary')}</section></section>`;
}
const presetPages = new Map();
let presetsPage = 0;
function presetsMarkup() {
    const pages = Math.max(1, Math.ceil(state.presets.length / 6));
    presetsPage = Math.min(presetsPage, pages - 1);
    return `<p class="help">${text('presetHelp')}</p><section class="panel preset-form">
        <label>${text('presetName')}<input id="preset-name" maxlength="80"></label>
        <label>${text('presetKind')}<select id="preset-kind">${PRESET_KINDS.map(kind => `<option value="${kind}">${text(`preset_${kind}`)}</option>`).join('')}</select></label>${btn('create-preset', 'createPreset', '', 'primary')}</section>
        ${state.presets.slice(presetsPage * 6, (presetsPage + 1) * 6).map(preset => {
            const pages = Math.max(1, Math.ceil(preset.members.length / 12));
            const page = Math.min(presetPages.get(preset.id) || 0, pages - 1);
            presetPages.set(preset.id, page);
            return `<section class="panel preset-card"><header class="team-header"><label>${text('presetName')}<input data-preset-name="${esc(preset.id)}" maxlength="80" value="${esc(preset.name)}"></label><span class="chip">${text(`preset_${preset.kind}`)} · ${preset.members.length}</span>${btn('remove-preset', 'removePreset', `data-preset="${esc(preset.id)}"`, 'small danger')}</header>
                <div class="preset-members">${preset.members.slice(page * 12, (page + 1) * 12).map((member, index) => `<article><img loading="lazy" width="44" height="48" src="${image(member)}" alt=""><strong>${preset.kind === 'team' ? `${page * 12 + index + 1} · ` : ''}${esc(member.variant)}</strong><div class="inline-actions">${btn('inspect', 'inspect', `data-character="${esc(member.character)}" data-variant="${esc(member.variant)}"`, 'small')}${btn('remove-preset-member', 'removePresetMember', `data-preset="${esc(preset.id)}" data-index="${page * 12 + index}"`, 'small')}</div></article>`).join('') || `<p class="help">${text('presetEmpty')}</p>`}</div>
                ${pages > 1 ? `<div class="pagination">${btn('preset-prev', 'previous', `data-preset="${esc(preset.id)}" ${page ? '' : 'disabled'}`)}<span>${text('page')} ${page + 1}/${pages}</span>${btn('preset-next', 'next', `data-preset="${esc(preset.id)}" ${page + 1 < pages ? '' : 'disabled'}`)}</div>` : ''}
                <div class="inline-actions">${btn('add-preset-members', 'addVariants', `data-preset="${esc(preset.id)}"`)}${isQuickPreset(preset) ? btn('quick-use', 'quickBuild', `data-preset="${esc(preset.id)}"`) : preset.kind === 'team' && preset.members.length ? btn('use-preset', 'applyTeamPreset', `data-preset="${esc(preset.id)}"`) : ''}</div></section>`;
        }).join('') || `<div class="empty-state">${text('emptyPresets')}</div>`}
        ${pages > 1 ? `<nav class="pagination" aria-label="${text('presets')}">${btn('presets-prev', 'previous', presetsPage ? '' : 'disabled')}<span>${text('page')} ${presetsPage + 1}/${pages}</span>${btn('presets-next', 'next', presetsPage + 1 < pages ? '' : 'disabled')}</nav>` : ''}`;
}
function updatePresets(next) {
    validatePresets(next, charactersFrom(state.files));
    checkpoint(); state.presets = next; commitEdit();
}
function saveQuickPreset(name, members) {
    if (!name.trim() || name.length > 80) throw new Error('presetNameRequired');
    membersWithCompanions({ members }, state.selected);
    const next = [...state.presets, { id: crypto.randomUUID(), name: name.trim(), kind: 'team', members: clone(members) }];
    quickPage = Math.floor(state.presets.filter(isQuickPreset).length / 4);
    state.notice = text('quickSaved'); updatePresets(next);
}
function pinPreset(id, member) {
    const next = clone(state.presets), preset = next.find(item => item.id === id);
    if (!preset) throw new Error('unknownPreset');
    if (preset.members.some(item => sameVariant(item, member))) return;
    if (preset.members.length >= (preset.kind === 'team' ? 3 : 300)) throw new Error('presetFull');
    preset.members.push({ character: member.character, variant: member.variant });
    updatePresets(next);
}
const teamPicker = createTeamPicker({
    dialog: picker, text, image, effectImage: path => new URL(path, repo).href, classesFor, englishFor, chips, effects: EFFECT_DATA,
    getCatalog: () => catalogFrom(state.files), getPresets: () => state.presets, getLanguage: () => language,
    getTeam: id => state.files['data/teams.json']?.teams.find(team => team.id === id),
    onInspect: member => inspect(member), onPin: pinPreset, humanError,
    onSaveQuick: saveQuickPreset,
    onApplyQuick(teamId, presetId) {
        const team = state.files['data/teams.json'].teams.find(team => team.id === teamId);
        const preset = state.presets.find(preset => preset.id === presetId);
        const members = membersWithCompanions(preset, team.anchor);
        checkpoint(); team.members = members; team.status = 'draft'; commitEdit();
    },
    onChoose(teamId, index, member) {
        if (state.recovery) return;
        const team = state.files['data/teams.json'].teams.find(team => team.id === teamId);
        if (!team || index < 0 || index > Math.min(2, team.members.length)
            || sameVariant(team.members[index], team.anchor)
            || team.members.some((item, position) => position !== index && sameVariant(item, member))
            || !catalogFrom(state.files).some(item => sameVariant(item, member))) throw new Error('invalidTeam');
        if (sameVariant(team.members[index], member)) return;
        checkpoint(); team.members.splice(index, 1, member); team.status = 'draft'; commitEdit();
    },
    onApply(teamId, presetId) {
        const preset = state.presets.find(item => item.id === presetId);
        if (!preset) throw new Error('unknownPreset');
        const team = state.files['data/teams.json'].teams.find(team => team.id === teamId);
        const members = membersFromPreset(preset, team.anchor);
        checkpoint(); team.members = members; team.status = 'draft'; commitEdit();
    }
});
function openPicker(teamId, index) { teamPicker.open(teamId, index); }
function inspect(member, fromPicker = false) {
    const item = catalogFrom(state.files).find(candidate => sameVariant(candidate, member));
    if (!item) return;
    review.innerHTML = `<header class="dialog-heading"><h2>${esc(displayName(item))}</h2>${btn('close-review', 'close')}</header>${chips(item.variant)}${referenceMarkup(item)}`;
    review.showModal();
}

function changesSummary(before, after, path = '') {
    if (equal(before, after)) return [];
    if (before && after && typeof before === 'object' && typeof after === 'object') {
        return [...new Set([...Object.keys(before), ...Object.keys(after)])].flatMap(key => changesSummary(before[key], after[key], path ? `${path} / ${key}` : key));
    }
    // Present the two ability parts without legacy source labels in the review too.
    const abilityDescription = /signature_ability \/ (?:english \/ )?description$/.test(path) || /(?:^| \/ )SA[12]$/.test(path);
    return [{ path, before: abilityDescription ? stripAbilityLabels(before) : before, after: abilityDescription ? stripAbilityLabels(after) : after }];
}
function openReview() {
    const files = exportFiles(state.base, state.files);
    const errors = validateChanges(state.base, { ...state.files, 'data/teams.json': { version: 1, teams: state.files['data/teams.json'].teams.filter(team => team.status === 'reviewed') } }, classesFor);
    review.innerHTML = `<header class="dialog-heading"><h2>${text('exportTitle')} · ${EDITOR_LABEL}</h2>${btn('close-review', 'close')}</header><p class="help">${text('exportVersion')}</p><p class="help">${text('exportHelp')}</p><p class="help">${text('onlyReviewed')}</p>
        ${errors.length ? `<div class="error">${text('reviewNeeded')}\n${errors.map(error => esc(humanError(error))).join('\n')}</div>` : ''}
        ${Object.entries(files).map(([path, after]) => `<details class="change-item"><summary>${esc(path)} · ${changesSummary(state.base[path], after).length} ${text('fields')}</summary>
        ${changesSummary(state.base[path], after).map(change => `<h3>${esc(change.path)}</h3><div class="diff-grid"><div><h3>${text('before')}</h3><pre>${esc(typeof change.before === 'object' ? JSON.stringify(change.before, null, 2) : change.before ?? '—')}</pre></div><div><h3>${text('after')}</h3><pre>${esc(typeof change.after === 'object' ? JSON.stringify(change.after, null, 2) : change.after ?? '—')}</pre></div></div>`).join('')}</details>`).join('') || `<div class="empty-state">${text('untouched')}</div>`}
        <div class="inline-actions">${btn('download', 'download', errors.length || !Object.keys(files).length ? 'disabled' : '', 'primary')}${btn('backup', 'downloadBackup')}</div>`;
    review.showModal();
}

root.addEventListener('input', event => {
    const target = event.target;
    if (target.id === 'catalog-query') { state.query = target.value; state.page = 0; renderCatalog(); return; }
    if (state.recovery) { renderMain(); return; }
    const item = selected();
    if (target.dataset.abilityLocale) {
        const field = target.dataset.abilityField;
        if (target.dataset.abilityLocale === 'pt-BR' && ['name', 'SA1', 'SA2'].includes(field)) {
            item.data.signature_ability ||= {};
            const parts = splitSignatureAbility(localizePortugueseAbility(normalizeAbilityProgressions(item.data.signature_ability.description)));
            if (field === 'name') item.data.signature_ability.name = target.value;
            else {
                parts[field] = localizePortugueseAbility(normalizeAbilityProgressions(stripAbilityLabels(target.value)));
            }
            item.data.signature_ability.description = joinSignatureAbility(parts);
            const key = state.abilityLinks[abilityIdentity(item)];
            if (key) item.data.signature_ability.krazete_id = key;
            const preview = root.querySelector('#ability-preview-pt');
            if (preview) preview.innerHTML = richAbility(item.data.signature_ability.description, 'pt-BR');
        } else if (target.dataset.abilityLocale === 'en' && ['ability', 'SA1', 'SA2'].includes(field)) {
            const en = englishFor(item);
            if (!en) return;
            en[field] = field === 'ability' ? target.value : normalizeAbilityProgressions(stripAbilityLabels(target.value));
            item.data.signature_ability ||= {};
            item.data.signature_ability.english = { name: en.ability, description: joinSignatureAbility({ SA1: normalizeAbilityProgressions(en.SA1), SA2: normalizeAbilityProgressions(en.SA2) }) };
            const key = state.abilityLinks[abilityIdentity(item)];
            if (key) item.data.signature_ability.krazete_id = key;
            const preview = root.querySelector('#ability-preview-en');
            if (preview) preview.innerHTML = richAbility([en.SA1, en.SA2].filter(Boolean).join('\n\n'), 'en');
        } else return;
        invalidateTeams(item); save();
    }
    if (target.dataset.build !== undefined) {
        const build = target.dataset.build === 'base' ? item.data : item.data.builds[Number(target.dataset.build)];
        build[target.dataset.field] = target.value; save();
    }
});
root.addEventListener('focusout', event => {
    const target = event.target;
    if (state.recovery || !target.dataset.abilityLocale || !['SA1', 'SA2'].includes(target.dataset.abilityField)) return;
    const item = selected();
    target.value = target.dataset.abilityLocale === 'pt-BR'
        ? splitSignatureAbility(localizePortugueseAbility(normalizeAbilityProgressions(item.data.signature_ability?.description)))[target.dataset.abilityField]
        : normalizeAbilityProgressions(stripAbilityLabels(englishFor(item)?.[target.dataset.abilityField]));
});
root.addEventListener('focusin', event => {
    if ((event.target.dataset.build !== undefined || event.target.dataset.abilityLocale) && !state.recovery) {
        checkpoint();
        const undo = root.querySelector('[data-action="undo"]');
        if (undo) undo.disabled = false;
    }
});
root.addEventListener('change', event => {
    const target = event.target;
    if (target.id === 'editor-theme') { theme?.setPreference(target.value); return; }
    if (target.id === 'editor-language') { language = target.value; localStorage.setItem('palace-editor-language', language); render(); return; }
    if (target.id === 'catalog-character') { state.character = target.value; state.page = 0; renderCatalog(); return; }
    if (state.recovery) { renderMain(); return; }
    const item = selected();
    if (target.dataset.presetName) {
        const name = target.value.trim();
        if (!name) { state.notice = humanError('presetNameRequired'); renderMain(); return; }
        const next = clone(state.presets), preset = next.find(preset => preset.id === target.dataset.presetName);
        if (preset) { preset.name = name; updatePresets(next); }
        return;
    }
    if (target.dataset.classRole) {
        const [primary, secondary] = classesFor(item.variant);
        let names;
        if (target.dataset.classRole === 'primary' && CLASS_NAMES.includes(target.value)) {
            const nextSecondary = target.value === secondary ? primary : secondary;
            names = [target.value, ...(target.value !== 'Coringa' && nextSecondary && nextSecondary !== 'Coringa' ? [nextSecondary] : [])];
        } else if (target.dataset.classRole === 'secondary' && primary !== 'Coringa' && target.value !== primary && target.value !== 'Coringa' && (!target.value || CLASS_NAMES.includes(target.value))) {
            names = [primary, ...(target.value ? [target.value] : [])];
        } else return;
        if (equal(names, classesFor(item.variant))) return;
        checkpoint(); state.files[CLASS_PATH][item.variant] = names; invalidateTeams(item); commitEdit();
        root.querySelector(`[data-class-role="${target.dataset.classRole}"]`)?.focus();
    }
    if (target.dataset.rank) {
        if (!target.value) return;
        checkpoint();
        const tier = state.files['data/tier-data.json'];
        tier[item.character] ||= {}; tier[item.character][item.variant] ||= {};
        tier[item.character][item.variant][target.dataset.rank] = target.value; commitEdit();
    }
    if (target.dataset.teamDate) {
        checkpoint(); const team = state.files['data/teams.json'].teams.find(team => team.id === target.dataset.teamDate);
        team.reviewedOn = target.value; team.status = 'draft'; commitEdit();
    }
});

async function action(event) {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action === 'backup' || action === 'recover') { downloadBackup(); if (action === 'recover') { recoveryDownloaded = true; render(); } return; }
    if (action === 'start-fresh' && state.recovery && recoveryDownloaded) {
        state.recovery = null; state.files = clone(state.base); state.presets = []; state.undo = null; state.notice = ''; save(); render(); return;
    }
    if (action === 'help') { state.tab = 'help'; renderMain(); return; }
    if (action === 'close-review') { review.close(); return; }
    if (action === 'moves-gallery' || action === 'character-moves') {
        const { openMovesGallery } = await import('./moves-gallery.js');
        openMovesGallery({ repo, language, characters: charactersFrom(state.files), initialCharacter: button.dataset.character || state.selected?.character }); return;
    }
    if (action === 'inspect' || action === 'inspect-picker') { inspect(button.dataset); return; }
    if (action === 'import') {
        review.innerHTML = `<header class="dialog-heading"><h2>${text('import')} · ${EDITOR_LABEL}</h2>${btn('close-review', 'close')}</header><p>${text('importVersion')}</p><p>${text('importConfirm')}</p><p class="help">${text('backupFirst')}</p><div class="inline-actions">${btn('backup', 'backup')}${btn('import-continue', 'confirmImport', '', 'primary')}</div>`;
        review.showModal(); return;
    }
    if (action === 'import-continue') { review.close(); document.querySelector('#import-file').click(); return; }
    if (action === 'select') { state.selected = { character: button.dataset.character, variant: button.dataset.variant }; state.notice = ''; renderMain(); renderCatalog(); return; }
    if (action === 'tab') { state.tab = button.dataset.tab; state.notice = ''; renderMain(); return; }
    if (action === 'category') { state.category = button.dataset.category; state.notice = ''; renderMain(); return; }
    if (action === 'page-prev' || action === 'page-next') { state.page += action === 'page-prev' ? -1 : 1; renderCatalog(); return; }
    if (action === 'catalog-clear') { state.query = ''; state.character = ''; state.page = 0; root.querySelector('#catalog-query').value = ''; root.querySelector('#catalog-character').value = ''; renderCatalog(); return; }
    if (action === 'review') { openReview(); return; }
    if (state.recovery) return;
    if (action === 'undo') {
        if (state.undo) {
            const previous = { files: state.files, presets: state.presets };
            state.files = state.undo.files; state.presets = state.undo.presets; state.undo = previous; commitEdit();
        }
        return;
    }
    const item = selected();
    const allTeams = state.files['data/teams.json'].teams;
    const team = allTeams.find(team => team.id === button.dataset.team);
    if (action === 'quick-create') { teamPicker.openQuick(`${text('quickDefaultName')} ${state.presets.length + 1}`); return; }
    if (action === 'quick-save-companions') {
        saveQuickPreset(`${text('quickDefaultName')} ${state.presets.length + 1}`, team.members.filter(member => !sameVariant(member, team.anchor))); return;
    }
    if (action === 'quick-prev' || action === 'quick-next') { quickPage = Math.max(0, Number(button.dataset.page)); renderMain(); return; }
    if (action === 'quick-use') {
        const members = membersWithCompanions(state.presets.find(preset => preset.id === button.dataset.preset), state.selected);
        checkpoint(); allTeams.push({ id: crypto.randomUUID(), anchor: clone(state.selected), category: state.category, members, status: 'draft', reviewedOn: today() });
        state.tab = 'teams'; state.notice = text('quickApplied'); commitEdit(); return;
    }
    if (action === 'add-preset-members') { teamPicker.openPreset(button.dataset.preset); return; }
    if (action === 'create-preset' || action === 'save-team-preset') {
        const name = action === 'create-preset' ? root.querySelector('#preset-name').value.trim() : `${item.variant} · ${text(team.category)} ${state.presets.length + 1}`.slice(0, 80);
        if (!name) throw new Error('presetNameRequired');
        presetsPage = Math.floor(state.presets.length / 6);
        updatePresets([...state.presets, { id: crypto.randomUUID(), name, kind: action === 'create-preset' ? root.querySelector('#preset-kind').value : 'team', members: action === 'create-preset' ? [] : clone(team.members) }]);
        state.notice = text('presetSaved'); renderMain(); return;
    }
    if (action === 'remove-preset' || action === 'remove-preset-member') {
        const next = clone(state.presets), preset = next.find(preset => preset.id === button.dataset.preset);
        if (!preset) return;
        if (action === 'remove-preset') next.splice(next.indexOf(preset), 1);
        else preset.members.splice(Number(button.dataset.index), 1);
        updatePresets(next); return;
    }
    if (action === 'preset-prev' || action === 'preset-next') {
        const id = button.dataset.preset; presetPages.set(id, (presetPages.get(id) || 0) + (action === 'preset-next' ? 1 : -1)); renderMain(); return;
    }
    if (action === 'presets-prev' || action === 'presets-next') { presetsPage += action === 'presets-next' ? 1 : -1; renderMain(); return; }
    if (action === 'use-preset') {
        const preset = state.presets.find(preset => preset.id === button.dataset.preset);
        const members = membersFromPreset(preset, state.selected);
        checkpoint(); allTeams.push({ id: crypto.randomUUID(), anchor: clone(state.selected), category: state.category, members, status: 'draft', reviewedOn: today() });
        state.tab = 'teams'; state.notice = text('presetApplied'); commitEdit(); return;
    }
    if (action === 'pick') { openPicker(team.id, Number(button.dataset.index)); return; }
    if (action === 'add-team') {
        checkpoint(); allTeams.push({ id: crypto.randomUUID(), anchor: clone(state.selected), category: state.category, members: [clone(state.selected)], status: 'draft', reviewedOn: today() }); commitEdit(); return;
    }
    if (action === 'delete-team') { checkpoint(); allTeams.splice(allTeams.indexOf(team), 1); commitEdit(); return; }
    if (action === 'remove-member') { checkpoint(); team.members.splice(Number(button.dataset.index), 1); team.status = 'draft'; commitEdit(); return; }
    if (action === 'move-member') { checkpoint(); const index = Number(button.dataset.index), next = index + Number(button.dataset.direction); [team.members[index], team.members[next]] = [team.members[next], team.members[index]]; team.status = 'draft'; commitEdit(); return; }
    if (action === 'review-team') {
        const errors = validateTeam(team, charactersFrom(state.files), classesFor);
        if (team.status !== 'reviewed' && errors.length) { state.notice = errors.map(humanError).join('\n'); renderMain(); return; }
        checkpoint(); team.status = team.status === 'reviewed' ? 'draft' : 'reviewed'; state.notice = ''; commitEdit(); return;
    }
    if (action === 'add-build') {
        checkpoint(); item.data.builds ||= [];
        if (!item.data.builds.length) item.data.builds.push({ title: text('baseBuild'), ...Object.fromEntries(EDITABLE_BUILD_FIELDS.map(field => [field, item.data[field] || ''])) });
        item.data.builds.push({ title: `${text('buildTitle')} ${item.data.builds.length + 1}`, recommended_build: '', recommended_arsenal: '', marquee_ability: '' }); commitEdit(); return;
    }
    if (action === 'remove-build') { checkpoint(); item.data.builds.splice(Number(button.dataset.index), 1); if (!item.data.builds.length) delete item.data.builds; commitEdit(); return; }
    if (action === 'download') {
        const publish = { ...state.files, 'data/teams.json': { version: 1, teams: allTeams.filter(team => team.status === 'reviewed') } };
        const errors = validateChanges(state.base, publish, classesFor);
        if (errors.length) { review.close(); openReview(); return; }
        const files = exportFiles(state.base, state.files);
        download(createZip(createExportArchive(files)), `palace-${EDITOR_LABEL}.zip`);
    }
}
for (const target of [root, review]) target.addEventListener('click', event => { action(event).catch(error => { state.notice = humanError(error.message); renderMain(); }); });
document.querySelector('#import-file').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    let backup;
    try {
        if (file.size > 8_000_000) throw new Error('invalidBackup');
        backup = JSON.parse(await file.text());
        const files = restoreBackup(state.base, backup, classesFor);
        checkpoint(); state.files = files; state.presets = clone(backup.presets ?? []); state.recovery = null; state.notice = text('importSuccess'); save(); render();
    } catch (error) { state.notice = error.message.includes('staleBackup') ? text('importUnavailable') : `${error.message === 'incompatibleVersion' ? `v${backup?.version ?? '?'} → ${EDITOR_LABEL}: ` : ''}${humanError(error.message)}`; renderMain(); }
    event.target.value = '';
});

async function init() {
    try {
        const paths = [...CHARACTER_FILES.map(file => `data/${file}`), 'data/tier-data.json', 'data/teams.json', EN_ABILITIES_PATH, PT_MAPPING_PATH];
        const data = await Promise.all(paths.map(readJson));
        state.base = Object.fromEntries(paths.map((path, index) => [path, data[index]]));
        state.base[CLASS_PATH] = clone(VARIANT_CLASSES); state.files = clone(state.base);
        state.abilityLinks = buildAbilityLinks(state.base);
        const saved = localStorage.getItem(storageKey) ?? legacyStorageKeys.map(key => localStorage.getItem(key)).find(value => value !== null);
        if (saved) {
            try { const backup = JSON.parse(saved); state.files = restoreBackup(state.base, backup, classesFor); state.presets = clone(backup.presets ?? []); }
            catch { try { state.recovery = JSON.parse(saved); } catch { state.recovery = { unreadableBackup: saved }; } }
        }
        state.selected = { character: 'annie', variant: state.files['data/annie.json'].variants.diamante[0].name };
        render();
        if (!state.recovery) save();
    } catch (error) { root.innerHTML = `<div class="boot"><h1>Palace ${text('studio')}</h1><p class="error">${text('loadError')}\n${esc(error.message)}</p></div>`; }
}
if (isLocalEditorURL(window.location.href)) await init();
else showLocalOnlyMessage(root);
