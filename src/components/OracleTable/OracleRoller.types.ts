export type DiceType = "standard" | "double" | "sum";
export type MatchType = "exact" | "range";

export type OracleRow = {
  roll: number | string;
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
