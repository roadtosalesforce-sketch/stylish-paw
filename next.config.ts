import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload"},
          {key: "X-Content-Type-Options", value: "nosniff"},
          {key: "X-Frame-Options", value: "SAMEORIGIN"},
          {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
          {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), browsing-topics=()"},
          {key: "X-Permitted-Cross-Domain-Policies", value: "none"},
        ],
      },
      {
        source: "/account/:path*",
        headers: [{key: "Cache-Control", value: "no-store, max-age=0"}],
      },
      {
        source: "/checkout/:path*",
        headers: [{key: "Cache-Control", value: "no-store, max-age=0"}],
      },
      {
        source: "/auth/:path*",
        headers: [{key: "Cache-Control", value: "no-store, max-age=0"}],
      },
      {
        source: "/api/:path*",
        headers: [{key: "Cache-Control", value: "no-store, max-age=0"}],
      },
    ];
  },
};

export default nextConfig;
