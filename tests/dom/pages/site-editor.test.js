import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PropertySymbol, Window } from 'happy-dom';
import { createEmptyConfig } from '../../../src/utils/siteCustomizations.js';
import { BACKUP_NAME, EXPORT_NAME, makeBackup } from '../../../tools/site-editor/model.js';

const storage = vi.hoisted(() => ({ readDraft: vi.fn(), writeDraft: vi.fn() }));
vi.mock('../../../tools/site-editor/storage.js', () => storage);

let preview, downloads;
const flush = () => new Promise(resolve => setTimeout(resolve, 5));
const control = selector => document.querySelector(selector);
function change(selector, value, eventName = 'change') {
    const field = control(selector); field.value = value;
    field.dispatchEvent(new Event(eventName, { bubbles: true }));
}
async function startPreview() {
    await import('../../../tools/site-editor/editor.js');
    expect(control('#editor').textContent).not.toContain('Não foi possível abrir');
    control('#preview-frame').dispatchEvent(new Event('load'));
    await flush();
}
beforeEach(() => {
    vi.resetModules(); storage.readDraft.mockReset(); storage.writeDraft.mockReset();
    storage.readDraft.mockResolvedValue(undefined); storage.writeDraft.mockResolvedValue(undefined);
    window.location.href = 'http://localhost/tools/site-editor/'; window.location.origin = 'http://localhost';
    document.documentElement.lang = 'pt-BR';
    document.body.innerHTML = '<div id="editor"></div><dialog id="transfer-dialog"></dialog><input id="backup-file" type="file">';
    preview = new Window({ url: 'http://localhost/index.html?palace-preview=1' });
    preview.document.documentElement.lang = 'pt-BR';
    preview.document.body.innerHTML = '<main id="app"><section id="hero"><h1>Palace</h1><p>Antes <a href="#guide">do guia</a> depois.</p><button id="action">Abrir</button></section></main>';
    preview.handleSelectLanguage = vi.fn(language => { preview.document.documentElement.lang = language; });
    // This fixture supplies its own page and explicit load events. Avoid a second
    // asynchronous about:blank load from happy-dom overwriting the selection.
    const connectElement = Object.getPrototypeOf(HTMLIFrameElement.prototype)[PropertySymbol.connectedToDocument];
    vi.spyOn(HTMLIFrameElement.prototype, PropertySymbol.connectedToDocument).mockImplementation(function () { connectElement.call(this); });
    vi.spyOn(HTMLIFrameElement.prototype, 'contentWindow', 'get').mockImplementation(() => preview);
    vi.spyOn(HTMLIFrameElement.prototype, 'contentDocument', 'get').mockImplementation(() => preview.document);
    vi.spyOn(HTMLIFrameElement.prototype, 'src', 'set').mockImplementation(function (value) { this.dataset.testSrc = value; });
    vi.spyOn(HTMLIFrameElement.prototype, 'src', 'get').mockImplementation(function () { return this.dataset.testSrc || ''; });
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => createEmptyConfig() })));
    downloads = [];
    vi.spyOn(URL, 'createObjectURL').mockImplementation(blob => { downloads.push(blob); return `blob:test-${downloads.length}`; });
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () { this.dataset.testDownloaded = this.download; });
});
afterEach(async () => {
    await preview.happyDOM.close();
    vi.restoreAllMocks(); vi.unstubAllGlobals();
});

describe('visual site editor workflow', () => {
    it('does not load drafts, fetch data or create a preview on a public website', async () => {
        window.location.href = 'https://skullgirlspalace.github.io/tools/site-editor/';
        await import('../../../tools/site-editor/editor.js');
        expect(fetch).not.toHaveBeenCalled(); expect(storage.readDraft).not.toHaveBeenCalled();
        expect(control('#editor').textContent).toContain('apenas no computador local');
        expect(control('#preview-frame')).toBeNull();
    });

    it('selects real text, edits style, undoes/redoes, compares and exports a reviewable draft', async () => {
        await startPreview();
        const heading = preview.document.querySelector('h1');
        heading.click();
        expect(control('#element-form')).not.toBeNull();
        expect(control('#selection-shortcut').hidden).toBe(false);
        expect(control('#selection-shortcut').textContent).toContain('Palace');
        change('[data-text-index="0"]', 'Palácio');
        expect(heading.textContent).toBe('Palácio');
        change('[data-style="font-size"]', '32');
        expect(heading.style.fontSize).toBe('32px');
        expect(control('#changes-count').textContent).toBe('1');
        await flush();
        expect(storage.writeDraft.mock.lastCall[0]).toMatchObject({ base: createEmptyConfig(), config: { edits: [{ language: 'pt-BR', styles: { 'font-size': '32px' }, texts: [{ before: 'Palace', after: 'Palácio' }] }] } });
        control('[data-action="undo"]').click();
        expect(heading.style.fontSize).toBe(''); expect(heading.textContent).toBe('Palácio');
        control('[data-action="redo"]').click();
        expect(heading.style.fontSize).toBe('32px');
        control('[data-tab="general"]').click(); change('#scale', '120', 'input');
        expect(preview.document.querySelector('[data-palace-customizations]').textContent).toContain('zoom:1.2');
        control('[data-action="reset-globals"]').click();
        expect(preview.document.querySelector('[data-palace-customizations]').textContent).not.toContain('zoom:1.2');
        expect(heading.textContent).toBe('Palácio');
        control('[data-action="compare"]').click();
        expect(heading.textContent).toBe('Palace'); expect(heading.style.fontSize).toBe('');
        control('[data-action="compare"]').click();
        expect(heading.textContent).toBe('Palácio'); expect(heading.style.fontSize).toBe('32px');
        control('[data-action="backup"]').click();
        const backup = JSON.parse(await downloads.at(-1).text());
        expect(backup.format).toBe('palace-visual-backup'); expect(backup.config.edits[0].texts[0].after).toBe('Palácio');
        expect(backup.base.edits).toEqual([]);
        control('[data-action="review"]').click();
        await vi.waitFor(() => expect(control('#transfer-dialog [data-download]')).not.toBeNull());
        expect(control('#transfer-dialog').textContent).toContain('data/site-customizations.json');
        expect(control('#transfer-dialog').textContent).toContain('SHA-256');
        control('#transfer-dialog [data-download]').click();
        expect(downloads.at(-1).type).toBe('application/zip');
        expect(new DataView(await downloads.at(-1).arrayBuffer()).getUint32(0, true)).toBe(0x04034b50);
        expect(BACKUP_NAME).toBe('palace-visual-v1-backup.json'); expect(EXPORT_NAME).toBe('palace-visual-v1.zip');
    }, 15000);

    it('preserves links while editing paragraph segments and keeps navigate/select behaviors distinct', async () => {
        await startPreview();
        const paragraph = preview.document.querySelector('p'), link = paragraph.querySelector('a'), button = preview.document.querySelector('button');
        const clicked = vi.fn(); button.addEventListener('click', clicked);
        paragraph.click();
        change('[data-text-index="0"]', 'Leia ');
        change('[data-text-index="2"]', ' agora.');
        expect(paragraph.textContent).toBe('Leia do guia agora.'); expect(paragraph.querySelector('a')).toBe(link);
        control('[data-mode="navigate"]').click(); button.click(); expect(clicked).toHaveBeenCalledOnce();
        control('[data-mode="select"]').click(); button.click(); expect(clicked).toHaveBeenCalledOnce();
        expect(control('.selection-tag').textContent).toContain('action');
        control('[data-tab="media"]').click();
        change('#media-src', 'https://cdn.discordapp.com/expired.gif');
        control('#media-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        expect(control('.toast.error')).not.toBeNull();
        expect(preview.document.querySelector('palace-media')).toBeNull();
        change('#media-src', 'https://example.org/permanent.webp');
        change('#media-alt', 'Ilustração');
        control('#media-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        expect(preview.document.querySelector('palace-media img').alt).toBe('Ilustração');
        expect(preview.document.querySelector('palace-media img').loading).toBe('lazy');
        control('[data-action="remove-media"]').click();
        expect(preview.document.querySelector('palace-media')).toBeNull();
        expect(paragraph.querySelector('a')).toBe(link);
    });

    it('archives a stale draft and saves current edits without waiting for recovery download', async () => {
        const oldBase = { ...createEmptyConfig(), theme: { '--bg-primary': '#111111' } };
        const preserved = makeBackup(oldBase, { ...oldBase, typography: { scale: 120 } });
        storage.readDraft.mockImplementation(async slot => slot === 'recovery-latest' ? undefined : preserved);
        await startPreview();
        expect(control('[data-action="fresh"]').disabled).toBe(true);
        expect(storage.writeDraft).toHaveBeenCalledWith(preserved, expect.stringMatching(/^recovery-/));
        expect(storage.writeDraft).toHaveBeenCalledWith(preserved, 'recovery-latest');
        change('#scale', '110', 'input'); await flush();
        expect(storage.writeDraft.mock.calls.some(([backup, slot]) => slot === undefined && backup.config.typography.scale === 110)).toBe(true);
        control('[data-action="recover"]').click();
        expect(JSON.parse(await downloads.at(-1).text())).toEqual(preserved);
        expect(control('[data-action="fresh"]').disabled).toBe(false);
        control('[data-action="fresh"]').click(); await flush();
        expect(storage.writeDraft.mock.lastCall[0].base).toEqual(createEmptyConfig());
    });

    it('returns from an English preview to a Portuguese edit without duplicating shell actions', async () => {
        await startPreview();
        const heading = preview.document.querySelector('h1'); heading.click();
        change('[data-text-index="0"]', 'Palácio'); change('[data-style="font-size"]', '30');
        change('#language', 'en');
        control('#preview-frame').dispatchEvent(new Event('load')); await flush();
        expect(preview.document.documentElement.lang).toBe('en'); expect(heading.textContent).toBe('Palace');
        control('[data-tab="changes"]').click(); control('[data-edit]').click();
        control('#preview-frame').dispatchEvent(new Event('load')); await flush();
        expect(control('#language').value).toBe('pt-BR'); expect(heading.textContent).toBe('Palácio');
        await vi.waitFor(() => expect(control('#element-form'), `${control('#inspector').textContent} ${control('.toast')?.textContent || ''}`).not.toBeNull());
        control('[data-action="undo"]').click();
        expect(heading.textContent).toBe('Palácio'); expect(heading.style.fontSize).toBe('');
        const previousDownloads = downloads.length; control('[data-action="backup"]').click();
        expect(downloads).toHaveLength(previousDownloads + 1);
    }, 15000);
});
