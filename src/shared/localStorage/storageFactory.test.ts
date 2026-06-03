import { describe } from "vitest";
import { storageFactory } from "./storageFactory";
import { runCrudStorageTests } from "./runCrudStorageTests";
import type { ICollection } from "@/features/collections/types";
import type { ITable } from "@/features/tables/types";

interface TestItem {
  id: string;
  name: string;
}

describe("storageFactory", () => {
  const key = "test-factory-key";
  const storage = storageFactory<TestItem>(key);
  const makeItem = (overrides?: Partial<ITable> | Partial<ICollection>): TestItem => ({
    id: overrides?.id ?? "item-1",
    name: "Test Item",
  });

  runCrudStorageTests({
    storage,
    makeItem,
    storageKey: key,
  });
});
