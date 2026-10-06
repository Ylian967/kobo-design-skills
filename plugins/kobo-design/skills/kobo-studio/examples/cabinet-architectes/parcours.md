# Plan de parcours — Atelier Sorbier architectes (reprise)

État : validé par les clientes le 2026-10-06 (budget obligatoire, avec « Je ne sais pas encore » ; budgets affichés hors taxes).

## Profils

- **P1 — Particulier** avec un projet de maison, de rénovation ou d'extension, 40–65 ans. Ne connaît pas l'atelier, compare plusieurs cabinets. Ordinateur surtout, téléphone parfois. Vient une ou deux fois. Sans compte. *Profil principal (décidé par nous : c'est lui qui écrit pour la première fois à un architecte et qui a le plus besoin d'être guidé).*
- **P2 — Élu ou secrétaire de mairie** d'une petite commune. Compare plusieurs cabinets. Ordinateur. Vient une ou deux fois. Sans compte.

Nature du projet : un site ouvert au public, sans compte, pour des gens qui viennent une ou deux fois.

## Tâches et parcours

### T1 (P1, P2) — Voir des réalisations proches de mon projet

- Entrée : accueil (`index.html`).
- Étapes : 1. Accueil, section « Projets » → toucher le projet qui ressemble au mien. 2. Page « Projets » (`projets.html`), arrivée sur ce projet : photo, texte, programme, lieu, année, surface, budget des travaux.
- **Objectif : 1 étape sur téléphone** (un geste pour ouvrir le détail d'un projet).
- Vide : sans objet (quatre projets, toujours affichés ; pas de filtre ni de recherche). Erreur : une photo qui ne charge pas laisse son texte de remplacement et les faits. Succès : le projet est lu ; sous chaque projet, « Demander un rendez-vous ». Déconnecté : sans objet (pas de compte). Retour : fil d'Ariane et sommaire de la page.
- Avant : **s'arrête à l'accueil** (une photo et quatre lignes par projet, rien à ouvrir, pas de texte, pas de budget).
- Fiche : aucune fiche de domaine ne couvre « consulter des réalisations » ; parcours écrit avec la méthode seule.

### T2 (P1, P2) — Demander un premier rendez-vous

- Entrée : n'importe quelle page (bouton de la barre, du premier écran, de la fin de page).
- Étapes : 1. Toucher « Demander un rendez-vous ». 2. Page `rendez-vous.html` : remplir et envoyer (7 champs : type de projet, commune du projet, budget envisagé, le projet en quelques lignes, nom, e-mail, téléphone facultatif). 3. Confirmation.
- **Objectif : 3 étapes sur téléphone, 7 champs.**
- Vide : envoi sans rien remplir → chaque champ obligatoire dit ce qui manque, le premier reçoit le curseur. Erreur de champ : message sous le champ, valeurs gardées. Envoi en cours : bouton occupé, « Envoi en cours… ». Envoi échoué : réponses gardées, téléphone et e-mail proposés. Succès : « Demande envoyée », rappel de ce qui a été envoyé, réponse sous trois jours ouvrés par e-mail. Déconnecté : sans objet.
- Tâche inverse : sur la confirmation, « Modifier ma demande » rouvre le formulaire rempli ; pour annuler, le téléphone et l'e-mail sont écrits.
- Avant : **s'arrête à un lien d'e-mail** (message vide, objet « Premier rendez-vous », aucune question, aucune confirmation).
- Fiche : `ux/patterns/domaines/contact-devis.md`.

### T3 (P1, P2) — Appeler ou écrire directement à l'atelier

- Entrée : n'importe quelle page.
- Étapes : 1. Toucher le numéro (`tel:`) ou l'adresse e-mail (`mailto:`), en fin de page et en pied de page ; horaires et délai de réponse écrits à côté.
- **Objectif : 1 étape sur téléphone.**
- Vide, erreur, déconnecté : sans objet. Fermé : les horaires (lundi au vendredi, 9 h – 12 h 30 et 14 h – 18 h) sont écrits. Succès : l'appel ou le message s'ouvre dans l'appareil.
- Avant : **jouable** (téléphone et e-mail en liens), sans horaires ni délai de réponse.
- Fiche : `ux/patterns/domaines/contact-devis.md`.

### T4 (P1, P2) — Comprendre qui sont les architectes et comment se passe un projet

- Entrée : accueil.
- Étapes : 1. Ouvrir le menu (téléphone). 2. Toucher « L'agence » → `agence.html` : l'équipe, les quatre étapes, premier rendez-vous gratuit et sans engagement.
- **Objectif : 2 étapes sur téléphone** (1 sur ordinateur, la barre est dépliée).
- Vide, erreur, déconnecté : sans objet. Succès : la page est lue ; l'encart et la fin de page proposent « Demander un rendez-vous ».
- Avant : **jouable** ; rien sur la gratuité du premier rendez-vous ni sur les horaires.
- Fiche : aucune.

## Écrans du projet

- `index.html` (accueil) : sert T1 (entrée), T2 et T3 (entrées), T4 (entrée).
- `projets.html` (nouvelle) : sert T1 ; entrée de T2.
- `agence.html` : sert T4 ; entrée de T2 et T3.
- `rendez-vous.html` (nouvelle) : sert T2 (formulaire et confirmation) et T3 (moyens de contact, horaires, délai).

## Ce qui n'est pas fait, et pourquoi

- Recherche et filtres sur les projets : quatre projets se montrent tous.
- Une page par projet : une seule photo provisoire et quelques lignes par projet ; à faire quand il y aura plusieurs vraies photos par projet.
- Choix d'un créneau de rendez-vous en ligne : l'atelier répond et convient lui-même de la date.
- Compte, espace client : aucune tâche ne le demande.
- Pièces jointes (plans, photos) dans le formulaire : l'envoi est simulé pour l'instant ; elles se donneront au premier rendez-vous.
- Carte d'accès, portraits, avis : pas de contenu réel fourni.
