# Zigzag Snack Pop — composants

Tous les exemples supposent le `:root` de `tokens.css`. Contour = `var(--stroke) solid var(--ink)`, ombre = dure.

## Bord en dents de scie (signature)

```css
/* dents en bas seulement (héros) */
.zz-bottom { mask:
  conic-gradient(from -45deg at bottom, transparent, var(--ink) 1deg 89deg, transparent 90deg) bottom / var(--zigzag) var(--zigzag-h) repeat-x,
  linear-gradient(var(--ink) 0 0) top / 100% calc(100% - var(--zigzag-h) + 1px) no-repeat; }
/* dents en haut et en bas (bande crème, pied de page) */
.zz-both { mask:
  conic-gradient(from 135deg at top, transparent, var(--ink) 1deg 89deg, transparent 90deg) top / var(--zigzag) var(--zigzag-h) repeat-x,
  conic-gradient(from -45deg at bottom, transparent, var(--ink) 1deg 89deg, transparent 90deg) bottom / var(--zigzag) var(--zigzag-h) repeat-x,
  linear-gradient(var(--ink) 0 0) center / 100% calc(100% - 2 * var(--zigzag-h) + 2px) no-repeat; }
```
La couleur dans `mask` ne sert qu'à l'opacité. La section suivante remonte de `--zigzag-h` (`margin-top: calc(-1 * var(--zigzag-h))`) pour que les dents mordent dans la précédente.

## Navigation

Barre `--bar` collante, 64px. Logo Anton jaune à gauche (petit triangle orange = « sommet »), liens centrés Archivo 600 12px capitales blancs + chevron, panier rond à droite (contour blanc 2px, compteur jaune).

```html
<header class="nav"><div class="wrap">
  <a class="logo" href="/"><i></i>MARQUE</a>
  <nav aria-label="Navigation principale"><ul>
    <li><a href="#">Barres <span class="chev" aria-hidden="true"></span></a></li>…
  </ul></nav>
  <button class="cart" aria-label="Panier, 2 articles">…<b>2</b></button>
</div></header>
```
```css
.nav ul a { min-height: 44px; padding: 0 var(--space-3); font: 600 var(--text-xs)/1 var(--font-body); letter-spacing: var(--tracking-caps); text-transform: uppercase; }
.nav ul a:hover { background: var(--brown); }
.chev { width: 7px; height: 7px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: translateY(-2px) rotate(45deg); }
```
Mobile (< 960px) : liens masqués, burger 3 traits blancs de 3px.

## Bouton jaune « autocollant »

```css
.btn { min-height: 52px; padding: 0 var(--space-6); border: var(--stroke) solid var(--ink); border-radius: var(--radius-sm);
  font: 800 var(--text-sm)/1 var(--font-body); letter-spacing: var(--tracking-caps); text-transform: uppercase;
  transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.btn--yellow { background: var(--yellow); color: var(--ink); box-shadow: var(--shadow-hard-lg); }
.btn--yellow:hover  { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--ink); }   /* se décolle */
.btn--yellow:active { transform: translate(5px, 5px); box-shadow: var(--shadow-press); }      /* s'écrase */
.btn:focus-visible  { outline: 3px solid var(--yellow); outline-offset: 3px; box-shadow: 0 0 0 6px var(--ink); }
.btn:disabled { background: var(--cream); color: var(--muted); box-shadow: none; cursor: not-allowed; }
```
Libellé court + chevron « › ». **Un seul bouton jaune plein par écran.**

## Pilule « Boutique »

Pilule jaune 44px, Archivo 800 12px +0.1em, posée au-dessus d'un titre sur brun. Survol : `rotate(-4deg) scale(1.05)` avec `--ease-pop`.

## Champ de recherche / e-mail

```css
.search { display: flex; align-items: center; gap: var(--space-2); min-height: 52px; padding: 0 var(--space-4);
  background: var(--white); border: var(--stroke) solid var(--ink); border-radius: var(--radius-sm); box-shadow: var(--shadow-hard-lg); }
.search input { flex: 1; min-width: 0; border: 0; background: none; font: 600 var(--text-sm) var(--font-body); color: var(--ink); }
.search input::placeholder { color: var(--muted); }
.search:focus-within { box-shadow: var(--shadow-hard-lg), 0 0 0 4px var(--yellow); }
.search[aria-invalid="true"] { border-color: var(--orange-ink); }
```
Sur fond brun, l'ombre dure passe en jaune (`4px 4px 0 var(--yellow)`).

## Mot autocollant

```css
.sticker-word { color: var(--yellow); -webkit-text-stroke: var(--stroke) var(--ink); paint-order: stroke fill; text-shadow: 5px 5px 0 var(--ink); }
```
Un seul mot par titre. Sur mobile, ombre ramenée à 3px.

## Pastille ingrédient

Cercle `--badge` (88px, 64px mobile), fond `--flavor-*`, contour brun, ombre dure 4px, icône trait 3px au centre. Libellé à droite : Archivo 800 16px capitales sur **deux lignes** (`<br>`).

```html
<li class="ing"><span class="badge" style="background:var(--flavor-mint)"><svg …/></span><strong>Cacao<br>équitable</strong></li>
```

## Carte produit

```css
.card { border: var(--stroke) solid var(--ink); border-radius: var(--radius); background: var(--flavor); box-shadow: var(--shadow-hard-lg); padding: var(--space-6);
  transition: transform var(--dur) var(--ease-pop); }
.card:hover { transform: translateY(-6px) rotate(-1deg); }
.card--featured { transform: scale(1.06); z-index: 1; }   /* carte du milieu, surélevée */
.card .tag { position: absolute; top: -16px; left: var(--space-6); background: var(--ink); color: var(--yellow); … }
```
Contenu : photo produit collée (voir ci-dessous), nom Anton 28px capitales, méta Archivo 600 14px, puis **barre d'ajout** :

```css
.add { display: flex; min-height: 48px; border: 2px solid var(--ink); border-radius: var(--radius-sm); background: var(--white); font: 800 var(--text-xs)/1 var(--font-body); text-transform: uppercase; }
.add .price { padding: 0 var(--space-4); border-left: 2px solid var(--ink); color: var(--orange-ink); }
.add:hover { background: var(--yellow); }  .add:hover .price { color: var(--ink); }
.add[aria-pressed="true"] { background: var(--ink); color: var(--yellow); }   /* ajouté */
```

## Photo produit (disque et photo collée)

Le produit est toujours une **vraie photo** (image réelle, voir `assets.md`), jamais un emballage dessiné. Section brune : photo ronde dans un disque `--orange` (contour `--stroke`, ombre `--shadow-hard-lg`) + étiquette jaune inclinée « 20 g protéines ». Cartes : photo 4:3 « collée » (contour 3px, rayon 4px, ombre dure, rotation -3° / +2°), couleurs `--grade-pop`. Toujours un `data-slot` et un fond token en repli.

```css
.disc { width: min(78%, 400px); aspect-ratio: 1; border-radius: 50%; overflow: hidden; background: var(--orange); border: var(--stroke) solid var(--ink); box-shadow: var(--shadow-hard-lg); }
.card .art { aspect-ratio: 4 / 3; overflow: hidden; border: var(--stroke) solid var(--ink); border-radius: var(--radius-sm); background: var(--cream); box-shadow: var(--shadow-hard); transform: rotate(-3deg); }
.disc img, .card .art img { width: 100%; height: 100%; object-fit: cover; filter: var(--grade-pop); }
```

## Tampon tournant

```html
<div class="stamp" aria-hidden="true">
  <svg viewBox="0 0 120 120"><defs><path id="c" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs>
    <text><textPath href="#c">Haute qualité · Haute qualité · Haute qualité ·</textPath></text></svg>
  <b></b><!-- étoile orange -->
</div>
```
Disque jaune `--stamp`, contour et ombre dure, texte Archivo 800 11.5px +0.18em, rotation `--dur-stamp` linéaire.

## Carte d'avis

Blanc, contour brun, rayon 8px, ombre dure 4px, légère rotation alternée (±1°). Étoiles orange en `clip-path`, citation Archivo 600 16px, signature 12px capitales `--muted`.

## Section brune « traces de pneu »

```css
.tyre { position: absolute; top: -10%; bottom: -10%; width: 90px; transform: rotate(14deg);
  background: conic-gradient(from 135deg at 50% 70%, var(--brown-deep) 90deg, transparent 0) 0 0 / 30px 26px; }
```
2–3 bandes en arrière-plan, à faible contraste. Le titre est blanc, l'accent en Archivo 900 italique jaune.

## Mot géant du pied de page

```css
.giant { font: 400 var(--text-giant)/1 var(--font-display); text-transform: uppercase; color: transparent; -webkit-text-stroke: 3px var(--yellow); margin-bottom: calc(-0.18 * var(--text-giant)); }
```
`aria-hidden="true"`, coupé par le bas de la page.

## États communs

- **Chargement** : pastille qui tourne avec l'étoile orange au centre.
- **Vide** (panier) : pictogramme de sac brun + bouton jaune « Choisir une saveur ».
- **Erreur** : contour `--orange-ink`, message Archivo 600 14px `--orange-ink` sous le champ.
