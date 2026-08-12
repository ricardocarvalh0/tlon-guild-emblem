import type { AbilityColor } from "../types/guild.ts";

export const COLORS: AbilityColor[] = ["Orange", "Blue", "Green"];

export const COLOR_VAR: Record<AbilityColor, string> = {
  Orange: "var(--status-orange)",
  Blue: "var(--status-blue)",
  Green: "var(--status-green)",
};

export const COLOR_KEY: Record<AbilityColor, "orange" | "blue" | "green"> = {
  Orange: "orange",
  Blue: "blue",
  Green: "green",
};

export default {};