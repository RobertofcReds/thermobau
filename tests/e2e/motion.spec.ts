import { expect, test, type Page } from "@playwright/test";

async function scrollTo(page: Page, top: number) {
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    top,
  );
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(top);
}

test("le header reste visible en descente, se masque en remontée et protège le focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/leistungen");
  await page
    .getByRole("button", { name: "Alle ablehnen", exact: true })
    .click();
  const header = page.locator(".smart-header");
  await expect(header).toHaveAttribute(
    "data-header-behavior",
    "show-on-scroll-down",
  );
  await expect(header).toHaveAttribute("data-hidden", "false");
  const mainDocumentTop = await page
    .locator("main")
    .evaluate(
      (element) => element.getBoundingClientRect().top + window.scrollY,
    );

  await scrollTo(page, 1000);
  await expect(header).toHaveAttribute("data-hidden", "false");
  expect((await header.boundingBox())?.y).toBe(0);
  await scrollTo(page, 800);
  await expect(header).toHaveAttribute("data-hidden", "true");
  await scrollTo(page, 804);
  await expect(header).toHaveAttribute("data-hidden", "true");
  await scrollTo(page, 900);
  await expect(header).toHaveAttribute("data-hidden", "false");
  await scrollTo(page, 700);
  await expect(header).toHaveAttribute("data-hidden", "true");

  // Focusing the translated, hidden header normally scrolls it into view. Keep
  // the scroll position stable here to isolate the focus-protection behavior.
  await header
    .locator(".logo")
    .evaluate((element) =>
      (element as HTMLElement).focus({ preventScroll: true }),
    );
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(700);
  await expect(header).toHaveAttribute("data-hidden", "false");
  await scrollTo(page, 600);
  await expect(header).toHaveAttribute("data-hidden", "false");
  await header
    .locator(".logo")
    .evaluate((element) => (element as HTMLElement).blur());
  await expect(header).toHaveAttribute("data-hidden", "true");
  await scrollTo(page, 0);
  await expect(header).toHaveAttribute("data-hidden", "false");
  expect(
    await page
      .locator("main")
      .evaluate(
        (element) => element.getBoundingClientRect().top + window.scrollY,
      ),
  ).toBe(mainDocumentTop);
});

test("le menu mobile reste visible et utilisable pendant une remontée", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/leistungen");
  await page
    .getByRole("button", { name: "Alle ablehnen", exact: true })
    .click();
  await scrollTo(page, 1000);
  await page.getByRole("button", { name: "Menü öffnen" }).click();
  await expect(page.getByRole("dialog", { name: "Hauptmenü" })).toBeVisible();
  await scrollTo(page, 800);
  await expect(page.locator(".smart-header")).toHaveAttribute(
    "data-hidden",
    "false",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menü öffnen" })).toBeFocused();
  await expect(page.locator(".smart-header")).toHaveAttribute(
    "data-hidden",
    "false",
  );
  await expect(
    page.getByRole("dialog", { name: "Hauptmenü" }),
  ).not.toBeVisible();
});

test("le retour en haut est traduit et instantané avec réduction des mouvements", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const locales = [
    ["/leistungen", "Alle ablehnen", "Zurück nach oben"],
    ["/en/services", "Reject optional", "Back to top"],
    ["/fr/prestations", "Tout refuser", "Retour en haut"],
  ] as const;
  for (const [route, reject, label] of locales) {
    await page.goto(route);
    const rejectButton = page.getByRole("button", {
      name: reject,
      exact: true,
    });
    if (await rejectButton.isVisible()) await rejectButton.click();
    const button = page.locator(".back-to-top");
    await expect(button).not.toBeVisible();
    await scrollTo(page, 550);
    await expect(button).not.toBeVisible();
    await scrollTo(page, 800);
    await expect(
      page.getByRole("button", { name: label, exact: true }),
    ).toBeVisible();
    await button.focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(button).not.toBeVisible();
    await expect(page.locator(".site-header .logo")).toBeFocused();
  }
});

test("le retour en haut ne recouvre pas le panneau de confidentialité redimensionné", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr/prestations");
  const panel = page.locator(".privacy-panel");
  const button = page.getByRole("button", {
    name: "Retour en haut",
    exact: true,
  });
  await expect(panel).toBeVisible();
  await scrollTo(page, 900);
  await expect(button).toBeVisible();
  for (let detailed = 0; detailed < 2; detailed++) {
    await expect
      .poll(async () => {
        const [control, privacy, header] = await Promise.all([
          button.boundingBox(),
          panel.boundingBox(),
          page.locator(".smart-header").boundingBox(),
        ]);
        return (
          !!control &&
          !!privacy &&
          !!header &&
          control.y >= header.y + header.height + 8 &&
          control.y + control.height + 8 <= privacy.y
        );
      })
      .toBe(true);
    if (!detailed)
      await page
        .getByRole("button", { name: "Paramètres", exact: true })
        .click();
  }
  await page.setViewportSize({ width: 360, height: 640 });
  await expect
    .poll(async () => {
      const [control, privacy, header] = await Promise.all([
        button.boundingBox(),
        panel.boundingBox(),
        page.locator(".smart-header").boundingBox(),
      ]);
      return (
        !!control &&
        !!privacy &&
        !!header &&
        control.y >= header.y + header.height + 8 &&
        control.y + control.height + 8 <= privacy.y
      );
    })
    .toBe(true);
  await page.getByRole("button", { name: "Tout refuser", exact: true }).click();
  await expect(panel).not.toBeVisible();
  await expect
    .poll(async () => (await button.boundingBox())?.y ?? 0)
    .toBeGreaterThan(530);
});
