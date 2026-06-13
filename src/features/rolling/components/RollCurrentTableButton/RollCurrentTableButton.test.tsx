import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as rollingModule from "@/features/rolling";
import RollCurrentTableButton from "./RollCurrentTableButton";
import type { ITable, IResults } from "@/features/tables/types";

const baseTable: ITable = {
  id: "encounters",
  name: "Encounters",
  dice: "d6",
  diceType: "basic",
  rows: [{ roll: 1, text: "Goblin" }],
};

afterEach(() => {
  cleanup();
});

describe("RollCurrentTableButton", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders button", () => {
    render(
      <RollCurrentTableButton
        currentTable={baseTable}
        setResults={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /roll current table/i,
      })
    ).toBeInTheDocument();
  });

  it("triggers setResults once when clicked", async () => {
    const user = userEvent.setup();
    const setResults = vi.fn();

    render(
      <RollCurrentTableButton
        currentTable={baseTable}
        setResults={setResults}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: /roll current table/i,
      })
    );
    expect(setResults).toHaveBeenCalledTimes(1);
  });

  it("returns one rolled result for the current table", async () => {
    const user = userEvent.setup();
    const setResults = vi.fn();
    const goblinRowResult = { roll: 4, row: { roll: 4, text: "Goblin" } };

    vi.spyOn(rollingModule, "rollTableResult")
      .mockReturnValue(goblinRowResult);

    render(
      <RollCurrentTableButton
        currentTable={baseTable}
        setResults={setResults}
      />
    );

    const button = screen.getByRole("button", {
      name: /roll current table/i,
    });

    await user.click(button);
    expect(setResults).toHaveBeenCalledTimes(1);

    const updater = setResults.mock.calls[0][0];
    const result = updater({} as IResults);
    expect(result).toEqual({ [baseTable.id]: goblinRowResult });
  });
});
