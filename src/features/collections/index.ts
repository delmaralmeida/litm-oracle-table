import Collections from "./pages/Collections/Collections";
import CollectionEdit from "./pages/CollectionEdit/CollectionEdit";
import CollectionShow from "./pages/CollectionShow/CollectionShow";
import CollectionCreate from "./pages/CollectionCreate/CollectionCreate";
import collectionStorage from "./logic/collectionStorage";
import type { ICollection } from "./types";

export {
  Collections,
  CollectionShow,
  CollectionCreate,
  CollectionEdit,
  collectionStorage,
};

export type { ICollection };
