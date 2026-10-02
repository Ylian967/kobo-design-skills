# Tiny Planet Toy — composants

## Planète (version CSS/SVG, toujours présente)

Un disque de 360–520px : dégradé radial vert/gris, routes en anneaux (bordures en pointillés), maisons = petits blocs SVG répartis sur le bord et orientés vers l'extérieur (`rotate(angle)` + `translateY(-rayon)`), arbres = cercles verts. Le tout tourne très lentement (`--spin`). Un halo turquoise clair (`--bg-deep`) l'entoure.

```html
<div class="planet" aria-hidden="true"><div class="planet__ground"></div><div class="planet__ring"></div><span class="hut" style="--a: 20deg"></span>…</div>
```
```css
.planet { position: relative; width: min(70vw, 460px); aspect-ratio: 1; border-radius: 50%; animation: spin var(--spin) linear infinite; }
.planet__ground { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 40% 35%, var(--stone), var(--grass) 70%); box-shadow: 0 0 0 18px var(--bg-deep); }
.hut { position: absolute; left: 50%; top: 50%; width: 34px; height: 30px; background: var(--paper); border-top: 10px solid var(--roof); transform: rotate(var(--a)) translateY(calc(min(35vw, 230px) * -1)); transform-origin: 0 0; }
@keyframes spin { to { transform: rotate(1turn); } }
```

## Planète (version WebGL, optionnelle)

Three.js : `SphereGeometry` (rayon 1) en `MeshToonMaterial` avec une texture peinte, objets (maisons, arbres) instanciés sur la surface avec leur normale comme axe « haut », caméra orthographique, rotation lente via `requestAnimationFrame`. Charger seulement après l'affichage de la version CSS et si `!matchMedia('(prefers-reduced-motion: reduce)').matches`.

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

- **Chargement** : la planète en version CSS s'affiche immédiatement ; un petit compteur Silkscreen « 42 % » sous le bouton tant que le WebGL charge.
- **Pas de WebGL** : on reste en version CSS, sans message d'erreur.
