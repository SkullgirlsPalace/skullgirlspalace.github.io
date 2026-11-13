/**
 * Pure first-layer stat calculations for variant data.
 *
 * Inputs must be actual base stats. Palace's current per-variant stats are
 * stored max values and cannot safely be treated as base stats.
 */

export const MAX_LEVEL_BY_RARITY = Object.freeze({
  bronze: 30,
  prata: 40,
  ouro: 50,
  diamante: 60
});

export const EVOLUTION_STAT_MULTIPLIER = 1.95;

/** Round to nearest integer, resolving exact ties to the even integer. */
export function roundHalfToEven(value) {
  if (!Number.isFinite(value)) throw new TypeError('value must be finite');
  const lower = Math.floor(value);
  const fraction = value - lower;
  if (fraction < 0.5) return lower;
  if (fraction > 0.5) return lower + 1;
  return lower % 2 === 0 ? lower : lower + 1;
}

/** Apply one sequential rarity evolution per step (not a compounded final round). */
export function evolveBaseStat(baseStat, evolutions = 0) {
  assertNonNegativeFinite(baseStat, 'baseStat');
  if (!Number.isInteger(evolutions) || evolutions < 0) {
    throw new RangeError('evolutions must be a non-negative integer');
  }
  let value = baseStat;
  for (let step = 0; step < evolutions; step += 1) {
    value = roundHalfToEven(value * EVOLUTION_STAT_MULTIPLIER);
  }
  return value;
}

export function getMaxLevel(rarity) {
  const level = MAX_LEVEL_BY_RARITY[String(rarity).toLowerCase()];
  if (!level) throw new RangeError(`Unknown rarity: ${rarity}`);
  return level;
}

/** Level scaling with zero stat-tree boost only. */
export function calculateLevelStat(baseStat, level) {
  assertNonNegativeFinite(baseStat, 'baseStat');
  if (!Number.isInteger(level) || level < 1) {
    throw new RangeError('level must be a positive integer');
  }
  return Math.ceil(baseStat * (1 + (level - 1) / 5));
}

/** Base Fighter Score relation, with all unimplemented modifiers set to zero. */
export function calculateBaseFighterScore(attack, health) {
  assertNonNegativeFinite(attack, 'attack');
  assertNonNegativeFinite(health, 'health');
  return Math.ceil((attack + health / 6) * 7 / 10);
}

/**
 * Calculate stats from known starting base values. `evolutions` must be
 * supplied from verified data; this function does not infer a variant's origin.
 */
export function calculateVariantStats({
  baseAttack,
  baseHealth,
  evolutions = 0,
  level,
  rarity
}) {
  const maxLevel = getMaxLevel(rarity);
  if (!Number.isInteger(level) || level < 1 || level > maxLevel) {
    throw new RangeError(`level must be between 1 and ${maxLevel} for ${rarity}`);
  }

  const evolvedBaseAttack = evolveBaseStat(baseAttack, evolutions);
  const evolvedBaseHealth = evolveBaseStat(baseHealth, evolutions);
  const attack = calculateLevelStat(evolvedBaseAttack, level);
  const health = calculateLevelStat(evolvedBaseHealth, level);
  const fighterScore = calculateBaseFighterScore(attack, health);

  return {
    attack,
    health,
    fighterScore,
    breakdown: {
      baseAttack: evolvedBaseAttack,
      baseHealth: evolvedBaseHealth,
      level,
      evolutions,
      attackBoost: 0,
      healthBoost: 0,
      baseFighterScore: fighterScore,
      skillTree: { status: 'pending', boost: null },
      marqueeAbility: { status: 'pending', boost: null },
      prestigeAbility: { status: 'pending', boost: null }
    }
  };
}

function assertNonNegativeFinite(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative finite number`);
  }
}
