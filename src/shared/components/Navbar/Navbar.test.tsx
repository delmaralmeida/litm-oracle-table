import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen } from "@testing-library/react";

import { renderWithRouter } from "@/shared";
import Navbar from "./Navbar";

afterEach(() => {
  cleanup();
});

describe("Navbar", () => {
  it("renders brand link and navigation links", () => {
    renderWithRouter({
      initialEntries: ["/"],
      routes: [
        {
          path: "/",
          element: <Navbar />,
        },
      ],
    });

    const brandLink = screen.getByRole("link", { name: "Table Atlas" });
    expect(brandLink).toHaveAttribute("href", "/");

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");

    const tablesLink = screen.getByRole("link", { name: "Tables" });
    expect(tablesLink).toHaveAttribute("href", "/tables");

    const collectionsLink = screen.getByRole("link", { name: "Collections" });
    expect(collectionsLink).toHaveAttribute("href", "/collections");
  });

  it("marks the active link based on current path (Home)", () => {
    renderWithRouter({
      initialEntries: ["/"],
      routes: [
        {
          path: "*",
          element: <Navbar />,
        },
      ],
    });

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveClass("active");

    const tablesLink = screen.getByRole("link", { name: "Tables" });
    expect(tablesLink).not.toHaveClass("active");
  });

  it("marks the active link based on current path (Tables)", () => {
    renderWithRouter({
      initialEntries: ["/tables"],
      routes: [
        {
          path: "*",
          element: <Navbar />,
        },
      ],
    });

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).not.toHaveClass("active");

    const tablesLink = screen.getByRole("link", { name: "Tables" });
    expect(tablesLink).toHaveClass("active");
  });
});
