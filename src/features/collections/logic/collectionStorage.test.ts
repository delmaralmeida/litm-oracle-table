import { describe, it, expect, beforeEach } from "vitest";

import { runCrudStorageTests } from "@/shared/localStorage";
import collectionStorage from "./collectionStorage";
import makeCollection from "../fixtures";

describe("collectionStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  runCrudStorageTests({
    storage: collectionStorage,
    makeItem: makeCollection,
    storageKey: "table-atlas:collections",
  });

  describe("addTableToCollection", () => {
    it("adds a table ID to a collection when it doesn't already exist", () => {
      const col = makeCollection({ id: "col-1", tableIds: ["t-1"] });
      collectionStorage.add(col);
      collectionStorage.addTableToCollection("col-1", "t-2");

      expect(collectionStorage.getById("col-1")?.tableIds).toEqual(["t-1", "t-2"]);
    });

    it("does not add duplicate table ID to collection", () => {
      const col = makeCollection({ id: "col-1", tableIds: ["t-1"] });
      collectionStorage.add(col);
      collectionStorage.addTableToCollection("col-1", "t-1");

      expect(collectionStorage.getById("col-1")?.tableIds).toEqual(["t-1"]);
    });

    it("throws error if collection does not exist", () => {
      expect(() => {
        collectionStorage.addTableToCollection("non-existent", "t-1");
      }).toThrow(/Collection with id "non-existent" not found/);
    });
  });

  describe("removeTableFromCollection", () => {
    it("removes table ID from collection", () => {
      const col = makeCollection({ id: "col-1", tableIds: ["t-1", "t-2"] });
      collectionStorage.add(col);

      collectionStorage.removeTableFromCollection("col-1", "t-1");

      expect(collectionStorage.getById("col-1")?.tableIds).toEqual(["t-2"]);
    });

    it("does nothing/returns if collection does not exist", () => {
      expect(() => {
        collectionStorage.removeTableFromCollection("non-existent", "t-1");
      }).not.toThrow();
    });
  });
});
