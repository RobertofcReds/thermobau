import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Cta } from "@/components/sections/Cta";
import { Approach } from "@/components/sections/Approach";
import { Location } from "@/components/sections/Location";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Renovierung & Innenausbau in Ludwigshafen",
  "Thermobau V&V in Ludwigshafen: Entdecken Sie Fassadenarbeiten, Trockenbau, Putz, Malerarbeiten, Fliesen und Renovierungen für Ihr Vorhaben.",
  "/",
);
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="trade-strip">
        <Container>
          {services.map((service) => (
            <Link key={service.slug} href={`/leistungen/${service.slug}`}>
              <Plus size={13} aria-hidden="true" />
              {service.title}
            </Link>
          ))}
        </Container>
      </div>
      <section className="section">
        <Container>
          <div className="section-top">
            <SectionHeading
              eyebrow="Unsere Tätigkeitsbereiche"
              title="Unsere Leistungen im Überblick"
            >
              <p>
                Ob einzelne Oberfläche oder mehrere Räume: Hier finden Sie den
                passenden Arbeitsbereich für Ihre Idee.
              </p>
            </SectionHeading>
            <Link className="text-link" href="/leistungen">
              Alle Leistungen
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <ServiceGrid />
        </Container>
      </section>
      <About />
      <Approach />
      <Process />
      <section className="section gallery-section">
        <Container>
          <div className="section-top">
            <SectionHeading
              eyebrow="Material & Raum"
              title="Einblicke in unsere Tätigkeitsbereiche"
            >
              <p>
                Fassaden, Räume und Oberflächen — entdecken Sie die Vielfalt
                unserer Arbeitsbereiche.
              </p>
            </SectionHeading>
            <Link href="/referenzen" className="text-link">
              Alle Einblicke
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <Gallery />
        </Container>
      </section>
      <Location />
      <Cta />
    </>
  );
}
