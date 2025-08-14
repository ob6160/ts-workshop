// We declare our ambient type here to add our `user` parameter to the request object.
declare module "express-serve-static-core" {
  export interface Request {
    user?: { id: string; email?: string };
  }
}

export {};

// Why do we use `express-serve-static-core` instead of `express`?

// Express’s middleware types (app.use, RequestHandler, etc.) are defined in express-serve-static-core.
// The express package re‑exports some types, but app.use’s callback parameters are typed against the core definitions.
