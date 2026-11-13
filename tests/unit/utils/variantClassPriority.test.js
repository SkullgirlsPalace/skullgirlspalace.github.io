import { describe, expect, it } from 'vitest';
import { filterVariants, sortVariants } from '../../../src/utils/sorting.js';

const variants = ['Rosinha', 'Resguardada'].map(name => ({ name, rarityKey: 'ouro' }));

describe('class priority without changing filter membership or ranks', () => {
    it('filters by secondary classes as well as primary classes', () => {
        expect(filterVariants(variants, { variantClass: ['Defensivo'] }).map(item => item.name)).toEqual(['Rosinha']);
        expect(filterVariants(variants, { variantClass: ['Suporte de Utilidade'] }).map(item => item.name)).toEqual(['Rosinha', 'Resguardada']);
    });
    it('sorts by primary class even when the secondary has higher global priority', () => {
        expect(sortVariants(variants, { type: 'class', direction: 'asc' }).map(item => item.name)).toEqual(['Resguardada', 'Rosinha']);
        expect(sortVariants(variants, { type: 'class', direction: 'desc' }).map(item => item.name)).toEqual(['Rosinha', 'Resguardada']);
    });
});
