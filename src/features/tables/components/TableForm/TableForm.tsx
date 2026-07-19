import { FormPage, useFormState } from "@/shared/components/FormPage";
import { TABLE_FORM_FIELDS } from "./constants";
import RowEditor from "./RowEditor/RowEditor";
import type { ITableFormProps, ITableForm, ITableRow } from "./types";
import "./TableForm.css";

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
