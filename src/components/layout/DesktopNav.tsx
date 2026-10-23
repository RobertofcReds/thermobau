"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedNavigation, type Locale } from "@/i18n/routing";

export function DesktopNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <nav
      className="desktop-navigation"
      aria-label={
        locale === "de"
          ? "Hauptnavigation"
          : locale === "en"
            ? "Main navigation"
            : "Navigation principale"
      }
    >
      {localizedNavigation[locale].map(([label, href]) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href ||
            (href !== localizedNavigation[locale][0][1] &&
              pathname.startsWith(`${href}/`))
              ? "page"
              : undefined
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
