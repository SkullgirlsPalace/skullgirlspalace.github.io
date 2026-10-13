import { t } from '../i18n/index.js';
import { renderEvents, initRotations, stopRotations } from './rotations.js';
import { formatDuration } from '../utils/rotationSchedule.js';

let timer;
const tr = (a, b) => document.documentElement.lang !== 'en' ? a : b;
const fmt = ms => formatDuration(ms, document.documentElement.lang !== 'en');
export { renderEvents };
export function render() { return renderEvents(); }
export function init() {
  clearInterval(timer);
  stopRotations();
  if (document.querySelector('.time-converter-section')) return initConverter();
  return initRotations();
}

export function renderConverter(){
 const zones=typeof Intl.supportedValuesOf==='function'?Intl.supportedValuesOf('timeZone'):['America/Los_Angeles','America/New_York','America/Sao_Paulo','Europe/London','Asia/Tokyo'];const chosen=localStorage.getItem('eventTimeZone')||'America/Sao_Paulo';
 return `<section class="section time-converter-section" id="time-converter"><header class="guide-header"><h1>${t('nav.guide')}</h1><p>${t('guide.timeZoneIntro')}</p></header><nav class="guide-tabs"><button class="guide-tab-btn" onclick="navigateTo('events')">${tr('Rotações','Rotations')}</button><button class="guide-tab-btn" onclick="navigateTo('game-info')">${t('nav.gameInfo')}</button><button class="guide-tab-btn active">${t('nav.timeConverter')}</button></nav><div class="timezone-converter"><div class="timezone-form-grid"><div class="timezone-selected"><span>${t('timeConverter.yourZone')}</span><strong id="selected-time-zone-name">${chosen==='America/Sao_Paulo'?'Brasília':chosen}</strong><button id="show-extra-zones" class="timezone-extra-toggle" aria-expanded="false">${t('timeConverter.moreZones')}</button></div><div id="extra-zone-wrap" class="timezone-picker" hidden><label for="timezone-search">${t('timeConverter.searchZones')}</label><input id="timezone-search"><select id="event-time-zone" size="8">${zones.map(z=>`<option value="${z}" ${z===chosen?'selected':''}>${z}</option>`).join('')}</select></div><label>${t('timeConverter.announcement')}<select id="announcement-zone"><option value="America/Los_Angeles">PDT / PST</option><option value="America/New_York">EDT / EST</option><option value="UTC">UTC</option></select></label><label>${t('timeConverter.date')}<input id="event-date" type="datetime-local"></label></div><button id="convert-event-time" class="timezone-convert-button">${t('timeConverter.convert')}</button><p id="timezone-error" hidden></p><div id="timezone-result" class="timezone-result" hidden><div><span>${t('timeConverter.local')}</span><strong id="timezone-local-result"></strong></div><div><span>${t('timeConverter.countdown')}</span><strong id="event-countdown"></strong></div></div></div></section>`
}
function zonedEpoch(value,zone){const [y,m,d,h,min]=value.split(/[-T:]/).map(Number),target=Date.UTC(y,m-1,d,h,min);const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(target)).map(x=>[x.type,Number(x.value)]));return target-(Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute)-target)}
function initConverter(){const date=document.getElementById('event-date'),now=new Date();date.value=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}T${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;document.getElementById('show-extra-zones').onclick=()=>{const w=document.getElementById('extra-zone-wrap');w.hidden=!w.hidden};const select=document.getElementById('event-time-zone');select.onchange=()=>{localStorage.setItem('eventTimeZone',select.value);document.getElementById('selected-time-zone-name').textContent=select.value};document.getElementById('convert-event-time').onclick=()=>{const epoch=zonedEpoch(date.value,document.getElementById('announcement-zone').value);document.getElementById('timezone-result').hidden=false;const draw=()=>{document.getElementById('timezone-local-result').textContent=new Intl.DateTimeFormat(undefined,{timeZone:select.value,dateStyle:'medium',timeStyle:'short'}).format(new Date(epoch));document.getElementById('event-countdown').textContent=fmt(Math.max(0,epoch-Date.now()))};draw();clearInterval(timer);timer=setInterval(draw,1000)}}
