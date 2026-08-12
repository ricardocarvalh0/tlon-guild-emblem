// ── Shared primitives ──────────────────────────────────────────────

export type Element = "Fire" | "Water" | "Wind" | "Earth" | "Holy";
export type Rarity = "SR" | "SSR";
export type BasicAttribute = "ATK" | "HP" | "DEF";
export type SpecialAttributeType =
  | "ATK" | "DEF" | "PV" | "Block" | "Break" | "Crit" | "Tenacity";

export interface AttributeTriple {
  ATK: number;
  HP: number;
  DEF: number;
}

// ── Species (template) ─────────────────────────────────────────────

/**
 * Shared across every player-owned copy of a fairy. Confirmed via two independently
 * owned Erythrina instances that growth slopes and the level-1-of-tier override are
 * species properties, not per-copy noise.
 */
export interface FairySpecies {
  id: string; // slug, e.g. "erythrina"
  name: string;
  element: Element;
  rarity: Rarity;
  focusAttribute: BasicAttribute; // no confirmed mechanical effect yet - may be cosmetic only

  /**
   * Continuous (unfloored) stats at level 1, 1-star, growth_rate 100%, Companionship 1.
   * NOT necessarily the displayed level-1 reading - level 1 frequently shows its own
   * override (see levelOneOverrides). This is the back-solved anchor the smooth
   * formula uses for every level from 2 upward; confirmed by back-extrapolating a
   * clean multi-point fit (lvl5+ for Lotus/Erythrina) to level 1 and checking it
   * against known higher-tier continuous values where available.
   *
   * NOTABLE PATTERN (4/4 species checked so far): growthSlope.X / baseStats.X is the
   * SAME ratio for X in {ATK, HP, DEF} within one fairy - i.e. each fairy has a single
   * per-level growth RATE that scales all three base stats together, not three
   * independent slopes. Exact match on 2 of 4 species so far (Erythrina, Balloon-flower:
   * all three ratios equal a single exact fraction), near-exact on the other 2. The rate
   * itself is fairy-specific (Lotus ~1/209, Erythrina/Balloon-flower exactly 1/201,
   * Chestnut-rose ~1/193 - close but visibly not identical) - NOT determined by
   * focusAttribute (3 ATK-focused fairies have 3 different rates). Practical upshot: a
   * new fairy's slope for all 3 stats can be derived from its lvl1 triple plus ONE
   * clean slope measurement on any single stat, rather than needing all 3 measured
   * independently.
   */
  baseStats: AttributeTriple;

  /** Per-level growth slope at growth_rate 100%, continuous (unfloored). Actual tiers
   *  use slope * (tierGrowthRate / 100). Confirmed ascend-invariant - do not scale this
   *  by any star multiplier. See baseStats doc comment for the shared-rate pattern. */
  growthSlope: AttributeTriple;

  /** Max level of the initial (100% growth-rate, pre-progression) tier - 80 for every
   *  species observed so far, but not yet assumed universal. */
  initialMaxLevel: number;

  /**
   * Known deviations from the smooth growth line at level 1 of a tier, keyed by that
   * level. Real and reproducible (seen on Lotus, Hydrangea, and twice independently on
   * Erythrina) but which stat(s) it hits isn't predictable - must be observed and
   * recorded per species per tier, not derived.
   */
  levelOneOverrides: Record<number, Partial<AttributeTriple>>;

  /**
   * cumulative(N) = a*N^2 + b*N + c - the multiplier from the species' OWN floor
   * (minStars, N=1) to N stars past that floor. N is NOT the displayed star count -
   * see minStars below. Applies to whatever the stat's continuous value is at the level
   * the fairy was ascended, NOT the level-1 base (see FairyInstance.starsSetAtLevel
   * below).
   *
   * CONFIRMED WRONG away from the level it was fit at - not just an unvalidated
   * assumption anymore. Cross-level test on Chestnut-rose (star 6->7, same fairy, lvl400
   * vs lvl100): the RATIO was wildly different (1.111 vs 1.427) but the ABSOLUTE delta
   * was IDENTICAL (32 DEF / 268 ATK / 832 HP at both levels, across two different
   * growth-rate tiers). Ascend's true bonus is a flat, level-independent ADDITIVE
   * amount, not a multiplicative ratio - this field's whole representation is the wrong
   * shape. Every existing ascendCurve (Hydrangea, Erythrina, Chestnut-rose) only ever
   * "worked" because each species was tested at a single fixed level, where an additive
   * bonus and a multiplicative one are indistinguishable. Using this field to predict a
   * fairy's stats at any level OTHER than the one it was fit at (see each species'
   * comment for which) will give WRONG results (confirmed, not just imprecise - e.g.
   * applying Chestnut-rose's ratio at lvl100 predicts DEF 83 where the real value is
   * 107). Per the user: kept as-is for now (documented, not reworked) while more
   * cross-level data is gathered to characterize the true additive curve properly.
   *
   * CONFIRMED NOT universal across ATK/HP/DEF at high star counts/magnitudes either
   * (Chestnut-rose, at her one fitted level): this field can only hold ONE shared
   * curve, so it stores whichever stat's curve is most reliably confirmed (see
   * per-species comments in fairySpecies.ts for the others) - a second, independent
   * known approximation on top of the level problem above.
   * Undefined = never ascended in testing, curve unknown (true for Lotus so far).
   */
  ascendCurve?: { a: number; b: number; c: number };

  /**
   * The species' minimum possible star count - the value a freshly-obtained copy
   * starts at, and the floor `ascendCurve`'s N=1 represents. CONFIRMED: SSR fairies are
   * born at 6 stars and never go below it (every "star 1" reading gathered for an SSR
   * species prior to this being discovered was actually star 6 - the whole dataset was
   * silently offset). SR's floor is unconfirmed - no SR fairy has been sampled yet, so
   * this is NOT assumed to be 1 by default; every species must set it explicitly.
   */
  minStars: number;

  progressions: ProgressionTier[];

  /**
   * Additive correction folded into CPFormulaConstants.compute for this species.
   * Currently only measured for Erythrina (~41.5); origin unresolved - could be
   * imprecision in the shared formula's fit rather than a true per-species term.
   * Defaults to 0 until measured for a given species.
   */
  cpOffset: number;
}

export interface ProgressionTier {
  /** +80 confirmed twice on Lotus; assumed constant, not yet cross-species validated. */
  maxLevelDelta: number;
  /** e.g. 140, 200. Only observed on Lotus (100->140->200); the +40pp/+60pp pattern is
   *  not confirmed universal or predictable for further tiers. */
  growthRateAfter: number;
  /**
   * What's been directly observed unlocking at this tier. CONFIRMED (per the user, a
   * game-design decision, not a formula): each fairy's special-attribute types are
   * hand-picked by the developers to shape how that fairy behaves/composes in a team.
   * Loose elemental tendencies exist (e.g. Fire fairies lean Block, Water fairies lean
   * Break) but are explicitly NOT predictable for fairies not yet observed - this field
   * is a factual record only, never a prediction, and should not be treated as derivable
   * from species/element/tier. See fairies-json-analysis.md Chunk 5.
   */
  observedSpecialAttribute: SpecialAttributeType | null;
}

// ── Global formula constants ───────────────────────────────────────

/**
 * Shared across species, pending further cross-species validation. Fit from Lotus,
 * cross-checked against Erythrina to within her cpOffset. Ascend's own direct CP
 * contribution (the "CP shortfall" seen on both Hydrangea and Erythrina, roughly
 * linear per star) isn't captured here yet - not precise enough to formalize.
 */
export interface CPFormulaConstants {
  atkWeight: number; // ~5.824
  defWeight: number; // ~4.115
  intercept: number; // ~998.9
  specialAttributeWeights: Partial<Record<SpecialAttributeType, number>>; // ATK ~5.00, Block ~10.00 confirmed; rest unmeasured
}

// ── Instance (owned fairy) ─────────────────────────────────────────

/**
 * One player-owned fairy. Everything here is player input / observed state - nothing
 * here is derived by formula. Combat Power is deliberately NOT a field: the game's own
 * CP display is confirmed unreliable (stale after Companionship-only changes, wrong
 * Ascend previews) so it must always be computed from the fields below, never trusted
 * as stored/displayed state.
 */
export interface FairyInstance {
  id: string;
  speciesId: string; // -> FairySpecies.id
  level: number;
  /** The TRUE displayed star count, 1-18 - NOT relative to the species' floor (see
   *  FairySpecies.minStars). For SSR fairies this is never below 6. */
  stars: number;
  /** Level at which the CURRENT star count was reached. Required to compute forward
   *  correctly - confirmed via Erythrina (ascended at lvl50, not lvl1) that Ascend's
   *  multiplier applies to the value at THIS level, not the level-1 base. */
  starsSetAtLevel: number;
  companionshipLevel: number; // 1-15
  /** What was actually unlocked at each progression this instance has completed - type
   *  may differ from FairySpecies.progressions[i].observedSpecialAttribute if the type
   *  turns out to be random/player-chosen rather than fixed per species. The point
   *  value itself has only ever been observed at +200 (Lotus, both progressions) so is
   *  tracked per-instance rather than assumed constant. Same index alignment as
   *  species.progressions; length = number of progressions completed. */
  unlockedSpecialAttributes: { type: SpecialAttributeType; value: number }[];
}

// ── Catalog (reference-only) entries ───────────────────────────────

/** One reference reading of a special attribute at a given progression slot. */
export interface CatalogSpecialAttribute {
  /** Which progression slot this was read at: 81 | 161 | 241 | 321. */
  atLevel: number;
  type: SpecialAttributeType;
  value: number;
}

/**
 * A fairy known only from the in-game reference/codex list
 * (`game-knowledge/fairies.json`), NOT from player-gathered level-by-level data.
 * Deliberately a SEPARATE, lighter type from FairySpecies: we only have a single
 * lvl400/18-star/0%-Bloom/base-Companionship snapshot per entry (see
 * game-knowledge/fairies-json-analysis.md), never the growth-slope/ascend/progression
 * data FairySpecies requires - there is no way to compute this fairy's stats at any
 * other level/star/Bloom without gathering that data directly, the same way each
 * FairySpecies entry was built. Do NOT add growth-curve fields here "as a best guess" -
 * this project never fabricates game formulas from insufficient data.
 *
 * Per the user: this reference list can go stale after balance patches (confirmed
 * example: Chestnut-rose's HP special attribute read 1700 here in an older patch, is
 * 1600 now) - treat referenceStats/referenceSpecialAttributes as a "last known
 * snapshot", not a live value.
 */
export interface FairyCatalogEntry {
  /** Numeric id from fairies.json - stable per-fairy key in the source data. */
  sourceId: number;
  /** Best English translation of nameOriginal. See nameConfirmed. */
  name: string;
  /** Original Portuguese name as given by the source data, kept for re-verification. */
  nameOriginal: string;
  /** True only once the user has explicitly verified `name` (see
   *  fairies-json-analysis.md Chunk 4). False = my translation, unreviewed - may be
   *  wrong; several already were (e.g. Margarida was first guessed "Daisy", corrected
   *  to the real "Marigold"). */
  nameConfirmed: boolean;
  element: Element;
  rarity: Rarity;
  /** Translated flavor/role text (e.g. "Group Attack, Damage Increase") - describes how
   *  the fairy is meant to behave/compose in a team (see fairies-json-analysis.md
   *  Chunk 5: special-attribute types are hand-picked for this same reason). Not yet
   *  used in any formula. Same nameConfirmed caveat applies - unreviewed translation. */
  roleDescription: string;
  /** Raw in-game "power" scalar. Meaning/formula not yet understood - see the "8
   *  distinct power tiers" open question in fairies-json-analysis.md. */
  power: number;
  /** ATK/HP/DEF at the reference snapshot's conditions (see this interface's doc
   *  comment) - NOT comparable to FairySpecies.baseStats (that's a level-1 value; this
   *  is level-400, 18-star). */
  referenceStats: AttributeTriple;
  /** Special attributes as read in the reference snapshot, one per unlocked
   *  progression slot. WHICH type lands on which slot is a per-fairy design choice, not
   *  a formula - see fairies-json-analysis.md Chunk 5 - so this is a factual record
   *  only, never a prediction for an untracked fairy. */
  referenceSpecialAttributes: CatalogSpecialAttribute[];
  /** Set when this catalog entry is confirmed to be the same fairy as a fully-modeled
   *  FairySpecies (-> FairySpecies.id) - see fairies-json-analysis.md Chunk 4 for the
   *  match evidence. Undefined = no deep growth-curve data gathered for this fairy yet. */
  trackedSpeciesId?: string;
}

