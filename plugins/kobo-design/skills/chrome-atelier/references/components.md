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
.title { font: var(--weight-display) var(--text-title)/var(--leading-tight) var(--font-display); font-stretch: var(--stretch-display); text-transform: uppercase; }
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

---

# Relevés sur le site en ligne et la vidéo du shot (2026-10-03)

Le concept du shot a été mis en ligne par la marque ; on y a **mesuré** les styles calculés (Chrome 1536px), et la **vidéo** du shot (15,7s) a montré les écrans absents des images. On reprend la grammaire, jamais les textes, noms ni visuels.

## Pilule (mesurée)

40px de haut (≥ 44px de cible avec la marge), contour **0.8px** (`--hairline-w`), rayon pilule, padding `1rem 1.25rem`, libellé 0.75rem capitales +0.09em, Regular. Sur photo nuit : pleine blanche texte noir (« Acheter ») + contour blanc sur blanc 4 % (« Collection privée »). En barre de navigation : pilule contour encre, 0.625rem. Transition `background-color 0.3s ease`.

## Navigation (mesurée)

- **Barre claire collante** (apparaît après le héros) : logo à gauche ; à droite liens 0.625rem capitales +0.08em `--ink` (À propos, Presse, Photos & films, FAQ) + pilule contour « Liste d'attente ».
- **Dans le héros nuit** : logo centré en haut, et liens **empilés à droite à mi-hauteur** sur une seule ligne horizontale qui prolonge le filet horizontal de la photo (0.625rem blancs). « Défiler » en mono `--faint` en bas au centre.

## Barre de caractéristiques (mesurée)

Pleine largeur en bas du héros, 62px, fond noir 20 %, contour haut 0.8px blanc 16 %, 3 cellules séparées par des filets : libellé 0.625rem capitales +0.04em `--faint` au-dessus, valeur 1.15rem Regular blanche (« MONDE », « 980 € », « À DISTANCE »). Au défilement, les trois cellules **se détachent en cartes photo** qui montent à des vitesses différentes (celle du centre plus haut), chaque carte gardant son libellé et sa valeur en haut, sur un gros plan de la pièce tenue en main (observé dans la vidéo).

## Titre décalé (mesuré)

Hero : 2rem/1.1 Regular blanc, 4 lignes, chaque ligne **indentée un peu plus** que la précédente (≈ 0, 0.6em, 1.4em, 1.8em) ; sous-titre 0.75rem. Sections claires : 1.5rem/1.0 Regular `--ink`, −0.01em, deux lignes dont la seconde indentée. L'étiquette mono `[section]` en minuscules précède toujours le titre.

## Section « atelier » épinglée

Le bloc produit reste épinglé pendant que la pièce (vidéo détourée sur blanc, ou scène 3D) tourne au centre du grand cercle ; les légendes (« • OR JAUNE », « OR ROSE ») et les traits apparaissent ; la pièce **change de métal** (or jaune → or rose → argent) d'une étape de défilement à l'autre ; « 10K, 14K, 18K, 22K » en bas au centre.

## Presse à cartes révélées

Fond clair, étiquette `[presse]` + titre 2 lignes à gauche. Une **rangée de logos** de médias séparés par des filets verticaux, en défilement horizontal (Swiper). Au survol / à l'activation d'un logo, une **carte d'article** se déploie au-dessus de la cellule : titre de l'article en capitales 0.75rem, extrait 3 lignes, « Par Auteur », domaine du média, puis une photo portrait. Les cartes voisines restent estompées. Accessible : chaque logo est un bouton qui révèle la carte (`aria-expanded`).

## Galerie « photos & films »

Colonne gauche : étiquette, titre 3 lignes décalées, phrase, pilule contour, et une **longue courbe fine** (arc de compas) qui traverse la colonne. Droite : **deux colonnes de photos décalées verticalement** (la seconde commence ~25 % plus bas), photos portrait sans rayon, portés réels (oreilles, mains), quelques vidéos courtes en boucle.

## FAQ

Étiquette `[FAQ]` + titre « Questions / fréquentes » décalé à gauche ; liste de questions 0.75rem `--ink` séparées par des filets, « + » à droite ; réponse en `--muted`.

## Pied noir

Bandeau noir (#000201) ~285px, une ligne 0.75rem blanche « année + marque », logo-mot géant possible. Rien d'autre : la page se termine sur le noir.

## Écran d'intro « compas »

Fond gris clair `--bg`, grands cercles fins qui se croisent, axes, petits nœuds aux intersections et une étiquette mono au centre : la page **se construit au compas** avant d'afficher le héros (vu au début et au milieu de la vidéo). Version accessible : affiché ≤ 1,2s, sauté en mouvement réduit.

## Inscription (liste d'attente) et confirmation

Écran nuit avec la pièce en gros plan : carte **blanche** à gauche (titre 3 lignes, phrase, champs soulignés Prénom / Nom / E-mail / Téléphone, pilule encre « Rejoindre »). Confirmation mobile : photo N&B de la pièce en haut, titre « Merci… » 2 lignes, texte, pilule encre « Confirmer ».
