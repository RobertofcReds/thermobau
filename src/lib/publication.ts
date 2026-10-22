import { siteConfig } from "../config/site";

/** Une URL n'est utilisable que si le domaine validé et l'environnement concordent. */
export function getSiteUrl(): string | null {
  const domain = siteConfig.domain?.trim();
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!domain || !configuredUrl) return null;

  try {
    const official = new URL(
      domain.includes("://") ? domain : `https://${domain}`,
    );
    const configured = new URL(configuredUrl);
    const isPublicOrigin = (url: URL) =>
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash &&
      url.hostname.includes(".") &&
      !/^(?:\d{1,3}\.){3}\d{1,3}$/.test(url.hostname) &&
      !/(?:^|\.)(?:localhost|local|test|invalid)$/.test(url.hostname);

    if (!isPublicOrigin(official) || !isPublicOrigin(configured)) return null;
    return official.origin === configured.origin ? official.origin : null;
  } catch {
    return null;
  }
}

/** Le déverrouillage est volontaire et interdit dans les previews Vercel. */
export function publicationReady(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.SITE_PUBLICATION_READY === "true" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") &&
    getSiteUrl() !== null
  );
}
