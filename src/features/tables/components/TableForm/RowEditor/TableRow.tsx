import { handleBlur, handleKeyDown } from "../helpers";
import type { ITableRowProps } from "../types";

export default function TableRow({
  row,
  columns,
  onUpdateCell,
  onRemove,
  isRemoveDisabled,
}: ITableRowProps) {
  return (
    <tr>
      {columns.map((col) => (
        <td key={col}>
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
      <td>
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
