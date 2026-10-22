/** Licensed stock photography. Always display as Symbolbild, never as a company reference. */
export type PhotoAsset = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  width: number;
  height: number;
};

export const photos = {
  hero: {
    src: "/images/photos/hero.webp",
    alt: "Zeitgenössische Wohnhäuser mit hellen Fassaden und Balkonen – Symbolbild",
    credit: "Expect Best / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/modern-building-against-sky-323780/",
    width: 2200,
    height: 1418,
  },
  facade: {
    src: "/images/photos/facade.webp",
    alt: "Arbeitsgerüst vor einer Gebäudefassade – Symbolbild für Fassadenarbeiten",
    credit: "Christian Reinke / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/scaffolding-on-building-wall-16847989/",
    width: 1400,
    height: 933,
  },
  drywall: {
    src: "/images/photos/drywall.webp",
    alt: "Montage einer Wandbekleidung im Innenausbau mit sichtbarer Unterkonstruktion – Symbolbild",
    credit: "Jimmy Nilsson Masth / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/man-doing-construction-work-inside-house-11427524/",
    width: 1600,
    height: 1066,
  },
  plaster: {
    src: "/images/photos/plaster.webp",
    alt: "Eine Wandoberfläche wird mit einem Spachtel geglättet – Symbolbild für Putzarbeiten",
    credit: "Ksenia Chernaya / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/crop-man-plastering-wall-at-home-5691637/",
    width: 1202,
    height: 1800,
  },
  painting: {
    src: "/images/photos/painting.webp",
    alt: "Anstrich einer Innenwand mit einer Farbrolle in einem Renovierungsraum – Symbolbild",
    credit: "Tima Miroshnichenko / Pexels",
    sourceUrl: "https://www.pexels.com/photo/man-painting-the-wall-6474471/",
    width: 1600,
    height: 1066,
  },
  tiles: {
    src: "/images/photos/tiles.webp",
    alt: "Vorbereitung des Kleberbetts und Verlegung von Bodenfliesen – Symbolbild",
    credit: "Sergei Starostin / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/construction-worker-laying-tile-in-renovation-project-29181494/",
    width: 1600,
    height: 1066,
  },
  renovation: {
    src: "/images/photos/renovation.webp",
    alt: "Heller Wohnraum während der Renovierung mit Werkzeug und Stehleiter – Symbolbild",
    credit: "Pietro Greco / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/renovation-of-an-apartmetn-flat-9908376/",
    width: 1600,
    height: 1200,
  },
  building: {
    src: "/images/photos/building.webp",
    alt: "Renovierte Wohnhausfassade mit hellen Putzflächen und Ziegeldetails – Symbolbild",
    credit: "Lahzeha🌿 / Pexels",
    sourceUrl:
      "https://www.pexels.com/photo/renovated-tenement-house-in-city-14317246/",
    width: 1200,
    height: 1600,
  },
} satisfies Record<string, PhotoAsset>;
