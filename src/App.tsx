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
    <div className="app min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-200">
          Legend in The Mist - Solo Oracle Tables
        </h1>

        <div className="bg-slate-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <OracleTable
              table={tables[currentIndex]}
              result={results[tables[currentIndex].id] || null}
              onRoll={handleRoll}
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-600">
          <h2 className="text-lg font-semibold text-amber-200 mb-4">Available Tables</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {tables.map((table, index) => (
              <button
                key={table.id}
                onClick={() => setCurrentIndex(index)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-600 text-slate-100 hover:bg-slate-500"
                }`}
              >
                {table.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
