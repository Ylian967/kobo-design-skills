# Pocket Device Noir — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées au pixel** sur la maquette (page de 1440px) ou « lues » à l'œil quand c'est indiqué. Les états (survol, choisi) sont proposés. Code complet dans `examples/demo.html`.

## Règles communes

- **Noir, blanc, gris, et un seul rouge** : celui du bouton de l'objet, repris sur quelques mots et un pictogramme.
- **La chaleur vient des photos** (bois, soleil rasant, tissu orange) ; l'interface, elle, reste froide et neutre.
- Une grotesque serrée en graisse 500 pour les titres, 400 pour le texte ; tout est **centré** dans les sections noires, aligné à gauche dans les panneaux.
- Petits rayons : 6px (boutons, étiquettes), 8px (cartes, vignettes).
- Traits fins : pointillés et tirets (`dotted`, `dashed`) pour les séparateurs, les contours de sélection et les points d'intérêt.

## Barre de navigation

Sur la photo du héros, à 40px du haut : logo en **cartouche blanc** à texte noir (avec un petit signe) ; liens 14px dans une pilule sombre translucide au centre ; bouton blanc « Acheter » (106 × 37px) à droite.

## Boutons

| Variante | Aspect |
|---|---|
| `.btn` | Blanc `--paper`, texte noir 17px / 500, 40px de haut, rayon 6px, halo translucide de 3px |
| `.btn.ghost` | Verre fumé `--glass`, texte blanc |
| `.btn.small` | 37px de haut, texte 14px |
| `.round` | Rond de 48px en verre fumé, flèche fine |

## Étiquette

Rectangle `--tag` de 32px de haut, rayon 6px, texte 14px : nomme une section (« Pourquoi Ora P1 », « En vedette », « Dans l'Ora P1 »).

## Titre du héros

Deux mots, 104px (capitales de 80px), graisse 500, centré, posé **devant** l'objet. Dessous : une phrase grise de 30em au plus, puis deux boutons. De part et d'autre, à 40 % de la hauteur, deux petits libellés blancs.

## Carte d'offre

236px, fond `--panel`, **contour en tirets**, titre 17px, deux lignes grises 12px, bouton blanc pleine largeur. En bas à droite du héros.

## Manifeste

Phrase centrée de 46px, interligne 1.1, 23em au plus ; deux mots en `--red`. Derrière : des **rayons fins** en éventail (dégradé conique répété, masqué en couronne).

## Nom géant

Le nom du produit en 328px, dégradé vertical du gris `--giant-top` au presque noir, placé **derrière l'objet** : l'objet cache le milieu du mot. Décoratif (`aria-hidden`).

## Bloc produit

L'objet de face, coupé par le bas et fondu au noir ; par-dessus, centrés : le prix (24px), trois lignes grises, un bouton blanc.

## Bande de vignettes

Cinq vignettes de 206 × 202px, écart 9px, coins 8px. Celle du centre est **plus haute** (282px) et entourée d'un contour en tirets. Chaque vignette est un bouton (`aria-pressed`) ; le texte sous la bande est une zone `aria-live`.

## Panneau « en vedette »

Section en deux parties sur une même photo : à gauche (40 %), un **panneau de verre** (`--glass` + flou 18px) avec étiquette, pictogramme rouge au trait, titre 42px, filet pointillé, paragraphe, bouton, barre de progression en segments de 2px ; à droite, la photo nette avec le nom du produit en haut, une légende en bas, et deux boutons ronds.

## Carte de verre et points d'intérêt

Carte `--panel` de 236px : titre 18px, filet pointillé, texte gris 14px. Autour de l'objet : des **points d'intérêt** de 34px (contour en tirets, point central, un seul en rouge) et une **graduation** verticale à droite dont le haut est rouge.

## Carte de témoignage

327 × 250px, fond `--surface`, coins 8px : photo carrée de 64px en haut à gauche, nom (gris) et rôle (blanc) alignés à droite, citation grise 14px en bas. Dans le rail, les citations alternent avec des **photos** de 206px de large. Indicateur à trois segments dessous.

## Appel final

Photo chaude plein cadre, titre 52px centré sur deux lignes, phrase grise, l'objet, bouton blanc, mention 14px.

## Pied de page

Fond `--foot` avec une texture de pierre à 40 % : logo en grand cartouche blanc ; menu en 24px sur deux colonnes ; champ d'e-mail sans fond, souligné de tirets, avec petit bouton blanc ; ligne légale séparée par des tirets.

## L'objet (3D)

Boîtier noir arrondi (proportions 2 × 3.6), **écran** en haut (heure, état, forme d'onde), **molette** ronde cerclée de métal clair avec un point central, deux **touches**, **grille** de haut-parleur, **bouton rouge** sur la tranche supérieure. Voir `assets.md`.

## Accessibilité

- Texte blanc ou `--soft` (10:1) sur noir ; le rouge n'est utilisé qu'en grand (manifeste) ou en `--red-text` pour un petit texte.
- Sur photo, un dégradé sombre sous tout texte.
- L'objet du héros porte `role="img"` et une description ; les autres exemplaires sont `aria-hidden`.
- Vignettes en boutons `aria-pressed` ; rail de témoignages focusable ; flèches nommées.
- Cibles de 44px au moins pour les boutons ronds et le champ ; boutons de 37 à 40px de haut avec un espace suffisant autour.
