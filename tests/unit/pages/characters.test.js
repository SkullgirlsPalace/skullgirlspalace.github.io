import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('../../../src/components/CharacterCard.js', () => ({
    renderCharacterGrid: vi.fn()
}));

vi.mock('../../../src/services/dataService.js', () => ({
    getCharacters: vi.fn(() => [{ key: 'filia', name: 'Filia' }])
}));

import { render, init } from '../../../src/pages/characters.js';

describe('characters.js', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('render', () => {
        it('should return HTML string', () => {
            const html = render();
            expect(html).toContain('section');
            expect(html).toContain('character-selection');
            expect(html).toContain('Escolha um Personagem');
        });

        it('should include character grid', () => {
            const html = render();
            expect(html).toContain('characterGrid');
        });

        it('should include back button', () => {
            const html = render();
            expect(html).toContain('btn-back');
            expect(html).toContain('navigateTo');
        });

    });

    describe('init', () => {
        it('should call getCharacters', async () => {
            const { getCharacters } = await import('../../../src/services/dataService.js');
            init();
            expect(getCharacters).toHaveBeenCalled();
        });

        it('should call renderCharacterGrid with characters', async () => {
            const { renderCharacterGrid } = await import('../../../src/components/CharacterCard.js');
            init();
            expect(renderCharacterGrid).toHaveBeenCalledWith(
                'characterGrid',
                [{ key: 'filia', name: 'Filia' }],
                'openCharacterDetails'
            );
        });

        it('should not render grid if no characters', async () => {
            const { getCharacters } = await import('../../../src/services/dataService.js');
            getCharacters.mockReturnValueOnce(null);

            const { renderCharacterGrid } = await import('../../../src/components/CharacterCard.js');
            renderCharacterGrid.mockClear();

            init();
            expect(renderCharacterGrid).not.toHaveBeenCalled();
        });
    });
});
