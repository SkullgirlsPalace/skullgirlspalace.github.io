import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createCustomizationRuntime, createEmptyConfig, describeTarget, FONT_STACKS, routeKey, validateConfig } from '../../../src/utils/siteCustomizations.js';

let runtime;
const flush = () => new Promise(resolve => setTimeout(resolve, 5));
function editFor(element, fields = {}) {
    const target = describeTarget(element);
    return { id: 'change-1', route: '/', language: 'pt-BR', ...target, styles: {}, ...fields };
}
beforeEach(() => {
    document.documentElement.lang = 'pt-BR';
    document.body.innerHTML = '<main id="app"><section id="hero"><h1 style="color: blue">Palace</h1><p>Antes <a href="#guide">do guia</a> depois.</p></section></main>';
});
afterEach(() => { runtime?.destroy(); runtime = undefined; });

describe('visual editor contract', () => {
    it('allows only structured CSS values, permanent media URLs and versioned documents', () => {
        const config = createEmptyConfig();
        config.theme['--accent-gold'] = '#123abc';
        config.typography = { bodyFont: 'Roboto', headingFont: 'Georgia', scale: 120 };
        config.edits = [editFor(document.querySelector('h1'), { styles: { 'font-family': FONT_STACKS.system, 'font-size': '30px' } })];
        expect(validateConfig(config)).toBe(config);
        config.edits[0].styles.color = 'url(javascript:alert(1))';
        expect(() => validateConfig(config)).toThrow();
        delete config.edits[0].styles.color;
        config.version = 2;
        expect(() => validateConfig(config)).toThrow(/incompatível/);
        config.version = 1;
        config.edits[0].media = { kind: 'image', src: 'https://cdn.discordapp.com/test.webp', alt: '', width: 20, height: 20, position: 'after' };
        expect(() => validateConfig(config)).toThrow(/Mídia/);
        config.edits[0].media.src = 'img/../data/test.json';
        expect(() => validateConfig(config)).toThrow(/Mídia/);
        config.edits[0].media.src = 'https://example.org/permanent.webp';
        expect(validateConfig(config)).toBe(config);
    });
    it('uses the hash route when present and normalizes static page paths', () => {
        expect(routeKey({ pathname: '/characters/annie/', hash: '#stats' })).toBe('/#stats');
        expect(routeKey({ pathname: '/characters/annie/', hash: '' })).toBe('/characters/annie');
        expect(routeKey({ pathname: '/index.html', hash: '' })).toBe('/');
        expect(routeKey({ pathname: '/characters/annie/', hash: '#/' })).toBe('/');
    });
});

describe('guarded site customizations', () => {
    it('edits direct text nodes without replacing links or event listeners, then restores originals', () => {
        const paragraph = document.querySelector('p'), link = paragraph.querySelector('a');
        const click = vi.fn(); link.addEventListener('click', click);
        const edit = editFor(paragraph);
        edit.texts[0].after = 'Confira ';
        edit.texts[1].after = ' agora.';
        runtime = createCustomizationRuntime(document);
        runtime.apply({ ...createEmptyConfig(), edits: [edit] });
        expect(paragraph.textContent).toBe('Confira do guia agora.');
        expect(paragraph.querySelector('a')).toBe(link);
        link.click(); expect(click).toHaveBeenCalledOnce();
        expect(runtime.describe(paragraph).texts[0]).toEqual({ index: 0, before: 'Antes ', after: 'Confira ' });
        runtime.apply(createEmptyConfig());
        expect(paragraph.textContent).toBe('Antes do guia depois.');
    });
    it('reverses inline styles and never applies an edit to a changed or ambiguous reference', () => {
        const heading = document.querySelector('h1');
        const edit = editFor(heading, { styles: { color: '#ff0000' } });
        runtime = createCustomizationRuntime(document);
        expect(runtime.apply({ ...createEmptyConfig(), edits: [edit] }).applied).toEqual(['change-1']);
        runtime.apply(createEmptyConfig());
        expect(heading.style.color).toBe('blue');
        heading.textContent = 'Novo conteúdo';
        expect(runtime.apply({ ...createEmptyConfig(), edits: [edit] }).skipped).toHaveLength(1);
        expect(heading.style.color).toBe('blue');
        heading.textContent = 'Palace';
        document.querySelector('main').append(document.querySelector('section').cloneNode(true));
        expect(runtime.apply({ ...createEmptyConfig(), edits: [edit] }).skipped).toHaveLength(1);
    });
    it('makes a selected color visible over transparent gradient text and restores its original fill', () => {
        const heading = document.querySelector('h1');
        heading.className = 'gold-gradient';
        heading.style.setProperty('-webkit-text-fill-color', 'transparent');
        const edit = editFor(heading, { styles: { color: '#ff0000' } });
        runtime = createCustomizationRuntime(document);
        runtime.apply({ ...createEmptyConfig(), edits: [edit] });
        expect(heading.style.getPropertyValue('-webkit-text-fill-color')).toBe('#ff0000');
        expect(heading.style.getPropertyPriority('-webkit-text-fill-color')).toBe('important');
        runtime.apply(createEmptyConfig());
        expect(heading.style.getPropertyValue('-webkit-text-fill-color')).toBe('transparent');
        expect(heading.style.getPropertyPriority('-webkit-text-fill-color')).toBe('');
        expect(heading.style.color).toBe('blue');
    });
    it('keeps Portuguese and English edits separate through SPA rerenders and route changes', async () => {
        const edit = editFor(document.querySelector('h1'));
        edit.texts[0].after = 'Palácio';
        const report = vi.fn();
        runtime = createCustomizationRuntime(document, { onReport: report });
        runtime.apply({ ...createEmptyConfig(), edits: [edit] });
        expect(document.querySelector('h1').textContent).toBe('Palácio');
        document.querySelector('h1').outerHTML = '<h1>Palace</h1>';
        await flush();
        expect(document.querySelector('h1').textContent).toBe('Palácio');
        document.documentElement.lang = 'en';
        await flush();
        expect(document.querySelector('h1').textContent).toBe('Palace');
        document.documentElement.lang = 'pt-BR';
        await flush();
        expect(document.querySelector('h1').textContent).toBe('Palácio');
        window.location.hash = '#stats'; window.dispatchEvent(new Event('hashchange'));
        await flush();
        expect(document.querySelector('h1').textContent).toBe('Palace');
        const count = report.mock.calls.length;
        await flush(); expect(report).toHaveBeenCalledTimes(count);
    });
    it('keeps nested selections independent and refuses a missing original text node', () => {
        const section = document.querySelector('section'), heading = document.querySelector('h1');
        const parentEdit = editFor(section, { id: 'parent', styles: { padding: '20px' }, texts: [] });
        const childEdit = editFor(heading, { id: 'child' }); childEdit.texts[0].after = 'Revisado';
        runtime = createCustomizationRuntime(document);
        expect(runtime.apply({ ...createEmptyConfig(), edits: [childEdit, parentEdit] }).applied).toEqual(['child', 'parent']);
        expect(section.style.padding).toBe('20px');
        runtime.apply(createEmptyConfig());
        childEdit.texts[0].before = 'Conteúdo que já mudou';
        expect(runtime.apply({ ...createEmptyConfig(), edits: [childEdit] }).skipped).toHaveLength(1);
        expect(heading.textContent).toBe('Palace');
    });
    it('describes an unedited ancestor using the original text of overridden descendants', () => {
        const section = document.querySelector('section'), heading = document.querySelector('h1');
        const childEdit = editFor(heading, { id: 'child' }); childEdit.texts[0].after = 'Título corrigido';
        runtime = createCustomizationRuntime(document);
        runtime.apply({ ...createEmptyConfig(), edits: [childEdit] });
        const parentDescription = runtime.describe(section);
        expect(parentDescription.fingerprint.text).toBe('PalaceAntes do guia depois.');
        expect(heading.textContent).toBe('Título corrigido');
        const parentEdit = { id: 'parent', route: '/', language: 'pt-BR', ...parentDescription, styles: { padding: '20px' } };
        expect(runtime.apply({ ...createEmptyConfig(), edits: [childEdit, parentEdit] }).applied).toEqual(['child', 'parent']);
        expect(section.style.padding).toBe('20px');
    });
    it('inserts media once, retains sibling selectors, resolves root-relative assets and restores replacements', async () => {
        const paragraph = document.querySelector('p');
        const description = describeTarget(paragraph);
        const edit = editFor(document.querySelector('h1'), {
            media: { kind: 'image', src: 'img/site-editor/example.webp', alt: 'Ilustração', width: 100, height: 80, position: 'after' }
        });
        runtime = createCustomizationRuntime(document);
        runtime.apply({ ...createEmptyConfig(), edits: [edit] });
        expect(document.querySelector('palace-media img').getAttribute('src')).toBe('/img/site-editor/example.webp');
        expect(document.querySelector('palace-media img').loading).toBe('lazy');
        expect(describeTarget(paragraph).selector).toBe(description.selector);
        document.querySelector('p').append(document.createTextNode(' ')); await flush();
        expect(document.querySelectorAll('palace-media')).toHaveLength(1);
        runtime.apply(createEmptyConfig());
        expect(document.querySelector('palace-media')).toBeNull();
        const image = document.createElement('img'); image.src = 'img/original.webp'; image.alt = 'Original';
        image.setAttribute('srcset', 'img/original.webp 2x'); document.querySelector('section').append(image);
        const replace = editFor(image, { media: { ...edit.media, position: 'replace' } });
        runtime.apply({ ...createEmptyConfig(), edits: [replace] });
        expect(image.alt).toBe('Ilustração'); expect(image.getAttribute('srcset')).toBe('');
        runtime.apply(createEmptyConfig());
        expect(image.alt).toBe('Original'); expect(image.getAttribute('srcset')).toBe('img/original.webp 2x');
        expect(image.getAttribute('src')).toBe('img/original.webp');
    });
    it('uses stable variant identities when cards reorder and ignores editor overlays', () => {
        document.body.innerHTML = '<main id="app"><div data-variant-name="Lazulita"><h3>Lazulita</h3></div><div data-variant-name="Mortal"><h3>Mortal</h3></div></main>';
        const heading = document.querySelector('h3'); const edit = editFor(heading);
        edit.texts[0].after = 'Revisada';
        document.querySelector('main').append(document.querySelector('[data-variant-name="Lazulita"]'));
        runtime = createCustomizationRuntime(document);
        expect(runtime.apply({ ...createEmptyConfig(), edits: [edit] }).applied).toEqual(['change-1']);
        expect(heading.textContent).toBe('Revisada');
        const overlay = document.createElement('palace-editor-overlay'); overlay.dataset.palaceEditorUi = ''; document.body.append(overlay);
        expect(() => describeTarget(overlay)).toThrow(/Selecione/);
    });
    it('skips an identical variant heading when a reordered card belongs to another character', () => {
        document.body.innerHTML = '<main id="app"><div data-variant-name="Mesmo nome"><h3>Mesmo nome</h3><span class="variant-char-subtitle">Annie</span></div><div data-variant-name="Mesmo nome"><h3>Mesmo nome</h3><span class="variant-char-subtitle">Peacock</span></div></main>';
        const heading = document.querySelector('h3'), edit = editFor(heading);
        edit.texts[0].after = 'Correção só de Annie';
        expect(edit.fingerprint.context).toBe('["Mesmo nome","Annie"]');
        document.querySelector('main').append(heading.parentElement);
        runtime = createCustomizationRuntime(document);
        const report = runtime.apply({ ...createEmptyConfig(), edits: [edit] });
        expect(report.applied).toHaveLength(0); expect(report.skipped).toHaveLength(1);
        expect([...document.querySelectorAll('h3')].map(node => node.textContent)).toEqual(['Mesmo nome', 'Mesmo nome']);
    });
    it('describes variant identity using the original subtitle even when it has an override', () => {
        document.body.innerHTML = '<main id="app"><div data-variant-name="Lazulita"><h3>Lazulita</h3><span class="variant-char-subtitle">Valentine</span></div></main>';
        const subtitle = document.querySelector('.variant-char-subtitle'), edit = editFor(subtitle);
        edit.texts[0].after = 'Texto corrigido';
        runtime = createCustomizationRuntime(document); runtime.apply({ ...createEmptyConfig(), edits: [edit] });
        const headingDescription = runtime.describe(document.querySelector('h3'));
        expect(headingDescription.fingerprint.context).toBe('["Lazulita","Valentine"]');
        expect(subtitle.textContent).toBe('Texto corrigido');
    });
});
