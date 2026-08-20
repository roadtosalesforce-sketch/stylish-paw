import {cookies} from "next/headers";
import {isLocale} from "@/i18n/dictionaries";
import {LOCALE_COOKIE} from "@/i18n/server";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as {locale?: unknown} | null;

  if (typeof payload?.locale !== "string" || !isLocale(payload.locale)) {
    return Response.json({error: "Invalid locale"}, {status: 400});
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, payload.locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({locale: payload.locale});
}
