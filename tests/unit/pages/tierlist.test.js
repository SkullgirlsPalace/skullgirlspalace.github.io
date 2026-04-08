import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('../../../src/components/CharacterCard.js', () => ({
    renderCharacterGrid: vi.fn()
}));

vi.mock('../../../src/services/dataService.js', () => ({
    getCharacters: vi.fn(() => [{ key: 'filia', name: 'Filia' }])
}));

import { render, init } from '../../../src/pages/tierlist.js';

describe('tierlist.js', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('render', () => {
        it('should return HTML string', () => {
            const html = render();
            expect(html).toContain('section');
            expect(html).toContain('tierlist-section');
        });

        it('should include tier list title', () => {
            const html = render();
            expect(html).toContain('Tier List');
        });

        it('should include back button', () => {
            const html = render();
            expect(html).toContain('btn-back');
            expect(html).toContain('navigateTo');
        });

        it('should include tierlist grid', () => {
            const html = render();
            expect(html).toContain('tierlistGrid');
        });

        it('should include intro text', () => {
            const html = render();
            expect(html).toContain('tierlist-intro');
            expect(html).toContain('Escolha um personagem');
        });
    });

    describe('init', () => {
        it('should call getCharacters', async () => {
            const { getCharacters } = await import('../../../src/services/dataService.js');
            init();
            expect(getCharacters).toHaveBeenCalled();
        });

        it('should call renderCharacterGrid for tier list', async () => {
            const { renderCharacterGrid } = await import('../../../src/components/CharacterCard.js');
            init();
            expect(renderCharacterGrid).toHaveBeenCalledWith(
                'tierlistGrid',
                [{ key: 'filia', name: 'Filia' }],
                'openCharacterTier'
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
