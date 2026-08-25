"use server";

import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";

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
  if (!supabase) redirect(message("/account/register", "Membership is being activated."));

  const fullName = text(formData, "fullName");
  const email = text(formData, "email");
  const password = text(formData, "password");
  if (password.length < 8) {
    redirect(message("/account/register", "Password must contain at least 8 characters."));
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
  if (data.session) redirect("/account");
  redirect(message("/account/login", "Check your email and confirm your account, then sign in."));
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
