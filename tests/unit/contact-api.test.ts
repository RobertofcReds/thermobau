import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import * as contactConfig from "@/lib/contact-config";

const valid = {
  name: "Erika Muster",
  email: "erika@example.test",
  phone: "",
  service: "trockenbau",
  message: "Ich möchte ein Renovierungsvorhaben besprechen.",
  website: "",
};

function request(
  payload: unknown = valid,
  headers: Record<string, string> = {},
) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(payload),
  });
}

function enable() {
  vi.stubEnv("CONTACT_FORM_ENABLED", "true");
  vi.stubEnv("CONTACT_FROM_EMAIL", "sender@example.test");
  vi.stubEnv("CONTACT_RECIPIENT_EMAIL", "recipient@example.test");
  vi.stubEnv("MAIL_PROVIDER_API_KEY", "unit-test-key-never-real");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://unit-test.upstash.io");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "unit-test-token-never-real");
  vi.stubEnv(
    "CONTACT_RATE_LIMIT_SALT",
    "unit-test-hmac-salt-at-least-32-characters",
  );
}

function rateResponse(count = 1) {
  return Response.json([{ result: count }, { result: 1 }, { result: 900 }]);
}

describe("POST /api/contact", () => {
  const network = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubEnv("CONTACT_FORM_ENABLED", "false");
    vi.stubEnv("VERCEL", "");
    network.mockReset();
    network.mockRejectedValue(new Error("No real network allowed in tests"));
    vi.stubGlobal("fetch", network);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns 503 in demo without calling any provider", async () => {
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toMatchObject({ ok: false });
    expect(network).not.toHaveBeenCalled();
  });

  it("fails closed with an incomplete configuration", async () => {
    enable();
    vi.stubEnv("CONTACT_RATE_LIMIT_SALT", "");
    expect((await POST(request())).status).toBe(503);
    expect(contactConfig.isContactFormEnabled()).toBe(false);
    expect(network).not.toHaveBeenCalled();
  });

  it.each([
    ["CONTACT_FROM_EMAIL", "sender@example.test\r\nBcc: other@example.test"],
    ["UPSTASH_REDIS_REST_URL", "http://unit-test.upstash.io"],
    ["UPSTASH_REDIS_REST_URL", "not-a-url"],
    ["UPSTASH_REDIS_REST_URL", "https://other.invalid"],
    ["UPSTASH_REDIS_REST_URL", "https://unit-test.upstash.io/?token=secret"],
    ["CONTACT_RECIPIENT_EMAIL", ""],
    ["MAIL_PROVIDER_API_KEY", ""],
    ["UPSTASH_REDIS_REST_TOKEN", ""],
  ])("rejects unsafe configuration %s", async (key, value) => {
    enable();
    vi.stubEnv(key, value);
    expect((await POST(request())).status).toBe(503);
    expect(network).not.toHaveBeenCalled();
  });

  it("returns 400 with accessible field errors for invalid data", async () => {
    const response = await POST(
      request({ ...valid, name: "A", message: "kurz" }),
    );
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      ok: false,
      fieldErrors: { name: expect.any(Array), message: expect.any(Array) },
    });
    expect(network).not.toHaveBeenCalled();
  });

  it("rejects HTML and header injection before transport", async () => {
    enable();
    expect(
      (
        await POST(
          request({ ...valid, message: '<script>alert("test")</script>' }),
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await POST(
          request({ ...valid, name: "Erika\nBcc: other@example.test" }),
        )
      ).status,
    ).toBe(400);
    expect(network).not.toHaveBeenCalled();
  });

  it("returns 400 for the wrong content type or malformed JSON", async () => {
    expect(
      (await POST(request(valid, { "content-type": "text/plain" }))).status,
    ).toBe(400);
    expect(
      (
        await POST(
          new Request("http://localhost/api/contact", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: "{broken",
          }),
        )
      ).status,
    ).toBe(400);
  });

  it("returns 413 for a declared oversized request", async () => {
    expect(
      (await POST(request(valid, { "content-length": "17000" }))).status,
    ).toBe(413);
    expect(network).not.toHaveBeenCalled();
  });

  it("bounds actual streamed UTF-8 bytes even when Content-Length lies", async () => {
    const bytes = new TextEncoder().encode(
      JSON.stringify({ ...valid, message: "€".repeat(6000) }),
    );
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes.subarray(0, 8000));
        controller.enqueue(bytes.subarray(8000));
        controller.close();
      },
    });
    const streamedRequest = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "content-length": "1" },
      body,
      duplex: "half",
    } as RequestInit & { duplex: "half" });
    expect((await POST(streamedRequest)).status).toBe(413);
    expect(network).not.toHaveBeenCalled();
  });

  it("rejects a filled honeypot without a fake success", async () => {
    const response = await POST(
      request({ ...valid, website: "spam.example.test" }),
    );
    expect(response.status).toBe(429);
    expect(await response.json()).toMatchObject({ ok: false });
    expect(network).not.toHaveBeenCalled();
  });

  it("returns 429 with Retry-After when distributed quota is exceeded", async () => {
    enable();
    network.mockResolvedValueOnce(rateResponse(6));
    const response = await POST(request());
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("900");
    expect(network).toHaveBeenCalledTimes(1);
  });

  it("returns 503 when the anti-abuse provider fails and never sends", async () => {
    enable();
    network.mockResolvedValueOnce(
      Response.json({ error: "provider unavailable" }, { status: 503 }),
    );
    expect((await POST(request())).status).toBe(503);
    expect(network).toHaveBeenCalledTimes(1);
  });

  it.each([{}, { id: "" }, { error: "delivery rejected" }])(
    "does not treat a missing provider acceptance as success",
    async (result) => {
      enable();
      network
        .mockResolvedValueOnce(rateResponse())
        .mockResolvedValueOnce(Response.json(result));
      const response = await POST(request());
      expect(response.status).toBe(503);
      expect(await response.json()).toMatchObject({ ok: false });
    },
  );

  it("returns 503 for an email provider error", async () => {
    enable();
    network
      .mockResolvedValueOnce(rateResponse())
      .mockResolvedValueOnce(
        Response.json({ error: "failure" }, { status: 500 }),
      );
    expect((await POST(request())).status).toBe(503);
  });

  it("does not claim a message was unsent after an ambiguous provider network failure", async () => {
    enable();
    network
      .mockResolvedValueOnce(rateResponse())
      .mockRejectedValueOnce(
        new Error("Connection lost after provider processing"),
      );
    const response = await POST(request());
    expect(response.status).toBe(503);
    const result = await response.json();
    expect(result.ok).toBe(false);
    expect(result.message).toContain("nicht bestätigt");
    expect(result.message).not.toContain("nicht gesendet");
  });

  it("returns 200 only after simulated provider acceptance and uses only text for user data", async () => {
    enable();
    network
      .mockResolvedValueOnce(rateResponse())
      .mockResolvedValueOnce(Response.json({ id: "simulated-acceptance" }));
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ ok: true });
    expect(network).toHaveBeenCalledTimes(2);
    const [url, options] = network.mock.calls[1];
    expect(url).toBe("https://api.resend.com/emails");
    const payload = JSON.parse(options?.body as string);
    expect(payload).toMatchObject({
      from: "sender@example.test",
      to: ["recipient@example.test"],
    });
    expect(payload.text).toContain(valid.email);
    expect(payload.subject).not.toContain(valid.name);
    expect(payload).not.toHaveProperty("html");
    expect(payload).not.toHaveProperty("reply_to");
    expect(payload).not.toHaveProperty("headers");
  });

  it("returns 500 for an unexpected error without exposing or logging sensitive details", async () => {
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(contactConfig, "getContactConfig").mockImplementationOnce(() => {
      throw new Error("secret-test-value");
    });
    const response = await POST(request());
    expect(response.status).toBe(500);
    expect(await response.text()).not.toContain("secret-test-value");
    expect(errorLog).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });
});
