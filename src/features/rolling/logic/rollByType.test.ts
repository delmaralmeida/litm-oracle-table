import { describe, expect, it, vi, beforeEach } from "vitest";
import { rollByType } from "./rollByType";
import type { TDiceType } from "../types";

describe("rollByType", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockSingleDice = (value: number) => {
    vi.spyOn(Math, "random").mockReturnValue(value);
  };

  const mockDoubleDice = (tens: number, ones: number) => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(tens)
      .mockReturnValueOnce(ones);
  };

  const result = (number: number, type: TDiceType) => {
    return rollByType(number, type);
  };

  describe("Standard dice", () => {
    it("rolls min result", () => {
      mockSingleDice(0.1);
      expect(result(6, "standard")).toBe(1);
    });

    it("rolls max result", () => {
      mockSingleDice(0.9);
      expect(result(6, "standard")).toBe(6);
    });

    it("falls back to standard roll for unknown types", () => {
      mockSingleDice(0.5);
      expect(rollByType(6, "unknown" as TDiceType)).toBe(4);
    });
  });

  describe("Double dice", () => {
    it("rolls min result", () => {
      mockDoubleDice(0.1, 0.1);
      expect(result(6, "double")).toBe(11);
    });

    it("rolls max result", () => {
      mockDoubleDice(0.9, 0.9);
      expect(result(6, "double")).toBe(66);
    });

    it("confirms that tens and ones are independent digits", () => {  
      mockDoubleDice(0.1, 0.9);
      expect(rollByType(6, "double")).toBe(16);
    });
  });

  describe("Summed dice", () => {
    it("rolls min result", () => {
      mockSingleDice(0.1);
      expect(result(6, "sum")).toBe(2);
    });

    it("rolls max result", () => {
      mockSingleDice(0.9);
      expect(result(6, "sum")).toBe(12);
    });

    it("confirms that rolls are exactly 2 dice", () => {
      const spy = vi.spyOn(Math, "random").mockReturnValue(0.5);

      rollByType(6, "sum");
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
