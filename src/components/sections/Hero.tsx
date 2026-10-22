import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { photos } from "@/data/photos";

export function Hero() {
  return (
    <section className="home-hero">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            Räume mit neuen Möglichkeiten
          </p>
          <h1>
            Renovierung und <span>Innenausbau</span> in Ludwigshafen
          </h1>
          <p className="hero-description">
            Thermobau V&V ist Ihr Ansprechpartner für Fassadenarbeiten,
            Trockenbau, Putzarbeiten, Malerarbeiten, Fliesenarbeiten und
            Renovierungen.
          </p>
          <div className="hero-actions">
            <Button href="/kontakt">Projekt anfragen</Button>
            <Button href="/leistungen" secondary>
              Leistungen entdecken
            </Button>
          </div>
          <p className="hero-location">
            <MapPin size={16} aria-hidden="true" />
            Thermobau V&V · Ludwigshafen am Rhein
          </p>
        </div>
        <figure className="hero-visual">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 1100px, (max-width: 1439px) 1000px, 65vw"
            preload
          />
          <div className="hero-photo-note" aria-hidden="true">
            <span>Bestand neu denken.</span>
            <ArrowDown size={23} />
          </div>
          <figcaption>
            Symbolbild · Kein Referenzprojekt von Thermobau V&V
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
