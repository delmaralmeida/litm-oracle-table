import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/shared/testing";
import { collectionStorage } from "@/features/collections";
import { tableStorage } from "@/features/tables";
import { makeTable } from "@/features/tables/fixtures";
import CollectionCreate from "./CollectionCreate";

const newCollectionId = "00000000-0000-0000-0000-000000000001";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(crypto, "randomUUID").mockReturnValue(newCollectionId);

  tableStorage.add(makeTable({ id: "t-1", name: "Weather Table", rows: [{ roll: 1, text: "Rain" }] }));
  tableStorage.add(makeTable({ id: "t-2", name: "Loot Table", rows: [{ roll: 1, text: "Gold" }] }));
});

function renderCreate() {
  return renderWithRouter({
    initialEntries: ["/collections/new"],
    routes: [
      { path: "/collections/new", element: <CollectionCreate /> },
      { path: "/collections", element: <div>collections-list</div> },
    ],
  });
}

describe("CollectionCreate", () => {
  it("renders form fields and available tables", () => {
    renderCreate();

    expect(screen.getByRole("heading", { name: "New Collection" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Description/)).toBeInTheDocument();
    
    expect(screen.getByText("Weather Table")).toBeInTheDocument();
    expect(screen.getByText("Loot Table")).toBeInTheDocument();
  });

  it("shows validation error when name is empty", async () => {
    const user = userEvent.setup();
    renderCreate();

    await user.click(screen.getByRole("button", { name: "Create Collection" }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(collectionStorage.getAll()).toEqual([]);
  });

  it("creates collection with selected tables and navigates on valid submit", async () => {
    const user = userEvent.setup();
    renderCreate();

    await user.type(screen.getByLabelText(/^Name/), "  Wilderness  ");
    await user.type(screen.getByLabelText(/^Description/), "  Outdoor tables  ");
    await user.click(screen.getByText("Weather Table"));
    await user.click(screen.getByRole("button", { name: "Create Collection" }));

    expect(collectionStorage.getById(newCollectionId)).toEqual({
      id: newCollectionId,
      name: "Wilderness",
      description: "Outdoor tables",
      tableIds: ["t-1"],
    });
    expect(screen.getByText("collections-list")).toBeInTheDocument();
  });

  it("navigates to collections on cancel", async () => {
    const user = userEvent.setup();
    renderCreate();

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("collections-list")).toBeInTheDocument();
  });
});

