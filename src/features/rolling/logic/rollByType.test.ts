import { describe, expect, it, vi, beforeEach } from "vitest";
import { rollByType } from "./rollByType";

describe("rollByType", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic dice", () => {
    it("rolls d6 without count prefix", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      expect(rollByType("d6", "basic")).toBe(4);
    });

    it("rolls d6 with min result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.01);
      expect(rollByType("1d6", "basic")).toBe(1);
    });

    it("rolls d6 with max result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      expect(rollByType("1d6", "basic")).toBe(6);
    });

    it("rolls 3d20 with min result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.01);
      expect(rollByType("3d20", "basic")).toBe(3);
    });

    it("rolls 3d20 with max result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      expect(rollByType("3d20", "basic")).toBe(60);
    });

    it("rolls correct number of dice for 3d20", () => {
      const spy = vi.spyOn(Math, "random").mockReturnValue(0.5);

      rollByType("3d20", "basic");
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });

  describe("Percentile dice", () => {
    it("rolls min result of 1", () => {
      vi.spyOn(Math, "random")
        .mockReturnValueOnce(0.01)
        .mockReturnValueOnce(0.11);
      expect(rollByType("", "percentile")).toBe(1);
    });

    it("rolls 100 when result is 0", () => {
      vi.spyOn(Math, "random")
        .mockReturnValueOnce(0.01)
        .mockReturnValueOnce(0.01);
      expect(rollByType("", "percentile")).toBe(100);
    });

    it("rolls max result of 99", () => {
      vi.spyOn(Math, "random")
        .mockReturnValueOnce(0.99)
        .mockReturnValueOnce(0.99);
      expect(rollByType("", "percentile")).toBe(99);
    });
  });

  describe("Digit dice", () => {
    it("rolls d66 with min result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.01);
      expect(rollByType("d66", "digit")).toBe(11);
    });

    it("rolls d66 with max result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      expect(rollByType("d66", "digit")).toBe(66);
    });

    it("rolls d666 with min result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.01);
      expect(rollByType("d666", "digit")).toBe(111);
    });

    it("rolls d666 with max result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      expect(rollByType("d666", "digit")).toBe(666);
    });

    it("rolls d789 with min result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.01);
      expect(rollByType("d789", "digit")).toBe(111);
    });

    it("rolls d789 with max result", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      expect(rollByType("d789", "digit")).toBe(789);
    });

    it("rolls correct number of dice for d666", () => {
      const spy = vi.spyOn(Math, "random").mockReturnValue(0.5);

      rollByType("d666", "digit");
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });
});
