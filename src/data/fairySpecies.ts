import type { CPFormulaConstants, FairySpecies } from "../types/fairy";

/**
 * Shared, cross-species constants. Fit from Lotus's 12-point dataset. TRUST THIS LESS
 * THAN IT LOOKS: adding Balloon-flower and Chestnut-rose revealed that within a single
 * growth-rate tier, ATK/HP/DEF (and CP) all move in lockstep (see FairySpecies.baseStats
 * doc comment - one shared per-fairy rate drives all three), which makes a per-fairy
 * linear regression of CP against them fit almost perfectly (<0.3 residual) for ANY of a
 * whole family of coefficient choices - the specific numbers aren't reliably identified
 * from single-tier data. A joint regression forcing these same weights across all 4
 * species failed badly (residuals up to ~390), so the weights are probably genuinely
 * fairy-specific, not universal - but confirming the ACTUAL per-species weights needs
 * data that breaks the collinearity (a growth-rate tier change, Ascend, or Special
 * Attributes - which is likely why Lotus's own fit, spanning two tier changes and two
 * Special Attributes, held together coherently). Cross-checked against Erythrina's
 * clean (Companionship-1) data, which fits to within her cpOffset (~41.5) - but per the
 * above, that "offset" may just be this same identifiability problem, not a real small
 * correction. Treat CP prediction via this formula as reliable only for Lotus and
 * roughly-Lotus-shaped fairies until resolved.
 */
export const CP_FORMULA: CPFormulaConstants = {
  atkWeight: 5.823567322975342,
  defWeight: 4.114560078841886,
  intercept: 998.938716306962,
  specialAttributeWeights: {
    ATK: 4.997974158782051,
    Block: 10.00045772352105,
  },
};

/**
 * Focus: ATK. Ascension never tested (stars fixed at her species floor throughout all
 * sampled data - CONFIRMED SSR fairies are born at 6 stars, never lower; every "1-star"
 * mention elsewhere in this file/the knowledge doc predating that discovery means
 * "species floor," i.e. true star 6 for every fairy here, all of which are SSR), so
 * ascendCurve is unknown. Companionship never tested either (always level 1 - level and
 * star count are independent, this part is unaffected). cpOffset is 0 by definition -
 * this is the fairy CP_FORMULA was fit from (also unaffected - CP fitting used raw
 * displayed values, never depended on star-count labels).
 *
 * Growth rate (see baseStats doc comment on FairySpecies): ATK/HP/DEF slopes are each
 * ~1/209 of their own base (12/2507 for ATK, 1/209 exactly for HP and DEF - the tiny
 * ATK gap is almost certainly imprecision in the back-solved base, not a real per-stat
 * difference, given every other species tested hits one exact shared ratio).
 */
export const LOTUS: FairySpecies = {
  id: "lotus",
  name: "Lotus",
  element: "Water", // CONFIRMED via fairies.json reference list (id 12, "Lótus") + user ID - see fairies-json-analysis.md
  rarity: "SSR",
  focusAttribute: "ATK",
  minStars: 6, // CONFIRMED: SSR fairies are born at 6 stars, never lower
  // Back-solved continuous anchor at level 1 (growth_rate 100%): the displayed lvl1
  // reading (499/728/52) undershoots this on ATK/HP - see levelOneOverrides below.
  baseStats: { ATK: 501.4, HP: 731.5, DEF: 52.25 },
  growthSlope: { ATK: 2.4, HP: 3.5, DEF: 0.25 },
  initialMaxLevel: 80,
  levelOneOverrides: {
    1: { ATK: 499, HP: 728 }, // DEF's smooth value already floors to the displayed 52
  },
  progressions: [
    { maxLevelDelta: 80, growthRateAfter: 140, observedSpecialAttribute: "ATK" },
    { maxLevelDelta: 80, growthRateAfter: 200, observedSpecialAttribute: "Block" },
  ],
  cpOffset: 0,
};

/**
 * Focus: ATK. Ascend curve fit from her species floor (6-star) through 2 ascends past
 * it (own quadratic, NOT yet validated out-of-sample the way Hydrangea's was - treat as
 * provisional) - "stars 1-3" in the original fit notes means 6/7/8-star (CONFIRMED SSR
 * fairies are born at 6 stars, never lower - see FairySpecies.minStars); ascendCurve's
 * N is already relative-to-floor by construction (N=1 was always "wherever data
 * collection started," which for every SSR fairy here was actually 6 stars), so the fit
 * numbers below did NOT need to change, only their interpretation. Never progressed in
 * testing, so progressions is empty (not "confirmed empty" - just unobserved).
 * cpOffset (~41.5) measured against CP_FORMULA's Lotus-fit weights - per the caveat on
 * CP_FORMULA above, this single-tier data can't actually distinguish "small real
 * offset" from "collinearity means the true weights just aren't Lotus's," so treat this
 * number as a usable approximation within her tested range, not a settled constant.
 * Growth rate: ATK/HP/DEF slopes are all EXACTLY 1/201 of their own base - the
 * cleanest exact match of any species so far.
 */
export const ERYTHRINA: FairySpecies = {
  id: "erythrina",
  name: "Erythrina",
  element: "Fire",
  rarity: "SSR",
  focusAttribute: "ATK",
  minStars: 6, // CONFIRMED: SSR fairies are born at 6 stars, never lower
  // Back-solved from the clean (Companionship-1) lvl5-20 span - zero residual across
  // lvl 5/10/15/20, the most precisely constrained baseStats/slope of the 3 species.
  baseStats: { ATK: 482.4, HP: 804.0, DEF: 40.2 },
  growthSlope: { ATK: 2.4, HP: 4.0, DEF: 0.2 },
  initialMaxLevel: 80,
  levelOneOverrides: {
    1: { ATK: 480, HP: 800 }, // DEF's smooth value already floors to the displayed 40
  },
  progressions: [],
  // Provisional - only 3 points, own curve, not out-of-sample tested (contrast Hydrangea's).
  // CONFIRMED WRONG away from lvl50 (where it was fit) - see FairySpecies.ascendCurve;
  // Ascend's true bonus is a flat additive amount, not this multiplicative ratio.
  ascendCurve: { a: 0.081, b: 0.396, c: 0.523 },
  cpOffset: 41.5,
};

/**
 * Focus: DEF. The ONLY species with an out-of-sample-validated ascend curve (predicted
 * her 4th data point exactly before it was measured - in true star terms, fit from
 * 6/7/8-star and validated at 9-star; "star 1/star 4" in the original notes are labels
 * relative to her floor, not true star count - CONFIRMED SSR fairies are born at 6
 * stars, never lower, see FairySpecies.minStars). Never leveled at her floor (6-star)
 * directly - growthSlope and baseStats.HP/DEF are back-derived from her 9-star leveling
 * data (old label "4-star") divided by the confirmed 4.0x ascend multiplier (ATK's
 * slope is ascend-invariant per the confirmed rule, so this is valid, but HP/DEF come
 * from only a 4-level window and should be treated as LOW CONFIDENCE pending direct
 * 6-star leveling data). Never progressed, and Companionship never tested (always level
 * 1). cpOffset unmeasured - her CP is known to diverge more at higher star tiers due to
 * the still-unmodeled Ascend CP-shortfall (see game-knowledge.md), not something a flat
 * offset would capture correctly, so this defaults to 0 rather than guessing.
 */
export const HYDRANGEA: FairySpecies = {
  id: "hydrangea",
  name: "Hydrangea",
  element: "Water",
  rarity: "SSR",
  focusAttribute: "DEF",
  minStars: 6, // CONFIRMED: SSR fairies are born at 6 stars, never lower
  baseStats: { ATK: 180.0, HP: 1702.17, DEF: 250.17 },
  growthSlope: { ATK: 1.0, HP: 8.333, DEF: 1.333 },
  initialMaxLevel: 80,
  levelOneOverrides: {
    1: { HP: 1700 }, // ATK/DEF's smooth values already float to the displayed 180/250
  },
  progressions: [],
  // Validated out-of-sample against star 4 - the most solid ascend curve of the 3 species.
  // CONFIRMED WRONG away from lvl1 (where it was fit) - see FairySpecies.ascendCurve;
  // Ascend's true bonus is a flat additive amount, not this multiplicative ratio.
  ascendCurve: { a: 0.1, b: 0.5, c: 0.4 },
  cpOffset: 0,
};

/**
 * Focus: HP. First HP-focused species tested. Growth rate: ATK/HP slopes both land on
 * the EXACT same ratio as Erythrina/Balloon-flower (1/201) - DEF's isolated fit (6/17)
 * is close (~1/199) but not exact, most likely floor noise given DEF's small magnitude,
 * same issue seen with Lotus/Hydrangea's DEF.
 *
 * The lvl40 ATK reading in the raw source was originally 185 - flagged as a likely typo
 * (the smooth line predicts 180 exactly from every other point) and confirmed/corrected
 * by the user directly in balloon-flower.js.
 *
 * cpOffset left at 0 and NOT populated - see CP_FORMULA's caveat above, this species'
 * single-tier data can't reliably identify per-species CP weights at all.
 */
export const BALLOON_FLOWER: FairySpecies = {
  id: "balloon-flower",
  name: "Balloon-flower",
  element: "Wind", // CONFIRMED via fairies.json reference list (id 5, "Flor-Balão") + user ID
  rarity: "SSR",
  focusAttribute: "HP",
  minStars: 6, // CONFIRMED: SSR fairies are born at 6 stars, never lower
  baseStats: { ATK: 150.75, HP: 3819.0, DEF: 70.294 },
  growthSlope: { ATK: 0.75, HP: 19.0, DEF: 0.353 },
  initialMaxLevel: 80,
  levelOneOverrides: {
    1: { HP: 3800 }, // ATK/DEF's smooth values already floor to the displayed 150/70
  },
  progressions: [],
  cpOffset: 0,
};

/**
 * IMPORTANT LABEL NOTE for everything ascend-related below: CONFIRMED SSR fairies are
 * born at 6 stars and never go lower (see FairySpecies.minStars) - every "star N"
 * mention in this comment block (star1 through star5) was written before that was known
 * and is a LABEL relative to her floor, not the true displayed star count. True star =
 * N + 5, i.e. "star1" here means true 6-star (her floor, the ascend-free baseline),
 * "star5" means true 10-star. None of the fitted numbers needed to change - ascendCurve
 * was always being fit relative to "wherever data collection started," which for this
 * (like every SSR) species was always the 6-star floor - only the labels' meaning does.
 *
 * Focus: ATK. Growth rate: ATK/HP/DEF ratios cluster around ~1/193-1/195 but aren't
 * exactly equal the way Erythrina/Balloon-flower's are (7/1347, 13/2533, 1/193 - about
 * 1.3% spread) - either genuine small per-stat variation for this species, or residual
 * imprecision in the sparse-point back-extrapolation. Third ATK-focused species tested,
 * and its rate (~0.52%) differs from both Lotus's (~0.48%) and Erythrina's (~0.50%) -
 * confirms focusAttribute does NOT determine the growth rate.
 *
 * 1st progression: lvl80->81 (auto-advance confirmed again), maxLevel 80->160, growth
 * rate 100%->140% - same +80/+40pp shape as Lotus's 1st progression. Validated exactly
 * against the real lvl81 reading (ATK 572, HP 1789, DEF 68 unchanged) via
 * computeBasicAttributes - zero mismatch. Special Attribute unlocked: PV (HP) +1600.
 *
 * Attempted to use this progression (a tier change + a new Special Attribute type - the
 * same combination that made Lotus's CP formula solvable) to fit Chestnut-rose's OWN CP
 * coefficients, rather than borrowing Lotus's. Result: plugging Lotus's atkWeight/
 * defWeight/intercept into Chestnut-rose's lvl1 and lvl80 (both still the same 100%
 * tier) implies wildly inconsistent offsets (-137.5 at lvl1 vs +1.8 at lvl80 - a ~139 CP
 * disagreement, nothing like Erythrina's stable ~41.5 offset) - Lotus's weights
 * genuinely do not transfer here, more strongly than the existing caveat already
 * assumed. Solving for Chestnut-rose's OWN independent weights isn't possible yet
 * either: lvl1 and lvl80 are still nearly collinear (ATK:DEF ratio 8.375 vs 8.382,
 * barely moves), so 3 points total give only ~2 independent constraints for 4 unknowns
 * (atkWeight, defWeight, intercept, PV weight) - underdetermined. No cpOffset or special
 * attribute weight populated from this - would need a few more levels at the new 140%
 * growth rate (giving several more, still-non-collinear points) to actually solve it,
 * the way Lotus's dataset spanning 5 post-progression levels did.
 *
 * cpOffset left at 0 and NOT populated - see CP_FORMULA's caveat above.
 *
 * KNOWN SMALL GAP: at lvl400 (the absolute max level, first time this project has
 * reached it), the pure smooth/tier model predicts ATK continuous = 2418.0 exactly, but
 * the real 1-star reading is 2417 - confirmed via cross-checking against her own star-2
 * ascend data (only the 2417 anchor makes the ascend multiplier come out to a clean
 * 10/9 - see ascendCurve below). Schema has no mechanism for a "last level of the final
 * tier" deviation (only first-level-of-tier overrides via levelOneOverrides) - this is
 * possibly a symmetric counterpart to that pattern, never visible before since no
 * fairy's data reached the absolute max level until now. NOT patched into
 * baseStats/growthSlope/levelOneOverrides (would need a proper mechanism, not a hack) -
 * computeBasicAttributes will be off by 1 on ATK specifically at lvl400, 1-star. Worth
 * revisiting if another species' data reaches its own max level.
 *
 * ascendCurve: fit from 3 clean points, all at lvl400 (1-star=1.0 trivially, then real
 * star-2 and star-3 readings) - cumulative(N) = (N^2 + 5N + 66)/72, giving star2=10/9,
 * star3=5/4, this is DEF's own curve (fits DEF with zero residual at every star tested,
 * 2/3/4). Originally assumed shared across ATK/HP/DEF (matching the established "Ascend
 * applies one uniform ratio to all three Basic Attributes" rule), but star 4 disproved
 * that assumption for this species: ATK and HP each need their OWN slightly different
 * curve to predict their own star-4 value exactly (ATK: a=34/2417, b=166/2417,
 * c=2217/2417, giving cumulative(4)=3425/2417; HP: a=26/1875, b=26/375, c=573/625,
 * giving cumulative(4)=177/125=1.416 - HP's curve was already visibly off the DEF-based
 * one starting at star 2, by a clean, GROWING amount: -1/-3/-5 at star 2/3/4). Each
 * stat's own curve, fit purely from its own star1-3 data, predicts its own star4 value
 * with ZERO error - this is a genuine out-of-sample validation per stat, not
 * overfitting. KNOWN LIMITATION: the field below stores only DEF's curve (this schema
 * has no way to represent 3 independent curves) - using it for ATK/HP predictions will
 * be off by a small, growing amount at high star counts (matches DEF exactly; ATK/HP
 * increasingly diverge - confirmed wrong by 1 and 5 respectively at star 4). This likely
 * wasn't visible on Hydrangea/Erythrina (both confirmed as one shared curve) simply
 * because their tested magnitudes were much smaller (hundreds-low thousands vs
 * chestnut-rose's lvl400 tens-of-thousands) and star counts lower (max 4) - the same
 * proportional per-stat difference would floor away to nothing at smaller values. Same
 * shape of lesson as the Foxglove ATK slope issue: a narrow/small-magnitude fit can look
 * exact while hiding a real discrepancy only visible at larger scale. Per the user: kept
 * as a documented finding rather than extending the schema to per-stat curves for now.
 *
 * Star 5 update: DEF's curve (stored below) AND HP's own curve (26/1875, 26/375,
 * 573/625) both predicted their star-5 value with ZERO error too - a second consecutive
 * out-of-sample hit for each, about as solid as validation gets in this doc. ATK's own
 * curve (34/2417, 166/2417, 2217/2417 - exact through star 4) MISSED star 5 by -2
 * (predicted 3897, actual 3895). Refitting ATK from different point sets (stars 2-4
 * instead of 1-3) and even trying a cubic instead of quadratic both land on the same
 * ~3896-3897 prediction (the fitted cubic term is floating-point-noise-sized, i.e.
 * genuinely ~0) - this isn't a polynomial-order problem. Given ATK is the one stat that
 * already had a separately-confirmed quirk at this exact level (the base-anchor gap
 * above), this looks like a continuation of some unexplained ATK-at-lvl400 phenomenon,
 * not a fitting error - but no working theory yet. Left undocumented/uncorrected in the
 * curve itself pending more data (star 6+, or another species reaching similarly high
 * magnitudes) rather than forcing an unvalidated fix.
 *
 * True star 11 (old label 6): DEF and HP's curves both predicted exactly AGAIN - a
 * third consecutive out-of-sample hit for each. ATK's gap from its original (true star
 * 6-8 fit) curve was 0/-2/-4 at true9/10/11, which read as linear at the time -
 * SUPERSEDED below, that guess was itself a narrow-window illusion (2 non-zero points
 * can't distinguish "+(-2) per star" from "doubling").
 *
 * True star 12: DEF and HP hit exactly a FOURTH consecutive time. ATK's gap vs. the
 * original curve was -8 (not the linearly-predicted -6), read at the time as geometric
 * doubling (0/-2/-4/-8, ratio 2.0 twice) starting at true star 10 - SUPERSEDED below,
 * also wrong.
 *
 * True star 13 (CP 54416, ATK 5709, HP 17692, DEF 680): DEF and HP hit exactly a FIFTH
 * consecutive time - treat these two as settled. ATK's gap is now -12, not the
 * doubling-predicted -16 - full sequence 0/-2/-4/-8/-12, increments -2/-2/-4/-4. This is
 * the THIRD distinct pattern guessed for this sequence (linear, then doubling, both
 * wrong on the next point) - the increments repeating twice before doubling reproduces
 * all 5 known points exactly, but given the track record this is offered with LOW
 * confidence, not as a real finding. Likely conclusion: this gap isn't a simple
 * closed-form function of star count, and no more guessing-from-the-same-thread should
 * be trusted without independent confirmation.
 *
 * True star 14 (CP 60437, ATK 6482, HP 20084, DEF 772) - RESOLVED, and the guess in the
 * paragraph above (a new "final stretch to cap" Ascend tier) was WRONG about the
 * mechanism, corrected here rather than silently. The real cause: a wholly separate
 * system, Dual Radiance Bloom - unlocks at 14 stars for eligible species, has its own
 * 0-100% "Bloom Training" meter, and (per the user) grants a flat bonus of
 * +110 HP / +33 ATK / +4 DEF per 1% trained. Chestnut-rose is eligible and was at 2%
 * training when this reading was taken - completely unrelated to Ascend's own curve,
 * despite both moving together at star 14 by coincidence (14 is both when Bloom
 * unlocks AND just another star on the ascend curve). See the "Dual Radiance Bloom"
 * section in game-knowledge.md for the full mechanic and an open reconciliation
 * question (the stated 2%-training bonus doesn't cleanly subtract out to recover this
 * curve's otherwise-perfect star9-13 predictions - not yet resolved). PRACTICAL
 * IMPACT: star9-13 readings remain clean/uncontaminated (Bloom requires 14 stars, so
 * DEF/HP's five consecutive exact hits through star13 still stand) - only star14+
 * readings on ANY fairy eligible for Bloom now need training% accounted for before
 * being used to validate/fit an ascend curve. The ATK-specific gap from stars 9-13
 * remains completely separate and unexplained - Bloom doesn't touch it (unavailable
 * before star 14).
 *
 * MAJOR CORRECTION - Ascend is additive, not multiplicative; every ascendCurve number
 * below is confirmed wrong away from lvl400. Tested the SAME star transition (6->7) on
 * the SAME fairy at a different level (lvl100, growth-rate 140% tier, vs lvl400's 460%):
 * the RATIO was completely different (1.111 at lvl400 vs 1.427 at lvl100), but the
 * ABSOLUTE delta was IDENTICAL (32 DEF / 268 ATK / 832 HP, exactly, at both levels).
 * Ascend's true bonus is a flat, level-independent additive amount - this field's
 * multiplicative-ratio representation is the wrong shape entirely, not just imprecise.
 * All the star9-13 ATK-gap analysis above remains valid AS A DESCRIPTION OF LVL400
 * SPECIFICALLY (re-deriving it in additive terms reproduces the identical gaps, see
 * game-knowledge.md) - it does not need to be redone.
 *
 * RESOLVED via the lvl100 cross-level test: the ATK gap is NOT lvl400-specific. The
 * star8->9 delta at lvl100 (+404 ATK) matches lvl400's known delta for the same
 * transition exactly - the same transition where lvl400's own ATK curve first started
 * drifting. Since this cross-level match holds exactly AT the transition where the
 * anomaly first appears, the anomaly itself is level-independent - an inherent property
 * of Chestnut-rose's own ATK ascend delta curve, not tied to being at the level cap (the
 * earlier leading hypothesis, now ruled out). Still no working theory for WHY her ATK
 * delta stops fitting a clean quadratic around star 8-9 while DEF/HP don't - only that
 * it travels with the fairy/stat, not the level.
 */
export const CHESTNUT_ROSE: FairySpecies = {
  id: "chestnut-rose",
  name: "Chestnut-rose",
  element: "Fire", // CONFIRMED via fairies.json reference list (id 6, "Rosa Roxburghii") - exact PV/ATK/DEF match to our own confirmed 18-star reading; corrects the earlier unconfirmed "Earth" guess
  rarity: "SSR",
  focusAttribute: "ATK",
  minStars: 6, // CONFIRMED: SSR fairies are born at 6 stars, never lower
  baseStats: { ATK: 404.1, HP: 1266.5, DEF: 48.25 },
  growthSlope: { ATK: 2.1, HP: 6.5, DEF: 0.25 },
  initialMaxLevel: 80,
  levelOneOverrides: {
    1: { ATK: 402, HP: 1260 }, // DEF's smooth value already floors to the displayed 48
  },
  progressions: [
    { maxLevelDelta: 80, growthRateAfter: 140, observedSpecialAttribute: "PV" },
    { maxLevelDelta: 80, growthRateAfter: 200, observedSpecialAttribute: "Crit" },
    { maxLevelDelta: 80, growthRateAfter: 300, observedSpecialAttribute: "Tenacity" },
    { maxLevelDelta: 80, growthRateAfter: 460, observedSpecialAttribute: "Block" },
  ],
  // Fit from lvl400 star1/2/3 - see doc comment above for the HP caveat and the ATK
  // anchor correction. Validated out-of-sample through star 13 - AT LVL400 ONLY.
  // CONFIRMED WRONG at other levels (e.g. lvl100) - Ascend is additive, not
  // multiplicative - see the "MAJOR CORRECTION" paragraph above.
  ascendCurve: { a: 1 / 72, b: 5 / 72, c: 11 / 12 },
  cpOffset: 0,
};

/**
 * Focus: DEF - INFERRED, not yet user-confirmed. Growth rate: ATK/HP/DEF ratios are
 * all EXACTLY 1/201 - the third species to hit this exact rate (after Erythrina and
 * Balloon-flower), raising a new question of whether 1/201 is some kind of common/
 * default rate rather than every fairy having its own. Override pattern is what
 * suggests DEF focus: ATK does NOT override here (unlike every ATK-focused species so
 * far), while BOTH HP and DEF override - the first DEF override seen in any species.
 * Fits a "HP always overrides, plus your own focus stat also overrides" model better
 * than the species tested so far: under that model Hydrangea (DEF-focus, no DEF
 * override) would be the outlier, possibly because her DEF slope was only ever
 * back-derived from a narrow, noisy 4-level window that could easily have missed a
 * small override - not yet confirmed either way.
 *
 * cpOffset left at 0 and NOT populated - see CP_FORMULA's caveat above.
 */
export const MARIGOLD: FairySpecies = {
  id: "marigold",
  name: "Marigold",
  element: "Earth", // CONFIRMED via fairies.json reference list (id 7, "Margarida" - confirmed by the user to be the game's official EN/PT name pairing for Marigold, not a mismatch)
  rarity: "SSR",
  focusAttribute: "DEF", // inferred from override pattern - TODO confirm with user
  minStars: 6, // CONFIRMED: SSR fairies are born at 6 stars, never lower
  baseStats: { ATK: 180.9, HP: 2010.0, DEF: 221.1 },
  growthSlope: { ATK: 0.9, HP: 10.0, DEF: 1.1 },
  initialMaxLevel: 80,
  levelOneOverrides: {
    1: { HP: 2000, DEF: 220 }, // ATK's smooth value already floors to the displayed 180
  },
  progressions: [],
  cpOffset: 0,
};

/**
 * Focus: ATK - INFERRED, not yet user-confirmed. HP (base 2460, slope 12.0) and DEF
 * (see below) are solid. ATK is NOT: the lvl1-5 window originally looked like an exact
 * slope-1.0 fit (216,217,218,219 - integer steps every level), but that was a floor-
 * rounding illusion. Blind predictions at lvl20/40/80 using slope 1.0 came back
 * systematically low (234 vs actual 235, 254 vs 256, 294 vs 298 - a growing gap, the
 * signature of an accumulating slope error, not noise). CONFIRMED CORE METHODOLOGICAL
 * LESSON: a short span can fit a slope "exactly" (zero residual) while still being
 * measurably wrong - floor rounding hides fractional slope error until it's compounded
 * over enough levels to spill into a visible +1. Don't trust a narrow-window "exact"
 * fit for extrapolation without at least one confirming point far from that window.
 *
 * Refit using every point since confirmed correct (lvl1 override, lvl2-5, lvl10, lvl20,
 * lvl40, lvl80 - 9 points) plus the override-formula constraint: still genuinely
 * UNDERDETERMINED - floor data at this density admits a small family of close slopes
 * (~1.042 to ~1.09) that all satisfy every known point. Using 21/20 = 1.05 here as the
 * cleanest small-denominator candidate (base pinned to the tight end of its feasible
 * range, 215.05, same convention as DEF below) - a working estimate, not a settled
 * constant. Levels outside the 9 confirmed ones (e.g. lvl30, 50, 60, 70) may be off by
 * exactly the kind of error that just got caught; treat this as reasonably reliable, not
 * exact, until an untested intermediate level is checked.
 *
 * ATK+HP overriding with DEF clean matches Lotus/Erythrina/Chestnut-rose's signature
 * (all ATK-focused), not Balloon-flower's HP-only one - hence ATK focus here, not HP.
 * (Also corrects an earlier pass that mistakenly flagged this as HP-focus, from checking
 * the override formula against a since-superseded r=1/201 reconstruction.)
 * Foxglove's own rate (ATK ~1/205, HP 1/205) does NOT match 1/201 the way
 * Erythrina/Balloon-flower/Marigold did - 1/201 is evidently a common rate among some
 * fairies, not a universal default.
 *
 * DEF: exact-fraction search over the 5 lvl1-5 points finds a UNIQUE rational slope of
 * 3/4 (0.75), with base constrained to [153.75, 154) - confirmed correct at lvl10/20/
 * 40/80, unlike ATK's same-shaped narrow-window fit. Stored as the lower bound, 153.75;
 * still no lvl1 override needed, floor(153.75) = 153 matches the displayed value
 * directly.
 *
 * cpOffset left at 0 and NOT populated - see CP_FORMULA's caveat above.
 */
export const FOXGLOVE: FairySpecies = {
  id: "foxglove",
  name: "Foxglove",
  element: "Earth", // CONFIRMED via fairies.json reference list (id 25, "Dedaleira") + user ID - corrects the earlier unconfirmed "Water" guess
  rarity: "SSR",
  focusAttribute: "ATK", // inferred from override pattern - TODO confirm with user
  minStars: 6, // CONFIRMED: SSR fairies are born at 6 stars, never lower
  baseStats: { ATK: 215.05, HP: 2460.0, DEF: 153.75 },
  growthSlope: { ATK: 1.05, HP: 12.0, DEF: 0.75 },
  initialMaxLevel: 80,
  levelOneOverrides: {
    1: { ATK: 214, HP: 2448 }, // DEF's smooth value already floors to the displayed 153
  },
  progressions: [],
  cpOffset: 0,
};

export const FAIRY_SPECIES: FairySpecies[] = [
  LOTUS,
  ERYTHRINA,
  HYDRANGEA,
  BALLOON_FLOWER,
  CHESTNUT_ROSE,
  MARIGOLD,
  FOXGLOVE,
];
