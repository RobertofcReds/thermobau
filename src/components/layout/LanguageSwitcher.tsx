"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
import { useTransition, type MouseEvent } from "react";
import { locales, type Locale } from "@/i18n/routing";
export function LanguageSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  function change(event: MouseEvent<HTMLAnchorElement>, locale: Locale) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    if (locale === active || pending) return;
    const query: Record<string, string | string[]> = {};
    for (const [key, value] of new URLSearchParams(window.location.search)) {
      const previous = query[key];
      query[key] =
        previous === undefined
          ? value
          : Array.isArray(previous)
            ? [...previous, value]
            : [previous, value];
    }
    startTransition(() =>
      router.replace(
        getPathname({ locale, href: { pathname, query } }) +
          window.location.hash,
        { scroll: false },
      ),
    );
  }
  return (
    <nav
      className="language-switcher"
      aria-label="Language / Sprache / Langue"
      aria-busy={pending}
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getPathname({ locale, href: pathname })}
          lang={locale}
          hrefLang={locale}
          aria-current={active === locale ? "page" : undefined}
          onClick={(e) => change(e, locale)}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
