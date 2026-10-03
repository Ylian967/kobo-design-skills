# Zigzag Snack Pop — mises en page

Page de 1440px, marges de 60px, posée sur un fond sombre avec 16px de marge.

## Page d'accueil (vue dans la référence)

```
┌──────────────────────────────────────────────────────────────┐ brun, 47px
│ ZIG   Nos barres ⌄  Ingrédients ⌄  Parcours   [Rechercher] Panier│
├──────────────────────────────────────────────────────────────┤ orange
│              PURE PROTÉINE, (jaune)                           │
│              INGRÉDIENTS NETS                                 │
│        (tampon)  [ photo du produit, penchée ]  20 G…         │
│                    [ PRENDS LA TIENNE › ]          montagnes  │
│▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲│ blanc
│   (○)      (○)      (○)      (○)      (○)      (○)   →        │ bande qui défile
│▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼│ brun
│ ZIG PROTÉINE POUR      [ pile de   ]   20 G DE PROTÉINES      │
│ [COMMANDER] TOUT LE    [ produits  ]   texte                  │
│ MONDE !  (portrait)                    [fiche « carburant »]  │
│▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲│ blanc
│ LES SAVEURS PRÉFÉRÉES                          [ TOUT VOIR › ]│
│   [ fiche ]  [[ FICHE DU MILIEU ]]  [ fiche ]                 │
│▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼│ brun
│ [fiche d'avis]                      NOTRE CHEMIN ZIG-ZAG      │
│ « citation »                        (portrait)  (portrait)    │
│▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲│ blanc
│           LE CROQUANT QUI NOURRIT TON FEU INTÉRIEUR           │
│                    [ PRENDS LA TIENNE › ]                     │
│   [texte]  [ photo ]  [ titre        | photo ]                │ mosaïque
│▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼│ brun
│ SOIS AU COURANT…                 [adresse e-mail][S'abonner]  │
│ ZIG    liens      liens      liens                            │
│ ZIG PROTÉINE (mot géant, jaune, italique)                     │
└──────────────────────────────────────────────────────────────┘
```

Repères mesurés ou lus sur le shot : barre de 47px ; titre du héros aux capitales de 92px ; bouton ≈ 236 × 56px ; cinq pastilles visibles à la fois ; trois fiches de saveur, celle du milieu plus haute de ≈ 44px ; mosaïque sur trois colonnes inégales.

## Tablette (proposée — sous 980px)

- Menu replié derrière un bouton carré jaune ; le champ de recherche disparaît.
- Sections brunes sur une colonne.
- Mosaïque sur deux colonnes, la tuile large en dessous.
- Tampon et mention remontent contre la photo.

## Mobile (proposé — sous 640px)

- Fiches de saveur empilées, toutes à la même taille.
- Pastilles de 110px.
- Mosaïque sur une colonne ; la tuile large empile son titre et sa photo.
- Le bouton glissé dans le titre passe à la ligne.

## Autres pages (proposées — non vues dans la référence)

**Boutique.** En-tête orange court (titre sur une ligne, montagnes), bande blanche de filtres en boutons `.btn--s`, grille de fiches de saveur sur trois colonnes sans fiche agrandie.

**Fiche produit.** Moitié gauche de la couleur de la saveur avec la photo-autocollant ; moitié droite blanche : nom en `--font-display`, tampon, prix, sélecteur de quantité à ombre dure, bouton jaune. Dessous, la bande d'ingrédients.

**Ingrédients.** Section blanche à grandes pastilles (220px) sur trois colonnes, chacune avec deux lignes de texte ; section brune « ce qu'on n'y met pas » en liste barrée.

**Panier.** Lignes sur blanc séparées par un filet, total dans une fiche brune à texte blanc, bouton jaune sur toute la largeur.

## Règles

- Les fonds alternent ; deux sections de même couleur ne se suivent jamais, et chaque passage du blanc à une couleur se fait par les dents de scie.
- Un seul mot jaune par titre.
- Une seule fiche agrandie par rangée.
- Le héros reste centré ; les sections brunes sont asymétriques.
