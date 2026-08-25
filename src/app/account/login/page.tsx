import Link from "next/link";
import {redirect} from "next/navigation";
import {LogIn, ShieldCheck} from "lucide-react";
import {getCurrentUser} from "@/lib/supabase/server";
import {getLocale} from "@/i18n/server";
import {signIn} from "../actions";

export default async function LoginPage({searchParams}: {searchParams: Promise<{message?: string}>}) {
  if (await getCurrentUser()) redirect("/account");
  const locale = await getLocale();
  const {message} = await searchParams;
  const pl = locale === "pl";

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="hidden rounded-[2rem] bg-[#e5eee3] p-10 lg:block">
        <ShieldCheck className="h-10 w-10 text-sage-dark" />
        <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-sage-dark">Furry Fairy Club</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{pl ? "Wszystko dla Twojego pupila w jednym miejscu" : "Everything for your pet in one place"}</h1>
        <p className="mt-5 leading-relaxed text-stone-600">{pl ? "Sprawdzaj zamówienia, zapisuj dane dostawy i kupuj szybciej." : "Track orders, save delivery details and check out faster."}</p>
      </div>
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        <LogIn className="h-8 w-8 text-coral" />
        <h1 className="mt-5 font-display text-3xl font-bold">{pl ? "Zaloguj się" : "Sign in"}</h1>
        <p className="mt-2 text-sm text-stone-500">{pl ? "Witaj ponownie w Furry Fairy Pets." : "Welcome back to Furry Fairy Pets."}</p>
        {message && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{message}</p>}
        <form action={signIn} className="mt-7 space-y-5">
          <label className="block text-sm font-bold">E-mail<input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <label className="block text-sm font-bold">{pl ? "Hasło" : "Password"}<input required name="password" type="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <button className="w-full rounded-full bg-coral px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-coral-dark">{pl ? "Zaloguj się" : "Sign in"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-600">{pl ? "Nie masz konta?" : "New here?"} <Link className="font-bold text-coral hover:text-coral-dark" href="/account/register">{pl ? "Utwórz konto" : "Create an account"}</Link></p>
      </div>
    </section>
  );
}
