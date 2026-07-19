import { useState } from "react";

import { ListPage } from "@/shared/components";
import { CollectionCard } from "../../components";
import { collectionStorage } from "../../logic";
import type { ICollection } from "../../types";

export default function Collections() {
  const [collections] = useState<ICollection[]>(() => collectionStorage.getAll());

  return (
    <ListPage
      title="Collections"
      items={collections}
      newItemLabel="+ New Collection"
      newItemUrl="/collections/new"
      emptyStateMessage="No collections yet. Start by creating a new collection."
      renderCard={(collection) => <CollectionCard collection={collection} />}
    />
  );
}
