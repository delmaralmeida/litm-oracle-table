import { useState } from "react";
import { tables } from "./data/tables";
import TableSelector from "./components/TableSelector/TableSelector";
import ResultsDisplay from "./components/ResultsDisplay/ResultsDisplay";
import RollCurrentTableButton from "./components/RollDiceButtons/RollCurrentTableButton";
import RollAllTablesButton from "./components/RollDiceButtons/RollAllTablesButton";
import type { IResult } from "./types/table/table.types";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, IResult | null>>({});
  const currentTable = tables[currentIndex];

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
            <RollCurrentTableButton
              currentTable={currentTable}
              setResults={setResults}
            />
            <RollAllTablesButton
              tables={tables}
              setResults={setResults}
            />
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
