import {redirect} from "next/navigation";
import {LockKeyhole} from "lucide-react";
import {getLocale} from "@/i18n/server";
import {getCurrentUser} from "@/lib/supabase/server";
import {updatePassword} from "../actions";

export default async function UpdatePasswordPage({searchParams}: {searchParams: Promise<{message?: string}>}) {
  const locale = await getLocale();
  const pl = locale === "pl";
  const user = await getCurrentUser();
  if (!user) redirect(`/account/login?message=${encodeURIComponent(pl ? "Link do zmiany hasła jest nieprawidłowy lub wygasł." : "The password reset link is invalid or expired.")}`);
  const {message} = await searchParams;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-14 sm:px-6">
      <div className="w-full rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        <LockKeyhole className="h-8 w-8 text-coral" />
        <h1 className="mt-5 font-display text-3xl font-bold">{pl ? "Ustaw nowe hasło" : "Choose a new password"}</h1>
        <p className="mt-2 text-sm text-stone-500">{pl ? "Użyj unikalnego hasła, którego nie stosujesz w innych serwisach." : "Use a unique password that you do not reuse elsewhere."}</p>
        {message && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{message}</p>}
        <form action={updatePassword} className="mt-7 space-y-5">
          <input type="hidden" name="locale" value={locale} />
          <label className="block text-sm font-bold">{pl ? "Nowe hasło" : "New password"}<input required minLength={8} maxLength={128} name="password" type="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <label className="block text-sm font-bold">{pl ? "Powtórz hasło" : "Confirm password"}<input required minLength={8} maxLength={128} name="passwordConfirmation" type="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-coral focus:ring-2 focus:ring-coral/20" /></label>
          <button className="w-full rounded-full bg-charcoal px-6 py-3.5 font-bold text-white transition hover:bg-coral-dark">{pl ? "Zapisz nowe hasło" : "Save new password"}</button>
        </form>
      </div>
    </section>
  );
}
