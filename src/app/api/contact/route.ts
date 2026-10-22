import {
  contactFieldErrors,
  contactSchema,
  type ContactResponse,
} from "@/lib/contact-schema";
import { getContactConfig } from "@/lib/contact-config";
import { ContactDeliveryUnavailable, sendContactMail } from "@/lib/mail";
import { checkContactRateLimit, RateLimitUnavailable } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const unavailableMessage =
  "Der Versand ist derzeit nicht verfügbar. Ihre Nachricht wurde nicht gesendet.";

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
  try {
    const contentType = request.headers
      .get("content-type")
      ?.split(";")[0]
      .trim()
      .toLowerCase();
    if (contentType !== "application/json") {
      return respond(400, {
        ok: false,
        message: "Bitte übermitteln Sie die Anfrage als JSON.",
      });
    }
    const parsed = contactSchema.safeParse(await readLimitedJson(request));
    if (!parsed.success) {
      return respond(400, {
        ok: false,
        message: "Bitte prüfen Sie die markierten Eingaben.",
        fieldErrors: contactFieldErrors(parsed.error),
      });
    }
    if (parsed.data.website) {
      return respond(429, {
        ok: false,
        message: "Die Anfrage konnte nicht verarbeitet werden.",
      });
    }
    const config = getContactConfig();
    if (!config)
      return respond(503, { ok: false, message: unavailableMessage });

    const rateLimit = await checkContactRateLimit(request, config);
    if (!rateLimit.allowed) {
      return respond(
        429,
        {
          ok: false,
          message: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
        },
        { "Retry-After": String(rateLimit.retryAfter) },
      );
    }

    await sendContactMail(parsed.data, config);
    return respond(200, {
      ok: true,
      message:
        "Vielen Dank. Ihre Nachricht wurde vom E-Mail-Dienst zur Übermittlung angenommen.",
    });
  } catch (error) {
    if (error instanceof BodyTooLarge) {
      return respond(413, {
        ok: false,
        message: "Die Anfrage ist zu groß. Bitte kürzen Sie Ihre Eingaben.",
      });
    }
    if (error instanceof InvalidBody) {
      return respond(400, {
        ok: false,
        message:
          "Die Anfrage konnte nicht gelesen werden. Bitte prüfen Sie Ihre Eingaben.",
      });
    }
    if (error instanceof RateLimitUnavailable) {
      return respond(503, { ok: false, message: unavailableMessage });
    }
    if (error instanceof ContactDeliveryUnavailable) {
      return respond(503, {
        ok: false,
        message:
          "Die Übermittlung konnte nicht bestätigt werden. Bitte versuchen Sie es später erneut.",
      });
    }
    return respond(500, {
      ok: false,
      message:
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    });
  }
}
