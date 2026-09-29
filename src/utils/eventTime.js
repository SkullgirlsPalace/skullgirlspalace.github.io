// Time-zone helpers for event announcements. Uses the browser's IANA time-zone database.
export const ANNOUNCEMENT_ZONES = {
  PST: 'America/Los_Angeles', PDT: 'America/Los_Angeles',
  MST: 'America/Denver', MDT: 'America/Denver',
  CST: 'America/Chicago', CDT: 'America/Chicago',
  EST: 'America/New_York', EDT: 'America/New_York',
  AKST: 'America/Anchorage', AKDT: 'America/Anchorage',
  HST: 'Pacific/Honolulu', GMT: 'Etc/GMT', UTC: 'Etc/UTC',
  BST: 'Europe/London', CET: 'Europe/Paris', CEST: 'Europe/Paris',
  JST: 'Asia/Tokyo', KST: 'Asia/Seoul', AEDT: 'Australia/Sydney', AEST: 'Australia/Sydney'
};

export const UTC_OFFSETS = Array.from({ length: 113 }, (_, index) => index * 15 - 720)
  .filter(minutes => minutes >= -720 && minutes <= 840)
  .map(minutes => ({ value: String(minutes), label: formatUtcOffset(minutes) }));

export function formatUtcOffset(minutes) {
  const sign = minutes < 0 ? '−' : '+';
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60);
  const mins = absolute % 60;
  return `UTC${sign}${hours}${mins ? `:${String(mins).padStart(2, '0')}` : ''}`;
}

export function getSuggestedOffset(language = 'pt-BR') {
  const stored = localStorage.getItem('eventTimeOffset');
  if (stored !== null && UTC_OFFSETS.some(item => item.value === stored)) return Number(stored);
  const languageOffset = /^ja|^ko/i.test(language) ? 540 : /^en-GB/i.test(language) ? 0 : /^en-US/i.test(language) ? -300 : /^pt-BR/i.test(language) ? -180 : 0;
  return languageOffset;
}

export function parseAnnouncement(input) {
  const match = String(input).trim().match(/\b(\d{1,2})(?::([0-5]\d))?\s*(AM|PM)?\s+(PDT|PST|MDT|MST|CDT|CST|EDT|EST|AKDT|AKST|HST|UTC|GMT|BST|CEST|CET|JST|KST|AEDT|AEST)\b/i);
  if (!match) throw new Error('Informe um horário como 9 PM PDT ou 10:30 AM EST.');
  let hour = Number(match[1]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem) {
    if (hour < 1 || hour > 12) throw new Error('O horário AM/PM precisa usar horas de 1 a 12.');
    hour = (hour % 12) + (meridiem === 'PM' ? 12 : 0);
  } else if (hour > 23) throw new Error('Informe uma hora entre 0 e 23.');
  return { hour, minute: Number(match[2] || 0), abbreviation: match[4].toUpperCase() };
}

function zoneParts(date, zone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  }).formatToParts(date);
  return Object.fromEntries(parts.map(part => [part.type, Number(part.value)]));
}

function zoneOffsetAt(epoch, zone) {
  const parts = zoneParts(new Date(epoch), zone);
  return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) - Math.floor(epoch / 1000) * 1000;
}

export function resolveAnnouncement(input, dateText) {
  const { hour, minute, abbreviation } = parseAnnouncement(input);
  const zone = ANNOUNCEMENT_ZONES[abbreviation];
  const [year, month, day] = dateText.split('-').map(Number);
  if (!year || !month || !day) throw new Error('Escolha a data do anúncio.');
  const localAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  const possible = new Set([zoneOffsetAt(localAsUtc, zone), zoneOffsetAt(localAsUtc - 6 * 3600000, zone), zoneOffsetAt(localAsUtc + 6 * 3600000, zone)]);
  const matches = [...possible].map(offset => localAsUtc - offset).filter(epoch => {
    const parts = zoneParts(new Date(epoch), zone);
    return parts.year === year && parts.month === month && parts.day === day && parts.hour === hour && parts.minute === minute;
  });
  if (!matches.length) throw new Error('Esse horário local não existe nessa data por causa da mudança de horário de verão.');
  if (matches.length > 1) throw new Error('Esse horário ocorre duas vezes nessa data por causa da mudança de horário de verão. Escolha outro horário.');
  const actualAbbreviation = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'short' }).formatToParts(new Date(matches[0])).find(part => part.type === 'timeZoneName')?.value;
  const normalized = actualAbbreviation?.replace(/\s/g, '').toUpperCase();
  const equivalent = { GMT: ['UTC'], UTC: ['GMT'], BST: [], CET: [], CEST: [], JST: [], KST: [], AEDT: [], AEST: [], HST: [] };
  if (normalized !== abbreviation && !equivalent[abbreviation]?.includes(normalized)) {
    throw new Error(`${abbreviation} não está em vigor nessa data; a zona usa ${actualAbbreviation}. Confira a sigla e a data.`);
  }
  return { epoch: matches[0], abbreviation, zone };
}

export function formatAtOffset(epoch, offsetMinutes, locale = 'pt-BR') {
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).format(new Date(epoch + offsetMinutes * 60000));
}

export function formatUtc(epoch) {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' }).format(new Date(epoch));
}
