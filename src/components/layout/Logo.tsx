import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo ${footer ? "logo-footer" : ""}`}
      aria-label={`${siteConfig.name} – zur Startseite`}
    >
      <Image
        src={siteConfig.logoPath}
        alt={`${siteConfig.name} – Hausdach mit zwei blauen Wellen`}
        width={1254}
        height={1254}
        loading={footer ? "lazy" : "eager"}
        sizes="(max-width: 767px) 112px, 144px"
      />
    </Link>
  );
}
