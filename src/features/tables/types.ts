export type TDiceType = "basic" | "percentile" | "digit";

interface TableBase {
  id: string;
  name: string;
  description?: string;
  rows: ITableRow[];
};

type PercentileTable = TableBase & {
  diceType: "percentile";
  dice?: string;
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

export interface ITableForm {
  name: string;
  description: string;
  diceType: TDiceType;
  dice: string;
  rows: ITableRow[];
  [key: string]: unknown;
};

export interface IResults {
  [tableId: string]: IResult | null;
}

export interface IResult {
  roll: number | null;
  row: ITableRow;
}
