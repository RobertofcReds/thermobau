import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";
export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="header-main">
        <Logo />
        <DesktopNav />
        <div className="header-cta">
          <Button href="/kontakt">Angebot anfragen</Button>
        </div>
        <MobileNav />
      </Container>
    </header>
  );
}
