import type { IResult } from "../../types";
import "./ResultsDisplay.css";

interface IProps {
  result: IResult | null;
}

export default function ResultsDisplay({ result }: IProps) {
  if (!result) return null;

  const cols = Object.keys(result.row).filter((k) => k !== "roll");

  return (
    <div className="result-display">
      <h3>Roll: {result.roll}</h3>

      {"text" in result.row ? (
        <p>{result.row.text}</p>
      ) : (
        <div className="space-y-2">
          {cols.map((col) => (
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
