import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { PageHeader, ConfirmDeleteModal } from "@/shared";
import { collectionStorage } from "@/features/collections";
import { tableStorage } from "@/features/tables";
import "./TableShow.css";

function TableShow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const table = id ? tableStorage.getById(id) : undefined;

  if (!table) {
    return (
      <div className="space-y-8">
        <PageHeader title="Table Not Found" backTo="/tables" backLabel="Tables" />
        <p className="empty-state text-center">The requested table does not exist.</p>
      </div>
    );
  }

  const collections = collectionStorage.getAll().filter((c) =>
    c.tableIds.includes(table.id)
  );

  const handleDelete = () => {
    tableStorage.remove(table.id);
    navigate("/tables");
  };

  return (
    <div className="space-y-8">
      <PageHeader title={table.name} backTo="/tables" backLabel="Tables" />

      <div className="show-card">
        <div className="show-card-header">
          <div className="show-card-meta">
            {table.description && (
              <p className="show-description">{table.description}</p>
            )}
            <p className="show-detail">
              {table.diceType} · {table.dice} · {table.rows.length} {table.rows.length === 1 ? "row" : "rows"}
            </p>
          </div>
          <div className="show-card-actions">
            <Link to={`/tables/${table.id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
              Delete
            </button>
          </div>
        </div>

        <div className="show-section">
          <h2>Rows</h2>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(table.rows[0] ?? { roll: "" }).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {collections.length > 0 && (
          <div className="show-section">
            <h2>In Collections</h2>
            <div className="tag-list">
              {collections.map((c) => (
                <Link key={c.id} to={`/collections/${c.id}`} className="tag">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <ConfirmDeleteModal
          name={table.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default TableShow;
