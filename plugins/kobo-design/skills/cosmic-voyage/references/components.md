# Cosmic Voyage — composants

## Barre de navigation (fixe, 58px)

Fond `--nav`. À gauche une petite icône (barres d'égaliseur) qui coupe le son. Au centre les liens (Noto Sans 500, 15px, `--text`) espacés de ~60px ; lien actif en `--link` avec un **trait bleu de 2px sous toute la largeur de l'onglet**. Lien externe précédé d'une petite flèche ↗. Menu « Autre ▾ ». À droite « Connexion » + icône de profil cerclée, puis le **bouton Télécharger** collé au bord.

```css
.topnav { position: fixed; inset: 0 0 auto; height: var(--nav-h); z-index: 50; display: flex; align-items: center; background: var(--nav); }
.topnav a { position: relative; display: grid; place-items: center; height: 100%; padding: 0 var(--space-8); color: var(--text); font: 500 var(--text-base) var(--font-ui); text-decoration: none; transition: color var(--dur-fast) var(--ease); }
.topnav a[aria-current="page"] { color: var(--link); }
.topnav a[aria-current="page"]::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--link); }
```

## Bouton « Télécharger maintenant »

Bloc couleur sable `--accent-sand`, texte noir 500 15px sur deux lignes, **coins arrondis seulement en bas à gauche** (miroir de la carte), hauteur = barre de nav. Survol : éclaircissement + reflet qui traverse (300ms).

## Bouton principal (or)

`--accent` plein, texte `--on-accent`, rayon `--radius-2`, padding 14px 16px, `transition: all 0.2s linear` (mesuré). Variante secondaire : fond transparent, contour 0.8px `--line`, texte `--line`, très petit (10px) pour « En savoir plus ».

## En-tête de section

```html
<h2 class="sec-head">La voix de la galaxie</h2>
```
```css
.sec-head { display: inline-block; margin: 0 0 var(--space-6); padding: 6px 80px 6px 12px; font: 500 var(--text-sm) var(--font-ui); color: var(--text);
  border-left: 2px solid var(--gold); background: linear-gradient(90deg, rgb(0 0 0 / .85), transparent); }
```

## Onglets

Texte `--text` 14px, actif en `--gold` ; une petite **étoile à quatre branches** (✦ en 8px) accrochée en haut à droite de chaque onglet. Pas de soulignement.

## Carte d'actualité (signature)

```html
<a class="news-card" href="#">
  <img src="…" alt="" width="196" height="64">
  <div><h3>Titre de l'actualité</h3><p>Résumé sur deux lignes…</p><time>28/9/2026</time></div>
</a>
```
```css
.news-card { display: grid; grid-template-columns: 196px 1fr; gap: var(--space-5); padding: var(--space-4) var(--space-5); background: var(--surface);
  border-radius: var(--radius-card); color: var(--text); text-decoration: none; transition: background var(--dur-base) var(--ease), transform var(--dur-base) var(--ease); }
.news-card:hover { background: var(--surface-2); transform: translateX(4px); }
.news-card h3 { margin: 0 0 6px; font: 500 var(--text-sm) var(--font-ui); }
.news-card p { margin: 0; font: 400 var(--text-2xs)/1.5 var(--font-ui); color: var(--muted); }
.news-card time { justify-self: end; font: 400 var(--text-2xs) var(--font-ui); color: var(--muted); }
```

## Panneau de personnage (verre bleuté)

- Grand panneau 900×520 environ, fond `--glass-veil` sur flou (`backdrop-filter: blur(10px)`), bordure 1px `--glass-edge`, **coin haut-droit arrondi**.
- En-tête : emblème carré à gauche (fond plus sombre), nom en 30px léger, ligne « micro + interrupteur + VA : nom ».
- Corps : bloc de description en verre plus sombre (`rgb(0 0 0 / .25)`), texte 12px blanc interligne 1.6.
- L'illustration du personnage (image réelle : illustration PNG du projet ou rendu, voir `assets.md`) **déborde du panneau** à droite et en haut ; dans la démo, une photo fondue dans le verre par un masque en dégradé.
- **Citations** : 3 ou 4 lignes en Noto Serif 11px blanc, chacune sur sa propre bande noire `--quote-strip`, alignées à droite, en escalier.
- En bas : carrousel de vignettes carrées 52px (bordure dorée fine sur la vignette active + petit triangle doré dessous), flèches ‹ › dorées.

## Frise d'emblèmes (verticale)

Colonne de 3 cercles 70px (fond sombre, bordure 1px dorée, image dans le cercle) reliés par un filet vertical doré avec des petites pointes de flèche ; nom sous chaque cercle (11px, `--muted`, actif en blanc gras). Étoile à 4 branches en haut et en bas de la frise.

## Rail social (droite)

Icônes 28px blanches dans des cercles blancs à fond sombre, colonne verticale, libellé « Follow » vertical au-dessus. À gauche : « Scroll Down » vertical + trait.

## Bloc de téléchargement (héros)

QR code blanc 116px + grille 2×3 de boutons noirs (rayon 6px, bordure fine) avec logo et deux lignes de texte. Bouton lecture circulaire avec anneau dégradé à côté.

## États

- **Chargement** : intro « hyperespace » (voir motion.md) puis fondu.
- **Vide** : en-tête de section + phrase en `--muted` centrée dans une carte à un coin.
- **Erreur** : carte à un coin avec trait gauche `--accent`, message, bouton or « Réessayer ».

---

# Composants des pages Mondes et du mobile

> Relevés le 2026-10-02 sur la carte des mondes, la fiche d'un monde et l'accueil en 375px (voir `source.md`). Valeurs « observé » = à l'œil sur capture ; durées et tailles non mesurées par script.

## Carte stellaire des mondes

**Rôle** : page d'entrée « Mondes » ; choisir une destination.
**Anatomie** (observé) :
- plein écran sous la navigation, fond **nuit bleu profond** (`--map-bg`, dégradé radial vers `--map-bg-2` au centre) + champ d'étoiles réel (scène Three.js ou photo) ;
- **grands anneaux orbitaux concentriques** (ellipses très larges, centre hors écran) qui traversent tout l'écran : traits blancs fins **pleins** (`--orbit`) ou **pointillés** (`--orbit-dim`) ;
- **mondes** = icônes rondes lumineuses (planète, station, bulle de verre) posées sur les orbites, avec **halo bleu** (`--halo`) et un **libellé blanc 11px** à côté ;
- étiquette **« Mondes »** en haut à gauche dans un petit cadre sombre (`--label-bg`, filet `--line`).

Les anneaux sont un **élément graphique** (SVG ou lignes Three.js) ; l'intérieur des icônes de mondes est une **vraie image** (illustration du projet, sinon photo d'espace), jamais une planète dessinée en CSS.

| État d'un monde | Rendu |
|---|---|
| Repos | icône 64px (`--world-icon`), halo 12px `--halo`, libellé `--text-soft` |
| Survol | `scale(1.12)`, halo 24px, libellé `--text`, l'orbite porteuse passe de `--orbit-dim` à `--orbit` |
| Focus | anneau 2px `--gold` décalé de 4px |
| Actif (sélectionné) | anneau `--gold` permanent + petite étoile ✦ dorée au-dessus |
| Verrouillé | image en niveaux de gris, opacité .5, libellé « ??? », `aria-disabled="true"` |

```html
<section class="starmap" aria-label="Carte des mondes">
  <p class="map-tag">Mondes</p>
  <svg class="orbits" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <ellipse cx="1500" cy="980" rx="900" ry="520" class="o"/>
    <ellipse cx="1500" cy="980" rx="1250" ry="760" class="o o--dim"/>
  </svg>
  <a class="world" href="monde.html" style="--x:38%;--y:52%"><span class="world__icon"><img src="…" alt="" width="128" height="128"></span><span class="world__name">Station Héliade</span></a>
</section>
```
```css
.starmap { position: relative; height: calc(100svh - var(--nav-h)); overflow: hidden; background: radial-gradient(ellipse at 60% 70%, var(--map-bg-2), var(--map-bg) 70%); }
.orbits { position: absolute; inset: 0; width: 100%; height: 100%; }
.orbits .o { fill: none; stroke: var(--orbit); stroke-width: 1; vector-effect: non-scaling-stroke; }
.orbits .o--dim { stroke: var(--orbit-dim); stroke-dasharray: 4 8; }
.map-tag { position: absolute; left: var(--space-6); top: var(--space-6); margin: 0; padding: 4px 12px; background: var(--label-bg); border: 0.8px solid var(--line); font: 500 var(--text-sm) var(--font-ui); }
.world { position: absolute; left: var(--x); top: var(--y); translate: -50% -50%; display: flex; align-items: center; gap: var(--space-2); color: var(--text-soft); text-decoration: none; min-height: 44px; }
.world__icon { width: var(--world-icon); height: var(--world-icon); border-radius: 50%; overflow: hidden; box-shadow: 0 0 12px 2px var(--halo); transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.world__icon img { width: 100%; height: 100%; object-fit: cover; }
.world__name { font: 500 var(--text-orbit) var(--font-ui); text-shadow: 0 1px 4px var(--bg-deep); }
.world:hover .world__icon, .world:focus-visible .world__icon { transform: scale(1.12); box-shadow: 0 0 24px 6px var(--halo); }
.world:hover .world__name { color: var(--text); }
.world[aria-current="true"] .world__icon { outline: 2px solid var(--gold); outline-offset: 4px; }
```

## Fiche d'un monde

**Anatomie** (observé) :
- fond = **illustration du monde floutée** (`blur(18px)`, `scale(1.1)`) + voile `--veil-world` ;
- **bouton « Retour »** en haut à gauche : rectangle à **bord fin** (0.8px `--line`), texte 14px, flèche ‹ ;
- en haut à droite : **nom du monde avec son icône ronde** (même icône que sur la carte, 40px) ;
- **titre centré** (Noto Sans 300, `--text-world`) + **paragraphe centré 12px** `--text-soft`, largeur ≈ 640px ;
- **carrousel de lieux** : image centrale 16:9 nette, coins arrondis `--radius-2` ; images voisines à gauche et à droite **assombries** (`--dim-side`) et **coupées** par le bord ; **flèches ‹ › fines** posées sur l'image centrale ; **légende du lieu** sous l'image.

| État | Rendu |
|---|---|
| Bouton Retour survol | bordure et texte `--gold` (150ms) |
| Flèches repos / survol | `--text` 70 % → 100 %, fond `--quote-strip` au survol |
| Flèches désactivées (bout de liste) | opacité .3, `disabled` |
| Image voisine survol | voile allégé (.35) ; clic = elle passe au centre |
| Focus | contour 2px `--gold` |

```css
.world-page { position: relative; min-height: 100svh; padding: calc(var(--nav-h) + var(--space-6)) 0 var(--space-12); overflow: hidden; }
.world-page__bg { position: absolute; inset: -40px; z-index: -1; background: var(--map-bg); }
.world-page__bg img { width: 100%; height: 100%; object-fit: cover; filter: blur(18px); transform: scale(1.1); }
.world-page__bg::after { content: ""; position: absolute; inset: 0; background: var(--veil-world); }
.btn-back { display: inline-flex; align-items: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-5); border: 0.8px solid var(--line); background: none; color: var(--text); font: 500 var(--text-sm) var(--font-ui); text-decoration: none; }
.btn-back:hover { border-color: var(--gold); color: var(--gold); }
.places { position: relative; display: grid; grid-template-columns: 1fr min(820px, 76vw) 1fr; gap: var(--space-5); align-items: center; }
.place { aspect-ratio: 16/9; overflow: hidden; border-radius: var(--radius-2); position: relative; }
.place--side::after { content: ""; position: absolute; inset: 0; background: var(--dim-side); transition: background var(--dur-base) var(--ease); }
.place-arrow { position: absolute; top: 50%; translate: 0 -50%; min-width: 44px; min-height: 64px; background: none; border: 0; color: var(--text); font: 300 2.5rem/1 var(--font-ui); opacity: .7; }
.place-arrow:hover { opacity: 1; background: var(--quote-strip); }
```

## Navigation mobile (observé à 375px)

Barre noire `--nav`, hauteur ≈ `--nav-h-mobile` : à gauche une **pilule blanche** `--pill` « Télécharger maintenant » sur **2 lignes** (texte noir 12px), à droite un **hamburger 3 traits** blancs. Le menu ouvert (non observé, proposé) est un tiroir plein écran `--nav`, liens 18px, actif en `--link` avec trait bleu à gauche.

```css
.mnav { display: flex; justify-content: space-between; align-items: center; height: var(--nav-h-mobile); padding: 0 var(--space-3); background: var(--nav); }
.mnav__dl { padding: 4px 14px; border-radius: 999px; background: var(--pill); color: var(--on-accent); font: 500 var(--text-xs)/1.2 var(--font-ui); text-align: center; text-decoration: none; }
.burger { width: 44px; height: 44px; display: grid; place-content: center; gap: 5px; background: none; border: 0; }
.burger i { width: 22px; height: 2px; background: var(--text); transition: transform var(--dur-base) var(--ease); }
.burger[aria-expanded="true"] i:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger[aria-expanded="true"] i:nth-child(2) { opacity: 0; }
.burger[aria-expanded="true"] i:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

## Gros bouton jaune « Télécharger maintenant » (héros mobile)

**Anatomie** (observé) : centré en bas du héros, fond **jaune** `--cta-yellow`, **bord doré** 2px `--cta-yellow-edge`, **lueur** (`box-shadow` 0 0 24px `--cta-glow`), texte noir 16px 500, rayon `--radius-2` (estimé). Remplace le bloc QR + 6 boutons du bureau. C'est le seul aplat jaune du site : réservé au téléchargement mobile.

| État | Rendu |
|---|---|
| Repos | lueur 24px |
| Survol / appui | lueur 36px, `scale(1.02)` ; appui `scale(.98)` |
| Focus | contour 2px `--text` décalé 4px |
| Désactivé | non utilisé |

```css
.cta-yellow { display: block; width: min(320px, 100%); margin: 0 auto; min-height: 52px; padding: 14px 20px; background: var(--cta-yellow); color: var(--on-accent); border: 2px solid var(--cta-yellow-edge); border-radius: var(--radius-2); box-shadow: 0 0 24px var(--cta-glow); font: 500 1rem var(--font-ui); text-align: center; text-decoration: none; transition: all 0.2s linear; }
.cta-yellow:hover { box-shadow: 0 0 36px var(--cta-glow); transform: scale(1.02); }
.cta-yellow:active { transform: scale(.98); }
```

## Bouton lecture à anneau dégradé (mobile)

Rond 64px, anneau `conic-gradient(var(--ring-a), var(--ring-b), var(--ring-c), var(--ring-a))` qui tourne (6s), centre sombre avec ▶. Sous le héros : **chevron ⌄** de défilement qui descend de 6px en boucle.

## Bannière cookies (mobile)

Panneau `--nav` collé en bas, texte 12px `--text-soft` ; **boutons pleine largeur** empilés : « Tout refuser » et « Accepter » en `--cookie-blue` texte `--on-cookie`, « Paramètres » en contour 0.8px `--line`. Cibles ≥ 44px. Le refus a le même poids visuel que l'acceptation.
