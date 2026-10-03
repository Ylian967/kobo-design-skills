# Chrome Atelier — mises en page

Mesures prises sur le site en ligne à 1440 × 900 le 2026-10-03 (page de 7 724px), complétées par les 11 images et la vidéo du shot. Le site règle sa racine à 0,9vw : toutes ses tailles grandissent avec la largeur de l'écran.

## Page (ordre du site)

| # | Section | Hauteur à 1440 × 900 | Fond | Contenu |
|---|---|---|---|---|
| 0 | Chargement | plein écran | `--mist` | arcs au compas, pourcentage entre crochets au centre |
| 1 | Héros nuit | 900px | photo `--night` | logo centré en haut ; titre en escalier à gauche, à mi-hauteur (bord à 32px) ; liens à droite à mi-hauteur ; barre de 58px en bas |
| 2 | Cartes | ≈ 500px utiles | blanc | 3 cartes 9:16 de 377px qui montent devant le bas du héros |
| 3 | Atelier | 2 700px de défilement, scène collante de 900px | blanc | planche : filets, cercle, pièce, roue des légendes, carats ; texte en haut à gauche (marge 67px) |
| 4 | Presse | 912px | blanc | étiquette + titre ; article au-dessus de la cellule active ; rangée de cellules de 235px |
| 5 | Galerie | 1 556px | blanc | texte et courbe à gauche ; 2 colonnes de photos sur la moitié droite |
| 6 | Questions | 900px | blanc | macro pleine hauteur à gauche (50 %) ; liste à droite |
| 7 | Liste d'attente | plein écran | noir + photo | carte blanche centrée (shot et vidéo ; sur le site c'est une fenêtre) |
| 8 | Pied | 267px | `--black` | une ligne |

```
            ═══ (logo)                                       HÉROS
                                    ╭───────────╮
  DES ANNÉES DE MAIN,             ╱   ╭─────╮     ╲
 DE TECHNIQUE                    │    │bijou│      │   LA PIÈCE  PRESSE  GALERIE
      ET DE DESSIN                ╲   ╰─────╯     ╱
       NOUS ONT MENÉS ICI.          ╰───────────╯
       texte · ( pilule ) ( pilule )
 ─────────────────────────────────────────────────────────────
   ÉPAISSEUR 6 MICRONS   │   À PARTIR DE 980 €   │   VOLUME 0,7 CM³     ← barre 58px

 [variations]                         ╲     │     ╱               ATELIER
 TROIS ORS,                             ╲ ╭─┼─╮ ╱   • OR JAUNE
    UNE SEULE MAIN                 ───────┤ ◈ ├───────  · or blanc
    texte · ( pilule ) lien             ╱ ╰─┼─╯ ╲      · or rose
 1/3                         10K, 14K, 18K, 22K
```

Règles :
- **Beaucoup de blanc, très peu de texte** : un bloc de texte par écran, toujours en haut à gauche (clair) ou à gauche à mi-hauteur (nuit).
- **Tout passe par le centre** : filets, cercle, pièce et axes du héros partagent le même centre.
- **Aucun arrondi** sauf les pilules ; photos à bords vifs, 8px d'écart.
- Marges : 67px à gauche des sections claires, 32px dans le héros, 16px pour la barre de navigation.
- Largeur de texte : 34 à 36 caractères par ligne.

## Adaptation mobile (≤ 767px, observée sur le shot et le site)

- **Héros** : la photo occupe le haut, le bijou vers 30 % de la hauteur ; dégradé vers le noir en bas ; titre (20px, lignes sans retrait), texte, deux pilules, puis la barre (3 cellules conservées).
- **Cartes** : empilées, 62 % de la largeur, centrées.
- **Atelier** : texte en haut, cercle à 86 % de la largeur, pièce au centre ; la roue devient une **rangée de trois libellés** sous la pièce, l'actif en `--ink` ; carats tout en bas.
- **Presse** : titre, article, puis une grande carte par écran (défilement horizontal aimanté).
- **Galerie** : texte puis les deux colonnes.
- **Questions** : macro en bandeau (62 % de la largeur en hauteur), liste dessous.
- **Navigation** : logo à gauche, deux traits à droite.
