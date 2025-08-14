/*
 * 3) Literal types + template literals (alignment API)
 *
 * Accept only allowed alignments and an optional pixel offset like "left-12".
 */

type Align = "left" | "right" | "center";
type AlignWithOffset = Align | `${Align}-${number}`;

export function alignBox(a: Align) {
  /* no-op */
}

// Acceptance checks
alignBox("left");
alignBox("right");
alignBox("center");
// @ts-expect-error
alignBox("top");

// New function:
export function alignBoxWithOffset(a: AlignWithOffset) {
  /* … */
}

alignBoxWithOffset("left-12");
alignBoxWithOffset("center");
// @ts-expect-error
alignBoxWithOffset("center-");
