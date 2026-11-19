import { z } from "zod";
import { serviceSlugs } from "@/data/service-identifiers";

const hasControlCharacters = (value: string, multiline = false) =>
  [...value].some((character) => {
    const code = character.charCodeAt(0);
    return (
      (code < 32 || code === 127) && !(multiline && [9, 10, 13].includes(code))
    );
  });

function plainText(multiline = false) {
  return z
    .string({ error: "Bitte füllen Sie dieses Feld aus." })
    .refine((value) => !hasControlCharacters(value, multiline), {
      error: "Bitte verwenden Sie nur lesbaren Text ohne Steuerzeichen.",
    })
    .refine((value) => !/[<>]/.test(value), {
      error: "Bitte geben Sie einfachen Text ohne HTML-Zeichen ein.",
    })
    .transform((value) => value.trim());
}

export const contactSchema = z.strictObject({
  name: plainText().pipe(
    z
      .string()
      .min(2, "Bitte geben Sie mindestens 2 Zeichen ein.")
      .max(100, "Bitte verwenden Sie höchstens 100 Zeichen."),
  ),
  email: plainText()
    .pipe(
      z
        .email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." })
        .max(254, "Die E-Mail-Adresse ist zu lang."),
    )
    .transform((email) => {
      const separator = email.lastIndexOf("@");
      return (
        email.slice(0, separator + 1) + email.slice(separator + 1).toLowerCase()
      );
    }),
  phone: plainText()
    .pipe(z.string().max(30, "Bitte verwenden Sie höchstens 30 Zeichen."))
    .optional()
    .default(""),
  service: z.enum(serviceSlugs, {
    error: "Bitte wählen Sie eine Leistung aus.",
  }),
  message: plainText(true).pipe(
    z
      .string()
      .min(20, "Bitte beschreiben Sie Ihr Vorhaben mit mindestens 20 Zeichen.")
      .max(3000, "Bitte verwenden Sie höchstens 3000 Zeichen."),
  ),
  website: z
    .string({ error: "Bitte lassen Sie dieses Feld leer." })
    .max(200, "Bitte lassen Sie dieses Feld leer.")
    .optional()
    .default(""),
  locale: z.enum(["de", "en", "fr"]).default("de"),
  // Only the local page path, never query parameters or a visitor-provided URL.
  source: z
    .string()
    .max(200)
    .regex(/^\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]*$/)
    .optional(),
});

export type ContactData = z.infer<typeof contactSchema>;
export type ContactFieldErrors = Partial<
  Record<Exclude<keyof ContactData, "locale" | "source">, string[]>
>;

export interface ContactResponse {
  ok: boolean;
  code?: "stored";
  message: string;
  fieldErrors?: ContactFieldErrors;
}

export function contactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      field !== "locale" &&
      field !== "source" &&
      field in contactSchema.shape
    ) {
      const key = field as keyof ContactFieldErrors;
      (errors[key] ??= []).push(issue.message);
    }
  }
  return errors;
}
