import { describe, expect, it } from 'vitest';
import { stripAbilityLabels, splitSignatureAbility, joinSignatureAbility, localizePortugueseAbility, normalizeAbilityProgressions } from '../../../src/utils/abilityText.js';

describe('shared ability text', () => {
    it('hides legacy labels, preserving separate paragraphs and emphasis', () => {
        expect(stripAbilityLabels(['[hab1]: **Primeira.**', '[ SA 2 ] : Segunda.']))
            .toBe('**Primeira.**\nSegunda.');
        expect(stripAbilityLabels('HAB 1: Primeira.\\n\\nSA2: Segunda.')).toBe('Primeira.\n\nSegunda.');
        expect(stripAbilityLabels('[HAB 1]:**Texto**')).toBe('**Texto**');
        expect(stripAbilityLabels('**[HAB 1]:** Texto')).toBe('Texto');
    });

    it('round trips legacy and new descriptions through separate fields without losing paragraphs', () => {
        const parts = { SA1: '**Primeira.**\n\nOutro parágrafo.', SA2: 'Segunda.' };
        expect(splitSignatureAbility('[HAB 1]: Primeira.\n\n[HAB 2]: Segunda.'))
            .toEqual({ SA1: 'Primeira.', SA2: 'Segunda.' });
        expect(splitSignatureAbility(joinSignatureAbility(parts))).toEqual(parts);
        expect(splitSignatureAbility(joinSignatureAbility({ SA1: '', SA2: 'Segunda.' })))
            .toEqual({ SA1: '', SA2: 'Segunda.' });
        expect(splitSignatureAbility('Parte única.')).toEqual({ SA1: 'Parte única.', SA2: '' });
        expect(splitSignatureAbility('Primeira.\n\nSegunda.')).toEqual({ SA1: 'Primeira.', SA2: 'Segunda.' });
    });

    it.each([
        ['5/10/15 segundos', '15 segundos'], ['15/10/5 golpes', '5 golpes'],
        ['80/60/40% menos VIDA', '40% menos VIDA'], ['1.5/2/2.5 segundos', '2.5 segundos'],
        ['1/1,5/2% de VIDA', '2% de VIDA'], ['10% / 20% / 30%', '30%'],
        ['1/2/3 acúmulos', '3 acúmulos'], ['4/3/2 s', '2 s'],
        ['5/7/10 seconds; 3/2/1 second(s)', '10 seconds; 1 second(s)'],
        ['5 segundos/10 segundos/15 segundos', '15 segundos'],
        ['1/2 de VIDA; ataque/defesa; 15 segundos', '1/2 de VIDA; ataque/defesa; 15 segundos']
    ])('shows the last rank of %s as %s', (raw, final) => {
        expect(normalizeAbilityProgressions(raw)).toBe(final);
    });

    it('translates only known PT-BR terms without partial words or overlapping effects', () => {
        const raw = 'HEX, DEADEYE, HEAVY BLEED, BLEED, ARMOR BREAK, ARMOR, BUFFS e DEBUFFS. hexagonal; QUIETUS; SEKHMET; BLOCKBUSTER.';
        expect(localizePortugueseAbility(raw)).toBe('FEITIÇO, OLHO-MORTO, SANGRAMENTO FORTE, SANGRAMENTO, QUEBRA DE ARMADURA, ARMADURA, EFEITOS POSITIVOS e EFEITOS NEGATIVOS. hexagonal; QUIETUS; SEKHMET; BLOCKBUSTER.');
        expect(localizePortugueseAbility('Ganhe hex e Deadeye por 5/10/15 segundos.'))
            .toBe('Ganhe feitiço e Olho-morto por 5/10/15 segundos.');
        expect(localizePortugueseAbility('REGEN. FORTE; DASH ATTACK; DASH; TAG-OUT.'))
            .toBe('REGENERAÇÃO FORTE; ATAQUE EM DISPARADA; DISPARADA; TAG-OUT.');
        expect(localizePortugueseAbility('Ao fazer TAG-IN; desativa TAG-INs.'))
            .toBe('Ao ENTRAR NA ASSISTÊNCIA; desativa ASSISTÊNCIAS.');
        expect(localizePortugueseAbility(localizePortugueseAbility(raw))).toBe(localizePortugueseAbility(raw));
    });

    it.each(['REGEN. FORTE', 'REGEN FORTE', 'REGEN.FORTE', 'REGEN.  FORTE', 'REGEN\tFORTE'])('recognizes the Portuguese abbreviation %s as Heavy Regen', abbreviation => {
        expect(localizePortugueseAbility(`Ganhe ${abbreviation} por 15 segundos.`)).toBe('Ganhe REGENERAÇÃO FORTE por 15 segundos.');
    });

    it('preserves other editorial Portuguese abbreviations and unknown compound terms', () => {
        expect(localizePortugueseAbility('BLOQ. DE CURA; QUEBRA DE ARM.; EF. POS.; EF. NEG.'))
            .toBe('BLOQ. DE CURA; QUEBRA DE ARM.; EF. POS.; EF. NEG.');
        expect(localizePortugueseAbility('REGENFORTE; TERMO DESCONHECIDO')).toBe('REGENFORTE; TERMO DESCONHECIDO');
    });
});
