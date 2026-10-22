import { photos } from "@/data/photos";
import type { Service, ServiceSlug } from "@/types/content";

export const serviceSlugs = [
  "fassaden",
  "trockenbau",
  "putzarbeiten",
  "malerarbeiten",
  "fliesenarbeiten",
  "renovierungen",
] as const satisfies readonly ServiceSlug[];

export const services: Service[] = [
  {
    slug: "fassaden",
    title: "Fassadenarbeiten",
    teaser:
      "Bestehende Fassaden überarbeiten und gestalten – vom Untergrund bis zur sichtbaren Oberfläche.",
    description:
      "Die Fassade gibt einem Gebäude sein Gesicht. Verwitterte Oberflächen, schadhafte Stellen oder der Wunsch nach einer neuen Gestaltung können Anlass für eine Überarbeitung sein. Thermobau V&V ist Ihr Ansprechpartner für Fassadenarbeiten in Ludwigshafen. Im Mittelpunkt stehen der Zustand des Gebäudes, die betroffenen Flächen und die gewünschte Oberfläche.",
    imageSrc: photos.facade.src,
    imageAlt: photos.facade.alt,
    highlights: [
      "Vorbereitung vorhandener Fassadenoberflächen",
      "Ausbesserung geeigneter schadhafter Putzstellen",
      "Überarbeitung und Gestaltung der Fassadenflächen",
      "Abstimmung von Oberflächen, Farben und Anschlüssen",
    ],
    sortOrder: 1,
    seo: {
      title: "Fassadenarbeiten in Ludwigshafen",
      description:
        "Fassaden vorbereiten, ausbessern und gestalten: Besprechen Sie Ihr Vorhaben mit Thermobau V&V in Ludwigshafen. Informationen zu Ablauf und Anfrage.",
    },
    faq: [
      {
        question: "Kann auch nur ein Teil der Fassade überarbeitet werden?",
        answer:
          "Beschreiben Sie, welche Flächen betroffen sind. Ob eine einzelne Stelle oder eine größere zusammenhängende Fläche bearbeitet werden sollte, hängt unter anderem vom Untergrund und vom gewünschten Gesamtbild ab. Der Umfang wird für Ihr Gebäude abgestimmt.",
      },
      {
        question: "Welche Informationen helfen bei der ersten Anfrage?",
        answer:
          "Nennen Sie die Art des Gebäudes, die ungefähre Größe der Flächen und sichtbare Veränderungen wie Risse oder abblätternde Beschichtungen. Auch Angaben zur Gebäudehöhe und zur Zugänglichkeit sind hilfreich.",
      },
      {
        question: "Wie wird der Zeitpunkt der Arbeiten geplant?",
        answer:
          "Fassadenarbeiten müssen zur Situation am Gebäude, zur vorgesehenen Ausführung und zu den Witterungsbedingungen passen. Zeitliche Wünsche können Sie bereits bei der Anfrage nennen; die konkrete Planung erfolgt nach Klärung der Arbeiten.",
      },
    ],
  },
  {
    slug: "trockenbau",
    title: "Trockenbau",
    teaser:
      "Neue Raumaufteilungen, Wandflächen und Deckenbekleidungen für Ihren Innenausbau.",
    description:
      "Ein zusätzlicher Raum, eine veränderte Aufteilung oder eine neue Deckenbekleidung: Trockenbau bietet vielfältige Möglichkeiten für bestehende Innenräume. Gemeinsam betrachten wir, wie Sie die Räume künftig nutzen möchten und welche Konstruktionen dafür infrage kommen. Vorhandene Wände, Raumhöhen und Anschlüsse bilden die Grundlage für die weitere Planung.",
    imageSrc: photos.drywall.src,
    imageAlt: photos.drywall.alt,
    highlights: [
      "Nicht tragende Innenwände und Raumaufteilungen",
      "Wandbekleidungen im Innenbereich",
      "Deckenbekleidungen und abgehängte Decken",
      "Vorbereitung der Plattenoberflächen für weitere Arbeiten",
    ],
    sortOrder: 2,
    seo: {
      title: "Trockenbau in Ludwigshafen",
      description:
        "Trockenbau für Raumaufteilung, Innenwände und Deckenbekleidungen in Ludwigshafen. Entdecken Sie den Tätigkeitsbereich von Thermobau V&V.",
    },
    faq: [
      {
        question: "Was sollte ich zur geplanten Raumaufteilung angeben?",
        answer:
          "Beschreiben Sie die bisherige und die zukünftige Nutzung. Ungefähre Raummaße, die Raumhöhe sowie die Position vorhandener Türen und Fenster helfen, Ihr Vorhaben einzuordnen.",
      },
      {
        question: "Kann die Oberfläche anschließend gestrichen werden?",
        answer:
          "Die spätere Wandgestaltung sollte von Anfang an mitgedacht werden. Welche Vorbereitung der Plattenoberflächen erforderlich ist und ob anschließende Malerarbeiten Teil des Auftrags sein sollen, wird gemeinsam festgelegt.",
      },
      {
        question:
          "Wie werden Anforderungen an Schall- oder Brandschutz behandelt?",
        answer:
          "Bitte nennen Sie solche Anforderungen ausdrücklich. Die Eignung einer Konstruktion und eventuell erforderliche Nachweise müssen für das konkrete Projekt geprüft werden; eine allgemeine Zusage lässt sich daraus nicht ableiten.",
      },
    ],
  },
  {
    slug: "putzarbeiten",
    title: "Putzarbeiten",
    teaser:
      "Untergründe vorbereiten, Unebenheiten bearbeiten und Wandoberflächen neu gestalten.",
    description:
      "Eine stimmige Wandgestaltung beginnt unter der sichtbaren Oberfläche. Putzarbeiten schaffen die Grundlage für das gewünschte Erscheinungsbild und die anschließende Gestaltung. Ob einzelne Flächen überarbeitet oder Innenwände neu verputzt werden sollen: Entscheidend sind der vorhandene Untergrund, sein Zustand und die spätere Nutzung des Raumes.",
    imageSrc: photos.plaster.src,
    imageAlt: photos.plaster.alt,
    highlights: [
      "Untergrundvorbereitung auf den vorgesehenen Flächen",
      "Innenputz auf geeigneten Wandflächen",
      "Ausbesserung und Überarbeitung bestehender Putzflächen",
      "Abstimmung von Oberflächenstruktur und Folgearbeiten",
    ],
    sortOrder: 3,
    seo: {
      title: "Putzarbeiten in Ludwigshafen",
      description:
        "Putzarbeiten von der Untergrundvorbereitung bis zur Oberflächenbearbeitung. Besprechen Sie Ihre Wandflächen mit Thermobau V&V in Ludwigshafen.",
    },
    faq: [
      {
        question: "Muss alter Putz vor den Arbeiten entfernt werden?",
        answer:
          "Das hängt von seiner Beschaffenheit und Haftung sowie von der vorgesehenen neuen Oberfläche ab. Beschreiben Sie bei Ihrer Anfrage lose Stellen, Risse oder andere sichtbare Veränderungen. Die notwendigen Vorarbeiten werden anschließend geklärt.",
      },
      {
        question: "Sind glatte und strukturierte Oberflächen möglich?",
        answer:
          "Teilen Sie uns mit, welches Erscheinungsbild Sie sich vorstellen. Welche Oberfläche und Ausführung zum Untergrund passen, wird für Ihr Vorhaben besprochen. Auch ein späterer Anstrich sollte dabei berücksichtigt werden.",
      },
      {
        question: "Wann können nachfolgende Malerarbeiten stattfinden?",
        answer:
          "Das richtet sich nach dem verwendeten Material, dem Aufbau und den Bedingungen im Raum. Erforderliche Trocknungszeiten werden bei der Abstimmung der nächsten Arbeitsschritte berücksichtigt.",
      },
    ],
  },
  {
    slug: "malerarbeiten",
    title: "Malerarbeiten",
    teaser:
      "Wand- und Deckenanstriche, die Räume auffrischen und Ihrer Gestaltung eine klare Richtung geben.",
    description:
      "Helle Decken, ruhige Wandfarben oder eine bewusst betonte Fläche verändern die Wirkung eines Raumes. Bei Malerarbeiten geht es deshalb um mehr als die Wahl eines Farbtons. Die vorhandene Beschichtung, notwendige Vorarbeiten und die Nutzung der Räume bestimmen mit, welche Ausführung zu Ihrem Vorhaben passt.",
    imageSrc: photos.painting.src,
    imageAlt: photos.painting.alt,
    highlights: [
      "Anstriche von Wand- und Deckenflächen",
      "Vorbereitung vorhandener Oberflächen für den Anstrich",
      "Farbgestaltung einzelner Räume oder zusammenhängender Bereiche",
      "Abdecken und Schützen angrenzender Flächen im Arbeitsbereich",
    ],
    sortOrder: 4,
    seo: {
      title: "Malerarbeiten in Ludwigshafen",
      description:
        "Neue Farbe für Wände und Decken: Malerarbeiten, Oberflächenvorbereitung und Raumgestaltung mit Thermobau V&V in Ludwigshafen besprechen.",
    },
    faq: [
      {
        question: "Muss ich die Farben vor der Anfrage festlegen?",
        answer:
          "Nein. Beschreiben Sie zunächst die gewünschte Wirkung und die Räume. Konkrete Farbtöne und die geeignete Beschichtung können im weiteren Gespräch abgestimmt werden.",
      },
      {
        question: "Was ist bei möblierten oder genutzten Räumen wichtig?",
        answer:
          "Teilen Sie mit, ob Möbel im Raum bleiben und welche Bereiche weiter genutzt werden. So lassen sich Zugänglichkeit, Schutzmaßnahmen und die Reihenfolge der Arbeiten vorab besprechen.",
      },
      {
        question: "Reicht ein neuer Anstrich bei beschädigten Wänden aus?",
        answer:
          "Sichtbare Schäden oder lose Beschichtungen können zusätzliche Vorarbeiten erfordern. Beschreiben Sie den Zustand möglichst genau. Welche Vorbereitung notwendig ist, wird anhand der jeweiligen Oberfläche geklärt.",
      },
    ],
  },
  {
    slug: "fliesenarbeiten",
    title: "Fliesenarbeiten",
    teaser:
      "Wand- und Bodenfliesen mit einem Verlegebild, das zum Raum und seiner Nutzung passt.",
    description:
      "Format, Farbe, Fugen und Übergänge bestimmen gemeinsam, wie eine geflieste Fläche wirkt. Bei der Planung betrachten wir die Raumgeometrie ebenso wie den vorhandenen Untergrund. Ob Wandflächen oder Boden: Ihre Vorstellungen und die baulichen Voraussetzungen bilden den Ausgangspunkt für die Abstimmung der Fliesenarbeiten.",
    imageSrc: photos.tiles.src,
    imageAlt: photos.tiles.alt,
    highlights: [
      "Verlegung von Wand- und Bodenfliesen",
      "Vorbereitung geeigneter Untergründe für den Fliesenbelag",
      "Abstimmung von Format, Fugen und Verlegebild",
      "Zuschnitte und Anpassung an Übergänge und Raumkanten",
    ],
    sortOrder: 5,
    seo: {
      title: "Fliesenarbeiten in Ludwigshafen",
      description:
        "Wand- und Bodenfliesen, Verlegebild und Untergrund: Informationen zu Fliesenarbeiten und Ihrer Anfrage bei Thermobau V&V in Ludwigshafen.",
    },
    faq: [
      {
        question:
          "Kann ich bereits ausgewählte Fliesen in die Planung einbringen?",
        answer:
          "Ja, nennen Sie uns Format, Material und den vorgesehenen Einsatzbereich. Die Eignung für den Raum und die Voraussetzungen für die Verlegung müssen vor der Ausführung abgestimmt werden.",
      },
      {
        question:
          "Lassen sich neue Fliesen auf einem vorhandenen Belag verlegen?",
        answer:
          "Das kann erst nach Prüfung des Bestands beurteilt werden. Entscheidend sind unter anderem der Zustand des Untergrunds, die verfügbare Aufbauhöhe und die angrenzenden Flächen. Notwendige Vorarbeiten gehören zur Klärung des Leistungsumfangs.",
      },
      {
        question: "Welche Angaben sind für Arbeiten im Badezimmer hilfreich?",
        answer:
          "Beschreiben Sie die betroffenen Wand- und Bodenflächen, die Nutzung und vorhandene Einbauten. Besondere Anforderungen in Nassbereichen sowie Schnittstellen zu anderen Arbeiten müssen ausdrücklich geklärt werden. Eine Fliesenanfrage umfasst nicht automatisch weitere Gewerke.",
      },
    ],
  },
  {
    slug: "renovierungen",
    title: "Renovierungen aller Art",
    teaser:
      "Bestehende Wohn- und Nutzräume verändern und die passenden Arbeiten aufeinander abstimmen.",
    description:
      "Manchmal braucht ein Raum neue Farbe, manchmal stehen mehrere Veränderungen gleichzeitig an. Bei einer Renovierung hilft es, das gewünschte Ergebnis und die einzelnen Arbeiten gemeinsam zu betrachten. Thermobau V&V bietet dafür einen Einstieg über seine sechs Tätigkeitsbereiche – von Fassadenarbeiten bis zum Innenausbau.",
    imageSrc: photos.renovation.src,
    imageAlt: photos.renovation.alt,
    highlights: [
      "Überarbeitung bestehender Wohn- und Nutzräume",
      "Renovierung von Wand- und Deckenoberflächen",
      "Veränderungen der Raumaufteilung durch Trockenbau",
      "Abstimmung zusammenhängender Putz-, Maler- und Fliesenarbeiten",
    ],
    sortOrder: 6,
    seo: {
      title: "Renovierungen in Ludwigshafen",
      description:
        "Eine Renovierung planen: Thermobau V&V in Ludwigshafen stellt passende Tätigkeitsbereiche für bestehende Wohn- und Nutzräume vor.",
    },
    faq: [
      {
        question:
          "Wie starte ich eine Anfrage mit mehreren unterschiedlichen Arbeiten?",
        answer:
          "Beschreiben Sie zuerst die betroffenen Räume und das gewünschte Ergebnis. Ergänzen Sie anschließend die einzelnen Aufgaben und Ihre Prioritäten. Auch wenn noch nicht jedes Detail feststeht, ist das ein guter Ausgangspunkt für ein Gespräch.",
      },
      {
        question:
          "Sind mit einer Renovierung automatisch alle Gewerke abgedeckt?",
        answer:
          "Nein. Ausgangspunkt sind die sechs auf dieser Website beschriebenen Tätigkeitsbereiche. Welche konkreten Arbeiten übernommen werden können und welche Schnittstellen zu anderen Beteiligten bestehen, wird vor einer Beauftragung festgelegt.",
      },
      {
        question:
          "Kann die Renovierung in mehreren Abschnitten besprochen werden?",
        answer:
          "Nennen Sie uns, welche Räume weiter genutzt werden und welche Arbeiten Vorrang haben. Ob sich Ihr Vorhaben sinnvoll in Abschnitte aufteilen lässt, hängt von den einzelnen Arbeitsschritten und ihren Abhängigkeiten ab.",
      },
    ],
  },
];

type ServiceDetails = {
  heading: string;
  detail: string;
  planningHeading: string;
  planningText: string;
  preparation: string[];
  secondaryImage: { src: string; alt: string };
  steps: { title: string; text: string }[];
};

export const serviceDetails: Record<ServiceSlug, ServiceDetails> = {
  fassaden: {
    heading: "Eine neue Oberfläche. Ein stimmiger Gesamteindruck.",
    detail:
      "Bevor über Farben und Strukturen entschieden wird, steht die vorhandene Bausubstanz im Mittelpunkt. Beschichtungen, Putzstellen und Anschlüsse müssen zusammen betrachtet werden. Daraus ergibt sich, welche Vorbereitung und Bearbeitung für die vorgesehene Fassadengestaltung sinnvoll sind.",
    planningHeading: "Was Ihre Fassade mitbringt.",
    planningText:
      "Eine kurze Beschreibung des Bestands hilft, die ersten Fragen einzuordnen. Sie müssen mögliche Schadensursachen nicht selbst beurteilen. Entscheidend ist zunächst, was sichtbar ist und was Sie verändern möchten.",
    preparation: [
      "Gebäudeart und ungefähr betroffene Fläche",
      "Sichtbare Veränderungen der vorhandenen Oberfläche",
      "Zugang zur Fassade und gewünschte Gestaltung",
    ],
    secondaryImage: photos.building,
    steps: [
      {
        title: "Kontakt aufnehmen",
        text: "Beschreiben Sie Ihr Gebäude und die Fassadenflächen, die Sie überarbeiten möchten.",
      },
      {
        title: "Vorhaben besprechen",
        text: "Wir klären den vorhandenen Zustand, Ihre Gestaltungswünsche und die Zugänglichkeit.",
      },
      {
        title: "Umfang und Angebot klären",
        text: "Die vorgesehenen Vorarbeiten, Flächen und Oberflächen bilden die Grundlage für die weitere Abstimmung.",
      },
      {
        title: "Umsetzung abstimmen",
        text: "Ablauf und zeitliche Planung werden passend zu den Arbeiten und den örtlichen Bedingungen besprochen.",
      },
    ],
  },
  trockenbau: {
    heading: "Innenräume, die sich Ihrer Nutzung anpassen.",
    detail:
      "Auch Details wie Türöffnungen, Übergänge zu bestehenden Bauteilen und die spätere Oberflächengestaltung gehören zur Planung. Wenn besondere Anforderungen an eine Konstruktion bestehen, sollten sie bereits in der Anfrage genannt werden. So lässt sich der vorgesehene Leistungsumfang von Beginn an klar eingrenzen.",
    planningHeading: "Von der Raumidee zur konkreten Aufgabe.",
    planningText:
      "Sie möchten einen Arbeitsbereich abtrennen oder eine bestehende Aufteilung verändern? Beschreiben Sie die Nutzung und die Grenzen des Raumes. Eine einfache Skizze kann später helfen, die Vorstellungen gemeinsam zu präzisieren.",
    preparation: [
      "Raummaße und vorhandene Raumhöhe",
      "Gewünschte Aufteilung, Türen und Öffnungen",
      "Geplante Nutzung und spätere Wandgestaltung",
    ],
    secondaryImage: photos.renovation,
    steps: [
      {
        title: "Kontakt aufnehmen",
        text: "Nennen Sie die Räume und Ihre Idee für die neue Aufteilung oder Bekleidung.",
      },
      {
        title: "Vorhaben besprechen",
        text: "Maße, vorhandene Bauteile, Anschlüsse und besondere Anforderungen werden gemeinsam betrachtet.",
      },
      {
        title: "Umfang und Angebot klären",
        text: "Konstruktionen, Oberflächenvorbereitung und mögliche Folgearbeiten werden voneinander abgegrenzt.",
      },
      {
        title: "Umsetzung abstimmen",
        text: "Die Reihenfolge der Arbeiten und die Zugänglichkeit der Räume werden für Ihr Vorhaben abgestimmt.",
      },
    ],
  },
  putzarbeiten: {
    heading: "Der richtige Ausgangspunkt für Ihre Wandgestaltung.",
    detail:
      "Bei bestehenden Flächen können einzelne Ausbesserungen ausreichen oder zusammenhängende Arbeiten erforderlich sein. Die Entscheidung hängt vom Untergrund und vom gewünschten Ergebnis ab. Auch Übergänge zu unveränderten Flächen und nachfolgende Anstriche werden in die Abstimmung einbezogen.",
    planningHeading: "Untergrund und Oberfläche zusammen denken.",
    planningText:
      "Ein neuer Anstrich oder eine andere Wandgestaltung beginnt mit einer passenden Vorbereitung. Hinweise zu vorhandenen Beschichtungen und sichtbaren Veränderungen helfen, diese Vorbereitung einzuordnen.",
    preparation: [
      "Art und Größe der zu bearbeitenden Wandflächen",
      "Vorhandener Putz, Beschichtungen und sichtbare Schäden",
      "Gewünschte Struktur und anschließende Gestaltung",
    ],
    secondaryImage: photos.painting,
    steps: [
      {
        title: "Kontakt aufnehmen",
        text: "Beschreiben Sie die Flächen, den vorhandenen Putz und die gewünschte Veränderung.",
      },
      {
        title: "Vorhaben besprechen",
        text: "Untergrund, mögliche Vorarbeiten und die gewünschte Oberflächenstruktur stehen im Mittelpunkt.",
      },
      {
        title: "Umfang und Angebot klären",
        text: "Die vorgesehenen Flächen, Ausbesserungen und weiteren Arbeitsschritte werden konkretisiert.",
      },
      {
        title: "Umsetzung abstimmen",
        text: "Der Ablauf berücksichtigt die Räume, die Materialverarbeitung und erforderliche Trocknungszeiten.",
      },
    ],
  },
  malerarbeiten: {
    heading: "Neue Farbe für Räume mit Charakter.",
    detail:
      "Einzelne Zimmer oder mehrere zusammenhängende Räume können in die Anfrage aufgenommen werden. Dabei klären wir, welche Wand- und Deckenflächen bearbeitet werden sollen, wie die Umgebung geschützt wird und welche Vorarbeiten notwendig sind. Die Farbgestaltung und der konkrete Arbeitsumfang werden passend zur Situation abgestimmt.",
    planningHeading: "Ihre Vorstellungen geben die Richtung vor.",
    planningText:
      "Sie müssen noch keinen fertigen Farbplan haben. Ein Eindruck von der gewünschten Atmosphäre, der aktuellen Beschichtung und der Nutzung der Räume reicht als Einstieg in das Gespräch.",
    preparation: [
      "Betroffene Räume sowie Wand- und Deckenflächen",
      "Vorhandene Beschichtungen und erkennbare Schäden",
      "Farbwünsche, Möblierung und Nutzung während der Arbeiten",
    ],
    secondaryImage: photos.plaster,
    steps: [
      {
        title: "Kontakt aufnehmen",
        text: "Beschreiben Sie Ihre Räume und welche Wand- oder Deckenflächen einen neuen Anstrich erhalten sollen.",
      },
      {
        title: "Vorhaben besprechen",
        text: "Farbvorstellungen, Oberflächenzustand und die Nutzung der Räume werden gemeinsam besprochen.",
      },
      {
        title: "Umfang und Angebot klären",
        text: "Vorbereitung, Schutz angrenzender Bereiche und die vorgesehenen Anstriche werden festgelegt.",
      },
      {
        title: "Umsetzung abstimmen",
        text: "Zugang, Reihenfolge und zeitlicher Rahmen werden für die betroffenen Räume abgestimmt.",
      },
    ],
  },
  fliesenarbeiten: {
    heading: "Flächen gestalten. Übergänge mitdenken.",
    detail:
      "Ein durchdachtes Verlegebild berücksichtigt Raumkanten, Türen und vorhandene Einbauten. Besonders im Bestand sind auch die Aufbauhöhe und der Übergang zu benachbarten Belägen wichtig. Diese Details werden zusammen mit der Eignung des Untergrunds und dem vorgesehenen Material besprochen.",
    planningHeading: "Der Raum bestimmt die Details.",
    planningText:
      "Eine Beschreibung der vorhandenen Situation ist ebenso hilfreich wie Ihre Auswahl an Fliesen. Falls noch kein Material feststeht, können Format, Farbwirkung und Nutzung zunächst als Wünsche aufgenommen werden.",
    preparation: [
      "Raum, Nutzung und ungefähre Wand- oder Bodenfläche",
      "Vorhandener Belag und Übergänge zu angrenzenden Flächen",
      "Gewünschte Fliesenformate und vorhandene Einbauten",
    ],
    secondaryImage: photos.renovation,
    steps: [
      {
        title: "Kontakt aufnehmen",
        text: "Nennen Sie den Raum, die zu fliesenden Flächen und Ihre Vorstellungen zum Material.",
      },
      {
        title: "Vorhaben besprechen",
        text: "Untergrund, Nutzung, Aufbauhöhe und Übergänge werden für die geplante Fläche betrachtet.",
      },
      {
        title: "Umfang und Angebot klären",
        text: "Vorarbeiten, Verlegung, Zuschnitte und Anschlüsse werden im konkreten Arbeitsumfang beschrieben.",
      },
      {
        title: "Umsetzung abstimmen",
        text: "Die Reihenfolge und die spätere Nutzung der bearbeiteten Flächen werden gemeinsam abgestimmt.",
      },
    ],
  },
  renovierungen: {
    heading: "Aus einzelnen Wünschen wird ein klares Vorhaben.",
    detail:
      "Bei zusammenhängenden Maßnahmen ist die Reihenfolge besonders wichtig: Neue Raumaufteilungen beeinflussen Wandflächen, vorbereitete Oberflächen die spätere Gestaltung. Wir besprechen, welche der angebotenen Leistungen zu Ihrer Renovierung passen. Der vereinbarte Umfang bestimmt, welche Arbeiten Bestandteil des Auftrags sind.",
    planningHeading: "Zuerst das Ziel. Dann die einzelnen Schritte.",
    planningText:
      "Eine vollständige Aufgabenliste ist für den ersten Kontakt nicht nötig. Beginnen Sie mit den Räumen, dem gewünschten Zustand und den Arbeiten, die Ihnen besonders wichtig sind. Daraus lassen sich die nächsten Fragen ableiten.",
    preparation: [
      "Betroffene Wohn- oder Nutzräume und ihr aktueller Zustand",
      "Gewünschte Veränderungen und persönliche Prioritäten",
      "Nutzung während der Arbeiten und zeitliche Vorstellungen",
    ],
    secondaryImage: photos.drywall,
    steps: [
      {
        title: "Kontakt aufnehmen",
        text: "Beschreiben Sie Ihre Räume, den gewünschten Zustand und die wichtigsten Veränderungen.",
      },
      {
        title: "Vorhaben besprechen",
        text: "Wir ordnen die einzelnen Aufgaben den passenden Tätigkeitsbereichen zu und klären offene Fragen.",
      },
      {
        title: "Umfang und Angebot klären",
        text: "Die vorgesehenen Arbeiten, Abhängigkeiten und Grenzen des Auftrags werden ausdrücklich abgestimmt.",
      },
      {
        title: "Umsetzung abstimmen",
        text: "Reihenfolge, mögliche Abschnitte und Schnittstellen werden auf die Nutzung Ihrer Räume abgestimmt.",
      },
    ],
  },
};

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
