# Mint Street Basics — mises en page

Conteneur `--container` 1360px, marges `--gutter` (16px → 48px), sections espacées de `--space-24` (96px ; 64px sur mobile). Ordre type : bleu nuit → bandeau vert → menthe → bleu nuit.

## Héros (bleu nuit)

```
brume.            ( Nouveautés ) Hauts  Bas  Accessoires        (🔍)(👤)(👜²)
● COLLECTION AUTOMNE 2026                                   ┌ Sweat Nuage · 59 € ┐
DES BASIQUES                                     ╭── arc vert ──╮
PENSÉS POUR                                     │   mannequin    │
CHAQUE JOUR                                     │   coupé à la   │
(EXPLORER →)   120+ | 15k+                      │   taille       │
━━━━━━━━━━━━━━━━━━━━━━━ bandeau vert défilant ━━━━━━━━━━━━━━━━━━━━━━━
```
Grille `1.15fr 1fr`, alignée en bas ; la scène de droite fait au moins 520px de haut et coupe le mannequin. Le bandeau colle au bas du héros.

## Collection (menthe)

```
COLLECTIONS                                   (Tout) (Hauts) (Bas) (Accessoires)
SOIGNEUSEMENT (vert)
CHOISIES
[carte blanche] [carte vert pâle] [carte blanche] [carte vert pâle]
NOM CONDENSÉ    NOM CONDENSÉ      …
29 €     ○ ● ●  59 € 79 €  ● ○ ●
```
Titre à gauche (12 caractères de large au plus), filtres alignés en bas à droite ; grille de 4 colonnes, écart 20px.

## Fiche produit (menthe)

```
[▢]  [  grand visuel carré, rayon 28px  ]     HAUTS / SWEATS
[▢]  [  vêtement détouré                 ]     SWEAT À CAPUCHE NUAGE
[▢]  [  (étiquette taille mannequin)     ]     ★★★★★ 4,8 · 126 avis
                                               59 €  79 €
                                               Description 2–3 lignes
                                               TAILLE            Guide des tailles
                                               [XS][S][M][L][XL][X̶X̶L̶]
                                               (AJOUTER AU PANIER)  [🔖]
                                               ✓ Livraison  ✓ Retours  ✓ Origine
```
Grille `1.1fr 1fr` ; vignettes 80px en colonne à gauche du grand visuel.

## Pied de page (bleu nuit)

Grille `1fr 1fr` : titre « ESSENTIELS POLYVALENTS » (second mot en vert vif), accroche, champ d'inscription | collage de cercles. Puis quatre colonnes de liens (titres Anton 18px), puis la **carte menthe du logotype géant** à 12–48px des bords.

## Mobile (≤ 760px)

- Barre : logotype + icônes ; liens dans un menu.
- Héros empilé : texte, pilule et chiffres, puis la scène (380px) avec le mannequin et l'arc.
- Collection : filtres sous le titre (retour à la ligne), grille 2 colonnes écart 12px, prix et pastilles sur deux lignes.
- Fiche produit : grand visuel en premier, vignettes en ligne dessous, puces de taille sur 3 colonnes, pilule + favori sur une ligne.
- Pied : une colonne ; liens en 2 colonnes ; logotype à 22vw.
- Aucun défilement horizontal : la grille du pied utilise `minmax(0, 1fr)`.
