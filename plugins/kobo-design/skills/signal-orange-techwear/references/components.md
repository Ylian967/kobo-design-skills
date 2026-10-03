# Signal Orange Techwear — composants

Toutes les valeurs viennent de `tokens.css`. Le code complet est dans `examples/demo.html`.

## Navigation

Mesurée : ligne du logo à 39px du haut, marges de 40px. Trois zones : logo (pictogramme au trait orange, première moitié du nom en orange, seconde en blanc), liens centrés écartés de 44px, à droite compte, mot « Sac » et **compteur rond** de 28px à contour orange.
Le lien actif porte un **trait orange de 54px** et 2px d'épaisseur, plus court que le mot.

Sous 760px : logo, compteur et bouton rond de menu ; les liens s'ouvrent en panneau sombre sous la barre.

## Titre empilé

Le cœur du style. Trois ou quatre lignes en `--font-display` (capitales très étendues, graisse 800, `--fs-title`), chacune dans un registre différent :

| Ligne | Classe | Rendu |
|---|---|---|
| Pleine orange | `.o` | mot en `--orange` |
| Barres | `.slashes` | « // » orange en italique, seul ou suivi de la pilule |
| Creuse | `.hollow` | contour orange de 1.5px, intérieur sombre |
| Pleine blanche | — | mot en `--text` |

```html
<h1 class="stack">
  <span class="ln"><span class="o">Kage-X</span></span>
  <span class="ln"><span><span class="o slashes" aria-hidden="true">//</span> <button class="look">…01/04…</button></span></span>
  <span class="ln"><span class="hollow">Ombre</span></span>
  <span class="ln"><span>Nocturne</span></span>
</h1>
```

Une seule ligne creuse et une seule ligne de barres par titre.

## Pilule de silhouette

Pilule orange (≈ 164 × 52px) dans la ligne des barres : une photo en fusion sombre, le numéro « 01/04 » à gauche, un petit rond à contour blanc à droite. C'est un bouton : il fait passer à la silhouette suivante.

## Index de section

Petite ligne en capitales au-dessus du titre : numéro en orange, barre, intitulé en blanc — « 01 / La collection — Nocturne ».

## Panneau

Rectangle translucide sombre (`--panel`), filet de 1px `--line`, angles de 2px, **halo orange** dans le bas (`--panel-hot`). Largeur de la colonne : 310px.

- **Fiche produit** : vignette carrée de 68px, étiquette orange espacée (« NX-01 Sac »), deux lignes de texte, bouton à contour.
- **Tableau de specs** : titre, quatre lignes de 43px séparées par un filet `--line-soft` — étiquette orange en capitales espacées à gauche, valeur `--muted` à droite — puis l'interrupteur « ● Profondeur on ».

```html
<section class="panel specs">
  <h2>Specs opérateur</h2>
  <dl><div class="row"><dt>Vision</dt><dd>Double 8K Pulse-OLED</dd></div>…</dl>
  <button class="depth" role="switch" aria-checked="true">Profondeur on</button>
</section>
```

Variante claire `.panel--fog` (fond `--fog-panel`, texte `--ink`) pour l'écran gris.

## Bouton

Rectangle de 28px de haut, contour orange, capitales espacées de 11px, flèche ↗. Variante pleine `.btn--full` : fond orange, texte `--on-orange` (sombre), 34px de haut.

## Lien fléché

Texte orange souligné suivi de ↗ (« Explorer ↗ ») ; en capitales pour un appel de fin de section.

## Texte vertical

« Techwear 26' » écrit de haut en bas (`writing-mode: vertical-rl`), gris avec le millésime en blanc, à côté de la silhouette. Décoratif (`aria-hidden`).

## Ronds sociaux

Cercles de 36px à contour `--line` ; le premier (ou celui survolé) a un contour orange.

## Fiche système

Panneau à filet, angles de 4px : étiquette orange « Système / 01 » et flèche, titre en capitales espacées, deux lignes en `--muted`. Trois côte à côte, 20px d'écart.

## Onglets

Rectangles de 30px à contour orange ; l'actif est plein orange à texte sombre. Boutons `aria-pressed`.

## Fiche produit (grille)

Panneau opaque `--panel-solid` avec halo orange dans un angle. Photo en noir et blanc (rapport 1 / 1.08) portant : une **étiquette de code** encadrée en haut à gauche, la mention du look en bas à gauche, un **bouton rond « + »** en bas à droite. Dessous : nom en orange et prix, une ligne en `--muted`, puis coloris (petit rond) et lien « Voir la fiche ↗ ».

## États

- Survol : voir `motion.md`.
- Focus clavier : contour orange de 2px, décalé de 3px.
- Le bouton « + » a une zone de clic agrandie de 7px.
