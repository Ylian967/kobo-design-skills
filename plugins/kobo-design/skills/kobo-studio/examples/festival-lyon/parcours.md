# Plan de parcours — Nuits Basses (reprise : vente des billets sur le site)

Écrit le 6 octobre 2026 d'après les réponses du client. À valider par lui avant toute construction ; rejoué à la vérification.

## Profils

- **P1 — Festivalier, 18–35 ans.** Arrive d'Instagram ou d'un lien envoyé par un ami ; connaît le nom du festival, pas forcément le reste. Presque toujours sur téléphone. Une ou deux visites. Sans compte (il n'y en a pas). Achète souvent pour un groupe d'amis.

Pas d'autre profil : les trois bénévoles s'occupent du site, ils ne s'en servent pas comme d'un outil.

## Règles données par le client

- Pass 1 soir 32 € (vendredi **ou** samedi), pass 2 soirs 54 €, réduit étudiant 26 € pour un soir. Aucun frais en plus.
- 1 800 places par soir. Six billets au plus par commande. Billets non nominatifs.
- Pas de remboursement ; la revente entre particuliers est autorisée.
- Carte étudiante demandée à l'entrée. Interdit aux moins de 18 ans.
- Paiement par carte, **simulé** pour l'instant. Billet envoyé par e-mail. Pas de compte.
- Contact : salut@nuits-basses.example.

## Décidé par l'atelier (le client a dit « décidez ») — à confirmer

- Âge : une case à cocher à l'achat (« toutes les personnes ont 18 ans ou plus »), pas de date de naissance.
- Fin de vente en ligne : à l'ouverture des portes du soir concerné (20 h), ou quand le soir est complet.
- Vente sur place : seulement s'il reste des places, aux mêmes prix.
- Après paiement : ni annulation ni changement de soir ; on peut donner ou revendre son billet en transférant l'e-mail.
- Aucun nom demandé à l'achat (billets non nominatifs) : l'e-mail suffit.

## Tâches et parcours

### T1 (P1) — Acheter des billets pour soi et ses amis

- **Entrée** : l'accueil (`index.html`), ou directement la page Billets (`billets.html`) par un lien partagé.
- **Étapes**
  1. Accueil → toucher « Acheter un billet ».
  2. Billets → choisir une quantité (0 à 6) sur la ligne du billet voulu. Cinq lignes : vendredi, samedi, deux soirs, étudiant vendredi, étudiant samedi. Le total se met à jour et s'annonce.
  3. Billets → toucher « Commander ».
  4. Commande → relire ses billets et le total, remplir 5 champs (e-mail, case 18 ans, numéro de carte, date d'expiration, cryptogramme), toucher « Payer 118 € ».
  → Confirmation.
- **Objectif : 4 étapes sur téléphone** pour un type de billet (une étape de plus par type de billet supplémentaire) ; **5 champs**. Depuis un lien direct vers Billets : 3 étapes.
- **Vide** : aucun billet choisi → « Commander » reste atteignable ; activé, il dit « Choisissez au moins un billet » et y conduit. Page Commande ouverte sans billet → état vide avec un bouton vers Billets.
- **Erreur** : plus de six billets → message écrit sous les lignes, « Commander » ne part pas ; soir complet → la ligne dit « Complet », sa liste est désactivée ; champ faux → message sous le champ, valeur gardée ; paiement refusé → message écrit, rien n'est perdu, rien n'est débité, on peut réessayer.
- **Succès** : page Confirmation : numéro de commande, billets achetés, total payé, « vos billets partent à telle adresse », rappel (carte étudiante, 18 ans, pas de remboursement, revente autorisée), contact.
- **Déconnecté** : sans objet, il n'y a pas de compte ; toute la commande se fait en invité.
- **Fiche** : `ux/patterns/domaines/boutique-panier.md`. Écart assumé : la liste, la fiche produit et le panier tiennent sur **un seul écran** (cinq billets, règle « la forme suit le nombre »).

### T2 (P1) — Changer d'avis avant de payer (tâche inverse de T1)

- **Entrée** : page Billets, ou page Commande.
- **Étapes** : depuis Commande, 1. toucher « Modifier mes billets » → Billets, choix gardés ; 2. changer une quantité, ou toucher « Retirer » sur une ligne.
- **Objectif : 2 étapes.**
- **Vide** : tout retiré → total à 0 €, retour à l'état « aucun billet choisi ».
- **Succès** : le total et le compteur de la barre suivent.
- **Limite dite au client** : après paiement, rien ne se défait sur le site (pas de remboursement, règle du client). La règle est écrite **avant** le paiement, sur Billets et sur Commande.
- **Fiche** : `boutique-panier.md` (quantité modifiable, « Retirer »).

### T3 (P1) — Retrouver son billet ou demander de l'aide

- **Entrée** : la page Confirmation, ou le pied de n'importe quelle page.
- **Étapes** : 1. toucher l'adresse e-mail (lien qui ouvre un message, objet prérempli avec le numéro de commande depuis la Confirmation).
- **Objectif : 1 étape.**
- **Vide / erreur** : sans objet (pas de formulaire). **Succès** : le message s'ouvre dans l'application de courrier ; le délai de réponse est écrit à côté de l'adresse.
- Où retrouver son achat : dans l'e-mail reçu. Sans compte, le site ne garde rien.
- **Fiche** : `ux/patterns/domaines/contact-devis.md` (pas de formulaire : une adresse et un délai).

### T4 (P1) — Voir qui joue quel soir

- **Entrée** : accueil. **Étapes** : 1. « Menu » ; 2. « Programmation ». **Objectif : 2 étapes** (0 en faisant défiler).
- États : sans objet (contenu fixe). Aucune fiche de domaine : parcours écrit avec la méthode seule.

### T5 (P1) — Savoir comment venir et entrer

- **Entrée** : accueil. **Étapes** : 1. « Menu » ; 2. « Pratique » ; 3. onglet « Entrée » ou « Sur place » (l'onglet « Venir » est déjà ouvert). **Objectif : 3 étapes au plus.**
- États : sans objet. Aucune fiche de domaine.

## Écrans du projet (déduits des parcours)

- `index.html` (accueil, existe) : entrée de T1 ; T4, T5 ; T3 par le pied de page.
- `billets.html` (nouveau) : T1 étapes 2 et 3 ; T2.
- `commande.html` (nouveau) : T1 étape 4 ; entrée de T2.
- `confirmation.html` (nouveau) : succès de T1 ; entrée de T3.
- `conditions.html` (nouveau) : les règles de vente connues (T2 : savoir ce qui ne se défait pas) et la place des mentions légales, que le client fournira.

## Ce qui n'est pas fait, et pourquoi

- Compte client, connexion, « mes commandes » : le client n'en veut pas.
- Recherche, filtres : cinq billets, tous visibles.
- Code de réduction : aucune tâche ne le demande.
- Nom et adresse postale à l'achat : billets non nominatifs, envoyés par e-mail.
- Remboursement ou échange en ligne, bourse de revente : pas de remboursement ; la revente se fait entre particuliers.
- Suivi des ventes pour les bénévoles, contrôle des billets à l'entrée : personne d'autre n'utilise le site pour l'instant.
- Paiement réel, envoi réel de l'e-mail, décompte réel des 1 800 places : simulés ; kobo-studio ne les fournit pas.

## Avant (site d'origine), tâche par tâche

| Tâche | Ce que le site d'origine permettait |
|---|---|
| T1 Acheter | S'arrête à un lien vers une billetterie extérieure dont l'adresse est fictive (`.example`) |
| T2 Changer d'avis | Absent |
| T3 Retrouver son billet, aide | Une adresse e-mail dans le pied de page, sans délai de réponse |
| T4 Programmation | Jouable |
| T5 Pratique | Jouable |
