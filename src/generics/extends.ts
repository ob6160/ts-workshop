// Use extends to express the behaviour a generic type must have.

// Needs a length — arrays, strings, typed arrays will do
function len<T extends { length: number }>(x: T) {
  return x.length;
}

// Key-safe property access
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Multiple constraints via intersections
function keyOf<T extends { id: string } & { slug: string }>(x: T) {
  return `${x.id}:${x.slug}` as const;
}

// Sensible defaults
function parseJson<T = unknown>(raw: string): T {
  return JSON.parse(raw) as T;
}

// Generally we want to constrain the behaviour of the method using this technique.
