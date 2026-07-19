// TODO: remove PageHeader component, this should be used inside parent componet.
import PageHeader from "../PageHeader/PageHeader";
import type { ReactNode } from "react";

interface IListPageProps<T> {
  title: string;
  items: T[];
  newItemLabel: string;
  newItemUrl: string;
  emptyStateMessage: string;
  renderCard: (item: T) => ReactNode;
}

export default function ListPage<T extends { id: string }>({
  title,
  items,
  newItemLabel,
  newItemUrl,
  emptyStateMessage,
  renderCard,
}: IListPageProps<T>) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} action={{ label: newItemLabel, to: newItemUrl }} />

      {items.length === 0 ? (
        <p className="empty-state text-center">{emptyStateMessage}</p>
      ) : (
        <div className="grid-wrapper max-4-columns">
          {items.map((item) => (
            <div key={item.id}>{renderCard(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
