# CAHIER DES CHARGES - THERMOBAU V&V

**Version :** 1.0 - 14 octobre 2026  
**Statut :** spécification de référence pour prototype, avant validation finale du client  
**Langue du document :** français  
**Langue du site public :** allemand (de-DE)  
**Livrable cible :** site vitrine Next.js moderne, responsive, maintenable et optimisé pour les demandes de devis.

> **Principe de travail :** produire une V1 complète et démontrable, puis corriger selon le retour du responsable. Aucune coordonnée, réalisation, certification ou promesse commerciale non confirmée ne doit etre publiée comme une information vraie.

## 1. Présentation du projet

### 1.1 Contexte et identité

Thermobau V&V est une entreprise de travaux du bâtiment située à Ludwigshafen, en Allemagne. Le futur site doit présenter ses activités de façade, aménagement intérieur et renovation. Il s'agit d'une création de site neuf, et non d'une refonte.

**Informations connues et confirmées dans le brief :**

- **Nom commercial :** Thermobau V&V.
- **Contact/nom communiqué :** Vasil Velikov Dimitrov.
- **Adresse :** Blücherstr. 59, 67063 Ludwigshafen, Deutschland.
- **Langue de communication du site :** allemand.
- **Activités visibles sur le véhicule :** Fassaden, Trockenbau, Putz, Maler, Fliesen, Renovierungen aller Art.
- **Logo retenu :** maison/toiture noire avec cheminée et fenêtre, deux courbes bleues sous le toit ; typographie THERMOBAU noire puis V & V noire avec esperluette bleue, encadrée par deux filets bleus.

**Informations encore a valider :** forme juridique, telephone, e-mail, WhatsApp, zones précises couvertes, prestations exactes, horaires, qualifications, photos de vrais chantiers, mentions légales, droits sur les visuels et domaine.

L'isolation thermique peut etre etudiee comme activité eventuelle, mais ne doit pas etre presentee comme un service confirme tant que l'entreprise ne l'a pas validée. De meme, les termes « Meisterbetrieb », « zertifiziert », « seit 20 Jahren », « Notdienst », les garanties commerciales et les chiffres de chantiers ne doivent jamais etre inventes.

### 1.2 Nature, positionnement et utilisateurs

- **Nature :** site vitrine B2C et B2B leger, sans vente en ligne, sans paiement, sans comptes clients.
- **Positionnement :** entreprise de renovation locale : sobre, competente, accessible, fiable et axee sur les travaux concrets.
- **Publics :** propriétaires occupants, bailleurs, propriétaires d'immeubles, petites entreprises, gestionnaires immobiliers et autres demandeurs de travaux autour de Ludwigshafen.
- **Promesse éditoriale :** clarte des services, facilité du contact, visuels soignes et informations transparentes, sans statistiques ou engagements non vérifiés.

### 1.3 Objectifs mesurables

| Objectif | Indicateur | Méthode d'observation |
|---|---|---|
| Presentabilite | toutes les pages prevues et aucun texte brouillon visible | recette de navigation |
| Acquisition | clics sur contact et demandes de devis validées | logs applicatifs minimises ; analytics seulement si autorisés |
| SEO local | pages indexables en allemand et données de localisation cohérentes | Search Console après publication |
| Vitesse | chargement mobile fluide et Core Web Vitals satisfaisants | Lighthouse + mesures terrain |
| Maintenabilite | modifications de contenus possibles sans toucher aux composants | configuration et fichiers de données centralises |

Aucun objectif chiffre en leads ou en chiffre d'affaires n'est garanti par ce document.

## 2. Périmètre et priorité des fonctionnalités

**P0 - indispensable en V1 :** accueil, prestations, 6 pages services, à-propos, galerie illustrative honnete, contact, mentions légales, politique de confidentialité, mise en page responsive, identite validée, SEO de base, accessibilite, contrôles de navigation et contenu allemand soigné.

**P1 - mise en production :** domaine et HTTPS, vrais contacts, vrai routage des e-mails, contenus et textes légaux vérifiés, photos autorisées, Search Console, anti-spam et tests complets avant publication.

**P2 - évolutions seulement après validation :** CMS, moteur d'avis authentiques, temoignages vérifiés, blog, multilingue français, prise de rendez-vous, suivi avance de conversions, carte embarquee, fonctionnalités de chat.

**Hors périmètre initial :** e-commerce, boutique, espace client, authentification, tableau de bord, devis automatise chiffre, gestion de projets internes, intégration CRM non demandee, fonctionnalités IA, paiement et reservation en ligne.

## 3. Architecture des pages et URLs

Le site utilise exclusivement des slugs allemands, courts, sans accents, en minuscules ; slash final selon convention unique Next.js.

| Route | Page | Objectif |
|---|---|---|
| `/` | Startseite | présenter les atouts, métiers et contact |
| `/leistungen` | Leistungen | vue d'ensemble des 6 services |
| `/leistungen/fassaden` | Fassadenarbeiten | détail des travaux de façade |
| `/leistungen/trockenbau` | Trockenbau | détail cloisons, faux plafonds et aménagements |
| `/leistungen/putzarbeiten` | Putzarbeiten | détail préparation et enduits |
| `/leistungen/malerarbeiten` | Malerarbeiten | détail travaux de peinture |
| `/leistungen/fliesenarbeiten` | Fliesenarbeiten | détail pose de carrelage |
| `/leistungen/renovierungen` | Renovierungen | détail renovation générale |
| `/ueber-uns` | Über uns | entreprise et approche professionnelle |
| `/referenzen` | Einblicke / Referenzen | galerie ; projets réels seulement s'ils sont documentes |
| `/kontakt` | Kontakt | contact et demande de devis |
| `/impressum` | Impressum | informations légales validées |
| `/datenschutz` | Datenschutzerklärung | traitement des données validé |
| `not-found` | 404 | retour accueil et aide |

**Option conditionnelle :** `/leistungen/daemmung` uniquement si l'entreprise confirme qu'elle propose ce service. Ne pas créer une page publiée non autorisée.

## 4. Spécification éditoriale des pages

### 4.1 Éléments transversaux

**En-tête desktop :** logo complet a gauche, menu « Startseite | Leistungen | Über uns | Referenzen | Kontakt » et CTA bleu « Angebot anfragen ». Sous-menus services possibles au survol ET clavier. Barre sticky douce, pas d'animation intrusive. Le bouton indique `/kontakt`.

**En-tête mobile :** logo réduit lisible, bouton de menu clavier-accessible, panneau de navigation qui se ferme au clic, a l'Escape et après navigation ; CTA contact clairement visible.

**Pied de page :** logo, description en une ligne, navigation utile, services, adresse confirmée, e-mail/tel seulement quand vérifiés, liens Impressum et Datenschutz, date automatique, liens sociaux seulement si comptes officiels communiqués.

**Composants communs :** breadcrumb pour sous-pages, bloc de contact final, cartes de service, titre de section, bouton principal, formulaire avec etats, galerie, galerie vide, accordéon FAQ facultatif si réponses vérifiées.

### 4.2 Startseite - `/`

1. **Hero :** image de bâtiment ou chantier autorisée ; titre fort en allemand ; proposition de valeur ; bouton principal « Angebot anfragen » et bouton secondaire « Leistungen entdecken » ; contraste lisible. Pas de carousel automatique.
2. **Prestations :** six cartes avec pictogrammes simples, titres exacts, résumé d'une a deux phrases et liens vers pages métier.
3. **Presentation courte :** introduction a Thermobau V&V, sans faux historique ni chiffres d'expérience ; bouton « Mehr über uns ».
4. **Processus projet :** « Anfrage - Besprechung - Umsetzung » présente comme parcours indicatif, pas engagement contractuel.
5. **Visuels :** galerie de photos illustrative avec mention explicite « Symbolbilder » si les projets ne sont pas authentiques ; ne pas montrer de fausses références.
6. **Zone d'intervention :** Ludwigshafen comme localisation connue ; « und Umgebung » seulement comme formulation éditoriale prudente, sans liste de communes inventee.
7. **CTA final :** phrase rassurante et bouton vers contact, sans « kostenlos » si la gratuité du devis n'est pas confirmée.

**Proposition de hero allemand :**

> THERMOBAU V&V  
> Ihr Ansprechpartner für Renovierung und Innenausbau in Ludwigshafen.  
> Entdecken Sie unsere Leistungen rund um Fassaden, Trockenbau, Putz, Malerarbeiten, Fliesen und Renovierungen.  
> [Projekt anfragen] [Leistungen ansehen]

### 4.3 Leistungen - `/leistungen`

- Bandeau de page : « Unsere Leistungen » ; courte introduction neutre.
- Grille des six métiers avec visuel, titre, résumé et bouton « Mehr erfahren ».
- Lien vers contact avec liste de demandes typiques (façade, intérieurs, sols, renovation), sans simulateur tarifaire.
- Chaque service a sa propre URL indexable et un contenu distinct. Aucune duplication aveugle.

### 4.4 Fiche service : exigences communes

Pour chacune des six pages : fil d'Ariane, H1 unique, courte introduction, image pertinente avec droit d'usage, 3 a 5 sous-blocs pratiques, benefices raisonnables, étapes indicatives, CTA « Projekt anfragen », liens vers deux autres services. Des FAQ peuvent etre ajoutees uniquement si leur contenu est fiable. Eviter toutes les assertions techniques normatives non documentees.

| Service | H1 allemand | Sujets à présenter |
|---|---|---|
| Façades | Fassadenarbeiten | préparation, renovation et mise en valeur des façades ; détails a confirmer |
| Cloisons | Trockenbau | cloisons, plafonds, aménagement intérieur selon projet |
| Enduits | Putzarbeiten | préparation des supports, enduits intérieurs/extérieurs selon prestations validées |
| Peinture | Malerarbeiten | peinture des murs et plafonds ; finitions interieures/extérieures a confirmer |
| Carrelage | Fliesenarbeiten | carrelage mural et sol ; espaces concernes a confirmer |
| Renovation | Renovierungen aller Art | coordination des demandes de renovation ; périmètre concret a confirmer |

**Exemples de sous-titres allemands neutres :** « Arbeiten passend zu Ihrem Projekt », « Sorgfältige Planung », « Kontakt für Ihr Vorhaben ». Ne pas décrire des méthodes, machines, labels ou matériaux spécifiques sans verification.

### 4.5 Über uns - `/ueber-uns`

- Titre « Über Thermobau V&V ».
- Presentation de l'activité et du secteur géographique ; nom du responsable seulement dans un contexte exact validé.
- Valeurs comme principes éditoriaux (« klare Kommunikation », « sorgfältige Ausführung », « individuelle Projektbetrachtung »), pas promesses commerciales absolues.
- Photo de l'équipe uniquement si authentique et autorisée ; sinon illustration du métier clairement identifiee comme telle.
- CTA vers contact.

**Texte allemand initial :** « Thermobau V&V ist Ihr Ansprechpartner für verschiedene Arbeiten rund um Renovierung und Innenausbau in Ludwigshafen. Auf dieser Website stellen wir unsere Leistungen vor und zeigen, wie Sie uns zu Ihrem Vorhaben kontaktieren können. »

### 4.6 Galerie - `/referenzen`

**Phase prototype :** titre « Einblicke in unsere Leistungen », galerie d'images sous licence avec mention visible « Beispielbilder / Symbolbilder - keine dokumentierten Referenzprojekte von Thermobau V&V ». Ne pas utiliser « Unsere Projekte », avant/après, étiquettes de lieu ou avis de client comme s'ils etaient authentiques.

**Phase publication :** si de vrais chantiers sont obtenus, remplacer les images par des photos avec consentement/droit d'usage, titre, type de travail, localisation uniquement autorisée et courte description verifiable. Option de filtre par métier lorsque 6+ projets réels sont disponibles. Sinon conserver une galerie descriptive d'illustrations ou masquer la rubrique « Referenzen ».

### 4.7 Kontakt - `/kontakt`

- Bloc information entreprise : « Thermobau V&V », Vasil Velikov Dimitrov si confirme pour l'affichage, Blücherstr. 59, 67063 Ludwigshafen, Deutschland.
- Telephone, e-mail et horaires : afficher uniquement si vérifiés ; jamais de faux « +49... » ou « info@... » inventes.
- Formulaire projet : Nom*, E-Mail*, Telefon (facultatif), Leistung (liste), Nachricht*, case de consentement/information RGPD, CTA « Nachricht senden ». Ne pas demander adresse personnelle ou fichiers sensibles en V1.
- Texte d'information RGPD court avec lien vers Datenschutzerklärung ; consentement explicitement validé seulement si base légale/usage le justifie, sans remplacer l'information obligatoire.
- Messages de succès et d'erreur sinceres. Le serveur doit confirmer l'envoi ; jamais d'alerte « gesendet » fictive.
- Carte : preferer un lien externe « Route planen » vers une adresse pre-remplie plutot qu'un iframe automatique ; la carte intégrée est optionnelle et implique une analyse de consentement.

### 4.8 Impressum, Datenschutz et erreur 404

**Impressum :** page accessible depuis chaque page et identifiable ; blocage du passage en production tant que la forme juridique, la qualification du fournisseur, l'adresse de contact electronique, et les mentions supplementaires eventuelles n'ont pas ete vérifiés selon § 5 DDG. Ne pas publier une declaration selon laquelle l'entreprise est GmbH, Meisterbetrieb ou possede un numero de registre/TVA sans preuve.

**Datenschutzerklärung :** version en allemand correspondant exactement aux traitements actifs (hébergement, logs, contact, fournisseur e-mail, images/polices, analytics éventuels, transferts). Verifier avec conseil adapté avant diffusion publique. Ne pas copier une politique générique non conforme au site réel.

**404 :** « Diese Seite wurde nicht gefunden » avec bouton « Zur Startseite » et menu fonctionnel. Metadonnees `noindex`.

## 5. Exigences de design et expérience utilisateur

### 5.1 Logo, palette, typographie

- Le **logo choisi est un actif approuve** : jamais le re-générer a l'identique par IA, ni changer sa composition sans validation. Source fournie `Thermobau_VV_Logo_Valide.png` ; pour une version SVG, vectorisation fidèle et revue humaine, pas un autre concept.
- Utiliser le logo complet dans l'en-tete et le pied de page, la variante symbole seulement après extraction/vectorisation approuvee pour favicon.
- **Couleurs indicatives** a ajuster au fichier graphique : bleu principal `#078DDA`, bleu foncé `#0866A8`, anthracite `#1E2024`, blanc `#FFFFFF`, gris fonds `#F5F7F9`.
- Regle 70/20/10 approximative : blanc/fonds clairs dominant, anthracite pour texte et structure, bleu pour actions.
- Police web : Inter ou Manrope avec graisses 400, 500, 600, 700 ; police hebergee localement avec `next/font`, éviter les appels Google Fonts externes non nécessaires.
- Icones simples et cohérentes (Lucide, SVG), pas de gros effets 3D, de halos, de cadres brillants ou de mouvements incessants.

### 5.2 Grille et responsive

- Mobile-first ; largeur minimum gérée 320 px sans defilement horizontal ; tester particulierement 360, 390, 768, 1024, 1440 et 1920 px.
- Conteneur central max 1200-1280 px selon maquette, marges fluides, grille 12 colonnes sur desktop.
- Barre de navigation : desktop + menu mobile fonctionnel ; colonnes cartes 1/2/3 selon largeur.
- Zone tactile des boutons et liens adaptée (cible env. 44 px quand possible), contrastes perceptibles.
- Ne jamais placer le logo dans un masque ou un recadrage qui coupe la toiture ou les textes.

### 5.3 Animation et direction photographique

- Transitions douces 150-250 ms, reveal leger si utile, respect `prefers-reduced-motion`.
- Visuels : chantier de ravalement, placo, pose d'enduit, peinture, carrelage, intérieur renove ; images licenciees, cohérentes, sans filigrane.
- Les photos temporaires sont distinguees du portfolio authentique. Ne pas mettre une maison de luxe comme « projet réalisé » sans preuve.

## 6. Comportements et fonctionnalités détaillés

### 6.1 Navigation

- Liens internes en `next/link`, etat actif visible, breadcrumbs cohérents, bouton retour accueil 404.
- Les cartes services sont entierement navigables si cela reste accessible et sans contrôles imbriques.
- Sur mobile, verrouiller correctement focus/panneau, fermer avec Escape et restaurer le focus au declencheur.
- Les ancres / CTA conduisent a une destination réelle. Pas de liens morts `#`.

### 6.2 Formulaire de contact

1. L'utilisateur entre les données ; validation client pour l'ergonomie, puis serveur pour la sécurité.
2. Normaliser/valider (`Zod`) : nom, e-mail, option telephone, type de prestation connu, message avec limités raisonnables ; supprimer balises HTML non nécessaires.
3. Anti-spam : honeypot et limitation de debit cote serveur ; option protection supplementaire si nécessaire.
4. Envoi : Server Action ou Route Handler vers fournisseur e-mail configuré (ex. Resend, SMTP, autre fournisseur autorisé) avec variables d'environnement privées.
5. L'utilisateur recoit un accusé d'envoi uniquement si le fournisseur retourne un succès ; sinon message d'échec et canal alternatif validé.
6. Ne jamais envoyer de secret depuis le navigateur, ni journaliser en clair les messages/coordonnées.
7. Pas de stockage en base de données en V1 sauf besoin et politique de conservation documentes.

**Etats UI :** initial, champs incorrects, envoi en cours, succès vérifié, échec recuperable, service temporairement indisponible. **Sans e-mail configuré en prototype :** formulaire en mode démonstration affiche comme non opérationnel ; aucun faux succès.

### 6.3 Gestion du contenu et configuration

- Une seule configuration `src/config/site.ts` avec nom, responsable, adresse, email nullable, telephone nullable, zone, domaine nullable, marque, réseaux sociaux et textes légales.
- Donnees prestations dans `src/data/services.ts`, typage fort et slugs centralises.
- Donnees de la galerie dans `src/data/projects.ts`, chaque visuel porte `kind: 'illustration' | 'real-project'`, credit, texte alternatif, droit d'usage et statut publication.
- Le code doit afficher/masquer intelligemment les champs vides, sans afficher de placeholders visibles dans une version en production.
- Configuration de consentement/analytics désactivée tant que non justifiee ; contenu allemand separable des composants.

## 7. Architecture technique cible

### 7.1 Pile imposée ou recommandée

| Couche | Choix | Commentaire |
|---|---|---|
| Framework | **Next.js** stable, App Router | rendu hybride SSR/SSG selon la page |
| Interface | **React** | composants réutilisables et interactifs |
| Langage | **TypeScript** strict | `tsx` pour les composants React, `ts` pour la logique |
| Execution | **JavaScript** moderne | runtime Node.js pour les actions serveur ; TypeScript compile en JS |
| Style | **Tailwind CSS** | design tokens, CSS variables et utilitaires |
| Animations | Framer Motion si vraiment utile | dependance optionnelle, accessible |
| Formulaires | React Hook Form + Zod (ou equivalent) | validation client/serveur cohérente |
| Icones | Lucide React | visuels SVG legers |
| Medias | `next/image`, SVG | tailles, `sizes`, lazy-loading approprié |
| Hebergement | Vercel envisage | dev, preview, production et secrets séparés |
| Donnees | fichiers TS/JSON en V1 | pas de base de données obligatoire |

**Precision :** JavaScript n'est pas une quatrieme technologie concurrente a React/TypeScript. Le site est developpe principalement en TypeScript/TSX, sur l'ecosysteme JavaScript, avec Next.js et React.

### 7.2 Principes d'architecture

- App Router de Next.js ; Server Components par défaut et `use client` seulement sur composants interactifs.
- Pre-rendu statique des pages editoriales autant que possible. Server Action / route serveur pour soumission, selon besoins de déploiement.
- Composants réutilisables sans duplication des sections de page.
- Pas d'installation de bibliotheques lourdes sans justification ; audit de leurs licences et maintenance.
- Alias de chemin TypeScript `@/*`, conventions de noms consistantes, ESLint/Prettier, strict checks.
- Donnees sensibles dans `.env.local` hors Git ; `.env.example` sans cles secretes réelles.

### 7.3 Proposition d'arborescence

```text
thermobau-vv/
├── public/
│   ├── brand/                # logo approuve, favicon approuve
│   └── images/               # photos autorisees, exemples identifies
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── leistungen/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── ueber-uns/page.tsx
│   │   ├── referenzen/page.tsx
│   │   ├── kontakt/page.tsx
│   │   ├── impressum/page.tsx
│   │   ├── datenschutz/page.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/            # header, footer, menu, breadcrumbs
│   │   ├── ui/                # bouton, titre, cartes, formulaire
│   │   └── sections/          # hero, services, CTA, galerie
│   ├── config/site.ts
│   ├── data/services.ts
│   ├── data/projects.ts
│   ├── lib/                   # validations, contact mail, SEO
│   └── styles/                # styles globaux et tokens
├── tests/
├── .env.example
├── README.md
└── package.json
```

Les vrais noms de fichiers sont adaptes a la version stable de Next.js et aux conventions du framework lors du demarrage.

### 7.4 Contenu de configuration (contrat fonctionnel)

```ts
interface BusinessSiteConfig {
  businessName: 'Thermobau V&V';
  contactPerson: string | null;
  address: { street: string; postalCode: string; city: string; country: 'DE' };
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  openingHours: string[] | null;
  domain: string | null;
  confirmedServiceAreas: string[];
  socialLinks: { name: string; url: string }[];
  legal: { legalForm: string | null; registerNumber: string | null; vatId: string | null };
  enableContactEmail: boolean;
  enableAnalytics: boolean;
}
```

`null` signifie que la valeur n'est pas disponible. Ne pas convertir `null` en coordonnée d'exemple dans le rendu HTML ou les métadonnées SEO.

## 8. SEO local et partage

- Chaque page indexable possede son propre `title` et sa `description` en allemand, un H1 unique, des H2 logiques, des URLs lisibles et une canonical absolue quand le domaine est fixe.
- `metadata` Next.js, `sitemap.ts`, `robots.ts`, Open Graph, favicon, image sociale et `lang="de"`.
- `LocalBusiness` Schema.org seulement avec des données fiables : nom, adresse, URL vérifiée, contact vérifié. Ne pas renseigner `aggregateRating`, horaires ou zones inventes.
- Structure de maillage interne : accueil -> prestations -> fiche -> contact ; retour vers autres métiers pertinents.
- Termes possibles : « Renovierung Ludwigshafen », « Trockenbau Ludwigshafen », « Malerarbeiten Ludwigshafen », etc., uniquement dans des phrases naturelles.
- Ne pas promettre une première position Google ou indexation instantanee.
- Avant diffusion : connecter Search Console, soumettre sitemap, vérifier absence de `noindex` sur production et presence de `noindex` sur staging si nécessaire.

## 9. Accessibilité, performance, qualité et sécurité

### 9.1 Accessibilité

Objectif de conception : **WCAG 2.2 niveau AA** dans la mesure applicable au projet. Navigation clavier complète, liens descriptifs, focus visible, alternative des images utiles, contrastes texte/fond, libelles de formulaire, erreurs liées au champ, hierarchie des titres, animation reduite, zoom 200 %, pas de contenu dependant uniquement de la couleur. Ne pas declarer formellement le site « conforme WCAG » sans audit adequat. L'applicabilite juridique spécifique au BFSG doit etre examinee au cas par cas, sans la presumer.

### 9.2 Performance

- Images modernes, dimensions appropriées, optimisation via `next/image`, hero optimisée ; limiter scripts tiers.
- Cibles de travail indicatives : Lighthouse mobile **Performance >= 90**, **Accessibilite >= 90**, **SEO >= 90** en tests contrôles ; Core Web Vitals LCP <= 2,5 s, CLS <= 0,1 et INP <= 200 ms au 75e percentile dans les conditions de mesure appropriées.
- Chiffrer/approuver les ecarts si contrainte réseau, media ou services tiers. Ces scores sont des objectifs d'optimisation, pas des garanties contractuelles.

### 9.3 Sécurité

- HTTPS sur domaine definitif, dependances a jour, prevention injection/HTML non voulu, validation des formulaires serveur, rate limiting, secrets serveur, politique d'en-tetes sécurité adaptée, pas de données perso sensibles dans les logs, protection des endpoints et sauvegarde du code sur depot privé.
- Verifier les destinataires réels des e-mails et la politique de retention du prestataire d'envoi avant publication.

## 10. Vie privée et exigences allemandes

- **Impressum (§ 5 DDG)** : coordonnées effectives, identification de l'operateur et, selon cas, forme juridique, registre, autorite competente, TVA, professions réglementées. Verification de fond requise.
- **RGPD (art. 13)** : information claire sur le traitement des données collectees, destinataires, base légale, droits, conservation et transferts pertinents.
- **TDDDG (§ 25)** : demander le consentement avant tout stockage/accès non exempté sur le terminal ; les fonctions strictement nécessaires peuvent relever d'une exemption. Ne pas installer automatiquement un bandeau cookies artificiel si aucun service ne l'exige ; audit d'abord.
- Polices locales et carte sous forme de lien pour limiter les chargements tiers ; pas de pixel Meta/Google Analytics sans revue du consentement et de la politique de confidentialité.
- Les textes juridiques du prototype sont des structures provisoires ; leur validation finale appartient au responsable et/ou au conseil juridique adapté.

**Sources officielles utiles :** https://www.gesetze-im-internet.de/ddg/__5.html ; https://www.gesetze-im-internet.de/ttdsg/__25.html ; https://eur-lex.europa.eu/eli/reg/2016/679/.

## 11. Parcours utilisateurs à satisfaire

| Réf. | Scénario | Résultat attendu |
|---|---|---|
| U01 | visiteur arrive sur mobile | logo lisible, hero rapide, contact facile |
| U02 | visiteur ouvre « Leistungen » | les 6 métiers apparaissent clairement |
| U03 | visiteur ouvre « Trockenbau » | page distincte, contenu allemand, CTA contact |
| U04 | visiteur filtre ou parcourt la galerie | aucune photo stock presentee comme un chantier réel |
| U05 | visiteur veut un devis | accès formulaire en 1-2 clics |
| U06 | visiteur soumet formulaire invalide | erreurs allemandes accessibles, aucun envoi |
| U07 | envoi e-mail non configuré | aucune confirmation mensongere ; message explicatif |
| U08 | envoi validé sur environnement configuré | retour succès seulement si service confirme |
| U09 | visiteur ouvre page inconnue | 404 avec navigation fonctionnelle |
| U10 | utilisateur navigue clavier uniquement | menu, bouton, formulaire et liens operables |
| U11 | administrateur modifié telephone dans config | changement repercute aux endroits autorisés |
| U12 | robot de recherche parcourt le site | sitemap, canonical, titres uniques et robots corrects |

## 12. Tests et critères de recette

### 12.1 Tests automatiques minimaux

- `npm run lint`, `npm run typecheck`, `npm run build` : succès.
- Tests unitaires des validateurs de formulaire et de la construction des métadonnées ; tests d'intégration de l'envoi avec simulateur, sans e-mails réels intempestifs.
- Tests end-to-end recommandés avec Playwright : menu mobile, navigation interpages, formulaire erreur/succès simulé, page 404, absence de liens morts.
- Audit accessibilite automatique `axe` et verification manuelle clavier.

### 12.2 Tests visuels et navigateurs

- Largeurs obligatoires 360, 390, 768, 1024, 1440, 1920 px : aucun scroll horizontal, aucune image de logo coupee, boutons utilisables.
- Chrome, Edge, Firefox et Safari recentes versions, dans une mesure realisable ; police et accents allemands corrects (« Über », « zuverlässig », « Fußboden » si utile).
- Verifier les rendus dans l'ordre mobile, tablette, desktop et les interactions avec `prefers-reduced-motion`.

### 12.3 Critères bloquants avant validation technique V1

1. Chaque URL P0 fonctionne et le contenu est en allemand sans Lorem Ipsum.
2. Les six services sont presentes avec des fiches dédiées cohérentes.
3. Le logo approuve est intégré sans modification non demandee.
4. Aucune coordonnée fausse n'est visible, aucune expérience ou référence inventee.
5. La galerie identifie ses illustrations provisoires.
6. Formulaire fonctionnel avec destinataire vérifié OU explicitement marque indisponible en prototype.
7. Pas d'erreurs JavaScript persistantes, pas de lien CTA inactif, pas d'erreurs critiques de build.
8. Versions mobile et desktop testees ; SEO initial et pages légales presentes.
9. L'entreprise et le chef de projet peuvent remplacer contenu et media facilement.
10. Un `README.md` explique installation, configuration, build et limites du prototype.

### 12.4 Conditions supplémentaires pour mise en ligne publique

- Identification juridique et textes Impressum/Datenschutz validés.
- Domaine et certificat TLS actifs, environnement de production configuré.
- Telephone et e-mail confirmés, tests d'envoi réels et mesures anti-spam efficaces.
- Droit d'utilisation des photos et du logo confirme ; mentions « Symbolbilder » correctes.
- Revue de confidentialité des cookies, analytics et services externes.
- Tests de regression, mesure performance, verification des backups/depot et approbation finale.

## 13. Phases de réalisation et livrables

| Phase | Travail | Livrable |
|---|---|---|
| 1. Design system | importer logo, tokens, typographies, composants de base | theme et composants UI |
| 2. Squelette | App Router, layout, header/footer, navigation, erreurs | structure navigable |
| 3. Pages | accueil, 6 prestations, à-propos, galerie, contact | site vitrine allemand complet |
| 4. Métier et contact | contenu configurable, champs, e-mail conditionnel et anti-spam | parcours de devis teste |
| 5. SEO et conformité | métadonnées, structure locale, pages légales a valider | audit technique et liste des points ouverts |
| 6. Recette | responsive, accessibilite, build, e2e, corrections | version démo presentable au boss |
| 7. Production (après validation) | vraies infos, domaine, vie privée, e-mails, mesure | version en ligne autorisée |

**Livrables techniques attendus de Codex, a détailler a l'étape 4 :** dépôt source Next.js/TypeScript, `README.md`, `.env.example`, composants réutilisables, configuration de données, images autorisées, et liste explicite de ce qui reste a valider. Le prompt exécutable et ordonne pour Codex sera rédigé uniquement lors de l'étape 4 du projet.

## 14. Table de décisions et contenu en attente

| Champ | Valeur initiale | Statut | Comportement dans le prototype |
|---|---|---|---|
| Nom entreprise | Thermobau V&V | confirmé | afficher |
| Responsable transmis | Vasil Velikov Dimitrov | a vérifier pour usages légaux | contact administratif, pas de titre fictif |
| Adresse | Blücherstr. 59, 67063 Ludwigshafen | communiquée | afficher, confirmer avant publication |
| Telephone | aucun | manquant | masquer lien d'appel |
| E-mail | aucun | manquant | masquer adresse, bloquer envoi réel |
| WhatsApp | aucun | manquant | masquer bouton |
| Horaires | aucun | manquant | ne pas inventer |
| 6 services de la camionnette | liste du § 1 | source fournie | afficher avec textes prudents |
| Isolation thermique | non confirmée | option | ne pas publier de page service |
| Photos de réalisations | non disponibles | manquant | exemples deposes sous « Symbolbilder » |
| Avis clients / chiffres | non disponibles | manquant | ne pas créer |
| Logo maison + vagues + nom | approuvé | validé | reutiliser le visuel fourni |
| Domaine / réseaux sociaux | aucun | manquant | ne pas inventer de liens |
| Forme juridique / TVA | non fournies | manquant | placeholders internes, validation avant production |

## 15. Exemple de textes allemands prêts pour maquette

Ces textes sont des propositions de communication et non des faits nouveaux.

**Navigation :** « Startseite », « Leistungen », « Über uns », « Referenzen », « Kontakt », « Angebot anfragen ».

**Introduction prestations :** « Unsere Leistungen im Überblick. Ob Fassaden, Trockenbau, Putz, Malerarbeiten, Fliesen oder Renovierung: Entdecken Sie die Arbeitsbereiche von Thermobau V&V und sprechen Sie mit uns über Ihr Vorhaben. »

**Contact :** « Erzählen Sie uns von Ihrem Vorhaben. Nutzen Sie das Kontaktformular, um uns Ihre Anfrage zu senden. Wir freuen uns darauf, mehr über Ihr Projekt zu erfahren. » [Ne montrer le formulaire comme opérationnel qu'après configuration.]

**Galerie illustrative :** « Die gezeigten Bilder dienen der Veranschaulichung unserer Tätigkeitsbereiche und stellen keine dokumentierten Referenzprojekte von Thermobau V&V dar. »

**CTA :** « Sie planen eine Renovierung? Kontaktieren Sie uns und schildern Sie Ihr Vorhaben. »

**Footer :** « Thermobau V&V - Arbeiten rund um Renovierung und Innenausbau in Ludwigshafen. »

**Confirmation lorsque l'envoi est effectivement vérifié :** « Vielen Dank. Ihre Nachricht wurde erfolgreich übermittelt. »

**Erreur d'envoi :** « Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut. »

## 16. Sources de référence

- Droit allemand - obligations d'information : **§ 5 DDG** : https://www.gesetze-im-internet.de/ddg/__5.html
- Droit allemand - consentement et appareils terminaux : **§ 25 TDDDG** : https://www.gesetze-im-internet.de/ttdsg/__25.html
- Règles sur la collecte de données personnelles : **RGPD, article 13** : https://eur-lex.europa.eu/eli/reg/2016/679/
- Recommandations d'accessibilite : **W3C - WCAG 2.2** : https://www.w3.org/WAI/WCAG22/quickref/
- Documentation officielle Next.js : https://nextjs.org/docs/app

**Fin du cahier des charges - version 1.0.**
