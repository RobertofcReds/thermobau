import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  contactChannels,
  internationalPhone,
  socialProfileUrl,
} from "@/lib/company-contact";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/config/site";

// This suite renders server-side contact configuration without a Next router.
// The route-aware map/consent boundary is exercised by the browser suites.
vi.mock("@/components/layout/FooterLocation", () => ({
  FooterLocation: () => null,
}));

const originalDomain = siteConfig.domain;
const originalSocial = siteConfig.social;
const originalWhatsapp = siteConfig.whatsapp;
afterEach(() => {
  siteConfig.domain = originalDomain;
  siteConfig.social = originalSocial;
  siteConfig.whatsapp = originalWhatsapp;
  vi.unstubAllEnvs();
});

describe("Configuration des canaux de contact", () => {
  it.each([
    ["+49 621 1234567", "+496211234567"],
    ["0049 (621) 123-4567", "+496211234567"],
    ["+49 (0)621 1234567", "+496211234567"],
  ])("normalise le numéro international %s", (value, expected) => {
    expect(internationalPhone(value)).toBe(expected);
  });

  it.each([
    null,
    "",
    "0621 1234567",
    "+0 12345678",
    "+49 12",
    "+491234567890123456",
    "+49 621 1234567 ext 2",
    "javascript:12345678",
    "+49 621 1234567?body=test",
  ])("ignore les numéros incomplets ou invalides %s", (value) => {
    expect(internationalPhone(value)).toBeNull();
  });

  it("produit tel, mailto et wa.me sans importer de widget", () => {
    expect(
      contactChannels({
        phone: "+49 621 1234567",
        email: " person@example.invalid ",
        whatsapp: "0049 621 1234567",
      }),
    ).toEqual({
      phone: { href: "tel:+496211234567", label: "+49 621 1234567" },
      email: {
        href: "mailto:person@example.invalid",
        label: "person@example.invalid",
      },
      whatsapp: { href: "https://wa.me/496211234567", label: "WhatsApp" },
    });
  });

  it("encode les caractères réservés dans les adresses mailto", () => {
    expect(
      contactChannels({
        phone: null,
        email: "person+project@example.invalid",
        whatsapp: null,
      }).email,
    ).toEqual({
      href: "mailto:person%2Bproject@example.invalid",
      label: "person+project@example.invalid",
    });
  });

  it.each([
    "",
    "not an email",
    "person@example.invalid?subject=test",
    "person@example.invalid\r\nBcc:someone@example.invalid",
  ])("écarte les e-mails invalides %s", (email) => {
    expect(
      contactChannels({ phone: null, email, whatsapp: null }).email,
    ).toBeNull();
  });

  it("valide des profils officiels HTTPS sans confondre un autre domaine", () => {
    expect(
      socialProfileUrl(
        "instagram",
        "https://www.instagram.com/example_profile/",
      ),
    ).toBe("https://www.instagram.com/example_profile/");
    expect(
      socialProfileUrl(
        "facebook",
        "https://www.facebook.com/profile.php?id=123456789",
      ),
    ).toBe("https://www.facebook.com/profile.php?id=123456789");
    expect(
      socialProfileUrl(
        "linkedin",
        "https://www.linkedin.com/company/example-company/",
      ),
    ).not.toBeNull();
    expect(
      socialProfileUrl("youtube", "https://www.youtube.com/@example-channel"),
    ).not.toBeNull();
  });

  it.each([
    null,
    "#",
    "javascript:alert(1)",
    "http://instagram.com/profile/",
    "https://instagram.com.evil.example/profile/",
    "https://instagram.com@evil.example/profile/",
    "https://evil.example@instagram.com/profile/",
    "https://instagram.com:8443/profile/",
    "https://instagram.com/",
    "https://instagram.com/profile/?redirect=elsewhere",
    "https://instagram.com/profile/#test",
    "https://instagram.com/login/",
  ])("refuse les URL sociales non adaptées %s", (url) => {
    expect(socialProfileUrl("instagram", url)).toBeNull();
  });

  it.each([
    ["de", "Telefon – wird ergänzt", "E-Mail – wird ergänzt"],
    ["en", "Phone – to be added", "Email – to be added"],
    ["fr", "Téléphone – à renseigner", "E-mail – à renseigner"],
  ] as const)(
    "affiche les coordonnées provisoires %s uniquement en texte",
    (locale, phone, email) => {
      const html = renderToStaticMarkup(
        createElement(ContactDetails, { locale, showPending: true }),
      );
      expect(html).toContain(phone);
      expect(html).toContain(email);
      expect(html).not.toContain("href=");
      expect(html).toContain("WhatsApp");
      const hidden = renderToStaticMarkup(
        createElement(ContactDetails, { locale }),
      );
      expect(hidden).not.toContain(phone);
      expect(hidden).not.toContain("WhatsApp");
    },
  );
});

describe("Footer aperçu et publication", () => {
  it("affiche seulement les profils valides réellement configurés", () => {
    siteConfig.social = {
      facebook: "https://www.facebook.com/example-profile/",
      instagram: "https://instagram.com.evil.example/example-profile/",
      linkedin: null,
      youtube: null,
    };
    siteConfig.whatsapp = "+49 621 1234567";
    const html = renderToStaticMarkup(
      createElement(SiteFooter, { locale: "en" }),
    );
    expect(html).toContain('href="https://www.facebook.com/example-profile/"');
    expect(html).toContain('href="https://wa.me/496211234567"');
    expect(html).toContain("Follow us");
    expect(html).not.toContain("evil.example");
    expect(html).not.toContain("Official profiles will be added.");
    expect(html).not.toContain("<iframe");
  });

  it("rend les canaux manquants inactifs et conserve les liens locaux", () => {
    vi.stubEnv("SITE_PUBLICATION_READY", "false");
    const html = renderToStaticMarkup(
      createElement(SiteFooter, { locale: "de" }),
    );
    expect(html).toContain("Telefon – wird ergänzt");
    expect(html).toContain("Offizielle Profile werden ergänzt.");
    expect(html).toContain('href="/leistungen/trockenbau"');
    expect(html).toContain("Datenschutzerklärung");
    expect(html).toContain("Nutzungsbedingungen");
    expect(html).toContain("Datenschutzeinstellungen");
    expect(html).not.toContain('href="#"');
    expect(html).not.toContain('href="tel:');
    expect(html).not.toContain('href="mailto:');
    expect(html).not.toContain('href="https://wa.me/');
  });

  it("masque les coordonnées et profils non configurés en publication", () => {
    siteConfig.domain = "https://publication.example.org";
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SITE_PUBLICATION_READY", "true");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://publication.example.org");
    const html = renderToStaticMarkup(
      createElement(SiteFooter, { locale: "de" }),
    );
    expect(html).not.toContain("wird ergänzt");
    expect(html).not.toContain("Folgen Sie uns");
    expect(html).toContain("Vasil Velikov Dimitrov");
    expect(html).toContain("Blücherstr. 59");
  });
});
