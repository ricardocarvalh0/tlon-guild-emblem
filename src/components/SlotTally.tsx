import type { ColorCounts } from "../types/guild";

interface SlotTallyProps {
  counts: ColorCounts;
  total: number;
}

/**
 * Renders `total` tally cells, filled left-to-right in Orange -> Blue -> Green order
 * for the given counts, remainder left empty. A literal one-cell-per-slot picture of
 * the fixed Guild Ability budget - see GuildEmblemPlanner.css for the visual styling.
 */
export default function SlotTally({ counts, total }: SlotTallyProps) {
  const cells = Array.from({ length: total }, (_, i) => {
    if (i < counts.orange) return "orange";
    if (i < counts.orange + counts.blue) return "blue";
    if (i < counts.orange + counts.blue + counts.green) return "green";
    return null;
  });

  return (
    <div
      className="ledger-tally"
      role="img"
      aria-label={`${counts.orange + counts.blue + counts.green} of ${total} slots claimed: ${counts.orange} orange, ${counts.blue} blue, ${counts.green} green.`}
    >
      {cells.map((color, i) => (
        <div
          key={i}
          className={`ledger-tally__cell${color ? ` ledger-tally__cell--${color}` : ""}`}
        />
      ))}
    </div>
  );
}
