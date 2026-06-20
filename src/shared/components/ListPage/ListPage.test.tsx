import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen } from "@testing-library/react";

import { renderWithRouter } from "@/shared";
import ListPage from "./ListPage";

afterEach(() => {
  cleanup();
});

interface Item {
  id: string;
  name: string;
}

const items: Item[] = [
  { id: "1", name: "Item One" },
  { id: "2", name: "Item Two" },
];

function renderListPage(overrides: Partial<React.ComponentProps<typeof ListPage<Item>>> = {}) {
  return renderWithRouter({
    initialEntries: ["/list"],
    routes: [
      {
        path: "/list",
        element: (
          <ListPage<Item>
            title="My Items"
            items={items}
            newItemLabel="New Item"
            newItemUrl="/items/new"
            emptyStateMessage="No items yet."
            renderCard={(item: Item) => <span>{item.name}</span>}
            {...overrides}
          />
        ),
      },
    ],
  });
}

describe("ListPage", () => {
  it("renders the component's title, link and items", () => {
    renderListPage();

    expect(screen.getByRole("heading", { name: "My Items" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "New Item" })).toHaveAttribute("href", "/items/new");
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("renders the empty state message when items is empty", () => {
    renderListPage({ items: [] });

    expect(screen.getByText("No items yet.")).toBeInTheDocument();
    expect(screen.queryByText("Item One")).not.toBeInTheDocument();
  });
});
