import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SelectionStatusBar from "./SelectionStatusBar.tsx";
import GuildEmblemEffectCard from "./GuildEmblemEffectCard.tsx";
import { GUILD_EMBLEM_EFFECTS } from "../data/guildEmblemEffects";

import { getCompatibility } from "../lib/guildEmblemCompat";

import { COLOR_KEY } from "./utils.ts";

import type { AbilityColor, GuildEmblemEffect } from "../types/guild";
import { type GuildEmblemEffectCardType, TOTAL_GUILD_ABILITY_SLOTS } from "../types/guild";

import "./GuildEmblemPlanner.css";

function effectsByThreshold(effects: GuildEmblemEffectCardType[], color: AbilityColor): GuildEmblemEffectCardType[] {
  const key = COLOR_KEY[color];
  return effects
    .filter((e) => e.color === color)
    .sort((a, b) => b.threshold[key] - a.threshold[key]);
}

export default function GuildEmblemPlanner() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const selectedEffects = useMemo(
    () => GUILD_EMBLEM_EFFECTS.filter((e) => selectedIds.has(e.id)),
    [selectedIds],
  );

  const compatibility = useMemo(
    () => getCompatibility(selectedEffects, GUILD_EMBLEM_EFFECTS),
    [selectedEffects],
  );

  const compatById = useMemo(() => {
    const map = new Map<string, (typeof compatibility)[number]>();
    for (const c of compatibility) map.set(c.effect.id, c);
    return map;
  }, [compatibility]);

  function toggle(effect: GuildEmblemEffect) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(effect.id)) {
        next.delete(effect.id);
      } else {
        next.add(effect.id);
      }
      return next;
    });
  }

  const effectsByColor = GUILD_EMBLEM_EFFECTS.reduce<Record<AbilityColor, GuildEmblemEffectCardType[]>>((res, eff) => {
    if (!res[eff.color]) {
     res[eff.color] = []
    }
    const compat = compatById.get(eff.id)!;
    const disabled = !compat.selected && !compat.compatible;
    res[eff.color].push({ ...eff, disabled, compat })
    return res;
  }, {} as Record<AbilityColor, GuildEmblemEffectCardType[]>)

  return (
    <Box className="guild-ledger" sx={{ textAlign: "left" }}>
      <Box sx={{ maxWidth: 1040, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Typography
          variant="overline"
          sx={{
            color: "var(--ledger-gold)",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
          }}
        >
          Guild Ledger
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontFamily: "var(--font-display)", fontWeight: 600, mb: 1 }}
        >
          Guild Emblem Planner
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--ledger-text-muted)", maxWidth: 640 }}>
          Choose the effects you want to unlock. Each one claims a share of your{" "}
          {TOTAL_GUILD_ABILITY_SLOTS} Guild Ability slots - pick one to see what else
          still fits.
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "var(--ledger-text-muted)", display: "block", mt: 0.5 }}
        >
          Grouped by which Emblem grants each effect - not by which Ability panel it
          comes from.
        </Typography>

        <SelectionStatusBar toggle={toggle} selectedEffects={selectedEffects} setSelectedIds={setSelectedIds} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2.5,
          }}
        >
          {(Object.keys(effectsByColor) as Array<keyof typeof effectsByColor>).map((colour: AbilityColor) => {
            const enabledEffects = effectsByColor[colour].filter(eff => !eff.disabled);
            const disabledEffects = effectsByColor[colour].filter(eff => eff.disabled);
            const enabledEffectsByThreshold = effectsByThreshold(enabledEffects, colour)
            const disabledEffectsByThreshold = effectsByThreshold(disabledEffects, colour)
            const allEffects = [...enabledEffectsByThreshold, ...disabledEffectsByThreshold];
            return (
              <Stack key={ colour } spacing={ 1.5 }>
                { allEffects.map((ef) => (
                  <GuildEmblemEffectCard effect={ ef } toggle={ toggle }/>
                )) }
              </Stack>
            )
          })}
        </Box>
      </Box>
    </Box>
  );
}
