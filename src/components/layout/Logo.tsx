import Image from "next/image";
import Link from "next/link";
import { pagePath, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
export function Logo({
  footer = false,
  locale = "de",
}: {
  footer?: boolean;
  locale?: Locale;
}) {
  return (
    <Link
      href={pagePath("home", locale)}
      className={`logo ${footer ? "logo-footer" : ""}`}
      aria-label={`${siteConfig.name} – ${locale === "de" ? "zur Startseite" : locale === "en" ? "home" : "accueil"}`}
    >
      <Image
        src={siteConfig.logoPath}
        alt={siteConfig.name}
        width={1254}
        height={1254}
        loading={footer ? "lazy" : "eager"}
        sizes="(max-width: 767px) 112px, 144px"
      />
    </Link>
  );
}
