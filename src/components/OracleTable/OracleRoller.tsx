import { rollByType } from "../../utils/rolls.ts";
import { findMatchingRow } from "../../utils/helpers.ts";
import type { IOracleRoller as IOracleRollerType, IOracleRow } from "./OracleRoller.types.ts";

// update types to interfaces
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
    <div className="oracle-roller space-y-4">
      <h2 className="text-2xl font-bold text-amber-200">{table.name}</h2>

      <button
        onClick={handleRoll}
        className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Roll {table.diceType === "sum" && 2}d{table.dice}
        {table.diceType === "double" && table.dice}
      </button>

      {result && (
        <div className="result bg-slate-600 p-4 rounded-lg space-y-3">
          <h3 className="text-lg font-semibold text-emerald-300">Roll: {result.roll}</h3>

          {"text" in result.row ? (
            <p className="text-slate-100 whitespace-pre-wrap">{result.row.text}</p>
          ) : (
            <div className="space-y-2">
              {table.displayColumns.map((col) => (
                <div key={col} className="border-b border-slate-500 pb-2 last:border-b-0">
                  <p className="text-amber-300 font-semibold text-sm">{col}</p>
                  <p className="text-slate-100 whitespace-pre-wrap">
                    {String(result.row[col])}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
