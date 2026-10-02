# Sticker Brutal JP — mises en page

Structures déduites des captures du shot (valeurs estimées), réécrites comme patrons réutilisables.

## Grille et conteneur

- Page `--bg` ; une **scène** centrée de `--container` (1240px) + marges `--frame-gap` (12 → 48px) qui laisse la place aux autocollants.
- À l'intérieur, un **cadre** `--paper` : contour 3px, rayon 24px, ombre `--shadow-hard-lg`, `overflow: hidden`.
- Padding interne : 32px desktop, 16px mobile. Grilles : héros 1.08fr / 0.92fr, cartes 4 colonnes (2 sous 900px, 1 sous 640px), gouttière 24px.
- Points de rupture : 900px (héros empilé), 640px (navigation repliée, cartes en colonne).

```
 pêche ─────────────────────────────────────────────── ★ ■
 ◖ ┌─ ● ● ●  [ adresse ] ─────────────────────────────┐
   │ (● LOGO)   サービス 実績 プロフィール   (●日本語) │
   │                                                    │
   │ (こんにちは…)            ブ ┌──────╱╲──────┐       │
   │ LOUD                     ラ │  portrait   │ (◉)   │
   │ [BRAND]                  ン │   N&B sur   │       │
   │ DESIGN                   ド │    rose     │ [▤]   │
   │ 売れるブランドを、          (✓ 受付中) ╲╱           │
   │ corps 3 lignes                                     │
   │ [ 無料で相談する → ] [ 実績を見る ]                │
   │ ════ BRANDING ✦ UI DESIGN ✦ ロゴ制作 ✦ … ═════════ │
   │              (SERVICES)  できること                 │
   │  [▣ carte] [▣ carte] [▣ carte] [▣ carte]           │
   │  chiffres inclinés      puces de sujets            │
   │  ┌──── bloc contact jaune ───────────────(●)┐     │
   │  └──────────────────────────────────────────┘     │
   │ © …                              liens            │
 ◗ └────────────────────────────────────────────────────┘ ◗
```

## En-tête / navigation

- Barre « navigateur » blanche (trois ronds rose / jaune / vert contourés + pilule d'adresse), séparée par un filet 3px. Décorative (`aria-hidden`).
- Navigation statique (pas collante) dans le cadre : logo pilule à gauche, liens centrés, sélecteur de langue rose à droite.

## Héros

- Gauche : salutation en pilule inclinée (-2°), titre latin sur 3 lignes avec **un mot surligné** par un autocollant pervenche incliné derrière, sous-titre japonais 900 sur 2 lignes, corps 3 lignes max (34em), deux boutons.
- Droite : composition carrée — hexagone avec portrait photo réel (88 % de la zone, voir `assets.md`), katakana vertical qui dépasse à droite, 4 autocollants aux coins (bulle en haut à gauche, pastille œil à gauche, tuile graphique en bas à droite, pastille verte en bas à gauche).
- Padding vertical : 32px haut, 64px bas.

## Sections types

### Bande défilante
Pleine largeur du cadre (déborde de 2 % de chaque côté), inclinée, entre le héros et la première section.

### Services
En-tête centré (kicker + titre japonais 900 + phrase), 4 cartes. Padding 96px haut, 64px bas.

### Preuves
Deux colonnes : 3 chiffres en tuiles colorées inclinées (-2°, +1.5°, -1°) ; puces de sujets à sélectionner.

### Contact
Bloc jaune pleine largeur du cadre (marges 32px), titre + phrase à gauche, champ + bouton à droite.

## Pied de page

Bande blanche à filet supérieur 3px, Noto Sans JP 700 14px : mention à gauche, liens à droite.

## Adaptation mobile

- Sous 640px : cadre à 12px des bords, barre d'adresse masquée, liens remplacés par un bouton menu 44px, libellé de langue réduit à « JA ».
- Héros empilé : texte puis visuel (max 420px, centré) ; titre à `clamp(2.6rem, 13vw, 3.6rem)` ; boutons pleine largeur.
- Autocollants flottants réduits (56px) ; ceux qui débordent sont coupés par `overflow-x: clip` sur `html` et `body` — vérifier `scrollWidth = 390`.
- Cartes en une colonne ; chiffres restent sur 3 colonnes serrées ; champ et bouton pleine largeur.
