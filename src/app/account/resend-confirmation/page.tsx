import Link from "next/link";
import {MailCheck} from "lucide-react";
import {getLocale} from "@/i18n/server";
import {resendConfirmation} from "../actions";

export default async function ResendConfirmationPage({searchParams}: {searchParams: Promise<{message?: string; sent?: string}>}) {
  const locale = await getLocale();
  const {message, sent} = await searchParams;
  const pl = locale === "pl";

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-14 sm:px-6">
      <div className="w-full rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        <MailCheck className="h-8 w-8 text-sage-dark" />
        <h1 className="mt-5 font-display text-3xl font-bold">{pl ? "Potwierdź swój e-mail" : "Confirm your email"}</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          {sent === "1"
            ? (pl ? "Jeśli adres oczekuje na potwierdzenie, wysłaliśmy nową wiadomość. Sprawdź także folder spam." : "If the address is waiting for confirmation, we sent a new message. Check your spam folder too.")
            : (pl ? "Nie dotarła wiadomość po rejestracji? Poproś o nowy link." : "Did not receive the signup email? Request a new link.")}
        </p>
        {message && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{message}</p>}
        {sent !== "1" && (
          <form action={resendConfirmation} className="mt-7 space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <label className="block text-sm font-bold">E-mail<input required maxLength={254} name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
            <button className="w-full rounded-full bg-charcoal px-6 py-3.5 font-bold text-white transition hover:bg-coral-dark">{pl ? "Wyślij ponownie" : "Resend confirmation"}</button>
          </form>
        )}
        <Link className="mt-6 block text-center text-sm font-bold text-coral hover:text-coral-dark" href="/account/login">{pl ? "Wróć do logowania" : "Back to sign in"}</Link>
      </div>
    </section>
  );
}
