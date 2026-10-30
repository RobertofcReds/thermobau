# Coordonnées et chat local — recette du 30 octobre 2026

Les coordonnées fournies sont affichées dans les trois langues à partir de `src/config/site.ts` : **+49 176 41504088** pour le téléphone et WhatsApp, **thermo_bau@web.de** pour l'e-mail. Les liens utilisent respectivement `tel:+4917641504088`, `https://wa.me/4917641504088` et `mailto:thermo_bau@web.de`.

Le bouton Chat apparaît sur toutes les pages. Son panneau est chargé à la première ouverture. L'assistant propose des réponses préparées sur les six métiers, les contacts, la préparation d'un projet et les limites du site. Il reconnaît des formulations allemandes, anglaises et françaises et adapte ses réponses. Il ne s'agit pas encore d'une IA générative : les questions non reconnues renvoient aux informations disponibles et au contact de l'entreprise.

Le moteur local n'effectue aucun appel réseau. Les messages restent en mémoire dans le navigateur, persistent pendant une fermeture/réouverture du panneau et disparaissent à l'effacement ou au rechargement. Aucun stockage local ou de session ne conserve les messages. La politique de confidentialité explique ce fonctionnement dans les trois langues. Aucun message réel, appel ou e-mail n'a été envoyé pendant la recette.

## Vérifications réalisées

- Tests unitaires : **247 réussis**, dont 45 sur le moteur du chat.
- Tests navigateur Chrome/Playwright : **72 réussis** sur le build de production, couvrant notamment les 42 pages, les changements de langue et l'actualisation, les coordonnées, les réponses DE/EN/FR, l'absence de transmission des messages et leur effacement.
- Navigation au clavier : Tab et Maj+Tab restent dans le dialogue, Échap le ferme et restitue le focus au bouton Chat. Vérification mobile à 320 et 390 px, y compris avec le panneau de confidentialité affiché.
- Contrôles axe du dialogue ouvert et des pages testées réussis ; contraste du libellé WhatsApp corrigé dans le footer. Ces contrôles automatisés ne constituent pas un audit exhaustif d'accessibilité.
- Build de production, TypeScript, ESLint et Prettier réussis.

Le test de navigation depuis le hero utilise la préférence de réduction des mouvements pour tester les liens indépendamment de l'animation continue des boutons. Les tests dédiés au hero vérifient séparément l'animation et la pause.

Captures vérifiées visuellement : [chat ordinateur](preview/chat/chat-desktop.png), [chat mobile 390 px](preview/chat/chat-mobile-390.png), [chat mobile 320 px](preview/chat/chat-mobile-320.png).

## Branchement ultérieur d'une API IA

La fonction `answerQuestion` de `src/lib/chat-assistant.ts` fournit le contrat `ChatReply` utilisé par le panneau. Un futur adaptateur serveur pourra conserver ce contrat et remplacer les réponses locales. Le fournisseur, sa clé secrète côté serveur, les limites de requêtes, les erreurs réseau, les données de référence et les informations de confidentialité devront être configurés lors de cette évolution. Aucune clé API n'est nécessaire pour la version actuelle.
