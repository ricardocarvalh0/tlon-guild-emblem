import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SlotTally from "./SlotTally.tsx";
import IconButton from "@mui/material/IconButton";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { COLOR_KEY, COLOR_VAR, COLORS } from "./utils.ts";
import { type GuildEmblemEffect, TOTAL_GUILD_ABILITY_SLOTS } from "../types/guild.ts";
import type { CSSProperties } from "react";
import { combinedThreshold } from "../lib/guildEmblemCompat.ts";


export default function SelectionStatusBar({  selectedEffects, toggle, setSelectedIds }: {
  selectedEffects: GuildEmblemEffect[],
  toggle: (x: GuildEmblemEffect) => void,
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>
}) {

  const required = combinedThreshold(selectedEffects);
  const usedSlots = required.orange + required.blue + required.green;
  const remainingSlots = TOTAL_GUILD_ABILITY_SLOTS - usedSlots;
  return (
    <Box
      sx={{
        mt: 3,
        mb: 4,
        p: 2.5,
        borderRadius: "10px",
        border: "1px solid var(--ledger-plate-border)",
        backgroundColor: "var(--ledger-plate-bg)",
        position: "sticky",
        top: 8,
        zIndex: 1,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between", mb: 1.5 }}
      >
        <Stack direction="row" spacing={2.5} useFlexGap sx={{ flexWrap: "wrap" }}>
          {COLORS.map((color) => (
            <Stack key={color} direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "2px",
                  backgroundColor: COLOR_VAR[color],
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontFamily: "var(--font-data)" }}
              >
                {color} {required[COLOR_KEY[color]]}
              </Typography>
            </Stack>
          ))}
          <Typography variant="body2" sx={{ fontFamily: "var(--font-data)", color: "var(--ledger-text-muted)" }}>
            {usedSlots}/{TOTAL_GUILD_ABILITY_SLOTS} claimed - {remainingSlots} free
          </Typography>
        </Stack>
        <Button
          size="small"
          variant="outlined"
          disabled={selectedEffects.length === 0}
          onClick={() => setSelectedIds(new Set())}
          sx={{
            color: "var(--ledger-text)",
            borderColor: "var(--ledger-border)",
            textTransform: "none",
            "&:hover": { borderColor: "var(--ledger-gold)" },
          }}
        >
          Clear picks
        </Button>
      </Stack>
      <SlotTally counts={required} total={TOTAL_GUILD_ABILITY_SLOTS} />
      {selectedEffects.length === 0 ? (
        <Typography
          variant="caption"
          sx={{ color: "var(--ledger-text-muted)", display: "block", mt: 1 }}
        >
          Nothing claimed yet - every effect fits. Select one to narrow the field.
        </Typography>
      ) : (
        <Stack spacing={0.75} sx={{ mt: 1.5 }}>
          {selectedEffects.map((effect) => (
            <Box
              key={effect.id}
              className="ledger-summary-row"
              sx={{ "--ledger-row-color": COLOR_VAR[effect.color] } as CSSProperties}
            >
              <Box className="ledger-summary-row__dot" aria-hidden="true" />
              <Typography
                variant="body2"
                className="ledger-summary-row__text"
                sx={{ color: "var(--ledger-text)" }}
              >
                {effect.summary}
              </Typography>
              <IconButton
                size="small"
                disableRipple
                className="ledger-summary-row__remove"
                onClick={() => toggle(effect)}
                aria-label={`Remove ${effect.name}`}
                sx={{
                  width: 22,
                  height: 22,
                  padding: 0,
                  borderRadius: "50%",
                  color: "var(--ledger-text)",
                  border: "1px solid var(--ledger-row-color, var(--ledger-gold))",
                  "&:hover": {
                    color: "#1a1408",
                    backgroundColor: "var(--ledger-row-color, var(--ledger-gold))",
                    borderColor: "var(--ledger-row-color, var(--ledger-gold))",
                  },
                }}
              >
                <RemoveRoundedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  )
}