# Pixel Lime Portfolio — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`.

## Boutons

Carrés (`--radius-0`), hauteur 44px (52px collé à un champ), JetBrains Mono 500 12px capitales +0.08em, padding 0 16px, flèche → qui glisse de 4px au survol.

| Variante | Repos | Survol | Usage |
|---|---|---|---|
| `.btn--lime` | fond `--lime`, texte `--on-lime` | fond `--white` | action principale (« Découvrir la suite », « Écrire ») — une par écran |
| `.btn--ink` | fond `--ink`, texte `--white` | fond `--lime`, texte `--on-lime` | sur papier |
| `.btn--line` | contour 1px `currentColor`, transparent | fond `--ink`, texte `--white` | secondaire (« Voir le CV ») |

États communs : appui = `translate(1px, 1px)` ; focus = contour 2px `--lime` décalé de 3px (sur papier, ajouter `outline-color: var(--ink)` si le bouton est lime) ; désactivé ou chargement (`aria-busy="true"`) = opacité .45 + `not-allowed`, la flèche ne bouge plus.

```html
<a class="btn btn--lime" href="#pense">Découvrir la suite <span class="arr" aria-hidden="true">→</span></a>
```
```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-3); min-height: 44px; padding: 0 var(--space-4);
  border: 1px solid transparent; border-radius: var(--radius-0); font: 500 var(--text-xs)/1 var(--font-mono); letter-spacing: var(--tracking-mono);
  text-transform: uppercase; text-decoration: none; cursor: pointer;
  transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease); }
.btn .arr { display: inline-block; transition: transform var(--dur) var(--ease); }
.btn:hover .arr { transform: translateX(4px); }
.btn:active { transform: translate(1px, 1px); }
.btn--lime { background: var(--lime); color: var(--on-lime); }
.btn--lime:hover { background: var(--white); }
.btn--ink { background: var(--ink); color: var(--white); }
.btn--ink:hover { background: var(--lime); color: var(--on-lime); }
.btn--line { border-color: currentColor; background: transparent; }
.btn[disabled], .btn[aria-busy="true"] { opacity: .45; cursor: not-allowed; transform: none; }
```

## Navigation

Une ligne, **éléments répartis sur toute la largeur** (`justify-content: space-between`) : logo mono (carré lime 10px + « n.valin »), 4 liens, puis l'indicateur « Dispo · nov. 2026 » avec carré lime clignotant. Tout en mono 11px capitales, **souligné** (1px, décalage 4px). Survol et page courante (`aria-current="page"`) : texte `--lime`. Chaque lien fait 44px de haut (`inline-flex` + `min-height`).

```css
.nav { position: absolute; inset: 0 0 auto; display: flex; justify-content: space-between; align-items: center; padding: var(--space-3) var(--edge); }
.nav a { display: inline-flex; align-items: center; min-height: 44px; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px; }
.nav a:hover, .nav a[aria-current] { color: var(--lime); }
```

Mobile (< 640px) : on garde la ligne (logo + 3 liens), on masque « À propos » et l'indicateur. Au-delà de 4 liens, passer à un bouton carré « MENU » 44px qui ouvre un panneau `--ink` plein écran, liens en Inter Tight 48px bas de casse.

## Étiquette

Petit rectangle noir, mono 500 11px, **bas de casse** (exception à la règle des capitales : c'est une étiquette « manuscrite »), padding 5px 9px, carré de 6px lime optionnel. Variante `--lime`. Sur la photo, deux étiquettes empilées et décalées (la 2e de 34px vers la droite).

```html
<span class="tag"><i aria-hidden="true"></i>comment je pense</span>
<span class="tag tag--lime">designer</span>
```
```css
.tag { display: inline-flex; align-items: center; gap: var(--space-2); padding: 5px 9px 4px; background: var(--ink); color: var(--white);
  font: 500 var(--text-2xs)/1.2 var(--font-mono); letter-spacing: var(--tracking-mono); }
.tag--lime { background: var(--lime); color: var(--on-lime); }
.tag i { width: 6px; height: 6px; background: var(--lime); }
```

## Mosaïque de pixels (signature)

Une grille CSS de carrés `--pixel` générée depuis un motif texte : `x` lime, `k` noir, `w` blanc, `o` contour lime, `.` vide ; lignes séparées par `/`. Toujours `aria-hidden="true"` et `pointer-events: none`.

```html
<div class="mosaic m-face" aria-hidden="true" data-pattern="........xx../......xxxx.x/.....xxoxxxx/...x.xxxx.xx/....xxkxxx../..xxxx.xxxxx/.x..xxwxx.x./...xx.xx..x."></div>
```
```css
.mosaic { position: absolute; display: grid; grid-template-columns: repeat(var(--cols), var(--pixel)); grid-auto-rows: var(--pixel); pointer-events: none; }
.mosaic b { background: var(--lime); }
.mosaic b.k { background: var(--ink); } .mosaic b.w { background: var(--white); }
.mosaic b.o { background: transparent; box-shadow: inset 0 0 0 2px var(--lime); }
```
```js
document.querySelectorAll('.mosaic[data-pattern]').forEach(m => {
  const rows = m.dataset.pattern.split('/'), cols = Math.max(...rows.map(r => r.length));
  m.style.setProperty('--cols', cols);
  let i = 0;
  rows.forEach(r => [...r.padEnd(cols, '.')].forEach(c => {
    const b = document.createElement(c === '.' ? 'span' : 'b');
    if (c !== '.' && c !== 'x') b.className = c;
    b.style.setProperty('--i', i++ % 23 * 1.7 | 0);   // ordre d'apparition pseudo-aléatoire
    m.appendChild(b);
  }));
});
```

Règles de dessin : bord irrégulier, quelques pixels isolés qui « s'échappent », densité plus forte au centre, 1 pixel noir + 1 blanc + 1 contour au maximum. Grappe principale 10–12 colonnes, échos 3–7 colonnes. Sans JS : prévoir les carrés en HTML ou masquer la grappe (la page reste complète).

## Photo noir et blanc

Conteneur `data-slot="portrait-bw"` avec `role="img"` + `aria-label`. Vraie photo : `filter: grayscale(1) contrast(1.08) brightness(.92)`, cadrage sujet au centre-droit, assez de vide à gauche pour le nom. Voile : dégradé sombre en haut (nav) et en bas (nom). Grain : filtre SVG `feTurbulence` en `mix-blend-mode: overlay` à `--grain-opacity`.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></svg>
```
```css
.photo img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.08) brightness(.92); }
.photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, color-mix(in srgb, var(--photo-0) 45%, transparent), transparent 22%, transparent 55%, color-mix(in srgb, var(--photo-0) 70%, transparent)); }
.grain::before { content: ""; position: absolute; inset: 0; z-index: 3; filter: url(#grain); opacity: var(--grain-opacity); mix-blend-mode: overlay; pointer-events: none; }
```

## Nom du héros

```html
<h1 class="name"><span><em>noé</em></span><span><b>valin</b></span></h1>
```
```css
.name { margin: 0; font: var(--weight-name) var(--text-name)/var(--leading-name) var(--font-sans); letter-spacing: var(--tracking-name); }
.name span { display: block; }
.name span + span { padding-left: 0.92em; }   /* décalage de la 2e ligne */
.name em { font-style: normal; font-weight: 300; }
```

## Surlignage pilule

Pilule lime derrière un mot ou une expression courte (2–3 mots), sans casser la ligne.
```css
.hl { position: relative; z-index: 0; padding: 0 .28em; white-space: nowrap; }
.hl::before { content: ""; position: absolute; inset: .1em 0 .04em; z-index: -1; background: var(--lime); border-radius: var(--radius-pill); transform-origin: left; }
```
Sur une carte projet, le surlignage est à `scaleX(0)` et s'étire au survol/focus de la carte.

## Tracés à la main (cercle, soulignement)

SVG inline posé en absolu autour du mot, `preserveAspectRatio="none"`, trait `--ink` 2.2px arrondi, `pathLength="1"` pour animer le tracé. Le cercle ne se referme pas tout à fait (il dépasse en haut à gauche).

```html
<span class="drawn drawn--circle">une seconde<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M8 22 C 6 8, 40 2, 70 4 S 99 14, 96 24 S 60 39, 30 37 S 2 30, 10 14 C 14 9, 22 6, 30 5"/></svg></span>
<span class="drawn drawn--under">un détail qui sourit<svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 8 C 40 3, 80 10, 120 6 S 180 4, 198 7"/></svg></span>
```
```css
.drawn { position: relative; white-space: nowrap; }
.drawn svg { position: absolute; pointer-events: none; overflow: visible; }
.drawn path { fill: none; stroke: var(--ink); stroke-width: 2.2; stroke-linecap: round; }
.drawn--circle svg { inset: -0.32em -0.4em -0.22em -0.36em; width: calc(100% + .76em); height: calc(100% + .54em); }
.drawn--under svg { left: -2%; bottom: -0.32em; width: 104%; height: .4em; }
```
Sur nuit : `stroke: var(--white)` ou `var(--lime)`.

## Autocollants

Petits éléments lime **décoratifs** (`aria-hidden`) posés sur la grille : carré 10–14px, étoile 44px (`clip-path`), pilule mono inclinée -8° avec ombre dure 2px `--ink` (« ✦ sans gabarit »). 3–4 par section claire, jamais sur le texte.

## Fiche (carte-note)

Carte lime ou blanche, rayon 6px, ombre `--shadow-card`, **inclinée** (`--tilt-1/2/3`), lignes de cahier en `repeating-linear-gradient` tous les 28px, bout de scotch blanc translucide en haut. En-tête mono (« note_01 », jour) avec filet pointillé, titre Inter Tight 700 22px bas de casse, liste à cocher en mono 14px/28px. Survol : se redresse et monte de 6px (`--shadow-lift`).

```html
<article class="note">
  <header class="mono"><span>note_01</span><span>lun.</span></header>
  <h3>une seule idée par page</h3>
  <ul><li class="done">trouver la phrase</li><li>la rendre visible de loin</li></ul>
  <footer class="mono">→ clarté</footer>
</article>
```
```css
.note { position: relative; padding: var(--space-6); border-radius: var(--radius-card); background: var(--lime); color: var(--on-lime); box-shadow: var(--shadow-card);
  transform: rotate(var(--tilt)); transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
  background-image: repeating-linear-gradient(180deg, transparent 0 27px, color-mix(in srgb, var(--ink) 12%, transparent) 27px 28px); background-position: 0 86px; }
.note:hover { transform: rotate(0) translateY(-6px); box-shadow: var(--shadow-lift); }
.note::before { content: ""; position: absolute; top: -9px; left: 50%; width: 64px; height: 18px; translate: -50% 0; background: color-mix(in srgb, var(--white) 55%, transparent); rotate: -3deg; }
.note li::before { content: ""; width: 12px; height: 12px; border: 1.5px solid currentColor; }
.note li.done::before { background: currentColor; box-shadow: inset 0 0 0 2px var(--lime); }
.note li.done { text-decoration: line-through; }
```
Ordre : lime, blanc (décalé de 32px vers le bas), lime. Si la liste est interactive, utiliser de vraies `input type="checkbox"` stylées de la même façon.

## Carte projet

Vignette 4:3 rayon 6px (`data-slot="project-cover"`), puis une ligne : titre Inter Tight 500 22px **bas de casse** à gauche, méta mono `--muted` à droite (« identité · 2026 »). Toute la carte est un lien. Survol/focus : vignette zoom 1.03, petite grappe de pixels qui apparaît, pilule lime qui s'étire sous le titre. Grille 2 colonnes, colonne de droite décalée de 64px vers le bas.

## Puces de filtre

Pilules blanches, contour `--rule`, mono 11px capitales, 44px de haut. Survol : contour `--ink`. Active (`aria-pressed="true"`) : fond `--lime`, contour `--ink`. Groupe `role="group"` + `aria-label`.

## Liste de services

Lignes de 88px séparées par des filets, grille `80px 1fr 1fr 44px` : numéro mono « (01) », intitulé Inter Tight 500 36px, description `--muted`, flèche → qui pivote de -45° au survol. Survol/focus : fond lime qui monte depuis le bas (`scaleY`).

## Champ (contact)

Sur nuit : fond `--card-dark`, contour `--rule-dark`, mono 14px blanc, placeholder `--muted-dark`, 52px de haut, collé à un bouton lime.

| État | Rendu |
|---|---|
| Repos | contour `--rule-dark` |
| Survol | contour `--muted-dark` |
| Focus | contour `--lime` + trait bas 2px lime |
| Erreur (`aria-invalid="true"`) | contour et trait bas `--white` + message mono « Il manque un e-mail valide. » |
| Envoi | bouton `aria-busy`, message « Envoi… » dans `role="status"` |
| Succès | message en `--lime` |

```css
.input { min-height: 52px; padding: 0 var(--space-4); border: 1px solid var(--rule-dark); background: var(--card-dark); color: var(--white); font: 400 var(--text-sm) var(--font-mono); }
.input:focus { outline: none; border-color: var(--lime); box-shadow: inset 0 -2px 0 var(--lime); }
.input[aria-invalid="true"] { border-color: var(--white); box-shadow: inset 0 -2px 0 var(--white); }
```

## Chiffres clés

Trois colonnes sous l'énoncé, filet en haut : nombre Inter Tight 500 56px approche -0.04em, légende mono `--muted`. En mobile : une ligne par chiffre, nombre et légende côte à côte.
