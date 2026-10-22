import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/data/photos";

export function About() {
  return (
    <section className="section about-section">
      <Container className="about-grid">
        <Photo image={photos.renovation} className="about-photo" />
        <div className="about-copy">
          <p className="eyebrow">Thermobau V&V</p>
          <h2>
            Ihr Vorhaben.
            <br />
            Unsere Tätigkeitsbereiche.
          </h2>
          <p className="lead">
            Neue Oberflächen, eine andere Raumaufteilung oder die Renovierung
            bestehender Räume: Jede Veränderung beginnt mit Ihrer Idee.
          </p>
          <p>
            Wir sind Ihr Ansprechpartner für Arbeiten an Fassaden und im
            Innenbereich. Gemeinsam besprechen wir, welche unserer sechs
            Leistungen zu Ihrem Vorhaben passen und welche Schritte dafür
            erforderlich sind.
          </p>
          <p className="about-location">
            <MapPin size={19} aria-hidden="true" />
            In Ludwigshafen am Rhein
          </p>
          <Button href="/ueber-uns" secondary>
            Mehr über uns
          </Button>
        </div>
      </Container>
    </section>
  );
}
