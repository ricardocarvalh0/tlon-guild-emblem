# `fairies.json` analysis

Source: an in-game reference/codex list (NOT a specific player's random rolls - confirmed
by the user), all entries at level 400/400, 18 stars, 0% Dual Radiance Bloom trained,
Companionship not raised. This is the "intended/current" stat block per fairy, but per
the user it can go stale: **the game periodically rebalances ("nerfs") existing fairies,
and this reference list may not always reflect the latest patch** (confirmed example:
Chestnut-rose's HP special attribute was 1700 in an older patch, is 1600 now - our own
directly-confirmed gameplay data already matches the current 1600, so at least that part
of this list IS current for her). **Practical rule for this whole doc: treat mismatches
against our own directly-confirmed gameplay data as "flag for review," not as proof of
error on either side** - could be a stale reference entry, a genuine per-instance random
roll (progression special-attribute type is still suspected random/player-influenced),
or a real inconsistency worth the user double-checking in-game.

No star count, Bloom, or Companionship fields exist in the JSON itself - that context is
entirely from the user's verbal confirmation, not encoded in the data.

## Chunk 1: Roster translation + match against already-tracked species

53 entries, ALL `"rarity": "SSR"` (no SR entries at all in this list - consistent with
having zero SR data anywhere in this project so far; unclear if that's because this
reference list only covers SSR, or the game/account genuinely has no SR-tier "Flower
Fairy" category at all).

Names are in Portuguese; many are real flower names, but several are clearly **anime
crossover/collab characters** (Rimuru, Diablo, Shalltear, Natsu, Wendy, Ainz, Albedo,
Erza) or **themed variants of an existing flower with a different element** (e.g. "Flame
Hydrangea" vs base Hydrangea) - both patterns match the "duplicate name, unrelated
fairy" warning already on record from before this file was set aside.

Translations below are my best effort, marked LOW CONFIDENCE where genuinely uncertain -
please review, especially anything marked so.

| id | Name (PT) | Name (EN, translated) | Element | Type function (EN) | Power | PV | ATK | DEF | Special attrs (lvl81/161/241/321) | Match to tracked species? |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Lótus Bingdi | Lotus Bingdi (LOW CONFIDENCE - "Bingdi" may be a proper/foreign modifier, not translated) | Holy | Group Attack, Damage Increase | 155142 | 31533 | 21623 | 2252 | Tenacity+200 / Break+200 / Crit+300 / Block+600 | Name overlaps our tracked "Lotus" but element (Holy vs our unconfirmed "Fire" guess) and special attrs (no ATK@81, unlike our confirmed ATK@81) don't match - **likely a different fairy despite the name**, already flagged historically |
| 2 | Lycoris | Lycoris (untranslated - already a real flower/genus name) | Holy | Control, DPS | 155138 | 90096 | 13514 | 4504 | PV+2000 / Block+200 / Tenacity+300 / Crit+600 | Not tracked |
| 3 | Eritrina | Erythrina | Fire | Group Attack, Reduction | 110600 | 24480 | 14688 | 1224 | Crit+200 / Break+200 / Block+300 / Tenacity+600 | **Likely our tracked Erythrina** (Fire element matches; no confirmed 18-star reading to check numbers against) |
| 4 | Hortênsia | Hydrangea | Water | Protection, Defence | 110600 | 52020 | 5508 | 7650 | Defence+200 / Tenacity+200 / Break+300 / Crit+600 | **Likely our tracked Hydrangea** (Water element matches; no confirmed 18-star reading to check numbers against) |
| 5 | Flor-Balão | Balloon Flower | Wind | Control, Group Attack | 110600 | 95550 | 3822 | 3822 | PV+2000 / Crit+200 / Block+300 / Break+600 | **Likely our tracked Balloon-flower** (Wind matches our TODO guess) |
| 6 | Rosa Roxburghii | Chestnut Rose (Rosa roxburghii, scientific name) | Fire | Individual, Additional Damage | 93911 | 33072 | 10683 | 1272 | PV+1600 / **Attack**+160 / **Defence**+160 / **Break**+480 | **CONFIRMED our tracked Chestnut-rose** - PV/ATK/DEF exact match to our own confirmed 18-star reading. Special attr TYPES mismatch our confirmed real ones (we have Crit+160@161, Tenacity+240@241, Block+480@321 - not Attack/Defence/Break) - **FLAGGED, see Chunk 2** |
| 7 | Margarida | Daisy (LOW CONFIDENCE match to our tracked "Marigold" - "Margarida" literally means Daisy in Portuguese, not Marigold; likely a localization-naming choice, not a different species - see note) | Earth | Group Attack, Damage Increase | 110600 | 48960 | 7344 | 4896 | Crit+200 / Block+200 / Break+300 / Tenacity+600 | **Likely our tracked Marigold** (Earth matches our TODO guess) despite the PT/EN name mismatch |
| 8 | Ninfeia | Water Lily / Nymphaea | Water | Group Healer | 93913 | 35616 | 9921 | 1780 | Attack+170 / Defence+170 / Break+255 / Block+510 | Not tracked |
| 9 | Camélia | Camellia | Wind | Group Attack, Rescue/Aid | 93915 | 39072 | 8870 | 1953 | Tenacity+170 / Block+170 / Crit+255 / Break+510 | Not tracked |
| 10 | Oenothera | Oenothera (Evening Primrose - genus name kept) | Earth | Group Defense, Damage Reduction | 93915 | 61056 | 3052 | 3052 | PV+1700 / Break+170 / Crit+255 / Block+510 | Not tracked |
| 11 | Petúnia | Petunia | Earth | Group Attack, Defence | 110600 | 73440 | 4896 | 7344 | Defence+200 / Tenacity+200 / Block+300 / Break+600 | Not tracked |
| 12 | Lótus | Lotus | Water | Control, DPS | 110600 | 61200 | 6120 | 4896 | PV+2000 / Block+200 / Crit+300 / Tenacity+600 | Name matches our tracked "Lotus" but element (Water vs our unconfirmed "Fire" guess) conflicts, and no ATK@81 (we confirmed ATK@81 directly) - **likely NOT the same fairy, already flagged historically as a mismatch** |
| 13 | Jacinto | Hyacinth | Wind | Group Attack, DPS | 110594 | 52020 | 6120 | 4080 | Attack+200 / Crit+200 / Tenacity+300 / Block+600 | Not tracked |
| 14 | Loureiro | Laurel | Holy | Group Attack, DPS | 155242 | 40543 | 16217 | 6757 | Crit+200 / Break+200 / Block+300 / Tenacity+600 | Not tracked |
| 15 | Viola | Viola / Violet | Water | Group Attack, DPS | 110600 | 73440 | 4896 | 4896 | Break+200 / Block+200 / Crit+300 / Tenacity+600 | Not tracked |
| 16 | Hera | Ivy (PT "hera" = ivy plant, not the Greek goddess) | Holy | Restoration, Control | 155139 | 67579 | 13515 | 4054 | PV+2000 / Attack+200 / Defence+200 / Tenacity+600 | Not tracked |
| 17 | Sakura | Sakura / Cherry Blossom | Holy | Group Attack, DPS | 155141 | 54063 | 10812 | 9460 | Crit+200 / Block+200 / Break+300 / Tenacity+600 | Not tracked |
| 18 | Rosa | Rose | Fire | DPS, Control | 110594 | 61200 | 4896 | 6120 | PV+2000 / Tenacity+200 / Block+300 / Crit+600 | Not tracked (distinct from "Rosa Roxburghii"/Chestnut-rose, "Rosa Azul"/Blue Rose, "Rosa Escarlate"/Scarlet Rose - 4 separate "Rosa"-named fairies in this list) |
| 19 | Dália | Dahlia | Wind | DPS, Control | 110600 | 48960 | 7344 | 4896 | Attack+200 / Tenacity+200 / Break+300 / Block+600 | Not tracked |
| 20 | Amarílis | Amaryllis | Holy | DPS, Restoration | 155142 | 108126 | 10812 | 2703 | Attack+200 / Break+200 / Block+300 / Crit+600 | Not tracked |
| 21 | Cravina | Carnation (LOW CONFIDENCE - "cravina" is a less common term, possibly a Dianthus/Pink variety) | Earth | Control, DPS | 110600 | 61200 | 6120 | 4896 | Attack+200 / Block+200 / Crit+300 / Tenacity+600 | Not tracked |
| 22 | Ixora | Ixora / Flame of the Woods | Fire | DPS, Additional Damage | 110600 | 73440 | 4896 | 4896 | Crit+200 / Tenacity+200 / Break+300 / Block+600 | Not tracked |
| 23 | Rosmaninho | Rosemary | Water | Control, DPS | 110600 | 85680 | 4080 | 4896 | PV+2000 / Crit+200 / Block+300 / Break+600 | Not tracked |
| 24 | Baronesa | Baroness (LOW CONFIDENCE - not a flower name, likely a themed/story character) | Water | Continuous [Damage], DPS | 112745 | 69890 | 5591 | 5591 | PV+1900 / Attack+190 / Block+285 / Tenacity+570 | Not tracked |
| 25 | Dedaleira | Foxglove | Earth | DPS, Buff | 112739 | 69890 | 5591 | 5591 | Attack+190 / Crit+190 / Block+285 / Break+570 | **Likely our tracked Foxglove** by name - but element is Earth here, conflicting with our TODO-guessed "Water" (never confirmed) - **worth updating our guess to Earth, flagged for review, see Chunk 2** |
| 26 | Branquinha | "Little White One" (LOW CONFIDENCE - a nickname/pet name, not a standard flower) | Holy | Damage Increase, DPS | 158060 | 59136 | 14784 | 7392 | Attack+210 / Crit+210 / Break+315 / Tenacity+630 | Not tracked |
| 27 | Cereja do Inverno | Winter Cherry (Physalis / Chinese Lantern) | Fire | Explosion, Buff | 112741 | 83868 | 4978 | 3733 | PV+1900 / Crit+190 / Tenacity+285 / Block+570 | Not tracked |
| 28 | Milin | Milin (untranslated - appears to be a proper name, not a common noun) | Holy | Buff, Explosion | 158058 | 94617 | 7392 | 5913 | PV+2100 / Crit+210 / Break+315 / Block+630 | Not tracked |
| 29 | Rimuru | Rimuru (crossover character - "That Time I Got Reincarnated as a Slime") | Holy | Buff, DPS | 158061 | 109972 | 7331 | 9164 | PV+2100 / Defence+210 / Tenacity+315 / Block+630 | Not tracked |
| 30 | Diablo | Diablo (crossover character - same series as Rimuru) | Fire | Help/Support, Control | 93913 | 61056 | 6105 | 3052 | Attack+170 / Tenacity+170 / Crit+255 / Block+510 | Not tracked |
| 31 | Edelweiss | Edelweiss (untranslated - already a real flower name in English) | Wind | Debuff, Control | 112742 | 83868 | 4978 | 3733 | Defence+190 / Break+190 / Crit+285 / Block+570 | Not tracked |
| 32 | Rosa Azul | Blue Rose | Water | Explosion, Buff | 112739 | 69890 | 5591 | 5591 | Attack+190 / Tenacity+190 / Block+285 / Break+570 | Not tracked |
| 33 | Murta | Myrtle | Earth | Control, Debuff | 114888 | 75916 | 5061 | 5061 | Attack+200 / Crit+200 / Tenacity+300 / Block+600 | Not tracked |
| 34 | Amendoeira | Almond Tree | Wind | Survival, DPS | 112742 | 69890 | 5591 | 5591 | PV+1900 / Defence+190 / Tenacity+285 / Crit+570 | Not tracked |
| 35 | Hortênsia das Chamas | Flame Hydrangea | Fire | Control, Buff | 112742 | 69890 | 5591 | 5591 | Defence+190 / Break+190 / Block+285 / Crit+570 | Named-variant of Hydrangea (id 4) with a DIFFERENT element (Fire vs Water) - not the same fairy, matches known "themed variant" pattern |
| 36 | Tulipa | Tulip | Earth | DPS, Buff | 112738 | 69890 | 5591 | 5591 | PV+1900 / Block+190 / Break+285 / Tenacity+570 | Not tracked |
| 37 | Gardênia | Gardenia | Water | Control, Damage Increase | 112740 | 93186 | 4978 | 3733 | Attack+190 / Tenacity+190 / Crit+285 / Block+570 | Not tracked |
| 38 | Orquídea Borboleta | Butterfly Orchid | Holy | Survival, DPS | 158057 | 184204 | 7331 | 9164 | PV+2100 / Block+210 / Break+315 / Tenacity+630 | Not tracked |
| 39 | Zínia | Zinnia | Fire | Damage Increase, HP Restoration Restriction | 112746 | 55912 | 6989 | 5591 | Defence+190 / Block+190 / Tenacity+285 / Crit+570 | Not tracked |
| 40 | Flor-Balão Tranquila | Tranquil Balloon Flower | Earth | Monster Attracting (Taunt), Cooldown [Reduction] | 112744 | 55912 | 6989 | 5591 | Attack+190 / Tenacity+190 / Break+285 / Crit+570 | Named-variant of Balloon-flower (id 5) with a DIFFERENT element (Earth vs Wind) - not the same fairy |
| 41 | Shalltear | Shalltear (crossover character - "Overlord") | Fire | Buff, Life Steal | 112745 | 55912 | 6989 | 5591 | Crit+190 / Break+190 / Tenacity+285 / Block+570 | Not tracked |
| 42 | Natsu | Natsu (crossover character - "Fairy Tail") | Fire | DPS, Explosion | 112745 | 55912 | 6989 | 5591 | PV+1900 / Break+190 / Crit+285 / Block+570 | Not tracked |
| 43 | Wendy | Wendy (crossover character - "Fairy Tail") | Wind | Help/Support, Control | 112744 | 74678 | 4978 | 6223 | PV+1900 / Crit+190 / Break+285 / Block+570 | Not tracked |
| 44 | Ainz | Ainz (crossover character - "Overlord") | Wind | Explosion, Break | 114891 | 110712 | 4744 | 3163 | Defence+200 / Block+200 / Tenacity+300 / Break+600 | Not tracked |
| 45 | Albedo | Albedo (crossover character - "Overlord") | Holy | Defence, Buff | 160980 | 111830 | 13046 | 3727 | PV+2200 / Break+220 / Block+330 / Tenacity+660 | Not tracked |
| 46 | Erza | Erza (crossover character - "Fairy Tail") | Holy | Buff, Explosion | 160984 | 125809 | 8387 | 6989 | Defence+220 / Tenacity+220 / Block+330 / Break+660 | Not tracked |
| 47 | Ave do Paraíso | Bird of Paradise | Earth | Control, Buff | 114888 | 66427 | 7591 | 4744 | PV+2000 / Break+200 / Tenacity+300 / Crit+600 | Not tracked |
| 48 | Agente Disciplinar Eritrina | Disciplinary Agent Erythrina | Earth | Buff, DPS | 114888 | 113875 | 3795 | 3795 | Attack+200 / Block+200 / Crit+300 / Tenacity+600 | Named-variant of Erythrina (id 3) with a DIFFERENT element (Earth vs Fire) - **already flagged historically as unrelated despite the name**, confirmed again here |
| 49 | Brilho Primavera - Camélia | Spring Glow - Camellia | Wind | Control, Damage | 114890 | 79080 | 4744 | 6326 | PV+2000 / Crit+200 / Block+300 / Break+600 | Named-variant of Camellia (id 9), SAME element (Wind) this time - possibly a genuine costume/reskin of the same base fairy rather than an unrelated one; stats differ though (79080/4744/6326 vs id9's 39072/8870/1953) so likely still a distinct entry, not simply id9 relisted |
| 50 | Moranguinha | "Little Strawberry" (LOW CONFIDENCE - mascot/pet nickname, not a standard flower) | Holy | DPS, Buff | 160986 | 93192 | 6989 | 11649 | Attack+220 / Tenacity+220 / Break+330 / Crit+660 | Not tracked |
| 51 | Rosa Escarlate | Scarlet Rose | Fire | Buff, Restoration | 114888 | 104385 | 3795 | 4744 | PV+2000 / Break+200 / Crit+300 / Tenacity+600 | Not tracked |
| 52 | Acorina | Acorina (LOW CONFIDENCE - untranslated, possibly an invented name or derived from "açucena"/Madonna Lily) | Water | Buff, Explosion | 114893 | 75916 | 6326 | 5061 | Attack+200 / Tenacity+200 / Crit+300 / Block+600 | Not tracked |
| 53 | Boca de Leão | Snapdragon (literally "Lion's Mouth") | Earth | Damage, Life Steal | 114893 | 94896 | 3163 | 6326 | Defence+200 / Crit+200 / Tenacity+300 / Break+600 | Not tracked |

**Confirmed pattern from this pass:** several fairies appear multiple times under related
names with DIFFERENT elements and DIFFERENT stats (Hydrangea/Flame Hydrangea, Balloon
Flower/Tranquil Balloon Flower, Erythrina/Disciplinary Agent Erythrina, Lotus/Lotus
Bingdi, Camellia/Spring Glow-Camellia) - these read as elemental-variant or
themed/costume fairies that share a flower-type name but are mechanically distinct
fairies, not duplicates or errors. Matches and extends the warning already on record
from before this file was set aside.

## Chunk 2: Precise cross-check against our confirmed Chestnut-rose data

Chestnut-rose (id 6) is the only entry we have an EXACT independent confirmation for
(our own real gameplay data, gathered earlier this session at 18 stars/lvl400/0% Bloom -
the same state this reference list claims for everyone).

**basic_attributes: exact match.** PV 33072, ATK 10683, DEF 1272 - identical to our
confirmed reading, digit for digit. This is a strong, direct validation that this
reference list's `basic_attributes` block is trustworthy, at least for this species and
presumably by extension for the others (no reason to expect Chestnut-rose is special).

**special_attributes: a precise, surgical mismatch - not a wholesale one.**

| Level | Our confirmed (real gameplay) | Reference list | Type match? | Value match? |
|---|---|---|---|---|
| 81  | PV+1600     | PV+1600      | YES | YES |
| 161 | Crit+160    | Attack+160   | no  | YES (both 160) |
| 241 | Tenacity+240| Defence+160  | no  | **no (240 vs 160)** |
| 321 | Block+480   | Break+480    | no  | YES (both 480) |

Notable: **every TYPE differs except level 81**, but **three of four VALUES still match**
exactly despite the type mismatch (160=160, 480=480) - only level_241's value is
genuinely different (240 vs 160). This doesn't cleanly fit either simple theory:
- "Type is random per instance, value is fixed per progression slot regardless of type"
  - would predict ALL FOUR values match (they don't - level_241 breaks this).
- "This reference entry is just stale/pre-nerf" (per the user's Chestnut-rose HP-special-
  attribute nerf example, 1700->1600) - plausible for level_241 specifically (240->160
  would be a real nerf, same direction/shape as the already-confirmed HP nerf), but
  doesn't explain why the TYPES differ at three of four levels while the VALUES mostly
  didn't move.

**UPDATE - RESOLVED in Chunk 3 below, this was NOT a nerf/staleness issue after all.**
The level_241 value difference (240 vs 160) is fully explained by the universal special-
attribute-value formula confirmed in Chunk 3: our real data rolled Tenacity there
(Advanced-pool, scales 1.5x at level_241 -> 160*1.5=240, exact), the reference list
rolled Defence (Fixed-pool, always 1x regardless of slot -> 160*1=160, also exact). Both
values are internally correct under the same formula - the only real unexplained
difference is WHICH TYPE got rolled for each slot, still an open question (see Chunk 3),
not a numeric error or a sign of a balance patch. The type-per-slot randomness itself
remains unexplained, but this specific value mismatch is no longer mysterious.

## Chunk 3: Special attribute value formula - CONFIRMED, exact, 53/53 fairies

**Major finding: every special attribute value in this entire dataset (212 readings -
4 slots x 53 fairies) is exactly explained by one formula, with zero exceptions.**

`value(type, slot) = base_unit(fairy) * multiplier(type, slot)`

Where `base_unit` is fairy-specific (derives cleanly from `level_161`'s value) and
`multiplier` depends on which POOL the type belongs to - directly matching the
Basic/Advanced attribute pool split already established earlier this session from the
Lotus/Chestnut-rose CP-weight investigation:

- **Fixed-pool types (PV, Attack, Defence)** - multiplier is FIXED regardless of which
  slot (81/161/241/321) they land in: **PV = 10x, Attack = 1x, Defence = 1x**. These
  never get more valuable at a later progression - a Defence roll at level_321 is worth
  exactly the same as one at level_81.
- **Advanced-pool types (Crit, Tenacity, Break, Block)** - multiplier depends on SLOT
  POSITION, not type: **1x at level_81 or level_161, 1.5x at level_241, 3x at
  level_321**. These get progressively more valuable the later they're rolled.

`base_unit` clusters exactly with the "power tier" groupings from Chunk 1's power
clustering (verified - each power cluster maps to exactly one base_unit: 93911->160,
93913/93915->170, 110594-110600->200, 112738-112746->190, 114888-114893->200,
155138-155242->200, 158057-158061->210, 160980-160986->220).

**This fully resolves the Chunk 2 "mismatch" - it was never a data quality issue.**
Chestnut-rose's real confirmed level_241 is Tenacity+240 (Advanced-pool, 1.5x * base 160
= 240 - exact). The reference list's level_241 is Defence+160 (Fixed-pool, 1x * base 160
= 160 - ALSO exact, just a different type). Both are internally consistent under the
same universal formula - the two sources simply have different randomly-rolled types for
that slot, not a data error on either side. The type-per-slot randomness itself remains
real and unexplained (still no theory for what determines it), but the VALUE given
whatever type lands there is now fully deterministic and understood.

**Connects to, and may partially explain, the earlier CP special-attribute-weight
finding** (Lotus: ATK-type ~5.00/point, Block-type ~10.00/point; Chestnut-rose: Crit/
Tenacity/Block all ~10.00/point; PV ~0.50/point - see the "Chestnut-rose 3rd
progression" section of game-knowledge.md). Worth checking later: if PV's raw values are
always 10x the base unit while its CP-weight-per-point is ~0.5, that's ~5 CP per
base-unit - similar order of magnitude to Attack-type's ~5.00 CP-weight at 1x base. If
this holds up, the "different CP weight per special-attribute type" finding might be
partly an artifact of this value-scaling formula (types with bigger raw multipliers
naturally show smaller CP-per-point, and vice versa) rather than a fully independent
game-formula fact. Not verified rigorously yet - flagged as a promising lead for a
future session, not claimed as confirmed.

**No formula found (yet) for which TYPE gets assigned to which slot** - remains an open
question, same as it was before this file was analyzed. It doesn't appear to be simply
"random" in an unconstrained way either: across this entire 53-fairy dataset, PV and
Attack are ONLY ever seen at level_81/161 (never 241/321), Defence is seen at
81/161/241 but never 321, and Block is never seen at level_81 (only 161/241/321) - so
there IS some structural constraint on which types are eligible for which slot, just not
(yet) a formula for which specific type within the eligible set gets picked.

## Chunk 4: User-confirmed corrections (species matches + translations)

**Species matches, all confirmed:**
- Erythrina = id 3 "Eritrina" (Fire) - CONFIRMED
- Hydrangea = id 4 "Hortênsia" (Water) - CONFIRMED
- Balloon-flower = id 5 "Flor-Balão" (Wind) - CONFIRMED
- Foxglove = id 25 "Dedaleira" (**Earth**) - CONFIRMED, corrects our earlier unconfirmed
  "Water" guess. `FOXGLOVE.element` updated in `fairySpecies.ts`.
- Marigold = id 7 "Margarida" (Earth) - CONFIRMED. The PT/EN name pairing itself is also
  confirmed correct/intentional (not a mixup) - see translation notes below.

**Lotus, resolved:** id 12 "Lótus" (**Water**) IS our tracked Lotus. id 1
"Lótus Bingdi" translates (per the game's own localization) to **"Twin Lotus"** in
English, element **Holy** - a completely different, unrelated fairy that merely shares
the "Lotus" name fragment, matching the established "duplicate name, different fairy"
pattern from elsewhere in this file. `LOTUS.element` updated from the old unconfirmed
"Fire" guess to the now-confirmed **"Water"** in `fairySpecies.ts`.

**CORRECTION to Chunk 1 - my own error, not the user's:** I originally wrote that
Chestnut-rose's element (Fire, per id 6 "Rosa Roxburghii") "matches our TODO guess" -
this was wrong. The code's actual existing (unconfirmed) guess was **"Earth"**, not
Fire - I mis-stated the comparison without actually checking the current code value.
The reference-list + exact-stat-match evidence is solid (Fire is correct), so
`CHESTNUT_ROSE.element` has been corrected from the wrong "Earth" guess to the
confirmed **"Fire"** in `fairySpecies.ts`. Flagging this transparently since it was a
mistake in the analysis, not a discovery about the game.

**Translations, all confirmed/corrected by the user:**

| id | Name (PT) | Confirmed English name | Notes |
|---|---|---|---|
| 1 | Lótus Bingdi | **Twin Lotus** | Official in-game translation, not "Lotus Bingdi" |
| 7 | Margarida | **Marigold** | Confirmed intentional - PT "margarida" normally means daisy, but this is the game's real EN/PT name pairing for this specific fairy, not a mixup |
| 10 | Oenothera | **Primrose** | |
| 11 | Petúnia | **Daisy** | Notable: PT "petúnia" normally means Petunia, but the game's real EN name is Daisy - combined with #7 above, these two entries' EN/PT flower-name pairings both diverge from the literal translation in ways that look almost swapped (Margarida/daisy->Marigold, Petúnia/petunia->Daisy) - worth keeping in mind that this game's localization does NOT always use literal flower-name translations |
| 21 | Cravina | **Carnation** | Confirmed, matches my original guess |
| 24 | Baronesa | **Eichhornia** (water hyacinth genus) | Not "Baroness" - corrects my earlier guess |
| 26 | Branquinha | **Gypsophila** (baby's breath) | Corrects my earlier "Little White One" guess |
| 28 | Milin | **Milim** | A proper name, but NOT untranslatable as I'd guessed - it's "Milim [Nava]," a character from the SAME anime crossover as Rimuru (id 29) and Diablo (id 30) - "That Time I Got Reincarnated as a Slime." That crossover now has 3 confirmed entries in this list. |
| 50 | Moranguinha | **Snakeberry** (Duchesnea indica / mock strawberry) | A real plant name, not just a cute nickname as I'd guessed |
| 52 | Acorina | **Calamus** (Acorus calamus, sweet flag) | Confirms my tentative "Acorus"-family guess |

All corrected in this doc's understanding; the roster table in Chunk 1 above is left
as originally written (with its now-superseded guesses) rather than edited in place, to
keep an honest record of what was uncertain vs. confirmed and when - treat THIS chunk as
the authoritative/current version for anything it corrects.

## Chunk 5: Special-attribute TYPE-per-slot - resolved as "not a formula" (design choice)

Closes the open question from Chunk 3/end of Chunk 2 ("no formula found (yet) for which
TYPE gets assigned to which slot"). Per the user, directly: **it's not derivable - the
game designers hand-pick each fairy's special-attribute types to shape how that fairy is
meant to behave and compose with others in a team, not by any underlying rule.** There is
a loose thematic tendency (e.g. Fire fairies leaning toward more Block, Water fairies
leaning toward more Break) but explicitly **"nothing that can [be] predicted for future
ones."**

This means the structural constraints noted in Chunk 3 (PV/Attack only at 81/161,
Defence never at 321, Block never at 81) are real patterns in the data but should NOT be
treated as a discoverable rule to reverse-engineer further - they're incidental
byproducts of per-fairy design decisions, not a formula this project can predict ahead of
a fairy's release. Downgrades this from "open question, unsolved" to "answered: by
design, unpredictable" - no further analysis time should go toward guessing it.

## Chunk 6: Cross-catalog pattern search (power, CP formula, shared stat templates)

Prompted by: "couldn't you find any pattern on the catalog entries that would help
confirm or find a new specie?" Ran a numeric pass over all 53 entries (script-based,
`numpy.linalg.lstsq` for the regression). Three real findings, one dead end.

**1. SOLVED: the catalog's "power" field IS Combat Power (CP), not a separate stat.**
Closes the long-standing "8 distinct power tiers" open question from Chunk 1/3 - it was
never a hidden tiering mechanic, just each fairy's displayed CP at the reference
snapshot. Confirmed by exact match: our own directly-gathered real CP reading for
Chestnut-rose at lvl400/18-star was 93911; catalog id 6's `power` is also 93911, to the
digit. Not proven for every entry (we only have one independently-confirmed real CP to
check against) but a 5-digit exact match on the one case we CAN check is not
coincidence.

**2. No single CP formula fits across all 53 fairies - confirms, with real data, what
CP_FORMULA's doc comment already suspected.** Regressed `power` against baseATK, baseDEF,
and each special-attribute type's summed value (10 unknowns, 53 fairies - genuinely
overdetermined, unlike any single-species dataset we've had before, since different
fairies aren't collinear the way one fairy's own single-tier levels are). Best fit:
residual std ~8600 on a ~100k-180k scale (~5-8% relative error) - far too loose to be a
real formula match (contrast: Chestnut-rose's own in-species CP fit had <0.5 residual).
**Conclusion: CP weights are genuinely fairy-specific (or at least archetype-specific),
not a universal cross-species constant** - this was always a live suspicion in
CP_FORMULA's doc comment ("the weights are probably genuinely fairy-specific... but
confirming the ACTUAL per-species weights needs data that breaks the collinearity"); this
is now a data-backed conclusion from 53 independent fairies, not just a caveat about
insufficient data. Adding HP to the regression roughly halves the residual (~5800 vs
~8600) but still doesn't come close to fitting - HP likely does contribute to CP somewhat,
but this doesn't rescue a universal formula.

**3. NEW: fairies share exact, reused "stat templates" - a concrete lead for finding
growth-curve twins of our tracked species.** Grouping all 53 by exact
(ATK, HP, DEF) triple at the lvl400/18-star snapshot: 6 distinct triples are shared by 2+
differently-named, often differently-elemented fairies (e.g. ATK5591/HP69890/DEF5591 is
shared by 6 fairies: Baronesa/Water, Dedaleira/Earth [[our tracked Foxglove]], Rosa
Azul/Water, Amendoeira/Wind, Hortênsia das Chamas/Fire, Tulipa/Earth). What differs
between them is name, element, role text, and which special-attribute TYPE lands on each
slot (matching the user's own point last turn - the game hand-picks role/composition per
fairy) - the underlying numeric stat budget is templated and reused wholesale, not
bespoke per fairy.

**Practical payoff - candidate growth-curve twins for 3 of our 7 tracked species:**
- Foxglove (id 25) shares its exact triple with **5** catalog-only fairies: Baronesa
  (id24), Rosa Azul (id32), Amendoeira (id34), Hortênsia das Chamas (id35), Tulipa (id36).
- Marigold (id7) shares its exact triple with **Dália/Dahlia** (id19).
- Lotus (id12) shares its exact triple with **Cravina/Carnation** (id21).
- Erythrina, Hydrangea, Chestnut-rose have no stat-triple match among the other 52 -
  each is numerically unique in this dataset.

**Caveat, important:** an identical lvl400/18-star stat triple is a strong PRIOR that two
fairies share the same underlying growth curve (baseStats/growthSlope/progressions/
ascendCurve), not proof - the catalog is a single snapshot, so this can't be verified
without at least one more real reading on the candidate fairy. But it turns "gather an
entire multi-point leveling dataset from scratch" into "get one or two readings on Dália/
Cravina/Baronesa etc. and check if they land exactly on Marigold's/Lotus's/Foxglove's
existing curve" - a much cheaper way to grow the number of fully-modeled FairySpecies, if
the user ever owns one of these candidates.

**Minor 4th finding:** Holy-element fairies sit in a systematically higher power/CP band
(mean ~157k) than the other four elements, which cluster together (~109k-111k mean each).
Not useful for predicting individual stats, but a real, simple pattern - a not-yet-seen
Holy fairy is a reasonable bet to land in the higher power tier.

## Chunk 7: GCD/common-divisor sweep across CP, basic attrs, special attrs

Prompted by: "can you check each of 53 on both their cp, basic attr and special attr if
they have some sort of minimum/maximum common multiplier/divisor?" Computed GCDs several
ways across the full roster.

**Basic stats (ATK/HP/DEF) and power/CP: no shared divisor at all.** GCD across all 53
ATK values = 1; same for HP, DEF, and power individually. Per-fairy GCD of a single
fairy's own (ATK, HP, DEF) is usually 1 too - the handful of larger-looking per-fairy
GCDs (e.g. Ixora: gcd(4896,73440,4896)=4896) are just algebraic coincidence from
ATK==DEF plus HP being an exact multiple of that, not evidence of a real shared "unit."
These four numbers look like fully-computed end products with no leftover structure -
consistent with them being independently tuned per fairy (or per stat-template, see
Chunk 6 finding 3), not built from one common building block.

**Special attributes: real structure, this is the interesting one.** Re-verified Chunk
3's "one constant base_unit per fairy across all 4 slots" with zero exceptions again
here. The new finding: **that per-fairy base_unit only takes SIX distinct values across
all 53 fairies: 160, 170, 190, 200, 210, 220** - all multiples of 10, in a narrow band.
Fairies aren't individually stat-tuned for special attributes at all - every fairy is
assigned to one of just 6 discrete "special-attribute tiers," and every fairy sharing a
tier gets numerically identical bonuses at each slot (only WHICH type lands on which slot
differs - confirmed by the user to be a design/composition choice, not a formula, see
Chunk 5).

These 6 tiers line up closely (not perfectly) with the power/CP clusters from Chunk 6:
each power band uses one consistent base_unit, e.g. everything in the 110594-110600 power
band uses base_unit 200, everything in 112738-112746 uses 190, 158057-158061 uses 210,
160980-160986 uses 220. **One clean exception, worth flagging:** Chestnut-rose (power
93911) sits right next to Ninfeia/Diablo/Camélia/Oenothera (power 93913-93915) - nearly
the same CP - but her base_unit is 160 while theirs is 170. This is confirmed correct
(matches our own real gameplay reading exactly, PV1600/ATK160/DEF160/Break480 = base_unit
160), so it's a genuine quirk, not a data error - the one place in the roster where
power-tier and special-attribute-tier don't line up cleanly. Possibly related to her
being the only "Individual"-role fairy in that near-tier band (everyone else there is
Group-role) but that's speculation, not verified.

Base_unit-to-power isn't a clean multiplicative constant either (power/base_unit ranges
~552 to ~776 across the roster, not fixed) - the two are correlated tier-groupings, not
one formula deriving the other.

**The actual minimum common divisor, roster-wide:** GCD across all 212 individual
special-attribute readings (all 4 slots x 53 fairies) = **5**. Every special-attribute
number in this entire dataset is a multiple of 5, no exceptions. (Not a clean 10, even
though every base_unit itself is a multiple of 10 - the 1.5x multiplier at level_241
occasionally turns an even base_unit into an odd-but-still-×5 displayed value, e.g.
190 -> 285 at that slot.) No such floor exists for ATK/HP/DEF/power - those have GCD 1
across the roster, i.e. no universal minimum unit.
