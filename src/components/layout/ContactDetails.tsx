import { MapPin, UserRound, Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import type { SiteConfig } from "@/types/content";
export function ContactDetails({
  config = siteConfig,
  showPerson = true,
  locale = "de",
}: {
  config?: SiteConfig;
  locale?: Locale;
  showPerson?: boolean;
}) {
  return (
    <div className="contact-details">
      <div>
        <MapPin size={20} aria-hidden="true" />
        <address>
          <strong>{config.name}</strong>
          <br />
          {config.address.street}
          <br />
          {config.address.postalCode} {config.address.city}
          <br />
          {locale === "de"
            ? "Deutschland"
            : locale === "en"
              ? "Germany"
              : "Allemagne"}
        </address>
      </div>
      {showPerson && (
        <div>
          <UserRound size={20} aria-hidden="true" />
          <p>
            <span className="detail-label">
              {locale === "de"
                ? "Ansprechpartner"
                : locale === "en"
                  ? "Contact person"
                  : "Interlocuteur"}
            </span>
            {config.contactName}
          </p>
        </div>
      )}
      {config.phone && (
        <div>
          <Phone size={20} aria-hidden="true" />
          <a href={`tel:${config.phone.replace(/[^+\d]/g, "")}`}>
            {config.phone}
          </a>
        </div>
      )}
      {config.email && (
        <div>
          <Mail size={20} aria-hidden="true" />
          <a href={`mailto:${config.email}`}>{config.email}</a>
        </div>
      )}
      {config.openingHours && (
        <div>
          <p>
            <span className="detail-label">
              {locale === "de"
                ? "Öffnungszeiten"
                : locale === "en"
                  ? "Opening hours"
                  : "Horaires"}
            </span>
            {config.openingHours.join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}
