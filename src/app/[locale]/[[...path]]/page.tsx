import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  routing,
  resolvePage,
  pathnames,
  pagePath,
  servicePath,
  type Locale,
} from "@/i18n/routing";
import { getServices } from "@/i18n/services";
import { getContent } from "@/i18n/content";
import { getLegal } from "@/i18n/legal";
import { WebsitePage, ServicePage } from "@/components/sections/EditorialPages";
import { pageMetadata } from "@/lib/seo";
type Params = Promise<{ locale: string; path?: string[] }>;
function resolve(locale: string, path: string[] = []) {
  if (!hasLocale(routing.locales, locale)) notFound();
  const internal = "/" + path.join("/");
  const page = resolvePage(internal);
  const service = getServices(locale).find(
    (s) => internal === `/leistungen/${s.slug}`,
  );
  return { locale: locale as Locale, page, service };
}
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const p = await params;
  const { locale, page, service } = resolve(p.locale, p.path);
  if (!page && !service)
    return {
      title: {
        de: "Seite nicht gefunden",
        en: "Page not found",
        fr: "Page introuvable",
      }[locale],
      description: {
        de: "Die gewünschte Seite ist nicht verfügbar.",
        en: "The requested page is unavailable.",
        fr: "La page demandée n’est pas disponible.",
      }[locale],
      robots: { index: false, follow: false },
    };
  if (service)
    return pageMetadata(
      service.seo.title,
      service.seo.description,
      servicePath(service.slug, locale),
      locale,
    );
  const content =
    page === "legal" || page === "privacy" || page === "terms"
      ? getLegal(locale, page)
      : getContent(locale)[
          page as "home" | "services" | "about" | "gallery" | "contact"
        ];
  return pageMetadata(
    content.title,
    content.description,
    pagePath(page!, locale),
    locale,
  );
}
export default async function Page({ params }: { params: Params }) {
  const p = await params;
  const { locale, page, service } = resolve(p.locale, p.path);
  setRequestLocale(locale);
  if (!page && !service) notFound();
  return service ? (
    <ServicePage locale={locale} service={service} />
  ) : (
    <WebsitePage locale={locale} page={page!} />
  );
}
export function generateStaticParams() {
  return Object.keys(pathnames).map((p) => ({
    path: p === "/" ? [] : p.slice(1).split("/"),
  }));
}
