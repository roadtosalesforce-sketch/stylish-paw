import { CreditCard, PackageCheck, Ruler, ShieldCheck } from "lucide-react";
import type {Dictionary} from "@/i18n/dictionaries";

export function TrustBar({dict}: {dict: Dictionary}) {
  const items = [Ruler, ShieldCheck, CreditCard, PackageCheck].map((Icon, index) => [Icon, dict.trust[index][0], dict.trust[index][1]] as const);
  return <section className="border-b border-stone-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-stone-200 lg:grid-cols-4">{items.map(([Icon,title,text]) => <div key={title} className="flex items-center gap-3 bg-white px-5 py-5 lg:px-7"><Icon className="h-5 w-5 shrink-0 text-coral"/><div><p className="text-sm font-bold text-charcoal">{title}</p><p className="text-xs text-stone-500">{text}</p></div></div>)}</div></section>;
}
