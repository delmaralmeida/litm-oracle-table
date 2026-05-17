import type { TDiceType, TDoubleDigitSides } from "../types";

/**
 * Rolls a standard die.
 * 
 * @examples
 * d2, d3, d6, d12, d13, d20, d100, etc.
 */
function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Rolls a repeated-digit die.
 * 
 * @examples
 * d22, d66, d99, etc.
 */
function rollDoubleDigitDice(sides: TDoubleDigitSides): number {
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
function rollSumDice(count: number, sides: number): number {
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
    return rollDoubleDigitDice(dice as TDoubleDigitSides);
  }

  if (type === "sum") {
    return rollSumDice(2, dice);
  }

  return rollDice(dice);
}
