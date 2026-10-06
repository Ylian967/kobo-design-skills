# Rivage Suivi — plan de parcours

Reprise de l'outil de suivi des affaires d'Atelier Rivage. Plan écrit d'après les réponses du client (premier tour), avant tout choix d'apparence. Il est rejoué à la vérification.

## Profils

- **P1 — Commercial ou commerciale** (quatre personnes). Connaît l'outil et les affaires, vient d'un tableur. Ordinateur portable, au bureau, beaucoup au clavier. Toute la journée : retrouver une affaire et changer son étape, des dizaines de fois par jour. Voit tout, peut tout modifier, archive mais ne supprime pas.
- **P2 — La gérante** (une personne). Fait les mêmes gestes que P1, regarde en plus l'ensemble des affaires. Seule à pouvoir supprimer définitivement.

Personne n'utilise l'outil sur téléphone. Il n'y a pas de compte ni de connexion : l'outil reste une démonstration, rien n'est enregistré. Le rôle « gérante » est donc simulé par un réglage visible dans l'en-tête.

## Tâches et parcours

Les objectifs sont comptés depuis l'écran d'arrivée (la liste des affaires ouvertes). Ils valent au clavier sur ordinateur, qui est l'usage réel ; les mêmes nombres sont visés au doigt à 390 px, où l'outil doit rester utilisable sans être l'appareil prévu.

### T1 (P1, P2) Retrouver une affaire

- entrée : la liste des affaires ouvertes
- étapes : 1. liste → écrire quelques lettres dans la recherche (nom de l'affaire ou de la société) : la liste se réduit à mesure
- objectif : **1 étape**
- vide : « Aucune affaire ne correspond », avec ce qu'il faut retirer (la recherche, le responsable, l'avancement) et un bouton « Effacer les filtres »
- erreur : sans objet (rien n'est chargé depuis un serveur)
- succès : la ou les lignes restantes, et le compte « 2 affaires affichées sur 24 »
- déconnecté : sans objet (pas de compte)
- avant : jouable, 1 étape
- fiche : patterns/domaines/outil-interne.md

### T2 (P1, P2) Faire avancer l'étape d'une affaire après un appel

- entrée : la liste
- étapes : 1. liste → retrouver l'affaire (T1)   2. liste → ouvrir la ligne : le détail s'affiche à côté, avec le nom de l'affaire **et sa société**   3. détail → choisir la nouvelle étape, d'un seul geste (cinq boutons : Qualification, Proposition, Négociation, Gagnée, Perdue)
- objectif : **3 étapes**, au clavier seul
- vide : sans objet
- erreur : mauvaise ligne ou mauvaise étape → le dernier changement reste écrit au-dessus de la liste et dans le détail, avec un bouton « Annuler ce changement » qui remet l'étape d'avant (pas de notification flottante : jouée, elle recouvrait le détail)
- succès : un message qui redit l'affaire, la société et l'étape (« Refonte du site vitrine, Garage des Deux Rives : passée de Négociation à Gagnée »), la liste à jour ; si l'affaire quitte la liste affichée (gagnée ou perdue), le message le dit
- tâche inverse : « Annuler » dans le message ; à tout moment, rouvrir l'affaire et choisir une autre étape (on peut revenir en arrière et rouvrir une affaire gagnée ou perdue)
- avant : jouable en 3 étapes, mais par une liste déroulante qui applique chaque valeur traversée au clavier, sans confirmation de la société ni annulation
- fiche : patterns/domaines/outil-interne.md

### T3 (P1, P2) Créer une affaire

- entrée : la liste
- étapes : 1. liste → « Créer une affaire »   2. fenêtre → remplir et envoyer (7 champs : affaire, société, service, étape, montant facultatif, clôture facultative, responsable)
- objectif : **2 étapes**
- vide : sans objet
- erreur : champ obligatoire vide ou montant mal écrit → message sous le champ, le reste de la saisie est gardé
- succès : la fenêtre se ferme, l'affaire est dans la liste à sa place, un message la nomme et propose « Annuler »
- tâche inverse : « Annuler » dans le message, ou archiver (T5)
- avant : jouable, 2 étapes, sans annulation
- fiche : patterns/domaines/outil-interne.md

### T4 (P1, P2) Corriger une erreur de saisie (nom, société, service, montant, date, responsable)

- entrée : la liste
- étapes : 1. liste → retrouver et ouvrir l'affaire   2. détail → « Modifier » : les faits deviennent des champs, dans le panneau, la liste reste visible   3. détail → corriger et « Enregistrer » (6 champs, déjà remplis)
- objectif : **3 étapes**
- vide : sans objet
- erreur : champ obligatoire vidé, montant mal écrit → message sous le champ ; « Annuler » quitte la modification sans rien changer
- succès : le détail et la ligne sont à jour, un message dit ce qui a changé et propose « Annuler »
- tâche inverse : « Annuler » dans le message ; ou modifier de nouveau
- avant : absent (seule l'étape se changeait)
- fiche : patterns/domaines/outil-interne.md

### T5 (P1, P2) Retirer un doublon

- entrée : la liste
- étapes : 1. liste → retrouver et ouvrir le doublon   2. détail → « Autres actions »   3. menu → « Archiver »
- objectif : **3 étapes**
- vide : la vue « Affaires archivées » sans aucune archive dit qu'il n'y en a pas et ramène aux affaires ouvertes
- erreur : mauvaise affaire archivée → « Annuler » dans le message ; plus tard, « Restaurer » depuis les affaires archivées
- succès : l'affaire quitte la liste, un message la nomme (affaire et société), dit où la retrouver et propose « Annuler »
- tâche inverse : « Annuler », ou filtre Avancement → « Affaires archivées » → ouvrir → « Autres actions » → « Restaurer »
- **P2 seulement — supprimer définitivement** : depuis le détail de n'importe quelle affaire, archivée ou non (changé à la construction : passer par l'archive ajoutait trois gestes à la gérante), « Autres actions » → « Supprimer définitivement » → une fenêtre redit l'affaire, la société et le montant, et demande confirmation. Pour P1, la ligne du menu est désactivée et la raison est écrite sous les boutons du détail. C'est le seul geste qui ne se défait pas.
- avant : absent (ni archive ni suppression)
- fiche : patterns/domaines/outil-interne.md

### T6 (P2) Regarder l'ensemble

- entrée : la liste des affaires ouvertes
- étapes : aucune : en arrivant, la tête d'écran donne le nombre d'affaires affichées et leur montant total ; trier par une colonne ou choisir un responsable est 1 étape
- objectif : **0 étape** pour le compte et le total, **1 étape** pour un tri ou un responsable
- vide : comme T1
- succès : compte et total réécrits à chaque filtre
- avant : le compte seulement ; pas de total
- fiche : patterns/domaines/outil-interne.md (pas de tableau de bord : une seule liste, 25 affaires ouvertes)

## Écrans du projet (déduits des parcours)

- **Liste des affaires** (`index.html`) : sert T1 à T6. Recherche, deux filtres (responsable, avancement), tableau triable, compte et total.
- **Détail à côté de la liste** (panneau, même page) : sert T2, T4, T5. Lecture, boutons d'étape, « Modifier », « Autres actions ».
- **Fenêtre « Créer une affaire »** : sert T3.
- **Fenêtre de confirmation de suppression** : sert T5 (gérante).
- **Fenêtre des raccourcis clavier** : sert T1 et T2 pour une équipe qui travaille au clavier.

## Ce qui est gardé, avec sa tâche

- Recherche : T1.
- Filtre « Responsable » : T1 (« mes affaires »), T6. Filtre « Avancement » : T5 (archives), T6 (closes).
- Tri par colonne : T1, T6.
- Raccourcis clavier (« / », flèches, Entrée, Échap, « ? ») : T1, T2, équipe au clavier.
- Affichage compact : T6 et T1 (25 lignes ouvertes ne tiennent pas sur un écran de portable en lignes hautes).

## Ce qui n'est pas fait, et pourquoi

- **Barre latérale** (et son raccourci « [ ») : une seule liste, aucune autre vue prévue cette année. Retirée.
- **Filtre « Étape »** : la colonne Étape se trie d'un geste et la recherche ramène une affaire en une étape ; avec 25 affaires ouvertes, un troisième filtre ne sert aucune tâche. Retiré.
- **Tableau de bord, fiche en pleine page** : aucune tâche ne les demande.
- **Cases à cocher et gestes groupés** : aucune tâche ne porte sur plusieurs affaires à la fois.
- **Connexion, comptes, enregistrement** : démonstration ; le rôle de la gérante est simulé.
- **Version pensée pour le téléphone** : personne ne s'en sert sur téléphone ; le tableau y défile de côté.
- **Alerte de doublon à la création** : non demandée ; le doublon se retire par l'archive (T5).
