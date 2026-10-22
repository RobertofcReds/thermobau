import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  checkContactRateLimit,
  contactClientKey,
  RateLimitUnavailable,
} from "@/lib/rate-limit";
import type { ContactConfig } from "@/lib/contact-config";

const config: ContactConfig = {
  CONTACT_FORM_ENABLED: "true",
  CONTACT_FROM_EMAIL: "from@example.test",
  CONTACT_RECIPIENT_EMAIL: "to@example.test",
  MAIL_PROVIDER_API_KEY: "unit-test-key",
  UPSTASH_REDIS_REST_URL: "https://unit-test.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "unit-test-token",
  CONTACT_RATE_LIMIT_SALT: "unit-test-hmac-salt-of-32-characters",
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
    const body = String(options?.body);
    expect(body).not.toContain("192.0.2.1");
    expect(JSON.parse(body)).toEqual([
      ["INCR", expect.stringMatching(/^thermobau:contact:[0-9a-f]{64}$/)],
      ["EXPIRE", expect.any(String), 900, "NX"],
      ["TTL", expect.any(String)],
    ]);
  });

  it("does not trust client-provided IP headers outside Vercel", () => {
    vi.stubEnv("VERCEL", "");
    expect(contactClientKey(request, config.CONTACT_RATE_LIMIT_SALT)).toBe(
      contactClientKey(
        new Request("http://localhost"),
        config.CONTACT_RATE_LIMIT_SALT,
      ),
    );
  });

  it("uses a secret keyed digest and does not treat other IP headers as trusted", () => {
    const key = contactClientKey(request, config.CONTACT_RATE_LIMIT_SALT);
    expect(key).not.toBe(contactClientKey(request, "different-secret"));
    expect(key).not.toBe(
      contactClientKey(
        new Request("http://localhost", {
          headers: { "x-forwarded-for": "192.0.2.1" },
        }),
        config.CONTACT_RATE_LIMIT_SALT,
      ),
    );
  });

  it.each([
    [{ result: 1 }, { result: 1 }, { result: -1 }],
    [{ result: 1 }, { error: "expiration failed" }, { result: 900 }],
    [{ result: "1" }, { result: 1 }, { result: 900 }],
    { error: "transaction failed" },
  ])("fails closed for malformed or unbounded counters", async (result) => {
    network.mockResolvedValue(Response.json(result));
    await expect(checkContactRateLimit(request, config)).rejects.toBeInstanceOf(
      RateLimitUnavailable,
    );
  });
});
