import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { ConsentMap } from "@/components/maps/ConsentMap";
import type { Locale } from "@/i18n/routing";

export function Location({ locale = "de" }: { locale?: Locale }) {
  const t = {
    de: {
      eye: "Standort",
      title: "So finden Sie uns",
      text: "Ihr Vorhaben beginnt mit einem Gespräch. Weitere Einsatzorte können individuell angefragt werden.",
      link: "Ihr Vorhaben besprechen",
    },
    en: {
      eye: "Location",
      title: "Find us",
      text: "Your project starts with a conversation. Other work locations can be discussed individually.",
      link: "Discuss your project",
    },
    fr: {
      eye: "Localisation",
      title: "Nous trouver",
      text: "Votre projet commence par un échange. D’autres lieux d’intervention peuvent être discutés individuellement.",
      link: "Parler de votre projet",
    },
  }[locale];
  return (
    <section className="section location-section">
      <Container className="location-grid">
        <div>
          <p className="eyebrow">{t.eye}</p>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
          <Link
            href={locale === "de" ? "/kontakt" : `/${locale}/contact`}
            className="text-link"
          >
            {t.link} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="location-stack">
          <div className="location-address">
            <MapPin size={30} aria-hidden="true" />
            <div>
              <span className="eyebrow">Ludwigshafen am Rhein</span>
              <address>
                <strong>{siteConfig.name}</strong>
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                {locale === "de"
                  ? "Deutschland"
                  : locale === "en"
                    ? "Germany"
                    : "Allemagne"}
              </address>
            </div>
          </div>
          <ConsentMap locale={locale} />
        </div>
      </Container>
    </section>
  );
}
