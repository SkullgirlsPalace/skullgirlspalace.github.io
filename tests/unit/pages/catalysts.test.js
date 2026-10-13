import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dataService
vi.mock('../../../src/services/dataService.js', () => ({
    loadCatalysts: vi.fn()
}));

// Mock store
vi.mock('../../../src/state/store.js', () => ({
    getState: vi.fn(() => ({ userPreferences: {} })),
    updateCatalystNote: vi.fn()
}));

import { render, init } from '../../../src/pages/catalysts.js';
import { loadCatalysts } from '../../../src/services/dataService.js';

describe('catalysts.js', () => {
    let container;

    beforeEach(() => {
        vi.clearAllMocks();
        loadCatalysts.mockReset();

        // Setup DOM
        document.body.innerHTML = `
            <div id="catalyst-container"><div class="loading-state">Loading...</div></div>
            <div id="cotw-container"><p>Select an element</p></div>
        `;
        container = document.getElementById('catalyst-container');
    });

    describe('render', () => {
        it('should return HTML string', () => {
            const html = render();
            expect(html).toContain('section');
            expect(html).toContain('catalysts-section');
        });

        it('should include page title', () => {
            const html = render();
            expect(html).toContain('Catalisadores');
        });

        it('should include back button', () => {
            const html = render();
            expect(html).toContain('btn-back');
            expect(html).toContain('navigateTo');
        });

        it('should include catalyst grid container', () => {
            const html = render();
            expect(html).toContain('catalyst-container');
        });

        it('keeps the standalone catalog separate from weekly rotations', () => {
            const html = render();
            expect(html).toContain('catalyst-categories');
            expect(html).not.toContain('cotw-section');
        });

        it('shows the catalog loading state until its data is ready', () => {
            const html = render();
            expect(html).toContain('loading-state');
            expect(html).toContain('Carregando catalisadores');
        });

        it('should include intro text', () => {
            const html = render();
            expect(html).toContain('catalysts-intro');
            expect(html).toContain('Fenda');
        });
    });

    describe('init', () => {
        it('should call loadCatalysts', async () => {
            const { loadCatalysts } = await import('../../../src/services/dataService.js');
            loadCatalysts.mockResolvedValueOnce({
                categories: [{ category: 'Forte', items: [] }]
            });

            await init();
            expect(loadCatalysts).toHaveBeenCalled();
        });

        it('should render categories when data loads', async () => {
            const { loadCatalysts } = await import('../../../src/services/dataService.js');
            loadCatalysts.mockResolvedValueOnce({
                categories: [
                    { category: 'Forte contra', items: [{ name: 'Test Catalyst', description: 'Test desc' }] }
                ]
            });

            await init();
            expect(container.innerHTML).toContain('Forte contra');
        });

        it('should show error when data fails to load', async () => {
            const { loadCatalysts } = await import('../../../src/services/dataService.js');
            loadCatalysts.mockResolvedValueOnce(null);

            await init();
            expect(container.innerHTML).toContain('error-state');
        });

        it('should show error when categories missing', async () => {
            const { loadCatalysts } = await import('../../../src/services/dataService.js');
            loadCatalysts.mockResolvedValueOnce({});

            await init();
            expect(container.innerHTML).toContain('error-state');
        });

        it('should not crash if container missing', async () => {
            document.body.innerHTML = '';
            const { loadCatalysts } = await import('../../../src/services/dataService.js');
            loadCatalysts.mockResolvedValueOnce({ categories: [] });

            // Should not throw
            await init();
        });

        it('persists a player note when a catalog note input changes', async () => {
            const { loadCatalysts } = await import('../../../src/services/dataService.js');
            loadCatalysts.mockResolvedValueOnce({
                categories: [{ category: 'Forte', items: [{ name: 'Test Catalyst', description: 'Test description' }] }]
            });

            await init();
            const input = document.querySelector('.catalyst-note-input');
            input.value = 'My note';
            input.dispatchEvent(new Event('change', { bubbles: true }));
            const { updateCatalystNote } = await import('../../../src/state/store.js');
            expect(updateCatalystNote).toHaveBeenCalledWith('Test Catalyst', 'My note');
        });
    });
});
