# Validation avant publication — Thermobau V&V

Le site reste une prévisualisation locale. Ce document recense les décisions et informations nécessaires avant une publication réelle. Il ne constitue pas une validation juridique. **Envoi et indexation restent désactivés ; aucun déploiement, achat de domaine ou e-mail réel n'a été effectué dans cette refonte.**

## Informations bloquantes

- Identité juridique exacte du fournisseur du site et rôle de Vasil Velikov Dimitrov ; forme juridique et mentions conditionnelles applicables.
- Responsable du traitement, coordonnées de contact, hébergeur, journalisation réelle, destinataires, bases légales, conservation et transferts éventuels.
- Destinataire officiel et prestataires approuvés avant toute activation du formulaire. La validation complète des variables techniques ne vaut pas validation juridique.
- Domaine confirmé et validation éditoriale/légale avant levée du `noindex`.

Les champs restent `null` dans `src/config/site.ts`, sous `legal` et `privacy`. Les pages légales utilisent ces champs lorsqu'ils sont renseignés ; leurs avertissements provisoires ne disparaissent pas automatiquement. Une relecture explicite des pages finales demeure nécessaire.

## Identité et coordonnées

- [ ] Confirmer le nom commercial exact : Thermobau V&V.
- [ ] Confirmer la personne de contact communiquée, Vasil Velikov Dimitrov, son rôle exact et les usages publics autorisés ; ne pas en déduire un titre ou un statut juridique.
- [ ] Confirmer l'adresse publiable : Blücherstr. 59, 67063 Ludwigshafen, Deutschland.
- [x] Téléphone fourni pour affichage : **+49 176 41504088**.
- [x] Adresse e-mail publique fournie : **thermo_bau@web.de**.
- [x] Numéro WhatsApp fourni pour affichage : **+49 176 41504088**.
- [ ] Confirmer le destinataire technique du futur formulaire et les paramètres d'envoi ; l'affichage de l'adresse publique n'active pas le formulaire démo.
- [ ] Fournir les horaires s'ils doivent être affichés, sinon conserver `null`.
- [ ] Fournir le domaine officiel et confirmer sa propriété ; il n'est ni inventé ni acheté dans le prototype.
- [ ] Confirmer les zones d'intervention. Ludwigshafen est la localisation connue ; aucun rayon ni ensemble de communes n'est actuellement déclaré.

## Prestations et contenu allemand

- [ ] Valider les six domaines communiqués : Fassaden, Trockenbau, Putz, Maler, Fliesen, Renovierungen aller Art.
- [ ] Relire les textes des six fiches, les FAQ et les étapes de demande ; préciser le périmètre effectivement proposé pour chaque métier.
- [ ] Confirmer les éventuelles limites techniques, travaux sous-traités ou exclusions à mentionner.
- [ ] Ne publier aucun service supplémentaire, notamment isolation ou chauffage, sans confirmation explicite.
- [ ] Faire valider l'allemand et les libellés de prise de contact par le responsable.
- [ ] Fournir des justificatifs avant tout ajout d'ancienneté, qualification, certification, garantie, prix, avis, statistiques ou référence commerciale.

## Identité graphique et médias

- [ ] Confirmer les droits de publication du logo approuvé fourni.
- [ ] Valider son intégration complète dans l'en-tête et le pied de page sur mobile et ordinateur.
- [ ] Contrôler le favicon dérivé du logo approuvé et la fidélité du logo complet.
- [ ] Vérifier les photographies représentatives, leurs auteurs, sources, licences et mentions « Symbolbild » dans le registre des médias. Elles ne représentent aucun chantier documenté de Thermobau V&V.
- [ ] La route `/referenzen` est conservée sous le libellé « Einblicke » ; remplacer plus tard ses photographies représentatives uniquement par des projets dont les droits et les faits sont documentés.
- [ ] Pour chaque vrai projet : obtenir le fichier original, l'auteur, le titulaire des droits, l'autorisation de publication, les crédits, le titre et la localisation autorisés ; contrôler les personnes, plaques et autres informations identifiantes.
- [ ] Conserver la photographie du véhicule à usage interne jusqu'à une autorisation spécifique documentée.
- [ ] Préserver la licence OFL de Manrope et vérifier le registre [docs/MEDIAS.md](docs/MEDIAS.md).

## Identification juridique et confidentialité

Les pages `/impressum` et `/datenschutz` sont provisoires. Les points ci-dessous sont des sujets de revue, pas une liste garantissant à elle seule la conformité.

- [ ] Faire vérifier l'identité du fournisseur du site et les mentions applicables selon **§ 5 DDG** : nom légal, forme juridique, représentation, adresse, contact électronique et autres mentions selon la situation réelle.
- [ ] Fournir uniquement si applicables et confirmés : registre et numéro, tribunal de registre, USt-IdNr. ou Wirtschafts-Identifikationsnummer, autorité compétente, chambre, titre professionnel, pays d'attribution et règles professionnelles accessibles. Ne pas confondre ces identifiants avec un numéro fiscal personnel (`Steuernummer`).
- [ ] Examiner les obligations d'information relatives à la médiation de consommation (§ 36 VSBG) selon l'effectif et la participation/obligation réelle ; ne pas inventer une déclaration de participation ou de refus.
- [ ] Identifier le responsable du traitement et son contact exact ; ne pas inventer un délégué à la protection des données.
- [ ] Faire relire l'information **RGPD**, notamment l'article 13, en fonction des traitements réellement activés : finalités, bases légales, destinataires, durées, droits, transferts éventuels et modalités de contact.
- [ ] Valider l'hébergeur, ses régions, ses journaux techniques, leur accès et leur durée de conservation ; vérifier les accords de sous-traitance nécessaires.
- [ ] Valider les prestataires Resend et Upstash ou décider d'un autre transport/protecteur en adaptant le code et les tests.
- [ ] Examiner les régions et sous-traitants de ces prestataires, les transferts éventuels, leurs contrats et les mesures pertinentes.
- [ ] Fixer une politique de conservation des demandes dans la boîte destinataire et chez le fournisseur d'e-mail. Le TTL Redis de 15 minutes n'est pas une politique de conservation pour l'ensemble des prestataires.
- [ ] Vérifier le traitement de l'identité réseau hachée pour l'anti-abus et son information dans la politique de confidentialité.
- [ ] Examiner les obligations de **§ 25 TDDDG** avant tout ajout de stockage non nécessaire, analytics, pixel, carte embarquée ou script tiers. Aucun de ces services n'est à ajouter automatiquement.
- [ ] Valider le texte d'information du formulaire et la base légale ; n'ajouter une case de consentement que si elle est justifiée par le traitement retenu.
- [ ] Distinguer les demandes précontractuelles des autres messages et de la protection anti-abus pour déterminer les bases légales applicables ; le code ne présume pas que tout repose sur le consentement.
- [ ] Expliquer, pour le formulaire réel, les données indispensables, la raison de leur collecte et les conséquences d'une absence de saisie ; informer aussi sur les droits et le recours auprès d'une autorité.
- [ ] Finaliser et approuver l'Impressum et la Datenschutzerklärung avant d'activer l'indexation ou l'envoi public.

## Accessibilité : obligation à vérifier séparément

- [ ] Examiner le service réellement fourni en ligne au regard du BFSG, notamment la qualification éventuelle de service de commerce électronique ; un simple intitulé « site vitrine » ne suffit pas à conclure.
- [ ] Confirmer l'effectif, le chiffre d'affaires ou le total de bilan avant de conclure à l'exception des microentreprises prestataires de services. Ces données n'ont pas été fournies.
- [ ] Documenter les obligations applicables et, le cas échéant, préparer les informations exigées. WCAG 2.2 AA demeure l'objectif de qualité ; des tests automatisés ne constituent ni un audit intégral ni une attestation de conformité légale.

## Envoi et protection contre les abus

- [ ] Autoriser explicitement la connexion des services et les essais d'e-mail réels.
- [ ] Vérifier le domaine expéditeur Resend et l'adresse destinataire officielle.
- [ ] Configurer les secrets privés listés dans `.env.example`, dont `CONTACT_RATE_LIMIT_SALT` aléatoire d'au moins 32 caractères ; aucun secret `NEXT_PUBLIC_*`.
- [ ] Utiliser une base Redis dédiée ; valider région, droits d'accès et rotation des secrets.
- [ ] Tester la réception réelle autorisée, les erreurs et les timeouts sans journaliser de données personnelles.
- [ ] Tester la limitation distribuée sur plusieurs instances, la fenêtre de 15 minutes et les erreurs `429`/`503`.
- [ ] Vérifier la provenance fiable de l'adresse IP sur l'hébergement final ; hors Vercel, le code utilise un compteur partagé.
- [ ] Vérifier qu'une indisponibilité Redis, une configuration partielle ou un refus Resend empêche tout faux succès.
- [ ] N'activer `CONTACT_FORM_ENABLED=true` qu'après validation de l'ensemble de ces points.

## Recette, domaine et autorisation de déploiement

- [ ] Consulter les résultats effectifs dans [docs/RECETTE.md](docs/RECETTE.md) et traiter toute limite restante.
- [ ] Rejouer lint, typecheck, tests unitaires, build, formatage et parcours Playwright après les dernières modifications.
- [ ] Contrôler les 13 pages, les six slugs, la 404, les liens, la navigation au clavier et le menu mobile.
- [ ] Contrôler l'absence de débordement et la lisibilité à 320, 360, 390, 768, 1024, 1440 et 1920 px, ainsi que les mouvements réduits et le zoom.
- [ ] Mesurer les performances dans des conditions documentées ; ne pas déclarer un score Lighthouse ou une conformité WCAG sans mesure/audit correspondant.
- [ ] Obtenir l'autorisation explicite d'un déploiement de prévisualisation ; protéger l'accès et maintenir `noindex, nofollow`.
- [ ] Obtenir l'autorisation explicite de mise en production sur le domaine confirmé, avec HTTPS et variables propres à cet environnement.
- [ ] Renseigner le domaine confirmé dans `src/config/site.ts` et l'origine HTTPS correspondante dans `NEXT_PUBLIC_SITE_URL`.
- [ ] Après validation complète, régler `SITE_PUBLICATION_READY=true` en production uniquement ; laisser les previews désactivées.
- [ ] Contrôler après déploiement autorisé : canonicals, sitemap, robots, en-tête d'indexation, contacts et formulaire.
- [ ] Prévoir sauvegarde du code, accès aux comptes, responsable de maintenance et procédure de retour arrière.

La décision finale de publication appartient au responsable. Conserver la trace de la validation et des contenus autorisés.

## Sources officielles consultées pour la préparation V2

Vérification documentaire le 21 octobre 2026 ; ces sources orientent les points à confirmer et ne remplacent pas l'examen de la situation de l'entreprise.

- [§ 5 DDG — informations du fournisseur](https://www.gesetze-im-internet.de/ddg/__5.html) : identité, adresse, e-mail et mentions conditionnelles.
- [RGPD, article 13 — EUR-Lex](https://eur-lex.europa.eu/legal-content/DE-EN/TXT/?from=de&uri=CELEX%3A32016R0679) : contenu de l'information au moment de la collecte.
- [BfDI — droits des personnes](https://www.bfdi.bund.de/SharedDocs/Downloads/DE/Flyer/Recht-auf-Datenschutz.pdf?__blob=publicationFile&v=3) : droits et conditions d'exercice.
- [§ 25 TDDDG — texte officiel, pages 21–22](https://www.gesetze-im-internet.de/ttdsg/TDDDG.pdf) : consentement au stockage/accès au terminal et exceptions.
- [§ 36 VSBG](https://www.gesetze-im-internet.de/vsbg/__36.html) : information sur la médiation et exception conditionnelle.
- [BFSG, champ et définitions](https://www.gesetze-im-internet.de/bfsg/BJNR297010021.html) et [§ 3 BFSG](https://www.gesetze-im-internet.de/bfsg/__3.html) : examen des services concernés et de l'exception des microentreprises.
- [LfDI Rheinland-Pfalz — voie de réclamation](https://www.datenschutz.rlp.de/themen/online-services/beschwerdeformular) : lien ajouté à la page Datenschutz, sans transmission automatique au chargement.
