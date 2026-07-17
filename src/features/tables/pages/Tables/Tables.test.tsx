import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Tables from "./Tables";
import { tableStorage } from "../../logic";
import { makeTable } from "@/features/tables/fixtures";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

beforeEach(() => {
  localStorage.clear();
});

function renderTables() {
  return render(
    <MemoryRouter>
      <Tables />
    </MemoryRouter>,
  );
}

describe("Tables", () => {
  it("reads tables from storage on mount", () => {
    const getAllSpy = vi.spyOn(tableStorage, "getAll");
    renderTables();

    expect(getAllSpy).toHaveBeenCalled();
  });

  it("renders empty state when no tables exist", () => {
    renderTables();

    expect(
      screen.getByText("No tables yet. Start by creating a new table."),
    ).toBeInTheDocument();
  });

  it("renders table cards for stored tables", () => {
    tableStorage.add(makeTable({ id: "tbl-a", name: "Dungeon Tables" }));
    tableStorage.add(makeTable({ id: "tbl-b", name: "City Tables" }));

    renderTables();

    expect(screen.getByRole("heading", { name: "Dungeon Tables" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "City Tables" })).toBeInTheDocument();
  });

  it("renders new table link", () => {
    renderTables();

    expect(screen.getByRole("link", { name: "+ New Table" })).toHaveAttribute(
      "href",
      "/tables/new",
    );
  });
});
