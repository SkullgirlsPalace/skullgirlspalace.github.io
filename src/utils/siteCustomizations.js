// Shared, dependency-free contract for the visual editor and the published SPA.
export const FONT_STACKS = Object.freeze({
    system: "system-ui, 'Segoe UI', sans-serif",
    Roboto: "'Roboto', sans-serif",
    Washington: "'Washington', sans-serif",
    Georgia: 'Georgia, serif',
    monospace: 'ui-monospace, Consolas, monospace'
});
export const THEME_TOKENS = Object.freeze([
    '--bg-primary', '--bg-secondary', '--bg-card', '--bg-card-hover',
    '--text-primary', '--text-secondary', '--text-muted',
    '--accent-gold', '--accent-gold-light', '--accent-gold-dark',
    '--element-fire', '--element-water', '--element-wind', '--element-light', '--element-dark', '--element-neutral',
    '--rarity-bronze', '--rarity-silver', '--rarity-gold', '--rarity-diamond',
    '--tier-s', '--tier-a', '--tier-b', '--tier-c', '--tier-d',
    '--max-width', '--navbar-height', '--border-radius', '--border-radius-sm'
]);
export const ALLOWED_STYLES = Object.freeze([
    'color', 'background-color', 'font-size', 'font-family', 'font-weight', 'line-height', 'text-align',
    'width', 'max-width', 'height', 'min-height', 'padding', 'margin', 'gap', 'border-radius', 'opacity', 'display', 'object-fit'
]);
const FORBIDDEN_TAGS = new Set(['HTML', 'HEAD', 'BODY', 'SCRIPT', 'STYLE', 'LINK', 'META', 'IFRAME', 'OBJECT', 'EMBED', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'SVG', 'PATH']);
const HEX = /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i;
const ID = /^[a-zA-Z0-9_-]{1,100}$/;
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, limit = 20000) => typeof value === 'string' && value.length <= limit;
const hasOnly = (value, keys) => isObject(value) && Object.keys(value).every(key => keys.includes(key));
const fail = message => { throw new Error(message); };
const normalizedText = value => String(value ?? '').replace(/\s+/g, ' ').trim();
const px = (value, maximum = 2400, minimum = 0) => /^\d+(?:\.\d+)?px$/.test(value) && parseFloat(value) >= minimum && parseFloat(value) <= maximum;

export function createEmptyConfig() { return { version: 1, theme: {}, typography: {}, edits: [] }; }

export function routeKey(location) {
    const hash = location.hash || '';
    if (hash === '#/') return '/';
    if (hash && hash !== '#' && hash !== '#/') return `/${hash}`;
    const pathname = location.pathname || '/';
    return pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
}

export function isMediaSource(value) {
    if (!text(value, 2048) || /[\s\\]/.test(value)) return false;
    if (/^\/?(?:img|media)\/[a-zA-Z0-9_./-]+$/.test(value)) {
        return !value.split('/').some(part => part === '..' || part === '.' || part.startsWith('.'));
    }
    try {
        const url = new URL(value);
        return url.protocol === 'https:' && !url.username && !url.password
            && !/(^|\.)(?:discordapp\.(?:com|net)|discord\.com)$/.test(url.hostname);
    } catch { return false; }
}

function validStyle(key, value) {
    if (!text(value, 150)) return false;
    if (['color', 'background-color'].includes(key)) return HEX.test(value) || value === 'transparent';
    if (key === 'font-family') return Object.values(FONT_STACKS).includes(value);
    if (key === 'font-size') return px(value, 200, 6);
    if (['width', 'max-width'].includes(key)) return px(value) || (/^\d+(?:\.\d+)?%$/.test(value) && parseFloat(value) > 0 && parseFloat(value) <= 100) || value === 'auto';
    if (['height', 'min-height'].includes(key)) return px(value) || value === 'auto';
    if (['padding', 'margin', 'gap', 'border-radius'].includes(key)) return px(value, 200);
    if (key === 'font-weight') return /^(?:[1-9]00|normal|bold)$/.test(value);
    if (key === 'line-height') return /^(?:\d+(?:\.\d+)?|\.\d+)$/.test(value) && Number(value) >= 0.5 && Number(value) <= 4;
    if (key === 'opacity') return /^(?:\d+(?:\.\d+)?|\.\d+)$/.test(value) && Number(value) >= 0 && Number(value) <= 1;
    if (key === 'text-align') return ['left', 'center', 'right', 'justify'].includes(value);
    if (key === 'display') return ['none', 'block', 'inline-block', 'flex', 'grid'].includes(value);
    if (key === 'object-fit') return ['contain', 'cover', 'fill', 'scale-down'].includes(value);
    return false;
}

/** Validate before using/importing a document; no CSS, HTML or executable URLs are accepted. */
export function validateConfig(config) {
    if (!hasOnly(config, ['version', 'theme', 'typography', 'edits']) || config.version !== 1) fail('Formato do editor visual incompatível.');
    if (!isObject(config.theme) || !isObject(config.typography) || !Array.isArray(config.edits) || config.edits.length > 300) fail('Documento do editor visual inválido.');
    for (const [key, value] of Object.entries(config.theme)) {
        if (!THEME_TOKENS.includes(key) || !text(value, 50)) fail('Variável de aparência não permitida.');
        const valid = ['--max-width', '--navbar-height', '--border-radius', '--border-radius-sm'].includes(key)
            ? px(value, key === '--max-width' ? 2400 : 200, key === '--max-width' ? 320 : 0) : HEX.test(value);
        if (!valid) fail(`Valor inválido para ${key}.`);
    }
    if (!hasOnly(config.typography, ['bodyFont', 'headingFont', 'scale'])) fail('Tipografia inválida.');
    for (const key of ['bodyFont', 'headingFont']) {
        if (config.typography[key] !== undefined && !Object.hasOwn(FONT_STACKS, config.typography[key])) fail('Fonte não permitida.');
    }
    if (config.typography.scale !== undefined && (!Number.isFinite(config.typography.scale) || config.typography.scale < 50 || config.typography.scale > 150)) fail('A escala deve ficar entre 50% e 150%.');
    const ids = new Set();
    for (const edit of config.edits) {
        if (!hasOnly(edit, ['id', 'route', 'language', 'selector', 'fingerprint', 'styles', 'texts', 'media']) || !text(edit.id, 100) || !ID.test(edit.id) || ids.has(edit.id)) fail('Identificador de alteração inválido ou repetido.');
        ids.add(edit.id);
        if (!text(edit.route, 300) || !edit.route || !['all', 'pt-BR', 'en'].includes(edit.language)) fail('Página ou idioma da alteração inválido.');
        if (!text(edit.selector, 2000) || !edit.selector || /[{};\u0000]/.test(edit.selector)) fail('Seletor da alteração inválido.');
        const fingerprint = edit.fingerprint;
        if (!hasOnly(fingerprint, ['tag', 'text', 'src', 'context']) || !/^[A-Z][A-Z0-9-]*$/.test(fingerprint.tag) || FORBIDDEN_TAGS.has(fingerprint.tag) || !text(fingerprint.text)) fail('Referência do elemento inválida.');
        if (fingerprint.src !== undefined && !text(fingerprint.src, 2048)) fail('Referência da mídia inválida.');
        if (fingerprint.context !== undefined && !text(fingerprint.context, 2000)) fail('Identidade do contexto inválida.');
        if (!isObject(edit.styles) || Object.entries(edit.styles).some(([key, value]) => !ALLOWED_STYLES.includes(key) || !validStyle(key, value))) fail('Estilo da alteração inválido.');
        if (!Array.isArray(edit.texts) || edit.texts.length > 100) fail('Textos da alteração inválidos.');
        const indexes = new Set();
        for (const item of edit.texts) {
            if (!hasOnly(item, ['index', 'before', 'after']) || !Number.isSafeInteger(item.index) || item.index < 0 || item.index > 2000 || indexes.has(item.index) || !text(item.before) || !text(item.after)) fail('Trecho de texto inválido.');
            indexes.add(item.index);
        }
        if (edit.media !== undefined) {
            const media = edit.media;
            if (!hasOnly(media, ['kind', 'src', 'alt', 'width', 'height', 'position']) || !['image', 'video'].includes(media.kind) || !isMediaSource(media.src)
                || !text(media.alt, 500) || !['before', 'after', 'replace'].includes(media.position)
                || !Number.isSafeInteger(media.width) || media.width < 1 || media.width > 2400
                || !Number.isSafeInteger(media.height) || media.height < 1 || media.height > 2400) fail('Mídia inválida. Use um arquivo local ou endereço HTTPS permanente.');
            if (media.position === 'replace' && !['IMG', 'VIDEO'].includes(fingerprint.tag)) fail('Substituir mídia exige selecionar uma imagem ou vídeo.');
            if (media.position === 'replace' && ((fingerprint.tag === 'IMG') !== (media.kind === 'image'))) fail('A mídia substituta precisa manter o tipo do elemento.');
        }
    }
    return config;
}

const attributeString = value => String(value).replace(/["\\]/g, '\\$&').replace(/[\n\r\f]/g, ' ');
const isTarget = element => element?.nodeType === 1 && element.ownerDocument.body?.contains(element) && !FORBIDDEN_TAGS.has(element.tagName) && !element.closest('[data-palace-inserted],[data-palace-editor-ui]');
function variantContext(element, getText = node => node?.textContent || '') {
    const card = element.closest('[data-variant-name]');
    return card ? JSON.stringify([card.getAttribute('data-variant-name'), normalizedText(getText(card.querySelector('.variant-char-subtitle')))]) : undefined;
}

function unique(document, selector, element) {
    try {
        const matches = document.querySelectorAll(selector);
        return matches.length === 1 && matches[0] === element;
    } catch { return false; }
}

function selectorFor(element) {
    const document = element.ownerDocument;
    const path = [];
    let current = element;
    while (current && current !== document.body) {
        let anchor;
        if (current.hasAttribute('data-variant-name')) anchor = `[data-variant-name="${attributeString(current.getAttribute('data-variant-name'))}"]`;
        if (!anchor && current.id && !/\d/.test(current.id)) anchor = `[id="${attributeString(current.id)}"]`;
        if (anchor && unique(document, anchor, current)) {
            const selector = [anchor, ...path].join(' > ');
            if (unique(document, selector, element)) return selector;
        }
        const siblings = [...(current.parentElement?.children || [])].filter(item => item.tagName === current.tagName && !item.hasAttribute('data-palace-inserted'));
        path.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(current) + 1})`);
        current = current.parentElement;
    }
    return `body > ${path.join(' > ')}`;
}

export function describeTarget(element) {
    if (!isTarget(element)) fail('Selecione um elemento da página, como um texto, botão, imagem ou seção.');
    const fingerprint = { tag: element.tagName, text: normalizedText(element.textContent) };
    if (['IMG', 'VIDEO'].includes(element.tagName)) fingerprint.src = element.getAttribute('src') || '';
    const context = variantContext(element);
    if (context !== undefined) fingerprint.context = context;
    return {
        selector: selectorFor(element), fingerprint,
        texts: [...element.childNodes].flatMap((node, index) => node.nodeType === 3 ? [{ index, before: node.nodeValue, after: node.nodeValue }] : [])
    };
}

function fingerprintMatches(element, fingerprint) {
    return isTarget(element) && element.tagName === fingerprint.tag && normalizedText(element.textContent) === fingerprint.text
        && (fingerprint.src === undefined || (element.getAttribute('src') || '') === fingerprint.src)
        && (fingerprint.context === undefined || variantContext(element) === fingerprint.context);
}

/** Applies exact, guarded edits and restores them when the route, language or draft changes. */
export function createCustomizationRuntime(document, { onReport = () => {}, resolveMedia = source => source } = {}) {
    let config = createEmptyConfig(), stopped = false, pending = false;
    let undo = [], baselines = new WeakMap(), originalTexts = new WeakMap(), originalSources = new WeakMap();
    const window = document.defaultView;
    const styleElement = document.createElement('style');
    styleElement.dataset.palaceCustomizations = '';
    document.head.append(styleElement);
    const observer = new window.MutationObserver(records => {
        if (records.some(record => !record.target.closest?.('[data-palace-editor-ui]')
            && !(record.type === 'childList' && [...record.addedNodes, ...record.removedNodes].every(node => node.nodeType === 1 && node.hasAttribute('data-palace-editor-ui'))))) schedule();
    });
    const observe = () => {
        if (!stopped) observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['lang', 'src'] });
    };
    function schedule() {
        if (pending || stopped) return;
        pending = true;
        window.queueMicrotask(() => { pending = false; if (!stopped) reconcile(); });
    }
    function rememberAttribute(element, name, value) {
        const before = element.getAttribute(name);
        if (name === 'src' && !originalSources.has(element)) originalSources.set(element, before || '');
        element.setAttribute(name, value);
        undo.push(() => { if (element.getAttribute(name) === String(value)) { if (before === null) element.removeAttribute(name); else element.setAttribute(name, before); } });
    }
    function mediaSource(source) {
        const resolved = resolveMedia(source);
        return /^(?:img|media)\//.test(resolved) ? `/${resolved}` : resolved;
    }
    function makeMedia(media) {
        // A distinct tag leaves the original nth-of-type sibling positions intact.
        const wrapper = document.createElement('palace-media');
        wrapper.dataset.palaceInserted = '';
        wrapper.style.display = 'block';
        const node = document.createElement(media.kind === 'video' ? 'video' : 'img');
        node.src = mediaSource(media.src);
        node.width = media.width; node.height = media.height;
        node.style.cssText = 'display:block;max-width:100%;height:auto;object-fit:contain';
        if (media.kind === 'video') { node.controls = true; node.preload = 'none'; node.setAttribute('aria-label', media.alt); }
        else { node.loading = 'lazy'; node.alt = media.alt; }
        wrapper.append(node);
        return wrapper;
    }
    function globalStyles() {
        const theme = Object.entries(config.theme).map(([key, value]) => `${key}:${value}!important`).join(';');
        const body = [];
        if (config.typography.scale !== undefined) body.push(`zoom:${config.typography.scale / 100}`);
        const bodyFont = config.typography.bodyFont ? `body,p,a,button,input,select,textarea,label,li,td,th,span:not(.fas):not(.fab){font-family:${FONT_STACKS[config.typography.bodyFont]}!important}` : '';
        const headings = config.typography.headingFont ? `h1,h2,h3,h4,h5,h6,h1 *,h2 *,h3 *,h4 *,h5 *,h6 *,.cinematic,.hub-btn span{font-family:${FONT_STACKS[config.typography.headingFont]}!important}` : '';
        styleElement.textContent = `${theme ? `:root{${theme}}` : ''}${body.length ? `body{${body.join(';')}}` : ''}${bodyFont}${headings}`;
    }
    function reconcile() {
        observer.disconnect();
        undo.reverse().forEach(restore => restore()); undo = []; baselines = new WeakMap(); originalTexts = new WeakMap(); originalSources = new WeakMap();
        globalStyles();
        const report = { applied: [], skipped: [] };
        const route = routeKey(window.location), language = document.documentElement.lang || 'pt-BR';
        const prepared = [];
        for (const edit of config.edits) {
            if ((edit.route !== '*' && edit.route !== route) || (edit.language !== 'all' && edit.language !== language)) continue;
            let matches;
            try { matches = document.querySelectorAll(edit.selector); }
            catch { report.skipped.push({ id: edit.id, reason: 'Seletor inválido.' }); continue; }
            const element = matches[0];
            if (matches.length !== 1 || !fingerprintMatches(element, edit.fingerprint)) {
                report.skipped.push({ id: edit.id, reason: matches.length === 0 ? 'Elemento ausente nesta página.' : 'A referência mudou ou não é única; revise a seleção.' }); continue;
            }
            const description = describeTarget(element);
            if (edit.texts.some(item => element.childNodes[item.index]?.nodeType !== 3 || element.childNodes[item.index].nodeValue !== item.before)) {
                report.skipped.push({ id: edit.id, reason: 'O trecho original mudou; revise o texto.' }); continue;
            }
            baselines.set(element, description);
            prepared.push({ edit, element });
        }
        // Match all references before any write so nested selections remain independent.
        for (const { edit, element } of prepared) {
            const styles = Object.entries(edit.styles);
            // Rarity gradients use a transparent text fill, which otherwise hides
            // a chosen text color even when the color declaration is important.
            if (Object.hasOwn(edit.styles, 'color')) styles.push(['-webkit-text-fill-color', edit.styles.color]);
            for (const [key, value] of styles) {
                const before = element.style.getPropertyValue(key), priority = element.style.getPropertyPriority(key);
                element.style.setProperty(key, value, 'important');
                const applied = element.style.getPropertyValue(key);
                undo.push(() => { if (element.style.getPropertyValue(key) === applied) { if (before) element.style.setProperty(key, before, priority); else element.style.removeProperty(key); } });
            }
            for (const item of edit.texts) {
                const node = element.childNodes[item.index], before = node.nodeValue;
                if (!originalTexts.has(node)) originalTexts.set(node, before);
                node.nodeValue = item.after;
                undo.push(() => { if (node.nodeValue === item.after) node.nodeValue = before; });
            }
            if (edit.media) {
                if (edit.media.position === 'replace') {
                    rememberAttribute(element, 'src', mediaSource(edit.media.src));
                    rememberAttribute(element, element.tagName === 'IMG' ? 'alt' : 'aria-label', edit.media.alt);
                    rememberAttribute(element, 'width', edit.media.width); rememberAttribute(element, 'height', edit.media.height);
                    if (element.tagName === 'IMG' && element.hasAttribute('srcset')) rememberAttribute(element, 'srcset', '');
                } else {
                    const node = makeMedia(edit.media);
                    element[edit.media.position](node);
                    undo.push(() => node.remove());
                }
            }
            report.applied.push(edit.id);
        }
        observe();
        onReport(report);
        return report;
    }
    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    window.addEventListener('languageChanged', schedule);
    observe();
    return {
        apply(next) { validateConfig(next); config = structuredClone(next); return reconcile(); },
        describe(element) {
            const description = structuredClone(baselines.get(element) || describeTarget(element));
            // An unedited ancestor may contain children already changed by other edits.
            // Reconstruct its original reference without removing the visible preview.
            function originalContent(node) {
                if (!node) return '';
                if (node.nodeType === 3) return originalTexts.has(node) ? originalTexts.get(node) : node.nodeValue;
                if (node.nodeType !== 1 || node.matches('[data-palace-inserted],[data-palace-editor-ui]')) return '';
                return [...node.childNodes].map(originalContent).join('');
            }
            description.fingerprint.text = normalizedText(originalContent(element));
            if (originalSources.has(element)) description.fingerprint.src = originalSources.get(element);
            const context = variantContext(element, originalContent);
            if (context !== undefined) description.fingerprint.context = context;
            description.texts = [...element.childNodes].flatMap((node, index) => node.nodeType === 3
                ? [{ index, before: originalTexts.has(node) ? originalTexts.get(node) : node.nodeValue, after: node.nodeValue }] : []);
            return description;
        },
        destroy() {
            stopped = true; observer.disconnect(); undo.reverse().forEach(restore => restore()); undo = [];
            styleElement.remove();
            window.removeEventListener('hashchange', schedule); window.removeEventListener('popstate', schedule); window.removeEventListener('languageChanged', schedule);
        }
    };
}
