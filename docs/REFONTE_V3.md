# Refonte V3 — livraison locale Thermobau V&V

État du **23 octobre 2026**. Travail effectué dans le projet existant, sans déploiement, commit ou push GitHub. Le logo, les coordonnées communiquées et les six domaines d’activité sont conservés.

## Améliorations visuelles

- Accueil centré sur le geste artisanal, avec hero en deux colonnes, six cartes photographiques, section sombre sur les types de travaux, informations vérifiables, étapes, FAQ, galerie de détails et localisation.
- Pages prestations et fiches métiers : photos distinctes, travaux typiques, préparation utile, étapes spécifiques et FAQ propres à chaque domaine. Les étapes EN/FR ne sont plus des listes génériques.
- Présentation : texte concret sur l’entreprise, son implantation et son contact, sans équipe, diplômes ni ancienneté inventés.
- Galerie : six sujets distincts, navigation par métier, rythme de cadrages varié et avertissement clair indiquant que ce ne sont pas des réalisations documentées.
- Contact : coordonnées et aide à la demande à gauche, formulaire traduit à droite. Démonstration explicitement indiquée ; aucune soumission réseau lors de la validation locale.
- Pages légales : hiérarchie typographique, sommaire par ancres et avertissement de validation préalable.
- Fonds neutres plus chaleureux, bleu et anthracite conservés, ombres limitées, espacements responsives, police Manrope locale et mouvements réduits.

## Pages et composants

Les anciennes routes du dossier `src/app/(website)` ont été remplacées par :

- `src/app/[locale]/layout.tsx` : racine multilingue, langue HTML, header/footer et préférences.
- `src/app/[locale]/[[...path]]/page.tsx` : 14 familles de pages, trois langues, métadonnées et paramètres statiques.
- `src/components/sections/EditorialPages.tsx` et `LegalPage.tsx` : compositions communes aux trois langues.
- `src/i18n/` : routage, navigation, contenus, étapes, textes légaux et formulaires.
- `src/components/layout/`, `forms/`, `privacy/`, `maps/` : interactions localisées.
- `src/data/photo-plan.ts` : plan photographique réellement rendu.
- `src/app/editorial.css` : système visuel partagé.

Les anciennes URL allemandes restent accessibles. Les fichiers suivis supprimés sont récupérables dans l’historique Git. Les données historiques photos/projets restent présentes mais ne pilotent plus la galerie V3. L’ancien formulaire EN/FR séparé a été retiré pour n’avoir qu’une validation commune.

## Photographies

**31 photographies actives différentes**, environ **3,06 Mio** de fichiers WebP au total. Les variantes de langue d’une même page partagent leur photographie ; les emplacements de pages différentes ne la réutilisent pas.

Les crédits, sources, sujets, affectations et conditions sont détaillés dans [IMAGE_SOURCES.md](IMAGE_SOURCES.md). Les photos proviennent de [Pexels et de sa licence](https://www.pexels.com/license/) et sont hébergées localement. À la demande du client, les étiquettes et crédits individuels ont été retirés de toutes les pages le 26 octobre 2026 ; la licence n’impose pas cette attribution. Une information générale reste présente : ces photos ne sont ni des références commerciales ni des portraits de salariés.

Le hero immobilier a été retiré du rendu. Une photo dont le titre source évoquait le drywall mais qui montrait du carrelage a également été écartée après inspection visuelle. La photographie du véhicule demeure interne faute d’autorisation.

## Routes publiques

14 lignes × 3 langues = **42 pages** :

| Page            | DE                            | EN                         | FR                                  |
| --------------- | ----------------------------- | -------------------------- | ----------------------------------- |
| Accueil         | `/`                           | `/en`                      | `/fr`                               |
| Prestations     | `/leistungen`                 | `/en/services`             | `/fr/prestations`                   |
| Façades         | `/leistungen/fassaden`        | `/en/services/facade-work` | `/fr/prestations/travaux-de-facade` |
| Cloisons        | `/leistungen/trockenbau`      | `/en/services/drywall`     | `/fr/prestations/cloisons-seches`   |
| Enduits         | `/leistungen/putzarbeiten`    | `/en/services/plastering`  | `/fr/prestations/enduits`           |
| Peinture        | `/leistungen/malerarbeiten`   | `/en/services/painting`    | `/fr/prestations/peinture`          |
| Carrelage       | `/leistungen/fliesenarbeiten` | `/en/services/tiling`      | `/fr/prestations/carrelage`         |
| Rénovations     | `/leistungen/renovierungen`   | `/en/services/renovations` | `/fr/prestations/renovations`       |
| À propos        | `/ueber-uns`                  | `/en/about`                | `/fr/a-propos`                      |
| Galerie         | `/referenzen`                 | `/en/gallery`              | `/fr/galerie`                       |
| Contact         | `/kontakt`                    | `/en/contact`              | `/fr/contact`                       |
| Mentions        | `/impressum`                  | `/en/legal-notice`         | `/fr/mentions-legales`              |
| Confidentialité | `/datenschutz`                | `/en/privacy`              | `/fr/confidentialite`               |
| Utilisation     | `/nutzungsbedingungen`        | `/en/terms-of-use`         | `/fr/conditions-utilisation`        |

## Langues, routage et performance

next-intl utilise `localePrefix: "as-needed"`, allemand par défaut et `localeDetection: false`. Le sélecteur conserve la page équivalente, les paramètres de recherche et l’ancre. Les tests conservent un témoin JavaScript dans la fenêtre pour vérifier l’absence de rechargement complet. La navigation, le footer, les formulaires, erreurs, FAQ, textes légaux et métadonnées utilisent la bonne langue immédiatement. Le rechargement direct et l’historique ont également été testés.

Une boucle de redirection en production locale a été reproduite, puis corrigée avec `skipProxyUrlNormalize: true`, en conservant le middleware standard next-intl. Références techniques : [option officielle Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/proxy), [routage next-intl](https://next-intl.dev/docs/routing/configuration).

Les 42 pages sont pré-générées au build. Les contenus détaillés sont rendus côté serveur ; le formulaire utilise un catalogue léger plutôt que les descriptions complètes. Les photos sont servies via next/image avec dimensions réservées, tailles responsives et chargement différé hors hero. Aucun score Lighthouse ni gain chiffré de temps de chargement n’est revendiqué.

Le site reste **noindex**. Canonical, hreflang et sitemap de production sont conditionnés à la validation explicite d’un domaine réel. Les tests unitaires vérifient leurs équivalences dans une configuration de production simulée ; aucun domaine fictif n’a été publié.

## Consentement et localisation

Préférences accessibles en permanence dans le footer. Panneau non bloquant, lien de confidentialité, services nécessaires distincts, cartes facultatives désactivées par défaut, acceptation/refus d’importance comparable.

Le choix versionné est valable au plus 180 jours, avec repli en mémoire si localStorage est bloqué. La version 4, sous `thermobau-privacy-v4`, demande un nouvel accord pour Google Maps Plan/Satellite ; les choix des versions 2 et 3 ne sont pas réutilisés. Les entrées expirées sont supprimées pendant une session ouverte ou à la consultation suivante. Les modifications entre onglets sont synchronisées ; le retrait démonte toute carte active et empêche son rechargement.

**Carte Google Maps Plan/Satellite sous le footer de l’accueil et de Contact.** Les anciens emplacements au milieu du contenu ont été retirés. Les deux boutons de vue remplacent la même iframe, sans navigation ni nouvel onglet ; choisir un mode avant accord ne contacte pas le fournisseur. Le bouton principal charge la carte sur place après accord explicite. L’adresse reste lisible sans consentement ; un lien secondaire d’itinéraire reste utilisable indépendamment et s’ouvre dans le même onglet. Les autres pages ne répètent pas la carte.

Le point `49.4878874, 8.4332520` a été vérifié le **23 octobre 2026** par une réponse exacte de Nominatim : numéro 59, Blücherstraße, Ludwigshafen am Rhein, code postal 67063. Source : [bâtiment OpenStreetMap 298541737](https://www.openstreetmap.org/way/298541737), [requête de géocodage reproductible](https://nominatim.openstreetmap.org/search?street=59%20Bl%C3%BCcherstra%C3%9Fe&city=Ludwigshafen%20am%20Rhein&postalcode=67063&country=Germany&format=jsonv2&addressdetails=1). Cette vérification situe le **bâtiment**, pas une fiche commerciale ou une validation de l’implantation de l’entreprise. L’adresse professionnelle reste celle communiquée par le client.

Le panneau de choix initial concerne Google Maps ; il reste ouvrable depuis le footer. Les textes DE/EN/FR distinguent la carte intégrée du lien d’itinéraire et renvoient à la [politique de confidentialité Google](https://policies.google.com/privacy). Les informations juridiques restent provisoires et à faire valider avant publication.

L’intégration utilise l’URL Google Maps sans clé `maps?...&output=embed`, avec `t=m` (plan), `t=k` (satellite) et `hl` selon la langue. Les deux réponses fournisseur ont été vérifiées. Ce format historique n’est pas l’API Embed v1 documentée avec clé : sa disponibilité doit être recontrôlée avant publication. Les attributions du fournisseur restent intactes. Références : [intégration par partage Google Maps](https://support.google.com/maps/answer/7101463?hl=fr), [règles d’utilisation des cartes Google](https://about.google/brand-resource-center/products-and-services/geo-guidelines/).

## Vérifications exécutées

### Photos sans légendes et carte Plan/Satellite — 26 octobre 2026

- Retrait des étiquettes et crédits individuels dans tous les composants photo, sans suppression des sources ni des contrôles de droits.
- Carte placée après le footer, uniquement sur l’accueil et Contact en DE/EN/FR. Sélection Plan/Satellite sans navigation externe et sans requête avant consentement ; migration du choix en v4.
- **162 tests unitaires réussis**, 9 fichiers ; **51 tests Chrome réussis**, dont 11 scénarios cartographiques. Le parcours des 42 pages vérifie aussi l’absence de légendes et liens de crédit sous les photos.
- Compilation de production, TypeScript, lint et formatage réussis. Correction du chevauchement mobile : un espace de défilement suit la hauteur réelle du panneau de confidentialité.
- Vues Google Plan et Satellite contrôlées séparément avec le vrai fournisseur ; les tests automatisés récurrents utilisent un document simulé pour éviter de solliciter Google à chaque scénario.
- Aucun push ni déploiement effectué.

### Complément carte intégrée — 24 octobre 2026

- Compilation de production, TypeScript, lint et 155 tests unitaires réussis.
- **50 tests Chrome réussis** sur la version finale, dont 10 scénarios dédiés à la carte : accueil/contact DE/EN/FR, aucun appel externe avant accord, aucun nouvel onglet, persistance, changement de langue, retrait, ancien consentement ignoré et mobile.
- La suite automatise le document externe avec une réponse locale pour tester le comportement sans solliciter répétitivement le fournisseur. Un contrôle séparé avec le vrai fournisseur a confirmé une iframe HTTP 200, les tuiles HTTP 200, le marqueur et l’attribution OpenStreetMap visibles.
- Correction du focus après montage du panneau de préférences ; fermeture avec Échap vérifiée.
- Aucun push ni déploiement effectué.

### Recette initiale de la refonte

Le tableau ci-dessous consigne la recette de la refonte **avant l’activation de la carte OpenStreetMap**. Il ne constitue pas une validation de la nouvelle iframe ni de la migration du consentement en version 3.

| Vérification            | Résultat                                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `npm.cmd run lint`      | Réussi                                                                                                                        |
| `npm.cmd run typecheck` | Réussi                                                                                                                        |
| `npm.cmd run test`      | **155 tests réussis**, 8 fichiers                                                                                             |
| `npm.cmd run build`     | Réussi ; 42 pages éditoriales pré-générées                                                                                    |
| `npm.cmd run test:e2e`  | **40 tests Chrome réussis**                                                                                                   |
| Responsive              | Toutes les pages DE/EN/FR à 360, 390, 768, 1024, 1440 et 1920 px ; contrôle DE supplémentaire à 320 px                        |
| Photos                  | 31 fichiers/emplacements uniques, chargement et alt sur les 42 pages                                                          |
| Langues                 | Équivalences sur toutes les familles ; query/ancres ; html lang ; navigation sans rechargement ; 404 EN/FR                    |
| Formulaire              | Validation DE/EN/FR, focus d’erreur, présélection métier, aucune requête d’envoi en démo ; API renvoie 503 sans configuration |
| Confidentialité         | Persistance, refus, retrait, clavier, stockage bloqué, expiration et synchronisation interonglets                             |
| axe                     | Aucune violation grave/critique sur les 9 pages représentatives testées ; ce n’est pas un audit exhaustif WCAG                |
| Captures                | 15 captures actualisées, zéro requête externe et zéro cookie pendant ce parcours                                              |
| `git diff --check`      | Réussi                                                                                                                        |

Les tests ont d’abord exposé les problèmes de redirection puis de débordement à 320 px, qui ont été corrigés. Les rapports navigateur sont dans `playwright-report/`, ignoré par Git. Les captures sont dans [preview/](preview/).

## Limites et validations avant publication

Le contrôle `npm.cmd run format:check` est également réussi. Les deux copies du kit documentaire fourni restent exclues du formatage pour préserver les sources.

1. Confirmer l’identité juridique exacte, l’e-mail professionnel, les inscriptions/identifiants applicables et les données de contact. Les textes légaux et leurs traductions sont explicitement provisoires.
2. Confirmer hébergement, destinataires/sous-traitants, bases légales, durées de conservation et éventuels transferts ; faire vérifier DDG, RGPD, TDDDG et l’applicabilité du BFSG. Aucun label de conformité juridique n’est revendiqué. Sources : [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html), [§ 25 TDDDG](https://www.gesetze-im-internet.de/ttdsg/__25.html), [RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [BFSG](https://www.gesetze-im-internet.de/bfsg/).
3. Le point géographique du bâtiment est vérifié. Faire confirmer par l’entreprise l’usage professionnel de cette adresse et valider les conditions du fournisseur cartographique, les informations de confidentialité et le fonctionnement réel de l’iframe après consentement avant publication.
4. Ne pas activer l’e-mail avant configuration du destinataire officiel, tests réels autorisés et adaptation des textes légaux/FAQ au mode d’envoi réel. Aucun e-mail ni service tiers de formulaire n’a été testé en production.
5. L’installation des dépendances avait signalé cinq alertes de sévérité élevée. L’audit réseau final a été bloqué par le mécanisme d’approbation faute de crédits, sans détermination que la commande serait dangereuse. Aucune correction forcée n’a été appliquée. Reprendre `npm.cmd audit` et traiter les alertes avant publication.
6. Recontrôler le lien source Pexels 5691545, accessible lors de la sélection initiale mais non rouvert avec l’outil web le 23 octobre. Obtenir des photographies réelles autorisées si souhaitées.
7. Pas de mesure Lighthouse ni de test sur appareils physiques. La carte réelle a été contrôlée localement dans Chrome, mais sa disponibilité dépend du réseau et du fournisseur ; revérifier le déploiement final. Les contrôles décrits ci-dessus ne remplacent pas un audit complet.

## Démarrer

Depuis PowerShell, dans `D:\thermobau-vv` :

```powershell
npm.cmd run dev
```

Ouvrir **http://localhost:3000**. Utiliser `npm.cmd` évite le blocage éventuel de `npm.ps1`. Le serveur temporaire de recette sur le port 3100 est arrêté après vérification.
