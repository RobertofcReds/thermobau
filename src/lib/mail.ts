import "server-only";
import nodemailer from "nodemailer";
import { services } from "@/data/services";
import { contactSchema, type ContactData } from "@/lib/contact-schema";
import type { ContactConfig } from "@/lib/contact-config";

export class ContactDeliveryUnavailable extends Error {
  constructor() {
    super("Contact delivery unavailable");
    this.name = "ContactDeliveryUnavailable";
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function wasAccepted(result: unknown, recipient: string): boolean {
  if (!result || typeof result !== "object") return false;
  if (
    !("accepted" in result) ||
    !("rejected" in result) ||
    !("response" in result)
  )
    return false;
  return (
    Array.isArray(result.accepted) &&
    result.accepted.some(
      (address: unknown) =>
        typeof address === "string" &&
        address.toLowerCase() === recipient.toLowerCase(),
    ) &&
    Array.isArray(result.rejected) &&
    result.rejected.length === 0 &&
    typeof result.response === "string" &&
    /^250(?:[ -]|$)/.test(result.response)
  );
}

/** Only resolves after the SMTP server has accepted the recipient and message. */
export async function sendContactMail(
  data: ContactData,
  config: ContactConfig,
): Promise<void> {
  let transport: ReturnType<typeof nodemailer.createTransport> | undefined;
  try {
    // Revalidate before constructing any message, including its Reply-To header.
    const contact = contactSchema.parse(data);
    if (contact.website) throw new ContactDeliveryUnavailable();
    const service = services.find((item) => item.slug === contact.service);
    const submittedAt = new Date();
    const date = new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeStyle: "long",
      timeZone: "Europe/Berlin",
    }).format(submittedAt);
    const details = [
      ["Name", contact.name],
      ["E-Mail", contact.email],
      ["Telefon", contact.phone || "Nicht angegeben"],
      ["Leistung", service?.title ?? contact.service],
      ["Formular", contact.source ?? "Kontaktformular"],
      ["Sprache", contact.locale.toUpperCase()],
      ["Eingegangen am", `${date} (Europe/Berlin)`],
    ];
    const text = [
      "Neue Kontaktanfrage – THERMOBAU V&V",
      "",
      ...details.map(([label, value]) => `${label}: ${value}`),
      "",
      "Nachricht:",
      contact.message,
      "",
      "Mit Antworten erreichen Sie direkt die anfragende Person.",
    ].join("\n");
    const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><title>Neue Kontaktanfrage</title></head>
<body style="margin:0;padding:24px;background:#f4f6f8;color:#182635;font-family:Arial,sans-serif;line-height:1.6">
<main style="max-width:640px;margin:auto;padding:28px;background:#fff;border-top:4px solid #173f69">
<p style="margin:0;color:#173f69;font-weight:bold">THERMOBAU V&amp;V</p>
<h1 style="font-size:24px;margin:12px 0 24px">Neue Kontaktanfrage</h1>
<table style="width:100%;border-collapse:collapse"><tbody>${details
      .map(
        ([label, value]) =>
          `<tr><th scope="row" style="text-align:left;vertical-align:top;padding:6px 16px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}</tbody></table>
<h2 style="font-size:18px;margin:24px 0 8px">Nachricht</h2>
<p style="white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(contact.message).replace(/\r\n|\r|\n/g, "<br>")}</p>
<p style="margin-top:28px;color:#526170;font-size:13px">Mit Antworten erreichen Sie direkt die anfragende Person.</p>
</main></body></html>`;

    transport = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      // Port 587 must upgrade to TLS; never fall back to unencrypted SMTP.
      requireTLS: !config.SMTP_SECURE,
      auth: { user: config.SMTP_USER, pass: config.SMTP_PASSWORD },
      tls: { rejectUnauthorized: true, minVersion: "TLSv1.2" },
      dnsTimeout: 10_000,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
      logger: false,
      debug: false,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    const result: unknown = await transport.sendMail({
      from: { name: "THERMOBAU V&V", address: config.MAIL_FROM },
      to: config.MAIL_TO,
      replyTo: { address: contact.email },
      envelope: { from: config.MAIL_FROM, to: [config.MAIL_TO] },
      subject: "Neue Kontaktanfrage – THERMOBAU V&V",
      date: submittedAt,
      text,
      html,
    });
    if (!wasAccepted(result, config.MAIL_TO)) {
      throw new ContactDeliveryUnavailable();
    }
  } catch {
    // SMTP errors may contain credentials or personal data: never expose or log them.
    throw new ContactDeliveryUnavailable();
  } finally {
    // A cleanup failure must not turn a confirmed acceptance into a retry.
    try {
      transport?.close();
    } catch {
      // No logging of transport internals.
    }
  }
}
