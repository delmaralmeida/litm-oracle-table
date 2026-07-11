import { useState } from "react";

import { ListPage } from "@/shared/components";
import { collectionStorage, CollectionCard } from "@/features/collections";
import type { ICollection } from "@/features/collections";

function Collections() {
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

export default Collections;
