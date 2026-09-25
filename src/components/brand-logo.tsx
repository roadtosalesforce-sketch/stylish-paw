import Image from "next/image";

export function BrandLogo({shopName = "Furry Fairy Pets", inverse = false, compact = false}: {shopName?: string; inverse?: boolean; compact?: boolean}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/furry-fairy-tab-icon-v3.svg" alt="" width={34} height={34} className="h-8 w-8" priority />
      {!compact && <span className={`text-sm font-semibold uppercase tracking-[.18em] ${inverse ? "text-white" : "text-charcoal"}`}>{shopName}</span>}
    </span>
  );
}
