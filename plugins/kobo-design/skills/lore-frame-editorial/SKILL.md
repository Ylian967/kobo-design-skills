---
name: lore-frame-editorial
description: Direction artistique « Lore Frame Editorial » pour sites de narration illustrée (univers de jeu, IP, bande dessinée, projet artistique), inspirée des sites primés qui racontent un monde chapitre par chapitre. Cadre fin qui entoure tout l'écran, rail latéral avec une étoile-boussole, manifeste en grotesque géante très serrée, micro-labels en monospace, pages éditoriales blanches qui alternent avec des illustrations plein cadre, vignettes à coin coupé, logo tracé à la main au chargement. À utiliser pour une landing d'univers, un lore, une présentation de factions/personnages, un portfolio d'illustrateur ou une app de lecture au style « éditorial, narratif, art de concept ».
---

# Lore Frame Editorial

> Un livre d'art qu'on feuillette à l'écran : un cadre fin, des titres énormes et serrés, et l'illustration qui prend toute la place quand l'histoire l'exige.

## L'idée

Toute la page est **encadrée** par un filet fin (inset 16px) avec un **rail à gauche** (une étoile-boussole, un numéro de chapitre) et une navigation minuscule en haut. Deux registres alternent : **chapitres illustrés** plein cadre (une image, un manifeste en grotesque géante blanche) et **pages éditoriales** blanches (titre noir serré, un paragraphe court en bas, des vignettes à coin coupé disposées librement comme sur une planche). Les métadonnées vivent en **monospace minuscule** (`// INITIALISATION`, `01 K`, `SCROLL`).

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de personnages, d'illustrations ni de noms de l'univers d'origine.

## Règles prioritaires

1. **Le cadre est permanent** : filet fin autour de l'écran, rail gauche, nav en haut ; il passe en blanc translucide sur les chapitres sombres.
2. **Grotesque géante et serrée** (900, -0.055em, interligne 0.86) pour 1 à 3 lignes maximum par écran. Tout le reste est petit.
3. **Mono minuscule** pour les labels, numéros, navigation (10–12px, capitales, +0.04em).
4. **Illustration = chapitre** : pleine page, texte posé dessus en blanc ; jamais d'illustration réduite en vignette carrée banale (les vignettes ont un coin coupé).
5. **Espace blanc assumé** sur les pages éditoriales : un titre en haut, un paragraphe en bas à gauche, des images dispersées.
6. **Contraste** : noir sur blanc, blanc sur `--ink` ; le violet `--accent` porte du texte blanc (5,2:1).
7. **Accessibilité** : la narration au défilement reste lisible sans animation ; les images ont des descriptions.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Cadre et rail, étoile-boussole, nav mono, manifeste géant, vignette à coin coupé, logo tracé, terminal « initialisation ». Puis, mesurés sur le site : écran « RESIZE », échelle fluide, libellés doublés, texte qui se décode, index du manifeste. |
| `references/layouts.md` | Ouverture, chapitre illustré, page éditoriale, factions, mobile. |
| `references/motion.md` | Tracé du logo, révélations au défilement, parallaxe des vignettes. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : sujets, cadrages, teinte violette, sources, prompts IA, idée 3D. |
| `examples/demo.html` | Page d'exemple complète. |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Manifeste, titres | **Inter Tight** 900 (ABC Whyte Plus d'origine, payante, variable) | capitales, -0.055em, interligne 0.86 ; phrases-chapitres mesurées à 3.25vw graisse 650 |
| Grands numéros, mot-titre | **Tektur** 700 (Hexaframe d'origine, payante) | 19–26vw, capitales |
| Labels, nav, numéros | **IBM Plex Mono** 400/500 | 10–12px, capitales, +0.04em |
| Paragraphes | Inter Tight 500 | 13–14px, interligne 1.4, colonne 260px |

## Images et 3D

Les chapitres et les vignettes portent de **vraies images** : art de concept du projet, ou photos nocturnes (masque, ville de nuit, rues au néon) toutes teintées vers le violet `--accent` et assombries en bas pour porter le texte blanc. Le cadre, l'étoile-boussole, le glyphe et le logo tracé restent en SVG, car ce sont des signes ; mais jamais de dessin CSS/SVG à la place d'une photo, d'un personnage, d'un lieu ou d'un objet. La 3D est optionnelle (maquette de ville pour « Le monde »). Détails, prompts et code dans `references/assets.md`.

## Signature

**Le cadre + l'étoile-boussole** : le filet qui entoure l'écran et la petite étoile à 4 branches sur le rail gauche, qui tourne de 45° à chaque changement de chapitre.

## À éviter

- Des cartes arrondies, des ombres, des dégradés d'interface : le décor vient des illustrations.
- Des titres moyens (24–40px) en série : soit géant, soit minuscule.
- Centrer les paragraphes ou les élargir.
- Utiliser les illustrations, noms ou logo de la référence.

## Adaptation React / React Native

- Cadre : `View` absolue avec `borderWidth: StyleSheet.hairlineWidth` et `pointerEvents="none"`.
- Coin coupé : masque SVG (`react-native-svg` `ClipPath`) sur l'image.
- Inter Tight et IBM Plex Mono : `@expo-google-fonts/inter-tight`, `@expo-google-fonts/ibm-plex-mono`.
- Chapitres : `FlatList` paginée verticale (`pagingEnabled`).

## Avant de livrer

- [ ] Cadre et rail présents sur tous les écrans.
- [ ] Titres géants serrés, tout le reste petit.
- [ ] Labels en mono.
- [ ] Illustrations en plein cadre ou en vignettes à coin coupé.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément de l'univers d'origine.
