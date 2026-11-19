import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHmac } from "node:crypto";
import {
  checkContactRateLimit,
  contactClientKey,
  RateLimitUnavailable,
} from "@/lib/rate-limit";
import type { ContactConfig } from "@/lib/contact-config";

const config: ContactConfig = {
  CONTACT_FORM_ENABLED: "true",
  SMTP_HOST: "w0225293.kasserver.com",
  SMTP_PORT: 465,
  SMTP_SECURE: true,
  SMTP_USER: "info@thermobau-vv.de",
  SMTP_PASSWORD: "unit-test-password-never-real",
  MAIL_FROM: "info@thermobau-vv.de",
  MAIL_TO: "info@thermobau-vv.de",
  UPSTASH_REDIS_REST_KV_REST_API_URL: "https://unit-test.upstash.io",
  UPSTASH_REDIS_REST_KV_REST_API_TOKEN: "unit-test-token",
};

const request = new Request("http://localhost/api/contact", {
  headers: {
    "x-vercel-forwarded-for": "192.0.2.1",
    "x-forwarded-for": "192.0.2.2",
  },
});

describe("distributed rate limiting", () => {
  const network = vi.fn<typeof fetch>();
  beforeEach(() => {
    network.mockReset();
    vi.stubGlobal("fetch", network);
    vi.stubEnv("VERCEL", "1");
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("uses one atomic transaction with expiration and sends no raw IP", async () => {
    network.mockResolvedValue(
      Response.json([{ result: 5 }, { result: 0 }, { result: 400 }]),
    );
    expect(await checkContactRateLimit(request, config)).toEqual({
      allowed: true,
      retryAfter: 400,
    });
    const [url, options] = network.mock.calls[0];
    expect(url).toBe("https://unit-test.upstash.io/multi-exec");
    expect(options?.headers).toMatchObject({
      Authorization: `Bearer ${config.UPSTASH_REDIS_REST_KV_REST_API_TOKEN}`,
    });
    const body = String(options?.body);
    expect(body).not.toContain("192.0.2.1");
    expect(JSON.parse(body)).toEqual([
      ["INCR", expect.stringMatching(/^thermobau:contact:[0-9a-f]{64}$/)],
      ["EXPIRE", expect.any(String), 3600, "NX"],
      ["TTL", expect.any(String)],
    ]);
  });

  it.each([
    [5, true],
    [6, false],
  ])(
    "allows at most five attempts within the one-hour window: %i",
    async (count, allowed) => {
      network.mockResolvedValue(
        Response.json([{ result: count }, { result: 0 }, { result: 3600 }]),
      );
      expect(await checkContactRateLimit(request, config)).toEqual({
        allowed,
        retryAfter: 3600,
      });
    },
  );

  it("derives a domain-separated HMAC key without disclosing the token", () => {
    const token = config.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
    const derivedKey = createHmac("sha256", token)
      .update("thermobau:contact:ip-key:v1")
      .digest();
    const digest = createHmac("sha256", derivedKey)
      .update("192.0.2.1")
      .digest("hex");
    const key = contactClientKey(request, token);
    expect(key).toBe(`thermobau:contact:${digest}`);
    expect(key).not.toContain(token);
    expect(key).not.toContain("192.0.2.1");
    expect(key).not.toContain(
      createHmac("sha256", token).update("192.0.2.1").digest("hex"),
    );
  });

  it("does not trust client-provided IP headers outside Vercel", () => {
    vi.stubEnv("VERCEL", "");
    expect(
      contactClientKey(request, config.UPSTASH_REDIS_REST_KV_REST_API_TOKEN),
    ).toBe(
      contactClientKey(
        new Request("http://localhost"),
        config.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
      ),
    );
  });

  it("uses a secret keyed digest and does not treat other IP headers as trusted", () => {
    const key = contactClientKey(
      request,
      config.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
    );
    expect(key).not.toBe(contactClientKey(request, "different-secret"));
    expect(key).not.toBe(
      contactClientKey(
        new Request("http://localhost", {
          headers: { "x-forwarded-for": "192.0.2.1" },
        }),
        config.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
      ),
    );
  });

  it.each([
    [{ result: 1 }, { result: 1 }, { result: -1 }],
    [{ result: 1 }, { result: 1 }, { result: 3601 }],
    [{ result: 1 }, { error: "expiration failed" }, { result: 3600 }],
    [{ result: "1" }, { result: 1 }, { result: 3600 }],
    { error: "transaction failed" },
  ])("fails closed for malformed or unbounded counters", async (result) => {
    network.mockResolvedValue(Response.json(result));
    await expect(checkContactRateLimit(request, config)).rejects.toBeInstanceOf(
      RateLimitUnavailable,
    );
  });

  it.each(["http", "network"])(
    "fails closed on a Redis %s failure without logging secrets",
    async (failure) => {
      const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
      if (failure === "http") {
        network.mockResolvedValue(
          Response.json({ error: "permission denied" }, { status: 403 }),
        );
      } else {
        network.mockRejectedValue(
          new Error(
            `network failure ${config.UPSTASH_REDIS_REST_KV_REST_API_TOKEN}`,
          ),
        );
      }
      await expect(checkContactRateLimit(request, config)).rejects.toThrow(
        "Rate limiting unavailable",
      );
      expect(errorLog).not.toHaveBeenCalled();
    },
  );
});
