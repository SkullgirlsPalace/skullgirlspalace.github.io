import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderEvents, renderConverter, init } from '../../../src/pages/time-converter.js';
import { stopRotations } from '../../../src/pages/rotations.js';

vi.mock('../../../src/i18n/index.js', () => ({ t: key => key }));

const card = id => document.querySelector(`[data-event="${id}"]`);
const openCategory = id => document.querySelector(`.rotation-category-nav [data-open-panel="${id}"]`).click();

describe('Rotações page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-13T17:00:00Z'));
    document.documentElement.lang = 'pt-BR';
    document.body.innerHTML = renderEvents();
    init();
  });
  afterEach(() => {
    stopRotations();
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('shows both monthly fights and the dynamic month/year without the schedule image/download', () => {
    expect(card('monthly-prize').querySelector('h3').textContent).toBe('Costume Party');
    expect(card('monthly-prize-secondary').querySelector('h3').textContent).toBe('Disputa Premiada Mensal');
    expect(card('monthly-prize').querySelector('.rotation-desc').textContent).toContain('Outubro de 2026');
    expect(card('variants').querySelector('.rotation-desc').textContent).toBe('Variantes Exclusivas do Mês Outubro de 2026.');
    expect(document.body.innerHTML).not.toMatch(/PFArts|cronograma|rotation-reference|rotation-download/i);
  });

  it('updates seconds continuously and changes monthly titles automatically', () => {
    const timer = card('monthly-prize').querySelector('.rotation-timer');
    const before = timer.textContent;
    vi.advanceTimersByTime(1000);
    expect(timer.textContent).not.toBe(before);
    expect(timer.textContent).toMatch(/dia\(s\).*horas.*minutos.*segundos/);
    vi.setSystemTime(new Date('2026-11-01T16:59:59Z'));
    vi.advanceTimersByTime(1000);
    expect(card('monthly-prize').querySelector('h3').textContent).toBe('Combocopia');
    expect(card('variants').textContent).toContain('Novembro de 2026');
  });

  it('uses event names as main titles and fills in character, element, and boss', () => {
    expect(card('character-prize').querySelector('h3').textContent).toBe('Two to Tangle');
    expect(card('character-prize').querySelector('.rotation-subtitle').textContent).toBe('Disputa Premiada de Filia');
    expect(card('elemental').querySelector('h3').textContent).toContain('A Shining Example · Luz');
    expect(card('rift').querySelector('.rotation-desc').textContent).toContain('Elemento Atual: Luz');
    expect(card('guild').querySelector('.rotation-desc').textContent).toContain('Ms. Fortune — Gatinha Crítica');
    expect(document.body.textContent).not.toMatch(/[{}]/);
  });

  it('renders the correct daily names and changes cards at the reset without losing the selected category', () => {
    vi.setSystemTime(new Date('2026-10-13T16:59:59Z'));
    document.body.innerHTML = renderEvents();
    init();
    openCategory('daily');
    expect(card('character-daily-0').querySelector('h3').textContent).toBe('Situação Grave');
    vi.advanceTimersByTime(1000);
    expect(card('character-daily-0').querySelector('h3').textContent).toBe('Dias de um Gato Esquecido');
    expect(card('character-daily-1').querySelector('h3').textContent).toBe('Seguindo o Ritmo');
    expect(document.querySelector('[data-panel="daily"]').hidden).toBe(false);
    expect(card('character-daily-0').textContent).toContain('Terça');
  });

  it('opens only the selected calendar and preserves its list and scroll position while the seconds tick', () => {
    openCategory('weekly');
    const guildButton = card('guild').querySelector('.rotation-more');
    const riftButton = card('rift').querySelector('.rotation-more');
    guildButton.click();
    const guildCalendar = card('guild').querySelector('.rotation-history');
    expect(guildButton.textContent).toContain('Calendário');
    expect(guildCalendar.hidden).toBe(false);
    expect(guildCalendar.querySelectorAll('li')).toHaveLength(8);
    expect(guildCalendar.querySelectorAll('.past')).toHaveLength(2);
    expect(guildCalendar.querySelectorAll('.current')).toHaveLength(1);
    const bosses = [...guildCalendar.querySelectorAll('li strong')].map(node => node.textContent);
    expect(bosses.slice(1, 4)).toEqual(['Marie — Lutador Imortal', 'Ms. Fortune — Gatinha Crítica', 'Eliza — Destruidora']);
    const list = guildCalendar.querySelector('ul');
    guildCalendar.scrollTop = 100;
    vi.advanceTimersByTime(1000);
    expect(guildCalendar.querySelector('ul')).toBe(list);
    expect(guildCalendar.scrollTop).toBe(100);
    riftButton.click();
    expect(guildCalendar.hidden).toBe(true);
    expect(guildButton.getAttribute('aria-expanded')).toBe('false');
    expect(riftButton.getAttribute('aria-expanded')).toBe('true');
    expect(document.querySelectorAll('.rotation-history:not([hidden])')).toHaveLength(1);
    openCategory('monthly');
    expect(document.querySelectorAll('.rotation-history:not([hidden])')).toHaveLength(0);
  });

  it('shows actual past/upcoming character dates across the Sunday gap', () => {
    vi.setSystemTime(new Date('2026-10-04T17:00:00Z'));
    document.body.innerHTML = renderEvents();
    init();
    openCategory('events');
    const character = card('character-prize');
    expect(character.querySelector('.rotation-status').textContent).toBe('Indisponível');
    expect(character.querySelector('.rotation-timer').textContent).toContain('Próxima aparição em 1 dia(s)');
    character.querySelector('.rotation-more').click();
    const entries = character.querySelectorAll('.rotation-history li');
    expect(entries).toHaveLength(20);
    expect(Number(entries[2].dataset.start)).toBe(Date.parse('2026-10-05T17:00:00Z'));
    expect(entries[2].className).toBe('upcoming');
  });

  it('labels unconfirmed schedules clearly and keeps Login without event timers', () => {
    for (const id of ['medici', 'moves']) {
      expect(card(id).querySelector('.rotation-status').textContent).toBe('A confirmar');
      expect(card(id).querySelector('.rotation-timer').textContent).toBe('Próximo início a confirmar');
    }
    openCategory('login');
    expect(document.querySelector('[data-panel="login"] .rotation-timer')).toBeNull();
    expect(card('login').querySelector('a').href).toBe('https://hub.skullgirlsmobile.com/pt/daily-rewards');
  });

  it('renders and updates the English path when language changes in the same session', () => {
    document.documentElement.lang = 'en';
    document.body.innerHTML = renderEvents();
    init();
    expect(card('monthly-prize').querySelector('h3').textContent).toBe('Costume Party');
    expect(card('monthly-prize-secondary').querySelector('h3').textContent).toBe('Monthly Prize Fight');
    expect(card('character-prize').querySelector('.rotation-subtitle').textContent).toBe('Filia Prize Fight');
    expect(card('elemental').textContent).toContain('Light');
    expect(card('guild').textContent).toContain('Ms. Fortune — Critty Kitty');
    expect(card('login').querySelector('a').href).toBe('https://hub.skullgirlsmobile.com/daily-rewards');
    expect(card('monthly-prize').textContent).toMatch(/day\(s\).*hours.*minutes.*seconds/);
  });

  it('keeps the timezone converter working and replaces its timer when converting again', () => {
    document.body.innerHTML = renderConverter();
    init();
    document.querySelector('#event-date').value = '2026-10-14T14:00';
    document.querySelector('#announcement-zone').value = 'UTC';
    const button = document.querySelector('#convert-event-time');
    button.click();
    expect(document.querySelector('#timezone-result').hidden).toBe(false);
    expect(document.querySelector('#event-countdown').textContent).toMatch(/dia\(s\).*horas.*minutos.*segundos/);
    const timerCount = vi.getTimerCount();
    button.click();
    expect(vi.getTimerCount()).toBe(timerCount);
    expect(document.querySelector('#timezone-local-result').textContent).not.toBe('');
  });
});
