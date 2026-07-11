import storageFactory from "@/shared/localStorage/storageFactory";
import type { ICollection } from "../types";

const storage = storageFactory<ICollection>("table-atlas:collections", "Collection");

export default {
  ...storage,

  addTableToCollection(collectionId: string, tableId: string): void {
    const collection = storage.getById(collectionId);
    if (!collection) throw new Error(`Collection with id "${collectionId}" not found`);
    if (collection.tableIds.includes(tableId)) return;
 
    storage.update({ ...collection, tableIds: [...collection.tableIds, tableId] });
  },

  removeTableFromCollection(collectionId: string, tableId: string): void {
    const collection = storage.getById(collectionId);
    if (!collection) return;

    storage.update({ ...collection, tableIds: collection.tableIds.filter((id) => id !== tableId) });
  },
};
