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

---

# Relevés sur le site en ligne (2026-10-03)

L'expérience a été lancée jusqu'au bout cette fois (navigateur intégré, ~612px de large, clic réel sur le bloc de départ). Tout est rendu en WebGL : **aucun texte DOM**, donc rien n'est mesurable par script ; tout ce qui suit est **observé** (≈).

## Écran de chargement dessiné

Fond **blanc** plein écran, au centre une **enveloppe dessinée à la main** (trait noir irrégulier, ~44px) et dessous le mot « CHARGEMENT » en **capitales manuscrites** (trait fin, ~12px, lettres un peu dansantes). Rien d'autre. Réutilisé entre l'écran-titre et la scène de jeu.

```html
<div class="loader" role="status" aria-live="polite">
  <img src="enveloppe-dessinee.svg" alt="" width="44">  <!-- dessin réel au trait, pas une icône géométrique -->
  <p class="hand">Chargement</p>
</div>
```
```css
.loader { position: fixed; inset: 0; display: grid; place-content: center; gap: 10px; background: #fff; text-align: center; }
.hand { font: 400 0.8rem/1 'Gochi Hand', 'Patrick Hand', cursive; letter-spacing: .12em; text-transform: uppercase; color: var(--text); }
```

## Bloc de départ 3D

Le bouton « BEGIN » n'est pas un bouton plat : c'est un **pavé jaune en 3D** posé sous la planète, libellé pixel sur la face avant, qui **tourne lentement sur lui-même** (on voit tour à tour la face libellée et une face nue). Au clic, il lance le chargement de la scène. En HTML (repli ou interface hors WebGL), garder le `Bouton relief` du skill avec une légère oscillation `rotateY` de ±12°.

## Logo en blocs (observé)

Les lettres sont de **gros cubes crème** avec contour d'encre et hachures d'ombre dessinées, empilés en grille 3×3 **devant** la planète ; les lettres sont formées de rainures à angles droits (labyrinthe). Ils arrivent un à un en tombant sur la planète.

## Scène de jeu (observée)

Vue à la troisième personne, caméra derrière l'épaule ; rue de quartier résidentiel (distributeur de boissons, miroir de rue orange, poteaux, glissière blanche, enseignes) ; **rendu cel-shading** : aplats sans dégradé, **contours noirs irréguliers** comme à l'encre, nuages en formes plates turquoise foncé ; personnage aux proportions simples avec un **sac rouge** (seule couleur saturée de l'écran). La courbure de la petite planète se voit à l'horizon. **Aucun HUD** à l'écran au départ : l'interface est absente tant que le joueur n'interagit pas.
