import "server-only";

const DEFAULT_SITE_ORIGIN = "https://www.furryfairypets.com";

function parseOrigin(value: string | null | undefined) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function getSiteOrigin(requestOrigin?: string | null) {
  const configuredOrigin = parseOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (configuredOrigin) return configuredOrigin;

  const parsedRequestOrigin = parseOrigin(requestOrigin);
  if (process.env.NODE_ENV !== "production" && parsedRequestOrigin) {
    return parsedRequestOrigin;
  }

  return DEFAULT_SITE_ORIGIN;
}

export function isTrustedRequestOrigin(request: Request) {
  const suppliedOrigin = parseOrigin(request.headers.get("origin"));
  const requestOrigin = parseOrigin(request.url);
  const configuredOrigin = parseOrigin(process.env.NEXT_PUBLIC_SITE_URL);

  if (suppliedOrigin) {
    return suppliedOrigin === requestOrigin || suppliedOrigin === configuredOrigin;
  }

  // Non-browser clients may omit Origin. Browser cross-site requests include
  // both Origin and Sec-Fetch-Site, so explicitly reject that signal.
  return request.headers.get("sec-fetch-site") !== "cross-site";
}

type JsonResult =
  | {ok: true; value: unknown}
  | {ok: false; reason: "content-type" | "too-large" | "invalid-json"};

export async function readLimitedJson(request: Request, maxBytes: number): Promise<JsonResult> {
  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.startsWith("application/json")) {
    return {ok: false, reason: "content-type"};
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return {ok: false, reason: "too-large"};
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > maxBytes) {
    return {ok: false, reason: "too-large"};
  }

  try {
    return {ok: true, value: JSON.parse(body)};
  } catch {
    return {ok: false, reason: "invalid-json"};
  }
}

export function noStoreJson(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store, max-age=0");
  return Response.json(body, {...init, headers});
}
