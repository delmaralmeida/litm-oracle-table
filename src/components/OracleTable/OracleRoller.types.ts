export type DiceType = "standard" | "double";

export type OracleRow = {
  roll: number;
  [key: string]: string | number;
};

export type OracleRoller = {
  id: string;
  name: string;
  dice: number;
  diceType: DiceType;
  rows: OracleRow[];
  displayColumns: string[];
};
