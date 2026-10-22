import "server-only";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import type { ContactConfig } from "@/lib/contact-config";

const LIMIT = 5;
const WINDOW_SECONDS = 15 * 60;

export class RateLimitUnavailable extends Error {
  constructor() {
    super("Rate limiting unavailable");
    this.name = "RateLimitUnavailable";
  }
}

/** Hors Vercel, un compartiment partagé évite de faire confiance aux headers du client. */
export function contactClientKey(request: Request, salt: string): string {
  const forwarded =
    process.env.VERCEL === "1"
      ? request.headers.get("x-vercel-forwarded-for")
      : null;
  const candidate = forwarded?.split(",")[0]?.trim() ?? "";
  const identity = isIP(candidate) ? candidate : "shared-unidentified-client";
  return `thermobau:contact:${createHmac("sha256", salt).update(identity).digest("hex")}`;
}

export async function checkContactRateLimit(
  request: Request,
  config: ContactConfig,
): Promise<{ allowed: boolean; retryAfter: number }> {
  const key = contactClientKey(request, config.CONTACT_RATE_LIMIT_SALT);
  try {
    // La transaction est atomique entre toutes les instances. NX préserve le délai initial.
    const response = await fetch(
      `${config.UPSTASH_REDIS_REST_URL.replace(/\/$/, "")}/multi-exec`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.UPSTASH_REDIS_REST_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, WINDOW_SECONDS, "NX"],
          ["TTL", key],
        ]),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(5_000),
      },
    );
    if (!response.ok) throw new RateLimitUnavailable();
    const result: unknown = await response.json();
    if (
      !Array.isArray(result) ||
      result.length !== 3 ||
      result.some(
        (item) =>
          !item ||
          typeof item !== "object" ||
          "error" in item ||
          !Number.isSafeInteger(item.result),
      )
    )
      throw new RateLimitUnavailable();

    const count = result[0].result as number;
    const expirationSet = result[1].result as number;
    const ttl = result[2].result as number;
    if (
      count < 1 ||
      ![0, 1].includes(expirationSet) ||
      ttl < 0 ||
      ttl > WINDOW_SECONDS
    ) {
      throw new RateLimitUnavailable();
    }
    return { allowed: count <= LIMIT, retryAfter: Math.max(1, ttl) };
  } catch {
    throw new RateLimitUnavailable();
  }
}
