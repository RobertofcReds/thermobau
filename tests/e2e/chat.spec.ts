import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function openChat(page: Page, route = "/leistungen") {
  await page.goto(route);
  const reject = page.getByRole("button", {
    name: /^(Alle ablehnen|Reject optional|Tout refuser)$/,
  });
  await reject.click();
  await page.getByTestId("chat-launcher").click();
  const dialog = page.getByTestId("chat-dialog");
  await expect(dialog).toBeVisible();
  await expect
    .poll(() => dialog.evaluate((element) => element.matches(":modal")))
    .toBe(true);
  return dialog;
}

async function ask(page: Page, question: string, withEnter = false) {
  const answers = page.getByTestId("chat-answer");
  const count = await answers.count();
  await page.getByTestId("chat-input").fill(question);
  if (withEnter) await page.getByTestId("chat-input").press("Enter");
  else await page.getByTestId("chat-send").click();
  await expect(answers).toHaveCount(count + 1);
  await expect(page.getByTestId("chat-input")).toHaveValue("");
  return answers.last();
}

test("chat: answers follow French, English and German questions on a German page", async ({
  page,
}) => {
  await openChat(page);
  const french = await ask(
    page,
    "Bonjour, quels services proposez-vous ?",
    true,
  );
  await expect(french).toHaveAttribute("lang", "fr");
  await expect(french).toContainText(/prestations|façades|travaux/i);
  const english = await ask(page, "What services do you offer?");
  await expect(english).toHaveAttribute("lang", "en");
  await expect(english).toContainText(/services|facade|drywall|painting/i);
  const german = await ask(page, "Was kostet eine Renovierung?");
  await expect(german).toHaveAttribute("lang", "de");
  await expect(german).toContainText(/Angebot|Preis|Kosten|Renovierung/i);
  await expect(german).not.toContainText(/\d+[,.]?\d*\s*(€|EUR)/);
  await expect(page.getByTestId("chat-send")).toBeDisabled();
});

test("chat: contact answers use the confirmed phone, email and WhatsApp links", async ({
  page,
}) => {
  await openChat(page);
  const answer = await ask(page, "Wie kann ich Sie kontaktieren?");
  await expect(answer).toHaveAttribute("lang", "de");
  await expect(answer.locator('a[href="tel:+4917641504088"]')).toHaveCount(1);
  await expect(
    answer.locator('a[href="mailto:thermo_bau@web.de"]'),
  ).toHaveCount(1);
  await expect(
    answer.locator('a[href="https://wa.me/4917641504088"]'),
  ).toHaveCount(1);
  await expect(
    answer.locator('a[href="#"], a[href^="javascript:"]'),
  ).toHaveCount(0);
});

test("chat: messages stay local, remain after closing and disappear after clear or reload", async ({
  page,
}) => {
  const dialog = await openChat(page, "/fr/prestations");
  const initialAnswers = await page.getByTestId("chat-answer").count();
  const transmissions: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (
      !["GET", "HEAD"].includes(request.method()) ||
      url.pathname.startsWith("/api/") ||
      (url.origin !== "http://127.0.0.1:3100" &&
        ["fetch", "xhr"].includes(request.resourceType()))
    )
      transmissions.push(`${request.method()} ${url.origin}${url.pathname}`);
  });
  const question = "Bonjour, mon projet PRIVÉ-CHAT-7528 concerne la peinture.";
  await ask(page, question);
  await expect(dialog).toContainText(question);
  expect(
    await page.evaluate(() =>
      JSON.stringify([
        Object.entries(localStorage),
        Object.entries(sessionStorage),
      ]),
    ),
  ).not.toContain("PRIVÉ-CHAT-7528");
  expect(transmissions).toEqual([]);

  await page.getByTestId("chat-close").click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByTestId("chat-launcher")).toBeFocused();
  await page.getByTestId("chat-launcher").click();
  await expect(dialog).toContainText(question);
  await page.getByTestId("chat-clear").click();
  await expect(page.getByTestId("chat-answer")).toHaveCount(initialAnswers);
  await expect(dialog).not.toContainText(question);

  await ask(page, "Bonjour, un second projet PRIVÉ-CHAT-5287 concerne un mur.");
  await page.reload();
  await page.getByTestId("chat-launcher").click();
  await expect(page.getByTestId("chat-answer")).toHaveCount(initialAnswers);
  await expect(page.getByTestId("chat-dialog")).not.toContainText(
    "PRIVÉ-CHAT-5287",
  );
});

for (const [width, height] of [
  [320, 640],
  [390, 844],
]) {
  test(`chat: mobile controls and keyboard remain usable at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/leistungen");
    await expect(page.locator(".privacy-panel")).toBeVisible();
    await page.evaluate(() =>
      window.scrollTo({ top: 900, behavior: "instant" }),
    );
    const launcher = page.getByTestId("chat-launcher");
    const top = page.locator(".back-to-top");
    await expect(launcher).toBeVisible();
    await expect(top).toBeVisible();
    await expect
      .poll(async () => {
        const [chat, back, privacy] = await Promise.all([
          launcher.boundingBox(),
          top.boundingBox(),
          page.locator(".privacy-panel").boundingBox(),
        ]);
        if (!chat || !back || !privacy) return false;
        const separate =
          chat.x + chat.width <= back.x ||
          back.x + back.width <= chat.x ||
          chat.y + chat.height <= back.y ||
          back.y + back.height <= chat.y;
        return (
          separate &&
          chat.y >= 0 &&
          chat.x >= 0 &&
          chat.x + chat.width <= width &&
          chat.y + chat.height <= privacy.y
        );
      })
      .toBe(true);

    await launcher.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByTestId("chat-dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId("chat-input")).toHaveAttribute(
      "maxlength",
      "1000",
    );
    await ask(page, `Hallo, ${"Zusatz".repeat(35)}`);
    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(height);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const close = page.getByTestId("chat-close");
    const clear = page.getByTestId("chat-clear");
    await clear.focus();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(clear).toBeFocused();
    await page.getByTestId("chat-input").focus();
    for (let index = 0; index < 8; index++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate((element) =>
          element.contains(document.activeElement),
        ),
      ).toBe(true);
    }
    await page.screenshot({
      path: testInfo.outputPath(`chat-mobile-${width}.png`),
    });
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(launcher).toBeFocused();
  });
}

test("chat: the open conversation has no axe violations", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openChat(page, "/en/services");
  await ask(page, "How can I contact Thermobau?");
  const result = await new AxeBuilder({ page })
    .include('[data-testid="chat-dialog"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("chat-desktop.png") });
});
