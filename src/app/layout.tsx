import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/config/site";
import { publicationReady, getSiteUrl } from "@/lib/publication";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Thermobau V&V – Renovierung in Ludwigshafen",
    template: "%s | Thermobau V&V",
  },
  description:
    "Fassaden, Trockenbau, Putz, Malerarbeiten, Fliesen und Renovierungen: Entdecken Sie die Tätigkeitsbereiche von Thermobau V&V in Ludwigshafen.",
  robots: { index: publicationReady(), follow: publicationReady() },
  ...(publicationReady() && getSiteUrl()
    ? { metadataBase: new URL(getSiteUrl()!) }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
        ...(siteConfig.email ? { email: siteConfig.email } : {}),
      }
    : null;
  return (
    <html lang="de" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
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
