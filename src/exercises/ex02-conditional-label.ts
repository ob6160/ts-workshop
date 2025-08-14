/**
 * 2) Conditional types + overloads (createLabel)
 *
 * Goal: Make createLabel return the right shape based on the input type using your NameOrId<T> conditional type.
 */

interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

export function createLabel<T extends number | string>(
  idOrName: T
): NameOrId<T> {
  throw new Error("todo");
}

// Acceptance checks
const a = createLabel("typescript");
//    ^? a should be NameLabel with .name: string

const b = createLabel(2.8);
//    ^? b should be IdLabel with .id: number

const c = createLabel(Math.random() ? "hello" : 42);
//    ^? c should be NameLabel | IdLabel
