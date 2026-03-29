import type { OracleRoller } from "../components/OracleTable/OracleRoller.types";

export const tables: OracleRoller[] = [
  {
    id: "theme",
    name: "Theme Oracle",
    dice: 6,
    diceType: "standard",
    displayColumns: ["concept", "meaning"],
    rows: [
      { roll: 1, concept: "Growth", meaning: "Expansion" },
      { roll: 2, concept: "Decay", meaning: "Decline" },
    ]
  },
  {
    id: "event",
    name: "Event Oracle",
    dice: 6,
    diceType: "standard",
    displayColumns: ["text"],
    rows: [
      { roll: 1, text: "A sudden betrayal" },
      { roll: 2, text: "A mysterious arrival" },
    ]
  },
  {
    id: "complex",
    name: "Complex Oracle",
    dice: 6,
    diceType: "double",
    displayColumns: ["action", "subject"],
    rows: [
      { roll: 11, action: "Attack", subject: "Enemy" },
      { roll: 12, action: "Defend", subject: "Ally" },
    ]
  }
];
