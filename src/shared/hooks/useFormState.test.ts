import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useFormState } from "./useFormState";
import type { SyntheticEvent } from "react";

const initialFields = { name: "Test", count: 1 };

function submitForm(result: { current: ReturnType<typeof useFormState<typeof initialFields>> }) {
  const preventDefault = vi.fn();
  act(() => {
    result.current.handleSubmit(
      { preventDefault } as unknown as SyntheticEvent<HTMLFormElement>,
    );
  });
  return preventDefault;
}

describe("useFormState", () => {
  it("returns initial fields", () => {
    const { result } = renderHook(() =>
      useFormState({
        initialFields,
        onSubmit: vi.fn(),
      }),
    );

    expect(result.current.fields).toEqual(initialFields);
  });

  it("returns validation error", () => {
    const validate = vi.fn(() => "Name is required.");
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      useFormState({
        initialFields,
        onSubmit,
        validate,
      }),
    );

    submitForm(result);

    expect(validate).toHaveBeenCalledWith(initialFields);
    expect(result.current.error).toBe("Name is required.");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("updates fields and clears error on handleFieldChange", () => {
    const { result } = renderHook(() =>
      useFormState({
        initialFields,
        onSubmit: vi.fn(),
        validate: () => "Name is required.",
      }),
    );

    submitForm(result);
    expect(result.current.error).toBe("Name is required.");

    act(() => {
      result.current.handleFieldChange("name", "Updated");
    });

    expect(result.current.fields).toEqual({ name: "Updated", count: 1 });
    expect(result.current.error).toBeNull();
  });

  it("calls onSubmit on handleSubmit when validation passes", () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      useFormState({
        initialFields,
        onSubmit,
      }),
    );

    const preventDefault = submitForm(result);

    expect(preventDefault).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(initialFields);
    expect(result.current.error).toBeNull();
  });
});
