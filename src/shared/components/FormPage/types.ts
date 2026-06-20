import type { ReactNode } from "react";

export type FormFieldType = "text" | "number" | "textarea" | "select" | "custom";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  min?: number;
  options?: Array<{ value: string | number; label: string }>;
  htmlFor?: string;
  render?: (value: unknown, onChange: (v: unknown) => void) => ReactNode;
}

export interface FormPageProps {
  title: string;
  fields: FormFieldConfig[];
  values: Record<string, unknown>;
  error: string | null;
  onFieldChange: (name: string, value: unknown) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  submitLabel: string;
  backTo: string;
  backLabel: string;
  customSections?: Array<{
    render: (values: Record<string, unknown>, onChange: (name: string, value: unknown) => void) => ReactNode;
  }>;
}
