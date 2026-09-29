import { t } from '../i18n/index.js';

const HOUR = 3600000, DAY = 86400000, RESET_HOUR = 14;
let timer;
const fallbackLabels = {
  intro: 'Disputas, passe de batalha e eventos de Skullgirls Mobile.', categories: 'Categorias de eventos', monthly: 'Disputas Premiadas Mensais',
  dailyEvents: 'Eventos Diários', weeklyEvents: 'Eventos Semanais', loginEvents: 'Logins Diários', start: 'Início',
  previous: 'Eventos anteriores', next: 'Próximos eventos', days: 'D', hours: 'H', minutes: 'min', seconds: 'seg',
  timeUnknown: 'Horário de reinício a confirmar', openReward: 'Resgatar recompensa diária', imagePlaceholder: 'Imagem do evento'
};
const msg = key => { const value = t(`eventsPage.${key}`); return value.startsWith('eventsPage.') ? fallbackLabels[key] : value; };
const monthly = [
  { id: 'monthly-prize', title: 'Disputa Premiada Mensal', kind: 'monthly', cycle: 'prize-month' },
  { id: 'battle-pass', title: 'Passe de Batalha', kind: 'monthly', cycle: 'month' },
  { id: 'monthly-variants', title: 'Variantes Exclusivas do Mês', kind: 'monthly', cycle: 'month' }
];
const categories = {
  dailyEvents: [
    { id: 'cursed', title: 'Experimentos Amaldiçoados', detail: 'Duração: 7 dias', kind: 'weekly', cycle: 'week' },
    { id: 'parallel', title: 'Reinos Paralelos', kind: 'every-three', cycle: 'three' },
    { id: 'daily-current-1', title: 'Evento Diário de Personagem', detail: 'Personagem: —', kind: 'daily', cycle: 'day' },
    { id: 'daily-current-2', title: 'Evento Diário de Personagem', detail: 'Personagem: —', kind: 'daily', cycle: 'day' },
    ...Array.from({ length: 6 }, (_, i) => ({ id: `daily-next-${i + 1}`, title: `Próximo Evento Diário ${i + 1}`, detail: 'Personagem: —', kind: 'daily', cycle: 'day' }))
  ],
  weekly: [
    { id: 'rift', title: 'Batalhas da Fenda', kind: 'weekly', cycle: 'monday', detail: 'Elemento da Semana: —' },
    { id: 'guild', title: 'Guildas', kind: 'weekly', cycle: 'monday', detail: 'Chefe da Semana: —' },
    { id: 'holodeck', title: 'Perigos do Holodeck', kind: 'daily', cycle: 'day' }
  ],
  logins: [
    { id: 'daily-login', title: 'Login Diário', kind: 'login', cycle: 'day' },
    { id: 'web-login', title: 'Login Web', kind: 'login', cycle: null, link: true }
  ]
};

function atReset(year, month, date) { return new Date(year, month, date, RESET_HOUR, 0, 0, 0); }
function nextReset(cycle, now) {
  if (cycle === 'prize-month') {
    let end = atReset(now.getFullYear(), now.getMonth() + 1, 0);
    if (now >= end) end = atReset(now.getFullYear(), now.getMonth() + 2, 0);
    return end;
  }
  if (cycle === 'month') return atReset(now.getFullYear(), now.getMonth() + 1, 1);
  if (cycle === 'day') {
    const next = atReset(now.getFullYear(), now.getMonth(), now.getDate());
    if (next <= now) next.setDate(next.getDate() + 1);
    return next;
  }
  if (cycle === 'monday') {
    const days = (8 - now.getDay()) % 7 || 7;
    return atReset(now.getFullYear(), now.getMonth(), now.getDate() + days);
  }
  if (cycle === 'week') return nextReset('monday', now);
  if (cycle === 'three') {
    const anchor = new Date(2026, 0, 1, RESET_HOUR);
    const n = Math.floor((now - anchor) / (3 * DAY)) + 1;
    return new Date(anchor.getTime() + n * 3 * DAY);
  }
  return null;
}
function countdown(ms) {
  const sec = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  return `<span class="event-time-unit"><b>${d}</b><small>${msg('days')}</small></span><span class="event-time-unit"><b>${h}</b><small>${msg('hours')}</small></span><span class="event-time-unit"><b>${String(m).padStart(2,'0')}</b><small>${msg('minutes')}</small></span><span class="event-time-unit"><b>${String(s).padStart(2,'0')}</b><small>${msg('seconds')}</small></span>`;
}
function rewardsUrl() { return document.documentElement.lang === 'pt-BR' ? 'https://hub.skullgirlsmobile.com/pt/daily-rewards' : 'https://hub.skullgirlsmobile.com/daily-rewards'; }
function card(item) {
  return `<article class="event-card event-type-${item.kind}" data-cycle="${item.cycle || ''}" data-event="${item.id}">
    <div class="event-card-image"><span>${msg('imagePlaceholder')}</span></div><h2>${item.title}</h2>
    ${item.detail ? `<p>${item.detail}</p>` : ''}
    ${item.link ? `<a class="event-reward-link" href="${rewardsUrl()}" target="_blank" rel="noopener noreferrer">${msg('openReward')}</a>` : ''}
    <div class="event-card-countdown" data-countdown></div>
  </article>`;
}
function panel(id, label, items, active = false, carousel = true) {
  return `<section class="event-panel ${active ? 'active' : ''}" data-panel="${id}" ${active ? '' : 'hidden'}>
    ${carousel ? `<div class="event-panel-heading"><h2>${label}</h2><div class="event-carousel-controls">
      <button type="button" class="event-arrow" data-move="-1" aria-label="${msg('previous')}"><span aria-hidden="true">‹</span></button><button type="button" class="event-arrow" data-move="1" aria-label="${msg('next')}"><span aria-hidden="true">›</span></button>
      <button type="button" class="event-top-button" data-top>${msg('start')}</button>
    </div></div>` : ''}
    <div class="events-track" tabindex="0">${items.map(card).join('')}</div>
  </section>`;
}

export function render() {
  return renderEvents();
}

export function renderConverter() {
  const zones = typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : ['America/Los_Angeles', 'America/New_York', 'America/Sao_Paulo', 'Europe/London', 'Europe/Paris', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'];
  const chosenZone = localStorage.getItem('eventTimeZone') || 'America/Sao_Paulo';
  const chosenName = chosenZone === 'America/Sao_Paulo' ? 'Brasília' : chosenZone;
  return `<section class="section time-converter-section" id="time-converter">
    <header class="guide-header"><h1>${t('nav.guide')}</h1><p>${t('guide.timeZoneIntro')}</p></header>
    <nav class="guide-tabs"><button class="guide-tab-btn" onclick="navigateTo('events')">${t('nav.events')}</button><button class="guide-tab-btn" onclick="navigateTo('game-info')">${t('nav.gameInfo')}</button><button class="guide-tab-btn active">${t('nav.timeConverter')}</button></nav>
    <div class="timezone-converter"><div class="timezone-form-grid">
      <div class="timezone-selected"><span>${t('timeConverter.yourZone')}</span><strong id="selected-time-zone-name">${chosenName}</strong><button id="show-extra-zones" class="timezone-extra-toggle" type="button" aria-expanded="false">${t('timeConverter.moreZones')}</button></div>
      <div id="extra-zone-wrap" class="timezone-picker" hidden><label for="timezone-search">${t('timeConverter.searchZones')}</label><input id="timezone-search" type="search" placeholder="${t('timeConverter.searchZones')}" autocomplete="off"><label for="event-time-zone">${t('timeConverter.extraZone')}</label><select id="event-time-zone" size="8">${zones.map(zone=>`<option value="${zone}" ${zone===chosenZone?'selected':''}>${zone}</option>`).join('')}</select></div>
      <label>${t('timeConverter.announcement')}<select id="announcement-zone"><option value="America/Los_Angeles">PDT / PST · Los Angeles</option><option value="America/New_York">EDT / EST · Nova York</option><option value="UTC">UTC</option></select></label>
      <label>${t('timeConverter.date')}<input id="event-date" type="datetime-local"></label>
    </div><button id="convert-event-time" class="timezone-convert-button">${t('timeConverter.convert')}</button>
    <p id="timezone-error" class="time-converter-error" hidden></p>
    <div id="timezone-result" class="timezone-result" hidden><div><span>${t('timeConverter.local')}</span><strong id="timezone-local-result"></strong></div><div><span>${t('timeConverter.countdown')}</span><strong id="event-countdown"></strong></div></div></div>
  </section>`;
}

export function renderEvents() {
  return `<section class="section events-section" id="events">
    <header class="events-heading"><h1>${t('nav.guide')}</h1><p>${msg('intro')}</p></header>
    <nav class="guide-tabs events-tabs"><button class="guide-tab-btn active" data-open-panel="monthly">${t('nav.events')}</button><button class="guide-tab-btn" onclick="navigateTo('game-info')">${t('nav.gameInfo')}</button><button class="guide-tab-btn" onclick="navigateTo('time-converter')">${t('nav.timeConverter')}</button></nav>
    <nav class="event-category-nav" aria-label="${msg('categories')}">
      <button class="event-category-button event-category-monthly active" data-open-panel="monthly" aria-pressed="true">${msg('monthly')}</button>
      <button class="event-category-button event-category-daily" data-open-panel="dailyEvents" aria-pressed="false">${msg('dailyEvents')}</button>
      <button class="event-category-button event-category-weekly" data-open-panel="weekly" aria-pressed="false">${msg('weeklyEvents')}</button>
      <button class="event-category-button event-category-login" data-open-panel="logins" aria-pressed="false">${msg('loginEvents')}</button>
    </nav>
    ${panel('monthly', msg('monthly'), monthly, true, false)}
    ${panel('dailyEvents', msg('dailyEvents'), categories.dailyEvents)}${panel('weekly', msg('weeklyEvents'), categories.weekly)}${panel('logins', msg('loginEvents'), categories.logins)}
  </section>`;
}

function refresh() {
  const now = new Date();
  document.querySelectorAll('.event-card').forEach(element => {
    const node = element.querySelector('[data-countdown]');
    const boundary = nextReset(element.dataset.cycle, now);
    if (node) node.innerHTML = boundary ? countdown(boundary - now) : `<span class="event-time-unknown">${msg('timeUnknown')}</span>`;
  });
}
function setPanel(id) {
  document.querySelectorAll('.event-panel').forEach(panelElement => {
    const active = panelElement.dataset.panel === id;
    panelElement.hidden = !active;
    panelElement.classList.toggle('active', active);
  });
  document.querySelectorAll('.event-category-button').forEach(button => {
    const active = button.dataset.openPanel === id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
export function init() {
  clearInterval(timer);
  if (document.querySelector('.time-converter-section')) return initConverter();
  const root = document.querySelector('.events-section');
  root.addEventListener('click', event => {
    const category = event.target.closest('[data-open-panel]');
    if (category) return setPanel(category.dataset.openPanel);
    const panelElement = event.target.closest('.event-panel');
    if (!panelElement) return;
    const track = panelElement.querySelector('.events-track');
    const move = event.target.closest('[data-move]');
    if (move) {
      const width = track.querySelector('.event-card')?.getBoundingClientRect().width || 300;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 18;
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      const target = Math.max(0, Math.min(max, track.scrollLeft + Number(move.dataset.move) * (width + gap)));
      track.scrollTo({ left: target, behavior: 'smooth' });
    }
    if (event.target.closest('[data-top]')) track.scrollTo({ left: 0, behavior: 'smooth' });
  });
  document.querySelectorAll('.events-track').forEach(track => {
    let down = false, start = 0, left = 0;
    track.addEventListener('pointerdown', event => { if (event.pointerType === 'mouse' && event.button !== 0) return; down = true; start = event.clientX; left = track.scrollLeft; track.setPointerCapture(event.pointerId); });
    track.addEventListener('pointerup', () => { down = false; });
    track.addEventListener('pointercancel', () => { down = false; });
    track.addEventListener('pointermove', event => { if (down) track.scrollLeft = left - (event.clientX - start); });
  });
  refresh();
  timer = setInterval(refresh, 1000);
}

function zonedEpoch(value, zone) {
  const [year, month, day, hour, minute] = value.split(/[-T:]/).map(Number);
  const target = Date.UTC(year, month - 1, day, hour, minute);
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(target));
  const actual = Object.fromEntries(parts.map(part => [part.type, Number(part.value)]));
  const represented = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
  const offset = represented - target;
  return target - offset;
}
function initConverter() {
  const date = document.getElementById('event-date');
  const now = new Date();
  date.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}T${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const toggle = document.getElementById('show-extra-zones');
  const extra = document.getElementById('extra-zone-wrap');
  toggle.addEventListener('click', () => { extra.hidden = !extra.hidden; toggle.setAttribute('aria-expanded', String(!extra.hidden)); });
  const zoneSelect = document.getElementById('event-time-zone');
  const zoneSearch = document.getElementById('timezone-search');
  zoneSearch.addEventListener('input', () => {
    const query = zoneSearch.value.trim().toLocaleLowerCase();
    [...zoneSelect.options].forEach(option => { option.hidden = Boolean(query) && !option.textContent.toLocaleLowerCase().includes(query); });
  });
  zoneSelect.addEventListener('change', () => {
    localStorage.setItem('eventTimeZone', zoneSelect.value);
    document.getElementById('selected-time-zone-name').textContent = zoneSelect.value === 'America/Sao_Paulo' ? 'Brasília' : zoneSelect.value;
    extra.hidden = true; toggle.setAttribute('aria-expanded', 'false');
  });
  document.getElementById('convert-event-time').addEventListener('click', () => {
    const error = document.getElementById('timezone-error');
    try {
      const epoch = zonedEpoch(date.value, document.getElementById('announcement-zone').value);
      document.getElementById('timezone-result').hidden = false; error.hidden = true;
      const render = () => {
        const zone = document.getElementById('event-time-zone').value;
        document.getElementById('timezone-local-result').textContent = new Intl.DateTimeFormat(undefined, { timeZone: zone, dateStyle: 'medium', timeStyle: 'short' }).format(new Date(epoch));
        document.getElementById('event-countdown').innerHTML = countdown(Math.max(0, epoch - Date.now()));
      };
      render(); clearInterval(timer); timer = setInterval(render, 1000);
      document.getElementById('event-time-zone').onchange = render;
    } catch { error.textContent = t('timeConverter.invalidDate'); error.hidden = false; }
  });
}
