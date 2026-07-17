import { rollTableResult } from "../../logic";
import type { ITable, IResults } from "@/features/tables/types";

interface IProps {
  tables: ITable[];
  setResults: (results: IResults | ((prev: IResults) => IResults)) => void;
}

export default function RollAllTablesButton({
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
