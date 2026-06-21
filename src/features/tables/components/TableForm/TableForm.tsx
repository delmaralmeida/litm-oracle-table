import { FormPage, useFormState } from "@/shared";
import { RowEditor } from "@/features/tables";
import { TABLE_FORM_FIELDS } from "./constants";
import type { ITableForm, ITableRow } from "@/features/tables/types";

interface ITableFormProps {
  initialFields: ITableForm;
  title: string;
  submitLabel: string;
  backTo: string;
  backLabel: string;
  onCancel: () => void;
  onSubmit: (fields: ITableForm) => void;
};

function validateTableFields(fields: ITableForm): string | null {
  if (!fields.name.trim()) {
    return "Name is required.";
  }
  if (fields.rows.length === 0) {
    return "At least one row is required.";
  }
  return null;
}

export default function TableForm({
  initialFields,
  title,
  submitLabel,
  backTo,
  backLabel,
  onCancel,
  onSubmit,
}: ITableFormProps) {
  const { fields, error, handleFieldChange, handleSubmit } = useFormState({
    initialFields,
    validate: validateTableFields,
    onSubmit,
  });

  return (
    <FormPage
      title={title}
      fields={TABLE_FORM_FIELDS}
      values={fields}
      error={error}
      onFieldChange={handleFieldChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
      backTo={backTo}
      backLabel={backLabel}
      customSections={[
        {
          render: (values, onChange) => (
            <RowEditor
              rows={values.rows as ITableRow[]}
              onChange={(newRows: ITableRow[]) => onChange("rows", newRows)}
            />
          ),
        },
      ]}
    />
  );
}
