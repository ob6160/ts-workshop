// Interface declaration merging!

// Generally we want to use interfaces for object shapes that we expect to extend/augment/merge (public APIs, library surfaces).

// Types come into their own for unions, primitives, mapped/conditional types, and heavy composition.

import { Debug } from "../helpers/type-utils";

// .. here's a simple example...

interface User {
  id: string;
}
interface User {
  email?: string;
} // merges → { id: string; email?: string }

type MergedResult = Debug<User>;

// Example of an incompatible merge

interface Admin {
  id: string;
  email: string;
}
interface Admin {
  email: number; // incompatible merge
} // Error: Duplicate identifier 'Admin'.

// Main takeaway, if you want people to be able to augment shapes that you define
// use an interface or a type.

// Here are some more real world examples:

// Library augmentation / module augmentation for third‑party types:

// First we declare in ambient-express.d.ts.

// Now we can use the extra field!

import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

// Ambient/global augmentation (d.ts files):

declare global {
  interface Window {
    ftTheme?: "light" | "dark";
  }
}

type WindowProp = Debug<Window["ftTheme"]>;

// Types come into their own where you'd like to express a "union" of alternatives

// For example, here's how you could use a type to express two possible API response results:

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

type ApiData = {
  someVeryImportantArticleData: string;
};

const myApiFetch = async (url: string): Promise<ApiResult<ApiData>> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Our error message" };
  }
};

// You can also "discriminate" between the options in your union. Best shown using a demo:

type Article = {
  bodyText: string;
  title: string;
};

type ArticleState =
  | { kind: "draft"; draft: Article }
  | { kind: "live"; live: Article & { publishedAt: Date } }
  | { kind: "deleted"; reason: string };

// Render "discriminates" between possible options within the union
// This means that Typescript can work out that `s.reason` is only available
// if `s.kind === "deleted"`.
function render(s: ArticleState): string {
  switch (s.kind) {
    case "draft":
      return `Draft: ${s.draft.title}`;
    case "live":
      return `Live: ${s.live.title}`;
    case "deleted":
      return `Deleted: ${s.reason}`;
  }
}
