import { useState } from "react";
import { tables } from "../data/tables";
import TableSelector from "../components/TableSelector/TableSelector";
import ResultsDisplay from "../components/ResultsDisplay/ResultsDisplay";
import RollCurrentTableButton from "../components/RollDiceButtons/RollCurrentTableButton";
import RollAllTablesButton from "../components/RollDiceButtons/RollAllTablesButton";
import type { IResult } from "../types/table/table.types";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, IResult | null>>({});
  const currentTable = tables[currentIndex];

  return (
    <>
      <h1>Table Roller</h1>
      <div id="table-selector">
        <TableSelector
          tables={tables}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
        />
      </div>

      <div id="buttons" className="pb-6">
        <div className="grid-wrapper sm:flex sm:justify-end">
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
    </>
  );
}

export default Home;
