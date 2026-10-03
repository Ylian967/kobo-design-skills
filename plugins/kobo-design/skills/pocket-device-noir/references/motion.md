# Pocket Device Noir — mouvement

**La référence est fixe** : neuf images et une vidéo de 2,4 s qui n'est qu'un diaporama des écrans (coupes franches, aucun mouvement dans l'image). Tout ce qui suit est **proposé** par le skill, dans le ton du visuel : calme, précis, comme un objet que l'on tourne dans sa main.

## Catalogue

| Moment | Effet | Durée / courbe |
|---|---|---|
| Arrivée du héros | Les deux mots du titre montent derrière un cache, à 120 ms d'écart | 1000ms `--ease` |
| Objet 3D | Suit la souris : jusqu'à ±0.25 rad d'avant en arrière, ±0.5 rad de gauche à droite, avec inertie | interpolation de 20 % par image |
| Écran de l'objet | L'heure réelle ; la forme d'onde ondule | redessiné toutes les 110ms |
| Manifeste | Les mots passent de 25 % à 100 % d'opacité un à un, au défilement | lié au défilement ; 500ms |
| Nom géant | Glisse verticalement (8 % du défilement) derrière l'objet | lié au défilement |
| Blocs | Montée de 28px en fondu, une fois | 1000ms `--ease` |
| Bouton blanc | Monte de 2px, son halo passe de 3 à 6px | 500ms `--ease` |
| Vignettes | La vignette choisie grandit (202 → 282px) et prend un contour en tirets ; le texte dessous change | 500ms `--ease` |
| En vedette | Fondu entre les photos plein cadre ; les segments de la barre se remplissent | 1000ms linéaire ; 500ms |
| Points d'intérêt | Le point central pulse | 2.4s, en boucle |
| Liens du pied | Un filet se trace dessous | 500ms `--ease` |

## Code

```css
.hero-copy h1 span { display: inline-block; overflow: hidden; vertical-align: bottom; }
.hero-copy h1 b { display: inline-block; transform: translateY(105%);
  transition: transform var(--dur-slow) var(--ease); transition-delay: calc(var(--i) * 120ms + 300ms); }
.loaded .hero-copy h1 b { transform: none; }

.strip button { height: var(--thumb-h); transition: height var(--dur) var(--ease), opacity var(--dur) linear; }
.strip button[aria-pressed="true"] { height: var(--thumb-h-on); outline: 1px dashed var(--text); outline-offset: 3px; }
```

```js
// Rendu à la demande : 30 images/s au plus, seulement pour les objets visibles qui ont changé
function frame(t) {
  requestAnimationFrame(frame);
  if (t - last < 33) return; last = t;
  if (anyVisible && t - lastLcd > 110) { lastLcd = t; drawLcd(); mounts.forEach(m => m.dirty = true); }
  mounts.forEach(m => { if (!m.visible || !m.dirty) return; /* inertie vers la pose + souris */ m.renderer.render(m.scene, m.cam); });
}
```

## Performance

- **3D légère** : matériaux Phong (pas de reflets calculés, pas d'ombres, pas d'environnement), une trentaine de maillages, résolution plafonnée à 1.5.
- **Rendu à la demande** : un objet n'est redessiné que s'il est à l'écran (IntersectionObserver) et s'il a changé (souris, écran). 30 images/s au plus.
- **Une seule texture d'écran** partagée par les quatre objets, redessinée dans un petit canvas 2D.
- **Un seul flou** : le panneau « en vedette » (`backdrop-filter`), fixe ; les photos changent dessous par fondu. Aucun flou animé.
- Rayons du manifeste, graduations et pointillés : dégradés CSS fixes.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : héros avec l'objet 137 images/s ; défilement de toute la page en bougeant la souris 75 (une image à 146 ms au premier affichage d'un objet).

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .rise { opacity: 1; transform: none; }
  .hero-copy h1 b { transform: none; }
  .manifesto span { opacity: 1; }
}
```

L'objet reste dans sa pose, ne suit plus la souris et son écran est fixe ; le manifeste est entièrement lisible ; les points ne pulsent plus.
