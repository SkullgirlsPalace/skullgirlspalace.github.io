// Keep profile biographies and modal markup out of the initial module graph.
import { t } from '../i18n/index.js';

const loadProfile = () => import('../pages/character-profile.js');

window.openProfileModal = async function (character) {
    const host = document.getElementById('profile-modal-host');
    if (!host || host.dataset.character !== character) return;
    const request = {};
    host._profileRequest = request;
    try {
        const profile = await loadProfile();
        if (!host.isConnected || host._profileRequest !== request) return;
        host.innerHTML = profile.renderProfileModal(character);
        profile.openProfileModal(character);
    } catch (error) {
        if (host.isConnected && host._profileRequest === request) host.textContent = t('error.pageLoad');
        console.error('Could not open character profile:', error);
    }
};

for (const action of [
    'showMarqueeDisclaimer', 'showCritlessDisclaimer', 'showCatalystDisclaimer',
    'closeProfileModal', 'handleProfileOverlayClick', 'switchProfileModalTab',
    'toggleProfileBio', 'toggleProfileAbilities', 'toggleMoveDetail'
]) {
    window[action] = async (...args) => (await loadProfile())[action](...args);
}
