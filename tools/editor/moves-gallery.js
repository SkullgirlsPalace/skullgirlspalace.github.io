// Loaded only when the local editor's move gallery is opened.
import { MOVE_DATA } from '../../src/data/movesimages.js';
import { escapeTeamText as esc } from '../../src/utils/teamData.js';
import { strings } from './strings.js';
import { isLocalEditorURL } from './local-only.js';

const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export function openMovesGallery({ repo, language, characters, initialCharacter }) {
    if (!isLocalEditorURL(window.location.href)) return;
    const text = key => strings[language]?.[key] || strings['pt-BR'][key] || key;
    const rows = Object.entries(MOVE_DATA).flatMap(([character, moves]) => Object.entries(moves).map(([name, data]) => ({
        character, characterName: characters[character]?.character || character, name, type: data.type, image: data.image?.image
    })));
    const state = { query: '', character: Object.hasOwn(MOVE_DATA, initialCharacter) ? initialCharacter : Object.keys(MOVE_DATA)[0], type: '', page: 0 };
    document.querySelector('#moves-gallery')?.remove();
    const dialog = document.createElement('dialog');
    dialog.id = 'moves-gallery';
    dialog.setAttribute('aria-labelledby', 'moves-gallery-title');
    dialog.innerHTML = `<header class="dialog-heading"><h2 id="moves-gallery-title">${text('movesGallery')}</h2><button type="button" data-gallery-action="close">${text('close')}</button></header>
        <p class="help">${text('movesHelp')}</p>
        <div class="gallery-toolbar">
            <label>${text('movesSearch')}<input id="moves-query" type="search" placeholder="${text('movesSearch')}"></label>
            <label>${text('moveCharacter')}<select id="moves-character">${Object.keys(MOVE_DATA).map(character => `<option value="${esc(character)}" ${state.character === character ? 'selected' : ''}>${esc(characters[character]?.character || character)}</option>`).join('')}</select></label>
            <label>${text('moveType')}<select id="moves-type"><option value="">${text('allMoveTypes')}</option><option value="Golpe Especial">${text('specialMoves')}</option><option value="Blockbuster">${text('blockbusters')}</option></select></label>
        </div><p class="help" id="moves-count" role="status"></p>
        <div id="moves-grid" class="moves-gallery-grid"></div><div id="moves-pages"></div>
        <p class="help" id="moves-copy-status" role="status"></p>`;
    document.body.append(dialog);

    function renderCards() {
        const query = normalize(state.query);
        const matches = rows.map((row, index) => ({ ...row, index })).filter(row => row.character === state.character
            && (!state.type || row.type === state.type) && normalize(`${row.name} ${row.characterName}`).includes(query));
        const pages = Math.max(1, Math.ceil(matches.length / 24));
        state.page = Math.min(state.page, pages - 1);
        dialog.querySelector('#moves-count').textContent = `${matches.length} ${text('movesFound')}`;
        dialog.querySelector('#moves-grid').innerHTML = matches.slice(state.page * 24, (state.page + 1) * 24).map(row => `<figure class="move-gallery-card" data-move-index="${row.index}">
            <img loading="lazy" width="128" height="128" src="${esc(new URL(row.image, repo).href)}" alt="">
            <figcaption><strong class="move-name">${esc(row.name)}</strong><small>${esc(row.characterName)} · ${text(row.type === 'Golpe Especial' ? 'specialMoves' : 'blockbusters')}</small>
            <button type="button" class="small" data-gallery-action="copy" data-move-index="${row.index}">${text('copyMove')}</button></figcaption></figure>`).join('') || `<p class="empty-state">${text('noMoves')}</p>`;
        dialog.querySelector('#moves-pages').innerHTML = `<div class="pagination"><button type="button" data-gallery-action="previous" ${state.page ? '' : 'disabled'}>${text('previous')}</button><span>${text('page')} ${state.page + 1}/${pages}</span><button type="button" data-gallery-action="next" ${state.page + 1 < pages ? '' : 'disabled'}>${text('next')}</button></div>`;
        dialog.querySelector('#moves-copy-status').textContent = '';
    }
    dialog.addEventListener('input', event => {
        if (event.target.id !== 'moves-query') return;
        state.query = event.target.value; state.page = 0; renderCards();
    });
    dialog.addEventListener('change', event => {
        if (event.target.id === 'moves-character') state.character = event.target.value;
        else if (event.target.id === 'moves-type') state.type = event.target.value;
        else return;
        state.page = 0; renderCards();
    });
    dialog.addEventListener('click', async event => {
        const button = event.target.closest('[data-gallery-action]');
        if (!button || button.disabled) return;
        if (button.dataset.galleryAction === 'close') { dialog.close(); return; }
        if (button.dataset.galleryAction === 'previous') { state.page--; renderCards(); return; }
        if (button.dataset.galleryAction === 'next') { state.page++; renderCards(); return; }
        if (button.dataset.galleryAction !== 'copy') return;
        const row = rows[Number(button.dataset.moveIndex)];
        try {
            if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(row.name);
            dialog.querySelector('#moves-copy-status').textContent = `${text('copiedMove')} ${row.name}`;
        } catch {
            const range = document.createRange();
            range.selectNodeContents(button.closest('figure').querySelector('.move-name'));
            const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
            dialog.querySelector('#moves-copy-status').textContent = text('copyMoveManually');
        }
    });
    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    renderCards(); dialog.showModal();
}
