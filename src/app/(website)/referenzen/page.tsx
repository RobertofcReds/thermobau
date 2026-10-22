import { Cta } from "@/components/sections/Cta";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Einblicke in unsere Tätigkeitsbereiche",
  "Fassaden, Trockenbau, Putz, Farbe, Fliesen und Renovierung im Bild: eine fotografische Übersicht der Tätigkeitsbereiche von Thermobau V&V mit gekennzeichneten Symbolbildern.",
  "/referenzen",
);

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        navKey="referenzen"
        title="Einblicke in unsere Tätigkeitsbereiche"
        eyebrow="Material. Handwerk. Raum."
        description="Von der Vorbereitung bis zur fertigen Oberfläche: Fotografische Beispiele machen unsere sechs Leistungsbereiche anschaulich."
      />
      <section className="section">
        <Container>
          <Gallery />
        </Container>
      </section>
      <Cta />
    </>
  );
}
