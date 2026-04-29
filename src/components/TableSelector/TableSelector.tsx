import type { ITable } from "../../types/table/table.types";

interface IProps {
  tables: ITable[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function TableSelector({
  tables,
  currentIndex,
  onSelect,
}: IProps) {
  return (
    <>
      <h2>Available Tables</h2>

      <div className="grid grid-props">
        {tables.map((table, index) => (
          <button
            key={table.id}
            onClick={() => onSelect(index)}
            className={index === currentIndex ? "current-selected" : ""}
          >
            {table.name}
          </button>
        ))}
      </div>
    </>
  );
}
