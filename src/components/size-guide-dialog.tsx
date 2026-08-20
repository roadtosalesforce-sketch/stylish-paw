"use client";

import { Ruler, X } from "lucide-react";
import { useState } from "react";
import type {Dictionary} from "@/i18n/dictionaries";

export function SizeGuideDialog({dict}: {dict: Dictionary}) {
  const [open,setOpen] = useState(false);
  return <>
    <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm font-bold text-charcoal underline decoration-stone-300 underline-offset-4 hover:text-coral"><Ruler className="h-4 w-4"/> {dict.sizeGuide.link}</button>
    {open && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/45 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setOpen(false)}><div className="w-full max-w-2xl rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8" onClick={e => e.stopPropagation()}><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-coral">{dict.sizeGuide.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold">{dict.sizeGuide.title}</h2></div><button onClick={() => setOpen(false)} aria-label={dict.sizeGuide.close} className="rounded-full bg-stone-100 p-2"><X className="h-5 w-5"/></button></div><div className="mt-7 grid gap-5 sm:grid-cols-3">{dict.sizeGuide.steps.map(([title,text], index) => <div key={title} className="rounded-2xl bg-[#fbf8f2] p-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">{index + 1}</span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-stone-600">{text}</p></div>)}</div><p className="mt-6 rounded-xl border border-sage/30 bg-sage/10 p-4 text-sm text-stone-700">{dict.sizeGuide.note}</p></div></div>}
  </>;
}
