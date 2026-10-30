import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { galleryItems, publishedGalleryItems } from "@/data/projects";
import { getService, services } from "@/data/services";

describe("Contenus confirmés et contrat éditorial", () => {
  it("conserve exactement les six métiers autorisés avec des contenus distincts", () => {
    expect(services.map((service) => service.slug).sort()).toEqual(
      [
        "fassaden",
        "trockenbau",
        "putzarbeiten",
        "malerarbeiten",
        "fliesenarbeiten",
        "renovierungen",
      ].sort(),
    );
    expect(new Set(services.map((service) => service.title)).size).toBe(6);
    expect(
      new Set(services.map((service) => service.seo.description)).size,
    ).toBe(6);
    for (const service of services) {
      expect(getService(service.slug)).toEqual(service);
      expect(service.description.length).toBeGreaterThan(60);
      expect(service.imageAlt.length).toBeGreaterThan(10);
      expect(existsSync(join(process.cwd(), "public", service.imageSrc))).toBe(
        true,
      );
    }
    expect(getService("waermepumpen")).toBeUndefined();
  });

  it("garde les coordonnées transmises et masque toutes les données inconnues", () => {
    expect(siteConfig.name).toBe("Thermobau V&V");
    expect(siteConfig.contactName).toBe("Vasil Velikov Dimitrov");
    expect(siteConfig.address).toEqual({
      street: "Blücherstr. 59",
      postalCode: "67063",
      city: "Ludwigshafen",
      country: "DE",
    });
    expect(siteConfig.phone).toBe("+49 176 41504088");
    expect(siteConfig.email).toBe("thermo_bau@web.de");
    expect(siteConfig.whatsapp).toBe("+49 176 41504088");
    expect(siteConfig.openingHours).toBeNull();
    expect(siteConfig.confirmedServiceAreas).toEqual([]);
    expect(siteConfig.domain).toBeNull();
    expect(
      Object.values(siteConfig.legal).every((value) => value === null),
    ).toBe(true);
  });

  it("publie des photographies stock locales documentées sans inventer de projets", () => {
    expect(publishedGalleryItems.length).toBe(6);
    expect(publishedGalleryItems).toEqual(
      galleryItems.filter((item) => item.rightsConfirmed && item.published),
    );
    for (const item of publishedGalleryItems) {
      expect(item.kind).toBe("stock-photo");
      expect(item.sourceUrl).toMatch(/^https:\/\/www\.pexels\.com\/photo\//);
      expect(item.imageSrc).toMatch(/\.webp$/);
      expect(item.projectTitle).toBeNull();
      expect(item.location).toBeNull();
      expect(item.date).toBeNull();
      expect(item.copyrightCredit).toBeTruthy();
      expect(item.rightsConfirmed).toBe(true);
      expect(item.alt).toBeTruthy();
      expect(existsSync(join(process.cwd(), "public", item.imageSrc))).toBe(
        true,
      );
    }
  });

  it("intègre le PNG approuvé strictement inchangé et conserve les sources", () => {
    const digest = (path: string) =>
      createHash("sha256").update(readFileSync(path)).digest("hex");
    expect(digest("public/brand/thermobau-vv-logo.png")).toBe(
      digest("assets/Thermobau_VV_Logo_Valide.png"),
    );
    expect(existsSync("assets/Thermobau_Vehicule_Reference_INTERNE.png")).toBe(
      true,
    );
    expect(existsSync("docs/Thermobau_VV_Cahier_des_charges_V1.md")).toBe(true);
    expect(existsSync("docs/Thermobau_VV_Architecture_Technique_V1.md")).toBe(
      true,
    );
  });
});
