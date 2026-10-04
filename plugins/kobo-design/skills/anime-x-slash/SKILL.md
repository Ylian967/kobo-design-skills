---
name: anime-x-slash
description: Direction artistique « Anime X Slash » pour sites et apps d'anime ou de jeu d'action, inspirée du site officiel d'une série animée de super-héros. Gris papier, noir, rouge signal ; titres condensés rouges collés au bord gauche ; tout est tranché au même angle (36,4°) — visuel du héros en éclats, cartes de classement en parallélogrammes avec numéros rouges géants, bande-annonce visible à travers un X, étiquettes biaisées ; illustrations très colorées sur grand logotype magenta tramé. Animée — chargement à compteur avec logo qui se remplit, bande rouge, glitch du logo, personnages qui arrivent des deux côtés, porte diagonale, curseur rond à texte tournant, grille qui passe en noir et blanc au survol. Couvre l'accueil et les pages internes (menu plein écran, liste et fiche de personnages, actualités, histoire, vidéos, musique, mobile). À utiliser pour une page de série, de personnages, de classement, de casting, une landing d'anime, un fan-site ou une app au style « héros / ranking / manga d'action ».
---

# Anime X Slash

> Un site d'anime d'action : papier gris, aplats noirs, rouge signal, des héros en couleurs vives, et tout est tranché au même angle.

## L'idée

La page est une affiche de série découpée au cutter. **L'interface est stricte** : gris papier, noir, un rouge. **Les images sont vives** : personnages magenta, cyan, jaune, sur un logotype géant tramé. Entre les deux, **un seul angle, 36,4°** : le visuel du héros en éclats, les cartes en parallélogrammes, les portes de la bande-annonce, les étiquettes, les filets du fond. Les titres sont énormes, rouges, **collés au bord gauche** ; le texte est gras et très aéré.

Le mouvement est sec : 0,3 à 0,5s, sans rebond, avec trois moments forts (chargement, arrivée des personnages, glitch du logo). Tout est dans `references/motion.md`, avec les durées lues dans le code du site.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : ni logo, ni personnages, ni illustrations, ni noms, ni textes de la série d'origine.

## Règles prioritaires

1. **Trois couleurs d'interface** : `--bg` (gris papier), `--ink` (noir), rouge (`--accent-text` pour titres, dates, filets, numéros ; `--accent` pour les noms du générique et les aplats). Les couleurs vives viennent **des images** et de `--pop` derrière le héros.
2. **Un seul angle** : `--slant` / `--skew` (36,4°) pour tous les biais. Seule exception mesurée : la bande rouge du chargement (−25°).
3. **Titres de section** : Oswald 500 capitales rouges, capitales de 80px, **sans marge à gauche**. Contenu en colonnes centrées de largeur fixe (1052, 880, 840px).
4. **Texte courant gras et aéré** : Noto Sans JP 700, 20px / 40px, +0.8px.
5. **Parallélogrammes contre-biaisés** : le cadre est biaisé, la photo et le texte à l'intérieur sont redressés. Filet blanc entre deux cartes, triangles noirs aux bouts de rangée.
6. **Le noir et blanc est un état**, pas un style : carte non survolée, vignette non choisie, fond du menu.
7. **Aucun arrondi** (sauf boutons ronds), **aucune ombre**, aucun dégradé décoratif.
8. **Contraste** : texte noir sur aplat rouge ; rouge `--accent-text` sur gris seulement à partir de 24px.
9. **Fluide** : pas de `mix-blend-mode` sur un élément qui bouge, pas de filet animé en plein écran, une seule boucle (`motion.md`, « Performance »).
10. **Accessibilité** : cibles ≥ 44px, focus rouge 2px, `prefers-reduced-motion` ouvre sur l'état final, vrai texte pour le logotype et les titres.
11. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : couleurs, angle, tailles, durées et courbes mesurés. |
| `references/motion.md` | **Toujours** : les 9 mouvements signature, les survols, le code, les règles de performance. |
| `references/components.md` | Accueil : menu, logotype, héros en éclats, titre, bouton contour, bande-annonce en X, actualités, texte, staff et casting, carte et grille, curseur, pied. Pages internes : onglets, fiche, épisodes, filtres, accordéon. |
| `references/layouts.md` | Ordre et mesures de l'accueil, gabarits des pages internes, mobile. |
| `references/assets.md` | Avant de placer une image : sujets, cadrages, couleur ou gris, sources, prompts IA. |
| `examples/demo.html` | Accueil complet et animé (série fictive « Rank Zero »). |
| `source.md` | Ce qui a été mesuré, observé, proposé ; écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titres de section, numéros, menu, boutons, étiquettes | **Oswald** 400 / 500 | capitales ; titres 99px (capitales de 80px) ; numéros 91px ; menu ≈ 44px ; boutons 14px ; étiquettes 11px |
| Logotype | Oswald 700 italique | biais −12°, barre oblique rouge |
| Texte, listes | **Noto Sans JP** 400 / 700 | intro 20px / 40px en 700 ; actualités 16px / 32px |
| Noms du générique | Noto Sans JP 700 italique | 20px rouge `--accent` ; rôles 13px noirs |

Sur le site, les grands titres et le menu sont des images (une condensée proche de DIN) : Oswald 500 en est l'équivalent libre.

## Couleurs

| Rôle | Token |
|---|---|
| Fond des sections / du héros / des pages internes | `--bg` / `--bg-hero` / `--bg-inner` |
| Blocs noirs (menu, actualités, bloc d'intro, pied) | `--ink`, texte `--on-ink` |
| Titres, dates, filets, numéros, survol du menu | `--accent-text` |
| Noms du générique, bande du chargement, étiquette du pied | `--accent` (texte `--on-accent`) |
| Bouton MENU ouvert | `--menu-close` |
| Logotype géant derrière le héros | `--pop` |
| Éclats et fiches | `--chara-1` … `--chara-8` |
| Filets du fond | `--line-accent`, `--line-grey` |

## Images et 3D

De **vraies images très colorées** : illustrations des personnages du projet en priorité, sinon portraits éclairés au néon, armures, danseurs, rues de nuit. Dans le héros, 5 portraits dans des éclats en parallélogramme ; dans la grille, un personnage par carte, en couleur. Le gris n'apparaît que comme état (survol, vignette non choisie, fond du menu). Le logotype, le X, les éclats triangulaires, les trames et les filets sont des signes et restent en CSS / SVG ; jamais un personnage, une arme ou un décor dessiné. 3D optionnelle sur la fiche. Détails dans `references/assets.md`.

## Signature

**L'angle unique** : un héros en éclats de photos biaisés devant un logotype magenta tramé, et plus bas la grille de classement en parallélogrammes à numéros rouges géants, fermée par deux triangles noirs.

## À éviter

- Deux angles de biais différents, ou des cartes rectangulaires.
- Des arrondis, des ombres floues, des dégradés d'ambiance.
- Des images ternes ou passées en noir et blanc par défaut.
- Du rouge en grand fond, ou plusieurs couleurs d'interface.
- Des titres centrés ou avec une marge à gauche.
- Des révélations douces au défilement : le site n'en a pas.
- Le logo, les personnages, les noms ou les textes de la série d'origine.

## Adaptation React / React Native

- Parallélogramme : composant `<Slant>` (`skewX(-36.4deg)` + enfant contre-biaisé). React Native : `transform: [{ skewX: '-36.4deg' }]`, `overflow: 'hidden'`.
- Chargement, glitch, arrivée : classes posées dans un `useEffect` ; `react-native-reanimated` (`withTiming`, `Easing.bezier(0.86, 0, 0.07, 1)`).
- X de la bande-annonce : `clip-path` en web ; `react-native-svg` + `<ClipPath>` en natif.
- Curseur rond : web seulement.
- Polices : `@expo-google-fonts/oswald`, `@expo-google-fonts/noto-sans-jp`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Un seul angle partout ; photos et textes redressés dans les cadres biaisés.
- [ ] Titres rouges collés à gauche, colonnes centrées aux largeurs mesurées.
- [ ] Images en couleur, gris seulement comme état.
- [ ] Les 9 mouvements de `motion.md` présents là où la page en a besoin, coupés en mouvement réduit.
- [ ] Règles « Performance » respectées.
- [ ] Contrastes vérifiés (`python3 tools/check.py anime-x-slash`).
- [ ] Testé à 390px et 1440px, sans débordement horizontal.
- [ ] Aucun élément de la série d'origine.
