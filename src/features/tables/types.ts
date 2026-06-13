import type { TDiceType } from "@/features/rolling/types";

interface TableBase {
  id: string;
  name: string;
  description?: string;
  rows: ITableRow[];
};

type PercentileTable = TableBase & {
  diceType: "percentile";
  dice?: never;
};

type NormalTable = TableBase & {
  diceType: Exclude<TDiceType, "percentile">;
  dice: string;
};

export type ITable = PercentileTable | NormalTable;
export interface ITableRow {
  roll: number | string;
  [key: string]: string | number;
};

export interface IResults {
  [tableId: string]: IResult | null;
}

export interface IResult {
  roll: number | null;
  row: ITableRow;
}
