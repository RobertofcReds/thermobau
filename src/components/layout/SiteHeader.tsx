import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/routing";
import { pagePath } from "@/i18n/routing";
import { SmartHeader, type HeaderBehavior } from "./SmartHeader";
import { SiteSearch } from "./SiteSearch";
import { buildSearchIndex } from "@/lib/site-search-index";
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
        <SiteSearch
          key={locale}
          locale={locale}
          entries={buildSearchIndex(locale)}
        />
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
