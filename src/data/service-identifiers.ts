import type { ServiceSlug } from "@/types/content";
import type { Locale } from "@/i18n/routing";
// Small client-safe catalogue. Detailed editorial copy remains server-side.
export const serviceSlugs = [
  "fassaden",
  "trockenbau",
  "putzarbeiten",
  "malerarbeiten",
  "fliesenarbeiten",
  "renovierungen",
] as const satisfies readonly ServiceSlug[];
export const serviceLabels: Record<Locale, Record<ServiceSlug, string>> = {
  de: {
    fassaden: "Fassadenarbeiten",
    trockenbau: "Trockenbau",
    putzarbeiten: "Putzarbeiten",
    malerarbeiten: "Malerarbeiten",
    fliesenarbeiten: "Fliesenarbeiten",
    renovierungen: "Renovierungen aller Art",
  },
  en: {
    fassaden: "Facade work",
    trockenbau: "Drywall",
    putzarbeiten: "Plastering",
    malerarbeiten: "Painting",
    fliesenarbeiten: "Tiling",
    renovierungen: "Renovations",
  },
  fr: {
    fassaden: "Façades",
    trockenbau: "Cloisons sèches",
    putzarbeiten: "Enduits",
    malerarbeiten: "Peinture",
    fliesenarbeiten: "Carrelage",
    renovierungen: "Rénovations",
  },
};
