import { Cta } from "@/components/sections/Cta";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Unsere Leistungen in Ludwigshafen",
  "Fassadenarbeiten, Trockenbau, Putzarbeiten, Malerarbeiten, Fliesenarbeiten und Renovierungen: Entdecken Sie die Leistungen von Thermobau V&V in Ludwigshafen.",
  "/leistungen",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        navKey="leistungen"
        title="Unsere Leistungen"
        eyebrow="Von der Fassade bis zum Innenraum"
        description="Sechs Tätigkeitsbereiche. Viele Möglichkeiten für Ihr Vorhaben. Entdecken Sie unsere Leistungen für Renovierung und Innenausbau in Ludwigshafen."
        image={photos.renovation}
      >
        <Button href="/kontakt">Projekt anfragen</Button>
        <Button href="#leistungsuebersicht" secondary>
          Leistungen entdecken
        </Button>
      </PageHero>
      <section className="section scroll-mt-28" id="leistungsuebersicht">
        <Container>
          <div className="section-top">
            <SectionHeading
              eyebrow="Unsere Tätigkeitsbereiche"
              title="Was möchten Sie verändern?"
            >
              <p>
                Eine neue Wandfarbe, eine andere Raumaufteilung oder eine
                überarbeitete Fassade: Hier finden Sie den passenden Einstieg.
                Auf den einzelnen Leistungsseiten erfahren Sie mehr über
                typische Arbeiten und die Vorbereitung Ihrer Anfrage.
              </p>
            </SectionHeading>
          </div>
          <ServiceGrid />
        </Container>
      </section>
      <section className="section about-section">
        <Container className="service-detail-grid">
          <Photo image={photos.plaster} />
          <div>
            <p className="eyebrow">Mehrere Arbeiten, ein Vorhaben</p>
            <h2>Die nächsten Schritte gemeinsam klären.</h2>
            <p>
              Bei einer Renovierung hängen einzelne Arbeiten oft zusammen.
              Trockenbau verändert die Raumaufteilung, Putzarbeiten bereiten
              Oberflächen vor und ein Anstrich gibt dem Raum seine neue Wirkung.
            </p>
            <p>
              Beschreiben Sie uns zunächst, was Sie verändern möchten. Gemeinsam
              lässt sich besprechen, welche unserer Tätigkeitsbereiche dazu
              passen, wie die Arbeiten zusammenhängen und welcher Umfang für Ihr
              Vorhaben vereinbart werden soll.
            </p>
            <div className="hero-actions">
              <Button href="/leistungen/renovierungen">
                Renovierungen entdecken
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Gut vorbereitet ins Gespräch"
            title="Drei Angaben für einen guten Einstieg."
          >
            <p>
              Sie brauchen noch keinen fertigen Plan. Diese Informationen
              helfen, Ihre Anfrage einzuordnen.
            </p>
          </SectionHeading>
          <ol className="process-grid process-grid-three">
            <li>
              <span className="step-number">01</span>
              <h3>Die bestehende Situation</h3>
              <p>
                Welche Räume oder Gebäudeflächen sind betroffen und in welchem
                Zustand befinden sie sich?
              </p>
            </li>
            <li>
              <span className="step-number">02</span>
              <h3>Ihre gewünschte Veränderung</h3>
              <p>
                Was soll anders werden? Nennen Sie die wichtigsten Arbeiten und
                Ihre Vorstellungen zur Gestaltung.
              </p>
            </li>
            <li>
              <span className="step-number">03</span>
              <h3>Der Rahmen Ihres Vorhabens</h3>
              <p>
                Wo befindet sich das Gebäude, wie werden die Räume genutzt und
                gibt es zeitliche Wünsche?
              </p>
            </li>
          </ol>
        </Container>
      </section>
      <Cta />
    </>
  );
}
