# Outil interne pour employés

CRM, back-office, suivi de commandes, administration : un outil dans lequel des **employés** travaillent plusieurs heures par jour, sur un ordinateur, après avoir été formés. C'est le seul cas où la structure `application` et le skill `clear-ledger-desk` conviennent. Un espace pour des clients, des membres ou des adhérents n'en est pas un : voir `compte-espace-membre.md`. Sources : marques de `README.md`.

## Le test avant de choisir cette fiche

Les quatre réponses doivent être « oui » :

1. Les utilisateurs sont **payés pour s'en servir** (salariés, bénévoles permanents du bureau).
2. Ils s'en servent **plusieurs fois par jour**.
3. Ils travaillent surtout sur **ordinateur**.
4. Ils manipulent **beaucoup d'enregistrements** (des dizaines à l'écran, des centaines en base) qu'il faut chercher, comparer, modifier.

Un « non » : ce n'est pas un outil interne. Trois réservations par semaine sur un téléphone n'en sont pas un [club].

## Écrans attendus

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Liste** | Un tableau : trouver, trier, filtrer, comparer ; en-têtes qui restent ; première colonne lisible (un nom, pas un identifiant) | [NN-tableau] : les quatre tâches d'un tableau |
| **Détail à côté de la liste** | Lire et modifier un enregistrement sans perdre la liste | [NN-tableau] : panneau latéral plutôt que modale |
| **Fiche** | Tout sur un enregistrement, son historique, ses gestes | [N6] |
| **Création / modification** | Formulaire court, erreurs sous les champs | [NN-form], [N9] |
| **Tableau de bord** | Seulement si une tâche du plan commence par « savoir où on en est » | [N8] |

## Parcours

Entrée : la liste, sur la vue de travail de la personne (ses affaires, les commandes du jour).

1. Trouver l'enregistrement (recherche, filtre, tri).
2. L'ouvrir à côté.
3. Faire le geste (changer une étape, ajouter une note).
4. Retour visible, la liste est à jour.

**Objectif à écrire dans le plan :** le geste le plus fréquent en 3 étapes au plus depuis l'écran d'arrivée, et faisable **au clavier seul**.

## États

| État | Rendu | Source |
|---|---|---|
| Filtres actifs | Écrits et comptés ; « Tout effacer » | [NN-tableau] filtres visibles ; [N1] |
| Aucun résultat | État vide qui dit quel filtre retirer | [N9] |
| Chargement, échec | `../etats-de-page.md` | [N1], [N9] |
| Geste destructeur | Confirmation qui redit l'objet ; ou annulation possible après coup | [N5], [N3] |
| Sélection de plusieurs lignes | Cases à cocher, « tout sélectionner », gestes groupés | [NN-tableau] |
| Droits insuffisants | Le geste est absent ou désactivé avec la raison écrite | [N1], [N5] |

## Ce qui est justifié ici, et seulement ici

- **Raccourcis clavier** : des accélérateurs pour l'expert, qui ne remplacent jamais le chemin visible [N7].
- **Barre latérale** : quand il y a plus de cinq vues de travail ; déduit de [N6].
- **Recherche globale** : quand la base dépasse ce qu'un filtre ramène à un écran ; déduit de [N7].
- **Densité compacte** : quand comparer des lignes est la tâche [NN-tableau].

Chacun reste soumis à la règle 3 de `../../methode.md` : une tâche du plan doit le demander.

## Sur téléphone

Un outil interne se consulte parfois en déplacement. Le tableau se réduit à deux ou trois colonnes lisibles, la première épinglée, le reste dans le détail [NN-tableau-mobile]. Si le téléphone est l'appareil **principal** des utilisateurs, ce n'est plus cette fiche.

## Erreurs fréquentes

| Erreur | Pourquoi | Source |
|---|---|---|
| Poser cette forme sur un public (membres, clients) parce que « c'est une application » | Autre public, autre appareil, autre fréquence | [club] |
| Modale pour modifier une ligne | On perd la liste qu'on comparait | [NN-tableau] |
| Identifiant technique en première colonne | Illisible | [NN-tableau] |
| Filtres actifs invisibles | On croit que des données manquent | [NN-tableau], [N1] |
| Raccourci comme seul moyen d'atteindre un geste | Invisible pour qui ne le connaît pas | [N6], [N7] |
| Tableau de bord en écran d'arrivée par habitude | Un écran de plus avant le travail | [N8] |

## Composants

Ceux de la structure `application` : `tableau`, `selection`, `case-a-cocher`, `champ`, `modale` (décisions courtes), `etat-vide`, `onglets`, `pagination`, `menu-deroulant`. Lis `../../structures/application/README.md`.
