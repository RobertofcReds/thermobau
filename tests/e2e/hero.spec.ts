import { expect, test, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function zoomScales(image: Locator) {
  await expect
    .poll(() => image.evaluate((img) => img.getAnimations().length))
    .toBe(1);
  return image.evaluate((img) => {
    const animation = img.getAnimations()[0];
    const previousTime = animation.currentTime;
    animation.currentTime = 1000;
    const early = new DOMMatrix(getComputedStyle(img).transform).a;
    animation.currentTime = 10000;
    const late = new DOMMatrix(getComputedStyle(img).transform).a;
    animation.currentTime = previousTime;
    return { early, late };
  });
}

test("hero: deferred photos, twelve-second cycle, alternating visible zoom and explicit pause", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await page
    .getByRole("button", { name: "Alle ablehnen", exact: true })
    .click();
  await page.mouse.move(0, 0);
  const hero = page.locator(".cinematic-hero");
  await expect(hero).toHaveAttribute("data-active-slide", "0");
  await expect(page.locator(".cinematic-slide img")).toHaveCount(1);
  await expect
    .poll(() =>
      page
        .locator(".cinematic-slide img")
        .first()
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  // Resting the pointer on the photograph must not stop its animation.
  await hero.hover({ position: { x: 100, y: 100 } });
  await expect(hero).toHaveAttribute("data-playback", "playing");
  await expect(hero).toHaveAttribute("data-motion", "playing");
  const outward = await zoomScales(
    page.locator(".cinematic-slide.is-active img"),
  );
  expect(outward.early - outward.late).toBeGreaterThan(0.08);
  await page.clock.runFor(2500);
  await expect(page.locator(".cinematic-slide img")).toHaveCount(2);
  await expect
    .poll(() =>
      page
        .locator(".cinematic-slide img")
        .nth(1)
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page.clock.runFor(9600);
  await expect(hero).toHaveAttribute("data-active-slide", "1");
  const inward = await zoomScales(
    page.locator(".cinematic-slide.is-active img"),
  );
  expect(inward.late - inward.early).toBeGreaterThan(0.08);
  await page.getByRole("button", { name: "Bildwechsel pausieren" }).click();
  await page.mouse.move(0, 0);
  await page.getByRole("button", { name: "Bildwechsel starten" }).blur();
  await expect(hero).toHaveAttribute("data-motion", "paused");
  expect(
    await page
      .locator(".cinematic-slide.is-active img")
      .evaluate((img) => getComputedStyle(img).animationPlayState),
  ).toBe("paused");
  await page.clock.runFor(24000);
  await expect(hero).toHaveAttribute("data-active-slide", "1");
  await page.getByRole("button", { name: "Bildwechsel starten" }).click();
  await page.mouse.move(0, 0);
  await expect(
    page.getByRole("button", { name: "Bildwechsel pausieren" }),
  ).toBeFocused();
  await expect(hero).toHaveAttribute("data-playback", "playing");
  await page.clock.runFor(2500);
  await expect(page.locator(".cinematic-slide img")).toHaveCount(3);
  await expect
    .poll(() =>
      page
        .locator(".cinematic-slide img")
        .nth(2)
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await page.clock.runFor(9600);
  await expect(hero).toHaveAttribute("data-active-slide", "2");
  await page.clock.runFor(12100);
  await expect(hero).toHaveAttribute("data-active-slide", "0");
  // A three-image loop must alternate movement across the last/first boundary.
  const wrapped = await zoomScales(
    page.locator(".cinematic-slide.is-active img"),
  );
  expect(wrapped.late - wrapped.early).toBeGreaterThan(0.08);
});

test("hero: keyboard focus pauses, reduced motion stays static and manual selection works", async ({
  page,
}) => {
  await page.goto("/fr");
  await page.getByRole("button", { name: "Tout refuser", exact: true }).click();
  const hero = page.locator(".cinematic-hero");
  await hero.getByRole("link").first().focus();
  await expect(hero).toHaveAttribute("data-playback", "paused");
  await expect(hero).toHaveAttribute("data-motion", "playing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(hero).toHaveAttribute("data-playback", "paused");
  await expect(hero).toHaveAttribute("data-motion", "paused");
  await expect(page.locator(".cinematic-playback")).toHaveCount(0);
  await expect(page.locator(".cinematic-slide img")).toHaveCount(1);
  await page.locator('[data-slide="2"]').click();
  await expect(hero).toHaveAttribute("data-active-slide", "2");
  expect(
    await page
      .locator(".cinematic-slide.is-active img")
      .evaluate((img) => getComputedStyle(img).animationName),
  ).toBe("none");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(hero.getByRole("link").first()).toHaveAttribute(
    "href",
    "/fr/contact",
  );
  await expect(hero.getByRole("link").nth(1)).toHaveAttribute(
    "href",
    "/fr/prestations",
  );
});

for (const locale of ["de", "en", "fr"]) {
  test(`hero and footer accessibility: ${locale}`, async ({ page }) => {
    await page.goto(locale === "de" ? "/" : `/${locale}`);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
