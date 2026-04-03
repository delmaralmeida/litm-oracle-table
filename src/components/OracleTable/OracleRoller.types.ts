export type TDiceType = "standard" | "double" | "sum";
export type TMatchType = "exact" | "range";

export interface IOracleRow {
  roll: number | string;
  [key: string]: string | number;
};

export interface IOracleRoller {
  id: string;
  name: string;
  dice: number;
  diceType: TDiceType;
  rows: IOracleRow[];
  displayColumns: string[];
};
