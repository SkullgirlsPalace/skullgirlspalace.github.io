import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CHARACTER_FILES } from '../../../src/config/constants.js';

const characters = Object.fromEntries(CHARACTER_FILES.map(file => [file, JSON.parse(fs.readFileSync(path.resolve('data', file), 'utf8'))]));
const variant = (file, name) => Object.values(characters[file].variants).flat().find(item => item.name === name);

describe('published editorial abilities at maximum level', () => {
    it.each(CHARACTER_FILES)('keeps rank progressions out of %s editorial descriptions', file => {
        for (const item of Object.values(characters[file].variants).flat()) {
            for (const ability of [item.signature_ability, item.signature_ability?.english].filter(Boolean)) {
                const text = String(ability.description ?? '');
                expect(text, `${file}: ${item.name}`).not.toMatch(/\d+(?:[.,]\d+)?%?\s*\/\s*\d+(?:[.,]\d+)?%?\s*\/\s*\d/);
            }
        }
    });

    it('retains the approved decreasing thresholds, durations, costs and penalties', () => {
        expect(variant('annie.json', 'Modelo Submarina').signature_ability.description).toContain('cada 15% de vida perdida');
        expect(variant('big-band.json', 'Virtuoso Vintage').signature_ability.description).toContain('a cada 5 golpes de combo');
        expect(variant('double.json', 'Criatura de Hábito').signature_ability.description).toContain('a cada 3 segundos');
        expect(variant('annie.json', 'Princesa da Lua').signature_ability.description).toContain('REVIVEM com 40% menos VIDA');
        expect(variant('fukua.json', 'Verdadeiro Eu').signature_ability.description).toContain('gastam 5 acúmulos de CHUTE SOMBRIO');
        expect(variant('fukua.json', 'Terror Noturno').signature_ability.description).toContain('por 10 s a cada 2 s');
    });

    it('retains decimal durations and fixed values alongside final improvements', () => {
        const deathWish = variant('annie.json', 'Desafiante da Morte').signature_ability.description;
        expect(deathWish).toContain('por 2.5 segundos');
        expect(deathWish).toContain('15% da VIDA MÁXIMA por EFEITO POSITIVO consumido');
        const soul = variant('annie.json', 'Vínculo de Alma').signature_ability.description;
        expect(soul).toContain('concedem 50% do medidor de PODER ESTELAR, 3 acúmulo(s) de BARREIRA');
        expect(soul).toContain('por 3 segundos');
        expect(soul).toContain('sacrifique 35% da VIDA MÁXIMA');
        expect(soul).toContain('ganhar OLHO-MORTO por 15 segundos');
        expect(soul).toContain('perdem 3% de VIDA por segundo');
    });

    it('uses the full Portuguese Heavy Regen name for the confirmed abbreviation cases', () => {
        expect(variant('eliza.json', 'Lazulita').signature_ability.description).toContain('REGENERAÇÃO FORTE');
        expect(variant('valentine.json', 'Turno Mortal').signature_ability.description).toContain('REGENERAÇÃO FORTE');
    });
});
