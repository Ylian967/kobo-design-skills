# Terre & Feu — plan de parcours

Écrit le 6 octobre 2026 d'après les réponses de Maëlle Guivarch. À rejouer à la vérification (`quality/ux-grille.md`).
État : **validé par la cliente le 6 octobre 2026** (atelier libre par téléphone et e-mail ; découverte le samedi 10 h – 13 h ; dates du mercredi et des cycles : exemples à signaler ; aucun délai de réponse écrit).

## Profils

- **P1 — La curieuse ou le curieux.** Veut essayer le tour une fois, souvent pour un cadeau ou une sortie à deux ; ne connaît pas l'atelier. Téléphone. Une fois. Sans compte.
- **P2 — L'élève ou l'ancien élève.** Connaît l'atelier ; s'inscrit à un cycle de six séances, vient avec son enfant, revient en atelier libre. Téléphone. Quelques fois par an. Sans compte (Maëlle ne veut pas gérer de comptes).
- **P3 — Maëlle, la céramiste.** Veut savoir qui vient sans répondre à chaque message. Téléphone ou ordinateur de l'atelier. Chaque jour de cours. Un code d'accès unique (simulé).

## Règles décidées (la cliente a répondu « décidez »)

- Pas de compte client : une réservation se retrouve avec son **numéro** (donné à la confirmation, et dans le lien de l'e-mail) et l'adresse e-mail.
- Réservation **confirmée tout de suite**, sans validation de Maëlle. Paiement sur place.
- Six personnes par séance ; on réserve de 1 à 6 places d'un coup, dans la limite des places restantes. Parent-enfant : trois duos (six personnes).
- Dates ouvertes sur les six semaines à venir, réservables jusqu'à la veille.
- Séance complète : « Complet » écrit, pas de liste d'attente.
- Cycle : une seule inscription pour les six séances d'un cycle (mardi ou jeudi), qui a une date de début.
- Annuler en ligne : libre jusqu'à 48 h avant. À moins de 48 h : pas d'annulation en ligne, un seul changement de date possible (règle actuelle du site).
- Atelier libre et bons cadeaux : par téléphone ou e-mail (en attente d'une réponse sur les horaires de l'atelier libre).

## Tâches et parcours

### T1 (P1) Réserver une ou deux places pour une séance découverte
- avant : s'arrête à un lien d'e-mail (aucune date, aucune place visible)
- entrée : accueil (`index.html`)
- étapes : 1. Accueil → toucher « Réserver une séance »  2. Page Réserver (formule « Découverte du tour » choisie d'avance) → toucher « Choisir » sur une date  3. Formulaire de 4 champs (prénom et nom, e-mail, téléphone, nombre de places) → « Confirmer la réservation »
- **objectif : 3 étapes sur téléphone, 4 champs**
- vide : aucune date ouverte pour la formule → la page le dit et donne le téléphone
- erreur : champ vide ou faux (message sous le champ, valeur gardée) ; plus assez de places (message, la date passe à « Complet » ou au nombre restant, la saisie reste) ; envoi échoué (saisie gardée, « Réessayer »)
- succès : bloc de confirmation qui reste à l'écran : numéro, formule, date, heure, places, adresse, paiement sur place, règle des 48 h, bouton « Voir ou annuler ma réservation »
- déconnecté : sans objet (pas de compte)
- fiches : `adhesion-inscription.md` (séance d'essai), `reservation-creneaux.md`

### T2 (P2) S'inscrire à une autre formule : cycle de six séances, modelage parent-enfant
- avant : s'arrête à un lien d'e-mail
- entrée : accueil
- étapes : 1. « Réserver une séance »  2. choisir la formule (bouton radio)  3. « Choisir » sur une date ou un cycle  4. formulaire de 4 champs → « Confirmer la réservation »
- **objectif : 4 étapes, 4 champs**
- vide, erreur, succès : comme T1 ; le cycle redit ses six dates dans la confirmation
- atelier libre : la formule affiche à la place des dates le téléphone et l'e-mail (1 touche)
- fiches : `adhesion-inscription.md`, `reservation-creneaux.md`

### T3 (P1, P2) Retrouver sa réservation et l'annuler
- avant : absent
- entrée A : l'écran de confirmation ou le lien de l'e-mail (le numéro est dans le lien) ; entrée B : l'accueil
- étapes A : 1. « Voir ou annuler ma réservation »  2. « Annuler la réservation »  3. confirmer dans la fenêtre → **objectif : 3 étapes**
- étapes B : 1. « Menu »  2. « Ma réservation »  3. formulaire de 2 champs (e-mail, numéro) → « Retrouver »  4. « Annuler la réservation »  5. confirmer → **objectif : 5 étapes sur téléphone, 2 champs**
- vide : aucune réservation à ce numéro pour cette adresse → message, la saisie reste, lien vers « Réserver une séance » et téléphone
- erreur : champ vide ou faux ; à moins de 48 h, « Annuler » est remplacé par une phrase qui dit la règle, avec « Changer de date » et le téléphone
- succès : la réservation est marquée « Annulée », la place est rendue, un bouton « Réserver une autre séance »
- fiche : `reservation-creneaux.md` (Mes réservations, Annulation), `compte-espace-membre.md` (retrouver ce qui est à soi, ici sans compte)

### T4 (P1, P2) Changer la date de sa réservation
- avant : absent (un e-mail à Maëlle)
- entrée : la page « Ma réservation », réservation affichée
- étapes : 1. « Changer de date »  2. « Choisir » sur la nouvelle date  (3. confirmer, seulement à moins de 48 h : le changement ne se fait qu'une fois)
- **objectif : 2 étapes, 3 à moins de 48 h**
- vide : aucune autre date ouverte → message et téléphone
- succès : la nouvelle date remplace l'ancienne ; hors des 48 h on peut encore changer ou annuler
- fiche : `reservation-creneaux.md`

### T5 (P3) Voir qui vient à la prochaine séance
- avant : absent (Maëlle relit ses e-mails)
- entrée : accueil, pied de page
- étapes : 1. « Espace de l'atelier »  2. code d'accès → « Entrer » : la liste s'ouvre sur la prochaine séance, avec pour chaque personne le nom, le nombre de places et le téléphone (lien d'appel)
- **objectif : 2 étapes, 1 champ**
- vide : personne d'inscrit à une séance → « Aucun inscrit pour l'instant »
- erreur : code faux → message, le champ reste
- déconnecté : la page dit ce qu'il y a derrière et demande le code ; jamais la liste
- inverse : « Quitter » (1 touche)
- fiche : `compte-espace-membre.md`

### T6 (P3) Retirer quelqu'un qui a prévenu par téléphone
- avant : absent
- entrée : l'espace de l'atelier, liste affichée
- étapes : 1. « Retirer » sur la ligne  2. confirmer
- **objectif : 2 étapes**
- succès : la ligne est marquée « Retiré », la place est rendue, un bouton « Rétablir » la remet
- fiche : `reservation-creneaux.md` (Annulation)

### T7 (P1) Demander un bon cadeau ou poser une question
- avant : jouable (lien d'e-mail, téléphone)
- entrée : accueil
- étapes : 1. toucher le téléphone ou l'e-mail (section Venir, pied de page, bloc Bons cadeaux)
- **objectif : 1 étape**
- fiche : `contact-devis.md`

## Écrans du projet (déduits des parcours)

- `index.html` — accueil : entrée de T1, T2, T3 (B), T5 ; T7
- `reserver.html` — formule, dates, formulaire, confirmation : T1, T2
- `ma-reservation.html` — retrouver, annuler, changer de date : T3, T4
- `atelier.html` — espace de l'atelier : T5, T6

## Ce qui n'est pas fait, et pourquoi

- Comptes clients, connexion, mot de passe : la cliente n'en veut pas ; le numéro de réservation les remplace.
- Paiement ou acompte en ligne : le paiement reste sur place.
- Liste d'attente : au plus simple.
- Recherche, filtres, calendrier mensuel : chaque formule a moins de sept dates à l'écran.
- Bons cadeaux en ligne : ils restent par e-mail.
- Créer, déplacer ou fermer une séance depuis l'espace de l'atelier : aucune tâche demandée ; à réclamer si besoin.
- Réservation réelle et e-mails réels : rien derrière le site pour l'instant ; tout est simulé dans le navigateur.
