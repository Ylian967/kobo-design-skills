# Prise de rendez-vous

Prendre rendez-vous avec une personne ou un service : soin, conseil, visite, essayage. À la différence d'un créneau collectif (`reservation-creneaux.md`), le rendez-vous est à un seul, souvent pris **une fois**, souvent **sans compte**. Sources : marques de `README.md` ; aucune ne traite ce parcours en détail en accès libre, les règles marquées « déduit » sont des applications par nous.

## Écrans attendus

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Quoi** | Le motif ou la prestation, avec sa durée et son prix. Sauté s'il n'y en a qu'un | [G-question] une chose par écran ; [B-abandon] prix visible d'avance |
| **Quand** | Les prochains jours qui ont de la place, puis les heures libres du jour choisi, en boutons. Le premier jour libre est choisi d'avance | [B-creneau] hiérarchie jour puis heure ; [G-dates] choix visuel pour une date proche |
| **Qui** | Nom, e-mail ou téléphone, un mot facultatif. **Après** avoir vu les disponibilités | [G-compte] laisser utiliser le plus possible avant de demander ; [NN-form] point 1 |
| **Relecture** | Prestation, jour, heure, lieu, coordonnées, avec « Modifier » | [G-relire] |
| **Confirmation** | Le rendez-vous en toutes lettres, une référence, comment annuler ou déplacer, un contact | [G-confirmation] ; [G-compte] : pour un acte ponctuel, une référence envoyée remplace le compte |

## Parcours

Entrée : l'action principale du site (« Prendre rendez-vous »).

1. Choisir la prestation (sauté s'il n'y en a qu'une).
2. Choisir le jour.
3. Choisir l'heure.
4. Donner ses coordonnées.
5. Relire et confirmer.

**Objectif à écrire dans le plan : 5 étapes au plus** depuis l'accueil, 4 champs au plus. Annuler ou déplacer : depuis le lien de la confirmation, 2 étapes, sans compte.

## États

| État | Rendu | Source |
|---|---|---|
| Aucune disponibilité ce jour | Le jour est affiché, marqué « Complet », non choisissable | [N1], [N5] |
| Aucune disponibilité proche | Dit la première date libre et donne le téléphone | [N9], [G-contact] |
| Heure prise entre-temps | Message écrit, retour au choix de l'heure, les coordonnées déjà saisies sont gardées | [N9], [W-ressaisie] |
| Succès | Écran de confirmation qui reste (pas une notification qui disparaît) | [G-confirmation] |
| Déconnecté | Cas normal : aucun compte n'est demandé | [G-compte], [NN-mur] |

## Sur téléphone

- Les jours en rangée, les heures en grille de boutons de 44 px au moins, espacés [W-cible], [NN-doigt].
- Regrouper les heures (matin, après-midi) quand il y en a plus d'une douzaine ; déduit de [N8] et de [B-creneau].
- Un calendrier mensuel seulement si l'on réserve à plus de deux semaines ; et jamais comme seul moyen de saisie [G-dates].
- Le fuseau, l'adresse et la durée sont écrits sur l'écran de l'heure ; déduit de [N2] et de [N5].

## Erreurs fréquentes

| Erreur | Pourquoi | Source |
|---|---|---|
| Coordonnées demandées avant de montrer les disponibilités | Effort demandé avant de savoir si une date convient | [G-compte], [NN-mur] |
| Compte obligatoire pour un rendez-vous ponctuel | Barrière sans contrepartie | [G-compte] |
| Calendrier d'un mois plein de jours grisés | Les possibilités se voient mal et sont sous-estimées | [B-creneau], [G-dates] |
| Heures dans une liste déroulante | Les choix ne sont pas visibles ensemble | [N6] |
| Pas de moyen d'annuler | La personne ne vient pas, ou téléphone | [N3] |
| Formulaire de contact baptisé « prise de rendez-vous » (on écrit, quelqu'un rappelle) | Ce n'est pas le parcours annoncé : appelle-le « Demander un rendez-vous », dis le délai de réponse, et suis `contact-devis.md` | [N2], [N4] |

## Composants

`bouton-radio` (prestation, jour, heure), `champ`, `bouton`, `notification` (erreur), `etat-vide`. Pas de `selection` pour les heures.

## Ce que kobo-studio ne fait pas

Aucun agenda réel : les disponibilités d'un exemple sont écrites dans la page. À dire au client sous « Inventé ».
