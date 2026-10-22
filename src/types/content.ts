export type ServiceSlug =
  | "fassaden"
  | "trockenbau"
  | "putzarbeiten"
  | "malerarbeiten"
  | "fliesenarbeiten"
  | "renovierungen";

export interface Service {
  slug: ServiceSlug;
  title: string;
  teaser: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
  sortOrder: number;
  seo: { title: string; description: string };
  faq: { question: string; answer: string }[];
}

export interface SiteConfig {
  name: "Thermobau V&V";
  contactName: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: "DE";
  };
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  openingHours: string[] | null;
  confirmedServiceAreas: string[];
  domain: string | null;
  logoPath: string;
  legal: {
    providerName: string | null;
    legalForm: string | null;
    authorizedRepresentative: string | null;
    registerName: string | null;
    registerCourt: string | null;
    registerNumber: string | null;
    vatId: string | null;
    economicId: string | null;
    supervisoryAuthority: string | null;
    professionalChamber: string | null;
    professionalTitle: string | null;
    professionalTitleCountry: string | null;
    professionalRules: string | null;
    professionalRulesUrl: string | null;
    disputeResolution: string | null;
  };
  privacy: {
    controllerName: string | null;
    controllerContact: string | null;
    dataProtectionOfficerContact: string | null;
    hostingProvider: string | null;
    hostingDetails: string | null;
    hostingLegalBasis: string | null;
    hostingRetention: string | null;
    contactRecipients: string | null;
    contactLegalBasis: string | null;
    contactRetention: string | null;
    abuseProtectionLegalBasis: string | null;
    internationalTransfers: string | null;
  };
}

export interface GalleryItem {
  id: string;
  serviceSlug: ServiceSlug;
  title: string;
  imageSrc: string;
  alt: string;
  kind: "illustration" | "stock-photo" | "real-project";
  copyrightCredit: string | null;
  rightsConfirmed: boolean;
  projectTitle: string | null;
  location: string | null;
  published: boolean;
  description?: string;
  photos?: { src: string; alt: string; rightsConfirmed: boolean }[];
  date?: string | null;
  sourceUrl?: string;
}
