import { useState } from "react";

import { ListPage } from "@/shared";
import { TableCard, tableStorage } from "@/features/tables";
import type { ITable } from "@/features/tables/types";

function Tables() {
  const [tables] = useState<ITable[]>(() => tableStorage.getAll());

  return (
    <ListPage
      title="Tables"
      items={tables}
      newItemLabel="+ New Table"
      newItemUrl="/tables/new"
      emptyStateMessage="No tables yet. Start by creating a new table."
      renderCard={(table) => <TableCard table={table} />}
    />
  );
}

export default Tables;
