# Réservation de créneaux

Réserver une place dans un créneau à horaire fixe : cours, séance, salle, terrain, table. La personne revient souvent ; le geste doit être court. Sources : marques de `README.md`.

## Écrans attendus

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Choix du jour, puis créneaux du jour** | Les prochains jours en rangée (aujourd'hui choisi d'avance), puis les créneaux de ce jour en **cartes empilées** : heure, nom de l'activité, places restantes, un bouton « Réserver » par carte | [B-creneau] hiérarchie claire jour puis heure ; [G-dates] un choix visuel de date convient à une date proche ; [N6] tout est visible, rien à retenir |
| **Confirmation** | Dans la page, sans changer d'écran : la carte passe à « Réservé », un message dit le jour, l'heure et comment annuler | [N1] état visible ; [G-confirmation] dire ce qui se passe ensuite |
| **Mes réservations** | La liste de ce que j'ai réservé, à venir d'abord, avec « Annuler » sur chaque ligne | [N3] contrôle et liberté ; [N6] |
| **Annulation** | Une confirmation courte qui redit le créneau ; puis la place est rendue et la liste mise à jour | [N5] prévenir l'erreur ; [N3] |

Pas d'écran de recherche, pas de tableau de bord : un membre connaît son club.

## Parcours

Entrée : l'écran d'arrivée après connexion est **déjà** l'écran des créneaux, sur aujourd'hui.

1. Toucher le jour (étape sautée si c'est aujourd'hui).
2. Toucher « Réserver » sur la carte du créneau.
3. Au plus une confirmation, seulement si réserver engage (paiement, place décomptée d'un carnet).

**Objectif à écrire dans le plan : 3 touches au plus sur téléphone**, 2 quand la réservation est gratuite et annulable (l'annulation facile remplace la confirmation : [N3] plutôt que [N5]). Annuler : 2 touches depuis « Mes réservations » (« Annuler », puis confirmer).

## États

| État | Rendu | Source |
|---|---|---|
| Aucun créneau ce jour | État vide qui le dit et propose le prochain jour qui en a | [N1], [N9] |
| Créneau complet | La carte reste affichée, « Complet » écrit, bouton désactivé ; liste d'attente seulement si le club en a une | [N1], [N5] |
| Déjà réservé par moi | « Réservé » écrit sur la carte, et « Annuler » à la place de « Réserver » | [N1], [N3] |
| Quota atteint (trois par semaine…) | Le bouton est désactivé **et** une phrase dit pourquoi et quand cela se libère | [N5], [N9] |
| Créneau pris entre-temps | Message écrit, la carte passe à « Complet », rien d'autre n'est perdu | [N9] |
| Aucune réservation | « Mes réservations » vide : une phrase et un lien vers les créneaux | [N1] |
| Déconnecté | Les créneaux restent **lisibles** ; « Réserver » mène à la connexion, puis revient au créneau | [NN-mur] ; [G-compte] laisser utiliser le plus possible avant le compte |

## Sur téléphone

- **Des cartes, pas un tableau.** Au-delà de deux ou trois colonnes un tableau ne se lit plus à 390 px [NN-tableau-mobile]. Une carte par créneau, sur toute la largeur.
- Le bouton « Réserver » fait au moins 44 px de haut, et deux boutons ne se touchent pas [W-cible], [NN-doigt].
- La rangée des jours tient dans la largeur ou défile en montrant un jour coupé au bord, pour qu'on voie qu'il y en a d'autres [NN-tableau-mobile, « indiquer le défilement horizontal »].
- Le nombre de créneaux d'un jour est petit : **aucun filtre** tant qu'ils tiennent en deux écrans. Un seul filtre (l'activité) au-delà ; déduit de [N8].

## Erreurs fréquentes

| Erreur | Pourquoi c'est une erreur | Source |
|---|---|---|
| Tous les créneaux de la semaine dans un tableau de 25 lignes | Il faut lire toute la semaine pour trouver jeudi ; illisible à 390 px | [club], [NN-tableau-mobile], [B-creneau] |
| Quatre filtres (jour, activité, niveau, état) au-dessus de 25 lignes | Le jour suffit à ramener la liste à cinq lignes ; les autres filtres sont du bruit | [club], [N8] |
| Pas de « Mes réservations », pas d'annulation | On ne peut ni vérifier ni défaire | [club], [N3] |
| Réserver ouvre un panneau de détail, puis demande de valider | Deux écrans pour un choix déjà fait en touchant la carte | [club], [N7] |
| Raccourcis clavier, barre latérale, recherche | Pensés pour un employé à son bureau ; le membre est sur son téléphone, trois fois par semaine | [club], [N8] |
| Calendrier mensuel en entrée | On réserve pour les jours qui viennent : sept jours en rangée suffisent | [G-dates] (date proche), déduit de [N8] |
| Succès dit par une couleur seule | La personne ne sait pas si c'est fait | [N1] |

## Composants

`onglets` (un onglet par jour) ou `bouton-radio` pour le jour ; `carte` ou une liste `k-facts` par créneau ; `bouton` ; `notification` pour la confirmation ; `modale` pour confirmer une annulation ; `etat-vide`. **Pas** `tableau`, pas la structure `application`.
