import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Location() {
  return (
    <section className="section location-section">
      <Container className="location-grid">
        <div>
          <p className="eyebrow">Hier sind wir zu Hause</p>
          <h2>
            Thermobau V&V
            <br />
            in Ludwigshafen
          </h2>
          <p>
            Ihr Vorhaben beginnt mit einem Gespräch. Weitere Einsatzorte können
            individuell angefragt werden.
          </p>
          <Link href="/kontakt" className="text-link">
            Ihr Vorhaben besprechen{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="location-address">
          <MapPin size={30} aria-hidden="true" />
          <div>
            <span className="eyebrow">Ludwigshafen am Rhein</span>
            <address>
              <strong>{siteConfig.name}</strong>
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              Deutschland
            </address>
          </div>
        </div>
      </Container>
    </section>
  );
}
