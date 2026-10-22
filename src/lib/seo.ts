import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getSiteUrl, publicationReady } from "@/lib/publication";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const ready = publicationReady();
  const siteUrl = ready ? getSiteUrl() : null;
  const canonical = siteUrl
    ? new URL(path, `${siteUrl}/`).toString()
    : undefined;

  return {
    title,
    description,
    robots: { index: ready, follow: ready },
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "website",
      ...(canonical ? { url: canonical } : {}),
      ...(siteUrl
        ? {
            images: [
              {
                url: new URL(siteConfig.logoPath, `${siteUrl}/`).toString(),
                alt: "Logo von Thermobau V&V",
              },
            ],
          }
        : {}),
    },
  };
}
