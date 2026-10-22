import { Check, ClipboardList, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { ContactForm } from "@/components/forms/ContactForm";
import { isContactFormEnabled } from "@/lib/contact-config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Kontakt und Projektanfrage",
  "Planen Sie Renovierungsarbeiten in Ludwigshafen? Hier finden Sie Ansprechpartner, Anschrift und das Kontaktformular von Thermobau V&V – derzeit im Demomodus.",
  "/kontakt",
);
export const dynamic = "force-dynamic";
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const enabled = isContactFormEnabled();
  return (
    <>
      <PageHero
        navKey="kontakt"
        eyebrow="Ihr Vorhaben beginnt hier"
        title="Sprechen wir über Ihr Vorhaben."
        description="Eine neue Raumaufteilung, frische Oberflächen oder eine Renovierung: Beschreiben Sie, was Sie verändern möchten."
      />
      <section className="section">
        <Container className="contact-layout">
          <aside className="contact-sidebar">
            <div className="contact-address-card">
              <p className="eyebrow">Persönlicher Kontakt</p>
              <h2>
                Thermobau V&V
                <br />
                in Ludwigshafen.
              </h2>
              <ContactDetails />
              <p className="small-text">
                Weitere Einsatzorte können individuell angefragt werden.
              </p>
            </div>
            <div className="contact-checklist">
              <ClipboardList size={25} aria-hidden="true" />
              <h3>Das hilft bei der ersten Abstimmung</h3>
              <ul>
                {[
                  "Welche Arbeiten sind geplant?",
                  "Welche Räume oder Flächen sind betroffen?",
                  "Was soll sich durch die Arbeiten verändern?",
                ].map((item) => (
                  <li key={item}>
                    <Check size={17} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {!enabled && (
              <p className="small-text">
                Der Formularversand ist noch nicht freigeschaltet. Sie können
                die Eingaben bereits ausprobieren; eine Anfrage erreicht uns
                damit noch nicht.
              </p>
            )}
          </aside>
          <ContactForm
            enabled={enabled}
            initialService={
              typeof params.service === "string" ? params.service : undefined
            }
          />
        </Container>
      </section>
      <section className="section section-soft">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Von der Idee zur Abstimmung</p>
            <h2>Was bei einer Anfrage besprochen wird</h2>
          </div>
          <ol className="contact-steps">
            <li>
              <span className="step-number" aria-hidden="true">
                01
              </span>
              <h3>Vorhaben beschreiben</h3>
              <p>
                Die gewünschten Arbeiten und die Ausgangssituation bilden den
                Anfang.
              </p>
            </li>
            <li>
              <span className="step-number" aria-hidden="true">
                02
              </span>
              <h3>Details klären</h3>
              <p>
                Umfang, Materialien und offene Fragen werden im persönlichen
                Gespräch eingeordnet.
              </p>
            </li>
            <li>
              <span className="step-number" aria-hidden="true">
                03
              </span>
              <h3>Nächste Schritte abstimmen</h3>
              <p>
                Ein mögliches Angebot und die weitere Umsetzung werden für Ihr
                Vorhaben geklärt.
              </p>
            </li>
          </ol>
          <p className="contact-location-note">
            <MapPin size={18} aria-hidden="true" />
            Thermobau V&V · Ludwigshafen am Rhein
          </p>
        </Container>
      </section>
    </>
  );
}
