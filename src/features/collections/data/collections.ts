import type { ICollection } from "../types";

export const collections: ICollection[] = [
  {
    id: "fantasy-pack",
    name: "Fantasy Pack",
    description: "A collection of tables for fantasy settings.",
    tableIds: ["npc-traits", "events"],
  },
  {
    id: "travel-pack",
    name: "Travel Pack",
    description: "A collection of tables for travel and exploration.",
    tableIds: ["weather"],
  },
];
