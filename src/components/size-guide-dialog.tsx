"use client";

import { Ruler, X } from "lucide-react";
import { useState } from "react";

export function SizeGuideDialog() {
  const [open,setOpen] = useState(false);
  return <>
    <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm font-bold text-charcoal underline decoration-stone-300 underline-offset-4 hover:text-coral"><Ruler className="h-4 w-4"/> Size guide & how to measure</button>
    {open && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/45 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setOpen(false)}><div className="w-full max-w-2xl rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8" onClick={e => e.stopPropagation()}><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-coral">A better fit starts here</p><h2 className="mt-2 font-display text-3xl font-bold">Measure your pet</h2></div><button onClick={() => setOpen(false)} aria-label="Close size guide" className="rounded-full bg-stone-100 p-2"><X className="h-5 w-5"/></button></div><div className="mt-7 grid gap-5 sm:grid-cols-3">{[["1","Neck","Measure where the collar naturally sits."],["2","Chest","Measure the widest point behind the front legs."],["3","Back","Measure from the collar line to the base of the tail."]].map(([n,title,text]) => <div key={n} className="rounded-2xl bg-[#fbf8f2] p-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">{n}</span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-stone-600">{text}</p></div>)}</div><p className="mt-6 rounded-xl border border-sage/30 bg-sage/10 p-4 text-sm text-stone-700">If your pet falls between sizes, choose the larger size for comfort. Product-specific measurements will appear here when entered in Sanity.</p></div></div>}
  </>;
}
