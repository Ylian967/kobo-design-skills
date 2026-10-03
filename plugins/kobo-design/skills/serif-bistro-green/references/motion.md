# Serif Bistro Green — mouvement

**La référence est une suite de huit images fixes** : aucune animation n'y est visible. Tout ce qui suit est **proposé** par le skill, à partir de ce que le visuel suggère : des feuilles qui se recouvrent, des assiettes rondes qui tournent, un carnet relié qu'on feuillette. Le ton est celui d'un service en salle : **posé, généreux, jamais nerveux** (`--ease`, 500 à 1400ms).

## Catalogue

| Moment | Effet | Durée / courbe |
|---|---|---|
| Arrivée du héros | Chaque mot du titre monte derrière un cache, l'un après l'autre ; l'arche de la cheffe monte de 18 % en fondu ; l'assiette arrive en tournant d'un quart de tour | 1000ms `--ease`, écarts de 90 à 300ms ; arche 1400ms ; assiette 1200ms `--ease-back` |
| Assiette du héros | Tourne avec le défilement (0.18° par pixel), seulement tant que le héros est à l'écran | lié au défilement |
| Barre de navigation | Se range vers le haut en descendant, revient dès qu'on remonte | `--dur` (500ms) `--ease` |
| Titres de section | Montée derrière un cache, une fois | `--dur-slow` (1000ms) `--ease` |
| Blocs | Montée de 28px en fondu, une fois | `--dur-slow` `--ease` |
| Carrousel relié | Avance d'une fiche toutes les 4.2s quand il est à l'écran ; s'arrête au survol et au focus ; les points suivent | défilement doux du navigateur |
| Fiche orange | Au survol, l'assiette tourne de 50° et grossit à 1.05 ; le bouton rond pivote de −45° | 1200ms `--ease` ; 500ms `--ease-back` |
| Dessins au trait | Se tracent à l'entrée de la section | 1600ms `--ease`, retard 300ms |
| Filtre de la carte | Les fiches sortent (fondu, 14px, 0.97), puis celles du rayon choisi reviennent en cascade | 220ms ; 500ms `--ease`, 60ms d'écart |
| Fiche de plat | Zoom de la photo à 1.06 au survol | `--dur-slow` `--ease` |
| Cadres du titre en escalier | Chaque cadre glisse à sa vitesse pendant le défilement (−0.16 à 0.08) | lié au défilement |
| Bouton | Monte de 3px, la flèche avance de 5px | `--dur` `--ease` |
| Nom géant du pied | Monte derrière un cache | 1400ms `--ease` |

## Code

```css
/* Mot qui monte derrière un cache (la marge négative protège les jambages) */
.mask { display: inline-block; overflow: hidden; padding-bottom: 0.16em; margin-bottom: -0.16em; vertical-align: top; }
.js .mask > b { display: inline-block; transform: translateY(112%); transition: transform var(--dur-slow) var(--ease) var(--d, 0ms); }
.js .in .mask > b { transform: none; }

/* Assiette : c'est la photo qui tourne, le disque ne bouge pas */
.plate img { transform: rotate(var(--turn, 0deg)); }
.fav-card .plate { transition: transform 1200ms var(--ease); }
.fav-card:hover .plate { transform: rotate(50deg) scale(1.05); }

/* Dessin au trait : les symboles ont pathLength="1" */
.js .art { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1600ms var(--ease) 300ms; }
.js .in .art { stroke-dashoffset: 0; }
```

```js
// Défilement : une seule lecture par image
const onScroll = () => {
  tick = false; const y = scrollY;
  nav.classList.toggle('is-away', y > last && y > 400); last = y;
  if (y < innerHeight) plate.style.setProperty('--turn', (y * 0.18).toFixed(1) + 'deg');
  const r = zone.getBoundingClientRect();
  if (r.bottom > 0 && r.top < innerHeight) {
    const mid = r.top + r.height / 2 - innerHeight / 2;
    frames.forEach(f => f.style.transform = `translate3d(0, ${(mid * f.dataset.speed).toFixed(1)}px, 0)`);
  }
};
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });

// Filtre : sortie, tri, retour en cascade
grid.classList.add('is-out');
setTimeout(() => { let n = 0;
  dishes.forEach(d => { const ok = cat === 'tout' || d.dataset.cat === cat; d.hidden = !ok; d.style.transitionDelay = ok ? n++ * 60 + 'ms' : ''; });
  requestAnimationFrame(() => grid.classList.remove('is-out')); }, 230);
```

## Performance

- **Rien ne tourne en continu** : pas de boucle d'animation au repos. Le carrousel avance par un `setInterval` de 4.2s, coupé hors écran (IntersectionObserver), au survol et au focus.
- Le défilement n'écrit que des `transform` sur **quatre petits éléments** (une assiette de 190px, trois cadres) ; jamais sur une section entière. Les feuilles empilées sont une simple marge négative, sans `position: sticky`.
- Aucun flou, aucun filtre, aucune vidéo. La reliure à spirale est un masque CSS fixe.
- Seuls `transform`, `opacity`, `stroke-dashoffset` et des couleurs sont animés.
- Les cadres en décalage sont coupés sous 761px de large : sur mobile les photos sont dans le flux.
- Mesuré le 2026-10-03 dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : arrivée du héros 140 images/s, défilement de toute la page en 5s 144, avance du carrousel 145, filtre de la carte 141. Non mesuré : la fluidité à 390px.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .js .rise, .js .arch, .js .hero-left .plate { opacity: 1; transform: none; }
  .js .mask > b { transform: none; }
  .js .art { stroke-dashoffset: 0; }
  .fav-card:hover .plate, .dish:hover img { transform: none; }
}
```

Le script lit aussi la préférence : le carrousel n'avance plus seul, l'assiette ne tourne plus et les cadres restent en place. Le filtre trie sans attendre.
