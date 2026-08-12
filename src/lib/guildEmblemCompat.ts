import { TOTAL_GUILD_ABILITY_SLOTS } from "../types/guild";
import type { ColorCounts, GuildEmblemEffect } from "../types/guild";

/**
 * The minimum ColorCounts that would simultaneously satisfy every given effect's own
 * threshold - the componentwise max across all of them. Valid because each effect only
 * requires a MINIMUM per color (an AND-gate - see GuildEmblemEffect.threshold doc
 * comment), so having more than any one effect's minimum never breaks that effect;
 * the tightest simultaneous target is just the max needed per color.
 */
export function combinedThreshold(effects: GuildEmblemEffect[]): ColorCounts {
  return effects.reduce(
    (acc, e) => ({
      orange: Math.max(acc.orange, e.threshold.orange),
      blue: Math.max(acc.blue, e.threshold.blue),
      green: Math.max(acc.green, e.threshold.green),
    }),
    { orange: 0, blue: 0, green: 0 },
  );
}

/**
 * Whether some real 30-slot split (orange+blue+green === TOTAL_GUILD_ABILITY_SLOTS) can
 * satisfy `counts` as a lower bound in every color at once - i.e. whether
 * combinedThreshold's result still leaves room in the fixed 30-slot budget. Any leftover
 * slack can always be assigned to any color without breaking an already-met threshold,
 * so this single sum check is sufficient - no need to search actual splits.
 */
export function isAchievable(
  counts: ColorCounts,
  totalSlots: number = TOTAL_GUILD_ABILITY_SLOTS,
): boolean {
  return counts.orange + counts.blue + counts.green <= totalSlots;
}

export interface EffectCompatibility {
  effect: GuildEmblemEffect;
  selected: boolean;
  /** Whether this effect could be added to (or, if selected, remain in) the current
   *  selection without exceeding the 30-slot budget. */
  compatible: boolean;
  /** The combined ColorCounts if this effect were included alongside the current
   *  selection - shown so the UI can explain WHY something is incompatible. */
  combinedIfIncluded: ColorCounts;
}

/**
 * For every effect in `all`, reports whether it's already selected and whether it's
 * (still) compatible with the current `selected` set given the fixed 30-slot budget.
 */
export function getCompatibility(
  selected: GuildEmblemEffect[],
  all: GuildEmblemEffect[],
  totalSlots: number = TOTAL_GUILD_ABILITY_SLOTS,
): EffectCompatibility[] {
  const selectedIds = new Set(selected.map((e) => e.id));
  return all.map((effect) => {
    const isSelected = selectedIds.has(effect.id);
    const combinedIfIncluded = isSelected
      ? combinedThreshold(selected)
      : combinedThreshold([...selected, effect]);
    return {
      effect,
      selected: isSelected,
      compatible: isAchievable(combinedIfIncluded, totalSlots),
      combinedIfIncluded,
    };
  });
}
