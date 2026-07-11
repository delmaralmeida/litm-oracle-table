import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FieldInput from "./FieldInput";
import type { FormFieldConfig } from "../types";

afterEach(() => {
  cleanup();
});

describe("FieldInput", () => {
  it("renders textarea, default attributes, and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const field: FormFieldConfig = {
      name: "bio",
      label: "Biography",
      type: "textarea",
      placeholder: "Write biography",
      rows: 5,
    };

    render(
      <FieldInput
        field={field}
        value=""
        onChange={onChange}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("id", "bio");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("placeholder", "Write biography");

    await user.type(textarea, "Hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders select with options", () => {
    const field: FormFieldConfig = {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ],
    };

    render(
      <FieldInput
        field={field}
        value="user"
        onChange={vi.fn()}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("id", "role");
    expect(select).toHaveValue("user");
    expect(screen.getByRole("option", { name: "Admin" })).toHaveAttribute("value", "admin");
    expect(screen.getByRole("option", { name: "User" })).toHaveAttribute("value", "user");
  });

  it("renders number input with min limit", () => {
    const field: FormFieldConfig = {
      name: "age",
      label: "Age",
      type: "number",
      min: 18,
      placeholder: "Enter age",
    };

    render(
      <FieldInput
        field={field}
        value={25}
        onChange={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText("Enter age");
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("id", "age");
    expect(input).toHaveAttribute("min", "18");
    expect(input).toHaveValue(25);
  });

  it("renders text input", () => {
    const field: FormFieldConfig = {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter username",
    };

    render(
      <FieldInput
        field={field}
        value="john_doe"
        onChange={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("id", "username");
    expect(input).toHaveValue("john_doe");
  });
});
