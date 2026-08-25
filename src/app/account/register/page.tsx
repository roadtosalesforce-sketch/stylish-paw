import Link from "next/link";
import {redirect} from "next/navigation";
import {Sparkles, UserPlus} from "lucide-react";
import {getCurrentUser} from "@/lib/supabase/server";
import {getLocale} from "@/i18n/server";
import {signUp} from "../actions";

export default async function RegisterPage({searchParams}: {searchParams: Promise<{message?: string}>}) {
  if (await getCurrentUser()) redirect("/account");
  const locale = await getLocale();
  const {message} = await searchParams;
  const pl = locale === "pl";

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="hidden rounded-[2rem] bg-charcoal p-10 text-white lg:block">
        <Sparkles className="h-10 w-10 text-coral" />
        <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-coral">Furry Fairy Club</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{pl ? "Dołącz do naszej rodziny" : "Join our pet-loving family"}</h1>
        <ul className="mt-6 space-y-3 text-stone-300"><li>✓ {pl ? "Historia zamówień" : "Order history"}</li><li>✓ {pl ? "Szybsze zakupy" : "Faster checkout"}</li><li>✓ {pl ? "Informacje o dostawie w jednym miejscu" : "Delivery updates in one place"}</li></ul>
      </div>
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        <UserPlus className="h-8 w-8 text-coral" />
        <h1 className="mt-5 font-display text-3xl font-bold">{pl ? "Utwórz konto" : "Create account"}</h1>
        <p className="mt-2 text-sm text-stone-500">{pl ? "Rejestracja zajmie mniej niż minutę." : "It takes less than a minute."}</p>
        {message && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{message}</p>}
        <form action={signUp} className="mt-7 space-y-5">
          <label className="block text-sm font-bold">{pl ? "Imię i nazwisko" : "Full name"}<input required name="fullName" autoComplete="name" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <label className="block text-sm font-bold">E-mail<input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <label className="block text-sm font-bold">{pl ? "Hasło (min. 8 znaków)" : "Password (8+ characters)"}<input required minLength={8} name="password" type="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <button className="w-full rounded-full bg-coral px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-coral-dark">{pl ? "Załóż konto" : "Create account"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-600">{pl ? "Masz już konto?" : "Already registered?"} <Link className="font-bold text-coral hover:text-coral-dark" href="/account/login">{pl ? "Zaloguj się" : "Sign in"}</Link></p>
      </div>
    </section>
  );
}
