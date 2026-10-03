# Bubble Publisher Hub — composants

## Bulle (signature)

```css
.bubble { position: relative; border-radius: var(--radius); background: var(--bubble-bg, var(--bg)); color: var(--bubble-fg, var(--text)); }
.bubble::after { content: ""; position: absolute; left: 0; bottom: calc(var(--tail) * -1 + 1px); width: var(--tail); height: var(--tail);
  background: inherit; clip-path: polygon(0 0, 100% 0, 0 100%); }
```
Variantes : `--bubble-bg: var(--ink); --bubble-fg: var(--on-ink)` (titre noir) ; blanche (encart, carte) ; rouge (logo, pastilles du collage).

## Barre double

- **Barre noire** 72px : compte, langue, logo éditeur en contour blanc à droite.
- **Filet 4 couleurs** (4px) qui part à ~28 % de la largeur.
- **Barre blanche** 72px : logo-bulle rouge à gauche (contour rouge 3px, texte noir 700), liens centrés Montserrat 600 16px noirs (padding 0 19px), loupe à droite.
- Au défilement la barre noire disparaît, la barre blanche reste collée.

## En-tête des pages internes

- **Barre utilitaire noire** `--bar-h` (compte, FR, logo carré en contour) — conservée sur mobile.
- **Filet épais** `--stripe-h-top` (≈ 8px, estimé) en **haut à droite seulement** (de ~58 % au bord droit), 4 couleurs bleu, turquoise, jaune, rose.
- **Barre blanche** : logo-bulle à contour rouge à gauche, liens centrés 500 16px noirs, loupe à droite (burger en ≤ 1023px).
- **Lien actif** : texte rouge + **trait-pilule** rouge `--pill-w`×`--pill-h` (16×4px) arrondi, centré sous le mot.

```css
.navlinks a { position: relative; display: grid; place-items: center; min-height: 44px; padding: 0 19px; font: 500 var(--text-base) var(--font); text-decoration: none; transition: color var(--dur-fast) var(--ease); }
.navlinks a::after { content: ""; position: absolute; left: 50%; bottom: 2px; width: var(--pill-w); height: var(--pill-h); border-radius: var(--pill-h); background: var(--red);
  transform: translateX(-50%) scaleX(0); transition: transform var(--dur-fast) var(--ease); }
.navlinks a:hover, .navlinks a[aria-current] { color: var(--red); }
.navlinks a:hover::after, .navlinks a[aria-current]::after { transform: translateX(-50%) scaleX(1); }
```
États : repos noir ; survol rouge + pilule qui s'étire ; actif (`aria-current="page"`) idem fixe ; focus contour rouge 3px.

## Menu mobile

Burger 44×44 (`aria-expanded`, `aria-controls`) → panneau plein écran blanc sous l'en-tête, liens 700 28px en colonne, l'actif en rouge ; fermeture par le même bouton (✕), Échap ou clic sur un lien ; défilement du corps bloqué. Sur mobile, la barre blanche devient **fond de couleur** (celle de la bande de la page) avec le **logo-bulle blanc**.

## Bande de page + lettre géante

Haut de chaque page interne : **bande de couleur pleine** (`--band-games` noir pour Jeux, `--band-news` rose pour Actualités) qui s'arrête à mi-hauteur des premières cartes (`linear-gradient(var(--band) 0 62%, var(--bg) 62%)`). Derrière, une **lettre / un fragment de mot géant** (`--text-giant`, 800, `--giant`) coupé par le bord droit et le haut, `aria-hidden`.

## Titre en bulles empilées

Deux bulles rouges décalées : un mot court (« Jeux ») puis un mot plus large (« Populaires ») décalé vers la droite de 24–90px, texte blanc 800 `--text-stack` (≈ 44px), chacun avec sa queue en bas à gauche. Un seul `h1` contenant deux `span.bubble--red`.

```css
.stack { display: grid; justify-items: start; gap: calc(var(--tail) + 4px); font: 800 var(--text-stack)/1 var(--font); letter-spacing: var(--tracking-hero); }
.stack span { padding: var(--space-3) 22px; }
.stack span:last-child { margin-left: clamp(24px, 6vw, 90px); }
```

## Carte vedette

Grille 2 colonnes, image plein cadre 16:10, **rayon `--radius-card` (16px)**, dégradé noir sur le bas (45 % → 80 % noir), titre capitales 800 24px blanc à gauche, date 600 14px à droite, **queue de bulle noire** sous le coin bas gauche. Survol : zoom de l'image 1.04 ; focus : contour rouge.

## Barre de recherche et filtres

- **Champ** : fond `--field`, bord `--field-w` (1.5px) `--field-line` noir, rayon `--radius` (12px), hauteur `--search-h`, placeholder « Chercher un jeu » `--muted`, **loupe rouge** à droite. Focus : anneau rouge 2px décalé.
- **Menus déroulants** « Catégorie ⌄ », « Date de sortie ⌄ » : `select` natif sans bord, texte noir 600 16px, **chevron rouge** (qui pivote quand le menu a le focus).
- Compteur de résultats `aria-live` à droite ; état **vide** : bulle rouge « Aucun jeu ne correspond ».

```css
.searchbox input { min-height: var(--search-h); padding: 0 52px 0 var(--space-4); background: var(--field); border: var(--field-w) solid var(--field-line); border-radius: var(--radius); }
.searchbox .icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--red); }
.dropdown select { appearance: none; background: transparent; border: 0; padding-right: 30px; font: 600 var(--text-base) var(--font); }
.dropdown::after { /* chevron rouge 8px en bordures */ border: solid var(--red); border-width: 0 2px 2px 0; transform: rotate(45deg); }
```

## Rangée-carrousel par catégorie

En-tête : **titre en bulle noire** à gauche (700 24–32px), **flèches ← → rouges fines** (44×44) à droite, la flèche inactive à 30 %. Piste : `grid-auto-flow: column`, `scroll-snap-type: x mandatory`, cartes 16:9 rayon 16px, **3,25 cartes visibles** (la dernière coupée au bord droit), padding latéral = gouttière.

## Carte de jeu (16:9) et variante HUD

Comme la carte vedette en plus petit (titre 800 ~17px capitales, date 14px). **Variante HUD** : bordure haute 4px d'une couleur de filet (`--hud: var(--stripe-n)`) et petit **onglet trapézoïdal** (64×10px, `clip-path`) qui dépasse en haut à gauche.

## Carte d'actualité

- Image 16:10 rayon 16px ; **pastille date** blanche en bas à droite (« 01 Octobre 2026 », 700 14px, rayon 8px) ; bouton **j'aime** (pilule blanche, cœur rouge + compteur, `aria-pressed`) en bas à gauche ; sur les vidéos, **bouton ▶ carré blanc** 56px à icône rouge au centre.
- Sous l'image : **franchise** en capitales 800 16px, puis **titre 300 24px** noir (lien, soulignement 2px au survol).
- États : j'aime actif = cœur rempli + léger grossissement ; survol carte = zoom image 1.04.

## Bouton rouge

```css
.btn-red { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 var(--space-9); border-radius: var(--radius-btn);
  background: var(--red); color: var(--on-red); font: 700 var(--text-sm)/1 var(--font); letter-spacing: var(--tracking-caps); text-transform: uppercase; text-decoration: none;
  transition: background var(--dur-fast) var(--ease); }
.btn-red:hover { background: var(--red-light); }
```

## Lien souligné

Capitales 700 14px +0.1em, noir, soulignement 2px noir décalé de 6px (« REJOIGNEZ L'AVENTURE »).

## Encart de jeu

Bulle blanche (≈ 350px) posée à droite d'un visuel plein cadre : titre rouge 24px 700 (nom + « est maintenant disponible »), puis bouton rouge pleine largeur « Acheter maintenant ! ». Plusieurs encarts peuvent s'empiler.

## Carte de sortie

Bulle à fond image réelle (ratio 4:3, voir `assets.md`), dégradé noir en bas, logo du jeu en bas à gauche (emplacement), date `JJ/MM/AAAA` blanche 16px en bas à droite. Grille de 3, gouttière 16px. Bouton rouge centré dessous « Toutes les prochaines sorties ».

## Titre-bulle

Bulle noire (ou blanche sur visuel) contenant un titre 48px 700 (« Rejoins le Club ! », « Deviens playtesteur ! »), posée en haut à gauche de la section, padding 12px 20px.

## Section club

Fond `--club` avec de grands pictogrammes de manettes/bulles en contour blanc translucide ; titre-bulle noir ; panneau blanc arrondi dessous contenant une icône rouge (trophée), un texte et un carrousel de cartes à bandeau dégradé `--grad-card`, flèches ← → rouges (la précédente pâle si inactive).

## Collage (fenêtre d'inscription)

Grille de tuiles inclinées de 15°, chacune une forme de bulle différente (coins arrondis variables, une pointe) : images réelles (voir `assets.md`), aplats noirs, cercles rouges. À droite : icône enveloppe rouge, titre 32px 700, bouton rouge « Je m'inscris ». Bouton fermer carré en haut à droite.

## Icônes

Pictogrammes au trait rouge 2px (manette, enveloppe, trophée) dans un cadre-bulle rouge.

## États

- **Chargement** : cartes en bulle grise `--skeleton` qui pulsent doucement.
- **Vide** : titre-bulle + phrase + bouton rouge.
- **Erreur** : bulle rouge, texte blanc, lien souligné « Réessayer ».
