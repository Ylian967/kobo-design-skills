# Pocket Device Noir — composants

Toutes les valeurs viennent de `tokens.css`. Code complet et fonctionnel dans `examples/demo.html`.

## Boutons

- **Rôle** : blanc plein = action principale (« Précommander », « Acheter ») ; contour sombre = action secondaire (« Voir la démo »). Jamais plus de deux côte à côte.
- **Anatomie** : hauteur 44px (petit : 36px visibles + zone étendue à 44px), padding 0 20px, rayon 4px, Geist 500 14px. Icône lecture en triangle CSS (pictogramme d'interface).
- **États** : survol (blanc → gris très clair ; contour → fond `--glass-hi`, contour blanc à 40 %) ; appui `translateY(1px)` ; focus contour 2px `--text` décalé de 3px ; désactivé / terminé opacité .4 + `aria-disabled` ; chargement « Réservation… » + `aria-busy`.

```html
<a class="btn btn--paper" href="#cta">Précommander</a>
<a class="btn btn--ghost" href="#product"><span class="play" aria-hidden="true"></span>Voir la démo</a>
<a class="btn btn--paper btn--sm" href="#cta">Acheter</a>
```
```css
.btn { display: inline-flex; align-items: center; gap: var(--space-2); min-height: var(--control); padding: 0 var(--space-5); border-radius: var(--radius-sm); border: 1px solid transparent;
  font: 500 var(--text-sm)/1 var(--font-body); transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.btn:active { transform: translateY(1px); }
.btn--paper { background: var(--paper); color: var(--on-paper); }
.btn--paper:hover { background: color-mix(in srgb, var(--paper) 86%, var(--bg)); }
.btn--ghost { background: color-mix(in srgb, var(--bg) 35%, transparent); border-color: var(--glass-line); color: var(--text); backdrop-filter: blur(8px); }
.btn--ghost:hover { background: var(--glass-hi); border-color: color-mix(in srgb, var(--text) 40%, transparent); }
.btn--sm { min-height: 36px; padding: 0 var(--space-4); font-size: var(--text-xs); position: relative; }
.btn--sm::after { content: ""; position: absolute; inset: -4px; }   /* zone tactile 44px */
.btn[aria-disabled="true"] { opacity: .4; pointer-events: none; }
```

## Navigation

Grille `1fr auto 1fr`, 72px, posée sur la photo : logo (petit carré 14px à contour avec un point rouge + nom en Geist 600) | liens Geist 12px en blanc à 75 % (blanc au survol et sur la page courante) | petit bouton blanc « Acheter ». Mobile (< 720px) : liens dans un panneau de verre sous la barre, ouvert par un bouton carré 44px à contour.

## Étiquette

```html
<span class="chip">Écran</span>
<span class="chip chip--glass">Offre du moment</span>
```
```css
.chip { padding: 3px var(--space-2); border-radius: var(--radius-xs); background: var(--chip); color: var(--chip-text);
  font: 500 var(--text-2xs)/1.4 var(--font-mono); letter-spacing: var(--tracking-caps); text-transform: uppercase; }
.chip--glass { background: var(--glass); box-shadow: inset 0 0 0 1px var(--glass-line); color: var(--text); }
```
Informatives, jamais cliquables.

## Libellés de coin

Deux lignes en Geist Mono 11px capitales : la première en blanc (« ORA P1 »), la seconde en `--muted` (« MODÈLE 2026 »). En bas à gauche et à droite du héros, à 32px du bord.

## Carte de verre « offre »

```html
<aside class="offer" aria-labelledby="offerTitle">
  <button class="offer__close" aria-label="Fermer l'offre">×</button>
  <span class="chip chip--glass">Offre du moment</span>
  <h2 id="offerTitle">Étui en laine offert</h2><p>Pour toute précommande avant le 31 octobre.</p>
  <div class="offer__row"><span class="offer__price">149 € <s>179 €</s></span><a class="btn btn--paper btn--sm" href="#cta">J'en profite</a></div>
</aside>
```
```css
.offer { position: absolute; right: var(--gutter); bottom: var(--space-8); width: 268px; padding: var(--space-4); border-radius: var(--radius-md);
  background: var(--glass); border: 1px solid var(--glass-line); backdrop-filter: blur(var(--blur)); box-shadow: var(--shadow-float); }
```
Fermable (bouton 44px). Sur mobile : pleine largeur en bas du héros.

## L'objet (scène 3D)

L'objet n'est **jamais dessiné en CSS** : c'est une vraie scène Three.js (ou le rendu / la photo produit du projet). Recette complète dans `assets.md` § 5 : boîtier noir mat arrondi (`RoundedBoxGeometry`), petit écran en texture canvas (heure, onde, voyant rouge, état), 4 trous de micro, molette circulaire en métal à crans qui tourne de 40° au survol, bouton rouge sur la tranche.

```html
<div class="reveal__stage" id="bigDevice" data-3d="reveal" data-state="listening" role="img" aria-label="Ora P1 en 3D : boîtier noir mat, petit écran, molette métal et bouton rouge">
  <img class="fallback" src="photo-ou-rendu.webp" alt="" width="1000" height="1200" loading="lazy">
  <!-- le module Three.js ajoute ici un <canvas aria-hidden="true"> puis la classe .is-3d-ready -->
</div>
```
`data-state="idle"` met l'écran en veille (voyant gris, onde plate). Variantes `data-3d="hero"` (posé sur le bureau, sans fond) et `data-3d="cta"` (incliné à droite). Repli : l'image `.fallback` (couleur `--rock` derrière) si WebGL est absent.

## Nom géant (signature)

```html
<div class="reveal">
  <p class="giant" aria-hidden="true">Ora P1</p>
  <div class="reveal__stage" data-3d="reveal" …>…</div>
  <div class="callouts"><p class="callout callout--1"><span class="chip">Écran</span><b>Écran mémoire 1,1 pouce</b>L'heure et l'état.</p>…</div>
</div>
```
```css
.giant { position: absolute; inset: 50% 0 auto; translate: 0 -50%; text-align: center; white-space: nowrap;
  font: 600 var(--text-giant)/1 var(--font-display); letter-spacing: -0.05em; color: var(--giant);
  -webkit-text-stroke: 1px color-mix(in srgb, var(--text) 8%, transparent); }
```
Légendes : trait 40px blanc à 30 %, étiquette, titre 14px blanc, ligne 12px `--muted` ; aux quatre coins de la zone (à droite, alignées à droite).

## Manifeste à rayons

```css
.rays { position: absolute; left: 50%; top: 50%; width: 1600px; aspect-ratio: 1; translate: -50% -50%;
  background: repeating-conic-gradient(from 0deg, color-mix(in srgb, var(--text) 14%, transparent) 0deg .25deg, transparent .25deg 4deg);
  mask: radial-gradient(circle, transparent 9%, black 12%, color-mix(in srgb, var(--bg) 50%, transparent) 30%, transparent 55%); }
```
Texte centré `--text-statement`, 30 caractères de large, deux ou trois mots en `<span class="hl">` (`--red`). La section a `overflow: hidden`.

## Panneau de fonction (verre sur texture)

Tuile à coins de 20px (roche, tissu orange ou `--surface`), vraie photo de texture en fond (image réelle, voir `assets.md`), et en bas un panneau de verre : fond noir à 35 %, contour `--glass-line`, flou 18px, étiquette + titre Geist 500 16px + ligne 12px. Survol : contour blanc à 24 %. Variante chiffre (« 5 jours » en 48–80px) et variante onde sonore (barres grises, une sur cinq en rouge).

## Témoignage miniature

Carte `--surface`, contour `--line`, rayon 12px, padding 20px : citation 14px entre guillemets français, puis avatar rond 36px (initiales en mono sur dégradé de couleur chaude), nom 14px 500 et rôle 12px `--muted`. Survol : contour blanc à 20 %.

---

# Relevés sur la vidéo du shot (2026-10-03)

La seconde pièce jointe du shot est une courte vidéo (800×600, 2,4s) qui fait défiler trois écrans absents de l'image principale. Valeurs **observées** (≈), pas mesurées.

## Bande de films « pourquoi » (sélection centrale)

Section noire centrée : étiquette grise arrondie (« Pourquoi … ? »), titre blanc 2 lignes (~32px, grotesque serrée), puis **rangée de 5 photos** d'usage en paysage (~4:3, rayon ~4px, tons chauds). La photo du **centre** est plus grande, en portrait, entourée d'un **contour pointillé fin** clair : c'est l'élément actif ; les voisines sont assombries. Paragraphe gris centré dessous (3 lignes, ~13px). Au défilement ou au clic, la sélection glisse d'une photo à l'autre.

```css
.reel { display: flex; justify-content: center; align-items: center; gap: var(--space-2); }
.reel img { width: 120px; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--radius-sm); filter: brightness(.7); transition: all var(--dur-base) var(--ease-out); }
.reel .is-active img { width: 132px; aspect-ratio: 3 / 4; filter: none; outline: 1px dashed rgb(255 255 255 / .5); outline-offset: 4px; }
```

## Panneau « en vedette » (moitié floutée)

Écran partagé : à gauche, un **panneau de verre sombre** (même photo floutée derrière) avec étiquette « En vedette », **petite icône rouge** (ondes sonores), titre blanc 3 lignes (~28px), texte gris, petit bouton blanc « En savoir plus », et en bas une **barre de progression segmentée** (4–5 segments fins, le premier blanc) ; à droite, la photo nette de l'objet en main sur un bureau, une **étiquette blanche** en haut à droite, une **flèche ronde** de navigation sur le bord droit et une légende grise 2 lignes en bas à droite. C'est un carrousel de cas d'usage.

## Appel final photo

Photo plein cadre (main tenant l'objet dans une lumière rasante, ombres de fenêtre), titre blanc centré 2 lignes (~32px), sous-titre gris, **petit bouton blanc** « Précommander … » centré sous l'objet, micro-texte gris dessous.
