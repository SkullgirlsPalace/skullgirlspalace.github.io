import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderVariants } from '../../../src/components/VariantCard.js';
import { setCharacters } from '../../../src/state/store.js';
import { setLanguage } from '../../../src/i18n/index.js';

const variant = { name: 'Rosa Estelar', element: 'Neutro', recommended_build: 'Precisão', signature_ability: { name: 'POLIMENTO DE GEMA' } };
const anchor = { character: 'annie', variant: variant.name };

describe('lazy public Teams tab', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="cards"></div>';
        setLanguage('pt-BR'); setCharacters({ annie: { variants: { diamante: [variant] } } });
    });
    it('adds Teams to the right of Build, loads on demand, hides drafts and renders classes below cards', async () => {
        setCharacters({ annie: { variants: { diamante: [variant, { name: 'Resguardada' }] } } });
        const team = { id: 'published', anchor, category: 'general', members: [anchor, { character: 'annie', variant: 'Resguardada' }], reviewedOn: '2026-10-15', status: 'reviewed' };
        const fetch = vi.fn(async () => ({ ok: true, json: async () => ({ version: 1, teams: [team, { ...team, id: 'draft', status: 'draft' }] }) }));
        vi.stubGlobal('fetch', fetch);
        renderVariants('cards', [variant], 'annie');
        expect(fetch).not.toHaveBeenCalled();
        const tabs = [...document.querySelectorAll('.variant-tab-btn')].map(button => button.dataset.tab);
        expect(tabs.indexOf('teams')).toBe(tabs.indexOf('build') + 1);
        expect(document.querySelector('[data-team-category="defense"]')).not.toBeNull();
        document.querySelector('[data-tab="teams"]').click();
        await vi.waitFor(() => expect(document.querySelectorAll('.team-recommendation')).toHaveLength(1));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(document.querySelector('.team-members strong').textContent).toBe('Rosa Estelar');
        expect(document.querySelector('.team-position').textContent).toBe('1ª · Frente');
        expect(document.querySelector('.team-order').textContent).toContain('da direita para a esquerda');
        expect(document.querySelector('.team-members p').textContent).toContain('Suporte de Utilidade');
        expect(document.querySelectorAll('.team-members p')[1].querySelector('.team-secondary-class').textContent).toBe('Também atua como: Suporte de Utilidade');
        expect(document.querySelector('[data-team-category="rift"]')).toBeNull();
        document.querySelector('[data-team-category="defense"]').click();
        await vi.waitFor(() => expect(document.querySelector('.teams-message')?.textContent).toContain('Ainda não há times revisados'));
        expect(fetch).toHaveBeenCalledTimes(1);
    });
    it('does not expose the defensive category for an offensive variant and localizes empty UI', () => {
        setLanguage('en');
        renderVariants('cards', [{ name: 'Offensive test variant', recommended_build: 'ATQ%', element: 'Fogo' }], 'filia');
        expect(document.querySelector('[data-team-category="defense"]')).toBeNull();
        expect(document.querySelector('[data-tab="teams"]').textContent).toBe('Teams');
        expect(document.querySelector('[data-team-category="general"]').textContent).toBe('Offensive Teams');
        expect(document.querySelector('.team-order').textContent).toContain('right to left');
        expect(document.querySelector('[data-team-category="rift"]')).toBeNull();
        setLanguage('pt-BR');
    });
});
