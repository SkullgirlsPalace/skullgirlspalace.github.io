import { describe, expect, it } from 'vitest';
import { renderCharacterOverviewContent, renderPlainParagraphs } from '../../../src/utils/characterOverview.js';

describe('shared static and interactive overview content', () => {
    it('escapes source text and retains literal dollar signs', () => {
        const html = renderCharacterOverviewContent({ name: 'Test $&', groups: [{ label: 'Gold', variants: [{
            name: '<Var> & $1', element: 'Fire', stats: { attack: 1, health: 2, power: 3 },
            signature_ability: { name: '<Ability>', description: 'Costs $&\n<script>alert(1)</script>' }
        }] }] });
        expect(html).toContain('Test $&amp; tem 1 variantes');
        expect(html).toContain('&lt;Var&gt; &amp; $1');
        expect(html).not.toContain('<script>');
        expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    });

    it('handles editorial arrays, literal newlines and formatting without rewriting data', () => {
        const text = ['[HAB 1]: Gain **ENRAGE**.', 'Second line\\nThird line'];
        const before = [...text];
        expect(renderPlainParagraphs(text)).toBe('<p>Gain ENRAGE.</p><p>Second line</p><p>Third line</p>');
        expect(text).toEqual(before);
    });
});
