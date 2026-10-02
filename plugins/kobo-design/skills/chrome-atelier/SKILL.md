---
name: chrome-atelier
description: Direction artistique « Chrome Atelier » pour fiches produit de luxe et landings de pré-lancement (bijou, joaillerie, horlogerie, objet design, parfum, accessoire haut de gamme), inspirée d'un concept Dribbble de bijou d'oreille sculptural en rendu 3D. Fond blanc cassé traversé de filets gris (diagonales et croix passant par le centre), grand cercle fin autour de la pièce posée au centre, étiquettes entre crochets en mono, titres en capitales larges sur deux lignes décalées, légendes reliées à la pièce par un trait (« • OR JAUNE »), bouton pilule à contour, variante nuit en photo bleu-gris profond avec barre de caractéristiques en trois colonnes. À utiliser pour une page produit premium, une liste d'attente, un lancement en série limitée ou une app e-commerce au style « luxe technique, chrome et or, galerie, minimal ».
---

# Chrome Atelier

> Une pièce d'orfèvrerie posée sur une planche d'architecte : filets fins, cercle de cadrage, chrome et or qui brillent seuls au milieu du blanc.

## L'idée

La page est une **planche de présentation** : un fond blanc cassé, des **filets gris** qui se croisent exactement au centre (deux diagonales, une verticale, une horizontale) et un **grand cercle fin** qui cadre la pièce. Le produit, en rendu 3D métallique, est le seul élément coloré ; tout le reste est noir, gris et typographique. Le texte se range à gauche : petite **étiquette entre crochets**, titre en **capitales larges sur deux lignes décalées**, trois lignes de texte, deux pilules. À droite, des **légendes techniques** reliées à la pièce par un trait. Une seconde ambiance, **nuit**, reprend la même grammaire sur une photo bleu-gris très sombre : titre en escalier, cercles-guides, barre de caractéristiques en trois colonnes.

Inspiré de : voir `source.md`. On reprend le langage visuel (filets, cercle, crochets, capitales décalées, légendes), jamais l'identité : pas de nom de marque, de logo, de photo, de rendu 3D ni de texte d'origine.

## Règles prioritaires

1. **Le produit est seul en couleur.** Interface en noir `--ink`, gris `--muted` et filets `--line` ; l'or et le chrome n'existent que dans la pièce (et en pastille de légende).
2. **Tout converge au centre** : filets diagonaux + croix + grand cercle ont le même centre que la pièce. Les filets sont décoratifs, à 1px, jamais plus foncés que `--line`.
3. **Titres en capitales larges, lignes décalées** : chaque ligne suivante est indentée (`--indent-step`), jamais centrée.
4. **Micro-typographie technique** : étiquettes en mono 11px capitales `[ entre crochets ]`, valeurs (10K, 6 MICRONS) en mono ou en display.
5. **Interactifs en pilule à contour 1px** ; une seule pilule pleine (noire) par écran.
6. **Beaucoup de vide** : la pièce occupe ~40 % de la largeur, le texte ~30 %, le reste respire.
7. Contraste : texte courant `--muted` sur `--bg` 6:1 ; or en petit texte seulement via `--gold-ink` (5,1:1) ; nuit : `--on-night` 15,8:1, `--muted-night` 7,3:1.
8. Accessibilité : cibles ≥ 44px (même les « 10K, 14K » minuscules ont une zone de 44px), focus visible, `prefers-reduced-motion` respecté.
9. Aucune valeur en dur : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Pilules, navigation, étiquette crochets, titre décalé, filets + cercle, légendes, sélecteur de titre d'or, barre de caractéristiques, champ, puces, panneau, confirmation. |
| `references/layouts.md` | Page produit « atelier », scène nuit, presse, communauté / liste d'attente, mobile. |
| `references/motion.md` | Flottement de la pièce, orbite du cercle, montée des titres, tracé des légendes. |
| `examples/demo.html` | Page complète (marque fictive « Ossel »). |
| `source.md` | Shot de référence, ce qui a été vu, écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titres, valeurs de la barre | **Archivo** 500, `font-stretch: 112%` | capitales, `--text-title` (28–42px) ou `--text-hero` (35–61px), interligne 1.02, +0.01em |
| Logo | Archivo 600, `font-stretch: 125%` | capitales, +0.18em, une lettre remplacée par un cercle |
| Étiquettes, légendes, titres d'or | **IBM Plex Mono** 400/500 | 11px, capitales, +0.14em |
| Texte courant, navigation | **Inter** 400/500 | 14px / 1.6 ; liens de nav 11px capitales +0.14em |

La police d'origine n'est pas identifiée : Archivo élargie rend la grotesque large et nette des captures. À défaut : Helvetica Neue étendue, Syne 500.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Fond atelier | `--bg` | page produit, presse |
| Panneau | `--paper` | carte communauté, confirmation, menu mobile |
| Encre | `--ink` / `--on-ink` | titres, logo, pilule pleine |
| Texte secondaire | `--muted` | texte, liens, étiquettes |
| Filets | `--line`, `--line-strong` | diagonales, cercle (clair) ; traits de légende, champs |
| Or lisible | `--gold-ink` | erreur de champ, mise en avant en petit texte |
| Nuit | `--night`, `--night-2`, `--night-3` | fond photo, reflets |
| Texte nuit | `--on-night`, `--muted-night`, `--line-night` | titres, étiquettes, guides |
| Métaux | `--gold*`, `--chrome*`, `--white-gold` | rendu de la pièce, pastilles de légende — jamais du texte sur clair |

## Signature

**La planche cadrée** : filets diagonaux et croix qui passent par le centre exact de la pièce, grand cercle fin autour d'elle (avec un point qui orbite lentement), et deux ou trois légendes « • OR JAUNE » reliées par un trait. Une fois par page, en héros. La variante nuit reprend les **cercles-guides** en filet sur la photo.

## À éviter

- Des cartes à ombres, des dégradés colorés ou des fonds teintés dans l'interface : la couleur appartient au métal.
- Des titres centrés ou en minuscules ; des polices serif « luxe » classiques.
- Des filets épais ou contrastés qui concurrencent la pièce.
- Remplir le vide (badges, prix géants, bandeaux promo).
- Reprendre le nom, le logo, les rendus 3D, les photos ou les textes du shot de référence.

## Adaptation React / React Native

- Filets et cercle : `react-native-svg` (`Line`, `Circle` avec `strokeWidth={StyleSheet.hairlineWidth}`), en `absoluteFill`, `pointerEvents="none"`.
- Pièce 3D : `expo-gl` + `three` / `@react-three/fiber/native` avec un `MeshPhysicalMaterial` métallique et une HDRI studio ; à défaut, un PNG détouré.
- Flottement et orbite : Reanimated (`withRepeat(withTiming(...), -1, true)`), coupés si `AccessibilityInfo.isReduceMotionEnabled()`.
- Pilule : `Pressable` avec `borderWidth: 1`, `borderRadius: 999`, `minHeight: 44`, inversion de couleurs en `pressed`.
- `font-stretch` n'existe pas en natif : charger `Archivo_500Medium` de `@expo-google-fonts/archivo` et ajouter `letterSpacing: 1` ; ou embarquer la variante « SemiExpanded » statique.
- `backdrop-filter` de la barre nuit : `BlurView` d'`expo-blur`.

## Avant de livrer

- [ ] Tokens importés, aucune couleur en dur.
- [ ] Filets, croix et cercle centrés sur la pièce ; la pièce est le seul élément coloré.
- [ ] Titre en capitales larges, lignes décalées ; étiquette `[ crochets ]` en mono.
- [ ] Légendes reliées par un trait ; sélecteur de titre d'or avec cibles de 44px.
- [ ] Une seule pilule pleine par écran ; états survol, appui, focus, désactivé présents.
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; mouvement réduit respecté.
- [ ] Aucun élément de la marque d'origine.
