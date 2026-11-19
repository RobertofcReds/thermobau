import "server-only";
import { z } from "zod";

const environmentSchema = z
  .object({
    CONTACT_FORM_ENABLED: z.literal("true"),
    SMTP_HOST: z
      .string()
      .max(253)
      .regex(
        /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/,
      ),
    SMTP_PORT: z.enum(["465", "587"]).transform(Number),
    SMTP_SECURE: z
      .enum(["true", "false"])
      .transform((value) => value === "true"),
    SMTP_USER: z
      .string()
      .min(1)
      .max(254)
      .regex(/^[^\s\x00-\x1f\x7f]+$/),
    // Preserve the exact password: never trim, log or expose it to client components.
    SMTP_PASSWORD: z.string().min(1).max(1024),
    MAIL_FROM: z.email().max(254),
    MAIL_TO: z.email().max(254),
    UPSTASH_REDIS_REST_KV_REST_API_URL: z.url().refine((value) => {
      try {
        const url = new URL(value);
        return (
          url.protocol === "https:" &&
          url.hostname.endsWith(".upstash.io") &&
          !url.username &&
          !url.password &&
          !url.port &&
          !url.search &&
          !url.hash &&
          url.pathname === "/"
        );
      } catch {
        return false;
      }
    }),
    UPSTASH_REDIS_REST_KV_REST_API_TOKEN: z.string().min(1).regex(/^\S+$/),
  })
  .refine((config) => config.SMTP_SECURE === (config.SMTP_PORT === 465));

export type ContactConfig = z.infer<typeof environmentSchema>;

/** Aucune configuration partielle ne peut activer l'envoi. */
export function getContactConfig(): ContactConfig | null {
  const parsed = environmentSchema.safeParse(process.env);
  return parsed.success ? parsed.data : null;
}

export function isContactFormEnabled(): boolean {
  const backend = getContactBackend();
  return backend === "php"
    ? getPhpContactConfig() !== null
    : backend === "legacy" && getContactConfig() !== null;
}

/** Missing selector preserves the existing SMTP/Upstash deployment. */
export function getContactBackend(): "legacy" | "php" | null {
  const value = process.env.CONTACT_BACKEND ?? "legacy";
  return value === "legacy" || value === "php" ? value : null;
}

const phpEnvironmentSchema = z
  .object({
    CONTACT_FORM_ENABLED: z.literal("true"),
    // Only the dedicated HTTPS endpoint is allowed. No arbitrary fetch destination.
    CONTACT_API_URL: z.literal("https://api.thermobau-vv.de/v1/contact.php"),
    CONTACT_API_KEY_ID: z.string().regex(/^[A-Za-z0-9_-]{1,32}$/),
    CONTACT_API_SECRET: z.string().regex(/^[a-f0-9]{64}$/),
    CONTACT_ABUSE_HASH_SECRET: z.string().regex(/^[a-f0-9]{64}$/),
    CONTACT_API_TIMEOUT_MS: z
      .string()
      .regex(/^\d+$/)
      .default("8000")
      .transform(Number)
      .pipe(z.number().int().min(1000).max(15000)),
  })
  .refine(
    (config) => config.CONTACT_API_SECRET !== config.CONTACT_ABUSE_HASH_SECRET,
  );

export type PhpContactConfig = z.infer<typeof phpEnvironmentSchema>;

export function getPhpContactConfig(): PhpContactConfig | null {
  const parsed = phpEnvironmentSchema.safeParse(process.env);
  return parsed.success ? parsed.data : null;
}
