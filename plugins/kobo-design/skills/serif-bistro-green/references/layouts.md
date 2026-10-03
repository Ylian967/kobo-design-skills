# Serif Bistro Green — mises en page

Page de 1440px, marges `--gutter` (60px), sections en **feuilles** qui se recouvrent. Les couleurs alternent : vert, crème, orange, vert, crème, orange, vert.

## Page d'accueil (vue dans la référence)

```
┌──────────────────────────────────────────────────────────┐ vert
│          [ logo   liens en pilules   ⌕  Réserver ]        │ barre flottante
│  Chaque        ╭──────╮            table                  │ titre, ligne 1
│  a le goût     │cheffe│        de chez soi                │ ligne 2 (2/3)
│   ( assiette ) │      │   Texte 20px                      │
│   3 lignes     │      │   [Voir la carte] [Notre histoire]│
│   [Commander]  │      │                                   │
╭──────────────────────────────────────────────────────────╮ crème
│                  Nos incontournables                      │
│        [fiche]≡[fiche]≡[fiche]      ● ○ ○                 │ carrousel relié
╭──────────────────────────────────────────────────────────╮ orange
│        ⌂ L'art de recevoir, / du premier verre / …        │ bandeau
╭──────────────────────────────────────────────────────────╮ vert
│  Explorez la carte                                        │
│  (Tout)(Entrées)(Grillades)…                              │ pastilles
│  [plat] [plat] [plat] [plat]                              │ grille de 4
╭──────────────────────────────────────────────────────────╮ crème
│  Soirées                              [photo]             │
│      en petit                                             │ titre en escalier
│  [photo]   comité                                         │
│            Texte + bouton                 [photo]         │
╭──────────────────────────────────────────────────────────╮ orange
│              ✉  Restons à table  [champ][S'abonner]       │ lettre
╭──────────────────────────────────────────────────────────╮ vert
│  logo   Naviguer   Contact   Horaires                     │
│  M a i s o n   S a u g e                                  │ nom géant
└──────────────────────────────────────────────────────────┘
```

Repères mesurés ou lus sur le shot : barre 1028 × 69px ; 2e ligne du titre aux 2/3 de la première ; bouton 214 × 54px ; trois fiches orange visibles ; grille de plats sur 4 colonnes ; cadre de photo de 8px.

## Version mobile (proposée — le shot ne la montre pas)

- Barre : logo, « Réserver », bouton de menu ; les liens s'ouvrent en panneau sous la barre.
- Héros : les quatre moitiés du titre s'empilent, centrées (21vw puis 12.5vw) ; texte et boutons, assiette et son texte, puis l'arche (64vw de large) posée en bas.
- Carrousel : une fiche à la fois, cinq points.
- Carte : 2 colonnes, description masquée, prix au-dessus du bouton.
- Titre en escalier : aligné à gauche ; les trois cadres passent dans une rangée de trois sous le titre, sans décalage au défilement.
- Pied : marque et horaires sur toute la largeur, deux colonnes entre les deux.

## Autres pages (proposées — non vues dans la référence)

**La carte.** En-tête vert court (titre sur une ligne, pas d'arche), pastilles collées sous la barre, grille de fiches de plat par rayon, chaque rayon séparé par un titre en `--font-display`. Feuille orange de réservation en bas.

**Réservation.** Feuille crème : à gauche le titre et les horaires, à droite un formulaire (date, heure, couverts) dans une fiche `--green-card` ; bouton `.btn` pleine largeur.

**Notre histoire.** Héros avec l'arche à gauche et le texte à droite ; feuille crème avec le titre en escalier et les cadres ; bandeau orange en citation.

**Soirée (détail).** Photo dans un grand cadre `--frame`, menu en six temps en liste numérotée (`--font-display` pour les numéros), fiche orange avec date, prix et bouton.

## Règles

- Une seule arche par page.
- Jamais plus de deux lignes géantes dans le héros ; le titre en escalier n'apparaît qu'une fois.
- L'orange couvre au plus deux feuilles par page, et jamais deux de suite.
- Largeur de lecture : 400px pour les paragraphes, 520px pour un texte centré.
