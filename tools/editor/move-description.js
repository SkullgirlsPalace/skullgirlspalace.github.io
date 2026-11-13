import { escapeTeamText as escape } from '../../src/utils/teamData.js';

export function moveDescription(data, unavailable) {
    const description = String(data?.description || data?.image?.description || '').replace(/\\n/g, '\n').replace(/\r/g, '').trim();
    return escape(description || unavailable).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function moveDescriptionControl(data, text) {
    return `<button type="button" class="small move-effect-toggle" data-move-effect aria-expanded="false">${escape(text('showMoveEffect'))}</button><p class="move-description" hidden>${moveDescription(data, text('moveDescriptionMissing'))}</p>`;
}

export function toggleMoveDescription(button, text) {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.nextElementSibling.hidden = expanded;
    button.textContent = text(expanded ? 'showMoveEffect' : 'hideMoveEffect');
}
