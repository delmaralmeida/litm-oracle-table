import { rollTableResult } from "../../logic";
import type { ITable, IResults } from "@/features/tables/types";

interface IProps {
  currentTable: ITable;
  setResults: (results: IResults | ((prev: IResults) => IResults)) => void;
}

export default function RollCurrentTableButton({
  currentTable,
  setResults,
}: IProps) {
  const onClick = () => {
    setResults(prev => ({
      ...prev,
      [currentTable.id]: rollTableResult(currentTable),
    }));
  };

  return (
    <button className="roll-current-table" onClick={onClick}>
      Roll Current Table
    </button>
  );
}
