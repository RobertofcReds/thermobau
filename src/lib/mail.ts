import "server-only";
import { services } from "@/data/services";
import type { ContactData } from "@/lib/contact-schema";
import type { ContactConfig } from "@/lib/contact-config";

export class ContactDeliveryUnavailable extends Error {
  constructor() {
    super("Contact delivery unavailable");
    this.name = "ContactDeliveryUnavailable";
  }
}

/** Adaptateur Resend désactivé tant que la configuration complète manque. */
export async function sendContactMail(
  data: ContactData,
  config: ContactConfig,
): Promise<void> {
  const service = services.find((item) => item.slug === data.service);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.MAIL_PROVIDER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.CONTACT_FROM_EMAIL,
        to: [config.CONTACT_RECIPIENT_EMAIL],
        subject: "Neue Projektanfrage über die Website – Thermobau V&V",
        // Les coordonnées du visiteur restent dans le corps texte, jamais dans les en-têtes.
        text: [
          `Name: ${data.name}`,
          `E-Mail: ${data.email}`,
          `Telefon: ${data.phone || "Nicht angegeben"}`,
          `Leistung: ${service?.title ?? data.service}`,
          "",
          "Nachricht:",
          data.message,
        ].join("\n"),
      }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) throw new ContactDeliveryUnavailable();
    const result: unknown = await response.json();
    if (
      !result ||
      typeof result !== "object" ||
      !("id" in result) ||
      typeof result.id !== "string" ||
      !result.id.trim() ||
      "error" in result
    ) {
      throw new ContactDeliveryUnavailable();
    }
  } catch {
    // Ne pas propager de message du fournisseur : il peut contenir des données sensibles.
    throw new ContactDeliveryUnavailable();
  }
}
