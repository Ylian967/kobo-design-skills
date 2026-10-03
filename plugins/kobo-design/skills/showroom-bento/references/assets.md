# Showroom Bento — images et pictogrammes

## Ce que montre la référence

Des **rendus détourés** d'une moto (vue de profil au centre, deux voisines, une vue de face dans la tuile de teinte) et d'un casque, posés sur le gris de l'écran avec une ombre au sol.

## Le produit : une image détourée

Le style demande un produit **sans fond**, posé sur le gris. Par ordre de préférence :

1. **Images détourées fournies par le projet** (PNG ou WebP transparents, une par modèle et par teinte). C'est le cas normal : les placer directement dans `.model img`.
2. **À défaut, une photo sur fond uni**, détourée une fois dans la page (ce que fait la démo). Ça ne marche que si la photo remplit ces conditions :
   - fond **uni** (blanc, gris clair ou couleur franche), sans décor ;
   - produit **sombre** et entier, bien détaché du fond ;
   - **peu ou pas d'ombre portée** (un produit suspendu ou vu de dessus sur fond clair) ;
   - pas de marque lisible.
3. **Sinon**, la photo entière dans un cadre arrondi. Jamais de produit dessiné en CSS ou en SVG.

### Détourage dans la page (démo)

Fait une seule fois par photo, dans un canvas :

1. Recadrer sur le produit (`crop` : x, y, largeur, hauteur en fractions de la photo).
2. Estimer la couleur du fond en chaque point à partir des **quatre coins** du recadrage.
3. Opacité = écart entre le point et ce fond, passé par un seuil doux (`matte`, par défaut de 34 à 84 sur 255 ; plus haut pour un fond coloré).
4. Rendre transparents les points clairs (reflets, reste d'ombre) : sur le gris de l'écran, ils se lisent comme des reflets.
5. Assombrir la frange à demi transparente pour ne pas garder un liseré de la couleur du fond.

### Teintes

Pour un produit noir, chaque teinte est calculée à partir de la photo détourée : la couleur de la pastille remplace le noir, **modulée par la luminosité de la photo** (les ombres restent sombres, les arêtes claires tirent vers le blanc). La teinte « noir » est la photo passée en gris neutre. Chaque résultat est gardé en image : on ne recalcule jamais.

Limite : c'est une **simulation**. Avec de vraies photos par teinte, les utiliser à la place.

## Photos de la démo (Unsplash)

| Rôle | Identifiant | Fond d'origine |
|---|---|---|
| Halo S2 (centre) | `photo-1641048930621-ab5d225ae5b0` | blanc cassé, produit suspendu |
| Arc Pro | `photo-1600086827875-a63b01f1335c` | blanc |
| Nomade | `photo-1684703147716-014da6a31aa3` | jaune uni |
| Étui (tuile accessoire) | `photo-1628202926206-c63a34b1618f` | photo entière, non détourée |

Les photos à détourer sont chargées avec `crossorigin="anonymous"` (sinon le canvas ne peut pas être lu).

## Photo d'accessoire

Photo entière, recadrée en `cover` dans un cadre de rayon 8px, sur la droite de la tuile. Tons neutres ou froids, pour ne pas concurrencer le rouge.

## Pictogrammes

Tracés SVG en ligne, 22px, trait de 1.5, bouts ronds, sans remplissage, couleur du texte : panier, compte, flèches, et un pictogramme par caractéristique. Le monogramme est une forme pleine en `--accent`.

## Police

**Outfit** (Google Fonts) 300, 400, 500, 600 : tout le texte. Graisse 600 pour le titre, le prix et les valeurs ; 300 pour les légendes.

## Interdits

- Pas de produit dessiné, pas d'émoji.
- Pas de photo d'ambiance en fond de scène : le fond reste le gris de l'écran.
- Pas d'ombre portée dure sous les tuiles au repos.
