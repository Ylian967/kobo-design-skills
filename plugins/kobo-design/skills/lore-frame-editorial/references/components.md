# Lore Frame Editorial — composants

Tous les exemples supposent le `:root` de `tokens.css`. Les animations citées sont détaillées dans `motion.md`. Valeurs mesurées sur la référence sauf mention ≈ (observé).

## 1. Le cadre (signature)

Toute la page vit **dans un cadre fixe** : marge de 20px autour de l'écran, coins de 10px, filet de 1px. À l'intérieur, un **rail à gauche** (67px) et une **barre en haut** (51px), séparés du contenu par des filets.

```
┌────────┬──────────────────────────────────────────────┬──────────┐
│  ═     │░░░░░░ progression ░░  ■ PROJET  LE BASTION … │ CONNEXION│ ← barre 51px
├────────┼──────────────────────────────────────────────┴──────────┤
│        │                                                         │
│   ✦    │                    contenu                              │
│ (étoile)│                                                        │
│  ıIıI  │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
  rail 67px              marge 20px partout, rayon 10px
```

- **Rail** : en haut l'icône menu (deux traits de 26px), au milieu l'**étoile-réticule** (une croix fine à 4 branches avec un petit losange au centre, en SVG, ≈ 40px), en bas l'**icône de son** (4 petites barres verticales).
- **Barre** : à gauche la **barre de progression** (bloc `--panel` dont la largeur suit le défilement, sur toute la largeur de la barre), au centre la **nav de section** en mono 11px capitales (carré « ■ » devant la section active, les autres en `--muted`), à droite le bouton **Connexion**.
- **Couleur** : filets `--line-dark` et textes noirs sur blanc ; filets `--line-light` et textes blancs sur illustration (`body.on-art`).
- Le cadre est **au-dessus** du contenu (`z-index` 100) mais `pointer-events: none` sauf sur ses boutons.

```css
.frame { position: fixed; inset: var(--frame-pad); z-index: 100; pointer-events: none;
  border: var(--line) solid var(--line-dark); border-radius: var(--frame-radius); }
.frame__rail { position: absolute; inset: 0 auto 0 0; width: var(--rail-w); border-right: var(--line) solid var(--line-dark);
  display: grid; grid-template-rows: var(--bar-h) 1fr auto; justify-items: center; align-items: center; }
.frame__bar { position: absolute; inset: 0 0 auto var(--rail-w); height: var(--bar-h); border-bottom: var(--line) solid var(--line-dark); }
.frame__progress { position: absolute; inset: 0 auto 0 0; width: calc(var(--p, 0) * 100%); background: var(--panel); }
.frame button, .frame a { pointer-events: auto; }
body.on-art .frame, body.on-art .frame * { border-color: var(--line-light); color: var(--paper); }
body.on-art .frame__progress { background: rgb(255 255 255 / .12); }
```

## 2. Bouton « Connexion » (coin coupé)

Rectangle **blanc** 120×49 posé dans l'angle haut droit du cadre, coin haut droit arrondi comme le cadre (10px), **coin bas gauche coupé à 16px**, texte IBM Plex Mono **14px / 600** noir, padding 16px.

```css
.btn-sign { background: var(--paper); color: var(--ink); font: 600 14px/1.5 var(--font-mono); padding: 14px 28px;
  border-radius: 0 var(--frame-radius) 0 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, var(--chamfer) 100%, 0 calc(100% - var(--chamfer))); }
```
Variante contour (pied de page, « Télécharger le livre de marque ») : fond transparent, filet blanc 1px, coin bas droit coupé à `--chamfer-lg`, icône ↓ à gauche (le filet suit la coupe : dessiner le contour en SVG ou avec un pseudo-élément dont la `clip-path` est identique et réduite de 1px).

## 3. Micro-label mono

`■ 001`, `■ ANIMUS — PERSONNAGE`, `// INITIALISATION`, `▸▸ CHARGEMENT – 47%`, `N 35°27.37 / E 139°38.57`, `33.8°`.
IBM Plex Mono **400**, `--fs-label`, capitales, `--ls-mono`, précédé d'un **carré plein de 5px** (`■`). Toujours **décodé** à l'entrée (`motion.md` §3).

```css
.label { font: 400 var(--fs-label)/1.2 var(--font-mono); letter-spacing: var(--ls-mono); text-transform: uppercase; }
.label::before { content: ""; display: inline-block; width: 5px; height: 5px; margin-right: .8em; background: currentColor; vertical-align: .15em; }
```

## 4. Phrase-chapitre (titre éditorial)

La grande voix du site : **Inter Tight 650**, `--fs-statement`, interligne 0.9, approche −0.07em, **capitales**, 2 à 4 lignes, jamais plus. L'index « ■ 001 » est posé en haut à gauche et la **première ligne est indentée** (`--indent-first`) pour lui laisser la place. **Révélée mot à mot** (gris → noir, ou gris translucide → blanc sur illustration).

```html
<div class="statement-block">
  <span class="label">001</span>
  <h2 class="statement" data-reveal>Un monde familier… sur une autre voie.</h2>
</div>
```
```css
.statement { font: var(--weight-display) var(--fs-statement)/var(--lh-statement) var(--font-display);
  letter-spacing: var(--ls-display); text-transform: uppercase; text-indent: var(--indent-first); margin: 0; max-width: 16ch; }
```

## 5. Manifeste géant (ouverture)

Trois mots-phrases **blancs** sur l'illustration, `--fs-manifest`, interligne 0.84, approche −0.094em, en **escalier** (chaque ligne décalée vers la droite), chacun précédé d'un index mono `01V`, `02D`, `03R` aligné en haut du mot. Paragraphe d'intro en haut à gauche (`--fs-body`, 4 lignes, blanc). « DÉFILER ↓ » en mono en bas à droite.

## 6. Planche (image en forme de dossier)

Les images ne sont **jamais rectangulaires** : ce sont des **planches** aux coins arrondis (`--radius`) avec **un onglet** (un décrochement sur un bord, comme un dossier suspendu) et **un coin coupé**. Chaque planche a sa propre variante (onglet en haut à droite, décrochement à gauche, coin bas droit coupé…). Un micro-label blanc est posé en haut à gauche dans l'image.

La forme se fait avec un `clipPath` SVG en unités relatives (`objectBoundingBox`), qui garde les arrondis à toutes les tailles :

```html
<svg width="0" height="0" aria-hidden="true" style="position:absolute">
  <clipPath id="folder-a" clipPathUnits="objectBoundingBox">
    <!-- onglet en haut à gauche, décrochement en bas à gauche, coin bas droit coupé -->
    <path d="M.03,0 H.38 Q.41,0 .43,.03 L.46,.07 H.97 Q1,.07 1,.1 V.88 L.9,1 H.06 Q.03,1 .03,.97 V.78 L0,.74 V.03 Q0,0 .03,0 Z"/>
  </clipPath>
</svg>
<figure class="planche" style="clip-path:url(#folder-a)">
  <img src="…" alt="…" width="1200" height="1500"><figcaption class="label">Animus — personnage</figcaption>
</figure>
```
```css
.planche { position: relative; margin: 0; background: var(--lavender); will-change: transform; }  /* couleur de repli */
.planche img { display: block; width: 100%; height: 100%; object-fit: cover; }
.planche figcaption { position: absolute; left: 7%; top: 9%; color: var(--paper); }
```
Elles **se plient** au défilement (`motion.md` §6). Pas d'ombre, pas de bordure.

## 7. Chapitre plein cadre

Une planche qui **grandit jusqu'à remplir le cadre** (`motion.md` §8). En bas au centre : `001 ■ LE BASTION` en mono blanc, puis une phrase de 2–3 lignes **centrée** en Inter Tight 500 `--fs-story` blanc, révélée mot à mot. Voile sombre en bas de l'image pour la lisibilité.

## 8. Grille à filets (HUD)

Sur les illustrations plein cadre, une **grille de filets** `--line-light` découpe l'écran en cellules (2 colonnes + 1 rangée basse, ou 4 colonnes) ; une cellule peut contenir une **diagonale**. Dans les cellules : coordonnées `N 35°27.37 / E 139°38.57`, température `33.8°` précédée d'une mini-jauge en dégradé, label `// INITIAL`. Option : un **nuage de points** blanc (relief en pointillés) dessiné en canvas.

## 9. Rideau de barres

Motif de **barres verticales arrondies** (pilules) de hauteurs variées, en rangées décalées, avec des fusions liquides (`motion.md` §2). Noir sur blanc au chargement, **blanc translucide** sur illustration comme transition de section. C'est un signe graphique, il reste en SVG.

## 10. Compteur vertical

Grand nombre en **police hexagonale** (`--font-hex` 700, `--fs-counter`) **tourné de 90°** sur toute la hauteur de la cellule (« 05K »), avec à côté le label vertical `▸▸ COLLECTION INITIALE`. Les chiffres roulent quand la valeur change.

## 11. Éventail de portraits

Rangée de 11 cartes-portraits qui se **chevauchent**, la plus grande au centre (≈ 340px de haut), les autres de plus en plus petites vers les bords ; chaque carte a la forme de planche (coins arrondis + petit onglet) et un fond de couleur unie derrière le personnage. Fond de section `--lavender`. Toutes les ≈ 2,4s, l'ordre tourne d'un cran.

## 12. Fiche « objet » à règle

Cellule blanche avec un objet détouré (cristal, artefact) posé sur une **grille de filets horizontaux** et, à droite, une **règle graduée** (traits courts tous les 4px, un long tous les 20px), label `■ CRISTAL KAI`. La règle est un signe (CSS), l'objet est une vraie image.

## 13. Mot-titre géant

Un mot en police hexagonale (`--fs-word`, interligne 0.8, approche −0.1em), noir, sur toute la largeur du contenu (« GARDIENS », « ÉQUIPE », « MÉDIA »). Des planches flottent **par-dessus**, en désordre, avec leur label (`■ LE MONDE`, `■ LE BASTION`, `■ FACTION`).

## 14. Menu plein panneau

Panneau **noir** de ≈ 640px, glissé depuis le rail, coins 10px, avec son propre rail à droite (croix de fermeture, étoile, barres de son).
- Haut gauche : `■ DÉCOUVRIR`.
- **6 mots** en Inter Tight 650 `--fs-menu`, interligne 0.85, −0.07em, capitales, blancs.
- **Page active** : bloc `--lime` derrière le mot, texte noir, **coin bas droit coupé** ; à droite du mot, l'étiquette mono citron `PAGE / 001`.
- **Survol** : bloc **blanc** à coin coupé, texte noir, le mot se **décode** ; étiquette `PAGE 00X` blanche.
- Bas : 3 rangées séparées par des filets `--line-light` : `■ REJOINDRE` + liens (X, Discord), `ACHETER SUR` + lien, langue `FR ⌄` et `© 2026`.
- Derrière : la page passe en **gris** (`filter: grayscale(1)`), voile `--veil`.

```css
.menu__link { display: inline-block; padding: 0 .12em; font: var(--weight-display) var(--fs-menu)/var(--lh-menu) var(--font-display);
  letter-spacing: var(--ls-display); text-transform: uppercase; color: var(--paper); text-decoration: none;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - .28em), calc(100% - .28em) 100%, 0 100%); }
.menu__link:hover, .menu__link:focus-visible { background: var(--paper); color: var(--ink); outline: none; }
.menu__link[aria-current="page"] { background: var(--lime); color: var(--ink); }
.menu__tag { font: 400 var(--fs-label)/1.1 var(--font-mono); color: var(--lime); text-transform: uppercase; }
```

## 15. Pied de page

Fond **noir**, pleine largeur (le cadre s'arrête). Rangée de **4 colonnes** séparées par des filets `--line-light` : (1) `// INITIALISATION` et un journal de fichiers en mono (`KAI_53815.JPG`, `AUDIO_LOG_2018116.WAV`) ; (2) `■ DÉCOUVRIR PLUS` + liste de pages en mono 13.44px blanc, la survolée **en négatif** (fond blanc, texte noir) ; (3) `■ REJOINDRE LA CONVERSATION` + réseaux ; (4) `■ PLUS D'INFOS` + e-mail + bouton contour « Télécharger le livre de marque ». Puis le **logo géant** blanc sur toute la largeur, et une ligne de liens légaux mono centrés + `© 2026` à droite. Tout le texte mono se **décode** à l'entrée.

## 16. Grille d'équipe (page À propos)

Fond `--lavender`, cellules de 4 colonnes séparées par des filets `--line-dark` ; dans chaque cellule : **nom** en Inter Tight 650 ≈ 2.4vw capitales en haut à gauche, carré + rôle en mono dessous, **numéro** `005` en mono en bas à droite ; certaines cellules portent une **diagonale** ou un **logo** de partenaire. **Survol** : une planche-portrait surgit, légèrement tournée, débordant de la cellule, avec nom, rôle et label `■ ARTISTE`.

## 17. Galerie filtrable

Barre latérale « FILTRES » (titre Inter Tight 650), champ de recherche **à coin coupé** (mono, loupe), accordéons de traits (`OREILLE +`, `YEUX +`…) en mono 10px avec cases à cocher et compteurs `(524)` ; à droite, grille de 5 colonnes de portraits carrés avec label `■ GARDIEN #12` ; bouton rond « mélanger » en haut à droite. Images qui arrivent **délavées puis en couleur**.

## 18. Écran « non pris en charge »

Si une page ne peut pas s'adapter (expérience trop large) : phrase en grotesque 20px (« Votre fenêtre est trop petite. **Agrandissez-la pour continuer.** ») et un mot hexagonal géant (« AGRANDIR ») en bas, sur blanc. **À éviter pour une page de contenu** : le skill fournit une vraie version mobile (`layouts.md`).

## États

- **Chargement de contenu** : au centre de la zone, `// CHARGEMENT / DU CONTENU` en mono 9px.
- **Image absente** : la planche garde sa forme et sa couleur de fond, label `IMAGE · À VENIR`.
- **Focus** : contour 1px `--ink` (ou `--paper` sur sombre), décalé de 3px ; dans le menu, même rendu que le survol.
- **Lien inactif** : `--muted` ; actif : `--ink` + carré.
