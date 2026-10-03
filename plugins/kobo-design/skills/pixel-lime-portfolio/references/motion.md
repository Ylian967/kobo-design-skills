# Pixel Lime Portfolio — mouvement

**La référence est une suite d'images fixes** (trois captures d'une maquette) : aucune animation n'y est visible. Tout ce qui suit est **proposé** par le skill, à partir de ce que le visuel suggère : des pixels qui se posent, des traits de feutre qui se tracent, des autocollants qui se collent. Deux registres : le **saccadé** (pixels, surlignages : par pas) et le **vivant** (traits à la main, autocollants : souple).

## Catalogue

| Moment | Effet | Durée / courbe |
|---|---|---|
| Arrivée du héros | Les blocs lime de la mosaïque apparaissent par paquets, dans un ordre tiré au hasard ; les deux lignes du nom montent derrière un cache | ≈ 0.9s (26 paquets à 34ms) ; 900ms `--ease`, 120ms d'écart |
| Mosaïque au repos | Cinq blocs changent d'état toutes les 900ms ; à l'arrêt hors écran | minuterie, pas d'animation continue |
| Blocs de section | Montée de 26px en fondu, une fois | `--dur-slow` (900ms) `--ease` |
| Surlignage lime | Le fond se déploie de gauche à droite **en quatre pas** | 900ms `steps(4)`, retard 250ms |
| Ovale à la main | Le trait se trace autour des mots | `--dur-draw` (1100ms) `--ease`, retard 350ms |
| Autocollant | Passe de 0 à sa taille en tournant, l'un après l'autre | 450ms `--ease`, retards de 600 à 900ms |
| Fiche | Au survol, pivote de 1 à 1.5° et monte de 6px ; son lien se décale de 8px | 450ms `--ease` |
| Bouton mono | Fond et texte s'inversent **par pas** ; la flèche avance de 4px | 150ms `steps(4)` ; 450ms |
| Ligne de récompense | Devient noire ; deux carrés lime se posent en biais à ses extrémités | 150ms `steps(4)` ; 450ms |
| Vignette de projet | Zoom à 1.04 | 900ms `--ease` |
| Nom géant du pied | Étiquettes et autocollants s'y collent à l'entrée | 450ms, retards de 300 à 700ms |

## Code

```css
/* Ovale tracé à la main : un chemin SVG de longueur 1, étiré sur les mots */
.ring svg { position: absolute; left: -7%; top: -22%; width: 114%; height: 150%; fill: none; stroke: var(--lime); stroke-width: 2.5; }
.ring path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset var(--dur-draw) var(--ease) 350ms; }
.in .ring path { stroke-dashoffset: 0; }

/* Surlignage par pas */
.mark::before { content: ""; position: absolute; inset: 4% 0; z-index: -1; background: var(--lime);
  transform: scaleX(0); transform-origin: left; transition: transform var(--dur-slow) var(--ease-step) 250ms; }
.in .mark::before { transform: none; }

/* Autocollant */
.sticker { transform: rotate(var(--rot, -12deg)) scale(0); transition: transform var(--dur) var(--ease) var(--sd, 600ms); }
.in .sticker { transform: rotate(var(--rot, -12deg)); }
```

```js
// Mosaïque : les cases sont tirées une fois (graine fixe), plus denses au milieu de la bande
const mid = 1 - Math.abs((r + 0.5) / rows - 0.5) * 2;
if (rnd() < density * (0.15 + mid * 1.1)) cells.push({ r, c, on: false });

// Apparition par paquets, puis quelques blocs qui clignotent
const step = () => { for (let k = 0; k < per && i < cells.length; k++) paint(cells[i++], true);
  if (i < cells.length) setTimeout(step, 34); else flicker(); };
```

## Performance

- **La mosaïque est un canvas dessiné une fois** : chaque bloc est un `fillRect`. Au repos, cinq `fillRect` ou `clearRect` toutes les 900ms, rien entre deux. Pas de boucle `requestAnimationFrame`.
- Le clignotement est **coupé hors écran** (IntersectionObserver) et la mosaïque est reconstruite au redimensionnement.
- Noir et blanc des photos fait par le serveur d'images (`sat=-100`), pas par `filter`.
- Quadrillage et perforations : des dégradés CSS fixes.
- Seuls `transform`, `opacity`, `stroke-dashoffset` et des couleurs sont animés ; tout se joue une fois à l'entrée, puis au survol.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : apparition de la mosaïque et du nom 139 images/s, héros au repos (mosaïque qui clignote) 145. Le défilement de la page n'a pas pu être mesuré de façon fiable : la fenêtre de test était recouverte pendant la mesure.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .rise { opacity: 1; transform: none; }
  .name b { transform: none; }
  .ring path { stroke-dashoffset: 0; }
  .mark::before { transform: none; }
  .sticker { transform: rotate(var(--rot, -12deg)); }
}
```

La mosaïque est dessinée d'un coup et ne clignote plus ; ovales, surlignages et autocollants sont en place d'emblée.
