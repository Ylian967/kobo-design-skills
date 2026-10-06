# Audit UX des exemples (6 octobre 2026)

La vérification de `ux-grille.md`, passée après coup sur les cinq exemples construits avant qu'elle existe. **Rien n'est corrigé ici** : ce fichier liste les problèmes de parcours. Le sixième exemple, `club-escalade`, a été refait ; son ancien état est rappelé en tête parce que c'est lui qui a fait écrire la méthode.

Conditions : pages servies en local, Chrome piloté par Playwright. Passe « doigt » : 390 × 844 px, évènements tactiles simulés (`innerWidth` 390 et `pointer: coarse` vérifiés). Passe « clavier » : 1440 × 900 px, sans clic. Captures dans `ux-audit-exemples/`.

**Limite commune aux cinq.** Aucun n'a de `parcours.md` : les profils et les tâches ci-dessous sont **reconstitués par moi** d'après la demande d'origine, pas validés par un client. Les objectifs d'étapes sont ceux des fiches de domaine. Les liens `mailto:`, `tel:` et les adresses extérieures n'ont pas été suivis (ils ouvrent la messagerie ou quittent le site) : leur cible a été lue, pas jouée.

## Rappel : l'ancien `club-escalade` (remplacé)

Skill `clear-ledger-desk`, structure `application`. Relevé par Ylian, et retrouvé dans les fichiers de l'ancien exemple :

| Problème | Heuristique ou fiche |
|---|---|
| Un style d'outil d'employé pour des grimpeurs, choisi parce que le projet était classé « fonctionnel » ; page publique sans énergie | `catalogue.md`, choix selon le public |
| Aucun chemin pour le non-membre : ni adhésion, ni séance découverte, ni connexion ; « Réserver » menait à l'espace membre | `adhesion-inscription.md` ; N3, mur sans porte |
| Réserver = un tableau de 25 lignes et quatre filtres | `reservation-creneaux.md` ; N8 ; NN/g, tables sur mobile |
| Ni « Mes réservations » ni annulation | N3, N6 |
| Raccourcis clavier, barre latérale, recherche : sans tâche pour les justifier | N8 |

## Vue d'ensemble

| Exemple | Nature | Tâche principale | Jouée | Verdict |
|---|---|---|---|---|
| `festival-lyon` | site public, landing | acheter un billet | jusqu'au lien sortant | **à corriger** |
| `reprise-poterie` | site public, une page | réserver une séance | jusqu'au lien `mailto:` | **à corriger** |
| `cabinet-architectes` | site public, deux pages | prendre contact | jusqu'au lien `mailto:` | **à corriger** |
| `restaurant-react` | site public, deux pages | réserver une table | jusqu'au lien `tel:` | **à corriger** (léger) |
| `crm-pme` | outil interne | trouver une affaire, changer son étape, en créer une | oui au clavier ; au doigt en partie | **à corriger** |

Aucun des cinq ne passe « parcours OK ». Trois ont le même défaut de fond : **la tâche principale sort du site sans que le site dise ce qui se passe ensuite.**

## `festival-lyon` — Nuits Basses (nocturne-architecture, landing)

Profils reconstitués : festivalier sur téléphone, venu d'un réseau social, une fois. Tâches : T1 acheter un billet ; T2 savoir qui joue quel soir ; T3 savoir comment venir et ce qu'on peut apporter.

| Tâche | Entrée | 390 px, doigt | Plus petite cible | 1440 px, clavier | Résultat |
|---|---|---|---|---|---|
| T1 Acheter un billet | accueil | 1 touche (bouton à 457 px du haut, dans le premier écran) ; objectif 2 | 151 × 48 | 7 Tab puis Entrée | lien sortant non suivi ; **à corriger** |
| T2 Qui joue samedi | accueil | 2 touches par le menu (Menu, Programmation) ou défilement | 113 × 48 | lien de barre | OK |
| T3 Venir, entrée | accueil | 3 touches (Menu, Pratique, onglet) | 64 × 44 | flèches entre onglets | OK, voir la remarque |

Problèmes :

1. **Les trois billets ne se choisissent pas.** La section « Trois billets » donne trois prix (32 €, 54 €, 26 € réduit) mais aucun n'est une action : le seul bouton est un lien général vers la billetterie, en haut ou tout en bas (5003 px). Celui qui vient de choisir son pass doit repartir chercher le bouton. (N6 ; `boutique-panier.md`, fiche produit.)
2. **Le premier bouton ne dit pas qu'on quitte le site.** Seule la dernière section l'écrit (« La billetterie est tenue par notre prestataire »). (N1, N2.)
3. **Aucun état de succès ni de retour** : après l'achat, rien ne ramène au festival ; pas de « j'ai déjà mon billet » ni de contact billetterie près du bouton. Non vérifiable ici : la billetterie est une adresse fictive. (N1, N3.)
4. **Rien pour le jour d'après la vente** : billetterie fermée ou complète, la page n'a pas d'état prévu. (N1, N5.)
5. La page a bougé de 32 px une seconde après un défilement vers les onglets : le premier toucher a manqué « Entrée », le second l'a atteint. Vu une fois, cause non cherchée. (M6 de la grille.)
6. Contour de focus de 1,6 px (la liste anti-slop, U8, demande 2 px). Vu aussi sur `crm-pme`.

## `reprise-poterie` — Terre & Feu (serif-bistro-green, reprise)

Profils reconstitués : curieux qui veut essayer le tour, sur téléphone, une fois ; ancien élève qui revient en atelier libre. Tâches : T1 réserver une séance découverte ; T2 connaître les formules et les prix ; T3 savoir quand et où.

| Tâche | Entrée | 390 px, doigt | Plus petite cible | 1440 px, clavier | Résultat |
|---|---|---|---|---|---|
| T1 Réserver une séance | accueil | 1 touche (bouton à 722 px, premier écran) puis **un e-mail à écrire** ; objectif `adhesion-inscription.md` : 4 étapes, 4 champs | 210 × 54 | 7 Tab puis Entrée | `mailto:` non suivi ; **à corriger** |
| T2 Formules et prix | accueil | 2 touches (Menu, Formules et tarifs) | 137 × 54 | lien de barre | OK |
| T3 Horaires, adresse | accueil | 2 touches | 137 × 54 | lien de barre | OK |

Problèmes :

1. **« Réserver » est un e-mail vide à rédiger.** Le libellé est honnête (« Écrire pour réserver »), mais la personne doit écrire elle-même la formule et le jour ; seul l'objet est prérempli. Sur un ordinateur sans messagerie réglée, le bouton ne fait rien et rien ne le dit. (`prise-de-rendez-vous.md`, dernière ligne des erreurs ; N1, N9.)
2. **Aucune date, aucune place restante.** Les groupes font six personnes au plus, la découverte a lieu le samedi : on écrit sans savoir s'il reste de la place. (`adhesion-inscription.md`, « date d'essai complète » ; N1.)
3. **Aucun délai de réponse écrit.** (GOV.UK, contact : dire quand on répond.)
4. **Le téléphone n'est pas proposé à côté de l'action.** Il est dans la section « Venir », pas dans « Réserver une séance », qui dit seulement « par e-mail ». (GOV.UK, contact : laisser choisir le canal.)
5. **Aucun état de succès** : la tâche finit hors du site. (N1.)
6. Liens de téléphone et d'e-mail dans le texte : 21 px de haut à 390 px (ceux du pied de page font 44 px). Liens dans une phrase, donc hors du critère 2.5.8, mais sous les 44 px de la grille (M1).

## `cabinet-architectes` — Atelier Sorbier (glass-frame-estate, site vitrine, marque)

Profils reconstitués : particulier avec un projet de maison ou d'extension, sur ordinateur ou téléphone, une fois ; élu d'une petite commune. Tâches : T1 prendre un premier contact ; T2 voir des projets comparables au sien ; T3 savoir qui sont les architectes et comment ils travaillent.

| Tâche | Entrée | 390 px, doigt | Plus petite cible | 1440 px, clavier | Résultat |
|---|---|---|---|---|---|
| T1 Prendre contact | accueil | 1 touche (bouton à 649 px) puis un e-mail à écrire ; objectif `contact-devis.md` : 3 étapes | 240 × 50 | 6 Tab puis Entrée | `mailto:` non suivi ; **à corriger** |
| T2 Voir les projets | accueil | 2 touches (Menu, Projets) | 152 × 50 | lien de barre | à corriger (point 3) |
| T3 L'agence | accueil | 2 touches | 152 × 50 | lien de barre | OK |

Problèmes :

1. **Même défaut que la poterie** : contact par `mailto:` seul, sans délai de réponse, sans état de succès, sans repli quand aucune messagerie n'est réglée. Ici le téléphone est bien à côté du bouton (« Ou par téléphone », 26 px de haut). (GOV.UK, contact ; N1.)
2. **Aucun horaire** : on ne sait pas quand appeler. (GOV.UK, contact.)
3. **Les projets ne mènent nulle part.** Quatre projets avec quatre faits chacun et une photo provisoire ; aucun n'est une destination. La tâche « voir un projet proche du mien » s'arrête à une vignette. À dire au client : c'est peut-être voulu, mais ce n'est écrit nulle part. (N6.)
4. **Rien n'aide à préparer le contact** : la page ne dit pas quoi écrire (terrain, budget, délai), alors que la méthode de l'agence est décrite sur l'autre page. (`contact-devis.md`, devis ; N10.)
5. Liens de crédit photo de 17 px, téléphone et e-mail du texte de 19 px ; la zone du nom dans la barre (35 px) n'est pas agrandie, contrairement aux trois autres sites.

## `restaurant-react` — Chez Odile (retro-mission-poster, site vitrine, React)

Profils reconstitués : habitant du quartier ou visiteur, sur téléphone, qui veut une table cette semaine ; quelqu'un qui regarde la carte avant de décider. Tâches : T1 réserver une table ; T2 lire la carte et les prix ; T3 horaires et adresse.

| Tâche | Entrée | 390 px, doigt | Plus petite cible | 1440 px, clavier | Résultat |
|---|---|---|---|---|---|
| T1 Réserver une table | accueil | 1 touche (bouton `tel:` à 758 px, premier écran) ; objectif 1 | 279 × 44 | 5 Tab puis Entrée | OK au téléphone ; **à corriger** à l'ordinateur |
| T2 Lire la carte | accueil | 2 touches (Menu, La carte) | 124 × 44 | lien de barre | OK |
| T3 Horaires, adresse | page carte | sommaire de page, 1 touche | 269 × 44 | liens | OK |

C'est le parcours le plus juste des cinq : une touche pour appeler, le numéro écrit dans le bouton. Problèmes :

1. **À l'ordinateur, l'action principale est un lien `tel:`** : sur la plupart des postes il n'ouvre rien d'utile. Le numéro se lit dans le libellé, donc la tâche reste faisable, mais le bouton est mort. (N1, N4.)
2. **Aucun autre canal quand le restaurant est fermé** (dimanche, lundi, hors service) : ni e-mail ni message. La page d'accueil ne redit pas les heures où l'on répond. (GOV.UK, contact.)
3. **Quatre cartes de plats, une seule destination** : chaque plat de l'accueil est un lien vers `carte.html#plats`. Quatre arrêts de tabulation et quatre cibles pour la même page ; la carte promet un détail qui n'existe pas. (N4, N8.)
4. Fil d'Ariane « Accueil » de 19 px, lien « Ouvrir dans Google Maps » de 26 px. Le nom dans la barre fait 15 px mais sa zone cliquable est bien agrandie (toucher 6 px au-dessus : atteint).

## `crm-pme` — Rivage Suivi (clear-ledger-desk, application)

C'est bien un outil interne (commerciaux d'une PME, ordinateur, toute la journée) : le skill et la structure sont les bons. Tâches reconstituées : T1 trouver une affaire ; T2 changer son étape ; T3 créer une affaire. Objectif de `outil-interne.md` : le geste le plus fréquent en 3 étapes au plus, au clavier seul.

| Tâche | Entrée | 1440 px, clavier | 390 px, doigt | Résultat |
|---|---|---|---|---|
| T1 Trouver une affaire | liste | `/` puis saisie : le compte de résultats est annoncé (« 4 affaires affichées sur 24 ») | recherche visible | OK ; **à corriger** pour la suite (point 1) |
| T2 Changer l'étape | liste | Entrée sur la ligne, liste « Étape », notification écrite : 2 étapes | non joué (point 5) | **à corriger** (points 2 et 3) |
| T3 Créer une affaire | liste | bouton, 4 champs obligatoires, Entrée : 3 étapes ; envoi vide : quatre erreurs écrites, focus sur le premier champ ; la ligne apparaît (24 → 25), notification | bouton de 32 px | OK ; **à corriger** (point 4) |

Problèmes :

1. **De la recherche à la liste : 16 tabulations.** Flèche bas dans le champ de recherche ne descend pas dans les résultats ; il faut traverser le bouton d'aide, la barre latérale, les filtres et les six en-têtes de colonne avant la première ligne. Les flèches ne marchent qu'une fois dans le tableau. La tâche la plus fréquente d'un outil au clavier bute là. (N7 ; `outil-interne.md`, objectif.)
2. **Une affaire passée à « Gagnée » disparaît de la liste** (filtre « Affaires ouvertes »). La notification le dit, mais le panneau n'offre que « Fermer le détail » : pour revenir en arrière il faut changer de filtre et retrouver l'affaire. (N3.)
3. **Après cette disparition, Échap laisse le focus sur le corps de la page** : au clavier, on repart du haut. Vu une fois. (`ux/patterns/etats-de-page.md`, règle 7.)
4. **Créer ne se défait pas, et rien ne se modifie hors l'étape** : ni suppression, ni archivage, ni correction du montant ou du nom d'une affaire créée par erreur. (N3.) À l'ouverture de la fenêtre, le focus est sur « Fermer la fenêtre », pas sur le premier champ.
5. **À 390 px, le premier écran est fait de l'en-tête et des filtres** : la première ligne du tableau est à 832 px sur 844 (capture `ux-audit-exemples/crm-390.png`). Le tableau fait 1002 px de large dans une zone qui défile : six colonnes. Boutons de 32 px, listes de 40 px. Mon toucher sur la première ligne est tombé hors de l'écran : **l'ouverture du détail au doigt n'a pas été jouée**. Le téléphone n'est pas l'appareil de cet outil ; c'est à dire au client plutôt qu'à corriger d'abord. (NN/g, tables sur mobile.)
6. **Une barre latérale pour une seule vue** (« Affaires 16 ») et son raccourci `[` pour la replier : aucune tâche ne les demande. (N8 ; `outil-interne.md`, « plus de cinq vues ».)

## Ce que l'audit dit du skill

| Constat | Exemples | Suite possible (non faite) |
|---|---|---|
| L'action principale est un `mailto:`, un `tel:` ou un lien sortant, et le site n'a ni état de succès, ni délai de réponse, ni repli | poterie, cabinet, festival, restaurant | Un formulaire de contact ou de réservation avec confirmation ; à défaut, le délai et le second canal écrits à côté du bouton |
| Des prix ou des éléments affichés qui ne sont pas des actions alors que la tâche est de les choisir | festival (billets), cabinet (projets), restaurant (plats) | Chaque choix du plan devient une cible, ou la page dit qu'il n'y a rien derrière |
| Aucun plan de parcours : on ne sait pas ce que la page devait permettre | les cinq | `parcours.md` à écrire avec un client avant toute correction |
| Cibles de texte sous 44 px (liens dans une phrase, crédits, fil d'Ariane) | les cinq | À traiter dans les composants (`k-prose`, `fil-ariane`), pas page par page |
| Contour de focus de 1,6 px | festival, crm (les deux mesurés) | À mesurer sur les autres skills |

## Ce qui reste incertain

- Les profils et les tâches sont de moi : un vrai client en aurait peut-être d'autres, et certains « problèmes » sont peut-être des choix (un restaurant qui ne veut que le téléphone).
- Le contour de focus n'a été mesuré que sur deux exemples ; ma détection automatique sur les trois autres n'était pas fiable, je ne conclus pas.
- Le saut de mise en page du festival et la perte de focus du CRM ont été vus une seule fois chacun.
- Rien n'a été joué sur un vrai téléphone ni avec un lecteur d'écran. Les liens sortants, `mailto:` et `tel:` n'ont pas été suivis.
