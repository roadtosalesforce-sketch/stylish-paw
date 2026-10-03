import {cookies} from "next/headers";
import {isLocale} from "@/i18n/dictionaries";
import {LOCALE_COOKIE} from "@/i18n/server";
import {isTrustedRequestOrigin, noStoreJson, readLimitedJson} from "@/lib/security";

export async function POST(request: Request) {
  if (!isTrustedRequestOrigin(request)) {
    return noStoreJson({error: "Request origin is not allowed"}, {status: 403});
  }

  const parsedBody = await readLimitedJson(request, 1024);
  if (!parsedBody.ok) {
    const status = parsedBody.reason === "too-large" ? 413 : parsedBody.reason === "content-type" ? 415 : 400;
    return noStoreJson({error: "Invalid request"}, {status});
  }
  const payload = parsedBody.value as {locale?: unknown} | null;

  if (typeof payload?.locale !== "string" || !isLocale(payload.locale)) {
    return noStoreJson({error: "Invalid locale"}, {status: 400});
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, payload.locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return noStoreJson({locale: payload.locale});
}
