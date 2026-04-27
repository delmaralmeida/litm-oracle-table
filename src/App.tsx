import { useState } from "react";
import { tables } from "./data/tables";
import OracleTable from "./components/OracleTable/OracleRoller";
import type { IOracleRow } from "./components/OracleTable/OracleRoller.types";

interface IResult {
  roll: number;
  row: IOracleRow;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, IResult | null>>({});

  const handleRoll = (tableId: string, result: IResult) => {
    setResults((prev) => ({ ...prev, [tableId]: result }));
  };

  return (
    <div className="app">
      <div className="main-wrapper">
        <h1 className="title">
          Legend in The Mist - Solo Oracle Tables
        </h1>

        <div className="selection-card">
          <h2>Available Tables</h2>
          <div className="table-selection">
            {tables.map((table, index) => (
              <button
                key={table.id}
                onClick={() => setCurrentIndex(index)}
                className={index === currentIndex ? "current-selected" : ""}
              >
                {table.name}
              </button>
            ))}
          </div>
        </div>

        <div className="results-card">
          <div className="p-6">
            <OracleTable
              table={tables[currentIndex]}
              result={results[tables[currentIndex].id] || null}
              onRoll={handleRoll}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
