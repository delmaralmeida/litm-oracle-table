import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Collections from "./Collections";
import { collectionStorage } from "../../logic";
import makeCollection from "../../fixtures";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

beforeEach(() => {
  localStorage.clear();
});

function renderCollections() {
  return render(
    <MemoryRouter>
      <Collections />
    </MemoryRouter>,
  );
}

describe("Collections", () => {
  it("reads collections from storage on mount", () => {
    const getAllSpy = vi.spyOn(collectionStorage, "getAll");
    renderCollections();

    expect(getAllSpy).toHaveBeenCalled();
  });

  it("renders empty state when no collections exist", () => {
    renderCollections();

    expect(
      screen.getByText("No collections yet. Start by creating a new collection."),
    ).toBeInTheDocument();
  });

  it("renders collection cards for stored collections", () => {
    collectionStorage.add(makeCollection({ id: "col-a", name: "Dungeon Tables" }));
    collectionStorage.add(makeCollection({ id: "col-b", name: "City Tables" }));

    renderCollections();

    expect(screen.getByRole("heading", { name: "Dungeon Tables" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "City Tables" })).toBeInTheDocument();
  });

  it("renders new collection link", () => {
    renderCollections();

    expect(screen.getByRole("link", { name: "+ New Collection" })).toHaveAttribute(
      "href",
      "/collections/new",
    );
  });
});
