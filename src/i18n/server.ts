import "server-only";
import {cookies} from "next/headers";
import {isLocale, type Locale} from "./dictionaries";

export const LOCALE_COOKIE = "ffp-locale";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "pl";
}
