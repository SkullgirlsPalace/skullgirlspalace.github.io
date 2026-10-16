import { beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { CLASS_PATH } from '../../../tools/editor/model.js';
import { MOVE_DATA } from '../../../src/data/movesimages.js';
import { EN_ABILITIES_PATH, PT_MAPPING_PATH } from '../../../tools/editor/abilities.js';

const load = name => JSON.parse(fs.readFileSync(path.resolve(name), 'utf8'));

describe('Palace Studio workflow', () => {
    beforeEach(() => {
        vi.resetModules(); localStorage.clear();
        window.location.href = 'http://localhost/';
        document.body.innerHTML = '<div id="editor"></div><dialog id="picker"></dialog><dialog id="review"></dialog><input id="import-file" type="file">';
        vi.stubGlobal('fetch', vi.fn(async url => {
            const path = String(url).split('/data/')[1];
            return { ok: true, json: async () => load(`data/${path}`) };
        }));
    });
    it.each(['bootstrap', 'editor'])('does not start %s on a public website', async module => {
        window.location.href = 'https://skullgirlspalace.github.io/tools/editor/';
        await import(`../../../tools/editor/${module}.js`);
        expect(fetch).not.toHaveBeenCalled();
        expect(document.querySelector('#editor').textContent).toContain('apenas no computador local');
        expect(document.querySelector('.workspace')).toBeNull();
        window.location.href = 'http://localhost/';
    });
    it('loads the catalog in pages and edits a graphical team without explanations', async () => {
        await import('../../../tools/editor/editor.js');
        expect(document.querySelector('#editor').textContent).not.toContain('Não foi possível abrir');
        expect(document.querySelectorAll('.catalog-item').length).toBe(18);
        document.querySelector('[data-action="add-team"]').click();
        expect(document.querySelectorAll('.team-grid .member-card')).toHaveLength(3);
        expect(document.querySelectorAll('.team-grid .member-card.empty')).toHaveLength(2);
        document.querySelector('[data-action="pick"]').click();
        expect(document.querySelectorAll('.picker-grid .member-card').length).toBeLessThanOrEqual(12);
        expect(document.querySelector('#picker [data-action="choose-member"]').disabled).toBe(true);
        const candidate = document.querySelector('#picker [data-action="choose-member"]:not(:disabled)');
        candidate.click();
        expect(document.querySelectorAll('.team-grid .member-card.empty')).toHaveLength(1);
        document.querySelector('[data-action="review-team"]').click();
        expect(document.querySelector('.status.reviewed')).not.toBeNull();
        document.querySelector('[data-action="review"]').click();
        expect(document.querySelector('#review').textContent).toContain('data/teams.json');
        expect(document.querySelector('#review [data-action="download"]').disabled).toBe(false);
    });
    it('resets the results scroll and preserves the draft when paging through variants', async () => {
        await import('../../../tools/editor/editor.js');
        document.querySelector('[data-action="add-team"]').click();
        const draft = localStorage.getItem('palace-editor:v1:/');
        document.querySelector('[data-action="pick"]').click();
        const firstName = document.querySelector('.picker-grid strong').textContent;
        document.querySelector('.picker-results').scrollTop = 300;
        document.querySelector('[data-action="picker-next"]').click();
        expect(document.querySelector('#picker [role="status"]').textContent).toMatch(/Página 2\//);
        expect(document.querySelector('.picker-results').scrollTop).toBe(0);
        expect(document.querySelector('.picker-grid strong').textContent).not.toBe(firstName);
        document.querySelector('[data-action="picker-prev"]').click();
        expect(document.querySelector('.picker-grid strong').textContent).toBe(firstName);
        expect(localStorage.getItem('palace-editor:v1:/')).toBe(draft);
    });
    it('filters ability descriptions by buffs and debuffs, combines selections and clears them', async () => {
        fetch.mockImplementation(async url => {
            const data = load(`data/${String(url).split('/data/')[1]}`);
            if (String(url).endsWith('/data/annie.json')) data.variants.diamante.push(
                { name: 'Alvo Barreira', signature_ability: { name: 'Nome sem efeito', description: 'Ganhe BARREIRA.' } },
                { name: 'Alvo Feitiço', signature_ability: { name: 'Nome sem efeito', description: 'Aplique FEITIÇO.' } }
            );
            return { ok: true, json: async () => data };
        });
        await import('../../../tools/editor/editor.js');
        document.querySelector('[data-action="add-team"]').click();
        const draft = localStorage.getItem('palace-editor:v1:/');
        document.querySelector('[data-action="pick"]').click();
        const query = document.querySelector('#picker-query');
        query.value = 'Alvo'; query.dispatchEvent(new Event('input', { bubbles: true }));
        const names = () => [...document.querySelectorAll('.picker-grid strong')].map(el => el.textContent);
        const toggle = key => {
            const checkbox = document.querySelector(`[data-picker-effect="${key}"]`);
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        };
        expect(names()).toEqual(['Alvo Barreira', 'Alvo Feitiço']);
        toggle('barrier');
        expect(names()).toEqual(['Alvo Barreira']);
        toggle('hex');
        expect(names()).toEqual(['Alvo Barreira', 'Alvo Feitiço']);
        toggle('barrier');
        expect(names()).toEqual(['Alvo Feitiço']);
        toggle('hex'); toggle('haste');
        expect(names()).toEqual([]);
        expect(document.querySelector('.picker-results').textContent).toContain('Nenhuma');
        document.querySelector('[data-action="picker-effects-clear"]').click();
        expect(names()).toHaveLength(2);
        expect(localStorage.getItem('palace-editor:v1:/')).toBe(draft);
    });
    it('persists class corrections, invalidates affected teams and exposes defensive categories', async () => {
        await import('../../../tools/editor/editor.js');
        document.querySelector('[data-action="add-team"]').click();
        document.querySelector('[data-action="review-team"]').click();
        document.querySelector('[data-tab="edit"]').click();
        const wildcard = document.querySelector('[data-class="3"]');
        wildcard.checked = true; wildcard.dispatchEvent(new Event('change', { bubbles: true }));
        document.querySelector('[data-tab="teams"]').click();
        expect(document.querySelector('.status.draft')).not.toBeNull();
        expect(document.querySelector('[data-category="defense"]')).not.toBeNull();
        const backup = JSON.parse(localStorage.getItem('palace-editor:v1:/'));
        expect(backup.changes.some(change => change.path === CLASS_PATH)).toBe(true);
    });
    it('switches themes and follows the system without replacing an edited form or its draft', async () => {
        const media = new EventTarget();
        media.matches = false;
        const matchMedia = vi.spyOn(window, 'matchMedia').mockReturnValue(media);
        try {
            await import('../../../tools/editor/editor.js');
            expect(document.documentElement.dataset.theme).toBe('dark');
            document.querySelector('[data-tab="edit"]').click();
            const field = document.querySelector('[data-build="base"][data-field="recommended_build"]');
            field.value = 'Precisão, Perfuração';
            field.dispatchEvent(new Event('input', { bubbles: true }));
            const draft = localStorage.getItem('palace-editor:v1:/');
            const selector = document.querySelector('#editor-theme');
            const choose = value => { selector.value = value; selector.dispatchEvent(new Event('change', { bubbles: true })); };
            choose('light');
            expect(document.documentElement.dataset.theme).toBe('light');
            choose('system');
            expect(document.documentElement.dataset.theme).toBe('light');
            media.matches = true; media.dispatchEvent(new Event('change'));
            expect(document.documentElement.dataset.theme).toBe('dark');
            choose('light'); media.dispatchEvent(new Event('change'));
            expect(document.documentElement.dataset.theme).toBe('light');
            expect(localStorage.getItem('palace-editor-theme')).toBe('light');
            expect(document.querySelector('[data-build="base"][data-field="recommended_build"]')).toBe(field);
            expect(field.value).toBe('Precisão, Perfuração');
            expect(localStorage.getItem('palace-editor:v1:/')).toBe(draft);
        } finally { matchMedia.mockRestore(); }
    });
    it('combines picker search with multiple classes, including locally corrected classes', async () => {
        await import('../../../tools/editor/editor.js');
        document.querySelector('[data-tab="edit"]').click();
        const defensive = document.querySelector('[data-class="1"]');
        defensive.checked = true; defensive.dispatchEvent(new Event('change', { bubbles: true }));
        document.querySelector('[data-tab="teams"]').click();
        document.querySelector('[data-action="add-team"]').click();
        const draft = localStorage.getItem('palace-editor:v1:/');
        document.querySelector('[data-action="pick"]').click();
        document.querySelector('#picker [data-class-index="1"]').click();
        const cards = () => [...document.querySelectorAll('#picker .picker-grid .member-card')];
        expect(cards().length).toBeGreaterThan(0);
        expect(cards().every(card => card.querySelector('.chips').textContent.includes('Defensivo'))).toBe(true);
        expect(cards().some(card => card.textContent.includes('Rosa Estelar'))).toBe(true);
        const query = document.querySelector('#picker-query');
        query.value = 'Rosa Estelar'; query.dispatchEvent(new Event('input', { bubbles: true }));
        expect(cards()).toHaveLength(1);
        expect(cards()[0].querySelector('[data-action="choose-member"]').disabled).toBe(true);
        const search = document.querySelector('#picker-query');
        search.value = ''; search.dispatchEvent(new Event('input', { bubbles: true }));
        document.querySelector('#picker [data-class-index="2"]').click();
        expect(cards().every(card => /Defensivo|Suporte de Utilidade/.test(card.querySelector('.chips').textContent))).toBe(true);
        document.querySelector('#picker [data-action="picker-class-all"]').click();
        expect(document.querySelector('#picker [data-action="picker-class-all"]').getAttribute('aria-pressed')).toBe('true');
        expect(localStorage.getItem('palace-editor:v1:/')).toBe(draft);
    });
    it('shows one character at a time and switches moves without navigating away from the variant', async () => {
        await import('../../../tools/editor/editor.js');
        const draft = localStorage.getItem('palace-editor:v1:/');
        document.querySelector('[data-action="moves-gallery"]').click();
        await vi.waitFor(() => expect(document.querySelector('#moves-character')).not.toBeNull());
        expect(document.querySelectorAll('.move-gallery-card')).toHaveLength(Math.min(24, Object.keys(MOVE_DATA.annie).length));
        expect(document.querySelector('#moves-count').textContent).toContain(String(Object.keys(MOVE_DATA.annie).length));
        const character = document.querySelector('#moves-character');
        expect(character.value).toBe('annie');
        character.value = 'filia'; character.dispatchEvent(new Event('change', { bubbles: true }));
        expect([...document.querySelectorAll('.move-gallery-card small')].every(label => label.textContent.startsWith('Filia'))).toBe(true);
        expect(document.querySelector('.variant-heading h1').textContent).toBe('Rosa Estelar');
        character.value = 'annie'; character.dispatchEvent(new Event('change', { bubbles: true }));
        const query = document.querySelector('#moves-query');
        query.value = 'estilingue gravitacional'; query.dispatchEvent(new Event('input', { bubbles: true }));
        expect(document.querySelectorAll('.move-gallery-card')).toHaveLength(1);
        expect(document.querySelector('.move-name').textContent).toBe('Estilingue Gravitacional');
        expect(document.querySelector('.move-gallery-card img').getAttribute('src')).toContain('/img/annie/Annie_28.webp');
        const copy = vi.fn(async () => {});
        vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({ writeText: copy });
        document.querySelector('[data-gallery-action="copy"]').click();
        await vi.waitFor(() => expect(copy).toHaveBeenCalledWith('Estilingue Gravitacional'));
        expect(localStorage.getItem('palace-editor:v1:/')).toBe(draft);
        document.querySelector('[data-gallery-action="close"]').click();
        expect(document.querySelector('#moves-gallery')).toBeNull();
        expect(fetch.mock.calls.every(([url]) => !String(url).includes('stanleyDB'))).toBe(true);
        vi.restoreAllMocks();
    });
    it('edits PT and EN abilities independently, previews them and exports the correct files', async () => {
        await import('../../../tools/editor/editor.js');
        document.querySelector('[data-action="add-team"]').click();
        document.querySelector('[data-action="review-team"]').click();
        document.querySelector('[data-tab="abilities"]').click();
        const input = (locale, field, value) => {
            const control = document.querySelector(`[data-ability-locale="${locale}"][data-ability-field="${field}"]`);
            expect(control).not.toBeNull();
            control.value = value; control.dispatchEvent(new Event('input', { bubbles: true }));
        };
        input('pt-BR', 'name', 'POLIMENTO DE GEMA REVISADO');
        input('pt-BR', 'description', '[HAB 1]: **2/3/4** segundos.\n\n[HAB 2]: Texto revisado.');
        input('en', 'ability', 'GEM POLISH REVIEWED');
        input('en', 'SA1', '2/3/4 seconds.');
        input('en', 'SA2', 'Reviewed second part.');
        expect(document.querySelector('#ability-preview-pt strong').textContent).toBe('2/3/4');
        expect(document.querySelector('#ability-preview-en').textContent).toContain('Reviewed second part.');
        const backup = JSON.parse(localStorage.getItem('palace-editor:v1:/'));
        expect(backup.changes.map(change => change.path)).toEqual(expect.arrayContaining(['data/annie.json', EN_ABILITIES_PATH, PT_MAPPING_PATH]));
        const english = backup.changes.find(change => change.path === EN_ABILITIES_PATH);
        const touched = Object.keys(english.after).filter(key => JSON.stringify(english.after[key]) !== JSON.stringify(english.before[key]));
        expect(touched).toHaveLength(1);
        expect(english.after[touched[0]].SA1).toBe('2/3/4 seconds.');
        document.querySelector('[data-tab="teams"]').click();
        expect(document.querySelector('.status.draft')).not.toBeNull();
        document.querySelector('[data-tab="reference"]').click();
        expect(document.querySelector('#main-view').textContent).toContain('POLIMENTO DE GEMA REVISADO');
        expect(document.querySelector('#main-view').textContent).toContain('GEM POLISH REVIEWED');
        document.querySelector('[data-action="review"]').click();
        expect(document.querySelector('#review [data-action="download"]').disabled).toBe(false);
    });
    it('opens character-specific moves beside the arsenal without changing edited text', async () => {
        await import('../../../tools/editor/editor.js');
        document.querySelector('[data-tab="edit"]').click();
        const arsenal = document.querySelector('[data-build="base"][data-field="recommended_arsenal"]');
        arsenal.value = 'Estilingue Gravitacional';
        arsenal.dispatchEvent(new Event('input', { bubbles: true }));
        const draft = localStorage.getItem('palace-editor:v1:/');
        arsenal.closest('div').querySelector('[data-action="character-moves"]').click();
        await vi.waitFor(() => expect(document.querySelector('#moves-character')?.value).toBe('annie'));
        expect([...document.querySelectorAll('.move-gallery-card small')].every(label => label.textContent.startsWith('Annie'))).toBe(true);
        document.querySelector('[data-gallery-action="close"]').click();
        expect(document.querySelector('[data-build="base"][data-field="recommended_arsenal"]')).toBe(arsenal);
        expect(arsenal.value).toBe('Estilingue Gravitacional');
        expect(localStorage.getItem('palace-editor:v1:/')).toBe(draft);
    });
});
