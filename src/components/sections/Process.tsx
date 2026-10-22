import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
const steps = [
  {
    number: "01",
    title: "Kontakt aufnehmen",
    text: "Wählen Sie den passenden Arbeitsbereich und beginnen Sie mit Ihrer Anfrage.",
  },
  {
    number: "02",
    title: "Vorhaben besprechen",
    text: "Worum geht es? Angaben zum Raum, zum Zustand und Ihren Wünschen helfen bei der Einordnung.",
  },
  {
    number: "03",
    title: "Umfang und Angebot klären",
    text: "Welche Arbeiten sind vorgesehen? Die Leistungen und die Grundlagen eines Angebots werden konkret besprochen.",
  },
  {
    number: "04",
    title: "Weitere Umsetzung abstimmen",
    text: "Nach Klärung des Umfangs werden die nächsten Schritte, der Ablauf und mögliche Termine abgestimmt.",
  },
];
export function Process() {
  return (
    <section className="section process-section">
      <Container>
        <SectionHeading
          eyebrow="Von der Idee zur Anfrage"
          title="So läuft Ihre Anfrage ab"
        />
        <ol className="process-grid">
          {steps.map((step) => (
            <li key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
