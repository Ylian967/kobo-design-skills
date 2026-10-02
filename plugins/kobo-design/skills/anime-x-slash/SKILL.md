---
name: anime-x-slash
description: Direction artistique « Anime X Slash » pour sites et apps d'anime ou de jeu d'action, inspirée des sites officiels de séries animées japonaises/chinoises récentes. Gris papier, noir, rouge signal, grands titres condensés rouges, découpes diagonales en X, cartes-parallélogrammes de classement, chiffres géants. À utiliser pour une page de série, de personnages, de classement, de casting, une landing d'anime, un fan-site ou une app au style « héros / ranking / manga d'action ».
---

# Anime X Slash

> Un site d'anime d'action : papier gris clair, aplats noirs, rouge signal, et tout est tranché en diagonale.

## L'idée

La page fonctionne comme une affiche de série découpée au cutter. Le fond reste clair et calme (gris papier `#f4f4f4`), le noir sert de cadre (menu, actualités, pied de page) et le rouge ne sert qu'à deux choses : les **grands titres condensés** et les **marqueurs** (dates, onglet actif, chiffres de classement). Toute l'énergie vient des **diagonales à ~33°** : visuels coupés en forme de X, cartes en parallélogrammes, filets fins qui traversent le fond.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, personnage, illustration ni nom de la série d'origine.

## Règles prioritaires

1. **Trois couleurs, pas une de plus** pour la structure : `--bg` (gris papier), `--ink` (noir), `--accent` (rouge). Les couleurs de personnages (`--chara-*`) n'apparaissent que sur la fiche du personnage concerné.
2. **Le rouge est un marqueur.** Grands titres de section, dates, onglet actif, chiffres. Jamais en fond de grande zone, jamais pour du texte courant.
3. **Diagonales à angle fixe** (`--slant`, `--skew`). Tous les biais de la page partagent le même angle ; deux angles différents cassent l'effet.
4. **Titres de section en Oswald capitales rouges, collés au bord gauche** (ils peuvent sortir de la grille). Le texte qui suit est décalé dans une colonne étroite (≈ 720px) qui commence vers 20 % de la largeur.
5. **Texte courant gras et aéré** : Noto Sans JP 700, 20px, interligne 2, espacement +0.04em. C'est ce qui donne le ton « annonce officielle ».
6. **Contraste** : sur aplat rouge, texte noir (`--on-accent`). Le blanc sur rouge n'est permis qu'en gras ≥ 19px. Le rouge `--accent-text` sur gris n'est permis qu'à partir de 24px.
7. **Accessibilité** : cibles ≥ 44px, focus visible (contour rouge 2px décalé), `prefers-reduced-motion` respecté (pas de glitch, pas de balayage).
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Avant de coder menu, boutons, liste d'actualités, cartes de classement, fiches casting, tags. |
| `references/layouts.md` | Avant de construire une page : écran de chargement, héros, intro, sections, pied de page, mobile. |
| `references/motion.md` | Avant d'ajouter une animation. |
| `examples/demo.html` | Pour voir le résultat attendu et reprendre des morceaux. |
| `source.md` | Mesures relevées et écarts assumés. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titres, chiffres, labels, menu | **Oswald** 400/500 | Capitales, interligne 1, `--text-title` pour les sections, `--text-number` pour les classements |
| Texte, noms, listes | **Noto Sans JP** 400/700 | 700 pour le texte d'intro (20px / 40px), 400 pour les listes |
| Noms dans le casting | Noto Sans JP 700 **italique** | Rouge `--accent`, rôle en noir italique petit à gauche |

Les deux polices sont sur Google Fonts : `family=Oswald:wght@400;500&family=Noto+Sans+JP:ital,wght@0,400;0,700` (l'italique de Noto Sans JP est synthétique, c'est le cas sur la référence aussi).

## Signature

**La découpe en X** : un grand visuel (ou un aplat) masqué par deux bandes diagonales parallèles qui laissent passer le fond. Une fois dans le héros (lettre X géante derrière le visuel principal) et une fois en milieu de page (visuel découpé). Pas plus.

## À éviter

- Ajouter un dégradé, une ombre floue ou des coins arrondis : la référence n'en a aucun (le seul rayon mesuré est `50%` pour les boutons ronds).
- Mélanger plusieurs angles de biais.
- Remplir le fond de rouge ou mettre plusieurs couleurs de personnages côte à côte hors de la grille de classement.
- Centrer les titres : ils s'accrochent à gauche.
- Copier le logo, les personnages, le nom de la série ou les textes d'origine.

## Adaptation React / React Native

- Découpes : `clip-path: polygon()` en web ; en React Native, `react-native-svg` avec `<ClipPath>` ou un masque `@react-native-masked-view/masked-view`.
- Parallélogrammes : `transform: [{ skewX: '-24deg' }]` sur le conteneur, contre-biais `skewX: '24deg'` sur le contenu pour garder le texte droit.
- Polices : `@expo-google-fonts/oswald` et `@expo-google-fonts/noto-sans-jp` (vérifier les noms d'export).
- Menu plein écran : `Modal` animé avec Reanimated (glissement de 400ms).

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Trois couleurs de structure seulement, rouge utilisé comme marqueur.
- [ ] Tous les biais au même angle.
- [ ] Titres de section rouges, alignés à gauche, texte dans une colonne décalée.
- [ ] Contrastes respectés (texte noir sur rouge).
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Aucun élément de la série d'origine.
