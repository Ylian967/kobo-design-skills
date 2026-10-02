# Glass Frame Estate — mises en page

Conteneur `--container` (1280px), marges `--gutter`, sections `--space-24` en vertical.

## Accueil

```
┌──────────────── photo floutée ────────────────┐
│ ┌──────────── cadre 1px, rayon 6 ───────────┐ │
│ │ ✕ MARQUE          10:30     PARIS · MENU ⠿│ │
│ │        M A R Q U E  (blanc → transparent) │ │
│ │                 /\                        │ │
│ │   colline      /██\  maison    🌲          │ │
│ │ PROPRIÉTÉS                ┌─ verre ─────┐ │ │
│ │ D'EXCEPTION               │ ▣ conseiller│ │ │
│ │ [EN SAVOIR PLUS →]        │ [APPELER →] │ │ │
│ └───────────────────────────└─────────────┘─┘ │
└───────────────────────────────────────────────┘
 01 — SÉLECTION                  (TOUS)(MAISONS)…
 BIENS À LA UNE
 [photo 16:10]          [photo 16:10]
 titre ........ prix    titre ........ prix
 [photo]                [photo]
█████████████ bande noire █████████████████████████
 1 200+     48 h     96 %     14
 logo   logo   logo   logo   logo
████████████████████████████████████████████████████
 02 — L'ÉQUIPE / NOS CONSEILLERS      [NOUS REJOINDRE →]
 [▯][▯][▯][▯]
 [▯][▯][▯][▯]
░░ surface ░░ 03 — JOURNAL : 3 cartes ░░ lettre d'info ░░
█ pied noir : colonnes + M A R Q U E estompé █
```

## Héros

- Hauteur `100svh`, bornée 640–960px ; marge `--frame-inset` autour du cadre.
- Plans dans la photo : ciel → mot-marque (haut, 12 %) → colline/sujet → voile.
- Titre à `--space-8` du bas et de la gauche ; carte verre à `--space-8` du bas et de la droite. Les deux reposent sur le voile.

## Catalogue

Grille 2 colonnes, `gap: 48px 32px`. En-tête de section : surtitre numéroté (« 01 — Sélection ») + titre en capitales à gauche, filtres ou bouton contour à droite (`flex-wrap`).

## Bande noire

Pleine largeur, 4 colonnes de chiffres puis logos, sans titre (étiquette `aria-label`).

## Équipe

4 colonnes × 2 rangées, portraits 4:5.

## Journal + lettre d'info

Section `--surface` : 3 cartes, puis bloc 2 colonnes séparé par un filet (titre à gauche, champ à droite, alignés en bas).

## Mobile (390px)

- Cadre à 12px du bord ; barre : logo + « MENU » ⠿.
- Mot-marque à ~80px, descendu à 21 % pour rester derrière le toit ; maison à 58 % de largeur.
- Carte verre pleine largeur collée en bas du cadre ; titre et bouton juste au-dessus (accroche masquée).
- Annonces, articles : 1 colonne. Équipe et chiffres : 2 colonnes. Lettre d'info et pied : 1 colonne.
- Toujours `min-width: 0` sur les enfants de grille qui contiennent un champ.
