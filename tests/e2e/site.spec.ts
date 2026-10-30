import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/leistungen",
  "/leistungen/fassaden",
  "/leistungen/trockenbau",
  "/leistungen/putzarbeiten",
  "/leistungen/malerarbeiten",
  "/leistungen/fliesenarbeiten",
  "/leistungen/renovierungen",
  "/ueber-uns",
  "/referenzen",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/nutzungsbedingungen",
];

test("les 14 pages allemandes ont des métadonnées uniques et restent non indexables", async ({
  page,
}) => {
  test.setTimeout(90000);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const headings = new Set<string>();
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    expect(response?.headers()["x-robots-tag"], route).toContain("noindex");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(page.locator("h1")).toHaveCount(1);
    const heading = (await page.locator("h1").innerText())
      .replace(/\s+/g, " ")
      .trim();
    const title = await page.title();
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(title.length).toBeGreaterThan(10);
    expect(description?.length).toBeGreaterThan(40);
    expect(titles.has(title), `Titre dupliqué : ${route}`).toBe(false);
    expect(
      descriptions.has(description!),
      `Description dupliquée : ${route}`,
    ).toBe(false);
    expect(headings.has(heading), `H1 dupliqué : ${route}`).toBe(false);
    titles.add(title);
    descriptions.add(description!);
    headings.add(heading);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex.*nofollow/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
    await expect(
      page.locator('footer a[href="tel:+4917641504088"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('footer a[href="mailto:thermo_bau@web.de"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('footer a[href="https://wa.me/4917641504088"]'),
    ).toHaveCount(1);
    await expect(page.locator("body")).not.toContainText(
      /Lorem ipsum|Meisterbetrieb|seit 20 Jahren/i,
    );

    const internalLinks = await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")!.split(/[?#]/)[0]),
      );
    for (const href of internalLinks)
      expect(href, `Lien interne depuis ${route}`).toMatch(
        /^\/(?:$|en(?:\/|$)|fr(?:\/|$)|leistungen(?:\/|$)|ueber-uns$|referenzen$|kontakt$|impressum$|datenschutz$|nutzungsbedingungen$)/,
      );
    await page.locator("img").evaluateAll((images) => {
      images.forEach((image) => {
        (image as HTMLImageElement).loading = "eager";
      });
    });
    await expect
      .poll(
        () =>
          page
            .locator("img")
            .evaluateAll((images) =>
              images.every(
                (image) =>
                  image instanceof HTMLImageElement &&
                  image.complete &&
                  image.naturalWidth > 0,
              ),
            ),
        { message: `Toutes les images doivent charger sur ${route}` },
      )
      .toBe(true);
  }
  expect(runtimeErrors).toEqual([]);
});

test("l'accueil donne accès aux services et au contact en un clic", async ({
  page,
}) => {
  // Exercise navigation independently of the continuous hero-button animation.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("link", { name: "Leistungen entdecken", exact: true })
    .click();
  await expect(page).toHaveURL(/\/leistungen$/);
  await expect(
    page.locator('.editorial-cards h3 a[href^="/leistungen/"]'),
  ).toHaveCount(6);
  await page
    .getByRole("link", { name: "Angebot anfragen", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/kontakt$/);
});

test("le menu mobile se ferme avec Escape, restaure le focus et permet la navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "Menü öffnen",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const expanded = page.locator('button[aria-expanded="true"]');
  await expect(expanded).toBeVisible();
  const panelId = await expanded.getAttribute("aria-controls");
  expect(panelId).toBeTruthy();
  const panel = page.locator(`[id="${panelId}"]`);
  await expect(panel).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.click();
  await panel.getByRole("link", { name: "Leistungen", exact: true }).click();
  await expect(page).toHaveURL(/\/leistungen$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("le formulaire vérifie localement les saisies sans aucun envoi en démonstration", async ({
  page,
}) => {
  const contactRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/contact"))
      contactRequests.push(request.method());
  });
  await page.goto("/kontakt?service=trockenbau");
  await page
    .getByRole("button", { name: "Alle ablehnen", exact: true })
    .click();
  await expect(page.locator('[name="service"]')).toHaveValue("trockenbau");
  await expect(
    page.getByText(/Demomodus|Demonstrationsmodus/i).first(),
  ).toBeVisible();
  const check = page.getByRole("button", {
    name: "Eingaben prüfen",
    exact: true,
  });
  await check.click();
  await expect(page.locator('[name="name"]')).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.locator('[name="email"]')).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.locator('[name="message"]')).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.locator('[name="name"]').fill("Test Person");
  await page.locator('[name="email"]').fill("test@example.com");
  await page
    .locator('[name="message"]')
    .fill("Ich möchte die Raumaufteilung meiner Wohnung besprechen.");
  await check.click();
  await expect(page.getByRole("status")).toContainText(
    /nicht gesendet|keine Nachricht gesendet|kein.*versandt|keine.*übermittelt/i,
  );
  await expect(page.locator("body")).not.toContainText(
    /Nachricht erfolgreich gesendet|Nachricht wurde erfolgreich übermittelt/i,
  );
  expect(contactRequests).toEqual([]);
});

test("la fiche métier préselectionne le service dans le formulaire", async ({
  page,
}) => {
  await page.goto("/leistungen/trockenbau");
  await page
    .getByRole("link", { name: "Projekt anfragen", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/kontakt\?service=trockenbau$/);
  await expect(page.locator('[name="service"]')).toHaveValue("trockenbau");
});

test("l'API de démonstration refuse réellement un envoi valide", async ({
  request,
}) => {
  const response = await request.post("/api/contact", {
    data: {
      name: "Test Person",
      email: "test@example.com",
      phone: "",
      service: "trockenbau",
      message: "Dies ist eine rein lokale Prüfung des Kontaktformulars.",
      website: "",
    },
  });
  expect(response.status()).toBe(503);
  const body = await response.json();
  expect(body.ok).toBe(false);
  expect(body.message).toEqual(expect.any(String));
  expect(body.message).not.toMatch(
    /erfolgreich gesendet|erfolgreich übermittelt/i,
  );
});

test("la galerie expose clairement son caractère illustratif", async ({
  page,
}) => {
  await page.goto("/referenzen");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Handgriffe und Materialien im Detail.",
  );
  await expect(
    page.getByText(
      "Die gezeigten Bilder dienen der Veranschaulichung unserer Tätigkeitsbereiche und stellen keine dokumentierten Referenzprojekte von Thermobau V&V dar.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(page.locator(".editorial-gallery img")).toHaveCount(6);
  await expect(page.locator(".editorial-gallery figcaption")).toHaveCount(0);
  await expect(
    page.locator(".editorial-gallery a[href*='pexels.com']"),
  ).toHaveCount(0);
});

test("les pages inconnues et les services inconnus répondent avec une 404 allemande", async ({
  page,
}) => {
  for (const path of ["/seite-nicht-vorhanden", "/leistungen/waermepumpen"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Diese Seite wurde nicht gefunden",
    );
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
      "content",
      /noindex/,
    );
    await page
      .getByRole("link", { name: "Zur Startseite", exact: true })
      .click();
    await expect(page).toHaveURL(/\/$/);
  }
});

test("robots et sitemap restent fermés en démonstration", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Disallow: /");
  expect(await robots.text()).not.toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("<loc>");
});

test("le sélecteur conserve la page métier équivalente dans les trois langues", async ({
  page,
}) => {
  await page.goto("/leistungen/trockenbau");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/services\/drywall$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "FR", exact: true }).click();
  await expect(page).toHaveURL(/\/fr\/prestations\/cloisons-seches$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("la carte intégrée se charge après accord et disparaît après retrait", async ({
  page,
  context,
}) => {
  const mapRequests: string[] = [];
  await context.route("https://www.google.com/maps?**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><title>Test map</title><body>Test map</body></html>',
    }),
  );
  page.on("request", (request) => {
    if (request.url().startsWith("https://www.google.com/maps?"))
      mapRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator(".map-shell iframe")).toHaveCount(0);
  expect(mapRequests).toEqual([]);
  await page
    .getByRole("button", { name: "Einstellungen", exact: true })
    .click();
  await page
    .getByRole("checkbox", { name: "Externe Karten", exact: true })
    .check();
  await page
    .getByRole("button", { name: "Auswahl speichern", exact: true })
    .click();
  await expect(page.locator(".map-shell iframe")).toHaveCount(1);
  await page.locator(".map-shell iframe").scrollIntoViewIfNeeded();
  await expect.poll(() => mapRequests.length).toBe(1);
  await page
    .getByRole("button", { name: "Datenschutzeinstellungen", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Alle ablehnen", exact: true })
    .click();
  await expect(page.locator(".map-shell iframe")).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".map-shell iframe")).toHaveCount(0);
  expect(mapRequests).toHaveLength(1);
  await expect(
    page.getByRole("link", { name: "Route planen" }),
  ).toHaveAttribute("href", /destination=Bl/);
  await expect(
    page.getByRole("link", { name: "Route planen" }),
  ).not.toHaveAttribute("target", "_blank");
});

for (const route of [
  "/",
  "/leistungen/trockenbau",
  "/kontakt",
  "/impressum",
  "/datenschutz",
]) {
  test(`aucune violation axe grave ou critique sur ${route}`, async ({
    page,
  }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
  });
}

for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
  test(`les 14 pages restent sans débordement horizontal à ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} déborde à ${width}px`,
      ).toBe(true);
      const logo = page.locator('header img[src*="thermobau-vv-logo"]');
      await expect(logo).toBeVisible();
      await expect(logo).toHaveJSProperty("complete", true);
      await expect
        .poll(() =>
          logo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
      expect(
        await logo.evaluate((image) => getComputedStyle(image).objectFit),
      ).toBe("contain");
      if (
        ["/", "/kontakt", "/leistungen/trockenbau", "/datenschutz"].includes(
          route,
        )
      ) {
        const rejectCookies = page.getByRole("button", {
          name: "Alle ablehnen",
          exact: true,
        });
        if (await rejectCookies.isVisible()) await rejectCookies.click();
        // Full-page screenshots do not trigger loading of offscreen photos.
        // Visit them first so the visual review shows the actual content.
        for (const image of await page.locator("main img, footer img").all()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              image.evaluate(
                (node: HTMLImageElement) =>
                  node.complete && node.naturalWidth > 0,
              ),
            )
            .toBe(true);
        }
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        const label =
          route === "/" ? "startseite" : route.replaceAll("/", "-").slice(1);
        await page.screenshot({
          path: testInfo.outputPath(`${label}-${width}.png`),
          fullPage: true,
        });
      }
    }
  });
}
