"use client";
import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  setMapConsent,
  useMapConsent,
} from "@/components/privacy/PrivacyPreferences";
import { pagePath, type Locale } from "@/i18n/routing";
import { getMapEmbedUrl, type MapView } from "@/config/maps";
import { siteConfig } from "@/config/site";
const address = `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}, Deutschland`;
const text = {
  de: {
    notice:
      "Mit einem Klick stimmen Sie zu, Google Maps hier zu laden. Dabei werden Ihre IP-Adresse und Browserdaten an Google übertragen. Widerruf jederzeit über die Datenschutzeinstellungen.",
    views: "Kartenansicht",
    roadmap: "Karte",
    satellite: "Satellit",
    load: "Karte hier anzeigen",
    directions: "Route planen auf Google Maps",
    privacy: "Datenschutzerklärung",
    title: "Karte: Thermobau V&V in Ludwigshafen",
  },
  en: {
    notice:
      "By clicking, you agree to load Google Maps here. Your IP address and browser data are transmitted to Google. Withdraw at any time in Privacy settings.",
    views: "Map view",
    roadmap: "Map",
    satellite: "Satellite",
    load: "Show map here",
    directions: "Get directions on Google Maps",
    privacy: "Privacy notice",
    title: "Map: Thermobau V&V in Ludwigshafen",
  },
  fr: {
    notice:
      "En cliquant, vous acceptez de charger Google Maps ici. Votre adresse IP et des données du navigateur sont transmises à Google. Vous pouvez retirer cet accord dans les paramètres de confidentialité.",
    views: "Affichage de la carte",
    roadmap: "Plan",
    satellite: "Satellite",
    load: "Afficher la carte ici",
    directions: "Itinéraire sur Google Maps",
    privacy: "Politique de confidentialité",
    title: "Carte : Thermobau V&V à Ludwigshafen",
  },
};
export function ConsentMap({ locale = "de" }: { locale?: Locale }) {
  const consent = useMapConsent();
  const [view, setView] = useState<MapView>("roadmap");
  const mapEmbedUrl = getMapEmbedUrl(view, locale);
  const t = text[locale];
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  return (
    <div className="map-shell">
      {mapEmbedUrl && (
        <div className="map-view-switcher" role="group" aria-label={t.views}>
          {(["roadmap", "satellite"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
            >
              {t[mode]}
            </button>
          ))}
        </div>
      )}
      {consent && mapEmbedUrl ? (
        <iframe
          title={`${t.title} — ${t[view]}`}
          src={mapEmbedUrl}
          loading="lazy"
          width="640"
          height="440"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="map-placeholder">
          <MapPin size={34} aria-hidden="true" />
          <strong>Thermobau V&amp;V</strong>
          <span>
            {siteConfig.address.street} · {siteConfig.address.postalCode}{" "}
            {siteConfig.address.city}
          </span>
          <p>
            {mapEmbedUrl
              ? t.notice
              : locale === "de"
                ? "Die Adresse steht Ihnen als Routenlink zur Verfügung. Eine eingebettete Karte folgt erst nach Bestätigung des Standorts."
                : locale === "en"
                  ? "Use the directions link for this address. An embedded map will be available only once the location has been verified."
                  : "Le lien d’itinéraire est disponible pour cette adresse. Une carte intégrée sera proposée après vérification du point géographique."}
          </p>
          {mapEmbedUrl && (
            <>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setMapConsent(true)}
              >
                {t.load}
              </button>
              <Link className="map-privacy" href={pagePath("privacy", locale)}>
                {t.privacy}
              </Link>
            </>
          )}
        </div>
      )}
      <a className="text-link map-directions" href={directions}>
        {t.directions}
        <Navigation size={17} aria-hidden="true" />
      </a>
    </div>
  );
}
