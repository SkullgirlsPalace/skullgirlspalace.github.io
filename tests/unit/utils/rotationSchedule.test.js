import { describe, it, expect } from 'vitest';
import {
  DAY, MONTHLY_PRIZE_NAMES, dailyWindow, monthlyWindow, characterWindow,
  characterEdition, eventWindow, formatDuration, guildBossIndex
} from '../../../src/utils/rotationSchedule.js';

describe('rotation reset boundaries', () => {
  it('keeps the previous daily edition before 14:00 Brasília and changes exactly at reset', () => {
    expect(dailyWindow(new Date('2026-10-13T13:59:59-03:00')).day).toBe(1);
    const after = dailyWindow(new Date('2026-10-13T14:00:00-03:00'));
    expect(after.day).toBe(2);
    expect(after.end - after.start).toBe(DAY);
  });

  it('uses the same server cycle for visitors in different timezones', () => {
    const brazil = eventWindow('stars', new Date('2026-10-16T14:00:00-03:00'));
    const japan = eventWindow('stars', new Date('2026-10-17T02:00:00+09:00'));
    expect(brazil).toEqual(japan);
    expect(brazil.active).toBe(true);
  });

  it('keeps October through the last day and switches at November 1 reset', () => {
    for (const date of ['2026-10-31T23:59:59-03:00', '2026-11-01T13:59:59-03:00']) {
      const window = monthlyWindow(new Date(date));
      expect(MONTHLY_PRIZE_NAMES[window.month]).toBe('Costume Party');
      expect(window.end).toBe(Date.parse('2026-11-01T14:00:00-03:00'));
    }
    expect(MONTHLY_PRIZE_NAMES[monthlyWindow(new Date('2026-11-01T14:00:00-03:00')).month]).toBe('Combocopia');
  });

  it('handles February in a leap year and the December year boundary', () => {
    const february = monthlyWindow(new Date('2028-02-15T17:00:00Z'));
    expect(february.end - february.start).toBe(29 * DAY);
    const january = monthlyWindow(new Date('2027-01-01T17:00:00Z'));
    expect(january.year).toBe(2027);
    expect(january.month).toBe(0);
  });

  it('advances character prize fights at Thursday reset', () => {
    const before = characterWindow(new Date('2026-10-01T16:59:59Z'));
    const after = characterWindow(new Date('2026-10-01T17:00:00Z'));
    expect(before.index).toBe(1); // Cerebella reference edition
    expect(after.index).toBe(2); // Robo-Fortune
    expect(before.end).toBe(after.start);
  });

  it('counts toward Monday during the Sunday gap rather than showing an expired active timer', () => {
    const window = characterWindow(new Date('2026-10-04T17:00:00Z'));
    expect(window.active).toBe(false);
    expect(window.start).toBe(Date.parse('2026-10-05T17:00:00Z'));
    expect(window.index).toBe(3);
    expect(characterWindow(new Date('2026-10-05T17:00:00Z')).active).toBe(true);
  });

  it('keeps calendar dates aligned with Monday/Thursday starts across cycles', () => {
    for (let ordinal = -3; ordinal <= 20; ordinal++) {
      const edition = characterEdition(ordinal, new Date('2026-10-13T17:00:00Z'));
      expect([1, 4]).toContain(new Date(edition.start).getUTCDay());
      expect(edition.end - edition.start).toBe(3 * DAY);
    }
    expect(characterEdition(18, 0).index).toBe(characterEdition(0, 0).index);
  });

  it.each([
    ['stars', '2026-10-16T17:00:00Z', '2026-10-18T17:00:00Z', '2026-10-23T17:00:00Z'],
    ['elemental', '2026-10-17T17:00:00Z', '2026-10-19T17:00:00Z', '2026-10-24T17:00:00Z']
  ])('counts to the end while %s is active and to its next start once unavailable', (kind, start, end, next) => {
    const active = eventWindow(kind, new Date(start));
    expect(active.active).toBe(true);
    expect(active.end).toBe(Date.parse(end));
    const inactive = eventWindow(kind, new Date(end));
    expect(inactive.active).toBe(false);
    expect(inactive.start).toBe(Date.parse(next));
  });

  it('switches weekly bosses and elements at Monday reset', () => {
    const before = eventWindow('guild', new Date('2026-10-12T16:59:59Z'));
    const after = eventWindow('guild', new Date('2026-10-12T17:00:00Z'));
    expect(after.index).toBe(before.index + 1);
    expect(after.end - after.start).toBe(7 * DAY);
    expect(eventWindow('rift', new Date(after.start))).toEqual(after);
  });

  it('does not invent start dates for Medici or Moves', () => {
    for (const kind of ['medici', 'moves']) expect(eventWindow(kind, new Date())).toEqual({ active: null, start: null, end: null });
  });

  it('uses Ms. Fortune for the confirmed week and keeps the boss sequence across resets', () => {
    expect(guildBossIndex(new Date('2026-10-12T16:59:59Z'))).toBe(1); // Marie
    expect(guildBossIndex(new Date('2026-10-12T17:00:00Z'))).toBe(2); // Ms. Fortune
    expect(guildBossIndex(new Date('2026-10-13T17:00:00Z'))).toBe(2);
    expect(guildBossIndex(new Date('2026-10-19T17:00:00Z'))).toBe(0); // Eliza
    expect(guildBossIndex(new Date('2026-10-26T17:00:00Z'))).toBe(1); // Marie
    expect(guildBossIndex(new Date('2026-11-02T17:00:00Z'))).toBe(2);
  });

  it('shows all four time units, including seconds and zero values', () => {
    expect(formatDuration(90061000)).toBe('1 dia(s) 1 horas 1 minutos 1 segundos');
    expect(formatDuration(999)).toBe('0 dia(s) 0 horas 0 minutos 0 segundos');
    expect(formatDuration(-1000)).toBe('0 dia(s) 0 horas 0 minutos 0 segundos');
    expect(formatDuration(1000, false)).toBe('0 day(s) 0 hours 0 minutes 1 seconds');
  });
});
