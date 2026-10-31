import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function openSearch(page: Page, route = "/leistungen") {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(route);
  await page
    .getByRole("button", {
      name: /^(Alle ablehnen|Reject optional|Tout refuser)$/,
    })
    .click();
  await page.getByTestId("site-search-trigger").click();
  const dialog = page.getByTestId("site-search-dialog");
  await expect(dialog).toBeVisible();
  await expect
    .poll(() => dialog.evaluate((element) => element.matches(":modal")))
    .toBe(true);
  await expect(page.getByTestId("site-search-input")).toBeFocused();
  return dialog;
}

for (const { locale, route, question, destination } of [
  {
    locale: "de",
    route: "/leistungen",
    question: "Trockenbau",
    destination: "/leistungen/trockenbau",
  },
  {
    locale: "en",
    route: "/en/services",
    question: "tiling",
    destination: "/en/services/tiling",
  },
  {
    locale: "fr",
    route: "/fr/prestations",
    question: "peinture",
    destination: "/fr/prestations/peinture",
  },
]) {
  test(`search: ${locale} results lead to the matching localised service`, async ({
    page,
  }) => {
    const dialog = await openSearch(page, route);
    const input = page.getByTestId("site-search-input");
    await input.fill(question);
    const result = page.getByTestId("site-search-result").first();
    await expect(result).toHaveAttribute("href", destination);
    await expect(result).not.toHaveText("");
    await input.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${destination}$`));
    await expect(dialog).not.toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("main h1")).toBeVisible();
  });
}

test("search: an unknown query has no fabricated result and can be cleared", async ({
  page,
}) => {
  const dialog = await openSearch(page, "/fr/prestations");
  const input = page.getByTestId("site-search-input");
  await input.fill("zzqxwlkj987654");
  await expect(page.getByTestId("site-search-result")).toHaveCount(0);
  await expect(dialog).toContainText(/aucun|aucune/i);
  await input.press("Enter");
  await expect(page).toHaveURL(/\/fr\/prestations$/);
  await expect(dialog).toBeVisible();
  await page.getByTestId("site-search-clear").click();
  await expect(input).toHaveValue("");
  await expect(input).toBeFocused();
  await input.fill("thermo_bau@web.de");
  await expect(page.getByTestId("site-search-result").first()).toHaveAttribute(
    "href",
    "/fr/contact",
  );
});

test("search: arrows, Tab, Shift+Tab and Escape keep the keyboard usable", async ({
  page,
}) => {
  const dialog = await openSearch(page);
  const input = page.getByTestId("site-search-input");
  await input.fill("Trockenbau");
  await input.press("ArrowDown");
  await expect(page.getByTestId("site-search-result").first()).toBeFocused();

  const controls = dialog.locator(
    'button:visible:not(:disabled), input:visible:not(:disabled), a[href]:visible, [tabindex="0"]:visible',
  );
  await controls.last().focus();
  await page.keyboard.press("Tab");
  await expect(controls.first()).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(controls.last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByTestId("site-search-trigger")).toBeFocused();
});

for (const [width, height, headerHeight] of [
  [320, 640, 72],
  [390, 844, 72],
  [1024, 900, 80],
  [1440, 1000, 80],
]) {
  test(`search: header and results remain usable at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height });
    const dialog = await openSearch(page, "/fr/prestations");
    await page.getByTestId("site-search-close").click();
    const header = page.locator(".site-header");
    const headerBounds = await header.boundingBox();
    expect(headerBounds!.height).toBeGreaterThanOrEqual(headerHeight);
    expect(headerBounds!.height).toBeLessThanOrEqual(headerHeight + 1);
    const controls = header.locator(
      '.header-main > .logo, .desktop-navigation, [data-testid="site-search-trigger"], .language-switcher, .header-cta, .mobile-navigation > .menu-trigger',
    );
    const visibleBounds = [];
    for (const control of await controls.all()) {
      if (!(await control.isVisible())) continue;
      const bounds = await control.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
      visibleBounds.push(bounds!);
    }
    visibleBounds.sort((a, b) => a.x - b.x);
    for (let index = 1; index < visibleBounds.length; index++) {
      const previous = visibleBounds[index - 1];
      expect(previous.x + previous.width).toBeLessThanOrEqual(
        visibleBounds[index].x + 1,
      );
    }
    const trigger = page.getByTestId("site-search-trigger");
    const triggerBounds = await trigger.boundingBox();
    expect(triggerBounds!.width).toBeGreaterThanOrEqual(44);
    expect(triggerBounds!.height).toBeGreaterThanOrEqual(44);
    await trigger.click();
    await page.getByTestId("site-search-input").fill("peinture");
    await expect(page.getByTestId("site-search-result").first()).toBeVisible();
    const bounds = await dialog.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(height + 1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await dialog.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`search-${width}.png`),
    });
  });
}

test("search: the open results have no axe accessibility violations", async ({
  page,
}) => {
  await openSearch(page, "/en/services");
  await page.getByTestId("site-search-input").fill("tiling");
  await expect(page.getByTestId("site-search-result").first()).toBeVisible();
  const result = await new AxeBuilder({ page })
    .include('[data-testid="site-search-dialog"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
