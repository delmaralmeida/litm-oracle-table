import type { IFormFieldConfig } from "@/shared/components/FormPage/types";
import type { TDiceType } from "../../types";

const DICE_TYPES: TDiceType[] = ["basic", "percentile", "digit"];

export const TABLE_FORM_FIELDS: IFormFieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter table name",
    htmlFor: "table-name",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Optional description",
    rows: 3,
    htmlFor: "table-description",
  },
  {
    name: "diceType",
    label: "Dice Type",
    type: "select",
    options: DICE_TYPES.map((t) => ({ value: t, label: t })),
    htmlFor: "table-dice-type",
  },
  {
    name: "dice",
    label: "Dice",
    type: "text",
    placeholder: "Enter dice (e.g., d6, d20)",
    htmlFor: "table-dice",
  },
];
