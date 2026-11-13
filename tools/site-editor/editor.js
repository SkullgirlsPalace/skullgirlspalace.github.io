import { isLocalEditorURL } from '../editor/local-only.js';
import { createEmptyConfig, validateConfig, createCustomizationRuntime, FONT_STACKS, THEME_TOKENS, routeKey } from '../../src/utils/siteCustomizations.js';
import { CHARACTER_FILES } from '../../src/config/constants.js';
import { CONFIG_PATH, BACKUP_NAME, EXPORT_NAME, sameConfig, makeBackup, restoreBackup, buildExport } from './model.js';
import { readDraft, writeDraft } from './storage.js';
import { importMedia, fitImageToDisplay, assetBlob, validateAssets } from './media.js';
import { translate } from './strings.js';

const clone = value => JSON.parse(JSON.stringify(value));
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const root = document.getElementById('editor');
let language = localStorage.getItem('PALACE_SITE_EDITOR_LANGUAGE') === 'en' ? 'en' : 'pt-BR';
const t = key => translate(key, language);
const state = {
    base: createEmptyConfig(), config: createEmptyConfig(), assets: [], tab: 'general', mode: 'select', device: 'desktop',
    selection: null, runtime: null, report: { applied: [], skipped: [] }, history: [], future: [],
    original: false, recovery: null, recovered: false, storagePaused: false, unsaved: false, pendingSaves: 0, media: null
};
let frame, overlay, frameCleanup = () => {}, saveQueue = Promise.resolve(), toastTimer, viewportObserver;
const assetURLs = new Map();
const COLORS = THEME_TOKENS.filter(key => !['--max-width', '--navbar-height', '--border-radius', '--border-radius-sm'].includes(key));
const DIMENSIONS = ['--max-width', '--navbar-height', '--border-radius', '--border-radius-sm'];
const STYLE_NUMERIC = ['font-size', 'width', 'height', 'max-width', 'padding', 'margin', 'gap', 'border-radius', 'line-height'];
const BASIC_STYLE = ['font-size', 'line-height', 'width', 'height'];
const ADVANCED_STYLE = STYLE_NUMERIC.filter(key => !BASIC_STYLE.includes(key));

function option(value, label, selected) { return `<option value="${escape(value)}"${value === selected ? ' selected' : ''}>${escape(label)}</option>`; }
function fontOptions(value, element = false) {
    return option('', t('original'), value ?? '') + Object.entries(FONT_STACKS).map(([key, stack]) => option(element ? stack : key, key === 'system' ? t('system') : key, value)).join('');
}
function safeMessage(error) { toast(error.message || String(error), true); }
function toast(message, error = false) {
    clearTimeout(toastTimer); document.querySelector('.toast')?.remove();
    const node = document.createElement('div'); node.className = `toast${error ? ' error' : ''}`;
    node.setAttribute('role', error ? 'alert' : 'status'); node.textContent = message; document.body.append(node);
    toastTimer = setTimeout(() => node.remove(), error ? 9000 : 4000);
}
function download(name, value, type = 'application/json') {
    const url = URL.createObjectURL(value instanceof Blob ? value : new Blob([value], { type }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function snapshot() { return { config: clone(state.config), assets: [...state.assets] }; }
function pushHistory() { state.history.push(snapshot()); if (state.history.length > 40) state.history.shift(); state.future = []; }
function persist() {
    if (state.storagePaused) { setStatus(t('stale'), true); return; }
    let backup;
    try { backup = makeBackup(state.base, state.config, state.assets); } catch (error) { safeMessage(error); return; }
    state.unsaved = true; state.pendingSaves++; setStatus(t('saving'));
    saveQueue = saveQueue.catch(() => {}).then(() => writeDraft(backup)).then(() => {
        state.pendingSaves--; if (!state.pendingSaves) { state.unsaved = false; setStatus(t('saved')); }
    }).catch(() => { state.pendingSaves--; setStatus(t('memoryOnly'), true); });
}
function commit(next, assets = state.assets) {
    const referenced = new Set(next.edits.flatMap(edit => edit.media ? [edit.media.src.replace(/^\//, '')] : []));
    assets = assets.filter(asset => referenced.has(asset.path));
    validateConfig(next); validateAssets(assets); makeBackup(state.base, next, assets);
    if (sameConfig(next, state.config) && assets.length === state.assets.length && assets.every((asset, index) => asset.path === state.assets[index].path && asset.data === state.assets[index].data)) return;
    pushHistory(); state.config = next; state.assets = assets; applyPreview(); persist(); updateButtons();
}
function setStatus(message, error = false) {
    const node = document.getElementById('save-status'); if (!node) return;
    node.textContent = message; node.classList.toggle('error', error);
}
function resolveMedia(source) {
    const path = source.replace(/^\//, ''), asset = state.assets.find(item => item.path === path);
    if (asset) {
        if (!assetURLs.has(path)) assetURLs.set(path, URL.createObjectURL(assetBlob(asset)));
        return assetURLs.get(path);
    }
    return /^https:/.test(source) ? source : `/${path}`;
}
function applyPreview() {
    state.runtime?.apply(state.original ? state.base : state.config);
    const button = document.querySelector('[data-action="compare"]');
    if (button) button.textContent = t(state.original ? 'show' : 'hide');
    drawOverlay(state.selection?.element);
}
function currentEdit() { return state.config.edits.find(edit => edit.id === state.selection?.editId); }
function selectedEdit() {
    if (!state.selection) throw new Error(t('noSelection'));
    const original = currentEdit();
    return original ? clone(original) : {
        id: `visual-${crypto.randomUUID()}`, route: routeKey(frame.contentWindow.location), language: frame.contentDocument.documentElement.lang || language,
        ...clone(state.selection.description), styles: {}
    };
}
function upsert(edit) {
    const next = clone(state.config), index = next.edits.findIndex(item => item.id === edit.id);
    const changed = Object.keys(edit.styles).length || edit.texts.some(text => text.before !== text.after) || edit.media;
    if (index >= 0) { if (changed) next.edits[index] = edit; else next.edits.splice(index, 1); }
    else if (changed) next.edits.push(edit);
    commit(next); state.selection.editId = changed ? edit.id : undefined;
}
function routes() {
    const basic = [['', 'home'], ['character/todos/builds', 'allVariants'], ['guide', 'events'], ['wiki', 'wiki'], ['game-info', 'gameInfo'], ['stats', 'stats'], ['catalysts', 'catalysts'], ['tierlist', 'tierlist']];
    return basic.map(([hash, label]) => option(hash, t(label), frame?.contentWindow?.location.hash.slice(1) || '')).join('')
        + CHARACTER_FILES.flatMap(file => {
            const key = file.replace('.json', ''), name = key.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join(' ');
            return ['overview', 'builds', 'tier'].map(tab => option(`character/${key}/${tab}`, `${name} · ${tab === 'overview' ? (language === 'en' ? 'Overview' : 'Visão geral') : tab === 'tier' ? 'Tier list' : 'Builds'}`, frame?.contentWindow?.location.hash.slice(1)));
        }).join('');
}
function renderShell(previewURL = '/index.html?palace-preview=1') {
    shellEvents.abort(); shellEvents = new AbortController(); viewportObserver?.disconnect();
    root.innerHTML = `<div class="app-shell">
      <header class="topbar"><div class="identity"><div class="brand-mark" aria-hidden="true">P</div><div><div class="brand-name">Palace</div><h1>${t('title')}</h1></div></div>
        <div class="top-actions"><span class="local-pill">${t('local')}</span><select id="language" aria-label="Idioma / Language">${option('pt-BR', 'PT-BR', language)}${option('en', 'EN', language)}</select>
          <button data-action="backup">${t('backup')}</button><button data-action="import">${t('import')}</button><button data-action="review" class="primary">${t('review')}</button></div></header>
      <div class="workspace"><aside class="sidebar"><div class="sidebar-intro"><div class="eyebrow">${language === 'en' ? 'VISUAL EDITOR' : 'EDITOR VISUAL'}</div><h2>${t('subtitle')}</h2><p>${t('selectHint')}</p><button class="primary full-button" data-action="select-mode">${t('select')} ↗</button></div>
        <nav class="tabs" role="tablist" aria-label="${t('title')}">${['general', 'selection', 'media', 'changes'].map(tab => `<button role="tab" id="tab-${tab}" aria-controls="inspector" aria-selected="${tab === state.tab}" data-tab="${tab}">${t(tab)}${tab === 'changes' ? '<span class="tab-count" id="changes-count"></span>' : ''}</button>`).join('')}</nav>
        <section id="inspector" class="panel" role="tabpanel"></section></aside>
        <section class="preview-area" aria-label="${t('preview')}"><div class="preview-toolbar"><label><select id="page-select" aria-label="${t('page')}">${routes()}</select></label>
          <div class="segmented" id="mode-switch">${['select', 'navigate'].map(mode => `<button data-mode="${mode}" aria-pressed="${mode === state.mode}">${t(mode)}</button>`).join('')}</div><div class="spacer"></div>
          <div class="segmented device-switch">${[['desktop', '▱'], ['tablet', '▯'], ['mobile', '▯']].map(([device, icon]) => `<button data-device="${device}" title="${t(device)}" aria-label="${t(device)}" aria-pressed="${device === state.device}">${icon}</button>`).join('')}</div>
          <button class="quiet small" data-action="reload" title="${t('reload')}" aria-label="${t('reload')}">↻</button></div>
          <div class="preview-subbar"><span id="mode-hint">${t(state.mode === 'select' ? 'selectHint' : 'navigateHint')}</span><button class="selection-shortcut" id="selection-shortcut" data-action="edit-selection" hidden></button><div><button class="quiet small" data-action="undo" title="${t('undo')}" aria-label="${t('undo')}">↶</button> <button class="quiet small" data-action="redo" title="${t('redo')}" aria-label="${t('redo')}">↷</button></div></div>
          <div class="canvas" id="canvas"><div class="viewport-wrap" id="viewport-wrap"><iframe id="preview-frame" title="${t('preview')}" sandbox="allow-scripts allow-same-origin allow-forms"></iframe></div></div>
          <div class="route-row"><input id="route-input" aria-label="${t('routeHint')}" value="/" spellcheck="false"><button data-action="go">${t('go')}</button><button data-action="compare">${t('hide')}</button></div></section></div>
      <footer class="footer"><span id="save-status" class="status" role="status">${t('saved')}</span><span class="foot-hint">${t('footer')}</span><a href="/tools/editor/" target="_blank" rel="noopener">${t('oldEditor')} ↗</a></footer></div>`;
    frame = document.getElementById('preview-frame');
    frame.addEventListener('load', attachPreview);
    state.previewLoad = new Promise(resolve => frame.addEventListener('load', resolve, { once: true }));
    frame.src = previewURL;
    renderPanel(); bindShell(); updateButtons();
    viewportObserver = new ResizeObserver(resizeViewport); viewportObserver.observe(document.getElementById('canvas'));
}
function notice() {
    return state.recovery ? `<div class="notice"><p>${t('stale')}</p><button data-action="recover" class="small">${t('recovery')}</button> <button data-action="fresh" class="small"${state.recovered ? '' : ' disabled'}>${t('fresh')}</button></div>` : '';
}
function colorField(key, value, scope = 'theme') {
    const target = scope === 'style' ? state.selection?.element : frame?.contentDocument?.documentElement;
    const computed = target?.isConnected ? frame.contentWindow.getComputedStyle(target).getPropertyValue(key).trim() : '';
    const rgb = computed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    const hex = rgb ? `#${rgb.slice(1, 4).map(value => Number(value).toString(16).padStart(2, '0')).join('')}` : computed;
    const fallback = /^#[\da-f]{6}$/i.test(value || hex) ? value || hex : '#d4a84b';
    return `<label class="field"><span>${escape(t(key))}</span><div class="color-row"><input type="color" value="${escape(fallback)}" aria-label="${escape(t(key))}" data-color-for="${escape(key)}" data-scope="${scope}"><input type="text" data-${scope}="${escape(key)}" value="${escape(value || '')}" placeholder="${escape(computed || '#rrggbb')}" aria-label="${escape(t(key))}" spellcheck="false"><button type="button" data-clear="${escape(key)}" data-scope="${scope}" aria-label="${escape(t('restore'))}" title="${escape(t('original'))}">↺</button></div></label>`;
}
function renderGeneral() {
    return `<header><h2>${t('appearance')}</h2><p class="hint">${t('appearanceHint')}</p></header>
      <form id="global-form"><div class="group"><div class="range-head"><label for="scale">${t('size')}</label><output id="scale-output">${state.config.typography.scale || 100}%</output></div>
        <input id="scale" type="range" min="50" max="150" step="5" value="${state.config.typography.scale || 100}" data-typography="scale"><p class="hint">${t('scaleHint')}</p>
        <label><span>${t('bodyFont')}</span><select data-typography="bodyFont">${fontOptions(state.config.typography.bodyFont)}</select></label>
        <label><span>${t('headingFont')}</span><select data-typography="headingFont">${fontOptions(state.config.typography.headingFont)}</select></label></div>
        <div class="group"><h3>${t('colors')}</h3>${COLORS.slice(0, 10).map(key => colorField(key, state.config.theme[key])).join('')}
          <details><summary>${language === 'en' ? 'Elements, rarities and ranks' : 'Elementos, raridades e ranks'}</summary><div class="section-caption">${t('colors')}</div>${COLORS.slice(10).map(key => colorField(key, state.config.theme[key])).join('')}</details></div>
        <div class="group"><h3>${t('dimensions')}</h3><div class="field-grid">${DIMENSIONS.map(key => `<label><span>${t(key)} (px)</span><input data-theme="${key}" value="${escape(state.config.theme[key] || '')}" placeholder="${t('original')}" inputmode="numeric"></label>`).join('')}</div></div>
        <button type="button" data-action="reset-globals" class="quiet full-button">${t('resetGlobals')}</button></form>`;
}
function emptySelection() { return `<div class="empty"><div class="empty-icon" aria-hidden="true">⌖</div><h3>${t('emptyTitle')}</h3><p class="hint">${t('empty')}</p><button data-action="select-mode" class="small">${t('select')}</button></div>`; }
function renderSelection() {
    if (!state.selection) return emptySelection();
    const edit = currentEdit(), description = state.selection.description, styles = edit?.styles || {};
    const computed = state.selection.element.isConnected ? frame.contentWindow.getComputedStyle(state.selection.element) : null;
    const texts = (edit?.texts || description.texts).filter(item => item.before.trim() || item.after.trim());
    return `<header><h2>${t('selected')}</h2><div class="selection-tag">${escape(description.selector)}</div><button data-action="parent" class="small quiet">↑ ${t('parent')}</button></header>
      <form id="element-form"><div class="group"><label><span>${t('scope')}</span><select id="edit-route">${option('page', t('thisPage'), edit?.route === '*' ? '*' : 'page')}${option('*', t('allPages'), edit?.route === '*' ? '*' : 'page')}</select></label>
        <label><span>${t('language')}</span><select id="edit-language">${option('pt-BR', 'Português · PT-BR', edit?.language || language)}${option('en', 'English · EN', edit?.language || language)}${option('all', t('both'), edit?.language || language)}</select></label><p class="hint">${t('languageHint')}</p></div>
        <div class="group"><h3>${t('texts')}</h3>${texts.length ? `<p class="hint">${t('textHint')}</p>${texts.map((item, index) => `<label class="field"><span>${t('textPart')} ${index + 1}</span><small class="text-original">${escape(item.before)}</small><textarea data-text-index="${item.index}" rows="${item.after.length > 140 ? 5 : 3}">${escape(item.after)}</textarea></label>`).join('')}` : `<p class="hint">${t('noText')}</p>`}</div>
        <div class="group"><h3>${t('style')}</h3>${['color', 'background-color'].map(key => colorField(key, styles[key], 'style')).join('')}
          <div class="field-grid">${BASIC_STYLE.map(key => `<label><span>${t(key)}</span><input data-style="${key}" value="${escape(styles[key] || '')}" placeholder="${escape(computed?.getPropertyValue(key) || t('original'))}"></label>`).join('')}
            <label><span>${t('font-weight')}</span><select data-style="font-weight">${option('', t('original'), styles['font-weight'] || '')}${['400', '500', '600', '700', '800', '900'].map(value => option(value, value, styles['font-weight'])).join('')}</select></label>
            <label><span>${t('text-align')}</span><select data-style="text-align">${option('', t('original'), styles['text-align'] || '')}${['left', 'center', 'right'].map(value => option(value, t(value), styles['text-align'])).join('')}</select></label>
            <label class="full"><span>${t('font-family')}</span><select data-style="font-family">${fontOptions(styles['font-family'], true)}</select></label></div>
          <details class="advanced-controls" ${ADVANCED_STYLE.some(key => styles[key]) ? 'open' : ''}><summary>${t('advancedLayout')}</summary><div class="field-grid">${ADVANCED_STYLE.map(key => `<label><span>${t(key)}</span><input data-style="${key}" value="${escape(styles[key] || '')}" placeholder="${escape(computed?.getPropertyValue(key) || t('original'))}"></label>`).join('')}</div></details></div>
        <button type="submit" class="primary full-button">${t('apply')}</button><div class="actions-row"><button type="button" data-action="restore" class="quiet">${t('restore')}</button><button type="button" data-tab="media">${t('media')}</button></div></form>`;
}
function renderMedia() {
    if (!state.selection) return `<header><h2>${t('mediaTitle')}</h2><p class="hint">${t('mediaNeedTarget')}</p></header>${emptySelection()}`;
    const media = state.media || currentEdit()?.media || {};
    return `<header><h2>${t('mediaTitle')}</h2><p class="hint">${t('mediaHint')}</p><div class="selection-tag">${escape(state.selection.description.selector)}</div></header>
      <label class="upload-label">＋ ${t('upload')}<input id="media-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm"></label><p class="hint" style="margin:12px 0 20px">${t('mediaLimits')}</p>
      <form id="media-form"><div class="group"><label><span>${t('url')}</span><input id="media-src" value="${escape(media.src || '')}" placeholder="https://… ou img/…" spellcheck="false"></label><p class="hint">${t('urlHint')}</p>
        <div class="field-grid"><label><span>${t('kind')}</span><select id="media-kind">${option('image', t('image'), media.kind || 'image')}${option('video', t('video'), media.kind)}</select></label>
          <label><span>${t('position')}</span><select id="media-position">${['before', 'after', ...(['IMG', 'VIDEO'].includes(state.selection.description.fingerprint.tag) ? ['replace'] : [])].map(value => option(value, t(value), media.position || 'after')).join('')}</select></label>
          <label class="full"><span>${t('alt')}</span><input id="media-alt" value="${escape(media.alt || '')}" maxlength="500"></label>
          <label><span>${t('mediaWidth')}</span><input id="media-width" type="number" min="1" max="2400" value="${media.width || 640}"></label><label><span>${t('mediaHeight')}</span><input id="media-height" type="number" min="1" max="2400" value="${media.height || 360}"></label></div>
        <button type="submit" class="primary full-button">${t('addMedia')}</button>${currentEdit()?.media ? `<button type="button" class="quiet full-button" data-action="remove-media" style="margin-top:10px">${t('removeMedia')}</button>` : ''}</div></form>`;
}
function changeTitle(edit) { return edit.fingerprint.text.slice(0, 75) || edit.media?.alt || edit.fingerprint.tag; }
function renderChanges() {
    const globals = Object.keys(state.config.theme).length + Object.keys(state.config.typography).length;
    return `<header><h2>${t('changes')}</h2><p class="hint">${state.config.edits.length} ${t('changeCount')} · ${globals} ${t('globalChanges').toLowerCase()}</p></header>
      ${globals ? `<div class="change-card"><h3>${t('globalChanges')}</h3><p>${escape([...Object.keys(state.config.theme).map(t), ...Object.keys(state.config.typography).map(key => t(key === 'scale' ? 'size' : key))].join(' · '))}</p><div class="actions-row"><button class="small" data-tab="general">${t('edit')}</button></div></div>` : ''}
      ${!state.config.edits.length && !globals ? `<p class="hint">${t('noChanges')}</p>` : ''}
      ${state.config.edits.map(edit => `<article class="change-card"><h3>${escape(changeTitle(edit))}</h3><p>${escape(edit.route)} · ${escape(edit.language)}</p><p>${escape(Object.keys(edit.styles).map(t).join(' · '))}${edit.media ? ` · ${t('media')}` : ''}</p><div class="actions-row"><button class="small" data-edit="${edit.id}">${t('edit')}</button><button class="small quiet" data-remove="${edit.id}">${t('remove')}</button></div></article>`).join('')}
      ${state.report.skipped.length ? `<div class="notice"><h3>${t('conflicts')}</h3><p>${t('conflictHint')}</p>${state.report.skipped.map(item => `<p>${escape(changeTitle(state.config.edits.find(edit => edit.id === item.id) || { fingerprint: { text: item.id } }))}: ${escape(item.reason)}</p>`).join('')}</div>` : ''}`;
}
function renderPanel() {
    const panel = document.getElementById('inspector'); if (!panel) return;
    panel.setAttribute('aria-labelledby', `tab-${state.tab}`);
    panel.innerHTML = notice() + (state.original ? `<div class="notice">${t('comparison')}</div>` : '') + ({ general: renderGeneral, selection: renderSelection, media: renderMedia, changes: renderChanges }[state.tab])();
    document.querySelectorAll('[data-tab][role=tab]').forEach(button => button.setAttribute('aria-selected', button.dataset.tab === state.tab));
    panel.querySelectorAll('[data-color-for]').forEach(input => input.addEventListener('input', () => {
        const target = panel.querySelector(`[data-${input.dataset.scope}="${input.dataset.colorFor}"]`); target.value = input.value;
        target.dispatchEvent(new Event('change', { bubbles: true }));
    }));
    panel.querySelectorAll('[data-clear]').forEach(button => button.addEventListener('click', () => {
        const input = panel.querySelector(`[data-${button.dataset.scope}="${button.dataset.clear}"]`); input.value = ''; input.dispatchEvent(new Event('change', { bubbles: true }));
    }));
    document.getElementById('global-form')?.addEventListener('submit', event => event.preventDefault());
    document.getElementById('global-form')?.addEventListener('change', updateGlobals);
    document.getElementById('scale')?.addEventListener('input', updateGlobals);
    document.getElementById('element-form')?.addEventListener('submit', event => { event.preventDefault(); try { updateElement(); toast(t('updated')); } catch (error) { safeMessage(error); } });
    document.getElementById('element-form')?.addEventListener('change', () => { try { updateElement(); } catch (error) { safeMessage(error); } });
    document.getElementById('media-form')?.addEventListener('submit', submitMedia);
    document.getElementById('media-file')?.addEventListener('change', uploadMedia);
}
function styleValue(key, raw) {
    const value = raw.trim();
    return value && /^\d+(?:\.\d+)?$/.test(value) && !['line-height', 'font-weight', 'opacity'].includes(key) ? `${value}px` : value;
}
function updateGlobals() {
    try {
        if (state.original) throw new Error(t('comparison'));
        const next = clone(state.config); next.theme = {}; next.typography = {};
        document.querySelectorAll('[data-theme]').forEach(input => { if (input.value.trim()) next.theme[input.dataset.theme] = styleValue(input.dataset.theme, input.value); });
        document.querySelectorAll('[data-typography]').forEach(input => { if (input.value) next.typography[input.dataset.typography] = input.dataset.typography === 'scale' ? Number(input.value) : input.value; });
        const scale = document.getElementById('scale'); document.getElementById('scale-output').textContent = `${scale.value}%`;
        if (next.typography.scale === 100) delete next.typography.scale;
        commit(next);
    } catch (error) { safeMessage(error); }
}
function updateElement() {
    if (state.original) throw new Error(t('comparison'));
    const edit = selectedEdit(); edit.styles = {};
    document.querySelectorAll('[data-style]').forEach(input => { if (input.value.trim()) edit.styles[input.dataset.style] = styleValue(input.dataset.style, input.value); });
    edit.route = document.getElementById('edit-route').value === '*' ? '*' : routeKey(frame.contentWindow.location);
    edit.language = document.getElementById('edit-language').value;
    const fields = [...document.querySelectorAll('[data-text-index]')];
    edit.texts = state.selection.description.texts.map(item => ({ ...item, after: fields.find(input => Number(input.dataset.textIndex) === item.index)?.value ?? item.before }));
    upsert(edit);
}
async function uploadMedia(event) {
    const file = event.target.files[0]; if (!file) return;
    try {
        setStatus(t('working')); const prepared = await importMedia(file);
        const assets = state.assets.filter(item => item.path !== prepared.asset.path).concat(prepared.asset); validateAssets(assets);
        state.media = { kind: prepared.kind, src: prepared.asset.path, alt: '', width: Math.min(640, prepared.width), height: Math.max(1, Math.round(prepared.height * Math.min(1, 640 / prepared.width))), position: 'after' };
        state.mediaAsset = prepared.asset; renderPanel(); setStatus(t('saved')); toast(t('importedMedia'));
    } catch (error) { safeMessage(error); setStatus(state.unsaved ? t('memoryOnly') : t('saved'), state.unsaved); }
}
async function submitMedia(event) {
    event.preventDefault();
    try {
        if (state.original) throw new Error(t('comparison'));
        const selection = state.selection, pendingAsset = state.mediaAsset;
        const edit = selectedEdit();
        edit.media = { kind: document.getElementById('media-kind').value, src: document.getElementById('media-src').value.trim(), alt: document.getElementById('media-alt').value,
            width: Number(document.getElementById('media-width').value), height: Number(document.getElementById('media-height').value), position: document.getElementById('media-position').value };
        if (!edit.media.src) throw new Error(t('uploadFirst'));
        let asset = state.mediaAsset?.path === edit.media.src ? state.mediaAsset : state.assets.find(item => item.path === edit.media.src.replace(/^\//, ''));
        if (asset) { asset = await fitImageToDisplay(asset, edit.media.width, edit.media.height); edit.media.src = asset.path; }
        const next = clone(state.config), existing = next.edits.findIndex(item => item.id === edit.id);
        if (existing < 0) next.edits.push(edit); else next.edits[existing] = { ...next.edits[existing], media: edit.media };
        const assets = asset ? state.assets.filter(item => item.path !== asset.path).concat(asset) : state.assets;
        commit(next, assets);
        if (state.selection === selection) state.selection.editId = edit.id;
        if (state.mediaAsset === pendingAsset) { state.media = null; state.mediaAsset = null; }
        renderPanel(); toast(t('updated'));
    } catch (error) { safeMessage(error); }
}
function resizeViewport() {
    const canvas = document.getElementById('canvas'); if (!canvas || !frame) return;
    const width = { desktop: 1280, tablet: 768, mobile: 390 }[state.device], scale = Math.max(.15, Math.min(1, (canvas.clientWidth - 48) / width));
    const height = Math.max(360, (canvas.clientHeight - 44) / scale), wrap = document.getElementById('viewport-wrap');
    wrap.style.width = `${width * scale}px`; wrap.style.height = `${height * scale}px`;
    frame.style.width = `${width}px`; frame.style.height = `${height}px`; frame.style.transform = `scale(${scale})`;
    drawOverlay(state.selection?.element);
}
function drawOverlay(element) {
    if (!overlay) return;
    if (!element?.isConnected || state.mode !== 'select' || state.original) { overlay.style.display = 'none'; return; }
    const rect = element.getBoundingClientRect();
    Object.assign(overlay.style, { display: 'block', top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px` });
}
function selectElement(element, preferredId) {
    if (!element || state.original) return;
    try {
        const description = state.runtime.describe(element);
        const route = routeKey(frame.contentWindow.location), locale = frame.contentDocument.documentElement.lang || language;
        const existing = state.config.edits.find(edit => edit.id === preferredId) || state.config.edits.find(edit => edit.selector === description.selector && (edit.route === route || edit.route === '*') && (edit.language === locale || edit.language === 'all'));
        state.selection = { element, description, editId: existing?.id }; state.media = null; state.mediaAsset = null;
        state.tab = 'selection'; renderPanel(); updateSelectionShortcut(); drawOverlay(element);
    } catch (error) { safeMessage(error); }
}
function attachPreview() {
    frameCleanup(); state.runtime?.destroy(); state.selection = null;
    updateSelectionShortcut();
    let document;
    try { document = frame.contentDocument; if (!document?.body) return; } catch { safeMessage(new Error(t('invalidRoute'))); return; }
    overlay = document.createElement('palace-editor-overlay'); overlay.dataset.palaceEditorUi = '';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;border:2px solid #e6c278;background:rgba(230,194,120,.07);box-shadow:0 0 0 1px rgba(0,0,0,.6);display:none;border-radius:3px';
    document.documentElement.append(overlay);
    state.runtime = createCustomizationRuntime(document, { resolveMedia, onReport: report => { state.report = report; if (state.tab === 'changes') renderPanel(); } });
    applyPreview();
    const click = event => {
        if (state.mode !== 'select' || state.original) return;
        event.preventDefault(); event.stopImmediatePropagation();
        let element = event.target;
        while (element && ['svg', 'path', 'use', 'circle', 'rect'].includes(element.tagName?.toLowerCase())) element = element.parentElement;
        selectElement(element);
    };
    const move = event => { if (state.mode === 'select' && !state.original) drawOverlay(event.target); };
    const key = event => { if (event.key === 'Escape') { state.selection = null; drawOverlay(null); renderPanel(); updateSelectionShortcut(); } };
    const navigate = () => {
        state.selection = null; drawOverlay(null); renderPanel(); updateSelectionShortcut();
        globalThis.document.getElementById('route-input').value = routeKey(frame.contentWindow.location);
        const select = globalThis.document.getElementById('page-select'); select.value = frame.contentWindow.location.hash.slice(1);
    };
    const scroll = () => drawOverlay(state.selection?.element);
    document.addEventListener('click', click, true); document.addEventListener('pointermove', move, true); document.addEventListener('keydown', key);
    frame.contentWindow.addEventListener('hashchange', navigate); frame.contentWindow.addEventListener('scroll', scroll);
    frameCleanup = () => { document.removeEventListener('click', click, true); document.removeEventListener('pointermove', move, true); document.removeEventListener('keydown', key); document.defaultView?.removeEventListener('hashchange', navigate); document.defaultView?.removeEventListener('scroll', scroll); overlay?.remove(); };
    if (frame.contentWindow.handleSelectLanguage && document.documentElement.lang !== language) frame.contentWindow.handleSelectLanguage(language);
    globalThis.document.getElementById('route-input').value = routeKey(frame.contentWindow.location);
    previewReady().catch(safeMessage);
    resizeViewport(); renderPanel();
}
function navigateRoute(value) {
    try {
        let route = value.trim();
        if (!route.startsWith('/') && !route.startsWith('#')) route = `#${route}`;
        const url = new URL(route, location.origin);
        if (url.origin !== location.origin || /[\\]/.test(route) || !['/', '/index.html'].includes(url.pathname) && !/^\/characters\/(?:[a-z-]+\/(?:builds\/|tier-list\/)?)?$/.test(url.pathname)) throw new Error(t('invalidRoute'));
        url.search = '?palace-preview=1';
        frame.src = `${url.pathname === '/' ? '/index.html' : url.pathname}${url.search}${url.hash}`;
    } catch (error) { safeMessage(error); }
}
function setMode(mode) {
    state.mode = mode; document.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', button.dataset.mode === mode));
    document.getElementById('mode-hint').textContent = t(mode === 'select' ? 'selectHint' : 'navigateHint'); drawOverlay(state.selection?.element);
}
function updateSelectionShortcut() {
    const button = document.getElementById('selection-shortcut'); if (!button) return;
    const selection = state.selection;
    button.hidden = !selection;
    if (!selection) return;
    const preview = selection.description.texts?.find(item => item.before.trim())?.before.trim()
        || selection.element.getAttribute('alt') || selection.element.tagName.toLowerCase();
    button.textContent = `${t('selected')}: ${preview.slice(0, 48)}`;
    button.title = t('selected');
}
function updateButtons() {
    document.querySelector('[data-action=undo]')?.toggleAttribute('disabled', !state.history.length);
    document.querySelector('[data-action=redo]')?.toggleAttribute('disabled', !state.future.length);
    document.querySelector('[data-action=review]')?.toggleAttribute('disabled', sameConfig(state.base, state.config));
    const count = state.config.edits.length + Number(Object.keys(state.config.theme).length > 0 || Object.keys(state.config.typography).length > 0);
    const badge = document.getElementById('changes-count');
    if (badge) { badge.textContent = count || ''; badge.hidden = !count; }
}
function travel(direction) {
    const from = direction === 'undo' ? state.history : state.future, to = direction === 'undo' ? state.future : state.history;
    if (!from.length) return; to.push(snapshot()); Object.assign(state, from.pop()); state.selection = null; state.media = null;
    applyPreview(); persist(); updateButtons(); renderPanel();
}
function showDialog(content) {
    const dialog = document.getElementById('transfer-dialog'); dialog.innerHTML = content;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
    return dialog;
}
async function reviewExport() {
    try {
        if (sameConfig(state.base, state.config)) throw new Error(t('noExport'));
        const result = await buildExport(state.base, state.config, state.assets);
        const dialog = showDialog(`<h2>${t('reviewTitle')}</h2><p class="hint">${t('reviewHint')}</p><h3>${t('files')}</h3><pre>${escape(result.manifest.files.map(file => `${file.path}\n  ${(file.bytes / 1000).toFixed(1)} KB · SHA-256 ${file.sha256}`).join('\n\n'))}</pre>
          <p class="hint">${state.config.edits.length} ${t('changeCount')} · ${t('previewOnly')}</p><div class="actions-row"><button data-download class="primary">${t('downloadZip')}</button><button data-close>${t('close')}</button></div>`);
        dialog.querySelector('[data-download]').addEventListener('click', () => download(EXPORT_NAME, result.zip));
    } catch (error) { safeMessage(error); }
}
function removeEdit(id) {
    const next = clone(state.config); next.edits = next.edits.filter(edit => edit.id !== id); commit(next);
    if (state.selection?.editId === id) { state.selection.editId = undefined; state.selection.description = state.runtime.describe(state.selection.element); }
    renderPanel();
}
async function goToEdit(id) {
    const edit = state.config.edits.find(item => item.id === id); if (!edit) return;
    if (edit.language !== 'all' && language !== edit.language) { await changeLanguage(edit.language); }
    if (edit.route !== '*' && routeKey(frame.contentWindow.location) !== edit.route) {
        await new Promise(resolve => { frame.addEventListener('load', resolve, { once: true }); navigateRoute(edit.route); });
    }
    setMode('select'); state.original = false; applyPreview();
    await previewReady();
    const target = frame.contentDocument.querySelector(edit.selector);
    if (target) { selectElement(target, edit.id); target.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    else toast(t('conflictHint'), true);
}
async function changeLanguage(nextLanguage) {
    language = nextLanguage; localStorage.setItem('PALACE_SITE_EDITOR_LANGUAGE', language); document.documentElement.lang = language;
    const url = frame.src;
    frameCleanup(); state.runtime?.destroy(); state.runtime = null; state.selection = null;
    renderShell(url);
    await state.previewLoad;
    await previewReady();
}
async function previewReady() {
    const targetFrame = frame;
    for (let attempt = 0; attempt < 100; attempt++) {
        if (targetFrame !== frame) return;
        const doc = frame.contentDocument;
        if (doc?.querySelector('#app') && !doc.querySelector('#loading-text') && typeof frame.contentWindow.handleSelectLanguage === 'function') {
            if (doc.documentElement.lang !== language) frame.contentWindow.handleSelectLanguage(language);
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}
function bindShell() {
    root.addEventListener('click', event => {
        const tab = event.target.closest('[data-tab]');
        if (tab) { state.tab = tab.dataset.tab; renderPanel(); return; }
        const mode = event.target.closest('[data-mode]'); if (mode) { setMode(mode.dataset.mode); return; }
        const device = event.target.closest('[data-device]');
        if (device) { state.device = device.dataset.device; document.querySelectorAll('[data-device]').forEach(button => button.setAttribute('aria-pressed', button === device)); resizeViewport(); return; }
        const remove = event.target.closest('[data-remove]'); if (remove) { removeEdit(remove.dataset.remove); return; }
        const edit = event.target.closest('[data-edit]'); if (edit) { goToEdit(edit.dataset.edit).catch(safeMessage); return; }
        const button = event.target.closest('[data-action]'); if (!button) return;
        try {
            const action = button.dataset.action;
            if (action === 'backup') { download(BACKUP_NAME, JSON.stringify(makeBackup(state.base, state.config, state.assets), null, 2)); toast(t('savedBackup')); }
            else if (action === 'import') document.getElementById('backup-file').click();
            else if (action === 'review') reviewExport();
            else if (action === 'undo' || action === 'redo') travel(action);
            else if (action === 'go') navigateRoute(document.getElementById('route-input').value);
            else if (action === 'reload') frame.contentWindow.location.reload();
            else if (action === 'select-mode' || action === 'edit-selection') { setMode('select'); state.tab = 'selection'; renderPanel(); }
            else if (action === 'parent') selectElement(state.selection?.element.parentElement);
            else if (action === 'restore' && currentEdit()) removeEdit(currentEdit().id);
            else if (action === 'remove-media') { const edit = selectedEdit(); delete edit.media; upsert(edit); state.media = null; renderPanel(); }
            else if (action === 'reset-globals') { const next = clone(state.config); next.theme = clone(state.base.theme); next.typography = clone(state.base.typography); commit(next); renderPanel(); }
            else if (action === 'compare') { state.original = !state.original; applyPreview(); button.textContent = t(state.original ? 'show' : 'hide'); renderPanel(); }
            else if (action === 'recover') { download('palace-visual-v1-recovery.json', JSON.stringify(state.recovery, null, 2)); state.recovered = true; renderPanel(); }
            else if (action === 'fresh' && state.recovered) { state.recovery = null; state.storagePaused = false; persist(); renderPanel(); }
        } catch (error) { safeMessage(error); }
    }, { signal: shellEvents.signal });
    document.getElementById('language').addEventListener('change', event => { changeLanguage(event.target.value).catch(safeMessage); });
    document.getElementById('page-select').addEventListener('change', event => navigateRoute(`#${event.target.value}`));
    document.getElementById('route-input').addEventListener('keydown', event => { if (event.key === 'Enter') navigateRoute(event.target.value); });
}
let shellEvents = new AbortController();
async function start() {
    if (!isLocalEditorURL(location.href)) { root.textContent = 'Este editor funciona apenas no computador local. Abra Abrir-Editor-Site.cmd. / This editor is local only. Start Abrir-Editor-Site.cmd.'; return; }
    try {
        const response = await fetch(`/${CONFIG_PATH}`, { cache: 'no-store' }); if (!response.ok) throw new Error(`${CONFIG_PATH}: HTTP ${response.status}`);
        state.base = validateConfig(await response.json()); state.config = clone(state.base);
        try {
            const backup = await readDraft();
            if (backup) {
                try { Object.assign(state, restoreBackup(state.base, backup)); }
                catch {
                    // Archive before replacing the active slot, so an older draft remains recoverable.
                    await writeDraft(backup, `recovery-${Date.now()}`);
                    await writeDraft(backup, 'recovery-latest');
                    state.recovery = backup;
                    persist();
                }
            }
            state.recovery ||= await readDraft('recovery-latest') || null;
        } catch { state.unsaved = true; state.storagePaused = true; }
        renderShell();
        if (state.unsaved) setStatus(t('memoryOnly'), true);
        document.getElementById('backup-file').addEventListener('change', async event => {
            const file = event.target.files[0]; event.target.value = ''; if (!file) return;
            try {
                if (file.size > 20_000_000) throw new Error('Backup muito grande. / Backup too large.');
                const candidate = restoreBackup(state.base, JSON.parse(await file.text()));
                const dialog = showDialog(`<h2>${t('importTitle')}</h2><p class="hint">${t('importHint')}</p><p>${candidate.config.edits.length} ${t('changeCount')}</p><div class="actions-row"><button data-current-backup>${t('backup')}</button><button class="primary" data-confirm>${t('replaceDraft')}</button><button data-close>${t('close')}</button></div>`);
                dialog.querySelector('[data-current-backup]').addEventListener('click', () => download(BACKUP_NAME, JSON.stringify(makeBackup(state.base, state.config, state.assets), null, 2)));
                dialog.querySelector('[data-confirm]').addEventListener('click', () => { commit(candidate.config, candidate.assets); state.selection = null; renderPanel(); dialog.close(); toast(t('imported')); });
            } catch (error) { safeMessage(error); }
        });
        window.addEventListener('beforeunload', event => { if (state.unsaved || state.mediaAsset) { event.preventDefault(); event.returnValue = ''; } });
    } catch (error) { root.textContent = `${t('bootError')} ${error.message}`; }
}
await start();
