import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  equivalents,
  pageKeys,
  pagePath,
  servicePath,
  locales,
} from "../../src/i18n/routing";
const german = [
  ...pageKeys.map((key) => pagePath(key, "de")),
  ...[
    "fassaden",
    "trockenbau",
    "putzarbeiten",
    "malerarbeiten",
    "fliesenarbeiten",
    "renovierungen",
  ].map((slug) => servicePath(slug, "de")),
];
const routes = german.flatMap((route) =>
  locales.map((locale) => ({ locale, path: equivalents(route)[locale] })),
);

test.beforeEach(async ({ context }) => {
  // Consent tests exercise embedding without contacting the live provider.
  await context.route("https://www.google.com/maps?**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><title>Test map</title><body>Test map</body></html>',
    }),
  );
});

test("les pages 404 EN/FR ont un contenu et un titre localisés", async ({
  page,
}) => {
  for (const [path, locale, title, heading] of [
    [
      "/en/missing-page",
      "en",
      "Page not found",
      "This page could not be found",
    ],
    [
      "/fr/page-inconnue",
      "fr",
      "Page introuvable",
      "Cette page est introuvable",
    ],
  ]) {
    expect((await page.goto(path))?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator("h1")).toHaveText(heading);
  }
});

test("le consentement expiré est purgé et un retrait dans un autre onglet synchronise la case", async ({
  page,
  context,
}) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("expiry-seeded")) {
      localStorage.setItem(
        "thermobau-privacy-v4",
        JSON.stringify({ version: 4, maps: true, expires: Date.now() - 1000 }),
      );
      sessionStorage.setItem("expiry-seeded", "1");
    }
  });
  await page.goto("/fr");
  await expect
    .poll(() =>
      page.evaluate(() => localStorage.getItem("thermobau-privacy-v4")),
    )
    .toBeNull();
  await page.getByRole("button", { name: "Paramètres", exact: true }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Enregistrer", exact: true }).click();
  const other = await context.newPage();
  await other.goto("/fr");
  await other
    .getByRole("button", { name: "Paramètres de confidentialité", exact: true })
    .click();
  await expect(other.getByRole("checkbox")).toBeChecked();
  await page
    .getByRole("button", { name: "Paramètres de confidentialité", exact: true })
    .click();
  await page.getByRole("button", { name: "Tout refuser", exact: true }).click();
  await expect(other.getByRole("checkbox")).not.toBeChecked();
  await other.close();
});

test("42 pages : langue, métadonnées, photos distinctes, images chargées et absence d’erreur", async ({
  page,
}) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const titles = new Set<string>();
  const families = new Map<string, string[]>();
  const uniquePhotos = new Set<string>();
  for (const { path, locale } of routes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".editorial-photo figcaption")).toHaveCount(0);
    await expect(
      page.locator(".editorial-photo a[href*='pexels.com']"),
    ).toHaveCount(0);
    const title = await page.title();
    expect(titles.has(title), path).toBe(false);
    titles.add(title);
    const photoSources = await page
      .locator("main .editorial-photo img")
      .evaluateAll((nodes) =>
        nodes.map((n) =>
          new URL((n as HTMLImageElement).src).searchParams.get("url")!,
        ),
      );
    expect(new Set(photoSources).size, path).toBe(photoSources.length);
    if (locale === "de") {
      families.set(path, photoSources);
      for (const src of photoSources) {
        expect(uniquePhotos.has(src), "Duplicate placement " + src).toBe(false);
        uniquePhotos.add(src);
      }
    } else expect(photoSources).toEqual(families.get(equivalents(path).de));
    for (const alt of await page
      .locator("main .editorial-photo img")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("alt") ?? "")))
      expect(alt.length).toBeGreaterThan(10);
    await page
      .locator("img")
      .evaluateAll((nodes) =>
        nodes.forEach((n) => ((n as HTMLImageElement).loading = "eager")),
      );
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((nodes) =>
            nodes.every(
              (n) =>
                (n as HTMLImageElement).complete &&
                (n as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    if (locale !== "de")
      await expect(page.locator("footer")).not.toContainText(
        /Ansprechpartner|Deutschland|Leistungen|Datenschutz/,
      );
  }
  expect(uniquePhotos.size).toBe(31);
  expect(errors).toEqual([]);
});

test("chaque famille de page change de langue sans rechargement ni correction manuelle", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const route of german) {
    await page.goto(route + "?service=trockenbau#main-content");
    await page.evaluate(() => {
      (window as unknown as { localeTestToken: string }).localeTestToken =
        "still-here";
    });
    for (const locale of ["en", "fr", "de"] as const) {
      await page
        .getByRole("link", { name: locale.toUpperCase(), exact: true })
        .click();
      await expect(page).toHaveURL(
        new RegExp(
          equivalents(route)[locale].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "\\?service=trockenbau#main-content$",
        ),
      );
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(
        page.locator(".language-switcher a[aria-current=page]"),
      ).toHaveText(locale.toUpperCase());
      expect(
        await page.evaluate(
          () =>
            (window as unknown as { localeTestToken: string }).localeTestToken,
        ),
      ).toBe("still-here");
      const home = page.locator("header .logo");
      await expect(home).toHaveAttribute("href", pagePath("home", locale));
    }
  }
});

test("reload, navigation et historique conservent la langue française", async ({
  page,
}) => {
  await page.goto("/fr/prestations/cloisons-seches");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.locator("header .logo").click();
  await expect(page).toHaveURL(/\/fr$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/fr\/prestations\/cloisons-seches$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("le formulaire EN/FR traduit les erreurs et ne transmet aucune donnée en démo", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/contact")) requests.push(r.url());
  });
  for (const locale of ["en", "fr"] as const) {
    await page.goto("/" + locale + "/contact?service=trockenbau");
    if (locale === "en")
      await page
        .getByRole("button", { name: "Reject optional", exact: true })
        .click();
    await expect(page.locator("[name=service]")).toHaveValue("trockenbau");
    await page.locator("button[type=submit]").click();
    await expect(page.locator("#name-error")).toContainText(
      locale === "fr" ? "Indiquez" : "Enter",
    );
    await expect(page.locator("[name=name]")).toBeFocused();
    await page.locator("[name=name]").fill("Local test");
    await page.locator("[name=email]").fill("test@example.com");
    await page
      .locator("[name=message]")
      .fill("Une demande de rénovation pour une pièce existante.");
    await page.locator("button[type=submit]").click();
    await expect(page.getByRole("status")).toContainText(
      locale === "fr" ? "aucun message" : "no message",
    );
  }
  expect(requests).toEqual([]);
});

test("préférences persistantes, refus, retrait, clavier et stockage bloqué", async ({
  page,
}) => {
  await page.goto("/fr");
  await expect(page.locator(".privacy-panel")).toBeVisible();
  const open = () =>
    page
      .getByRole("button", {
        name: "Paramètres de confidentialité",
        exact: true,
      })
      .click();
  await page.getByRole("button", { name: "Paramètres", exact: true }).click();
  await expect(page.getByRole("checkbox")).not.toBeChecked();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Enregistrer", exact: true }).click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("thermobau-privacy-v4")!).maps,
    ),
  ).toBe(true);
  await page.reload();
  await open();
  await expect(page.getByRole("checkbox")).toBeChecked();
  await page.getByRole("button", { name: "Tout refuser", exact: true }).click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("thermobau-privacy-v4")!).maps,
    ),
  ).toBe(false);
  await open();
  await expect(page.locator(".privacy-panel")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator(".privacy-panel")).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Paramètres de confidentialité",
      exact: true,
    }),
  ).toBeFocused();
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("blocked", "SecurityError");
      },
    });
  });
  await page.reload();
  await expect(page.locator(".privacy-panel")).toBeVisible();
  await page.getByRole("button", { name: "Tout refuser", exact: true }).click();
  await expect(page.locator(".privacy-panel")).toHaveCount(0);
  await open();
  await expect(page.getByRole("checkbox")).not.toBeChecked();
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(
    "EN et FR : toutes les pages sans débordement à " + width + "px",
    async ({ page }) => {
      test.setTimeout(180000);
      await page.setViewportSize({ width, height: 1000 });
      for (const { path } of routes.filter((r) => r.locale !== "de")) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          path,
        ).toBe(true);
      }
    },
  );
}
for (const path of [
  "/en/services",
  "/fr/galerie",
  "/en/contact",
  "/fr/confidentialite",
]) {
  test("accessibilité " + path, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.filter((x) =>
        ["serious", "critical"].includes(x.impact ?? ""),
      ),
    ).toEqual([]);
  });
}
