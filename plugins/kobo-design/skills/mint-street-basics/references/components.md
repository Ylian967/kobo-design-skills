# Mint Street Basics — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées au pixel** sur la maquette (page de 1440px) ou « lues » à l'œil quand c'est indiqué. Les états (survol, choisi, ajouté) sont proposés : la maquette n'en montre qu'un. Code complet dans `examples/demo.html`.

## Règles communes

- **Deux mondes** : bleu nuit (héros, pied) et menthe (tout le reste). Le vert vif relie les deux.
- **Titres en capitales condensées très grasses** (`--font-display`), interligne ≈ 1, avec un **dégradé vertical** : blanc → gris sur bleu nuit, bleu nuit → ardoise sur menthe.
- **Tout est rond** : disques, arches, pilules, coins de 28px. Aucune ombre portée.
- Texte courant en sans (`--font-body`) 16px ; logotype en serif gras (`--font-logo`).
- Sur le vert, le texte est **bleu nuit**, pas blanc (contraste).

## Barre de navigation

Dans le héros, sans fond : logotype serif 32px, liens en capitales 13px (filet au survol), puis à droite quatre boutons ronds de 44px (menu, recherche, panier, compte). Sous 900px les liens disparaissent.

## Titre du héros

Trois lignes, capitales de 153px de haut (174px en Anton), pas de ligne de 175px, dégradé `--white` → `--silver`. Aligné à gauche sur la marge de 80px ; il passe **devant** la photo.

## Chiffres clés

Chiffre en police d'affiche 80px blanc suivi d'un « + » **vert**, légende 16px dessous. Deux blocs empilés sous le titre.

## Scène du héros

```
        ╭────────╮
       │  photo   │        ← arche (coins supérieurs pleins), 46 % de la scène
   ╭───┤  en      ├───╮
  │ disque vert       │    ← grand disque, dégradé radial --green-2 → --green
  │   ╭ disque clair ╮│    ← disque intérieur menthe → aqua
```

La scène occupe 64 % de la largeur, calée en bas à droite ; les disques débordent sous le héros. Une **pilule blanche « Explorer »** (62px, anneau clair de 7px) est posée sur le bord droit de la photo. Texte d'accroche de 270px en haut à droite.

## Bandeau défilant

82px de haut, dégradé vertical `--green-2` → `--green-3`, texte 20px gras bleu nuit, répété. `role="note"` avec le message une seule fois dans `aria-label`.

## Pilules et boutons

| Élément | Forme | Couleurs |
|---|---|---|
| Pilule blanche (`.pill`) | 62px, texte en police d'affiche 18px | fond blanc, anneau `--halo` |
| Pilule aqua (`.pill.aqua`) | idem, sur bleu nuit | fond `--aqua`, double anneau bleu nuit / aqua |
| Bouton rond (`.round`) | 64px | blanc, flèche `--ink` ; survol inversé |
| Ajouter au panier (`.cart`) | 352 × 62px, pilule | dégradé vert, texte bleu nuit 16px gras |
| Favori (`.fav`) | carré de 62px, coins 18px | contour `--ink-2` ; choisi : plein |

## Pile de collections

À gauche : titre sur trois lignes, deux lignes de texte, deux boutons ronds. À droite : une **pile de cartes photo** (coins 28px) ; les cartes suivantes dépassent à droite et en bas, plus petites et plus pâles. Un **encart blanc** (374px, coins 22px, titre 34px en police d'affiche + une ligne) chevauche le coin bas gauche de la pile.

## Carte produit

Photo de 461px de haut, coins 28px, fond `--card-soft`. Dessous, centrés : **pastilles de couleur** (9px, la première en pilule de 13px), nom en police d'affiche 32px, prix 16px. Grille de 3 colonnes à 24px ; la première carte occupe 2 colonnes (845px contre 411px). Lien « Voir plus ↗ » en police d'affiche 26px, aligné à droite.

## Fiche produit

Deux colonnes (738 / 480). À gauche, photo sur une **carte aqua** en dégradé (`--aqua-2` → `--aqua`), coins 28px. À droite :

1. Titre 83px sur deux lignes.
2. Note en gras, cinq étoiles `--star`, « d'après 762 avis » en `--muted`.
3. Description (24em).
4. « Taille et couleur » (14px gras) ; pastilles de 20px, la choisie en pilule de 44px ; nom du coloris 12px.
5. Puces de taille : 44 × 56px, coins 14px, contour `--line` ; la choisie est blanche et plus large.
6. « À partir de », prix en police d'affiche 28px.
7. Bouton vert + favori.

## Bloc « essentiels » (pied)

Sur bleu nuit : un **grand disque aqua**, un titre blanc géant sur deux lignes posé dessus, une photo en arche **devant** le titre, des rayures aqua horizontales à droite, un **disque vert** en bas à gauche avec un titre et deux lignes, une pilule aqua « Acheter » sur la photo.

## Carte du pied

Carte menthe à coins de 28px, à 50px des bords : adresse, deux colonnes de liens, bloc d'abonnement (titre en police d'affiche 20px, champ en pilule à contour avec bouton bleu nuit dedans), puis le **logotype géant** en serif (≈ 310px, sur toute la largeur) et la mention légale.

## Accessibilité

- Texte blanc sur bleu nuit (16:1), bleu nuit sur vert (5,3:1 à 7,1:1) et sur aqua (10,9:1), encre sur menthe (14,5:1). Le vert n'est jamais un petit texte sur menthe (`--green-ink` si nécessaire).
- Le titre du héros est découpé en lignes animées : le texte entier est dans `aria-label`.
- Pastilles et puces sont des boutons `aria-pressed`, avec un nom (« Crème », « M »). Le panier annonce son contenu (`aria-live`).
- Cibles de 44px au moins : pastilles (zone de 44px autour d'un rond de 20px), puces, boutons ronds.
- Toute la carte produit est cliquable par le lien du nom (`a::after`).
