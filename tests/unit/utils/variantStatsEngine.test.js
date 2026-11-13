import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  calculateBaseFighterScore,
  calculateLevelStat,
  calculateVariantStats,
  evolveBaseStat,
  getMaxLevel,
  roundHalfToEven
} from '../../../src/utils/variantStatsEngine.js';

describe('variantStatsEngine', () => {
  it('uses round-half-to-even, including negative tie values', () => {
    expect(roundHalfToEven(2.5)).toBe(2);
    expect(roundHalfToEven(3.5)).toBe(4);
    expect(roundHalfToEven(-2.5)).toBe(-2);
    expect(roundHalfToEven(-3.5)).toBe(-4);
  });

  it('applies the 1.95 evolution multiplier sequentially', () => {
    expect(evolveBaseStat(100, 0)).toBe(100);
    expect(evolveBaseStat(100, 1)).toBe(195);
    expect(evolveBaseStat(100, 2)).toBe(380);
  });

  it.each([
    ['bronze', 30], ['prata', 40], ['ouro', 50], ['diamante', 60]
  ])('has maximum level for %s', (rarity, expected) => {
    expect(getMaxLevel(rarity)).toBe(expected);
  });

  it('calculates level 1, intermediate, and maximum-level stats with zero boosts', () => {
    expect(calculateLevelStat(101, 1)).toBe(101);
    expect(calculateLevelStat(101, 6)).toBe(202);
    expect(calculateLevelStat(101, 30)).toBe(687);
    expect(calculateLevelStat(101, 60)).toBe(1293);
  });

  it('returns stat breakdown and leaves future modifiers explicitly pending', () => {
    expect(calculateVariantStats({
      baseAttack: 100,
      baseHealth: 600,
      evolutions: 1,
      level: 30,
      rarity: 'bronze'
    })).toEqual({
      attack: 1326,
      health: 7956,
      fighterScore: 1857,
      breakdown: {
        baseAttack: 195,
        baseHealth: 1170,
        level: 30,
        evolutions: 1,
        attackBoost: 0,
        healthBoost: 0,
        baseFighterScore: 1857,
        skillTree: { status: 'pending', boost: null },
        marqueeAbility: { status: 'pending', boost: null },
        prestigeAbility: { status: 'pending', boost: null }
      }
    });
  });

  it('compares base FS with current Palace power without treating it as equivalent', () => {
    // Audit of current root variant JSON. Heat Synced is intentionally excluded.
    const dataDir = join(process.cwd(), 'data');
    const comparisons = [];
    for (const file of readdirSync(dataDir).filter((name) => name.endsWith('.json'))) {
      let character;
      try {
        character = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
      } catch {
        continue;
      }
      for (const variants of Object.values(character.variants || {})) {
        for (const variant of variants) {
          if (/heat\s*-?synced/i.test(variant.name || '')) continue;
          const { attack, health, power } = variant.stats || {};
          if (![attack, health, power].every((value) => typeof value === 'string')) continue;
          const parsedAttack = Number(attack.replaceAll(',', ''));
          const parsedHealth = Number(health.replaceAll(',', ''));
          const parsedPower = Number(power.replaceAll(',', ''));
          comparisons.push({
            variant: variant.name,
            storedPower: parsedPower,
            calculatedBaseFS: calculateBaseFighterScore(parsedAttack, parsedHealth)
          });
        }
      }
    }

    expect(comparisons.length).toBeGreaterThan(0);
    // TODO: stored power includes unknown investments/settings, so no final-FS
    // formula can be validated from these records alone. Keep this as an audit,
    // not as a reason to rewrite or normalize any existing variant values.
    expect(comparisons.every(({ storedPower, calculatedBaseFS }) => storedPower !== calculatedBaseFS)).toBe(true);
  });

  it('rejects levels outside a rarity range', () => {
    expect(() => calculateVariantStats({
      baseAttack: 1, baseHealth: 1, level: 31, rarity: 'bronze'
    })).toThrow(RangeError);
  });
});
