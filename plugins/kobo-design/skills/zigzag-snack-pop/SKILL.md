---
name: zigzag-snack-pop
description: Direction artistique « Zigzag Snack Pop » pour marques de snacks énergiques et produits food/sport (barre protéinée, boisson, granola, nutrition outdoor, D2C alimentaire), inspirée des landings Dribbble de barres protéinées. Héros orange vif avec montagnes en aplats et silhouettes d'aventuriers brun foncé, titre en grotesque condensée très grasse avec un mot jaune « autocollant » (contour et ombre dure brune), bouton jaune rectangulaire à ombre décalée, bandes crème à bords en dents de scie, pastilles d'ingrédients rondes colorées, sections brunes à traces de pneu, cartes produit couleur saveur dont celle du milieu est surélevée, tampon rond qui tourne, mot géant en contour jaune en pied de page. À utiliser pour une landing produit food, une boutique de snacks, une page « ingrédients », une app de commande ou un site au style « énergique, outdoor, sticker, pop, orange, fun et costaud ».
---

# Zigzag Snack Pop

> Un emballage de barre énergétique déplié en page web : orange plein, brun chocolat, jaune autocollant et des bords en dents de scie.

## L'idée

La page se lit comme un **emballage** : de grands aplats (orange, crème, brun) séparés par des **bords en zigzag** comme une découpe de sachet. Le héros est une **affiche d'aventure** : montagnes orange en deux plans, silhouettes brunes (grimpeur, cycliste, skateur), titre géant condensé blanc avec **un seul mot jaune traité en autocollant**. Tout ce qui est cliquable a l'air **imprimé et collé** : contour brun épais, ombre dure décalée, aucun flou. Le reste est sobre : texte courant en grotesque normale, une seule couleur d'accent (le jaune).

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom de marque, de photo produit, d'illustration ni de texte d'origine.

## Règles prioritaires

1. **Bords en dents de scie** entre les grandes zones (au moins 2 par page) : `mask` en `conic-gradient`, dents de `--zigzag` × `--zigzag-h`.
2. **Ombre dure, jamais floue** : `--shadow-hard` / `--shadow-hard-lg` + contour `--stroke` brun sur boutons, champs, cartes, pastilles.
3. **Un mot jaune par titre** : en `.sticker-word` (contour brun + ombre décalée) ; jamais une phrase entière.
4. **Trois aplats** : orange (énergie), brun (sérieux, preuve), crème (respiration). Les couleurs « saveur » ne vivent que dans les pastilles et cartes produit.
5. **Contraste** : blanc sur orange seulement en grand (3,6:1) ; petit texte sur orange en `--ink` ; prix orange sur clair en `--orange-ink`. Le jaune sur orange n'est lisible qu'avec son contour brun.
6. **Mouvement à rebond** court (`--ease-pop`) ; le tampon tourne lentement ; rien ne bouge si mouvement réduit.
7. **Accessibilité** : cibles ≥ 44px, focus jaune + halo brun, silhouettes et décors en `aria-hidden`.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Navigation, boutons (tous états), champ de recherche, bord zigzag, pastille ingrédient, étiquette pilule, carte produit, emballage dessiné, tampon tournant, carte d'avis, mot géant. |
| `references/layouts.md` | Héros affiche, bande ingrédients, section brune, grille produits, avis, pied de page, mobile. |
| `references/motion.md` | Rebonds, pression des boutons, tampon, entrée du héros, mouvement réduit. |
| `examples/demo.html` | Page d'exemple complète (marque fictive). |
| `source.md` | Référence, observations et écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titres, noms de produit, mot géant | **Anton** (grotesque condensée très grasse) | capitales, 56–120px, interligne 0.92 |
| Accent « 20 G PROTÉINES » | **Archivo** 900 italique | 40–72px, jaune sur brun |
| Boutons, étiquettes, nav | Archivo 800 | 12–14px, capitales, +0.06 à +0.14em |
| Texte courant | Archivo 400/600 | 16–20px / 1.45 |

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Fond héros | `--orange` | aplat principal ; `--orange-bright` / `--orange-deep` pour soleil et montagnes |
| Accent | `--yellow` | bouton principal, mot autocollant, pilule, mot géant en contour |
| Encre | `--ink` | texte sur jaune/orange, contours, ombres dures |
| Sections preuve | `--brown`, `--bar` | sections à traces de pneu, navigation, pied de page |
| Respiration | `--cream` | bandes zigzag, grilles produits et avis |
| Saveurs | `--flavor-*` | pastilles d'ingrédients, fonds de cartes produit |

Règle : un seul bouton jaune plein par écran ; le jaune n'est jamais un fond de section.

## Signature

**La bande crème en dents de scie** qui coupe le héros orange, portant la rangée de pastilles d'ingrédients — et, en écho, le **mot autocollant jaune** du titre. Une bande zigzag par transition majeure, pas plus.

## À éviter

- Des ombres floues, des dégradés doux sur les boutons, des coins très arrondis (max 8px sauf pilule et pastilles).
- Du jaune en texte sur crème ou blanc (illisible).
- Plus d'un mot jaune par titre, ou des titres en minuscules.
- Des photos de produit détourées « premium » sur fond blanc : ici le produit est posé sur un disque orange avec ombre dure.
- Copier le nom, le logo, les emballages ou les illustrations de la référence.

## Adaptation React / React Native

- Zigzag : pas de `mask` CSS en natif → `react-native-svg` avec un `Path` en dents de scie généré (`M0 0 l9 12 l9 -12 …`) posé en haut/bas de la section.
- Ombre dure : `View` décalée de 6px en `--ink` derrière la carte (le `shadowRadius: 0` d'iOS ne marche pas sur Android).
- Mot autocollant : deux `Text` superposés (ombre décalée en `--ink`, puis texte jaune) ; le contour via `textShadow` multiple ou SVG `Text` avec `stroke`.
- Tampon : SVG `TextPath` + Reanimated `withRepeat(withTiming(360, { duration: 14000, easing: Easing.linear }))`.
- Polices : `@expo-google-fonts/anton`, `@expo-google-fonts/archivo`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Au moins deux bords zigzag, ombres toutes dures.
- [ ] Un mot autocollant par titre de héros, un seul bouton jaune plein par écran.
- [ ] Pastilles d'ingrédients et cartes saveur, carte centrale surélevée sur ordinateur.
- [ ] Testé à 375px et 1440px, aucun débordement horizontal, mouvement réduit respecté.
- [ ] Contrastes vérifiés (`python3 tools/check.py zigzag-snack-pop`).
- [ ] Aucun élément de la marque d'origine.
