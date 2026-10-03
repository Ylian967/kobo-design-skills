# Arena Guide — composants

## Barre de navigation (80px, `--nav`)

Logo éditeur + logo jeu (emplacements) à gauche. Liens Inter 700 14px capitales blancs espacés de 36px, certains avec ▾. À droite : bouton recherche carré sombre arrondi 8px, icône langue (globe), bouton **JOUER** (dégradé cyan, Inter 600 13px capitales +0.08em, rayon 12px, 80×32).

Relevé sur les pages internes (2026-10-02) : barre `#111` ~80px, liens capitales 14px graisse 600 ; JOUER y est une **pilule** (`--radius-pill`) bleu cyan `--play` à texte navy `--ink`. Les deux formes de JOUER existent sur le site : pilule dans la barre globale, rectangle à rayon 12px dans le contenu.

```css
.gnav { height: var(--nav-h); display: flex; align-items: center; gap: var(--space-8); padding: 0 var(--space-8); background: var(--nav); }
.gnav__item > a, .gnav__item > button { display: flex; align-items: center; height: var(--nav-h); padding: 0 var(--space-4); background: none; border: 0; color: var(--text);
  font: 600 var(--text-sm) var(--font-ui); text-transform: uppercase; letter-spacing: .04em; cursor: pointer; transition: background var(--dur-base) var(--ease); }
.gnav__item:hover > *, .gnav__item > [aria-expanded="true"] { background: var(--panel); }   /* onglet survolé sur fond gris foncé */
.btn-pill { min-height: 44px; padding: 0 var(--space-6); border-radius: var(--radius-pill); background: var(--play); color: var(--ink); font: 700 var(--text-xs) var(--font-ui); letter-spacing: var(--tracking-ui); text-transform: uppercase; }
```

## Menu déroulant (survol ou clic sur un lien ▾)

- **Anatomie** (observé) : l'onglet ouvert prend un fond gris foncé ; dessous, un panneau `--nav-panel` (#1e2328, mesuré) avec un **bord haut cyan de 2px**, liste en petites capitales blanches 12px espacées (`--text-menu`, +0.1em), ~36px par ligne (`--menu-row`).
- **États** : lien au repos blanc ; survol → or `--gold` ; focus → contour or 2px intérieur ; lien courant → or + `aria-current`. Ouverture au survol (desktop) **et** au clic / `Entrée` (clavier, tactile) ; `Échap` ferme.

```html
<li class="gnav__item">
  <button aria-expanded="false" aria-controls="dd-news">Actualités ▾</button>
  <ul class="dropdown" id="dd-news" hidden><li><a href="#">Tout</a></li><li><a href="#">Mises à jour du jeu</a></li><li><a href="#">E-sport</a></li></ul>
</li>
```
```css
.gnav__item { position: relative; }
.dropdown { position: absolute; top: 100%; left: 0; z-index: 30; min-width: 240px; margin: 0; padding: var(--space-2) 0; list-style: none; background: var(--nav-panel); border-top: 2px solid var(--accent); }
.dropdown a { display: flex; align-items: center; min-height: var(--menu-row); padding: 0 var(--space-6); color: var(--text); font: 600 var(--text-menu) var(--font-ui); letter-spacing: .1em; text-transform: uppercase; text-decoration: none; transition: color var(--dur-fast) var(--ease); }
.dropdown a:hover, .dropdown a[aria-current] { color: var(--gold); }
.dropdown a:focus-visible { outline-offset: -2px; }
```
Mobile : les liens passent dans un panneau plein écran ouvert par le **bouton hamburger carré gris arrondi** (`--panel`, `--radius-md`, 44px) ; chaque ▾ devient un accordéon.

## Bouton principal

```css
.btn-play { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 8px 16px; border: 0; border-radius: var(--radius-lg);
  background: var(--grad-cta); color: var(--on-accent); font: 600 var(--text-xs)/1 var(--font-ui); letter-spacing: var(--tracking-ui); text-transform: uppercase;
  transition: color var(--dur-color) var(--ease-snap), filter var(--dur-base) var(--ease); }
.btn-play:hover { filter: brightness(1.12); }
```
Version large (formulaire d'inscription) : 437×48, Inter 600 16px.

## Bouton secondaire (or)

Aplat `--gold`, texte `--on-gold` Inter 700 14px capitales, coins droits, padding 18px 32px. Utilisé pour « Regarder » dans le héros. Variante contour : bordure 0.8px `--gold`, texte blanc.

## Titre de section

```css
.title { margin: 0 0 var(--space-6); font: italic 800 var(--text-title)/var(--leading-title) var(--font-display); text-transform: uppercase; text-wrap: balance; }
.kicker { font: 400 var(--text-base) var(--font-body); }            /* ligne au-dessus (« Cinématique ») */
.subtitle { font: italic 800 var(--text-xl) var(--font-display); text-transform: uppercase; } /* « VOTRE NEXUS » */
```

## Médaillon-onglet (signature)

```html
<div role="tablist" class="medals">
  <button role="tab" aria-selected="true" class="medal medal--ally"><span class="medal__img"><img src="…" alt="" width="92" height="92"></span><span class="medal__label">Votre base</span></button>
  <button role="tab" aria-selected="false" class="medal medal--enemy"><span class="medal__img"><img src="…" alt="" width="92" height="92"></span><span class="medal__label">Base ennemie</span></button>
</div>
```
```css
.medal { display: grid; justify-items: center; gap: var(--space-4); background: none; border: 0; cursor: pointer; color: var(--muted); font: 700 var(--text-sm) var(--font-ui); text-transform: uppercase; }
.medal__img { position: relative; width: 92px; height: 92px; border-radius: 50%; border: var(--ring) solid var(--accent); padding: 4px; background-clip: content-box; }
.medal--enemy .medal__img { border-color: var(--enemy); }
.medal__img::before { content: ""; position: absolute; left: 50%; top: -10px; width: 10px; height: 10px; background: currentColor; transform: translateX(-50%) rotate(45deg); color: inherit; }
.medal[aria-selected="true"] { color: var(--text); }
.medal[aria-selected="false"] .medal__img { opacity: .7; }
```
Dans le cercle : une image réelle (lieu, héros, objectif) en `object-fit: cover`, jamais un dégradé qui imite une image (voir `assets.md`).

Le **grand médaillon** (180px, anneau 8px) affiché à côté de l'explication reprend la même forme, avec un anneau extérieur ouvert en haut (deux arcs).

## Carte en fond

Image réelle de carte ou de terrain (vue de dessus, voir `assets.md`) à droite de la section, masquée par un dégradé radial vers `--bg` : `mask-image: radial-gradient(60% 60% at 60% 50%, #000 40%, transparent 75%)`.

## Bloc vidéo + vignettes

Vidéo 16:9 dans le container (1208px), contrôles natifs, muette, en boucle. Sous la vidéo : 4 vignettes 126×72, la sélectionnée a un **contour or 1px**, puis un filet horizontal `--line`, le titre de l'étape en Inter 700 16px capitales centré, et le paragraphe explicatif centré.

## Héros cinématique

Vidéo ou image plein cadre, voile sombre à gauche. Texte à gauche : « Cinématique » (Source Sans 18px), titre serif italique 57px, phrase en italique 18px, bouton or « Regarder ».

## Section d'introduction (blanche)

Fond `--paper`, titre en `--ink` italique, paragraphe centré `--ink`, puis une grande image panoramique réelle (paysage, château, voir `assets.md`) qui fait la transition vers la section sombre suivante.

## États

- **Chargement** : squelettes `--panel` (cadre vidéo gris bleuté uni, mesuré).
- **Vide / erreur** : médaillon gris + titre italique « Rien à afficher » + bouton or.


---

# Pages internes (relevé le 2026-10-02)

## En-tête de liste « Choisissez votre … »

- **Anatomie** (mesuré / observé) : centré ; ligne 1 « CHOISISSEZ VOTRE » en petites capitales navy ; ligne 2 « CHAMPION » en serif 900 italique 57px navy `--ink` ; texte d'intro 2 lignes centré. Fond clair.
```css
.list-head { text-align: center; padding: var(--space-16) var(--space-4) var(--space-8); color: var(--ink); }
.list-head small { display: block; font: 700 var(--text-xl)/1 var(--font-display); font-style: italic; text-transform: uppercase; }
.list-head h1 { margin: 0 0 var(--space-4); font: italic 800 var(--text-title)/var(--leading-title) var(--font-display); text-transform: uppercase; }
```

## Barre de recherche + filtres de rôle (proposition)

Non relevés dans les notes d'exploration : proposés dans le même langage pour rendre la liste utilisable. Champ de recherche sur fond `--paper`, bord 0.8px `--ink`, icône loupe, hauteur 48px, coins droits ; filtres = boutons texte Inter 700 13px capitales `--ink-muted`, actif `--ink` souligné d'un filet or 2px. Focus : contour `--ink` 2px (l'or ne contraste pas assez sur blanc pour un contour).

## Carte champion (liste)

- **Anatomie** (mesuré) : carte portrait 332×502 (≈ 2:3, `--card-ratio`), **sans arrondi** ; image plein cadre ; **bandeau nom en bas** fond navy `--ink`, nom blanc italique gras capitales ~16px (`--text-card`).
- **États** : repos ; **survol → l'image zoome légèrement (1.05) et le bandeau passe au gris ardoise `--card-hover`** (#3c4452 mesuré) ; focus → contour `--ink` 3px décalé ; filtrée → `hidden`.
```html
<li><a class="champ" href="champion.html"><span class="champ__img" data-slot="champion-card"><img src="…" alt="" loading="lazy"></span><span class="champ__name">Ysolde</span></a></li>
```
```css
.champs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--space-4); list-style: none; margin: 0; padding: 0; }
.champ { position: relative; display: block; aspect-ratio: var(--card-ratio); overflow: hidden; background: var(--bg); text-decoration: none; }
.champ__img img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-base) var(--ease); }
.champ__name { position: absolute; left: 0; right: 0; bottom: 0; padding: var(--space-4); background: var(--ink); color: var(--text);
  font: italic 800 var(--text-card) var(--font-display); text-transform: uppercase; transition: background var(--dur-base) var(--ease); }
.champ:hover img { transform: scale(1.05); }
.champ:hover .champ__name { background: var(--card-hover); }
.champ:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }
```

## Héros de fiche champion

- **Anatomie** (mesuré / observé) : splash art plein écran ; **dégradé navy à gauche** (`--veil-left`) ; sous-titre **doré italique capitales** (~30px, `--text-kicker`, `--gold`) ; nom H1 serif 700 italique **75px** blanc (`--text-hero`) ; bio 16px blanche ; **2 cartes info carrées** à bord fin or : icône dorée + « RÔLE / MAGE · ASSASSIN », « DIFFICULTÉ / MODÉRÉE » en petites capitales.
- La difficulté peut se montrer en 3 segments (or = rempli, `--panel` = vide).
```css
.champ-hero { position: relative; min-height: min(92vh, 820px); display: flex; align-items: flex-end; padding: var(--space-16) var(--space-12); overflow: hidden; background: var(--bg); }
.champ-hero::after { content: ""; position: absolute; inset: 0; background: var(--veil-left), var(--veil-bottom); }
.champ-hero__kicker { margin: 0; color: var(--gold); font: italic 800 var(--text-kicker)/1.1 var(--font-display); text-transform: uppercase; }
.champ-hero h1 { margin: 0 0 var(--space-4); font: italic 800 var(--text-hero)/1 var(--font-display); text-transform: uppercase; }
.info-card { display: grid; gap: var(--space-2); align-content: center; justify-items: center; aspect-ratio: 1; padding: var(--space-4); border: 0.8px solid var(--gold); color: var(--text); font: 700 var(--text-xs) var(--font-ui); letter-spacing: var(--tracking-ui); text-transform: uppercase; }
.info-card b { color: var(--gold); }
```

## Onglets de compétences (icônes carrées)

- **Anatomie** (observé) : section fond `--bg` ; H2 « COMPÉTENCES » serif 900 italique 57px blanc ; rangée de **5 icônes carrées ~96px** qui sont des onglets, nom en capitales dessous (**actif blanc, inactifs gris**) ; à droite, la **vidéo de démonstration dans un cadre à double filet doré** (bord extérieur + second filet à 24px).
- **États** : repos (icône à 60 % d'opacité, nom `--muted`) ; survol (icône 100 %) ; actif (`aria-selected`, icône 100 % + bord or 2px, nom blanc) ; focus (contour or 2px décalé).
```css
.skills__tabs { display: flex; gap: var(--space-4); }
.skill { display: grid; justify-items: center; gap: var(--space-2); background: none; border: 0; padding: 0; color: var(--muted); cursor: pointer; font: 700 var(--text-xs) var(--font-ui); letter-spacing: var(--tracking-ui); text-transform: uppercase; transition: color var(--dur-color) var(--ease-snap); }
.skill__icon { width: var(--skill-icon); height: var(--skill-icon); border: 2px solid transparent; overflow: hidden; background: var(--bg-2); }
.skill__icon img { width: 100%; height: 100%; object-fit: cover; opacity: .6; transition: opacity var(--dur-base) var(--ease); }
.skill[aria-selected="true"] { color: var(--text); }
.skill[aria-selected="true"] .skill__icon { border-color: var(--gold); }
.skill[aria-selected="true"] img, .skill:hover img { opacity: 1; }
.gold-frame { position: relative; padding: var(--frame-gap); border: 0.8px solid var(--gold); }
.gold-frame::before { content: ""; position: absolute; inset: calc(var(--frame-gap) / 2); border: 0.8px solid var(--gold); pointer-events: none; }
```

## Carrousel de skins

- **Anatomie** (observé) : grande image plein contenu ; dessous une **bande de 5 vignettes 16:9** ; **active = cadre doré fin décollé** (padding 4px) + nom en or, autres noms gris capitales ; dessous une **ligne de progression grise** + **flèches ← → dorées**.
- **États** : vignette au repos (nom `--muted`) ; survol (image 100 %) ; active (`aria-selected`, cadre or) ; flèche désactivée au bout (opacité .35) ; focus (contour or).
```css
.skins__thumbs { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--space-4); }
.skin-thumb { display: grid; gap: var(--space-2); background: none; border: 0; padding: 0; color: var(--muted); cursor: pointer; font: 700 var(--text-xs) var(--font-ui); text-transform: uppercase; letter-spacing: var(--tracking-ui); }
.skin-thumb__img { aspect-ratio: 16/9; padding: 4px; border: 0.8px solid transparent; }
.skin-thumb[aria-selected="true"] { color: var(--gold); }
.skin-thumb[aria-selected="true"] .skin-thumb__img { border-color: var(--gold); }
.skins__track { position: relative; height: 2px; background: var(--panel); }
.skins__track span { position: absolute; inset: 0 auto 0 0; width: var(--p); background: var(--muted); transition: width var(--dur-base) var(--ease-snap); }
.arrow { width: 44px; height: 44px; border: 0; background: none; color: var(--gold); font-size: 1.5rem; cursor: pointer; }
.arrow:disabled { opacity: .35; cursor: default; }
```

## Bandeau de page (Actus)

Bandeau navy `--ink` ~290px (`--page-band`), titre « ACTUS » serif 900 italique blanc **aligné à gauche** dans le container, collé en bas du bandeau.

## Carte d'actualité

- **Anatomie** (observé) : image 16:9 **sans arrondi** + **pastille carrée gris foncé 44px** (`--panel`) en bas à droite de l'image (icône lien externe ↗, ou ▶ centré pour une vidéo) ; ligne méta : **catégorie en or capitales 13px** | date grise ; titre gras navy ~22px / 1.4 ; extrait gris 15px.
- Sur fond clair, la catégorie utilise `--gold-deep` (l'or mesuré n'atteint que 2,2:1 sur blanc) et la date `--ink-muted`.
- **États** : survol → image zoom 1.05 + titre souligné ; focus → contour `--ink` 3px ; vidéo → pastille ▶ centrée sur l'image.
```css
.news-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-12) var(--space-8); list-style: none; margin: 0; padding: 0; }
.ncard { display: grid; gap: var(--space-2); color: var(--ink); text-decoration: none; }
.ncard__img { position: relative; aspect-ratio: 16/9; overflow: hidden; background: var(--panel); }
.ncard__img img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-base) var(--ease); }
.ncard__badge { position: absolute; right: 0; bottom: 0; width: var(--news-badge); height: var(--news-badge); display: grid; place-items: center; background: var(--panel); color: var(--text); }
.ncard--video .ncard__badge { inset: 50% auto auto 50%; transform: translate(-50%, -50%); }
.ncard__meta { font: 700 var(--text-meta) var(--font-ui); letter-spacing: var(--tracking-ui); text-transform: uppercase; color: var(--ink-muted); }
.ncard__meta b { color: var(--gold-deep); }
.ncard h3 { margin: 0; font: 700 var(--text-news)/1.4 var(--font-body); }
.ncard p { margin: 0; color: var(--ink-muted); font-size: var(--text-excerpt); }
.ncard:hover img { transform: scale(1.05); }
.ncard:hover h3 { text-decoration: underline; }
```
