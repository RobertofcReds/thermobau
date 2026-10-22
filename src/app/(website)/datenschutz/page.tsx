import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { siteConfig } from "@/config/site";
import { isContactFormEnabled } from "@/lib/contact-config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Datenschutzerklärung – vorläufige Fassung",
  "Informationen zu den derzeitigen Funktionen dieser Thermobau-V&V-Vorschau: lokale Formularprüfung, lokal bereitgestellte Medien und offene Datenschutzangaben.",
  "/datenschutz",
);
export const dynamic = "force-dynamic";
export default function PrivacyPage() {
  const enabled = isContactFormEnabled();
  const privacy = siteConfig.privacy;
  return (
    <>
      <PageHero
        title="Datenschutzerklärung"
        displayTitle={<>Datenschutz&shy;erklärung</>}
        eyebrow="Umgang mit Daten"
        description="Informationen zu den derzeitigen Funktionen dieser Website und zum Stand der Datenschutzprüfung."
      />
      <section className="section">
        <Container className="legal-layout">
          <aside className="legal-provisional">
            <strong>Vorläufige Fassung – noch zu prüfen</strong>
            <p>
              Diese Seite beschreibt den technischen Stand der Vorschau. Die
              vollständigen Datenschutzinformationen müssen vor einer
              Veröffentlichung und vor Aktivierung des Nachrichtenversands
              ergänzt und rechtlich geprüft werden.
            </p>
          </aside>
          <div className="prose">
            <h2>Kontakt und Verantwortlichkeit</h2>
            <ContactDetails />
            {privacy.controllerName && (
              <p>Verantwortliche Stelle: {privacy.controllerName}</p>
            )}
            {privacy.controllerContact && (
              <p>Datenschutzkontakt: {privacy.controllerContact}</p>
            )}
            {(!privacy.controllerName || !privacy.controllerContact) && (
              <p>
                Die rechtlich verantwortliche Stelle und ihre vollständigen
                Kontaktangaben sind vor der Veröffentlichung zu bestätigen. Der
                mitgeteilte Ansprechpartner wird hier nicht als
                Datenschutzbeauftragter bezeichnet.
              </p>
            )}
            {privacy.dataProtectionOfficerContact && (
              <p>
                Kontakt des Datenschutzbeauftragten:{" "}
                {privacy.dataProtectionOfficerContact}
              </p>
            )}
            <h2>Aufruf der Website</h2>
            <p>
              Beim Abruf werden technisch erforderliche Verbindungsdaten,
              insbesondere die IP-Adresse und die angeforderte Seite, an den
              bereitstellenden Server übermittelt, damit dieser die Inhalte
              ausliefern kann. Je nach Bereitstellung können weitere Daten wie
              Zeitpunkt, Browserinformationen oder technische Fehler in
              Serverprotokollen erfasst werden.
            </p>
            <p>
              {privacy.hostingProvider
                ? `Hosting-Anbieter: ${privacy.hostingProvider}.`
                : "Der spätere Hosting-Anbieter und seine Verarbeitung sind noch nicht bestätigt."}
            </p>
            {privacy.hostingDetails && <p>{privacy.hostingDetails}</p>}
            <p>
              {privacy.hostingLegalBasis
                ? `Rechtsgrundlage: ${privacy.hostingLegalBasis}`
                : "Die konkrete Rechtsgrundlage für Bereitstellung und etwaige Sicherheitsprotokolle muss anhand des gewählten Betriebs festgelegt werden. Bei einer Berufung auf berechtigte Interessen sind diese zu benennen und abzuwägen."}
            </p>
            <p>
              {privacy.hostingRetention
                ? `Speicherung: ${privacy.hostingRetention}`
                : "Welche Protokolle gespeichert werden, wer Zugriff erhält und wann sie gelöscht werden, ist mit dem Hosting-Anbieter noch festzulegen. Eine pauschale Speicherfrist wird deshalb nicht zugesagt."}
            </p>
            <h2>Kontaktformular</h2>
            {enabled ? (
              <p>
                Der Nachrichtenversand ist technisch aktiviert. Name,
                E-Mail-Adresse, die freiwillig angegebene Telefonnummer, der
                gewählte Arbeitsbereich und die Nachricht werden über einen
                E-Mail-Dienst an die konfigurierte Empfängeradresse übermittelt.
                Zur Begrenzung von Anfragen wird ein zeitlich begrenzter Zähler
                mit einem aus Verbindungsdaten abgeleiteten Schlüssel bei einem
                separaten Dienst geführt. Die erforderlichen Angaben zu diesen
                Diensten, Rechtsgrundlagen, Empfängern, Speicherfristen und
                möglichen Übermittlungen müssen vor der öffentlichen Nutzung
                verbindlich ergänzt werden.
              </p>
            ) : (
              <>
                <p>
                  Das Formular befindet sich im Demomodus. Mit „Eingaben prüfen“
                  werden Ihre Angaben ausschließlich im Browser geprüft. Dabei
                  werden keine Formulardaten an den Server oder einen
                  E-Mail-Dienst übertragen. Es wird keine Nachricht versendet.
                </p>
                <p>
                  Die Felder Name, E-Mail, Leistung und Nachricht werden für die
                  lokale Prüfung verwendet; die Telefonnummer ist freiwillig.
                  Die Anwendung speichert diese Angaben nicht dauerhaft im
                  Browser. Eine etwaige automatische Formularvervollständigung
                  richtet sich nach Ihren Browsereinstellungen.
                </p>
                <p>
                  Direkte technische Anfragen an die Kontaktschnittstelle werden
                  auf dem Server geprüft. In dieser Vorschau wird kein
                  E-Mail-Versand ausgeführt. Die Anwendung legt keine Datenbank
                  mit Kontaktanfragen an und protokolliert keine
                  Nachrichteninhalte.
                </p>
              </>
            )}
            {privacy.contactRecipients && (
              <p>
                Empfänger bei aktiviertem Versand: {privacy.contactRecipients}
              </p>
            )}
            {privacy.contactLegalBasis && (
              <p>Rechtsgrundlage für Anfragen: {privacy.contactLegalBasis}</p>
            )}
            {privacy.contactRetention && (
              <p>Aufbewahrung von Anfragen: {privacy.contactRetention}</p>
            )}
            {privacy.abuseProtectionLegalBasis && (
              <p>
                Rechtsgrundlage des Missbrauchsschutzes:{" "}
                {privacy.abuseProtectionLegalBasis}
              </p>
            )}
            <p>
              Vor der Aktivierung sind die Rechtsgrundlagen für die Bearbeitung
              von Anfragen und den Missbrauchsschutz, die konkreten Empfänger
              sowie Löschfristen oder nachvollziehbare Löschkriterien
              festzulegen. Die technische Vorbereitung des Versands bedeutet
              nicht, dass diese Verarbeitung bereits freigegeben ist.
            </p>
            <h2>Schriften, Bilder und Dienste</h2>
            <p>
              Schriften, Logo und Fotografien werden zusammen mit dieser Website
              bereitgestellt. Es werden keine Schriften von externen
              Schriftservern, Analysewerkzeuge, Werbepixel, eingebettete Karten
              oder Social-Media-Inhalte nachgeladen.
            </p>
            <h2>Cookies und lokale Speicherung</h2>
            <p>
              Die Anwendung setzt in der vorliegenden Fassung keine Analyse-
              oder Marketing-Cookies und speichert Formulareingaben nicht im
              lokalen Browserspeicher. Bei der späteren Auswahl des Hostings und
              zusätzlicher Dienste ist erneut zu prüfen, ob weitere Speicher-
              oder Zugriffsvorgänge entstehen.
            </p>
            <h2>Empfänger und mögliche Auslandsübermittlungen</h2>
            {!enabled && (
              <p>
                In der aktuellen Formular-Demonstration werden keine
                Formulareingaben an einen E-Mail- oder Anti-Spam-Dienst
                weitergegeben. Die Datenverarbeitung des späteren Hostings ist
                davon getrennt zu prüfen.
              </p>
            )}
            <p>
              {privacy.internationalTransfers ??
                "Die Empfänger, Unterauftragnehmer und Verarbeitungsorte des späteren Hostings und Nachrichtenversands sind noch nicht bestätigt. Mögliche Übermittlungen außerhalb des Europäischen Wirtschaftsraums und die dafür erforderlichen Voraussetzungen und Garantien sind vor der Nutzung zu klären."}
            </p>
            <h2>Ihre Datenschutzrechte</h2>
            <p>
              Soweit die gesetzlichen Voraussetzungen vorliegen, haben Sie das
              Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung und Datenübertragbarkeit. Bei einer Verarbeitung auf
              Grundlage berechtigter Interessen können Sie aus Gründen Ihrer
              besonderen Situation widersprechen. Eine erteilte Einwilligung
              können Sie mit Wirkung für die Zukunft widerrufen; die
              Rechtmäßigkeit der vorherigen Verarbeitung bleibt unberührt.
            </p>
            <p>
              Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren,
              insbesondere am Ort Ihres gewöhnlichen Aufenthalts, Ihres
              Arbeitsplatzes oder eines vermuteten Verstoßes. Für
              Rheinland-Pfalz finden Sie Informationen und einen Beschwerdeweg
              beim{" "}
              <a
                href="https://www.datenschutz.rlp.de/themen/online-services/beschwerdeformular"
                rel="noreferrer"
              >
                Landesbeauftragten für den Datenschutz und die
                Informationsfreiheit Rheinland-Pfalz
              </a>
              .
            </p>
            <p>
              Diese Website nimmt keine automatisierte Entscheidung mit
              rechtlicher Wirkung und kein Profiling vor. Die Formularprüfung
              bewertet lediglich die formale Gültigkeit Ihrer Eingaben.
            </p>
            <h2>Offene Angaben vor der Veröffentlichung</h2>
            <p>
              Verantwortliche Stelle, elektronische Kontaktangaben, Hosting,
              Rechtsgrundlagen, Empfänger, Aufbewahrung und mögliche
              Auslandsübermittlungen müssen zur tatsächlichen Bereitstellung
              ergänzt werden. Die Informationspflichten der DSGVO sowie
              Speicher- und Zugriffsvorgänge nach § 25 TDDDG sind zu prüfen.
              Diese vorläufige Beschreibung ersetzt keine abschließende
              Datenschutzprüfung.
            </p>
            <p>
              Weitere Unternehmensangaben finden Sie im{" "}
              <Link href="/impressum">Impressum</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
