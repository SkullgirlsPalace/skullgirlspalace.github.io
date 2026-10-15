import { isLocalEditorURL, showLocalOnlyMessage } from './local-only.js';

if (isLocalEditorURL(window.location.href)) {
    await import('./editor.js');
} else {
    showLocalOnlyMessage(document.querySelector('#editor'));
}
