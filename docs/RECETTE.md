# Recette V2 — Thermobau V&V

> Archive V2 : consulter [la recette V3](REFONTE_V3.md) pour l’état actuel, les 42 routes et les derniers résultats.

**Livraison locale vérifiée le 22 octobre 2026.** La refonte a été réalisée dans le projet Next.js existant, sans recréer l'application, modifier les dépendances ou déployer le site. Le formulaire reste en démonstration et l'indexation reste désactivée.

## Modifications livrées

- Accueil en huit sections : hero photographique, six prestations, présentation avec photo, approche de contact, quatre étapes, galerie, localisation et CTA.
- Identité bleu/anthracite/blanc conservée ; nuances neutres, hiérarchie typographique, espacements, images et cartes retravaillés. Manrope reste local.
- Header simplifié, logo approuvé inchangé, navigation active accessible sur ordinateur, menu mobile à dialogue et footer complet.
- Page Leistungen et six fiches : photographie principale, travaux typiques, texte détaillé, photo complémentaire, préparation de la demande, quatre étapes spécifiques, trois FAQ par métier et CTA présélectionnant le service.
- Page Über uns enrichie avec photographies, présentation, domaines d'activité, approche du projet et adresse.
- Route /referenzen conservée avec libellé « Einblicke », galerie de six photos et mentions « Symbolbild ». Données préparées pour de futurs projets autorisés avec description, photos, date et lieu facultatifs.
- Contact en deux colonnes, coordonnées confirmées, aide à la préparation, labels, erreurs allemandes, focus et états de chargement. En démo, aucun POST n'est produit par la vérification locale.
- Pages Impressum et Datenschutz revues et explicitement provisoires ; champs légaux et de confidentialité modifiables, valeurs inconnues laissées à null.
- Titres, descriptions, H1, Open Graph, sitemap, robots et logique de canonical conservés ou adaptés aux nouveaux contenus. Aucun domaine, avis ni classement fictif ajouté.
- Favicon 128 × 128 dérivé exclusivement du logo approuvé, sans redessin.

## Fichiers importants

| Fichier ou dossier                                                                | Rôle                                                                           |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| src/app/globals.css                                                               | Design, responsive, contrastes et mouvements réduits                           |
| src/app/(website)/page.tsx                                                        | Accueil V2                                                                     |
| src/components/sections/                                                          | Hero, présentation, approche, processus, galerie, localisation et CTA partagés |
| src/components/ui/Photo.tsx                                                       | Photographie next/image et légende Symbolbild                                  |
| src/components/layout/                                                            | Header, navigation active, logo et footer                                      |
| src/app/(website)/leistungen/                                                     | Liste et six fiches générées depuis les données                                |
| src/data/services.ts                                                              | Textes allemands, travaux, préparation, étapes, FAQ et SEO                     |
| src/app/(website)/ueber-uns/page.tsx                                              | Présentation de l'entreprise                                                   |
| src/app/(website)/referenzen/page.tsx                                             | Galerie photographique                                                         |
| src/data/photos.ts, src/data/projects.ts                                          | Photos, sources, crédits et données de galerie                                 |
| src/app/(website)/kontakt/page.tsx, src/components/forms/ContactForm.tsx          | Contact et formulaire démo                                                     |
| src/app/(website)/impressum/page.tsx, src/app/(website)/datenschutz/page.tsx      | Mentions provisoires                                                           |
| src/config/site.ts, src/types/content.ts                                          | Informations confirmées et champs à compléter                                  |
| public/images/photos/, src/app/icon.png                                           | Huit photos WebP locales et favicon                                            |
| tests/unit/content.test.ts, tests/e2e/site.spec.ts                                | Tests adaptés aux photos stock, contrôle de chargement des images              |
| README.md, docs/MEDIAS.md, docs/IMAGE_SOURCES.md, VALIDATION_AVANT_PUBLICATION.md | Lancement, provenance et points restant à confirmer                            |

## Photographies et logo

Huit photographies réelles issues de **Pexels**, téléchargées le 21 octobre 2026, optimisées localement en WebP et servies par next/image. Poids total des fichiers sources WebP : **1 073 172 octets**, soit environ 1,02 Mio.

Auteurs : Expect Best, Christian Reinke, Jimmy Nilsson Masth, Ksenia Chernaya, Tima Miroshnichenko, Sergei Starostin, Pietro Greco et Lahzeha🌿. Les pages sources, la licence Pexels, les dimensions et les transformations sont conservées dans [IMAGE_SOURCES.md](IMAGE_SOURCES.md).

Ces images ne sont jamais attribuées à des chantiers ou salariés de Thermobau V&V. Le hero représente un bâtiment britannique sans mention de lieu allemand ; deux autres clichés montrent des bâtiments en Allemagne. Le logo public est identique au fichier fourni, ce que le test SHA-256 confirme. La provenance du favicon figure dans [MEDIAS.md](MEDIAS.md).

## Vérifications réellement exécutées

Environnement : Windows, PowerShell, Node.js 24.21.0, npm 11.19.0, Next.js 16.4.1, Chrome installé.

| Commande                 | Résultat final                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| npm.cmd run lint         | Réussi, code 0                                                                            |
| npx.cmd tsc --noEmit     | Réussi, code 0                                                                            |
| npm.cmd test             | **86 tests réussis dans 6 fichiers**                                                      |
| npm.cmd run build        | Réussi ; 13 pages prévues, six fiches pré-générées, contact et confidentialité dynamiques |
| npm.cmd run test:e2e     | **21 tests réussis en 31,8 s**, code 0, après le dernier build                            |
| npm.cmd run format:check | Réussi, code 0                                                                            |
| node .qa/capture.mjs     | 15 captures V2 ; aucune requête externe ni cookie observé dans ce parcours local          |

Couverture navigateur :

- Les 13 routes répondent correctement, avec un H1, des titres et descriptions uniques, en allemand et non indexables.
- Liens internes vérifiés ; toutes les images des pages chargent effectivement.
- Contrôles de débordement sur les 13 pages à **320, 360, 390, 768, 1024, 1440 et 1920 px** : aucun débordement détecté.
- Navigation, menu mobile au clavier, Escape et retour du focus ; CTA avec présélection du métier.
- Formulaire démo : erreurs de saisie, validation locale, absence de requête de soumission ; API refusant l'envoi sans configuration avec 503.
- 404 allemande, robots et sitemap fermés avant publication.
- Analyse axe sur cinq pages : aucune violation grave ou critique selon les règles WCAG 2 A/AA, 2.1 AA et 2.2 AA utilisées.

Les tests existants ont été adaptés au passage des SVG aux photos stock. Une erreur de typage dans le contrôle des images a été corrigée avant le build final. La revue visuelle a entraîné deux corrections : résolution servie au hero sur tablette et hauteur des cartes connexes avec images portrait.

Lors de la première exécution, les 21 scénarios étaient réussis mais Windows empêchait la fermeture du serveur dans l'environnement restreint. Seul le serveur de test identifié a été arrêté ; la dernière suite a ensuite été exécutée avec les permissions adaptées et s'est terminée normalement, serveur nettoyé.

## Captures à consulter

Toutes les images ont été décodées avant les captures de livraison, y compris les images normalement chargées à la demande.

- [Accueil ordinateur](preview/accueil-desktop.png)
- [Accueil mobile](preview/accueil-mobile.png)
- [Contact ordinateur](preview/contact-desktop.png)
- [Entreprise](preview/entreprise-desktop.png)
- [Galerie](preview/galerie-desktop.png)
- [Trockenbau](preview/trockenbau-desktop.png)
- [Putzarbeiten](preview/putzarbeiten-desktop.png)

Les captures des six largeurs demandées et du menu mobile sont également dans .qa/screens/. Le navigateur intégré à l'interface de chat n'était pas disponible ; les vérifications et captures ont été réalisées avec le Chrome local de Playwright.

## Démarrer le site

Depuis D:\thermobau-vv :

```powershell
npm.cmd run dev
```

Ouvrir http://localhost:3000 (ou le port annoncé par Next.js si 3000 est occupé). Ctrl+C arrête le serveur. Les dépendances sont déjà installées ; npm.cmd ci permet une réinstallation depuis le verrou npm si nécessaire.

Pour tester le build de production :

```powershell
npm.cmd run build
npm.cmd run start
```

Aucun secret ni fichier .env.local n'est nécessaire pour la démonstration.

## Informations et médias encore à confirmer

- Adresse e-mail officielle, moyen de communication directe et destinataire des demandes.
- Identité juridique du fournisseur, rôle exact du responsable, forme juridique ; registre, chambre, identifiants et mentions professionnelles seulement s'ils s'appliquent.
- Responsable du traitement et contact, hébergeur, prestataires de messagerie et anti-abus, destinataires, bases légales, conservation, transferts et contrats.
- Domaine officiel, périmètre réel des travaux, zones d'intervention au-delà de Ludwigshafen et relecture finale des textes.
- Photos autorisées de vrais chantiers ; autorisation spécifique avant publication de l'image du véhicule interne.
- Validation finale de l'Impressum, de la confidentialité et des obligations d'accessibilité applicables.

La liste complète et les sources juridiques officielles figurent dans [VALIDATION_AVANT_PUBLICATION.md](../VALIDATION_AVANT_PUBLICATION.md).

## Limites de cette recette

Aucun déploiement ni envoi réel. Les services e-mail et Redis restent simulés dans les tests. Aucun score Lighthouse ou Core Web Vitals n'a été mesuré ; les tests axe ne constituent pas un audit complet WCAG. Safari, Firefox et Edge n'ont pas été testés.

Les dépendances n'ont pas été modifiées. L'audit npm n'a pas été rejoué pour la V2 : l'ancien contrôle du 16 octobre signalait cinq vulnérabilités élevées dans la chaîne de développement ESLint/fast-glob/micromatch/braces et aucune en production à cette date. Ce constat historique n'est pas présenté comme un audit actuel.
