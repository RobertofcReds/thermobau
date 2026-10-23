import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getLocale } from "next-intl/server";
import { pagePath, type Locale } from "@/i18n/routing";
export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = {
    de: [
      "FEHLER 404",
      "Diese Seite wurde nicht gefunden",
      "Die gewünschte Seite ist nicht verfügbar. Auf der Startseite oder in unseren Leistungen finden Sie weitere Informationen.",
      "Zur Startseite",
      "Leistungen ansehen",
    ],
    en: [
      "ERROR 404",
      "This page could not be found",
      "The requested page is unavailable. Find further information on the home page or explore our services.",
      "Back to home",
      "View services",
    ],
    fr: [
      "ERREUR 404",
      "Cette page est introuvable",
      "La page demandée n’est pas disponible. Retrouvez les informations sur l’accueil ou découvrez nos prestations.",
      "Retour à l’accueil",
      "Voir les prestations",
    ],
  }[locale];
  return (
    <section className="not-found">
      <Container>
        <p className="not-found-number">{t[0]}</p>
        <h1>{t[1]}</h1>
        <p>{t[2]}</p>
        <div className="hero-actions">
          <Button href={pagePath("home", locale)}>{t[3]}</Button>
          <Button href={pagePath("services", locale)} secondary>
            {t[4]}
          </Button>
        </div>
      </Container>
    </section>
  );
}
