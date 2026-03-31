import type { OracleRow } from "../components/OracleTable/OracleRoller.types";

/** Parses a value like "1-3" into a range of numbers */
function parseRange(value: string): [number, number] | null {
  const parts = value.split("-");

  if (parts.length !== 2) return null;

  const min = Number(parts[0]);
  const max = Number(parts[1]);

  if (isNaN(min) || isNaN(max)) return null;

  return [min, max];
}

/**
 * Matches roll result with existing column row rolls.
 * 
 * @examples
 * 4, 66, "1-3", etc.
 */
export function findMatchingRow(
  rows: OracleRow[],
  roll: number,
): OracleRow | undefined {
  return rows.find((row) => {

    if (typeof row.roll === "number") {
      return row.roll === roll;
    }

    if (typeof row.roll === "string") {
      const range = parseRange(row.roll);

      if (!range) return false;

      const [min, max] = range;

      return roll >= min && roll <= max;
    }

    return false;
  });
}
