import Link from "next/link";
import {getLocale} from "@/i18n/server";

export default async function NotFound() {
  const pl = (await getLocale()) === "pl";

  return (
    <section className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-sage-dark">404 · Furry Fairy Pets</p>
      <h1 className="mt-4 text-4xl font-medium uppercase tracking-[.04em] text-charcoal sm:text-5xl">{pl ? "Nie znaleziono strony" : "Page not found"}</h1>
      <p className="mt-5 max-w-lg leading-relaxed text-stone-600">{pl ? "Ten adres nie prowadzi już do żadnej strony. Wróć do sklepu i kontynuuj zakupy." : "This address no longer leads to a page. Return to the shop and continue browsing."}</p>
      <Link href="/shop" className="mt-8 bg-charcoal px-7 py-3 text-xs font-semibold uppercase tracking-[.12em] text-white hover:bg-coral-dark">{pl ? "Przejdź do sklepu" : "Go to shop"}</Link>
    </section>
  );
}
