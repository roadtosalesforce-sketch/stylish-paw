"use client";

import {useMemo, useState} from "react";
import {Ruler, Sparkles, X} from "lucide-react";
import type {Product, ProductSizeRow} from "@/types/product";
import type {Dictionary} from "@/i18n/dictionaries";

function range(value?: string): [number, number] | null {
  if (!value) return null;
  const numbers = value.replace(",", ".").match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  if (numbers.length === 0) return null;
  return numbers.length === 1 ? [numbers[0], numbers[0]] : [Math.min(numbers[0], numbers[1]), Math.max(numbers[0], numbers[1])];
}

function matches(value: number, source?: string) {
  const limits = range(source);
  return limits ? value >= limits[0] && value <= limits[1] : false;
}

function suggestedRow(rows: ProductSizeRow[], chest: number, weight: number) {
  if (chest > 0) {
    const byChest = rows.find((row) => matches(chest, row.chest));
    if (byChest) return byChest;
  }
  if (weight > 0) return rows.find((row) => matches(weight, row.weight));
  return undefined;
}

export function SizeGuideDialog({dict, product}: {dict: Dictionary; product?: Product}) {
  const [open, setOpen] = useState(false);
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const rows = useMemo(() => product?.sizeGuide?.rows || [], [product?.sizeGuide?.rows]);
  const recommendation = useMemo(() => suggestedRow(rows, Number(chest), Number(weight)), [rows, chest, weight]);
  const hasMeasurements = rows.length > 0;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm font-bold text-charcoal underline decoration-stone-300 underline-offset-4 hover:text-coral"><Ruler className="h-4 w-4"/> {dict.sizeGuide.link}</button>
      {open && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[130] flex items-end justify-center bg-charcoal/45 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setOpen(false)}>
        <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8" onClick={(event) => event.stopPropagation()}>
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.16em] text-coral">{dict.sizeGuide.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold">{dict.sizeGuide.title}</h2></div>
            <button type="button" onClick={() => setOpen(false)} aria-label={dict.sizeGuide.close} className="rounded-full bg-stone-100 p-2"><X className="h-5 w-5"/></button>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">{dict.sizeGuide.steps.map(([title,text], index) => <div key={title} className="rounded-2xl bg-[#fbf8f2] p-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">{index + 1}</span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-stone-600">{text}</p></div>)}</div>

          <div className="mt-7 rounded-3xl border border-sage/25 bg-sage/10 p-5 sm:p-6">
            <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-sage-dark"/><h3 className="font-display text-xl font-bold text-charcoal">{dict.sizeGuide.finderTitle}</h3></div>
            <p className="mt-1 text-sm text-stone-600">{dict.sizeGuide.finderText}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <label className="text-sm font-semibold text-charcoal">{dict.sizeGuide.breed}
                <select value={breed} onChange={(event) => setBreed(event.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 font-normal outline-none focus:border-coral">
                  <option value="">{dict.sizeGuide.chooseBreed}</option>
                  {dict.sizeGuide.breeds.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-charcoal">{dict.sizeGuide.weight}
                <input inputMode="decimal" type="number" min="0" step="0.1" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="6.5" className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 font-normal outline-none focus:border-coral" />
              </label>
              <label className="text-sm font-semibold text-charcoal">{dict.sizeGuide.chest}
                <input inputMode="decimal" type="number" min="0" step="0.5" value={chest} onChange={(event) => setChest(event.target.value)} placeholder="42" className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 font-normal outline-none focus:border-coral" />
              </label>
            </div>
            {(Number(chest) > 0 || Number(weight) > 0) && (
              <div className={`mt-5 rounded-2xl p-4 text-sm ${recommendation ? "bg-white text-charcoal" : "bg-amber-50 text-amber-900"}`}>
                {recommendation ? <><span className="font-bold">{dict.sizeGuide.recommendation}: {recommendation.size}</span><span className="ml-2 text-stone-500">{dict.sizeGuide.checkMeasurements}</span></> : hasMeasurements ? dict.sizeGuide.noMatch : dict.sizeGuide.measurementsPending}
              </div>
            )}
          </div>

          {hasMeasurements && <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead><tr className="border-b border-stone-200 text-stone-500"><th className="py-3">{dict.sizeGuide.size}</th><th>{dict.sizeGuide.neck}</th><th>{dict.sizeGuide.chestShort}</th><th>{dict.sizeGuide.back}</th><th>{dict.sizeGuide.weightShort}</th></tr></thead><tbody>{rows.map((row) => <tr key={row.size} className="border-b border-stone-100"><td className="py-3 font-bold">{row.size}</td><td>{row.neck || "—"}</td><td>{row.chest || "—"}</td><td>{row.back || "—"}</td><td>{row.weight || "—"}</td></tr>)}</tbody></table></div>}
          <p className="mt-6 rounded-xl border border-sage/30 bg-sage/10 p-4 text-sm text-stone-700">{dict.sizeGuide.note}</p>
        </div>
      </div>}
    </>
  );
}
