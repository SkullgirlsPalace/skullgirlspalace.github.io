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

describe('catalysts.js', () => {
    let container;

    beforeEach(() => {
        vi.clearAllMocks();

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

        it('should include COTW section', () => {
            const html = render();
            expect(html).toContain('cotw-section');
            expect(html).toContain('Modificadores da Semana');
        });

        it('should include element filter buttons', () => {
            const html = render();
            expect(html).toContain('cotw-filter-btn');
            expect(html).toContain('data-element="fire"');
            expect(html).toContain('data-element="water"');
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

        it('should attach COTW filter button listeners', async () => {
            const { loadCatalysts } = await import('../../../src/services/dataService.js');
            loadCatalysts.mockResolvedValueOnce({
                categories: []
            });

            // Add filter buttons to DOM
            document.body.innerHTML += `
                <button class="cotw-filter-btn" data-element="fire">Fire</button>
                <button class="cotw-filter-btn" data-element="water">Water</button>
            `;

            await init();

            const buttons = document.querySelectorAll('.cotw-filter-btn');
            expect(buttons.length).toBe(2);
        });
    });
});
