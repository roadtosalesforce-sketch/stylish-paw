import Link from "next/link";
import {KeyRound, MailCheck} from "lucide-react";
import {getLocale} from "@/i18n/server";
import {requestPasswordReset} from "../actions";

export default async function ForgotPasswordPage({searchParams}: {searchParams: Promise<{message?: string; sent?: string}>}) {
  const locale = await getLocale();
  const {message, sent} = await searchParams;
  const pl = locale === "pl";

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-14 sm:px-6">
      <div className="w-full rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        {sent === "1" ? <MailCheck className="h-8 w-8 text-sage-dark" /> : <KeyRound className="h-8 w-8 text-coral" />}
        <h1 className="mt-5 font-display text-3xl font-bold">{pl ? "Zresetuj hasło" : "Reset your password"}</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          {sent === "1"
            ? (pl ? "Jeśli konto istnieje, wysłaliśmy bezpieczny link do zmiany hasła. Sprawdź także folder spam." : "If the account exists, we sent a secure password reset link. Check your spam folder too.")
            : (pl ? "Podaj adres e-mail użyty podczas rejestracji." : "Enter the email address used for your account.")}
        </p>
        {message && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{message}</p>}
        {sent !== "1" && (
          <form action={requestPasswordReset} className="mt-7 space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <label className="block text-sm font-bold">E-mail<input required maxLength={254} name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
            <button className="w-full rounded-full bg-charcoal px-6 py-3.5 font-bold text-white transition hover:bg-coral-dark">{pl ? "Wyślij link" : "Send reset link"}</button>
          </form>
        )}
        <Link className="mt-6 block text-center text-sm font-bold text-coral hover:text-coral-dark" href="/account/login">{pl ? "Wróć do logowania" : "Back to sign in"}</Link>
      </div>
    </section>
  );
}
