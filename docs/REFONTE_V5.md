# Thermobau V&V — ajustements V5

Recette locale du 28 octobre 2026, après les retours sur la V4. Les présentes décisions remplacent les descriptions V4 du header, du rythme du hero, des couleurs et de la position de la carte.

## Changements visibles

- Header : 80 px sur ordinateur, 76 px sur tablette et 72 px sur téléphone, hors bordure de 1 px. Logo redimensionné à l’affichage, sans modification du fichier approuvé. Cibles tactiles de 44 px conservées.
- Accueil : une image pendant 12 secondes, fondu de 1,6 seconde et zoom alterné du grand vers le petit puis du petit vers le grand. Le sens continue d’alterner après le retour à la première des trois photos. Bouton pause et sélection manuelle disponibles.
- Autres pages : déplacements doux à l’entrée des blocs, animation distincte des photos et léger zoom des cartes au survol. Les textes restent opaques pendant l’entrée pour préserver le contraste. Les pages légales et les formulaires restent stables.
- Couleurs : introductions bleu profond, sections bleu minéral, bleu clair et sauge, appels à l’action bleus. Les fonds beige/brun ont été supprimés dans toutes les pages. Le blanc reste présent dans les cartes, champs et surfaces de lecture. Les mêmes styles couvrent les trois langues.
- Footer : disposition reprise du [site KSPH fourni](https://photovoltaik.ksph.eu/de), observé sur ordinateur et mobile. Bandeau logo et présentation en haut, puis quatre colonnes dans l’ordre **adresse/contact → accès rapide → prestations → liens légaux**. La carte est intégrée sous les colonnes, avant le copyright, sur l’accueil et le contact. Les colonnes s’empilent sur téléphone.

Le footer utilise les couleurs et informations de Thermobau. Les coordonnées et profils sociaux non confirmés restent sans lien inventé. Les liens vers les autres entreprises de KSPH n’ont pas été repris. La carte conserve ses modes Plan/Satellite et son chargement après consentement.

## Animation, chargement et accessibilité

Le premier visuel du hero reste prioritaire. Le suivant est préparé après le chargement initial, et une image non chargée n’est pas affichée lors du changement. Les animations utilisent les transformations CSS ; aucune bibliothèque d’animation supplémentaire n’a été ajoutée. Le diaporama s’arrête hors écran et dans un onglet masqué. Le survol des commandes et le focus clavier suspendent le changement d’image.

La préférence système de réduction des mouvements désactive les animations. Le contenu reste visible sans JavaScript ; les entrées ne sont qu’un enrichissement. Une carte qui reçoit le focus arrête son animation et ne la rejoue pas après la perte du focus.

Un premier contrôle axe a détecté une baisse de contraste pendant l’entrée du bouton de la page prestations. L’animation des blocs de texte utilise désormais uniquement un déplacement. Un test contrôle le contraste au tout début de cette animation.

## Validation

### Suppression globale des tons beige et brun

Les variables `--color-stone` et `--warm` ont été supprimées. Leurs usages, les fonds des galeries et des pages métiers, les sections de présentation, le guide de contact, les fonds temporaires des photos et la bordure brune du contact utilisent désormais les bleus de la palette. Les anciennes classes `editorial-warm` deviennent `editorial-blue`.

Validation de cette correction : build avec contrôle TypeScript, lint et formatage réussis ; **15 tests navigateur réussis**, couvrant les 42 pages, les contrastes testés et l’affichage à 390 et 1440 px. Aucun usage des anciennes variables ou couleurs décoratives beige/brun ne subsiste dans `src`.

Les captures actuelles sont disponibles pour l’[accueil](preview/v5-blue/startseite-1440.png), une [page métier](preview/v5-blue/leistungen-trockenbau-1440.png) et le [contact](preview/v5-blue/kontakt-1440.png). Les captures des sections suivantes sont conservées comme historique des étapes précédentes.

### Retouches de l’accueil après retour visuel

- « Warum Thermobau V&V kontaktieren? » utilise maintenant le bleu clair de la palette à la place du fond pierre.
- Les trois photos de « Material. Werkzeug. Handgriff. » ont le même alignement et le même format ; le décalage de la photo centrale est supprimé. Elles s’empilent avec un espacement régulier sur téléphone.
- Les deux boutons du hero bougent de 4 px sur un cycle de 4,8 secondes, décalé entre les boutons. Leur mouvement se fige au survol et au focus, respecte le bouton de pause général et disparaît avec la réduction des mouvements.
- Build, lint et formatage réussis ; les 11 tests navigateur ciblant le hero, l’accessibilité et le responsive passent. Les deux parcours responsive ont ensuite été rejoués avec chargement des photos avant capture : réussis.
- Captures actualisées : [accueil ordinateur](preview/v5-home/startseite-1440.png) et [accueil téléphone](preview/v5-home/startseite-390.png).

### Recette complète V5 avant ces retouches

- Build de production : réussi, 42 pages publiques pré-générées.
- ESLint, TypeScript et formatage : réussis.
- Tests unitaires : **201 réussis** dans 10 fichiers.
- Tests navigateur Chrome : **66 réussis** lors de la dernière exécution complète.
- Navigation et actualisation DE/EN/FR, 42 pages avec images chargées, affichage de 320 à 1920 px, consentement de la carte et modes intégrés : vérifiés par la suite navigateur.
- Contrôles axe : aucune violation grave ou critique sur les pages testées ; contraste également contrôlé au début de l’animation des prestations.
- Vérification visuelle manuelle du header, des prestations, de l’accueil mobile et du footer dans le navigateur local.

Les contrôles automatisés ne constituent pas un audit WCAG complet ni une mesure de Core Web Vitals en production. Le projet reste en démonstration locale.

## Captures

Captures du build de production local, à 1440 et 390 px, avec réduction des mouvements pour figer les vues :

| Page            | Ordinateur                                           | Téléphone                                          |
| --------------- | ---------------------------------------------------- | -------------------------------------------------- |
| Accueil         | [1440 px](preview/v5/startseite-1440.png)            | [390 px](preview/v5/startseite-390.png)            |
| Cloisons sèches | [1440 px](preview/v5/leistungen-trockenbau-1440.png) | [390 px](preview/v5/leistungen-trockenbau-390.png) |
| Contact         | [1440 px](preview/v5/kontakt-1440.png)               | [390 px](preview/v5/kontakt-390.png)               |

Les tests de carte utilisent un contenu embarqué simulé pour vérifier le consentement, les modes, la persistance et l’absence d’ouverture d’un autre onglet. Le rendu réel du fournisseur dépend de sa disponibilité et du réseau.
