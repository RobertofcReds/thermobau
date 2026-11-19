import type { Locale } from "./routing";
import { siteConfig } from "@/config/site";
import { getContactBackend } from "@/lib/contact-config";

const confirmedContact = {
  de: `Telefon: ${siteConfig.phone} · E-Mail: ${siteConfig.email} · WhatsApp: ${siteConfig.whatsapp}.`,
  en: `Phone: ${siteConfig.phone} · Email: ${siteConfig.email} · WhatsApp: ${siteConfig.whatsapp}.`,
  fr: `Téléphone : ${siteConfig.phone} · E-mail : ${siteConfig.email} · WhatsApp : ${siteConfig.whatsapp}.`,
};
type LegalContent = {
  title: string;
  description: string;
  warning: string;
  sections: { title: string; paragraphs: string[] }[];
};
const copy: Record<
  Locale,
  Record<"legal" | "privacy" | "terms", LegalContent>
> = {
  de: {
    legal: {
      title: "Impressum",
      description:
        "Anbieterinformationen und noch zu bestätigende rechtliche Pflichtangaben.",
      warning:
        "Die Anbieteridentität und weitere gesetzliche Pflichtangaben sind noch nicht vollständig bestätigt. Das Impressum muss vor der abschließenden rechtlichen Freigabe ergänzt und geprüft werden.",
      sections: [
        {
          title: "Übermittelte Kontaktdaten",
          paragraphs: [
            "Thermobau V&V · Ansprechpartner: Vasil Velikov Dimitrov · Blücherstr. 59, 67063 Ludwigshafen, Deutschland.",
            confirmedContact.de,
            "Der genannte Ansprechpartner ist nicht automatisch mit dem rechtlichen Anbieter oder Verantwortlichen gleichzusetzen. Die genaue Anbieteridentität fehlt noch. Kontaktanfragen können über das Kontaktformular übermittelt werden.",
          ],
        },
        {
          title: "Noch zu vervollständigen",
          paragraphs: [
            "Genaue Anbieteridentität und gegebenenfalls Rechtsform sowie Vertretungsberechtigte. Register, Registergericht, Registernummer, Umsatzsteuer- oder Wirtschafts-Identifikationsnummer nur, soweit vorhanden und einschlägig. Keine persönliche Steuernummer veröffentlichen.",
            "Je nach Tätigkeit sind Angaben zu Aufsichtsbehörde, Kammer, Berufsbezeichnung und Berufsrecht sowie zur Verbraucherstreitbeilegung zu prüfen. Es werden keine Mitgliedschaften, Zulassungen oder Teilnahmepflichten behauptet.",
          ],
        },
        {
          title: "Rechtlicher Prüfbedarf",
          paragraphs: [
            "Die anwendbaren Angaben nach § 5 DDG sind vor Veröffentlichung zu bestätigen. Auch die Anwendbarkeit des BFSG ist anhand der tatsächlichen Leistungen, einer möglichen elektronischen Vertragsanbahnung und der Unternehmensgröße zu prüfen. Eine Ausnahme oder rechtliche Zertifizierung wird nicht zugesichert.",
          ],
        },
        {
          title: "Bildmaterial",
          paragraphs: [
            "Die verwendeten Fotografien stammen aus der Bildbibliothek Pexels und veranschaulichen die Tätigkeitsbereiche. Sie zeigen keine nachgewiesenen Kundenprojekte und stellen keine Mitarbeiter von Thermobau V&V dar. Die einzelnen Bilder tragen keine Quellenzeile; Urheber, Quellen und Lizenznachweise werden in der internen Projektdokumentation aufbewahrt.",
          ],
        },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Informationen zu den tatsächlichen Datenverarbeitungen auf dieser Website und zu noch offenen rechtlichen Angaben.",
      warning:
        "Diese Datenschutzhinweise beschreiben die eingesetzte Infrastruktur, sind aber noch nicht abschließend freigegeben. Insbesondere die genaue Identität des Verantwortlichen, Rechtsgrundlagen, Auftragsverarbeitungsverträge, Übermittlungen und gesonderte Löschfristen für E-Mails und Backups sind zu prüfen.",
      sections: [
        {
          title: "Verantwortlicher und Kontakt",
          paragraphs: [
            "Übermittelte Bezeichnung: Thermobau V&V, Blücherstr. 59, 67063 Ludwigshafen. Genannter Ansprechpartner: Vasil Velikov Dimitrov. Die genaue Identität des datenschutzrechtlich Verantwortlichen ist noch zu bestätigen. Ein Datenschutzbeauftragter wird nicht behauptet.",
            confirmedContact.de,
          ],
        },
        {
          title: "Technischer Websitebetrieb",
          paragraphs: [
            "Die öffentliche Website wird mit Next.js über Vercel bereitgestellt. Die Kontakt-API (PHP), die MariaDB-Datenbank und das E-Mail-Postfach werden bei ALL-INKL betrieben. Beim Aufruf der Website werden technisch unter anderem IP-Adresse, angeforderte Adresse, Zeitpunkt und Browserinformationen an die beteiligten Server übermittelt.",
            "Zur Bearbeitung von Kontaktanfragen wird eine Serverfunktion bei Vercel genutzt, die die Anfrage verschlüsselt an die PHP-API bei ALL-INKL weiterleitet. Bei beiden Anbietern können technische Zugriffs- und Betriebsprotokolle anfallen. Die konkreten Speicherfristen, Auftragsverarbeitungsvereinbarungen und etwaige Übermittlungen außerhalb des Europäischen Wirtschaftsraums sind noch verbindlich zu prüfen. Schriftarten und Fotos werden nach aktuellem Projektstand lokal ausgeliefert; die Abwesenheit zusätzlicher Analyse- oder Marketingdienste ist anhand der produktiven Einbindung zu kontrollieren.",
          ],
        },
        {
          title: "Kontaktformular",
          paragraphs: [
            "Im gekennzeichneten Demomodus werden die Eingaben ausschließlich im Browser geprüft. Es wird keine Nachricht versendet; Formulardaten werden weder an die Kontakt-API übermittelt noch von der Anwendung gespeichert. Die automatische Ausfüllfunktion des Browsers ist davon unabhängig.",
            `Nach gesonderter Aktivierung übermittelt das Formular Name, E-Mail, freiwillige Telefonnummer, Leistungswahl und Nachricht sowie Sprache, Formularseite und Eingangszeit über die Kontakt-API und eine verschlüsselte SMTP-Verbindung bei ALL-INKL an ${siteConfig.email}. Die E-Mail-Adresse wird als Antwortadresse verwendet. Upstash Redis begrenzt Anfragen anhand pseudonymisierter technischer Kennungen für eine Stunde; Formulareingaben werden dort nicht gespeichert. Rechtsgrundlagen, Löschfristen, Verträge und gegebenenfalls Transfers müssen vor Aktivierung verbindlich dokumentiert werden. Bitte keine sensiblen Informationen eingeben.`,
          ],
        },
        {
          title: "E-Mails und Sicherungskopien",
          paragraphs: [
            "Die Benachrichtigungs-E-Mails zu Kontaktanfragen bleiben unabhängig vom Datenbankeintrag im Postfach bei ALL-INKL erhalten. Es ist derzeit keine automatische Löschregel für das gesamte Postfach eingerichtet. Die Aufbewahrung einfacher Anfragen und die längere Aufbewahrung geschäftlich relevanter Korrespondenz sind organisatorisch und rechtlich getrennt festzulegen.",
            "ALL-INKL stellt gesonderte Sicherungskopien für Datenbanken, E-Mail-Postfächer und Dateien des Webspaces bereit. Diese Sicherungen werden nicht automatisch durch die Löschung eines Kontaktdatensatzes aus der laufenden Datenbank bereinigt. Die Verfügbarkeit von Wiederherstellungspunkten wurde geprüft; eine garantierte maximale Aufbewahrungsfrist und das Wiederherstellungsverfahren müssen noch mit dem Anbieter geklärt werden.",
          ],
        },
        {
          title: "Automatischer Website-Chat",
          paragraphs: [
            "Der Chat beantwortet Fragen anhand hinterlegter Website-Informationen direkt im Browser. Chatnachrichten werden weder an Thermobau V&V noch an einen KI-Dienst übermittelt. Der Verlauf bleibt nur im Arbeitsspeicher des geöffneten Tabs; er wird nicht in Cookies, localStorage oder sessionStorage gespeichert. Sie können ihn im Chat leeren. Beim Neuladen oder Schließen des Tabs geht er verloren.",
            "Der Chat ist kein Live-Kontakt und versendet keine Projektanfrage. Telefon-, E-Mail- und WhatsApp-Links öffnen den gewählten Kontaktkanal. Eine Nachricht an das Unternehmen müssen Sie dort selbst absenden.",
          ],
        },
        {
          title: "Datenschutzeinstellungen",
          paragraphs: [
            "Die Auswahl zu optionalen Karten ist höchstens 180 Tage gültig und wird unter thermobau-privacy-v4 im lokalen Browserspeicher hinterlegt. Ein abgelaufener Eintrag wird beim nächsten Aufruf der Website beziehungsweise während einer geöffneten Sitzung entfernt. Gespeichert werden nur Version, Auswahl und Ablaufzeit – keine Formulareingaben. Diese Speicherung dient der gewünschten Verwaltung Ihrer Einstellungen. Freiwillige Dienste sind standardmäßig aus. Für die aktuelle Google-Maps-Einbindung ist eine neue Auswahl erforderlich; frühere Einstellungen für Google Maps oder OpenStreetMap werden nicht übernommen.",
            "Sie können Ihre Auswahl jederzeit über „Datenschutzeinstellungen“ im Fußbereich ändern. Nach dem Widerruf wird eine aktive Karte entfernt und nicht erneut geladen. Der Widerruf wirkt für die Zukunft. Wenn der Browserspeicher blockiert ist, gilt die Auswahl nur für die laufende Sitzung.",
          ],
        },
        {
          title: "Karten und externe Links",
          paragraphs: [
            "Auf der Start- und Kontaktseite befindet sich im Fußbereich unter den Kontakt- und Navigationsspalten eine eingebettete Google-Maps-Karte mit wählbarer Karten- und Satellitenansicht. Sie wird direkt innerhalb der Seite angezeigt und bleibt bis zu Ihrer ausdrücklichen Zustimmung über die Kartenschaltfläche oder die Datenschutzeinstellungen deaktiviert. Die textuelle Adresse ist auch ohne Karte verfügbar. Der markierte Punkt wurde für das Gebäude an der angegebenen Adresse geprüft, nicht als Unternehmensverzeichnis-Eintrag.",
            "Beim Laden werden unter anderem IP-Adresse, Browser- und Geräteinformationen an Google und beteiligte Dienstleister übertragen. Abhängig von Ihren Google- und Browsereinstellungen kann Google weitere Informationen verarbeiten oder Daten mit einem angemeldeten Konto verknüpfen. Einzelheiten stehen im unten verlinkten Datenschutzhinweis von Google. Empfänger, Speicherfristen, Rechtsgrundlagen und mögliche internationale Übermittlungen bleiben vor Veröffentlichung rechtlich zu prüfen.",
            "Der separate Routenlink führt zu Google Maps im selben Browser-Tab. Er ist unabhängig von der Zustimmung zur eingebetteten Karte nutzbar. Auch das Öffnen dieses Links ruft Google auf; dort gelten die unten verlinkten Datenschutzhinweise von Google.",
          ],
        },
        {
          title: "Ihre Rechte",
          paragraphs: [
            "Soweit die jeweiligen Voraussetzungen vorliegen, haben Sie Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Bei Verarbeitungen auf Grundlage berechtigter Interessen können Sie aus Gründen Ihrer besonderen Situation widersprechen. Eine Einwilligung können Sie jederzeit für die Zukunft widerrufen.",
            "Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, etwa beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz. Es findet keine automatisierte Entscheidungsfindung oder Profilbildung durch diese Website statt.",
          ],
        },
        {
          title: "Vor abschließender Freigabe zu bestätigen",
          paragraphs: [
            "Verantwortlicher und elektronische Kontaktmöglichkeit; Hosting und Protokolle; rechtliche Grundlagen; tatsächliche Empfänger und Auftragsverarbeiter; Aufbewahrungs- und Löschfristen; Bedingungen des Kartendienstes und geschäftliche Nutzung der angegebenen Adresse; Formularbetrieb sowie mögliche internationale Übermittlungen.",
          ],
        },
      ],
    },
    terms: {
      title: "Hinweise zur Websitenutzung",
      description:
        "Informationen zur Nutzung dieses Internetangebots, zu Bildern und externen Links.",
      warning:
        "Vorläufige Informationen – keine Vertragsbedingungen für Bauleistungen. Rechtliche Prüfung vor Veröffentlichung erforderlich.",
      sections: [
        {
          title: "Informationsangebot",
          paragraphs: [
            "Diese Website stellt die sechs Tätigkeitsbereiche von Thermobau V&V vor. Sie enthält keine Online-Bestellung und keine Zahlungsfunktion. Eine Anfrage ist noch kein Auftrag; Leistungen, Umfang, Termine und mögliche Angebote werden individuell geklärt.",
          ],
        },
        {
          title: "Inhalte und Urheberrechte",
          paragraphs: [
            "Texte, Gestaltung, Logo und Fotos können unterschiedlichen Rechten unterliegen. Aus der Anzeige auf dieser Website folgt keine allgemeine Erlaubnis zur Weiterverwendung. Die Pexels-Fotografien unterliegen der jeweiligen Lizenz. Quellen, Urheber und Lizenznachweise werden in der internen Projektdokumentation aufbewahrt. Die erforderlichen Quellenhinweise des Kartendienstes bleiben innerhalb der Karte sichtbar.",
          ],
        },
        {
          title: "Illustrationen und externe Links",
          paragraphs: [
            "Symbolbilder dienen der Veranschaulichung von Tätigkeiten. Sie sind keine Referenzen, Vorher-nachher-Belege oder Abbildungen eines bestätigten Teams. Externe Quellen- und Routenlinks öffnen eigenständige Angebote mit eigenen Datenschutzinformationen.",
          ],
        },
        {
          title: "Freiwillige Nutzung",
          paragraphs: [
            "Zum Lesen der Website müssen Sie weder optionale Karten aktivieren noch Vertragsbedingungen akzeptieren. Das Kontaktformular ermöglicht unverbindliche Anfragen; durch das Absenden kommt noch kein Vertrag zustande.",
          ],
        },
      ],
    },
  },
  en: {
    legal: {
      title: "Legal notice",
      description: "Provider details and legal particulars still awaiting confirmation.",
      warning:
        "The provider's legal identity and other mandatory information have not yet been fully confirmed. Complete and review these details and this translation before final legal approval.",
      sections: [
        {
          title: "Contact details provided",
          paragraphs: [
            "Thermobau V&V · Named contact: Vasil Velikov Dimitrov · Blücherstr. 59, 67063 Ludwigshafen, Germany.",
            confirmedContact.en,
            "The named contact is not automatically the legal provider or data controller. The exact provider identity is still missing. The contact form can be used to send non-binding enquiries.",
          ],
        },
        {
          title: "Information still required",
          paragraphs: [
            "Exact provider identity and, where relevant, legal form and authorised representative. Register, court, registration number, VAT ID or economic ID are to be added only if applicable and confirmed. Do not publish a personal tax number.",
            "Depending on the activity, supervisory authority, chamber, professional title and rules and consumer dispute-resolution information must be checked. No membership, authorisation or participation obligation is asserted.",
          ],
        },
        {
          title: "Legal review",
          paragraphs: [
            "Applicable disclosures under section 5 DDG must be confirmed before publication. The applicability of the BFSG must also be assessed using the actual services, any electronic contracting process and the size of the business. No exemption or legal certification is claimed.",
          ],
        },
        {
          title: "Photographs",
          paragraphs: [
            "Photographs are sourced from Pexels to illustrate the areas of work. They are not verified customer projects and do not depict Thermobau V&V employees. Individual photographs have no credit line; authors, sources and licence records are retained in the internal project documentation.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy notice",
      description:
        "Information about actual data processing on this website and legal details that still need confirmation.",
      warning:
        "This notice describes the infrastructure in use but has not received final approval. The exact controller identity, legal bases, processor agreements, transfers and separate deletion periods for email and backups still require review, including this translation.",
      sections: [
        {
          title: "Controller and contact",
          paragraphs: [
            "Name provided: Thermobau V&V, Blücherstr. 59, 67063 Ludwigshafen. Named contact: Vasil Velikov Dimitrov. The exact data-controller identity remains to be confirmed. No data protection officer is asserted.",
            confirmedContact.en,
          ],
        },
        {
          title: "Technical operation",
          paragraphs: [
            "The public Next.js website is hosted by Vercel. The PHP contact API, MariaDB database and email mailbox are operated at ALL-INKL. Visiting the website necessarily sends technical data, including the IP address, requested URL, time and browser details, to the systems involved.",
            "Contact enquiries pass through a server function at Vercel and are forwarded over an encrypted connection to the PHP API at ALL-INKL. Both providers may generate technical access and operating logs. Their exact retention periods, data-processing agreements and any transfers outside the European Economic Area still need formal review. Fonts and photographs are served locally according to the current project setup; the absence of additional analytics or marketing integrations must be verified on the live website.",
          ],
        },
        {
          title: "Contact form",
          paragraphs: [
            "In the labelled demo mode, entries are checked only in your browser. No message is sent, no form data is transmitted to the contact API and the application does not store entries. Browser autofill works independently of this application.",
            `After separate activation, the form transmits your name, email address, optional phone number, selected service and message, plus the language, form page and submission time, through the contact API and an encrypted SMTP connection at ALL-INKL to ${siteConfig.email}. Your email address is used as the reply address. Upstash Redis limits requests using pseudonymised technical identifiers for one hour; form entries are not stored there. Legal bases, deletion periods, contracts and any transfers must be documented before activation. Please do not enter sensitive information.`,
          ],
        },
        {
          title: "Email messages and backups",
          paragraphs: [
            "Notification emails about contact enquiries remain in the ALL-INKL mailbox independently of the database record. There is currently no automatic deletion rule for the entire mailbox. Retention of simple enquiries and longer-term storage of business correspondence must be established separately, taking account of applicable obligations.",
            "ALL-INKL provides separate backup copies for databases, mailboxes and webspace files. Deleting a contact record from the live database does not immediately remove it from those copies. Recovery points have been checked, but the maximum guaranteed backup retention period and restoration arrangements still require confirmation from the provider.",
          ],
        },
        {
          title: "Automatic website chat",
          paragraphs: [
            "The chat answers questions from prepared website information directly in your browser. Chat messages are not transmitted to Thermobau V&V or an AI service. The conversation stays only in the open tab’s memory; it is not stored in cookies, localStorage or sessionStorage. You can clear it in the chat. Reloading or closing the tab removes it.",
            "This is not a live conversation and does not submit a project enquiry. Phone, email and WhatsApp links open the chosen contact channel. You must send any message to the company yourself through that channel.",
          ],
        },
        {
          title: "Privacy settings",
          paragraphs: [
            "Your optional-map choice is valid for no more than 180 days and is stored locally in your browser under thermobau-privacy-v4. Expired entries are removed during an open session or when you next visit the website. Only the version, choice and expiry are stored, not form entries. This storage manages your requested preferences. Optional services are off by default. The current Google Maps embed requires a new choice; previous Google Maps or OpenStreetMap preferences are not carried over.",
            "You can change your choice using “Privacy settings” in the footer. Withdrawal removes an active map and prevents further loading. Withdrawal takes effect for the future. If browser storage is blocked, the choice lasts only for the current session.",
          ],
        },
        {
          title: "Maps and external links",
          paragraphs: [
            "The home and contact pages offer an embedded Google Maps map in the footer below the contact and navigation columns, with a choice of road and satellite views. It is displayed directly within the page and remains disabled until you explicitly consent using the map button or privacy settings. The text address remains available without the map. The marker was checked against the building at the supplied address, not a business-directory listing.",
            "Loading transmits information including your IP address, browser and device details to Google and involved service providers. Depending on your Google and browser settings, Google may process other information or associate data with a signed-in account. See Google’s privacy policy linked below. Recipients, retention, legal bases and possible international transfers still require legal review before publication.",
            "The separate directions link opens Google Maps in the same browser tab. It works independently of consent for the embedded map. Following this link also contacts Google; Google’s privacy information, linked below, applies there.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Subject to the applicable conditions, you have rights of access, rectification, erasure, restriction and data portability. Where processing relies on legitimate interests, you may object on grounds relating to your particular situation. Consent may be withdrawn at any time with future effect.",
            "You may complain to a data protection authority, including the authority for Rhineland-Palatinate linked below. This website does not conduct automated decision-making or profiling.",
          ],
        },
        {
          title: "To confirm before final approval",
          paragraphs: [
            "Confirm the controller and electronic contact, hosting and logs, legal bases, actual recipients and processors, retention and deletion periods, map-service terms and business use of the supplied address, form operation and any international transfers.",
          ],
        },
      ],
    },
    terms: {
      title: "Website terms of use",
      description:
        "Information about using this website, its images and external links.",
      warning:
        "Provisional information, not contractual terms for construction services. Legal review and approval of this translation are required before publication.",
      sections: [
        {
          title: "Information only",
          paragraphs: [
            "This website presents the six areas of work of Thermobau V&V. It has no online order or payment function. An enquiry is not an order; services, scope, timing and possible offers are agreed individually.",
          ],
        },
        {
          title: "Content and copyright",
          paragraphs: [
            "Text, design, the logo and photographs may be subject to different rights. Display on this website does not provide general permission for reuse. Pexels photographs are governed by their licence. Authors, sources and licence records are retained in the internal project documentation. Required map-provider attribution remains visible within the map.",
          ],
        },
        {
          title: "Illustrations and external links",
          paragraphs: [
            "Illustrative photos explain areas of work. They are not references, before-and-after evidence or depictions of a confirmed team. External source and directions links open independent services with their own privacy information.",
          ],
        },
        {
          title: "Optional features",
          paragraphs: [
            "Reading the website does not require activating optional maps or accepting commercial terms. The contact form accepts non-binding enquiries; submitting it does not create a contract.",
          ],
        },
      ],
    },
  },
  fr: {
    legal: {
      title: "Mentions légales",
      description:
        "Informations sur l’éditeur et mentions légales restant à confirmer.",
      warning:
        "L’identité juridique de l’éditeur et certaines mentions obligatoires ne sont pas encore confirmées. Elles doivent être complétées et vérifiées, ainsi que cette traduction, avant la validation juridique définitive.",
      sections: [
        {
          title: "Coordonnées communiquées",
          paragraphs: [
            "Thermobau V&V · Contact indiqué : Vasil Velikov Dimitrov · Blücherstr. 59, 67063 Ludwigshafen, Allemagne.",
            confirmedContact.fr,
            "Le contact indiqué ne désigne pas automatiquement l’éditeur juridique ou le responsable du traitement. L’identité juridique exacte reste à préciser. Le formulaire de contact permet d’envoyer des demandes sans engagement.",
          ],
        },
        {
          title: "Informations à compléter",
          paragraphs: [
            "Identité juridique exacte et, selon le cas, forme juridique et représentant habilité. Registre, tribunal, numéro d’inscription, identifiant TVA ou identifiant économique seulement s’ils existent et sont applicables. Ne pas publier de numéro fiscal personnel.",
            "Selon l’activité, vérifier les informations relatives à l’autorité de surveillance, la chambre professionnelle, le titre et les règles professionnelles ainsi qu’au règlement des litiges de consommation. Aucune adhésion, autorisation ou obligation de participation n’est affirmée.",
          ],
        },
        {
          title: "Vérifications juridiques",
          paragraphs: [
            "Les mentions applicables au titre du § 5 DDG doivent être confirmées avant publication. L’applicabilité du BFSG doit également être évaluée selon les services réels, l’éventuel processus de contractualisation électronique et la taille de l’entreprise. Aucune exemption ni certification juridique n’est affirmée.",
          ],
        },
        {
          title: "Photographies",
          paragraphs: [
            "Les photographies proviennent de Pexels et illustrent les domaines de travaux. Elles ne représentent pas des chantiers clients vérifiés ni les employés de Thermobau V&V. Les images individuelles n’affichent pas de ligne de crédit ; les auteurs, sources et justificatifs de licence sont conservés dans la documentation interne du projet.",
          ],
        },
      ],
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Informations sur les traitements réels du site et les points juridiques restant à confirmer.",
      warning:
        "Ce texte décrit l’infrastructure utilisée mais n’a pas encore reçu sa validation définitive. L’identité exacte du responsable, les bases légales, les contrats de sous-traitance, les transferts et les durées distinctes de suppression des e-mails et des sauvegardes doivent encore être vérifiés, ainsi que cette traduction.",
      sections: [
        {
          title: "Responsable et contact",
          paragraphs: [
            "Dénomination communiquée : Thermobau V&V, Blücherstr. 59, 67063 Ludwigshafen. Contact indiqué : Vasil Velikov Dimitrov. L’identité exacte du responsable du traitement reste à confirmer. Aucun délégué à la protection des données n’est déclaré.",
            confirmedContact.fr,
          ],
        },
        {
          title: "Fonctionnement technique",
          paragraphs: [
            "Le site public Next.js est hébergé chez Vercel. L’API de contact PHP, la base MariaDB et la messagerie sont exploitées chez ALL-INKL. La consultation du site transmet nécessairement des données techniques aux serveurs concernés, notamment l’adresse IP, l’URL demandée, l’heure et des informations sur le navigateur.",
            "Les demandes de contact transitent par une fonction serveur de Vercel et sont transférées par connexion chiffrée à l’API PHP chez ALL-INKL. Ces prestataires peuvent générer des journaux techniques d’accès et d’exploitation. Leurs durées exactes de conservation, les accords de sous-traitance et les éventuels transferts hors de l’Espace économique européen restent à vérifier. Selon la configuration actuelle, les polices et les photographies sont servies localement ; l’absence d’autres intégrations publicitaires ou analytiques doit être contrôlée sur le site en production.",
          ],
        },
        {
          title: "Formulaire de contact",
          paragraphs: [
            "En démonstration, les champs sont vérifiés uniquement dans votre navigateur. Aucun message n’est envoyé, aucune donnée de formulaire n’est transmise à l’API de contact et l’application ne conserve pas les saisies. Le remplissage automatique du navigateur est indépendant de l’application.",
            `Après activation distincte, le formulaire transmet le nom, l’e-mail, le téléphone facultatif, la prestation et le message, ainsi que la langue, la page du formulaire et la date de soumission, via l’API de contact et une connexion SMTP chiffrée chez ALL-INKL à ${siteConfig.email}. L’adresse e-mail sert d’adresse de réponse. Upstash Redis limite les demandes à l’aide d’identifiants techniques pseudonymisés pendant une heure ; les saisies du formulaire n’y sont pas conservées. Les bases légales, durées de suppression, contrats et éventuels transferts doivent être documentés avant activation. Ne saisissez pas de données sensibles.`,
          ],
        },
        {
          title: "E-mails et sauvegardes",
          paragraphs: [
            "Les e-mails de notification des demandes de contact restent dans la boîte ALL-INKL indépendamment des enregistrements de la base. Aucune règle de suppression automatique de l’ensemble de la messagerie n’est actuellement configurée. La conservation des simples demandes et celle, éventuellement plus longue, des échanges commerciaux doivent être définies séparément selon les obligations applicables.",
            "ALL-INKL conserve des sauvegardes distinctes des bases de données, des boîtes e-mail et des fichiers de l’espace web. La suppression d’un contact dans la base active n’efface pas immédiatement les copies sauvegardées. Des points de restauration ont été vérifiés ; la durée maximale garantie de conservation des sauvegardes et les modalités de restauration doivent encore être confirmées par l’hébergeur.",
          ],
        },
        {
          title: "Chat automatique du site",
          paragraphs: [
            "Le chat répond à partir d’informations préparées sur le site, directement dans votre navigateur. Les messages ne sont transmis ni à Thermobau V&V ni à un service d’IA. La conversation reste uniquement en mémoire dans l’onglet ouvert ; elle n’est conservée ni dans des cookies, ni dans localStorage ou sessionStorage. Vous pouvez l’effacer dans le chat. Actualiser ou fermer l’onglet efface le contenu.",
            "Ce chat n’est pas une conversation en direct et n’envoie aucune demande de projet. Les liens téléphone, e-mail et WhatsApp ouvrent le canal choisi. Vous devez y envoyer vous-même tout message destiné à l’entreprise.",
          ],
        },
        {
          title: "Préférences de confidentialité",
          paragraphs: [
            "Le choix relatif aux cartes facultatives est valable au maximum 180 jours et conservé localement dans le navigateur sous thermobau-privacy-v4. Une entrée expirée est supprimée pendant une session ouverte ou lors de la prochaine consultation du site. Seuls la version, le choix et l’expiration sont enregistrés, jamais les champs du formulaire. Ce stockage sert à gérer les préférences demandées. Les services facultatifs sont désactivés par défaut. L’intégration actuelle de Google Maps demande un nouveau choix ; les anciennes préférences Google Maps ou OpenStreetMap ne sont pas reprises.",
            "Vous pouvez modifier ce choix via « Paramètres de confidentialité » dans le pied de page. Le retrait supprime une carte active et empêche tout nouveau chargement. Il prend effet pour l’avenir. Si le stockage du navigateur est bloqué, le choix ne dure que pendant la session en cours.",
          ],
        },
        {
          title: "Cartes et liens externes",
          paragraphs: [
            "L’accueil et la page Contact proposent une carte Google Maps intégrée dans le pied de page, sous les colonnes de contact et de navigation, avec un choix entre les vues Plan et Satellite. Elle s’affiche directement dans la page et reste désactivée jusqu’à votre accord explicite via le bouton de la carte ou les paramètres de confidentialité. L’adresse textuelle reste disponible sans carte. Le marqueur a été vérifié pour le bâtiment à l’adresse fournie, pas comme fiche d’entreprise.",
            "Le chargement transmet notamment l’adresse IP et des informations sur le navigateur et l’appareil à Google et aux prestataires impliqués. Selon vos paramètres Google et ceux du navigateur, Google peut traiter d’autres informations ou associer des données à un compte connecté. Sa politique de confidentialité est liée ci-dessous. Destinataires, durées, bases légales et éventuels transferts internationaux restent à vérifier juridiquement avant publication.",
            "Le lien d’itinéraire distinct ouvre Google Maps dans le même onglet. Il fonctionne indépendamment de l’accord pour la carte intégrée. L’ouverture de ce lien contacte également Google ; ses informations de confidentialité, liées ci-dessous, s’y appliquent.",
          ],
        },
        {
          title: "Vos droits",
          paragraphs: [
            "Selon les conditions applicables, vous disposez des droits d’accès, de rectification, d’effacement, de limitation et de portabilité. Pour un traitement fondé sur l’intérêt légitime, vous pouvez vous opposer pour des raisons tenant à votre situation particulière. Un consentement peut être retiré à tout moment pour l’avenir.",
            "Vous pouvez saisir une autorité de contrôle, notamment celle de Rhénanie-Palatinat liée ci-dessous. Ce site n’effectue pas de décision automatisée ni de profilage.",
          ],
        },
        {
          title: "À confirmer avant validation définitive",
          paragraphs: [
            "Responsable et contact électronique, hébergement et journaux, bases légales, destinataires et sous-traitants réels, durées de conservation et de suppression, conditions du service cartographique et utilisation professionnelle de l’adresse fournie, fonctionnement du formulaire et éventuels transferts internationaux.",
          ],
        },
      ],
    },
    terms: {
      title: "Conditions d’utilisation du site",
      description:
        "Informations sur la consultation du site, les photographies et les liens externes.",
      warning:
        "Informations provisoires, sans conditions contractuelles de travaux. Vérification juridique et validation de la traduction requises avant publication.",
      sections: [
        {
          title: "Site d’information",
          paragraphs: [
            "Ce site présente les six domaines d’activité de Thermobau V&V. Il ne propose ni commande ni paiement en ligne. Une demande n’est pas une commande : prestations, périmètre, délais et éventuelle offre sont discutés individuellement.",
          ],
        },
        {
          title: "Contenus et droits d’auteur",
          paragraphs: [
            "Textes, présentation, logo et photographies peuvent relever de droits différents. Leur affichage ne constitue pas une autorisation générale de réutilisation. Les photographies Pexels sont régies par leur licence. Les auteurs, sources et justificatifs de licence sont conservés dans la documentation interne du projet. Les attributions requises par le fournisseur cartographique restent visibles dans la carte.",
          ],
        },
        {
          title: "Illustrations et liens externes",
          paragraphs: [
            "Les photographies illustrent les domaines de travaux. Elles ne constituent pas des références, des preuves avant/après ou des portraits d’une équipe confirmée. Les liens de source et d’itinéraire ouvrent des services indépendants avec leurs propres informations de confidentialité.",
          ],
        },
        {
          title: "Consultation libre",
          paragraphs: [
            "Consulter le site ne nécessite ni d’activer les cartes facultatives ni d’accepter des conditions commerciales. Le formulaire accepte les demandes sans engagement ; son envoi ne constitue pas un contrat.",
          ],
        },
      ],
    },
  },
};
const contactRetentionCopy: Record<
  Locale,
  { pending: string; approved: (days: number) => string }
> = {
  de: {
    pending:
      "Für die derzeit eingesetzte PHP-Kontaktdatenbank ist technisch eine Löschfrist von 90 Tagen ab Eingang eingerichtet. Diese Frist wurde noch nicht abschließend vom Verantwortlichen freigegeben. Die tatsächliche Löschung erfolgt über geplante Bereinigungsläufe. E-Mails und Sicherungskopien werden dadurch nicht automatisch gelöscht und benötigen eigene Aufbewahrungsregeln.",
    approved: (days) =>
      `Für die in der Kontaktdatenbank gespeicherten Anfragen gilt eine Aufbewahrungsfrist von ${days} ${days === 1 ? "Tag" : "Tagen"} ab Eingang. Nach Ablauf dieser Frist werden die Anfragen und die zugehörigen Benachrichtigungsdaten durch geplante Löschläufe gelöscht. Der tatsächliche Löschzeitpunkt hängt vom Ausführungsrhythmus und der erfolgreichen Durchführung dieser Löschläufe ab. E-Mails im Postfach und Sicherungskopien werden dadurch nicht gelöscht; ihre gesonderten Aufbewahrungs- und Löschregelungen müssen vor Veröffentlichung festgelegt und erläutert werden.`,
  },
  en: {
    pending:
      "The PHP contact database is currently configured technically to delete enquiries 90 days after receipt. This period has not yet received final approval from the controller. Deletion is carried out through scheduled cleanup runs. Emails and backup copies are not automatically deleted by this process and require separate retention rules.",
    approved: (days) =>
      `Enquiries stored in the contact database have a retention period of ${days} ${days === 1 ? "day" : "days"} from receipt. After this period, the enquiries and associated notification records are deleted through scheduled cleanup tasks. The actual deletion time depends on the schedule and successful execution of these tasks. This process does not delete emails in the mailbox or backup copies; their separate retention and deletion rules must be defined and explained before publication.`,
  },
  fr: {
    pending:
      "La base de contact PHP est actuellement configurée sur le plan technique pour supprimer les demandes 90 jours après leur réception. Ce délai n’a pas encore reçu l’approbation définitive du responsable. L’effacement est exécuté par des nettoyages programmés. Les e-mails et copies de sauvegarde ne sont pas automatiquement supprimés par ce processus et nécessitent des règles de conservation distinctes.",
    approved: (days) =>
      `Les demandes enregistrées dans la base de contact sont soumises à une durée de conservation de ${days} ${days === 1 ? "jour" : "jours"} à compter de leur réception. À l’expiration de ce délai, les demandes et les informations de notification associées sont supprimées par des traitements programmés. La date effective de suppression dépend de leur fréquence et de leur bonne exécution. Cette suppression ne concerne pas les e-mails de la messagerie ni les copies de sauvegarde ; leurs règles distinctes de conservation et d’effacement doivent être définies et expliquées avant publication.`,
  },
};

function contactRetentionText(locale: Locale): string {
  const days = siteConfig.privacy.contactRetentionDays;
  const text = contactRetentionCopy[locale];
  // Match the PHP range; an absent or invalid value never implies approval.
  // Pending copy reflects the 90-day PHP setting observed on 2026-11-19.
  // If that server value changes, update all pending translations as well.
  return typeof days === "number" &&
    Number.isInteger(days) &&
    days >= 1 &&
    days <= 3650
    ? text.approved(days)
    : text.pending;
}

export function getLegal(locale: Locale, page: "legal" | "privacy" | "terms") {
  const content = copy[locale][page];
  if (page !== "privacy" || getContactBackend() !== "php") return content;
  const phpContact = {
    de: `Das aktive Kontaktformular dient zur Bearbeitung Ihrer Anfrage und gegebenenfalls zur Vorbereitung eines Angebots. Dabei werden Name, E-Mail, freiwillige Telefonnummer, Leistungswahl, Nachricht, Sprache und Formularseite über eine Serverfunktion bei Vercel verschlüsselt an die PHP-API bei ALL-INKL übertragen und zusammen mit Referenz und Eingangszeit in MariaDB gespeichert. Eine Benachrichtigung wird über den E-Mail-Dienst bei ALL-INKL an ${siteConfig.email} versandt; Ihre Adresse wird als Antwortadresse verwendet. Pseudonymisierte technische Kennungen begrenzen Anfragen für eine Stunde; kurzlebige Einmalwerte schützen signierte Übertragungen vor Wiederholungen. Der Nachrichtentext wird nicht in diesen Schutzkennungen gespeichert. Die einschlägige Rechtsgrundlage (insbesondere vorvertragliche Maßnahmen oder berechtigte Interessen, abhängig vom Anliegen), Empfänger, Verträge und mögliche internationale Übermittlungen müssen abschließend geprüft werden. Bitte geben Sie keine sensiblen Daten ein.`,
    en: `The active contact form is used to process your enquiry and, where applicable, prepare a quotation. Your name, email, optional phone number, selected service, message, language and form page pass through a Vercel server function over an encrypted connection to the PHP API at ALL-INKL, and are stored in MariaDB with a reference and receipt time. A notification is sent through the ALL-INKL email service to ${siteConfig.email}; your address is used as the reply-to address. Pseudonymous technical identifiers limit requests for one hour and short-lived single-use values protect signed transmissions against replay. The message body is not stored in these protection identifiers. The applicable legal basis (particularly pre-contractual steps or legitimate interests, depending on the enquiry), recipients, processing contracts and possible international transfers still need final review. Please do not provide sensitive data.`,
    fr: `Le formulaire de contact actif sert à traiter votre demande et, le cas échéant, à préparer un devis. Votre nom, e-mail, téléphone facultatif, prestation choisie, message, langue et page du formulaire transitent par une fonction serveur de Vercel vers l’API PHP d’ALL-INKL, via une connexion chiffrée. Ils sont enregistrés dans MariaDB avec une référence et la date de réception. Une notification est envoyée par la messagerie ALL-INKL à ${siteConfig.email} ; votre adresse est utilisée pour la réponse. Des identifiants techniques pseudonymisés limitent les demandes pendant une heure, et des valeurs temporaires à usage unique protègent les transmissions signées contre leur réutilisation. Le contenu du message n’est pas conservé dans ces identifiants. La base légale applicable (notamment démarches précontractuelles ou intérêt légitime, selon la demande), les destinataires, les accords de sous-traitance et les éventuels transferts internationaux restent à valider. Ne communiquez pas de données sensibles.`,
  };
  return {
    ...content,
    sections: content.sections.map((section, index) =>
      index === 2
        ? {
            ...section,
            paragraphs: [
              phpContact[locale],
              contactRetentionText(locale),
            ],
          }
        : section,
    ),
  };
}
