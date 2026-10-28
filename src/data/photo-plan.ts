import { photos } from "./photos";
import type { Locale } from "@/i18n/routing";
import type { ServiceSlug } from "@/types/content";

export type EditorialPhoto = {
  src: string;
  alt: Record<Locale, string>;
  credit: string;
  sourceUrl: string;
};
function existing(
  key: keyof typeof photos,
  en: string,
  fr: string,
): EditorialPhoto {
  const p = photos[key];
  return {
    src: p.src,
    credit: p.credit,
    sourceUrl: p.sourceUrl,
    alt: { de: p.alt.replace(/ – Symbolbild.*/, ""), en, fr },
  };
}
function stock(
  id: number,
  author: string,
  slug: string,
  de: string,
  en: string,
  fr: string,
): EditorialPhoto {
  return {
    src: `/images/photos/pexels-${id}.webp`,
    credit: `${author} / Pexels`,
    sourceUrl: `https://www.pexels.com/photo/${slug}-${id}/`,
    alt: { de, en, fr },
  };
}
const p = {
  facade: existing(
    "facade",
    "Scaffolding in front of a building facade",
    "Échafaudage devant une façade",
  ),
  drywall: existing(
    "drywall",
    "Board installation with wall framing visible",
    "Pose de panneaux avec ossature murale visible",
  ),
  plaster: existing(
    "plaster",
    "Smoothing an interior wall with a trowel",
    "Lissage d’un mur intérieur à la taloche",
  ),
  painting: existing(
    "painting",
    "Painting an interior wall with a roller",
    "Peinture d’un mur intérieur au rouleau",
  ),
  tiles: existing(
    "tiles",
    "Spreading adhesive for floor tiles",
    "Application de colle pour carreaux au sol",
  ),
  renovation: existing(
    "renovation",
    "Room under renovation with tools and a ladder",
    "Pièce en rénovation avec outils et escabeau",
  ),
  facadeScaffold: existing(
    "facadeScaffold",
    "Workers on scaffolding in front of a facade",
    "Artisans sur un échafaudage devant une façade",
  ),
  drywallPlan: {
    ...existing(
      "drywallDetail",
      "Worker marking a board during interior work",
      "Artisan traçant un panneau lors de travaux intérieurs",
    ),
    alt: {
      de: "Handwerker zeichnet ein Plattenelement im Innenausbau an",
      en: "Worker marking a board during interior work",
      fr: "Artisan traçant un panneau lors de travaux intérieurs",
    },
  },
  paintingPrep: existing(
    "paintingPrep",
    "Preparing paint for interior renovation",
    "Préparation de peinture pour une rénovation intérieure",
  ),
  renovationKitchen: existing(
    "renovationKitchen",
    "Kitchen space with tools during renovation",
    "Espace cuisine avec outils pendant une rénovation",
  ),
  facadeWorkers: existing(
    "facadeWorkers",
    "Workers renovating an urban facade",
    "Artisans rénovant une façade urbaine",
  ),
  tilesWall: existing(
    "tilesWall",
    "Positioning a tile against a kitchen wall",
    "Positionnement d’un carreau contre un mur de cuisine",
  ),
  protection: {
    ...existing(
      "paintingDetail",
      "Protective equipment during indoor painting",
      "Équipement de protection pendant des travaux de peinture",
    ),
    alt: {
      de: "Schutzausrüstung bei Malerarbeiten im Innenraum",
      en: "Protective equipment during indoor painting",
      fr: "Équipement de protection pendant des travaux de peinture",
    },
  },
  facadeFinish: existing(
    "building",
    "Renovated plaster and brick facade",
    "Façade rénovée en enduit et briques",
  ),
  heroFacade: stock(
    4953232,
    "Damir Mijailovic",
    "worker-skim-coating-wall-with-liquid-plaster",
    "Handwerker mit Sicherungsgurt beim Auftragen von Putz an einer Fassade",
    "Worker wearing a safety harness applying plaster to a facade",
    "Artisan équipé d’un harnais appliquant de l’enduit sur une façade",
  ),
  heroInterior: stock(
    7217928,
    "Blue Bird",
    "a-wooden-stepladder-inside-a-room",
    "Heller Raum mit Holzleiter, Abdeckfolie und Werkzeugen für Malerarbeiten",
    "Bright room with a wooden stepladder, protective sheets and painting tools",
    "Pièce lumineuse avec escabeau en bois, bâches et outils de peinture",
  ),
  heroFinishing: stock(
    5493658,
    "Antoni Shkraba",
    "a-construction-worker-working-on-the-wall-of-a-house",
    "Handwerker mit Helm und Atemschutz bei der Bearbeitung einer hellen Wand",
    "Worker wearing a helmet and respirator finishing a light-coloured wall",
    "Artisan portant un casque et un masque lors de la finition d’un mur clair",
  ),
  brightFacade: stock(
    34264478,
    "Sóc Năng Động",
    "workers-painting-exterior-of-urban-building",
    "Handwerker auf einem Gerüst bei Arbeiten an einer hellen Gebäudefassade",
    "Worker on scaffolding working on a light-coloured building facade",
    "Artisan sur un échafaudage intervenant sur une façade de couleur claire",
  ),
  drywallRoom: stock(
    6474207,
    "Tima Miroshnichenko",
    "photo-of-green-wall-being-repaired",
    "Grüne Gipskartonwand mit verspachtelten Fugen und Schraubstellen",
    "Green plasterboard wall with filled joints and screw heads",
    "Cloison en plaques de plâtre vertes avec joints et têtes de vis enduits",
  ),
  ceiling: stock(
    6474123,
    "Tima Miroshnichenko",
    "a-man-in-white-shirt-painting-a-house",
    "Bearbeitung einer Deckenbekleidung aus Gipskarton",
    "Finishing a plasterboard ceiling lining",
    "Finition d’un plafond en plaques de plâtre",
  ),
  room: stock(
    5691545,
    "Ksenia Chernaya",
    "new-apartment-interior-during-renovation-process-in-daylight",
    "Blick durch eine Tür in einen Raum mit Werkzeugen",
    "View through a doorway into a room with renovation tools",
    "Vue par une porte sur une pièce avec des outils de rénovation",
  ),
  plasterTools: stock(
    5691601,
    "Ksenia Chernaya",
    "crop-man-with-putty-knives-and-cement",
    "Spachtel und Kelle mit frischer Spachtelmasse",
    "Putty knives and trowel holding fresh filler",
    "Spatules et taloche avec de l’enduit frais",
  ),
  tiling: stock(
    29181495,
    "Sergei Starostin",
    "unfinished-wall-tiling-in-construction-site",
    "Wand mit teilweise verlegten Fliesen und offenem Untergrund",
    "Partly tiled wall with exposed substrate",
    "Mur partiellement carrelé avec support apparent",
  ),
  paintTray: stock(
    5691707,
    "Ksenia Chernaya",
    "roller-and-brush-placed-on-paint-tray",
    "Farbrolle und Pinsel in einer Farbwanne",
    "Paint roller and brush in a paint tray",
    "Rouleau et pinceau dans un bac de peinture",
  ),
  brush: stock(
    10194607,
    "Valeria Palesska",
    "a-paint-roller-and-a-paintbrush-on-a-tray-with-white-paint",
    "Pinsel und Rolle mit weißer Farbe",
    "Brush and roller with white paint",
    "Pinceau et rouleau avec de la peinture blanche",
  ),
  tools: stock(
    5799083,
    "Ivan S",
    "paint-brush-and-paint-rollers-covered-in-paint",
    "Malerwerkzeuge und Farbwanne auf einer Holzkiste",
    "Painting tools and tray on a wooden crate",
    "Outils de peinture et bac sur une caisse en bois",
  ),
  texture: stock(
    5691697,
    "Ksenia Chernaya",
    "uneven-white-surface-with-grains-and-traces",
    "Detail einer weißen Putzstruktur",
    "Detail of a white plaster texture",
    "Détail de la texture d’un enduit blanc",
  ),
  plastering: stock(
    5481510,
    "Anastasia Shuraeva",
    "blonde-woman-polishing-wall",
    "Eine Wand wird im Innenraum verputzt",
    "Plaster being applied to an interior wall",
    "Application d’enduit sur un mur intérieur",
  ),
  planning: stock(
    6474495,
    "Tima Miroshnichenko",
    "a-couple-looking-at-a-home-under-construction",
    "Besprechung einer Zeichnung in einem Renovierungsraum",
    "Discussing a drawing in a room under renovation",
    "Discussion autour d’un plan dans une pièce en rénovation",
  ),
  preparation: stock(
    5691622,
    "Ksenia Chernaya",
    "crop-man-preparing-wall-for-painting",
    "Glätten einer Wandoberfläche vor dem Anstrich",
    "Smoothing a wall surface before painting",
    "Lissage d’une surface murale avant peinture",
  ),
  tileRepair: stock(
    5691640,
    "Ksenia Chernaya",
    "crop-man-repairing-tiled-wall-in-room",
    "Arbeiten am Übergang einer gefliesten Wand",
    "Working at the edge of a tiled wall",
    "Travaux au bord d’un mur carrelé",
  ),
  house: stock(
    4567376,
    "Nothing Ahead",
    "home-renovation",
    "Wohngebäude während der Renovierung mit Leiter und Gerüst",
    "Residential building during renovation with ladder and scaffolding",
    "Bâtiment résidentiel en rénovation avec échelle et échafaudage",
  ),
  ladder: stock(
    5799094,
    "Ivan S",
    "painting-materials-on-a-stepladder",
    "Farbwanne und Werkzeuge auf einer Stehleiter",
    "Paint tray and tools on a stepladder",
    "Bac de peinture et outils sur un escabeau",
  ),
};
// Every placement is exclusive to its page family. Localized versions share the same photograph.
export const photoPlan = {
  homeHeroSlides: [p.heroFacade, p.heroInterior, p.heroFinishing],
  homeCards: {
    fassaden: p.facade,
    trockenbau: p.drywall,
    putzarbeiten: p.plaster,
    malerarbeiten: p.painting,
    fliesenarbeiten: p.tiles,
    renovierungen: p.renovation,
  },
  homeGallery: [p.texture, p.brush, p.protection],
  servicesHero: p.room,
  servicesCards: {
    fassaden: p.facadeScaffold,
    trockenbau: p.drywallPlan,
    putzarbeiten: p.preparation,
    malerarbeiten: p.paintingPrep,
    fliesenarbeiten: p.tileRepair,
    renovierungen: p.renovationKitchen,
  },
  serviceHeroes: {
    fassaden: p.facadeWorkers,
    trockenbau: p.ceiling,
    putzarbeiten: p.plasterTools,
    malerarbeiten: p.paintTray,
    fliesenarbeiten: p.tilesWall,
    renovierungen: p.planning,
  },
  serviceDetails: { fassaden: p.facadeFinish } as Partial<
    Record<ServiceSlug, EditorialPhoto>
  >,
  about: p.tools,
  gallery: {
    fassaden: p.brightFacade,
    trockenbau: p.drywallRoom,
    putzarbeiten: p.plastering,
    malerarbeiten: p.ladder,
    fliesenarbeiten: p.tiling,
    renovierungen: p.house,
  },
};
export function photoForLocale(photo: EditorialPhoto, locale: Locale) {
  return { ...photo, alt: photo.alt[locale] };
}
