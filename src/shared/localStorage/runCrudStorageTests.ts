import { describe, it, expect, beforeEach } from "vitest";
import type { ICollection } from "@/features/collections/types";
import type { ITable } from "@/features/tables/types";

interface CrudTestOptions<T extends { id: string }> {
  storage: {
    getAll(): T[];
    getById(id: string): T | undefined;
    add(item: T): void;
    update(item: T): void;
    remove(id: string): void;
    clear(): void;
  };
  makeItem: (overrides?: Partial<ITable> | Partial<ICollection>) => T;
  storageKey: string;
}

export function runCrudStorageTests<T extends { id: string }>({
  storage,
  makeItem,
  storageKey,
}: CrudTestOptions<T>) {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getAll", () => {
    it("returns an empty array when storage is empty", () => {
      expect(storage.getAll()).toEqual([]);
    });

    it("returns all stored items", () => {
      const a = makeItem({ id: "a" });
      const b = makeItem({ id: "b" });
      storage.add(a);
      storage.add(b);

      expect(storage.getAll()).toEqual([a, b]);
    });

    it("returns empty array on corrupt JSON", () => {
      localStorage.setItem(storageKey, "invalid-json{{");

      expect(storage.getAll()).toEqual([]);
    });
  });

  describe("getById", () => {
    it("returns matching item", () => {
      const item = makeItem({ id: "abc" });
      storage.add(item);

      expect(storage.getById("abc")).toEqual(item);
    });
  });

  describe("add", () => {
    it("persists item", () => {
      const item = makeItem();
      storage.add(item);

      expect(storage.getAll()).toEqual([item]);
    });

    it("throws on duplicate id", () => {
      storage.add(makeItem({ id: "dup" }));

      expect(() =>
        storage.add(makeItem({ id: "dup" })),
      ).toThrow(/already exists/i);
    });
  });

  describe("update", () => {
    it("updates item", () => {
      storage.add(makeItem({ id: "u1" }));
      storage.update(makeItem({ id: "u1" }));

      expect(storage.getById("u1")).toBeDefined();
    });
  });

  describe("remove", () => {
    it("removes item", () => {
      storage.add(makeItem({ id: "del" }));
      storage.remove("del");

      expect(storage.getById("del")).toBeUndefined();
    });
  });

  describe("clear", () => {
    it("clears storage", () => {
      storage.add(makeItem());
      storage.clear();

      expect(storage.getAll()).toEqual([]);
    });
  });
}
