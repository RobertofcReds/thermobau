import type { Locale } from "./routing";
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
        "Anbieterinformationen und Hinweise zum Veröffentlichungsstand.",
      warning:
        "Vorläufiger Entwurf – nicht zur Veröffentlichung freigegeben. Die rechtlichen Angaben müssen vor dem Livegang vervollständigt und geprüft werden.",
      sections: [
        {
          title: "Übermittelte Kontaktdaten",
          paragraphs: [
            "Thermobau V&V · Ansprechpartner: Vasil Velikov Dimitrov · Blücherstr. 59, 67063 Ludwigshafen, Deutschland.",
            "Der genannte Ansprechpartner ist nicht automatisch mit dem rechtlichen Anbieter oder Verantwortlichen gleichzusetzen. Eine bestätigte geschäftliche E-Mail-Adresse und die genaue Anbieteridentität fehlen noch. Das Demoformular ist kein Kommunikationskanal.",
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
            "Die verwendeten Fotografien stammen aus der Bildbibliothek Pexels und sind als Symbolbilder gekennzeichnet. Sie zeigen keine nachgewiesenen Kundenprojekte und stellen keine Mitarbeiter von Thermobau V&V dar. Urheber und Quellen sind an den Fotografien verlinkt.",
          ],
        },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Informationen zum aktuellen Vorschaustand und zu den noch zu bestätigenden Datenverarbeitungen.",
      warning:
        "Vorläufiger Datenschutzentwurf. Verantwortlicher, Kontakt, Hosting und Betriebsbedingungen sind vor Veröffentlichung rechtlich zu prüfen und zu ergänzen. Übersetzungen benötigen ebenfalls eine Freigabe.",
      sections: [
        {
          title: "Verantwortlicher und Kontakt",
          paragraphs: [
            "Übermittelte Bezeichnung: Thermobau V&V, Blücherstr. 59, 67063 Ludwigshafen. Genannter Ansprechpartner: Vasil Velikov Dimitrov. Die genaue Identität des datenschutzrechtlich Verantwortlichen und eine geschäftliche E-Mail-Adresse sind noch zu bestätigen. Ein Datenschutzbeauftragter wird nicht behauptet.",
          ],
        },
        {
          title: "Technischer Websitebetrieb",
          paragraphs: [
            "Beim Abruf einer Website werden technisch unter anderem IP-Adresse, angeforderter Pfad, Zeitpunkt und Browserinformationen an den ausliefernden Server übertragen. Ob und wie lange der künftige Hostinganbieter Protokolle speichert, ist noch zu klären.",
            "Hostinganbieter, Auftragsverarbeitung, Zwecke, Rechtsgrundlagen, Empfänger, Speicherfristen und gegebenenfalls Drittlandtransfers müssen für die tatsächliche Bereitstellung ergänzt werden. Schriftarten und Fotos werden lokal ausgeliefert. Es sind keine Analyse- oder Marketingwerkzeuge eingebunden.",
          ],
        },
        {
          title: "Kontaktformular",
          paragraphs: [
            "Im derzeitigen Demomodus werden die Eingaben ausschließlich im Browser geprüft. Es wird keine Nachricht versendet; Formulardaten werden weder an die Kontakt-API übermittelt noch von der Anwendung gespeichert. Die automatische Ausfüllfunktion des Browsers ist davon unabhängig.",
            "Nach einer gesonderten Aktivierung kann das Formular Name, E-Mail, freiwillige Telefonnummer, Leistungswahl und Nachricht über die Kontakt-API an den konfigurierten E-Mail-Dienst übermitteln. Ein gesonderter Dienst begrenzt dann Anfragen mit pseudonymisierten technischen Kennungen. Empfänger, Dienste, Rechtsgrundlage, Löschfristen und Transfers müssen vor Aktivierung verbindlich dokumentiert werden. Bitte keine sensiblen Informationen eingeben.",
          ],
        },
        {
          title: "Datenschutzeinstellungen",
          paragraphs: [
            "Die Auswahl zu optionalen Karten ist höchstens 180 Tage gültig und wird unter thermobau-privacy-v2 im lokalen Browserspeicher hinterlegt. Ein abgelaufener Eintrag wird beim nächsten Aufruf der Website beziehungsweise während einer geöffneten Sitzung entfernt. Gespeichert werden nur Version, Auswahl und Ablaufzeit – keine Formulareingaben. Diese Speicherung dient der gewünschten Verwaltung Ihrer Einstellungen. Freiwillige Dienste sind standardmäßig aus.",
            "Sie können Ihre Auswahl jederzeit über „Datenschutzeinstellungen“ im Fußbereich ändern. Nach dem Widerruf wird eine aktive Karte entfernt und nicht erneut geladen. Der Widerruf wirkt für die Zukunft. Wenn der Browserspeicher blockiert ist, gilt die Auswahl nur für die laufende Sitzung.",
          ],
        },
        {
          title: "Karten und externe Links",
          paragraphs: [
            "Solange der geografische Punkt nicht bestätigt ist, zeigen wir nur die textuelle Adresse und einen externen Routenlink. Es wird keine eingebettete Karte geladen. Der Klick auf einen externen Link öffnet den Anbieter unabhängig von den Einstellungen dieser Website.",
            "Eine künftige Google-Maps-Einbettung darf erst nach Bestätigung des Punktes und Ihrer gesonderten Zustimmung geladen werden. Dabei können IP-Adresse, Browserdaten und gegebenenfalls weitere vom Anbieter verarbeitete Daten an Google übertragen werden. Anbieterbedingungen, Empfänger, Speicherfristen und mögliche Drittlandübermittlungen sind vor Aktivierung zu prüfen. Angaben von Google finden Sie über den unten verlinkten Datenschutzhinweis.",
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
          title: "Vor Veröffentlichung zu bestätigen",
          paragraphs: [
            "Verantwortlicher und elektronische Kontaktmöglichkeit; Hosting und Protokolle; rechtliche Grundlagen; tatsächliche Empfänger und Auftragsverarbeiter; Aufbewahrungs- und Löschfristen; Kartenanbieter und Punkt; Formularbetrieb sowie mögliche internationale Übermittlungen.",
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
            "Texte, Gestaltung, Logo und Fotos können unterschiedlichen Rechten unterliegen. Aus der Anzeige auf dieser Website folgt keine allgemeine Erlaubnis zur Weiterverwendung. Die Pexels-Fotografien unterliegen der jeweiligen Lizenz. Quellen und Urheber sind an den Bildern angegeben.",
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
            "Zum Lesen der Website müssen Sie weder optionale Karten aktivieren noch Vertragsbedingungen akzeptieren. Das Kontaktformular bleibt bis zur gesonderten Einrichtung im ausdrücklich gekennzeichneten Demomodus.",
          ],
        },
      ],
    },
  },
  en: {
    legal: {
      title: "Legal notice",
      description: "Provider information and the status of this preview.",
      warning:
        "Provisional draft — not approved for publication. Legal particulars and this translation require completion and review before launch.",
      sections: [
        {
          title: "Contact details provided",
          paragraphs: [
            "Thermobau V&V · Named contact: Vasil Velikov Dimitrov · Blücherstr. 59, 67063 Ludwigshafen, Germany.",
            "The named contact is not automatically the legal provider or data controller. A confirmed business email address and the exact provider identity are still missing. The demo form is not a communication channel.",
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
            "Photographs are sourced from Pexels and labelled as illustrative. They are not verified customer projects and do not depict Thermobau V&V employees. Credits and source links accompany the photographs.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy notice",
      description:
        "Information about this preview and the processing details that still need to be confirmed.",
      warning:
        "Provisional privacy draft. The controller, contact details, hosting and operating arrangements, including this translation, require legal review before publication.",
      sections: [
        {
          title: "Controller and contact",
          paragraphs: [
            "Name provided: Thermobau V&V, Blücherstr. 59, 67063 Ludwigshafen. Named contact: Vasil Velikov Dimitrov. The exact data-controller identity and a business email address remain to be confirmed. No data protection officer is asserted.",
          ],
        },
        {
          title: "Technical operation",
          paragraphs: [
            "Accessing a website technically transmits information such as the IP address, requested path, time and browser information to the serving host. Whether and for how long the future hosting provider retains logs remains to be clarified.",
            "The actual hosting provider, processing arrangements, purposes, legal bases, recipients, retention periods and any international transfers must be documented before launch. Fonts and photographs are served locally. No analytics or marketing tools are integrated.",
          ],
        },
        {
          title: "Contact form",
          paragraphs: [
            "In the current demo mode, entries are checked only in your browser. No message is sent, no form data is transmitted to the contact API and the application does not store entries. Browser autofill works independently of this application.",
            "After separate activation, the form can transmit your name, email address, optional phone number, selected service and message through the contact API to a configured email service. A separate service then limits requests using pseudonymised technical identifiers. Recipients, providers, legal bases, deletion periods and transfers must be documented before activation. Please do not enter sensitive information.",
          ],
        },
        {
          title: "Privacy settings",
          paragraphs: [
            "Your optional-map choice is valid for no more than 180 days and is stored locally in your browser under thermobau-privacy-v2. Expired entries are removed during an open session or when you next visit the website. Only the version, choice and expiry are stored, not form entries. This storage manages your requested preferences. Optional services are off by default.",
            "You can change your choice using “Privacy settings” in the footer. Withdrawal removes an active map and prevents further loading. Withdrawal takes effect for the future. If browser storage is blocked, the choice lasts only for the current session.",
          ],
        },
        {
          title: "Maps and external links",
          paragraphs: [
            "Until the geographic point is confirmed, only a text address and external directions link are displayed. No embedded map is loaded. Following an external link opens its provider independently of this website’s preferences.",
            "A future Google Maps embed may load only after the point is confirmed and you give separate consent. This can transmit your IP address, browser data and other provider-processed information to Google. Provider terms, recipients, retention and any international transfers must be reviewed before activation. Google’s privacy information is linked below.",
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
          title: "Before publication",
          paragraphs: [
            "Confirm the controller and electronic contact, hosting and logs, legal bases, actual recipients and processors, retention and deletion periods, map provider and location, form operation and any international transfers.",
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
            "Text, design, the logo and photographs may be subject to different rights. Display on this website does not provide general permission for reuse. Pexels photographs are governed by their licence. Credits and sources accompany each image.",
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
            "Reading the website does not require activating optional maps or accepting commercial terms. The contact form remains in clearly labelled demo mode until separately configured.",
          ],
        },
      ],
    },
  },
  fr: {
    legal: {
      title: "Mentions légales",
      description:
        "Informations sur l’éditeur et état de cette version de présentation.",
      warning:
        "Projet provisoire — non approuvé pour publication. Les informations juridiques et cette traduction doivent être complétées et validées avant la mise en ligne.",
      sections: [
        {
          title: "Coordonnées communiquées",
          paragraphs: [
            "Thermobau V&V · Contact indiqué : Vasil Velikov Dimitrov · Blücherstr. 59, 67063 Ludwigshafen, Allemagne.",
            "Le contact indiqué ne désigne pas automatiquement l’éditeur juridique ou le responsable du traitement. L’adresse e-mail professionnelle confirmée et l’identité juridique exacte restent à préciser. Le formulaire de démonstration n’est pas un canal de communication.",
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
            "Les photographies proviennent de Pexels et sont signalées comme illustrations. Elles ne représentent pas des chantiers clients vérifiés ni les employés de Thermobau V&V. Le crédit et la source accompagnent chaque photographie.",
          ],
        },
      ],
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Informations sur cette version de présentation et les traitements restant à confirmer.",
      warning:
        "Projet provisoire. Le responsable, les coordonnées, l’hébergement et les conditions d’exploitation, ainsi que cette traduction, doivent être vérifiés juridiquement avant publication.",
      sections: [
        {
          title: "Responsable et contact",
          paragraphs: [
            "Dénomination communiquée : Thermobau V&V, Blücherstr. 59, 67063 Ludwigshafen. Contact indiqué : Vasil Velikov Dimitrov. L’identité exacte du responsable du traitement et l’adresse e-mail professionnelle restent à confirmer. Aucun délégué à la protection des données n’est déclaré.",
          ],
        },
        {
          title: "Fonctionnement technique",
          paragraphs: [
            "La consultation d’un site transmet techniquement au serveur notamment l’adresse IP, le chemin demandé, l’heure et des informations sur le navigateur. L’existence de journaux chez le futur hébergeur et leur durée de conservation restent à préciser.",
            "L’hébergeur réel, les contrats de sous-traitance, finalités, bases légales, destinataires, durées et éventuels transferts internationaux doivent être documentés avant publication. Les polices et photographies sont servies localement. Aucun outil d’analyse ni de marketing n’est intégré.",
          ],
        },
        {
          title: "Formulaire de contact",
          paragraphs: [
            "En démonstration, les champs sont vérifiés uniquement dans votre navigateur. Aucun message n’est envoyé, aucune donnée de formulaire n’est transmise à l’API de contact et l’application ne conserve pas les saisies. Le remplissage automatique du navigateur est indépendant de l’application.",
            "Après activation distincte, le formulaire pourra transmettre le nom, l’e-mail, le téléphone facultatif, la prestation et le message à un service d’e-mail configuré via l’API de contact. Un autre service limitera les demandes à l’aide d’identifiants techniques pseudonymisés. Destinataires, prestataires, bases légales, durées de suppression et transferts doivent être documentés avant activation. Ne saisissez pas de données sensibles.",
          ],
        },
        {
          title: "Préférences de confidentialité",
          paragraphs: [
            "Le choix relatif aux cartes facultatives est valable au maximum 180 jours et conservé localement dans le navigateur sous thermobau-privacy-v2. Une entrée expirée est supprimée pendant une session ouverte ou lors de la prochaine consultation du site. Seuls la version, le choix et l’expiration sont enregistrés, jamais les champs du formulaire. Ce stockage sert à gérer les préférences demandées. Les services facultatifs sont désactivés par défaut.",
            "Vous pouvez modifier ce choix via « Paramètres de confidentialité » dans le pied de page. Le retrait supprime une carte active et empêche tout nouveau chargement. Il prend effet pour l’avenir. Si le stockage du navigateur est bloqué, le choix ne dure que pendant la session en cours.",
          ],
        },
        {
          title: "Cartes et liens externes",
          paragraphs: [
            "Tant que le point géographique n’est pas confirmé, seules l’adresse textuelle et un lien d’itinéraire externe sont affichés. Aucune carte intégrée n’est chargée. Ouvrir un lien externe mène chez son fournisseur indépendamment des préférences de ce site.",
            "Une future intégration Google Maps ne pourra être chargée qu’après confirmation du point et votre accord distinct. Elle peut transmettre à Google votre adresse IP, des informations sur le navigateur et d’autres données traitées par ce fournisseur. Conditions, destinataires, durées et éventuels transferts internationaux doivent être vérifiés avant activation. Les informations de Google sont liées ci-dessous.",
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
          title: "À confirmer avant publication",
          paragraphs: [
            "Responsable et contact électronique, hébergement et journaux, bases légales, destinataires et sous-traitants réels, durées de conservation et de suppression, fournisseur et point cartographiques, fonctionnement du formulaire et éventuels transferts internationaux.",
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
            "Textes, présentation, logo et photographies peuvent relever de droits différents. Leur affichage ne constitue pas une autorisation générale de réutilisation. Les photographies Pexels sont régies par leur licence. Les crédits et sources accompagnent chaque image.",
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
            "Consulter le site ne nécessite ni d’activer les cartes facultatives ni d’accepter des conditions commerciales. Le formulaire reste en démonstration explicitement signalée jusqu’à sa configuration distincte.",
          ],
        },
      ],
    },
  },
};
export function getLegal(locale: Locale, page: "legal" | "privacy" | "terms") {
  return copy[locale][page];
}
