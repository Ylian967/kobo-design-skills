---
name: mint-street-basics
description: Direction artistique « Mint Street Basics » pour la mode et le e-commerce (boutique de sweats, basiques, streetwear doux, sport, enfant, marque éthique, lancement de collection), mesurée sur une maquette Dribbble de boutique en ligne. Héros bleu nuit en dégradé avec titre géant en capitales condensées blanc vers gris, chiffres clés à « + » vert, grand disque vert et disque clair derrière une photo en arche, pilule blanche à anneau clair, bandeau défilant vert. Corps menthe pâle - titres condensés en dégradé bleu nuit vers ardoise, pile de cartes de collections avec encart blanc, grille de produits à carte double, pastilles de couleur, fiche produit sur carte aqua avec puces de taille et bouton vert, pied bleu nuit à disque aqua, titre géant derrière un mannequin et logotype serif géant. À utiliser pour une boutique en ligne, une page de collection ou une fiche produit au style « frais, pastel, rond, sportif, apaisant ».
---

# Mint Street Basics

> Un vestiaire de sweats pastel présenté comme une affiche de sport : des lettres énormes, des ronds partout, du vert qui respire.

## L'idée

La page s'ouvre et se ferme en **bleu nuit**, et vit entre les deux sur un **menthe très pâle**. Les titres sont des **capitales condensées immenses**, légèrement dégradées. Derrière les mannequins, des **formes rondes** — un grand disque vert, un disque clair, des arches, des pilules — remplacent tout décor. Le vert vif signale ce qui vend : le bandeau d'offre, le « + » des chiffres, le bouton d'achat. Les vêtements sont pastel, les fonds aussi : rien n'agresse, tout est net.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, photos ni textes de la maquette d'origine.

## Règles prioritaires

1. **Bleu nuit en ouverture et en clôture, menthe au milieu.** Pas d'autre fond de section.
2. **Titres en capitales condensées**, interligne ≈ 1, en dégradé vertical (blanc → gris sur bleu nuit, bleu nuit → ardoise sur menthe).
3. **Des ronds, pas des rectangles** : disques, arches, pilules, coins de 28px. Aucune ombre portée.
4. **Le vert vend** : bandeau, « + », bouton d'achat, disques. Le texte posé sur le vert est **bleu nuit**.
5. **Une photo par forme** : mannequin sur fond uni, dans une arche ou une carte arrondie ; jamais de photo à bords vifs.
6. **Noms de produits en police d'affiche**, prix et texte en sans 16px.
7. **Un encart blanc** peut chevaucher une photo ; c'est le seul blanc pur avec les boutons ronds.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Barre, titre et scène du héros, chiffres, bandeau, pilules, pile de collections, carte produit, fiche produit, bloc essentiels, carte du pied. |
| `references/layouts.md` | Héros, ordre des sections, grille de produits, autres pages, mobile. |
| `references/motion.md` | Arrivée du héros, pile de cartes, bandeau, sélections, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : sujets, fonds, détourage, formes en CSS. |
| `examples/demo.html` | Accueil complet animé (boutique fictive « Verveine »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titre du héros | **Anton** | 174px (capitales de 153px), interligne 1, dégradé blanc → gris |
| Titres de section | Anton | 101px ; titre centré 91px ; titre de fiche 83px ; interligne 0.98 |
| Chiffres clés | Anton | 80px, « + » vert |
| Nom de produit, encart | Anton | 32px et 34px |
| Logotype | **DM Serif Display** | 32px dans la barre, ≈ 310px dans le pied |
| Texte | **DM Sans** 400 | 16px / 1.5 ; liens de navigation 13px capitales |
| Bandeau | DM Sans 700 | 20px |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--navy` → `--navy-2` | #1c1d36 → #040521 | Héros et pied (dégradé), texte sur vert |
| `--mint` | #e5f2e5 | Corps de page, carte du pied |
| `--green` / `--green-2` / `--green-3` | #08a863 / #29c279 / #269357 | Bouton, disques, bandeau |
| `--aqua` / `--aqua-2` | #a1dddf / #80d0d0 | Carte de fiche, disque et rayures du pied |
| `--ink` → `--ink-2` | #1b1b35 → #4d5161 | Titres et texte sur menthe |
| `--white` → `--silver` | #ffffff → #d3d3d3 | Titre du héros |
| `--card` / `--card-soft` | #ffffff / #f0f0f0 | Encart, boutons ronds / fond des photos |

## Images et 3D

De **vraies photos de mode** sur fond uni et clair : un mannequin dans une arche pour le héros, des gros plans de matière pour les collections, un mannequin de face par carte produit, un portrait à lunettes pour le pied. Aucun filtre. Les disques, arches, rayures et pilules sont des formes de décor en CSS ; jamais un vêtement ou une personne dessinés. Des PNG détourés sont l'idéal pour le héros et la fiche. 3D optionnelle pour un vêtement en fiche produit. Détails dans `references/assets.md`.

## Signature

1. Le **titre géant condensé** en dégradé sur bleu nuit.
2. Le **grand disque vert** et la photo en arche.
3. La **pilule blanche à anneau clair**.
4. Les **pastilles de couleur** au-dessus des noms de produits.
5. Le **logotype serif géant** sur la carte menthe du pied.

## À éviter

- Du texte blanc sur le vert vif ou sur l'aqua (contraste insuffisant).
- Des cartes à coins vifs, des ombres portées, des bordures épaisses.
- Une police d'affiche large ou arrondie ; des titres en bas de casse.
- Des photos de rue sombres dans la grille de produits.
- Un troisième fond de section (gris, blanc pur) entre le héros et le pied.
- Plusieurs bandeaux défilants.

## Adaptation React / React Native

- **React** : `HeroStage` (disques + arche + pilule), `Ticker`, `CollectionDeck` (état `top`, rang `--k` en style), `ProductCard`, `Swatches` et `SizeChips` (groupes de boutons `aria-pressed`), `AddToCart` (état « ajouté » temporaire). Un seul observateur pour les apparitions.
- **React Native** : titres avec `MaskedView` + dégradé ; disques et arches en `View` à `borderRadius` ; pile de collections avec Reanimated (rang → translation, échelle, opacité) et geste de balayage ; bandeau avec `withRepeat` linéaire ; retour haptique léger à l'ajout au panier ; grille en `FlatList` à 2 colonnes.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Texte sur vert et sur aqua en bleu nuit ; titre du héros lisible devant la photo.
- [ ] Toutes les photos sont dans une forme arrondie, sur fond uni.
- [ ] Pastilles et puces utilisables au clavier, état annoncé ; panier annoncé.
- [ ] `prefers-reduced-motion` : héros en place, bandeau figé.
- [ ] Pas de défilement horizontal à 390px ; grille de produits en 2 colonnes.
- [ ] Nom, logotype, photos et textes propres au projet.
