import type { TDiceType } from "../components/OracleTable/OracleRoller.types";

/**
 * Rolls a standard die.
 * 
 * @examples
 * d2, d3, d6, d12, d13, d20, d100, etc.
 */
export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Rolls a repeated-digit die.
 * 
 * @examples
 * d22, d66, d99, etc.
 */
type DoubleDigitSides = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export function rollDoubleDigitDice(sides: DoubleDigitSides): number {
  const tens = rollDice(sides);
  const ones = rollDice(sides);

  return tens * 10 + ones;
}

/**
 * Rolls multiple dice and returns the sum.
 * 
 * @examples
 * 2d6 => 1 + 3 = 4.
 */
export function rollSumDice(count: number, sides: number): number {
  let total = 0;

  for (let i = 0; i < count; i++) {
    total += rollDice(sides);
  }

  return total;
}

/**
 * Roll by dice type.
 * 
 * @examples standard d6 vs double d66 vs sum 2d6.
 */
export function rollByType(
  dice: number,
  type: TDiceType,
): number {
  if (type === "double") {
    return rollDoubleDigitDice(dice as DoubleDigitSides);
  }

  if (type === "sum") {
    return rollSumDice(2, dice);
  }

  return rollDice(dice);
}
