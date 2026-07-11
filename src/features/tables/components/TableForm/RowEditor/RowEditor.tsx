import TableHead from "./TableHead";
import TableRow from "./TableRow";
import {
  updateRow,
  addRow,
  removeRow,
  addColumn,
  renameColumn,
  removeColumn,
} from "../helpers";
import type { IRowEditorProps } from "../types";

export default function RowEditor({
  rows,
  onChange,
}: IRowEditorProps) {
  const columns = Array.from(
    new Set(["roll", ...rows.flatMap((r) => Object.keys(r))])
  );

  return (
    <div className="form-section">
      <h2>Rows</h2>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onChange(addRow(rows, columns))}
        >
          + Add Row
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onChange(addColumn(rows, columns))}
        >
          + Add Column
        </button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <TableHead
                  key={col}
                  name={col}
                  isRoll={col === "roll"}
                  onRename={(newName: string) => onChange(renameColumn(rows, columns, col, newName))}
                  onRemove={() => onChange(removeColumn(rows, col))}
                />
              ))}
              <th className="actions-header"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                row={row}
                columns={columns}
                onUpdateCell={(col: string, value: string) => onChange(updateRow(rows, index, col, value))}
                onRemove={() => onChange(removeRow(rows, index))}
                isRemoveDisabled={rows.length <= 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
