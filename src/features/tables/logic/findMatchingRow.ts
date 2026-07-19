import type { ITableRow } from "../types";

/** Parses a value like "1-3" into a range of numbers */
function parseRange(value: string): [number, number] | null {
  const parts = value.split("-");
  if (parts.length !== 2) return null;

  const min = Number(parts[0]);
  const max = Number(parts[1]);
  if (isNaN(min) || isNaN(max)) return null;

  return [min, max];
}

/** Matches a string roll value (range or number) against a numeric roll */
function matchStringRoll(rollString: string, roll: number): boolean {
  const range = parseRange(rollString);
  if (range) {
    const [min, max] = range;
    return roll >= min && roll <= max;
  }

  const numericValue = parseInt(rollString, 10);
  if (!isNaN(numericValue) && String(numericValue) === rollString) {
    return numericValue === roll;
  }

  return false;
}

/**
 * Matches roll result with existing column row rolls.
 * 
 * @examples
 * 4, 66, "5", "1-3", etc.
 */
export default function findMatchingRow(
  rows: ITableRow[],
  roll: number,
): ITableRow | undefined {
  return rows.find((row) => {

    if (typeof row.roll === "number") {
      return row.roll === roll;
    }

    if (typeof row.roll === "string") {
      return matchStringRoll(row.roll, roll);
    }

    return false;
  });
}
