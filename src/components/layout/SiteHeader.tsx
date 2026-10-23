import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/routing";
import { pagePath } from "@/i18n/routing";
export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="site-header">
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
    </header>
  );
}
