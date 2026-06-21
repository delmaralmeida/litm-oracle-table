import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import TableRow from "./TableRow";
import type { ITableRow } from "@/features/tables/types";

afterEach(() => {
  cleanup();
});

interface renderTableRowProps {
  row?: ITableRow;
  columns?: string[];
  onUpdateCell?: (col: string, value: string) => void;
  onRemove?: () => void;
  isRemoveDisabled?: boolean;
}

function renderTableRow({
  row = { roll: 1 },
  columns = [],
  onUpdateCell = () => {},
  onRemove = () => {},
  isRemoveDisabled = false,
}: renderTableRowProps = {}) {
  render(
    <TableRow
      row={row}
      columns={columns}
      onUpdateCell={onUpdateCell}
      onRemove={onRemove}
      isRemoveDisabled={isRemoveDisabled}
    />
  );
};

describe("TableRow", () => {
  const row: ITableRow = { roll: 1, result: "Value 1", column_1: "Value 2" };
  const columns = ["roll", "result", "column_1"];

  it("renders inputs for each column and remove button", () => {
    renderTableRow({ row, columns });

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Value 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Value 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove row" })).toBeInTheDocument();
  });

  it("calls onUpdateCell when typing in an input", async () => {
    const user = userEvent.setup();
    const onUpdateCellSpy = vi.fn();

    renderTableRow({ row, columns, onUpdateCell:onUpdateCellSpy });

    const input = screen.getByDisplayValue("Value 1");
    await user.type(input, "a");
    expect(onUpdateCellSpy).toHaveBeenCalledWith("result", "Value 1a");
  });

  it("calls onRemove when clicking the remove button", async () => {
    const user = userEvent.setup();
    const onRemoveSpy = vi.fn();

    renderTableRow({ row, columns, onRemove: onRemoveSpy });

    await user.click(screen.getByRole("button", { name: "Remove row" }));
    expect(onRemoveSpy).toHaveBeenCalled();
  });

  it("disables remove button when isRemoveDisabled is true", () => {
    renderTableRow({ row, columns, isRemoveDisabled: true });

    expect(screen.getByRole("button", { name: "Remove row" })).toBeDisabled();
  });
});
