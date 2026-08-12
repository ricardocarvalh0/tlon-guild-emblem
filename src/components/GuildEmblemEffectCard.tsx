import type { CSSProperties } from "react";
import Box from "@mui/material/Box";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { COLOR_VAR } from "./utils.ts";
import { type GuildEmblemEffect, type GuildEmblemEffectCardType, TOTAL_GUILD_ABILITY_SLOTS } from "../types/guild.ts";
import Tooltip from "@mui/material/Tooltip";

export function GuildEmblemEffectCard({ effect, toggle }: { effect: GuildEmblemEffectCardType, toggle: (x: GuildEmblemEffect) => void }) {
  const { disabled, compat, color } = effect
  const cardClassName = [
    "ledger-card",
    compat.selected ? "ledger-card--selected" : "",
    disabled ? "ledger-card--incompatible" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Box
      key={ effect.id }
      className={ cardClassName }
      sx={
        compat.selected
          ? ({ "--ledger-card-color": COLOR_VAR[color] } as CSSProperties)
          : undefined
      }
    >
      { compat.selected && (
        <Box className="ledger-card__badge" aria-hidden="true">
          <CheckRoundedIcon sx={ { fontSize: 14 } }/>
        </Box>
      ) }
      { disabled && (
        <Box className="ledger-card__lock" aria-hidden="true">
          <LockRoundedIcon sx={ { fontSize: 13 } }/>
        </Box>
      ) }
      <CardActionArea
        disableRipple
        disabled={ disabled }
        onClick={ () => toggle(effect) }
        className="ledger-card__action"
        sx={ { p: 1.5, borderRadius: "10px" } }
      >
        <Stack
          direction="row"
          sx={ { justifyContent: "space-between", alignItems: "baseline" } }
        >
          <Typography variant="body1" sx={ { fontWeight: 600, color: COLOR_VAR[effect.color] } }>
            { effect.name }
          </Typography>
          <Stack
            direction="row"
            sx={ { justifyContent: "center", alignItems: "baseline" } }
          >
            <Chip
              label={ effect.threshold.orange }
              sx={ {
                fontFamily: "var(--font-data)",
                fontSize: 11,
                backgroundColor: "var(--ledger-bg)",
                color: "var(--status-orange-light)",
                border: "1px solid var(--ledger-border)",
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              } }
            />
            <Chip
              label={ effect.threshold.blue }
              sx={ {
                fontFamily: "var(--font-data)",
                fontSize: 11,
                backgroundColor: "var(--ledger-bg)",
                color: "var(--status-blue-light)",
                border: "1px solid var(--ledger-border)",
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              } }
            />
            <Chip
              label={ effect.threshold.green }
              sx={ {
                fontFamily: "var(--font-data)",
                fontSize: 11,
                backgroundColor: "var(--ledger-bg)",
                color: "var(--status-green-light)",
                border: "1px solid var(--ledger-border)",
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0
              } }
            />
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          sx={ { color: "var(--ledger-text)", mt: 0.5 } }
        >
          { effect.description }
        </Typography>
      </CardActionArea>
    </Box>
  )
}

export default function GuildEmblemEffectCardWrapper({ effect, toggle }: { effect: GuildEmblemEffectCardType, toggle: (x: GuildEmblemEffect) => void }) {
  const { disabled, compat } = effect
  const overage =
    compat.combinedIfIncluded.orange +
    compat.combinedIfIncluded.blue +
    compat.combinedIfIncluded.green -
    TOTAL_GUILD_ABILITY_SLOTS;
  const reason = disabled
    ? `Needs Orange ${compat.combinedIfIncluded.orange} · Blue ${compat.combinedIfIncluded.blue} · Green ${compat.combinedIfIncluded.green} - ${overage} more than your ${TOTAL_GUILD_ABILITY_SLOTS} slots.`
    : "";
  return disabled ? (
    <Tooltip key={effect.id} title={reason} arrow placement="top">
      <span><GuildEmblemEffectCard effect={effect} toggle={toggle}  /></span>
    </Tooltip>
  ) : (
    <GuildEmblemEffectCard effect={effect} toggle={toggle}  />
  );
}