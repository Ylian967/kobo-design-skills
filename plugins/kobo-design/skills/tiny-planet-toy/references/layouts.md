# Tiny Planet Toy — mises en page

## Écran-titre (vu sur le site)

```
┌──────────────────────────────────────────────┐  fond --sky, poussières
│                                              │
│               ┌───┬───┬───┐                  │
│            ·  │ E │ S │ T │  ·               │  logo 3 × 3 sur la planète
│          ( planète en volume )               │  ≈ 45 % de la largeur à 1440
│               │ T │ T │ E │                  │
│               └───┴───┴───┘                  │
│                 [ ENTRER ]                   │  bloc jaune penché, sous la planète
│                                              │
│      glissez la planète · défilez            │
└──────────────────────────────────────────────┘
```

Rien d'autre : pas de barre de navigation, pas de texte. Le site de référence s'arrête là avant de lancer le jeu.

## Page de présentation (proposée)

Le skill prolonge l'écran-titre par une page, pour présenter un jeu ou un projet :

```
│  écran-titre (100 % de la hauteur)             │
├────────────────────────────────────────────────┤
│  ( planète, glissée à gauche )   TROIS QUARTIERS│  la planète reste à l'écran
│                                  texte          │
│                                  [1 Le port   →]│  fiches de quartier
│                                  [2 Le phare  →]│
│                                  [3 Vieille…  →]│
│                                  ┌ESTAFETTE┐    │
│                                  │ dialogue │▶  │  boîte de dialogue
├────────────────────────────────────────────────┤ crème, filets d'encre
│               COMMENT JOUER                     │
│   [touches]      [touche]      [touches]        │  trois fiches
├────────────────────────────────────────────────┤ --sky-deep
│          VOTRE TOURNÉE COMMENCE                 │
│              [ JOUER MAINTENANT ]               │
└────────────────────────────────────────────────┘
```

- La planète est **collante** (`position: sticky`) sur les deux premières sections : en défilant elle glisse de 24 % de la largeur vers la gauche et rétrécit un peu, pendant que le logo s'efface. Choisir un quartier la fait pivoter.
- Colonne de texte de 520px à droite ; contenu de 1200px au plus.

## Mobile (proposé — sous 900px)

- La planète n'est plus collante : elle reste dans l'écran-titre, avec son logo et son bouton.
- Quartiers, dialogue, fiches : une colonne. Choisir un quartier change le dialogue ; la planète, plus haut, pivote quand même.
- Les trois fiches de « Comment jouer » s'empilent.

## Autres écrans (proposés)

**Menu de pause.** Panneau `--paper` à contour d'encre, de travers d'un degré, liste de boutons-blocs empilés (reprendre, carte, options, quitter).

**Carte.** La planète en grand, des pastilles numérotées posées dessus ; la fiche du lieu choisi dans une boîte de dialogue.

**Inventaire.** Grille de cases carrées à contour d'encre et tranche, un objet par case, étiquette `--blue` pour le nom.

**Fin de partie.** Fond `--sky-deep`, titre en `--font-block` crème, compteur en `--font-pixel`, bouton-bloc pour rejouer.

## Règles

- **Une seule planète**, et rien ne la concurrence : pas de photo, pas d'illustration à côté.
- Le fond de l'écran-titre reste uni ; les sections suivantes alternent turquoise, crème et bleu-vert profond.
- Les titres sont courts : la police en blocs est large.
- Pas de barre de navigation sur l'écran-titre.
