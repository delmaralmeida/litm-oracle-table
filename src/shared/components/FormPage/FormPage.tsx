import PageHeader from "../PageHeader/PageHeader";
// TODO: remove PageHeader component, this should be used inside parent componet.
import FormField from "./FormField/FormField";
import FieldInput from "./FieldInput/FieldInput";
import type { FormPageProps } from "./types";

export default function FormPage({
  title,
  fields,
  values,
  error,
  onFieldChange,
  onSubmit,
  onCancel,
  submitLabel,
  backTo,
  backLabel,
  customSections,
}: FormPageProps) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} backTo={backTo} backLabel={backLabel} />

      <div className="form-card">
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={onSubmit} className="form" noValidate>
          {fields.map((field) => {
            if (field.type === "custom" && field.render) {
              return (
                <div key={field.name}>
                  {field.render(
                    values[field.name],
                    (value) => onFieldChange(field.name, value),
                  )}
                </div>
              );
            }

            return (
              <FormField
                key={field.name}
                label={field.label}
                htmlFor={field.htmlFor || field.name}
                required={field.required}
              >
                <FieldInput
                  field={field}
                  value={values[field.name]}
                  onChange={(value) => onFieldChange(field.name, value)}
                />
              </FormField>
            );
          })}

          {customSections?.map((section, index) => (
            <div key={index}>{section.render(values, onFieldChange)}</div>
          ))}

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
