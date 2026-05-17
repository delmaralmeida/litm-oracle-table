import type { ITable, IResult } from "../../types";

interface IProps {
  table: ITable;
  result: IResult | null;
}

function ResultsDisplay({ table, result }: IProps) {
  if (!result) return null;

  return (
    <div className="result-display">
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
  );
}

export default ResultsDisplay;
