# Heritage Lens — composants

## Bouton « Entrer » (double anneau)

```css
.enter { position: relative; width: var(--enter); aspect-ratio: 1; border-radius: 50%; border: 1px solid var(--ring); background: none; color: var(--text);
  font: 400 var(--text-lg) var(--font-display); letter-spacing: .04em; text-transform: uppercase; cursor: pointer; transition: transform var(--dur-fast) var(--ease); }
.enter::before { content: ""; position: absolute; inset: -10px; border-radius: 50%; border: 1px solid var(--ring); opacity: .6; transition: inset var(--dur-fast) var(--ease); }
.enter:hover::before { inset: -16px; }
```
Sous le bouton : « Cliquer sur Entrer pour continuer », Inter 12px.

## Lentille avant / après (signature)

- Conteneur rond `--lens`, image réelle « aujourd'hui » à l'intérieur (`object-fit: cover`, même cadrage que la reconstitution, voir `assets.md`), anneau festonné SVG autour (24 petits arcs).
- Sur ordinateur, elle suit la souris dans la zone de la scène (lissage 0.15) ; sur mobile, elle est fixe et se déplace au doigt.
- Légende sous la lentille : « Cliquer pour voir l'état actuel », Inter 500 12px blanc avec ombre.
- Clic / Entrée : la lentille s'agrandit en plein écran (transition `clip-path: circle()`), second clic pour revenir.
- Équivalent clavier : bouton texte « Voir aujourd'hui » visible au focus.

```css
.lens { position: absolute; width: var(--lens); aspect-ratio: 1; border-radius: 50%; overflow: hidden; translate: -50% -50%; box-shadow: 0 0 0 6px rgb(251 243 228 / .25); }
.scene.is-today .today { clip-path: circle(150% at var(--x) var(--y)); }
.today { position: absolute; inset: 0; clip-path: circle(calc(var(--lens) / 2) at var(--x) var(--y)); transition: clip-path var(--dur) var(--ease); }
```

## Titre de lieu

Gilda Display 64–72px, or ou ivoire, 2 lignes, ombre douce (`0 2px 30px rgb(28 20 14 / .6)`), suivi du récit en Crimson Pro centré sous le titre (colonne 340px).

## Bulle de lieu (haut droite)

Nom du lieu en Inter 500 13px + médaillon rond or 44px avec un motif (rosette ✦). Clic : ouvre la liste des lieux.

## Points de chapitre

Colonne de 7 points ivoire 6px à droite, espacés de 28px ; l'actif est un anneau de 14px. Libellé du lieu au survol.

## Boutons ronds

Réglages (engrenage) et son (haut-parleur) : cercles 44px, contour 1px `--ring`, icônes fines, en bas à droite, espacés de 12px.

## « À propos du projet »

En bas à gauche, Inter 13px + cercle avec flèche → ; ouvre un panneau parchemin (`--parchment`, texte `--ink`) à droite, 420px, avec crédits et sources.

## Version mobile (cartes)

Chaque lieu devient une carte arrondie (24px) plein écran : titre centré, bouton rond ↓ « Défiler pour explorer », lentille au centre de l'image ; un bandeau sombre en bas porte le titre de la carte suivante.

## États

- **Chargement** : fond `--bg`, nom du site en Gilda Display qui apparaît lettre par lettre en fondu, puis le bouton Entrer.
- **Sans WebGL** : images fixes pour chaque scène (photos ou rendus réels, voir `assets.md`), mêmes interactions.
