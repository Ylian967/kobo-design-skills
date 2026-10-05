# Clear Ledger Desk — mises en page

Un écran d'application, pas une page : pas de héros, pas de pied de page, pas de sections qui défilent longuement. La coquille est fixe ; seul le contenu change.

## Coquille d'application (proposé)

```
┌───────────────────────────────────────────────────────────────┐
│ ☰  Nom   [ chercher… / ]                    Compact   ?      │  en-tête : 48 px (40 en compact), collant
├──────────┬────────────────────────────────────────┬──────────┤
│ barre    │ contenu : liste, fiche ou tableau de   │ panneau  │
│ latérale │ bord                                   │ de détail│
│ 240 px   │ marges 24 px                           │ 416 px   │
│ (56 px   │                                        │ (à la    │
│ repliée) │                                        │ demande) │
└──────────┴────────────────────────────────────────┴──────────┘
```

- Grille à deux colonnes (`--side-w` puis le reste) et deux rangées (`--nav-h` puis le reste).
- Recherche au centre de l'en-tête, 448 px au plus, raccourci « / ».
- Le panneau de détail se pose par-dessus le bord droit du contenu ; il ne pousse rien.
- Lien d'évitement vers le contenu ; `<main>` reçoit le focus à chaque changement d'écran.

## Écran de liste

1. **Tête** : titre de 24 px, résumé chiffré dessous (`role="status"`), action principale à droite.
2. **Filtres** : une rangée de sélections libellées.
3. **Actions groupées** : le bandeau, seulement s'il y a une sélection.
4. **Tableau** dans un cadre à filet, rayon 8 px, bord à bord (lu : « le tableau va d'un bord à l'autre, un filet sépare l'en-tête »).
5. **Pied** : « 1 à 12 sur 12 », et le rappel des touches.

Écart entre les blocs : `--section-y` (32 px, 20 en compact).

## Écran de fiche (enregistrement)

1. **En-tête de fiche** : vignette carrée à l'initiale, nom en 24 px, une ligne de faits (secteur, effectif, ville), actions à droite (une seule pleine).
2. **Chemin d'étapes** de l'affaire en cours, avec son intitulé au-dessus.
3. **Deux colonnes** : à gauche les onglets (Historique, Affaires, Contacts, Notes) ; à droite, 320 px, un panneau « Informations » en liste de faits (intitulé en 12 px gras gris, valeur en 14 px).

## Tableau de bord

Quatre chiffres au plus sur une rangée qui se replie, puis deux panneaux : une répartition en barres horizontales (intitulé, barre neutre, montant aligné à droite) et une liste « à faire ». Les barres sont grises : la couleur reste aux états.

## Formulaire long (proposé)

Une colonne de 480 px au plus, champs empilés (confort) ; en compact, libellé et champ peuvent passer côte à côte (lu : « en compact, les éléments de formulaire s'empilent à l'horizontale »). Groupes séparés par un titre de 16 px. Actions en bas : la principale à gauche, « Annuler » en discret à côté.

## Adaptation à l'écran étroit (760 px et moins)

- La barre latérale devient un tiroir ouvert par ☰, fermé par Échap.
- L'en-tête passe sur deux rangées : nom et aide, puis la recherche.
- Le tableau devient une liste de fiches (voir `components.md`).
- Les deux colonnes de la fiche s'empilent ; le panneau de détail prend toute la largeur.
- La bascule de densité disparaît : sur un petit écran, les cibles restent celles du confort.
