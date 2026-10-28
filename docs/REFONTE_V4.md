# Thermobau V&V — livraison V4

État du 27 octobre 2026. Modifications locales du projet existant ; aucun commit, push ou déploiement effectué.

## 1. Améliorations réalisées

Nouveau hero immersif sur l’accueil, remplacement de la première photo de galerie, palette enrichie, footer à quatre colonnes, carte déplacée avant le footer, navigation sensible au sens de défilement et bouton retour en haut. Le logo, les six prestations, les 42 routes, les textes métier approuvés et les cinq autres photos de galerie sont conservés.

## 2. Fichiers concernés

| Ensemble                       | Fichiers principaux                                                                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero et traduction             | `src/components/sections/CinematicHero.tsx`, `EditorialPages.tsx`, `src/i18n/content.ts`, `src/app/hero.css`                                                   |
| Palette                        | `src/app/globals.css`, `src/app/editorial.css`                                                                                                                 |
| Footer et coordonnées          | `src/components/layout/SiteFooter.tsx`, `ContactDetails.tsx`, `src/app/footer.css`, `src/config/site.ts`, `src/types/content.ts`, `src/lib/company-contact.ts` |
| Navigation et retour en haut   | `src/components/layout/SmartHeader.tsx`, `SiteHeader.tsx`, `MobileNav.tsx`, `BackToTop.tsx`, `src/app/motion.css`                                              |
| Intégration et confidentialité | `src/app/[locale]/layout.tsx`, `src/components/privacy/PrivacyPreferences.tsx`, `src/i18n/legal.ts`                                                            |
| Médias                         | `src/data/photo-plan.ts`, quatre nouveaux WebP dans `public/images/photos/`, `docs/IMAGE_SOURCES.md`                                                           |
| Vérification                   | `tests/e2e/hero.spec.ts`, `motion.spec.ts`, `maps.spec.ts`, `v3.spec.ts`, `tests/unit/company-contact.test.ts`, `photos.test.ts`                               |
| Documentation                  | `README.md`, ce rapport, `docs/preview/v4/`                                                                                                                    |

`next-env.d.ts` est régénéré par Next.js lors de la compilation.

## 3. Nouvelles photographies

| Usage                         | Fichier                | Auteur           | Dimensions  | Poids   |
| ----------------------------- | ---------------------- | ---------------- | ----------- | ------- |
| Hero : façade                 | `pexels-4953232.webp`  | Damir Mijailovic | 1920 × 1280 | 183 Kio |
| Hero : rénovation intérieure  | `pexels-7217928.webp`  | Blue Bird        | 1920 × 1280 | 130 Kio |
| Hero : finitions              | `pexels-5493658.webp`  | Antoni Shkraba   | 1920 × 1280 | 44 Kio  |
| Galerie 01 : façade lumineuse | `pexels-34264478.webp` | Sóc Năng Động    | 1333 × 2000 | 181 Kio |

Les quatre nouveaux fichiers totalisent environ 538 Kio. Le catalogue actif contient 33 photographies distinctes, sans répétition entre emplacements. Les anciens fichiers ne sont pas supprimés.

## 4. Sources et licences

Les quatre pages sources et leurs auteurs ont été revérifiés : [façade](https://www.pexels.com/photo/worker-skim-coating-wall-with-liquid-plaster-4953232/), [intérieur](https://www.pexels.com/photo/a-wooden-stepladder-inside-a-room-7217928/), [finition](https://www.pexels.com/photo/a-construction-worker-working-on-the-wall-of-a-house-5493658/). Le lien exact de la nouvelle façade de galerie et l’ensemble des justificatifs figurent dans le [registre des médias](IMAGE_SOURCES.md).

La [licence Pexels](https://www.pexels.com/license/) permet l’usage commercial et la modification sans attribution obligatoire. Les crédits restent dans la documentation interne, conformément à la demande de retirer les lignes sous les images. La mention générale du caractère illustratif est conservée : ces personnes ne sont pas présentées comme les salariés de Thermobau et ces images ne prouvent pas des réalisations de l’entreprise.

## 5. Couleurs et surfaces

| Couleur   | Rôle                                                |
| --------- | --------------------------------------------------- |
| `#078DDA` | Bleu d’origine, accents et repères                  |
| `#0866A8` | Boutons, liens sur fond clair et bandeau de contact |
| `#1E2024` | Texte foncé et footer anthracite                    |
| `#303943` | Sections ardoise                                    |
| `#F2F5F7` | Surfaces gris bleu                                  |
| `#F4F1EC` | Sections pierre et zone de localisation             |
| `#D9E0E5` | Bordures harmonisées                                |
| `#FFFFFF` | Fonds clairs et texte sur fonds foncés              |

Les couleurs structurantes et l’ombre douce sont centralisées dans `globals.css`. Le bleu foncé porte les petits textes blancs des CTA pour conserver leur contraste.

## 6. Fonctionnement du hero

Trois photographies locales occupent environ 82 % de la hauteur de l’écran sur ordinateur, avec un contenu adaptable sur mobile. Le titre allemand et le sous-titre suivent le brief. Deux liens mènent directement au contact et aux prestations ; toutes les commandes sont traduites DE/EN/FR.

Seule la première photo est rendue et préchargée initialement. La suivante est préparée après deux secondes, puis affichée après huit secondes si elle est chargée. Un chargement lent conserve la photo précédente. Le fondu dure 1,1 seconde ; le léger zoom utilise seulement une transformation CSS. Aucun téléchargement vidéo ni bibliothèque de carousel supplémentaire.

La lecture se suspend au survol souris, au focus clavier, hors écran, lorsque l’onglet est masqué et sur demande explicite. Une sélection manuelle suspend la lecture jusqu’à sa relance. Avec `prefers-reduced-motion`, les photos restent sélectionnables mais le défilement automatique, le fondu et le zoom sont désactivés.

## 7. Fonctionnement du header

Le comportement par défaut est volontairement `headerBehavior="show-on-scroll-down"` : visible en descente, masqué en remontée après 120 px, toujours visible près du haut. Une accumulation de 12 px dans la même direction évite les clignotements. Le listener passif utilise `requestAnimationFrame`.

Le header reste visible lorsque son menu est ouvert ou que le focus clavier se trouve à l’intérieur. Le positionnement sticky conserve l’espace dans la page ; la transition de 240 ms est supprimée en mode mouvements réduits. L’option `show-on-scroll-up` permet d’inverser le comportement. Les ancres tiennent compte de sa hauteur.

## 8. Retour en haut

Le bouton apparaît au-delà de 560 px. Il remonte doucement, ou immédiatement avec mouvements réduits, puis remet le focus sur le lien du logo. Il disparaît en haut et sort de l’ordre de tabulation lorsqu’il est masqué.

Sa position s’adapte à la hauteur réelle du panneau de confidentialité et aux zones de sécurité mobiles. Le panneau peut défiler en interne sur les écrans courts pour garder le header et le bouton accessibles.

## 9. Footer et carte

Quatre colonnes sur grand écran, deux sur tablette, puis des blocs empilés sur mobile : entreprise, navigation, six prestations, coordonnées. La ligne inférieure rassemble l’année courante, les pages légales et les paramètres de confidentialité. Les profils sociaux, lorsqu’ils seront confirmés, utiliseront de simples liens et des icônes locales.

Sur l’accueil et le contact, la carte est désormais immédiatement avant le footer, qui reste le dernier grand bloc. Les vues Plan/Satellite restent intégrées dans la page. Aucun appel Google n’a lieu avant consentement ; le retrait enlève l’iframe. Les autres pages ne chargent pas de carte.

## 10. Contacts non configurés

Téléphone, e-mail, WhatsApp, Facebook, Instagram, LinkedIn et YouTube restent à `null` dans `src/config/site.ts`. L’aperçu affiche des indications explicites non cliquables ; une publication validée masque les canaux absents. Aucun numéro ni profil fictif.

Les futurs numéros doivent porter leur indicatif international. Le code valide et normalise les liens `tel:`, `mailto:`, `wa.me` et les domaines HTTPS des réseaux sociaux. La validation technique ne prouve pas l’appartenance d’un profil à l’entreprise.

## 11. Vérifications exécutées

| Contrôle                             | Résultat du 27 octobre 2026                                                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ESLint                               | Réussi                                                                                                                                                         |
| TypeScript (`npm.cmd run typecheck`) | Réussi                                                                                                                                                         |
| Compilation Next.js                  | Réussie ; 42 routes localisées pré-générées                                                                                                                    |
| Vitest                               | 201 tests réussis, 10 fichiers                                                                                                                                 |
| Playwright / Chrome                  | 60 tests réussis, environ 2 min 18 s                                                                                                                           |
| Prettier                             | Réussi                                                                                                                                                         |
| `git diff --check`                   | Réussi                                                                                                                                                         |
| Rendu responsive                     | Aucun débordement sur les 42 pages à 360, 390, 768, 1024, 1440 et 1920 px ; les 14 pages DE sont aussi testées à 320 px                                        |
| Hero                                 | Première image seule au départ, chargement différé, cycle de 8 s, pause/reprise, focus, sélection manuelle et mouvements réduits vérifiés                      |
| Header / retour en haut              | Sens de défilement, seuils, focus, menu, retour au sommet et absence de chevauchement du panneau vérifiés, y compris à 360 × 640 px                            |
| Langues                              | Changement DE/EN/FR sur chaque famille sans rechargement complet ; URL, paramètres, actualisation et historique conservés                                      |
| Accessibilité automatisée            | Aucune violation axe sur les trois nouveaux accueils pour les règles WCAG A/AA sélectionnées ; aucune violation grave/critique sur les autres pages testées    |
| Confidentialité / formulaire         | Aucun envoi réel en démonstration ; consentement, expiration, synchronisation entre onglets et retrait vérifiés                                                |
| Carte réelle                         | Plan et Satellite chargés dans Chrome, réponses Google finales HTTP 200, vue satellite aussi contrôlée à 390 px ; carte avant le footer et aucun nouvel onglet |
| Captures locales                     | Aucune erreur JavaScript ni requête externe avant consentement pendant les captures                                                                            |

Le premier passage navigateur a identifié un test de focus qui déplaçait involontairement le scroll avant de vérifier sa direction. Une sonde Chrome a confirmé le comportement ; le test utilise désormais `preventScroll`, et la recette complète a ensuite réussi. La compilation nécessite ici le compte Windows normal pour accéder au cache natif SWC, inaccessible au compte isolé ; aucune dépendance n’a été modifiée pour contourner cela.

Une vérification complémentaire avec animations actives a confirmé la transition du header sur 240 ms, la flèche blanche du bouton, une remontée avec 30 positions intermédiaires, puis une position finale à zéro et le focus remis au logo. Les huit captures complémentaires des pages principales ne présentent ni erreur JavaScript ni débordement horizontal.

Les captures sont dans [docs/preview/v4](preview/v4/), notamment [accueil desktop](preview/v4/accueil-1440.png), [accueil mobile](preview/v4/accueil-390.png), [footer desktop](preview/v4/footer-desktop.png), [footer mobile](preview/v4/footer-mobile.png) et [façade de galerie](preview/v4/galerie-facade.png). Les prestations, l’entreprise, la galerie et le contact disposent aussi de captures desktop et mobile. Les captures isolées du footer masquent uniquement le header flottant pendant la capture, afin de montrer tout son contenu.

## 12. Limites restantes

La vérification automatique et visuelle ne constitue pas un audit complet WCAG 2.2 AA. Les tests utilisent Chrome et des tailles d’écran simulées ; Safari, Firefox et les appareils physiques ne sont pas couverts. Aucun score Lighthouse ni résultat Core Web Vitals de production n’est annoncé.

La carte dépend de Google et du réseau. Le formulaire reste en démonstration, et le site conserve `noindex`. Les coordonnées et textes juridiques restent provisoires tant que les informations manquantes ne sont pas confirmées.

## 13. Lancer le site

Depuis le dossier du projet, avec Node.js 24 et les dépendances déjà installées :

```powershell
Set-Location D:\thermobau-vv
npm.cmd run dev
```

Ouvrir `http://localhost:3000` ou le port annoncé par Next.js. Pour une première installation : `npm.cmd ci`. La recette complète et les commandes de production sont dans le README.

## 14. Avant publication officielle

Confirmer l’identité juridique exacte, les coordonnées électroniques, le domaine, les informations professionnelles applicables, l’hébergeur et ses conditions de traitement des données. Confirmer les numéros et profils sociaux avant de les activer. Le formulaire nécessite un destinataire et un service d’envoi réellement configurés, puis un essai contrôlé.

La relecture a conservé les exigences documentées de [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/BJNR0950B0024.html), [§ 25 TDDDG](https://www.gesetze-im-internet.de/ttdsg/__25.html) et du [RGPD](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32016R0679). Le déplacement de la carte est reflété dans les trois versions de la politique de confidentialité. Cela ne vaut pas validation juridique des informations encore absentes : les textes, les traductions et les traitements réels doivent être validés avant publication.
