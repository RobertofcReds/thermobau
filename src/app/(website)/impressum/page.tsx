import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Impressum – vorläufige Angaben",
  "Vorläufige Anbieterangaben von Thermobau V&V in Ludwigshafen. Diese Informationen müssen vor der Veröffentlichung rechtlich geprüft und ergänzt werden.",
  "/impressum",
);
export default function ImpressumPage() {
  const legal = siteConfig.legal;
  const confirmedDetails = [
    ["Diensteanbieter", legal.providerName],
    ["Rechtsform", legal.legalForm],
    ["Vertretungsberechtigte Person", legal.authorizedRepresentative],
    ["Register", legal.registerName],
    ["Registergericht", legal.registerCourt],
    ["Registernummer", legal.registerNumber],
    ["Umsatzsteuer-Identifikationsnummer", legal.vatId],
    ["Wirtschafts-Identifikationsnummer", legal.economicId],
    ["Zuständige Aufsichtsbehörde", legal.supervisoryAuthority],
    ["Berufskammer", legal.professionalChamber],
    ["Gesetzliche Berufsbezeichnung", legal.professionalTitle],
    ["Verleihungsstaat der Berufsbezeichnung", legal.professionalTitleCountry],
    ["Berufsrechtliche Regelungen", legal.professionalRules],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));
  return (
    <>
      <PageHero
        title="Impressum"
        eyebrow="Anbieterinformationen"
        description="Angaben zum Unternehmen und zum Stand dieser Website."
      />
      <section className="section">
        <Container className="legal-layout">
          <aside className="legal-provisional">
            <strong>Vorläufige Fassung</strong>
            <p>
              Diese Angaben sind noch nicht vollständig. Sie müssen vor der
              Veröffentlichung geprüft und ergänzt werden. Diese Seite ist kein
              abschließend geprüftes Impressum.
            </p>
          </aside>
          <div className="prose">
            <h2>Mitgeteilte Unternehmensangaben</h2>
            <ContactDetails />
            <h2>Rechtliche Einordnung</h2>
            {confirmedDetails.length > 0 ? (
              <dl className="grid gap-4">
                {confirmedDetails.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-semibold text-ink">{label}</dt>
                    <dd className="m-0">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p>
                Der genannte Ansprechpartner wurde für den Kontakt mitgeteilt.
                Seine rechtliche Rolle als Diensteanbieter oder
                vertretungsberechtigte Person ist noch zu bestätigen. Eine
                Rechtsform oder Registereintragung wurde bislang nicht
                mitgeteilt.
              </p>
            )}
            {legal.professionalRulesUrl && (
              <p>
                <a href={legal.professionalRulesUrl}>
                  Berufsrechtliche Regelungen einsehen
                </a>
              </p>
            )}
            {legal.disputeResolution && (
              <>
                <h2>Verbraucherstreitbeilegung</h2>
                <p>{legal.disputeResolution}</p>
              </>
            )}
            <h2>Noch zu vervollständigen</h2>
            <p>
              Vor der Veröffentlichung sind insbesondere die vollständige
              Anbieteridentität und die offizielle E-Mail-Adresse zu bestätigen.
              Angaben für eine schnelle elektronische Kontaktaufnahme und
              unmittelbare Kommunikation fehlen noch. Ein Formular im Demomodus
              ist kein erreichbarer Kontaktweg.
            </p>
            <p>
              Rechtsform und Vertretung, Register und Registernummer,
              Umsatzsteuer- oder Wirtschafts-Identifikationsnummer sowie
              Aufsichtsbehörde, Kammer und Berufsangaben sind entsprechend der
              tatsächlichen rechtlichen Situation zu ergänzen, soweit sie
              erforderlich sind. Eine Zugehörigkeit oder Qualifikation wird hier
              nicht vorausgesetzt.
            </p>
            <p>
              Die Prüfung richtet sich unter anderem nach{" "}
              <a
                href="https://www.gesetze-im-internet.de/ddg/__5.html"
                rel="noreferrer"
              >
                § 5 Digitale-Dienste-Gesetz (DDG)
              </a>
              . Nicht mitgeteilte Angaben werden in dieser Vorschau nicht durch
              Beispieldaten ersetzt.
            </p>
            <h2>Stand der Vorschau</h2>
            <p>
              Die dargestellten Tätigkeitsbereiche beruhen auf den übermittelten
              Unternehmensinformationen. Als Symbolbilder gekennzeichnete
              Fotografien veranschaulichen die Tätigkeitsbereiche und
              dokumentieren keine ausgeführten Kundenprojekte.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
