import "./FormField.css";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, htmlFor, required, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="form-label">
        {label}
        {required && <span className="form-required"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default FormField;
