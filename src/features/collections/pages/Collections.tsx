import { GridDisplay } from "@/shared";
import { collections } from "../data/collections";
import type { ICollection } from "../types";

const getPluralizedLabel = (count: number): string =>
  count === 1 ? "table" : "tables";

const renderCollectionDetails = (item: ICollection): React.ReactNode => {
  return (
    <>
      {item.tableIds.length}{" "}
      {getPluralizedLabel(item.tableIds.length)}
    </>
  );
};

function Collections() {
  return (
    <GridDisplay
      name="collection"
      data={collections}
      renderDetails={renderCollectionDetails}
    />
  );
}

export default Collections;