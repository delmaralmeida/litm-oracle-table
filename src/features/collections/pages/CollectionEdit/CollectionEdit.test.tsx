import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/shared/testing";
import { collectionStorage } from "@/features/collections";
import { makeCollection } from "@/features/collections/fixtures";
import CollectionEdit from "./CollectionEdit";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const collection = makeCollection({
  name: "Wilderness",
  description: "Outdoor tables",
  tableIds: ["t-1"],
});

function renderEdit(id = "col-1") {
  return renderWithRouter({
    initialEntries: [`/collections/${id}/edit`],
    routes: [
      { path: "/collections/:id/edit", element: <CollectionEdit /> },
      { path: "/collections/:id", element: <div>collection-show</div> },
      { path: "/collections", element: <div>collections-list</div> },
    ],
  });
}

describe("CollectionEdit", () => {
  beforeEach(() => {
    localStorage.clear();
    collectionStorage.add(collection);
  });

  it("renders form fields", () => {
    renderEdit();

    expect(screen.getByRole("heading", { name: "Edit Collection" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Description/)).toBeInTheDocument();
  });

  it("renders not found when collection does not exist", () => {
    renderEdit("missing");

    expect(screen.getByRole("heading", { name: "Collection Not Found" })).toBeInTheDocument();
    expect(
      screen.getByText("The requested collection does not exist."),
    ).toBeInTheDocument();
  });

  it("prefills form with collection data", () => {
    renderEdit();

    expect(screen.getByLabelText(/^Name/)).toHaveValue("Wilderness");
    expect(screen.getByLabelText(/^Description/)).toHaveValue("Outdoor tables");
  });

  it("shows validation error when name is empty", async () => {
    const user = userEvent.setup();
    renderEdit();

    await user.clear(screen.getByLabelText(/^Name/));
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(collectionStorage.getById("col-1")).toEqual(collection);
  });

  it("updates collection and navigates on valid submit", async () => {
    const user = userEvent.setup();
    renderEdit();

    await user.clear(screen.getByLabelText(/^Name/));
    await user.type(screen.getByLabelText(/^Name/), "  Updated Name  ");
    await user.clear(screen.getByLabelText(/^Description/));
    await user.type(screen.getByLabelText(/^Description/), "  Updated description  ");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(collectionStorage.getById("col-1")).toEqual({
      ...collection,
      name: "Updated Name",
      description: "Updated description",
    });
    expect(screen.getByText("collection-show")).toBeInTheDocument();
  });

  it("navigates to collection show on cancel", async () => {
    const user = userEvent.setup();
    renderEdit();

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("collection-show")).toBeInTheDocument();
  });
});
