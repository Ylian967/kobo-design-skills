# Plan de parcours — Chez Odile (reprise)

Écrit le 6 octobre 2026 d'après les réponses du client. Rejoué à la vérification (`quality/ux-grille.md`).

## Profils

- **P1** Habitant du quartier, 30–60 ans, connaît la maison — téléphone le soir, ordinateur au bureau le midi — revient de temps en temps — sans compte.
- **P2** Visiteur de passage, 30–60 ans, ne connaît pas la maison — téléphone — une fois — sans compte.

Aucun compte client : tout se fait sans se connecter.

## Tâches et parcours

### T1 (P1, P2) Voir la carte de la semaine et les prix

- entrée : accueil
- étapes : 0 — les plats de la semaine et les prix sont sur l'accueil, en faisant défiler. Carte complète : 1. accueil → toucher « Voir la carte, les horaires et l'adresse ».
- **objectif : 1 étape sur téléphone**
- vide : sans objet (la carte est écrite dans la page). erreur : sans objet. succès : la carte se lit, le bouton « Réserver une table » est à portée. déconnecté : sans objet.
- avant : **jouable** (1 étape).
- fiche : aucune (lecture simple).

### T2 (P1, P2) Réserver une table de 1 à 6 personnes

- entrée : accueil (ou n'importe quelle page : même bouton dans la barre et en fin de page)
- étapes :
  1. n'importe quelle page → toucher « Réserver une table » ;
  2. page Réserver → toucher le jour (sauté si c'est le premier jour proposé) ;
  3. → choisir le nombre de personnes (sauté pour 2, proposé d'avance) ;
  4. → toucher une heure d'arrivée ;
  5. → remplir et envoyer (3 champs : nom, téléphone, message facultatif).
- **objectif : 5 étapes au plus sur téléphone, 3 au plus court ; 3 champs**
- vide : un jour sans table en ligne (trop tard pour aujourd'hui) le dit et propose le prochain jour.
- complet : le service reste affiché, « Complet » écrit, heures désactivées, phrase qui propose l'autre service ou un autre jour.
- erreur : champ vide ou téléphone faux → message écrit sous le champ, valeurs gardées ; service rempli entre-temps → message écrit, rien n'est perdu, les heures se mettent à jour.
- succès : dans la page, sans changer d'écran : jour, heure, nombre, nom, référence ; « Rien d'autre à faire » ; boutons « Annuler cette réservation » et « Voir ma réservation ».
- déconnecté : sans objet (pas de compte).
- plus de 6 personnes : la page le dit et donne le téléphone, avec les heures où Karim répond.
- avant : **absent** (le bouton lançait un appel téléphonique).
- fiche : `ux/patterns/domaines/reservation-creneaux.md`

### T3 (P1, P2) Retrouver sa réservation et l'annuler

- entrée : n'importe quelle page, lien « Ma réservation » de la barre (ou l'écran de succès de T2)
- étapes : 1. barre → toucher « Ma réservation » ; 2. → toucher « Annuler » ; 3. fenêtre qui redit le jour et l'heure → toucher « Oui, annuler ».
- **objectif : 3 étapes sur téléphone** (2 depuis la page Ma réservation, comme la fiche)
- vide : « Aucune réservation enregistrée sur cet appareil » + bouton « Réserver une table » + téléphone si la réservation a été faite ailleurs.
- erreur : sans objet tant que l'envoi est simulé. succès : la réservation disparaît de la liste, un message confirme, la table est rendue. défaire l'annulation : réserver à nouveau (dit dans le message).
- modifier : annuler puis réserver à nouveau (décision prise pour le client, « au plus simple »).
- avant : **absent**.
- fiche : `ux/patterns/domaines/reservation-creneaux.md`

### T4 (P1, P2) Trouver les horaires et l'adresse

- entrée : accueil
- étapes : 1. accueil → toucher « La carte et les infos pratiques » (menu) ou le lien sous les plats ; 2. (facultatif) → toucher « Ouvrir dans Google Maps ».
- **objectif : 2 étapes sur téléphone** (1 pour lire, 1 pour l'itinéraire)
- vide, erreur, déconnecté : sans objet. succès : horaires et adresse lus, itinéraire ouvert.
- avant : **jouable** (2 étapes).
- fiche : `ux/patterns/domaines/contact-devis.md` (moyens de contact, horaires)

### T5 (P1, P2) Appeler (plus de 6 personnes, ou pour le jour même)

- entrée : page Réserver, page La carte, ou pied de n'importe quelle page
- étapes : 1. toucher le numéro (lien `tel:`).
- **objectif : 1 étape sur téléphone** depuis ces endroits
- état « fermé » : partout où le numéro est proposé pour réserver, il est écrit que Karim répond du mardi au samedi en dehors du service (12 h – 14 h et 19 h 30 – 22 h).
- avant : **jouable** (1 étape), mais sans dire quand on répond.
- fiche : `ux/patterns/domaines/contact-devis.md`

## Écrans du projet (déduits des parcours)

- **Accueil** (`index.html`) : sert T1, départ de T2, T3, T4.
- **La carte et les infos pratiques** (`carte.html`) : sert T1, T4, T5.
- **Réserver une table** (`reserver.html`, nouvelle) : sert T2, T5.
- **Ma réservation** (`ma-reservation.html`, nouvelle) : sert T3.

## Règles décidées pour le client (« décidez au plus simple »)

- Heures d'arrivée : midi 12 h, 12 h 30, 13 h, 13 h 30 ; soir 19 h 30, 20 h, 20 h 30, 21 h.
- Le jour même : en ligne jusqu'à 1 heure avant le début du service (11 h, 18 h 30) ; ensuite, téléphone.
- Jusqu'à 30 jours à l'avance, du mardi au samedi.
- Confirmation immédiate tant qu'il reste des couverts (28 par service).
- On demande : nom, téléphone, message facultatif. Pas d'e-mail.
- Annulation libre jusqu'à l'heure du repas ; modifier = annuler puis réserver.

## Ce qui n'est pas fait, et pourquoi

- Compte client, connexion : le client n'en veut pas.
- Retrouver sa réservation depuis un autre appareil : demande un vrai système de réservation (envoi simulé pour l'instant) ; en attendant, téléphone.
- E-mail ou SMS de confirmation : rien ne part pour l'instant.
- Recherche, filtres, calendrier mensuel : aucune tâche ne les demande.
- Écran de gestion pour Karim : non demandé ; à prévoir le jour où l'envoi devient réel.
- Paiement, acompte : non demandé.
