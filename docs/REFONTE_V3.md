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

Les crédits, sources, sujets, affectations et conditions sont détaillés dans [IMAGE_SOURCES.md](IMAGE_SOURCES.md). Les photos proviennent de [Pexels et de sa licence](https://www.pexels.com/license/), sont hébergées localement et portent une légende Symbolbild / Illustrative photo / Photo d’illustration. Elles ne sont ni des références commerciales ni des portraits de salariés.

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

Le choix versionné est valable au plus 180 jours, avec repli en mémoire si localStorage est bloqué. Les entrées expirées sont supprimées pendant une session ouverte ou à la consultation suivante. Les modifications entre onglets sont synchronisées ; le retrait démonte toute carte active et empêche son rechargement.

**État actuel : aucun point cartographique vérifié.** `src/config/maps.ts` reste à `null`. L’accueil et le contact montrent l’adresse et un lien Google d’itinéraire, sans iframe, coordonnées inventées ni appel cartographique automatique. Le lien fonctionne indépendamment de tout accord pour une carte intégrée.

Puisqu’aucun service facultatif n’est actif, aucun bandeau initial superflu n’est présenté. Le panneau reste ouvrable depuis le footer. L’activation future d’un point vérifié rendra le choix initial nécessaire. Le chargement d’une véritable iframe en production reste à valider après vérification du point, du fournisseur et des informations juridiques.

## Vérifications exécutées

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
3. Vérifier le point géographique avant toute iframe ; conserver le repli adresse/lien tant que cette vérification manque.
4. Ne pas activer l’e-mail avant configuration du destinataire officiel, tests réels autorisés et adaptation des textes légaux/FAQ au mode d’envoi réel. Aucun e-mail ni service tiers de formulaire n’a été testé en production.
5. L’installation des dépendances avait signalé cinq alertes de sévérité élevée. L’audit réseau final a été bloqué par le mécanisme d’approbation faute de crédits, sans détermination que la commande serait dangereuse. Aucune correction forcée n’a été appliquée. Reprendre `npm.cmd audit` et traiter les alertes avant publication.
6. Recontrôler le lien source Pexels 5691545, accessible lors de la sélection initiale mais non rouvert avec l’outil web le 23 octobre. Obtenir des photographies réelles autorisées si souhaitées.
7. Pas de mesure Lighthouse, de test sur appareils physiques ni de validation réelle d’une iframe cartographique. Les contrôles navigateur décrits ci-dessus ne remplacent pas ces validations.

## Démarrer

Depuis PowerShell, dans `D:\thermobau-vv` :

```powershell
npm.cmd run dev
```

Ouvrir **http://localhost:3000**. Utiliser `npm.cmd` évite le blocage éventuel de `npm.ps1`. Le serveur temporaire de recette sur le port 3100 est arrêté après vérification.
