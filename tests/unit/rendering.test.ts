import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { Gallery } from "@/components/sections/Gallery";
import { siteConfig } from "@/config/site";
import type { GalleryItem, SiteConfig } from "@/types/content";

const GalleryComponent: ComponentType<
  NonNullable<Parameters<typeof Gallery>[0]>
> = Gallery;

// Données fictives réservées aux tests de rendu, jamais à la configuration publique.
const contactFixture: SiteConfig = {
  ...siteConfig,
  contactName: "Kontaktperson im Test",
  address: {
    street: "Teststraße 42",
    postalCode: "00000",
    city: "Teststadt",
    country: "DE",
  },
  phone: "+49 000 000-000",
  email: "contact@example.invalid",
  openingHours: ["Testzeit: 09:00–10:00"],
};

function galleryFixture(
  id: string,
  overrides: Partial<GalleryItem> = {},
): GalleryItem {
  return {
    id,
    serviceSlug: "trockenbau",
    title: `Titel ${id}`,
    imageSrc: `/images/tests/${id}.svg`,
    alt: `Illustration ${id}`,
    kind: "illustration",
    copyrightCredit: `Bildnachweis ${id}`,
    rightsConfirmed: true,
    projectTitle: null,
    location: null,
    published: true,
    ...overrides,
  };
}

describe("Rendu des coordonnées centralisées", () => {
  it("ne crée aucun lien de contact ni horaire lorsque les données sont absentes", () => {
    const html = renderToStaticMarkup(
      createElement(ContactDetails, {
        config: {
          ...contactFixture,
          phone: null,
          email: null,
          openingHours: null,
        },
      }),
    );

    expect(html).toContain("Teststraße 42");
    expect(html).not.toContain('href="tel:');
    expect(html).not.toContain('href="mailto:');
    expect(html).not.toContain("Öffnungszeiten");
    expect(html).not.toContain("null");
  });

  it.each([true, false])(
    "répercute une configuration modifiée dans la variante showPerson=%s",
    (showPerson) => {
      const html = renderToStaticMarkup(
        createElement(ContactDetails, { config: contactFixture, showPerson }),
      );

      expect(html).toContain("Thermobau V&amp;V");
      expect(html).toContain("Teststraße 42");
      expect(html).toContain("00000 Teststadt");
      expect(html).toContain('href="tel:+49000000000"');
      expect(html).toContain("+49 000 000-000");
      expect(html).toContain('href="mailto:contact@example.invalid"');
      expect(html).toContain("Testzeit: 09:00–10:00");
      expect(html).not.toContain(siteConfig.address.street);
      expect(html).not.toContain(siteConfig.address.postalCode);
      expect(html).not.toContain(siteConfig.contactName);
      if (showPerson) {
        expect(html).toContain("Kontaktperson im Test");
      } else {
        expect(html).not.toContain("Kontaktperson im Test");
        expect(html).not.toContain("Ansprechpartner");
      }
    },
  );
});

describe("Rendu des médias autorisés", () => {
  it("exclut du HTML les médias non publiés ou sans droits, même avant une limite d'affichage", () => {
    const html = renderToStaticMarkup(
      createElement(GalleryComponent, {
        limit: 1,
        items: [
          galleryFixture("non-publie", { published: false }),
          galleryFixture("sans-droits", { rightsConfirmed: false }),
          galleryFixture("sans-droits-non-publie", {
            rightsConfirmed: false,
            published: false,
          }),
          galleryFixture("autorise"),
        ],
      }),
    );

    expect(html).not.toContain("non-publie");
    expect(html).not.toContain("sans-droits");
    expect(html).toContain('alt="Illustration autorise"');
    expect(html).toContain("/images/tests/autorise.svg");
    expect(html).not.toContain("Bildnachweis autorise");
    expect(html).not.toContain("Symbolbild");
    expect(html).not.toContain('class="photo-credit"');
    expect(html).not.toContain('class="image-label"');
    expect(html).toContain("keine dokumentierten Referenzprojekte");
  });

  it("affiche un état explicite sans image lorsqu'aucun média n'est autorisé", () => {
    const html = renderToStaticMarkup(
      createElement(GalleryComponent, {
        items: [galleryFixture("interdit", { rightsConfirmed: false })],
      }),
    );

    expect(html).not.toContain("<img");
    expect(html).not.toContain("interdit");
    expect(html).toContain(
      "Zurzeit sind keine Bilder zur Veröffentlichung freigegeben.",
    );
  });

  it("conserve le titre et le lieu vérifiés d'un projet autorisé sans crédit ou badge sous l'image", () => {
    const html = renderToStaticMarkup(
      createElement(GalleryComponent, {
        items: [
          galleryFixture("projet-test", {
            kind: "real-project",
            projectTitle: "Projekttitel aus der Testfreigabe",
            location: "Freigegebener Testort",
            alt: "Beschreibung des freigegebenen Testprojekts",
          }),
        ],
      }),
    );

    expect(html).not.toContain("Dokumentiertes Projekt");
    expect(html).toContain("Projekttitel aus der Testfreigabe");
    expect(html).toContain("Freigegebener Testort");
    expect(html).not.toContain("Bildnachweis projet-test");
    expect(html).not.toContain('class="photo-credit"');
    expect(html).toContain('alt="Beschreibung des freigegebenen Testprojekts"');
    expect(html).not.toContain("Symbolbild · Illustration");
    expect(html).not.toContain("Titel projet-test");
  });
});
