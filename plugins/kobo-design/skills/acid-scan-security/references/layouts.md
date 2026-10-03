# Acid Scan Security — mises en page

> La référence ne montre **que le héros** (une image 4:3). Les positions du héros sont relevées sur cette image ramenée à 1440px de large ; les sections suivantes sont **proposées** pour faire une page complète dans le même langage.

## Héros scan (relevé)

Hauteur `100svh` (min 640px). Tout est positionné en pourcentage de l'écran, sur la photo :

```
◎ GRIDWARD             SÉCURITÉ   CONFORMITÉ   RESSOURCES        ┃ SE PROTÉGER ┃  ← bouton collé en haut à droite, hauteur de la barre
                                │                      Une sécurité des données avancée…   ← 68 % / 17,5 %
                                │                      (4 lignes, Inter 18px)
CHIFFREMENT                     │                                                         ← 27 %
GRADE MILITAIRE  (jaune)  ┌─────┼─────┐
                          │█████│█████│▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ← bande claire 40 → 74 % de la largeur
──────────────────────────┼═════╪═════┼───────────────────────────  ← réticule à 36 % (trait jaune dans le cadre)
                          └─────┼─────┘
                                │        (portrait vert, yeux sur le croisement)
PROTECTION                      │                                       ┌ ─ ─ ─ ─ ┐
BLINDÉE POUR                    │                                         ┌─────┐
VOS DONNÉES   ← --muted         │                                         │ 🔒  │   ← carte CTA 186px + crochets
                                │                                         └─────┘
                             ■ DÉFILER                                  └ ─ ─ ─ ─ ┘
```

| Élément | Position à 1440 |
|---|---|
| Logo | gauche `--edge` (≈ 80px), centré dans la barre de 72px |
| Liens | centrés, écart ≈ 46px |
| Bouton nav | collé à droite et en haut, ≈ 214 × 72px |
| Paragraphe | gauche 68 %, haut 17,5 %, largeur ≈ 383px |
| Surtitre | gauche `--edge`, haut 27 % |
| Réticule | vertical 50 %, horizontal `--eye-y` 36 % |
| Cadre jaune | centré sur le croisement, ≈ 121px |
| Bande | 40 → 74 % de la largeur, ≈ 6 % de la hauteur, centrée sur les yeux |
| Titre | gauche `--edge`, bas 14 % |
| Carte CTA | droite `--edge` + 14px, bas 16 % |

Le **visage** est un peu à droite du centre : l'œil gauche (à l'écran) est sur le croisement, l'autre œil à droite.

## Page complète (proposé)

| # | Section | Fond | Contenu |
|---|---|---|---|
| 0 | Amorçage | `--void` | journal mono en bas à gauche + barre de progression |
| 1 | Héros scan | photo verte | voir ci-dessus |
| 2 | Mesures | `--bg` | 4 cellules pleine largeur à filets : chiffre pixel, jauge segmentée, étiquette mono |
| 3 | Plateforme | `--bg` | surtitre + titre 2 lignes à gauche, phrase à droite (alignée en bas) ; 3 cartes de couche avec images vertes |
| 4 | Console | `--bg`, filet haut | 2 colonnes `1fr / 1.15fr` : surtitre, titre, champ terminal, bouton, fiche d'identité | journal à crochets avec jauge |
| 5 | Bandeau final | dégradé radial vert + chiffres binaires | surtitre, titre géant 2 lignes centré, bouton, crochets |
| 6 | Pied | `--bg` | une ligne mono `--dim` |

Conteneur des sections : `--container` 1320px ; rythme vertical 96–128px ; point de rupture 860px.

## Adaptation mobile (≤ 860px)

- **Nav** 56px : logo + « Menu ».
- **Héros** : réticule à 34 % ; la photo couvre toute la largeur, l'œil reste sur le croisement ; surtitre sous la nav ; bas de l'écran empilé : **titre** (`12,5vw`, 3 lignes) → **paragraphe** (14px) → **carte CTA** 132px à gauche ; la bande va de 8 % à 92 % de la largeur ; lecture « ID 07 » masquée ; le dégradé du bas est plus haut et plus sombre pour la lisibilité.
- Mesures 2 × 2 ; cartes et console en une colonne.
- Bandeau final : titre `9vw` minimum 52px.
