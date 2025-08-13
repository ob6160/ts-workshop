// Let's look at little more deeply at type union vs interface extends

import { Debug } from "../helpers/type-utils";

// They're both ways to combine object shapes but they fail and behave differently.

// Interface extends will compose your shapes _with_ checks for compatibility.

interface HasId {
  id: string;
}
interface HasSlug {
  slug: string;
}

// Compatible example
interface CompatibleArticleMeta extends HasId, HasSlug {
  title: string;
}

// Incompatible example
interface IncompatibleArticleMeta extends HasId, HasSlug {
  title: string;
  slug: number; // incompatible
}

// Here's a demonstration of how a composed union using types would behave in a similar circumstance

type ArticleMeta = { slug: string } & { slug: number };

type Test = Debug<ArticleMeta>; // a: never → practically unusable

// Overlapping, incompatible property types produce intersections like string & number ⇒ never.
// We also probably won't see the error until the point of use, unlike interfaces which shout louder.
