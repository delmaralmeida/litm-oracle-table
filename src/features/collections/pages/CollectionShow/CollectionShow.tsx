import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { PageHeader, ConfirmDeleteModal } from "@/shared/components";
import { tableStorage } from "@/features/tables";
import { collectionStorage } from "../../logic";

export default function CollectionShow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const collection = id ? collectionStorage.getById(id) : undefined;
  if (!collection) {
    return (
      <div className="space-y-8">
        <PageHeader title="Collection Not Found" backTo="/collections" backLabel="Collections" />
        <p className="empty-state text-center">The requested collection does not exist.</p>
      </div>
    );
  }

  const tables = collection.tableIds
    .map((tid) => tableStorage.getById(tid))
    .filter(Boolean);

  const handleDelete = () => {
    collectionStorage.remove(collection.id);
    navigate("/collections");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={collection.name}
        backTo="/collections"
        backLabel="Collections"
      />

      <div className="show-card">
        <div className="show-card-header">
          <div className="show-card-meta">
            {collection.description && (
              <p className="show-description">{collection.description}</p>
            )}
            <p className="show-detail">{collection.tableIds.length} {collection.tableIds.length === 1 ? "table" : "tables"}</p>
          </div>
          <div className="show-card-actions">
            <Link to={`/collections/${collection.id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
              Delete
            </button>
          </div>
        </div>

        {tables.length > 0 && (
          <div className="show-section">
            <h2>Tables in this collection</h2>
            <div className="grid-wrapper max-4-columns">
              {tables.map((table) => table && (
                <Link key={table.id} to={`/tables/${table.id}`} className="card clickable">
                  <h3 className="title">{table.name}</h3>
                  {table.description && <p className="description">{table.description}</p>}
                  <p className="details">{table.diceType} · {table.dice}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tables.length === 0 && (
          <p className="empty-state text-center">No tables in this collection yet.</p>
        )}
      </div>

      {showDeleteModal && (
        <ConfirmDeleteModal
          name={collection.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
