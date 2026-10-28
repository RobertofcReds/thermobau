import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/routing";
import { pagePath } from "@/i18n/routing";
import { SmartHeader, type HeaderBehavior } from "./SmartHeader";
export function SiteHeader({
  locale,
  headerBehavior = "show-on-scroll-down",
}: {
  locale: Locale;
  headerBehavior?: HeaderBehavior;
}) {
  return (
    <SmartHeader headerBehavior={headerBehavior}>
      <Container className="header-main">
        <Logo locale={locale} />
        <DesktopNav locale={locale} />
        <LanguageSwitcher />
        <div className="header-cta">
          <Button href={pagePath("contact", locale)}>
            {locale === "de"
              ? "Angebot anfragen"
              : locale === "en"
                ? "Request a quote"
                : "Demander un devis"}
          </Button>
        </div>
        <MobileNav locale={locale} />
      </Container>
    </SmartHeader>
  );
}
