import { Link } from "react-router-dom";
import type { ITable } from "../../types";

interface ITableCardProps {
  table: ITable;
}

export default function TableCard({ table }: ITableCardProps) {
  return (
    <Link to={`/tables/${table.id}`} className="card clickable card-link">
      <h3 className="title">{table.name}</h3>
      {table.description && (
        <p className="description">{table.description}</p>
      )}
      <p className="details">{table.diceType} · {table.dice}</p>
    </Link>
  );
}
