import Image from "next/image";

export function BrandLogo({shopName = "Furry Fairy Pets", inverse = false, compact = false}: {shopName?: string; inverse?: boolean; compact?: boolean}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/brand/furry-fairy-dog-mark.png" alt="" width={48} height={48} className="h-10 w-10 object-contain" priority />
      {!compact && <span className={`text-sm font-semibold uppercase tracking-[.18em] ${inverse ? "text-white" : "text-[#181914]"}`}>{shopName}</span>}
    </span>
  );
}
