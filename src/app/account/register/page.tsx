import Link from "next/link";
import {redirect} from "next/navigation";
import {CheckCircle2, MailCheck, Sparkles, UserPlus} from "lucide-react";
import {getCurrentUser} from "@/lib/supabase/server";
import {getLocale} from "@/i18n/server";
import {signUp} from "../actions";

export default async function RegisterPage({searchParams}: {searchParams: Promise<{message?: string; registered?: string}>}) {
  if (await getCurrentUser()) redirect("/account");
  const locale = await getLocale();
  const {message, registered} = await searchParams;
  const pl = locale === "pl";

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="hidden rounded-[2rem] bg-charcoal p-10 text-white lg:block">
        <Sparkles className="h-10 w-10 text-coral" />
        <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-coral">Furry Fairy Club</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{pl ? "Dołącz do naszej rodziny" : "Join our pet-loving family"}</h1>
        <ul className="mt-6 space-y-3 text-stone-300"><li>✓ {pl ? "Punkty za zakupy" : "Points on purchases"}</li><li>✓ {pl ? "Historia zamówień" : "Order history"}</li><li>✓ {pl ? "Szybsze zakupy" : "Faster checkout"}</li><li>✓ {pl ? "Informacje o dostawie w jednym miejscu" : "Delivery updates in one place"}</li></ul>
      </div>
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        <UserPlus className="h-8 w-8 text-coral" />
        <h1 className="mt-5 font-display text-3xl font-bold">{pl ? "Utwórz konto" : "Create account"}</h1>
        <p className="mt-2 text-sm text-stone-500">{pl ? "Rejestracja zajmie mniej niż minutę." : "It takes less than a minute."}</p>
        {message && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{message}</p>}
        <form action={signUp} className="mt-7 space-y-5">
          <input type="hidden" name="locale" value={locale} />
          <label className="block text-sm font-bold">{pl ? "Imię i nazwisko" : "Full name"}<input required name="fullName" autoComplete="name" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <label className="block text-sm font-bold">E-mail<input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <label className="block text-sm font-bold">{pl ? "Hasło (min. 8 znaków)" : "Password (8+ characters)"}<input required minLength={8} name="password" type="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <button className="w-full rounded-full bg-coral px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-coral-dark">{pl ? "Załóż konto" : "Create account"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-600">{pl ? "Masz już konto?" : "Already registered?"} <Link className="font-bold text-coral hover:text-coral-dark" href="/account/login">{pl ? "Zaloguj się" : "Sign in"}</Link></p>
      </div>
      {registered === "1" && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 px-4" role="dialog" aria-modal="true" aria-labelledby="registration-success-title">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl sm:p-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8f2e6] text-sage-dark">
              <MailCheck className="h-8 w-8" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-coral">Furry Fairy Pets</p>
            <h2 id="registration-success-title" className="mt-2 font-display text-3xl font-bold">
              {pl ? "Dziękujemy za rejestrację!" : "Thank you for joining!"}
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              {pl
                ? "Wysłaliśmy wiadomość potwierdzającą. Otwórz swoją skrzynkę e-mail i kliknij przycisk w wiadomości, aby aktywować konto."
                : "We sent you a confirmation email. Open your inbox and click the button in the message to activate your account."}
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-sage-dark">
              <CheckCircle2 className="h-4 w-4" />
              {pl ? "Po aktywacji możesz się zalogować" : "You can sign in after activation"}
            </div>
            <Link href="/account/login" className="mt-7 inline-flex rounded-full bg-charcoal px-7 py-3 font-bold text-white transition hover:bg-coral">
              {pl ? "Przejdź do logowania" : "Go to sign in"}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
