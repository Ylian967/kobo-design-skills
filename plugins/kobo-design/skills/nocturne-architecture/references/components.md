# Nocturne Architecture — composants

Toutes les valeurs viennent de `tokens.css`. Code complet et fonctionnel dans `examples/demo.html`.

## Pilule (bouton principal)

- **Rôle** : l'action de contact (« Parlons-en », « Réserver une visite »). Une par zone visible.
- **Anatomie** : hauteur 44px, padding 0 24px, rayon 999px, Inter 500 14px, flèche → qui pivote de -45° au survol.
- **Variantes** : rouge (`--accent` / `--on-accent`), blanche (`--paper` / `--ink`, uniquement posée sur la carte rouge), fantôme (contour `--line-strong`).
- **États** : survol = rouge éclairci de 14 % vers le blanc ; appui = `scale(.97)` ; focus = contour 2px `--accent-text` décalé de 3px ; désactivé = opacité .4, pas de survol ; chargement = libellé « Envoi… » + `aria-busy="true"`.

```html
<a class="pill" href="#contact">Parlons-en <span class="arrow" aria-hidden="true">→</span></a>
<a class="pill pill--paper" href="#">Voir le projet <span class="arrow" aria-hidden="true">→</span></a>
```
```css
.pill { display: inline-flex; align-items: center; gap: var(--space-2); min-height: var(--control); padding: 0 var(--space-6);
  border: 0; border-radius: var(--radius-pill); background: var(--accent); color: var(--on-accent); font: 500 var(--text-sm)/1 var(--font-body);
  transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.pill:hover { background: color-mix(in srgb, var(--accent) 86%, var(--paper)); }
.pill:active { transform: scale(.97); }
.pill:hover .arrow { transform: translateX(3px) rotate(-45deg); }
.pill--paper { background: var(--paper); color: var(--ink); }
.pill--ghost { background: none; color: var(--text); box-shadow: inset 0 0 0 1px var(--line-strong); }
.pill[aria-busy="true"], .pill:disabled { opacity: .4; pointer-events: none; }
```

## Bouton rond (flèches, menu, ouvrir)

Cercle 44px, contour 1px `--line-strong`, icône trait 16px (1.6px). Survol : fond `--raised`, contour `--muted`. Désactivé : opacité .35 (début ou fin du carrousel). Dans une étape ouverte, il devient rouge plein et le « + » tourne en « × ».

```css
.round { width: var(--control); height: var(--control); border-radius: 50%; border: 1px solid var(--line-strong); background: none; display: grid; place-items: center; }
.round:hover { background: var(--raised); border-color: var(--muted); }
.round:disabled { opacity: .35; }
```

## Bouton lecture du showreel

Disque rouge 44px avec triangle blanc + libellé en capitales 11px à côté. Survol : le disque grossit à 1.1. `aria-pressed` bascule « Voir le showreel » / « Showreel en lecture » et l'icône lecture / pause.

```html
<button class="reel" aria-pressed="false"><span class="reel__dot"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 1l11 6-11 6z"/></svg></span><span class="caps">Voir le showreel</span></button>
```

## Navigation du héros

Grille `1fr auto` posée sur la photo : liens Inter 14px blancs à gauche (zone 44px de haut, soulignement 1px qui se dessine de gauche à droite au survol et sur la page courante) ; à droite l'**horloge** puis la pilule rouge. Pas de logo dans la barre : le mot-marque géant joue ce rôle.

**Mobile (< 640px)** : les liens se replient derrière un bouton rond (deux traits) ; le panneau s'ouvre sous la barre, fond `--raised`, liens de 52px séparés par des filets. L'horloge est masquée.

## Horloge

« MER 1 OCT \ 21:40 \ 18°C » : Inter 500 11px, capitales, +0.08em, chiffres tabulaires ; les barres obliques inverses en `--muted`, avec 8px de marge. Mise à jour chaque minute en JS (`Date` + tableaux de jours et de mois français abrégés). La température est une donnée de météo réelle ou retirée.

## Libellé de section

Point rouge 6px + texte en capitales 11px (« • À PROPOS »). Toujours en haut à gauche d'une section, aligné sur la colonne étroite.

## Grande phrase bicolore

```html
<p class="statement">Depuis quinze ans, nous concevons… <span>Chaque projet commence par…</span></p>
```
```css
.statement { font: 400 var(--text-statement)/1.2 var(--font-display); letter-spacing: -0.02em; text-wrap: balance; }
.statement span { color: var(--dim); }  /* grand texte uniquement */
```

## Chiffre clé

Grille 2×2 avec filet en haut, filet sous chaque case et filet vertical entre les colonnes. Chiffre Inter Tight 300 `--text-stat`, suffixe (« + », « k ») à 60 % en `--muted` aligné en haut, libellé 14px `--muted`.

```html
<div class="stats"><div class="stat"><b>15<small>+</small></b><p>Années de pratique</p></div>…</div>
```

## Carte de projet (photo)

- Format 4:5, rayon 4px, photo en fond absolu avec voile bas `--shade-card`, nom Inter Tight 500 20px + lieu 12px en bas à gauche.
- Survol : la photo zoome à 1.04 (`--dur-slow`), un bouton rond ↗ apparaît en haut à droite (aussi au focus clavier).
- Image manquante : `--raised` uni + nom ; la carte garde sa proportion.

## Carte rouge (projet mis en avant)

Première carte du carrousel, aplat `--accent`, texte `--on-accent`. Haut : surtitre « NOUVEAU · 2026 » + nom en Inter Tight 400 28px. Bas : trois caractéristiques en lignes séparées par des filets blancs à 30 % (« Chambres 5 », « Surface 420 m² », « Terrain 1,2 ha »), puis pilule blanche « Voir le projet ». Une seule par carrousel.

## Carrousel + ligne de progression

```html
<div class="ctrls"><button class="round" id="prev" aria-label="Projets précédents">‹</button><button class="round" id="next" aria-label="Projets suivants">›</button></div>
<div class="track" tabindex="0" aria-label="Projets, défilement horizontal">…cartes…</div>
<div class="progress"><div class="progress__bar"><i></i></div><output aria-live="polite">01 / 06</output></div>
```
```css
.track { display: grid; grid-auto-flow: column; grid-auto-columns: clamp(260px, 23vw, 330px); gap: var(--space-4); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
.progress__bar { height: 1px; background: var(--line); position: relative; }
.progress__bar i { position: absolute; left: 0; top: -1px; height: 3px; width: var(--p); background: var(--accent); transition: width var(--dur-base) var(--ease-out); }
```
La largeur `--p` suit `scrollLeft / (scrollWidth - clientWidth)`. Flèches ← → au clavier quand la piste a le focus ; boutons désactivés en bout de course.

## Étape numérotée (accordéon)

`<details>` par étape, une seule ouverte à la fois. Ligne : numéro 14px `--muted` (64px de colonne), titre Inter Tight 400 28px, bouton rond « + » à droite (88px de haut minimum). Ouverte : le bouton passe en rouge plein et tourne de 45°, le corps apparaît (fondu + 8px) avec une photo 4:3 et une colonne « Points clés » (puces rouges 6px) + pilule rouge.

```css
.step summary { display: grid; grid-template-columns: 64px 1fr var(--control); align-items: center; padding: var(--space-6) 0; border-bottom: var(--hairline); }
.step[open] .round { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.step[open] .round svg { transform: rotate(45deg); }
```

## Champ e-mail

Pas de boîte : un filet bas `--line-strong` qui passe en blanc au focus, placeholder `--muted`, pilule « Envoyer » dans la ligne. Erreur : message sous le champ en `--accent-text` + `aria-invalid="true"` ; succès : message `--muted` (« Merci, le studio vous écrit sous 48 h. »).

## Mot-marque géant

```html
<h1 class="wordmark" aria-label="orsel"><span style="--i:0">o</span>…</h1>
```
```css
.wordmark { position: absolute; left: 0; right: 0; bottom: 0; translate: 0 26%; text-align: center; white-space: nowrap;
  font: 500 var(--text-wordmark)/var(--leading-tight) var(--font-display); letter-spacing: var(--tracking-display); }
```
Ajuster `--text-wordmark` à la longueur du nom : il doit toucher les deux marges (≈ 44vw pour 5 lettres, 32vw pour 7). Le héros a `overflow: hidden`.
