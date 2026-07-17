import { useState } from "react";

import { tables } from "@/features/tables/data/tables";
import { TableSelector, ResultsDisplay } from "../../components";
import { RollCurrentTableButton, RollAllTablesButton } from "@/features/rolling/components";

import type { IResult } from "@/features/tables/types";
import "./TablesRoller.css";

function TablesRoller() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, IResult | null>>({});
  const currentTable = tables[currentIndex];

  return (
    <>
      <h1>Tables Roller</h1>
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
        <ResultsDisplay result={results[currentTable.id]} />
      </div>
    </>
  );
}

export default TablesRoller;
