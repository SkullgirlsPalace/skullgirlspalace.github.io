import { t } from '../i18n/index.js';
import {
  DAY, ROTATION_TIME_ZONE, MONTHLY_PRIZE_NAMES, mod, dailyWindow,
  characterEdition, eventWindow, formatDuration, guildBossIndex
} from '../utils/rotationSchedule.js';

let timer;
const isPt = () => document.documentElement.lang !== 'en';
const tr = (portuguese, english) => isPt() ? portuguese : english;
const names = {
  // Monday first, matching the user's reviewed reference.
  daily: [
    [['Situação Grave', 'Grave Situation', 'Marie'], ["Noite dos Mortos-Vivos", "Ghoul's Night Out", 'Squigly'], ['After School Special', 'After School Special', 'Filia']],
    [['Dias de um Gato Esquecido', 'Days of Future Cats', 'Robo-Fortune'], ['Seguindo o Ritmo', 'Walking the Beat', 'Big Band']],
    [['Telecatch das Quartas', 'Wednesday Night Rawr', 'Beowulf'], ['Exame de Rotina', 'Routine Checkup', 'Valentine']],
    [['Um Clone com Meus Pensamentos', 'A Clone With My Thoughts', 'Fukua'], ['Gerenciamento da Raiva', 'Anger Management', 'Painwheel']],
    [['Sessão Dupla', 'Double Feature', 'Double'], ['Chuva de Balas', 'Sweating Bullets', 'Dália Negra'], ['Ingressos para o Circo', 'Tickets To The Fun Show', 'Cerebella']],
    [['Embalos de Gatos à Noite', 'Caturday Night Fever', 'Ms. Fortune'], ['Pressão no Píer', 'Pier Pressure', 'Umbrella'], ['Sábado Animado', 'Saturday Morning Cartoons', 'Peacock']],
    [['Acampamento das Garças', 'A Royal Audience', 'Parasoul'], ['Soirée Sanguíneo', 'Sanguine Soirée', 'Eliza'], ['Encontros Cósmicos', 'Cosmic Encounters', 'Annie']]
  ],
  prize: [['Big Band', "Big Ben's Beatdown"], ['Cerebella', 'Briga Acrobática', 'High Wire Hijinks'], ['Robo-Fortune', 'Ones and Zeros'], ['Ms. Fortune', 'A Head of the Game'], ['Umbrella', 'Cloudy with a Chance of Pain'], ['Filia', 'Two to Tangle'], ['Parasoul', 'Dame of Thrones'], ['Beowulf', 'Rumble Pack'], ['Peacock', 'Cutting Room Floor'], ['Painwheel', 'No Pain No Gain'], ['Dália Negra', 'Frags to Riches'], ['Double', 'Second to Nun'], ['Squigly', "Night's Ghoul"], ['Valentine', 'Casket Match'], ['Fukua', 'A League of Her Clone'], ['Eliza', 'Blood Sport'], ['Marie', 'Death Mettle'], ['Annie', 'Infinity and Beyond']],
  elements: [['Água', 'Water', 'Maré Alta', 'High Tide'], ['Fogo', 'Fire', 'Ring of Fire', 'Ring of Fire'], ['Ar', 'Air', 'Eye of the Storm', 'Eye of the Storm'], ['Luz', 'Light', 'A Shining Example', 'A Shining Example'], ['Trevas', 'Dark', 'A Shot in the Dark', 'A Shot in the Dark']],
  bosses: [['Eliza', 'Destruidora', 'Doomsayer'], ['Marie', 'Lutador Imortal', 'Undying Warrior'], ['Ms. Fortune', 'Gatinha Crítica', 'Critty Kitty']]
};
const dayName = day => (isPt()
  ? ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])[day];
const characterName = name => !isPt() && name === 'Dália Negra' ? 'Black Dahlia' : name;
const prizeName = entry => entry[isPt() || entry.length === 2 ? 1 : 2];
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const duration = ms => formatDuration(ms, isPt());

function card(item) {
  const calendarId = `rotation-calendar-${item.id}`;
  return `<article class="rotation-card" data-event="${item.id}" data-kind="${item.kind}"${item.character ? ` data-character="${escapeHtml(item.character)}"` : ''}>
    ${item.icon ? `<span class="login-icon" aria-hidden="true">${item.icon}</span>` : '<div class="rotation-top"><span class="rotation-status"></span></div>'}
    <h3>${escapeHtml(item.title)}</h3>
    <p class="rotation-subtitle" data-dynamic-subtitle${item.subtitle ? '' : ' hidden'}>${escapeHtml(item.subtitle || '')}</p>
    <p class="rotation-desc">${escapeHtml(item.desc || '')}</p>
    ${item.kind === 'always' ? '' : '<div class="rotation-timer"></div>'}
    ${item.history ? `<button class="rotation-more" type="button" aria-expanded="false" aria-controls="${calendarId}">${tr('Calendário', 'Calendar')} <span aria-hidden="true">⌄</span></button><div id="${calendarId}" class="rotation-history" role="region" aria-label="${escapeHtml(tr('Calendário de ', 'Calendar for ') + item.title)}" tabindex="0" hidden></div>` : ''}
    ${item.url ? `<a class="rotation-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${tr('Acessar site', 'Open website')}</a>` : ''}
  </article>`;
}

function panel(id, label, items, active = false) {
  return `<section id="rotations-${id}" class="rotation-panel${active ? ' active' : ''}" data-panel="${id}" aria-labelledby="rotation-heading-${id}"${active ? '' : ' hidden'}><h2 id="rotation-heading-${id}">${label}</h2><div class="rotation-grid">${items.map(card).join('')}</div></section>`;
}

function monthlyItems() {
  return [
    { id: 'monthly-prize', kind: 'monthly', title: tr('Disputa Premiada Mensal', 'Monthly Prize Fight') },
    { id: 'monthly-prize-secondary', kind: 'monthly', title: tr('Disputa Premiada Mensal', 'Monthly Prize Fight') },
    { id: 'pass', kind: 'monthly', title: tr('Passe dos Bastidores', 'Backstage Pass') },
    { id: 'variants', kind: 'monthly', title: tr('Variantes do Mês', 'Monthly Variants') }
  ];
}

function eventItems() {
  return [
    { id: 'character-prize', kind: 'character', history: true, title: tr('Disputa Premiada de Personagem', 'Character Prize Fight'), desc: tr('Recursos para o Personagem. Duração: 3 dias.', 'Resources for the character. Duration: 3 days.') },
    { id: 'medici', kind: 'medici', title: tr('Disputa Premiada Medici', 'Medici Prize Fight'), desc: tr('Obtenha muitas Moedas! Duração informada: 1 dia. Início a confirmar.', 'Earn plenty of Coins! Reported duration: 1 day. Start to be confirmed.') },
    { id: 'moves', kind: 'moves', title: tr('Disputa Premiada de Golpes', 'Show Me Your Moves!'), desc: tr('Melhorias Gerais para o Arsenal. Duração informada: 1 dia. Ciclo a confirmar.', 'General improvements for your arsenal. Reported duration: 1 day. Cycle to be confirmed.') },
    { id: 'stars', kind: 'stars', title: tr('Disputa Premiada Astros Convidados', 'Guest Stars Prize Fight'), desc: tr('Obtenha Astros Convidados e Recursos! Duração: 2 dias.', 'Earn Guest Stars and resources! Duration: 2 days.') },
    { id: 'parallel', kind: 'parallel', title: tr('Reinos Paralelos', 'Parallel Realms'), desc: tr('Desafio Recompensador. Duração: 3 dias.', 'A rewarding challenge. Duration: 3 days.') },
    { id: 'elemental', kind: 'elemental', history: true, title: tr('Disputa Premiada Elemental', 'Elemental Prize Fight'), desc: tr('Obtenha recursos referentes ao Elemento. Duração: 2 dias.', 'Earn resources for the element. Duration: 2 days.') }
  ];
}

function weeklyItems() {
  return [
    { id: 'guild', kind: 'guild', history: true, title: tr('Guildas', 'Guilds') },
    { id: 'rift', kind: 'rift', history: true, title: tr('Batalhas da Fenda', 'Rift Battles') },
    { id: 'cursed', kind: 'weekly', title: tr('Experimentos Amaldiçoados', 'Accursed Experiments'), desc: tr('Duração: 7 dias.', 'Duration: 7 days.') }
  ];
}

function dailyItems(now) {
  const window = dailyWindow(now);
  return [
    ...names.daily[mod(window.day - 1, 7)].map((entry, index) => ({
      id: `character-daily-${index}`, kind: 'dailyCharacter', history: true, character: entry[2],
      title: tr(entry[0], entry[1]), subtitle: `${characterName(entry[2])} · ${tr('Início: ', 'Starts: ')}${dayName(window.day)}`,
      desc: tr('Recursos para o Personagem. Duração: 24 horas.', 'Resources for the character. Duration: 24 hours.')
    })),
    { id: 'holodeck', kind: 'daily', title: tr('Perigos do Holodeck', 'Holodeck Mayhem'), desc: tr('Duração: 24 horas.', 'Duration: 24 hours.') }
  ];
}

function loginItems() {
  return [
    { id: 'login', kind: 'always', icon: '🔑', url: isPt() ? 'https://hub.skullgirlsmobile.com/pt/daily-rewards' : 'https://hub.skullgirlsmobile.com/daily-rewards', title: 'Login', desc: tr('Acessar o site de recompensas diárias.', 'Open the daily rewards website.') },
    { id: 'missions', kind: 'always', icon: '📋', title: tr('Missões', 'Missions'), desc: tr('Operações Diárias reiniciam todo dia. Operações de Guilda têm missões diárias e semanais.', 'Daily Ops reset daily. Guild Ops have daily and weekly missions.') },
    { id: 'interaction', kind: 'always', icon: '🎮', title: tr('Interação do Jogador', 'Player Interaction'), desc: tr('Mobilizações: 15 minutos, 6 horas e 16 horas. Armário das Maravilhas: atualiza 4 horas após ser aberto.', 'Deployments: 15 minutes, 6 hours, and 16 hours. Cabinet of Curiosities refreshes 4 hours after opening.') }
  ];
}

export function renderEvents() {
  const now = new Date();
  const categories = [['monthly', tr('Mensais', 'Monthly')], ['events', tr('Eventos', 'Events')], ['weekly', tr('Semanais', 'Weekly')], ['daily', tr('Diários', 'Daily')], ['login', 'Login']];
  return `<section class="section events-section" id="events">
    <header class="events-heading"><h1>${tr('Rotações', 'Rotations')}</h1><p>${tr('Informações e Ciclos para Skullgirls Mobile.', 'Skullgirls Mobile event information and cycles.')}</p></header>
    <nav class="guide-tabs events-tabs"><button class="guide-tab-btn active" data-open-panel="monthly">${tr('Rotações', 'Rotations')}</button><button class="guide-tab-btn" onclick="navigateTo('game-info')">${t('nav.gameInfo')}</button><button class="guide-tab-btn" onclick="navigateTo('time-converter')">${t('nav.timeConverter')}</button></nav>
    <nav class="rotation-category-nav" aria-label="${tr('Categorias de rotação', 'Rotation categories')}">${categories.map(([id, label]) => `<button data-open-panel="${id}" aria-controls="rotations-${id}" aria-pressed="${id === 'monthly'}"${id === 'monthly' ? ' class="active"' : ''}>${label}</button>`).join('')}</nav>
    ${panel('monthly', tr('Mensais', 'Monthly'), monthlyItems(), true)}
    ${panel('events', tr('Eventos', 'Events'), eventItems())}
    ${panel('weekly', tr('Semanais', 'Weekly'), weeklyItems())}
    ${panel('daily', tr('Diários', 'Daily'), dailyItems(now))}
    ${panel('login', tr('Login, Missões e Interação do Jogador', 'Login, Missions, and Player Interaction'), loginItems())}
    <p class="rotation-reset-note">${tr('Horários de referência: Brasília. Reinício às 14h.', 'Reference times: Brasília. Reset at 14:00.')}</p>
  </section>`;
}

function calendarEntries(el, now) {
  const kind = el.dataset.kind, window = eventWindow(kind, now), rows = [];
  if (kind === 'character') {
    for (let offset = -2; offset < 18; offset++) {
      const edition = characterEdition(window.ordinal + offset, now), entry = names.prize[edition.index];
      rows.push({ ...edition, name: `${prizeName(entry)} — ${characterName(entry[0])}` });
    }
  } else if (kind === 'guild' || kind === 'rift' || kind === 'elemental') {
    for (let offset = -2; offset < 6; offset++) {
      const index = window.index + offset, start = window.start + offset * 7 * DAY;
      const entry = kind === 'guild' ? names.bosses[guildBossIndex(start)] : names.elements[mod(1 + index, 5)];
      const name = kind === 'guild' ? `${entry[0]} — ${tr(entry[1], entry[2])}`
        : kind === 'rift' ? `${tr(entry[0], entry[1])} — ${tr('Fenda', 'Rift')}`
          : `${tr(entry[2], entry[3])} — ${tr(entry[0], entry[1])}`;
      rows.push({ name, start, end: start + (kind === 'elemental' ? 2 : 7) * DAY });
    }
  } else if (kind === 'dailyCharacter') {
    const entry = names.daily.flat().find(item => item[2] === el.dataset.character);
    for (let offset = -1; offset < 3; offset++) {
      const start = window.start + offset * 7 * DAY;
      rows.push({ name: `${tr(entry[0], entry[1])} — ${characterName(entry[2])}`, start, end: start + DAY });
    }
  }
  return rows;
}

function formatDate(epoch) {
  return new Intl.DateTimeFormat(isPt() ? 'pt-BR' : 'en-US', {
    timeZone: ROTATION_TIME_ZONE, day: 'numeric', month: 'short', year: 'numeric',
    weekday: 'short', hour: '2-digit', minute: '2-digit'
  }).format(new Date(epoch));
}

function refreshCalendar(el, now) {
  const box = el.querySelector('.rotation-history');
  if (!box || box.hidden) return;
  const entries = calendarEntries(el, now);
  const key = JSON.stringify(entries);
  // Keep the list and scroll position intact between second-by-second updates.
  if (box.dataset.entries !== key) {
    box.innerHTML = `<ul>${entries.map(row => `<li data-start="${row.start}" data-end="${row.end}"><strong>${escapeHtml(row.name)}</strong><div class="rotation-history-dates"><span>${tr('Começa', 'Starts')}: <time datetime="${new Date(row.start).toISOString()}">${formatDate(row.start)}</time></span><span>${tr('Termina', 'Ends')}: <time datetime="${new Date(row.end).toISOString()}">${formatDate(row.end)}</time></span></div><span class="rotation-history-countdown"></span></li>`).join('')}</ul>`;
    box.dataset.entries = key;
  }
  box.querySelectorAll('li').forEach(row => {
    const start = Number(row.dataset.start), end = Number(row.dataset.end);
    const state = +now < start ? 'upcoming' : +now >= end ? 'past' : 'current';
    row.className = state;
    row.querySelector('.rotation-history-countdown').textContent = state === 'past'
      ? `${tr('Terminou há', 'Ended')} ${duration(+now - end)}${tr('', ' ago')}`
      : `${state === 'current' ? tr('Termina em', 'Ends in') : tr('Começa em', 'Starts in')} ${duration((state === 'current' ? end : start) - now)}`;
  });
}

function setText(el, selector, value) {
  const node = el.querySelector(selector);
  if (node && node.textContent !== value) node.textContent = value;
}

function refresh() {
  const root = document.querySelector('.events-section');
  if (!root) { stopRotations(); return; }
  const now = new Date(), daily = root.querySelector('[data-panel="daily"] .rotation-grid');
  const currentDay = String(dailyWindow(now).start);
  if (daily.dataset.day !== currentDay) {
    daily.innerHTML = dailyItems(now).map(card).join('');
    daily.dataset.day = currentDay;
  }
  root.querySelectorAll('.rotation-card').forEach(el => {
    const kind = el.dataset.kind, window = eventWindow(kind, now);
    el.classList.toggle('is-available', window.active === true);
    el.classList.toggle('is-unknown', window.active === null);
    setText(el, '.rotation-status', window.active === null ? tr('A confirmar', 'To be confirmed')
      : window.active ? tr('Disponível', 'Available') : tr('Indisponível', 'Unavailable'));
    if (kind === 'monthly') {
      const month = new Intl.DateTimeFormat(isPt() ? 'pt-BR' : 'en-US', { timeZone: ROTATION_TIME_ZONE, month: 'long' }).format(new Date(window.start));
      const period = tr(`${month[0].toUpperCase() + month.slice(1)} de ${window.year}`, `${month} ${window.year}`);
      if (el.dataset.event === 'monthly-prize') {
        setText(el, 'h3', MONTHLY_PRIZE_NAMES[window.month]);
        setText(el, '.rotation-subtitle', tr('Disputa Premiada Mensal', 'Monthly Prize Fight'));
        el.querySelector('.rotation-subtitle').hidden = false;
      }
      if (el.dataset.event.startsWith('monthly-prize')) setText(el, '.rotation-desc', tr(`Disputa Premiada do Mês ${period}.`, `Prize Fight for ${period}.`));
      if (el.dataset.event === 'variants') setText(el, '.rotation-desc', tr(`Variantes Exclusivas do Mês ${period}.`, `Exclusive variants for ${period}.`));
    } else if (kind === 'character') {
      const entry = names.prize[window.index];
      setText(el, 'h3', prizeName(entry));
      setText(el, '.rotation-subtitle', tr(`Disputa Premiada de ${characterName(entry[0])}`, `${characterName(entry[0])} Prize Fight`));
      el.querySelector('.rotation-subtitle').hidden = false;
    } else if (kind === 'elemental' || kind === 'rift') {
      const entry = names.elements[mod(1 + window.index, 5)], element = tr(entry[0], entry[1]);
      if (kind === 'elemental') setText(el, 'h3', tr(`Disputa Premiada Elemental — ${entry[2]} · ${element}`, `Elemental Prize Fight — ${entry[3]} · ${element}`));
      else setText(el, '.rotation-desc', tr(`Duração: 7 dias. Elemento Atual: ${element}.`, `Duration: 7 days. Current element: ${element}.`));
    } else if (kind === 'guild') {
      const entry = names.bosses[guildBossIndex(window.start)];
      setText(el, '.rotation-desc', tr(`Chefe atual: ${entry[0]} — ${entry[1]}.`, `Current boss: ${entry[0]} — ${entry[2]}.`));
    }
    if (kind !== 'always') {
      setText(el, '.rotation-timer', window.active === null ? tr('Próximo início a confirmar', 'Next start to be confirmed')
        : `${window.active ? tr('Termina em', 'Ends in') : tr('Próxima aparição em', 'Next appearance in')} ${duration((window.active ? window.end : window.start) - now)}`);
      refreshCalendar(el, now);
    }
  });
}

function closeCalendar(button) {
  button.setAttribute('aria-expanded', 'false');
  button.nextElementSibling.hidden = true;
}

export function stopRotations() {
  clearInterval(timer);
  timer = undefined;
}

export function initRotations() {
  stopRotations();
  const root = document.querySelector('.events-section');
  if (!root) return;
  // Reinitialization should not attach another listener to the same root.
  if (!root.dataset.initialized) {
    root.addEventListener('click', event => {
      const tab = event.target.closest('[data-open-panel]');
      if (tab) {
        const id = tab.dataset.openPanel;
        root.querySelectorAll('.rotation-more').forEach(closeCalendar);
        root.querySelectorAll('.rotation-panel').forEach(panel => {
          panel.hidden = panel.dataset.panel !== id;
          panel.classList.toggle('active', !panel.hidden);
        });
        root.querySelectorAll('.rotation-category-nav button').forEach(button => {
          const active = button.dataset.openPanel === id;
          button.classList.toggle('active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        return;
      }
      const button = event.target.closest('.rotation-more');
      if (button) {
        const opening = button.getAttribute('aria-expanded') !== 'true';
        root.querySelectorAll('.rotation-more').forEach(closeCalendar);
        if (opening) {
          button.setAttribute('aria-expanded', 'true');
          button.nextElementSibling.hidden = false;
          refreshCalendar(button.closest('.rotation-card'), new Date());
        }
      }
    });
    root.dataset.initialized = 'true';
  }
  refresh();
  timer = setInterval(refresh, 1000);
}
