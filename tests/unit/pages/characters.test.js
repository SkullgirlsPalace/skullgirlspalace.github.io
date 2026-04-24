import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('../../../src/components/CharacterCard.js', () => ({
    renderCharacterGrid: vi.fn()
}));

vi.mock('../../../src/services/dataService.js', () => ({
    getCharacters: vi.fn(() => [{ key: 'filia', name: 'Filia' }])
}));

vi.mock('../../../src/components/ExportCharacterData.js', () => ({
    renderExportModal: vi.fn(() => '<div class="export-modal">Export Modal</div>'),
    initExportModal: vi.fn()
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

        it('should include export modal', () => {
            const html = render();
            expect(html).toContain('Export Modal');
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

        it('should include export button', () => {
            const html = render();
            expect(html).toContain('export-trigger-btn');
            expect(html).toContain('toggleExportModal');
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

        it('should call initExportModal', async () => {
            const { initExportModal } = await import('../../../src/components/ExportCharacterData.js');
            init();
            expect(initExportModal).toHaveBeenCalled();
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
