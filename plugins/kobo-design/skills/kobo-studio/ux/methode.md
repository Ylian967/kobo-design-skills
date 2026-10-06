# Méthode UX : les personnes et leurs parcours avant l'apparence

À suivre après l'interview et **avant** de choisir un skill de style. Elle produit un **plan de parcours**, montré au client avec la proposition (étape c) et validé par lui. Sans plan validé, on ne construit pas.

Pourquoi : un premier club d'escalade a été livré avec un tableau de 25 lignes et quatre filtres pour réserver, sans adhésion, sans séance découverte, sans connexion, sans « Mes réservations ». Le projet était parti du registre et des composants. Aucun contrôle ne l'a vu, parce qu'aucun contrôle ne jouait un parcours.

## 1. Qui utilise le site

Un à trois **profils**, pas plus. Un profil est une personne dans une situation, pas une catégorie marketing.

| À écrire pour chaque profil | Exemple |
|---|---|
| Qui, et ce qu'il sait déjà | « Curieuse qui n'a jamais grimpé, ne connaît pas le club » |
| Ce qu'il vient faire | « Savoir si elle peut essayer, combien ça coûte, et réserver un essai » |
| L'appareil | « Téléphone, depuis un lien partagé » |
| La fréquence | « Une fois » |
| S'il a un compte | « Non » |

La fréquence décide du reste : un geste fait **une fois** doit se comprendre sans aide (on explique, on rassure, on confirme) ; un geste fait **chaque semaine** doit être court (on retient les choix, on retire les explications). Les deux ne se dessinent pas pareil.

Un profil qui n'a **pas de compte** existe presque toujours sur un site ouvert au public. S'il manque dans la liste, demande-le.

## 2. Les tâches principales

Trois à cinq tâches par profil, écrites comme un but de la personne, avec un verbe : « réserver un créneau pour jeudi », pas « module de réservation ». Classe-les : la première est celle que le premier écran du profil doit rendre possible.

Pour chaque tâche, cherche la fiche de domaine qui lui correspond dans `patterns/domaines/` (liste dans son `README.md`) et **lis-la** : elle donne les écrans attendus, le parcours, les règles mobile et les erreurs à éviter, avec leurs sources. N'ouvre que les fiches des tâches du projet.

## 3. Le parcours de chaque tâche, écran par écran

| À écrire | Ce que ça veut dire |
|---|---|
| **Point d'entrée** | D'où part la personne : la page d'accueil, un lien reçu, l'écran d'arrivée après connexion. Un profil sans compte part toujours d'une page publique |
| **Étapes** | La suite des écrans, et sur chacun le **seul** geste attendu. Une étape = un geste qui valide un choix ou change d'écran (toucher un bouton, envoyer un formulaire). Faire défiler n'est pas une étape ; remplir un formulaire compte pour une étape, et le nombre de champs se note à côté. Un choix dans une liste déroulante compte pour **une** étape, même s'il demande deux touches (ouvrir, choisir). Un lien de la barre de navigation coûte **deux** étapes sur téléphone (« Menu », puis le lien) dès que la barre se replie : compte-le ainsi, ou sors ce lien du menu. Plusieurs quantités réglées sur le même écran (trois billets d'un type, deux d'un autre) comptent une étape par ligne touchée : écris l'objectif pour le cas le plus courant et dis-le |
| **Objectif d'étapes** | Le nombre d'étapes visé **sur l'appareil principal du profil** (le téléphone pour un public, le clavier d'un ordinateur pour un outil interne), écrit en chiffre. Il sera compté à la vérification (`quality/ux-grille.md`) |
| **État vide** | Ce que la personne voit quand il n'y a rien (aucun créneau ce jour, aucune réservation, panier vide), et ce qu'elle peut faire ensuite |
| **État d'erreur** | Ce qui peut échouer (créneau pris entre-temps, champ faux, réseau) et ce que l'écran dit alors |
| **État de succès** | Ce qui confirme que c'est fait, ce qui va se passer ensuite, et comment revenir en arrière (annuler, modifier) |
| **État déconnecté** | Ce que voit quelqu'un qui arrive sans être connecté : jamais un écran de travail vide ; une page qui dit ce qu'il y a derrière et propose de se connecter ou de créer un compte |

Règles du plan :

1. **Aucun profil sans chemin.** Chaque profil a au moins une tâche qu'il peut finir. Un bouton de la page publique ne mène jamais à un écran réservé sans passer par la connexion ou par une suite pour ceux qui n'ont pas de compte.
2. **Ce qui se fait se défait.** Toute tâche qui crée quelque chose (réservation, commande, inscription) a sa tâche inverse dans le plan (annuler, retirer, se désinscrire) et un endroit où retrouver ce qu'on a fait. (Heuristique 3 de Nielsen, contrôle et liberté.) Quand une **règle du client** l'interdit (billet non remboursable, suppression définitive) : la règle est écrite **avant** le geste qui engage, ce geste est confirmé après relecture, tout ce qui précède reste modifiable, et l'écran de succès dit qui joindre. Sans compte, « retrouver ce qu'on a fait » passe par une référence donnée à la confirmation (et envoyée), pas par la mémoire du navigateur seule.
3. **Aucune fonction sans tâche.** Une fonction ne figure à l'écran que si une tâche du plan en a besoin. Recherche, filtres, raccourcis clavier, barre latérale, tableau de bord, export : chacun se justifie par un profil et une tâche, sinon il n'existe pas. (Heuristique 8, design minimaliste.)
4. **La forme suit le nombre.** Sept choix ou moins se montrent tous, sans filtre ni recherche. Un filtre ne se justifie que si la liste ne tient pas à l'écran une fois le premier choix fait (le jour, la catégorie).
5. **Le téléphone d'abord quand le profil y est.** Pas de tableau de plus de trois colonnes à 390 px, pas de geste qui demande un clavier ou un survol. Les cartes empilées remplacent le tableau.

## 4. Le plan de parcours, tel qu'on le montre au client

Un seul bloc, en tête de la proposition, avant les skills :

```
Profils
  P1  <qui> — <appareil> — <fréquence> — <avec / sans compte>
  P2  …

Tâches et parcours
  T1 (P1)  <but>
      entrée : <écran>
      étapes : 1. <écran> → <geste>   2. …            objectif : <n> étapes sur téléphone
      vide : …   erreur : …   succès : …   déconnecté : …
      fiche : patterns/domaines/<fiche>.md
  T2 (P1)  …

Écrans du projet (déduits des parcours, pas l'inverse)
  <écran> : sert T1, T3
  …

Ce qui n'est pas fait, et pourquoi
  <fonction écartée> : aucune tâche ne la demande
```

La liste des écrans vient **après** les parcours : un écran qui ne sert aucune tâche n'est pas construit. La dernière rubrique dit au client ce qu'on a écarté, pour qu'il puisse le réclamer.

Le client valide le plan en même temps que le skill. S'il change une tâche, le parcours et l'objectif d'étapes sont réécrits avant de construire.

## 5. Ce que le plan décide pour la suite

- **La structure** (`SKILL.md`, étape c) se choisit d'après les écrans du plan, pas d'après le registre.
- **Le skill de style** se choisit d'après le public, l'ambiance et les images (`catalogue.md`), une fois le plan écrit.
- **La vérification** (`quality/ux-grille.md`) rejoue chaque tâche du plan dans le navigateur et compare le nombre d'étapes à l'objectif. Le plan est donc aussi le cahier de recette : garde-le dans le projet, dans `parcours.md`.

## Sources

- Jakob Nielsen, « 10 Usability Heuristics for User Interface Design », Nielsen Norman Group, 1994, revu en 2024 : https://www.nngroup.com/articles/ten-usability-heuristics/ (heuristiques 3 et 8 citées ci-dessus).
- GOV.UK Design System, « Start using a service » (dire ce que fait le service, laisser se connecter ou reprendre) : https://design-system.service.gov.uk/patterns/start-using-a-service/
- Raluca Budiu, « Login Walls Stop Users in Their Tracks », Nielsen Norman Group, 2014 (pas de mur de connexion avant d'avoir montré l'intérêt) : https://www.nngroup.com/articles/login-walls/
- Les règles 4 et 5 et le découpage profil / tâche / parcours sont une méthode de travail propre à kobo-studio, tirée de l'essai du club d'escalade ; ce ne sont pas des citations.
