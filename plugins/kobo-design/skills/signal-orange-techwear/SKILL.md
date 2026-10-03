---
name: signal-orange-techwear
description: Direction artistique « Signal Orange Techwear » pour mode technique, streetwear et marques cyberpunk (techwear, sneakers, équipement outdoor urbain, accessoires, drops de collection, gaming lifestyle), inspirée des concepts Dribbble de boutiques techwear. Fond anthracite, orange signal unique, titres en capitales géométriques très étendues empilées (une ligne orange, une ligne « // » avec pilule orange, une ligne en contour orange, une ligne blanche), mannequin central avec texte vertical, panneaux translucides à filet fin (fiche produit + tableau « specs opérateur » à étiquettes orange espacées et valeurs grises en mono), lien souligné « Explorer », icônes rondes au contour, index de section « 01 / LA COLLECTION — », onglets rectangulaires orange plein / contour, cartes produit à coin coupé. À utiliser pour une landing de collection, une fiche produit, un e-shop mode, un lookbook ou une app au style « techwear, cyberpunk, ninja urbain, nuit, HUD, orange et noir ».
---

# Signal Orange Techwear

> Un catalogue de vêtements techniques lu sur un HUD de nuit : anthracite, filets fins et une seule couleur, l'orange signal.

## L'idée

La page est un **écran d'opérateur** : fond anthracite, quadrillage presque invisible, panneaux translucides à filet de 1px. Au centre, le **mannequin** (la pièce) ; à gauche, un **empilement typographique** en capitales géométriques très larges qui alterne plein orange, « // » + pilule, **contour orange** et blanc ; à droite, des **panneaux de données** (fiche produit, specs) écrits en mono comme une fiche technique. L'orange est le seul signal : il marque l'actif, l'index, l'étiquette, le CTA. Tout le reste est gris.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom de marque, de produit, de photo ni de texte d'origine.

## Règles prioritaires

1. **Une seule couleur** : `--accent` orange signal. Pas de deuxième teinte, pas de dégradé coloré (sauf halo `--accent-glow`).
2. **L'empilement de titre** : 3–4 lignes courtes, une seule en contour, une seule en blanc ; la ligne « // » porte une pilule orange.
3. **Trois voix** : display étendue (titres, noms de produit), mono espacée (étiquettes, specs, boutons), Inter (texte courant gris 11–13px).
4. **Filets plutôt que fonds** : panneaux `--panel-glass` + `--border`, séparateurs `--line` ; rayon 2px (boutons) ou 6px (panneaux), cartes à coin coupé `--cut`.
5. **Données lisibles** : étiquette orange à gauche, valeur grise à droite, une ligne par donnée.
6. **Contraste** : texte sur orange plein toujours en `--on-accent` (noir) ; `--dim` seulement en grand (index, texte vertical).
7. **Accessibilité** : onglets en `role="tab"`, interrupteur en `role="switch"`, jauges doublées d'un texte `sr-only`, cibles ≥ 44px.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Navigation, empilement de titre, boutons (tous états), lien souligné, icônes rondes, panneau produit, tableau de specs, interrupteur, index de section, onglets, carte produit, bandeau défilant, texte vertical. Puis : cartes « système », étiquette de série, carte produit détaillée, fiche produit claire (relevées sur les 5 images du shot). |
| `references/layouts.md` | Héros en 3 colonnes, collection, mobile. |
| `references/motion.md` | Découpe des titres, ligne de scan, balayage des cartes, clignotant, mouvement réduit. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : sujets, cadrages, traitement N&B sombre + lueur orange, sources, prompts IA, recette du mannequin 3D `.glb`. |
| `examples/demo.html` | Page d'exemple complète (marque fictive). |
| `source.md` | Référence, observations et écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Empilement du héros, titres de section | **Michroma** (géométrique étendue) | capitales, 30–88px, interligne 1.02, +0.02em |
| Noms de produit, logo, texte vertical | Michroma | 13–18px, capitales, +0.04 à +0.3em |
| Étiquettes, boutons, specs | **JetBrains Mono** 500 | 10–11px, capitales, +0.18 à +0.22em |
| Texte courant | **Inter** 400 | 11–13px / 1.6, `--muted` |

Michroma n'a qu'une graisse : ne jamais simuler le gras. Alternative plus serrée : Syncopate 700.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Fond | `--bg` | page |
| Panneaux | `--panel`, `--panel-2`, `--panel-glass` | cartes, panneaux, survol |
| Filets | `--line`, `--line-strong` | séparateurs, contours |
| Texte | `--text`, `--muted`, `--dim` | titres blancs, texte courant, grands index |
| Signal | `--accent`, `--on-accent`, `--accent-glow` | actif, étiquettes, CTA, halo |

Règle : au plus **un** aplat orange par zone (onglet actif, pilule, ou bouton plein).

## Images et 3D

Le mannequin et les pièces sont de **vraies photos de mode** (ou un vrai mannequin 3D `.glb`), toujours **éteintes** : noir et blanc, sombres et contrastées, décor fondu dans la page par un masque radial. L'orange ne vient jamais de la photo : il est ajouté par l'interface (lueur `--accent-glow` en `screen`, étiquettes sur `--scrim`). Le mannequin 3D en rotation est l'option naturelle du héros, avec la photo en repli. Jamais de dessin CSS/SVG à la place d'une photo, d'un personnage ou d'un produit : détails dans `references/assets.md`.

## Signature

**L'empilement « UNIT-X / // ▬ / PHANTOM (contour) / MIDNIGHT »** à côté du mannequin, avec le **tableau de specs** en face. Une fois par page, dans le héros ; l'index « 01 / … — » et le titre orange géant en sont l'écho dans les sections.

## À éviter

- Du néon multicolore, des glitchs RVB, du violet/cyan : ici tout est mat et orange.
- Des cartes arrondies à grosse ombre : filets fins, coins coupés.
- Du texte blanc sur orange en petit, ou de l'orange en texte sur `--panel-2` en petit gris (préférer `--bg`/`--panel`).
- Des titres longs dans la police étendue : 1 à 2 mots par ligne.
- Copier le nom, le logo, les produits ou les photos du concept d'origine.

## Adaptation React / React Native

- Texte en contour : pas de `text-stroke` natif → `react-native-svg` `Text` avec `stroke={accent}` `fill="none"`.
- Panneaux translucides : `BlurView` (expo-blur, `tint="dark"`) + `borderWidth: 1`.
- Coin coupé : `react-native-svg` `Path` en fond de carte, ou une petite vue triangulaire `--bg` posée sur le coin.
- Texte vertical : `transform: [{ rotate: '90deg' }]` dans un conteneur à largeur fixe.
- Polices : `@expo-google-fonts/michroma`, `@expo-google-fonts/jetbrains-mono`, `@expo-google-fonts/inter`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur, une seule couleur d'accent.
- [ ] Empilement de titre avec une ligne en contour et une pilule.
- [ ] Panneaux de données (produit + specs) en mono, étiquettes orange / valeurs grises.
- [ ] Onglets, interrupteur et jauges accessibles.
- [ ] Testé à 375px et 1440px, aucun débordement horizontal, mouvement réduit respecté.
- [ ] Contrastes vérifiés (`python3 tools/check.py signal-orange-techwear`).
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément du concept d'origine.
