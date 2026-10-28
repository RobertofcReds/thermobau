import type { SiteConfig } from "@/types/content";

// Informations transmises dans le brief. Les données absentes restent null.
export const siteConfig: SiteConfig = {
  name: "Thermobau V&V",
  contactName: "Vasil Velikov Dimitrov",
  address: {
    street: "Blücherstr. 59",
    postalCode: "67063",
    city: "Ludwigshafen",
    country: "DE",
  },
  phone: null,
  email: null,
  whatsapp: null,
  // Numéros internationaux (+49…), adresses et profils officiels vérifiés uniquement.
  social: {
    facebook: null,
    instagram: null,
    linkedin: null,
    youtube: null,
  },
  openingHours: null,
  confirmedServiceAreas: [],
  domain: null,
  logoPath: "/brand/thermobau-vv-logo.png",
  // À compléter uniquement avec des informations vérifiées et applicables.
  // Ne pas publier de numéro fiscal personnel (Steuernummer).
  legal: {
    providerName: null,
    legalForm: null,
    authorizedRepresentative: null,
    registerName: null,
    registerCourt: null,
    registerNumber: null,
    vatId: null,
    economicId: null,
    supervisoryAuthority: null,
    professionalChamber: null,
    professionalTitle: null,
    professionalTitleCountry: null,
    professionalRules: null,
    professionalRulesUrl: null,
    disputeResolution: null,
  },
  // Ces valeurs décriront le déploiement réel après choix des prestataires.
  privacy: {
    controllerName: null,
    controllerContact: null,
    dataProtectionOfficerContact: null,
    hostingProvider: null,
    hostingDetails: null,
    hostingLegalBasis: null,
    hostingRetention: null,
    contactRecipients: null,
    contactLegalBasis: null,
    contactRetention: null,
    abuseProtectionLegalBasis: null,
    internationalTransfers: null,
  },
};
