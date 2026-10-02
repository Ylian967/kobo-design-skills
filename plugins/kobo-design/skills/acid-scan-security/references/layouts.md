# Acid Scan Security — mises en page

## Grille et conteneur

- Marges `--edge` (16 → 40px). Héros et bandeau de mesures en pleine largeur ; sections de contenu dans `--container` (1320px) centré.
- Rythme vertical des sections : 96px. Point de rupture : 860px.

## En-tête

Absolu sur le héros, grille `1fr auto 1fr` : logo | liens centrés | bouton translucide. Hauteur ~76px. Pas de fond : le dégradé sombre du haut de la photo assure le contraste.

## Héros scan

```
◎ GRIDWARD        [PLATEFORME]  MENACES  MESURES  DOCS        [SE PROTÉGER]
                                │                    petit paragraphe
                                │                    pâle, 3 lignes
          ┌ SUJET 07 · SCAN ─────┼──────────┐
──────────│▓▓▓ ◉ ▓▓▓▓▓▓▓▓▓ ◉ ▓▓▓▓│▓▓▓▓▓▓▓▓▓▓│──────────  ← réticule à la hauteur des yeux
          └──────────────────────┼──────────┘ CORRESPONDANCE 99,2 %
■ CHIFFREMENT DE GRADE MILITAIRE│        (visage duotone tramé)
VOS DONNÉES                     │                       ┌─────────┐
RESTENT À VOUS.                 │                       │ 🔒      │
POINT FINAL.   ← --muted        │                       │ COMMENCER→
                                                        └─────────┘
```
Hauteur `max(100vh, 720px)`. Le visage (photo réelle, voir `assets.md`) est centré horizontalement, les yeux à 40 % de la hauteur (réglés par `data-eye`) ; le titre occupe le tiers bas gauche et peut chevaucher le bas du visage, jamais la bande de scan.

## Bandeau de mesures

4 colonnes pleine largeur, filets haut et bas, chiffres pixel + étiquettes mono.

## Grille de couches

En-tête de section : surtitre `[ Plateforme ]` + titre pixel à gauche, phrase `--muted` à droite (alignée en bas). Puis 3 cartes à crochets, gap 16px.

## Console d'analyse

Deux colonnes `.9fr / 1.1fr` : à gauche surtitre, titre, champ terminal, bascules, bouton plein ; à droite le journal (hauteur min 360px) avec la jauge segmentée.

## Bandeau final

Bloc centré à crochets 22px, fond `--deep` avec trame de points `--line` au pas de 10px ; surtitre, titre pixel géant sur deux lignes (seconde en `--muted`), bouton plein.

## Pied de page

Une ligne mono `--dim`, filet haut.

## Adaptation mobile (≤ 860px)

- Nav : logo + bouton translucide compact + bouton menu carré 44px.
- Héros (min 820px) : paragraphe en haut sur toute la largeur (sans la ligne mono) ; visage recadré à droite (centre à 56 %), yeux à 40 % ; titre pixel 42–54px au-dessus de la carte CTA ; carte CTA en bande horizontale en bas ; coordonnées du réticule masquées.
- Mesures en 2 × 2 ; cartes et console en une colonne ; journal à colonnes resserrées.
- Bandeau final : padding réduit, titre à 48px.
