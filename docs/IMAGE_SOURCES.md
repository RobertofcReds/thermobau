# Photographies V2 — sources et conditions d’utilisation

Vérification des pages sources, de leur auteur et de la licence : **21 octobre 2026**.

Les huit fichiers sont de vraies photographies stock téléchargées depuis **Pexels**, puis hébergées localement. Elles illustrent les métiers ; aucune ne documente un chantier, un salarié ou un client de Thermobau V&V. Les composants doivent conserver la mention allemande **« Symbolbild »**. Ne pas les convertir en références commerciales ni en faux avant/après.

## Licence commune

[Licence Pexels consultée le 21 octobre 2026](https://www.pexels.com/license/). Elle autorise le téléchargement, l’utilisation sur un site commercial et la modification des photographies. Le crédit n’est pas obligatoire, mais il est conservé ici et dans `src/data/photos.ts`. La licence interdit notamment de suggérer une approbation par les personnes ou marques représentées, de revendre des copies non modifiées ou de redistribuer les fichiers comme banque d’images. Les personnes photographiées ne sont donc jamais présentées comme l’équipe de l’entreprise.

## Registre des fichiers intégrés

Les chemins ci-dessous sont relatifs à `public/images/photos/`. Toutes les lignes relèvent de la licence Pexels ci-dessus. Les lieux mentionnés sont ceux indiqués par la source ; ils ne constituent pas des zones d’intervention de Thermobau V&V.

| Fichier           | Sujet et usage                                                                                                                                                    | Auteur              | Page source et licence                                                                                                                                       | Dimensions locales |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `hero.webp`       | Façades résidentielles contemporaines ; photographie d’ouverture. Source située à Poole, Royaume-Uni, sans revendication d’un lieu allemand dans le site.         | Expect Best         | [Pexels 323780](https://www.pexels.com/photo/modern-building-against-sky-323780/) · [Licence](https://www.pexels.com/license/)                               | 2200 × 1418        |
| `facade.webp`     | Échafaudage devant une façade à Osnabrück, Allemagne ; Fassadenarbeiten. L’image ne signifie pas que l’entreprise propose le montage d’échafaudages.              | Christian Reinke    | [Pexels 16847989](https://www.pexels.com/photo/scaffolding-on-building-wall-16847989/) · [Licence](https://www.pexels.com/license/)                          | 1400 × 933         |
| `drywall.webp`    | Pose d’une plaque de parement avec ossature visible ; Trockenbau. Photographie originale en noir et blanc, source située à Falun, Suède.                          | Jimmy Nilsson Masth | [Pexels 11427524](https://www.pexels.com/photo/man-doing-construction-work-inside-house-11427524/) · [Licence](https://www.pexels.com/license/)              | 1600 × 1066        |
| `plaster.webp`    | Application et lissage d’enduit au mur ; Putzarbeiten.                                                                                                            | Ksenia Chernaya     | [Pexels 5691637](https://www.pexels.com/photo/crop-man-plastering-wall-at-home-5691637/) · [Licence](https://www.pexels.com/license/)                        | 1202 × 1800        |
| `painting.webp`   | Peinture d’un mur au rouleau dans une pièce en travaux ; Malerarbeiten.                                                                                           | Tima Miroshnichenko | [Pexels 6474471](https://www.pexels.com/photo/man-painting-the-wall-6474471/) · [Licence](https://www.pexels.com/license/)                                   | 1600 × 1066        |
| `tiles.webp`      | Préparation du lit de colle et pose de carreaux au sol ; Fliesenarbeiten.                                                                                         | Sergei Starostin    | [Pexels 29181494](https://www.pexels.com/photo/construction-worker-laying-tile-in-renovation-project-29181494/) · [Licence](https://www.pexels.com/license/) | 1600 × 1066        |
| `renovation.webp` | Pièce en rénovation, outils et escabeau ; Renovierungen. Un appareil existant visible dans la pièce n’implique aucune prestation d’installation de climatisation. | Pietro Greco        | [Pexels 9908376](https://www.pexels.com/photo/renovation-of-an-apartmetn-flat-9908376/) · [Licence](https://www.pexels.com/license/)                         | 1600 × 1200        |
| `building.webp`   | Façade résidentielle rénovée à Dortmund, Allemagne ; image complémentaire.                                                                                        | Lahzeha🌿           | [Pexels 14317246](https://www.pexels.com/photo/renovated-tenement-house-in-city-14317246/) · [Licence](https://www.pexels.com/license/)                      | 1200 × 1600        |

## Téléchargement et optimisation

Les fichiers ont été téléchargés le **21 octobre 2026** depuis le CDN officiel Pexels. Pour chaque identifiant de la table, l’URL de téléchargement suit ce format : `https://images.pexels.com/photos/IDENTIFIANT/pexels-photo-IDENTIFIANT.jpeg?auto=compress&cs=tinysrgb&w=LARGEUR`. Largeur demandée : 2200 pour `hero`, 2000 pour les autres images.

Traitement local avec Sharp, déjà présent via Next.js : respect du ratio, orientation EXIF, réduction sans agrandissement, conversion WebP (qualité 80, effort 6 ; qualité 75 pour `facade` et `building`). Les métadonnées EXIF ne sont pas recopiées. Aucun contenu n’a été généré ou ajouté aux photos. Le cadrage d’affichage est géré par les composants `next/image`.

La sélection a été inspectée visuellement après téléchargement. Les fichiers ne comportent pas de filigrane ajouté. Leur poids total est d’environ **1,02 Mio**. Aucun appel à Pexels n’est nécessaire lorsque les visiteurs ouvrent le site.

## Médias toujours manquants

- Photographies autorisées de véritables chantiers de Thermobau V&V et informations vérifiées sur ces réalisations.
- Autorisation spécifique de publication du véhicule présent dans `assets/Thermobau_Vehicule_Reference_INTERNE.png` : ce fichier reste interne et n’est pas publié.

Lors du remplacement d’une photo stock, conserver la preuve de l’autorisation, l’auteur, le crédit, l’origine du fichier et les informations réellement confirmées. Adapter simultanément le texte alternatif et la mention « Symbolbild » ; cette mention doit rester pour toutes les photographies stock restantes.
