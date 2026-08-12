import type {
  AttributeTriple,
  CPFormulaConstants,
  FairyInstance,
  FairySpecies,
} from "../types/fairy";

interface GrowthTier {
  seedLevel: number;
  seedValue: AttributeTriple;
  growthRate: number;
}

function scale(v: AttributeTriple, factor: number): AttributeTriple {
  return { ATK: v.ATK * factor, HP: v.HP * factor, DEF: v.DEF * factor };
}

function addScaled(
  v: AttributeTriple,
  slope: AttributeTriple,
  amount: number,
): AttributeTriple {
  return {
    ATK: v.ATK + slope.ATK * amount,
    HP: v.HP + slope.HP * amount,
    DEF: v.DEF + slope.DEF * amount,
  };
}

/**
 * One entry per growth-rate tier, each carrying the true continuous (unfloored) value
 * at the level where that tier's rate starts applying. Seeded from species.baseStats
 * and carried forward tier by tier - never from a floored/displayed value, per the
 * confirmed lvl160->161 carry-forward rule.
 */
function buildGrowthTiers(species: FairySpecies): GrowthTier[] {
  const tiers: GrowthTier[] = [
    { seedLevel: 1, seedValue: species.baseStats, growthRate: 100 },
  ];
  let maxLevel = species.initialMaxLevel;
  for (const progression of species.progressions) {
    const prev = tiers[tiers.length - 1];
    const elapsed = maxLevel - prev.seedLevel;
    const seedValue = addScaled(
      prev.seedValue,
      species.growthSlope,
      (prev.growthRate / 100) * elapsed,
    );
    tiers.push({ seedLevel: maxLevel, seedValue, growthRate: progression.growthRateAfter });
    maxLevel += progression.maxLevelDelta;
  }
  return tiers;
}

/** Pure smooth continuous value at `level` - deliberately ignores levelOneOverrides.
 *  The override is a display-only snapshot at its exact level, not a change to the
 *  underlying trajectory (confirmed: Hydrangea's post-ascend leveling only reproduces
 *  correctly when projection uses the un-overridden smooth value as its base). */
function smoothValueAt(tiers: GrowthTier[], species: FairySpecies, level: number): AttributeTriple {
  let active = tiers[0];
  for (const t of tiers) {
    if (t.seedLevel <= level) active = t;
    else break;
  }
  const elapsed = level - active.seedLevel;
  return addScaled(active.seedValue, species.growthSlope, (active.growthRate / 100) * elapsed);
}

/** Smooth value with any recorded override substituted in, for querying a level directly
 *  (not for use as a projection base - see smoothValueAt). */
function displayAnchorAt(tiers: GrowthTier[], species: FairySpecies, level: number): AttributeTriple {
  const smooth = smoothValueAt(tiers, species, level);
  const override = species.levelOneOverrides[level];
  return override ? { ...smooth, ...override } : smooth;
}

/** Walks forward from (fromLevel, fromValue) to toLevel using each tier's own slope for
 *  the portion of the span it covers - handles spans that cross a growth-rate tier
 *  boundary, though that combination (ascend then a later progression) is untested. */
function projectForward(
  species: FairySpecies,
  tiers: GrowthTier[],
  fromLevel: number,
  fromValue: AttributeTriple,
  toLevel: number,
): AttributeTriple {
  if (toLevel <= fromLevel) return fromValue;
  let value = fromValue;
  let cursor = fromLevel;
  let tierIdx = tiers.findIndex(
    (t, i) => t.seedLevel <= fromLevel && (tiers[i + 1]?.seedLevel ?? Infinity) > fromLevel,
  );
  if (tierIdx === -1) tierIdx = tiers.length - 1;
  while (cursor < toLevel) {
    const tier = tiers[tierIdx];
    const nextSeed = tiers[tierIdx + 1]?.seedLevel ?? Infinity;
    const segmentEnd = Math.min(toLevel, nextSeed);
    const elapsed = segmentEnd - cursor;
    value = addScaled(value, species.growthSlope, (tier.growthRate / 100) * elapsed);
    cursor = segmentEnd;
    tierIdx++;
  }
  return value;
}

/**
 * KNOWN WRONG away from whatever single level a species' ascendCurve was fit at - see
 * FairySpecies.ascendCurve doc comment. Ascend's true bonus is a flat, level-independent
 * additive amount, not a multiplicative ratio; this function (and the field it reads)
 * models the wrong shape entirely. Left as-is pending a proper additive rework - do not
 * trust computeBasicAttributes for an ascended instance at a level other than the one
 * noted in that species' fairySpecies.ts comment.
 */
function cumulativeAscendMultiplier(curve: { a: number; b: number; c: number }, stars: number): number {
  return curve.a * stars * stars + curve.b * stars + curve.c;
}

/**
 * Computes an owned fairy's current displayed ATK/HP/DEF.
 *
 * Pipeline: walk growth-rate tiers from species.baseStats (continuous, floor only at
 * the end) to get the smooth value at any level; if ascended above the species' floor
 * (stars > minStars - e.g. SSR fairies are born at 6 stars, so "ascended" means > 6,
 * not > 1), anchor at starsSetAtLevel - using the override-aware value if that's also
 * the level being queried, otherwise the pure smooth value as the base for projecting
 * further, since overrides don't feed the underlying trajectory - multiply by the
 * cumulative ascend ratio (ascendCurve's N is relative to minStars, not the true star
 * count - see FairySpecies.minStars), then continue at the unchanged slope to the
 * current level; finally apply Companionship's flat per-level-up percentage and floor.
 * CAUTION: the ascend step is CONFIRMED WRONG at any level other than where the
 * species' curve was fit - see cumulativeAscendMultiplier and FairySpecies.ascendCurve.
 */
export function computeBasicAttributes(
  species: FairySpecies,
  instance: FairyInstance,
): AttributeTriple {
  const tiers = buildGrowthTiers(species);
  const companionshipFactor = 1 + (instance.companionshipLevel - 1) * 0.01;

  let continuous: AttributeTriple;
  if (instance.stars > species.minStars) {
    if (!species.ascendCurve) {
      throw new Error(`No ascend curve known for species "${species.id}"`);
    }
    // ascendCurve is fit in terms of "stars past the species' floor" (N=1 at minStars),
    // not the true displayed star count - see FairySpecies.minStars doc comment.
    const relativeStars = instance.stars - species.minStars + 1;
    const multiplier = cumulativeAscendMultiplier(species.ascendCurve, relativeStars);
    if (instance.level === instance.starsSetAtLevel) {
      continuous = scale(displayAnchorAt(tiers, species, instance.starsSetAtLevel), multiplier);
    } else {
      const smoothBoosted = scale(
        smoothValueAt(tiers, species, instance.starsSetAtLevel),
        multiplier,
      );
      continuous = projectForward(
        species,
        tiers,
        instance.starsSetAtLevel,
        smoothBoosted,
        instance.level,
      );
    }
  } else {
    continuous = displayAnchorAt(tiers, species, instance.level);
  }

  const final = scale(continuous, companionshipFactor);
  // Many of this game's true continuous values land exactly on an integer (confirmed
  // repeatedly throughout the underlying data). A tiny epsilon guards against floating-
  // point representation error (e.g. 1/72 isn't exact in binary) pushing an
  // intended-exact value just below its true integer and flooring one too low -
  // confirmed to happen in practice (Chestnut-rose DEF at true 9-star: exact value is
  // 408, computed as 407.99999999999994 without this guard). 1e-9 is far below any real
  // fractional difference seen in this game's mechanics (smallest so far is ~0.083).
  const EPSILON = 1e-9;
  return {
    ATK: Math.floor(final.ATK + EPSILON),
    HP: Math.floor(final.HP + EPSILON),
    DEF: Math.floor(final.DEF + EPSILON),
  };
}

/**
 * CP = atkWeight*ATK + defWeight*DEF + sum(weight*value for each unlocked special
 * attribute) + intercept + species.cpOffset, off the DISPLAYED (floored) ATK/DEF.
 * Rounded rather than floored for display - fitted residuals were sub-1 but not
 * consistently one-sided, so floor isn't clearly the right final step here the way it
 * is for ATK/HP/DEF. Does not yet account for Ascend's own direct CP contribution (the
 * "CP shortfall" - open question, see FairySpecies.ascendCurve doc comment).
 */
export function computeCombatPower(
  species: FairySpecies,
  instance: FairyInstance,
  constants: CPFormulaConstants,
): number {
  const { ATK, DEF } = computeBasicAttributes(species, instance);
  let cp = constants.atkWeight * ATK + constants.defWeight * DEF + constants.intercept + species.cpOffset;
  for (const unlocked of instance.unlockedSpecialAttributes) {
    const weight = constants.specialAttributeWeights[unlocked.type];
    if (weight !== undefined) cp += weight * unlocked.value;
  }
  return Math.round(cp);
}
