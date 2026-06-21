import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableHead from "./TableHead";

afterEach(() => {
  cleanup();
});

interface RenderTableHeadProps {
  name?: string;
  isRoll?: boolean;
  onRename?: (value: string) => void;
  onRemove?: () => void;
}

function renderTableHead({
  name = "result",
  isRoll = false,
  onRename = () => {},
  onRemove = () => {},
}: RenderTableHeadProps = {}) {
  render(
    <TableHead name={name} isRoll={isRoll} onRename={onRename} onRemove={onRemove} />
  );
};

describe("TableHead", () => {
  it("renders roll header without input or remove button when isRoll is true", () => {
    renderTableHead({ name: "roll", isRoll: true });

    expect(screen.getByText("roll")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders text input and remove button when isRoll is false", () => {
    renderTableHead({});

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("result");
    expect(screen.getByRole("button", { name: "Remove column result" })).toBeInTheDocument();
  });

  it("calls onRename with trimmed value on blur or enter", async () => {
    const user = userEvent.setup();
    const onRenameSpy = vi.fn();

    renderTableHead({ onRename: onRenameSpy });

    const input = screen.getByRole("textbox");

    // Test blur
    await user.clear(input);
    await user.type(input, " new_col ");
    expect(onRenameSpy).not.toHaveBeenCalled();
    
    await user.click(document.body);
    expect(onRenameSpy).toHaveBeenCalledWith("new_col");

    // Test enter key
    onRenameSpy.mockClear();

    await user.click(input);
    await user.clear(input);
    await user.type(input, " other_col {Enter}");
    expect(onRenameSpy).toHaveBeenCalledWith("other_col");
  });

  it("calls onRemove when clicking the remove button", async () => {
    const user = userEvent.setup();
    const onRemoveSpy = vi.fn();

    renderTableHead({ onRemove: onRemoveSpy });

    await user.click(screen.getByRole("button", { name: "Remove column result" }));
    expect(onRemoveSpy).toHaveBeenCalled();
  });
});
