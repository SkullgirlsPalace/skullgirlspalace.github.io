import { beforeEach, describe, expect, it, vi } from 'vitest';

const data = vi.hoisted(() => ({
    loadAllCharacters: vi.fn(), loadCharacter: vi.fn(), loadExtrasData: vi.fn(), loadTierData: vi.fn()
}));
const i18n = vi.hoisted(() => ({ preloadKrazeteData: vi.fn(), getCurrentLanguage: vi.fn() }));

vi.mock('../../../src/services/dataService.js', () => data);
vi.mock('../../../src/i18n/dataTranslations.js', () => i18n);
vi.mock('../../../src/i18n/translations.js', () => ({ getCurrentLanguage: i18n.getCurrentLanguage }));

import { prepareRouteData } from '../../../src/services/routeData.js';

describe('prepareRouteData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        i18n.getCurrentLanguage.mockReturnValue('pt-BR');
    });

    it('does not load data for the home page', async () => {
        await prepareRouteData('', []);
        expect(data.loadCharacter).not.toHaveBeenCalled();
        expect(data.loadAllCharacters).not.toHaveBeenCalled();
        expect(data.loadTierData).not.toHaveBeenCalled();
        expect(data.loadExtrasData).not.toHaveBeenCalled();
        expect(i18n.preloadKrazeteData).not.toHaveBeenCalled();
    });

    it('loads one character for the PT-BR overview page', async () => {
        await prepareRouteData('character', ['annie', 'overview']);
        expect(data.loadCharacter).toHaveBeenCalledWith('annie');
        expect(data.loadAllCharacters).not.toHaveBeenCalled();
        expect(data.loadTierData).not.toHaveBeenCalled();
        expect(data.loadExtrasData).not.toHaveBeenCalled();
        expect(i18n.preloadKrazeteData).not.toHaveBeenCalled();
    });

    it('loads English name data with an English character overview', async () => {
        i18n.getCurrentLanguage.mockReturnValue('en');
        await prepareRouteData('character', ['annie', 'overview']);
        expect(data.loadCharacter).toHaveBeenCalledWith('annie');
        expect(i18n.preloadKrazeteData).toHaveBeenCalledOnce();
    });

    it('keeps the full catalog and team recommendation data ready on builds routes', async () => {
        await prepareRouteData('character', ['annie', 'builds']);
        expect(data.loadAllCharacters).toHaveBeenCalledOnce();
        expect(data.loadTierData).toHaveBeenCalledOnce();
        expect(data.loadExtrasData).toHaveBeenCalledOnce();
        expect(i18n.preloadKrazeteData).toHaveBeenCalledOnce();
    });

    it('loads the catalog required by the tier list without unrelated extras', async () => {
        await prepareRouteData('tierlist');
        expect(data.loadAllCharacters).toHaveBeenCalledOnce();
        expect(data.loadTierData).not.toHaveBeenCalled();
        expect(data.loadExtrasData).not.toHaveBeenCalled();
        expect(i18n.preloadKrazeteData).not.toHaveBeenCalled();
    });
});
