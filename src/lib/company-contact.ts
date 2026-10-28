import { z } from "zod";
import type { SiteConfig } from "@/types/content";

export type SocialPlatform = keyof SiteConfig["social"];
export type ContactChannel = { href: string; label: string };

/** Configurer les numéros avec leur indicatif international, sans extension. */
export function internationalPhone(value: string | null): string | null {
  const input = value?.trim();
  if (!input || !/^(?:\+|00)[\d\s().-]+$/.test(input)) return null;
  const normalized = input
    .replace(/^00/, "+")
    .replace(/\(0\)/g, "")
    .replace(/[\s().-]/g, "");
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}

export function contactChannels(
  config: Pick<SiteConfig, "phone" | "email" | "whatsapp">,
): Record<"phone" | "email" | "whatsapp", ContactChannel | null> {
  const phone = internationalPhone(config.phone);
  const whatsapp = internationalPhone(config.whatsapp);
  const email = z.email().max(254).safeParse(config.email?.trim());
  return {
    phone: phone ? { href: `tel:${phone}`, label: config.phone!.trim() } : null,
    email: email.success
      ? {
          href: `mailto:${encodeURIComponent(email.data).replace("%40", "@")}`,
          label: email.data,
        }
      : null,
    whatsapp: whatsapp
      ? { href: `https://wa.me/${whatsapp.slice(1)}`, label: "WhatsApp" }
      : null,
  };
}

const socialHosts: Record<SocialPlatform, readonly string[]> = {
  facebook: ["facebook.com", "www.facebook.com", "m.facebook.com"],
  instagram: ["instagram.com", "www.instagram.com"],
  linkedin: ["linkedin.com", "www.linkedin.com"],
  youtube: ["youtube.com", "www.youtube.com"],
};

/** Une validation technique ne remplace pas la confirmation du profil par le client. */
export function socialProfileUrl(
  platform: SocialPlatform,
  value: string | null,
): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      !socialHosts[platform].includes(url.hostname) ||
      url.username ||
      url.password ||
      url.port ||
      url.hash ||
      !/^\/[\w@%.-][\w@%./-]*\/?$/.test(url.pathname) ||
      /\/(?:login|signin|share|sharer|sharer\.php|l\.php|dialog|intent)(?:\/|$)/i.test(
        url.pathname,
      )
    )
      return null;
    // Facebook utilise aussi des profils numériques officiels.
    if (
      url.search &&
      !(
        platform === "facebook" &&
        url.pathname === "/profile.php" &&
        /^\?id=\d+$/.test(url.search)
      )
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}
