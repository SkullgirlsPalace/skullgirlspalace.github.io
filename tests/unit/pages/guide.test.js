import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('../../../src/data/effectData.js', () => ({
    EFFECT_DATA: {
        permanent_modifier: { name: 'Permanent Effect', type: 'term', color: '#b0bec5', icon: 'img/modifiers/permanent/Permanent.webp', stacks: 5, detailed: 'Cannot be removed.', explicacao: 'Cannot be removed.' },
        regen: { name: 'Regen', type: 'buff', color: '#44cc66', icon: 'img/modifiers/buffs/Regen.webp', stacks: 5, detailed: 'Regenerates HP.' },
        bleed: { name: 'Bleed', type: 'debuff', color: '#ff4444', icon: 'img/modifiers/debuffs/Bleed.webp', stacks: 5, detailed: 'DoT damage.' }
    },
    getLocalizedEffect: vi.fn(() => null),
    getEffectPatterns: vi.fn(() => [])
}));

vi.mock('../../../src/data/attributeData.js', () => ({
    ATTRIBUTE_DATA: {
        hp: { keys: ['HP'], name: 'HP', name_en: 'HP', summary: 'Health points', summary_en: 'Health points', detailed: 'Your health.', detailed_en: 'Your health.' }
    },
    getLocalizedAttribute: vi.fn(() => null),
    getAttributePatterns: vi.fn(() => [])
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
            // Content is i18n-driven (passiveIncomeTitle key)
            expect(html).toContain('tutorial-renda-passiva');
        });

        it('should include statistics tab', () => {
            const html = render();
            expect(html).toContain('tab-statistics');
        });

        it('should include modifiers tab', () => {
            const html = render();
            expect(html).toContain('tab-modifiers');
        });

        it('should include catalysts tab', () => {
            const html = render();
            expect(html).toContain('tab-catalysts');
        });

        it('should include switchGuideTab function calls', () => {
            const html = render();
            expect(html).toContain('switchGuideTab');
        });
    });

    describe('init', () => {
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
