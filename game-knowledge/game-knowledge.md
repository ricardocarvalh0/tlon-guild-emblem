# Game Knowledge

## Char
Char can level up from 1 to 280

### Attributes
There are 4 types of attributes: basic, advanced, additional pvp, additional pve

#### Basic Attributes
The character's attributes are accessible from the Equipment. Each attribute is helpful for your adventure.
- HP: Your core stat. When the HP is 0, the character is defeated.
- Attack: When launching an attack, ATK is the benchmark for this damage.
- Defense: Defense can directly reduce the damage you received.
  
#### Advanced Attributes:
Advanced attributes are more rare than basic attributes; their effect will scale with the basic attributes.

1. Pierce/Protection
- Pierce Rate: Guaranteed to trigger Pierce effect when attacking, which will ignore the Defense Rate of target. The 
amount ignored is equal to the value of Pierce Rate.
- Protection Rate: Protection Rate and Pierce Rate can offset each other. Increasing Protection Rate can reduce the 
pierce effect of attacker bu the same amount of Protection Rate.

2. Critical/Tenacity
- Critical Rate: Primarily affected by Crit value. Chance to trigger a critical hit during ATK. Critical hits deal
150% damage. The higher the level, the lower the Crit Rate converted from Crit attribute. The final Crit Rate is 
influenced by enemy Crit Immunity Rate and level. Example: A char at level 262 with crit value of 59928 has crit rate of
139.68%. Meaning when attacking a target of the same level, there is a chance of 139.68% to deal 150%+CritDmg% damage.
- Critical Immunity Rate: Primarily affected by Tenacity. Counters Crit Rate to reduce the chance of receiving a 
critical hit.Can offset each other with Crit Rate. The higher the level, the lower the Crit Immunity Rate converted 
from Tenacity attribute. Example: a char at level 262 with Tenacity of 55047 has 128.31% of crit immu rate. When attacked by a target 
of the same level, can reduce the probability of taking Crit in 128.31%.
- Crit DMG Bonus: Increases damage dealt when landing a critical hit.
- Crit DMG Reduction: Reduces damage taken from critical

3. Block/Break
- Block Rate: Block Rate is primarily affected by Block. The chance to trigger a Block when attacked. When triggered, 
reduces damage taken by 50%. The higher the level, the lower the Block Rate converted from Block attribute. Final Block 
Rate is affected by the enemy's Break Rate and level. Example: a char at 262 level with Block=63278 has a block rate of 
147.49%. Meaning, when attacked by a target of the same level, there is a chance of 147.49% to trigger Block, reducing 
50% damage.
- Break Rate: Break Rate is primarily affected by Break. The higher the level, the lower the Break Rate converted from
Break attribute. Counters Block Rate, reducing the enemy's chance to Block. Example: a char at level 262 with Break value
of 49163 has 114.59% of Break rate. Meaning, when attacking a target of the same level, reduces the target's Block Rate
by 114.59%.

4. Block: dmg red, ignorance, recovery, recovery suppression
- Block Damage Reduction: After triggering Block, damage taken can be reduced by a certain percentage. 
- Block Ignorance: When dealing damage to target, if the target triggers Block effect, the damage reduced will be offset 
based on Block Ignorance attribute.
- Block Recovery: After triggering Block, HP of blocked damage can be recovered by a certain percentage.
- Block Recovery Suppression: When dealing damage, reduces the target's HP recovery from Block effects if triggered.

5. Increase/Decrease dmgs
- Life Steal Rate: Regenerates character's HP when dealing damage, and single-target attack and group attack have 
different healing effect.
- Damage Increase: Increases damage dealt by character by percentage, with Defense calculated.
- Damage Reduction: Reduces damage taken by character by percentage, with Defense calculated.
- Class Damage Increase: Increases damage dealt by Class Skills by a percentage.
- Class Damage Reduction: Reduces damage from Class Skills by a percentage.
- Flower Fairy Damage Increase: Increases damage dealt by Flower Fairy attacks by a percentage.
- Flower Fairy Damage Reduction: Reduces damage from Flower Fairies by a percentage.
- Formation Attribute Bonus: Derived from the Seal and Grafting Systems, it represents the percentage of Flower Fairy 
attributes applied to the Character's battle power from both active and support  Flower Fairies.

#### PvP Additional attributes
PvP Additional Attributes are unique attributes that on trigger when fighting other adventurers.

- DMG dealt to Adventures increased: Increase DMG dealt to other Adventurers.
- DMG from Adventurers reduced: Reduce DMG taken from other Adventurers.
- Debuff Mastery: The duration of non-control debuffs inflicted on the adventurer is increased, and damage dealt to the
adventurer subiect to control buffs (Stun. Silence.
- Debuff Resistance: The duration of non-control debuffs inflicted by the adventurer is reduced, and when the character 
is subject to control buffs (Stun, Silence, Immobilize, Taunt, Slumber, Weaken), damage taken from the adventurer is 
reduced.
- One Heart: Your skill damage is improved when allied Adventurers are nearby.
- Break Free: If there are two or more enemy Adventurers around, DMG taken from skill damage will be reduced.

### Attribute Calculations
The game rarely states formulas outright, so this section is built by reverse-engineering the worked
examples scattered through the Attributes section above. Entries here are hypotheses, not confirmed
mechanics, until backed by enough data points — each one notes its confidence and what more data would
confirm/refute it.

#### Rate conversion (raw attribute -> effective %)
Hypothesis: Crit Rate, Crit Immunity Rate, Block Rate, and Break Rate are all produced by the **same**
"raw value -> %" conversion function, parameterized only by character level (not by which attribute it
is). Evidence: at level 262, all four known examples convert at the same ratio:

| Attribute | Level | Raw value | Rate  | Rate / value |
|---|---|---|---|---|
| Crit            | 262 | 59928 | 139.68% | 0.00233080 |
| Tenacity         | 262 | 55047 | 128.31% | 0.00233092 |
| Block            | 262 | 63278 | 147.49% | 0.00233083 |
| Break            | 262 | 49163 | 114.59% | 0.00233082 |

The four ratios agree to within 0.005% of each other (essentially identical, rounding-level noise) -
i.e. at level 262, roughly **429 raw points = 1% rate**, no matter which of these four attributes.

Not yet confirmed:
- How this divisor (~429 at level 262) scales with level. The doc's prose says higher level -> lower
  rate per point, so the divisor should grow with level, but we only have one level's worth of data
  (262), so the shape of that curve (linear? logarithmic? stepped per level bracket?) is unknown.
- Whether Pierce Rate / Protection Rate follow the same shared formula (no worked example given yet for
  either).
- What determines the source value for each attribute, i.e. is "Crit" a single stat itself, or a
  derived/summed value from gear+buffs (in the examples it's a raw number, not a %).

To pin the level-scaling down we need more (level, raw value, resulting %) tuples, ideally the same
attribute at multiple levels, or several different attributes at one other level as a cross-check.

#### PvE Additional Attributes
PvE Additional Attributes are unique attributes that only trigger when fighting monsters.

- Apeiron Suppression: Greatly increases damage dealt to the Elemental Shields of non-elemental monsters, and enhances 
the Adventurer's [DMG Boost against Bosses].
- Fire Suppression: Greatly increases damage dealt to the Elemental Shields of monsters vulnerable to Fire, and enhances
the Adventurer's [DMG Boost against monsters vulnerable to Fire]
- Water Suppression: Greatly increases damage dealt to the Elemental Shields of monsters vulnerable to Water, and enhances
the Adventurer's [DMG Boost against monsters vulnerable to Water].
- Wind Suppression: Greatly increases damage dealt to the Elemental Shields of monsters vulnerable to Wind, and enhances
the Adventurer's [DMG Boost against monsters vulnerable to Wind].
- Earth Suppression: Greatly increases damage dealt to the Elemental Shields of monsters vulnerable to Earth, and enhances
the Adventurer's [DMG Boost against monsters vulnerable to Earth].
- DMG to Boss increased: Increase DMG dealt to Bosses.
- DMG from Boss reduced: Reduce DMG taken from Bosses.
- DMG dealt to monsters vulnerable to Fire element increased: Increases DMG dealt to monsters vulnerable to Fire element.
- DMG dealt to monsters vulnerable to Water element increased: Increases DMG dealt to monsters vulnerable to Water element.
- DMG dealt to monsters vulnerable to Wind element increased: Increases DMG dealt to monsters vulnerable to Wind element.
- DMG dealt to monsters vulnerable to Earth element increased: Increases DMG dealt to monsters vulnerable to Earth element.

## Attribute Sources
The char's attributes (documented above) are aggregated from several distinct sources. Each source has
its own internal system and is complex enough to warrant its own deep-dive before covering how it feeds
into the char. Covered so far: Fairies.

### Fairies
Also called "Flower Fairy" elsewhere in this doc (see Advanced Attributes: Flower Fairy Damage
Increase/Reduction, and Formation Attribute Bonus, which is "the percentage of Flower Fairy attributes
applied to the Character's battle power from both active and support Flower Fairies" - not yet explained,
depends on the Seal and Grafting Systems, TBD).

#### Fairy Properties
A fairy has:
- Element: one of Fire, Water, Wind, Earth, Holy
- Rarity: SR or SSR
- Current Level / Max Level
- Ascension: measured in stars, cap confirmed at 18. The act of raising its ascension (star count) is
  called "Ascend". Confirmed to be a **separate system from Progression** (does not touch level, growth
  rate, or special attributes) - see dedicated Ascend section below for what it does.
  **CONFIRMED, major correction: SSR fairies are born at 6 stars and never go below it** - true range for
  SSR is 6-18, not 1-18. Every "1-star" / "star 1" mention anywhere in this doc or the codebase that
  predates this discovery actually meant "the species' floor" (6 stars, for every fairy documented so far -
  all SSR), not literally 1 star. This was discovered mid-session, after extensive ascend-curve work on
  Chestnut-rose using labels "star 1" through "star 5" for what are actually true stars 6 through 10.
  **Practically, almost nothing needed to be redone**: all growth/leveling data (baseStats, growthSlope,
  overrides, progressions) describes behavior at a fixed star count regardless of what that count truly is
  (Ascend is confirmed not to change growth slope), so those values are unaffected, just relabeled in
  comments from "1-star" to "6-star (SSR floor)". CP fitting is also unaffected (raw displayed values, no
  star-count dependency). What DID need a real fix: `FairySpecies` gained a `minStars` field (6 for every
  SSR species) marking each species' floor, and `computeBasicAttributes` in `fairyCalc.ts` now checks
  `stars > minStars` (not `stars > 1`) and passes ascendCurve a star count relative to that floor - without
  this, a correctly-labeled `FairyInstance.stars: 6` (a fresh SSR fairy, no ascends) would have wrongly
  triggered the ascend-multiplier branch and applied a curve fit for "1-star" to a true 6-star base,
  producing badly wrong results. SR fairies' floor is unconfirmed (no SR fairy sampled yet) - do not assume
  1 by default; `minStars` must be set explicitly per species. Fixing this also surfaced and fixed an
  unrelated pre-existing bug: `computeBasicAttributes`'s final floor step had no epsilon guard, so a
  curve value landing exactly on an integer (e.g. Chestnut-rose DEF at true 9-star, exactly 408) could
  floor one too low (407) purely from floating-point representation error (`1/72` isn't exact in binary) -
  fixed with a `1e-9` epsilon before flooring, far below any real fractional difference seen in this game.
- Focus Attribute: one of the three Basic Attributes (ATK/HP/DEF) a fairy is themed around (Lotus's is
  ATK). Confirmed NOT to mean "grows faster" - Growth Rate applies uniformly to all three Basic
  Attributes (see below) - and confirmed NOT to determine which attribute Progression's special attribute
  bonus lands on (that varies per progression, not tied to focus). Its actual mechanical effect, if any,
  is still unclear - may be purely thematic/cosmetic.
- Combat Power: a single aggregate number, built from the fairy's Basic Attributes. Partially
  reverse-engineered, see below.
- Growth Rate: a percentage that scales how much the Basic Attributes increase per level ("Upgrade").
  Starts at 100%, increases via Progression.
- Basic Attributes: ATK, HP (also referred to as "PV"), DEF
- Special Attributes: flat, permanent bonuses unlocked via Progression (below) - never change once
  granted, and confirmed to be tracked **separately from the Basic Attribute they're named after** (a
  +200 ATK special attribute does NOT add into the base ATK stat's displayed value). Whether/how a
  Special Attribute contributes to Combat Power is still unknown. Drawn from a pool that overlaps with
  the char's own attributes: ATK, DEF, PV(HP), Block, Break, Crit, Tenacity (possibly more - only these 7
  confirmed so far).
  **CONFIRMED, exact formula for the VALUE granted (from a 53-fairy reference-list cross-check, see
  `game-knowledge/fairies-json-analysis.md` Chunk 3): `value = base_unit(fairy) x multiplier(type, slot)`.**
  PV/Attack/Defence ("Fixed pool") always multiply by 10x/1x/1x regardless of which progression slot
  (lvl81/161/241/321) they land in. Crit/Tenacity/Break/Block ("Advanced pool") multiply by 1x at
  lvl81/161, 1.5x at lvl241, 3x at lvl321 - i.e. Advanced-pool rolls get MORE valuable the later they're
  granted, Fixed-pool ones don't. `base_unit` is fairy-specific and correlates with the fairy's overall
  power tier. Zero exceptions across 212 checked readings. Still unknown: what determines WHICH type
  gets picked for a given slot (structurally constrained - PV/Attack never appear past lvl161, Block
  never appears at lvl81 - but not yet a formula for the choice within the eligible set).
- Passive/Active Skills: TBD, to be added later
- Companionship (Intimacy): a per-fairy relationship level, 1-15, raised by giving the fairy gifts/food.
  Independent of Upgrade/Progression/Ascend. See dedicated section below.

#### Companionship (Intimacy)
A separate system from Upgrade/Progression/Ascend: raising a fairy's Intimacy level (1-15) via
gifts/food. Per the user:
- Each Intimacy level-up grants **+1% to the fairy's Basic Attributes** (ATK/HP/DEF).
- At **max Intimacy (level 15)**, the total bonus is a **14% multiplier** on Basic Attributes - i.e. 14
  level-ups from level 1, at +1% each, matching the simple additive total (not compounding).
- **Erythrina is at max Intimacy (15)**; every other fairy sampled so far (Lotus, Hydrangea) is at
  Intimacy level 1 (no bonus). **Confirmed at max (15) for the entire data-collection period** - the user
  confirmed she was already at max Intimacy from the very first sample (lvl 1-5), so no comparison within
  her dataset (including the 1-star vs 3-star slope check) crosses an Intimacy change.
- **Confirmed via in-game UI, not just inferred:** the Basic Attributes section shows a breakdown line
  under ATK/HP/DEF listing the % bonus currently applied, and it reads **14%** for Erythrina - matching
  the 14-level-ups-at-1%-each math exactly.

**CONFIRMED via a genuinely clean control sample:** the user has a *second, independent* Erythrina (on a
different owned character) at Companionship level 1, and provided her lvl 1-5 readings at 1-star,
growth-rate 100% - directly comparable to the original (Companionship-15) Erythrina's lvl 1-5 readings at
the same star/growth-rate. Raw source: `erythrina.js` (rows tagged `companionshipLvl: 1` vs `15`). This
resolved every open question from the first pass:
- **Companionship level 1 = 0% bonus, confirmed numerically** (not just assumed): the clean lvl1 reading
  (CP 4000, ATK 480, HP 800, DEF 40) is exactly what you get working backward from the boosted lvl1
  reading (547/912/45) via `floor(clean * 1.14)` - see next point.
- **Confirmed: the +% applies as a flat multiplier directly on each Basic Attribute's continuous value at
  every level, not just once to a tier-start base.** Checking `floor(clean_ATK/HP/DEF(lvl) * 1.14)` against
  the actual Companionship-15 reading at the same level, for all 5 levels (1-5): matches exactly on 13 of
  15 attribute readings, off by exactly 1 (ordinary floor-chaining noise - flooring the already-floored
  clean value, then flooring again after multiplying) on the other 2. This is a clean, strong confirmation
  - `displayed(lvl) = floor(continuous_growth(lvl) * (1 + companionship_bonus))`.
- **Confirmed: Combat Power does NOT get the same flat multiplier.** `floor(4000 * 1.14) = 4560`, but the
  actual Companionship-15 CP at lvl1 is 4416 - only a ~10.4% effective bump, not 14%.
- **Retroactive impact, corrected:** Erythrina's *previous* fairy-specific slope numbers (2.733/4.578/0.222
  ATK/HP/DEF, measured only on Companionship-15 data) were indeed Intimacy-inflated, exactly as suspected.
  Her true clean slope is now measurable directly from the Companionship-1 data - see Cross-fairy check:
  Erythrina below for the numbers and the remaining small tension in the estimate.

**MAJOR FINDING, contradicts the assumption above: Combat Power may be entirely decoupled from
Companionship's attribute bonus, at least at low levels.** Same fairy instance (the clean/Companionship-1
Erythrina), leveled to 20, then Companionship raised 1 -> 2 -> 3 with a reading at each step, level held
fixed at 20:

| Companionship | CP   | ATK | HP  | DEF |
|---------------|------|-----|-----|-----|
| 1             | 4300 | 528 | 880 | 44  |
| 2             | 4300 | 532 | 888 | 44  |
| 3             | 4300 | 537 | 897 | 44  |

ATK/HP again match the +1%-per-level model almost exactly (comp2 predicted 533/888/44 vs actual 532/888/44;
comp3 predicted 538/897/44 vs actual 537/897/44 - matching the pattern from the lvl1-5 check, tiny ATK
floor noise only). **But CP is bit-for-bit identical across all three rows** - 4300, 4300, 4300 - despite
ATK visibly climbing. Plugging the ATK delta into the CP formula predicts +23 CP at comp2 and +52 CP at
comp3; actual delta is exactly 0 both times. This is far too large and too consistent to be floor noise -
it's a real null result, not measurement error.

**RESOLVED - it's a UI staleness bug, not a real decoupling.** The user then leveled this same fairy
20 -> 21 (still Companionship 3), specifically to test whether an unrelated stat-changing action would
force a refresh: `lvl 21, companionship 3, CP 4371, ATK 540, HP 901, DEF 44`. This reading fits the
standard formula (boosted attributes, same `a*ATK + c*DEF + d` + Erythrina's own small offset - see
Cross-fairy check: Erythrina below) almost exactly - predicted CP 4366.4 vs actual 4371, off by only
4.6, well within normal noise. Extrapolating the *clean* (Companionship-1-equivalent) CP trend to lvl21
gives 4315 - so the "true" Companionship-driven CP gain at this point is +56, not 0. **Conclusion: raising
Companionship alone does update the fairy's real underlying CP correctly, but the game's displayed CP
value doesn't visually refresh until some other stat-changing action (like Upgrade) is performed** - the
flat 4300/4300/4300 reading across Companionship 1->2->3 was stale UI, not the true value. This joins the
already-documented Ascend-preview-UI-bug as a second confirmed case of **this game's CP display being
unreliable and requiring a "poke" (e.g. a level-up) to force a correct recompute** - don't trust a CP
reading taken immediately after a Companionship change without also changing something else (or
re-entering the fairy's screen) first.

#### Growth Rate (confirmed formula, with an important correction)
Growth Rate is a direct multiplier on each Basic Attribute's per-level slope, where the slope always
scales off the *original* 100%-tier base slope (ATK 2.4/lvl, HP 3.5/lvl, DEF 0.25/lvl), not the previous
tier's already-scaled slope (in practice these give the same number, since growth rate is stated as an
absolute percentage each time, not a relative bump).

**Critical detail, confirmed via the lvl 160->161 tier boundary:** the game tracks each Basic Attribute as
one continuous (unfloored) piecewise-linear function across a fairy's entire level range. Only the
*displayed* stat is floored - every level, including tier-boundary levels. When a new tier starts, its
formula continues from the previous tier's **true continuous value**, not from the previous tier's
*displayed* (already-floored) value. These two usually look identical because most tier-boundary levels
happen to land on an exact integer anyway - but not always, and when they don't, re-basing from the
displayed value gives a wrong answer:
- At lvl 160 (end of the 140%-growth-rate tier), ATK's true continuous value is
  691 + 3.36*80 = 959.8, which displays as floor(959.8) = **959** (matches the actual reading).
- At lvl 161 (start of the 200%-growth-rate tier), naively re-basing from the *displayed* 959 gives
  959 + 4.8*1 = 963.8 -> floor 963 - **which is wrong** (actual reading is 964).
- Continuing from the *true* 959.8 instead gives 959.8 + 4.8*1 = 964.6 -> floor **964** - correct.
- HP and DEF didn't expose this bug because their lvl 160 continuous values happened to be exact integers
  (1400.0 and 100.0), so naive re-basing and correct carry-forward gave the same answer there. ATK's did
  not (959.8), which is what surfaced the issue.

**Implementation implication:** any calculator/simulator for this game must track the full-precision
continuous value across a fairy's whole level range and only floor for display - never floor-then-reuse
an intermediate tier-boundary value as the next tier's base.

General formula per growth-rate tier, using continuous (unfloored) values throughout:
`stat_continuous(lvl) = stat_continuous(tier_start_lvl) + base_slope * (growth_rate / 100%) * (lvl - tier_start_lvl)`,
with `stat_displayed(lvl) = floor(stat_continuous(lvl))` applied only at the end, for any level you want to read out.

#### Progression
A separate operation from both Upgrade (leveling) and Ascend (stars). Unlocks once a fairy reaches its
current Max Level, consumes unspecified game resources, and:
1. Raises Max Level (Lotus: 80 -> 160 on first progression)
2. Raises Growth Rate for future levels (Lotus: 100% -> 140%, see confirmed formula above)
3. Unlocks one Special Attribute - a flat, separately-tracked bonus from the pool listed above.
   **Confirmed: the type varies per progression** - it is not always the fairy's Focus Attribute (Lotus's
   first happened to be +200 ATK, matching its ATK focus, but that's coincidence, not a rule). What
   determines the type (random? player choice? fixed sequence per fairy?) is not yet known.
4. **Confirmed: also auto-advances the fairy's level by 1** (Lotus went from lvl 80 to lvl 81 upon
   progressing, no separate Upgrade action was taken - confirmed by the user directly).

Lotus's progressions so far:
- **1st:** Level 80 -> 81, Max Level 80 -> 160, Growth Rate 100% -> 140%, Special Attribute +200 ATK,
  Combat Power 5319 -> 6336. Basic Attributes at lvl 81 (base values, excluding the +200 special
  attribute): ATK 694, HP 1012, DEF 72.
- **2nd:** Level 160 -> 161, Max Level 160 -> 240, Growth Rate 140% -> 200%, Special Attribute +200 Block
  (a *different* type than the 1st - confirms type varies per progression is a real pattern, not a
  one-off), Combat Power 7995 -> 10024 (matched the game's own pre-progression estimate exactly). Basic
  Attributes at lvl 161: ATK 964, HP 1407, DEF 100 (DEF unchanged from lvl 160, same as the lvl 80->81
  transition where DEF also didn't move for 1 level - consistent with DEF's small slope).

Both max-level jumps so far are exactly **+80** (80->160, then 160->240 - a constant absolute increase,
not a doubling; the fact that the 1st one also happened to double the cap was a coincidence of starting
at 80). Both progressions auto-advanced level by exactly 1 (confirmed twice now, so treat as a reliable
rule). Growth rate jumps have been +40pp then +60pp (140->200) - not constant, increasing per tier.

Open questions: is there a cap on the number of progressions? What determines a progression's special
attribute type (random? player choice? a fixed per-fairy sequence)? Does the growth-rate jump keep
increasing (+40, +60, ...) in a predictable pattern, or was that a coincidence of just two samples?

#### Ascend
Raises Ascension (star count).
- **Does not change** level, growth rate, or special attributes - purely a Basic Attribute / Combat Power
  boost. This is what makes it a genuinely separate system from Progression (which changes level, growth
  rate, AND special attributes, but never touches Ascension).
- **The game's own preview UI can be unreliable - don't trust it blindly.** Erythrina's ascend preview was
  wrong both times tested (1->2 and 2->3 star): claimed "before" values that never matched her actual
  current stats, and promised "after" ATK/HP/DEF that never matched the actual result either - only the
  previewed Combat Power was accurate, both times. Hydrangea's preview, by contrast, matched exactly both
  times tested. Since each fairy has been consistently right or consistently wrong across multiple tests,
  this looks like a **per-fairy(or per-save-state) UI/caching bug rather than a random glitch** - but
  either way, always confirm against the actual post-action reading rather than trusting the preview.
- **Confirmed: Ascend applies one uniform ratio to all three Basic Attributes** (like Growth Rate does).
  Hydrangea's lvl 1 test showed an exact 1.8x on ATK, HP, *and* DEF with zero rounding fuzz. Erythrina's
  lvl 50 test showed ATK/HP matching each other (~1.64x) with DEF drifting slightly higher (~1.66x) - now
  understood as a floor-rounding artifact: lvl 1 stats are a fixed override with no fractional remainder
  (see the resolved early-level rule above), so Hydrangea's multiplication floors cleanly, while Erythrina's
  lvl 50 DEF sits on the continuous growth curve and likely carries a small hidden fractional part
  (consistent with the confirmed "continuous value persists internally, only display floors" rule from
  Growth Rate) that shifts the floored result slightly. **Revised conclusion: DEF does NOT get a different
  ascend ratio than ATK/HP - the earlier apparent divergence was rounding noise, not a real effect.**

| Fairy | Level | Stars | ATK ratio | HP ratio | DEF ratio | CP ratio |
|-------|-------|-------|-----------|----------|-----------|----------|
| Erythrina (Fire, ATK-focus) | 50 | 1->2 | x1.6398 | x1.6395 | x1.6607* | x1.6144 |
| Erythrina (Fire, ATK-focus) | 50 | 2->3 | x1.4893 | x1.4880 | x1.4839* | x1.4613 |
| Hydrangea (Water, DEF-focus) | 1 | 1->2 | x1.8 (9/5) | x1.8 | x1.8 | x1.725 |
| Hydrangea (Water, DEF-focus) | 1 | 2->3 | x1.5556 (14/9) | x1.5556 | x1.5556 | x1.5065 |

*small ATK/HP/DEF divergence attributed to floor-rounding noise from Erythrina being on the continuous
growth curve (level 50), not a genuine per-stat difference - see explanation above; confirmed uniform
ratio across ATK/HP/DEF holds cleanly whenever tested at level 1.

**CONFIRMED (out-of-sample validated): cumulative Basic Attribute growth vs. a reference value is quadratic
in star count.** **Correction to how this reference value works, found via Erythrina's post-ascend leveling
(see Ascend x Upgrade interaction below): the ascend multiplier applies to whatever the stat's CURRENT
value is at the exact moment of ascending - not always "the level-1 base."** They only coincide when a
fairy is ascended while still at level 1 (true for every Hydrangea sample so far, which is why the
"star-1 base" framing worked for her specifically - Erythrina ascended at level 50, and her star-3 value
relates cleanly to her *level-50* value at 1-star (683 -> ratio 2.44), not her level-1 base (547, gives an
unclean 3.05x)). With that correction: each stat's value at every star tier is a clean multiple of
whatever it was immediately before ascending, with ATK/HP/DEF moving together. For Hydrangea (ascended at
level 1, clean/exact): star 1 = 1.0x, star 2 = 1.8x, star 3 = 2.8x, giving the closed form
**`cumulative(N) = (N+1)(N+4) / 10`** fit from stars 1-3. **This was then tested against star 4 - a
genuine out-of-sample point not used in the fit - and matched exactly**: predicted 720/6800/1000, actual
ATK 720 / HP 6800 / DEF 1000, zero error. The formula is no longer just "fits 3 points because any
quadratic can" - it's a validated predictive model.
**Combat Power also follows its own quadratic curve in star count** (less exact than the raw-stat one,
consistent with CP being a derived quantity rather than a directly-authored game constant): fit from
stars 1-3 (ratios 1, 1.725, 2.59875) predicted star 4's CP at 14485; actual was 14500 - off by 15
(0.1%), well within normal rounding noise.

For Erythrina (level 50, only 3 points so far, some floor noise): star 1 = 1.0x, star 2 ~= 1.64x, star 3
~= 2.44x - increments of +0.64 then +0.80, also growing, fitting its own quadratic
`cumulative(N) ~= 0.081*N^2 + 0.396*N + 0.523`. Not yet out-of-sample tested (would need her star 4) -
treat as provisional until validated the same way Hydrangea's was.

**Resolved: the quadratic *shape* is universal, but its coefficients are fairy-specific (or possibly
level-specific - see below), not shared game constants.** Both fairies independently show the same
"accelerating increment" pattern, but with clearly different numbers (Hydrangea's clean 0.1/0.5/0.4 vs
Erythrina's messier 0.081/0.396/0.523). **Practical implication for the app: each fairy likely needs its
own ascension curve calibrated from ~3 of its own data points (not necessarily consecutive), rather than
requiring all 18 star transitions measured individually per fairy, and a shared formula can't be assumed
across fairies.**

Still open: is the per-fairy quadratic truly fixed regardless of level (i.e. would Erythrina's ratio at
level 1 also be ~1.64x, matching what level 50 gave), or does the curve itself depend on level too? Not
yet distinguishable - both of Hydrangea's samples are level 1 and both of Erythrina's are level 50, so
fairy identity and level are still confounded in every sample collected so far. Also open: does the
coefficient depend on rarity or Focus Attribute (both fairies tested are SSR; Hydrangea is DEF-focused,
Erythrina is ATK-focused) - not enough diversity yet to tell.

**Combat Power gap keeps growing with star tier, and its growth looks roughly linear.** Comparing actual
CP against what the ATK/DEF-based formula predicts (using rough shared coefficients a~=5.85, c~=4.3,
d~=999): Erythrina's gap went 30 (star 1) -> 549 (star 2) -> 1071 (star 3) - increments of +519 then
+522, suspiciously close to each other. Hydrangea's gap also grew across its stars (star 2 ~1950-2160
short, star 3 ~3440 short). Working hypothesis: Ascension carries its own **direct** Combat Power
contribution, roughly linear per star, on top of its effect on Basic Attributes - similar in kind to how
Special Attributes had their own CP weight separate from the base stat. Not precise enough yet to state
an exact per-star CP bonus formula - the ~520/star reading for Erythrina is suggestive, not confirmed.

Open questions: does the ascend ratio change per star tier (1->2 vs 2->3 vs higher), similar to how
Progression's growth-rate jumps increased per tier (+40pp then +60pp)? Does the CP shortfall scale
predictably with star tier or fairy?

#### Ascend x Upgrade interaction
First data on what happens when leveling a fairy that's already been ascended. Hydrangea, 4-star
(validated ascend curve, cumulative multiplier 4.0x), leveled 1->2, 2->4 (lvl 3 sample lost), 4->5. Raw
source: `game-knowledge/hydrangea.js`.

| Level | CP    | ATK | HP   | DEF  |
|-------|-------|-----|------|------|
| 1     | 14500 | 720 | 6800 | 1000 |
| 2     | 14524 | 721 | 6817 | 1002 |
| 4     | 14557 | 723 | 6834 | 1005 |
| 5     | 14571 | 724 | 6842 | 1006 |

Fitting the slope from the cleanest interval (lvl 2->4) and testing against lvl 1 and lvl 5: **ATK fits
perfectly at 1.0/level, zero residual across all 4 points including lvl 1. DEF fits at 1.5/level within
normal floor tolerance everywhere (<=0.5).** But **HP shows a real lvl 1 anomaly again** - actual value is
8.5 below the fitted line, a full slope-increment, not rounding noise.

**Revises the earlier "level-1 override" rule - it is not consistently the same stats.** At 1-star
(Erythrina), the anomaly hit ATK and HP, not DEF. At 4-star (Hydrangea), it hits only HP, not ATK or DEF.
**Corrected rule: any of the three Basic Attributes may show a small level-1-of-a-tier deviation from the
smooth formula; which one(s) is not fixed across fairies or ascension tiers - always check each stat
independently rather than assuming a fixed subset.**

**RESOLVED, major finding: Ascend does NOT change the per-level growth slope - it is a one-time
multiplicative jump applied to the current stat value, and leveling afterward continues at the exact same
slope as before ascending.** Confirmed via Erythrina, who has a known 1-star slope (from lvl1-5/lvl50
data) and was then leveled again after reaching 3-star (lvl 50->80 data, this section). Comparing the two
directly, same fairy, same growth_rate (100%) throughout:

| Stat | 1-star slope | 3-star slope | |
|------|--------------|--------------|---|
| ATK  | 41/15 = 2.7333/lvl | 41/15 = 2.7333/lvl | **exact match** |
| HP   | 206/45 = 4.5778/lvl | 68/15 = 4.5333/lvl | differs by only -0.044 (noise-level) |
| DEF  | 2/9 = 0.2222/lvl | 7/30 = 0.2333/lvl | differs by only +0.011 (noise-level) |

ATK's slope is *exactly* the same rational number at both star tiers - not just close, identical to the
fraction. Modeling ascend as "jump the current value by the star's multiplier, then keep the ORIGINAL
slope" and predicting forward to lvl 80 from the lvl 50 post-ascend anchor gives ATK exactly right (0
error) and HP/DEF within ~1 (consistent with normal floor noise plus two likely data-entry typos in this
sample - ATK at lvl 53 and HP at lvl 54 both look off by more than anywhere else in the set and are
probably transcription errors, worth double-checking against the source).

**Practical implication for the app: no per-star growth slopes are needed at all.** A fairy needs only
ONE slope per Basic Attribute (measured at 1-star, growth rate 100%) - Ascend is a stat-value
adjustment applied once at whatever level it happens at (**"multiplier" here is now known imprecise -
see the correction below**, it's an additive bonus, not literally a multiplier), and Progression's
growth-rate-tier multiplier (confirmed earlier, e.g. 140%, 200%) is the only thing that actually
changes the slope going forward.

#### MAJOR CORRECTION: Ascend's bonus is additive, not multiplicative
Every "ascend ratio" / "cumulative multiplier" finding in this doc up to this point (Hydrangea's
`(N+1)(N+4)/10`, Erythrina's `0.081N^2+0.396N+0.523`, and all of Chestnut-rose's lvl400 star-curve work
below) was fit and described as a MULTIPLICATIVE ratio applied to the current stat value. This is
**confirmed wrong** - it's an artifact of every species being tested at only ONE fixed level, where a
flat additive bonus and a multiplicative ratio are numerically indistinguishable.

**The test that revealed it:** the same Chestnut-rose, same star transition (6->7 stars), measured at
two different levels/growth-rate tiers:

| Level | Growth rate | ATK 6-star | ATK 7-star | Ratio | Delta |
|---|---|---|---|---|---|
| 400 | 460% | 2417 | 2685 | 1.11088 | **+268** |
| 100 | 140% | 628 | 896 | 1.42675 | **+268** |

Same for HP (+832 both times) and DEF (+32 both times) - **exact** matches, not approximate. The ratio is
wildly different between levels (1.111 vs 1.427), but the absolute delta is identical down to the unit,
across two very different levels and growth-rate tiers. **Ascend grants a flat, level-independent
additive bonus per star - it does not scale with the fairy's current level-derived stat value at all.**

**Why this went undetected for so long:** every prior ascend curve (Hydrangea @ lvl1, Erythrina @ lvl50,
Chestnut-rose's whole star6-14 saga @ lvl400) was tested at a single, fixed level throughout. A flat
additive bonus B(N) expressed as a ratio at a fixed base V is just `1 + B(N)/V` - which fits a clean
quadratic in N exactly as well as a genuinely multiplicative ratio would, with no way to tell the two
apart from single-level data. It took deliberately re-testing the *same* transition at a *different*
level to expose the difference.

**Does this retroactively break anything?** No - every previous finding in this doc remains numerically
correct AS A DESCRIPTION OF THAT SPECIES AT THAT SPECIFIC LEVEL (Hydrangea @ lvl1, Erythrina @ lvl50,
Chestnut-rose's whole star-gap saga @ lvl400, including the still-unexplained ATK anomaly from stars
9-13 - re-deriving it in additive-delta terms reproduces the identical gaps, confirming it's genuinely
about the star-to-star bonus itself, not an artifact of the ratio framing). **What's wrong is using any
of these curves to predict a DIFFERENT level than the one they were fit at** - confirmed concretely: naively
applying Chestnut-rose's lvl400-fitted ratio (10/9 at star7) to her lvl100 DEF base (75) predicts 83;
the real value is 107.

**Not yet characterized:** the true additive delta-per-star curve, at a level/tier-independent level
(only the star6->7 transition has been cross-level-tested so far). Whether the still-open ATK anomaly
(stars 9-13 at lvl400) is lvl400-specific or shows up at lvl100 too is exactly what the in-progress
lvl100 ascend test (star6->7 done, continuing star-by-star) is designed to answer.

**Schema status: NOT reworked yet, per the user - kept as documented findings.** `FairySpecies.ascendCurve`
still stores the old multiplicative-ratio numbers, now with prominent warnings in the code that they are
confirmed wrong away from their fitted level. A proper fix would model Ascend as an additive delta curve
(delta(N) in absolute stat units, level-independent) rather than a ratio - not done yet, pending more
cross-level data to characterize the true shape (only 3 points exist for the additive model right now:
star6, and one cross-level-confirmed transition to star7).

#### Basic Attributes & Combat Power
Source data: "Lotus" (SSR fairy, Focus: ATK), Ascension fixed at 1 star throughout. Sampled at levels
1, 5, 20, 50, 80 (growth rate 100%, pre-progression), 81-85 and 160 (growth rate 140%, post 1st
progression, Special Attribute +200 ATK active), and 161 (growth rate 200%, post 2nd progression,
Special Attributes +200 ATK and +200 Block both active). Raw source: `game-knowledge/lotus.js`.

| Level | CP    | ATK | HP   | DEF | Special Attrs      |
|-------|-------|-----|------|-----|---------------------|
| 1     | 4119  | 499 | 728  | 52  | -                   |
| 5     | 4193  | 511 | 745  | 53  | -                   |
| 20    | 4419  | 547 | 798  | 57  | -                   |
| 50    | 4867  | 619 | 903  | 64  | -                   |
| 80    | 5319  | 691 | 1008 | 72  | -                   |
| 81    | 6336  | 694 | 1012 | 72  | +200 ATK            |
| 82    | 6354  | 697 | 1017 | 72  | +200 ATK            |
| 83    | 6381  | 701 | 1022 | 73  | +200 ATK            |
| 84    | 6399  | 704 | 1027 | 73  | +200 ATK            |
| 85    | 6416  | 707 | 1032 | 73  | +200 ATK            |
| 160   | 7995  | 959 | 1400 | 100 | +200 ATK            |
| 161   | 10024 | 964 | 1407 | 100 | +200 ATK, +200 Block|

**Confirmed: Basic Attribute per-level growth**, per the Growth Rate formula above (continuous values,
floored only for display):
- 100% tier (lvl 1-80): ATK +2.4/lvl, HP +3.5/lvl, DEF +0.25/lvl, from base (499, 728, 52)
- 140% tier (lvl 80-160): ATK +3.36/lvl, HP +4.9/lvl, DEF +0.35/lvl, continuing from the lvl-80
  *continuous* values (691.0, 1008.0, 72.0 - happen to be whole numbers here). Verified exactly against
  every one of lvl 81-85 **and the lvl 160 endpoint** (959.8/1400.0/100.0 continuous -> displays as
  959/1400/100, matching exactly).
- 200% tier (161-240): ATK +4.8/lvl, HP +7.0/lvl, DEF +0.5/lvl, continuing from the lvl-160 *continuous*
  values (959.8, 1400.0, 100.0 - note ATK's is NOT a whole number here). Verified against lvl 161: ATK
  959.8+4.8=964.6 -> displays 964 (correct - naively re-basing from displayed 959 would wrongly give 963,
  see Growth Rate section above), HP 1400+7=1407 -> 1407 (correct), DEF 100+0.5=100.5 -> 100 (correct).

**Partially resolved - the first level of a growth-rate tier can override the smooth curve, but WHICH
stat(s) it hits is not fixed.** Confirmed using a second fairy (Erythrina) with lvl 1-5 sampled
consecutively: ATK and HP both sit measurably below the fitted line *only* at level 1 (Erythrina:
ATK -2.07, HP -3.69 off the lvl5->50 line); by level 2 they're already within floor-rounding tolerance
(<0.8) of the same line that holds all the way to level 50 - DEF had no such override for Erythrina. So
the anomaly is isolated to the single starting level, not a multi-level ramp. **However, a later test
(Hydrangea, leveled at 4-star - see Ascend x Upgrade interaction below) showed the OPPOSITE subset: ATK
and DEF fit the smooth line perfectly even at level 1, while HP was the one with the anomaly.** Revised
rule: use the fairy's stated value for level 1 of a tier as a fixed override on a per-stat basis - check
each of ATK/HP/DEF independently against the fitted line rather than assuming a fixed pattern of which
stat(s) get overridden. Apply the linear growth formula from level 2 onward for whichever stat(s) show
the deviation.

**Combat Power - solved to a good approximation.** Earlier attempts failed for several reasons along the
way (see retracted attempts in prior discussion: pure level-only data was collinear; an early
progression-based attempt wrongly assumed only ATK changed). The full 12-point dataset - spanning two
different growth-rate tiers and two different Special Attribute types - finally gives enough independent
variation to regress properly. Fitting `CP = a*ATK + c*DEF + s_atk*SpecialATK + s_block*SpecialBlock + d`
(HP's weight is statistically indistinguishable from 0, excluded):

- **Base ATK: ~5.82 CP per point** (clusters near 35/6 ~= 5.833)
- **DEF: ~4.1 CP per point** (clusters near 4)
- **Special Attribute, ATK-type: ~5.00 CP per point** - extremely stable across every fit variant tried
- **Special Attribute, Block-type: ~10.00 CP per point** - cross-checked two ways (full regression, and
  direct isolation via the lvl 160->161 delta with DEF held constant) and both agree almost exactly
- **HP: ~0** - not distinguishable from noise; working hypothesis is HP doesn't factor into a fairy's own
  Combat Power at all
- **Intercept: ~999-1000**

All residuals stay under ~0.4 CP across the 12 points (one point, lvl 161, fits to within 0.00), well
within ordinary floor-rounding noise from several already-rounded inputs.

**Notable insight - Special Attribute weight depends on attribute type.** The Block-type Special
Attribute (~10.0/point) is worth almost exactly **double** the ATK-type one (~5.0/point), and both differ
from their respective "base stat" weights (base ATK ~5.82 vs Special ATK ~5.00 - not equal either).
Working hypothesis: Special Attributes drawn from the char's "Advanced Attribute" pool (Block, Break,
Crit, Tenacity) may carry a higher CP weight than ones drawn from the "Basic Attribute" pool (ATK, DEF,
PV) - consistent with Advanced Attributes generally being described as rarer/more impactful. Only one
data point per type so far, so this 2x pattern needs another Advanced-pool sample (Break, Crit, or
Tenacity) or another Basic-pool sample (DEF or PV) to confirm it's a real rule and not a coincidence.

**Not yet covered:** what Ascend (stars 1-18) actually does - confirmed to be a separate system from
Progression, but its effects on ATK/HP/DEF/CP/max level are still undocumented.

#### Cross-fairy check: Erythrina
Second fairy sampled, to check whether findings above are Lotus-specific or general rules. "Erythrina"
(SSR, Fire, also ATK-focused per the user), growth rate 100%, lvl 1-5 and lvl 50. Raw source:
`game-knowledge/erythrina.js`.

| Level | CP   | ATK | HP   | DEF |
|-------|------|-----|------|-----|
| 1     | 4416 | 547 | 912  | 45  |
| 2     | 4446 | 552 | 921  | 45  |
| 3     | 4463 | 555 | 925  | 45  |
| 4     | 4475 | 557 | 930  | 45  |
| 5     | 4497 | 560 | 934  | 46  |
| 50    | 5265 | 683 | 1140 | 56  |

This data is what confirmed the level-1-override rule above. **Superseded for slope purposes** - this
fairy was at max Companionship (Intimacy) throughout, see below; these exact slope numbers were inflated
by Intimacy and should not be used directly (see the clean re-test below, which also revises whether the
slopes are truly fairy-specific for every stat).

**Clean (Companionship-1) re-test - resolves the open Intimacy confound above, with high precision.** The
user provided a second, independently-owned Erythrina at Companionship level 1 (0% bonus, confirmed), same
1-star, growth-rate 100%, sampled at lvl 1-5, then 10/15/20:

| Level | CP   | ATK | HP  | DEF |
|-------|------|-----|-----|-----|
| 1     | 4000 | 480 | 800 | 40  |
| 2     | 4024 | 484 | 808 | 40  |
| 3     | 4041 | 487 | 812 | 40  |
| 4     | 4053 | 489 | 816 | 40  |
| 5     | 4075 | 492 | 820 | 41  |
| 10    | 4150 | 504 | 840 | 42  |
| 15    | 4225 | 516 | 860 | 43  |
| 20    | 4300 | 528 | 880 | 44  |

The level-1 override reproduces on this independent instance in the same subset as before (ATK and HP
below the smooth line at lvl1, DEF unaffected) - good evidence it's a species/template property, not
per-instance noise. **Fitting the much longer, more reliable lvl5->20 span gives exact, zero-residual
slopes: ATK 2.4/lvl, HP 4.0/lvl, DEF 0.2/lvl, CP 15/lvl** - every one of lvl 5/10/15/20 fits its own line
with **zero error**, no floor noise at all (unlike the noisy 4-level lvl1-5 window used in the first pass,
which gave slightly-off estimates of 2.667/4.0/0.333). **Notable: Erythrina's clean ATK slope (2.4/lvl) is
now an *exact* match to Lotus's (2.4/lvl)** - raising a real possibility that ATK's base slope (at
growth-rate 100%) might be a *shared* game constant across fairies, while HP (4.0 vs Lotus's 3.5) and DEF
(0.2 vs Lotus's 0.25) remain genuinely fairy-specific. Only 2 fairies tested so far, so treat as a
promising lead, not confirmed. This also resolves the earlier tension: the old boosted-slope-divided-by-1.14
estimate (2.397 ATK, 4.016 HP) was already close to these exact values, confirming Companionship really
does scale the growth slope proportionally, not just the base.

**Combat Power - resolved, in two passes.** First pass: plugging Lotus's fitted CP coefficients
(a=5.824, c=4.115, d=998.9) into this clean (0%-bonus) data undershoots actual CP by a remarkably constant
~41-42 at every level (40.98 up to lvl5; the same offset holds through lvl 20 too) - this retracts the
doc's earlier guess that the ~46-58 gap seen on the boosted data was a direct Companionship CP bonus, since
the same-sized gap is present at **zero** Companionship bonus. Most likely explanation: Lotus's fitted
a/c/d (only 3-4 significant figures) aren't perfectly exact, and/or Erythrina carries a small
fairy-specific CP constant (~41.5) unrelated to Companionship - `a*ATK + c*DEF + d + 41.5` fits her clean
data to within ~0.5 CP at every sampled level.

**Second pass, the real Companionship-CP relationship - also resolved, and it was a UI bug, not a
mechanic.** A same-instance test (Companionship 1->2->3 at fixed lvl20) initially showed CP frozen at 4300
despite ATK/HP visibly rising - looked like a genuine decoupling. The user then leveled that fairy 20->21
(still Companionship 3) specifically to test staleness, and got CP 4371, ATK 540, HP 901, DEF 44. Checking
this against `a*ATK + c*DEF + d + 41.5` (the same formula, Erythrina offset included): predicts 4366.4,
actual 4371 - off by only 4.6, normal noise. The clean (0%-bonus) CP trend extrapolated to lvl21 is 4315,
so the true Companionship-driven CP gain at comp3/lvl21 is +56, not the +0 the frozen reading implied.
**Conclusion: Companionship's attribute bonus does feed into CP via the same standard formula as
everything else in this doc - the flat 4300/4300/4300 reading was the game's CP display failing to
refresh on a Companionship-only change**, correcting itself once another stat-changing action (Upgrade)
was performed. This is the second confirmed case of unreliable CP/preview UI in this game (see the Ascend
preview-UI note above) - **don't trust a CP reading taken immediately after a Companionship change alone;
change something else (or re-enter the screen) first, or just compute it.**

#### Data model implementation (first pass)
A `FairySpecies`/`FairyInstance` schema and the compute pipeline described throughout
this doc are now implemented: `src/types/fairy.ts` (schema), `src/lib/fairyCalc.ts`
(computeBasicAttributes / computeCombatPower), `src/data/fairySpecies.ts` (Lotus,
Erythrina, Hydrangea populated from everything confirmed above). Validated against all
46 known raw readings across the three fairies (growth, progression, ascend,
Companionship, and their combinations) - 45/46 within the already-documented ±1
floor-chaining tolerance, the one exception being Erythrina's already-flagged ~5 CP
residual from her approximate cpOffset. Implementing it for real surfaced a few things
this doc hadn't fully articulated:

**Lotus's own data also has the level-1 override - it wasn't actually "clean."** Lotus's
lvl1 ATK/HP (499/728) sit below the smooth line fit from lvl5-80 (continuous anchor
501.4/731.5); the doc had implicitly treated Lotus as override-free and only called the
phenomenon out via Erythrina. Re-deriving Lotus's true continuous base properly (via the
same back-extrapolation, and cross-checked against the already-confirmed lvl160
continuous values) gives clean exact-fraction slopes throughout: ATK 2.4/lvl (12/5), HP
3.5/lvl (7/2), DEF 0.25/lvl (1/4), with continuous base (501.4, 731.5, 52.25).

**Refined override pattern, now with 3 species of data:** DEF has never shown a
level-1 override (0/3 - Lotus, Erythrina, Hydrangea all fit the smooth line exactly at
level 1). HP has shown it in every single case tested (3/3). ATK shows it in 2 of 3
(Lotus, Erythrina) but not Hydrangea. Still not predictable from first principles, but
noticeably more consistent than "any of the three, check independently" implied.

**The override is a display-only snapshot - it does NOT feed the internal continuous
trajectory.** Confirmed precisely while implementing Hydrangea's ascend+leveling
interaction: using her overridden lvl1 HP (1700) as the base for projecting forward to
lvl5 predicts 6833 (wrong - actual is 6842); using the un-overridden smooth continuous
value (1702.17) as the projection base predicts 6842.0 exactly. But the override DOES
get scaled by whatever Ascend/Companionship multiplier is active when the override's
own level is queried directly (Hydrangea's actual 4-star lvl1 HP, 6800, is exactly
1700 x 4.0 - the override value itself times the ascend multiplier, not the smooth
value times the multiplier). So the rule is: the override replaces the smooth value
only for direct display at its exact level (with normal Ascend/Companionship scaling
still applied to it); every other level - including the anchor used to project an
ascend forward - uses the smooth, un-overridden trajectory.

**Hydrangea's 1-star growth slope, back-derived for the first time.** She's never
actually been leveled while at 1-star (all her leveling data is post-ascend, 4-star).
Since Ascend is confirmed slope-invariant, her 4-star leveling slope (ATK 1.0/lvl exact,
zero residual including lvl1; HP/DEF from a narrow, noisier lvl2-5 window) *is* her
1-star slope - no rescaling by the ascend ratio needed for the slope itself (only the
level-1 anchor value gets divided through the ascend multiplier to recover the 1-star
base). ATK's fit is as clean as Lotus/Erythrina's; HP (~8.33/lvl) and DEF (~1.33/lvl)
are **low confidence**, resting on only a 4-level window - a good target for direct
1-star Hydrangea leveling data if she's ever available at 1-star again.

**CP formula refit at full precision** (the doc's earlier "~5.82/~4.1/~999" figures were
rounded for readability, which was accumulating into a consistent ~+1 CP bias once
actually implemented): a=5.8235673, c=4.1145601, s_atk=4.9979742, s_block=10.0004577,
d=998.9387163 - residuals back under 0.4 across all 12 Lotus points, matching the
original claim once the rounding is removed.

#### Cross-species check: Balloon-flower and Chestnut-rose
Two more SSR fairies, both Companionship-1/1-star/growth-rate-100%, sampled at levels
1,2,3,4,5,10,15,20,40,80 - the first data specifically gathered to test whether a new
fairy's lvl80 state is predictable from minimal info. Balloon-flower is the first
**HP-focused** fairy tested (previously only ATK- and DEF-focus existed); Chestnut-rose
is a third ATK-focused fairy. Raw sources: `game-knowledge/balloon-flower.js`,
`game-knowledge/chestnut-rose.js`.

| Fairy | Focus | Level | CP | ATK | HP | DEF |
|---|---|---|---|---|---|---|
| Balloon-flower | HP | 1 | 4000 | 150 | 3800 | 70 |
| Balloon-flower | HP | 80 | 5200 | 210 | 5320 | 98 |
| Chestnut-rose | ATK | 1 | 3400 | 402 | 1260 | 48 |
| Chestnut-rose | ATK | 80 | 4600 | 570 | 1780 | 68 |

**Likely data-entry typo flagged, not corrected:** Balloon-flower's lvl40 ATK reads 185
in the source file. Every other point (1,2,3,4,5,10,15,20,80) fits one clean line
(slope 3/4, continuous base 150.75) with zero deviation beyond the expected lvl1
override; that line predicts lvl40 ATK = 180 exactly. A 5-point miss standing alone
between two perfectly-fitting neighbors matches the shape of the earlier Erythrina
typos (lvl53 ATK, lvl54 HP) - worth double-checking against the source, but not
overwritten here per the earlier pattern of leaving correction to the user.

**MAJOR FINDING: each fairy has ONE shared per-level growth rate across ATK/HP/DEF, not
three independent slopes.** `growthSlope.X / baseStats.X` comes out to the *same* ratio
for X in {ATK, HP, DEF}, within one fairy:

| Species | ATK ratio | HP ratio | DEF ratio | Match |
|---|---|---|---|---|
| Erythrina | 1/201 | 1/201 | 1/201 | **exact, all three** |
| Balloon-flower | 1/201 | 1/201 | ~1/199 (noisy) | **exact, ATK & HP** |
| Lotus | 12/2507 | 1/209 | 1/209 | near-exact (~0.04% gap on ATK) |
| Chestnut-rose | 7/1347 | 13/2533 | 1/193 | close, ~1.3% spread |

DEF's small magnitude makes it the least reliable of the three to fit in isolation
(same issue seen throughout this doc), so the ATK/HP agreement is the strongest
signal. **Practical implication: a new fairy's growth doesn't need all three stats'
slopes measured independently - the lvl1 triple plus ONE clean slope measurement (any
single stat, any level beyond 1) is enough to derive the shared rate and predict all
three stats at any level, including lvl80.** This roughly halves what's needed to
calibrate a new species compared to the original assumption of three independent
slopes. The rate itself is fairy-specific and NOT determined by Focus Attribute - three
different ATK-focused fairies (Lotus, Erythrina, Chestnut-rose) have three different
rates (~0.478%, ~0.498% exactly, ~0.52%) - so Focus Attribute alone still can't predict
*which* rate a brand-new, unmeasured fairy will have.

**Second finding: Focus Attribute finally has a confirmed mechanical signature - it
predicts which stat(s) get the level-1 override.** Across all 5 species now:

| Stat | Overrides | Detail |
|---|---|---|
| HP | 5/5 (always) | Lotus, Erythrina, Hydrangea, Balloon-flower, Chestnut-rose all show it, regardless of focus |
| ATK | 3/3 when ATK-focused, 0/2 otherwise | Lotus, Erythrina, Chestnut-rose (all ATK-focus) show it; Hydrangea (DEF-focus) and Balloon-flower (HP-focus) don't |
| DEF | 0/5 (never) | No fairy tested has shown a DEF override, including the one DEF-focused fairy (Hydrangea) |

HP's override is universal and focus-independent. ATK's override tracks focusAttribute
cleanly so far (3/3 and 0/2) - the first time Focus Attribute has done anything other
than look cosmetic. DEF's total absence, even for the DEF-focused fairy, is the one
piece that doesn't fit a tidy "override hits your focus stat" story - would need a
second DEF-focused fairy to know if Hydrangea was typical or a fluke.

**CP formula finding: within a single growth-rate tier, CP can't be reliably attributed
to specific ATK/HP/DEF weights - the earlier universal-formula hypothesis needs
downgrading.** Attempting to refit CP jointly across all 4 non-Hydrangea species (now
including HP as a variable, since Balloon-flower finally gives HP real independent
range) failed badly - residuals up to ~390, nowhere close to a fit. Refitting each
species independently gives a near-perfect fit (<0.3 residual) for *any* of them - but
this is a trap, not a confirmation: because ATK/HP/DEF all move in lockstep within one
tier (previous finding), a linear regression of CP against them is under-identified -
many different (a, h, c, d) combinations fit equally well, and the specific numbers
returned aren't reliably "the true formula," just one member of a family of equally-fitting
answers. Lotus's original formula likely stayed coherent specifically *because* her
dataset spans two growth-rate tier changes and two Special Attributes, which breaks
the lockstep and gives the regression real signal to work with. **Revised status: CP
prediction is only trustworthy for Lotus (and by extension, fairies close to her
tested regime) until a similar multi-regime dataset - a tier change, Ascend, or
Special Attribute - is gathered for another species.** `CP_FORMULA` and the per-species
`cpOffset` fields in `src/data/fairySpecies.ts` carry this caveat explicitly; Balloon-flower
and Chestnut-rose deliberately have no `cpOffset` populated rather than a
plausible-looking but unreliable number.

#### Cross-species check: Marigold
Fourth new-species sample, same protocol (Companionship-1, 1-star, growth-rate 100%,
levels 1,2,3,4,5,10,15,20,40,80). Raw source: `game-knowledge/marigold.js`. Balloon-flower's
lvl40 ATK typo (185) was confirmed by the user and corrected to 180 directly in
`balloon-flower.js`.

| Level | CP | ATK | HP | DEF |
|---|---|---|---|---|
| 1 | 4000 | 180 | 2000 | 220 |
| 80 | 5200 | 252 | 2800 | 308 |

**Growth rate is EXACTLY 1/201 for all three stats** - the third species to land on this
exact rate (after Erythrina and Balloon-flower), out of 4 non-Lotus species tested.
Raises a real question worth tracking: is 1/201 a common/default rate shared by many
(most?) fairies, with Lotus (~1/209) and Chestnut-rose (~1/193) being the exceptions
rather than every fairy having its own idiosyncratic rate? Would need more species to
tell whether 1/201 keeps recurring or whether this is 3-of-a-small-sample coincidence.

**Override pattern breaks new ground: first-ever DEF override, and no ATK override.**
ATK fits the smooth line perfectly even at level 1 (no override) - the first non-ATK-focused
signature seen alongside an override elsewhere. HP overrides as always (now 6/6, still
universal). DEF overrides for the first time in any species tested (previously 0/5).
Focus Attribute isn't user-confirmed for Marigold yet, but this pattern is a strong fit
for "HP always overrides, and your OWN focus stat also overrides" with Marigold being
DEF-focused - which would also reframe Hydrangea (the one other DEF-focus fairy, which
showed no DEF override) as the likely outlier rather than the rule, plausibly because
her DEF slope was only ever back-derived from a narrow, noisy 4-level window that could
easily have missed a small override. `MARIGOLD.focusAttribute` in `fairySpecies.ts` is
set to `"DEF"` on this inference and flagged TODO pending user confirmation.

CP again shows a large, level-growing offset against the Lotus-fit formula (+1048 at
lvl1 growing to +1466 at lvl80) - consistent with, not a new exception to, the
identifiability problem described above. No `cpOffset` populated for Marigold either.

#### Cross-species check: Foxglove - a genuine blind prediction, validated
Fifth new species, but tested differently on purpose: only lvl1 and lvl2 were provided
first (`game-knowledge/foxglove.js`; a duplicate `lvl: 1` on the second entry was
confirmed as a typo for `lvl: 2`), specifically to test whether lvl5/lvl10 could be
predicted from minimal data using the shared-rate (see Balloon-flower/Chestnut-rose
section) and override-exact-formula (see below) findings. Predictions were made and
recorded *before* seeing lvl3-5 data. The user then added lvl3, 4, 5 and confirmed:
**the informed lvl5 prediction (ATK 219, HP 2508, DEF 156) was exactly correct**,
against a naive 2-point extrapolation that would have predicted ATK 222 / HP 2544 /
DEF 157 - all noticeably wrong on ATK/HP. This is the first genuine out-of-sample
validation of the shared-rate approach on a brand-new species (as opposed to explaining
already-seen data).

**CONFIRMED, now with zero exceptions across 10 checks: the level-1 override, whenever
present, equals exactly `floor(continuous(1) - slope)`** - as if the game grows that
stat from "level 0" instead of level 1, for whichever stat(s) show the override. Checked
against Lotus (ATK, HP), Erythrina (ATK, HP), Chestnut-rose (ATK, HP), Balloon-flower
(HP), Marigold (HP, DEF), and now Foxglove (ATK, HP) - every single override matches
this exact formula, no free parameter needed. **Practical implication: `levelOneOverrides`
doesn't need to be independently observed/stored at all once base+slope are known for a
species - it can be derived**, provided which stat(s) override is known or predictable
(see the Focus Attribute correlation, Balloon-flower/Chestnut-rose/Marigold section).

**Self-correction worth recording:** the initial blind-prediction pass checked the
override formula against a quick reconstruction that assumed foxglove's rate was
exactly 1/201 (since 3 other species matched that exactly) - under that assumption, ATK
looked override-free and only HP looked overridden, suggesting HP focus. Once lvl3-5
confirmed the prediction and prompted a precise refit from the actual clean points
(ignoring the 1/201 assumption), the true picture flipped: **foxglove's own rate is
NOT 1/201 (ATK slope/base = 1/215, HP = 1/205 - neither matches 1/201, and they don't
even match each other closely)**, and re-checking the override formula against the
correct base/slope shows **ATK also overrides** (214, missed in the first pass because
the wrong base was used to test it) - so the signature is actually ATK+HP override,
DEF clean, matching Lotus/Erythrina/Chestnut-rose's ATK-focus pattern, not
Balloon-flower's HP-focus one. `FOXGLOVE.focusAttribute` is now set to `"ATK"`
(previously briefly `"HP"` before this correction), still inferred/TODO pending user
confirmation. **Lesson: verify the override formula against the actual best-fit
base/slope for a species, not against a borrowed rate from other species, even when
that borrowed rate looks likely to apply.**

**Revises the "1/201 might be a common default rate" hypothesis from the previous
section - it's evidently common (3 of 6 species now: Erythrina, Balloon-flower,
Marigold) but not universal (Lotus ~1/209, Chestnut-rose ~1/193, Foxglove ~1/215 ATK /
~1/205 HP, and unlike every other species Foxglove's own ratios don't even agree with
each other).** Foxglove was only sampled across a narrow lvl1-5 span (same issue as
Hydrangea's original 4-star window), so its rate estimate - especially DEF's, which
only fits 3 of 4 clean points - should be treated as lower-confidence than the
wider-span species until a higher-level checkpoint (lvl20+) is available.

#### Foxglove wide-span check: the narrow-window "exact fit" was wrong
Foxglove's lvl20/40/80 were predicted from the lvl1-5 fit (see previous section) before
being measured. Result, once the user reported the real values: **HP and DEF predictions
were exactly correct at all three levels. ATK was wrong at all three, and by a growing
margin** - predicted 234/254/294, actual 235/256/298 (off by 1, then 2, then 4).

**Root cause: the lvl1-5 window's "exact, zero-residual" ATK slope of 1.0 was a floor-
rounding illusion, not the true rate.** Over a 4-level span, a slope anywhere from
roughly 1.00 to 1.09 all floor to the exact same integer sequence (216, 217, 218, 219) -
the window was too narrow to distinguish them, and the one that happened to be tried
first (a round 1.0) looked perfect purely because nothing in that span was long enough
to expose the difference. The gap only became visible once enough levels accumulated
for the fractional error to spill over an integer boundary - which is exactly the
"growing by 1, then 2, then 4" shape actually observed.

Refitting ATK against every confirmed point (lvl1 override, lvl2-5, lvl10, lvl20, lvl40,
lvl80 - 9 points) plus the override-formula constraint still does not fully pin down a
unique slope - floor data at this density admits a small family of close rational slopes
(~1.042-1.09) that all satisfy every known point equally. `21/20 = 1.05` (base 215.05)
was chosen as the cleanest small-denominator candidate that fits all 9 points and the
override rule; validated against the full compute pipeline with zero mismatches. This is
a **working estimate, not a fully determined constant** - an untested intermediate level
(e.g. lvl30, 50, 60, 70) could still reveal it's slightly off, the same way lvl20 revealed
the original slope-1.0 guess was.

**Methodological lesson, worth applying to every future species: a short span "fitting
exactly" (zero residual) is not evidence the slope is correct - floor rounding hides
fractional slope error until it's compounded over enough levels.** A narrow-window fit
should be treated as provisional until checked against at least one point far outside
that window; DEF (also refit from just the lvl1-5 window in this same species, giving
slope 3/4) happened to be confirmed correct at lvl10/20/40/80, but that was luck of
where its rounding boundaries fell, not something the narrow window itself guaranteed.
Species whose growth curves are still based only on a narrow lvl1-5-style window and
haven't yet had a wide-span confirming point - Hydrangea's HP/DEF, Chestnut-rose,
Marigold - should be treated with the same caution until similarly checked.

#### Chestnut-rose progression: growth-rate mechanic generalizes, CP still unsolved
First progression tested on a species other than Lotus. Chestnut-rose progressed at
lvl80 (100% tier, continuous ATK/HP/DEF all exact integers there: 570/1780/68): level
auto-advanced to 81 (confirmed again), max level 80->160, growth rate 100%->140%,
Special Attribute unlocked: **PV (HP) +1600**. Reading at lvl81: `CP 5415, ATK 572, HP
1789, DEF 68 (unchanged)`.

**ATK/HP/DEF: validated exactly, zero mismatch**, via `computeBasicAttributes` after
adding this progression to `CHESTNUT_ROSE.progressions` - the growth-rate-tier carry-
forward mechanic (continuous value at tier boundary, scaled slope after) generalizes
cleanly from Lotus to a second species. Then predicted lvl160 (end of the new tier):
**ATK 805, HP 2508, DEF 96** - HP and DEF land on exact integers (no floor ambiguity at
all), only ATK carries the normal sub-1 rounding margin (805.2 -> 805).

**CP: attempted to use this progression to finally solve Chestnut-rose's own CP
coefficients (a tier change + a new Special Attribute type is exactly the kind of
non-collinear data that made Lotus's fit work) - inconclusive, more strongly negative
than expected.** Plugging Lotus's fitted atkWeight/defWeight/intercept into Chestnut-
rose's lvl1 and lvl80 readings (still the same 100% tier) implies wildly inconsistent
offsets: -137.5 at lvl1 vs +1.8 at lvl80, a ~139 CP swing - nothing like Erythrina's
stable ~41.5-ish offset across 8 points. **Lotus's weights don't transfer to Chestnut-
rose at all**, more decisively than the existing "maybe just an offset" caveat assumed.
Attempting to instead solve for Chestnut-rose's OWN independent weights from her 3
points also fails: lvl1 and lvl80 are still nearly collinear (ATK:DEF ratio 8.375 vs
8.382 - barely moves), so the 3 points give only ~2 independent constraints for 4
unknowns (atkWeight, defWeight, intercept, PV weight) - underdetermined. **No cpOffset
or special-attribute weight populated** - would need several more levels at the new 140%
growth rate (giving more non-collinear points within the new tier, not just one) to
actually pin this down, mirroring how Lotus's fit rested on 5 points post-1st-progression
plus more after the 2nd, not just one.

#### Chestnut-rose 2nd progression: growth mechanic holds, CP fit close but not yet trustworthy
Second progression, same species. Progressed at lvl160 (ATK 805/HP 2508/DEF 96,
confirmed correct from the previous prediction, CP 7079 at that point): level -> 161,
max level 160->240, growth rate 140%->200%, Special Attribute unlocked: **Crit +160**.
Reading at lvl161: `CP 8706, ATK 809, HP 2521, DEF 96 (unchanged)`.

**ATK/HP/DEF validated exactly again** (lvl160 and lvl161 both zero-mismatch through
`computeBasicAttributes` after adding the 2nd progression tier to
`CHESTNUT_ROSE.progressions`) - the growth-rate carry-forward mechanic now holds across
3 tiers and 2 progressions on a second species, same as Lotus.

**CP: now has the right SHAPE of data (3 tiers, 2 Special Attribute types: PV, Crit) to
attempt Chestnut-rose's own formula - result is a genuine improvement but still not
trustworthy enough to populate.** 5 points total (lvl1, 80, 81, 160, 161), assuming
Special Attributes are permanent once granted (PV+1600 active from lvl81 onward, Crit
+160 added at lvl161) gives a linear system `CP = a*ATK + c*DEF + pv*PV_active +
crit*Crit_active + d` with exactly 5 unknowns for 5 equations - solves with zero
residual, but that's guaranteed by construction (as many unknowns as equations), not
evidence of correctness. The exact solve gives **defWeight = -1.09 (negative - physically
implausible, more DEF can't reduce CP)**, a clear sign this specific numeric solution
isn't the real formula.

Leave-one-out refitting (drop each point, refit on the other 4, predict the held-out one)
confirms atkWeight/defWeight are unreliable - they range from -1.6 to +32 and -208 to
+74 across folds, even flipping sign, and dropping the one row with Crit data breaks the
prediction badly (off by 1598) since a 4-point/5-unknown system is now underdetermined.
**But PV and Crit's own weights are notably stable across every fold that retains the
Crit datapoint:** PV clusters at 0.46-0.51, Crit at 9.4-10.2. Crit's ~10 lines up closely
with **Lotus's own Block weight (~10.0)** - both are Advanced-Attribute-pool special
types, reinforcing the standing "Advanced pool ~10/point, Basic pool lower" hypothesis
from the Lotus section above. PV's ~0.5 is much lower than any ATK-type special
attribute weight seen so far (Lotus's Special ATK ~5.00), consistent with HP-type stats
generally contributing less to CP per raw point throughout this doc.

**Not populated into `CP_FORMULA` or `cpOffset`** despite the promising PV/Crit numbers -
5 points is the bare minimum to solve a 5-unknown system at all, and "fits exactly"
isn't real validation until there's a genuinely held-out point to check against (not
leave-one-out on the same small set). Two things would resolve this: one more Chestnut-
rose CP reading at a level not used here (real out-of-sample check), or another species
showing a Crit or PV special attribute to cross-validate the ~10 / ~0.5 pattern
independently of Chestnut-rose's own noisy atkWeight/defWeight.

**Competing hypothesis raised by the user: Special Attributes may not feed CP at all.**
If true, Lotus's own fitted ATK-type (~5.00) and Block-type (~10.00) special-attribute
weights would need a different explanation - e.g. an artifact of progression events
correlating with a flat per-progression CP bump unrelated to the specific special
attribute granted (progressions always change level + growth-rate tier at the same time,
so "CP jumped because of the tier/level change" and "CP jumped because of the special
attribute" are still confounded in every sample collected so far, Lotus included).
Not resolved either way - `CP_FORMULA.specialAttributeWeights` left unchanged pending
more data. A clean test: two same-level/same-tier/same-ATK/DEF fairies where only one
has an unlocked special attribute, or watching whether CP moves at the instant a
progression grants the special attribute before any other stat changes.

#### Chestnut-rose 3rd progression: special attributes CONFIRMED to feed CP, and a real Advanced-pool constant emerges
Third progression. Progressed at lvl240 (ATK 1141/HP 3548/DEF 136, confirmed correct
from the lvl240 prediction, CP 11079 at that point): level -> 241, max level 240->320,
growth rate 200%->300%, Special Attribute unlocked: **Tenacity +240**. Reading at lvl241:
`CP 13519, ATK 1147, HP 3567, DEF 136 (unchanged)`. ATK/HP/DEF validated exactly again
via `computeBasicAttributes` after adding the 3rd progression tier - the growth-rate
mechanic now holds across 4 tiers on this species.

**This directly tested the user's hypothesis that Special Attributes might not feed CP
at all - now with 7 total CP readings (lvl 1/80/81/160/161/240/241), enough for a
genuinely overdetermined fit instead of the earlier exact-fit trap.** Two models
compared:
- **Model A, no special attributes** (`CP = a*ATK + c*DEF + d`, 3 unknowns, 7 equations):
  fits badly, residuals up to **449** - far beyond any floor-rounding tolerance seen
  anywhere else in this doc. **Hypothesis rejected** - special attributes clearly do
  contribute.
- **Model B, with special attributes** (`CP = a*ATK + c*DEF + pv*PV + crit*Crit +
  ten*Tenacity + d`, 6 unknowns, 7 equations - genuinely overdetermined by 1 this time):
  fits to **within 0.41 CP** across all 7 points.

Leave-one-out on Model B: 6 of the 7 folds predict their held-out point within ~4 CP
(the 7th, unsurprisingly, is the only row carrying Tenacity data, so a model trained
without it can't extrapolate to a special-attribute type it's never seen). Across every
fold, **PV and Crit's weights stay tightly clustered - PV ~0.500-0.506, Crit
~9.985-10.048** - and in the full 7-point fit, **Tenacity lands at 9.999, essentially
identical to Crit's ~10.00 and to Lotus's independently-derived Block weight (~10.00)**.
**This is now three different Advanced-Attribute-pool special attributes (Block, Crit,
Tenacity), across two different species, all converging on the same ~10/point value** -
strong evidence this is a real shared game constant, not a per-species or per-attribute
coincidence. PV (~0.5, Basic-pool) stays far below it, consistent with the "Basic pool
lower, Advanced pool ~10" shape already suggested by Lotus's own ATK-type weight (~5.00).

**Complication surfaced, not yet resolved: Chestnut-rose's OWN atkWeight/defWeight are
NOT the same as Lotus's, and aren't even fully pinned down individually.** Across
leave-one-out folds atkWeight/defWeight swing (4.83/19.21, 6.75/3.30, 7.27/-1.09,
6.74/3.37) - DEF's weight even flips sign depending on the fold - while the *combined*
`a*ATK + c*DEF` term stays accurate throughout (predictions within ~4 CP regardless of
which individual (a,c) pair a fold lands on). This is the same collinearity signature
seen all along: ATK and DEF still move together closely enough across most of these
points that the regression can trade weight between them without hurting the fit, even
though the special-attribute weights (which vary independently of ATK/DEF) come out
clean and stable. **Practical implication: the current schema (one global `CP_FORMULA`
plus a per-species flat `cpOffset`) cannot represent this correctly** - Chestnut-rose
needs her own atkWeight/defWeight/intercept, not just Lotus's plus an additive
correction. Per the user: staying in data-gathering mode on this rather than
generalizing the schema yet - species-specific CP weights are being tracked here as
findings, not written into `FairySpecies`/`CPFormulaConstants`, until more species
data either confirms this needs a real per-species formula or reveals a cleaner shared
structure. Chestnut-rose's own best-fit (from the full 7-point Model B):
atkWeight~6.74, defWeight~3.37 (unstable individually, see above), pv~0.501,
crit~9.999, tenacity~9.999, intercept~528.8 (notably lower than Lotus's ~998.9) - not
written into code, recorded here for reference only.

#### Chestnut-rose lvl240 prediction (3rd tier, 200% growth rate)
Using the now-validated 3-tier model (100%/140%/200%, continuous carry-forward at each
boundary): **ATK 1141, HP 3548, DEF 136.** HP and DEF land on exact integers (2508 +
13.0x80 = 3548, 96 + 0.5x80 = 136 - zero rounding margin). ATK's tier-3 slope (4.2/lvl)
is already validated against the real lvl161 reading (809.4 -> 809, exact), so this
carries the same confidence as the already-confirmed lvl160 prediction.

#### Chestnut-rose 4th progression + a max-level, max-star (18-star) data point
Fourth progression: at lvl320 (ATK 1645/HP 5108/DEF 196, confirmed correct from the
established model, CP 17079) -> level 321, max level 320->400 (the theoretical cap per
`fairies.json`'s 5-tier/4-progression roster - first time this project has reached it),
growth rate 300%->460%, Special Attribute unlocked: **Block +480**. Reading at lvl321:
`CP 21944, ATK 1654, HP 5137, DEF 197`. **ATK/HP/DEF validated exactly again** via
`computeBasicAttributes` - the growth-rate mechanic now holds across all 5 tiers.

Then a `lvl400` reading was reported: `CP 93911, ATK 10683, HP 33072, DEF 1272`, later
clarified to be **at 18 stars (the maximum)** - the first max-star data seen for any
fairy in this project (previous ascend data topped out at Hydrangea's 4-star and
Erythrina's 3-star). The pure-leveling (1-star) model predicts only ATK 2418/HP 7500/
DEF 288 at lvl400 - the real reading is **4.41-4.42x higher, uniformly across ATK/HP/DEF**
(4.418/4.410/4.417 - CP moved only 4.28x) - the confirmed signature of Ascend, not
leveling (uniform multiplier on the three Basic Attributes, CP scaling differently).

**Open question, NOT resolved: which level the Ascend action happened at - genuinely
changes the implied multiplier, and the data doesn't disambiguate.** Per the confirmed
rule (Ascend multiplies whatever value is current at the moment of ascending; leveling
afterward continues at the ORIGINAL, un-multiplied slope - see Ascend x Upgrade
interaction above), two hypotheses were tested against the single lvl400/18-star
reading:

| Hypothesis | Implied cumulative(18) multiplier (ATK / HP / DEF) |
|---|---|
| Ascended exactly at lvl400 (no leveling after) | 4.418 / 4.410 / 4.417 |
| Ascended at lvl321 (right after the 4th progression), leveled 321->400 after | 5.994 / 5.977 / 5.991 |

Both are internally tight across the three stats (~0.2-0.3% spread) - neither can be
ruled out by consistency alone, and CP's own scaling (4.28x) doesn't cleanly match
either hypothesis (expected - CP has never scaled 1:1 with Ascend in this doc).
**Confirmed by the user: she was still 1-star at lvl321** (consistent with lvl320/321
matching the pure leveling model exactly), so the Ascend happened somewhere in the
321-400 window, but the exact moment wasn't recorded. **No `ascendCurve` populated for
Chestnut-rose from this** - would be committing to one of two live hypotheses without
grounds to pick. Worth tracking the exact level at the moment of any future Ascend
action (as `starsSetAtLevel` is for other fairies) to resolve this, and because 18-star
data - once anchored to a known level - would meaningfully extend how far any fairy's
ascend curve has been validated (currently nothing past 4-star).

#### Chestnut-rose lvl400 ascend series: "uniform ratio across ATK/HP/DEF" needs a caveat
Three consecutive clean Ascend steps at a fixed level (lvl400, 1-star base already
confirmed: ATK 2417, HP 7500, DEF 288 exactly), each read immediately: 1->2 stars (CP
29816, ATK 2685, HP 8332, DEF 320), 2->3 stars (CP 32716, ATK 3021, HP 9372, DEF 360),
3->4 stars (CP 36100, ATK 3425, HP 10620, DEF 408).

**Resolved the ATK anchor question flagged in the previous section:** testing a clean
candidate multiplier of 10/9 for star 2 against both candidate 1-star ATK anchors (2417
reported vs. 2418 from the pure smooth-growth model) - only 2417 produces a floor-
consistent result (2417*10/9=2685.56 -> floor 2685, matches; 2418*10/9=2686.67 -> floor
2686, does not match). **Confirms 2417 was correct, and the growth model itself has a
small, previously-invisible ~1-unit gap specifically at lvl400** - the absolute max
level, reached for the first time this session. Schema has no mechanism for a "last
level of the final tier" deviation (only first-level-of-tier overrides exist); this may
be a symmetric counterpart to that already-documented phenomenon, just never visible
before now. Not patched into the model - flagged as a known small gap in code.

**DEF fits a clean, exact quadratic across all 3 ascend steps with zero residual:**
`cumulative(N) = (N^2 + 5N + 66) / 72`, giving star2=10/9, star3=5/4, star4=17/12 -
each one floors to the exact real reading with no rounding margin at all.

**ATK and HP were assumed to share DEF's curve (per the established "one uniform ratio"
rule) - star 4 disproved that assumption for both, in different ways.** ATK matched
DEF's curve exactly at star 2 and 3, then missed star 4 by 1 (predicted 3424, actual
3425). HP missed the DEF-based curve at every step, by a clean and steadily GROWING
amount: short by 1 at star2, 3 at star3, 5 at star4 - not floor noise (checked: no
possible adjusted HP anchor makes the DEF-based curve fit HP at both star2 and star3
simultaneously - the two constraints' valid ranges for such an anchor don't even
overlap). **Fitting each stat's OWN independent quadratic from its own star1-3 data
(not borrowing DEF's) and testing against its own star4 - a genuine out-of-sample check,
the same rigor as Hydrangea's validated curve - gives an EXACT match for all three
stats simultaneously**, using three different curves:

| Stat | Own curve (a, b, c) | cumulative(4) |
|---|---|---|
| ATK | 34/2417, 166/2417, 2217/2417 | 3425/2417 ~= 1.41705 |
| DEF | 1/72, 5/72, 11/12 | 17/12 ~= 1.41667 |
| HP | 26/1875, 26/375, 573/625 | 177/125 = 1.41600 |

**Revises the established "Ascend applies one uniform ratio to all three Basic
Attributes" rule - it appears to be an approximation that holds well at the magnitudes
and star counts tested so far, not a strict rule.** Hydrangea's (lvl1, up to 4-star) and
Erythrina's (lvl50, up to 3-star) confirmations of a single uniform ratio used much
smaller stat magnitudes (hundreds to low thousands) and lower star counts than
Chestnut-rose's lvl400/18-star-cap data (values in the tens of thousands) - the same
proportional per-stat difference that would floor away to invisible at Hydrangea's scale
becomes a multi-unit, clearly-real gap at Chestnut-rose's. Notably, Erythrina's own data
showed a small DEF divergence (~1.66x vs ATK/HP's ~1.64x) that the doc's Ascend section
dismissed at the time as "a floor-rounding artifact... DEF does NOT get a different
ascend ratio." Given this new, out-of-sample-validated finding, **that dismissal may
have been premature and worth revisiting** if Erythrina is ever ascended further - the
same shape of lesson as the Foxglove ATK slope issue earlier this session: a fit that
looks exact in a narrow or small-magnitude window can hide a real discrepancy that only
becomes visible with more range or larger numbers.

**Per the user: kept as a documented finding, not written into the schema.**
`FairySpecies.ascendCurve` only supports one shared curve per species; extending it to
three independent per-stat curves would be a real schema change. `CHESTNUT_ROSE.ascendCurve`
in code stores DEF's own curve (the one that's actually confirmed exact at every tested
star), with the ATK/HP divergence documented inline as a known, small, growing
prediction error at high star counts rather than silently absorbed or hidden.

**Star 5 (CP 39958, ATK 3895, HP 12076, DEF 464): a second out-of-sample hit for DEF and
HP, and a new open puzzle for ATK.** Both DEF's curve and HP's own independently-fit
curve predicted their star-5 value with zero error - a second consecutive out-of-sample
confirmation for each, the strongest validation any curve in this doc has received.
**ATK's own curve, exact through star 4, missed star 5 by -2** (predicted 3897, actual
3895). Refitting from a different point window (stars 2-4) and trying a cubic instead of
a quadratic both converge on the same ~3896-3897 prediction - the fitted cubic
coefficient comes out at floating-point-noise magnitude, effectively zero, ruling out
"needs a higher-order curve" as the explanation. Since ATK is the one stat that already
had an independently-confirmed quirk at this exact level (the ~1-unit base-anchor gap
noted above), this looks like a continuation of some unexplained ATK-at-lvl400
phenomenon rather than a curve-fitting problem - but there's no working theory for it
yet. Left as an open, flagged discrepancy rather than forcing an unvalidated fix; a
star-6 reading (or another species reaching lvl400/high star count) would help show
whether the gap keeps growing, stabilizes, or is periodic.

**True star 11 (CP 44300, ATK 4433, HP 13740, DEF 528): DEF and HP hit exactly a third
consecutive time.** DEF's curve and HP's own curve both predicted this value with zero
error again - three out-of-sample hits each. ATK's gap versus its original (true star
6-8 fit) curve was 0/-2/-4 at true star 9/10/11, read at the time as a clean linear
sequence - **superseded below, that read was itself a narrow-window illusion.**

**True star 12 (CP 49116, ATK 5037, HP 15612, DEF 600): DEF and HP hit exactly a
FOURTH consecutive time.** ATK's gap is now -8, not the linearly-predicted -6: read at
the time as **geometric** doubling (0/-2/-4/-8, ratio 2.0 both times) starting at true
star 10 - **superseded below, also wrong.**

**True star 13 (CP 54416, ATK 5709, HP 17692, DEF 680): DEF and HP hit exactly a FIFTH
consecutive time - treat these two as settled.** ATK's gap is -12, not the
doubling-predicted -16: full sequence 0/-2/-4/-8/-12, increments -2/-2/-4/-4. This is
the THIRD distinct pattern guessed for this sequence in a row (linear, then doubling,
both wrong on the very next point) - the "each increment repeats twice before doubling"
shape reproduces all 5 known points exactly, but given two prior failures at exactly
this kind of small-sample pattern-matching, this is recorded with LOW confidence, not
presented as a finding. The likely conclusion at this point is that ATK's gap isn't a
simple closed-form function of star count, and further single-point star readings on
this same thread probably won't resolve it.

**True star 14 (CP 60437, ATK 6482, HP 20084, DEF 772): DEF and HP both broke their
five-star-long perfect streak simultaneously - RESOLVED, not an Ascend-curve tier.**
Guessed at the time as a new "final stretch to cap" Ascend milestone (4 stars short of
the confirmed 18 cap) - **wrong about the mechanism, corrected below rather than left
standing.**

#### Dual Radiance Bloom - a new, separate attribute-boosting system
Explains the true star 14 anomaly above. Per the user, quoting in-game text: "Only some
Flower Fairies can undergo Dual Radiance Bloom. Flower Fairies available for Bloom will
gradually increase with updates. A Flower Fairy available for Bloom must reach 14 Stars
to undergo Bloom Training. After Bloom Training reaches 100%, special materials are
consumed to Bloom. After successful Blooming, all Flower Fairies with the same name
become Dual-Element Flower Fairies."

Confirmed facts:
- **Requires 14 stars minimum** to begin Bloom Training - explains why nothing like this
  showed up at any star count 9-13, only appearing right at 14.
- **Not every species is eligible** - "available for Bloom will gradually increase with
  updates," implying a per-species allowlist that grows over time. Chestnut-rose is
  confirmed eligible.
- **Bloom Training is a separate 0-100% meter**, independent of star count once past the
  14-star gate - the user's Chestnut-rose is at 2% trained.
- **Reaching 100% and consuming materials triggers "Bloom"** - a one-time transformation
  that (per the in-game text) affects **every fairy of that name account-wide**
  ("all Flower Fairies with the same name become Dual-Element Flower Fairies") - not
  per-instance like Ascend/Progression/Companionship, a genuinely different scope of
  effect from every other system documented so far.
- **Training grants a flat per-1% attribute bonus** - for Chestnut-rose specifically:
  +110 HP, +33 ATK, +4 DEF per 1% trained. Not yet confirmed whether this rate is
  universal or per-species (only one species/one data point so far).
- Not yet known: what "Dual-Element" means mechanically (a second Element type
  alongside the existing one? new attribute weights? new skills?), what materials Bloom
  consumes, or whether Bloom Training itself follows a smooth/linear curve *before*
  100% the way this 2%-data-point implies, versus some other progression shape.

**Open reconciliation question, not yet resolved:** subtracting the stated 2%-training
bonus (8 DEF / 220 HP / 66 ATK) from the true-star-14 reading does NOT cleanly recover
this ascend curve's otherwise-perfect prediction - implied "no-bloom" values are 764
DEF / 19864 HP / 6416 ATK vs. the curve's own predictions of 768 / 19980 / 6465
(off by -4 / -116 / -49 respectively). Possible explanations, none confirmed: the bonus
doesn't apply as a simple post-floor addition (e.g. it might scale with the ascend
ratio, or apply pre-floor to a continuous value with different rounding behavior), the
stated "2%"/"220+/66+/8+" figures were approximate rather than exact, or there's a
mechanic not yet accounted for. Needs either a precise (not rounded) training %
reading, or a second Bloom-eligible data point at a different training % to solve for
the true combination formula.

**Practical impact on existing findings:** star 9-13 readings remain completely clean
(Bloom is unavailable below 14 stars) - DEF/HP's five consecutive exact ascend-curve
hits through star 13 are unaffected and still stand. Only star 14+ readings on any
Bloom-eligible fairy are now confounded by training % and need it accounted for before
being used to fit or validate an ascend curve. The ATK-specific gap from stars 9-13
remains entirely separate and still unexplained - Bloom cannot be the cause there
(unavailable before star 14).

**Schema implication, not yet acted on:** `FairyInstance` currently has no field for
Bloom Training % or Bloomed status - a new, genuinely separate dimension of fairy state
(like Companionship was), affecting attributes independently of level/star/companionship.
Not added yet, consistent with staying in data-gathering mode until the reconciliation
question above is resolved and more species' eligibility/rates are known.

Per the user, the planned next step (agreed before this discovery, still relevant) is
testing Chestnut-rose's ascend behavior at a level OTHER than 400 - this still isolates
whether the ATK stars-9-13 gap is lvl400-specific or curve-inherent; just be aware any
star-14+ reading in that test will also need Bloom Training % tracked and reported.

#### Chestnut-rose lvl100 cross-level ascend test (in progress)
The cross-level test recommended above, now underway. First point: lvl100 (2nd growth-
rate tier, 140%), 6-star (species floor): `CP 5816, ATK 628, HP 1962, DEF 75`, PV +1600
special attribute already active (consistent - granted at the 1st progression, lvl80).
**Validated exactly** via `computeBasicAttributes` (zero mismatch) - and notably, unlike
lvl400, ATK's base value here has NO anchor quirk (628 matches the smooth model exactly,
628.8 -> floor 628) - some early evidence the ATK base-anchor gap really is specific to
being at the absolute level cap (400), not a general lvl100-vs-lvl400 difference.

Then ascended 6->7 stars: `CP 8232, ATK 896, HP 2794, DEF 107`. **This is the reading
that revealed the major Ascend-is-additive-not-multiplicative correction above** - see
that section for the full analysis. Summary: delta from 6-star (+268 ATK, +832 HP, +32
DEF) is IDENTICAL to the same transition's delta at lvl400, despite the ratio being
totally different (1.427 here vs 1.111 at lvl400) - confirms Ascend's bonus is a flat,
level-independent additive amount.

Then 7->8 stars: `CP 11132, ATK 1232, HP 3834, DEF 147`. Delta from star7 (+336 ATK,
+1040 HP, +40 DEF) is AGAIN identical to lvl400's delta for the same transition - a
second consecutive exact cross-level match, reinforcing the additive/level-independent
finding. This transition was still within the "clean" range at lvl400 too (the ATK gap
there didn't start until star 9), so it doesn't yet test the open question - the next
reading (8->9) is the one that matters: at lvl400, star 9 is exactly where ATK's curve
first went from "delta matches" to "delta consistently short" while DEF/HP stayed
perfect.

**RESOLVED: the star 8->9 reading (labeled "lvl400" by the user, but almost certainly a
typo for lvl100 given the magnitude - 1636/5082/195 continues the lvl100 sequence
628/896/1232 cleanly, and does not match the already-known lvl400 star9 reading of
3425/10620/408) gives delta +404 ATK / +1248 HP / +48 DEF from star8 - EXACTLY matching
lvl400's known delta for the same transition, digit for digit.** This is the third
consecutive exact cross-level delta match, and critically, it's the FIRST at a
transition where lvl400's own curve had already started drifting from its "clean"
quadratic (this is exactly the star where the original ratio-based ATK anomaly first
appeared). **Conclusion: the ATK anomaly is level-independent, not a lvl400-specific
artifact - it's an inherent property of Chestnut-rose's own ATK ascend delta curve.**
The earlier leading hypothesis (tied to being at the absolute level cap, reinforced by
the separately-confirmed ATK base-anchor gap at lvl400) is now ruled out by this direct
cross-level match. Whatever causes ATK's per-star delta to deviate from a clean
quadratic starting around star 8-9, it travels with the fairy/stat, not the level.

#### `fairies.json` - set aside for now, not in use
A file appeared with a 53-fairy roster, each at max level (400/400 - implying 5 growth-rate tiers and 4
progressions is the practical cap: 80/160/240/320/400), with final `basic_attributes` (pv/attack/defense),
`power` (Combat Power), `type_function` (a role tag, e.g. "Group Attack, DPS" - new concept, not yet
covered elsewhere), and all 4 special attributes (at levels 81/161/241/321). Checking it against our
tracked Lotus surfaced a mismatch (entries named "Lótus" / "Lótus Bingdi" have different special-attribute
rolls than our confirmed Lotus, ATK@81/Block@161), and fairy names in this file aren't unique keys either
("Eritrina" and "Agente Disciplinar Eritrina" are unrelated fairies sharing a name fragment). **Per the
user: not important right now - explicitly deprioritized, do not use as a data source until revisited.**

### Guild
A second, separate Attribute Source (alongside Fairies above) - available once the char is a guild
member. Two distinct sub-systems: **Guild Abilities** (30 randomly-rolled slots across 3 panels) and
**Guild Emblems** (3 equipment slots, one per color, with quality-gated special attributes). This is the
system the project (and repo name, `tlon-guild-emblem`) is ultimately centered on.

#### Guild Abilities (3 panels x 10 slots)
Each panel (Left, Mid, Right) has 10 slots. Each slot, once unlocked, is randomly assigned ONE attribute
from a fixed 4-attribute pool specific to that panel - the pool does not change slot to slot, only which
of the 4 gets rolled does.

Color grouping (per the CSS custom properties already added at `src/index.css` L14-16:
`--status-orange`, `--status-green`, `--status-blue`) maps cleanly onto the existing Attribute taxonomy
above:
- **Orange** = HP, Defense - both Basic Attributes.
- **Blue** = Block, Tenacity - both from the Advanced Attributes "Critical/Tenacity" and "Block/Break"
  groups respectively.
- **Green** = Block Damage Reduction, Block Recovery - both from the Advanced Attributes "Block: dmg
  red, ignorance, recovery, recovery suppression" group.

Per-panel pools (as given by the user), each a 4-attribute set spanning all 3 colors, with one color
appearing twice:
| Panel | Pool (4 attributes) | Color split |
|---|---|---|
| Left  | HP, Tenacity, Block Damage Reduction, Block Recovery | 2 green, 1 orange, 1 blue |
| Mid   | HP, Defense, Block, Block Damage Reduction            | 2 orange, 1 blue, 1 green |
| Right | Tenacity, Block, Defense, Block Recovery              | 2 blue, 1 orange, 1 green |

Each panel's "doubled" color (Left=green, Mid=orange, Right=blue) is a DIFFERENT color per panel - the
3 panels are symmetric permutations of each other, not independent designs.

After all 30 slots are unlocked, the resulting color totals across all 3 panels combined form some split.
The user gave 3 example splits (each sums to 30, matching 10 slots x 3 panels): (orange, blue, green) =
**(5, 5, 20)**, **(8, 6, 16)**, and **(10, 10, 10)**.

**HYPOTHESIS (derived here, NOT yet confirmed by the user):** if each slot's roll is uniform (25% each)
across its panel's 4 possible attributes, then per-slot color odds are 50% for the doubled color and 25%
each for the other two. Summing the expected value across all 30 slots (10 per panel):
- Orange: 2.5 (Left, 25%) + 5.0 (Mid, 50%) + 2.5 (Right, 25%) = 10
- Blue: 2.5 (Left) + 2.5 (Mid) + 5.0 (Right, 50%) = 10
- Green: 5.0 (Left, 50%) + 2.5 (Mid) + 2.5 (Right) = 10

This lands exactly on the user's third example, (10, 10, 10) - suggesting that example is the
statistical average/balanced outcome, while (5, 5, 20) and (8, 6, 16) are examples of lucky/unlucky
variance around it (green-skewed in both cases). Consistent, but NOT proof the per-slot roll is actually
uniform - flagged as an open question below.

**CONFIRMED (per the user, directly): each slot's roll IS a uniform 25% chance** across its panel's 4
possible attributes - closes the open question above. The hypothesis and its (10,10,10) expected-value
match were correct.

#### Guild Merits economy
The resource that gates every Guild Ability action.

**Income:** 3 daily guild quests, each worth 500 merits - **1500 merits/day** at full daily completion.
This is a theoretical MAX, not a realistic planning default - see the real-world calibration point below.

**Real-world calibration point (per the user):** after ~2 years of play (~700-760 days), all/most of
their 30 Guild Ability slots sit around **level 34**. Cumulative cost to reach level 34 on one slot is
29,750 merits (`cum(L) = 350L + 15L(L+1)`, see the leveling formula below); across 30 slots that's
892,500 merits spent. Dividing by elapsed days implies an actual average income of roughly
**1175-1275 merits/day, i.e. ~78-85% of the 1500/day theoretical max** - a believable real-play
efficiency (missed days, some merits likely spent on rerolls along the way, possibly other minor sinks
not yet documented). **Practical upshot for any future planning/estimation feature: default to ~80% of
the theoretical max income rather than assuming perfect daily completion**, unless the user states
otherwise for a specific planning scenario. Not a precise measurement (elapsed days are approximate,
"almost 2 years"), just a useful anchor - revisit if the user ever gives an exact join date or elapsed-day
count.

**Unlocking a slot:** costs 380 merits, and immediately brings that slot to level 1 (the unlock IS the
level-1 purchase, not a separate step before leveling starts). The user chooses WHICH of the 3 panels to
unlock a given slot from - this is the point of control referenced in the panel-pool section above (e.g.
"to focus on green, unlock/reroll slots on the Left panel first," since Left has 50% green odds vs 25%
elsewhere). Terminology note: the user's phrasing was "each hability panel costs 380 merits to be
unlocked," but based on the rest of the same message ("it will give one of the four possible attributes,"
singular "it" referring back) this cost is clearly PER SLOT, not per panel-as-a-whole - "panel" here reads
as loose phrasing for "a slot within a panel," not a mixup in the earlier 3-panels/30-slots structure.
Flagged, not silently assumed - worth a quick confirm if it ever seems inconsistent with new data.

**Leveling up an unlocked slot:** no max level. Each level costs 30 merits more than the previous level's
cost. Sequence confirmed by the user: 380 (unlock = reach level 1), 410 (level 1->2), 440 (level 2->3),
and so on. As a formula, cost to go from level (L-1) to level L, for L>=1 (L=1 being the unlock):
`cost(L) = 350 + 30*L`. Cumulative merits spent to reach level L from unlocked-but-level-0:
`sum_{i=1}^{L} (350 + 30*i) = 365*L + 15*L^2`.

**Rerolling a slot:** flat 100 merits, does not appear to scale with level (only one reroll cost was
given, no per-level reroll pricing mentioned - unlike leveling, whose cost the user was explicit scales).
**CONFIRMED (per the user, directly): rerolling KEEPS the slot's current level** - it only re-randomizes
which of the panel's 4 attributes the slot provides, the level/stat-total already purchased is preserved,
not reset. This means a reroll swaps a slot's TYPE at its current level for free-of-level-loss, at a flat
100-merit cost regardless of how much was invested leveling it - so late-game rerolling (a heavily-leveled
slot rolling the "wrong" attribute) is cheap relative to unlocking+releveling a fresh slot from scratch,
which materially favors a strategy of leveling early/rerolling opportunistically over reroll-first-then-
level. Worth keeping in mind once any planning/optimization logic gets built.

**Per-level attribute growth rates - CORRECTED, the flat rate above was an oversimplification.** The
user's follow-up: the amount gained per level is NOT constant - it steps up at level thresholds, and one
threshold is irregular (the 3rd tier runs 20 levels, not 10, explicitly called out by the user as "not
30" i.e. don't assume every tier is a clean +10 boundary):

| Levels | HP | Defense/Block/Tenacity | Block Dmg Reduction/Recovery |
|---|---|---|---|
| 1-10   | +200 | +10   | +0.08% |
| 11-20  | +250 | +12.5 | +0.10% |
| 21-40  | +300 | +15   | +0.12% |

**This also CORRECTS the flat-rate table's Defense value above (+20/level) - the real level-1-10 rate is
+10, identical to Block/Tenacity, not double it.** The earlier "clean 10:1 Orange ratio" pattern this
doc previously noted was built on that wrong number and is superseded/withdrawn - see the real pattern
below, which is much cleaner and does NOT run along the Orange/Blue/Green color lines at all.

**Real pattern, confirmed exact at all 3 tiers:** Defense, Block, and Tenacity share one identical
progression (10/12.5/15) regardless of color (Defense=Orange, Block+Tenacity=Blue). HP's progression
(200/250/300) is that SAME curve multiplied by exactly **20** at every tier (200/10, 250/12.5, 300/15 =
20 exactly, all three). Block Damage Reduction/Recovery's progression (0.08%/0.10%/0.12%) is that same
base curve multiplied by exactly **0.008** at every tier (0.08/10, 0.10/12.5, 0.12/15 = 0.008 exactly,
all three). **There is really only ONE underlying tiered growth curve (10 -> 12.5 -> 15) shared by every
Guild Ability attribute** - each attribute is just that curve scaled by a fixed per-attribute multiplier
(Defense/Block/Tenacity: x1, HP: x20, Block Dmg Reduction/Recovery: x0.008). The UI color grouping
(Orange/Blue/Green) governs which PANEL/slot-pool an attribute belongs to (see panel table above), but
has no bearing on its growth-rate family - that grouping is a different axis entirely.

**OPEN QUESTION:** does the tier structure continue past level 40 (e.g. a 4th tier at some level, maybe
continuing the unusual doubled-length pattern, or reverting to +10-level boundaries), or does growth stay
flat at the tier-3 rate indefinitely since "no max level" was already confirmed? Not yet given.

#### Guild Emblems
Separate from the 30 Guild Ability slots. One emblem slot **per color** (3 total: Orange, Blue, Green).
Emblems grant baseline/flat basic attributes (e.g. HP, Block) unconditionally. Higher-quality emblems
additionally grant special attributes that only ACTIVATE once the character's Guild Ability color
count(s) cross some threshold. Two examples given:
- "8 orange / 3 blue / 4 green -> activates Break 240"
- "16 orange / 6 green -> activates some special effect" (blue count not mentioned in this example)

#### CONFIRMED (per the user, answering the 3 questions above)
1. **Guild Ability slots ARE reroll-able, at some cost** (currency/items - exact cost/resource not yet
   specified). This makes the system a genuine optimization/planning problem, not just a luck-outcome
   viewer - reinforces the "help the user plan what they can achieve" goal below: the app can reason
   about reroll strategy (e.g. "how many rerolls until you likely hit an emblem's threshold"), not just
   describe a fixed random result.
2. **Guild Emblem activation thresholds require ALL listed color counts simultaneously** - a genuine
   multi-color AND-gate. "8 orange/3 blue/4 green -> activates Break 240" means orange>=8 AND blue>=3
   AND green>=4 at once, not just a same-color threshold with the other numbers being incidental.
3. **An emblem's threshold tiers vary by case - both patterns exist:** some activation examples are two
   DIFFERENT emblems/qualities, each with its own single threshold; other times a single high-quality
   emblem has MULTIPLE progressive thresholds itself (more effects unlock as color counts grow further).
   Not a strict either/or - must be checked per-emblem, not assumed from a general rule.

#### STILL OPEN
- Exact reroll cost/resource and any per-reroll constraints (cooldown, limited currency, does rerolling
  a slot randomize among all 4 pool attributes again including possibly landing on the same one, etc.).

(Roll-uniformity was resolved above - confirmed uniform 25%. Full emblem catalog resolved below via
`game-knowledge/guild/emblem-effects.json`.)

#### Full Guild Emblem catalog (from `game-knowledge/guild/emblem-effects.json`)
User-supplied file, read directly - NOT modified (same policy as `fairies.json`: source data is read-only,
findings get written here instead). **File format note:** the file is not valid JSON as saved - a proper
JSON array (26 objects) runs from line 1 to line 31, but lines 32-62 contain extra loose numbers/comments
after the array closes. Treated those trailing lines as the user's own scratch verification notes (see
"Cross-check against real level-34 data" below) rather than part of the catalog - didn't touch the file,
just documenting the split here so a future read of this file isn't confused by it.

**26 total effects, split unevenly: Orange 9, Blue 9, Green 8** (not obviously a data-entry gap - flagged,
not assumed intentional or accidental). Each entry: an effect `name`, the `color` of the EMBLEM slot it
belongs to (Orange/Blue/Green - one of the 3 physical emblem slots, see above), an activation `colors`
threshold as `[orange_count, blue_count, green_count]` from the character's 30 Guild Ability slots, and a
`desc` - either a flat stat bonus (number, e.g. "480"), a percentage bonus, or full special-ability text.

**IMPORTANT - emblem `color` does NOT predict which attribute/effect it grants.** E.g. "Block Damage
Reduction" (4.5%, threshold [5,15,5]) is a **Blue**-emblem effect, even though Block Damage Reduction is a
**Green**-panel Guild Ability attribute (see the panel-color table above) - the two color systems (which
Ability panel an attribute rolls from vs. which Emblem slot grants a bonus) are independent axes that
happen to reuse the same 3 color names. Don't conflate them when modeling.

**Note on the earlier chat examples ("8 orange/3 blue/4 green -> Break 240", "16 orange/6 green -> some
effect"):** per the user, those were recalled from memory, not authoritative - **`emblem-effects.json` is
the source of truth going forward, not those chat examples.** (For the record: the file's real `Break`
entry is `[8, 3, 3]` -> 240, and `Survival Instinct` is `[16, 0, 6]` - close to both examples but not
required to match exactly, per the above.)

**Structural pattern across the 3 colors' own-threshold sequences** (the count of the emblem's own color
required, sorted): Orange 5,5,7,8,10,13,13,16,20 - Blue 5,5,5,7,10,13,15,16,20 - Green 5,5,7,10,13,15,16,20.
These 3 sequences are nearly identical (same broad shape: two 5s, then 7, [8 for Orange only], 10, 13,
[13 or 15], 16, 20) - suggests one shared underlying tier-threshold design reused per color with minor
variation, similar in spirit to the shared Ability-leveling growth curve found earlier. Not perfectly
identical (Orange has an extra "8" tier Blue/Green don't; Blue has an extra "5" tier), so treat as a
strong resemblance, not a proven single formula.

**Full catalog (as given):**

| Color | Effect | Threshold [O,B,G] | Effect |
|---|---|---|---|
| Orange | ATK | 5,2,2 | +480 |
| Orange | Abnormal Mastery | 5,5,5 | +1.5% |
| Orange | Holy Spirit Shield | 7,2,2 | On combat-state trigger: shield = 4.09% of HP, 10s (CD 60s) |
| Orange | Break | 8,3,3 | +240 (mismatches the earlier "8/3/4" chat example on green - see above) |
| Orange | Crit | 10,2,2 | +240 |
| Orange | DMG Increase | 13,5,3 | +1.5% |
| Orange | Pierce Rate | 13,3,5 | +1.5% |
| Orange | Survival Instinct | 16,0,6 | On HP<50% hit: Tenacity+4.44%, Block+4.44%, DEF+8.88%, 10s (CD 20s) - matches the earlier "16/-/6" example |
| Orange | Crisis Warning | 20,5,5 | On hit >6% max HP: Block guaranteed, Block Dmg Reduction +15.2%, (CD 20s) |
| Blue | DEF | 0,5,3 | +480 |
| Blue | One Heart | 5,5,5 | +1.5% |
| Blue | Abnormal Resistance | 5,5,5 | +1.5% (same threshold as One Heart - two distinct Blue effects both gate at 5/5/5) |
| Blue | Wind-following Shadow | 2,7,2 | After Dodge: dmg dealt +2.02%, dmg taken -3.03%, 3s |
| Blue | Block | 0,10,2 | +240 |
| Blue | Protection Rate | 0,13,6 | +1.5% |
| Blue | Block Damage Reduction | 5,15,5 | +4.5% (Blue-emblem effect, despite BDR being a Green-panel Ability attribute - see note above) |
| Blue | Good luck follows | 6,16,0 | Every 15s in combat: random 1-of-3 (ATK+5.44%/6s, DEF+10.88%/6s, or 6% max HP heal) |
| Blue | Integrated Offense and Defense | 5,20,5 | HP>50%: dmg taken -8.19%; HP>=50%: dmg dealt +5.46% |
| Green | HP | 0,3,5 | +4800 |
| Green | Break Free | 5,5,5 | +1.5% |
| Green | Flower Barrier | 2,2,7 | Flower Fairy damage taken -3.03% |
| Green | Tenacity | 0,2,10 | +240 |
| Green | DMG Reduction | 0,6,13 | +1.5% |
| Green | Block Recovery | 5,5,15 | +4.5% |
| Green | Full Moon | 0,6,16 | Per 10% HP remaining: +0.56% Damage Reduction; HP>80%: additional +3% Damage Reduction |
| Green | Impeccable | 5,5,20 | Crit damage taken -20.48% |

**Cross-check against real level-34 data (from the trailing scratch numbers in the same file) - a clean,
independent confirmation of the tiered Guild Ability growth-rate formula from the previous section.** The
numbers work out to exact cumulative totals at real levels 10/20/30/31/32/33(/34), using
`cum(level) = sum of the tiered per-level rate up to that level` (10/12.5/15 for Defense-Block-Tenacity,
200/250/300 for HP, 0.08/0.10/0.12 for Block Dmg Reduction/Recovery):

| Attribute family | @10 | @20 | @30 | @31 | @32 | @33 | @34 |
|---|---|---|---|---|---|---|---|
| Defense/Block/Tenacity | 100 | 225 | 375 | 390 | 405 | 420 | **435** |
| HP | 2000 | 4500 | 7500 | 7800 | 8100 | 8400 | - |
| Block Dmg Reduction/Recovery | 0.8 | 1.8 | 3.0 | 3.12 | 3.24 | 3.36 | - |

Every one of these numbers matches the formula from the previous section EXACTLY, computed independently
(verified via script, not eyeballed) - this is real in-game data from the user's own account, not a
re-derivation, and it lines up perfectly with the level-34 progress they mentioned. Strong, first-class
confirmation of the tiered growth-rate formula, from a second independent source. Also gives us the
level-34 Defense/Block/Tenacity value directly (435) and extrapolates cleanly (+15/level still holding) -
still no data past level 34 for any attribute, so the "does the tier structure continue past level 40"
question remains open.

#### App goal note
Per the user, directly: one of this app's explicit goals is to help the player decide and plan what they
can achieve with their Guild Abilities + Guild Emblems combination, given the combinatorial space (30
random rolls across 3 panels feeding into activation thresholds for 3 separate emblem slots).
