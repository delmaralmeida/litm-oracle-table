import { storageFactory } from "@/shared/localStorage/storageFactory";
import type { ITable } from "../types";
import collectionStorage from "@/features/collections/logic/collectionStorage";

const base = storageFactory<ITable>("table-atlas:tables", "Table");

export default {
  ...base,

  remove(id: string): void {
    base.remove(id);
    collectionStorage.getAll().forEach((collection) => {
      if (collection.tableIds.includes(id)) {
        collectionStorage.removeTableFromCollection(collection.id, id);
      }
    });
  },
};
