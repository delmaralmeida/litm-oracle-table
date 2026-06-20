import type { ITable } from "./types";

export function makeTable(overrides: Partial<ITable> = {}): ITable {
  return {
    id: "t-1",
    name: "Test Table",
    dice: "d6",
    diceType: "basic",
    rows: [],
    ...overrides,
  } as ITable;
}
