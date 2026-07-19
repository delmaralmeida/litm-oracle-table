import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen } from "@testing-library/react";

import { renderWithRouter } from "@/shared/testing";
import PageHeader from "./PageHeader";

afterEach(() => {
  cleanup();
});

describe("PageHeader", () => {
  it("renders the title", () => {
    renderWithRouter({
      initialEntries: ["/"],
      routes: [
        {
          path: "/",
          element: <PageHeader title="Test Title" />,
        },
      ],
    });

    expect(screen.getByRole("heading", { name: "Test Title" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the back link with default label", () => {
    renderWithRouter({
      initialEntries: ["/"],
      routes: [
        {
          path: "/",
          element: <PageHeader title="Test Title" backTo="/back-path" />,
        },
      ],
    });

    const backLink = screen.getByRole("link", { name: "← Back" });
    expect(backLink).toHaveAttribute("href", "/back-path");
  });

  it("renders both back link and action button when both are provided", () => {
    renderWithRouter({
      initialEntries: ["/"],
      routes: [
        {
          path: "/",
          element: (
            <PageHeader
              title="Test Title"
              backTo="/back-path"
              action={{ label: "Create New", to: "/create" }}
            />
          ),
        },
      ],
    });

    const backLink = screen.getByRole("link", { name: "← Back" });
    const actionLink = screen.getByRole("link", { name: "Create New" });

    expect(backLink).toHaveAttribute("href", "/back-path");
    expect(actionLink).toHaveAttribute("href", "/create");
  });
});
