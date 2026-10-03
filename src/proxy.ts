import type {NextRequest} from "next/server";
import {updateSession} from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const response = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/studio") && !pathname.startsWith("/api/")) {
    const isDev = process.env.NODE_ENV === "development";
    const policy = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://geowidget.inpost.pl https://geowidget.inpost-group.com`,
      "style-src 'self' 'unsafe-inline' https://geowidget.inpost.pl https://geowidget.inpost-group.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://geowidget.inpost.pl https://geowidget-app.inpost.pl https://geowidget.inpost-group.com https://*.inpost.pl",
      "font-src 'self' data: https://geowidget.inpost.pl https://geowidget.inpost-group.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.sanity.io https://cdn.sanity.io https://api.stripe.com https://geowidget.inpost.pl https://geowidget-app.inpost.pl https://geowidget.inpost-group.com https://*.inpost.pl",
      "frame-src https://geowidget-app.inpost.pl https://geowidget.inpost.pl https://geowidget.inpost-group.com https://*.stripe.com",
      "media-src 'self' blob: https://cdn.sanity.io",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      ...(isDev ? [] : ["upgrade-insecure-requests"]),
    ].join("; ");

    response.headers.set("Content-Security-Policy", policy);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
