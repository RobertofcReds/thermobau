import { expect, test } from "@playwright/test";

const mapPattern = "https://www.google.com/maps?**";
const consentKey = "thermobau-privacy-v4";
const pages = [
  {
    path: "/",
    locale: "de",
    load: "Karte hier anzeigen",
    reject: "Alle ablehnen",
    group: "Kartenansicht",
    plan: "Karte",
    satellite: "Satellit",
  },
  {
    path: "/kontakt",
    locale: "de",
    load: "Karte hier anzeigen",
    reject: "Alle ablehnen",
    group: "Kartenansicht",
    plan: "Karte",
    satellite: "Satellit",
  },
  {
    path: "/en",
    locale: "en",
    load: "Show map here",
    reject: "Reject optional",
    group: "Map view",
    plan: "Map",
    satellite: "Satellite",
  },
  {
    path: "/en/contact",
    locale: "en",
    load: "Show map here",
    reject: "Reject optional",
    group: "Map view",
    plan: "Map",
    satellite: "Satellite",
  },
  {
    path: "/fr",
    locale: "fr",
    load: "Afficher la carte ici",
    reject: "Tout refuser",
    group: "Affichage de la carte",
    plan: "Plan",
    satellite: "Satellite",
  },
  {
    path: "/fr/contact",
    locale: "fr",
    load: "Afficher la carte ici",
    reject: "Tout refuser",
    group: "Affichage de la carte",
    plan: "Plan",
    satellite: "Satellite",
  },
];

test.beforeEach(async ({ context }) => {
  // The provider document is mocked: this suite tests our integration and
  // privacy boundary, not availability or map rendering on a third-party site.
  await context.route(mapPattern, (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><title>Test map</title><body>Embedded map fixture</body></html>',
    }),
  );
});

for (const { path, locale, load, reject, group, plan, satellite } of pages) {
  test(`la carte de ${path} est sous le footer et les modes restent dans la page après accord`, async ({
    page,
    context,
  }) => {
    const externalRequests: string[] = [];
    const popups: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).hostname !== "127.0.0.1")
        externalRequests.push(request.url());
    });
    page.on("popup", (popup) => popups.push(popup.url()));

    await page.goto(path);
    const initialUrl = page.url();
    await expect(page.locator(".privacy-panel")).toBeVisible();
    await expect(page.locator(".map-shell iframe")).toHaveCount(0);
    await expect(page.locator(".location-section")).toHaveCount(1);
    await expect(
      page.locator("main .location-section, main .map-shell"),
    ).toHaveCount(0);
    expect(
      await page
        .locator(".location-section")
        .evaluate((section) =>
          Boolean(
            document.querySelector("footer")!.compareDocumentPosition(section) &
            Node.DOCUMENT_POSITION_FOLLOWING,
          ),
        ),
    ).toBe(true);
    expect(externalRequests).toEqual([]);
    await page.getByRole("button", { name: reject, exact: true }).click();
    await expect(page.locator(".privacy-panel")).toHaveCount(0);
    await page.locator(".map-shell").scrollIntoViewIfNeeded();
    await expect(page.locator(".map-placeholder")).toContainText("Google Maps");
    const switcher = page.getByRole("group", { name: group, exact: true });
    await expect(
      switcher.getByRole("button", { name: plan, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await switcher
      .getByRole("button", { name: satellite, exact: true })
      .click();
    await expect(
      switcher.getByRole("button", { name: satellite, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      switcher.getByRole("button", { name: plan, exact: true }),
    ).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".map-shell iframe")).toHaveCount(0);
    expect(externalRequests).toEqual([]);

    // An explicit later request for this optional service can replace refusal.
    await page.getByRole("button", { name: load, exact: true }).click();
    const frame = page.locator(".map-shell iframe");
    await expect(frame).toBeVisible();
    await frame.scrollIntoViewIfNeeded();
    const source = new URL((await frame.getAttribute("src"))!);
    expect(source.origin).toBe("https://www.google.com");
    expect(source.pathname).toBe("/maps");
    expect(source.searchParams.get("q")).toBe("49.4878874,8.433252");
    expect(source.searchParams.get("output")).toBe("embed");
    expect(source.searchParams.get("t")).toBe("k");
    expect(source.searchParams.get("hl")).toBe(locale);
    await expect(frame).toHaveAttribute(
      "title",
      new RegExp(`Thermobau V&V.* — ${satellite}$`),
    );
    await expect
      .poll(
        () =>
          externalRequests.filter((url) => url.startsWith(source.origin))
            .length,
      )
      .toBe(1);
    await switcher.getByRole("button", { name: plan, exact: true }).click();
    await expect(frame).toHaveAttribute("src", /[?&]t=m(?:&|$)/);
    await expect(frame).toHaveAttribute("title", new RegExp(` — ${plan}$`));
    await expect(
      switcher.getByRole("button", { name: plan, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      switcher.getByRole("button", { name: satellite, exact: true }),
    ).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".map-shell iframe")).toHaveCount(1);
    await expect
      .poll(
        () =>
          externalRequests.filter((url) => url.startsWith(source.origin))
            .length,
      )
      .toBe(2);
    await expect(page).toHaveURL(initialUrl);
    expect(popups).toEqual([]);
    expect(context.pages()).toHaveLength(1);
    const choice = await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!),
      consentKey,
    );
    expect(choice).toMatchObject({ version: 4, maps: true });
    await expect(page.locator(".map-directions")).not.toHaveAttribute(
      "target",
      "_blank",
    );
  });
}

test("l'accord persiste après actualisation et changement de langue, puis le retrait enlève la carte", async ({
  page,
}) => {
  const mapRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().startsWith("https://www.google.com/maps?"))
      mapRequests.push(request.url());
  });
  await page.goto("/fr/contact");
  await page
    .getByRole("button", { name: "Tout accepter", exact: true })
    .click();
  await expect(page.locator(".map-shell iframe")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".privacy-panel")).toHaveCount(0);
  await expect(page.locator(".map-shell iframe")).toHaveCount(1);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/contact$/);
  await expect(page.locator(".map-shell iframe")).toHaveAttribute(
    "title",
    "Map: Thermobau V&V in Ludwigshafen — Map",
  );
  await expect(page.locator(".map-shell iframe")).toHaveAttribute(
    "src",
    /[?&]hl=en(?:&|$)/,
  );
  await page.locator(".map-shell iframe").scrollIntoViewIfNeeded();
  await expect.poll(() => mapRequests.length).toBeGreaterThan(0);
  await page
    .getByRole("group", { name: "Map view", exact: true })
    .getByRole("button", { name: "Satellite", exact: true })
    .click();
  await expect(page.locator(".map-shell iframe")).toHaveAttribute(
    "src",
    /[?&]t=k(?:&|$)/,
  );
  await page
    .getByRole("button", { name: "Privacy settings", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Reject optional", exact: true })
    .click();
  await expect(page.locator(".map-shell iframe")).toHaveCount(0);
  const countAfterWithdrawal = mapRequests.length;
  await page.reload();
  await expect(page.locator(".privacy-panel")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Show map here", exact: true }),
  ).toBeVisible();
  await page.locator(".map-shell").scrollIntoViewIfNeeded();
  expect(mapRequests).toHaveLength(countAfterWithdrawal);
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).maps,
      consentKey,
    ),
  ).toBe(false);
});

test("les anciens accords Google et OpenStreetMap ne remplacent pas le choix actuel", async ({
  page,
}) => {
  await page.addInitScript(() => {
    for (const version of [2, 3]) {
      localStorage.setItem(
        `thermobau-privacy-v${version}`,
        JSON.stringify({ version, maps: true, expires: Date.now() + 86400000 }),
      );
    }
  });
  await page.goto("/fr");
  await expect(page.locator(".privacy-panel")).toBeVisible();
  await expect(page.locator(".map-shell iframe")).toHaveCount(0);
  expect(
    await page.evaluate((key) => localStorage.getItem(key), consentKey),
  ).toBeNull();
});

test("la carte intégrée reste dans sa colonne sur mobile à 360px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/fr/contact");
  await page.getByRole("button", { name: "Tout refuser", exact: true }).click();
  await page
    .getByRole("button", { name: "Afficher la carte ici", exact: true })
    .click();
  const frame = page.locator(".map-shell iframe");
  await expect(frame).toBeVisible();
  await frame.scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const bounds = await frame.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(360);
  expect(bounds!.height).toBeGreaterThanOrEqual(300);
  await page
    .getByRole("group", { name: "Affichage de la carte" })
    .getByRole("button", { name: "Satellite", exact: true })
    .click();
  await expect(frame).toHaveAttribute("src", /[?&]t=k(?:&|$)/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("le bouton de la carte est utilisable dès la première visite sur mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr/contact");
  await expect(page.locator(".privacy-panel")).toBeVisible();
  await page
    .getByRole("button", { name: "Afficher la carte ici", exact: true })
    .click();
  await expect(page.locator(".map-shell iframe")).toBeVisible();
  await expect(page.locator(".privacy-panel")).toHaveCount(0);
  await expect(page).toHaveURL(/\/fr\/contact$/);
});

test("les autres pages n'ajoutent pas de carte sous le footer", async ({
  page,
}) => {
  for (const path of [
    "/leistungen",
    "/leistungen/trockenbau",
    "/ueber-uns",
    "/referenzen",
    "/impressum",
    "/datenschutz",
    "/nutzungsbedingungen",
    "/en/services",
    "/en/services/drywall",
    "/en/about",
    "/en/gallery",
    "/en/privacy",
    "/fr/prestations",
    "/fr/prestations/cloisons-seches",
    "/fr/a-propos",
    "/fr/galerie",
    "/fr/confidentialite",
  ]) {
    await page.goto(path);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator(".map-shell, .location-section")).toHaveCount(0);
  }
});
