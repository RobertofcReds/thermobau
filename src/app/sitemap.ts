import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getSiteUrl, publicationReady } from "@/lib/publication";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!publicationReady() || !siteUrl) return [];

  const paths = [
    "/",
    "/leistungen",
    ...services.map((service) => `/leistungen/${service.slug}`),
    "/ueber-uns",
    "/referenzen",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ];

  return paths.map((path) => ({
    url: new URL(path, `${siteUrl}/`).toString(),
  }));
}
