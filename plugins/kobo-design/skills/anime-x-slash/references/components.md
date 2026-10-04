# Anime X Slash — composants

Toutes les valeurs viennent de `tokens.css`. « Mesuré » = lu dans le navigateur ou dans le code du site ; « observé » = relevé sur capture ; « proposé » = ajouté par le skill. Code complet de l'accueil dans `examples/demo.html` ; les pages internes n'ont pas de page d'exemple.

# Accueil (mesuré le 2026-10-03)

## 1. Bouton MENU

Carré **noir de 80 × 80px** fixe en haut à gauche (`--menu-size`), deux traits blancs de 38px espacés de 14px, « MENU » en Oswald 16px blanc dessous. Ouvert : fond rouge, traits croisés à ±20°, libellé « CLOSE ». Mobile : 60px, en haut à droite.

```css
.menu-btn { position: fixed; left: 0; top: 0; width: var(--menu-size); height: var(--menu-size); background: var(--ink); color: var(--on-ink); }
.menu-btn[aria-expanded="true"] { background: var(--menu-close); }        /* rouge assombri : porte du blanc en 16px */
.menu-btn[aria-expanded="true"] i::before { transform: rotate(20deg); }  .menu-btn[aria-expanded="true"] i::after { transform: rotate(-20deg); }
```

## 2. Menu plein écran

Panneau noir sur une **image de groupe en niveaux de gris** assombrie (`--menu-veil`). Liens sur **2 colonnes**, Oswald capitales ≈ 44px (`--text-menu`), blancs ; lien courant et survol sur **aplat rouge** (`--accent-text`, texte noir). Logotype blanc à droite des liens. Langue en haut à droite, réseaux en bas à gauche. Mobile : une colonne centrée.

## 3. Sélecteur de langue

Libellé Oswald 11px au-dessus de deux cases **40 × 24px** blanches, Oswald 14px ; case active rouge.

## 4. Logotype et glitch

Le logotype est un **signe typographique** (Oswald 700 italique, biais −12°, barre oblique rouge) : il reste en texte. Il existe en trois tailles : chargement, héros (≈ 44 % de la largeur sur le site), pied. Il porte la classe `.glitch` et son texte en `data-text` (voir `motion.md`).

## 5. Héros : visuel en éclats (signature)

- Fond `--bg-hero`. Derrière tout, le **logotype géant en `--pop`** (magenta), plein en haut, **tramé de points** en bas.
- Des **éclats triangulaires** aux couleurs des personnages partent du centre.
- Le visuel : sur le site, une illustration de groupe. Dans le skill, **5 éclats photo** en parallélogrammes (`skewX(var(--skew))`), hauteurs 330 / 430 / 540 / 430 / 330px, 10px d'écart, filet blanc intérieur.
- Par-dessus, en bas : le logotype noir, puis la **bande d'annonce** noire biaisée (700 × 41px), texte Oswald blanc avec la date en rouge.
- Rails : à gauche « OFFICIAL » vertical + 3 carrés noirs de réseaux ; à droite « VISUAL SELECTOR » vertical + vignettes carrées (active = contour rouge, les autres en gris).

```css
.shard { position: absolute; width: var(--w); height: var(--h); transform: skewX(var(--skew)); overflow: hidden; background: var(--surface); }
.shard > div { position: absolute; top: 0; left: -72.5%; width: 247.5%; height: 100%; transform: skewX(var(--slant)); }   /* contre-biais : la photo reste droite */
.shard img { width: 100%; height: 100%; object-fit: cover; object-position: var(--pos, 50% 30%); }
```
Les valeurs `-72.5%` / `247.5%` sont celles du site pour ses cartes : elles couvrent exactement un parallélogramme de 160 × 320px à 36,4°.

## 6. Titre de section

Oswald 500 capitales `--accent-text`, **capitales de 80px** (`--text-title`), **collé au bord gauche de l'écran** (aucune marge). Sur le site ce sont des images ; ici du texte.

## 7. Bouton contour (« ARCHIVE »)

**200 × 40px**, bord 2px noir, Oswald 14px capitales, placé à droite du titre (à 80px du bord, 40px sous le haut de la section). Survol : fond noir, texte blanc.

## 8. Bande-annonce découpée en X (signature)

Bloc 16:9 pleine largeur. La vidéo (ici une photo de rue de nuit, voile noir à 80 % sur le site) n'est visible **qu'à travers un grand X** ; deux traits noirs parallèles au biais coupent le coin droit ; logotype gris translucide au centre. Titre rouge en haut à gauche, bouton contour en haut à droite, partage vertical à gauche. Deux **panneaux biaisés** ferment le bloc et s'ouvrent à l'arrivée. Tout le bloc est un lien ; le curseur rond s'y affiche.

```css
.trailer__x { background: var(--ink); clip-path: polygon(8% 0, 30% 0, 50% 36%, 70% 0, 92% 0, 63% 50%, 92% 100%, 70% 100%, 50% 64%, 30% 100%, 8% 100%, 37% 50%); }
```
Le X du site est une forme propre à son logo ; celui-ci est un X générique à redessiner pour chaque projet.

## 9. Liste d'actualités

Liste de **1052px** centrée. Chaque ligne : barre noire de **96px**, **bord haut rouge de 4px**, marge intérieure 30px 80px 30px 40px, titre blanc 16px (interligne 2). **Date** : étiquette rouge de 16px de haut collée sur le bord haut, texte noir Oswald 14px, retrait de 40px. Chevron blanc à 40px du bord droit. Survol : voir `motion.md`.

## 10. Texte d'introduction

Colonne de **880px** centrée. Noto Sans JP **700, 20px / 40px**, espacement 0.8px. Accroche finale en **32px / 1.875 rouge**. Puis un **bloc noir pleine largeur** (marges 80px) avec le même texte en blanc et son accroche rouge.

## 11. Staff et casting

Deux colonnes. Sous-titres Oswald noir ≈ 46px. **Staff** : rôle à droite d'une colonne de 160px (italique gras, petit), nom en **italique gras 20px rouge `--accent`** ; 42px entre les lignes. **Casting** : nom du héros (capitales italiques), interprète en rouge sur 2 lignes, **bouton rond** (cercle fin, 9 points) qui ouvre le message de l'interprète.

## 12. Carte de personnage et grille (signature)

Grille de **840px**, 5 cartes par rangée. Carte : **160 × 320px**, `skewX(-36.4deg)`, fond blanc (le filet entre cartes est la marge de 8px), cadre intérieur blanc à 40 % ; photo contre-biaisée ; dégradés noirs à 50 % en haut et en bas. En haut à droite : étiquette noire 11px « HERO NAME » + nom blanc gras 16px. En bas à gauche : étiquette « RANKING No. » + **numéro Oswald 91px rouge**. La première et la dernière carte de chaque rangée ont derrière elles un **bloc noir biaisé dans l'autre sens** : il dessine les triangles noirs des bouts. La 2e rangée est décalée de 70px vers la gauche et descendue de 6px.

```css
.cards li { position: relative; width: 20%; }
.cards li:nth-child(5n)::before, .cards li:nth-child(5n+1)::before { content: ""; position: absolute; left: 0; top: 0; width: 100%; height: var(--card-h); background: var(--ink); transform: skewX(var(--slant)); }
.card { position: relative; z-index: 1; display: block; height: var(--card-h); margin-left: var(--card-gap); background: var(--surface); transform: skewX(var(--skew)); }
.card__name, .card__num { position: absolute; transform: skewX(var(--slant)); }      /* le texte reste droit */
```

## 13. Curseur rond

Disque de **110px** : texte circulaire Oswald qui tourne + triangle blanc (28 × 32px) décalé de 5px à droite. Visible seulement au survol de la bande-annonce. Sur le site il est en `mix-blend-mode: difference` ; ici disque noir opaque (voir `motion.md`, « Performance »). Masqué sur mobile.

## 14. Filets de fond

Derrière toutes les sections, deux dessins fixes de **lignes fines** au même angle (rouge `--line-accent`, gris `--line-grey`), l'un calé à gauche, l'autre à droite. Ce sont des signes : ils restent en SVG.

## 15. Pied de page

Fond noir, centré : logotype(s), étiquette rouge biaisée « OFFICIAL SNS » (texte noir), liens blancs 14px, mentions grises 11px. Bouton « haut de page » 80 × 40px noir posé sur le bord supérieur droit.

## États

- **Chargement** : écran noir, compteur, logo qui se remplit (voir `motion.md`).
- **Image absente** : chaque éclat et chaque carte garde son fond (`--surface`, couleur du personnage `--c`) ; numéros et noms restent lisibles grâce aux dégradés.
- **Focus clavier** : contour 2px `--accent-text` décalé de 3px ; dans la grille, le focus déclenche le même effet que le survol.
- **Lien courant** : aplat rouge dans le menu ; `aria-current`.
- **Cibles tactiles** : 44px au moins (rails, boutons ronds, liens du menu).

# Pages internes (relevé le 2026-10-02, transitions vérifiées le 2026-10-03)

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
- **États** : repos (couleur personnage) ; survol (image 1.1, les autres cartes en niveaux de gris) ; **sous une fiche** : les autres cartes passent en N&B (`--dim`), la carte active garde sa couleur et porte `aria-current="true"` ; focus (contour rouge sur le lien de carte).

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

