import { MapPin, UserRound, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { SiteConfig } from "@/types/content";
export function ContactDetails({
  config = siteConfig,
  showPerson = true,
}: {
  config?: SiteConfig;
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
          Deutschland
        </address>
      </div>
      {showPerson && (
        <div>
          <UserRound size={20} aria-hidden="true" />
          <p>
            <span className="detail-label">Ansprechpartner</span>
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
            <span className="detail-label">Öffnungszeiten</span>
            {config.openingHours.join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}
