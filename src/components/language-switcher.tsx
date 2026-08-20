"use client";

import {useRouter} from "next/navigation";
import type {Locale} from "@/i18n/dictionaries";

export function LanguageSwitcher({locale, label}: {locale: Locale; label: string}) {
  const router = useRouter();

  async function changeLocale(nextLocale: Locale) {
    await fetch("/api/locale", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({locale: nextLocale}),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center rounded-full bg-stone-100 p-1" aria-label={label}>
      {(["en", "pl"] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => changeLocale(value)}
          aria-pressed={locale === value}
          className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition ${locale === value ? "bg-white text-charcoal shadow-sm" : "text-stone-500 hover:text-charcoal"}`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
