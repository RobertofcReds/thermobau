import { MapPin, UserRound, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import type { SiteConfig } from "@/types/content";
import { contactChannels } from "@/lib/company-contact";

const contactCopy = {
  de: { phone: "Telefon", email: "E-Mail", pending: "wird ergänzt" },
  en: { phone: "Phone", email: "Email", pending: "to be added" },
  fr: { phone: "Téléphone", email: "E-mail", pending: "à renseigner" },
};

export function ContactDetails({
  config = siteConfig,
  showPerson = true,
  locale = "de",
  showPending = false,
}: {
  config?: SiteConfig;
  locale?: Locale;
  showPerson?: boolean;
  showPending?: boolean;
}) {
  const channels = contactChannels(config);
  const t = contactCopy[locale];
  const contacts = [
    { key: "phone" as const, label: t.phone, icon: Phone },
    { key: "email" as const, label: t.email, icon: Mail },
    { key: "whatsapp" as const, label: "WhatsApp", icon: WhatsAppIcon },
  ];
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
      {contacts.map(({ key, label, icon: Icon }) => {
        const channel = channels[key];
        if (!channel && !showPending) return null;
        return (
          <div key={key} className={channel ? undefined : "contact-pending"}>
            <Icon size={20} aria-hidden="true" />
            {channel ? (
              <a href={channel.href}>
                {key === "whatsapp" ? (
                  <>
                    <span className="detail-label">WhatsApp</span>
                    {config.whatsapp}
                  </>
                ) : (
                  channel.label
                )}
              </a>
            ) : (
              <span>
                {label} – {t.pending}
              </span>
            )}
          </div>
        );
      })}
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
