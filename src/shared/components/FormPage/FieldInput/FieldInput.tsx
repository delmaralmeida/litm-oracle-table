import type { IFormFieldConfig } from "../types";

interface IFieldInputProps {
  field: IFormFieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function FieldInput({
  field,
  value,
  onChange,
}: IFieldInputProps) {
  const id = field.htmlFor || field.name;

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={id}
          className="form-input form-textarea"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 3}
        />
      );

    case "select":
      return (
        <select
          id={id}
          className="form-input"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "number":
      return (
        <input
          id={id}
          type="number"
          className="form-input"
          value={String(value ?? "")}
          min={field.min}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={field.placeholder}
        />
      );

    default:
      return (
        <input
          id={id}
          type="text"
          className="form-input"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
  }
}
