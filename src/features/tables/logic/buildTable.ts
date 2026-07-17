import type { ITable, ITableForm } from "../types";

export default function buildTable(
  id: string,
  fields: ITableForm,
): ITable {
  if (fields.diceType === "percentile") {
    return {
      id,
      name: fields.name.trim(),
      description: fields.description.trim(),
      diceType: "percentile",
      rows: fields.rows,
    };
  }

  return {
    id,
    name: fields.name.trim(),
    description: fields.description.trim(),
    diceType: fields.diceType,
    dice: fields.dice,
    rows: fields.rows,
  };
}
