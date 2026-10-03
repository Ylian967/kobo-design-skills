# Serif Bistro Green — images et pictogrammes

## Ce que montre la référence

- Une **personne détourée** (sans fond) posée entre les mots du titre.
- Des **plats détourés** vus de dessus, sur fond orange ou crème.
- Des **photos sombres et chaudes** (viande, sushis, cocktail) dans un cadre crème épais.
- Des **dessins au trait** crème sur orange (burger, frites, boisson).

## Ce que fait le skill

Un détourage propre demande une image préparée à la main. Le skill garde donc de **vraies photos entières** et obtient le même effet par le cadrage :

| Rôle | Type de photo | Recadrage |
|---|---|---|
| Arche du héros | Portrait en pied ou à mi-corps, fond sombre uni, vêtement clair | `w=700&h=1300&fit=crop&crop=faces` |
| Assiette ronde | Assiette **vue de dessus**, centrée, qui remplit le cadre | `w=400&h=400&fit=crop`, puis `border-radius: 50%` |
| Fiche de plat | Plat en gros plan, de dessus ou de trois quarts | `w=560&h=450&fit=crop` |
| Cadre | Photo sombre et chaude, verticale | `w=640&h=760&fit=crop` |

## Photos de la démo (Unsplash)

| Rôle | Identifiant |
|---|---|
| Cheffe (arche) | `photo-1781888681811-332968760c2a` |
| Assiette du héros | `photo-1782112691766-1772366fcedc` |
| Betterave | `photo-1762328845844-64b041d0c5f1` |
| Linguine | `photo-1777994505580-33478f04fa4a` |
| Risotto | `photo-1633964913295-ceb43826e7c9` |
| Bouillon | `photo-1631709497146-a239ef373cf1` |
| Coquillages | `photo-1762922425232-ab2b6b251739` |
| Entrecôte | `photo-1654879259483-af42804bd2bb` |
| Filet, asperges | `photo-1706650616334-97875fae8521` |
| Makis | `photo-1611762687807-7cdd09aef422` |
| Negroni | `photo-1621873495884-845a939892d1` |
| Cadre 1 (viande) | `photo-1583953623787-ada99d338235` |
| Cadre 2 (sushis) | `photo-1553621042-f6e147245754` |
| Cadre 3 (cocktail) | `photo-1500217052183-bc01eee1a74e` |

Adresse type : `https://images.unsplash.com/photo-…?auto=format&fit=crop&w=560&h=450&q=72`.

## Choisir une photo

- **Assiette ronde** : l'assiette doit être entière, centrée et vue d'aplomb. Un plat coupé par le bord du cadre ou vu de biais ne marche pas en cercle.
- **Tons** : chauds (brun, ocre, rouge, vert d'herbe). Éviter les fonds bleus froids et les néons.
- **Portrait** : une personne qui regarde l'objectif, vêtement clair sur fond sombre, pour se détacher du vert.
- Toujours un texte alternatif qui nomme le plat.

## Pictogrammes et dessins au trait

Tracés SVG en ligne, sans remplissage, bouts ronds, `stroke-width` 1.4 à 1.8 : cloche, verre, couverts, feuille (logo), loupe, enveloppe. Sur orange, trait `--line-art`. Chaque tracé porte `pathLength="1"` pour pouvoir être dessiné à l'entrée.

Le shot montre des dessins de restauration rapide (burger, frites) : le skill les remplace par des dessins de salle (cloche, verre, couverts), plus cohérents avec un bistrot.

## Polices

- **Abril Fatface** (Google Fonts) : titres, noms de plats, prix, boutons. Une seule graisse.
- **DM Sans** 400, 500, 700 : texte courant, liens, petites capitales du pied.

## Interdits

- Pas de dessin CSS à la place d'une photo de plat.
- Pas de photo en noir et blanc, pas de filtre de couleur.
- Pas d'émoji en guise de pictogramme.
