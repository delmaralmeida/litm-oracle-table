import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import ResultsDisplay from "./ResultsDisplay";
import type { IResult } from "../../types";

afterEach(() => {
  cleanup();
});

describe("ResultsDisplay", () => {
  it("renders null when result is null", () => {
    const { container } = render(<ResultsDisplay result={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders roll and text value when row has text key", () => {
    const result: IResult = {
      roll: 12,
      row: {
        roll: 12,
        text: "Test outcome description",
      },
    };

    render(<ResultsDisplay result={result} />);

    expect(screen.getByText("Roll: 12")).toBeInTheDocument();
    expect(screen.getByText("Test outcome description")).toBeInTheDocument();
  });

  it("renders columns and values when text key is absent", () => {
    const result: IResult = {
      roll: 42,
      row: {
        roll: 42,
        HeaderA: "Value A",
        HeaderB: 99,
      },
    };

    render(<ResultsDisplay result={result} />);

    expect(screen.getByText("Roll: 42")).toBeInTheDocument();

    expect(screen.getByText("HeaderA")).toBeInTheDocument();
    expect(screen.getByText("Value A")).toBeInTheDocument();

    expect(screen.getByText("HeaderB")).toBeInTheDocument();
    expect(screen.getByText("99")).toBeInTheDocument();
  });
});
