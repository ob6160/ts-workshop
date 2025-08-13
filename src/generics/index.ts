// Why generics? They let us reuse code while keeping the values flexible.

// Here we're inferring the type
function id<T>(x: T): T {
  return x;
}
const n = id(42); // T = number
const s = id("hello"); // T = string

// First element from an array.
// This shows how to work with array types.
// And how TS infers the type from the array elements.
function first<T>(xs: T[]): T | undefined {
  return xs[0];
}

const firstItem = first([1, 2, 3]);
const firstItemFromMixedArray = first([1, "test", 3]);

// Generic container interface
interface Box<T> {
  value: T;
}

// Let's set up a box that contains a Date!
const box: Box<Date> = { value: new Date() };

// You can also use defaults to keep APIs ergonomic
type Pair<T, U = T> = [T, U];

// U defaults to string
const p1: Pair<string> = ["a", "b"];

// But we can also specify U explicitly!
const p2: Pair<string, number> = ["a", 1];

// ... some tips

// 1. Generics are erased at runtime

// You can't use T like this:
function parseAs<T>(raw: string): T {
  // if (T === Number) return Number(raw) as T;
  return JSON.parse(raw) as T;
}

// If you'd like to make a decode decision at runtime, use something like this:
function parseWith<T>(raw: string, decode: (s: string) => T): T {
  return decode(raw);
}
const numberExample = parseWith("42", Number); // 42
const arrayExample = parseWith('[{"id":"1"}]', JSON.parse) as Array<{
  id: string;
}>;

// 2. Avoid using `any`, in general we prefer to use `unknown`
type Article = { id: string; title: string };

function unsafeParse(raw: string): any {
  return JSON.parse(raw);
}

function safeParse<T = unknown>(raw: string): T {
  return JSON.parse(raw) as T;
}

const rawArticleJson = '[{"id":"1","title":"Hello"}]';

// Our Type Guard check for confirming the `unknown` entry is an Article.
// It basically says "when this returns true, treat v as Article in this branch".
function isArticle(value: unknown): value is Article {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof (value as { id: unknown }).id === "string" &&
    "title" in value &&
    typeof (value as { title: unknown }).title === "string"
  );
}

// Built-in guards

// Primitive checks: typeof value === "string" | "number" | ...
// Arrays: Array.isArray(value)
// Classes: v instanceof Date

// any → compiles fine, explodes at runtime
const anyExample = unsafeParse(rawArticleJson); // any
// Typo slips through type‑checking:
anyExample[0].titel.toUpperCase();

// unknown → TS ensures that we have to prove that the shape is correct before using it
const unknownExample = safeParse(rawArticleJson); // unknown
if (Array.isArray(unknownExample) && isArticle(unknownExample[0])) {
  unknownExample[0].title.toUpperCase(); // ✅ safe & typed
}
