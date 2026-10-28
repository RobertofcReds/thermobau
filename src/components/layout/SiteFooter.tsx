import Link from "next/link";
import { getServices } from "@/i18n/services";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ContactDetails } from "./ContactDetails";
import { FooterLocation } from "./FooterLocation";
import {
  localizedNavigation,
  pagePath,
  servicePath,
  type Locale,
} from "@/i18n/routing";
import { PrivacySettingsButton } from "@/components/privacy/PrivacyPreferences";
import { publicationReady } from "@/lib/publication";
import { socialProfileUrl, type SocialPlatform } from "@/lib/company-contact";

const copy = {
  de: {
    description:
      "Fassadenarbeiten, Trockenbau, Putzarbeiten, Malerarbeiten, Fliesen und Renovierungen in Ludwigshafen.",
    navigation: "Schnellzugriff",
    navigationLabel: "Navigation im Fußbereich",
    services: "Leistungen",
    servicesLabel: "Leistungen im Fußbereich",
    contact: "Adresse und Kontakt",
    contactLink: "Kontakt",
    links: "Links & Rechtliches",
    follow: "Folgen Sie uns",
    pendingSocial: "Offizielle Profile werden ergänzt.",
    legal: "Impressum",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
  },
  en: {
    description:
      "Facade work, drywall, plastering, painting, tiling and renovations in Ludwigshafen.",
    navigation: "Quick links",
    navigationLabel: "Footer navigation",
    services: "Services",
    servicesLabel: "Services in footer",
    contact: "Address and contact",
    contactLink: "Contact",
    links: "Links & legal",
    follow: "Follow us",
    pendingSocial: "Official profiles will be added.",
    legal: "Legal notice",
    privacy: "Privacy policy",
    terms: "Terms of use",
  },
  fr: {
    description:
      "Façades, cloisons sèches, enduits, peinture, carrelage et rénovation à Ludwigshafen.",
    navigation: "Accès rapide",
    navigationLabel: "Navigation du pied de page",
    services: "Prestations",
    servicesLabel: "Prestations du pied de page",
    contact: "Adresse et contact",
    contactLink: "Contact",
    links: "Liens & informations légales",
    follow: "Suivez-nous",
    pendingSocial: "Les profils officiels seront ajoutés.",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions d’utilisation",
  },
};

const socialNames: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {platform === "facebook" && (
        <path d="M14 21V12h3l.5-4H14V6.5c0-1.1.5-1.5 1.5-1.5H18V1.5A21 21 0 0 0 15 1c-3.5 0-5 2-5 5v2H7v4h3v9" />
      )}
      {platform === "instagram" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
        </>
      )}
      {platform === "linkedin" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7.5 10v7M11.5 17v-7m0 3c0-4 5-4 5 0v4" />
          <circle cx="7.5" cy="7" r=".8" fill="currentColor" stroke="none" />
        </>
      )}
      {platform === "youtube" && (
        <>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const preview = !publicationReady();
  const socialLinks = (Object.keys(socialNames) as SocialPlatform[]).flatMap(
    (platform) => {
      const href = socialProfileUrl(platform, siteConfig.social[platform]);
      return href ? [{ platform, href }] : [];
    },
  );
  return (
    <footer className="site-footer footer-premium">
      <div className="footer-brand-bar">
        <Container className="footer-brand">
          <Logo footer locale={locale} />
          <p>{t.description}</p>
          {(socialLinks.length > 0 || preview) && (
            <div className="footer-social">
              {socialLinks.length > 0 ? (
                <ul aria-label={t.follow}>
                  {socialLinks.map(({ platform, href }) => (
                    <li key={platform}>
                      <a
                        href={href}
                        aria-label={`${socialNames[platform]} — ${siteConfig.name}`}
                      >
                        <SocialIcon platform={platform} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="footer-social-pending">
                  <span>{t.follow}</span>
                  <p>{t.pendingSocial}</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
      <Container>
        <div className="footer-grid">
          <div className="footer-contact">
            <h2>{t.contact}</h2>
            <ContactDetails locale={locale} showPending={preview} />
          </div>
          <div className="footer-navigation">
            <h2>{t.navigation}</h2>
            <nav aria-label={t.navigationLabel}>
              {localizedNavigation[locale].map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-services">
            <h2>{t.services}</h2>
            <nav aria-label={t.servicesLabel}>
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
          <div className="footer-legal">
            <h2>{t.links}</h2>
            <nav aria-label={t.links}>
              <Link href={pagePath("contact", locale)}>{t.contactLink}</Link>
              <Link href={pagePath("legal", locale)}>{t.legal}</Link>
              <Link href={pagePath("privacy", locale)}>{t.privacy}</Link>
              <Link href={pagePath("terms", locale)}>{t.terms}</Link>
              <PrivacySettingsButton locale={locale} />
            </nav>
          </div>
        </div>
      </Container>
      <FooterLocation locale={locale} />
      <div className="footer-copyright">
        <Container className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
        </Container>
      </div>
    </footer>
  );
}
