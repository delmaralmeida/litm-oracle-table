import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "../../test/renderWithRouter";
import FormPage from "./FormPage";
import type { IFormFieldConfig } from "./types";

afterEach(() => {
  cleanup();
});

describe("FormPage", () => {
  const defaultFields: IFormFieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
    },
    {
      name: "custom_field",
      label: "Custom Field",
      type: "custom",
      render: (value, onChange) => (
        <button
          type="button"
          data-testid="custom-btn"
          onClick={() => onChange("custom-value")}
        >
          Custom: {String(value ?? "")}
        </button>
      ),
    },
  ];

  const defaultValues = {
    name: "Initial Name",
    custom_field: "Initial Custom",
  };

  function renderFormPage(props: Partial<React.ComponentProps<typeof FormPage>> = {}) {
    return renderWithRouter({
      initialEntries: ["/form"],
      routes: [
        {
          path: "/form",
          element: (
            <FormPage
              title="Test Form Title"
              fields={defaultFields}
              values={defaultValues}
              error={null}
              onFieldChange={vi.fn()}
              onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit?.(e);
              }}
              onCancel={vi.fn()}
              submitLabel="Save"
              backTo="/back"
              backLabel="Back"
              {...props}
            />
          ),
        },
      ],
    });
  }

  it("renders title, fields, customSections, and buttons inside form-card", async () => {
    const user = userEvent.setup();
    const onFieldChange = vi.fn();
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    const customSections = [
      {
        render: (values: Record<string, unknown>, onChange: (name: string, value: unknown) => void) => (
          <div data-testid="custom-section">
            Section with {String(values.name)}
            <button type="button" onClick={() => onChange("name", "Section Name")}>
              Change in Section
            </button>
          </div>
        ),
      },
    ];

    renderFormPage({
      onFieldChange,
      onSubmit,
      onCancel,
      customSections,
      error: "An error occurred",
    });

    expect(screen.getByRole("heading", { name: "Test Form Title" })).toBeInTheDocument();
    expect(screen.getByText("An error occurred")).toBeInTheDocument();

    const textInput = screen.getByPlaceholderText("Enter name");
    expect(textInput).toHaveValue("Initial Name");
    await user.type(textInput, "New Name");
    expect(onFieldChange).toHaveBeenCalledWith("name", "Initial NameN");

    const customBtn = screen.getByTestId("custom-btn");
    expect(customBtn).toHaveTextContent("Custom: Initial Custom");
    await user.click(customBtn);
    expect(onFieldChange).toHaveBeenCalledWith("custom_field", "custom-value");

    expect(screen.getByTestId("custom-section")).toHaveTextContent("Section with Initial Name");
    const sectionBtn = screen.getByRole("button", { name: "Change in Section" });
    await user.click(sectionBtn);
    expect(onFieldChange).toHaveBeenCalledWith("name", "Section Name");

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledOnce();

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
