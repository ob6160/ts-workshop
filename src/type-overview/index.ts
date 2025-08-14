// Union types

import { Debug } from "@/helpers/type-utils";

// This is a way to build new types formed of existing ones!
// You've probably seen it before in a variety of circumstances.

function printId(id: number | string) {
  // Why doesn't this work?
  console.log(id.toUpperCase());
}

// ... type narrowing!

// Type aliases

// You've probably already seen this in action, we do it all the time to give a name to types.

type ID = number | string;

// Types and interfaces are very similar... but differ in some ways.
// We will cover this in more detail later.

// Type Intersections

// These are a handy way to extend your types!

type Person = {
  id: ID;
  name: string;
};

type Employee = Person & {
  role: string;
};

// Literal type definitions

function alignBox(alignment: "left" | "right" | "center") {
  // ...
}

alignBox("center");
alignBox("left");
alignBox("right");
alignBox("top");

// Template literal types

// A union of possible languages.

type Language = "en" | "jp" | "de"; // etc....
type LocaleIds = `${Language}_locale`;

function setLocale(locale: LocaleIds) {
  // ...
}

setLocale("de_locale");
// Oh no, we didn't define this !
setLocale("es_locale");

// Conditional types

// These allow you to create types that depend on a condition.

type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"

// Here's an example based on a more realistic use-case:

// We've got two different types of label... an id label (number), and a name label (string)
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

// We'd like to return the correct label type based on the input to the function
// So we define a conditional type that picks between the two based on the type of the input.

// Logic flow is:
// typeof T === "number"  ? IdLabel : NameLabel

// As you can see, it's really similar to a ternary statement in JS!
// The main difference is that the types are checked at compile-time rather than at runtime.

// And they are not included in the final JavaScript code !
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

const nameLabel = createLabel("typescript");

const idLabel = createLabel(2.8);

let c = createLabel(Math.random() ? "hello" : 42);

// Mapped Types

// You can use these to construct a type for objects that have not been declared ahead of time.

// Say if you have a type that defines available shapes that users can place into your drawing app:

type Shapes = "circle" | "square" | "diamond" | "triangle";

// we can use a mapped type definition to set up the shape we need for configuration

type ShapeConfig = {
  [K in Shapes]: {
    color: string;
    size: number;
  };
};
const shapeConfig: ShapeConfig = {
  circle: { color: "red", size: 10 },
  square: { color: "blue", size: 20 },
  diamond: { color: "green", size: 30 },
  triangle: { color: "yellow", size: 40 },
};

// This is great, because it means that we can update our source of truth: `Shapes` and the
// configuration object will adapt to include our new shapes.

// We can even use utility types to

// never

// Some functions never return a value:

function fail(msg: string): never {
  throw new Error(msg);
}

const test = fail("OH NO");
type T = typeof test; // never...

// The never type represents values which are never observed.
// In a return type, this means that the function throws an exception or terminates execution of the program.

// It's also used in scenarios where we exhaust all of the possible types in a union:

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}

// any

// The any type represents any value, and allows for any operation to be performed on it.
// This is useful in scenarios where you don't know the type of a value ahead of time.

function anyFunc(a: any) {
  a.b(); // OK
}

// In general though, we should avoid using this type because it defeats the purpose of type safety.

// noImplicitAny is a flag that we set in the tsconfig.json file which ensures that
// any inferred `any` is flagged up as an error; ensuring that it is addressed.

const inferDemo = (test) => {
  return test;
};

/// .......

// Instead, we can use the unknown type! Let's continue...

// unknown

/*
    The unknown type represents any value.
    This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value:
*/

function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
}

// It means that we can carry out our own assertions at runtime to ensure that `a` is of the correct shape:

const isAValid = (a: unknown): a is { b: () => void } => {
  return (
    typeof a === "object" &&
    a !== null &&
    "b" in a &&
    typeof (a as any).b === "function"
  );
};

function f3(a: unknown) {
  if (isAValid(a)) {
    a.b();
  }
}

// Likewise, we can also define a method that has a return type of `unknown`.
// This is useful if you'd like to ask the caller to verify the type of the value being passed in.

function f4(a: unknown): unknown {
  return a;
}

// void

/*
    `void` represents the return value of functions which don’t return a value.

    It’s the inferred type any time a function doesn’t have any return statements,
    or doesn’t return any explicit value from those return statements:
*/

// The inferred return type is void
function noop() {
  return;
}

const myValueIsSetToNoOp = noop();

// In JavaScript, a function that doesn’t return any value will implicitly return the value undefined.
// However, void and undefined are not the same thing in TypeScript !!

// object

/*
    The special type object refers to any value that isn’t a primitive (string, number, bigint, boolean, symbol, null, or undefined).
    
    This is different from the empty object type { }, and also different from the global type Object.
    
    It’s very likely you will never use Object.

    Fun fact: Function types are considered to be of type `object` in Typescript.
    They have properties, Object.prototype, you can call Object.keys on them etc....
*/

type FunctionsAreObjects = Debug<() => void>;
