import {
  MessagesSquare,
  Layers3,
  ListChecks,
  UserRound,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    icon: MessagesSquare,
    title: "Individuelle Projektbesprechung",
    text: "Ihre Räume, Ihre Wünsche und die vorhandene Situation bilden den Ausgangspunkt.",
  },
  {
    icon: Layers3,
    title: "Passende Leistungen",
    text: "Wir ordnen Ihr Vorhaben den passenden Tätigkeitsbereichen zu.",
  },
  {
    icon: ListChecks,
    title: "Klare Abstimmung",
    text: "Umfang, Voraussetzungen und nächste Schritte werden miteinander besprochen.",
  },
  {
    icon: UserRound,
    title: "Persönlicher Kontakt",
    text: "Mit Ihren Fragen wenden Sie sich an Vasil Velikov Dimitrov.",
  },
  {
    icon: MapPin,
    title: "Standort Ludwigshafen",
    text: "Unser Standort liegt in der Blücherstraße in Ludwigshafen am Rhein.",
  },
];

export function Approach() {
  return (
    <section className="section approach-section">
      <Container>
        <div className="section-top">
          <SectionHeading
            eyebrow="Ein guter Anfang für Ihr Projekt"
            title="Warum Thermobau V&V kontaktieren?"
          >
            <p>
              So möchten wir mit Ihnen ins Gespräch kommen — vom ersten Gedanken
              bis zum abgestimmten Vorhaben.
            </p>
          </SectionHeading>
        </div>
        <div className="approach-grid">
          {points.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <span className="approach-icon">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
