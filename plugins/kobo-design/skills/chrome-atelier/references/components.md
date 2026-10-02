# Chrome Atelier — composants

Toutes les valeurs viennent de `tokens.css`. Code complet et fonctionnel dans `examples/demo.html`.

## Pilule (bouton principal et secondaire)

- **Rôle** : toute action. Contour 1px `currentColor`, rayon `--radius-pill`, Inter 500 11px capitales +0.14em, hauteur 44px, padding 0 24px, flèche → optionnelle.
- **Variantes** : `.pill` (contour, par défaut) ; `.pill--solid` (noire, une seule par écran) ; sur nuit, le contour prend `--on-night`.
- **États** : repos ; survol = inversion (fond `--ink`, texte `--on-ink`) et flèche +3px ; appui = `scale(.97)` ; focus = contour 1px décalé de 4px ; désactivé = opacité .4 + `not-allowed` ; chargement = texte remplacé par « … » et `aria-busy="true"`.

```html
<a class="pill pill--solid" href="#liste">Réserver la pièce <span class="arr" aria-hidden="true">→</span></a>
<button class="pill">Voir portée</button>
```
```css
.pill { display: inline-flex; align-items: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-6);
  border: 1px solid currentColor; border-radius: var(--radius-pill); background: transparent;
  font: 500 var(--text-2xs) var(--font-body); letter-spacing: var(--tracking-caps); text-transform: uppercase; cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.pill:hover { background: var(--ink); color: var(--on-ink); border-color: var(--ink); }
.pill:active { transform: scale(.97); }
.pill:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }
.pill--solid { background: var(--ink); color: var(--on-ink); border-color: var(--ink); }
.pill--solid:hover { background: transparent; color: var(--ink); }
.night .pill:hover { background: var(--on-night); color: var(--night); border-color: var(--on-night); }
.pill[disabled] { opacity: .4; cursor: not-allowed; }
```

## Navigation

- Absolue en haut, padding 24px `--edge`. Logo à gauche (Archivo 600 étirée 125 %, +0.18em, une lettre remplacée par un cercle de 2px de contour).
- À droite : 4 liens Inter 500 11px capitales `--muted`, gap 32px, puis la pilule à contour « Liste d'attente ».
- Survol d'un lien : texte `--ink` + soulignement 1px qui se trace de gauche à droite (`scaleX`).
- **Mobile (≤ 900px)** : liens masqués, bouton rond 44px (contour `--line-strong`) à trois traits ; le menu s'ouvre en panneau `--paper` sous la barre, liens empilés, pilule en bas. `aria-expanded` sur le bouton.

```css
.nav__links a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 12px; height: 1px; background: currentColor;
  transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out); }
.nav__links a:hover::after { transform: scaleX(1); transform-origin: left; }
```

## Étiquette entre crochets

IBM Plex Mono 11px capitales +0.14em `--muted`, crochets avec espaces : `[ pièce signature ]`. Au-dessus de chaque titre de section, jamais seule ailleurs.

## Titre décalé

Archivo 500 étirée, capitales, interligne 1.02. Une `<span>` par ligne ; chaque ligne suivante reçoit un `padding-left` multiple de `--indent-step` (scène nuit : 0 / 1.2 / 0.5 / 1.6). La dernière ligne de la scène nuit passe en `--muted-night`.

```html
<h1 class="title"><span><b>Matières magnifiques</b></span><span><b>Savoir-faire superbe</b></span></h1>
```
```css
.title { font: 500 var(--text-title)/var(--leading-tight) var(--font-display); font-stretch: var(--stretch-display); text-transform: uppercase; }
.title span { display: block; overflow: hidden; white-space: nowrap; }
.title span + span { padding-left: var(--indent-step); }
```
Le `<b>` intérieur sert à l'animation de montée (voir `motion.md`). Sur mobile, `white-space: normal` et indentation réduite à 1.2em.

## Planche : filets + cercle (signature)

- **Filets** : un SVG `viewBox="0 0 100 100" preserveAspectRatio="none"` en `absolute; inset: 0` avec 4 lignes (2 diagonales, 1 verticale, 1 horizontale) ; `vector-effect: non-scaling-stroke` pour rester à 1px.
- **Cercle** : `--ring-size` (≈ 68vh), centré sur la pièce, filet `--line` ; un second cercle en pointillés à 9 % à l'intérieur ; un point `--ink` de 5px orbite en 24s.

```html
<svg class="guides" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
  <line x1="0" y1="0" x2="100" y2="100"/><line x1="100" y1="0" x2="0" y2="100"/>
  <line x1="50" y1="0" x2="50" y2="100"/><line x1="0" y1="50" x2="100" y2="50"/>
</svg>
```
```css
.guides { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.guides line { stroke: var(--line); stroke-width: 1; vector-effect: non-scaling-stroke; }
.ring { position: absolute; left: 50%; top: 50%; width: var(--ring-size); aspect-ratio: 1; translate: -50% -50%; border: var(--hairline); border-radius: 50%; }
.ring::before { content: ""; position: absolute; inset: 9%; border: 1px dashed var(--line); border-radius: 50%; opacity: .7; }
.ring::after { content: ""; position: absolute; left: 50%; top: -3px; width: 5px; height: 5px; margin-left: -2.5px; border-radius: 50%;
  background: var(--ink); transform-origin: 50% calc(var(--ring-size) / 2 + 3px); animation: orbit var(--dur-spin) linear infinite; }
```

## Pièce produit

- Conteneur `data-slot="product-3d"` avec `role="img"` et un `aria-label` descriptif (« … rendu 3D interactif : glisser pour la faire tourner »).
- **Vraie scène 3D, voir `assets.md` § 5** : canvas Three.js transparent posé dans le cercle, ombre portée douce (`drop-shadow(0 34px 30px …)`) et ellipse de sol floue dessous. Couleurs des métaux lues dans les tokens `--gold`, `--chrome`, `--white-gold`.
- Repli : photo réelle (bijou porté ou rendu pré-calculé) recadrée en disque à l'intérieur du cercle, qui s'efface en fondu quand la 3D est prête (`.is-3d-ready`). Jamais de dessin SVG de la pièce.

## Légende reliée

Trait horizontal 1px `--line-strong` (40–150px) + pastille 7px de la couleur du métal + texte mono 11px `--ink`. Placée à droite de la pièce, à hauteur de la zone décrite. Variante « note » : étiquette mono + deux lignes Inter `--muted`, sans trait.

```html
<span class="callout mono"><b class="dot--gold"></b>Or jaune</span>
```
```css
.callout { display: flex; align-items: center; gap: var(--space-3); white-space: nowrap; }
.callout::before { content: ""; width: clamp(40px, 9vw, 150px); height: 1px; background: var(--line-strong); transform-origin: right; }
.callout b { width: 7px; height: 7px; border-radius: 50%; }
```

## Sélecteur de titre d'or (10K, 14K, 18K, 22K)

Rangée centrée en bas du héros : légende mono « Titre », puis des `<button aria-pressed>` en mono 11px séparés par des virgules. Zone de 44×44px, texte minuscule. Actif : `--ink` + soulignement décalé de 6px. Survol : `--ink`. Effet : la teinte du métal or de la scène 3D glisse vers la nouvelle couleur (10K pâle → 22K jaune saturé), voir `assets.md`.

## Barre de caractéristiques (scène nuit)

`<dl>` en grille de 3 colonnes, pleine largeur, filet `--line-night` en haut et entre colonnes. `dt` mono 11px `--muted-night`, `dd` Archivo 500 étirée 28px capitales. Fond `--night` à 55 % + flou 6px pour rester lisible sur la photo. Mobile : une ligne par valeur, étiquette à gauche, valeur à droite.

## Rangée presse

Étiquette `[ vu dans ]` à gauche (180px), puis 4–6 mots-symboles en `--muted`, chacun dans un traitement typographique différent (condensé espacé, italique, mono, large gras). Survol : `--ink`.

## Champ de saisie

Souligné seulement : pas de boîte. Étiquette mono au-dessus, champ 48px, filet bas `--line-strong` ; survol `--ink` ; focus filet 2px `--ink` ; erreur filet et message en `--gold-ink` (`aria-invalid`, message en `aria-live="polite"`) ; désactivé opacité .4.

## Puces (choix du métal)

Pilules 44px à contour `--line`, mono 11px, pastille de couleur 8px. Radio cachée dedans. Sélectionnée : contour `--ink`, fond `--bg`. Focus : contour décalé.

## Panneau communauté

Carte `--paper` sans rayon (ou `--radius-card`), padding 48px, ombre `--shadow-card`, qui chevauche le bas d'une photo nuit. Étiquette, titre Archivo 28px capitales, texte, champ, puces, pilule pleine.

## Confirmation (liste d'attente)

Remplace le formulaire : sceau rond 72px à contour `--ink` avec ✓, titre « Vous êtes sur la liste », ligne mono « Place n° 0412 ». Reçoit le focus (`tabindex="-1"`).

## États vide, chargement, erreur

- **Rendu 3D en chargement** : le cercle et les filets sont déjà là ; la pièce apparaît en fondu + montée de 12px.
- **Image manquante** : fond `--night` (ou `--night-2`) et cercles-guides seuls ; la page reste cohérente. Les photos elles-mêmes sont réelles, voir `assets.md`.
- **Erreur de formulaire** : message en `--gold-ink` sous le champ, focus renvoyé au champ.
