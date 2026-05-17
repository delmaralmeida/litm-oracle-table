import type { ITable, IResults } from "@/features/tables/types";
import { rollTableResult } from "@/features/rolling";

interface IProps {
  tables: ITable[];
  setResults: (results: IResults | ((prev: IResults) => IResults)) => void;
}

function RollAllTablesButton({
  tables,
  setResults,
}: IProps) {
  const onClick = () => {
    const newResults: IResults = {};

    tables.forEach(table => {
      newResults[table.id] = rollTableResult(table);
    });

    setResults(newResults);
  };

  return (
    <button className="roll-all-tables" onClick={onClick}>
      Roll All Tables
    </button>
  );
}

export default RollAllTablesButton;
