import { CreditCard, PackageCheck, Ruler, ShieldCheck } from "lucide-react";

const items = [
  [Ruler, "Easy size guidance", "Measure with confidence"],
  [ShieldCheck, "Comfort first", "Thoughtful materials and fit"],
  [CreditCard, "Secure checkout", "Protected payment flow"],
  [PackageCheck, "Clear support", "Helpful delivery and returns info"],
] as const;

export function TrustBar() {
  return <section className="border-b border-stone-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-stone-200 lg:grid-cols-4">{items.map(([Icon,title,text]) => <div key={title} className="flex items-center gap-3 bg-white px-5 py-5 lg:px-7"><Icon className="h-5 w-5 shrink-0 text-coral"/><div><p className="text-sm font-bold text-charcoal">{title}</p><p className="text-xs text-stone-500">{text}</p></div></div>)}</div></section>;
}
