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
            "Die verwendeten Fotografien stammen aus der Bildbibliothek Pexels und veranschaulichen die Tätigkeitsbereiche. Sie zeigen keine nachgewiesenen Kundenprojekte und stellen keine Mitarbeiter von Thermobau V&V dar. Die einzelnen Bilder tragen keine Quellenzeile; Urheber, Quellen und Lizenznachweise werden in der internen Projektdokumentation aufbewahrt.",
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
          title: "Vor Veröffentlichung zu bestätigen",
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
            "Photographs are sourced from Pexels to illustrate the areas of work. They are not verified customer projects and do not depict Thermobau V&V employees. Individual photographs have no credit line; authors, sources and licence records are retained in the internal project documentation.",
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
          title: "Before publication",
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
            "Les photographies proviennent de Pexels et illustrent les domaines de travaux. Elles ne représentent pas des chantiers clients vérifiés ni les employés de Thermobau V&V. Les images individuelles n’affichent pas de ligne de crédit ; les auteurs, sources et justificatifs de licence sont conservés dans la documentation interne du projet.",
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
          title: "À confirmer avant publication",
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
