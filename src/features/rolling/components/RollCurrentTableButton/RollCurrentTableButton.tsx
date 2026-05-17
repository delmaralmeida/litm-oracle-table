import type { ITable, IResults } from "@/features/tables/types";
import { rollTableResult } from "@/features/rolling";

interface IProps {
  currentTable: ITable;
  setResults: (results: IResults | ((prev: IResults) => IResults)) => void;
}

function RollCurrentTableButton({
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

export default RollCurrentTableButton;
