import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/shared/testing";
import { tableStorage } from "@/features/tables";
import { makeTable } from "@/features/tables/fixtures";
import { makeCollection } from "@/features/collections/fixtures";
import CollectionShow from "./CollectionShow";
import { collectionStorage } from "../../logic";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const collection = makeCollection({
  name: "Wilderness",
  description: "Outdoor tables",
  tableIds: ["t-1", "t-2"],
});

const tables = [
  makeTable({
    id: "t-1",
    name: "Weather",
    description: "Daily weather",
  }),
  makeTable({
    id: "t-2",
    name: "Encounters",
  }),
];

function renderShow(id = "col-1") {
  return renderWithRouter({
    initialEntries: [`/collections/${id}`],
    routes: [
      { path: "/collections/:id", element: <CollectionShow /> },
      { path: "/collections", element: <div>collections-list</div> },
    ],
  });
}

describe("CollectionShow", () => {
  beforeEach(() => {
    localStorage.clear();
    tableStorage.add(tables[0]);
    tableStorage.add(tables[1]);
    collectionStorage.add(collection);
  });

  it("renders not found when collection does not exist", () => {
    renderShow("missing");

    expect(screen.getByRole("heading", { name: "Collection Not Found" })).toBeInTheDocument();
    expect(
      screen.getByText("The requested collection does not exist."),
    ).toBeInTheDocument();
  });

  it("renders collection metadata", () => {
    renderShow();

    expect(screen.getByRole("heading", { name: "Wilderness" })).toBeInTheDocument();
    expect(screen.getByText("Outdoor tables")).toBeInTheDocument();
    expect(screen.getByText("2 tables")).toBeInTheDocument();
  });

  it("lists tables in the collection", () => {
    renderShow();

    expect(screen.getByRole("heading", { name: "Weather" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Encounters" })).toBeInTheDocument();
  });

  it("renders empty tables message", () => {
    localStorage.clear();
    collectionStorage.add(makeCollection({ name: "Wilderness", tableIds: [] }));

    renderShow();

    expect(screen.getByText("No tables in this collection yet.")).toBeInTheDocument();
  });

  it("renders back link to collections", () => {
    renderShow();

    expect(screen.getByRole("link", { name: "← Collections" })).toHaveAttribute(
      "href",
      "/collections",
    );
  });

  it("renders edit link", () => {
    renderShow();

    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
      "href",
      "/collections/col-1/edit",
    );
  });

  it("deletes collection after confirmation", async () => {
    const user = userEvent.setup();
    renderShow();

    await user.click(screen.getByRole("button", { name: "Delete" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Delete "Wilderness"?')).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Delete" }));

    expect(collectionStorage.getById("col-1")).toBeUndefined();
    expect(screen.getByText("collections-list")).toBeInTheDocument();
  });

  it("closes delete modal on cancel", async () => {
    const user = userEvent.setup();
    renderShow();

    await user.click(screen.getByRole("button", { name: "Delete" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(collectionStorage.getById("col-1")).toEqual(collection);
  });
});
