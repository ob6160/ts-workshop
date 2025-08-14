// Cheat-sheet for types vs interfaces!

/*
 Need a union? → type.
 Need augmentation/merging? → interface.
 Need mapped/conditional wizardry? → type.
 Need composable object shapes with early conflict checks? → interface extends.
*/

// Avoid intersecting overlapping keys with conflicting types; reach for extends or refactor.

// Mini‑exercises!!

// Start with interface User { id: string } and augment it to add email?: string and a method overload toString(): string.

// Show how { a?: number } & { a: string } behaves at use‑site
// Contrast it with interface X extends { a?: number } { a: string }.
