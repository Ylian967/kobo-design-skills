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
