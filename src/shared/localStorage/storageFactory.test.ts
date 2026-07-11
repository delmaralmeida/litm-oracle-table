import { describe, it, expect } from "vitest";

import storageFactory from "./storageFactory";
import runCrudStorageTests from "./runCrudStorageTests";
import type { ICollection } from "@/features/collections/types";
import type { ITable } from "@/features/tables/types";

interface ITestItem {
  id: string;
  name: string;
}

describe("storageFactory", () => {
  const key = "test-factory-key";
  const storage = storageFactory<ITestItem>(key);
  const makeItem = (overrides?: Partial<ITable> | Partial<ICollection>): ITestItem => ({
    id: overrides?.id ?? "item-1",
    name: "Test Item",
  });

  runCrudStorageTests({
    storage,
    makeItem,
    storageKey: key,
  });

  it("uses custom itemName in error messages", () => {
    const customStorage = storageFactory<ITestItem>("custom-key", "CustomName");
    const item = { id: "a", name: "Item A" };
    customStorage.add(item);

    expect(() => customStorage.add(item)).toThrow(/CustomName with id "a" already exists/);
    expect(() => customStorage.update({ id: "b", name: "Item B" })).toThrow(/CustomName with id "b" not found/);
  });
});
