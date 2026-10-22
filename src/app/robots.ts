import type { MetadataRoute } from "next";
import { getSiteUrl, publicationReady } from "@/lib/publication";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  if (!publicationReady() || !siteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
