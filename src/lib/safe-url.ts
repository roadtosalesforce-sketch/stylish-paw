const INTERNAL_BASE = "https://furry-fairy.invalid";

export function safeInternalHref(value: unknown, fallback = "/") {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\u0000-\u001f\u007f]/.test(value)
  ) {
    return fallback;
  }

  try {
    const parsed = new URL(value, INTERNAL_BASE);
    if (parsed.origin !== INTERNAL_BASE) return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}

export function safeHttpsUrl(value: unknown) {
  if (typeof value !== "string") return undefined;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function safeContentHref(value: unknown) {
  if (typeof value !== "string") return undefined;
  if (value.startsWith("/")) {
    const href = safeInternalHref(value, "");
    return href || undefined;
  }
  return safeHttpsUrl(value);
}

export function safeEmailHref(value: unknown) {
  if (typeof value !== "string") return undefined;
  const email = value.trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return undefined;
  return `mailto:${email}`;
}
