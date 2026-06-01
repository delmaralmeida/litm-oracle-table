import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ITable, IResult } from "@/features/tables/types";

import * as rollingModule from "@/features/rolling";
import RollAllTablesButton from "./RollAllTablesButton";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const mockTable = (id: string) => ({ id, name: "T", diceType: "standard", dice: 6, rows: [] } as ITable);
const mockRollTableResult = (roll: number) => (
  vi.spyOn(rollingModule, "rollTableResult")
    .mockReturnValue({ roll, row: null } as unknown as IResult)
);

describe("RollAllTablesButton", () => {
  it("renders with correct text and class", () => {
    render(<RollAllTablesButton tables={[]} setResults={vi.fn()} />);
    const btn = screen.getByRole("button", { name: "Roll All Tables" });

    expect(btn).toHaveClass("roll-all-tables");
  });

  it("calls setResults once on click", async () => {
    const user = userEvent.setup();
    const setResults = vi.fn();
    mockRollTableResult(1);

    render(<RollAllTablesButton tables={[mockTable("a")]} setResults={setResults} />);
    await user.click(screen.getByRole("button"));

    expect(setResults).toHaveBeenCalledOnce();
  });

  it("calls rollTableResult for each table", async () => {
    const user = userEvent.setup();
    const spy = mockRollTableResult(1);
    const tables = [mockTable("a"), mockTable("b"), mockTable("c")];

    render(<RollAllTablesButton tables={tables} setResults={vi.fn()} />);
    await user.click(screen.getByRole("button"));

    expect(spy).toHaveBeenCalledTimes(3);
    tables.forEach(t => expect(spy).toHaveBeenCalledWith(t));
  });

  it("calls setResults with empty object when tables is empty", async () => {
    const user = userEvent.setup();
    const setResults = vi.fn();

    render(<RollAllTablesButton tables={[]} setResults={setResults} />);
    await user.click(screen.getByRole("button"));

    expect(setResults).toHaveBeenCalledWith({});
  });

  it("maps each table.id to its rolled result", async () => {
    const user = userEvent.setup();
    const mockResult = { roll: 4, row: null } as unknown as IResult;
    const setResults = vi.fn();
    const tables = [mockTable("x"), mockTable("y")];
    mockRollTableResult(4);

    render(<RollAllTablesButton tables={tables} setResults={setResults} />);
    await user.click(screen.getByRole("button"));

    expect(setResults).toHaveBeenCalledWith({ x: mockResult, y: mockResult });
  });
});
