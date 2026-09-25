"use server";

import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {getShopSettings} from "@/sanity/lib/content";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function message(path: string, value: string) {
  return `${path}?message=${encodeURIComponent(value)}`;
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect(message("/account/login", "Membership is being activated."));

  const email = text(formData, "email");
  const password = text(formData, "password");
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
  if (password.length < 8) {
    redirect(message("/account/register", pl ? "Hasło musi zawierać co najmniej 8 znaków." : "Password must contain at least 8 characters."));
  }

  const origin = (await headers()).get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://www.furryfairypets.com";
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {full_name: fullName},
      emailRedirectTo: `${origin.replace(/\/$/, "")}/auth/confirm`,
    },
  });

  if (error) redirect(message("/account/register", error.message));
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
