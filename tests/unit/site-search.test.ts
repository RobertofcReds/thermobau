import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { getContent } from "@/i18n/content";
import { pageKeys, pagePath, servicePath, type Locale } from "@/i18n/routing";
import { getServices } from "@/i18n/services";
import { buildSearchIndex } from "@/lib/site-search-index";
import { normalizeSearchText, searchSite } from "@/lib/site-search";

describe("local site search", () => {
  it.each(["de", "en", "fr"] as const)(
    "indexes every public page with unique localized links in %s",
    (locale) => {
      const index = buildSearchIndex(locale);
      const expected = [
        ...pageKeys.map((page) => pagePath(page, locale)),
        ...getServices(locale).map((service) =>
          servicePath(service.slug, locale),
        ),
      ];
      expect(index).toHaveLength(14);
      expect(new Set(index.map((entry) => entry.href)).size).toBe(14);
      expect(index.map((entry) => entry.href).sort()).toEqual(expected.sort());
      expect(JSON.stringify(index).length).toBeLessThan(35000);
    },
  );

  it.each([
    ["de", "Trockenbau", "trockenbau"],
    ["de", "streichen", "malerarbeiten"],
    ["de", "Fliesen", "fliesenarbeiten"],
    ["en", "painting", "malerarbeiten"],
    ["en", "drywall", "trockenbau"],
    ["fr", "FAÇADES", "fassaden"],
    ["fr", "carrelage", "fliesenarbeiten"],
    ["fr", "renovations", "renovierungen"],
    ["fr", "cloison", "trockenbau"],
    ["de", "putz", "putzarbeiten"],
  ] as const)(
    "ranks the relevant service first for %s / %s",
    (locale, query, slug) => {
      expect(searchSite(query, buildSearchIndex(locale))[0]?.href).toBe(
        servicePath(slug, locale),
      );
    },
  );

  it.each(["de", "en", "fr"] as const)(
    "finds current contacts and full phone numbers in %s",
    (locale) => {
      for (const query of [
        "WhatsApp",
        siteConfig.email!,
        siteConfig.phone!,
        siteConfig.phone!.replace(/\s/g, ""),
      ]) {
        expect(
          searchSite(query, buildSearchIndex(locale))[0]?.href,
          query,
        ).toBe(pagePath("contact", locale));
      }
    },
  );

  it.each([
    ["de", "Datenschutz", "privacy"],
    ["en", "privacy", "privacy"],
    ["fr", "confidentialité", "privacy"],
    ["fr", "mentions légales", "legal"],
  ] as const)("finds legal pages for %s / %s", (locale, query, page) => {
    expect(searchSite(query, buildSearchIndex(locale))[0]?.href).toBe(
      pagePath(page, locale),
    );
  });

  it.each(["de", "en", "fr"] as const)(
    "finds FAQ content that is not in the page title in %s",
    (locale) => {
      const question = getContent(locale).home.faq[2][0];
      expect(
        searchSite(question, buildSearchIndex(locale)).some(
          (result) => result.id === "home",
        ),
      ).toBe(true);
    },
  );

  it("handles accents, German sharp-s and German umlaut transliteration", () => {
    expect(normalizeSearchText("FAÇADE — Straße")).toBe("facade strasse");
    for (const query of ["Blücherstr", "Bluecherstr"]) {
      expect(searchSite(query, buildSearchIndex("de"))[0]?.id).toBe("contact");
    }
  });

  it("supports useful prefixes and ignores stop words in multi-word queries", () => {
    expect(searchSite("trocken", buildSearchIndex("de"))[0]?.id).toBe(
      "service-trockenbau",
    );
    expect(
      searchSite("peinture à Ludwigshafen", buildSearchIndex("fr"))[0]?.id,
    ).toBe("service-malerarbeiten");
  });

  it("returns no irrelevant results for empty, short, stop-word-only or unknown queries", () => {
    for (const query of [
      "",
      "  ",
      "a",
      "the",
      "!!!",
      "photovoltaik",
      "carrelage xzqwerty",
    ]) {
      expect(searchSite(query, buildSearchIndex("fr"))).toEqual([]);
    }
  });

  it("limits a broad search and keeps search input out of result links", () => {
    const entries = buildSearchIndex("de");
    expect(searchSite("FAQ", entries).length).toBeLessThanOrEqual(10);
    for (const locale of ["de", "en", "fr"] satisfies Locale[]) {
      expect(
        buildSearchIndex(locale).every(
          (entry) => entry.href.startsWith("/") && !entry.href.startsWith("//"),
        ),
      ).toBe(true);
    }
    expect(searchSite('<script>alert("xss")</script>', entries)).toEqual([]);
  });
});
