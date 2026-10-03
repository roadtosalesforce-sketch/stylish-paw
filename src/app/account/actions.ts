"use server";

import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {getShopSettings} from "@/sanity/lib/content";
import {getSiteOrigin} from "@/lib/security";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function message(path: string, value: string) {
  return `${path}?message=${encodeURIComponent(value)}`;
}

function validEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function signUpErrorMessage(code: string | undefined, pl: boolean) {
  switch (code) {
    case "email_address_invalid":
      return pl ? "Wpisz prawidłowy adres e-mail." : "Enter a valid email address.";
    case "weak_password":
      return pl
        ? "Wybierz silniejsze hasło. Użyj co najmniej 8 znaków, cyfr i różnych wielkości liter."
        : "Choose a stronger password with at least 8 characters, numbers and mixed case.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return pl
        ? "Wysłano zbyt wiele prób. Odczekaj kilka minut i spróbuj ponownie."
        : "Too many attempts were sent. Wait a few minutes and try again.";
    case "signup_disabled":
      return pl
        ? "Rejestracja jest chwilowo niedostępna. Skontaktuj się z obsługą."
        : "Registration is temporarily unavailable. Please contact support.";
    case "captcha_failed":
      return pl
        ? "Nie udało się potwierdzić zabezpieczenia formularza. Odśwież stronę i spróbuj ponownie."
        : "We could not verify the form security check. Refresh the page and try again.";
    default:
      return pl
        ? "Nie udało się utworzyć konta. Spróbuj ponownie później."
        : "We could not create the account. Please try again later.";
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect(message("/account/login", "Membership is being activated."));

  const email = text(formData, "email");
  const password = text(formData, "password");
  if (!validEmail(email) || password.length === 0 || password.length > 128) {
    redirect(message("/account/login", "Email or password is incorrect."));
  }
  const {error} = await supabase.auth.signInWithPassword({email, password});

  if (error) redirect(message("/account/login", "Email or password is incorrect."));
  redirect("/account");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const locale = text(formData, "locale");
  const pl = locale === "pl";
  if (!supabase) redirect(message("/account/register", pl ? "Rejestracja jest właśnie uruchamiana." : "Membership is being activated."));

  const fullName = text(formData, "fullName");
  const email = text(formData, "email");
  const password = text(formData, "password");
  if (fullName.length < 2 || fullName.length > 100 || /[\u0000-\u001f\u007f]/.test(fullName)) {
    redirect(message("/account/register", pl ? "Wpisz prawidłowe imię i nazwisko." : "Enter a valid full name."));
  }
  if (!validEmail(email)) {
    redirect(message("/account/register", pl ? "Wpisz prawidłowy adres e-mail." : "Enter a valid email address."));
  }
  if (password.length < 8 || password.length > 128) {
    redirect(message("/account/register", pl ? "Hasło musi zawierać co najmniej 8 znaków." : "Password must contain at least 8 characters."));
  }

  const origin = getSiteOrigin((await headers()).get("origin"));
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {full_name: fullName},
      emailRedirectTo: `${origin.replace(/\/$/, "")}/auth/confirm`,
    },
  });

  if (error) {
    console.error("Unable to create customer account", error.code || "unknown");
    redirect(message("/account/register", signUpErrorMessage(error.code, pl)));
  }
  if (data.user) {
    const [admin, settings] = await Promise.all([
      Promise.resolve(createAdminClient()),
      getShopSettings(pl ? "pl" : "en"),
    ]);
    const welcomePoints = Math.max(0, Number(settings?.welcomePoints) || 0);
    if (admin && settings?.loyaltyEnabled !== false && welcomePoints > 0) {
      const {error: pointsError} = await admin.rpc("award_loyalty_action", {
        p_user_id: data.user.id,
        p_source_type: "account_created",
        p_source_id: data.user.id,
        p_points: welcomePoints,
        p_description: "Welcome points for creating an account",
      });
      if (pointsError) console.error("Unable to award welcome points", pointsError);
    }
  }
  if (data.session) redirect("/account");
  redirect("/account/register?registered=1");
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(formData: FormData) {
  const locale = text(formData, "locale");
  const pl = locale === "pl";
  const email = text(formData, "email");
  if (!validEmail(email)) {
    redirect(message("/account/forgot-password", pl ? "Wpisz prawidłowy adres e-mail." : "Enter a valid email address."));
  }

  const supabase = await createClient();
  if (supabase) {
    const origin = getSiteOrigin((await headers()).get("origin"));
    const confirmUrl = new URL("/auth/confirm", origin);
    confirmUrl.searchParams.set("next", "/account/update-password");
    const {error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: confirmUrl.toString(),
    });
    if (error) console.error("Unable to request a password reset", error.code || "unknown");
  }

  redirect("/account/forgot-password?sent=1");
}

export async function resendConfirmation(formData: FormData) {
  const locale = text(formData, "locale");
  const pl = locale === "pl";
  const email = text(formData, "email");
  if (!validEmail(email)) {
    redirect(message("/account/resend-confirmation", pl ? "Wpisz prawidłowy adres e-mail." : "Enter a valid email address."));
  }

  const supabase = await createClient();
  if (supabase) {
    const origin = getSiteOrigin((await headers()).get("origin"));
    const {error} = await supabase.auth.resend({
      type: "signup",
      email,
      options: {emailRedirectTo: `${origin}/auth/confirm`},
    });
    if (error) console.error("Unable to resend account confirmation", error.code || "unknown");
  }

  redirect("/account/resend-confirmation?sent=1");
}

export async function updatePassword(formData: FormData) {
  const locale = text(formData, "locale");
  const pl = locale === "pl";
  const password = text(formData, "password");
  const confirmation = text(formData, "passwordConfirmation");
  if (password.length < 8 || password.length > 128) {
    redirect(message("/account/update-password", pl ? "Hasło musi zawierać co najmniej 8 znaków." : "Password must contain at least 8 characters."));
  }
  if (password !== confirmation) {
    redirect(message("/account/update-password", pl ? "Hasła nie są takie same." : "Passwords do not match."));
  }

  const supabase = await createClient();
  if (!supabase) redirect(message("/account/login", pl ? "Usługa konta jest chwilowo niedostępna." : "Account service is temporarily unavailable."));

  const {error} = await supabase.auth.updateUser({password});
  if (error) {
    console.error("Unable to update customer password", error.code || "unknown");
    redirect(message("/account/update-password", pl ? "Nie udało się zmienić hasła. Poproś o nowy link." : "We could not change the password. Request a new link."));
  }

  await supabase.auth.signOut();
  redirect(message("/account/login", pl ? "Hasło zostało zmienione. Możesz się zalogować." : "Password updated. You can sign in now."));
}
