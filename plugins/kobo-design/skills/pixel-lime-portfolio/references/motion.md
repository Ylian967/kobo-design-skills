# Pixel Lime Portfolio — mouvement

## Principes

Le mouvement imite deux gestes : **l'écran 8-bit** (les pixels s'allument par à-coups, sans fondu doux) et **la main** (traits qui se dessinent, fiches qu'on redresse). Le reste de l'interface réagit vite et sec (160ms). Aucune animation continue en dehors du carré « disponible » qui clignote.

Rien de ceci n'est visible sur le shot (images fixes) : c'est une proposition cohérente avec le langage visuel.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chargement du héros | Les pixels de la grappe s'allument un à un, ordre pseudo-aléatoire (`--i` × 18ms, départ 300ms) | 160ms chacun | `--ease-step` (`steps(6)`) |
| Nom | Chaque ligne monte depuis un masque (`translateY(105%)` → 0), 2e ligne +120ms | 900ms | `--ease` |
| Indicateur « dispo » | Carré lime qui clignote | 1.2s, infini | `steps()` |
| Surlignage pilule (énoncé) | La pilule s'étire de gauche à droite à l'entrée dans l'écran | 900ms | `--ease` |
| Cercle / soulignement | Tracé du chemin (`stroke-dashoffset` 1 → 0) à l'entrée dans l'écran | 1.2s | `--ease` |
| Fiches | Apparition liée au défilement ; survol : rotation → 0 et montée de 6px | 420ms | `--ease` |
| Carte projet | Zoom 1.03 de la vignette, mini-grappe qui apparaît, pilule sous le titre | 900ms / 420ms | `--ease` |
| Bouton | Flèche → glisse de 4px ; appui : décalage 1px | 420ms / 160ms | `--ease` |
| Ligne de service | Fond lime qui monte (`scaleY`) ; flèche pivote de -45° | 420ms | `--ease` |

## Code

```css
@keyframes pix-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes rise   { from { transform: translateY(105%); } }
@keyframes draw   { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes grow   { from { transform: scaleX(0); } }
@keyframes blink  { 50% { opacity: 0; } }

@media (prefers-reduced-motion: no-preference) {
  .hero .mosaic b { animation: pix-in var(--dur-fast) var(--ease-step) both; animation-delay: calc(var(--i) * 18ms + 300ms); }
  .name span { overflow: hidden; }
  .name span > * { display: inline-block; animation: rise var(--dur-slow) var(--ease) both; }
  .name span + span > * { animation-delay: 120ms; }
  .drawn path { stroke-dasharray: 1; animation: draw 1.2s var(--ease) both; }
  .think .hl::before { animation: grow var(--dur-slow) var(--ease) both; }

  /* Déclenchement au défilement, sans JS, là où c'est supporté */
  @supports (animation-timeline: view()) {
    .drawn path, .think .hl::before { animation-timeline: view(); animation-range: entry 20% cover 45%; }
    .note { animation: pix-in linear both; animation-timeline: view(); animation-range: entry 0% entry 50%; }
  }
}
```

Sans `animation-timeline`, les tracés jouent au chargement ; pour les déclencher à l'entrée dans l'écran, ajouter une classe via `IntersectionObserver` (`threshold: .4`) et démarrer l'animation sur `.is-in`. Ne **jamais** masquer un contenu en attendant le JS : l'état de départ invisible ne s'applique que si l'animation tourne.

Grappe plus vivante (option) : toutes les 4–6 s, éteindre 2 ou 3 pixels au hasard pendant 120ms (`steps(1)`), jamais plus.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  html { scroll-behavior: auto; }
}
```
Pixels, nom, pilules et tracés sont affichés directement dans leur état final ; le carré « dispo » est fixe ; les fiches gardent leur inclinaison mais ne bougent plus.

## React Native

- Pixels : `Animated.stagger(18, pixels.map(p => Animated.timing(p, { toValue: 1, duration: 1, useNativeDriver: true })))`.
- Tracés : `react-native-svg` + `Animated` sur `strokeDashoffset`.
- `AccessibilityInfo.isReduceMotionEnabled()` → tout afficher sans animation.
