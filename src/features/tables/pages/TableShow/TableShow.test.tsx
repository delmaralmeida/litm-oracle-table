import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/shared/testing";
import { tableStorage } from "@/features/tables";
import { makeTable } from "@/features/tables/fixtures";
import TableShow from "./TableShow";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const table = makeTable({
  name: "Wilderness",
  description: "Outdoor table",
  dice: "d6",
  diceType: "basic",
  rows: [
    {
      roll: "",
      result: "",
    },
  ],
});

function renderShow(id = "t-1") {
  return renderWithRouter({
    initialEntries: [`/tables/${id}`],
    routes: [
      { path: "/tables/:id", element: <TableShow /> },
      { path: "/tables", element: <div>tables-list</div> },
    ],
  });
}

describe("TableShow", () => {
  beforeEach(() => {
    localStorage.clear();
    tableStorage.add(table);
  });

  it("renders not found when table does not exist", () => {
    renderShow("missing");

    expect(screen.getByRole("heading", { name: "Table Not Found" })).toBeInTheDocument();
    expect(
      screen.getByText("The requested table does not exist."),
    ).toBeInTheDocument();
  });

  it("renders table metadata", () => {
    renderShow();

    expect(screen.getByRole("heading", { name: "Wilderness" })).toBeInTheDocument();
    expect(screen.getByText("Outdoor table")).toBeInTheDocument();
    expect(screen.getByText("basic · d6 · 1 row")).toBeInTheDocument();
  });

  it("renders back link to tables", () => {
    renderShow();

    expect(screen.getByRole("link", { name: "← Tables" })).toHaveAttribute(
      "href",
      "/tables",
    );
  });

  it("renders edit link", () => {
    renderShow();

    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
      "href",
      "/tables/t-1/edit",
    );
  });

  // it renders collections associated to this table

  it("deletes table after confirmation", async () => {
    const user = userEvent.setup();
    renderShow();

    await user.click(screen.getByRole("button", { name: "Delete" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Delete "Wilderness"?')).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Delete" }));

    expect(tableStorage.getById("t-1")).toBeUndefined();
    expect(screen.getByText("tables-list")).toBeInTheDocument();
  });

  it("closes delete modal on cancel", async () => {
    const user = userEvent.setup();
    renderShow();

    await user.click(screen.getByRole("button", { name: "Delete" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(tableStorage.getById("t-1")).toEqual(table);
  });
});
