import Link from "next/link";
import { getServices } from "@/i18n/services";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ContactDetails } from "./ContactDetails";
import {
  localizedNavigation,
  pagePath,
  servicePath,
  type Locale,
} from "@/i18n/routing";
import { PrivacySettingsButton } from "@/components/privacy/PrivacyPreferences";
export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo footer locale={locale} />
            <p>
              {locale === "de"
                ? "Renovierung und Innenausbau in Ludwigshafen."
                : locale === "en"
                  ? "Renovation and interior construction in Ludwigshafen."
                  : "Rénovation et aménagement intérieur à Ludwigshafen."}
            </p>
          </div>
          <div>
            <h2>
              {locale === "de"
                ? "Entdecken"
                : locale === "en"
                  ? "Explore"
                  : "Découvrir"}
            </h2>
            <nav
              aria-label={
                locale === "de"
                  ? "Navigation im Fußbereich"
                  : locale === "en"
                    ? "Footer navigation"
                    : "Navigation du pied de page"
              }
            >
              {localizedNavigation[locale].map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>
              {locale === "de"
                ? "Leistungen"
                : locale === "en"
                  ? "Services"
                  : "Prestations"}
            </h2>
            <nav
              aria-label={
                locale === "de"
                  ? "Leistungen im Fußbereich"
                  : locale === "en"
                    ? "Services in footer"
                    : "Prestations du pied de page"
              }
            >
              {getServices(locale).map((service) => (
                <Link
                  key={service.slug}
                  href={servicePath(service.slug, locale)}
                >
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>{locale === "de" ? "Kontakt" : "Contact"}</h2>
            <ContactDetails locale={locale} />
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <div>
            <Link href={pagePath("legal", locale)}>
              {locale === "de"
                ? "Impressum"
                : locale === "en"
                  ? "Legal notice"
                  : "Mentions légales"}
            </Link>
            <Link href={pagePath("privacy", locale)}>
              {locale === "de"
                ? "Datenschutz"
                : locale === "en"
                  ? "Privacy"
                  : "Confidentialité"}
            </Link>
            <Link href={pagePath("terms", locale)}>
              {locale === "de"
                ? "Nutzung"
                : locale === "en"
                  ? "Terms of use"
                  : "Conditions d’utilisation"}
            </Link>
            <PrivacySettingsButton locale={locale} />
          </div>
          <span>
            {locale === "de"
              ? "Räume neu denken."
              : locale === "en"
                ? "Rethink your space."
                : "Repenser vos espaces."}
          </span>
        </div>
      </Container>
    </footer>
  );
}
