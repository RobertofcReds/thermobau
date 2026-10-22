# Thermobau V&V

Site vitrine allemand en Next.js, React et TypeScript. La refonte V2 améliore le projet existant : accueil photographique, six fiches métier détaillées, présentation de l'entreprise, galerie « Einblicke », navigation et formulaire. Les huit photographies Pexels sont hébergées localement, documentées et signalées comme « Symbolbilder ». Le logo approuvé et les six métiers sont conservés. L'envoi du formulaire et l'indexation restent désactivés ; aucun déploiement ni e-mail réel n'a été effectué.

## Démarrer sous Windows 11

1. Installer **Node.js 24 LTS** avec l'installateur Windows officiel depuis [nodejs.org](https://nodejs.org/en/download). Choisir la branche 24 et l'architecture adaptée au PC, puis rouvrir PowerShell. Le projet impose `>=24 <25` et fournit `.nvmrc` avec `24`.
2. Ouvrir PowerShell dans le dossier du projet, puis exécuter :

```powershell
Set-Location D:\thermobau-vv
node --version
npm.cmd --version
npm.cmd ci
npm.cmd run dev
```

Ouvrir **http://localhost:3000**. `Ctrl+C` arrête le serveur. Si le port 3000 est occupé, arrêter l'autre serveur ou utiliser le port annoncé par Next.js. Les tests navigateur utilisent séparément le port 3100.

`npm ci` et `npm run dev` fonctionnent aussi quand la politique PowerShell autorise les scripts. Si Windows bloque `npm.ps1`, utiliser **`npm.cmd`** comme ci-dessus : aucune modification de la politique d'exécution n'est nécessaire. Utiliser exclusivement npm et conserver `package-lock.json`.

La démonstration locale fonctionne sans fichier `.env.local`. Pour préparer une configuration locale sans écraser un fichier existant :

```powershell
if (-not (Test-Path -LiteralPath .env.local)) {
  Copy-Item -LiteralPath .env.example -Destination .env.local
}
```

Conserver les valeurs par défaut tant que les validations métier et techniques ne sont pas terminées. `.env.local` est ignoré par Git. Redémarrer le serveur après une modification d'environnement et reconstruire la version destinée à la production.

## Pages et organisation

Les **13 pages publiques** sont :

| Route                         | Page                                   |
| ----------------------------- | -------------------------------------- |
| `/`                           | Startseite                             |
| `/leistungen`                 | Leistungen                             |
| `/leistungen/fassaden`        | Fassadenarbeiten                       |
| `/leistungen/trockenbau`      | Trockenbau                             |
| `/leistungen/putzarbeiten`    | Putzarbeiten                           |
| `/leistungen/malerarbeiten`   | Malerarbeiten                          |
| `/leistungen/fliesenarbeiten` | Fliesenarbeiten                        |
| `/leistungen/renovierungen`   | Renovierungen aller Art                |
| `/ueber-uns`                  | Über uns                               |
| `/referenzen`                 | Einblicke in unsere Tätigkeitsbereiche |
| `/kontakt`                    | Kontakt                                |
| `/impressum`                  | Impressum provisoire                   |
| `/datenschutz`                | Datenschutzerklärung provisoire        |

Une URL inconnue produit une page 404 allemande. `/api/contact` accepte les requêtes POST JSON ; `sitemap.xml`, `robots.txt` et l'icône utilisent les conventions Next.js.

Les documents et images du kit `Thermobau_VV_Kit_Pret_pour_Codex/` sont préservés. Le prompt a été copié à la racine et les sources fournies dans `docs/` et `assets/`. Le projet Next.js se trouve uniquement à la racine du workspace.

| Emplacement                                     | Rôle et modifications courantes                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/config/site.ts`                            | Nom, personne de contact, adresse, contacts, domaine et données juridiques ; valeurs inconnues à `null`  |
| `src/data/services.ts`                          | Six services : textes allemands, slugs, travaux typiques, préparation, étapes, FAQ, photographies et SEO |
| `src/data/photos.ts`                            | Huit photographies locales, textes alternatifs allemands, auteurs et pages sources                       |
| `src/data/projects.ts`                          | Galerie, crédits et autorisations ; seuls les éléments publiés avec droits confirmés sont affichables    |
| `src/data/navigation.ts`                        | Navigation allemande                                                                                     |
| `src/types/content.ts`                          | Contrats de données                                                                                      |
| `src/app/(website)/`                            | Pages ; fiches métier générées depuis les données                                                        |
| `src/components/`                               | Composants partagés, navigation et formulaire                                                            |
| `src/lib/`                                      | Validation, configuration d'envoi, transport, limitation de débit et SEO                                 |
| `public/brand/`, `public/images/`, `src/fonts/` | Logo approuvé, photographies WebP locales, SVG historiques et police locale                              |
| `tests/unit/`, `tests/e2e/`                     | Tests unitaires et parcours navigateur                                                                   |

Le logo public est **strictement identique au PNG approuvé**. Le favicon `src/app/icon.png` en 128 × 128 reprend le logo complet après réduction de sa marge blanche, sans redessin. Les photographies de l'accueil, des services et de la galerie proviennent de Pexels ; elles ne représentent aucun chantier ni salarié de Thermobau V&V. La photographie du véhicule reste interne. Manrope est servi localement avec sa licence OFL. Voir [le registre des médias](docs/MEDIAS.md) et [les sources des huit photos](docs/IMAGE_SOURCES.md).

Les données de galerie distinguent `stock-photo`, `illustration` et `real-project`. Elles prévoient un titre, un domaine, une description, des photos autorisées, une date et un lieu facultatifs. Date, lieu et titre de chantier restent vides pour les photographies stock. Le rendu filtre les médias non publiés ou sans droits confirmés.

## Stack retenue

Les versions directes sont fixées dans `package.json`, et les dépendances transitives dans `package-lock.json` :

| Outil                           | Version du projet |
| ------------------------------- | ----------------- |
| Next.js, App Router             | 16.4.1            |
| React / React DOM               | 19.3.1            |
| TypeScript strict               | 6.0.3             |
| Tailwind CSS / PostCSS Tailwind | 4.3.3             |
| Zod                             | 4.6.7             |
| Lucide React                    | 1.57.0            |
| Manrope via Fontsource Variable | 5.3.0             |
| ESLint                          | 9.39.5            |
| Prettier                        | 3.9.10            |
| Vitest                          | 5.0.4             |
| Playwright Test                 | 1.64.1            |
| axe pour Playwright             | 4.13.0            |

Les pages utilisent principalement des Server Components. Le menu mobile et le formulaire sont interactifs. Les six fiches utilisent `generateStaticParams`, `dynamicParams = false` et les paramètres asynchrones de la version installée. Tailwind v4 est intégré avec `@tailwindcss/postcss` et `@import "tailwindcss"`. Le script de lint appelle ESLint directement.

Références : [installation Next.js](https://nextjs.org/docs/app/getting-started/installation), [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route), [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), [Tailwind CSS avec Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Vérifications et recette

Commandes disponibles, à exécuter depuis la racine :

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
npm.cmd run format:check
npm.cmd run test:e2e
```

`npm.cmd run format` applique le formatage aux fichiers du projet. Les sources fournies sont exclues du formatage pour les préserver.

Pour examiner le build localement :

```powershell
npm.cmd run build
npm.cmd run start
```

Playwright utilise le **Google Chrome installé** (`channel: "chrome"`) et un serveur de production dédié sur `http://127.0.0.1:3100`. Il lance directement Next.js avec `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100`, sans réutiliser un serveur existant ; un build préalable est donc nécessaire. Le démarrage de développement reste sur `http://localhost:3000`. Si Chrome manque, installer un navigateur adapté ou modifier explicitement la configuration Playwright pour un navigateur disponible, puis consigner ce changement. Les rapports sont produits dans `playwright-report/` et les traces d'échec dans `test-results/`.

Ces commandes constituent la procédure de vérification, pas une déclaration de réussite. Les résultats réellement obtenus, les captures et les limites de l'environnement sont consignés dans [docs/RECETTE.md](docs/RECETTE.md). Les cibles Lighthouse, Core Web Vitals et WCAG ne constituent pas des résultats mesurés ou une conformité auditée.

Aperçus locaux : [accueil ordinateur](docs/preview/accueil-desktop.png), [accueil mobile](docs/preview/accueil-mobile.png), [contact ordinateur](docs/preview/contact-desktop.png).

## Formulaire et future activation de l'e-mail

Le mode par défaut est `CONTACT_FORM_ENABLED=false`. Le bouton allemand **« Eingaben prüfen »** vérifie la saisie dans le navigateur, sans requête de soumission et sans envoi. L'API demeure protégée : une requête valide reçoit `503` lorsque la configuration d'envoi manque. Une requête invalide peut recevoir `400`, `413` ou `429` avant ce contrôle.

L'adaptateur proposé utilise **Resend** pour l'e-mail et **Upstash Redis REST** pour la limitation distribuée. Ces choix techniques restent soumis à l'accord du responsable, aux contrats, à la localisation des traitements et à la revue de confidentialité. Leur présence dans le code ne signifie pas qu'un compte est connecté ou qu'un test réel a été effectué.

| Variable                   | Utilisation                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `CONTACT_FORM_ENABLED`     | Doit rester `false` jusqu'à autorisation et configuration complète                                               |
| `CONTACT_FROM_EMAIL`       | Adresse expéditrice officielle sur un domaine vérifié chez Resend                                                |
| `CONTACT_RECIPIENT_EMAIL`  | Destinataire officiel confirmé                                                                                   |
| `MAIL_PROVIDER_API_KEY`    | Clé API Resend, secrète et exclusivement serveur                                                                 |
| `UPSTASH_REDIS_REST_URL`   | Origine HTTPS de la base Upstash (`*.upstash.io`), sans chemin applicatif, paramètres ni identifiants dans l'URL |
| `UPSTASH_REDIS_REST_TOKEN` | Jeton privé Upstash                                                                                              |
| `CONTACT_RATE_LIMIT_SALT`  | Secret aléatoire d'au moins 32 caractères pour le HMAC des adresses IP                                           |

Ne jamais préfixer les secrets par `NEXT_PUBLIC_`, les inclure dans le dépôt ou les écrire dans les journaux. `VERCEL` est fourni par la plateforme et ne doit pas être simulé en local.

Le serveur valide le JSON et les champs avec Zod, limite le corps à 16 Kio, refuse les contenus HTML et vérifie un honeypot. Upstash applique une transaction atomique avec une fenêtre de 15 minutes et une limite de 5 tentatives valides. La clé contient un HMAC SHA-256 de l'identité réseau et expire après 900 secondes ; aucun message n'est enregistré dans Redis. Sur Vercel, l'adresse provient de l'en-tête de la plateforme ; hors Vercel, les requêtes partagent un même compteur pour ne pas faire confiance à un en-tête fourni par le visiteur.

Une configuration incomplète ou une indisponibilité d'Upstash bloque l'envoi avec `503`. Une erreur ou une réponse incertaine de Resend produit également `503`, avec un message indiquant que la transmission n'a pas pu être confirmée : un timeout peut survenir après acceptation par le fournisseur. Resend reçoit un corps en texte brut et un sujet fixe. Les coordonnées saisies ne sont pas injectées dans les en-têtes d'e-mail. Le succès `200` exige l'acceptation du fournisseur et un identifiant non vide ; il ne garantit pas la réception dans la boîte finale. Les tests utilisent des réponses simulées, sans e-mails réels.

Après autorisation explicite : vérifier le domaine expéditeur et les adresses, créer les secrets dans l'environnement approprié, valider les contrats et la rétention, puis activer l'envoi sur un environnement contrôlé. Tester une réception réelle autorisée, le refus après dépassement de limite et les indisponibilités fournisseur avant toute ouverture au public.

## Publication et Vercel

Le prototype est en **`noindex, nofollow`**. `siteConfig.domain` reste `null`, `NEXT_PUBLIC_SITE_URL` vide et `SITE_PUBLICATION_READY=false`.

Le déverrouillage exige simultanément un environnement Node de production, `SITE_PUBLICATION_READY=true`, un domaine officiel renseigné dans `site.ts`, une origine HTTPS correspondante dans `NEXT_PUBLIC_SITE_URL` et un environnement Vercel de production lorsqu'il est déclaré. Les previews Vercel restent non indexables. Les URLs canoniques ne sont pas fabriquées en l'absence d'un domaine validé.

`noindex` ne restreint pas l'accès au site. Toute future prévisualisation contenant des informations non publiques doit également être protégée au niveau de l'hébergement. Aucun déploiement n'est effectué par ce projet automatiquement.

Après validation du responsable et autorisation explicite de déployer : préparer un dépôt privé, un projet Vercel avec Node 24, une preview protégée et ses variables séparées. Conserver le formulaire et l'indexation désactivés durant la recette. La production exige la clôture de [VALIDATION_AVANT_PUBLICATION.md](VALIDATION_AVANT_PUBLICATION.md), un nouveau build, les vérifications de navigation et d'envoi autorisées, puis le contrôle des métadonnées, de `robots.txt` et du sitemap sur le domaine définitif.
