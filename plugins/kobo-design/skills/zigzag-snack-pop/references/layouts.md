# Zigzag Snack Pop — mises en page

Conteneur `--container` (1200px), marges `--gutter`. Rythme vertical en `--space-16` / `--space-24`.

## Page d'accueil produit

```
┌─ nav brune ──────────────────────────────────────────┐
│ ▲MARQUE      BARRES ▾  INGRÉDIENTS ▾  SORTIES  AVIS  (🛍2) │
├─ héros orange ───────────────────────────────────────┤
│              [ NOUVELLE RECETTE ]                     │
│                 VRAIES                                │
│            [PROTÉINES], (jaune autocollant)           │
│              ZÉRO DÉTOUR                              │
│          accroche 2 lignes, centrée                   │
│      [ J'EN PRENDS › ]  [🔍 chercher…      ]          │
│   ▲▲ photos d’aventure en duotone, découpées en crêtes ▲▲ │
│ 🛹 ▲▲▲▲▲▲ 2e plan ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲        │
└╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱┘
  bande crème : (●) 20 G DE   (●) SANS SUCRE  (●) …  ×5
 ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲
┌─ section brune + traces de pneu ─────────────────────┐
│ (BOUTIQUE)                    ╭──────────╮            │
│ LE CARBURANT DES              │ emballage │ disque    │
│ SORTIES LONGUES               │  incliné  │ orange    │
│ 20 g protéines (italique)     ╰──────────╯            │
│ texte · [ COMPOSER MA BOX › ]                          │
└──────────────────────────────────────────────────────┘
  CHOISIS TA SAVEUR                     texte court
  [carte vert]  [CARTE BEIGE ↑ plus grande]  [carte bleue]
  ILS L'ONT MISE DANS LE SAC                  (tampon ⟳)
  [avis]  [avis ↻1°]  [avis ↺1°]
 ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲
┌─ pied brun ──────────────────────────────────────────┐
│ REJOINS LA CORDÉE          [e-mail      ] [S'INSCRIRE]│
│ liens…                                                 │
│        M A R Q U E  (contour jaune géant, coupé)      │
└──────────────────────────────────────────────────────┘
```

## Héros

- `padding-bottom: calc(var(--scene) + 70px)` : le texte ne descend jamais dans la zone des montagnes.
- `.scene` absolue en bas (`--scene` : clamp 220–340px) contient : soleil (disque `--orange-bright` flouté par un dégradé radial), bande photo arrière (100 % de la scène) et bande photo avant (58 %) : vraies photos d'aventure en duotone, découpées en crêtes par `clip-path` (image réelle, voir `assets.md`).
- Le bas du héros porte `.zz-bottom`, la bande crème suivante remonte de `--zigzag-h`.

## Bande ingrédients

Grille de 5 colonnes (pastille + libellé à droite). 2 colonnes sous 960px, la dernière pleine largeur ; sous 560px, libellé centré sous la pastille.

## Section brune

Grille 1.1fr / 1fr : texte à gauche, photo produit dans un disque orange à droite. Traces de pneu en fond (2–3 bandes). Passe en une colonne sous 960px.

## Grille produits

3 colonnes, `align-items: center` pour que la carte surélevée dépasse en haut et en bas. Sous 960px : une colonne, la carte « best-seller » remonte en premier (`order: -1`) et perd son échelle.

## Avis

Titre à gauche, tampon tournant en haut à droite (absolu ; en flux sous 960px), 3 cartes en grille → une colonne sur mobile.

## Pied de page

Fond `--bar` avec `.zz-both`, inscription à la lettre d'info, liens 12px capitales, mot géant en contour coupé par le bas, mention légale centrée.

## Mobile (390px)

- Nav : logo + burger + panier.
- Titre héros 54px, boutons et champ pleine largeur, ombre du mot autocollant à 3px.
- Scène 170px ; les bandes photo restent, recadrées au centre.
- Pastilles 64px, disque produit ramené à la largeur de la colonne.
- Aucune largeur fixe > 360px ; vérifier `scrollWidth === 390`.

---

## Ordre complet observé dans la vidéo du shot

1. Navigation brune (logo, « Points de vente », menus ▾, FAQ, Contact, recherche blanche, Panier).
2. Héros orange (titre, main + barre, tampon tournant, cycliste « 20 G PROTÉINES », bouton jaune).
3. Dents de scie → bande d'ingrédients blanche (pastilles rondes, **défilement horizontal**).
4. Section brune « UNE PROTÉINE POUR TOUS » : titre + pilule jaune, coach détouré + pastille, pile de produits, texte « 20 G », carte carburant.
5. Dents de scie → « SAVEURS LES PLUS POPULAIRES » + bouton orange « Voir les saveurs → » ; 3 cartes produit, celle du milieu surélevée.
6. Section brune « parcours » : carte d'avis, citation, personnes détourées.
7. Bento blanc « testé par des coachs » (3 tuiles).
8. Section brune : lettre d'info, puis pied de page.
