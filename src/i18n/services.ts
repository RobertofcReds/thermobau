import { services, serviceDetails } from "@/data/services";
import type { Locale } from "./routing";
import type { ServiceSlug } from "@/types/content";

export type LocalizedService = {
  slug: ServiceSlug;
  title: string;
  teaser: string;
  description: string;
  highlights: string[];
  faq: { question: string; answer: string }[];
  seo: { title: string; description: string };
  details: {
    heading: string;
    detail: string;
    planningHeading: string;
    planningText: string;
    preparation: string[];
    steps: { title: string; text: string }[];
  };
};
type Translation = {
  title: string;
  teaser: string;
  description: string;
  highlights: string[];
  heading: string;
  detail: string;
  planning: string;
  preparation: string[];
  faq: [string, string][];
};
const en: Translation[] = [
  {
    title: "Facade work",
    teaser:
      "Prepare, repair and redesign existing facade surfaces, from the substrate to the visible finish.",
    description:
      "A facade gives a building its character. Weathered finishes, damaged areas or a different colour scheme can be reasons for refurbishment. Thermobau V&V is a contact for facade work in Ludwigshafen. The building’s condition, the affected surfaces and the desired finish are the starting point for your enquiry.",
    highlights: [
      "Preparation of existing facade surfaces",
      "Repair of suitable damaged plaster areas",
      "Refurbishment and finishing of facade surfaces",
      "Coordination of colours, textures and junctions",
    ],
    heading: "A considered finish begins with the existing building.",
    detail:
      "Existing coatings, plaster and junctions need to be considered together. The right preparation depends on the condition of the surface. The proposed finish and any adjoining areas are discussed before the work is defined.",
    planning:
      "Describe what is visible and what you want to change. You do not need to diagnose the cause of damage yourself.",
    preparation: [
      "Building type and approximate affected surface area",
      "Visible cracks, loose coatings or other changes",
      "Access to the facade and preferred appearance",
    ],
    faq: [
      [
        "Can just one part of the facade be repaired?",
        "Describe the affected areas. Whether a local repair or a larger continuous surface is appropriate depends on the substrate and the intended overall appearance.",
      ],
      [
        "What information helps with the first enquiry?",
        "Include the building type, approximate area, visible damage, building height and access. These details help define what needs to be examined.",
      ],
      [
        "How is the timing planned?",
        "Exterior work must suit the building, the chosen materials and the weather. State any preferred dates; the actual schedule is discussed after the scope is clarified.",
      ],
    ],
  },
  {
    title: "Drywall",
    teaser:
      "Interior partitions, wall linings and ceiling finishes for the way you want to use your rooms.",
    description:
      "An additional room, a different layout or a new ceiling lining can change how an existing interior works. Drywall offers several possibilities. The planned use, existing walls, room heights and junctions are considered together before a suitable construction is discussed.",
    highlights: [
      "Non-load-bearing interior partitions",
      "Interior wall linings",
      "Ceiling linings and suspended ceilings",
      "Preparation of board surfaces for subsequent finishes",
    ],
    heading: "Rooms shaped around their intended use.",
    detail:
      "Door openings, junctions with existing elements and the final finish belong in the discussion from the start. Special construction requirements must be identified so that the scope and any necessary evidence can be checked for the specific project.",
    planning:
      "Explain the current and future use of the space. Approximate dimensions or a simple sketch can help clarify the intended layout.",
    preparation: [
      "Room dimensions and ceiling height",
      "Proposed layout, doors and openings",
      "Intended use and final wall finish",
    ],
    faq: [
      [
        "What should I say about the new layout?",
        "Describe how the space is used now and how you would like to use it. Include approximate dimensions, ceiling height and the position of doors and windows.",
      ],
      [
        "Can the surfaces be painted afterwards?",
        "The final finish should be planned early. The necessary preparation of the board surfaces and any subsequent painting are agreed as part of the scope.",
      ],
      [
        "What about fire or sound protection?",
        "Please state these requirements explicitly. The suitability of a construction and any required evidence must be checked for the project; no general compliance promise is made.",
      ],
    ],
  },
  {
    title: "Plastering",
    teaser:
      "Prepare substrates, address uneven areas and create a suitable surface for the next finish.",
    description:
      "A coherent wall finish starts beneath the visible surface. Plastering provides the basis for its appearance and later decoration. Whether a few areas need repairing or interior walls need replastering, the existing substrate, its condition and the room’s future use determine the approach.",
    highlights: [
      "Preparation of the selected substrate",
      "Interior plaster on suitable wall surfaces",
      "Repair and refurbishment of existing plaster",
      "Coordination of texture and subsequent finishes",
    ],
    heading: "The foundation for a well-finished wall.",
    detail:
      "A local repair may be sufficient, or a larger connected area may need attention. Junctions with surfaces that remain unchanged and any later painting are considered when defining the work.",
    planning:
      "Information about existing coatings, loose areas and the desired texture helps determine what preparation will be necessary.",
    preparation: [
      "Type and size of the wall surfaces",
      "Existing plaster, coatings and visible damage",
      "Preferred texture and subsequent finish",
    ],
    faq: [
      [
        "Does the old plaster need to be removed?",
        "That depends on its condition and adhesion and on the proposed finish. Mention loose areas, cracks or other visible changes so the necessary preparation can be discussed.",
      ],
      [
        "Can I request a smooth or textured finish?",
        "Explain the appearance you want. The appropriate material and finish depend on the substrate and any later decoration.",
      ],
      [
        "When can painting follow?",
        "Drying time depends on the material, build-up and conditions in the room. These requirements need to be included when coordinating later work.",
      ],
    ],
  },
  {
    title: "Painting",
    teaser:
      "Wall and ceiling finishes that refresh a room and give its colour scheme a clear direction.",
    description:
      "A lighter ceiling, calm wall colours or a feature surface can change the feel of a room. Painting involves more than choosing a colour: the existing coating, necessary preparation and use of the space all influence the suitable finish.",
    highlights: [
      "Painting of walls and ceilings",
      "Preparation of existing surfaces",
      "Colour schemes for individual or connected rooms",
      "Covering and protecting adjoining areas",
    ],
    heading: "Colour, preparation and the room as a whole.",
    detail:
      "An enquiry can cover one room or several connected spaces. We discuss the surfaces, how the surroundings should be protected and what preparation is needed before agreeing the colour scheme and scope.",
    planning:
      "You do not need a complete colour plan. Describe the atmosphere you want, the existing coating and how the room is used.",
    preparation: [
      "Rooms and wall or ceiling areas concerned",
      "Existing coatings and visible damage",
      "Colour ideas, furniture and use during the work",
    ],
    faq: [
      [
        "Do I need to choose colours before enquiring?",
        "No. Start with the rooms and the effect you would like. Specific shades and suitable coatings can be discussed afterwards.",
      ],
      [
        "What if a room is furnished or occupied?",
        "Mention which furniture will remain and which areas need to stay in use. Access, protection and the order of work can then be discussed.",
      ],
      [
        "Will painting alone cover damaged walls?",
        "Loose coatings or visible damage can require additional preparation. Describe the condition clearly so the necessary work can be assessed.",
      ],
    ],
  },
  {
    title: "Tiling",
    teaser:
      "Wall and floor tiles planned around the room, its use and the existing substrate.",
    description:
      "Tile format, colour, joints and transitions together determine the appearance of a tiled surface. The room geometry and existing substrate matter as much as the design. Your preferences and the building conditions form the starting point for discussing the work.",
    highlights: [
      "Installation of wall and floor tiles",
      "Preparation of suitable substrates",
      "Coordination of tile format, joints and layout",
      "Cuts and fitting at transitions and room edges",
    ],
    heading: "Consider the whole surface, down to each junction.",
    detail:
      "Tile layout, edge cuts and transitions should be discussed together. Existing floor levels, adjacent finishes and intended use can affect the necessary preparation. Special wet-area requirements and interfaces with other trades need explicit clarification.",
    planning:
      "If you have already selected tiles, provide their material, dimensions and intended location. Their suitability still needs to be checked.",
    preparation: [
      "Wall and floor areas, approximate dimensions",
      "Existing covering and available build-up height",
      "Tile format, intended use and room fittings",
    ],
    faq: [
      [
        "Can I bring tiles I have already selected?",
        "Yes. State their format, material and intended use. Suitability for the room and installation requirements must be agreed before work begins.",
      ],
      [
        "Can new tiles go over an existing covering?",
        "This requires checking the existing substrate, its condition, available build-up height and adjacent surfaces. Necessary preparation is part of the scope discussion.",
      ],
      [
        "What matters for a bathroom enquiry?",
        "Describe the wall and floor areas and existing fittings. Wet-area requirements and interfaces with other work need explicit agreement; tiling does not automatically include other trades.",
      ],
    ],
  },
  {
    title: "Renovations",
    teaser:
      "Refresh existing living and working spaces and coordinate the work that belongs together.",
    description:
      "Sometimes a room needs fresh paint; sometimes several changes are planned at once. Looking at the intended result and individual tasks together helps make a renovation more concrete. Thermobau V&V provides a starting point through its six areas of work, from facades to interior construction.",
    highlights: [
      "Refurbishment of existing living and working spaces",
      "Renovation of wall and ceiling surfaces",
      "Layout changes through drywall construction",
      "Coordination of related plastering, painting and tiling",
    ],
    heading: "One project, with the individual tasks clearly defined.",
    detail:
      "List the rooms, desired changes and priorities first. Dependencies between preparation, plaster, paint and tiles can then be discussed. The actual work undertaken and interfaces with other participants are defined before commissioning.",
    planning:
      "A complete specification is not necessary for a first conversation. Explain the desired result and which areas need to remain in use.",
    preparation: [
      "Affected rooms and desired result",
      "Individual tasks and priorities",
      "Continued use of rooms and preferred timing",
    ],
    faq: [
      [
        "How do I ask about several kinds of work?",
        "Start with the rooms and desired result, then list the tasks and priorities. This provides a useful starting point even when details are still open.",
      ],
      [
        "Does renovation automatically include every trade?",
        "No. The six areas described on this website define the starting point. Specific work and interfaces with other participants must be agreed before commissioning.",
      ],
      [
        "Can the project be split into stages?",
        "Mention which rooms must stay usable and what takes priority. Whether stages make sense depends on the sequence and dependencies between tasks.",
      ],
    ],
  },
];
const fr: Translation[] = [
  {
    title: "Travaux de façade",
    teaser:
      "Préparer, réparer et repenser les façades existantes, du support à la finition visible.",
    description:
      "La façade donne son caractère à un bâtiment. Une surface vieillie, des zones abîmées ou une nouvelle envie de couleur peuvent motiver sa rénovation. Thermobau V&V est votre interlocuteur à Ludwigshafen. L’état du bâtiment, les surfaces concernées et la finition souhaitée constituent le point de départ de votre demande.",
    highlights: [
      "Préparation des surfaces de façade existantes",
      "Réparation des zones d’enduit adaptées",
      "Rénovation et finition des surfaces de façade",
      "Coordination des couleurs, textures et raccords",
    ],
    heading: "Une finition cohérente commence par l’existant.",
    detail:
      "Revêtements, enduits et raccords doivent être considérés ensemble. La préparation dépend de l’état du support. La finition envisagée et les surfaces adjacentes sont discutées avant de définir les travaux.",
    planning:
      "Décrivez ce qui est visible et ce que vous souhaitez changer. Vous n’avez pas à diagnostiquer vous-même la cause des dégradations.",
    preparation: [
      "Type de bâtiment et superficie approximative",
      "Fissures, revêtements décollés ou autres changements visibles",
      "Accès à la façade et aspect souhaité",
    ],
    faq: [
      [
        "Peut-on rénover seulement une partie de la façade ?",
        "Décrivez les zones concernées. La pertinence d’une réparation locale ou d’une surface plus étendue dépend notamment du support et de l’aspect d’ensemble recherché.",
      ],
      [
        "Quelles informations fournir au premier contact ?",
        "Indiquez le type de bâtiment, la surface approximative, les dégradations visibles, la hauteur et les possibilités d’accès.",
      ],
      [
        "Comment planifier la période des travaux ?",
        "Les travaux extérieurs doivent être compatibles avec le bâtiment, les matériaux choisis et la météo. Précisez vos souhaits de calendrier ; le planning sera discuté après clarification du périmètre.",
      ],
    ],
  },
  {
    title: "Cloisons sèches",
    teaser:
      "Cloisons intérieures, doublages et plafonds adaptés à l’usage de vos pièces.",
    description:
      "Créer une pièce, changer une distribution ou habiller un plafond transforme l’usage d’un intérieur existant. La construction sèche offre plusieurs possibilités. L’usage futur, les murs existants, la hauteur des pièces et les raccords sont étudiés ensemble avant de discuter de la solution adaptée.",
    highlights: [
      "Cloisons intérieures non porteuses",
      "Doublages de murs intérieurs",
      "Habillages et plafonds suspendus",
      "Préparation des plaques pour les finitions suivantes",
    ],
    heading: "Des espaces pensés selon leur usage.",
    detail:
      "Les ouvertures de portes, les raccords avec l’existant et la finition finale font partie de la discussion dès le départ. Les exigences particulières doivent être précisées afin de vérifier la construction et les éventuels justificatifs pour le projet concerné.",
    planning:
      "Expliquez l’usage actuel et futur de la pièce. Des dimensions approximatives ou un croquis simple aident à préciser la distribution envisagée.",
    preparation: [
      "Dimensions des pièces et hauteur sous plafond",
      "Distribution souhaitée, portes et ouvertures",
      "Usage prévu et finition des murs",
    ],
    faq: [
      [
        "Que préciser pour une nouvelle distribution ?",
        "Décrivez l’usage actuel et futur. Ajoutez les dimensions approximatives, la hauteur ainsi que la position des portes et fenêtres.",
      ],
      [
        "Les surfaces peuvent-elles être peintes ensuite ?",
        "La finition doit être anticipée. La préparation nécessaire des plaques et les éventuels travaux de peinture sont définis dans le périmètre.",
      ],
      [
        "Comment traiter les exigences acoustiques ou incendie ?",
        "Signalez-les explicitement. La pertinence de la construction et les justificatifs nécessaires doivent être vérifiés pour le projet ; aucune conformité générale n’est promise.",
      ],
    ],
  },
  {
    title: "Enduits",
    teaser:
      "Préparer les supports, traiter les irrégularités et créer une surface adaptée à la finition.",
    description:
      "Une finition murale cohérente commence sous la surface visible. Les enduits préparent l’aspect du mur et sa décoration ultérieure. Pour des reprises ponctuelles ou de nouvelles surfaces, le support existant, son état et l’usage futur de la pièce déterminent la démarche.",
    highlights: [
      "Préparation des supports concernés",
      "Enduits intérieurs sur surfaces adaptées",
      "Réparation et reprise d’enduits existants",
      "Coordination de la texture et des finitions suivantes",
    ],
    heading: "La base d’une finition murale soignée.",
    detail:
      "Une réparation locale peut suffire, ou une surface plus étendue peut nécessiter une reprise. Les transitions avec les zones conservées et les peintures ultérieures sont prises en compte dans la définition des travaux.",
    planning:
      "Les informations sur les revêtements existants, les zones décollées et la texture souhaitée aident à déterminer la préparation nécessaire.",
    preparation: [
      "Type et superficie des murs concernés",
      "Enduits, revêtements et dégradations visibles",
      "Texture souhaitée et finition ultérieure",
    ],
    faq: [
      [
        "Faut-il enlever l’ancien enduit ?",
        "Cela dépend de son état, de son adhérence et de la finition prévue. Mentionnez les zones décollées, fissures et autres changements visibles.",
      ],
      [
        "Peut-on demander un aspect lisse ou texturé ?",
        "Décrivez l’aspect souhaité. Le matériau et la finition adaptés dépendent du support et de la décoration ultérieure.",
      ],
      [
        "Quand peut-on appliquer la peinture ?",
        "Le séchage dépend du matériau, de l’épaisseur et des conditions dans la pièce. Ces contraintes sont intégrées à l’organisation des étapes suivantes.",
      ],
    ],
  },
  {
    title: "Peinture",
    teaser:
      "Des peintures murales et de plafond pour rafraîchir les pièces et préciser leur ambiance.",
    description:
      "Un plafond clair, des couleurs calmes ou un mur accentué modifient la perception d’une pièce. Peindre ne se limite pas au choix d’une teinte : le revêtement existant, la préparation nécessaire et l’usage de l’espace influencent la finition adaptée.",
    highlights: [
      "Peinture des murs et plafonds",
      "Préparation des surfaces existantes",
      "Mise en couleur d’une ou plusieurs pièces",
      "Protection des surfaces adjacentes",
    ],
    heading: "Penser ensemble couleur, préparation et espace.",
    detail:
      "Votre demande peut concerner une pièce ou plusieurs espaces reliés. Les surfaces, la protection de l’environnement et la préparation sont discutées avant de préciser les couleurs et le périmètre.",
    planning:
      "Un nuancier définitif n’est pas indispensable. Décrivez l’ambiance souhaitée, le revêtement actuel et l’utilisation de la pièce.",
    preparation: [
      "Pièces, murs et plafonds concernés",
      "Revêtements existants et défauts visibles",
      "Couleurs envisagées, mobilier et occupation pendant les travaux",
    ],
    faq: [
      [
        "Faut-il choisir les couleurs avant la demande ?",
        "Non. Commencez par les pièces et l’effet recherché. Les teintes précises et les revêtements adaptés peuvent être discutés ensuite.",
      ],
      [
        "Que faire si la pièce est meublée ou occupée ?",
        "Précisez les meubles qui resteront et les zones à maintenir utilisables. L’accès, la protection et l’ordre des travaux pourront être discutés.",
      ],
      [
        "Une peinture suffit-elle sur un mur abîmé ?",
        "Un revêtement décollé ou des dégradations peuvent demander une préparation supplémentaire. Décrivez précisément l’état des surfaces.",
      ],
    ],
  },
  {
    title: "Carrelage",
    teaser:
      "Des carreaux muraux et au sol pensés selon la pièce, son usage et le support existant.",
    description:
      "Format, couleur, joints et transitions déterminent ensemble l’aspect d’une surface carrelée. La géométrie de la pièce et le support comptent autant que le dessin. Vos souhaits et les conditions du bâtiment sont le point de départ de la discussion.",
    highlights: [
      "Pose de carrelage mural et au sol",
      "Préparation des supports adaptés",
      "Choix du format, des joints et du calepinage",
      "Découpes et ajustements aux raccords et aux angles",
    ],
    heading: "Penser la surface entière, jusqu’aux raccords.",
    detail:
      "Le calepinage, les découpes et les transitions se discutent ensemble. Les niveaux existants, les revêtements voisins et l’usage prévu influencent les préparations. Les exigences des zones humides et les interfaces avec d’autres métiers doivent être clarifiées explicitement.",
    planning:
      "Si vous avez choisi des carreaux, indiquez leur matériau, leurs dimensions et leur destination. Leur compatibilité devra être vérifiée.",
    preparation: [
      "Surfaces murales et au sol, dimensions approximatives",
      "Revêtement actuel et hauteur disponible",
      "Format des carreaux, usage et équipements de la pièce",
    ],
    faq: [
      [
        "Puis-je proposer des carreaux déjà choisis ?",
        "Oui. Indiquez leur format, matériau et destination. Leur compatibilité avec la pièce et les conditions de pose doivent être convenues avant les travaux.",
      ],
      [
        "Peut-on carreler sur un ancien revêtement ?",
        "Il faut vérifier l’existant, l’état du support, la hauteur disponible et les surfaces adjacentes. Les préparations nécessaires font partie du périmètre à définir.",
      ],
      [
        "Que préciser pour une salle de bain ?",
        "Décrivez les murs, sols et équipements existants. Les exigences des zones humides et les interfaces doivent être convenues ; le carrelage n’inclut pas automatiquement d’autres corps de métier.",
      ],
    ],
  },
  {
    title: "Rénovations",
    teaser:
      "Faire évoluer les espaces de vie et de travail existants et coordonner les tâches liées.",
    description:
      "Une pièce demande parfois une nouvelle peinture, parfois plusieurs transformations à la fois. Considérer ensemble le résultat recherché et les tâches rend la rénovation plus concrète. Thermobau V&V propose un premier échange à partir de ses six domaines, des façades à l’aménagement intérieur.",
    highlights: [
      "Rénovation d’espaces de vie et de travail existants",
      "Reprise des surfaces murales et des plafonds",
      "Modification de distribution par cloisons sèches",
      "Coordination des enduits, peintures et carrelages liés",
    ],
    heading: "Un projet dont chaque tâche est définie.",
    detail:
      "Commencez par les pièces, les changements souhaités et les priorités. Les dépendances entre préparation, enduit, peinture et carrelage peuvent ensuite être discutées. Les travaux retenus et les interfaces avec d’autres intervenants sont définis avant commande.",
    planning:
      "Un cahier des charges complet n’est pas nécessaire au premier échange. Expliquez le résultat souhaité et les espaces qui doivent rester utilisables.",
    preparation: [
      "Pièces concernées et résultat recherché",
      "Tâches distinctes et priorités",
      "Occupation des espaces et calendrier souhaité",
    ],
    faq: [
      [
        "Comment demander plusieurs types de travaux ?",
        "Présentez les pièces et le résultat attendu, puis les tâches et priorités. C’est un point de départ utile même si des détails restent ouverts.",
      ],
      [
        "Une rénovation inclut-elle tous les métiers ?",
        "Non. Les six domaines décrits sur le site constituent la base de discussion. Les travaux précis et les interfaces doivent être définis avant la commande.",
      ],
      [
        "Peut-on prévoir plusieurs phases ?",
        "Indiquez les pièces à maintenir accessibles et les priorités. La pertinence des phases dépend de l’ordre et des liens entre les travaux.",
      ],
    ],
  },
];
const localizedSteps: Record<
  "en" | "fr",
  Record<ServiceSlug, LocalizedService["details"]["steps"]>
> = {
  en: {
    fassaden: [
      {
        title: "Describe the facade",
        text: "Tell us about your building and the facade surfaces you would like to refurbish.",
      },
      {
        title: "Discuss condition and access",
        text: "We consider the existing finish, the appearance you want and access to the building.",
      },
      {
        title: "Define the scope and quotation",
        text: "The proposed preparation, areas and finishes form the basis for the next discussion.",
      },
      {
        title: "Coordinate the work",
        text: "The sequence and timing are discussed in relation to the planned work and conditions on site.",
      },
    ],
    trockenbau: [
      {
        title: "Describe the new layout",
        text: "Identify the rooms and your idea for the new partitions or linings.",
      },
      {
        title: "Review the construction requirements",
        text: "Dimensions, existing building elements, junctions and special requirements are considered together.",
      },
      {
        title: "Define the scope and quotation",
        text: "Construction, surface preparation and any subsequent finishing work are clearly distinguished.",
      },
      {
        title: "Agree the sequence",
        text: "The order of work and access to the rooms are coordinated for your interior project.",
      },
    ],
    putzarbeiten: [
      {
        title: "Describe the wall surfaces",
        text: "Tell us about the areas concerned, the existing plaster and the change you have in mind.",
      },
      {
        title: "Discuss the substrate and finish",
        text: "We consider the substrate, possible preparation and the surface texture you would like.",
      },
      {
        title: "Define the scope and quotation",
        text: "The surfaces, repairs and subsequent stages of work are specified.",
      },
      {
        title: "Allow for the material and drying",
        text: "Planning takes account of the rooms, material application and necessary drying times.",
      },
    ],
    malerarbeiten: [
      {
        title: "Describe the rooms to be painted",
        text: "Identify the walls and ceilings you would like to repaint.",
      },
      {
        title: "Discuss colour and condition",
        text: "Colour preferences, the existing surfaces and use of the rooms are considered together.",
      },
      {
        title: "Define the scope and quotation",
        text: "Preparation, protection of adjacent areas and the proposed painting work are specified.",
      },
      {
        title: "Coordinate access and timing",
        text: "The order of work and schedule are agreed for the rooms involved.",
      },
    ],
    fliesenarbeiten: [
      {
        title: "Introduce the tiling project",
        text: "Tell us the room, the surfaces to be tiled and your ideas about the material.",
      },
      {
        title: "Review the existing surfaces",
        text: "The substrate, use, available build-up height and transitions are considered for the planned area.",
      },
      {
        title: "Define the scope and quotation",
        text: "Preparation, installation, cuts and junctions are described in the proposed work.",
      },
      {
        title: "Plan installation and use",
        text: "The sequence and subsequent use of the finished surfaces are coordinated together.",
      },
    ],
    renovierungen: [
      {
        title: "Share the result you want",
        text: "Describe the rooms, the desired condition and the changes that matter most to you.",
      },
      {
        title: "Bring the tasks together",
        text: "We relate individual tasks to the relevant areas of work and clarify open questions.",
      },
      {
        title: "Define the scope and quotation",
        text: "The proposed work, dependencies and limits of the commission are agreed explicitly.",
      },
      {
        title: "Plan the renovation sequence",
        text: "The order of work, possible phases and interfaces are coordinated around the use of your rooms.",
      },
    ],
  },
  fr: {
    fassaden: [
      {
        title: "Présenter la façade",
        text: "Décrivez votre bâtiment et les surfaces de façade que vous souhaitez rénover.",
      },
      {
        title: "Préciser l’état et l’accès",
        text: "Nous examinons la finition actuelle, vos souhaits d’aspect et l’accès au bâtiment.",
      },
      {
        title: "Définir le périmètre et le devis",
        text: "La préparation, les surfaces et les finitions prévues servent de base à la suite des échanges.",
      },
      {
        title: "Organiser l’intervention",
        text: "Le déroulement et le calendrier sont discutés en fonction des travaux et des conditions sur place.",
      },
    ],
    trockenbau: [
      {
        title: "Décrire la nouvelle distribution",
        text: "Indiquez les pièces et votre idée de cloisons ou d’habillages.",
      },
      {
        title: "Examiner les besoins de construction",
        text: "Dimensions, éléments existants, raccords et exigences particulières sont examinés ensemble.",
      },
      {
        title: "Définir le périmètre et le devis",
        text: "La construction, la préparation des surfaces et les éventuelles finitions sont clairement distinguées.",
      },
      {
        title: "Organiser les étapes",
        text: "L’ordre des interventions et l’accès aux pièces sont adaptés à votre projet d’aménagement.",
      },
    ],
    putzarbeiten: [
      {
        title: "Décrire les surfaces murales",
        text: "Présentez les zones concernées, l’enduit existant et le changement souhaité.",
      },
      {
        title: "Échanger sur le support et la finition",
        text: "Nous examinons le support, les préparations possibles et la texture recherchée.",
      },
      {
        title: "Définir le périmètre et le devis",
        text: "Les surfaces, les réparations et les étapes suivantes sont précisées.",
      },
      {
        title: "Prévoir l’application et le séchage",
        text: "L’organisation tient compte des pièces, de la mise en œuvre des matériaux et des temps de séchage nécessaires.",
      },
    ],
    malerarbeiten: [
      {
        title: "Présenter les pièces à peindre",
        text: "Indiquez les murs et les plafonds que vous souhaitez repeindre.",
      },
      {
        title: "Préciser les couleurs et l’état",
        text: "Les couleurs envisagées, les surfaces existantes et l’occupation des pièces sont discutées ensemble.",
      },
      {
        title: "Définir le périmètre et le devis",
        text: "La préparation, la protection des alentours et les travaux de peinture prévus sont précisés.",
      },
      {
        title: "Coordonner l’accès et le calendrier",
        text: "L’ordre des travaux et les délais sont convenus pour les pièces concernées.",
      },
    ],
    fliesenarbeiten: [
      {
        title: "Présenter le projet de carrelage",
        text: "Indiquez la pièce, les surfaces à carreler et vos idées de matériaux.",
      },
      {
        title: "Examiner les surfaces existantes",
        text: "Support, usage, hauteur disponible et raccords sont examinés pour la surface prévue.",
      },
      {
        title: "Définir le périmètre et le devis",
        text: "La préparation, la pose, les découpes et les raccords sont décrits dans les travaux envisagés.",
      },
      {
        title: "Prévoir la pose et la remise en usage",
        text: "L’ordre des travaux et l’utilisation ultérieure des surfaces sont coordonnés ensemble.",
      },
    ],
    renovierungen: [
      {
        title: "Partager le résultat souhaité",
        text: "Décrivez les pièces, l’état recherché et les transformations qui comptent le plus pour vous.",
      },
      {
        title: "Relier les différentes tâches",
        text: "Nous rattachons les tâches aux domaines adaptés et clarifions les questions ouvertes.",
      },
      {
        title: "Définir le périmètre et le devis",
        text: "Les travaux envisagés, leurs dépendances et les limites de l’intervention sont convenus expressément.",
      },
      {
        title: "Organiser la rénovation",
        text: "L’ordre, les phases éventuelles et les interfaces sont coordonnés avec l’utilisation de vos pièces.",
      },
    ],
  },
};

export function getServices(locale: Locale): LocalizedService[] {
  if (locale === "de")
    return services.map((s) => ({ ...s, details: serviceDetails[s.slug] }));
  return (locale === "en" ? en : fr).map((s, i) => ({
    slug: services[i].slug,
    title: s.title,
    teaser: s.teaser,
    description: s.description,
    highlights: s.highlights,
    faq: s.faq.map(([question, answer]) => ({ question, answer })),
    seo: {
      title: `${s.title} ${locale === "en" ? "in" : "à"} Ludwigshafen`,
      description: s.teaser + " Thermobau V&V, Ludwigshafen.",
    },
    details: {
      heading: s.heading,
      detail: s.detail,
      planningHeading:
        locale === "en"
          ? "Prepare your first enquiry."
          : "Préparer votre première demande.",
      planningText: s.planning,
      preparation: s.preparation,
      steps: localizedSteps[locale][services[i].slug],
    },
  }));
}
