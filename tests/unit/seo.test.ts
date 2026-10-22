import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getSiteUrl, publicationReady } from "@/lib/publication";
import { pageMetadata } from "@/lib/seo";

const originalDomain = siteConfig.domain;
const testOrigin = "https://official.example";

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("SITE_PUBLICATION_READY", "false");
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  siteConfig.domain = null;
});

afterEach(() => {
  siteConfig.domain = originalDomain;
  vi.unstubAllEnvs();
});

function configureApprovedProduction() {
  siteConfig.domain = "official.example";
  vi.stubEnv("SITE_PUBLICATION_READY", "true");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", testOrigin);
}

describe("Protection de l'indexation", () => {
  it("reste noindex, sans canonical ni sitemap ni domaine fictif par défaut", () => {
    const metadata = pageMetadata(
      "Kontakt",
      "Kontakt zu Thermobau V&V in Ludwigshafen.",
      "/kontakt",
    );
    expect(publicationReady()).toBe(false);
    expect(getSiteUrl()).toBeNull();
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates).toBeUndefined();
    expect(metadata.openGraph).not.toHaveProperty("url");
    expect(metadata.openGraph).not.toHaveProperty("images");
    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it.each(["preview", "development"])(
    "refuse Vercel %s malgré tous les drapeaux",
    (environment) => {
      configureApprovedProduction();
      vi.stubEnv("VERCEL_ENV", environment);
      expect(publicationReady()).toBe(false);
      expect(sitemap()).toEqual([]);
      expect(
        pageMetadata("Kontakt", "Kontakt in Ludwigshafen.", "/kontakt")
          .alternates,
      ).toBeUndefined();
    },
  );

  it.each(["development", "test"])("refuse NODE_ENV=%s", (environment) => {
    configureApprovedProduction();
    vi.stubEnv("NODE_ENV", environment);
    expect(publicationReady()).toBe(false);
  });

  it("exige une validation explicite et un domaine officiel renseigné", () => {
    configureApprovedProduction();
    vi.stubEnv("SITE_PUBLICATION_READY", "false");
    expect(publicationReady()).toBe(false);
    vi.stubEnv("SITE_PUBLICATION_READY", "true");
    siteConfig.domain = null;
    expect(publicationReady()).toBe(false);
  });

  it.each([
    "http://official.example",
    "https://other.example",
    "https://official.example.evil.example",
    "https://official.example:8443",
    "https://official.example/preview",
    "https://official.example/?preview=1",
    "https://official.example/#preview",
    "https://user:password@official.example",
    "not a url",
    "",
  ])("refuse une URL publique incohérente : %s", (configuredUrl) => {
    configureApprovedProduction();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", configuredUrl);
    expect(getSiteUrl()).toBeNull();
    expect(publicationReady()).toBe(false);
  });

  it.each([
    "http://official.example",
    "https://localhost",
    "https://127.0.0.1",
    "https://host.test",
  ])("refuse une origine non publique ou non HTTPS : %s", (origin) => {
    configureApprovedProduction();
    siteConfig.domain = origin;
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", origin);
    expect(publicationReady()).toBe(false);
  });

  it("génère les 13 URLs uniquement pour la production officiellement validée", () => {
    configureApprovedProduction();
    expect(publicationReady()).toBe(true);
    expect(getSiteUrl()).toBe(testOrigin);
    const entries = sitemap();
    expect(entries).toHaveLength(13);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(13);
    expect(
      entries.every((entry) => entry.url.startsWith(`${testOrigin}/`)),
    ).toBe(true);
    expect(entries).toContainEqual({
      url: `${testOrigin}/leistungen/trockenbau`,
    });
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/", disallow: "/api/" },
      sitemap: `${testOrigin}/sitemap.xml`,
    });
    const metadata = pageMetadata(
      "Kontakt",
      "Kontakt in Ludwigshafen.",
      "/kontakt",
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.alternates).toEqual({ canonical: `${testOrigin}/kontakt` });
    expect(metadata.openGraph).toHaveProperty("url", `${testOrigin}/kontakt`);
  });
});
