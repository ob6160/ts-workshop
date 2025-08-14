/*
 * 1) Union narrowing (and don’t call .toUpperCase() on a number…)
 *
 * Fix the printId runtime bug and demonstrate narrowing + overloads.
 */

export function printId(id: number | string) {
  // Why doesn't this work?
  console.log(id.toUpperCase());
}

// Acceptance checks
printId("abc"); // OK
printId(123); // OK
// @ts-expect-error
printId(true); // not allowed
