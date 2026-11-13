// Cycles supplied in Eventos_Diarios_e_Disputas_Premiadas.txt.
// The reference reset is 14:00 Brasília (17:00 UTC), independent of the visitor's timezone.
export const HOUR = 3600000;
export const DAY = 24 * HOUR;
export const ROTATION_TIME_ZONE = 'America/Sao_Paulo';
const WEEK_ANCHOR = Date.UTC(2026, 8, 28, 17);
// User confirmed Ms. Fortune for the week starting October 12, 2026.
const GUILD_REFERENCE_WEEK = Date.UTC(2026, 9, 12, 17);

export const MONTHLY_PRIZE_NAMES = [
  'Beginnings & Ends',             // Janeiro
  'Roses are Red, Violence is Due', // Fevereiro
  'Craic Some Heads',              // Março
  'Spring Cleaning',              // Abril
  '¡Viva la Fiesta!',              // Maio
  'Sun of a Beach',                // Junho
  'Fireworks Show',                // Julho
  "Slots O' Fun",                  // Agosto
  "A Class of One's Own",          // Setembro
  'Costume Party',                 // Outubro
  'Combocopia',                    // Novembro
  "Season's Beatings"              // Dezembro
];

export function mod(value, size) {
  return ((value % size) + size) % size;
}

export function guildBossIndex(now) {
  const week = Math.floor((+now - GUILD_REFERENCE_WEEK) / (7 * DAY));
  return mod(2 + week, 3); // Eliza -> Marie -> Ms. Fortune -> Eliza
}

function windowAt(start, duration, now, extra = {}) {
  const end = start + duration;
  return { start, end, active: +now >= start && +now < end, ...extra };
}

export function dailyWindow(now) {
  const start = Math.floor((+now - 17 * HOUR) / DAY) * DAY + 17 * HOUR;
  return windowAt(start, DAY, now, { day: new Date(start).getUTCDay() });
}

export function monthlyWindow(now) {
  const date = new Date(+now - 17 * HOUR);
  const year = date.getUTCFullYear(), month = date.getUTCMonth();
  const start = Date.UTC(year, month, 1, 17), end = Date.UTC(year, month + 1, 1, 17);
  return { start, end, active: true, year, month };
}

export function weeklyWindow(now, offsetDays = 0, durationDays = 7) {
  const anchor = WEEK_ANCHOR + offsetDays * DAY;
  const index = Math.floor((+now - anchor) / (7 * DAY));
  const start = anchor + index * 7 * DAY;
  const current = windowAt(start, durationDays * DAY, now, { index });
  if (current.active) return current;
  return windowAt(start + 7 * DAY, durationDays * DAY, now, { index: index + 1 });
}

// Two three-day editions per week: Monday–Thursday and Thursday–Sunday.
// Sunday after reset is a gap; it must count toward Monday's next edition.
export function characterEdition(ordinal, now) {
  const week = Math.floor(ordinal / 2), slot = mod(ordinal, 2);
  const start = WEEK_ANCHOR + (week * 7 + slot * 3) * DAY;
  return windowAt(start, 3 * DAY, now, { ordinal, index: mod(1 + ordinal, 18) });
}

export function characterWindow(now) {
  const week = Math.floor((+now - WEEK_ANCHOR) / (7 * DAY));
  const elapsed = +now - (WEEK_ANCHOR + week * 7 * DAY);
  const slot = elapsed < 3 * DAY ? 0 : elapsed < 6 * DAY ? 1 : 2;
  return characterEdition(week * 2 + slot, now);
}

export function eventWindow(kind, now) {
  switch (kind) {
    case 'monthly': return monthlyWindow(now);
    case 'daily': case 'dailyCharacter': return dailyWindow(now);
    case 'character': case 'parallel': return characterWindow(now);
    case 'weekly': case 'rift': case 'guild': return weeklyWindow(now);
    case 'elemental': return weeklyWindow(now, 5, 2);
    case 'stars': return weeklyWindow(now, 4, 2);
    case 'always': return { active: true, start: null, end: null };
    // No confirmed edition start/parity for these two events in the supplied files.
    case 'medici': case 'moves': return { active: null, start: null, end: null };
    default: return { active: null, start: null, end: null };
  }
}

export function formatDuration(ms, portuguese = true) {
  if (!Number.isFinite(ms)) return '';
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60, seconds % 60];
  const units = portuguese ? ['dia(s)', 'horas', 'minutos', 'segundos']
    : ['day(s)', 'hours', 'minutes', 'seconds'];
  return values.map((value, index) => `${value} ${units[index]}`).join(' ');
}
