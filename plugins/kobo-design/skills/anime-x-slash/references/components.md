# Anime X Slash — composants

Valeurs mesurées sur la référence (voir `source.md`), exprimées en tokens.

## Bouton MENU (carré noir fixe)

- **Rôle** : ouvre la navigation plein écran. Toujours en haut à gauche, fixe.
- **Anatomie** : carré noir 82×82px, trois traits blancs fins (hamburger de 40px), mot « MENU » en Oswald 14px dessous.
- **États** : survol → les traits s'écartent de 2px ; ouvert → les traits deviennent une croix ; focus → contour rouge 2px décalé de 3px.

```html
<button class="menu-btn" aria-expanded="false" aria-controls="nav">
  <span class="menu-btn__lines" aria-hidden="true"></span>
  <span class="menu-btn__label">MENU</span>
</button>
```
```css
.menu-btn { position: fixed; inset: 0 auto auto 0; z-index: 50; width: 82px; height: 82px;
  display: grid; place-content: center; gap: var(--space-2); background: var(--ink); color: var(--on-ink);
  border: 0; cursor: pointer; font: 500 var(--text-sm)/1 var(--font-display); letter-spacing: var(--tracking-caps); }
.menu-btn__lines, .menu-btn__lines::before, .menu-btn__lines::after { display: block; width: 40px; height: 1.6px; background: currentColor;
  transition: transform var(--dur-base) var(--ease); }
.menu-btn__lines { position: relative; justify-self: center; }
.menu-btn__lines::before, .menu-btn__lines::after { content: ""; position: absolute; left: 0; }
.menu-btn__lines::before { top: -10px; } .menu-btn__lines::after { top: 10px; }
.menu-btn:hover .menu-btn__lines::before { transform: translateY(-2px); }
.menu-btn:hover .menu-btn__lines::after { transform: translateY(2px); }
.menu-btn[aria-expanded="true"] .menu-btn__lines { background: transparent; }
.menu-btn[aria-expanded="true"] .menu-btn__lines::before { transform: translateY(10px) rotate(33deg); }
.menu-btn[aria-expanded="true"] .menu-btn__lines::after { transform: translateY(-10px) rotate(-33deg); }
.menu-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
```

## Navigation plein écran

Panneau noir qui glisse depuis la gauche (400ms), liens en Oswald capitales 32–48px blancs, numéro d'index rouge à gauche de chaque lien, un filet rouge diagonal traverse le panneau. Lien actif : texte rouge.

## Sélecteur de langue

Label « LANGUAGE » Oswald 11px au-dessus, deux petites cases 26×20 : inactive = fond blanc texte noir, active = fond `--accent` texte `--on-accent`.

## Bouton d'action (étiquette biseautée)

- **Rôle** : appel à l'action ou en-tête de bloc (« OFFICIAL SNS », « VOIR TOUT »).
- **Anatomie** : aplat rouge en parallélogramme, texte Noto Sans JP 700 14–16px capitales.
```css
.tag-btn { display: inline-flex; align-items: center; min-height: 44px; padding: 0 var(--space-6);
  background: var(--accent); color: var(--on-accent); font: 700 var(--text-base)/1 var(--font-body);
  letter-spacing: var(--tracking-caps); text-transform: uppercase; text-decoration: none;
  clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%); transition: background var(--dur-fast) var(--ease); }
.tag-btn:hover { background: var(--accent-deep); }
.tag-btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
```

## Liste d'actualités (barres noires)

- Conteneur noir pleine largeur du container (≈ 1146px), chaque ligne : padding 30px 40px, titre blanc Noto Sans JP 700 16px, chevron fin à droite.
- **Date** : petite étiquette rouge collée sur le filet rouge de 4px qui sépare deux lignes, texte Oswald 14px noir.
- Survol : le titre se décale de 8px à droite, le chevron passe en rouge (300ms).

```html
<ul class="news">
  <li><a href="#"><time class="news__date">2025.11.11</time><span>Changement d'horaire de diffusion</span><i aria-hidden="true">›</i></a></li>
</ul>
```

## Visuel découpé en X

Image réelle (photo ou illustration du projet, voir `assets.md`) dans un conteneur, masquée par un `clip-path` qui dessine deux bandes diagonales, avec un voile `--veil`. Un grand mot Oswald (titre de la section suivante) dépasse en bas, en gris translucide.
Le plus simple : un masque en dégradé net à l'angle `--slant` (deux bandes opaques séparées par une fente transparente).
```css
.x-cut { position: relative; aspect-ratio: 16/9; overflow: hidden; }
.x-cut__img { position: absolute; inset: 0; background: var(--ink) center/cover;
  -webkit-mask-image: linear-gradient(57deg, transparent 0 18%, #000 18% 40%, transparent 40% 43%, #000 43% 66%, transparent 66%);
          mask-image: linear-gradient(57deg, transparent 0 18%, #000 18% 40%, transparent 40% 43%, #000 43% 66%, transparent 66%); }
.x-cut__img::after { content: ""; position: absolute; inset: 0; background: var(--veil); }
```
(Les `#000` du masque ne sont pas des couleurs affichées : seule leur opacité compte.)

## Carte de classement (parallélogramme)

- **Anatomie** : parallélogramme (`--skew`), visuel réel du personnage en fond (photo/illustration N&B + calque `--c` en multiply, voir `assets.md`), dégradé blanc vers le bas, **chiffre géant Oswald rouge** (01, 02…) en bas à gauche, étiquette noire « RANKING No. » au-dessus du chiffre, étiquette noire « HERO NAME » + nom blanc en haut à droite.
- Les cartes s'emboîtent sans gouttière, bordure claire 1.6px ; des triangles noirs pleins comblent les extrémités de la rangée.
- Survol : le visuel zoome à 1.05 (500ms `--ease-snap`), la couleur du personnage apparaît en liseré.

```css
.rank-card { position: relative; transform: skewX(var(--skew)); overflow: hidden; border: var(--border-bold) solid rgb(255 255 255 / .6); }
.rank-card > * { transform: skewX(calc(var(--skew) * -1)); }
.rank-card__num { font: 400 var(--text-number)/1 var(--font-display); color: var(--accent-text); }
.rank-card__label { background: var(--ink); color: var(--on-ink); font: 500 var(--text-xs)/1 var(--font-display); padding: 2px 4px; }
```

## Liste staff / casting

Deux colonnes. À gauche, le rôle (Noto Sans JP 700 italique 16px noir, aligné à droite). À droite, le nom (Noto Sans JP 700 italique 20–24px, `--accent`). Casting : bouton rond 32px (contour noir 0.8px, icône agrandir) pour ouvrir la fiche.

## Bouton rond

Cercle 32–44px, contour `--border-thin` noir, icône fine. Survol : fond noir, icône blanche.

## Rail latéral

À gauche, texte vertical « OFFICIAL » (Oswald 11px, `writing-mode: vertical-rl`) suivi des icônes sociales noires dans des carrés. À droite dans le héros : « VISUAL SELECTER » vertical + vignettes carrées 40px à bordure noire pour changer de visuel.

## États

- **Chargement** : voir `layouts.md` (logo qui se remplit + pourcentage).
- **Vide** : grand mot Oswald gris translucide + phrase en Noto Sans JP + tag-btn.
- **Erreur** : barre noire avec date rouge remplacée par « ERREUR », message clair, tag-btn « Réessayer ».
