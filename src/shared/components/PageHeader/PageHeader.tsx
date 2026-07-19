import { Link } from "react-router-dom";
import "./PageHeader.css";

interface IPageHeaderProps {
  title: string;
  backTo?: string;
  backLabel?: string;
  action?: {
    label: string;
    to: string;
  };
}

export default function PageHeader({ title, backTo, backLabel = "Back", action }: IPageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-top">
        {backTo && (
          <Link to={backTo} className="back-link">
            ← {backLabel}
          </Link>
        )}
        {action && (
          <Link to={action.to} className="btn btn-primary">
            {action.label}
          </Link>
        )}
      </div>
      <h1>{title}</h1>
    </div>
  );
}
