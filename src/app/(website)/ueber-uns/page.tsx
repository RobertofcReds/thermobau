import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Cta } from "@/components/sections/Cta";
import { PageHero } from "@/components/sections/PageHero";
import { Location } from "@/components/sections/Location";
import { Process } from "@/components/sections/Process";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/data/photos";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Über Thermobau V&V",
  "Thermobau V&V in Ludwigshafen: Lernen Sie unsere Tätigkeitsbereiche rund um Renovierung, Fassaden und Innenausbau sowie unseren Ansatz für Ihre Projektbesprechung kennen.",
  "/ueber-uns",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        navKey="ueber-uns"
        title="Über Thermobau V&V"
        eyebrow="Räume verändern. Gemeinsam planen."
        description="Wir beschäftigen uns mit dem, was aus Bestehendem werden kann. Mit Arbeiten an Fassaden, Wänden, Decken und Böden in Ludwigshafen."
        image={photos.renovation}
      >
        <Button href="/kontakt">Projekt anfragen</Button>
      </PageHero>
      <section className="section">
        <Container className="editorial-grid">
          <div>
            <p className="eyebrow">Das Unternehmen</p>
            <h2>Ein Ansprechpartner für Ihr Vorhaben.</h2>
            <p className="lead">
              {siteConfig.name} bietet Leistungen rund um Renovierung und
              Innenausbau in {siteConfig.address.city}. Ihr Ansprechpartner ist{" "}
              {siteConfig.contactName}.
            </p>
            <p>
              Vielleicht möchten Sie die Wirkung eines Raumes verändern, eine
              Wand überarbeiten oder die Fassade Ihres Gebäudes renovieren. Wir
              besprechen mit Ihnen die vorhandene Situation und die Arbeiten,
              die Sie sich vorstellen.
            </p>
            <p>
              Dabei geht es zuerst um Ihr Vorhaben: Was soll bleiben, was soll
              sich verändern und welche Flächen sind betroffen? Daraus lässt
              sich gemeinsam ein konkreter Leistungsumfang entwickeln.
            </p>
          </div>
          <Photo image={photos.plaster} />
        </Container>
      </section>
      <section className="section about-section">
        <Container className="editorial-grid">
          <div>
            <p className="eyebrow">Unsere Tätigkeitsbereiche</p>
            <h2>Von der Fassade bis zum Innenraum.</h2>
            <p>
              Unsere sechs Leistungsbereiche decken unterschiedliche Arbeiten am
              bestehenden Gebäude ab. Welche Leistungen für Ihr Projekt infrage
              kommen, stimmen wir im persönlichen Gespräch ab.
            </p>
          </div>
          <div className="about-services">
            {services.map((service) => (
              <Link href={`/leistungen/${service.slug}`} key={service.slug}>
                <span>{service.title}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container className="about-grid">
          <Photo image={photos.painting} />
          <div className="about-copy">
            <p className="eyebrow">Ihre Idee im Mittelpunkt</p>
            <h2>So besprechen wir Ihr Projekt</h2>
            <p className="lead">
              Sie müssen noch nicht auf jede Frage eine Antwort haben.
            </p>
            <p>
              Eine Beschreibung der Räume oder Flächen, der vorhandenen
              Materialien und Ihrer Wünsche reicht für den Einstieg. Wenn
              mehrere Arbeiten zusammenkommen, können Sie Ihre Prioritäten
              nennen.
            </p>
            <p>
              Danach lassen sich offene Fragen zur Vorbereitung, zur gewünschten
              Ausführung und zum Ablauf ordnen. Umfang und mögliche Termine
              werden für Ihr konkretes Vorhaben besprochen.
            </p>
            <div className="hero-actions">
              <Button href="/kontakt" secondary>
                Vorhaben besprechen
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <Process />
      <Location />
      <Cta />
    </>
  );
}
