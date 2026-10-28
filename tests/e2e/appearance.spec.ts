import { expect, test } from "@playwright/test";

test("compact header keeps navigation and mobile targets usable at every breakpoint", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, expectedHeight] of [
    [320, 72],
    [390, 72],
    [768, 76],
    [1024, 80],
    [1440, 80],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/en/services");
    const header = page.locator(".site-header");
    await expect(header).toBeVisible();
    const bounds = await header.boundingBox();
    expect(bounds!.height).toBeGreaterThanOrEqual(expectedHeight);
    expect(bounds!.height).toBeLessThanOrEqual(expectedHeight + 1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width < 1024) {
      const targets = await page
        .locator(
          ".site-header .language-switcher a, .site-header .mobile-navigation > .menu-trigger",
        )
        .all();
      for (const target of targets) {
        const box = await target.boundingBox();
        expect(box!.width).toBeGreaterThanOrEqual(44);
        expect(box!.height).toBeGreaterThanOrEqual(44);
      }
    }
  }
});

test("editorial motion enters once, preserves keyboard access and follows language navigation", async ({
  page,
}) => {
  await page.goto("/leistungen");
  await page
    .getByRole("button", { name: "Alle ablehnen", exact: true })
    .click();
  const image = page.locator(".editorial-photo-hero");
  await expect(image).toHaveAttribute("data-page-reveal", "image");
  const card = page.locator(".editorial-card").last();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-page-reveal", "rise");
  await card.getByRole("link").first().focus();
  expect(
    await card.evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await card.getByRole("link").first().blur();
  expect(
    await card.evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("link", { name: "FR", exact: true }).click();
  await expect(page).toHaveURL(/\/fr\/prestations$/);
  await expect(page.locator(".editorial-photo-hero")).toHaveAttribute(
    "data-page-reveal",
    "image",
  );
});

test("reduced motion and legal content remain immediately readable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/services");
  await expect(page.locator("main [data-page-reveal]")).toHaveCount(0);
  expect(
    await page
      .locator(".editorial-photo-hero")
      .evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".editorial-photo-hero")).toHaveAttribute(
    "data-page-reveal",
    "image",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("main [data-page-reveal]")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/fr/confidentialite");
  await expect(page.locator(".editorial-legal")).toBeVisible();
  await expect(page.locator("main [data-page-reveal]")).toHaveCount(0);
});
