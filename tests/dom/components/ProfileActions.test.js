import { beforeEach, describe, expect, it, vi } from 'vitest';

const profile = vi.hoisted(() => ({
    renderProfileModal: vi.fn(() => '<section class="profile-modal"></section>'),
    openProfileModal: vi.fn(),
    showMarqueeDisclaimer: vi.fn(),
    showCritlessDisclaimer: vi.fn(),
    showCatalystDisclaimer: vi.fn()
}));

vi.mock('../../../src/pages/character-profile.js', () => profile);
import '../../../src/components/ProfileActions.js';

describe('lazy character profile actions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '<div id="profile-modal-host" data-character="filia"></div>';
    });

    it('renders and opens the selected character profile on demand', async () => {
        await window.openProfileModal('filia');
        expect(profile.renderProfileModal).toHaveBeenCalledWith('filia');
        expect(profile.openProfileModal).toHaveBeenCalledWith('filia');
        expect(document.querySelector('#profile-modal-host .profile-modal')).not.toBeNull();
    });

    it('does not render a stale character profile into the wrong host', async () => {
        await window.openProfileModal('annie');
        expect(profile.renderProfileModal).not.toHaveBeenCalled();
    });

    it('keeps marquee, critless, and catalyst disclaimers reachable through global handlers', async () => {
        await window.showMarqueeDisclaimer('filia', 'Flecha Eterna');
        await window.showCritlessDisclaimer();
        await window.showCatalystDisclaimer('Escudo Elemental');
        expect(profile.showMarqueeDisclaimer).toHaveBeenCalledWith('filia', 'Flecha Eterna');
        expect(profile.showCritlessDisclaimer).toHaveBeenCalledOnce();
        expect(profile.showCatalystDisclaimer).toHaveBeenCalledWith('Escudo Elemental');
    });
});
