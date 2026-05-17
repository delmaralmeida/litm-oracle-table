import type { TDiceType } from "@/features/rolling/types";

export interface ITable {
  id: string;
  name: string;
  description?: string;
  dice: number;
  diceType: TDiceType;
  rows: ITableRow[];
  displayColumns: string[];
};

export interface ITableRow {
  roll: number | string;
  [key: string]: string | number;
};

export interface IResults {
  [tableId: string]: IResult | null;
}

export interface IResult {
  roll: number;
  row: ITableRow;
}
