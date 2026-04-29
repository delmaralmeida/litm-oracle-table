import { useState } from "react";
import { tables } from "./data/tables";
import { rollTable } from "./utils/helpers";
import TableSelector from "./components/TableSelector/TableSelector";
import ResultsDisplay from "./components/ResultsDisplay/ResultsDisplay";
import RollSelectedButton from "./components/RollDiceButtons/RollSelectedButton";
import RollAllTablesButton from "./components/RollDiceButtons/RollAllTablesButton";
import type { IResult } from "./types/table/table.types";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, IResult | null>>({});
  const currentTable = tables[currentIndex];

  // TODO: move logic to respective button
  const handleRollSelected = () => {
    const table = tables[currentIndex];

    setResults(prev => ({
      ...prev,
      [table.id]: rollTable(table),
    }));
  };

  // TODO: move logic to respective button
  const handleRollAll = () => {
    const newResults: Record<string, IResult> = {};

    tables.forEach(table => {
      newResults[table.id] = rollTable(table);
    });

    setResults(newResults);
  };

  return (
    <div className="app">
      <div className="main-wrapper">
        <div id="table-selector">
          <TableSelector
            tables={tables}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </div>

        <div id="buttons" className="pb-6">
          <div className="grid grid-props">
            <RollSelectedButton onClick={handleRollSelected} />
            <RollAllTablesButton onClick={handleRollAll} />
          </div>
        </div>

        <div id="results">
          <ResultsDisplay
            table={currentTable}
            result={results[currentTable.id]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
