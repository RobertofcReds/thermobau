import type { NextConfig } from "next";
import { publicationReady } from "./src/lib/publication";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  // Preserve the incoming origin for next-intl's internal locale rewrites.
  // URL normalization otherwise replaces loopback IPs with localhost.
  skipProxyUrlNormalize: true,
  images: { formats: ["image/webp"], minimumCacheTTL: 86400 },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
          ...(!publicationReady()
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
        ],
      },
    ];
  },
};
export default createNextIntlPlugin()(nextConfig);
