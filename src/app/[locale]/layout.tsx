import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageMotion } from "@/components/layout/PageMotion";
import { BackToTop } from "@/components/layout/BackToTop";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { siteConfig } from "@/config/site";
import { publicationReady, getSiteUrl } from "@/lib/publication";
import { contactChannels } from "@/lib/company-contact";
import "../globals.css";
import "../editorial.css";
import "../page-motion.css";
import "../hero.css";
import "../footer.css";
import "../motion.css";
import "../header.css";
import "../palette.css";
import "../chat.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PrivacyPreferences } from "@/components/privacy/PrivacyPreferences";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/i18n/content";

const manrope = localFont({
  src: "../../fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getContent(hasLocale(routing.locales, locale) ? locale : "de");
  return {
    title: {
      default: copy.home.title + " | Thermobau V&V",
      template: "%s | Thermobau V&V",
    },
    description: copy.home.description,
    robots: { index: publicationReady(), follow: publicationReady() },
    ...(publicationReady() && getSiteUrl()
      ? { metadataBase: new URL(getSiteUrl()!) }
      : {}),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requested } = await params;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale = requested as Locale;
  setRequestLocale(locale);
  const channels = contactChannels(siteConfig);
  const business = publicationReady()
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: getSiteUrl(),
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          postalCode: siteConfig.address.postalCode,
          addressLocality: siteConfig.address.city,
          addressCountry: siteConfig.address.country,
        },
        ...(channels.phone ? { telephone: channels.phone.href.slice(4) } : {}),
        ...(channels.email ? { email: channels.email.label } : {}),
      }
    : null;
  return (
    <html lang={locale} className={manrope.variable}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={{}}
          timeZone="Europe/Berlin"
        >
          <a className="skip-link" href="#main-content">
            {locale === "de"
              ? "Zum Inhalt springen"
              : locale === "en"
                ? "Skip to content"
                : "Aller au contenu"}
          </a>
          <SiteHeader locale={locale} />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter locale={locale} />
          <PageMotion />
          <PrivacyPreferences locale={locale} />
          <BackToTop locale={locale} />
          <ChatWidget locale={locale} />
        </NextIntlClientProvider>
        {business && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(business).replace(/</g, "\\u003c"),
            }}
          />
        )}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
