import "server-only";
import { siteConfig } from "@/config/site";
import { getContent } from "@/i18n/content";
import { getLegal } from "@/i18n/legal";
import { getServices } from "@/i18n/services";
import {
  localizedNavigation,
  pagePath,
  servicePath,
  type Locale,
} from "@/i18n/routing";
import { normalizeSearchText, type SearchEntry } from "./site-search";

function collectText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(collectText).join(" ");
  if (value && typeof value === "object")
    return Object.values(value).map(collectText).join(" ");
  return "";
}

function keywords(...values: unknown[]) {
  const text = collectText(values);
  const transliterated = text
    .replace(/ä/gi, "ae")
    .replace(/ö/gi, "oe")
    .replace(/ü/gi, "ue");
  // Keep each searchable word once instead of serializing full page content.
  return [
    ...new Set(normalizeSearchText(`${text} ${transliterated}`).split(" ")),
  ]
    .filter(Boolean)
    .join(" ");
}

/** Build on the server so translated source content never enters the client bundle. */
export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const content = getContent(locale);
  const category = {
    de: { page: "Seite", service: "Leistung", legal: "Rechtliches" },
    en: { page: "Page", service: "Service", legal: "Legal information" },
    fr: { page: "Page", service: "Prestation", legal: "Informations légales" },
  }[locale];
  const contactLabels = {
    de: ["Telefon", "E-Mail", "WhatsApp", "Adresse"],
    en: ["Phone", "Email", "WhatsApp", "Address"],
    fr: ["Téléphone", "E-mail", "WhatsApp", "Adresse"],
  }[locale];
  const address = `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}`;
  const contactDescription = [
    siteConfig.phone && `${contactLabels[0]}: ${siteConfig.phone}`,
    siteConfig.email && `${contactLabels[1]}: ${siteConfig.email}`,
    siteConfig.whatsapp && `${contactLabels[2]}: ${siteConfig.whatsapp}`,
    `${contactLabels[3]}: ${address}`,
  ]
    .filter(Boolean)
    .join(" · ");
  const pages = (
    ["home", "services", "about", "gallery", "contact"] as const
  ).map((page): SearchEntry => {
    const data = content[page];
    const href = pagePath(page, locale);
    const title = localizedNavigation[locale].find(
      (item) => item[1] === href,
    )![0];
    return {
      id: page,
      title,
      href,
      description: page === "contact" ? contactDescription : data.description,
      category: category.page,
      keywords: keywords(
        data,
        page === "home" ? [content.process, "FAQ"] : "",
        page === "contact"
          ? [
              contactDescription,
              siteConfig.contactName,
              siteConfig.name,
              siteConfig.phone?.replace(/\D/g, ""),
              siteConfig.whatsapp?.replace(/\D/g, ""),
              content.process,
            ]
          : "",
      ),
    };
  });
  const services = getServices(locale).map((service): SearchEntry => ({
    id: `service-${service.slug}`,
    title: service.title,
    description: service.teaser,
    href: servicePath(service.slug, locale),
    category: category.service,
    keywords: keywords(
      service.description,
      service.highlights,
      service.details,
      service.faq,
      service.seo,
      "FAQ",
    ),
  }));
  const legal = (["legal", "privacy", "terms"] as const).map(
    (page): SearchEntry => {
      const data = getLegal(locale, page);
      return {
        id: page,
        title: data.title,
        description: data.description,
        href: pagePath(page, locale),
        category: category.legal,
        keywords: keywords(data),
      };
    },
  );
  return [...pages, ...services, ...legal];
}
