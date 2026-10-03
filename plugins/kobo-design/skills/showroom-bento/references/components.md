# Showroom Bento — composants

Toutes les valeurs viennent de `tokens.css`. Le code complet est dans `examples/demo.html`.

## Écran

Un seul écran dans un cadre : fond `--frame`, rayon `--r-frame`, posé sur un fond sombre `--outer` avec 12px de marge. Colonne : barre, titre et prix, scène (prend la hauteur restante), rangée bento.

## Barre

Mesurée : marge de 40px, éléments de 50px de haut.

- **Monogramme** à gauche, en `--accent`, ≈ 54 × 56px.
- **Pilules** centrées : 134 × 50px, écart de 10px, fond `--tile` ; l'active est `--ink` à texte blanc.
- À droite : deux **boutons ronds** blancs de 50px (panier, compte) et une pilule `--ink` (« Commander »).

```html
<header class="bar">
  <a class="logo" href="#" aria-label="Accueil">…</a>
  <nav class="pills"><a class="pill is-on" aria-current="page" href="#">Modèles</a><a class="pill" href="#">Services</a></nav>
  <div class="tools"><button class="round" aria-label="Panier">…</button><a class="pill pill--ink" href="#">Commander</a></div>
</header>
```

## Titre et prix

À gauche : nom du modèle en `--ink` suivi du **nom de marque en `--accent`**, sur une ligne, `--fs-title`, graisse 600, approche serrée. Dessous, une légende légère en `--muted`.
À droite : le prix dans la même taille, symbole monétaire en `--symbol` (décoratif), et sa légende alignée à droite.

Le rouge ne sert en texte que pour ce grand nom de marque ; pour un petit texte rouge, utiliser `--accent-ink`.

## Scène

- Halo clair fixe au centre (`radial-gradient` vers `--light`).
- **Sol** : un anneau très fin (`--line`) en ellipse, et une ombre elliptique (`--floor`) sous le produit.
- **Trois modèles** : le courant au centre (54 % de la largeur, 760px au plus), ses voisins sur les bords, réduits à 0.36 et coupés par le cadre. Cliquer un voisin le sélectionne.
- **Pilule à flèches** : 105 × 51px, blanche, centrée en bas ; flèches en `--arrow`.

Le produit est une image **détourée** : voir `assets.md` pour l'obtenir à partir d'une photo.

## Rangée bento

Mesurée : 240px de haut (deux rangées de 118px), tuiles blanches à 4px d'écart et 4px du bord. Colonnes : `427fr 187fr 187fr 187fr 427fr`.

| Tuile | Contenu |
|---|---|
| **Accessoire** (large, 2 rangées) | Texte léger en `--muted`, prix en `--fs-price`, pilule `--ink` de 150 × 50px en bas ; photo de l'accessoire à droite (44 % de la tuile, rayon 8px) |
| **Caractéristique** (×6) | Pictogramme au trait de 22px, valeur en gras (`--fs-value`), étiquette légère (`--fs-label`, `--muted`), le tout centré |
| **Teinte** (large, 2 rangées) | Texte dont le début est en gras, supplément de prix en bas, aperçu du produit dans la teinte, colonne de pastilles à droite |

## Pastilles de teinte

Cercles de 31px au pas de 37px, en colonne. La pastille choisie porte une **coche** et un anneau. Zone de clic agrandie de 8px autour. Groupe `role="radiogroup"`, pastilles `role="radio"` avec `aria-checked` et un libellé ; flèches du clavier pour passer de l'une à l'autre.

```html
<div class="swatches" role="radiogroup" aria-label="Teinte">
  <button class="swatch" role="radio" aria-checked="true" aria-label="Rouge" data-tint="207,31,34" style="--c:var(--sw-red)">…coche…</button>
</div>
```

Sur une pastille claire (jaune, gris), la coche est en `--ink` (classe `is-light`).

## États

- Survol : voir `motion.md`.
- Focus clavier : contour `--ink` de 2px, décalé de 3px. La scène est focalisable : flèches gauche et droite changent de modèle.
- Tactile : glisser sur la scène de plus de 50px change de modèle.
- Sans script ou si le détourage échoue : la photo d'origine s'affiche dans un cadre arrondi, fondue dans le gris par `mix-blend-mode: multiply`.
