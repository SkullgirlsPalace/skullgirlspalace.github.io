/** The editor is an interface for loopback HTTP servers, never a hosted admin. */
export function isLocalEditorURL(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) && ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);
    } catch { return false; }
}

export function showLocalOnlyMessage(container) {
    container.textContent = 'Este editor funciona apenas no computador local. Abra pelo Abrir-Editor.cmd. / This editor is local only. Start it with Abrir-Editor.cmd.';
    container.className = 'boot';
}
