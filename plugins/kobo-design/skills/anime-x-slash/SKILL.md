---
name: anime-x-slash
description: Direction artistique « Anime X Slash » pour sites et apps d'anime ou de jeu d'action, inspirée des sites officiels de séries animées japonaises/chinoises récentes. Gris papier, noir, rouge signal, grands titres condensés rouges, découpes diagonales en X, cartes-parallélogrammes de classement, chiffres géants. Couvre l'accueil et les pages internes : menu plein écran, liste de personnages en parallélogrammes, fiche personnage sur fond noir, actualités, histoire (sélecteur d'épisodes), vidéos (filtres à encoche), musique (accordéon), mobile. À utiliser pour une page de série, de personnages, de classement, de casting, une landing d'anime, un fan-site ou une app au style « héros / ranking / manga d'action ».
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
| `references/components.md` | Avant de coder menu (bouton + plein écran), boutons, actualités, cartes de classement, casting, tags ; puis composants internes : titre de page, onglets, grille de personnages, fiche, bande d'épisode, liste News, sélecteur d'épisodes, filtres à encoche, carte vidéo, accordéon, bannière. |
| `references/layouts.md` | Avant de construire une page : chargement, héros, sections, pied de page, **gabarits internes** (personnages, fiche, actualités, histoire, vidéos, musique, spécial) et **mobile observé**. |
| `references/motion.md` | Avant d'ajouter une animation (accueil + pages internes, durées mesurées ou estimées). |
| `references/assets.md` | Avant de placer une image : sujets, cadrages, traitement N&B + couleur personnage, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Accueil : loader, héros X, actualités, intro, casting, classement. |
| `examples/personnage.html` | Page interne : menu plein écran ouvert, titre coupé, onglets, fiche noire, grille filtrée, bande et lignes d'épisode. |
| `examples/medias.html` | Pages internes : liste News 96px, sélecteur d'épisodes, filtres à encoche + cartes vidéo, accordéon musique. |
| `source.md` | Mesures relevées, pages explorées (mesuré / observé) et écarts assumés. |

## Pages couvertes

| Page | Gabarit (`layouts.md`) | Composants clés (`components.md`) | Exemple |
|---|---|---|---|
| Accueil | Héros, actualités, intro, casting, classement | Bouton MENU, X découpé, carte de classement | `demo.html` |
| Menu ouvert | Navigation plein écran | Overlay N&B, liens 2 colonnes, CLOSE rouge | `personnage.html` (bouton MENU) |
| Personnages (liste) | Gabarit « Personnages » | Titre coupé, onglets, grille parallélogrammes | `personnage.html` |
| Fiche personnage | Gabarit « Fiche » | Fiche noire, éclats, boutons ronds, grille filtrée, bande d'épisode | `personnage.html` |
| Actualités | Gabarit « Actualités » | Barres 96px, date rouge, pagination | `medias.html` |
| Histoire | Gabarit « Histoire » | Sélecteur d'épisodes, bloc épisode | `medias.html` |
| Vidéos / Musique | Gabarits « Vidéos », « Musique » | Filtres à encoche, carte vidéo, accordéon | `medias.html` |
| Spécial | Gabarit « Spécial » | Carte bannière mot-clé | — |
| Mobile | Section « Mobile » (observée à 390px) | MENU à droite, grille 2 par rangée | toutes les pages d'exemple |

Pages internes : fond `--bg-inner`, logotype noir centré, titre rouge géant coupé au bord gauche. Sur la fiche, le fond passe au noir et la couleur du personnage (`--c`) devient la seule couleur d'appoint.

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titres, chiffres, labels, menu | **Oswald** 400/500 | Capitales, interligne 1, `--text-title` pour les sections, `--text-number` pour les classements |
| Texte, noms, listes | **Noto Sans JP** 400/700 | 700 pour le texte d'intro (20px / 40px), 400 pour les listes |
| Noms dans le casting | Noto Sans JP 700 **italique** | Rouge `--accent`, rôle en noir italique petit à gauche |

Les deux polices sont sur Google Fonts : `family=Oswald:wght@400;500&family=Noto+Sans+JP:ital,wght@0,400;0,700` (l'italique de Noto Sans JP est synthétique, c'est le cas sur la référence aussi).

## Images et 3D

Les visuels sont de vraies images : illustrations officielles du projet en priorité, sinon photos de silhouettes d'action (sabre, lame, contre-jour) et de rues de nuit. Elles passent toutes en **N&B très contrasté**, la couleur n'arrivant que par les tokens (calque `--c` du personnage en multiply sur les cartes, voile rouge léger dans le héros, voile `--veil` dans la bande découpée). Les découpes en X, trames et éclats restent des formes CSS ; jamais de personnage, d'arme ou de décor dessiné en CSS/SVG à la place d'une image. 3D optionnelle. Détails : `references/assets.md`.

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
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément de la série d'origine.
