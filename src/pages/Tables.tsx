import GridDisplay from "../components/GridDisplay/GridDisplay";
import { tables } from "../data/tables";
import type { ITable } from "../types/table/table.types";

const renderTableDetails = (item: ITable): React.ReactNode => {
  return (
    <>
      {item.diceType} d{item.dice}
    </>
  );
};

function Tables() {
  return (
    <GridDisplay
      name="table"
      data={tables}
      renderDetails={renderTableDetails}
    />
  );
}

export default Tables;
