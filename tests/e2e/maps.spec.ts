import { expect, test } from "@playwright/test";

const mapPattern = "https://www.openstreetmap.org/export/embed.html**";
const consentKey = "thermobau-privacy-v3";
const pages = [
  { path: "/", load: "Karte hier anzeigen", reject: "Alle ablehnen" },
  { path: "/kontakt", load: "Karte hier anzeigen", reject: "Alle ablehnen" },
  { path: "/en", load: "Show map here", reject: "Reject optional" },
  { path: "/en/contact", load: "Show map here", reject: "Reject optional" },
  { path: "/fr", load: "Afficher la carte ici", reject: "Tout refuser" },
  {
    path: "/fr/contact",
    load: "Afficher la carte ici",
    reject: "Tout refuser",
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

for (const { path, load, reject } of pages) {
  test(`la carte de ${path} reste dans la page et ne charge rien avant accord`, async ({
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
    expect(externalRequests).toEqual([]);
    await page.getByRole("button", { name: reject, exact: true }).click();
    await expect(page.locator(".privacy-panel")).toHaveCount(0);
    await page.locator(".map-shell").scrollIntoViewIfNeeded();
    await expect(page.locator(".map-placeholder")).toContainText(
      "OpenStreetMap",
    );
    expect(externalRequests).toEqual([]);

    // An explicit later request for this optional service can replace refusal.
    await page.getByRole("button", { name: load, exact: true }).click();
    const frame = page.locator(".map-shell iframe");
    await expect(frame).toBeVisible();
    await frame.scrollIntoViewIfNeeded();
    const source = new URL((await frame.getAttribute("src"))!);
    expect(source.origin).toBe("https://www.openstreetmap.org");
    expect(source.pathname).toBe("/export/embed.html");
    expect(source.searchParams.get("marker")).toBe("49.4878874,8.433252");
    expect(source.searchParams.has("bbox")).toBe(true);
    await expect(frame).toHaveAttribute("title", /Thermobau V&V/);
    await expect
      .poll(
        () =>
          externalRequests.filter((url) => url.startsWith(source.origin))
            .length,
      )
      .toBe(1);
    await expect(page).toHaveURL(initialUrl);
    expect(popups).toEqual([]);
    expect(context.pages()).toHaveLength(1);
    const choice = await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!),
      consentKey,
    );
    expect(choice).toMatchObject({ version: 3, maps: true });
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
    if (request.url().includes("openstreetmap.org/export/embed.html"))
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
    "Map: Thermobau V&V in Ludwigshafen",
  );
  await page.locator(".map-shell iframe").scrollIntoViewIfNeeded();
  await expect.poll(() => mapRequests.length).toBeGreaterThan(0);
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

test("l'ancien accord Google ne vaut pas consentement à OpenStreetMap", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "thermobau-privacy-v2",
      JSON.stringify({
        version: 2,
        maps: true,
        expires: Date.now() + 86400000,
      }),
    );
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
});
