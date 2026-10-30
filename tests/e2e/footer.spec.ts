import { expect, test } from "@playwright/test";

test("footer: reference order, integrated map and copyright last", async ({
  page,
}) => {
  await page.goto("/fr/contact");
  await page.getByRole("button", { name: "Tout refuser", exact: true }).click();
  const footer = page.locator("footer.footer-premium");
  await expect(footer.locator(".footer-brand-bar .logo-footer")).toHaveCount(1);
  expect(
    await footer
      .locator(".footer-grid > div")
      .evaluateAll((nodes) => nodes.map((node) => node.className)),
  ).toEqual([
    "footer-contact",
    "footer-navigation",
    "footer-services",
    "footer-legal",
  ]);
  await expect(
    footer.locator(".footer-legal").getByRole("button", {
      name: "Paramètres de confidentialité",
      exact: true,
    }),
  ).toHaveCount(1);
  await expect(footer.locator(".footer-services a")).toHaveCount(6);
  await expect(footer.locator(".location-section")).toHaveCount(1);
  await expect(page.locator(".location-section")).toHaveCount(1);
  expect(
    await footer.evaluate((node) => {
      const grid = node.querySelector(".footer-grid")!;
      const map = node.querySelector(".location-section")!;
      const copyright = node.querySelector(".footer-copyright")!;
      return (
        Boolean(
          grid.compareDocumentPosition(map) & Node.DOCUMENT_POSITION_FOLLOWING,
        ) &&
        Boolean(
          map.compareDocumentPosition(copyright) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ) &&
        node.lastElementChild === copyright
      );
    }),
  ).toBe(true);
  await expect(footer.locator('a[href="#"]')).toHaveCount(0);
  await expect(footer.locator('a[href="tel:+4917641504088"]')).toHaveText(
    "+49 176 41504088",
  );
  await expect(footer.locator('a[href="mailto:thermo_bau@web.de"]')).toHaveText(
    "thermo_bau@web.de",
  );
  await expect(
    footer.locator('a[href="https://wa.me/4917641504088"]'),
  ).toContainText("+49 176 41504088");
  await expect(footer.locator(".contact-pending")).toHaveCount(0);
});

test("footer: desktop columns and mobile stacking preserve their order", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/leistungen");
  await page
    .getByRole("button", { name: "Alle ablehnen", exact: true })
    .click();
  const columns = page.locator(".footer-grid > div");
  const desktop = await columns.evaluateAll((nodes) =>
    nodes.map((node) => ({
      x: node.getBoundingClientRect().x,
      y: node.getBoundingClientRect().y,
    })),
  );
  expect(new Set(desktop.map((box) => box.y)).size).toBe(1);
  expect(
    desktop.every((box, index) => index === 0 || box.x > desktop[index - 1].x),
  ).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = await columns.evaluateAll((nodes) =>
    nodes.map((node) => ({
      x: node.getBoundingClientRect().x,
      y: node.getBoundingClientRect().y,
    })),
  );
  expect(new Set(mobile.map((box) => box.x)).size).toBe(1);
  expect(
    mobile.every((box, index) => index === 0 || box.y > mobile[index - 1].y),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
