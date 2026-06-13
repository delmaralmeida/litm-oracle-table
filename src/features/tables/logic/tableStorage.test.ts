import { describe, it, expect, beforeEach } from "vitest";
import tableStorage from "./tableStorage";
import collectionStorage from "@/features/collections/logic/collectionStorage";
import { runCrudStorageTests } from "@/shared/localStorage/runCrudStorageTests";
import type { ITable } from "../types";

function makeTable(overrides: Partial<ITable> = {}): ITable {
  return {
    id: "table-1",
    name: "Test Table",
    dice: "d6",
    diceType: "basic",
    rows: [],
    ...overrides,
  } as ITable;
}

describe("tableStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  runCrudStorageTests({
    storage: tableStorage,
    makeItem: makeTable,
    storageKey: "table-atlas:tables",
  });

  describe("remove", () => {
    it("removes the table ID from all collections that reference it", () => {
      tableStorage.add(makeTable({ id: "t2" }));
      collectionStorage.add({ id: "col-1", name: "Col 1", tableIds: ["t1", "t2"] });
      collectionStorage.add({ id: "col-2", name: "Col 2", tableIds: ["t2"] });
      collectionStorage.add({ id: "col-3", name: "Col 3", tableIds: ["t1"] });

      tableStorage.remove("t2");

      expect(collectionStorage.getById("col-1")?.tableIds).toEqual(["t1"]);
      expect(collectionStorage.getById("col-2")?.tableIds).toEqual([]);
      expect(collectionStorage.getById("col-3")?.tableIds).toEqual(["t1"]);
    });
  });
});
