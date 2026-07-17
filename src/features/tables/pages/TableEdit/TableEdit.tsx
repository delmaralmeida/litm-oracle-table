import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "@/shared/components";
import { tableStorage, buildTable } from "../../logic";
import { TableForm } from "../../components";
import type { ITableForm } from "../../types";

function TableEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const table = id ? tableStorage.getById(id) : undefined;

  if (!table) {
    return (
      <div className="space-y-8">
        <PageHeader title="Table Not Found" backTo="/tables" backLabel="Tables" />
        <p className="empty-state text-center">The requested table does not exist.</p>
      </div>
    );
  }

  const onSubmit = (fields: ITableForm) => {
    const updatedTable = buildTable(table.id, fields);

    tableStorage.update(updatedTable);
    navigate(`/tables/${table.id}`);
  }
  const initialFields: ITableForm = {
    name: table.name,
    description: table.description ?? "",
    dice: table.dice ?? "",
    diceType: table.diceType ?? "basic",
    rows: table.rows ?? [],
  };

  return (
    <TableForm
      title="Edit Table"
      submitLabel="Save Changes"
      backTo={`/tables/${table.id}`}
      backLabel={table.name}
      initialFields={initialFields}
      onSubmit={onSubmit}
      onCancel={() => navigate(`/tables/${table.id}`)}
    />
  );
}

export default TableEdit;
