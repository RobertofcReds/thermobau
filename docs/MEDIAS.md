# Registre des médias — Thermobau V&V

Ce registre décrit les actifs locaux du site et leur provenance. La V2 intègre huit photographies stock Pexels dans `public/images/photos/`, avec textes alternatifs allemands et crédits centralisés dans `src/data/photos.ts`. Ces photographies sont des « Symbolbilder », pas des réalisations de Thermobau V&V. Aucun média externe ne se charge automatiquement pour constituer la galerie.

Le détail des auteurs, pages sources, licences et transformations figure dans [IMAGE_SOURCES.md](IMAGE_SOURCES.md), vérifié le 21 octobre 2026. Les photographies sont servies localement en WebP. La photo interne du véhicule reste exclue de la publication.

## Sources fournies et conservées

Le kit d'origine `Thermobau_VV_Kit_Pret_pour_Codex/` reste présent. Ses documents et actifs ont été copiés dans `docs/` et `assets/` à la racine pour le projet, sans suppression des originaux.

| Actif                    | Source                                            | Usage et statut                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logo approuvé            | `assets/Thermobau_VV_Logo_Valide.png`             | Logo fourni et approuvé dans le brief ; réutilisation fidèle. Confirmer les droits de publication dans la validation finale.                                                                                                          |
| Logo public              | `public/brand/thermobau-vv-logo.png`              | Copie intégrale du PNG approuvé, sans redessin, effet ni recadrage.                                                                                                                                                                   |
| Icône Next.js            | `src/app/icon.png`                                | Dérivée du logo approuvé le 22 octobre 2026 : seules les marges blanches extérieures sont retirées, puis le logo complet est réduit proportionnellement dans un PNG 128 × 128. Aucun élément ni couleur de l’identité n’est remplacé. |
| Photographie du véhicule | `assets/Thermobau_Vehicule_Reference_INTERNE.png` | Référence interne pour les métiers et l'identité. Non copiée dans `public/`, non affichée sur le site. Publication conditionnée à une autorisation spécifique.                                                                        |

L’égalité SHA-256 du logo source et du logo public a été contrôlée à nouveau le **22 octobre 2026**. Ces deux fichiers restent strictement identiques et inchangés :

```text
DA4CCF616D0D7D71349D3044AA80DAE4A1201101D33D3BA5C1133FCBC6753730
```

Conserver l'image complète et son ratio dans les composants. Le PNG n'est pas présenté comme un fichier vectoriel.

La nouvelle icône compacte a été produite localement avec Sharp depuis `assets/Thermobau_VV_Logo_Valide.png` (1254 × 1254). L’opération `trim({ background: "#ffffff", threshold: 10 })` retire uniquement le blanc extérieur : rectangle conservé de **977 × 785**, origine **x = 148, y = 255**. Le dessin complet (toit, cheminée, fenêtre, vagues, THERMOBAU, V & V et traits latéraux) est ensuite réduit avec `resize(120, 120, { fit: "contain", background: "#ffffff", kernel: "lanczos3" })`, entouré de 4 px blancs de chaque côté et enregistré en PNG 128 × 128. Aucun redessin, symbole isolé, couleur ajoutée ni changement de proportions. Le fichier final de **12 865 octets** a été inspecté visuellement.

SHA-256 du favicon dérivé `src/app/icon.png` :

```text
A02F6243EC04C5E5AC8611FEA29FC85971C61775EAFD85E2022A268E8CAE32A7
```

## Illustrations originales du prototype

Les fichiers ci-dessous sont des compositions SVG originales créées dans le code du projet, sans import de photographie stock ou de chantier. Ils sont conservés comme actifs source historiques. S’ils sont réutilisés, ils doivent être indiqués comme illustrations ou « Symbolbild » dans l’interface.

| Fichier sous `public/`                | Sujet                                          | Provenance                      |
| ------------------------------------- | ---------------------------------------------- | ------------------------------- |
| `images/hero/raumkonzept.svg`         | Composition illustrative d'un espace intérieur | Création originale pour ce site |
| `images/services/fassaden.svg`        | Façade                                         | Création originale pour ce site |
| `images/services/trockenbau.svg`      | Aménagement intérieur                          | Création originale pour ce site |
| `images/services/putzarbeiten.svg`    | Travail de surface                             | Création originale pour ce site |
| `images/services/malerarbeiten.svg`   | Peinture                                       | Création originale pour ce site |
| `images/services/fliesenarbeiten.svg` | Carrelage                                      | Création originale pour ce site |
| `images/services/renovierungen.svg`   | Rénovation                                     | Création originale pour ce site |

Ces SVG sont conservés comme actifs historiques du prototype ; la V2 les remplace par les photographies documentées dans les surfaces principales. Les données de galerie distinguent les photographies stock des futurs projets réels. Aucun titre de chantier ni lieu de réalisation Thermobau V&V n’est inventé. Le rendu ne doit inclure que les éléments dont `published` et `rightsConfirmed` sont vrais.

L'avertissement public de la galerie est : « Die gezeigten Bilder dienen der Veranschaulichung unserer Tätigkeitsbereiche und stellen keine dokumentierten Referenzprojekte von Thermobau V&V dar. »

## Police et pictogrammes

| Ressource           | Source                                                       | Licence et intégration                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manrope variable    | Paquet npm `@fontsource-variable/manrope`, version 5.3.0     | Police copiée dans `src/fonts/manrope-latin.woff2`, licence conservée dans `src/fonts/OFL.txt` ; chargement local avec `next/font/local`, sans appel Google Fonts au runtime. |
| Pictogrammes Lucide | Paquet npm `lucide-react`, version fixée dans `package.json` | SVG des composants de la bibliothèque ; conserver les notices de licence de la dépendance lors de la redistribution.                                                          |

La licence OFL accompagne la police. Ne pas la supprimer lors du transfert du projet.

## Ajouter une réalisation réelle

Avant d'ajouter un élément `kind: "real-project"` dans `src/data/projects.ts` :

1. Obtenir une autorisation documentée du titulaire des droits et vérifier les éventuels accords des personnes identifiables ou du propriétaire du lieu.
2. Conserver l'auteur, le crédit demandé, l'origine du fichier, les conditions et la date de l'autorisation dans ce registre ou un dossier interne accessible au responsable.
3. Vérifier le contenu réel du chantier, le titre et la localisation publiable. Ne pas déduire ces informations d'une image.
4. Retirer les informations personnelles non nécessaires avant publication et préparer une version optimisée adaptée au web.
5. Renseigner un texte alternatif allemand utile et les champs vérifiés. Garder `rightsConfirmed: false` et `published: false` tant que les validations manquent.
6. Après autorisation, activer l'élément, contrôler son affichage et adapter la mention collective si la galerie combine illustrations et projets authentiques.

La validation détaillée des droits et de l'identité visuelle figure dans [VALIDATION_AVANT_PUBLICATION.md](../VALIDATION_AVANT_PUBLICATION.md).
