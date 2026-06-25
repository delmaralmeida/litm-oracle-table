import { Link } from "react-router-dom";
import type { ICollection } from "@/features/collections";

interface CollectionCardProps {
  collection: ICollection;
}

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link to={`/collections/${collection.id}`} className="card clickable card-link">
      <h3 className="title">{collection.name}</h3>
      {collection.description && (
        <p className="description">{collection.description}</p>
      )}
      <p className="details">
        {collection.tableIds.length} {collection.tableIds.length === 1 ? "table" : "tables"}
      </p>
    </Link>
  );
}

export default CollectionCard;
