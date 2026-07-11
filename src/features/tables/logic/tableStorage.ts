import storageFactory from "@/shared/localStorage/storageFactory";
import collectionStorage from "@/features/collections/logic/collectionStorage";
import type { ICollection } from "@/features/collections/types";
import type { ITable } from "../types";

const base = storageFactory<ITable>("table-atlas:tables", "Table");

export default {
  ...base,

  remove(id: string): void {
    base.remove(id);
    collectionStorage.getAll().forEach((collection: ICollection) => {
      if (collection.tableIds.includes(id)) {
        collectionStorage.removeTableFromCollection(collection.id, id);
      }
    });
  },
};
