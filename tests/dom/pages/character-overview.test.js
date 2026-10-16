import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setLanguage } from '../../../src/i18n/translations.js';
import { render, init } from '../../../src/pages/character-overview.js';
import { getCharacter } from '../../../src/services/dataService.js';
import { setCurrentCharacter } from '../../../src/state/store.js';

vi.mock('../../../src/services/dataService.js', () => ({ getCharacter: vi.fn() }));
vi.mock('../../../src/state/store.js', () => ({ setCurrentCharacter: vi.fn() }));
vi.mock('../../../src/i18n/index.js', async () => {
    const language = await vi.importActual('../../../src/i18n/translations.js');
    return {
        t: language.t, getCurrentLanguage: language.getCurrentLanguage,
        getLocalizedNameSync: name => language.getCurrentLanguage() === 'en' ? 'Sample Variant' : name,
        getLocalizedAbilityNameSync: (name, fallback) => language.getCurrentLanguage() === 'en' ? 'Sample Ability' : fallback,
        getLocalizedSADescSync: (name, fallback) => language.getCurrentLanguage() === 'en' ? 'Gain ENRAGE for 10 seconds.' : fallback
    };
});

const data = {
    character: 'Filia', variants: { ouro: [{ name: 'Variante de Teste', element: 'Fogo',
        stats: { attack: 100, health: 200, power: 300 },
        signature_ability: { name: 'Habilidade de Teste', description: '[HAB 1]: Ganhe **FÚRIA** por 10 segundos.' },
        recommended_build: 'Recommendation only for the builds page'
    }] }
};

beforeEach(() => {
    vi.clearAllMocks();
    setLanguage('pt-BR');
    getCharacter.mockReturnValue(data);
});
afterEach(() => { document.body.innerHTML = ''; setLanguage('pt-BR'); });

describe('distinct character overview', () => {
    it('shows variants, attributes and abilities, rather than build recommendations', () => {
        const original = JSON.stringify(data);
        document.body.innerHTML = render('filia');
        expect(document.querySelectorAll('h1')).toHaveLength(1);
        expect(document.querySelector('h1').textContent).toBe('Filia');
        expect(document.querySelectorAll('.overview-variant')).toHaveLength(1);
        expect(document.body.textContent).toContain('Filia tem 1 variantes');
        expect(document.body.textContent).toContain('Ataque 100, Vida 200, Pontuação 300');
        expect(document.body.textContent).toContain('Ganhe FÚRIA por 10 segundos.');
        expect(document.body.textContent).not.toContain('Recommendation only');
        expect(document.querySelector('.filter-bar')).toBeNull();
        expect(JSON.stringify(data)).toBe(original);
    });

    it('links to variants, tier list, and all characters without an overview tab', () => {
        document.body.innerHTML = render('filia');
        const links = [...document.querySelectorAll('.detail-tabs a')].map(link => link.getAttribute('href'));
        expect(links).toEqual(['/characters/filia/builds/', '/characters/filia/tier-list/', '/characters/']);
        expect(document.querySelector('.detail-tabs a').textContent).toBe('VARIANTES');
    });

    it('uses the English labels and localized variant/ability data', () => {
        setLanguage('en');
        document.body.innerHTML = render('filia');
        expect(document.body.textContent).toContain('Filia has 1 variants');
        expect(document.body.textContent).toContain('Sample Variant');
        expect(document.body.textContent).toContain('Sample Ability');
        expect(document.body.textContent).toContain('Gain ENRAGE for 10 seconds.');
        expect(document.body.textContent).toContain('Element: Fire. Attack 100, Health 200, Power 300');
        expect(document.querySelector('.detail-tabs a').textContent).toBe('VARIANTS');
    });

    it('keeps missing characters recoverable through the home link', () => {
        getCharacter.mockReturnValue(null);
        document.body.innerHTML = render('missing');
        expect(document.querySelector('h1').textContent).toBe('Personagem não encontrado');
        expect(document.querySelector('a').getAttribute('href')).toBe('/');
    });

    it('updates the current character without loading build cards or extra data', () => {
        init('filia');
        expect(setCurrentCharacter).toHaveBeenCalledWith('filia');
    });
});
