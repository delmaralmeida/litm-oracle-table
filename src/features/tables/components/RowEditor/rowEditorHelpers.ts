import type { ITableRow } from "@/features/tables/types";

export function addRow(
  rows: ITableRow[],
  columns: string[],
): ITableRow[] {
  const newRow: ITableRow = { roll: "" };
  columns.forEach((col) => {
    if (col !== "roll") {
      newRow[col] = "";
    }
  });
  return [...rows, newRow];
}

export function updateRow(
  rows: ITableRow[],
  index: number,
  key: string,
  value: string | number
): ITableRow[] {
  return rows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
}

export function removeRow(rows: ITableRow[], index: number): ITableRow[] {
  return rows.filter((_, i) => i !== index);
}

export function addColumn(rows: ITableRow[], columns: string[]): ITableRow[] {
  let index = 1;
  let newColName = `column_${index}`;
  while (columns.includes(newColName)) {
    index++;
    newColName = `column_${index}`;
  }

  return rows.map((row) => ({
    ...row,
    [newColName]: "",
  }));
}

export function renameColumn(
  rows: ITableRow[],
  columns: string[],
  oldName: string,
  newName: string
): ITableRow[] {
  if (oldName === "roll") return rows;
  if (!newName.trim() || newName === oldName) return rows;
  if (columns.includes(newName)) return rows;

  return rows.map((row) => {
    const newRow: ITableRow = { roll: row.roll };
    for (const key of Object.keys(row)) {
      if (key === oldName) {
        newRow[newName] = row[oldName];
      } else if (key !== "roll") {
        newRow[key] = row[key];
      }
    }
    return newRow;
  });
}

export function removeColumn(rows: ITableRow[], colName: string): ITableRow[] {
  if (colName === "roll") return rows;
  return rows.map((row) => {
    const nextRow = { ...row };
    delete nextRow[colName];
    return nextRow;
  });
}

export function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
  const trimmedValue = e.currentTarget.value.trim();
  if (trimmedValue !== e.currentTarget.value) {
    e.currentTarget.value = trimmedValue;
  }
}

export function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
  if (e.key === "Enter") {
    e.currentTarget.blur();
  }
}
