# Thermobau V&V

Site vitrine multilingue DE/EN/FR en Next.js, React et TypeScript. La refonte conserve 42 pages pré-générées, 33 photographies Pexels locales sans duplication d’emplacement et un formulaire traduit. La V5 ajoute un header compact, des zooms alternés dans le hero, des entrées animées sur les autres pages, une palette plus colorée et un footer organisé selon la référence KSPH. Le logo approuvé et les six métiers sont conservés. Le formulaire reste en démonstration et l’indexation est désactivée. Aucun déploiement, push GitHub ni e-mail réel n’a été effectué. Voir le [rapport V5](docs/REFONTE_V5.md), l’[historique V4](docs/REFONTE_V4.md) et les [routes conservées](docs/REFONTE_V3.md).

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

Les **42 pages publiques** correspondent à 14 familles en allemand, anglais et français. L’allemand est sans préfixe ; l’anglais et le français utilisent `/en` et `/fr`. La [table complète des routes](docs/REFONTE_V3.md#routes-publiques) est conservée dans le rapport V3. Une page 404 traduite est renvoyée pour une URL inconnue.

Les documents et images fournis sont préservés. L’ancien dossier de routes `src/app/(website)` et le layout racine ont été remplacés par une structure commune sous `src/app/[locale]` ; les URL allemandes historiques sont conservées.

| Emplacement                                                   | Rôle                                                                    |
| ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `src/config/site.ts`                                          | Coordonnées et informations confirmées ; inconnues à null               |
| `src/app/[locale]/layout.tsx`                                 | Layout, langue HTML, navigation et footer                               |
| `src/app/[locale]/[[...path]]/page.tsx`                       | 42 pages, paramètres statiques, métadonnées et 404                      |
| `src/i18n/routing.ts`, `src/proxy.ts`                         | Routage next-intl et équivalences de pages                              |
| `src/i18n/content.ts`, `services.ts`, `legal.ts`, `form.ts`   | Contenus DE/EN/FR et erreurs de formulaire                              |
| `src/components/sections/EditorialPages.tsx`, `LegalPage.tsx` | Compositions partagées                                                  |
| `src/data/photo-plan.ts`                                      | 33 emplacements exclusifs, sources et alt traduits                      |
| `src/data/service-identifiers.ts`                             | Catalogue léger pour formulaire et validation côté client               |
| `src/components/privacy/`, `src/lib/privacy-consent.ts`       | Préférences versionnées, retrait et expiration                          |
| `src/config/maps.ts`, `src/components/maps/`                  | Carte conditionnelle ; repli adresse/lien en attendant un point vérifié |
| `src/app/editorial.css`, `src/app/globals.css`                | Styles et responsive                                                    |
| `src/lib/`, `src/app/api/contact/`                            | Validation, envoi désactivé, limitation de débit et SEO                 |
| `tests/unit/`, `tests/e2e/`                                   | Tests unitaires et parcours navigateur                                  |

Le logo est inchangé, vérifié par test SHA-256. Les photographies ne représentent pas des chantiers ou salariés confirmés de Thermobau V&V. Le véhicule reste interne sans autorisation de publication. Sources et licence : [registre des 33 photos](docs/IMAGE_SOURCES.md). Les anciennes données `photos.ts` et `projects.ts` sont conservées pour compatibilité ; le rendu V4 utilise exclusivement `photo-plan.ts`.

## Stack retenue

Les versions directes sont fixées dans `package.json`, et les dépendances transitives dans `package-lock.json` :

| Outil                           | Version du projet |
| ------------------------------- | ----------------- |
| Next.js, App Router             | 16.4.1            |
| next-intl                       | 4.14.9            |
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

Les pages utilisent principalement des Server Components. Les 42 pages utilisent `generateStaticParams` et les paramètres asynchrones de Next.js. Le hero, le header, le retour en haut, la navigation mobile, le sélecteur de langue, le formulaire et les préférences sont interactifs. Les autres contenus ne nécessitent pas de JavaScript client. Tailwind v4 est intégré avec `@tailwindcss/postcss` et `@import "tailwindcss"`. Le script de lint appelle ESLint directement.

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

Ces commandes constituent la procédure de vérification, pas une déclaration de réussite. Les résultats réellement obtenus, les captures et les limites de l'environnement sont consignés dans [docs/REFONTE_V5.md](docs/REFONTE_V5.md) (les recettes précédentes restent disponibles comme historique). Les cibles Lighthouse, Core Web Vitals et WCAG ne constituent pas des résultats mesurés ou une conformité auditée.

Aperçus V5 : [accueil ordinateur](docs/preview/v5-blue/startseite-1440.png), [accueil mobile](docs/preview/v5-blue/startseite-390.png), [page métier](docs/preview/v5-blue/leistungen-trockenbau-1440.png), [contact ordinateur](docs/preview/v5-blue/kontakt-1440.png).

## Coordonnées et assistant de discussion

Les coordonnées fournies sont centralisées dans `src/config/site.ts` : téléphone et WhatsApp **+49 176 41504088**, e-mail **thermo_bau@web.de**. Le footer, les pages de contact et les réponses du chat réutilisent cette configuration. Les liens ouvrent le téléphone, le logiciel de messagerie ou WhatsApp ; aucun message n'est envoyé automatiquement.

Le bouton **Chat** est disponible sur toutes les pages. Il ouvre un assistant automatique local, sans abonnement ni clé API. Ses réponses préparées couvrent les six métiers, les coordonnées, la préparation d'une demande et le fonctionnement du site. Il détecte l'allemand, le français et l'anglais à partir des questions ; une phrase ambiguë conserve la langue de la conversation ou de la page. Il peut aussi changer de langue sur demande explicite.

Ce premier assistant fonctionne par reconnaissance de sujets : ce n'est ni une IA générative ni un échange avec un employé. Il ne confirme pas de prix, de disponibilité, de délai ou de zone d'intervention non renseignés. Lorsqu'il ne sait pas répondre, il propose les coordonnées de l'entreprise.

Les messages restent uniquement en mémoire dans le navigateur. Fermer puis rouvrir le chat conserve la conversation ; le bouton d'effacement ou le rechargement de la page la supprime. Les messages ne sont pas enregistrés dans le stockage du navigateur ni transmis à un serveur. Le panneau et ses réponses sont chargés à la première ouverture pour limiter le code chargé au démarrage.

Points d'entrée :

- `src/lib/chat-assistant.ts` : `answerQuestion`, détection de langue, réponses et liens.
- `src/components/chat/ChatWidget.tsx` et `ChatPanel.tsx` : ouverture, conversation, clavier et effacement.
- `src/app/chat.css` : présentation responsive dans la palette bleue.
- `tests/unit/chat-assistant.test.ts` et `tests/e2e/chat.spec.ts` : langues, sujets, liens, confidentialité locale, mobile et accessibilité.

Pour le futur branchement IA, remplacer l'appel local par un adaptateur vers une route serveur en conservant le format `ChatReply` (`locale`, `text`, `links`, `topic`). La clé du fournisseur devra rester exclusivement côté serveur, sans préfixe `NEXT_PUBLIC_`. Prévoir la validation des entrées et des liens, les limites de requêtes, les erreurs réseau, les informations vérifiées de l'entreprise et l'actualisation des textes de confidentialité au moment du choix du fournisseur. Aucun fournisseur IA n'est connecté actuellement.

Résultats de la recette et captures : [coordonnées et chat local](docs/CHAT_ET_CONTACTS.md).

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
