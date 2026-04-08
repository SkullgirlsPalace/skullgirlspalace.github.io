import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('../../../src/data/effectData.js', () => ({
    EFFECT_DATA: {
        buffs: { regen: { name: 'Regen', description: 'Regenerates HP', type: 'buff' } },
        debuffs: { bleed: { name: 'Bleed', description: 'DoT damage', type: 'debuff' } }
    }
}));

vi.mock('../../../src/data/attributeData.js', () => ({
    ATTRIBUTE_DATA: [
        { key: 'hp', name: 'HP', description: 'Health points' }
    ]
}));

vi.mock('../../../src/components/ExportModifierData.js', () => ({
    renderModifierExportModal: vi.fn(() => '<div class="export-modal">Export Modal</div>'),
    initModifierExportModal: vi.fn()
}));

vi.mock('../../../src/services/dataService.js', () => ({
    loadCatalysts: vi.fn(),
    loadFendaData: vi.fn()
}));

vi.mock('../../../src/utils/formatters.js', () => ({
    formatConstraint: vi.fn((c) => c || '')
}));

import { render, init } from '../../../src/pages/guide.js';

describe('guide.js', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Setup DOM with all necessary containers
        document.body.innerHTML = `
            <div id="tab-tutorials"></div>
            <div id="tab-statistics"></div>
            <div id="tab-modifiers"></div>
            <div id="tab-catalysts"></div>
            <div id="buffs-list"></div>
            <div id="debuffs-list"></div>
            <div id="special-list"></div>
        `;
    });

    describe('render', () => {
        it('should return HTML string', () => {
            const html = render();
            expect(html).toContain('guide-container');
        });

        it('should include tab buttons', () => {
            const html = render();
            expect(html).toContain('guide-tab-btn');
            expect(html).toContain('tutorials');
            expect(html).toContain('statistics');
            expect(html).toContain('modifiers');
            expect(html).toContain('catalysts');
        });

        it('should include tutorials content', () => {
            const html = render();
            expect(html).toContain('tab-tutorials');
            expect(html).toContain('Renda Passiva');
        });

        it('should include statistics tab', () => {
            const html = render();
            expect(html).toContain('tab-statistics');
            expect(html).toContain('Estatísticas');
        });

        it('should include modifiers tab', () => {
            const html = render();
            expect(html).toContain('tab-modifiers');
            expect(html).toContain('Efeitos Positivos');
        });

        it('should include catalysts tab', () => {
            const html = render();
            expect(html).toContain('tab-catalysts');
        });

        it('should include export modal', () => {
            const html = render();
            expect(html).toContain('Export Modal');
        });

        it('should include switchGuideTab function calls', () => {
            const html = render();
            expect(html).toContain('switchGuideTab');
        });
    });

    describe('init', () => {
        it('should call initModifierExportModal', async () => {
            const { initModifierExportModal } = await import('../../../src/components/ExportModifierData.js');

            init();

            expect(initModifierExportModal).toHaveBeenCalled();
        });

        it('should register global functions', () => {
            init();

            expect(window.switchGuideTab).toBeDefined();
            expect(window.toggleStatsImage).toBeDefined();
        });

        it('should execute without error', () => {
            expect(() => init()).not.toThrow();
        });
    });
});
