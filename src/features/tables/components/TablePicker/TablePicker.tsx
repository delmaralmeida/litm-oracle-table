import { tableStorage } from "@/features/tables";
import "./TablePicker.css";

interface IProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

function TablePicker({ selectedIds, onChange }: IProps) {
  const tables = tableStorage.getAll();

  if (tables.length === 0) {
    return <p className="table-picker-empty">No tables available.</p>;
  }

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div className="show-section">
      <h2>Tables</h2>
      <div className="table-picker-list">
        {tables.map((table) => {
          const checked = selectedIds.includes(table.id);

          return (
            <label key={table.id} className="table-picker-item">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(table.id)}
              />
              <div className="table-picker-card card">
                <h3 className="title">{table.name}</h3>
                {table.description && (
                  <p className="description">{table.description}</p>
                )}
                <p className="details">{table.diceType} · {table.dice}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default TablePicker;
