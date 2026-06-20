import { Link } from "react-router-dom";
import type { ITable } from "@/features/tables/types";

interface TableCardProps {
  table: ITable;
}

function TableCard({ table }: TableCardProps) {
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

export default TableCard;
