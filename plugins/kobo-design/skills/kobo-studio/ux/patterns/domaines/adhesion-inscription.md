# Adhésion et inscription

Devenir membre, s'inscrire à une activité, à une séance d'essai, à une liste. La personne le fait **une fois**, souvent sans connaître la maison : on explique, on rassure, on confirme. Sources : marques de `README.md`.

## Écrans attendus

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Page de départ** | Dit à qui c'est destiné, ce que ça coûte, combien de temps ça prend, ce qu'il faut avoir sous la main (certificat, moyen de paiement), et porte **un** bouton pour commencer. Laisse aussi se connecter ceux qui ont déjà un compte | [G-depart] |
| **Formules** (s'il y en a plusieurs) | Les formules côte à côte avec leur prix réel, celle qui convient au plus grand nombre mise en avant ; on en choisit une | [N6] ; [B-abandon] : le coût caché est la première cause d'abandon citée |
| **Formulaire** | Les seules questions nécessaires, sur une colonne. Long (plus de sept ou huit champs) : une question ou un groupe par écran, avec un lien « Retour » | [NN-form] points 1 et 3 ; [G-question] |
| **Relecture** | Ce qui a été saisi, avec « Modifier » en face de chaque groupe ; dit que rien n'est envoyé avant la validation | [G-relire] |
| **Confirmation** | Ce qui est fait, ce qui se passe ensuite et quand, un contact, la suite utile (se connecter, réserver) | [G-confirmation] |

Une **séance d'essai** est la même chose en plus court : page de départ, choix de la date, trois champs (nom, e-mail, téléphone), confirmation. Pas de compte demandé [G-compte].

## Parcours

Entrée : la page publique. Le bouton principal du site, pour quelqu'un qui n'est pas membre, mène ici, **jamais** à l'espace des membres.

1. Page d'accueil → « Essayer » ou « Adhérer ».
2. Choisir la formule ou la date.
3. Remplir le formulaire.
4. Relire et valider (obligatoire dès qu'il y a un paiement ou un engagement ; facultatif pour un essai gratuit de trois champs).
5. Confirmation.

**Objectif à écrire dans le plan :** séance d'essai, 4 étapes au plus depuis l'accueil et 4 champs au plus ; adhésion, 5 étapes et le nombre de champs écrit en chiffre.

## États

| État | Rendu | Source |
|---|---|---|
| Champ faux ou vide | Erreur écrite sous le champ, qui dit quoi corriger ; le champ garde sa valeur ; focus sur le premier champ en erreur | [N9] ; [NN-form] point 10 ; `../formulaire.md` |
| Date d'essai complète | Affichée, « Complet » écrit, non choisissable ; les autres dates restent | [N1], [N5] |
| Aucune date d'essai ouverte | Dit quand les prochaines seront publiées et propose d'écrire au club | [N9] |
| Envoi échoué | Dit que les réponses sont gardées, propose de réessayer | [N9] |
| Succès | Page ou bloc de confirmation avec la suite, pas une simple notification qui disparaît | [G-confirmation] |
| Déjà membre | Un lien « Déjà membre ? Se connecter » sur la page de départ | [G-depart] |

## Sur téléphone

- Un champ par ligne, libellé au-dessus, jamais de texte d'exemple à la place du libellé [NN-form] points 3 et 5.
- `type`, `inputmode` et `autocomplete` justes (e-mail, téléphone, code postal) : le bon clavier s'ouvre et le navigateur remplit [W-ressaisie] ; déduit de [N7].
- Ne redemande jamais une information déjà donnée dans le parcours (le nom saisi à l'étape 2 est repris à la relecture) [W-ressaisie].
- Le bouton « Continuer » est sous le dernier champ, sur toute la largeur ; cible de 44 px [W-cible].
- Les formules s'empilent, la recommandée en premier.

## Erreurs fréquentes

| Erreur | Pourquoi | Source |
|---|---|---|
| Aucun chemin pour celui qui n'est pas membre : ni adhésion, ni essai | La moitié du public repart | [club], [G-depart] |
| « Réserver » ou « Rejoindre » mène à un écran réservé aux membres | Cul-de-sac : la personne voit un écran qui n'est pas pour elle | [club], [NN-mur] |
| Compte exigé avant d'avoir vu les formules ou les dates | Le compte est une barrière : on en laisse voir le plus possible avant | [G-compte], [NN-mur] |
| Prix « à partir de », frais découverts à la fin | Coût caché | [B-abandon] |
| Questions « au cas où » (profession, date de naissance pour un essai) | Chaque champ en trop coûte des abandons | [NN-form] point 1 ; [G-question] « ne demander que le nécessaire » |
| Bouton « Effacer » à côté de « Envoyer » | Risque de tout perdre pour rien | [NN-form] point 9 |
| Confirmation qui ne dit pas la suite | La personne ne sait pas si elle doit attendre un message, venir, payer | [G-confirmation] |

## Composants

`bouton-radio` (formule, date : deux à cinq choix visibles), `champ`, `case-a-cocher` (accord), `bouton`, `notification` (échec d'envoi). Liste de faits `k-facts` pour les prix. Pas de `carte` pour des formules sans image (voir `SKILL.md`, briques).
