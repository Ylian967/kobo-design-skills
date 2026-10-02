# Signal Orange Techwear — mises en page

Conteneur `--container` (1360px), marges `--gutter`, quadrillage de fond `--grid-size` à 35 % d'opacité, masqué en ellipse.

## Héros en 3 colonnes

```
┌ NOCTUNIT        COLLECTION  LOOKBOOK  LABO  ARCHIVES        SAC (3) ┐
├─────────────────────────────────────────────────────────────────────┤
│ — NOUVELLE COLLECTION        │ T          ┌ panneau produit ───────┐│
│ UNIT-X  (orange)          ░░ ▓▓ ░░ E      │ ▣  NX-01 SNEAKER        ││
│ // ▬▬▬                    ░ mannequin ░ C │    description          ││
│ PHANTOM (contour)         ░░   ▓▓   ░░ H  │ [VOIR LE FILM PRODUIT ↗]││
│ MIDNIGHT (blanc)            halo orange   └─────────────────────────┘│
│ texte gris 3 lignes                       ┌ SPECS OPÉRATEUR   v2.6 ┐│
│ EXPLORER →                                │ VISION        ▬▬▬▬▭     ││
│ (◎) (▷) (➤)                               │ NERF     réactif 0,2 s  ││
│                                           │ ● PROFONDEUR ON    (●─) ││
│                       ⌄                   └─────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
 // TOUT-TEMPS   COUTURES THERMOSOUDÉES   // MODULAIRE   …  (défilant)
 01 / LA COLLECTION — MIDNIGHT
 CHAQUE COUCHE.
 [TOUTES LES PIÈCES] [VESTES] [BAS] [ACCESSOIRES]            12 PIÈCES
 ┌──────◢ ┌──────◢ ┌──────◢ ┌──────◢
 │ tag   │ │      │ │      │ │      │
 │ pièce │ │      │ │      │ │      │
 │ NOM  €│ │      │ │      │ │      │
```

- Colonnes `1.05fr / 1fr / 0.95fr`, `min-height: min(100svh - 68px, 860px)`, contenu centré verticalement.
- Le mannequin occupe toute la hauteur de sa colonne, posé en bas, avec halo orange radial derrière et texte vertical en haut à droite.
- Chevron de défilement au centre bas.

## Collection

Index + titre géant, barre d'onglets séparée par un filet, grille 4 colonnes de cartes à coin coupé (`gap: 16px`).

## Pages produit (même langage)

Grande image à gauche (60 %), panneau sticky à droite : étiquette « NX-02 / Veste », nom Michroma 32px, prix mono, onglets de taille, bouton orange plein pleine largeur, tableau de specs en dessous.

## Tablette (≤ 1100px)

Héros en 2 colonnes (texte + mannequin), panneaux en 2 colonnes dessous ; grille produits en 2 colonnes.

## Mobile (390px)

- Nav : logo, compteur, burger.
- Ordre : texte (titre empilé ~34px) → mannequin (380px de haut) → panneaux en une colonne.
- Grille produits 2 colonnes serrées (`gap: 8px`), méta sur deux lignes ; pied en 2 colonnes.
- Vérifier : aucune ligne de l'empilement ne dépasse (`white-space: nowrap` + taille `clamp`), `scrollWidth === 390`.
