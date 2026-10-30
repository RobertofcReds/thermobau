import { siteConfig } from "@/config/site";
import { serviceLabels, serviceSlugs } from "@/data/service-identifiers";
import { pagePath, servicePath, type Locale } from "@/i18n/routing";
import { contactChannels } from "@/lib/company-contact";
import type { ServiceSlug } from "@/types/content";

export type ChatReply = {
  locale: Locale;
  text: string;
  links: Array<{ label: string; href: string }>;
  topic: string;
};

// Small, local knowledge base reviewed against the published editorial copy.
// No model, network request, storage or free-form execution is involved.
const serviceCopy: Record<Locale, Record<ServiceSlug, string>> = {
  de: {
    fassaden:
      "Vorhandene Fassaden vorbereiten, geeignete Putzschäden ausbessern und Oberflächen gestalten. Zustand, Fläche und Zugänglichkeit des Gebäudes werden zuerst besprochen.",
    trockenbau:
      "Nicht tragende Innenwände, Raumaufteilungen, Wand- und Deckenbekleidungen sowie die Vorbereitung der Plattenoberflächen. Raummaße, Nutzung und gewünschte Anschlüsse helfen bei der Planung.",
    putzarbeiten:
      "Untergründe vorbereiten, geeignete Innenwände verputzen und vorhandene Putzflächen überarbeiten. Zustand, Haftung und gewünschte Oberflächenstruktur bestimmen die nötige Vorbereitung.",
    malerarbeiten:
      "Wände und Decken streichen, Oberflächen vorbereiten und angrenzende Bereiche schützen. Beschreiben Sie die Räume, den Zustand der Flächen und Ihre Farbvorstellungen.",
    fliesenarbeiten:
      "Wand- und Bodenfliesen verlegen, geeignete Untergründe vorbereiten sowie Format, Fugen und Übergänge abstimmen. Besondere Anforderungen in Nassbereichen müssen für das Projekt geklärt werden.",
    renovierungen:
      "Bestehende Wohn- und Nutzräume verändern und zusammenhängende Putz-, Maler-, Fliesen- oder Trockenbauarbeiten abstimmen. Beschreiben Sie zuerst das gewünschte Ergebnis und die betroffenen Räume.",
  },
  en: {
    fassaden:
      "Preparing existing facades, repairing suitable damaged plaster areas and finishing surfaces. The building’s condition, affected area and access are discussed first.",
    trockenbau:
      "Non-load-bearing partitions, room layouts, wall and ceiling linings, and preparation of board surfaces. Room dimensions, intended use and junctions help with planning.",
    putzarbeiten:
      "Preparing substrates, plastering suitable interior walls and refurbishing existing plaster. Its condition, adhesion and desired texture determine the preparation needed.",
    malerarbeiten:
      "Painting walls and ceilings, preparing surfaces and protecting adjoining areas. Describe the rooms, the condition of the surfaces and your preferred colours.",
    fliesenarbeiten:
      "Laying wall and floor tiles, preparing suitable substrates and coordinating formats, joints and transitions. Requirements in wet areas must be checked for the project.",
    renovierungen:
      "Changing existing living or working spaces and coordinating related plastering, painting, tiling or drywall tasks. Start with the intended result and the rooms concerned.",
  },
  fr: {
    fassaden:
      "Préparer les façades existantes, réparer les zones d’enduit adaptées et travailler les finitions. L’état du bâtiment, les surfaces et l’accès sont d’abord discutés.",
    trockenbau:
      "Cloisons intérieures non porteuses, distribution des pièces, doublages de murs et plafonds, préparation des panneaux. Les dimensions, l’usage et les raccordements souhaités aident à préparer le projet.",
    putzarbeiten:
      "Préparer les supports, enduire les murs intérieurs adaptés et reprendre les enduits existants. L’état, l’adhérence et la texture souhaitée déterminent les préparations nécessaires.",
    malerarbeiten:
      "Peindre les murs et plafonds, préparer les surfaces et protéger les zones voisines. Décrivez les pièces, l’état des supports et les couleurs souhaitées.",
    fliesenarbeiten:
      "Poser du carrelage mural et au sol, préparer les supports adaptés et définir formats, joints et transitions. Les exigences des pièces humides doivent être vérifiées pour le projet.",
    renovierungen:
      "Transformer des espaces de vie ou de travail existants et coordonner enduits, peinture, carrelage ou cloisons sèches. Commencez par le résultat souhaité et les pièces concernées.",
  },
};

const copy = {
  de: {
    contact: "Direkt Kontakt aufnehmen",
    services: "Alle Leistungen",
    gallery: "Bilder ansehen",
    about: "Über Thermobau V&V",
    phone: "Telefon",
    email: "E-Mail",
    greeting:
      "Hallo! Ich beantworte automatisch Fragen zu Thermobau V&V anhand der Website. Wobei kann ich helfen: Leistungen, Projektanfrage, Standort oder Kontakt?",
    language: "Gerne, ich antworte auf Deutsch. Was möchten Sie wissen?",
    thanks: "Gern geschehen! Haben Sie noch eine Frage zu Thermobau V&V?",
    intro: "Die sechs Tätigkeitsbereiche von Thermobau V&V sind:",
    scope:
      "Welche Arbeiten für Ihr Vorhaben übernommen werden können, wird individuell mit Thermobau V&V abgestimmt.",
    quote:
      "Auf der Website sind keine festen Preise veröffentlicht. Ein mögliches Angebot hängt von Fläche, Zustand, Vorbereitung und gewünschtem Umfang ab. Ich kann keinen verbindlichen Preis nennen und keine Anfrage versenden. Bitte kontaktieren Sie Thermobau V&V direkt.",
    preparation:
      "Für eine erste Anfrage helfen: Ort und Art des Gebäudes, betroffene Räume oder Flächen, ungefähre Maße, aktueller Zustand, gewünschtes Ergebnis, Zeitraum und Zugänglichkeit. Der Umfang wird anschließend gemeinsam geklärt.",
    schedule:
      "Es gibt hier keine bestätigten freien Termine oder festen Ausführungszeiten. Die Planung hängt vom Umfang, den Materialien und gegebenenfalls der Witterung ab. Nennen Sie Ihren Wunschzeitraum im direkten Gespräch; ich kann keinen Termin buchen.",
    hours:
      "Öffnungszeiten sind derzeit nicht auf der Website bestätigt. Fragen Sie bitte direkt bei Thermobau V&V nach.",
    area: "Thermobau V&V hat seinen Standort in Ludwigshafen. Weitere Einsatzorte können individuell angefragt werden; ein fester Umkreis oder eine Zusage für einen anderen Ort ist hier nicht bestätigt.",
    photos:
      "Die Fotos veranschaulichen die Tätigkeitsbereiche. Sie sind keine dokumentierten Kundenprojekte von Thermobau V&V und zeigen nicht die Beschäftigten des Unternehmens.",
    form: "Das Kontaktformular ist aktuell im Demomodus: Die Eingaben werden nur im Browser geprüft, nicht versendet. Auch dieser Chat sendet keine Anfrage an das Unternehmen. Nutzen Sie für Ihr Vorhaben Telefon, E-Mail oder WhatsApp.",
    privacy:
      "Dieser automatische Chat verarbeitet Fragen lokal im Browser und sendet sie nicht an Thermobau V&V oder einen KI-Dienst. Das Gespräch wird nicht dauerhaft gespeichert. Kontaktlinks öffnen den gewählten Kanal; erst dort können Sie selbst eine Nachricht senden.",
    limitations:
      "Eine Garantie, technische Eignung, Qualifikation oder verbindliche Zusage kann ich nicht bestätigen. Anforderungen und nötige Nachweise müssen direkt für Ihr Projekt geklärt werden.",
    fallback:
      "Dazu habe ich keine verlässliche Antwort aus der Website. Ich kann zu den sechs Leistungen, zur Vorbereitung einer Anfrage, zum Standort und zu den Kontaktdaten helfen. Für die konkrete Beurteilung Ihres Projekts wenden Sie sich bitte direkt an Thermobau V&V.",
  },
  en: {
    contact: "Contact Thermobau V&V",
    services: "All services",
    gallery: "View the gallery",
    about: "About Thermobau V&V",
    phone: "Phone",
    email: "Email",
    greeting:
      "Hello! I answer questions about Thermobau V&V automatically using information from the website. How can I help: services, project enquiries, location or contact details?",
    language: "Of course, I’ll answer in English. What would you like to know?",
    thanks: "You’re welcome! Do you have another question about Thermobau V&V?",
    intro: "Thermobau V&V presents six areas of work:",
    scope:
      "The work that can be taken on for your project is agreed individually with Thermobau V&V.",
    quote:
      "The website does not publish fixed prices. A possible quote depends on the area, condition, preparation and intended scope. I cannot give a binding price or send an enquiry. Please contact Thermobau V&V directly.",
    preparation:
      "For an initial enquiry, include the location and building type, rooms or surfaces, approximate dimensions, current condition, desired result, preferred timing and access. The scope is then clarified together.",
    schedule:
      "No available appointments or fixed completion times are confirmed here. Planning depends on the scope, materials and, where relevant, weather. Discuss your preferred dates directly; I cannot book an appointment.",
    hours:
      "Opening hours are not currently confirmed on the website. Please ask Thermobau V&V directly.",
    area: "Thermobau V&V is based in Ludwigshafen. Other locations can be discussed individually; no fixed service radius or commitment to another location is confirmed here.",
    photos:
      "The photos illustrate the areas of work. They are not documented customer projects by Thermobau V&V and do not depict the company’s employees.",
    form: "The contact form is currently a demonstration: entries are checked in your browser and are not sent. This chat does not submit enquiries to the company either. Use phone, email or WhatsApp for your project.",
    privacy:
      "This automatic chat processes questions locally in your browser and does not send them to Thermobau V&V or an AI service. The conversation is not stored permanently. Contact links open the selected channel, where you can choose to send a message yourself.",
    limitations:
      "I cannot confirm a warranty, technical suitability, qualification or binding commitment. Project requirements and any necessary evidence must be checked directly for your project.",
    fallback:
      "I don’t have a reliable answer to that from the website. I can help with the six services, preparing an enquiry, the location and contact details. Please contact Thermobau V&V directly for an assessment of your project.",
  },
  fr: {
    contact: "Contacter Thermobau V&V",
    services: "Toutes les prestations",
    gallery: "Voir la galerie",
    about: "À propos de Thermobau V&V",
    phone: "Téléphone",
    email: "E-mail",
    greeting:
      "Bonjour ! Je réponds automatiquement aux questions sur Thermobau V&V à partir des informations du site. Comment puis-je vous aider : prestations, demande de projet, adresse ou coordonnées ?",
    language: "Bien sûr, je répondrai en français. Que souhaitez-vous savoir ?",
    thanks: "Avec plaisir ! Avez-vous une autre question sur Thermobau V&V ?",
    intro: "Thermobau V&V présente six domaines d’activité :",
    scope:
      "Les travaux pouvant être pris en charge pour votre projet sont convenus individuellement avec Thermobau V&V.",
    quote:
      "Le site ne publie pas de tarifs fixes. Une éventuelle offre dépend des surfaces, de leur état, des préparations et du périmètre souhaité. Je ne peux pas donner de prix ferme ni envoyer une demande. Contactez directement Thermobau V&V.",
    preparation:
      "Pour une première demande, précisez le lieu et le type de bâtiment, les pièces ou surfaces, les dimensions approximatives, l’état actuel, le résultat souhaité, la période envisagée et l’accès. Le périmètre sera ensuite précisé ensemble.",
    schedule:
      "Aucun créneau disponible ni délai d’exécution fixe n’est confirmé ici. La planification dépend des travaux, des matériaux et parfois de la météo. Discutez directement de la période souhaitée ; je ne peux pas réserver de rendez-vous.",
    hours:
      "Les horaires ne sont pas encore confirmés sur le site. Veuillez les demander directement à Thermobau V&V.",
    area: "Thermobau V&V est implantée à Ludwigshafen. D’autres lieux peuvent être discutés individuellement ; aucun rayon fixe ni intervention dans une autre ville n’est confirmé ici.",
    photos:
      "Les photos illustrent les métiers. Elles ne représentent pas des chantiers clients documentés de Thermobau V&V ni les employés de l’entreprise.",
    form: "Le formulaire de contact est actuellement une démonstration : les champs sont vérifiés dans le navigateur, sans envoi. Ce chat ne transmet pas non plus de demande à l’entreprise. Utilisez le téléphone, l’e-mail ou WhatsApp pour votre projet.",
    privacy:
      "Ce chat automatique traite les questions localement dans le navigateur, sans les envoyer à Thermobau V&V ni à un service d’IA. La conversation n’est pas enregistrée durablement. Les liens de contact ouvrent le canal choisi, où vous pouvez vous-même décider d’envoyer un message.",
    limitations:
      "Je ne peux confirmer ni garantie, ni conformité technique, ni qualification, ni engagement ferme. Les exigences et justificatifs nécessaires doivent être vérifiés directement pour votre projet.",
    fallback:
      "Je n’ai pas de réponse fiable à cette question dans les informations du site. Je peux vous aider sur les six prestations, la préparation d’une demande, l’adresse et les coordonnées. Pour évaluer votre projet, contactez directement Thermobau V&V.",
  },
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const languagePatterns: Record<Locale, RegExp> = {
  de: /\b(auf deutsch|in german|en allemand|deutsch bitte|german please)\b|^deutsch$/,
  en: /\b(in english|auf englisch|en anglais|english please)\b|^english$/,
  fr: /\b(en francais|in french|auf franzosisch|francais svp|french please)\b|^francais$/,
};

const languageWords: Record<Locale, RegExp> = {
  de: /\b(hallo|guten|danke|bitte|was|welche|welcher|welches|wie|wo|wann|ich|wir|sie|ihr|euch|uns|konnen|mochte|kostet|kosten|preis|preise|angebot|leistungen|trockenbau|malerarbeiten|fassaden|putzarbeiten|fliesen|renovierung|offnungszeiten|kontakt|termin)\b/g,
  en: /\b(hello|hi|thanks|thank|please|what|which|where|when|how|can|could|would|you|your|we|i|need|want|price|cost|quote|drywall|paint|painting|plastering|tiling|opening|hours|address|appointment|english|the|are|is|these)\b/g,
  fr: /\b(bonjour|bonsoir|salut|merci|svp|quel|quels|quelle|quelles|comment|combien|ou|quand|pouvez|vous|votre|vos|je|nous|les|est|sont|pour|avec|avez|faites|parlez|puis|besoin|souhaite|prix|devis|prestations|peinture|peindre|enduit|enduits|carrelage|cloison|cloisons|horaires|coordonnees|francais)\b/g,
};

const languageGrammar: Record<Locale, RegExp> = {
  de: /\b(hallo|bitte|danke|ich|sie|ihr|was|wie|welche|wann|wo)\b/g,
  en: /\b(hello|please|thanks|i|you|your|what|how|where|when|which)\b/g,
  fr: /\b(bonjour|bonsoir|merci|je|vous|votre|quel|quels|quelle|quelles|comment|combien|ou|quand)\b/g,
};

/** Short or shared words (e.g. "contact") keep the current conversation language. */
export function detectChatLocale(
  message: string,
  fallbackLocale: Locale = "de",
): Locale {
  const text = normalize(message.slice(0, 2000));
  for (const locale of ["de", "en", "fr"] as const)
    if (languagePatterns[locale].test(text)) return locale;
  const scores = (["de", "en", "fr"] as const).map((locale) => ({
    locale,
    score:
      new Set(text.match(languageWords[locale]) ?? []).size +
      new Set(text.match(languageGrammar[locale]) ?? []).size,
  }));
  scores.sort((a, b) => b.score - a.score);
  return scores[0].score > 0 && scores[0].score > scores[1].score
    ? scores[0].locale
    : fallbackLocale;
}

const servicePatterns: Record<ServiceSlug, RegExp> = {
  fassaden: /\b(fassaden?|fassadenarbeiten|facades?|facade work)\b/,
  trockenbau:
    /\b(trockenbau|innenausbau|drywall|dry wall|plasterboard|cloisons?|placo|doublages?|faux plafonds?)\b/,
  putzarbeiten: /\b(putz|putzarbeiten|verputzen|plaster|plastering|enduits?)\b/,
  malerarbeiten:
    /\b(maler|malerarbeiten|malen|streichen|anstriche?|paint|painting|painter|peinture|peindre)\b/,
  fliesenarbeiten:
    /\b(fliesen|fliesenarbeiten|tiling|tiles?|carrelage|carreaux)\b/,
  renovierungen:
    /\b(renovierung(?:en)?|renovieren|renovations?|renovate|renover)\b/,
};

/** Stable boundary for a future server-backed provider. Never uses the message as a URL. */
export function answerQuestion(
  message: string,
  fallbackLocale: Locale = "de",
  previousTopic?: string,
): ChatReply {
  const text = normalize(message.slice(0, 2000));
  const locale = detectChatLocale(message, fallbackLocale);
  const t = copy[locale];
  const matchedServices = serviceSlugs.filter((slug) =>
    servicePatterns[slug].test(text),
  );
  const contactLink = { label: t.contact, href: pagePath("contact", locale) };
  const servicesLink = {
    label: t.services,
    href: pagePath("services", locale),
  };
  const serviceLinks = (slugs: readonly ServiceSlug[]) =>
    slugs.map((slug) => ({
      label: serviceLabels[locale][slug],
      href: servicePath(slug, locale),
    }));
  const result = (
    topic: string,
    answer: string,
    links: ChatReply["links"] = [contactLink],
  ): ChatReply => ({ locale, topic, text: answer, links });

  if (!text) return result("greeting", t.greeting, [servicesLink, contactLink]);
  const asksPrice =
    /\b(preis|preise|kostet|kosten|budget|price|prices|cost|costs|prix|cout|coute|tarif|tarifs|combien|how much)\b/.test(
      text,
    );
  const asksPreparation =
    /\b(vorbereiten|vorbereitung|angaben|unterlagen|prepare|preparing|preparation|details needed|information needed|informations|preparer|documents|dimensions|masse|measurements)\b|\b(welche informationen|what information|which details|quelles donnees)\b/.test(
      text,
    );
  // Asking what to include in a quote is different from asking its price.
  if (asksPreparation && !asksPrice)
    return result("preparation", t.preparation, [
      ...serviceLinks(matchedServices),
      contactLink,
    ]);
  if (/\b(formular|formulaire|form)\b/.test(text))
    return result("form", t.form);
  if (
    /\b(datenschutz|privacy|confidentialite|gespeichert|speichert|stored|storage|stockage|enregistrees|enregistres|ki dienst|ai service|intelligence artificielle|are you ai|bist du eine ki)\b/.test(
      text,
    )
  )
    return result("privacy", t.privacy, [
      {
        label:
          locale === "de"
            ? "Datenschutz"
            : locale === "en"
              ? "Privacy"
              : "Confidentialité",
        href: pagePath("privacy", locale),
      },
    ]);
  if (
    /\b(garantie|garanties|garantiert|guarantee|guaranteed|warranty|certified|zertifiziert|zertifikate|certification|brandschutz|schallschutz|statik|asbest|asbestos|amiante)\b/.test(
      text,
    )
  )
    return result("limitations", t.limitations);
  if (
    /\b(telefon|telefonnummer|phone|telephone|numero|nummer|email|e mail|mail|whatsapp|kontakt|kontaktieren|kontaktiere|contact|contacter|joindre|anrufen|call|reach|appeler)\b/.test(
      text,
    )
  ) {
    const channels = contactChannels(siteConfig);
    const lines = [siteConfig.name, siteConfig.contactName];
    if (channels.phone) lines.push(`${t.phone} : ${channels.phone.label}`);
    if (channels.email) lines.push(`${t.email} : ${channels.email.label}`);
    if (channels.whatsapp) lines.push(`WhatsApp : ${siteConfig.whatsapp}`);
    return result("contact", lines.join("\n"), [
      ...Object.entries(channels).flatMap(([key, channel]) =>
        channel
          ? [
              {
                label:
                  key === "phone"
                    ? t.phone
                    : key === "email"
                      ? t.email
                      : "WhatsApp",
                href: channel.href,
              },
            ]
          : [],
      ),
      contactLink,
    ]);
  }
  if (
    asksPrice ||
    /\b(angebot|angebote|kostenvoranschlag|quote|quotation|estimate|devis)\b/.test(
      text,
    )
  )
    return result("quote", `${t.quote}\n\n${t.preparation}`, [
      ...serviceLinks(matchedServices),
      contactLink,
    ]);
  if (
    /\b(offnungszeiten|offen|geoffnet|uhr|opening hours|open|horaires|ouvert|ouverte|ouvrez)\b/.test(
      text,
    )
  )
    return result("hours", siteConfig.openingHours?.join(" · ") || t.hours);
  if (
    /\b(termin|termine|wann|dauer|lange|zeitplan|verfugbar|verfugbarkeit|starten|beginnen|appointment|available|availability|when|how long|schedule|start|deadline|delai|delais|quand|duree|disponible|disponibilites|rendez vous|commencer)\b/.test(
      text,
    )
  )
    return result("schedule", t.schedule, [
      ...serviceLinks(matchedServices),
      contactLink,
    ]);
  if (
    /\b(einsatzgebiet|umkreis|ausserhalb|kommt ihr|fahrt ihr|service area|outside|where do you work|where do you operate|cover|coverage|intervenez|intervention|intervenez vous|deplacez|zone|secteur|region)\b/.test(
      text,
    )
  )
    return result("area", t.area);
  if (
    /\b(adresse|address|anschrift|standort|location|where are|wo seid|wo sind|ou etes|ou se trouve)\b|^ludwigshafen$/.test(
      text,
    )
  ) {
    const address = siteConfig.address;
    const country =
      locale === "de"
        ? "Deutschland"
        : locale === "en"
          ? "Germany"
          : "Allemagne";
    return result(
      "address",
      `${siteConfig.name}\n${address.street}\n${address.postalCode} ${address.city}\n${country}`,
    );
  }
  if (
    /\b(formular|formulaire|form|senden|envoyer|send a message|send message)\b/.test(
      text,
    )
  )
    return result("form", t.form);
  if (
    /\b(fotos?|bilder|referenzen|photos?|pictures?|gallery|galerie|realisations?|projets realises|kundenprojekte)\b/.test(
      text,
    )
  )
    return result("photos", t.photos, [
      { label: t.gallery, href: pagePath("gallery", locale) },
    ]);
  if (matchedServices.length) {
    const paragraphs = matchedServices.map(
      (slug) => `${serviceLabels[locale][slug]} : ${serviceCopy[locale][slug]}`,
    );
    return result(
      matchedServices.length === 1
        ? `service:${matchedServices[0]}`
        : "services",
      `${paragraphs.join("\n\n")}\n\n${t.scope}`,
      [...serviceLinks(matchedServices), contactLink],
    );
  }
  if (
    /\b(leistungen|services|prestations|angebotene arbeiten|was macht|what do you do|que faites|metiers|plusieurs travaux|several services|mehrere arbeiten)\b/.test(
      text,
    )
  )
    return result(
      "services",
      `${t.intro}\n${serviceSlugs.map((slug) => `• ${serviceLabels[locale][slug]}`).join("\n")}\n\n${t.scope}`,
      [servicesLink, contactLink],
    );
  if (
    /\b(unternehmen|firma|ansprechpartner|wer seid|wer sind|about|company|who are|entreprise|interlocuteur|qui etes|vasil|dimitrov)\b/.test(
      text,
    )
  )
    return result(
      "company",
      `${siteConfig.name} · ${siteConfig.address.city}\n${siteConfig.contactName}\n\n${t.intro}\n${serviceSlugs.map((slug) => serviceLabels[locale][slug]).join(" · ")}`,
      [{ label: t.about, href: pagePath("about", locale) }, contactLink],
    );
  const previousService = serviceSlugs.find(
    (slug) => previousTopic === `service:${slug}`,
  );
  if (
    previousService &&
    /\b(mehr|details|more|plus|weiter|continue|encore|explain)\b/.test(text)
  )
    return result(
      previousTopic!,
      `${serviceLabels[locale][previousService]} : ${serviceCopy[locale][previousService]}\n\n${t.preparation}`,
      [...serviceLinks([previousService]), contactLink],
    );
  if (Object.values(languagePatterns).some((pattern) => pattern.test(text)))
    return result("language", t.language, [servicesLink, contactLink]);
  if (
    /^(danke|vielen dank|thanks|thank you|merci|merci beaucoup|super|ok|okay)[ !.]*$/.test(
      text,
    )
  )
    return result("thanks", t.thanks, []);
  if (
    /^(hallo|guten tag|guten morgen|guten abend|hello|hi|bonjour|bonsoir|salut|hey)[ !.]*$/.test(
      text,
    )
  )
    return result("greeting", t.greeting, [servicesLink, contactLink]);
  return result("fallback", t.fallback, [servicesLink, contactLink]);
}
