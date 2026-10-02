# Acid Scan Security — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`.

## Boutons

Carrés (`--radius: 0`), hauteur 44px, JetBrains Mono 700 11px capitales +0.18em, padding 0 24px, petit carré de 6px en icône optionnelle.

| Variante | Repos | Survol | Usage |
|---|---|---|---|
| `.btn--solid` | fond `--acid`, texte `--on-signal` | fond `--signal` + halo `--glow` | action principale, une par écran |
| `.btn--glass` | `--acid` à 16 % + contour `--acid` à 30 %, flou 8px, texte `--text` | `--acid` à 28 %, contour plein | bouton de nav « Se protéger » |
| `.btn--ghost` | contour `--line-hi`, texte `--text` | contour `--text`, fond `--panel` | secondaire, bouton menu |

États communs : appui = `translateY(1px)` ; focus = contour 1px `--signal` décalé de 3px ; désactivé ou chargement (`aria-busy="true"`) = opacité .45 + `not-allowed`.

```html
<button class="btn btn--solid" type="submit"><span class="sq" aria-hidden="true"></span>Lancer l'analyse</button>
```
```css
.btn { display: inline-flex; align-items: center; gap: var(--space-3); min-height: 44px; padding: 0 var(--space-6); border: 1px solid transparent;
  border-radius: var(--radius); font: 700 var(--text-2xs) var(--font-mono); letter-spacing: var(--tracking-caps); text-transform: uppercase; cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.btn--solid { background: var(--acid); color: var(--on-signal); }
.btn--solid:hover { background: var(--signal); box-shadow: var(--glow); }
.btn--glass { background: color-mix(in srgb, var(--acid) 16%, transparent); border-color: color-mix(in srgb, var(--acid) 30%, transparent); backdrop-filter: blur(8px); color: var(--text); }
.btn:active { transform: translateY(1px); }
.btn[disabled], .btn[aria-busy="true"] { opacity: .45; cursor: not-allowed; }
```

## Navigation

Grille 3 colonnes : logo (anneau concentrique `--acid` / `--mid` + nom en mono 700) ; liens centrés en mono 11px `--muted`, gap 32px ; bouton translucide à droite. Survol et page courante : texte `--text` encadré de crochets `[ … ]` `--signal` qui apparaissent. Mobile : liens dans un panneau `--panel` ouvert par un bouton carré 44px (`aria-expanded`).

## Crochets d'angle

Huit dégradés d'une couleur en `background` (aucun élément en plus). Variables : `--c` couleur, `--l` longueur, `--w` épaisseur.

```css
.brackets { --c: var(--line-hi); --l: var(--bracket); --w: var(--bracket-w);
  background:
    linear-gradient(var(--c), var(--c)) top left / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) top left / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) top right / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) top right / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) bottom left / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) bottom right / var(--w) var(--l) no-repeat; }
.card { background-color: var(--deep); }   /* la couleur de fond se pose APRÈS, en longhand */
```

## Photo duotone tramée (signature, 1/3)

- Conteneur `data-slot`, `role="img"` + `aria-label`.
- Image : convertie en luminance, puis répartie sur la rampe `--bg, --deep, --mid, --acid, --text` avec un **tramage ordonné** (matrice de Bayer 4×4). La source est une **image réelle, voir `assets.md`** : la démo lit la photo dans un canvas (1 pixel = `--dot-size`, agrandi avec `image-rendering: pixelated`), jamais un visage dessiné.
- Par-dessus : une **trame de points** (le noir entre les pixels) et des **lignes de balayage** ; dégradés sombres en haut et en bas pour la lisibilité du texte.

```css
.photo canvas { width: 100%; height: 100%; image-rendering: pixelated; }
.photo::before { content: ""; position: absolute; inset: 0; opacity: var(--dot-opacity);
  background: radial-gradient(circle at center, transparent 0 1.6px, var(--bg) 2.3px) 0 0 / var(--dot-size) var(--dot-size); }
.photo::after { content: ""; position: absolute; inset: 0;
  background: repeating-linear-gradient(180deg, transparent 0 calc(var(--scanline) - 1px), color-mix(in srgb, var(--bg) 35%, transparent) calc(var(--scanline) - 1px) var(--scanline)); }
```

En production, le traitement peut aussi se faire une fois côté serveur (image déjà tramée). Repli CSS si le canvas échoue (photo sans CORS, script coupé) : `filter: grayscale(1) contrast(1.4)` sur la photo + calque `--acid` en `mix-blend-mode: multiply`, puis la trame de points par-dessus (voir `assets.md` § 3).

## Bande et cadre de scan (signature, 2/3)

- **Bande** : rectangle `--signal` sur les yeux ; les zones sombres de l'image y deviennent `--on-signal` (seuil de luminance ~0.2), le reste `--signal`.
- **Cadre** : contour 1px `--text` décalé de 10px autour de la bande, crochets 2px `--signal` décalés de 18px.
- **Étiquette** au-dessus à gauche : fond `--signal`, texte `--on-signal` mono 700 (« Sujet 07 · scan biométrique ») ; **résultat** en dessous à droite sur fond `--bg` (« Correspondance 99,2 % »).

## Réticule (signature, 3/3)

Filet vertical à 50 % et filet horizontal à la hauteur des yeux (`--eye`), en `--text` à 35 %. Coordonnées mono « X 0.500 · Y 0.400 » près du croisement (masquées en mobile).

## Surtitre et titre

```html
<span class="label mono">Chiffrement de grade militaire</span>
<h1 class="hero-title"><span>Vos données</span><span>restent à vous.</span><span>Point final.</span></h1>
```
Surtitre `--label` précédé d'un carré 8px qui clignote. Titre Jersey 10 `--text-hero`, interligne 0.82, halo `text-shadow` `--acid` à 25 % ; dernière ligne `--muted`.

## Carte CTA cadenas

Carré 232px, fond `--panel` à 88 %, crochets `--text` de 16px, cadenas pixel (SVG `shape-rendering: crispEdges`) `--acid` en haut, libellé pixel 32px + flèche mono en bas. Survol : fond `--glass`, halo, cadenas qui monte de 3px en `--ease-step`, flèche +4px. Mobile : bande horizontale pleine largeur.

## Bandeau de mesures

Grille de 4 colonnes séparées par `--line` ; chiffre en Jersey 10 `--text-stat` (sans retour à la ligne), étiquette mono `--dim`. Mobile : 2 × 2.

## Carte de couche

Fond `--deep`, bordure `--line`, crochets `--line-hi` ; index mono en haut à droite, icône pixel 40px `--acid`, titre pixel 32px, texte `--muted`, puces. Survol : bordure `--line-hi`, fond `--panel`, crochets `--signal`.

## Puces

Mono 11px capitales, bordure `--line`, carré 5px `--mid` en tête. Variante `.chip--hot` : fond `--signal`, texte `--on-signal`.

## Champ « terminal »

Boîte carrée 52px, fond `--deep`, bordure `--line`, invite `>_` en `--dim`, saisie mono `--text`, curseur `caret-color: --signal`. Survol : bordure `--line-hi` ; focus : bordure + anneau 1px `--signal` ; erreur : bordure et message `--danger` (message en `aria-live`). L'aide sous le champ est en `--dim`.

## Bascules de filtre

Boutons carrés 44px `aria-pressed`, mono 11px, bordure `--line`. Actif : fond `--glass`, bordure `--acid`, texte `--text`.

## Journal (terminal)

Panneau `--deep` à crochets, barre d'en-tête (adresse mono `--dim` + état `--acid`), liste numérotée en `decimal-leading-zero` : numéro `--dim`, heure, statut coloré (`OK` `--acid`, `ALERTE` `--danger`, `RÉSOLU` `--signal`), texte `--muted`. Curseur bloc qui clignote après la dernière ligne. `role="log"` + `aria-live="polite"`.

## Jauge segmentée

24 segments carrés de 10px, gap 3px, `--line` éteints / `--acid` allumés, allumage en pas (`--ease-step`).

## États vide, chargement, erreur

- **Vide** : journal avec une seule ligne « En attente d'une cible… » et le curseur.
- **Chargement** : bouton `aria-busy`, état « ● Analyse… », lignes ajoutées une à une, jauge qui se remplit.
- **Erreur** : champ et message `--danger`, focus renvoyé au champ.
- **Sans canvas / sans JS** : fond en dégradé radial `--mid → --deep → --bg` + trame ; la page reste lisible.
