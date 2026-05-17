import type { ITable } from "../../types";

interface IProps {
  tables: ITable[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

function TableSelector({
  tables,
  currentIndex,
  onSelect,
}: IProps) {
  return (
    <>
      <h2>Available Tables</h2>

      <div className="grid-wrapper max-5-columns">
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

export default TableSelector;
