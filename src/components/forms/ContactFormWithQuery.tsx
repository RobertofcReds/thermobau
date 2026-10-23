"use client";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { ContactForm } from "./ContactForm";
export function ContactFormWithQuery({
  locale,
  enabled,
}: {
  locale: Locale;
  enabled: boolean;
}) {
  const query = useSearchParams();
  return (
    <ContactForm
      key={locale + query.get("service")}
      locale={locale}
      enabled={enabled}
      initialService={query.get("service") ?? ""}
    />
  );
}
