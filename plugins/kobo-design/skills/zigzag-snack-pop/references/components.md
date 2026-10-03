# Zigzag Snack Pop — composants

Toutes les valeurs viennent de `tokens.css`. Le code complet est dans `examples/demo.html`.

## Page

La page (1440px au plus) est posée sur un fond `--outer` avec 16px de marge. Elle alterne trois fonds : **orange** (héros), **blanc** (ingrédients, saveurs, mosaïque) et **brun** (sections fortes, pied).

## Bord en dents de scie

Chaque section blanche mord sur ses voisines par une rangée de dents (22px de large, 11px de haut), en haut et en bas : deux pseudo-éléments remplis de dégradés.

```css
.zig::before, .zig::after { content: ""; position: absolute; left: 0; right: 0; height: calc(var(--zig) / 2);
  background: linear-gradient(-45deg, var(--white) 7.8px, transparent 0), linear-gradient(45deg, var(--white) 7.8px, transparent 0);
  background-size: var(--zig) var(--zig); background-position: left bottom; background-repeat: repeat-x; }
.zig::before { bottom: 100%; }
.zig::after { top: 100%; transform: scaleY(-1); }
```

## Barre de navigation

Mesurée : 47px de haut, fond `--brown`. Nom de marque en `--font-display`, liens en petites capitales espacées (13px) avec chevron, **champ de recherche blanc** à ombre dure, panier avec compteur rond jaune.

## Titre du héros

`--font-display` (Anton), capitales, `--fs-hero` (124px), interligne 1, centré sur deux lignes. Blanc, avec **un mot en `--yellow`** traité en autocollant (ombre dure brune de 4px). La seconde ligne passe en partie **sous** la photo du produit.

## Bouton

Mesuré : ≈ 236 × 56px. Rectangle `--yellow` presque sans arrondi, texte `--ink` en `--font-display`, chevron « › », **ombre dure** brune décalée de 5px.

| Variante | Rendu | Usage |
|---|---|---|
| `.btn` | jaune | action principale |
| `.btn--s` | 40px de haut | dans un titre, en tête de section |
| `.btn--orange` | fond `--orange-hot` | action secondaire sur blanc |
| `.btn--line` | blanc, contour et ombre `--ink`, prix en `--orange-ink` | « Ajouter — 34,90 € » dans une fiche |

## Photo-autocollant du produit

La photo du produit dans un cadre blanc de 8px, rayon 14px, **penchée de −6°**, avec une ombre dure de 10px. Autour : le tampon et une mention en italique gras jaune (« 20 g de protéines »).

## Tampon rond

Disque `--orange-hot` cerclé de blanc, texte qui suit le cercle (`textPath`), chiffre au centre dans un anneau en pointillé. Penché de −14°.

## Pastille d'ingrédient

Cercle de 148px de couleur pâle (`--c1` à `--c5`) contenant une **vraie photo** de l'ingrédient fondue dans la couleur (`multiply`) ; dessous, un libellé de deux lignes en `--font-label` (22px, graisse 600). Les pastilles forment une bande qui défile.

## Section brune

Fond `--brown`, texte blanc, **traces de pneu** en diagonale (dégradé répété, masqué par endroits). Titres en `--font-display` ; un mot peut être en `--yellow` ; la mention en italique gras jaune sert d'accroche.

## Portrait à étiquette

Photo dans un cadre à **sommet arrondi** (arche), avec une pilule blanche à ombre dure qui dépasse : pastille orange + rôle en `--font-display` (« Coach sportif »).

## Fiche de saveur

Fiche de couleur (`--lime`, `--sky`, `--taupe`), rayon 10px : photo du produit fondue dans un encart à la teinte pâle de la fiche, nom en `--font-display` (24px), une ligne de détail, bouton `.btn--line` sur toute la largeur. **Celle du milieu est plus grande**, déborde sur ses voisines et porte une ombre douce.

Texte `--ink` sur le vert, blanc sur le bleu et le brun.

## Fiche d'avis

Fond `--blush`, texte de 17px en graisse 500, puis une ligne : portrait carré, nom et rôle, note en `--font-display`.

## Mosaïque

Trois tuiles de 230px : une tuile de texte (`--blush`, portraits ronds qui se chevauchent, lien), une photo pleine, une tuile large en deux moitiés (pastille + titre en `--font-display`, photo).

## Lettre et pied

Sur brun : titre de deux lignes, champ blanc et bouton orange soudés avec ombre dure ; colonnes de liens ; ligne légale ; puis le **mot géant** en italique gras `--yellow` (`--fs-giant`), sur toute la largeur, coupé par le bas de la page.

## États

- Focus clavier : contour de 3px, jaune sur brun et orange, `--ink` sur blanc.
- Survol et appui : voir `motion.md`.
