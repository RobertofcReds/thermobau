# THERMOBAU V&V — ARCHITECTURE TECHNIQUE

**Étape 3 / 4 — Version 1.0 — 14 octobre 2026**  
**Document de référence :** `Thermobau_VV_Cahier_des_charges_V1` (étape 2 validée)  
**Statut :** architecture à valider avant rédaction du prompt Codex (étape 4)  
**Langue de ce document :** français ; **langue de l'interface :** allemand (`de-DE`).

> **Décision principale.** Un seul projet Next.js avec App Router, React, TypeScript strict, Tailwind CSS v4 et un point de contact serveur. Les pages éditoriales sont pré-rendues ; pas de base de données, d'administration, de boutique ou de CMS dans la V1. Un prototype complet doit fonctionner sans fausses coordonnées ni envois fictifs.

## 1. Objectif et périmètre de l'architecture

Cette architecture traduit le cahier des charges approuvé en une organisation directement réalisable par un développeur ou un agent Codex. Elle spécifie les limites des modules, les conventions et la manière de publier sans introduire inutilement des dépendances. Elle **ne constitue pas encore le prompt de réalisation Codex**, qui sera rédigé uniquement à l'étape 4.

**Livraison A — prototype validable :** ensemble des pages, identité graphique approuvée, six services, textes en allemand, galerie honnêtement étiquetée, formulaire visible mais non expédiable si les secrets manquent, SEO technique, responsive, tests de base et prévisualisation privée/noindex.

**Livraison B — production :** coordonnées et textes juridiques vérifiés, images autorisées, fournisseur d'e-mail actif, anti-spam et limites de débit testés, domaine validé, indexation activée, contrôles finaux et déploiement.

**Hors périmètre V1 :** authentification, comptes clients, paiements, espace de gestion, CRM, blog, prises de rendez-vous, calcul automatique de devis, génération d'avis, chatbot, base de données et tracking publicitaire par défaut.

## 2. Stack technique : décisions explicites

| Domaine | Choix | Règle de mise en œuvre |
|---|---|---|
| Runtime | **Node.js 24 LTS** | Utiliser la version LTS supportée ; recommander `.nvmrc` = `24` et `engines` compatible. |
| Framework | **Next.js stable + App Router** | Installer une version stable compatible avec Node et React, figée dans `package-lock.json`. |
| Bibliothèque UI | **React**, version compatible avec Next.js | Privilégier composants serveur, composants client seulement pour interactions. |
| Langage | **TypeScript strict** | `.tsx` composants et pages ; `.ts` logique/configuration. |
| JavaScript | **ES moderne**, compilé depuis TS | Ne pas produire deux implémentations `.js` et `.ts` d'une même fonction. |
| CSS | **Tailwind CSS v4** | Import CSS `@import "tailwindcss";`, PostCSS officiel, variables de marque. |
| Icônes | **lucide-react** | Importer uniquement les pictogrammes utilisés ; SVG simples. |
| Validation | **zod** | Schéma partagé des données, vérification **côté serveur** obligatoire. |
| Animations | CSS d'abord ; `motion` si nécessaire | Animations courtes, facultatives, réduction des mouvements. |
| E-mail | Un adaptateur serveur à configurer | Fournisseur à choisir à la mise en production (ex. API e-mail ou SMTP). |
| Qualité | ESLint, TypeScript, Prettier | Vérifier lint, typecheck et build à chaque livraison. |
| Tests | Vitest et Playwright recommandés | Valider schémas, routes, menu mobile, formulaire et 404. |
| Déploiement | **Vercel** envisagé | Trois environnements : local, preview, production ; HTTPS/domaine à valider. |
| Données | Fichiers `.ts` versionnés | Pas de base de données / CMS au démarrage. |

**Règles sur les versions.** Ne pas coder contre de vieilles APIs Next.js. La résolution des paquets se fait au démarrage du développement ; on contrôle leurs compatibilités, puis on commite le lockfile. Pas de version inventée ou de mise à jour automatique incontrôlée pendant la réalisation.

**Gestionnaire des paquets choisi :** `npm` exclusivement en V1, avec `package-lock.json`, afin de faciliter la reproduction du projet dans Windows 11, CI et Vercel. Ne pas mélanger npm, pnpm, yarn et bun.

## 3. Schéma d'architecture et responsabilités

```text
Visiteur (navigateur, interface allemande)
             |
             v
      Next.js App Router
             |
      +------+-----------------------+
      |                              |
      v                              v
Pages Server Components       Composants Client ciblés
(pré-rendues si possible)      (menu, galerie, formulaire)
      |                              |
      +---------------+--------------+
                      |
          +-----------+------------+
          |                        |
          v                        v
   Données locales .ts      POST /api/contact
   site / services / projets      |
                             Validation Zod
                                  |
                        Anti-spam + limitations
                                  |
                        Transport e-mail privé
                                  |
                        Boîte du destinataire

Déploiement : Git -> Vercel Preview -> validation -> Vercel Production
```

**Principes.** Une application monolithique légère, sans microservices. La logique métier vit dans `src/lib`, les contenus dans `src/data`, l'identité dans `src/config`, et la présentation dans `src/components`. Une API serveur n'est nécessaire que pour une action qui doit réellement être sécurisée.

## 4. Routes publiques à conserver (contrat de l'étape 2)

| URL | Page allemande | Rendu attendu |
|---|---|---|
| `/` | Startseite | Pré-rendu statique |
| `/leistungen` | Leistungen | Pré-rendu statique |
| `/leistungen/fassaden` | Fassadenarbeiten | Paramètre de service pré-rendu |
| `/leistungen/trockenbau` | Trockenbau | Paramètre de service pré-rendu |
| `/leistungen/putzarbeiten` | Putzarbeiten | Paramètre de service pré-rendu |
| `/leistungen/malerarbeiten` | Malerarbeiten | Paramètre de service pré-rendu |
| `/leistungen/fliesenarbeiten` | Fliesenarbeiten | Paramètre de service pré-rendu |
| `/leistungen/renovierungen` | Renovierungen | Paramètre de service pré-rendu |
| `/ueber-uns` | Über uns | Pré-rendu statique |
| `/referenzen` | Referenzen / Einblicke | Pré-rendu statique ; images identifiées |
| `/kontakt` | Kontakt | Page pré-rendue + formulaire client |
| `/impressum` | Impressum | Page statique, juridique à confirmer |
| `/datenschutz` | Datenschutzerklärung | Page statique, juridique à confirmer |
| `/api/contact` | Point de traitement POST | Exécution serveur uniquement |
| `not-found` | Fehler 404 | Page d'erreur allemande |

**Route dynamique.** `src/app/leistungen/[slug]/page.tsx` récupère les données d'un service connu. `generateStaticParams()` énumère les six slugs ; `dynamicParams = false` retourne 404 pour les slugs inconnus. Pour les versions récentes de Next.js, traiter le paramètre de page comme une **Promise** et l'attendre lorsque la signature de l'API le demande.

**Langue.** Pas de préfixe `/de` puisque le site est 100 % allemand. `html lang="de"` dans le layout racine ; contenus publics, erreurs et libellés en allemand. Les commentaires techniques et le README peuvent être rédigés en français.

## 5. Arborescence cible du dépôt

```text
thermobau-vv/
├── public/
│   ├── brand/
│   │   ├── thermobau-vv-logo.png         # logo V1 validé, inchangé
│   │   └── thermobau-vv-icon.png         # variante icône à créer/valider
│   └── images/
│       ├── hero/                         # visuels autorisés
│       ├── services/                     # 6 services
│       └── gallery/                      # vrais projets / illustrations signalées
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # html lang="de", fonts, layout global
│   │   ├── globals.css                   # Tailwind v4 + design tokens
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── icon.png                       # favicon final à partir de l'identité
│   │   ├── (website)/                    # groupe invisible dans les URLs
│   │   │   ├── page.tsx                  # /
│   │   │   ├── leistungen/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── ueber-uns/page.tsx
│   │   │   ├── referenzen/page.tsx
│   │   │   ├── kontakt/page.tsx
│   │   │   ├── impressum/page.tsx
│   │   │   └── datenschutz/page.tsx
│   │   └── api/
│   │       └── contact/route.ts          # POST JSON : validation et envoi
│   ├── components/
│   │   ├── layout/                        # Header, Footer, MobileNav, Breadcrumb
│   │   ├── sections/                      # Hero, ServiceGrid, About, Gallery, CTA
│   │   ├── ui/                            # Button, Container, ServiceCard, etc.
│   │   └── forms/                         # ContactForm (client) + champs
│   ├── config/
│   │   └── site.ts                        # coordonnées et identité centralisées
│   ├── data/
│   │   ├── services.ts                    # 6 services, slugs et textes allemands
│   │   ├── projects.ts                    # médias avec provenance/autorisation
│   │   └── navigation.ts                  # menus, liens et libellés allemands
│   ├── lib/
│   │   ├── contact-schema.ts              # validation Zod
│   │   ├── seo.ts                         # helpers métadonnées et URLs
│   │   ├── mail.ts                        # adaptateur serveur uniquement
│   │   ├── rate-limit.ts                  # protection multi-instances en prod
│   │   └── utils.ts
│   └── types/
│       └── content.ts
├── tests/
│   ├── unit/                              # validation, contenu, slug, SEO
│   └── e2e/                               # Playwright
├── .env.example                           # valeurs exemple sans vrais secrets
├── .gitignore
├── .nvmrc                                # 24
├── eslint.config.mjs
├── postcss.config.mjs                    # @tailwindcss/postcss
├── tsconfig.json                          # strict, @/* -> src/*
├── next.config.ts
├── package.json
├── package-lock.json
└── README.md
```

**Convention de nommage.** Composants en `PascalCase.tsx`, utilitaires en `kebab-case.ts`, pages Next.js selon noms obligatoires (`page.tsx`, `route.ts`, `layout.tsx`). Import via `@/components/...`. Le groupe `(website)` est purement organisationnel et n'apparaît jamais dans une URL.

## 6. Composants React et frontières serveur/client

**Côté serveur par défaut :** `layout.tsx`, `page.tsx`, `ServiceGrid`, `ServiceCard`, sections éditoriales, `Footer`, SEO, données de services et métadonnées. Objectif : HTML immédiatement utile et peu de JavaScript envoyé au navigateur.

**Côté client (`'use client'`) seulement si besoin :** `MobileNav` pour état ouvert/fermé ; `ContactForm` pour saisie et retours visuels ; `GalleryFilter` uniquement si on active un filtre dynamique ; `MotionReveal` seulement si animation souhaitée. Le composant Header global peut rester serveur et inclure un petit menu mobile client.

**Composants de présentation à développer :** `SiteHeader`, `SiteFooter`, `Logo`, `MainNavigation`, `MobileNavigation`, `PageHero`, `SectionHeading`, `SectionContainer`, `ServiceCard`, `ServiceGrid`, `GalleryCard`, `Breadcrumbs`, `ContactCallout`, `ContactForm`, `FormField`, `Button`, `EmptyGalleryState`.

**Règle de simplicité.** Aucun composant générique complexe sans usage réel. Favoriser des fichiers courts et identifiables ; ne pas dédoubler les listes de services dans plusieurs pages.

## 7. Contrats de données en TypeScript

Les types suivants illustrent le **contrat**, pas le code définitif de l'application.

```ts
export type ServiceSlug =
  | 'fassaden'
  | 'trockenbau'
  | 'putzarbeiten'
  | 'malerarbeiten'
  | 'fliesenarbeiten'
  | 'renovierungen';

export interface Service {
  slug: ServiceSlug;
  title: string;        // allemand, ex. « Trockenbau »
  teaser: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[]; // seulement des capacités effectivement confirmées
  sortOrder: number;
}

export interface SiteConfig {
  name: 'Thermobau V&V';
  contactName: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: 'DE';
  };
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  openingHours: string[] | null;
  confirmedServiceAreas: string[];
  domain: string | null;
  logoPath: string;
  legal: {
    legalForm: string | null;
    registerNumber: string | null;
    taxOrVatId: string | null;
  };
}

export interface GalleryItem {
  id: string;
  imageSrc: string;
  alt: string;
  kind: 'illustration' | 'real-project';
  copyrightCredit: string | null;
  rightsConfirmed: boolean;
  projectTitle: string | null;
  published: boolean;
}
```

**Initialisation du prototype :** `name = 'Thermobau V&V'`, `contactName = 'Vasil Velikov Dimitrov'`, `street = 'Blücherstr. 59'`, `postalCode = '67063'`, `city = 'Ludwigshafen'`, `country = 'DE'`. Téléphone, e-mail, horaires, domaine et données légales incomplètes à `null`.

**Comportements obligatoires :** ne jamais rendre `null` sous forme de téléphone inventé ; masquer le lien `tel:` si absent ; éviter des liens WhatsApp/Google Maps intégrés non autorisés ; ne pas inventer des projets ou certifications. Toutes les données de services doivent rester dans `services.ts` pour produire à la fois les cartes, la navigation, les pages métier et le sitemap.

## 8. Formulaire de contact : architecture complète

### 8.1 Interface et validation

Champs : `name`, `email`, `phone?`, `service`, `message`, `website` (honeypot invisible aux utilisateurs). Les libellés et états sont en allemand. L'option `service` correspond obligatoirement aux six slugs connus. Le prénom/nom libre peut rester dans un seul champ `Name`.

**Règles indicatives côté serveur :** nom 2–100 caractères ; e-mail valide et longueur maximale raisonnable ; téléphone facultatif jusqu'à 30 caractères ; message 20–3000 caractères ; aucun HTML actif accepté ; champ honeypot normalement vide ; requête JSON avec taille maximale limitée.

### 8.2 Flux de traitement

```text
Client ContactForm
  -> POST /api/contact
  -> Vérification du type/volume de la requête
  -> Zod.safeParse(payload)
  -> contrôle honeypot + rate limiting
  -> configuration du fournisseur disponible ?
       NON -> 503 (service indisponible, pas de faux succès)
       OUI -> envoi sur le serveur, clé privée inaccessible au client
  -> réponse { ok: true } seulement après acceptation du fournisseur
  -> message de confirmation en allemand / erreur récupérable
```

**États visibles :** `idle`, `invalid`, `sending`, `sent`, `failed`, `unavailable`. La réponse de l'API ne doit pas révéler de secret ni le détail des erreurs internes. Dans le prototype non configuré, désactiver le bouton d'envoi ou expliquer explicitement le « Demomodus » ; ne pas prétendre qu'un message a été envoyé.

**Anti-abus en production :** honeypot, validation serveur, limitation de débit **persistante/distribuée** compatible avec plusieurs instances Vercel (service dédié ou protection fournisseur), et contrôle de la configuration. Une `Map` en mémoire Node ne suffit pas comme mécanisme fiable de rate limiting en environnement serverless. Ajouter CAPTCHA seulement si les abus le justifient et après analyse des obligations de confidentialité.

**Stockage :** pas de stockage de demandes en base V1 ; transport vers boîte du responsable configurée. Pas de contenu personnel dans la console ou dans des analytics. Fixer une politique de conservation chez le fournisseur avant la mise en ligne.

### 8.3 API et erreurs prévues

`POST /api/contact` reçoit `application/json`. Réponses : `200` envoi accepté ; `400` validation invalide ; `413` requête trop volumineuse ; `429` limite de débit atteinte ; `503` fournisseur absent/indisponible ; `500` erreur serveur. Retour `{ ok: boolean, message: string, fieldErrors?: Record<string,string[]> }`, les messages visibles en allemand.

`GET /api/contact` ne sert pas d'endpoint public ; seuls les POST sont pris en charge.

## 9. Design system : fidélité au logo validé

**Logo de référence :** maison/toit noir, cheminée, fenêtre à quatre carreaux, double vague bleue ; deux lignes de texte : « THERMOBAU » puis « V & V », les deux V noirs, esperluette bleue et filets bleus latéraux. Respecter exactement l'image retenue, sans inventer de nouveau symbole, ni ajouter ombres, dégradés ou éléments décoratifs.

**Fichier principal :** `public/brand/thermobau-vv-logo.png` provenant du logo validé. Une version SVG réellement vectorielle pourra être produite séparément à partir du dessin validé, mais **renommer un PNG en SVG n'en fait pas un fichier vectoriel**. Le favicon ou symbole compact devra également être validé s'il diffère du logo approuvé.

| Token | Valeur proposée | Usage |
|---|---|---|
| `--color-brand` | `#078DDA` | Boutons, liens, accents |
| `--color-brand-dark` | `#0866A8` | Hover et accent fort |
| `--color-ink` | `#1E2024` | Titres et texte foncé |
| `--color-body` | `#374151` | Paragraphes |
| `--color-surface` | `#F5F7F9` | Fond de section |
| `--color-white` | `#FFFFFF` | Fond principal |

**Police.** `Inter` ou `Manrope` selon comparaison visuelle ; charger via `next/font` en conformité avec le choix final, éviter des appels à Google Fonts externes au runtime quand possible. Hiérarchie H1/H2/H3 lisible, pas de texte tout en majuscules dans les paragraphes.

**Gabarit responsive :** conteneur max ~1200–1280 px, marges 16–24 px sur mobile ; navigation compacte sous ~768 px ; grilles une colonne mobile, deux sur tablette, trois pour les six prestations sur large écran. Zones cliquables adaptées au tactile, contrastes accessibles et aucun scroll horizontal.

**Motion.** Simple CSS pour survol, transition de menu et apparition subtile seulement si souhaitée ; éviter carrousels automatiques, parallaxe lourde et animations prolongées. Respecter `prefers-reduced-motion`.

## 10. SEO allemand et stratégie de rendu

**Rendu :** pages éditoriales générées statiquement quand possible ; pages de services `generateStaticParams` ; formulaire traité exclusivement sur le serveur. Ne pas forcer le site entier en client-side rendering.

**Métadonnées :** `src/app/layout.tsx` définit `lang="de"`, title template, description générale ; chaque page possède un `title` et une `description` spécifiques. Pages métier : `generateMetadata()` tiré des données centrales ; `canonical` absolue uniquement avec le vrai domaine confirmé ; Open Graph avec image autorisée. `sitemap.ts` et `robots.ts` suivent les conventions de Next.js.

**Prévisualisation :** Vercel Preview et URL de développement doivent porter une directive `noindex,nofollow` via métadonnées/entêtes adaptés. Protéger si nécessaire l'accès au prototype ; ne pas prendre le seul blocage `robots.txt` comme garantie contre l'indexation. **Production :** indexation autorisée seulement après validation des données, du domaine, des pages légales et des liens.

**Données structurées :** `LocalBusiness` avec adresse confirmée, nom et URL réelle ; pas d'`aggregateRating`, d'horaires, de téléphone ou de zone de couverture non vérifiés. Navigation interne accueil -> services -> détails -> contact ; termes allemands naturels, sans répétitions artificielles.

## 11. Sécurité, confidentialité et conformité

- HTTPS en production ; secrets d'envoi côté serveur uniquement ; fichier `.env.local` ignoré par Git.
- Limiter les droits et accès du déploiement ; aucune clé secrète dans `NEXT_PUBLIC_*` ni dans les composants client.
- Échapper les données utilisateur ; pas d'injection HTML avec `dangerouslySetInnerHTML` pour les messages.
- Ajouter en-têtes HTTP adaptés et politique CSP lorsque les dépendances utilisées sont connues ; éviter une CSP cassant Next.js.
- Les pages `/impressum` et `/datenschutz` sont prévues, **mais ne sont pas considérées juridiquement finalisées** sans vérification.
- Aucun analytics, pixel marketing, vidéo ou carte tierce automatique sans analyse juridique/consentement pertinent ; lien externe de localisation possible après validation.
- Police locale, images sous droits connus ; aucune galerie factice présentée comme une référence réellement réalisée.
- Préserver la confidentialité des demandes par e-mail, limiter les traces et documenter le fournisseur retenu.

## 12. Environnements, variables et déploiement

### 12.1 Environnements

| Environnement | Adresse | Comportement |
|---|---|---|
| Local | `http://localhost:3000` | Développement, tests, formulaire démo si non configuré |
| Preview | URL Vercel attribuée automatiquement | Test client, noindex, données non vérifiées clairement délimitées |
| Production | Domaine officiel **à confirmer** | Indexation, HTTPS, formulaire seulement avec destinataire validé |

### 12.2 Contrat `.env.example`

```dotenv
# URL publique réelle, distincte par environnement
NEXT_PUBLIC_SITE_URL=

# Jamais préfixés par NEXT_PUBLIC_ : ces valeurs restent côté serveur
CONTACT_RECIPIENT_EMAIL=
CONTACT_FROM_EMAIL=
MAIL_PROVIDER_API_KEY=

# "false" tant que le fournisseur n'est pas installé et testé
CONTACT_FORM_ENABLED=false
```

Le choix de `MAIL_PROVIDER_API_KEY` est un nom de contrat ; adapter aux variables officielles du fournisseur choisi. Une valeur absente ne doit jamais produire un faux message de réussite. Ne pas mettre de vraie clé dans `.env.example`, la documentation ou le dépôt.

### 12.3 Pipeline de livraison

```text
Code Git (branche feature)
     -> npm ci
     -> lint + typecheck + tests
     -> npm run build
     -> Vercel Preview (noindex, validation visuelle)
     -> contrôle et approbation
     -> branche principale / Vercel Production
     -> contrôles domaine, formulaire, SEO et sécurité
```

Ne pas déployer un site publiquement indexable avec des coordonnées d'exemple ou une page Impressum incomplète.

## 13. Qualité, tests et critères d'acceptation

**Scripts `package.json` à prévoir :** `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e`, `format:check`. Éviter des commandes qui supposent un projet déjà fonctionnel avant création de ses fichiers.

**Tests unitaires :** schéma de contact, valeurs limite, liste des six services, unicité des slugs, visibilité conditionnelle du téléphone/e-mail, métadonnées et construction des URLs, provenance des images.

**Tests fonctionnels :** menu desktop et mobile, liens vers `/leistungen`, pages de services, retour sur 404, galerie, boutons contact, validation allemande, faux succès impossible, états du serveur d'envoi, réduction des animations.

**Largeurs de vérification :** 360, 390, 768, 1024, 1440 et 1920 px. Contrôler le logo complet non coupé, absence de débordement, contraste, navigation au clavier et bonne taille des cibles tactiles.

**Critères bloquants de la V1 :**

1. Tous les liens internes et les 13 routes publiques prévues sont opérationnels (1 accueil, 1 services, 6 détails, 1 à-propos, 1 galerie, 1 contact, 2 légales), plus 404.
2. Texte public exclusivement en allemand ; aucun « Lorem ipsum ».
3. Logo strictement fidèle au modèle sélectionné.
4. Pas de faux numéro, faux e-mail, témoignage, ancienneté, garantie, badge qualité, image de chantier ou certification présentés comme réels.
5. Contact en mode démonstration honnête ou réellement configuré avec accusé d'envoi correct.
6. Build, lint et typecheck sans erreurs ; pas d'erreur critique de navigation sur mobile.
7. Méta-description, sitemap/robots et états index/noindex conformes à l'environnement.
8. Projet transmissible à Codex et à un autre développeur avec un README et un lockfile fonctionnels.

**Cibles de performance non contractuelles :** Lighthouse mobile 90+ lorsque les conditions de test sont comparables ; LCP <= 2,5 s, CLS <= 0,1, INP <= 200 ms au 75e percentile des mesures terrain. Objectif d'accessibilité WCAG 2.2 AA ; ne pas déclarer une conformité auditée sans audit.

## 14. Ordre de réalisation technique (pour la future étape Codex)

| Lot | Mission | Résultat contrôlable |
|---|---|---|
| 01 | Initialiser Next.js App Router/TS/Tailwind | `npm run dev` ouvre une page et `npm run build` passe |
| 02 | Installer design system et logo validé | En-tête, pied de page, tokens et images fonctionnent |
| 03 | Créer navigation et pages statiques | Pages sans liens cassés, allemand correct |
| 04 | Centraliser six services et générer les détails | Six routes pré-rendues et liens contextualisés |
| 05 | Créer galerie illustrative honnête | Aucun chantier inventé ou image non autorisée |
| 06 | Réaliser formulaire + validation + endpoint | États valides, mode démo explicite et API testée |
| 07 | Ajouter SEO, fichiers metadata et JSON-LD prudent | Sitemap/robots/canonical adaptés aux environnements |
| 08 | Finaliser responsive, accessibilité et tests | Critères mobiles et build sans erreur |
| 09 | Préparer Vercel Preview et guide de déploiement | URL testable par le boss, non indexée |
| 10 | Recevoir corrections du boss | Itérations ciblées sans réécriture totale |

**Point d'arrêt volontaire :** à l'étape 3, on **valide l'architecture**. Aucun prompt complet destiné à Codex n'est fourni ici : il sera assemblé et adapté aux décisions finales à l'étape 4.

## 15. Décisions figées / ouvertes

**Figées maintenant :** nouveau site vitrine, allemand, logo approuvé, six services, 13 routes publiques, Next.js + React + TypeScript strict + Tailwind CSS v4, Node.js 24 LTS, npm, données en fichiers TS, pas de base de données, previews protégées et pas de contenu fictif.

**À confirmer avant production, sans bloquer le prototype :** nom de domaine, numéros et e-mails réels, horaires, zone de couverture exacte, services supplémentaires (isolation), galeries de chantiers réels, droits médias, coordonnées juridiquement exigibles, opérateur de service e-mail et politique de conservation.

**Extensions P2 :** CMS, blog, multilingue, intégration CRM et analytics consentis, uniquement si le boss en formule explicitement le besoin.

## 16. Sources techniques officielles consultées

- Next.js, installation et configuration : https://nextjs.org/docs/app/getting-started/installation
- Next.js, Server et Client Components : https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js, Route Handlers : https://nextjs.org/docs/app/api-reference/file-conventions/route
- Next.js, routes dynamiques statiques : https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- Next.js, SEO et métadonnées : https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js, images optimisées : https://nextjs.org/docs/app/api-reference/components/image
- Next.js, sitemap : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Tailwind CSS v4 et Next.js : https://tailwindcss.com/docs/installation/framework-guides/nextjs
- Node.js, cycles de support LTS : https://nodejs.org/en/about/previous-releases

**Fin de l'étape 3 — document à valider.**
