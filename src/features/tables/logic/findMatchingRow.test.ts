import { describe, it, expect } from "vitest";

import findMatchingRow from "./findMatchingRow";
import type { ITableRow } from "../types";

describe("findMatchingRow", () => {
  describe("numeric roll matching", () => {
    it("should find a row with exact numeric match", () => {
      const rows: ITableRow[] = [
        { roll: 1, text: "Critical Failure" },
        { roll: 5, text: "Normal Result" },
        { roll: 10, text: "Success" },
      ];

      expect(findMatchingRow(rows, 5)?.text).toBe("Normal Result");
    });

    it("should return first match if multiple numeric matches exist", () => {
      const rows: ITableRow[] = [
        { roll: 5, text: "First Match" },
        { roll: 5, text: "Second Match" },
      ];

      expect(findMatchingRow(rows, 5)?.text).toBe("First Match");
    });

    it("should match string number", () => {
      const rows: ITableRow[] = [{ roll: "5", text: "Valid String Number" }];

      expect(findMatchingRow(rows, 5)?.text).toBe("Valid String Number");
    });

    it("should return undefined if no numeric match found", () => {
      const rows: ITableRow[] = [
        { roll: 1, text: "Result 1" },
        { roll: 5, text: "Result 5" },
      ];

      expect(findMatchingRow(rows, 3)).toBeUndefined();
    });
  });

  describe("range roll matching", () => {
    it("should find a row with range string match", () => {
      const rows: ITableRow[] = [
        { roll: "1-3", text: "Low" },
        { roll: "4-6", text: "High" },
      ];

      expect(findMatchingRow(rows, 2)?.text).toBe("Low");
    });

    it("should match different boundaries of range", () => {
      const rows: ITableRow[] = [{ roll: "1-100", text: "Forest" }];

      expect(findMatchingRow(rows, 1)?.text).toBe("Forest");
      expect(findMatchingRow(rows, 50)?.text).toBe("Forest");
      expect(findMatchingRow(rows, 100)?.text).toBe("Forest");
    });

    it("should not match out of range", () => {
      const rows: ITableRow[] = [{ roll: "5-10", text: "Range Result" }];
      const belowRange = findMatchingRow(rows, 4);
      const aboveRange = findMatchingRow(rows, 11);

      expect(belowRange).toBeUndefined();
      expect(aboveRange).toBeUndefined();
    });
  });

  describe("invalid string values", () => {
    it("should return undefined for non-numeric strings", () => {
      const rows: ITableRow[] = [{ roll: "abc", text: "Invalid" }];

      expect(findMatchingRow(rows, 5)).toBeUndefined();
    });

    it("should return undefined for empty string", () => {
      const rows: ITableRow[] = [{ roll: "", text: "Empty" }];

      expect(findMatchingRow(rows, 5)).toBeUndefined();
    });

    it("should return undefined for decimal strings", () => {
      const rows: ITableRow[] = [{ roll: "5.5", text: "Decimal" }];

      expect(findMatchingRow(rows, 5)).toBeUndefined();
    });

    it("should return undefined for hex notation strings", () => {
      const rows: ITableRow[] = [{ roll: "0x5", text: "Hex" }];

      expect(findMatchingRow(rows, 5)).toBeUndefined();
    });

    it("should return undefined for non-numeric range values", () => {
      const rows: ITableRow[] = [{ roll: "a-b", text: "Invalid" }];

      expect(findMatchingRow(rows, 5)).toBeUndefined();
    });

    it("should return undefined for partially numeric range", () => {
      const rows: ITableRow[] = [{ roll: "5-b", text: "Invalid" }];

      expect(findMatchingRow(rows, 5)).toBeUndefined();
    });

    it("should return undefined for multiple dashes", () => {
      const rows: ITableRow[] = [{ roll: "1-5-10", text: "Invalid" }];
  
      expect(findMatchingRow(rows, 5)).toBeUndefined();
    });
  });

  describe("mixed numeric and range rows", () => {
    it("should match numeric roll over range when both exist", () => {
      const rows: ITableRow[] = [
        { roll: "1-3", text: "Range 1-3" },
        { roll: 2, text: "Exact 2" },
        { roll: "4-6", text: "Range 4-6" },
      ];

      expect(findMatchingRow(rows, 2)?.text).toBe("Range 1-3");
    });

    it("should return first matching row (priority)", () => {
      const rows: ITableRow[] = [
        { roll: "1-10", text: "First Match" },
        { roll: 5, text: "Second Match" },
      ];

      expect(findMatchingRow(rows, 5)?.text).toBe("First Match");
    });
  });

  describe("edge cases", () => {
    it("should handle empty rows array", () => {
      expect(findMatchingRow([], 5)).toBeUndefined();
    });

    it("should handle roll value of 0", () => {
      const rows: ITableRow[] = [
        { roll: 0, text: "Zero" },
        { roll: "1-5", text: "Range" },
      ];

      expect(findMatchingRow(rows, 0)?.text).toBe("Zero");
    });

    it("should handle large roll numbers", () => {
      const rows: ITableRow[] = [
        { roll: 1000, text: "Large" },
        { roll: "1000-2000", text: "Large Range" },
      ];

      expect(findMatchingRow(rows, 1500)?.text).toBe("Large Range");
    });

    it("should handle rows with extra properties", () => {
      const rows: ITableRow[] = [
        { roll: "1-5", text: "Result", description: "Extra data", effect: "something" },
      ];

      const result = findMatchingRow(rows, 3);
      expect(result?.text).toBe("Result");
      expect(result?.description).toBe("Extra data");
    });
  });
});
