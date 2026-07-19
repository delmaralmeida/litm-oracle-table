import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/shared/testing";
import { tableStorage } from "../../logic";
import TableCreate from "./TableCreate";

const newTableId = "00000000-0000-0000-0000-000000000001";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(crypto, "randomUUID").mockReturnValue(newTableId);
});

function renderCreate() {
  return renderWithRouter({
    initialEntries: ["/tables/new"],
    routes: [
      { path: "/tables/new", element: <TableCreate /> },
      { path: "/tables", element: <div>tables-list</div> },
    ],
  });
}

describe("TableCreate", () => {
  it("renders form fields", () => {
    renderCreate();

    expect(screen.getByRole("heading", { name: "New Table" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Description/)).toBeInTheDocument();
  });

  it("shows validation error when name is empty", async () => {
    const user = userEvent.setup();
    renderCreate();

    await user.click(screen.getByRole("button", { name: "Create Table" }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(tableStorage.getAll()).toEqual([]);
  });

  it("creates table and navigates to tables path on valid submit", async () => {
    const user = userEvent.setup();
    renderCreate();

    await user.type(screen.getByLabelText(/^Name/), "  Wilderness  ");
    await user.type(screen.getByLabelText(/^Description/), "  Outdoor tables  ");
    await user.click(screen.getByRole("button", { name: "Create Table" }));

    expect(tableStorage.getById(newTableId)).toEqual({
      id: newTableId,
      name: "Wilderness",
      description: "Outdoor tables",
      dice: "d6",
      diceType: "basic",
      rows: [
        {
          roll: "",
          result: "",
        },
      ],
    });
    expect(screen.getByText("tables-list")).toBeInTheDocument();
  });

  it("navigates to tables path on cancel", async () => {
    const user = userEvent.setup();
    renderCreate();

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("tables-list")).toBeInTheDocument();
  });
});
