import { useNavigate } from "react-router-dom";

import { tableStorage, buildTable } from "../../logic";
import { TableForm } from "../../components";
import type { ITableForm } from "../../types";

export default function TableCreate() {
  const navigate = useNavigate();
  const onSubmit = (fields: ITableForm) => {
    const table = buildTable(crypto.randomUUID(), fields);

    tableStorage.add(table);
    navigate("/tables");
  }
  const initialFields: ITableForm = {
    name: "",
    description: "",
    dice: "d6",
    diceType: "basic",
    rows: [{ roll: "", result: "" }],
  };

  return (
    <TableForm
      title="New Table"
      submitLabel="Create Table"
      backTo="/tables"
      backLabel="Tables"
      initialFields={initialFields}
      onSubmit={onSubmit}
      onCancel={() => navigate("/tables")}
    />
  );
}
