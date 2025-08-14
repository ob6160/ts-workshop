// In 2025, we prefer ES modules. Namespaces are mainly for legacy/ambient global types.
// The reason why is that Namespaces pollute the global scope, making it difficult to manage dependencies and avoid naming conflicts.

namespace FT {
  export interface Article {
    id: string;
    title: string;
  }
  export namespace Util {
    export function slugify(s: string) {
      return s.toLowerCase();
    }
  }
}

FT.Util.slugify("Hello World"); // "hello world"

// We can still use namespaces in scenarios where we'd like to add typings to globals
// that are added from a third party (or our own) JavaScript code.
// For example, we sometimes add typings for jQuery or other libraries this way.

// Generally however we should stick to using ES modules, and avoid using namespaces for new code.
// This helps keep our codebase clean and maintainable.
