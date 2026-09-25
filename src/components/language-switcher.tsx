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
    <div className="flex items-center rounded-full bg-[#f1eee4] p-1" aria-label={label}>
      {(["en", "pl"] as const).map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => changeLocale(value)}
          aria-pressed={locale === value}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition ${locale === value ? "bg-[#e1e5d8] text-sage-dark" : "text-[#756f65] hover:text-sage-dark"}`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
