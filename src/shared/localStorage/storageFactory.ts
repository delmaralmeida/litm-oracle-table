export function storageFactory<T extends { id: string }>(key: string) {
  const read = (): T[] => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];

      return structuredClone(JSON.parse(raw));
    } catch {
      return [];
    }
  };

  const write = (items: T[]) => {
    localStorage.setItem(key, JSON.stringify(items));
  };

  return {
    getAll(): T[] {
      return read();
    },

    getById(id: string): T | undefined {
      return read().find((item) => item.id === id);
    },

    add(item: T): void {
      const items = read();

      if (items.some((existing) => existing.id === item.id)) {
        throw new Error(`Item with id "${item.id}" already exists`);
      }

      write([...items, item]);
    },

    update(item: T): void {
      const items = read();
      const index = items.findIndex((i) => i.id === item.id);

      if (index === -1) {
        throw new Error(`Item with id "${item.id}" not found`);
      }

      items[index] = item;
      write(items);
    },

    remove(id: string): void {
      write(read().filter((item) => item.id !== id));
    },

    clear(): void {
      localStorage.removeItem(key);
    },
  };
};
