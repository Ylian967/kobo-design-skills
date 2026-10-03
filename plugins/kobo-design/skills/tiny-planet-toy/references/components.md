# Tiny Planet Toy — composants

Toutes les valeurs viennent de `tokens.css`. Le code complet est dans `examples/demo.html`. Sur le site de référence tout est dessiné dans la scène 3D ; ici **seule la planète est en 3D**, le reste est du HTML.

## Ciel

Fond uni `--sky`, semé de **poussières** : une soixantaine de petits points et carrés `--sky-light` de 3 à 12px, posés une fois, immobiles. Un halo `--sky-light` très doux entoure la planète.

## Planète

Scène Three.js dans un canvas carré (`--planet`, 620px au plus) :

- sphère verte `--green-light` ;
- **maisons** : un cube (mur `--cream`, `--wall` ou `--wall-warm`) et un toit pyramidal (`--orange`, `--red` ou `--road`) ;
- **arbres** : un tronc et un volume à facettes (`--green`, `--green-light`) ;
- **eau** : calottes `--sky-deep` ;
- **repères** : un phare rayé, un bateau ;
- **contour d'encre** `--ink` autour de chaque volume et de la planète ;
- ombrage à trois paliers, sans dégradé.

On la fait tourner en la glissant. Repli sans WebGL : un disque vert à contour d'encre.

```html
<div class="planet" id="planet">
  <div class="planet-in"><div class="fallback" aria-hidden="true"></div>
    <canvas id="scene" role="img" aria-label="Petite planète… Glissez pour la faire tourner."></canvas></div>
  <div class="logo" aria-hidden="true"><span>E</span>…</div>
  <a class="begin" href="#quartiers">Entrer</a>
</div>
```

## Logo en lettres-blocs

Neuf blocs en grille 3 × 3 posés **sur** la planète (58 % de sa largeur). Chaque bloc : face `--cream`, contour d'encre de 3px, **tranche** `--cream-side` de 8px sous la face, lettre en `--font-block`, légère rotation propre (−3° à 3°). Le nom du jeu doit faire neuf lettres, ou être coupé en trois lignes de trois.

Le titre réel de la page est un `h1` hors écran : les blocs sont décoratifs.

## Bouton-bloc

Bloc `--yellow` penché de `--tilt` (−4°), contour d'encre, tranche `--yellow-side` de 8px, texte en `--font-pixel` gras. Au survol il se redresse et monte ; à l'appui il **s'enfonce de son épaisseur**.

## Boîte de dialogue

Mesurée sur le jeu : panneau ≈ 715 × 122px, étiquette ≈ 210 × 50px.

- **Étiquette du nom** : rectangle `--blue` à contour d'encre et ombre décalée, texte en `--font-pixel`, légèrement tournée, posée à cheval sur le coin haut gauche du panneau.
- **Panneau** : `--paper`, contour d'encre, bord supérieur légèrement de travers, ombre pleine décalée. Texte en capitales tracées à la main (`--font-hand`), qui s'écrit lettre à lettre.
- **Bouton « suivant »** : carré blanc de 46px à contour et ombre, triangle `--blue`, à cheval sur le coin bas droit.

```html
<div class="dialog">
  <span class="name pixel">Estafette</span>
  <div class="shadow" aria-hidden="true"></div>
  <p class="say" aria-live="polite"><span id="line"></span><span class="caret" aria-hidden="true"></span></p>
  <button class="next" aria-label="Réplique suivante">▶</button>
</div>
```

Le texte de l'étiquette est en `--ink` : le blanc du jeu sur ce bleu n'atteint que 2:1.

## Fiche de quartier

Bouton large : pastille carrée numérotée (couleur du lieu), nom en `--font-pixel`, une ligne en `--font-hand`, flèche. Fond `--card`, contour d'encre, ombre décalée de 5px. L'active est `--yellow`. `aria-pressed`.

## Touche de clavier

Petit bloc de 44px, mêmes règles que le logo (face, contour, tranche de 6px), lettre en `--font-pixel`. Sert à expliquer les commandes ; les quatre touches de direction se disposent en T.

## Écran de chargement

Plein écran `--paper`, enveloppe au trait de 34px, mot « Chargement » en `--font-pixel` très espacé.

## États

- Focus clavier : contour d'encre de 3px, décalé de 4px.
- Tout ce qui se clique a une **épaisseur** (tranche ou ombre décalée) et la perd à l'appui.
