import { describe, it, expect, afterEach } from 'vitest';
import { translations, setLanguage, t } from '../../../src/i18n/translations.js';

function entries(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) => typeof value === 'object'
    ? entries(value, `${prefix}${key}.`)
    : [[`${prefix}${key}`, value]]);
}

afterEach(() => setLanguage('pt-BR'));

describe('interface translations', () => {
  it('provides every Portuguese interface key and interpolation variable in English', () => {
    const english = new Map(entries(translations.en));
    for (const [key, portuguese] of entries(translations['pt-BR'])) {
      expect(english.has(key), `Missing English translation: ${key}`).toBe(true);
      const variables = text => [...text.matchAll(/\{\w+\}/g)].map(match => match[0]).sort();
      expect(variables(english.get(key)), key).toEqual(variables(portuguese));
    }
  });

  it('changes effect and catalyst controls together with their language', () => {
    setLanguage('en');
    expect(t('guide.modifiers')).toBe('Modifiers');
    expect(t('guide.positiveEffects')).toBe('Positive Effects');
    expect(t('guide.searchModifiers')).toBe('Search modifiers or effects...');
    expect(t('guide.catalystResults', { count: 50 })).toBe('50 catalysts found');
    setLanguage('pt-BR');
    expect(t('guide.modifiers')).toBe('Modificadores');
    expect(t('guide.positiveEffects')).toBe('Efeitos Positivos');
    expect(t('guide.catalystResults', { count: 50 })).toBe('50 catalisadores encontrados');
  });
});
