import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import FormField from "./FormField";

afterEach(() => {
  cleanup();
});

describe("FormField", () => {
  it("renders label, htmlFor association, and children", () => {
    render(
      <FormField label="Name" htmlFor="name-input">
        <input id="name-input" />
      </FormField>,
    );

    const label = screen.getByText("Name", { selector: "label" });
    expect(label).toHaveAttribute("for", "name-input");
    expect(screen.getByLabelText("Name")).toHaveAttribute("id", "name-input");
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(
      <FormField label="Name" htmlFor="name-input" required>
        <input id="name-input" />
      </FormField>,
    );

    expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
