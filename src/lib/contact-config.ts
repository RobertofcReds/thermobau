import "server-only";
import { z } from "zod";

const environmentSchema = z.object({
  CONTACT_FORM_ENABLED: z.literal("true"),
  CONTACT_FROM_EMAIL: z.email().max(254),
  CONTACT_RECIPIENT_EMAIL: z.email().max(254),
  MAIL_PROVIDER_API_KEY: z.string().min(1).regex(/^\S+$/),
  UPSTASH_REDIS_REST_URL: z.url().refine((value) => {
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
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).regex(/^\S+$/),
  CONTACT_RATE_LIMIT_SALT: z.string().min(32).regex(/^\S+$/),
});

export type ContactConfig = z.infer<typeof environmentSchema>;

/** Aucune configuration partielle ne peut activer l'envoi. */
export function getContactConfig(): ContactConfig | null {
  const parsed = environmentSchema.safeParse(process.env);
  return parsed.success ? parsed.data : null;
}

export function isContactFormEnabled(): boolean {
  return getContactConfig() !== null;
}
