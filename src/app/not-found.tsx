import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <section className="not-found">
      <Container>
        <p className="not-found-number">FEHLER 404</p>
        <h1>Diese Seite wurde nicht gefunden</h1>
        <p>
          Die gewünschte Seite ist nicht verfügbar. Auf der Startseite oder in
          unseren Leistungen finden Sie weitere Informationen.
        </p>
        <div className="hero-actions">
          <Button href="/">Zur Startseite</Button>
          <Button href="/leistungen" secondary>
            Leistungen ansehen
          </Button>
        </div>
      </Container>
    </section>
  );
}
