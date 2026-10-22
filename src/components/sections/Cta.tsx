import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
export function Cta({ service }: { service?: string }) {
  return (
    <section className="cta-section">
      <Container className="cta-content">
        <div>
          <p className="eyebrow">Der nächste Schritt</p>
          <h2>Sie planen eine Renovierung?</h2>
          <p>
            Beschreiben Sie uns Ihr Vorhaben und den gewünschten
            Leistungsbereich.
          </p>
        </div>
        <Button href={service ? `/kontakt?service=${service}` : "/kontakt"}>
          {service ? "Projekt anfragen" : "Jetzt Kontakt aufnehmen"}
        </Button>
      </Container>
    </section>
  );
}
