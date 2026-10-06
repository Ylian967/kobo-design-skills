# Prise de contact et devis

Écrire, appeler, demander un devis. C'est l'action principale de la plupart des sites vitrines. Sources : marques de `README.md`.

## Écrans attendus

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Les moyens de contact** | Téléphone, e-mail, adresse, horaires, dans l'ordre où les gens s'en servent ; le **délai de réponse** est écrit | [G-contact] : ordonner les canaux, dire quand on répondra, expliquer les exceptions d'horaires |
| **Formulaire** (s'il y en a un) | Le moins de champs possible, sur une colonne : qui écrit, comment répondre, la demande | [NN-form] points 1 et 3 |
| **Confirmation** | Dit que c'est parti, quand viendra la réponse, et par quel moyen | [G-confirmation] |

Un formulaire n'est pas obligatoire : un téléphone et une adresse e-mail suffisent quand le client répond lui-même. Un formulaire qui ne part nulle part est pire que pas de formulaire.

## Parcours

Entrée : n'importe quelle page. L'action de contact est dans la barre et dans la dernière section de chaque page (`SKILL.md`, « une seule action »).

1. Toucher l'action (« Demander un devis »).
2. Remplir et envoyer.
3. Confirmation.

**Objectif à écrire dans le plan : 3 étapes**, et le nombre de champs écrit en chiffre (viser cinq ou moins pour un premier contact ; déduit de [NN-form] point 1). Appeler : 1 touche depuis n'importe quelle page sur téléphone (`tel:`).

## Devis

Un devis demande plus de questions qu'un contact. Règles :

- Chaque question se justifie : sans elle, le devis ne peut pas être fait [G-question].
- Plus de sept ou huit champs : un groupe par écran, avec « Retour », et une relecture avant l'envoi [G-question], [G-relire].
- Les choix fermés (type de projet, budget) sont des boutons radio visibles, pas une liste déroulante, jusqu'à cinq options (`components/INDEX.md`).
- La page dit avant de commencer combien de temps ça prend et ce qu'il faut avoir sous la main [G-depart].

## Quand les demandes arrivent trop vagues

Le client rappelle pour tout redemander : le formulaire ne posait pas les bonnes questions. Règles (déduites de [G-question] et de [NN-form] point 1) :

- Demande au client **ce qu'il redemande à chaque fois au téléphone** : ce sont les champs. Rien d'autre.
- Ce qui se range en quelques cas (type de projet, fourchette de budget, délai) est un choix à cocher, avec une sortie « Je ne sais pas encore » : une case cochée vaut mieux qu'un champ libre vide.
- Ce qui ne se range pas tient dans **un** champ libre, dont l'aide dit quoi y mettre (« la surface à peu près, si vous avez déjà le terrain »).
- Quand on arrive depuis un élément précis (un projet, une offre), le choix correspondant est déjà coché.
- La page dit avant le formulaire combien de questions, combien de temps, et que rien n'est à préparer [G-depart].
- La confirmation redit la demande : le visiteur vérifie, et le client lit la même chose.

## États

| État | Rendu | Source |
|---|---|---|
| Champ faux | Erreur écrite sous le champ, valeur gardée | [N9], [NN-form] point 10 |
| Envoi en cours | Bouton occupé, libellé qui le dit | [N1] |
| Envoi réussi | Confirmation avec le délai de réponse | [G-confirmation], [G-contact] |
| Envoi échoué | Les réponses sont gardées ; un autre moyen est proposé (téléphone, e-mail) | [N9] |
| Fermé | Les horaires disent les jours de fermeture et les exceptions | [G-contact] |

## Sur téléphone

- Le numéro est un lien `tel:`, l'adresse e-mail un lien `mailto:`, l'adresse postale un lien vers un itinéraire [N7] (déduction).
- Cibles de 44 px, liens espacés [W-cible], [NN-doigt].
- `type="email"`, `type="tel"`, `autocomplete` [W-ressaisie].

## Erreurs fréquentes

| Erreur | Pourquoi | Source |
|---|---|---|
| Formulaire seul, sans téléphone ni e-mail visibles | La personne ne choisit pas son canal | [G-contact] |
| Aucun délai de réponse | Elle ne sait pas si elle doit rappeler | [G-contact] |
| « Merci ! » affiché sans que rien ne parte | Succès factice (`quality/anti-slop.md`, U7) | [N1] |
| Dix champs pour un premier contact | Abandon | [NN-form] point 1 |
| Texte d'exemple à la place du libellé | Le libellé disparaît dès qu'on écrit | [NN-form] point 5 |
| Sujet à choisir dans une liste de vingt lignes | Le tri est le travail de la maison, pas du visiteur | [G-question] |

## Composants

`champ`, `bouton-radio`, `bouton`, `notification`, liste de faits `k-facts` (horaires, adresse). Détail du formulaire : `../formulaire.md`.
