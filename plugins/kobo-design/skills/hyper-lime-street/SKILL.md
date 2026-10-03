---
name: hyper-lime-street
description: Direction artistique « Hyper Lime Street » pour sites et apps de jeu d'action urbain, inspirée des sites officiels de jeux d'action « street / néo-urbain » récents. Béton clair, blocs noirs rayés en forme de piste aux extrémités arrondies et coupées à 45°, lime fluo, titres condensés type Impact, numéros de section géants, pellicule photo, boutons pilule à gros contour, défilant de texte. Couvre l'accueil et les pages internes : liste d'actualités (badge de section numéroté, onglets en parallélogramme, cartes à coins asymétriques), article, univers en coverflow, fiche personnage avec pilule de doublage, newsletter, et une adaptation mobile. À utiliser pour une landing de jeu, une page de personnages, une page vidéos/actus, une app ou un site au style « urbain, fluo, cassette, rue, zine numérique ».
---

# Hyper Lime Street

> Une ville néo-urbaine en version magazine : béton, rubans noirs rayés, lime fluo et typo condensée qui crie.

## L'idée

La page est un **circuit** : de grands rubans sombres (« pistes ») traversent l'écran en zigzag, avec des extrémités arrondies (72px) et des coupes à 45°. Ils sont rayés en diagonale très finement. Entre eux, des **zones lime fluo** et des **panneaux blancs arrondis** portent le contenu. Chaque section est numérotée (01 → 06) avec un chiffre condensé géant. Le texte display est **Impact-like** partout : titres, liens, boutons, dates.

Sur les **pages internes**, le bloc numéroté devient un **badge de section** : une pilule lime (bleue pour Personnages) posée sur une bande noire rayée qui traverse l'écran en biais, avec le numéro de rubrique géant et, à droite, le mot anglais en filigrane géant. Les coins 72px laissent place à des **coins asymétriques** (deux coins opposés arrondis) et à des **parallélogrammes** pour tout ce qui est actif.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, personnage ou nom du jeu d'origine.

## Règles prioritaires

1. **Trois matières** : béton `--bg`, ruban noir rayé `--ink` + `--hatch`, lime `--accent`. Le blanc sert aux panneaux de contenu.
2. **Toutes les coupes à 45°** (`--cut`) ; toutes les rayures aussi. Les formes ont soit un rayon de 72px, soit une coupe à 45°, souvent les deux.
3. **Typo display condensée** (Anton) pour tout ce qui doit être lu vite : titres, numéros, boutons, dates, onglets. Inter seulement pour les paragraphes.
4. **Numéro de section géant** (01–06) aligné à droite dans un bloc lime, avec le titre de section au-dessus et un sous-titre anglais en capitales.
5. **Boutons pilule sombres à gros contour gris** (4.8px) avec chevron ›. Un seul bouton lime plein par écran (téléchargement / abonnement).
6. **Contraste** : texte noir sur lime (17,6:1), lime sur noir (15,8:1). Pas de gris `#787878` sur béton pour du texte : utiliser `--muted`.
7. **Accessibilité** : défilant de texte pausable au survol et arrêté si mouvement réduit ; cibles ≥ 44px.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Accueil : navigation, boutons pilule, ruban « piste », bloc numéroté, carrousel de vignettes, pellicule, pagination latérale, défilant. Pages internes : badge de section, barre d'onglets, carrousel bannière, carte d'actu asymétrique, en-tête d'article, onglet « Retour », coverflow, fiche personnage, newsletter. |
| `references/layouts.md` | Héros, sections numérotées en zigzag, gabarits Actus / Article / Univers / Personnage / Vidéo, mobile (proposé). |
| `references/motion.md` | Courbe easeOutCubic, défilant, entrées en glissement, dépliage du badge, onglets, coverflow. |
| `references/assets.md` | Avant de placer une image : photos de rue, duotone noir → lime, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Exemple : page d'accueil complète. |
| `examples/actus.html` | Exemple : page Actu & infos (badge 04, filigrane, bannière, onglets, grille de cartes asymétriques, onglet « Retour », newsletter). |
| `source.md` | Mesures et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Display (titres, numéros, boutons, nav, dates) | **Anton** (équivalent d'Impact) | 25px dominant, titres 53px, numéros 120px, interligne 1 |
| Paragraphes, méta | **Inter** 400/700 | 12–16px |

## Images et 3D

Les visuels sont de vraies images : key art et personnages du projet en priorité, sinon photos de rue (skate en action, murs de graffitis et d'autocollants, tunnels, ruelles), contrastées et légèrement désaturées. Sur un bloc lime, l'image passe en **duotone noir → lime** (N&B en `multiply` sur `--accent`) ; ailleurs elle garde ses couleurs, recouverte au besoin des rayures à 45°. Rubans, rayures, pellicule et autocollants restent des formes CSS ; jamais de personnage, de skate ou de décor dessiné en CSS/SVG à la place d'une photo. 3D optionnelle. Détails : `references/assets.md`.

## Pages couvertes

| Page | Gabarit | Composants clés | Exemple |
|---|---|---|---|
| Accueil | `layouts.md` § Héros, Sections 02 → 06 | ruban-piste, bloc numéroté, vignettes, pellicule | `examples/demo.html` |
| Actu & infos (liste) | `layouts.md` § Actu & infos | badge de section, bannière, onglets, carte asymétrique | `examples/actus.html` |
| Article | `layouts.md` § Article | en-tête d'article, barre fil d'Ariane, onglet « Retour » | — |
| Univers du jeu | `layouts.md` § Univers | coverflow, fond flouté | — |
| Fiche personnage | `layouts.md` § Personnages | badge bleu, pilule de doublage, bio défilante, cartes factions | — |
| Documents vidéo | `layouts.md` § Documents vidéo | badge 03, carte de liste | — |
| Mobile | `layouts.md` § Mobile (adaptation proposée, non observée) | tiroir, onglets défilants | les deux exemples à 390px |

## Signature

**Le ruban-piste rayé** : un grand bloc `--ink` à extrémités arrondies de 72px, coupé à 45° d'un côté, rayé de fines diagonales, qui relie deux sections en zigzag.

## À éviter

- Des arrondis moyens (12–16px) sur les grandes formes : c'est 72px ou 45°, pas entre les deux.
- Du lime en texte sur fond clair (illisible) ou plusieurs couleurs vives : le lime est la seule couleur.
- Une typo display large ou ronde : elle doit être condensée.
- Copier le logo, les personnages, les noms ou les illustrations du jeu d'origine.

## Adaptation React / React Native

- Rubans : `View` avec `borderRadius` sur deux coins + triangle `react-native-svg` pour la coupe à 45°, ou un seul `Path` SVG.
- Rayures : `Pattern` SVG ou image répétée (`resizeMode="repeat"`).
- Anton : `@expo-google-fonts/anton`.
- Défilant : `Animated` / Reanimated `withRepeat(withTiming(-largeur, { duration: 20000, easing: Easing.linear }))`.

## Avant de livrer

- [ ] Trois matières seulement, toutes les coupes et rayures à 45°.
- [ ] Sections numérotées 01, 02… avec numéro géant ; pages internes avec badge de section + filigrane.
- [ ] Un seul bouton lime plein par écran.
- [ ] Défilant pausable, mouvement réduit respecté.
- [ ] Testé à 375px et 1440px.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément du jeu d'origine.
