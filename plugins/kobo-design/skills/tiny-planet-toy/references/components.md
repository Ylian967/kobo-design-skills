# Tiny Planet Toy — composants

## Planète (Three.js, cœur du style)

Vraie petite planète low-poly en 3D : sphère bosselée `--grass`, deux chemins `--stone` qui en font le tour, maisons (`--paper` + toit `--roof`), arbres, rochers, posés selon la normale ; ombrage cel 3 tons, halo `--bg-deep` derrière ; glisser pour tourner, inertie, rotation lente au repos (`--spin`). Recette complète et code : `assets.md` et `examples/demo.html`.

```html
<div class="planet" data-3d data-slot="planet" aria-hidden="true"><div class="planet__fallback"><!-- capture du rendu --></div></div>
```

## Planète : repli

Sans WebGL (ou avant le chargement du module) : une **capture du rendu** de la planète (image réelle, voir `assets.md`), sinon un disque aux couleurs des tokens (`--stone` → `--grass`, halo `--bg-deep`). Jamais de maisons ni d'arbres dessinés en CSS/SVG.

## Logo en blocs

Grille 3×3 de lettres Bungee crème (`--paper`) avec un contour `--outline` et une ombre pleine `4px 6px 0 var(--sky-shadow)`, centrée sur la planète. Chaque lettre légèrement décalée (±2px, ±1°) pour l'effet « posé à la main ».

## Bouton relief

```css
.toy-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 var(--space-8); border: var(--outline); border-radius: var(--radius-sm);
  background: var(--accent); color: var(--on-accent); font: 400 var(--text-base)/1 var(--font-ui); text-transform: uppercase; cursor: pointer;
  transform: rotate(var(--tilt)); box-shadow: 0 var(--press) 0 var(--accent-edge); transition: transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); }
.toy-btn:hover { transform: rotate(var(--tilt)) translateY(-2px); box-shadow: 0 calc(var(--press) + 2px) 0 var(--accent-edge); }
.toy-btn:active { transform: rotate(var(--tilt)) translateY(var(--press)); box-shadow: 0 0 0 var(--accent-edge); }
```

## Bulle de dialogue

Panneau crème, contour sombre 2px, rayon 10px, petite pointe, texte Nunito 600 16px vert sapin, nom du personnage en Silkscreen dans une étiquette jaune au-dessus. Le texte s'écrit lettre par lettre (sautable).

## HUD minimal

Coins de l'écran uniquement : en haut à gauche un compteur (Silkscreen dans une pastille crème), en haut à droite son/menu (boutons ronds crème 44px à contour), en bas une aide « Glisser pour tourner » qui disparaît après la première interaction.

## Poussières

10 à 20 petits cercles ou triangles `--speck` qui dérivent lentement (translate + rotate, 20–40s), `pointer-events: none`.

## États

- **Chargement** : le repli (capture du rendu) s'affiche immédiatement ; un petit compteur Silkscreen « 42 % » sous le bouton tant que le WebGL charge.
- **Pas de WebGL** : on reste sur le repli, sans message d'erreur.
