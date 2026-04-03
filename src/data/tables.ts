import type { IOracleRoller } from "../components/OracleTable/OracleRoller.types";

export const tables: IOracleRoller[] = [
  {
    id: "mood",
    name: "Mood",
    dice: 6,
    diceType: "sum",
    displayColumns: ["mood"],
    rows: [
      { roll: "2-3", mood: "Despair" },
      { roll: "4-6", mood: "Uneasy" },
      { roll: "7-9", mood: "Neutral" },
      { roll: "10-12", mood: "Hopeful" },
    ]
  },
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
    id: "range",
    name: "Range Oracle",
    dice: 6,
    diceType: "double",
    displayColumns: ["text"],
    rows: [
      { roll: "11-33", text: "A sudden betrayal" },
      { roll: "34-66", text: "A hidden truth" },
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
