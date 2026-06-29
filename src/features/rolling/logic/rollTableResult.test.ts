import { beforeEach, describe, expect, it, vi } from "vitest";

import * as tableModule from "@/features/tables";
import rollByType from "./rollByType";
import rollTableResult from "./rollTableResult";
import type { ITable, ITableRow } from "@/features/tables/types";

vi.mock("./rollByType", () => ({
  default: vi.fn(),
}));

const baseTable = {
  id: "test-table",
  name: "Test Table",
} as Partial<ITable>;

const mockRollByType = (value: number) => {
  vi.mocked(rollByType).mockReturnValue(value);
};

const mockFindMatchingRow = (value: ITableRow | undefined) => {
  vi.spyOn(tableModule, "findMatchingRow").mockReturnValue(value);
};

const result = (value: ITable) => rollTableResult(value);

describe("rollTableResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns correct row", () => {
    const mockedValue: number = 4;
    const tableRow = {
      roll: "4-6",
      text: "Dragon",
      description: "Large fire dragon",
      rarity: "rare",
    };
    const expectedResult = { roll: mockedValue, row: tableRow };

    mockRollByType(mockedValue);
    mockFindMatchingRow(tableRow);

    const table = { ...baseTable };

    expect(result(table as ITable)).toEqual(expectedResult);
  });

  it("confirms rollByType receives the correct configuration", () => {
    const dice: string = "d10";
    const diceType: string = "digit";

    mockRollByType(5);
    mockFindMatchingRow(undefined);

    const table = { ...baseTable, dice: dice, diceType: diceType };

    result(table as ITable);
    expect(rollByType).toHaveBeenCalledWith(dice, diceType);
  });

  it("confirms findMatchingRow receives the correct configuration", () => {
    const mockedValue: number = 7;
    const tableRows = [{ roll: 1, text: "Goblin" }];

    mockRollByType(mockedValue);
    mockFindMatchingRow(undefined);

    const table = { ...baseTable, rows: tableRows };

    result(table as ITable);
    expect(tableModule.findMatchingRow).toHaveBeenCalledWith(tableRows, mockedValue);
  });

  describe("fallback behavior", () => {
    const noResultMessage = "No result found";

    it("returns fallback row when no match exists", () => {
      mockRollByType(99);
      mockFindMatchingRow(undefined);

      const { roll, row } = result({ ...baseTable } as ITable);

      expect(roll).toBe(99);
      expect(row.roll).toBe(99);
      expect(row.text).toBe(noResultMessage);
    });

    it("returns fallback when table has no rows", () => {
      const table = { ...baseTable, rows: [] } as ITable;
      mockRollByType(3);
      mockFindMatchingRow(undefined);

      const { row } = result(table);

      expect(row.text).toBe(noResultMessage);
    });
  });
});
