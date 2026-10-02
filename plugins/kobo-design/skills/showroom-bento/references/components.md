# Showroom Bento — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`.

## Cadre studio

```css
.frame { margin: var(--frame-inset); min-height: calc(100vh - 2 * var(--frame-inset)); border-radius: var(--radius-frame); overflow: hidden;
  display: grid; grid-template-rows: auto auto minmax(340px, 1fr) auto; padding: var(--pad);
  background: radial-gradient(48% 46% at 50% 50%, var(--frame-hi), color-mix(in srgb, var(--frame-hi) 40%, var(--frame)) 45%, var(--frame) 75%); }
```
Le cadre coupe (`overflow: hidden`) les voisins du carrousel. Fond de page `--page` autour.

## Pilule

- **Rôle** : navigation et actions. Hauteur 44px, padding 0 20px, rayon 999px, Inter 500 14px.
- **Variantes** : blanche (`--tile`), noire (`.pill--ink` ou `aria-current="page"`).
- **États** : survol = `--soft` (blanche) ou noir éclairci à 82 % (noire) ; appui = `scale(.97)` ; focus = contour 2px `--ink` décalé de 2px ; désactivé = opacité .4 ; chargement = libellé « … » + `aria-busy`.

```html
<nav class="pills" aria-label="Principale">
  <a class="pill" href="#" aria-current="page">Modèles</a><a class="pill" href="#">Configurer</a>
</nav>
<a class="pill pill--ink" href="#">Commander</a>
```
```css
.pill { display: inline-flex; align-items: center; gap: var(--space-2); min-height: var(--control); padding: 0 var(--space-5); border: 0;
  border-radius: var(--radius-pill); background: var(--tile); color: var(--ink); font: 500 var(--text-sm) var(--font-body); cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.pill:hover { background: var(--soft); }
.pill:active { transform: scale(.97); }
.pill[aria-current="page"], .pill--ink { background: var(--ink); color: var(--on-ink); }
.pill--ink:hover { background: color-mix(in srgb, var(--ink) 82%, var(--tile)); }
```

## Bouton rond (icône)

Cercle 44px `--tile`, icône trait 18px (1.6px, `currentColor`). Survol `--soft`, appui `scale(.94)`. Badge : pastille `--accent` 16px avec chiffre `--on-accent` 10px en haut à droite ; le nombre est aussi dans l'`aria-label` (« Panier, 1 article »).

## Navigation

Grille `1fr auto 1fr` : monogramme rouge (44px) | groupe de pilules centré (gap 4px) | boutons ronds + pilule noire « Commander ». Mobile : le groupe de pilules passe sur sa propre ligne et défile horizontalement à l'intérieur du cadre (barre masquée).

## Titre + prix

- Titre Outfit 700 `--text-title`, « Model V4 » en `--ink` + nom de marque en `<em>` `--accent`. Légende 11px `--muted` dessous (36ch max).
- Prix aligné à droite, même taille et graisse ; le symbole « € » en 500 `--muted`. Mention 11px dessous. `aria-live="polite"` pour annoncer le changement de modèle.

## Carrousel à voisins (signature)

```html
<section class="stage" aria-label="Modèles" aria-roledescription="carrousel">
  <button class="side side--prev" aria-label="Modèle précédent"><img alt=""></button>
  <div class="hero-bike"><span class="floor"></span><img class="bike" data-slot="product-side" alt="…"></div>
  <button class="side side--next" aria-label="Modèle suivant"><img alt=""></button>
  <div class="carousel"><button class="icon-btn" aria-label="Précédent">‹</button><output aria-live="polite">01 / 03</output><button class="icon-btn" aria-label="Suivant">›</button></div>
</section>
```
```css
.hero-bike { position: relative; width: min(820px, 60vw); }
.floor { position: absolute; left: 50%; bottom: -18px; width: 96%; height: 46px; translate: -50% 0; background: var(--shadow-floor); }
.side { position: absolute; top: 50%; width: min(560px, 42vw); translate: 0 -54%; opacity: .5; filter: saturate(.55) blur(1px); }
.side--prev { left: calc(var(--pad) * -1 - 24%); } .side--next { right: calc(var(--pad) * -1 - 24%); }
.carousel { position: absolute; left: 50%; bottom: 0; translate: -50% 0; display: flex; gap: var(--space-1); padding: 4px; border-radius: var(--radius-pill); background: var(--tile); }
```
- Les voisins sont cliquables (survol : opacité .75) et pilotables au clavier par ← →.
- Le produit doit être un rendu **détouré** (PNG/WebP transparent ou SVG) vu de profil, roues posées sur l'ombre.

## Tuile

Fond `--tile`, rayon `--radius-tile`, padding 16px, ombre `--shadow-tile`. Survol (tuiles interactives) : fond `--soft`.

## Tuile accessoire

Deux colonnes : texte (titre 16px, description 12px `--muted`, puis en bas prix Outfit 700 20px + pilule noire « Acheter » 40px) | visuel sur fond `--soft` radial (image détourée). Survol : le visuel tourne de -4° et grossit de 4 %. Occupe deux rangées.

## Tuile caractéristique

Icône trait 22px en haut ; en bas valeur Outfit 600 18px (« 214 ch ») + étiquette 11px `--muted` (« Puissance »). Hauteur min 104px. Six tuiles en 3 × 2.

## Tuile couleur (configurateur)

Colonne texte (titre, consigne, visuel du produit de face sur `--soft`, nom de la teinte + supplément « +140,50 € » ou « Inclus ») | colonne verticale de pastilles.

```html
<fieldset class="swatches"><legend class="sr-only">Couleur du carénage</legend>
  <label class="swatch" style="--sw: var(--paint-red)"><input type="radio" name="paint" checked><i></i><span class="sr-only">Rouge course</span></label>
</fieldset>
```
```css
.swatch { width: var(--control); height: var(--control); display: grid; place-items: center; position: relative; }
.swatch input { position: absolute; inset: 0; opacity: 0; margin: 0; }
.swatch i { width: 24px; height: 24px; border-radius: 50%; background: var(--sw); }
.swatch input:checked + i { box-shadow: 0 0 0 2px var(--tile), 0 0 0 3.5px var(--ink); }
.swatch input:checked + i::after { /* coche blanche (noire sur teinte claire) */ }
.swatch input:focus-visible + i { outline: 2px solid var(--ink); outline-offset: 4px; }
```
Changer de teinte met à jour `--paint` sur le rendu de profil et sur la vue de face (rendus SVG à classes `fill: var(--paint)` ou jeu d'images par teinte).

## Rendu produit recolorable (maquette)

Carrosserie dessinée une fois dans un `<g id="bodywork">` sans `fill`, réutilisée deux fois : `<use class="pt">` (couleur `var(--paint)`) puis `<use fill="url(#shade)">` (dégradé blanc → transparent → noir pour le volume). Pneus, jantes, métal et bulle ont leurs propres classes de tokens.

## États vide, chargement, erreur

- **Chargement du rendu** : ombre au sol et pilule du carrousel déjà en place ; silhouette `--soft` floue à la place du produit.
- **Rupture de stock** : pilule « Acheter » désactivée + mention `--accent-ink` 11px « Bientôt disponible ».
- **Erreur de configuration** : la pastille reste sur la teinte précédente, message 11px `--accent-ink` sous la tuile.
