// Generic cache with constraints

// All stored values must have an id
export interface StoredValue {
  id: string;
}

interface Article extends StoredValue {
  title: string;
  tags: string[];
}

// We're setting up a cache class.
// K (key) is the type of the keys used to store values
// V (value) is the type of the values being stored
export class Cache<K extends string, V extends StoredValue> {
  private store: Record<K, V> = {} as Record<K, V>;
  get(id: K): V | undefined {
    return this.store[id];
  }
  set(value: V): void {
    this.store[value.id as K] = value;
  }
}

const articleCache = new Cache<string, Article>();
articleCache.set({
  id: "1",
  title: "Understanding TypeScript",
  tags: ["typescript", "programming", "javascript"],
});
