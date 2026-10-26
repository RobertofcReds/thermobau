// Fresh choice for Google road/satellite; do not reuse earlier provider consent.
export const CONSENT_KEY = "thermobau-privacy-v4";
export const CONSENT_TTL = 180 * 24 * 60 * 60 * 1000;
export type Consent = { version: 4; maps: boolean; expires: number };
export function parseConsent(
  raw: string | null,
  now = Date.now(),
): Consent | null {
  try {
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) return null;
    const c = value as Partial<Consent>;
    if (
      c.version !== 4 ||
      typeof c.maps !== "boolean" ||
      typeof c.expires !== "number" ||
      !Number.isFinite(c.expires) ||
      c.expires <= now ||
      c.expires > now + CONSENT_TTL
    )
      return null;
    return c as Consent;
  } catch {
    return null;
  }
}
