import {
  contactFieldErrors,
  contactSchema,
  type ContactResponse,
} from "@/lib/contact-schema";
import {
  getContactBackend,
  getContactConfig,
  getPhpContactConfig,
} from "@/lib/contact-config";
import {
  contactRequestId,
  storeContact,
  ContactBackendRejected,
  ContactBackendUnavailable,
} from "@/lib/contact-backend";
import { ContactDeliveryUnavailable, sendContactMail } from "@/lib/mail";
import { checkContactRateLimit, RateLimitUnavailable } from "@/lib/rate-limit";
import { apiCopy } from "@/i18n/contact-api";
import { formCopy } from "@/i18n/form";
import type { Locale } from "@/i18n/routing";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BODY_BYTES = 16 * 1024;

class BodyTooLarge extends Error {}
class InvalidBody extends Error {}

function respond(
  status: number,
  body: ContactResponse,
  extraHeaders?: Record<string, string>,
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

async function readLimitedJson(request: Request): Promise<unknown> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    if (!/^\d+$/.test(declaredLength)) throw new InvalidBody();
    if (Number(declaredLength) > MAX_BODY_BYTES) throw new BodyTooLarge();
  }
  if (!request.body) throw new InvalidBody();
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        throw new BodyTooLarge();
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text) as unknown;
  } catch (error) {
    if (error instanceof BodyTooLarge) throw error;
    throw new InvalidBody();
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request): Promise<Response> {
  // Accept-Language covers errors that occur before the JSON body can be read.
  const language = request.headers.get("accept-language")?.split(/[-,;]/)[0];
  let locale: Locale = language === "en" || language === "fr" ? language : "de";
  let t = apiCopy[locale];
  try {
    const contentType = request.headers
      .get("content-type")
      ?.split(";")[0]
      .trim()
      .toLowerCase();
    if (contentType !== "application/json") {
      return respond(400, {
        ok: false,
        message: t.json,
      });
    }
    const body = await readLimitedJson(request);
    if (body && typeof body === "object" && "locale" in body) {
      if (
        body.locale === "de" ||
        body.locale === "fr" ||
        body.locale === "en"
      ) {
        locale = body.locale;
        t = apiCopy[locale];
      }
    }
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = contactFieldErrors(parsed.error);
      if (locale !== "de") {
        for (const key of Object.keys(
          fieldErrors,
        ) as (keyof typeof fieldErrors)[]) {
          fieldErrors[key] = [formCopy[locale].errors[key]];
        }
      }
      return respond(400, {
        ok: false,
        message: t.invalid,
        fieldErrors,
      });
    }
    if (parsed.data.website) {
      return respond(429, {
        ok: false,
        message: t.blocked,
      });
    }
    const backend = getContactBackend();
    if (backend === "php") {
      const config = getPhpContactConfig();
      if (!config) return respond(503, { ok: false, message: t.unavailable });
      const id = contactRequestId.safeParse(
        request.headers.get("idempotency-key"),
      );
      if (!id.success) return respond(400, { ok: false, message: t.invalid });
      await storeContact(request, parsed.data, id.data, config);
      return respond(200, { ok: true, code: "stored", message: t.stored });
    }
    if (backend !== "legacy")
      return respond(503, { ok: false, message: t.unavailable });
    const config = getContactConfig();
    if (!config) return respond(503, { ok: false, message: t.unavailable });

    const rateLimit = await checkContactRateLimit(request, config);
    if (!rateLimit.allowed) {
      return respond(
        429,
        {
          ok: false,
          message: t.limited,
        },
        { "Retry-After": String(rateLimit.retryAfter) },
      );
    }

    await sendContactMail(parsed.data, config);
    return respond(200, {
      ok: true,
      message: t.accepted,
    });
  } catch (error) {
    if (error instanceof ContactBackendRejected) {
      return respond(
        error.status,
        { ok: false, message: error.status === 429 ? t.limited : t.failed },
        error.status === 429
          ? { "Retry-After": String(error.retryAfter) }
          : undefined,
      );
    }
    if (error instanceof ContactBackendUnavailable) {
      return respond(503, { ok: false, message: t.failed });
    }
    if (error instanceof BodyTooLarge) {
      return respond(413, {
        ok: false,
        message: t.tooLarge,
      });
    }
    if (error instanceof InvalidBody) {
      return respond(400, {
        ok: false,
        message: t.unreadable,
      });
    }
    if (error instanceof RateLimitUnavailable) {
      return respond(503, { ok: false, message: t.unavailable });
    }
    if (error instanceof ContactDeliveryUnavailable) {
      return respond(503, {
        ok: false,
        message: t.failed,
      });
    }
    return respond(500, {
      ok: false,
      message: t.unexpected,
    });
  }
}
