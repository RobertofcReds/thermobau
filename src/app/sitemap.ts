import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getSiteUrl, publicationReady } from "@/lib/publication";
import { servicePath } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!publicationReady() || !siteUrl) return [];

  const groups = [
    ["/", "/en", "/fr"],
    ["/leistungen", "/en/services", "/fr/prestations"],
    ...services.map((service) => [
      servicePath(service.slug, "de"),
      servicePath(service.slug, "en"),
      servicePath(service.slug, "fr"),
    ]),
    ["/ueber-uns", "/en/about", "/fr/a-propos"],
    ["/referenzen", "/en/gallery", "/fr/galerie"],
    ["/kontakt", "/en/contact", "/fr/contact"],
    ["/impressum", "/en/legal-notice", "/fr/mentions-legales"],
    ["/datenschutz", "/en/privacy", "/fr/confidentialite"],
    ["/nutzungsbedingungen", "/en/terms-of-use", "/fr/conditions-utilisation"],
  ];
  return groups.flatMap(([de, en, fr]) => {
    const languages = {
      de: new URL(de, `${siteUrl}/`).toString(),
      en: new URL(en, `${siteUrl}/`).toString(),
      fr: new URL(fr, `${siteUrl}/`).toString(),
    };
    return [de, en, fr].map((path) => ({
      url: new URL(path, `${siteUrl}/`).toString(),
      alternates: { languages },
    }));
  });
}
