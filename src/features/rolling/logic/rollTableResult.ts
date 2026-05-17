import { findMatchingRow } from "@/features/tables";
import { rollByType } from "./rollByType";
import type { ITable, ITableRow, IResult } from "@/features/tables/types";

function rollTableResult(table: ITable): IResult {
  const roll = rollByType(table.dice, table.diceType);
  const row = findMatchingRow(table.rows, roll);
  const fallbackRow: ITableRow = { roll, text: "No result found" };

  return {
    roll,
    row: row || fallbackRow,
  };
}

export default rollTableResult;
