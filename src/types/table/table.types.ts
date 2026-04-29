export type TDiceType = "standard" | "double" | "sum";
export type TMatchType = "exact" | "range";
export type TDoubleDigitSides = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ITable {
  id: string;
  name: string;
  dice: number;
  diceType: TDiceType;
  rows: ITableRow[];
  displayColumns: string[];
};

export interface ITableRow {
  roll: number | string;
  [key: string]: string | number;
};

export interface IResult {
  roll: number;
  row: ITableRow;
}
