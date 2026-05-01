import type { ITable, IResults } from "../../types/table/table.types";
import { rollTable } from "../../utils/helpers";

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
      [currentTable.id]: rollTable(currentTable),
    }));
  };

  return (
    <button className="roll-current-table" onClick={onClick}>
      Roll Current Table
    </button>
  );
}
