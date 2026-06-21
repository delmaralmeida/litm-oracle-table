import type { ITableRow } from "@/features/tables/types";
import { handleBlur, handleKeyDown } from "./rowEditorHelpers";

interface TableRowProps {
  row: ITableRow;
  columns: string[];
  onUpdateCell: (col: string, value: string) => void;
  onRemove: () => void;
  isRemoveDisabled: boolean;
}

function TableRow({
  row,
  columns,
  onUpdateCell,
  onRemove,
  isRemoveDisabled,
}: TableRowProps) {
  return (
    <tr>
      {columns.map((col) => (
        <td key={col} className="input-cell">
          <input
            type="text"
            className="table-input"
            value={(row[col] ?? "") as string}
            onChange={(e) => onUpdateCell(col, e.target.value)}
            placeholder={col === "roll" ? "Roll" : "Value"}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </td>
      ))}
      <td className="actions-cell">
        <button
          type="button"
          className="btn btn-ghost btn-icon"
          onClick={onRemove}
          aria-label="Remove row"
          disabled={isRemoveDisabled}
        >
          ✕
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
