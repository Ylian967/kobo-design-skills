# Plan de parcours — Les Dalles, club d'escalade associatif, Grenoble

État : validé par le client tel quel (plan de parcours et style `zigzag-snack-pop`). Joué à la vérification : voir le message de livraison et `captures/parcours/`.

## Profils

- **P1 — Le curieux.** Ne connaît pas le club, arrive par un lien Instagram ou le bouche-à-oreille. Téléphone. Une fois. Sans compte.
- **P2 — Le nouvel adhérent.** A essayé ou est décidé, veut s'inscrire pour l'année. Téléphone ou ordinateur. Une fois dans l'année. Sans compte au départ : l'adhésion lui en crée un.
- **P3 — Le membre.** Réserve chaque semaine, presque toujours sur son téléphone, souvent dans le tram. Avec compte.

## Tâches et parcours

### T1 (P1) Savoir si le club est pour moi, ce que ça coûte et où c'est

- entrée : page d'accueil (lien partagé)
- étapes : aucune. Tout se lit sur l'accueil en faisant défiler : pour qui, séance découverte, tarifs, horaires, adresse. **Objectif : 0 étape sur téléphone.**
- vide : sans objet (contenu fixe)
- erreur : sans objet
- succès : la personne a lu le prix de l'essai (10 €), les tarifs de l'année (180 € / 120 €), l'adresse et les horaires, et voit le bouton « Venir essayer »
- déconnecté : c'est l'état normal, rien n'est réservé aux membres sur cette page
- fiche : aucune fiche de domaine (page de présentation) ; règles de `adhesion-inscription.md`, « Page de départ »

### T2 (P1) Réserver une séance découverte un samedi

- entrée : page d'accueil
- étapes :
  1. Accueil → toucher « Venir essayer »
  2. Page « Essayer » → toucher le samedi voulu (les prochains samedis, places restantes écrites)
  3. Remplir trois champs (nom, e-mail, téléphone) → toucher « Réserver ma séance »
  → confirmation dans la page
- **Objectif : 3 étapes sur téléphone, 3 champs.**
- vide : aucun samedi ouvert → une phrase dit quand les prochaines dates seront publiées et donne l'e-mail et le téléphone du club
- erreur : champ vide ou faux → message écrit sous le champ, la saisie est gardée, le curseur va au premier champ faux ; samedi complet (8 places) → affiché, « Complet » écrit, non choisissable ; envoi échoué → les réponses sont gardées, « Réessayer »
- succès : bloc de confirmation qui reste affiché : le samedi, 10 h – 12 h, 12 rue des Alliés, 10 € à régler sur place, matériel prêté, le contact du club. Suite proposée : « Adhérer pour l'année »
- défaire : « Annuler ma séance » dans le bloc de confirmation (une confirmation, la place est rendue). En revenant sur la page « Essayer » depuis le même téléphone, la personne retrouve sa séance et ce bouton
- déconnecté : sans objet, aucun compte n'est demandé
- fiche : patterns/domaines/adhesion-inscription.md (séance d'essai)

### T3 (P2) Adhérer pour l'année

- entrée : page d'accueil (section tarifs ou menu), ou la confirmation d'une séance découverte
- étapes :
  1. Accueil → toucher « Adhérer »
  2. Page « Adhérer » → choisir la formule (180 € adulte, 120 € tarif réduit)
  3. Remplir quatre champs (nom, e-mail, téléphone, mot de passe) → toucher « Continuer »
  4. Relecture (formule, prix, coordonnées, « Modifier ») → toucher « Payer et adhérer » (paiement simulé)
  → confirmation
- **Objectif : 4 étapes sur téléphone, 5 champs (formule comprise).**
- vide : sans objet
- erreur : champ vide ou faux → message sous le champ, saisie gardée ; adresse déjà membre → « Vous avez déjà un compte : se connecter » ; paiement refusé → les réponses sont gardées, « Réessayer »
- succès : page de confirmation : formule et montant, « votre compte est créé », certificat médical à apporter à la première séance, contact du club. Suite : « Réserver mon premier créneau » (la personne est déjà connectée)
- défaire : avant de payer, « Modifier » sur la relecture ; après, la confirmation dit d'écrire au club (e-mail, téléphone) pour annuler une adhésion — pas d'annulation en ligne
- déjà membre : lien « Déjà membre ? Se connecter » en haut de la page
- déconnecté : état normal
- fiche : patterns/domaines/adhesion-inscription.md

### T4 (P3) Réserver un créneau

- entrée : la page « Créneaux », ouverte sur aujourd'hui. C'est l'écran d'arrivée après connexion, le lien « Réserver un créneau » de l'accueil, et la page que le membre garde en favori
- étapes :
  1. Toucher le jour (sauté si c'est aujourd'hui) — sept prochains jours en rangée
  2. Toucher « Réserver » sur la carte du créneau
  → la carte passe à « Réservé », un message dit le jour, l'heure et jusqu'à quand annuler
- **Objectif : 2 touches sur téléphone (1 pour aujourd'hui).** Pas d'écran de confirmation : réserver est gratuit et s'annule.
- vide : jour sans créneau (dimanche : fermé ; aujourd'hui quand tout est passé) → une phrase le dit et un bouton mène au prochain jour ouvert
- erreur : créneau complet (20 places) → la carte reste, « Complet » écrit, bouton désactivé ; quota atteint (3 réservations dans la semaine) → boutons de cette semaine désactivés et une phrase dit pourquoi et comment libérer une place ; créneau pris entre-temps → message écrit, la carte passe à « Complet »
- succès : « Réservé » écrit sur la carte, avec « Annuler » à la place de « Réserver » ; message de confirmation ; compteur « Mes réservations »
- défaire : T6
- déconnecté : les créneaux et les places restantes restent lisibles ; « Réserver » mène à la connexion, puis revient au même jour
- fiche : patterns/domaines/reservation-creneaux.md

### T5 (P3) Voir ce que j'ai réservé

- entrée : page « Créneaux »
- étapes : 1. toucher « Mes réservations » (lien en haut de la page Créneaux, et dans le menu)
- **Objectif : 1 touche sur téléphone.**
- vide : « Aucune réservation à venir » et un lien vers les créneaux
- erreur : sans objet
- succès : la liste, à venir d'abord (jour, heure, « Annuler »), et le nombre de réservations de la semaine sur trois
- déconnecté : la page de connexion, qui dit ce qu'on trouve derrière ; après connexion, retour à « Mes réservations »
- fiche : patterns/domaines/reservation-creneaux.md, patterns/domaines/compte-espace-membre.md

### T6 (P3) Annuler une réservation

- entrée : « Mes réservations » (ou la carte « Réservé » de la page Créneaux)
- étapes : 1. toucher « Annuler »  2. confirmer (la fenêtre redit le jour et l'heure)
- **Objectif : 2 touches sur téléphone.**
- vide : voir T5
- erreur : moins de 2 heures avant le créneau → « Annuler » désactivé, une phrase dit pourquoi et donne le téléphone du club
- succès : message écrit, la ligne disparaît, la place est rendue, le compteur de la semaine baisse
- défaire : réserver à nouveau le créneau (lien dans le message)
- déconnecté : voir T5
- fiche : patterns/domaines/reservation-creneaux.md

### T7 (P3) Me connecter, me déconnecter

- entrée : le lien « Se connecter » de la barre, sur toutes les pages ; ou un « Réserver » touché sans être connecté
- étapes : 1. toucher « Se connecter »  2. remplir deux champs (e-mail, mot de passe) → toucher « Se connecter »
  → arrivée sur « Créneaux », ou retour à l'endroit d'où l'on venait
- **Objectif : 2 étapes depuis une page qui montre le lien ; 3 sur téléphone si le lien est dans le menu.** L'appareil retient la connexion : le geste ne se refait pas chaque semaine.
- erreur : identifiants faux → message écrit, l'e-mail saisi reste, lien « Mot de passe oublié ou première connexion »
- mot de passe oublié / première connexion : un champ (e-mail) → message « si cette adresse est connue du club, un lien vient de partir » (simulé)
- succès : le prénom du membre remplace « Se connecter » dans la barre, sur toutes les pages
- défaire : « Se déconnecter », 2 touches au plus (menu, puis « Se déconnecter »)
- déconnecté : voir T4 et T5
- fiche : patterns/domaines/compte-espace-membre.md

## Écrans du projet (déduits des parcours)

| Écran | Fichier | Sert |
|---|---|---|
| Accueil | `index.html` | T1 ; entrée de T2, T3, T4, T7 |
| Essayer | `essayer.html` | T2 |
| Adhérer | `adherer.html` | T3 |
| Créneaux | `creneaux.html` | T4, T6 |
| Mes réservations | `mes-reservations.html` | T5, T6, déconnexion |
| Connexion | `connexion.html` | T7 |

## Ce qui n'est pas fait, et pourquoi

- Recherche, filtres (activité, niveau) : cinq créneaux par jour au plus, le choix du jour suffit.
- Calendrier mensuel : on réserve pour les sept jours qui viennent.
- Liste d'attente : le club n'en a pas.
- Tableau de bord, page « Mon compte » (coordonnées, échéance) : aucune tâche citée ne les demande.
- Espace des bénévoles : écarté par le club pour l'instant.
- Formulaire de contact : aucune tâche ne demande d'écrire ; l'e-mail et le téléphone sont des liens.
- Mentions légales : laissées de côté à la demande du club.
- Paiement réel, connexion réelle, envoi d'e-mails : simulés pour l'instant, à la demande du club.

## Règles du club reprises dans les parcours

- Créneaux : lundi à vendredi 12 h – 14 h, 18 h – 20 h, 20 h – 22 h ; samedi 10 h – 12 h et 14 h – 17 h ; fermé le dimanche. 20 places par créneau.
- Trois réservations par semaine et par membre ; annulation jusqu'à 2 heures avant ; pas de liste d'attente ; personne ne valide ; gratuit pour un membre.
- Séance découverte : samedi 10 h – 12 h, encadrée, 10 € sur place, 8 places, matériel prêté.
- Adhésion : 180 € l'année (adulte), 120 € tarif réduit (étudiants, moins de 18 ans, demandeurs d'emploi), licence comprise ; certificat médical à la première séance.

## Confirmé par le client à la validation

- « Semaine » du quota : du lundi au samedi.
- Le samedi 10 h – 12 h : la séance découverte (8 places, un encadrant) et le créneau des membres (20 places) ont lieu en même temps.
- Les 180 membres actuels reçoivent leur accès par un lien « première connexion » envoyé à l'adresse que le club connaît.
- Intensité : tout le style sur les pages publiques, sobre (`reduced`) dans l'espace des membres.
