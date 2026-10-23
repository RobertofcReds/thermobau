import { defineRouting } from "next-intl/routing";
export type Locale = "de" | "en" | "fr";
export const locales: Locale[] = ["de", "en", "fr"];
const pages = {
  home: { de: "/", en: "/en", fr: "/fr" },
  services: { de: "/leistungen", en: "/en/services", fr: "/fr/prestations" },
  about: { de: "/ueber-uns", en: "/en/about", fr: "/fr/a-propos" },
  gallery: { de: "/referenzen", en: "/en/gallery", fr: "/fr/galerie" },
  contact: { de: "/kontakt", en: "/en/contact", fr: "/fr/contact" },
  legal: {
    de: "/impressum",
    en: "/en/legal-notice",
    fr: "/fr/mentions-legales",
  },
  privacy: { de: "/datenschutz", en: "/en/privacy", fr: "/fr/confidentialite" },
  terms: {
    de: "/nutzungsbedingungen",
    en: "/en/terms-of-use",
    fr: "/fr/conditions-utilisation",
  },
} as const;
export const pageKeys = Object.keys(pages) as (keyof typeof pages)[];
export type PageKey = keyof typeof pages;
export const servicePaths: Record<string, Record<Locale, string>> = {
  fassaden: { de: "fassaden", en: "facade-work", fr: "travaux-de-facade" },
  trockenbau: { de: "trockenbau", en: "drywall", fr: "cloisons-seches" },
  putzarbeiten: { de: "putzarbeiten", en: "plastering", fr: "enduits" },
  malerarbeiten: { de: "malerarbeiten", en: "painting", fr: "peinture" },
  fliesenarbeiten: { de: "fliesenarbeiten", en: "tiling", fr: "carrelage" },
  renovierungen: { de: "renovierungen", en: "renovations", fr: "renovations" },
};
export function pagePath(key: PageKey, locale: Locale) {
  return pages[key][locale];
}
export const pathnames: Record<
  string,
  Record<Locale, string>
> = Object.fromEntries([
  ...Object.values(pages).map(({ de, en, fr }) => [
    de,
    { de, en: en.slice(3) || "/", fr: fr.slice(3) || "/" },
  ]),
  ...Object.entries(servicePaths).map(([slug, paths]) => [
    `/leistungen/${slug}`,
    {
      de: `/leistungen/${paths.de}`,
      en: `/services/${paths.en}`,
      fr: `/prestations/${paths.fr}`,
    },
  ]),
]);
export const routing = defineRouting({
  locales: ["de", "en", "fr"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
  pathnames,
});
export function resolvePage(internalPath: string): PageKey | undefined {
  return pageKeys.find((key) => pages[key].de === internalPath);
}
export function servicePath(slug: string, locale: Locale) {
  const translated = servicePaths[slug]?.[locale] ?? slug;
  if (locale === "de") return `/leistungen/${translated}`;
  return locale === "en"
    ? `/en/services/${translated}`
    : `/fr/prestations/${translated}`;
}
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  return "de";
}
export function equivalents(pathname: string): Record<Locale, string> {
  for (const key of Object.keys(pages) as PageKey[]) {
    if (Object.values(pages[key]).includes(pathname as never))
      return { ...pages[key] };
  }
  for (const [slug, paths] of Object.entries(servicePaths)) {
    const candidates = {
      de: `/leistungen/${paths.de}`,
      en: `/en/services/${paths.en}`,
      fr: `/fr/prestations/${paths.fr}`,
    };
    if (Object.values(candidates).includes(pathname))
      return {
        de: servicePath(slug, "de"),
        en: servicePath(slug, "en"),
        fr: servicePath(slug, "fr"),
      };
  }
  return { de: "/", en: "/en", fr: "/fr" };
}
export const localizedNavigation = {
  de: [
    ["Startseite", "/"],
    ["Leistungen", "/leistungen"],
    ["Über uns", "/ueber-uns"],
    ["Einblicke", "/referenzen"],
    ["Kontakt", "/kontakt"],
  ],
  en: [
    ["Home", "/en"],
    ["Services", "/en/services"],
    ["About", "/en/about"],
    ["Gallery", "/en/gallery"],
    ["Contact", "/en/contact"],
  ],
  fr: [
    ["Accueil", "/fr"],
    ["Prestations", "/fr/prestations"],
    ["À propos", "/fr/a-propos"],
    ["Galerie", "/fr/galerie"],
    ["Contact", "/fr/contact"],
  ],
} satisfies Record<Locale, [string, string][]>;
