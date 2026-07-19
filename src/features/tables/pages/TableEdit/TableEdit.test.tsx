import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/shared/testing";
import { tableStorage } from "../../logic";
import { makeTable } from "../../fixtures";
import TableEdit from "./TableEdit";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const table = makeTable({
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

function renderEdit(id = "t-1") {
  return renderWithRouter({
    initialEntries: [`/tables/${id}/edit`],
    routes: [
      { path: "/tables/:id/edit", element: <TableEdit /> },
      { path: "/tables/:id", element: <div>table-show</div> },
      { path: "/tables", element: <div>tables-list</div> },
    ],
  });
}

describe("TableEdit", () => {
  beforeEach(() => {
    localStorage.clear();
    tableStorage.add(table);
  });

  it("renders form fields", () => {
    renderEdit();

    expect(screen.getByRole("heading", { name: "Edit Table" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Description/)).toBeInTheDocument();
  });

  it("renders not found when table does not exist", () => {
    renderEdit("missing");

    expect(screen.getByRole("heading", { name: "Table Not Found" })).toBeInTheDocument();
    expect(
      screen.getByText("The requested table does not exist."),
    ).toBeInTheDocument();
  });

  it("prefills form with table data", () => {
    renderEdit();

    expect(screen.getByLabelText(/^Name/)).toHaveValue("Wilderness");
    expect(screen.getByLabelText(/^Description/)).toHaveValue("Outdoor tables");
  });

  it("shows validation error when name is empty", async () => {
    renderEdit();
    const user = userEvent.setup();

    await user.clear(screen.getByLabelText(/^Name/));
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
  });

  it("updates table and navigates on valid submit", async () => {
    renderEdit();
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText(/^Name/);
    const descriptionInput = screen.getByLabelText(/^Description/);

    await user.clear(nameInput);
    await user.type(nameInput, "  Updated Name  ");
    await user.clear(descriptionInput);
    await user.type(descriptionInput, "  Updated description  ");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(tableStorage.getById("t-1")).toEqual({
      ...table,
      name: "Updated Name",
      description: "Updated description",
    });
    expect(screen.getByText("table-show")).toBeInTheDocument();
  });

  it("navigates to table show on cancel", async () => {
    renderEdit();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("table-show")).toBeInTheDocument();
  });
});
