import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RowEditor from "./RowEditor";
import type { ITableRow } from "@/features/tables/types";

afterEach(() => {
  cleanup();
});

describe("RowEditor", () => {
  const initialRows: ITableRow[] = [
    { roll: 1, result: "Value 1" },
    { roll: 2, result: "Value 2" },
  ];

  it("renders the table headers and inputs for initial rows", () => {
    render(<RowEditor rows={initialRows} onChange={() => {}} />);

    expect(screen.getByText("roll")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Value 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Value 2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  it("updates values when editing cells", async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const result = [
      { roll: 1, result: "Value 1x" },
      { roll: 2, result: "Value 2" },
    ];

    render(<RowEditor rows={initialRows} onChange={onChangeSpy} />);

    const firstResultInput = screen.getByDisplayValue("Value 1");
    await user.type(firstResultInput, "x");

    expect(onChangeSpy).toHaveBeenCalledWith(result);
  });

  it("adds a new row when clicking Add Row", async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const result = [
      { roll: 1, result: "Value 1" },
      { roll: 2, result: "Value 2" },
      { roll: "", result: "" },
    ];

    render(<RowEditor rows={initialRows} onChange={onChangeSpy} />);

    await user.click(screen.getByRole("button", { name: "+ Add Row" }));

    expect(onChangeSpy).toHaveBeenCalledWith(result);
  });

  it("removes a row when clicking the remove button", async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const result = [{ roll: 2, result: "Value 2" }];

    render(<RowEditor rows={initialRows} onChange={onChangeSpy} />);

    const removeRowButtons = screen.getAllByRole("button", { name: "Remove row" });
    expect(removeRowButtons).toHaveLength(2);

    await user.click(removeRowButtons[0]);

    expect(onChangeSpy).toHaveBeenCalledWith(result);
  });

  it("adds a new column when clicking Add Column", async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const result = [
      { roll: 1, result: "Value 1", column_1: "" },
      { roll: 2, result: "Value 2", column_1: "" },
    ];

    render(<RowEditor rows={initialRows} onChange={onChangeSpy} />);

    await user.click(screen.getByRole("button", { name: "+ Add Column" }));

    expect(onChangeSpy).toHaveBeenCalledWith(result);
  });

  it("removes a column when clicking the column remove button", async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    const result = [
      { roll: 1 },
      { roll: 2 },
    ];

    render(<RowEditor rows={initialRows} onChange={onChangeSpy} />);

    const removeColButton = screen.getByRole("button", { name: "Remove column result" });
    await user.click(removeColButton);

    expect(onChangeSpy).toHaveBeenCalledWith(result);
  });
});
