import type { TDiceType } from "../types";

/** Roll a single die with N sides. */
function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Basic dice.
 * 
 * Rolls N dice with X sides and returns the sum.
 * 
 * @examples 1d6, 2d6, 4d8, 3d20.
 */
function rollBasicDice(
  count: number,
  sides: number,
): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += rollDie(sides);
  }

  return total;
}

/** Percentile dice. */
function rollPercentileDice(): number {
  const tens = Math.floor(Math.random() * 10);
  const ones = Math.floor(Math.random() * 10);
  const value = tens * 10 + ones;

  return value === 0 ? 100 : value;
}

/**
 * Digit dice.
 * 
 * @examples d66, d666, d88, d567, etc.
 */
function rollDigitDice(
  sidesList: number[],
): number {
  let result = "";

  for (const sides of sidesList) {
    result += rollDie(sides).toString();
  }

  return Number(result);
}

/**
 * Parse basic dice notation.
 * 
 * @examples
 * parseBasicDice("d6") => { count: 1, sides: 6 }
 * parseBasicDice("2d6") => { count: 2, sides: 6 }
 */
function parseBasicDice(notation: string): {
  count: number;
  sides: number;
} {
  const match = notation.match(/^(\d*)d(\d+)$/);

  if (!match) {
    throw new Error(`Invalid basic dice notation: ${notation}`);
  }

  return {
    count: Number(match[1]) || 1,
    sides: Number(match[2]),
  };
}

/**
 * Parse digit dice notation.
 * 
 * @example parseDigitDice("d789") => [7, 8, 9].
 */
function parseDigitDice(notation: string): number[] {
  const match = notation.match(/^d(\d+)$/);

  if (!match) {
    throw new Error(`Invalid digit dice notation: ${notation}`);
  }

  return match[1]
    .split("")
    .map(Number);
}

/**
 * Roll by dice type.
 * 
 * @examples standard d6 vs double d66 vs sum 2d6.
 */
export function rollByType(
  dice: string,
  type: TDiceType,
): number {
  if (type === "basic") {
    const { count, sides } = parseBasicDice(dice);
    return rollBasicDice(count, sides);
  }
  if (type === "percentile") {
    return rollPercentileDice();
  }
  if (type === "digit") {
    const digitSides = parseDigitDice(dice);
    return rollDigitDice(digitSides);
  }

  throw new Error(`Unhandled dice type: ${type}`);
}
