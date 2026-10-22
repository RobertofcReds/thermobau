import Link from "next/link";
import { services } from "@/data/services";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ContactDetails } from "./ContactDetails";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo footer />
            <p>
              Arbeiten rund um Renovierung und Innenausbau in{" "}
              {siteConfig.address.city}.
            </p>
          </div>
          <div>
            <h2>Entdecken</h2>
            <nav aria-label="Navigation im Fußbereich">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>Leistungen</h2>
            <nav aria-label="Leistungen im Fußbereich">
              {services.map((service) => (
                <Link key={service.slug} href={`/leistungen/${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>Kontakt</h2>
            <ContactDetails />
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <div>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
          <span>Renovierung mit Perspektive.</span>
        </div>
      </Container>
    </footer>
  );
}
