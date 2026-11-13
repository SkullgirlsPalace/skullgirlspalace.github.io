// Independent of main.js: never delays the SPA boot or its first rendering.
const localPreview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) && new URLSearchParams(location.search).has('palace-preview');
if (!localPreview) {
    const load = () => {
        const start = async () => {
            try {
                const response = await fetch('/data/site-customizations.json');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const config = await response.json();
                if (!Object.keys(config.theme || {}).length && !Object.keys(config.typography || {}).length && !config.edits?.length) return;
                const { createCustomizationRuntime, validateConfig } = await import('./utils/siteCustomizations.js');
                validateConfig(config);
                createCustomizationRuntime(document).apply(config);
            } catch (error) { console.warn('Não foi possível carregar os ajustes visuais do Palace.', error); }
        };
        if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 2000 });
        else window.setTimeout(start, 0);
    };
    if (document.readyState === 'complete') load();
    else window.addEventListener('load', load, { once: true });
}
