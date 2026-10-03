# Noir Inferno Chapters — mouvement

Le site de référence est un récit en neuf scènes que l'on parcourt en **tirant un cercle vers le bas**. Les images sont des peintures en noir et blanc animées dans un canvas WebGL (plans en profondeur, personnages en boucle, poussière) ; les textes et l'interface sont en HTML. Le skill garde le geste, le rythme et les états, avec des **photos** à la place des peintures.

« Mesuré » vient de la feuille de style et du script du site, « observé » des captures (voir `source.md`).

## Catalogue

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Ouverture | Écran noir, citation en haut, cercle à tirer, consigne en bas ; tout apparaît en fondu | ≈ 1.4s | Observé (ligne ondulée puis fondu) ; durée proposée |
| Tirer le cercle | Le cercle suit le doigt le long d'une ligne pointillée de 160px vers une cible en tirets ; passé 80 %, la cible s'allume ; relâcher valide, sinon le cercle revient | retour 600ms `--ease-out` | Geste, cercle, ligne et cible **mesurés** (52px, 160px, 65px) ; seuil et retour proposés |
| Changement de scène | Fondu d'une image à l'autre, puis le titre et le texte | `--dur-scene` (1400ms) `--ease` ; texte 700ms | Observé (1 à 2s) ; valeurs proposées |
| Titre de scène | Titre et paragraphe montent de 10px en fondu, à 250ms d'écart | 700ms | Proposé |
| Masquer le texte (croix) | **Le titre se défait en poussière** : ses points partent vers la droite et s'éteignent ; l'interface de coin apparaît | `--dur-dust` (900ms) | Observé (le titre se désagrège en particules) ; durée et trajectoires proposées |
| Croix | Tourne de 90° au survol | 600ms | Proposé |
| Liens de coin | Un filet se trace sous le lien, de gauche à droite | 600ms `cubic-bezier(.95,.05,.795,.035)` | **Mesuré** |
| Numéros | Le numéro courant est grand (40px), les autres petits et à 50 % | 700ms | Tailles **mesurées** ; transition proposée |
| Poussière | Quelques points blancs dérivent lentement | 9 à 18s, linéaire | Observé (particules dans toutes les scènes) |
| Image | Se décale de quelques pixels à l'opposé de la souris | 900ms `--ease-out` | Observé (plans qui bougent avec la souris) ; amplitude proposée |
| Panneau « à propos » | Descend du haut sur tout l'écran | 1400ms `--ease` | Panneau **mesuré** (fond #dedede) ; entrée proposée |
| Dernière scène | Le cercle devient rouge | 700ms | Observé (une main rouge à tirer vers le bas) |

## Code

```css
/* Le cercle : sa position suit --pull-y, sans transition pendant le geste */
.handle { transform: translateY(var(--pull-y, 0px)) scale(var(--s, 1)); transition: transform 600ms var(--ease-out); touch-action: none; }
.handle.drag { transition: none; }
.pull.near::after { border-color: var(--text); transform: scale(1.12); }   /* la cible s'allume */

/* Scènes : fondu seul */
.scene { opacity: 0; visibility: hidden; transition: opacity var(--dur-scene) var(--ease), visibility 0s var(--dur-scene); }
.scene.on { opacity: 1; visibility: visible; transition-delay: 0s; }

/* Filet des liens */
.hud a::after { transform: scaleX(0); transform-origin: left; transition: transform var(--dur-line) var(--ease-line); }
.hud a:hover::after { transform: none; }
```

```js
// Tirer : on valide passé 80 % de la course
handle.addEventListener('pointerdown', e => { dragging = true; startY = e.clientY - y; handle.setPointerCapture(e.pointerId); });
handle.addEventListener('pointermove', e => { if (dragging) setY(e.clientY - startY); });
handle.addEventListener('pointerup', () => { const done = y > PULL * 0.8; setY(0); if (done) next(); });

// Poussière du titre : le texte est dessiné dans un petit canvas posé sur le titre, puis échantillonné
for (let py = 0; py < c.height; py += step) for (let px = 0; px < c.width; px += step)
  if (data[(py * c.width + px) * 4 + 3] > 120) pts.push({ x: px, y: py, vx: rnd(.2, 1.6), vy: rnd(-.9, .5), d: rnd(0, .35) });
```

## Performance

- **Fondu seul entre deux scènes.** Avec un zoom en plus sur les deux images plein écran, le passage tombait à 48 images/s en rendu logiciel ; en opacité seule il tient 66.
- **Noir et blanc fait par le serveur d'images** (`sat=-100`), jamais par `filter: grayscale()`.
- **Grain fixe** : une tuile de bruit tirée une fois dans un canvas, posée en fond répété.
- **Poussière en CSS** : quatorze points de 2px, chacun animé en `transform` ; aucun canvas plein écran.
- **Poussière du titre** : un canvas de la taille du titre seulement, qui se supprime à la fin ; au plus quelques milliers de points.
- Le décalage à la souris ne s'applique qu'à l'image visible, au plus une fois par image d'animation.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : écran d'ouverture 145 images/s, arrivée de la première scène 117, passage d'une scène à l'autre 66, scène au repos 144, décalage à la souris 87, poussière du titre 75.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .scene img { translate: none; }
  .dust { display: none; }
}
```

Les scènes se remplacent sans fondu, le titre disparaît sans poussière, les points ne dérivent plus, l'image ne suit plus la souris. Le récit reste entièrement lisible et navigable (Entrée, flèches, numéros).
