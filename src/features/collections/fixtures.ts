import type { ICollection } from "./types";

export default function makeCollection(overrides: Partial<ICollection> = {}): ICollection {
  return {
    id: "col-1",
    name: "Test Collection",
    tableIds: ["t-1", "t-2"],
    ...overrides,
  };
}
