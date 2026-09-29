import { describe, expect, it } from 'vitest';
import { characterPath, parseSeoPath } from '../../src/utils/seoRoutes.js';

describe('clean character entry paths', () => {
    it('maps character, builds, and tier-list paths to existing SPA states', () => {
        expect(parseSeoPath('/characters/annie/')).toEqual({
            route: 'character', params: ['annie', 'builds'], section: 'character'
        });
        expect(parseSeoPath('/characters/annie/builds/')).toEqual({
            route: 'character', params: ['annie', 'builds'], section: 'builds'
        });
        expect(parseSeoPath('/characters/annie/tier-list/')).toEqual({
            route: 'character', params: ['annie', 'tier'], section: 'tier-list'
        });
    });

    it('normalizes a direct index.html URL and repeated slashes', () => {
        expect(parseSeoPath('/characters/annie/index.html')).toEqual({
            route: 'character', params: ['annie', 'builds'], section: 'character'
        });
        expect(parseSeoPath('//characters//annie//tier-list//')).toEqual({
            route: 'character', params: ['annie', 'tier'], section: 'tier-list'
        });
    });

    it('maps the characters entry to the existing all-variants view', () => {
        expect(parseSeoPath('/characters/')).toEqual({
            route: 'character', params: ['todos', 'builds'], section: 'all-variants'
        });
    });

    it('builds section paths without creating variant-level URLs', () => {
        expect(characterPath('annie')).toBe('/characters/annie/');
        expect(characterPath('annie', 'builds')).toBe('/characters/annie/builds/');
        expect(characterPath('annie', 'tier')).toBe('/characters/annie/tier-list/');
        expect(parseSeoPath('/variants/annie/rosa-estelar/')).toBeNull();
    });
});
