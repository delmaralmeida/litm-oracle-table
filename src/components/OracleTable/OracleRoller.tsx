import { rollByType } from "../../utils/rolls.ts";
import { findMatchingRow } from "../../utils/helpers.ts";
import type { IOracleRoller as IOracleRollerType, IOracleRow } from "./OracleRoller.types.ts";

interface IResult {
  roll: number;
  row: IOracleRow;
}

interface IProps {
  table: IOracleRollerType;
  result: IResult | null;
  onRoll: (tableId: string, result: IResult) => void;
}

export default function OracleRoller({ table, result, onRoll }: IProps) {

  const handleRoll = () => {
    const roll = rollByType(table.dice, table.diceType);
    const row = findMatchingRow(table.rows, roll);
    const fallbackRow: IOracleRow = { roll, text: "No result found" };

    onRoll(table.id, { roll, row: row || fallbackRow });
  };

  return (
    <div className="space-y-4">
      <h2>{table.name}</h2>

      <button onClick={handleRoll}>
        Roll {table.diceType === "sum" && 2}d{table.dice}
        {table.diceType === "double" && table.dice}
      </button>

      {result && (
        <div className="results">
          <h3>Roll: {result.roll}</h3>

          {"text" in result.row ? (
            <p>{result.row.text}</p>
          ) : (
            <div className="space-y-2">
              {table.displayColumns.map((col) => (
                <div key={col} className="single-result-section">
                  <h4>{col}</h4>
                  <p>{String(result.row[col])}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
