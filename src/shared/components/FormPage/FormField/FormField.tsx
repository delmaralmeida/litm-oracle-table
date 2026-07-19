import "./FormField.css";

interface IFormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, htmlFor, required, children }: IFormFieldProps) {
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
