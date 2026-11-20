import type { Locale } from "./routing";

/** Search snippets for the five editorial pages; the on-page copy is separate. */
export type EditorialPageKey = "home" | "services" | "about" | "gallery" | "contact";

export const editorialSeo: Record<
  Locale,
  Record<EditorialPageKey, { title: string; description: string }>
> = {
  de: {
    home: {
      title: "Renovierung & Innenausbau in Ludwigshafen am Rhein",
      description:
        "Thermobau V&V in Ludwigshafen am Rhein: Fassadenarbeiten, Trockenbau, Putzarbeiten, Malerarbeiten, Fliesenarbeiten und Renovierungen. Projekt anfragen.",
    },
    services: {
      title: "Fassadenarbeiten, Trockenbau & Renovierung",
      description:
        "Entdecken Sie die Leistungen von Thermobau V&V: Fassaden, Trockenbau, Putz, Malerarbeiten, Fliesen und Renovierungen in Ludwigshafen am Rhein.",
    },
    about: {
      title: "Über uns: Renovierung in Ludwigshafen am Rhein",
      description:
        "Lernen Sie Thermobau V&V und Inhaber Vasil Velikov Dimitrov kennen. Wir besprechen Vorhaben rund um Renovierung und Innenausbau in Ludwigshafen am Rhein.",
    },
    gallery: {
      title: "Einblicke in Fassaden- und Renovierungsarbeiten",
      description:
        "Einblicke in Materialien und typische Arbeitsschritte bei Fassadenarbeiten, Trockenbau und Renovierung. Illustrationsbilder, keine bestätigten Kundenreferenzen.",
    },
    contact: {
      title: "Kontakt & Projektanfrage in Ludwigshafen am Rhein",
      description:
        "Kontaktieren Sie Thermobau V&V in Ludwigshafen am Rhein. Fragen Sie unverbindlich zu Fassadenarbeiten, Trockenbau, Malerarbeiten, Fliesen oder Renovierung an.",
    },
  },
  en: {
    home: {
      title: "Renovation & Interior Work in Ludwigshafen am Rhein",
      description:
        "Thermobau V&V offers facade work, drywall, plastering, painting, tiling and renovations in Ludwigshafen am Rhein. Discuss your project with us.",
    },
    services: {
      title: "Facade, Drywall & Renovation Services",
      description:
        "Explore facade work, drywall, plastering, painting, tiling and renovations from Thermobau V&V in Ludwigshafen am Rhein. Send us an enquiry.",
    },
    about: {
      title: "About Our Renovation Work in Ludwigshafen am Rhein",
      description:
        "Meet Thermobau V&V and sole proprietor Vasil Velikov Dimitrov. Find out how to discuss renovation and interior work in Ludwigshafen am Rhein.",
    },
    gallery: {
      title: "Facade and Renovation Work: Photo Insights",
      description:
        "Explore illustrative images of materials and typical steps in facade and renovation work. These photos are not documented Thermobau V&V customer projects.",
    },
    contact: {
      title: "Request Renovation Work in Ludwigshafen am Rhein",
      description:
        "Contact Thermobau V&V in Ludwigshafen am Rhein about facade work, drywall, plastering, painting, tiling or renovations. Send a non-binding enquiry.",
    },
  },
  fr: {
    home: {
      title: "Rénovation et aménagement à Ludwigshafen am Rhein",
      description:
        "Thermobau V&V à Ludwigshafen am Rhein : façades, cloisons sèches, enduits, peinture, carrelage et rénovation. Présentez-nous votre projet.",
    },
    services: {
      title: "Façades, cloisons sèches et rénovation",
      description:
        "Découvrez les prestations de Thermobau V&V : façades, cloisons sèches, enduits, peinture, carrelage et rénovation à Ludwigshafen am Rhein.",
    },
    about: {
      title: "Notre entreprise à Ludwigshafen am Rhein",
      description:
        "Découvrez Thermobau V&V et son propriétaire Vasil Velikov Dimitrov. Échangeons sur vos projets de rénovation et d'aménagement intérieur.",
    },
    gallery: {
      title: "Aperçu des travaux de façade et de rénovation",
      description:
        "Photos d'illustration de matériaux et d'étapes typiques de travaux de façade et de rénovation. Ces images ne présentent pas des chantiers clients vérifiés.",
    },
    contact: {
      title: "Contact et demande de devis à Ludwigshafen am Rhein",
      description:
        "Contactez Thermobau V&V à Ludwigshafen am Rhein pour vos travaux de façade, cloisons sèches, enduits, peinture, carrelage ou rénovation.",
    },
  },
};
