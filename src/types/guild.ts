// ── Guild Abilities (30 slots across 3 panels) ─────────────────────

import type { EffectCompatibility } from "../lib/guildEmblemCompat.ts";

export type AbilityColor = "Orange" | "Blue" | "Green";

/** One of the 30 Guild Ability slots' final color counts - how many of the 30 slots
 *  rolled an attribute belonging to each color. This, not the slots' individual levels,
 *  is what gates Guild Emblem special-attribute activation. */
export interface ColorCounts {
  orange: number;
  blue: number;
  green: number;
}

/** Total Guild Ability slots across all 3 panels (10 each) - CONFIRMED fixed, no known
 *  way to exceed it. Every ColorCounts a player can actually reach has
 *  orange+blue+green <= this value (== once all 30 are unlocked). */
export const TOTAL_GUILD_ABILITY_SLOTS = 30;

// ── Guild Emblems ───────────────────────────────────────────────────

/**
 * One Guild Emblem special attribute, from `game-knowledge/guild/emblem-effects.json`
 * (the source of truth - see game-knowledge.md's "Full Guild Emblem catalog" section).
 * `color` is which of the 3 emblem slots grants this effect - CONFIRMED independent of
 * which color's Guild Ability pool the effect's underlying attribute belongs to (e.g. a
 * Blue emblem can grant a Green-pool attribute like Block Damage Reduction) - do not
 * assume the two color systems line up.
 */
export interface GuildEmblemEffect {
  /** Stable slug, derived from `name`. */
  id: string;
  name: string;
  /** Which of the 3 physical Guild Emblem slots grants this effect. */
  color: AbilityColor;
  /** Minimum Guild Ability color counts required SIMULTANEOUSLY for this effect to
   *  activate - CONFIRMED an AND-gate, not an OR (per the user). */
  threshold: ColorCounts;
  /** Flat bonus, percentage, or full special-ability text, exactly as given in the
   *  source file - not parsed/typed further since the shape varies per effect. */
  description: string;
  /** Short, hand-condensed one-line summary of this effect's actual bonus (not just its
   *  name) - shown in the "your picks" summary list. `description` remains the full/
   *  original text used on the effect's own card; this is a separate, terser rendering
   *  specifically for at-a-glance scanning of a multi-effect selection. */
  summary: string;
}


export interface GuildEmblemEffectCardType extends GuildEmblemEffect {
  disabled?: boolean
  compat: EffectCompatibility
}