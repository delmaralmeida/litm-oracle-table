import { useState } from "react";

interface UseFormStateOptions<T extends Record<string, unknown>> {
  initialFields: T;
  onSubmit: (fields: T) => void;
  validate?: (fields: T) => string | null;
}

/** Owns form field state, validation and submittion */
export function useFormState<T extends Record<string, unknown>>({
  initialFields,
  onSubmit,
  validate,
}: UseFormStateOptions<T>) {
  const [fields, setFields] = useState(initialFields);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFields((prev) => ({ ...prev, [fieldName]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Run custom validation if provided
    if (validate) {
      const validationError = validate(fields);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    try {
      onSubmit(fields);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  return {
    fields,
    error,
    setError,
    handleFieldChange,
    handleSubmit,
  };
}
