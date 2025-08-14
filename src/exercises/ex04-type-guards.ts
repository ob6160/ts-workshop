/*
 * 4) Template literal types for locales
 *
 * Build a safe locale API from Language.
 */

type Language = "en" | "jp" | "de";
type LocaleId = `${Language}_locale`;

export function setLocale(locale: LocaleId) {
  /* … */
}

setLocale("de_locale");
// @ts-expect-error
setLocale("es_locale");

// Add a runtime type guard:
export function isLocaleId(x: string): x is LocaleId {
  // implement
}

// Acceptance checks
declare const u: string;
if (isLocaleId(u)) setLocale(u); // should compile
