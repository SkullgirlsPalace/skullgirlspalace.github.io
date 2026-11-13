import { loadAllCharacters, loadCharacter, loadExtrasData, loadTierData } from './dataService.js';
import { preloadKrazeteData } from '../i18n/dataTranslations.js';
import { getCurrentLanguage } from '../i18n/translations.js';

/** Load only the data used by this route, before its synchronous render. */
export async function prepareRouteData(route, params = []) {
    if (route === 'character') {
        const [character, tab = 'builds'] = params;
        if (character !== 'todos' && tab === 'overview') {
            await Promise.all([
                loadCharacter(character),
                getCurrentLanguage() === 'en' ? preloadKrazeteData() : Promise.resolve()
            ]);
        } else {
            // Global search and team recommendations reference the whole catalog.
            await Promise.all([loadAllCharacters(), loadTierData(), loadExtrasData(), preloadKrazeteData()]);
        }
    } else if (route === 'tierlist') {
        await Promise.all([loadAllCharacters(), getCurrentLanguage() === 'en' ? preloadKrazeteData() : Promise.resolve()]);
    }
}
