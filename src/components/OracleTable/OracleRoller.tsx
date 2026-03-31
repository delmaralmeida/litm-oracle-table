import { useState } from "react";
import { rollByType } from "../../utils/rolls.ts";
import { findMatchingRow } from "../../utils/helpers.ts";
import type { OracleRoller as OracleRollerType, OracleRow } from "./OracleRoller.types.ts";

type Result = {
  roll: number;
  row: OracleRow;
};

type Props = {
  table: OracleRollerType;
};

export default function OracleRoller({ table }: Props) {
  const [result, setResult] = useState<Result | null>(null);

  const handleRoll = () => {
    const roll = rollByType(table.dice, table.diceType);
    const row = findMatchingRow(table.rows, roll);
    const fallbackRow: OracleRow = { roll, text: "No result found" };

    setResult({ roll, row: row || fallbackRow });
  };

  return (
    <div className="oracle-roller">
      <h2>{table.name}</h2>

      <button onClick={handleRoll}>
        Roll {table.diceType === "sum" && 2}d{table.dice}
        {table.diceType === "double" && table.dice}
      </button>

      {result && (
        <div className="result">
          <h3>Roll: {result.roll}</h3>

          {"text" in result.row ? (
            <p>{result.row.text}</p>
          ) : (
            table.displayColumns.map((col) => (
              <p key={col}>
                <strong>{col}:</strong> {String(result.row[col])}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}
