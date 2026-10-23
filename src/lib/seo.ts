import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getSiteUrl, publicationReady } from "@/lib/publication";
import { equivalents, type Locale } from "@/i18n/routing";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  locale: Locale = "de",
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
    ...(canonical
      ? {
          alternates: {
            canonical,
            languages: Object.fromEntries([
              ...Object.entries(equivalents(path)).map(([lang, value]) => [
                lang,
                new URL(value, `${siteUrl}/`).toString(),
              ]),
              [
                "x-default",
                new URL(equivalents(path).de, `${siteUrl}/`).toString(),
              ],
            ]),
          },
        }
      : {}),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: { de: "de_DE", en: "en_GB", fr: "fr_FR" }[locale],
      alternateLocale: ["de", "en", "fr"]
        .filter((x) => x !== locale)
        .map((x) => ({ de: "de_DE", en: "en_GB", fr: "fr_FR" })[x]!),
      type: "website",
      ...(canonical ? { url: canonical } : {}),
      ...(siteUrl
        ? {
            images: [
              {
                url: new URL(siteConfig.logoPath, `${siteUrl}/`).toString(),
                alt: "Thermobau V&V",
              },
            ],
          }
        : {}),
    },
  };
}
