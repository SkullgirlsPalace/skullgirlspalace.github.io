const STORAGE_KEY = 'palace-editor-theme';
const choices = ['dark', 'light', 'system'];

/** Changes presentation only; draft storage and wiki preferences are independent. */
export function initEditorTheme() {
    const root = document.documentElement;
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    let preference = 'dark';
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (choices.includes(saved)) preference = saved;
    } catch { /* The theme still works when browser storage is unavailable. */ }

    function apply() {
        root.dataset.themePreference = preference;
        root.dataset.theme = preference === 'system' ? (media?.matches ? 'dark' : 'light') : preference;
    }
    const followSystem = () => { if (preference === 'system') apply(); };
    media?.addEventListener('change', followSystem);
    apply();

    return {
        getPreference: () => preference,
        setPreference(value) {
            if (!choices.includes(value)) return;
            preference = value;
            apply();
            try { localStorage.setItem(STORAGE_KEY, preference); } catch { /* Keep the selected theme for this session. */ }
        },
        destroy() { media?.removeEventListener('change', followSystem); }
    };
}
