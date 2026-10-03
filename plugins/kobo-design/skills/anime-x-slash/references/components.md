# Anime X Slash — composants

Valeurs mesurées sur la référence (voir `source.md`), exprimées en tokens.

## Bouton MENU (carré noir fixe)

- **Rôle** : ouvre la navigation plein écran. Toujours en haut à gauche, fixe.
- **Anatomie** : carré noir 80×80px (`--menu-size` ; 82px relevé à l'accueil, 80px sur les pages internes), **deux** traits blancs fins (hamburger de 40px), mot « MENU » en Oswald 14px dessous.
- **États** : survol → les traits s'écartent de 2px ; ouvert → les traits deviennent une croix fine, le carré passe au rouge `--menu-close` et le mot devient « CLOSE » ; focus → contour rouge 2px décalé de 3px.
- **Mobile** (observé à 390px) : le carré passe en haut **à droite**, le logo en haut à gauche.

```html
<button class="menu-btn" aria-expanded="false" aria-controls="nav">
  <span class="menu-btn__lines" aria-hidden="true"></span>
  <span class="menu-btn__label">MENU</span>
</button>
```
```css
.menu-btn { position: fixed; inset: 0 auto auto 0; z-index: 60; width: var(--menu-size); height: var(--menu-size);
  display: grid; place-content: center; gap: var(--space-2); background: var(--ink); color: var(--on-ink);
  border: 0; cursor: pointer; font: 500 var(--text-sm)/1 var(--font-display); letter-spacing: var(--tracking-caps); }
.menu-btn__lines, .menu-btn__lines::before, .menu-btn__lines::after { display: block; width: 40px; height: 1.6px; background: currentColor;
  transition: transform var(--dur-base) var(--ease); }
.menu-btn__lines { position: relative; justify-self: center; background: transparent; } /* deux traits seulement */
.menu-btn__lines::before, .menu-btn__lines::after { content: ""; position: absolute; left: 0; }
.menu-btn__lines::before { top: -5px; } .menu-btn__lines::after { top: 5px; }
.menu-btn:hover .menu-btn__lines::before { transform: translateY(-2px); }
.menu-btn:hover .menu-btn__lines::after { transform: translateY(2px); }
.menu-btn[aria-expanded="true"] { background: var(--menu-close); }
.menu-btn[aria-expanded="true"] .menu-btn__lines::before { transform: translateY(5px) rotate(33deg); }
.menu-btn[aria-expanded="true"] .menu-btn__lines::after { transform: translateY(-5px) rotate(-33deg); }
.menu-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
```

## Navigation plein écran (relevée sur le site, menu ouvert)

- **Rôle** : navigation principale de toutes les pages ; s'ouvre depuis le carré MENU.
- **Anatomie** (observé) : overlay plein écran ; en fond, une illustration de groupe passée en **N&B et assombrie** (`--menu-veil`) ; liens en **2 colonnes**, capitales condensées blanches très grandes (~44px, `--text-menu`) ; logotype blanc à droite ; sélecteur de langue JP / FR en haut à droite (actif sur pastille rouge) ; en bas à gauche, mot « OFFICIEL » vertical + icônes sociales empilées.
- Le bouton MENU devient un **carré rouge « CLOSE »** avec une croix fine (`--menu-close`, texte blanc).
- **États** : lien au repos blanc ; survol / focus → rouge `--accent-text` (300ms) ; lien de la page courante → rouge + `aria-current="page"` ; focus → contour rouge 2px décalé.

```html
<button class="menu-btn" aria-expanded="false" aria-controls="nav"><span class="menu-btn__lines" aria-hidden="true"></span><span class="menu-btn__label">MENU</span></button>
<nav class="menu" id="nav" aria-label="Navigation principale" hidden>
  <div class="menu__bg" aria-hidden="true"><img src="…" alt=""></div>
  <ul class="menu__links">
    <li><a href="index.html">Accueil</a></li><li><a href="actus.html">Actualités</a></li>
    <li><a href="personnages.html" aria-current="page">Personnages</a></li><li><a href="#">Histoire</a></li>
  </ul>
  <p class="menu__brand" aria-hidden="true">RANK ZERO</p>
  <div class="menu__lang"><button aria-pressed="false">JP</button><button aria-pressed="true">FR</button></div>
  <div class="menu__sns"><span>OFFICIEL</span><a href="#" aria-label="Réseau 1">X</a></div>
</nav>
```
```css
.menu { position: fixed; inset: 0; z-index: 55; display: grid; grid-template-columns: 1fr auto; align-items: center;
  padding: var(--space-20) clamp(24px, 10vw, 160px); color: var(--on-ink); background: var(--ink); }
.menu[hidden] { display: none; }
.menu__bg { position: absolute; inset: 0; z-index: -1; }
.menu__bg img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.2); }
.menu__bg::after { content: ""; position: absolute; inset: 0; background: var(--menu-veil); }
.menu__links { display: grid; grid-template-columns: repeat(2, max-content); gap: var(--space-4) var(--space-20); margin: 0; padding: 0; list-style: none; }
.menu__links a { font: 500 var(--text-menu)/1.1 var(--font-display); text-transform: uppercase; text-decoration: none; transition: color var(--dur-fast) var(--ease); }
.menu__links a:hover, .menu__links a:focus-visible, .menu__links a[aria-current] { color: var(--accent-text); }
.menu-btn[aria-expanded="true"] { background: var(--menu-close); }   /* carré rouge CLOSE */
```
Le libellé du bouton passe de « MENU » à « CLOSE » (ou « FERMER ») par script. `Échap` ferme, le focus revient au bouton. Mobile : une seule colonne, liens 32px.

## Sélecteur de langue

Label « LANGUAGE » Oswald 11px au-dessus, deux petites cases 26×20 : inactive = fond blanc texte noir, active = fond `--accent` texte `--on-accent`.

## Bouton d'action (étiquette biseautée)

- **Rôle** : appel à l'action ou en-tête de bloc (« OFFICIAL SNS », « VOIR TOUT »).
- **Anatomie** : aplat rouge en parallélogramme, texte Noto Sans JP 700 14–16px capitales.
```css
.tag-btn { display: inline-flex; align-items: center; min-height: 44px; padding: 0 var(--space-6);
  background: var(--accent); color: var(--on-accent); font: 700 var(--text-base)/1 var(--font-body);
  letter-spacing: var(--tracking-caps); text-transform: uppercase; text-decoration: none;
  clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%); transition: background var(--dur-fast) var(--ease); }
.tag-btn:hover { background: var(--accent-deep); }
.tag-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
```

## Liste d'actualités (barres noires)

- Conteneur noir pleine largeur du container (≈ 1146px), chaque ligne : padding 30px 40px, titre blanc Noto Sans JP 700 16px, chevron fin à droite.
- **Date** : petite étiquette rouge collée sur le filet rouge de 4px qui sépare deux lignes, texte Oswald 14px noir.
- Survol : le titre se décale de 8px à droite, le chevron passe en rouge (300ms).

```html
<ul class="news">
  <li><a href="#"><time class="news__date">2025.11.11</time><span>Changement d'horaire de diffusion</span><i aria-hidden="true">›</i></a></li>
</ul>
```

## Visuel découpé en X

Image réelle (photo ou illustration du projet, voir `assets.md`) dans un conteneur, masquée par un `clip-path` qui dessine deux bandes diagonales, avec un voile `--veil`. Un grand mot Oswald (titre de la section suivante) dépasse en bas, en gris translucide.
Le plus simple : un masque en dégradé net à l'angle `--slant` (deux bandes opaques séparées par une fente transparente).
```css
.x-cut { position: relative; aspect-ratio: 16/9; overflow: hidden; }
.x-cut__img { position: absolute; inset: 0; background: var(--ink) center/cover;
  -webkit-mask-image: linear-gradient(57deg, transparent 0 18%, #000 18% 40%, transparent 40% 43%, #000 43% 66%, transparent 66%);
          mask-image: linear-gradient(57deg, transparent 0 18%, #000 18% 40%, transparent 40% 43%, #000 43% 66%, transparent 66%); }
.x-cut__img::after { content: ""; position: absolute; inset: 0; background: var(--veil); }
```
(Les `#000` du masque ne sont pas des couleurs affichées : seule leur opacité compte.)

## Carte de classement (parallélogramme)

- **Anatomie** : parallélogramme (`--skew`), visuel réel du personnage en fond (photo/illustration N&B + calque `--c` en multiply, voir `assets.md`), dégradé blanc vers le bas, **chiffre géant Oswald rouge** (01, 02…) en bas à gauche, étiquette noire « RANKING No. » au-dessus du chiffre, étiquette noire « HERO NAME » + nom blanc en haut à droite.
- Les cartes s'emboîtent sans gouttière, bordure claire 1.6px ; des triangles noirs pleins comblent les extrémités de la rangée.
- Survol : le visuel zoome à 1.05 (500ms `--ease-snap`), la couleur du personnage apparaît en liseré.

```css
.rank-card { position: relative; transform: skewX(var(--skew)); overflow: hidden; border: var(--border-bold) solid rgb(255 255 255 / .6); }
.rank-card > * { transform: skewX(calc(var(--skew) * -1)); }
.rank-card__num { font: 400 var(--text-number)/1 var(--font-display); color: var(--accent-text); }
.rank-card__label { background: var(--ink); color: var(--on-ink); font: 500 var(--text-xs)/1 var(--font-display); padding: 2px 4px; }
```

## Liste staff / casting

Deux colonnes. À gauche, le rôle (Noto Sans JP 700 italique 16px noir, aligné à droite). À droite, le nom (Noto Sans JP 700 italique 20–24px, `--accent`). Casting : bouton rond 32px (contour noir 0.8px, icône agrandir) pour ouvrir la fiche.

## Bouton rond

Cercle 32–44px, contour `--border-thin` noir, icône fine. Survol : fond noir, icône blanche.

## Rail latéral

À gauche, texte vertical « OFFICIAL » (Oswald 11px, `writing-mode: vertical-rl`) suivi des icônes sociales noires dans des carrés. À droite dans le héros : « VISUAL SELECTER » vertical + vignettes carrées 40px à bordure noire pour changer de visuel.

## États

- **Chargement** : voir `layouts.md` (logo qui se remplit + pourcentage).
- **Vide** : grand mot Oswald gris translucide + phrase en Noto Sans JP + tag-btn.
- **Erreur** : barre noire avec date rouge remplacée par « ERREUR », message clair, tag-btn « Réessayer ».


---

# Pages internes (relevé le 2026-10-02)

## Titre de page coupé au bord

- **Rôle** : en-tête de chaque page interne (« PERSONNAGES », « ACTUALITÉS »…).
- **Anatomie** (observé) : Oswald capitales rouge `--accent-text`, ~90px (`--text-page`), collé au bord gauche de l'écran et **légèrement coupé** (marge négative) ; derrière, de grands parallélogrammes en filet rouge fin et gris (`--line-accent`, `--line-grey`).
- Pas d'état interactif. Animation `widthup` à l'arrivée (voir `motion.md`).

```css
.page-title { position: relative; margin: 0 0 var(--space-10) -0.06em; font: 400 var(--text-page)/0.9 var(--font-display);
  color: var(--accent-text); text-transform: uppercase; white-space: nowrap; }
.page-deco { position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
.page-deco i { position: absolute; top: 4%; width: 28%; height: 70%; border: 1px solid var(--line-accent); transform: skewX(var(--skew)); }
.page-deco i:nth-child(2) { left: 60%; border-color: var(--line-grey); }
```

## Onglets rectangulaires (Characters)

- **Anatomie** (mesuré) : boutons rectangulaires Oswald 20px (`--text-tab`), bord 0.8px noir, fond transparent ; actif = fond noir, texte blanc ; transition 0.3s.
- **États** : repos (bord noir, texte noir) ; survol (fond `--surface`) ; actif (`aria-selected="true"`, fond `--ink`) ; focus (contour rouge 2px) ; désactivé (opacité 0.4, `cursor: not-allowed`).

```html
<div class="tabs" role="tablist" aria-label="Saison"><button role="tab" aria-selected="true">SAISON 1</button><button role="tab" aria-selected="false">SAISON 2</button></div>
```
```css
.tabs { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.tabs [role=tab] { min-height: 44px; padding: 0 var(--space-6); background: transparent; color: var(--text); border: var(--border-thin) solid var(--ink);
  font: 400 var(--text-tab)/1 var(--font-display); cursor: pointer; transition: all var(--dur-fast) var(--ease); }
.tabs [role=tab]:hover { background: var(--surface); }
.tabs [role=tab][aria-selected="true"] { background: var(--ink); color: var(--on-ink); }
.tabs [role=tab]:disabled { opacity: .4; cursor: not-allowed; }
```

## Grille de personnages (parallélogrammes)

- **Rôle** : page liste « Personnages » et pied de la fiche (navigation entre fiches).
- **Anatomie** (observé) : rangée de cartes en parallélogrammes inclinés, séparées par de **fins traits blancs**, avec des **triangles noirs pleins** aux deux extrémités de la rangée. Chaque carte : tag noir « NOM » + nom blanc gras en haut ; tag noir « RANG » + **numéro rouge géant** condensé en bas (01…10). Reprend le composant « Carte de classement » ci-dessus.
- **États** : repos (couleur personnage) ; survol (zoom 1.05) ; **sous une fiche** : les autres cartes passent en N&B (`--dim`), la carte active garde sa couleur et porte `aria-current="true"` ; focus (contour rouge sur le lien de carte).

```css
.chara-row { display: grid; grid-template-columns: var(--tri) repeat(5, 1fr) var(--tri); --tri: 6%; gap: 2px; background: var(--surface); }
.chara-row::before, .chara-row::after { content: ""; background: var(--ink); }
.chara-row::before { clip-path: polygon(0 0, 100% 0, 0 100%); }      /* triangle de bout de rangée */
.chara-row::after  { clip-path: polygon(100% 0, 100% 100%, 0 100%); }
.chara-row.is-filtered .rank-card:not([aria-current="true"]) .rank-card__art { filter: grayscale(1); }
.chara-row.is-filtered .rank-card:not([aria-current="true"])::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--dim); }
```
Chaque carte est un `<a>` (ou `<button>`) avec `aria-label="Fiche de Nova, rang 01"`.

## Fiche personnage (fond noir)

- **Rôle** : page `personnage?id=…` ; présente un héros.
- **Anatomie** (observé) :
  1. Fond `--ink`. Nom du personnage **blanc énorme** en haut à gauche (`--text-chara`, Oswald).
  2. En haut à droite : tag minuscule « RANG » + numéro **rouge géant** Oswald.
  3. Ligne « CV Nom de l'interprète » (« CV » rouge gras) + **2 boutons ronds** fins (rotation du visuel, extrait de voix).
  4. Accroche **blanche grasse sur 2 lignes, alignée à droite** ; description 16px blanche.
  5. Illustration pleine hauteur du personnage sur une **explosion d'éclats triangulaires** de sa couleur et de couleurs voisines (formes CSS `clip-path`, l'illustration reste une vraie image).
  6. Colonne droite : tag noir sur blanc « VIDÉOS » puis 2 vignettes vidéo 16:9 avec titre blanc large dessous.
  7. En bas : la grille de personnages complète, filtrée (N&B sauf l'actif).
- **États** : boutons ronds au repos (contour blanc fin), survol (fond blanc, icône noire), pressé (`aria-pressed`, fond rouge), focus (contour rouge).

```html
<section class="fiche" style="--c: var(--chara-6)">
  <h1 class="fiche__name">Nova</h1>
  <p class="fiche__rank"><span class="rank-card__label">RANG</span><span class="fiche__num">01</span></p>
  <p class="fiche__cv"><b>CV</b> Rin Hayase <button class="round round--light" aria-label="Écouter la voix">♪</button></p>
  <p class="fiche__quote">Le public me porte.<br>Je ne tomberai pas.</p>
  <div class="fiche__art" data-slot="chara-full"><div class="fiche__burst" aria-hidden="true"></div><img src="…" alt="…"></div>
  <aside class="fiche__movies">…</aside>
</section>
```
```css
.fiche { background: var(--ink); color: var(--on-ink); display: grid; grid-template-columns: 1.1fr 1fr 0.8fr; gap: var(--space-10); padding: var(--space-20) var(--space-10); }
.fiche__name { font: 500 var(--text-chara)/0.9 var(--font-display); text-transform: uppercase; margin: 0; }
.fiche__num { font: 400 var(--text-number)/0.9 var(--font-display); color: var(--accent-text); }
.fiche__cv b { color: var(--accent-text); }
.fiche__quote { text-align: right; font: 700 var(--text-xl)/1.5 var(--font-body); }
.fiche__burst { position: absolute; inset: -10%; background: conic-gradient(from var(--slant), var(--c), var(--chara-4), var(--chara-8), var(--chara-7), var(--c));
  clip-path: polygon(50% 0, 58% 34%, 92% 12%, 66% 44%, 100% 56%, 64% 60%, 80% 96%, 50% 68%, 22% 98%, 36% 60%, 0 54%, 34% 44%, 8% 12%, 42% 34%); }
.round--light { border-color: var(--on-ink); color: var(--on-ink); }
.round--light:hover { background: var(--on-ink); color: var(--ink); }
.round[aria-pressed="true"] { background: var(--accent-text); color: var(--on-accent); }
```

## Bande « Épisode de … » + ligne d'épisode

- **Bande** (mesuré) : H3 Oswald 24px / 500 noir sur fond **couleur du personnage** (`--c`), pleine largeur, padding 12px 24px.
- **Ligne d'épisode** (mesuré) : vignette vidéo 16:9 à gauche (≈ 40 %), à droite nom en rouge `--accent-text` Noto Sans JP 20/700, « CV : … » 20/400, texte 16px ; **filet noir** 0.8px de séparation entre lignes.
- **États** : vignette au survol → icône ▶ blanche sur voile `--veil` ; focus → contour rouge.

```css
.ep-band { margin: 0; padding: var(--space-2) var(--space-6); background: var(--c); color: var(--ink); font: 500 var(--text-h3)/1.4 var(--font-display); }
.ep-row { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: var(--space-6); padding: var(--space-6) 0; border-bottom: var(--border-thin) solid var(--ink); }
.ep-row h4 { margin: 0; color: var(--accent-text); font: 700 var(--text-lg) var(--font-body); }
```
(Le rouge `--accent-text` sur gris en 20px gras est un « grand texte » WCAG — 3,15:1 ≥ 3:1. En dessous de 18,66px gras, utiliser `--accent-deep` ou du noir.)

## Liste d'actualités — page News

Version pleine page de la liste noire de l'accueil (mesuré) :
- Chaque article = **barre noire de 96px** (`--news-row`) avec un **bord haut rouge de 4px** (`--bar`, `--accent-text`).
- **Date** en étiquette rouge (Oswald 14px / 700, texte noir sur `--accent-text`) collée en haut à gauche de la barre.
- Titre blanc 16px, chevron › blanc à droite.
- **États** : survol → titre +8px, chevron rouge ; focus → contour rouge 2px intérieur (`outline-offset: -4px`) ; lu (`:visited`) → titre gris clair facultatif.

```css
.news-page { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-4); }
.news-page a { position: relative; display: flex; align-items: center; justify-content: space-between; gap: var(--space-6); min-height: var(--news-row);
  padding: var(--space-6) var(--space-10); background: var(--ink); color: var(--on-ink); border-top: var(--bar) solid var(--accent-text); text-decoration: none; }
.news-page time { position: absolute; left: 0; top: 0; padding: 3px 8px; background: var(--accent-text); color: var(--on-accent); font: 700 var(--text-sm)/1 var(--font-display); }
.news-page a:focus-visible { outline-offset: -4px; }
```
**Pagination** (déduite, non vue sur la référence) : cases carrées 44px bord noir fin, page courante fond noir texte blanc, flèches ‹ › Oswald.

## Sélecteur d'épisodes (Story)

- **Anatomie** (mesuré) : grille de petites cases (#24 … #01), texte Noto Sans JP 16/500 dans des boîtes à bord noir fin ; **active = fond rouge, texte noir**.
- **États** : repos (bord noir) ; survol (fond blanc) ; actif (`aria-selected="true"`, fond `--accent-text`) ; focus (contour noir 2px) ; épisode non diffusé = `disabled`, opacité 0.35.
- **Bloc épisode** : image 16:9 à gauche, titre rouge Noto Sans JP 32/700 (`--text-xl`), texte 16px.

```css
.story-picker { display: grid; grid-template-columns: repeat(auto-fill, minmax(56px, 1fr)); gap: var(--space-1); }
.story-picker button { min-height: 44px; border: var(--border-thin) solid var(--ink); background: transparent; color: var(--text); font: 500 var(--text-base) var(--font-body); cursor: pointer; }
.story-picker button[aria-selected="true"] { background: var(--accent-text); color: var(--on-accent); border-color: var(--accent-text); }
.story-picker button:focus-visible { outline-color: var(--ink); }
.story-picker button:disabled { opacity: .35; cursor: not-allowed; }
```

## Barre de filtres à encoche (Movie, Music)

- **Anatomie** (observé) : barre pleine largeur fond noir, Oswald 20px blanc capitales ; Movie : 2 rangées × 4 catégories ; Music : 3 colonnes. **Actif = fond rouge + petit triangle (encoche) sous l'onglet**, qui pointe vers le contenu.
- Texte de l'actif : **noir** (le blanc sur `--accent-text` en 20px ne fait que 3,5:1 — écart assumé, voir `source.md`).
- **États** : repos (texte blanc) ; survol (texte rouge) ; actif (fond rouge, encoche) ; focus (contour blanc 2px intérieur).

```css
.filters { display: grid; grid-template-columns: repeat(4, 1fr); background: var(--panel); }
.filters [role=tab] { position: relative; min-height: 56px; border: 0; background: transparent; color: var(--on-ink); font: 400 var(--text-tab)/1 var(--font-display); text-transform: uppercase; cursor: pointer; transition: all var(--dur-fast) var(--ease); }
.filters [role=tab]:hover { color: var(--accent-text); }
.filters [role=tab][aria-selected="true"] { background: var(--accent-text); color: var(--on-accent); }
.filters [role=tab][aria-selected="true"]::after { content: ""; position: absolute; left: 50%; top: 100%; z-index: 1; border: var(--notch) solid transparent; border-top-color: var(--accent-text); transform: translateX(-50%); }
.filters [role=tab]:focus-visible { outline: 2px solid var(--on-ink); outline-offset: -4px; }
```

## Carte vidéo (Movie)

Vignette 16:9 réelle ; **bandeau titre en haut** de la vignette (fond noir, Oswald 14px blanc, padding 6px 12px) ; bouton ▶ rond blanc au centre. Survol : image zoom 1.05, ▶ rouge. Grille 3 colonnes desktop, 1 colonne mobile.

## Accordéon (Music)

- **Anatomie** (observé) : barre noire pleine largeur ~110px (`--accordion-row`), **titre Oswald blanc centré**, **bouton rond blanc « + »** à droite. Ouvert : le bouton devient **rouge « − »**, panneau noir avec pochette carrée à gauche et titre entre 「 」 en Oswald blanc géant (`--text-quote`).
- **États** : repos ; survol (titre rouge) ; ouvert (`aria-expanded="true"`) ; focus (contour rouge) .

```html
<div class="acc">
  <h3><button class="acc__head" aria-expanded="false" aria-controls="t1">OPENING<span class="acc__ico" aria-hidden="true"></span></button></h3>
  <div class="acc__panel" id="t1" hidden><img src="…" alt="Pochette"><p class="acc__title">「VELOCITY」</p></div>
</div>
```
```css
.acc__head { position: relative; width: 100%; min-height: var(--accordion-row); border: 0; background: var(--panel); color: var(--on-ink); font: 500 var(--text-xl)/1 var(--font-display); cursor: pointer; }
.acc__ico { position: absolute; right: var(--space-10); top: 50%; width: var(--round); height: var(--round); border-radius: 50%; background: var(--on-ink); transform: translateY(-50%); transition: background var(--dur-fast) var(--ease); }
.acc__ico::before, .acc__ico::after { content: ""; position: absolute; inset: 50% 30%; height: 2px; margin-top: -1px; background: var(--ink); }
.acc__ico::after { transform: rotate(90deg); transition: transform var(--dur-fast) var(--ease); }
.acc__head[aria-expanded="true"] .acc__ico { background: var(--accent-text); }
.acc__head[aria-expanded="true"] .acc__ico::after { transform: rotate(0); }   /* « + » devient « − » */
.acc__panel { display: grid; grid-template-columns: 240px 1fr; gap: var(--space-10); align-items: center; padding: var(--space-10); background: var(--ink); color: var(--on-ink); }
.acc__title { font: 500 var(--text-quote)/1 var(--font-display); }
```

## Carte bannière « mot-clé » (Special)

Rectangle rouge + parallélogramme noir + X en filet, texte blanc condensé encadré de deux filets fins, légende 12px dessous. Lien entier cliquable ; survol : le parallélogramme noir glisse de 8px. Texte blanc uniquement sur la partie noire (contraste).
