# Alpine Glass Expedition — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`.

## Boutons pilule

Hauteur 44px, rayon `--radius-pill`, Inter 600 11px capitales +0.18em, padding 0 24px, flèche ↗ optionnelle qui monte en diagonale au survol.

| Variante | Repos | Survol | Usage |
|---|---|---|---|
| `.pill--white` | fond `--white`, texte `--on-white` | fond `--fog` + ombre douce | action principale sur photo ou nuit (« Voir les voyages », « S'inscrire ») |
| `.pill--deep` | fond `--deep`, texte `--white` | fond `--night` | action principale sur fond clair |
| `.pill--ghost` | contour `--line-light`, texte `--white` | fond `--glass`, contour blanc | secondaire sur photo, bouton « Menu » |

États communs : appui = `scale(.97)` ; focus = contour 2px `--white` décalé de 3px (`--deep` sur fond clair) ; désactivé ou chargement (`aria-busy="true"`) = opacité .5 + `not-allowed`.

```html
<a class="pill pill--white" href="#aventures">Voir les voyages</a>
<button class="pill pill--deep" type="submit">Réserver <span class="arr" aria-hidden="true">↗</span></button>
```
```css
.pill { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-6);
  border: 1px solid transparent; border-radius: var(--radius-pill); font: 600 var(--text-2xs)/1 var(--font-ui); letter-spacing: var(--tracking-caps);
  text-transform: uppercase; text-decoration: none; white-space: nowrap; cursor: pointer;
  transition: background var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease), box-shadow var(--dur) var(--ease); }
.pill--white { background: var(--white); color: var(--on-white); }
.pill--white:hover { background: var(--fog); box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--night) 50%, transparent); }
.pill--deep { background: var(--deep); color: var(--white); }
.pill--ghost { border-color: var(--line-light); color: var(--white); background: transparent; }
.pill--ghost:hover { background: var(--glass); border-color: var(--white); }
.pill:active { transform: scale(.97); }
.pill .arr { transition: transform var(--dur) var(--ease); }
.pill:hover .arr { transform: translate(2px, -2px); }
.pill[disabled], .pill[aria-busy="true"] { opacity: .5; cursor: not-allowed; transform: none; }
```

## Bouton rond en verre (signature)

Disque `--glass-btn` (112px), flèche ↗ 24px au-dessus d'un libellé en capitales 9.5px sur 2 lignes. Verre : reflet radial en haut à gauche + dégradé glace → ardoise translucides, `backdrop-filter: blur(14px) saturate(1.2)`, bordure 1px `--glass-border`, ombre `--shadow-glass` (reflet interne + ombre portée bleutée), anneau extérieur fin à 9px. Survol : `scale(1.06)` et la flèche part en diagonale. Placé sur la photo, à droite du sommet, jamais sur du texte.

```html
<a class="glass-btn" href="#aventures"><span class="ico" aria-hidden="true">↗</span>Explorer<br>les aventures</a>
```
```css
.glass-btn { position: relative; display: grid; place-items: center; align-content: center; gap: var(--space-2); width: var(--glass-btn); aspect-ratio: 1;
  border-radius: 50%; text-align: center; text-decoration: none; color: var(--white);
  background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--white) 35%, transparent), transparent 55%), linear-gradient(160deg, color-mix(in srgb, var(--ice) 38%, transparent), color-mix(in srgb, var(--slate) 32%, transparent));
  border: 1px solid var(--glass-border); backdrop-filter: blur(var(--blur)) saturate(1.2); -webkit-backdrop-filter: blur(var(--blur)) saturate(1.2);
  box-shadow: var(--shadow-glass); font: 600 9.5px/1.35 var(--font-ui); letter-spacing: var(--tracking-caps); text-transform: uppercase;
  transition: transform var(--dur) var(--ease); }
.glass-btn::before { content: ""; position: absolute; inset: -9px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--white) 22%, transparent); }
.glass-btn:hover { transform: scale(1.06); }
.glass-btn .ico { font: 400 1.5rem/1 var(--font-ui); transition: transform var(--dur) var(--ease); }
.glass-btn:hover .ico { transform: translate(3px, -3px); }
```
Sans `backdrop-filter` (`@supports not`) : fond `color-mix(in srgb, var(--glass-solid) 80%, transparent)`.

## Bouton lecture

Cercle `--play` (52px), fond nuit à 55 % flouté, bordure `--glass-border`, triangle blanc 14px décalé de 2px à droite. Survol : fond `--deep`, `scale(1.06)`. Bascule `aria-pressed` + `aria-label` « Lire / Mettre en pause le film » ; l'icône devient deux barres. À côté : 3 lignes en capitales espacées (« Votre voyage, / pensé avec / soin »).

## Navigation

Grille `1fr auto 1fr` : logo (icône montagne dans un cercle, trait 1.4px + nom en Instrument Serif 26px) ; liens **centrés** en capitales 11px +0.18em, espacés de 32px, avec un filet de 1px qui se trace de gauche à droite au survol et reste sous la page courante (`aria-current`) ; pilule blanche à droite.

```css
.nav { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: var(--space-6) var(--edge); }
.links a { display: inline-flex; align-items: center; min-height: 44px; position: relative; text-decoration: none; }
.links a::after { content: ""; position: absolute; left: 0; right: 100%; bottom: 10px; height: 1px; background: currentColor; transition: right var(--dur) var(--ease); }
.links a:hover::after, .links a[aria-current]::after { right: 0; }
```
Mobile (< 760px) : liens et pilule masqués, bouton `.pill--ghost` « Menu » (`aria-expanded`, `aria-controls`) qui ouvre les liens dans un panneau de verre sombre arrondi sous la nav.

## Puces

Contour 1px `--line-light`, texte blanc, Inter 500 11px capitales, 36px de haut, zone tactile étendue à 44px (`::after { inset: -4px 0 }`). Survol : fond blanc, texte `--on-white`.
Variante `.chip--dark` sur fond clair (filtres) : contour `--line`, texte `--deep`, 44px ; active (`aria-pressed="true"`) et survol : fond `--deep`, texte blanc.
Sur une carte photo : fond nuit à 38 % flouté, pour rester lisible sur un ciel clair.

## Note

« 4,8 » en Instrument Serif 44px, « /5 » à 0.5em, étoile `--star` en exposant (`aria-hidden`), puis « Note moyenne » en capitales 11px. Alignée à droite dans le héros. Pour les lecteurs d'écran, préférer un texte complet : `<span class="sr-only">Note moyenne : 4,8 sur 5</span>`.

## Carte de voyage

Carte 520px de haut, rayon `--radius-card`, vraie photo plein cadre refroidie (`data-slot="trip-photo"`, image réelle, voir `assets.md`) + dégradé sombre en bas, ombre `--shadow-soft`. En haut : deux puces (durée à gauche, niveau à droite). En bas : **panneau de verre** (`--glass-strong`, flou 14px, bordure claire, rayon 20px) avec titre Instrument Serif 24px capitales sur 2 lignes, prix (« Dès **1 240 €** », chiffre en serif) et rond blanc ↗ 44px qui pivote de 45° au survol. Survol : l'image zoome à 1.05 en 1.2s.

```html
<a class="trip" href="/sejours/lacs-geles">
  <figure class="scene" data-slot="trip-photo"><img src="brumes.jpg" alt="Chaînes de montagnes dans la brume bleue" loading="lazy" width="800" height="1040"></figure>
  <div class="trip-top"><span class="chip">6 jours</span><span class="chip">Modéré</span></div>
  <div class="panel"><h3>Le tour des<br>lacs gelés</h3><div class="panel-row"><p>Dès <b>1 240 €</b></p><span class="go" aria-hidden="true">↗</span></div></div>
</a>
```
```css
.trip { position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: 520px; padding: var(--space-3);
  border-radius: var(--radius-card); overflow: hidden; color: var(--white); text-decoration: none; isolation: isolate; box-shadow: var(--shadow-soft); }
.scene { position: absolute; inset: 0; z-index: -1; transition: transform var(--dur-slow) var(--ease); }
.trip:hover .scene { transform: scale(1.05); }
.panel { padding: var(--space-6); border-radius: var(--radius-panel); background: var(--glass-strong); border: 1px solid var(--glass-border);
  backdrop-filter: blur(var(--blur)) saturate(1.15); -webkit-backdrop-filter: blur(var(--blur)) saturate(1.15); box-shadow: var(--shadow-glass); }
.go { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--white); color: var(--on-white); transition: transform var(--dur) var(--ease); }
.trip:hover .go, .trip:focus-visible .go { transform: rotate(45deg); }
```
États : complet = puce « Complet » + panneau désaturé, lien vers la liste d'attente ; chargement = carte `--ice` avec reflet qui glisse (squelette).

## Panneau d'étape (fond nuit)

Verre très léger (`--glass`, bordure blanche à 18 %), rayon 20px, padding 32px : numéro « 01 » en serif 64px `--ice`, titre serif 28px capitales, texte 14px `--ice`.

## Champ d'inscription

Pilule de verre sur nuit (bordure blanche à 28 %, padding 6px) contenant l'input transparent (Inter 14px blanc, placeholder `--ice`) et une `.pill--white`.

| État | Rendu |
|---|---|
| Repos | bordure blanche à 28 % |
| Survol | bordure `--line-light` |
| Focus (`:focus-within`) | bordure blanche + halo 4px blanc à 12 % |
| Erreur | bordure `--star` + message `--star` « Cette adresse ne semble pas complète. » (`aria-invalid`) |
| Envoi | bouton `aria-busy`, message « Inscription… » dans `role="status"` |
| Succès | message de confirmation `--ice` |

## Témoignage

Centré sur `--fog` : 5 étoiles (`--star` cerclé `--deep`), citation Instrument Serif 30–52px (24ch), partie en italique `--slate`, avatar rond 48px bordé de blanc (photo réelle de la personne ou de son séjour, voir `assets.md`) + nom Inter 600 + séjour `--muted`.
