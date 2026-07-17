import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CollectionCard from "./CollectionCard";
import makeCollection from "../../fixtures";

afterEach(() => {
  cleanup();
});

function renderCard(collection = makeCollection()) {
  return render(
    <MemoryRouter>
      <CollectionCard collection={collection} />
    </MemoryRouter>,
  );
}

describe("CollectionCard", () => {
  it("renders collection card", () => {
    renderCard(makeCollection({ id: "wilderness", name: "Wilderness" }));

    expect(screen.getByRole("link")).toHaveAttribute("href", "/collections/wilderness");
    expect(screen.getByRole("heading", { name: "Wilderness" })).toBeInTheDocument();
  });

  it("renders description when present", () => {
    renderCard(makeCollection({ description: "Outdoor encounters" }));

    expect(screen.getByText("Outdoor encounters")).toBeInTheDocument();
  });

  it("hides description when absent", () => {
    renderCard(makeCollection({ description: undefined }));

    expect(screen.queryByText("Outdoor encounters")).not.toBeInTheDocument();
  });

  it("shows singular table count", () => {
    renderCard(makeCollection({ tableIds: ["t-1"] }));

    expect(screen.getByText("1 table")).toBeInTheDocument();
  });

  it("shows plural table count", () => {
    renderCard(makeCollection({ tableIds: ["t-1", "t-2"] }));

    expect(screen.getByText("2 tables")).toBeInTheDocument();
  });
});
