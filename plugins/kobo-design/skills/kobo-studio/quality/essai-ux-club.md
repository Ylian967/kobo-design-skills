# Essai de la méthode UX : le club d'escalade refait (6 octobre 2026)

Essai fait pour juger la méthode UX (`ux/methode.md`, `ux/patterns/domaines/`, `quality/ux-grille.md`) sur la demande qui l'a fait écrire. Agent neuf, avec seulement `SKILL.md` et la demande : « un club d'escalade associatif à Grenoble : une page pour présenter le club, et un espace où nos membres réservent leurs créneaux ». Je jouais le client (club Les Dalles, 180 membres ; curieux qui veulent essayer, nouveaux adhérents, membres qui réservent chaque semaine sur leur téléphone). Je n'ai soufflé ni les écrans ni le style. Résultat : `examples/club-escalade/` ; l'ancien exemple est décrit dans `ux-audit-exemples.md`.

## Ce qu'on voulait savoir

| Question | Constat |
|---|---|
| Part-il des personnes ? | Oui. Premier tour : qui utilise le site, appareil, fréquence, compte ; il a demandé de lui-même si quelqu'un sans compte devait pouvoir faire quelque chose |
| Écrit-il le plan de parcours avant de choisir un style ? | Oui : 3 profils, 7 tâches, chacune avec entrée, étapes, objectif chiffré, états ; puis la liste des écrans et « ce qui n'est pas fait, et pourquoi » (recherche, filtres, calendrier, tableau de bord). Fiches lues : réservation de créneaux, adhésion, compte ; puis seulement le catalogue |
| Le non-membre a-t-il un chemin ? | Oui : séance découverte (3 étapes, 3 champs, sans compte, annulable) et adhésion en ligne (4 étapes, 5 champs, relecture, paiement simulé) |
| Choisit-il le style selon le public ? | Oui : `zigzag-snack-pop` recommandé pour « énergique, accueillant » et des photos de téléphone, avec ses limites ; `clear-ledger-desk` n'a pas été évoqué. Un seul skill : `full` sur accueil, essayer, adhérer ; `reduced` sur créneaux, mes réservations, connexion |
| Réserver tient-il en 3 touches ? | Oui : **2 touches** (le jour, puis « Réserver »), 1 pour aujourd'hui ; des cartes, aucun tableau, aucun filtre |
| Joue-t-il les parcours ? | Oui : 7 tâches, deux passes chacune, 41 captures dans `captures/parcours/` ; trois défauts trouvés **en jouant** et corrigés (lien « Mes réservations » de 20 px, retour au mauvais jour après connexion, notifications empilées sur un bouton) |

## Rejoué par moi

Navigateur vidé, 390 × 844, toucher simulé (`pointer: coarse` vérifié) : depuis les créneaux sans compte, « Réserver » mène à la connexion puis revient au **même jour** ; connecté, réserver = 2 touches (onglet 68 × 44, bouton 125 × 56), la carte passe à « Réservé » avec « Annuler » et un message donne l'heure limite ; « Mes réservations » = 1 touche ; annuler = 2 touches (confirmation qui redit le créneau), la liste se vide et un message propose « Réserver à nouveau ». `check_studio.py` relancé : 0 erreur, pire contraste 5,68:1. Je n'ai pas rejoué l'adhésion, la séance découverte ni la passe clavier : pour celles-là, les chiffres sont ceux de l'agent.

## Où le skill l'a gêné, et la suite donnée

| Point | Suite |
|---|---|
| Fausse alerte « parcours.md absent » de `check_studio.py` avec un chemin relatif | **Corrigé** |
| Le `toucher()` de la grille attendait une stabilité qui n'arrive pas dans une fenêtre masquée ; six passes perdues | **Corrigé** : `bringToFront`, défilement immédiat, mesure après attente, effet à vérifier après chaque toucher |
| Un `k-link` fait 20 px de haut : trop petit pour une étape de parcours | **Corrigé** dans `SKILL.md` (une étape est un bouton) ; le composant n'est pas changé |
| Impossible de savoir à l'étape c si un skill a une couche mouvement | **Corrigé** : liste dans `catalogue.md` |
| Action principale d'un projet mixte ; compte de démonstration | **Corrigé** dans `SKILL.md` |
| La règle 10 (« le niveau de la démo ») ne peut pas être tenue sous le premier écran par les styles conseillés pour un club : ni couche mouvement, ni gabarit hors héros | **Non corrigé** : c'est le chantier des sections signature, mis en attente. Le catalogue le dit désormais d'avance |
| `data-k-tone="inverse"` sur une section ordinaire, non documenté | Non corrigé |
| README des composants : moment d'initialisation, contenu généré après coup, retour de `Kobo.field.validate`, balisage de l'erreur d'un groupe radio | Non corrigé |
| Notifications qui s'empilent et recouvrent un bouton à 390 px | Non corrigé dans le composant (contourné dans le projet : une seule à la fois) |
| Modale : Tab passe par l'interface du navigateur entre le dernier et le premier bouton | Non vérifié par moi, non corrigé |
| `k-link` posé à côté du bouton du héros : retiré sans prévenir par le gabarit de zigzag | Non corrigé |
| La carte cliquable grandit au survol avec zigzag, contre son README | Non corrigé |
| Dix README de composants à lire (39 Ko) à l'étape d | Non corrigé |

## Ce que l'essai ne dit pas

Un seul agent, une seule demande, et un client (moi) qui connaissait les attendus : mes réponses ont pu orienter le plan, même sans souffler les écrans. Les six autres fiches de domaine (boutique, contact, rendez-vous, outil interne) n'ont été exercées par aucun essai. Connexion, paiement et réservations sont simulés dans le navigateur. Rien au vrai doigt, pas de lecteur d'écran, Chrome seulement.
