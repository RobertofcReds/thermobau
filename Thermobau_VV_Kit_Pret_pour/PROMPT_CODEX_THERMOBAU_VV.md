# PROMPT MAITRE POUR CODEX - THERMOBAU V&V

Tu es mon agent de développement full-stack senior, expert en Next.js App Router, React, TypeScript, JavaScript moderne, Tailwind CSS v4, accessibilité et SEO allemand. Tu dois **RÉALISER** le site, pas seulement expliquer comment le réaliser. Travaille dans le workspace ouvert, crée et modifie réellement les fichiers, installe les dépendances compatibles, exécute les vérifications, corrige les erreurs et livre un prototype prêt à présenter à mon responsable.

## 0. Documents d'entrée et ordre de priorité

Lis intégralement, avant de commencer :
- `docs/Thermobau_VV_Cahier_des_charges_V1.md` (besoins fonctionnels et éditoriaux validés) ;
- `docs/Thermobau_VV_Architecture_Technique_V1.md` (architecture V1 approuvée) ;
- `assets/Thermobau_VV_Logo_Valide.png` (logo **définitivement choisi**, ne pas le recréer) ;
- `assets/Thermobau_Vehicule_Reference_INTERNE.png` (véhicule de référence, à usage interne uniquement tant que la publication de cette photographie n'est pas autorisée).

Les documents détaillés complètent ce prompt. En cas de conflit, les règles de sécurité, de véracité des informations et les décisions explicites du présent prompt priment. Si un fichier d'entrée manque, utilise toutes les informations contenues ci-dessous et indique clairement ce qui est absent ; ne bloque pas inutilement la construction.

Commence par examiner l'arborescence existante (`package.json`, `src/`, `.gitignore`, `docs/`, `assets/`). Si un projet est déjà présent, **préserve le code et les fichiers existants** et adapte-le sans suppression destructive. Sinon, initialise proprement un projet Next.js dans le répertoire de travail du site, en conservant `docs/` et `assets/`. Ne crée pas plusieurs projets Next.js imbriqués. Ne supprime jamais les documents fournis ni le logo validé.

## 1. But du site et vérité des informations

Créer un site vitrine professionnel **entièrement en allemand** pour l'entreprise de bâtiment et rénovation **Thermobau V&V**, à Ludwigshafen, Allemagne. Il ne s'agit ni d'une boutique, ni d'un site de chauffage/pompes à chaleur, ni d'une plateforme avec comptes clients. Le site doit être esthétique, crédible, intuitif, rapide, accessible, responsive et orienté vers la prise de contact / demande de devis.

Données réellement communiquées :
- Nom : `Thermobau V&V` ;
- Personne de contact communiquée : `Vasil Velikov Dimitrov` ;
- Adresse : `Blücherstr. 59, 67063 Ludwigshafen, Deutschland` ;
- Six domaines de prestations visibles sur le véhicule : Fassaden, Trockenbau, Putz, Maler, Fliesen, Renovierungen aller Art.

**Interdictions essentielles :** n'invente aucun numéro de téléphone, e-mail, WhatsApp, horaires, avis client, témoignage, note, nombre de projets, ancienneté, photo de chantier attribuée à Thermobau, certification, prix, remise, qualification réglementée, référence commerciale, zone de couverture confirmée, nom de domaine ou donnée juridique. Le terme « Thermobau » ne démontre pas qu'ils installent du chauffage, des pompes à chaleur, des panneaux PV ou qu'ils proposent tous les types d'isolation : n'ajoute pas ces services sans validation. Une galerie de photos génériques est **illustrative**, jamais un portfolio de réalisations prétendument authentiques.

Toutes les données manquantes sont `null`, non publiées ou explicitement marquées `à confirmer` dans le fichier interne de préparation, mais **pas** sous la forme de faux contacts affichés publiquement. Le prototype doit pouvoir être montré immédiatement, puis corrigé par le boss sans refonte structurelle.

## 2. Stack de développement et conventions obligatoires

- **Node.js 24 LTS** (ajouter `.nvmrc` avec `24`), **npm seulement**, avec `package-lock.json` commité ;
- **Next.js** version stable compatible, **App Router** avec `src/app/`, React version compatible, TypeScript `strict: true` ;
- JavaScript ES moderne comme écosystème/runtime ; source applicative principalement `.ts`/`.tsx`, ne pas dupliquer la logique en `.js` ;
- **Tailwind CSS v4** (configuration PostCSS officielle `@tailwindcss/postcss`, CSS global avec `@import "tailwindcss";`) ;
- **Lucide React** pour les icônes ; CSS pour les transitions, `motion` uniquement si réellement utile ;
- **Zod** pour le formulaire, validation indispensable côté serveur ;
- ESLint, Prettier, tests Vitest et tests de parcours Playwright ;
- **Vercel** comme cible de déploiement future, mais ne déploie rien sans mon autorisation explicite ;
- pas de base de données, pas de CMS, pas de boutique, pas de blog, pas de gestion des utilisateurs, pas de chatbot, pas de cookies analytiques par défaut.

Vérifie les API exactes de la version Next.js installée. N'utilise pas `next lint` si la version courante ne le supporte pas : le script `lint` doit utiliser ESLint. N'utilise pas un squelette Tailwind v3 pour ce projet Tailwind v4. Priorité aux Server Components, avec `"use client"` uniquement pour menu mobile, formulaire et filtrage interactif éventuel. Utilise `next/image`, `next/link`, la Metadata API et les Route Handlers officiels.

Docs techniques utiles :
- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/api-reference/file-conventions/route
- https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- https://tailwindcss.com/docs/installation/framework-guides/nextjs

## 3. Identité graphique du site : ne pas réinterpréter le logo

Copie le fichier **réel** `assets/Thermobau_VV_Logo_Valide.png` vers `public/brand/thermobau-vv-logo.png` ; ne le régénère pas, ne le redessine pas, ne remplace pas sa typographie, n'ajoute pas d'effets, d'ombres, de halos ni de nouvelle forme. Le logo validé est un toit de maison noir avec cheminée et fenêtre à quatre carreaux ; deux vagues bleues en dessous ; puis le texte « THERMOBAU » et, sous lui, « V & V » en noir avec esperluette et traits latéraux bleus. Préserve l'ensemble, son ratio et sa lisibilité. Le fichier source est carré avec fond blanc : adapte l'intégration sur en-tête blanc, sans masquer ou couper ses éléments. Si nécessaire, utilise `object-contain` et un conteneur dimensionné ; ne fabrique pas un « SVG vectoriel » en renommant ce PNG.

Direction artistique : entreprise allemande de rénovation, sobre, structurée, moderne, professionnelle, crédible, pas un design de jeu vidéo. Base de couleurs : bleu `#078DDA`, bleu sombre `#0866A8`, anthracite `#1E2024`, corps de texte `#374151`, blanc `#FFFFFF`, gris clair `#F5F7F9`. Transforme-les en tokens CSS réutilisables. Fond principalement blanc, contraste soigné, typographie Inter ou Manrope (police gérée correctement et pas de requêtes inutiles à des serveurs externes), titres structurés et grandes respirations. Pas de néon, 3D, ombres lourdes, gros dégradés ni courbes décoratives ajoutées. Les deux vagues font déjà partie **du logo seulement**, pas un motif à répéter sur tout le site.

Mobile first, lisible à 320 px ; conteneur principal environ 1200-1280 px ; grille 1 colonne mobile, 2 tablette, 3 desktop pour les services ; espacement cohérent ; boutons facilement cliquables ; animations courtes 150-250 ms et `prefers-reduced-motion` respecté. Adapter avec soin la hauteur du logo dans la navigation afin qu'il ne prenne pas la moitié de l'écran sur téléphone.

## 4. Pages et URLs - respecter exactement ce contrat

Créer **13 pages publiques** et une vraie page 404 en allemand :

1. `/` - **Startseite** ;
2. `/leistungen` - liste des six services ;
3. `/leistungen/fassaden` - **Fassadenarbeiten** ;
4. `/leistungen/trockenbau` - **Trockenbau** ;
5. `/leistungen/putzarbeiten` - **Putzarbeiten** ;
6. `/leistungen/malerarbeiten` - **Malerarbeiten** ;
7. `/leistungen/fliesenarbeiten` - **Fliesenarbeiten** ;
8. `/leistungen/renovierungen` - **Renovierungen aller Art** ;
9. `/ueber-uns` - **Über uns** ;
10. `/referenzen` - **Referenzen / Einblicke in unsere Leistungen** ;
11. `/kontakt` - **Kontakt** ;
12. `/impressum` - **Impressum** ;
13. `/datenschutz` - **Datenschutzerklärung**.

À part ces pages, créer `/api/contact` (route serveur POST), `not-found.tsx`, `sitemap.ts`, `robots.ts` et la gestion d'icône adaptée à la marque, sans inventer un nouveau logo. Utiliser `src/app/(website)/...` si cela simplifie le regroupement (les parenthèses ne doivent pas apparaître dans les URLs). Pour les six fiches, utiliser `src/app/(website)/leistungen/[slug]/page.tsx`, `generateStaticParams()`, `dynamicParams = false`, et `generateMetadata()`. Sur les Next.js récents, le paramètre `params` peut être une Promise : respecter l'API de la version installée.

### Contenu et structure de chaque page

**Accueil `/` :**
- en-tête logo + liens `Startseite`, `Leistungen`, `Über uns`, `Referenzen`, `Kontakt` + CTA `Angebot anfragen` ;
- hero élégant avec H1 `Thermobau V&V – Ihr Ansprechpartner für Renovierung und Innenausbau in Ludwigshafen` et sous-titre allemand prudent, illustration/photographie avec droits vérifiés, bouton `Leistungen entdecken` et CTA vers `/kontakt` ;
- six cartes de services cliquables ;
- section présentation de l'entreprise basée sur les éléments réellement disponibles ;
- « So läuft Ihre Anfrage ab » (Kontakt aufnehmen -> Vorhaben beschreiben -> Rückmeldung nach Klärung), sans délais contractuels inventés ;
- galerie de **types de travaux illustratifs** si des médias légaux sont disponibles, sinon compositions visuelles sobres ;
- section `Sie planen eine Renovierung?` avec CTA ;
- footer complet contenant les données vérifiées, liens légaux et navigation.

**Liste `/leistungen` :** introduction en allemand ; six cartes visuellement homogènes avec images/icônes, titre, description courte, lien vers chaque page métier ; CTA final vers contact.

**Six fiches services :** H1 allemand unique ; présentation précise et prudente du type de travaux ; liste de travaux ou étapes **générales**, sans alléguer une certification ou des capacités non confirmées ; illustration autorisée ; mini FAQ simple si utile sans promesses ; CTA `Projekt anfragen` pré-sélectionnant le service sur le formulaire si possible.

**`/ueber-uns` :** présenter sobrement Thermobau V&V et son activité, sa localisation à Ludwigshafen et les métiers visibles ; ne pas écrire « seit 20 Jahren », « Meisterbetrieb », « unser großes Team », etc. sans preuve. Utiliser une illustration métier identifiée si besoin.

**`/referenzen` :** dans la démo, utiliser le titre `Einblicke in unsere Leistungen`, et une mention **visible** : `Die gezeigten Bilder dienen der Veranschaulichung unserer Tätigkeitsbereiche und stellen keine dokumentierten Referenzprojekte von Thermobau V&V dar.` Si aucune image aux droits documentés n'est disponible, afficher une galerie de six cartes métier illustrées par SVG ou icônes locales, explicitement présentées comme illustrations. Ne pas fabriquer de chantier, d'avant/après, de photos de clients ou de lieux. Prévoir plus tard un modèle `real-project` activable après confirmation des droits.

**`/kontakt` :** nom, personne de contact communiquée si légitime dans le contexte, adresse réelle. Ne pas afficher de téléphone, e-mail, horaires ou lien WhatsApp si inconnus. Proposer au besoin un simple lien externe explicite vers un service de cartographie, sans intégrer de carte tierce traçante par défaut. Formulaire soigné, mais **mode démonstration clairement visible** si l'envoi n'est pas configuré.

**`/impressum` et `/datenschutz` :** pages allemandes avec structure professionnelle, titres et informations réellement connues. Montrer clairement qu'il s'agit de **textes provisoires à vérifier avant publication** ; ne pas affirmer leur validité légale. Ne pas créer de fausse forme juridique, ID TVA, registre commercial, responsable RGPD ou modalités techniques imaginaires. Recueillir ultérieurement les informations requises pour respecter § 5 DDG et le RGPD. `Datenschutzerklärung` doit refléter seulement les traitements effectivement mis en œuvre ; ne pas copier de modèle juridique générique prétendu conforme.

**404 :** `Diese Seite wurde nicht gefunden`, explication courte, bouton `Zur Startseite` et liens fonctionnels ; `noindex`.

TOUT le texte visible pour les utilisateurs (menus, libellés, messages, validations, FAQ, descriptions, boutons, erreurs, textes alternatifs, mentions) doit être en **allemand naturel, correct et professionnel**, sans Lorem Ipsum ni paragraphes en français ou en anglais. Le `README.md` et les commentaires internes peuvent être en français.

## 5. Structure du projet - à réaliser et respecter

```text
thermobau-vv/
  public/
    brand/thermobau-vv-logo.png
    images/hero/
    images/services/
    images/gallery/
  src/
    app/
      layout.tsx
      globals.css
      not-found.tsx
      sitemap.ts
      robots.ts
      (website)/page.tsx
      (website)/leistungen/page.tsx
      (website)/leistungen/[slug]/page.tsx
      (website)/ueber-uns/page.tsx
      (website)/referenzen/page.tsx
      (website)/kontakt/page.tsx
      (website)/impressum/page.tsx
      (website)/datenschutz/page.tsx
      api/contact/route.ts
    components/
      layout/      # SiteHeader, SiteFooter, MobileNav, Breadcrumbs
      sections/    # Hero, ServiceGrid, About, Cta, Gallery
      ui/          # Button, Container, SectionHeading, cards
      forms/       # ContactForm, fields, messages
    config/site.ts
    data/services.ts
    data/projects.ts
    data/navigation.ts
    lib/contact-schema.ts
    lib/mail.ts
    lib/rate-limit.ts
    lib/seo.ts
    types/content.ts
  tests/unit/
  tests/e2e/
  docs/            # conserver cahier et architecture fournis
  assets/          # conserver fichiers originaux
  .env.example
  .nvmrc
  README.md
  package.json
  package-lock.json
```

Ne crée pas d'abstractions lourdes inutiles. Nomme les composants en PascalCase, helpers en kebab-case, importe avec `@/*`. Le layout global doit produire `<html lang="de">`, menu responsive et footer partagés. Pas de liens CTA morts `href="#"`.

## 6. Données fortement typées et modifiables

Centralise dans `src/config/site.ts` : nom, responsable, adresse (rue, code postal, ville, pays `DE`), téléphone `null`, e-mail `null`, WhatsApp `null`, horaires `null`, zones confirmées `[]`, domaine `null`, chemin du logo, données juridiques `null`. Prévois des types `SiteConfig`, `Service`, `GalleryItem`.

Définis `ServiceSlug` comme union de `fassaden | trockenbau | putzarbeiten | malerarbeiten | fliesenarbeiten | renovierungen`. Crée dans `src/data/services.ts` **une seule liste** des six services avec : slug, titre allemand, teaser, description utile, image/illustration, alt allemand, éventuelle liste de points généraux, ordre, SEO. Génère les cartes, les fiches, le filtre galerie éventuel et le sitemap depuis cette source, sans duplication du contenu. Les modifications futures par le boss doivent se faire en changeant les données centralisées, non en parcourant des dizaines de composants.

Pour la galerie, chaque item a : identifiant, image/illustration, alt, `kind: 'illustration' | 'real-project'`, crédit, autorisation de publication, état publié et éventuellement titre/lieu vérifiés. **Seuls les contenus ayant des droits vérifiés peuvent être rendus comme images publiques.**

## 7. Formulaire de contact et API : exactitude impérative

Champs : `name` obligatoire (2-100), `email` valide obligatoire, `phone` facultatif (max 30), `service` parmi les six slugs, `message` obligatoire (20-3000), champ honeypot `website` invisible. Tout afficher en allemand. Utiliser Zod sur le serveur et si utile côté client, limiter la taille du corps JSON et le type Content-Type ; afficher les erreurs de champs de façon accessible.

Créer `POST /api/contact` en environnement Node.js, avec contrat de réponse simple : `{ ok: boolean, message: string, fieldErrors?: Record<string, string[]> }`. Codes : 200 si le prestataire a **réellement accepté** le message, 400 données invalides, 413 trop volumineux, 429 anti-abus, 503 envoi non configuré/indisponible, 500 erreur imprévue. Ne jamais renvoyer les secrets ni journaliser les messages personnels. Refuser/neutraliser les contenus HTML dangereux et ne pas interpoler l'entrée utilisateur dans des en-têtes e-mail.

**Mode démonstration par défaut :** `CONTACT_FORM_ENABLED=false`. Le site explique en allemand, près du bouton, que l'envoi n'est pas encore disponible. Un formulaire n'affiche jamais `Nachricht erfolgreich gesendet` sans véritable envoi. On peut permettre une saisie de démonstration, mais l'API doit répondre 503 tant qu'elle n'est pas configurée. L'expérience de démo doit rester visuellement crédible sans être trompeuse.

**Mode production ultérieur :** isoler un adaptateur de transport e-mail côté serveur ; configurer une clé secrète, expéditeur et destinataire officiels via variables d'environnement, jamais `NEXT_PUBLIC_*`. Ajouter honeypot et rate limiting **distribué compatible avec Vercel** (un compteur en mémoire n'est pas une protection suffisante). Si les dépendances anti-abus ou le fournisseur ne sont pas réellement configurés, refuser l'activation de l'envoi et documenter la procédure. Un client simulé sert seulement aux tests automatisés, jamais à confirmer une soumission réelle sur l'interface.

Fichier `.env.example` au minimum :
```
NEXT_PUBLIC_SITE_URL=
SITE_PUBLICATION_READY=false
CONTACT_FORM_ENABLED=false
CONTACT_RECIPIENT_EMAIL=
CONTACT_FROM_EMAIL=
MAIL_PROVIDER_API_KEY=
# Variables de protection distribuée nécessaires au provider choisi
```
Respecter strictement la différence entre variable publique et secrets serveur. Ne génère pas de vrais identifiants.

## 8. Médias, illustrations et favicon

Utiliser des médias locaux optimisés dont les droits sont vérifiés ; si internet ou licences indisponibles, construire une identité visuelle qualitative avec formes CSS/SVG originales simples et **illustrations explicitement signalées** plutôt qu'inventer des références visuelles. Le cliché de la camionnette joint sert uniquement à comprendre les métiers et couleurs, **pas à afficher publiquement sans accord**. Pour les images de vrais chantiers futures, préparer un remplacement simple via `src/data/projects.ts`. Toute image illustrative en galerie doit porter la mention `Symbolbild` ou l'avertissement collectif visible.

Intégrer fidèlement le logo PNG fourni. Pour le favicon, n'invente pas un autre logo : utiliser le symbole existant uniquement s'il peut être extrait proprement et fidèlement, ou employer temporairement le PNG approuvé avec un cadrage non destructif, puis préciser qu'une version favicon compacte devra être validée.

## 9. SEO, indexation, accessibilité et vie privée

- H1 unique par page, titres/meta descriptions allemands uniques ; SEO local naturel pour Ludwigshafen sans inventer un rayon d'intervention ; `generateMetadata()` pour les pages métier ; sitemap et robots adaptés ; données LocalBusiness seulement avec champs validés ; aucun avis/rating fictif en JSON-LD.
- Prévisualisation et développement **noindex, nofollow** par défaut. Activer l'indexation uniquement si `SITE_PUBLICATION_READY=true`, domaine officiel présent et environnement de production : metadata robots + en-tête `X-Robots-Tag` pour preview lorsque faisable. Ne pas croire que `robots.txt` seul suffit. Ne pas créer des URLs canoniques fictives. Prévoir la procédure de déverrouillage pour le boss, sans l'exécuter.
- Accessibilité : viser WCAG 2.2 AA ; sémantique HTML, labels, alt, couleurs contrastées, état `aria-expanded`, focus visible, menu mobile fermable avec Escape, gestion de focus, messages de formulaire annoncés, clavier complet, `prefers-reduced-motion`.
- Performance : images responsives et optimisées, priorité image hero uniquement, fonts correctement chargées, pas de bibliothèque lourde ni animation continue. Objectifs de qualité Lighthouse >=90 en conditions comparables ; LCP <=2,5 s, CLS <=0,1, INP <=200 ms en mesures terrain ; ne pas déclarer ces objectifs atteints sans mesure.
- Sécurité : HTTPS au déploiement, secrets non exposés, contrôle des saisies côté serveur, pas de `dangerouslySetInnerHTML` pour les données utilisateur, en-têtes adaptés sans casser l'application. Pas de Google Analytics, Meta Pixel, cartes intégrées ou scripts tiers traçants par défaut. Mentionner la nécessité de revue RGPD/§5 DDG/§25 TDDDG avant publication.

## 10. Parcours à vérifier

- Tout visiteur trouve les prestations et le contact depuis accueil en au plus 2 clics.
- Les six services ont leurs propres URL et affichent des contenus allemands cohérents.
- Le menu se comporte correctement sur mobile/tablette et au clavier.
- Les boutons affichés conduisent à une vraie page / action ; rien de factice.
- Les projets illustratifs ne sont jamais présentés comme réalisations propres.
- Le formulaire valide correctement, montre des erreurs accessibles et reste honnêtement indisponible si non configuré.
- Changer l'adresse ou le téléphone dans `site.ts` (lorsqu'il sera fourni) met à jour tous les emplacements pertinents.
- Une URL inconnue affiche la 404 allemande.
- Aucune page n'utilise un faux domaine, un faux numéro ou des chiffres publicitaires non vérifiés.

## 11. Plan d'implémentation : exécute les lots dans cet ordre

**Lot A - Préparer.** Lire les deux documents et le logo ; inspecter l'existant ; créer/adapter projet Next.js avec npm ; poser Tailwind v4, alias `@/*`, `.nvmrc`, lint/format/typecheck. Choisir versions stables compatibles et conserver `package-lock.json`.

**Lot B - Identité.** Copier le logo validé ; tokens visuels ; typographie ; composants `Container`, `Button`, `SiteHeader`, `MobileNav`, `SiteFooter`, `Breadcrumbs`. Vérifier que le logo complet est lisible et non coupé.

**Lot C - Données.** Écrire types, `site.ts`, `services.ts`, `navigation.ts`, `projects.ts` avec valeurs exactes et champs manquants nuls.

**Lot D - Pages.** Créer accueil, services, six fiches métier, à propos, galerie illustrative, contact, Impressum/Datenschutz provisoires, 404. Texte public en allemand, composants réutilisables, design professionnel. Ne livrer aucune simple page vide ou Lorem Ipsum.

**Lot E - Interactivité.** Menu responsive accessible ; formulaire et route POST ; validations, mode démo, transport e-mail abstrait et protections nécessaires à une future activation.

**Lot F - SEO et qualité.** Métadonnées, sitemap, robots, `noindex` preview, accessibilité, images, tests, docs. Créer des scripts :
```
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "eslint .",
"typecheck": "tsc --noEmit",
"test": "vitest run",
"test:e2e": "playwright test",
"format:check": "prettier --check ."
```
Ajuster la configuration ESLint/Prettier/Vitest/Playwright afin que ces commandes fonctionnent réellement.

**Lot G - Recette.** Exécuter `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run format:check` et `npm run test:e2e` si le navigateur de tests est disponible. Corriger toutes les erreurs constatées. Test visuel en 360, 390, 768, 1024, 1440 et 1920 px si un navigateur est disponible ; aucun débordement horizontal ou élément coupé. Vérifier au minimum navigation, six fiches, lien du CTA, menu mobile, validations du formulaire, 503 de la démo, 404 et robots noindex. Si un test n'est pas exécutable dans l'environnement, l'indiquer sans prétendre qu'il a été passé.

## 12. Livrables et réponse finale attendus de Codex

Produis dans le workspace un site fonctionnel avec toutes les pages, ses composants, son logo original, un `package-lock.json`, `.env.example`, tests, un `README.md` clair en français, et un fichier `VALIDATION_AVANT_PUBLICATION.md` listant précisément les informations à obtenir du boss (e-mail, téléphone, domaine, horaires, statut juridique, consentements/mentions légales, photo de référence, droits des médias, fournisseur d'envoi). Le README explique sous Windows 11 comment installer Node 24, utiliser `npm ci`, démarrer `npm run dev`, vérifier lint/tests/build, configurer l'e-mail, puis préparer Vercel après autorisation. N'ajoute aucune clé secrète.

Au terme du travail, **réponds-moi en français** en indiquant :
1. ce qui a effectivement été créé, avec les routes ;
2. les choix techniques réalisés et les éventuels écarts motivés ;
3. les commandes exécutées et leurs résultats réels ;
4. comment ouvrir le site localement (`http://localhost:3000`) ;
5. quels champs restent provisoires et bloquent la publication ;
6. les 3-5 prochaines actions utiles, par priorité.

Je veux une implémentation concrète de bout en bout. Avance sans me demander de microdécisions : privilégie les choix professionnels, sobres et sûrs cohérents avec les documents approuvés. **Ne déploie pas, n'achète pas de domaine, n'envoie pas d'e-mails réels et ne modifie aucun compte externe sans mon autorisation.** Si une ressource externe manque, livre quand même un prototype complet avec repli honnête et documente la limite. Ne prétends jamais qu'une étape technique a été réalisée si elle ne l'a pas été.

**Commence maintenant par lire les documents et inspecter le workspace, puis implémente le projet lot par lot jusqu'aux tests.**
