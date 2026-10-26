"use client";

import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Location } from "@/components/sections/Location";

export function FooterLocation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  if (pathname !== "/" && pathname !== "/kontakt") return null;
  return <Location locale={locale} />;
}
