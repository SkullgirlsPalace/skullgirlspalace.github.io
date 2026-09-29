import { t, getCurrentLanguage } from '../i18n/index.js';
import { formatAtOffset, formatUtc, getSuggestedOffset, resolveAnnouncement, UTC_OFFSETS } from '../utils/eventTime.js';

let tickHandle;
const state = { epoch: null, offset: -180 };
const today = () => new Date().toISOString().slice(0, 10);

export function render() {
  state.offset = getSuggestedOffset(getCurrentLanguage());
  const labels = t('timeConverter');
  return `<section class="section time-converter-section" id="time-converter">
    <div class="section-header"><button class="btn-back" onclick="navigateTo('')">←</button><h2>${labels.title}</h2></div>
    <div class="time-converter-card">
      <label class="time-zone-label" for="event-time-zone">${labels.yourZone}</label>
      <select id="event-time-zone" class="time-zone-select">${UTC_OFFSETS.map(({ value, label }) => `<option value="${value}" ${Number(value) === state.offset ? 'selected' : ''}>${label}${Number(value) === -180 ? ' — Brasília' : ''}</option>`).join('')}</select>
      <form id="event-time-form" class="event-time-form">
        <label for="event-announcement">${labels.announcement}</label>
        <input id="event-announcement" name="announcement" type="text" placeholder="9 PM PDT" autocomplete="off" required>
        <label for="event-date">${labels.date}</label>
        <input id="event-date" name="date" type="date" value="${today()}" required>
        <button class="btn-primary" type="submit">${labels.convert}</button>
      </form>
      <p class="time-converter-error" id="event-time-error" role="alert" hidden></p>
      <div class="event-time-result" id="event-time-result" hidden aria-live="polite">
        <div><span>${labels.original}</span><strong id="event-time-original"></strong></div>
        <div><span>${labels.local}</span><strong id="event-time-local"></strong></div>
        <div><span>${labels.utc}</span><strong id="event-time-utc"></strong></div>
        <div class="event-countdown-row"><span>${labels.countdown}</span><strong id="event-countdown"></strong></div>
      </div>
    </div>
  </section>`;
}

function updateResult() {
  if (!Number.isFinite(state.epoch)) return;
  const remaining = Math.max(0, state.epoch - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor(remaining % 86400000 / 3600000);
  const minutes = Math.floor(remaining % 3600000 / 60000);
  const seconds = Math.floor(remaining % 60000 / 1000);
  const millis = remaining % 1000;
  const countdown = document.getElementById('event-countdown');
  countdown.textContent = `${days ? `${String(days).padStart(2, '0')}d ` : ''}${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s ${String(millis).padStart(3, '0')}ms`;
  countdown.classList.toggle('event-countdown-near', remaining < 60000);
  if (!remaining) countdown.textContent = '00h 00m 00s 000ms';
}

export function init() {
  clearInterval(tickHandle);
  const form = document.getElementById('event-time-form');
  const selector = document.getElementById('event-time-zone');
  const show = () => {
    if (!Number.isFinite(state.epoch)) return;
    document.getElementById('event-time-local').textContent = formatAtOffset(state.epoch, state.offset, getCurrentLanguage());
  };
  selector.addEventListener('change', () => {
    state.offset = Number(selector.value);
    localStorage.setItem('eventTimeOffset', String(state.offset));
    show();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const error = document.getElementById('event-time-error');
    try {
      const result = resolveAnnouncement(form.elements.announcement.value, form.elements.date.value);
      state.epoch = result.epoch;
      document.getElementById('event-time-original').textContent = `${form.elements.announcement.value.trim()} · ${form.elements.date.value}`;
      document.getElementById('event-time-utc').textContent = formatUtc(state.epoch);
      document.getElementById('event-time-result').hidden = false;
      error.hidden = true;
      show();
      updateResult();
    } catch (reason) {
      error.textContent = reason.message;
      error.hidden = false;
    }
  });
  tickHandle = setInterval(updateResult, 50);
}
