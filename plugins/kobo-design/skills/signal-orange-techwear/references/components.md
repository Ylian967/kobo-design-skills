# Signal Orange Techwear — composants

Tous les exemples supposent le `:root` de `tokens.css`. `.label` = JetBrains Mono 500, 10px, capitales, +0.22em.

## Navigation

Barre collante 68px, fond `--scrim` + flou, filet bas `--line`. Grille `1fr auto 1fr` : logo Michroma (première moitié orange, seconde blanche) / liens / « Sac » + compteur rond orange.

```css
.links a { position: relative; min-height: 44px; padding: 0 var(--space-4); font: 500 var(--text-xs)/1 var(--font-body); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.links a::after { content: ""; position: absolute; left: var(--space-4); right: var(--space-4); bottom: 10px; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform var(--dur) var(--ease); }
.links a:hover, .links a[aria-current] { color: var(--text); }
.links a:hover::after, .links a[aria-current]::after { transform: scaleX(1); }
```
Mobile : liens masqués, burger à 2 traits (le second, plus court, en orange).

## Empilement de titre (signature)

```html
<h1 class="stack">
  <span class="accent">Unit-X</span>
  <span class="slash" aria-hidden="true">// <i></i></span>
  <span class="outline">Phantom</span>
  <span>Midnight</span>
</h1>
```
```css
.stack { font: 400 var(--text-hero)/var(--leading-display) var(--font-display); letter-spacing: var(--tracking-display); text-transform: uppercase; }
.stack span { display: block; white-space: nowrap; }
.stack .slash { display: flex; align-items: center; gap: .3em; color: var(--accent); }
.stack .slash i { width: 1.9em; height: .42em; border-radius: var(--radius-pill); background: var(--accent); }
.stack .outline { color: transparent; -webkit-text-stroke: 1.5px var(--accent); }
```
La ligne « // » est décorative (`aria-hidden`). Au-dessus : `.label` « Nouvelle collection » précédée d'un trait orange de 24px.

## Boutons

```css
.btn { min-height: 44px; padding: 0 var(--space-5); border-radius: var(--radius); border: 1px solid transparent;
  font: 500 var(--text-2xs)/1 var(--font-mono); letter-spacing: .18em; text-transform: uppercase; }
.btn--outline { border-color: var(--accent); color: var(--accent); }           .btn--outline:hover { background: var(--accent); color: var(--on-accent); }
.btn--solid   { background: var(--accent); color: var(--on-accent); }          .btn--solid:hover   { background: var(--text); }
.btn--ghost   { border-color: var(--line-strong); color: var(--muted); }        .btn--ghost:hover   { border-color: var(--text); color: var(--text); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 1px solid var(--accent); outline-offset: 3px; box-shadow: 0 0 0 4px var(--accent-glow); }
.btn[disabled] { border-color: var(--line); color: var(--dim); background: transparent; cursor: not-allowed; }
.btn .ne { transition: transform var(--dur) var(--ease); }  .btn:hover .ne { transform: translate(2px, -2px); }  /* flèche ↗ */
```

## Lien souligné « Explorer »

Inter 500 11px capitales +0.14em, `text-decoration: underline` orange, `text-underline-offset: 6px`, flèche →. Survol : texte orange.

## Icônes rondes

Cercles 44px, `--border`, icône trait 1.6px `--muted` ; survol : contour et icône orange.

## Panneau produit

```html
<article class="panel product">
  <div class="thumb shot"><img …></div>   <!-- photo réelle, voir assets.md -->
  <div><h3 class="label">NX-01 Sneaker</h3><p>Description 2 lignes…</p></div>
  <a class="btn btn--outline" href="#">Voir le film produit <span class="ne">↗</span></a>
</article>
```
```css
.panel { border: var(--border); border-radius: var(--radius-panel); background: var(--panel-glass); backdrop-filter: blur(var(--blur)); box-shadow: var(--shadow-panel); padding: var(--space-5); }
.product { display: grid; grid-template-columns: 96px 1fr; gap: var(--space-4); }
.product h3 { color: var(--accent); }  .product p { color: var(--muted); font-size: var(--text-xs); }
.product .btn { grid-column: 1 / -1; }
```

## Tableau de specs

```html
<section class="panel specs">
  <h3 class="label">Specs opérateur <span>v2.6</span></h3>
  <dl>
    <div class="row"><dt class="label">Vision</dt><dd><span class="sr-only">8 sur 10</span><span class="meter" aria-hidden="true"><i class="on"></i>…</span></dd></div>
    <div class="row"><dt class="label">Armure</dt><dd>3 couches / 20K mm</dd></div>
  </dl>
  <footer><span class="label dot">Profondeur on</span><button class="toggle" role="switch" aria-checked="true" aria-label="Effet de profondeur"></button></footer>
</section>
```
Lignes séparées par `--line`, étiquettes orange, valeurs JetBrains Mono 11px `--muted`, jauge = segments 10×4px. Pied : point orange clignotant + interrupteur.

## Interrupteur

Piste 44×24, contour `--line-strong`, pastille grise ; activé : contour et pastille orange, pastille décalée de 20px.

## Index de section

`.label` orange « 01 / La collection » + `<em>` gris « — Midnight », puis titre Michroma `--text-h2` orange avec point final (« Chaque couche. »).

## Onglets de filtre

```css
.tab { min-height: 44px; padding: 0 var(--space-5); border-radius: var(--radius); border: var(--border); background: transparent; color: var(--muted); font: 500 var(--text-2xs)/1 var(--font-mono); letter-spacing: .18em; text-transform: uppercase; }
.tab:hover { color: var(--text); border-color: var(--text); }
.tab[aria-selected="true"] { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
```
Conteneur `role="tablist"` ; compteur « 12 pièces » en `.label` gris à droite.

## Carte produit

```css
.card a { display: block; background: var(--panel); border: 1px solid var(--line);
  clip-path: polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, 0 100%); }
.card a:hover { background: var(--panel-2); border-color: var(--line-strong); }
.card .tag { position: absolute; left: var(--space-3); top: var(--space-3); color: var(--accent); }   /* « NX-03 / Accessoires » */
.card h3 { font: 400 var(--text-sm)/1.3 var(--font-display); text-transform: uppercase; }
.card .meta { display: flex; justify-content: space-between; color: var(--muted); font: 400 var(--text-xs)/1 var(--font-mono); }
```
Image réelle 4:5 traitée en N&B sombre (voir `assets.md`), repli halo `--panel-2`, étiquette sur `--scrim`, ligne de balayage orange au survol (voir motion).

## Texte vertical

`writing-mode: vertical-rl`, Michroma 13px +0.3em, `--dim`, le millésime en orange. Toujours `aria-hidden`.

## Bandeau défilant

Filets haut/bas, Michroma 18px `--dim`, « // » en orange entre les mots, contenu dupliqué et `translateX(-50%)` en boucle, pause au survol, `aria-hidden`.

## États

- **Chargement** : panneaux vides avec ligne de scan orange qui descend.
- **Rupture** : carte à 50 % d'opacité, étiquette « Épuisé » en `--dim`, bouton `disabled`.
- **Erreur de champ** : filet orange, message `.label` orange sous le champ.
