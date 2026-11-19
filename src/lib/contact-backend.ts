import "server-only";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { z } from "zod";
import type { ContactData } from "./contact-schema";
import type { PhpContactConfig } from "./contact-config";

export const contactRequestId = z
  .string()
  .regex(
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/,
  );

export class ContactBackendUnavailable extends Error {
  constructor() {
    super("Contact backend unavailable");
  }
}

export class ContactBackendRejected extends Error {
  constructor(
    public readonly status: 400 | 409 | 429,
    public readonly retryAfter = 3600,
  ) {
    super("Contact backend rejected request");
  }
}

export function contactClientHash(request: Request, secret: string): string {
  const candidate =
    process.env.VERCEL === "1"
      ? (request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
        "")
      : "";
  // Normalize equivalent IPv6 spellings before hashing. Never trust ordinary XFF.
  const version = isIP(candidate);
  const identity =
    version === 6
      ? new URL(`http://[${candidate}]/`).hostname
      : version === 4
        ? candidate
        : "shared-unidentified-client";
  return createHmac("sha256", Buffer.from(secret, "hex"))
    .update(`thermobau:contact:ip:v1\n${identity}`)
    .digest("hex");
}

export function signedContactHeaders(
  body: string,
  config: PhpContactConfig,
  timestamp = String(Math.floor(Date.now() / 1000)),
  nonce = randomBytes(16).toString("hex"),
): Record<string, string> {
  const url = new URL(config.CONTACT_API_URL);
  const canonical = [
    "thermobau-contact-v1",
    config.CONTACT_API_KEY_ID,
    url.host,
    "POST",
    url.pathname,
    timestamp,
    nonce,
    createHash("sha256").update(body).digest("hex"),
  ].join("\n");
  return {
    "Content-Type": "application/json",
    "X-Thermobau-Key-Id": config.CONTACT_API_KEY_ID,
    "X-Thermobau-Timestamp": timestamp,
    "X-Thermobau-Nonce": nonce,
    "X-Thermobau-Signature": createHmac(
      "sha256",
      Buffer.from(config.CONTACT_API_SECRET, "hex"),
    )
      .update(canonical)
      .digest("hex"),
  };
}

async function readResponse(response: Response): Promise<unknown> {
  if (
    response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
      "application/json" ||
    !response.body
  ) {
    throw new ContactBackendUnavailable();
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 4096) {
        await reader.cancel().catch(() => {});
        throw new ContactBackendUnavailable();
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode()) as unknown;
  } finally {
    reader.releaseLock();
  }
}

const storedResponse = z.strictObject({
  ok: z.literal(true),
  code: z.literal("stored"),
  requestId: contactRequestId,
});
const errorResponse = z.strictObject({
  ok: z.literal(false),
  code: z.enum([
    "invalid",
    "blocked",
    "limited",
    "unauthorized",
    "conflict",
    "unavailable",
  ]),
});

export async function storeContact(
  request: Request,
  contact: ContactData,
  requestId: string,
  config: PhpContactConfig,
): Promise<void> {
  try {
    const body = JSON.stringify({
      requestId: contactRequestId.parse(requestId),
      clientHash: contactClientHash(request, config.CONTACT_ABUSE_HASH_SECRET),
      contact,
    });
    if (Buffer.byteLength(body, "utf8") > 16 * 1024)
      throw new ContactBackendRejected(400);
    const response = await fetch(config.CONTACT_API_URL, {
      method: "POST",
      headers: signedContactHeaders(body, config),
      body,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(config.CONTACT_API_TIMEOUT_MS),
    });
    const data = await readResponse(response);
    const stored = storedResponse.safeParse(data);
    if (
      [200, 201].includes(response.status) &&
      stored.success &&
      stored.data.requestId === requestId
    )
      return;
    const rejected = errorResponse.safeParse(data);
    if (rejected.success) {
      if (
        response.status === 429 &&
        ["limited", "blocked"].includes(rejected.data.code)
      ) {
        const header = response.headers.get("retry-after") ?? "3600";
        const seconds = /^\d{1,6}$/.test(header) ? Number(header) : 3600;
        throw new ContactBackendRejected(
          429,
          Math.min(86400, Math.max(1, seconds)),
        );
      }
      if (response.status === 409 && rejected.data.code === "conflict")
        throw new ContactBackendRejected(409);
      if (response.status === 400 && rejected.data.code === "invalid")
        throw new ContactBackendRejected(400);
    }
    throw new ContactBackendUnavailable();
  } catch (error) {
    if (error instanceof ContactBackendRejected) throw error;
    // No upstream body, URL, credentials or original error reaches logs/the browser.
    throw new ContactBackendUnavailable();
  }
}
