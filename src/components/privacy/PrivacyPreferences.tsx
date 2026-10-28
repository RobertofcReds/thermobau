"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { pagePath, type Locale } from "@/i18n/routing";
import { CONSENT_KEY, CONSENT_TTL, parseConsent } from "@/lib/privacy-consent";
import { verifiedMapLocation } from "@/config/maps";
export const PRIVACY_EVENT = "thermobau-privacy-change";
let memory: string | null = null;
let storageUnavailable = false;
const copy = {
  de: {
    title: "Ihre Datenschutzeinstellungen",
    text: "Wir verwenden notwendige Funktionen für diese Website. Die optionale Google-Maps-Karte wird nur mit Ihrer Zustimmung geladen. Dabei werden Ihre IP-Adresse und Browserdaten an Google übertragen.",
    reject: "Alle ablehnen",
    settings: "Einstellungen",
    accept: "Alle akzeptieren",
    maps: "Externe Karten",
    necessary: "Notwendige Dienste",
    always: "Immer aktiv",
    save: "Auswahl speichern",
    privacy: "Datenschutzerklärung",
    close: "Schließen",
    unavailable:
      "Der Kartenpunkt ist noch nicht bestätigt. Aktuell wird keine externe Karte eingebunden.",
    detail:
      "Google Maps (Karte und Satellit): Ihre Auswahl gilt höchstens 180 Tage und ist jederzeit hier widerrufbar. Ohne Zustimmung bleibt die Karte deaktiviert.",
  },
  en: {
    title: "Privacy settings",
    text: "We use necessary functions to operate this website. The optional Google Maps embed loads only with your consent, transmitting your IP address and browser data to Google.",
    reject: "Reject optional",
    settings: "Settings",
    accept: "Accept optional",
    maps: "External maps",
    necessary: "Necessary services",
    always: "Always active",
    save: "Save selection",
    privacy: "Privacy notice",
    close: "Close",
    unavailable:
      "The map location has not yet been confirmed. No external map is currently embedded.",
    detail:
      "Google Maps (map and satellite): your choice lasts no more than 180 days and can be withdrawn here at any time. Without consent, the map stays disabled.",
  },
  fr: {
    title: "Paramètres de confidentialité",
    text: "Nous utilisons les fonctions nécessaires à ce site. La carte facultative Google Maps se charge uniquement avec votre accord et transmet alors votre adresse IP et des données du navigateur à Google.",
    reject: "Tout refuser",
    settings: "Paramètres",
    accept: "Tout accepter",
    maps: "Cartes externes",
    necessary: "Services nécessaires",
    always: "Toujours actifs",
    save: "Enregistrer",
    privacy: "Politique de confidentialité",
    close: "Fermer",
    unavailable:
      "Le point géographique n’est pas encore confirmé. Aucune carte externe n’est actuellement intégrée.",
    detail:
      "Google Maps (plan et satellite) : votre choix dure au maximum 180 jours et peut être retiré ici à tout moment. Sans accord, la carte reste désactivée.",
  },
};
function rawChoice() {
  if (typeof window === "undefined") return null;
  try {
    if (!storageUnavailable) return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    storageUnavailable = true;
  }
  return memory;
}
function purgeExpiredChoice() {
  const raw = rawChoice();
  if (raw !== null && !parseConsent(raw)) {
    memory = null;
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch {
      storageUnavailable = true;
    }
  }
}
export function getMapConsent() {
  return parseConsent(rawChoice())?.maps === true;
}
function snapshot() {
  const choice = parseConsent(rawChoice());
  return choice ? (choice.maps ? "accepted" : "rejected") : null;
}
function subscribe(callback: () => void) {
  let expiryTimer: number | undefined;
  let stopped = false;

  function scheduleExpiry() {
    window.clearTimeout(expiryTimer);
    if (stopped) return;
    const now = Date.now();
    const choice = parseConsent(rawChoice(), now);
    if (!choice) return;
    // Browser timers use signed 32-bit delays; rearm long-lived choices safely.
    expiryTimer = window.setTimeout(
      recheck,
      Math.min(choice.expires - now, 2_147_483_647),
    );
  }

  function recheck() {
    if (stopped) return;
    purgeExpiredChoice();
    callback();
    scheduleExpiry();
  }

  function onStorage(event: StorageEvent) {
    if (event.key === CONSENT_KEY || event.key === null) recheck();
  }

  function onVisibility() {
    if (document.visibilityState === "visible") recheck();
  }

  window.addEventListener(PRIVACY_EVENT, recheck);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", recheck);
  document.addEventListener("visibilitychange", onVisibility);
  // The deadline timer handles expiry; polling also covers clock adjustments.
  const timer = window.setInterval(recheck, 60_000);
  purgeExpiredChoice();
  scheduleExpiry();
  return () => {
    stopped = true;
    window.removeEventListener(PRIVACY_EVENT, recheck);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", recheck);
    document.removeEventListener("visibilitychange", onVisibility);
    window.clearInterval(timer);
    window.clearTimeout(expiryTimer);
  };
}
export function useMapConsent() {
  return useSyncExternalStore(subscribe, getMapConsent, () => false);
}
export function setMapConsent(maps: boolean) {
  memory = JSON.stringify({
    version: 4,
    maps,
    expires: Date.now() + CONSENT_TTL,
  });
  try {
    window.localStorage.setItem(CONSENT_KEY, memory);
    storageUnavailable = false;
  } catch {
    storageUnavailable = true;
  }
  window.dispatchEvent(new Event(PRIVACY_EVENT));
}
export function PrivacyPreferences({ locale }: { locale: Locale }) {
  const stored = useSyncExternalStore(subscribe, snapshot, () => "server");
  const [forcedOpen, setForcedOpen] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [maps, setMaps] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const trigger = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLElement | null>(null);
  const t = copy[locale];
  const visible =
    stored !== "server" &&
    (forcedOpen || (stored === null && verifiedMapLocation !== null));
  useEffect(() => {
    if (!visible || !panel.current) return;
    // Reserve scroll space and keep floating controls above the actual panel.
    function measure() {
      const height = panel.current?.getBoundingClientRect().height ?? 0;
      setPanelHeight(height);
      document.documentElement.style.setProperty(
        "--privacy-panel-height",
        `${height}px`,
      );
    }
    const observer = new ResizeObserver(measure);
    observer.observe(panel.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--privacy-panel-height");
    };
  }, [visible]);
  useEffect(() => {
    const reopen = () => {
      trigger.current = document.activeElement as HTMLElement;
      setMaps(getMapConsent());
      setDetailed(true);
      setForcedOpen(true);
    };
    window.addEventListener("thermobau-open-privacy", reopen);
    return () => window.removeEventListener("thermobau-open-privacy", reopen);
  }, []);
  useEffect(() => {
    // Focus only after React has mounted the reopened panel.
    if (forcedOpen) panel.current?.focus();
  }, [forcedOpen]);
  useEffect(() => {
    // Only another tab's persisted choice replaces the draft selection. Focus,
    // polling and editing this tab's checkbox must leave that draft untouched.
    const syncFromOtherTab = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null)
        setMaps(getMapConsent());
    };
    window.addEventListener("storage", syncFromOtherTab);
    return () => window.removeEventListener("storage", syncFromOtherTab);
  }, []);
  function close() {
    setForcedOpen(false);
    trigger.current?.focus();
  }
  function choose(choice: boolean) {
    setMapConsent(choice);
    close();
  }
  if (!visible) return null;
  return (
    <>
      <section
        ref={panel}
        tabIndex={-1}
        className="privacy-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="privacy-title"
        onKeyDown={(e) => {
          if (e.key === "Escape" && forcedOpen) close();
        }}
      >
        <div className="privacy-heading">
          <h2 id="privacy-title">{t.title}</h2>
          {forcedOpen && (
            <button onClick={close} aria-label={t.close}>
              ×
            </button>
          )}
        </div>
        <p>{t.text}</p>
        <p>
          <Link href={pagePath("privacy", locale)}>{t.privacy}</Link>
        </p>
        {detailed && (
          <div className="privacy-options">
            <div>
              <span>{t.necessary}</span>
              <strong>{t.always}</strong>
            </div>
            <label>
              <span>{t.maps}</span>
              <input
                type="checkbox"
                checked={maps}
                onChange={(e) => setMaps(e.target.checked)}
              />
            </label>
            <p>{t.detail}</p>
            {!verifiedMapLocation && <p>{t.unavailable}</p>}
          </div>
        )}
        <div className="privacy-actions">
          <button onClick={() => choose(false)}>{t.reject}</button>
          {!detailed ? (
            <>
              <button onClick={() => setDetailed(true)}>{t.settings}</button>
              <button onClick={() => choose(true)}>{t.accept}</button>
            </>
          ) : (
            <button onClick={() => choose(maps)}>{t.save}</button>
          )}
        </div>
      </section>
      <div
        aria-hidden="true"
        style={{
          height: `calc(${panelHeight + 32}px + env(safe-area-inset-bottom))`,
        }}
      />
    </>
  );
}
export function PrivacySettingsButton({ locale }: { locale: Locale }) {
  return (
    <button
      className="footer-privacy-button"
      onClick={() => window.dispatchEvent(new Event("thermobau-open-privacy"))}
    >
      {locale === "de" ? "Datenschutzeinstellungen" : copy[locale].title}
    </button>
  );
}
