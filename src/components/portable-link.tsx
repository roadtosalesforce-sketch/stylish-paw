import type {ReactNode} from "react";
import {safeContentHref} from "@/lib/safe-url";

export function PortableLink({value, children}: {value?: {href?: unknown}; children: ReactNode}) {
  const href = safeContentHref(value?.href);
  if (!href) return <>{children}</>;

  const external = href.startsWith("https://");
  return (
    <a
      href={href}
      className="font-semibold text-coral underline decoration-coral/30 underline-offset-4 hover:text-coral-dark"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
