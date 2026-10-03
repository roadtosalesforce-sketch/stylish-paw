import {NextResponse} from "next/server";
import type {EmailOtpType} from "@supabase/supabase-js";
import {createClient} from "@/lib/supabase/server";
import {getSiteOrigin} from "@/lib/security";

const allowedOtpTypes = new Set<EmailOtpType>([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]);

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const {searchParams} = requestUrl;
  const origin = getSiteOrigin(requestUrl.origin);
  const tokenHash = searchParams.get("token_hash");
  const requestedType = searchParams.get("type") as EmailOtpType | null;
  const type = requestedType && allowedOtpTypes.has(requestedType) ? requestedType : null;
  const code = searchParams.get("code");
  const supabase = await createClient();

  function redirectTo(path: string) {
    const response = NextResponse.redirect(new URL(path, origin));
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }

  if (supabase && code && code.length <= 2048) {
    const {error} = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirectTo("/account");
  }
  if (supabase && tokenHash && tokenHash.length <= 2048 && type) {
    const {error} = await supabase.auth.verifyOtp({type, token_hash: tokenHash});
    if (!error) return redirectTo("/account");
  }
  return redirectTo(`/account/login?message=${encodeURIComponent("Confirmation link is invalid or expired.")}`);
}
